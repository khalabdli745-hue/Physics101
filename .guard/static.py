#!/usr/bin/env python3
"""الفحوص الآلية الثابتة لحارس منصة الفيزياء 101 (المرحلة 1).
يقارن النسخة الجديدة (HEAD) بآخر فرع معتمد approved-NNN، ويفشل عند أي تغيير خارج النطاق المكتوب في .guard/scope.json.

الفحوص:
 1) العلامات المعتمدة: كل علامة في registry.json موجودة في ملفها، ولا تحذف علامة من السجل إلا بإذن (rm_ok).
 2) النطاق: كل ملف تغير يجب أن يكون في scope.files، وكل تغيير في ملفات الدروس مقيد برقم درس مسموح (data-les أو مفتاح الدرس).
 3) النسخ القديمة: لا يعود ملف إلى محتوى سابق من سجله، ولا تختفي تعليقات المدرب المعتمدة، ولا تختفي أسطر كثيرة.
 4) أرقام الإصدارات: لا ينزل رقم ?v= لأي ملف.
 5) الصوت: ناتج GEMPREP لكل الجمل مطابق للمرجع إلا إذا سمح النطاق (voice)، وأمثلة voicegold صحيحة دائما.
الاستعمال: python3 .guard/static.py <جذر النسخة الجديدة> <جذر المرجع> <اسم فرع المرجع> [ملف التقرير]
"""
import sys, os, re, json, subprocess, difflib, fnmatch, hashlib

NEW, REF, REFNAME = sys.argv[1], sys.argv[2], sys.argv[3]
OUTMD = sys.argv[4] if len(sys.argv) > 4 else None
G = os.path.dirname(os.path.abspath(__file__))

def sh(c, cwd=NEW):
    return subprocess.run(c, shell=True, cwd=cwd, capture_output=True, text=True).stdout

def read(root, f):
    p = os.path.join(root, f)
    return open(p, encoding='utf8', errors='replace').read() if os.path.isfile(p) else None

scope = json.load(open(os.path.join(NEW, '.guard/scope.json'), encoding='utf8'))
S_FILES = scope.get('files', [])
S_LES = scope.get('lessons', [])            # ["2-3"] أو ["*"] أو []
S_SHARED = bool(scope.get('shared', False))  # تعديل مكون مشترك مقصود: يلغي فحص التقييد الثابت فقط، وتبقى البصمة
S_VOICE = bool(scope.get('voice', False))
GONE_OK = scope.get('gone_ok', {})
RM_OK = scope.get('rm_ok', [])
RESTORE_OK = scope.get('restore_ok', [])

fails, warns, oks, review = [], [], [], []

# ---------- الملفات المتغيرة مقارنة بالمرجع ----------
refsha = sh(f'git rev-parse {REFNAME}').strip()
changed = [l.split('\t') for l in sh(f'git diff --name-status {refsha} HEAD').splitlines() if l.strip()]
chg = {}
for parts in changed:
    st, f = parts[0], parts[-1]
    chg[f] = st[0]
# التغييرات غير المرفوعة (عند التشغيل المحلي قبل الرفع)
for l in sh('git status --porcelain').splitlines():
    f = l[3:].strip().strip('"')
    if f and f not in chg:
        chg[f] = 'D' if l[:2].strip() == 'D' else 'M'

def allowed_file(f):
    if f == '.guard/scope.json':
        return True
    return any(fnmatch.fnmatch(f, p) for p in S_FILES)

out_scope = [f for f in sorted(chg) if not allowed_file(f)]
if out_scope:
    fails.append('ملفات تغيرت خارج النطاق المسموح: ' + '، '.join(out_scope[:30]))
else:
    oks.append(f'كل الملفات المتغيرة ({len(chg)}) داخل النطاق المسموح')
if any(f.startswith(('.guard/', '.github/')) and f != '.guard/scope.json' for f in chg):
    review.append('تغير في نظام الحماية نفسه (.guard أو .github): يحتاج مراجعتك قبل الدمج')

# ---------- 1) العلامات المعتمدة ----------
reg = json.load(open(os.path.join(NEW, '.guard/registry.json'), encoding='utf8'))
miss = 0
for f, marks in reg.items():
    s = read(NEW, f)
    if s is None:
        fails.append(f'ملف معتمد مفقود: {f}'); continue
    for m, desc in marks.items():
        if m not in s:
            miss += 1; fails.append(f'{f}: علامة معتمدة مفقودة: {desc}')
total = sum(len(v) for v in reg.values())
refreg_p = os.path.join(REF, '.guard/registry.json')
if os.path.isfile(refreg_p):
    rr = json.load(open(refreg_p, encoding='utf8'))
    for f, marks in rr.items():
        for m, desc in marks.items():
            if m not in reg.get(f, {}) and not any(x in m or x in desc for x in RM_OK):
                fails.append(f'علامة معتمدة حذفت من السجل: {f}: {desc}')
if not miss:
    oks.append(f'العلامات المعتمدة كلها موجودة ({total})')

# ---------- تقسيم الملف إلى جمل قصيرة لمقارنة دقيقة حتى في الأسطر الطويلة ----------
SPLIT = re.compile(r'(?<=[;{}\n])')
def stmts(s):
    return [x for x in SPLIT.split(s) if x]

KEYPAT = re.compile(r"""(?:DIR|LABS|L|RD\w*)\[['"](\d-\d+)['"]\]\s*=|['"](\d-\d+)['"]\s*:\s*\{""")
def key_regions(s):
    """مواقع بدايات كتل الدروس/التجارب في الملف: [(موقع، المفتاح)]"""
    return [(m.start(), m.group(1) or m.group(2)) for m in KEYPAT.finditer(s)]

def enclosing_key(regs, pos):
    k = None
    for p, kk in regs:
        if p <= pos: k = kk
        else: break
    return k

LESFILES = ('index.html', 'labs.js', 'kcards31.js', 'kcards.js', 'more.js', 'labvo.js', 'problems.js', 'figs.js', 'figs2.js', 'study.js', 'extras.js')
VERONLY = re.compile(r'\?v=[\w.]+')
COMMENT = re.compile(r'^\s*/\*.*\*/\s*$', re.S)

def les_ok(text, regkey):
    """هل التغيير مقيد بدرس مسموح؟"""
    if S_LES == ['*']:
        return True
    keys = set(re.findall(r"""data-les=["'](\d-\d+)["']|dataset\.les\s*===?\s*["'](\d-\d+)["']""", text))
    keys = {a or b for a, b in keys}
    if keys:
        return keys <= set(S_LES)
    if regkey:
        return regkey in S_LES
    return False

static_bad = []
for f in sorted(chg):
    if chg[f] == 'D' or f not in LESFILES:
        continue
    old, new = read(REF, f) or '', read(NEW, f) or ''
    a, b = stmts(old), stmts(new)
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    regs = key_regions(new)
    off = [0]
    for x in b: off.append(off[-1] + len(x))
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            continue
        added = ''.join(b[j1:j2]); removed = ''.join(a[i1:i2])
        # تغيير رقم الإصدار فقط، أو تعليق فقط
        if VERONLY.sub('', added) == VERONLY.sub('', removed):
            continue
        if added.strip() and COMMENT.match(added) and not removed.strip():
            continue
        if S_SHARED:
            continue
        # كل جملة/قاعدة تفحص وحدها مع سياقها (المحدد selector من آخر «}» قبلها)، حتى لا تمر قاعدة غير مقيدة بجانب قاعدة مقيدة
        def ctx_of(text, pos):
            lc = text.rfind('}', max(0, pos - 3000), pos)
            return text[(lc + 1 if lc >= 0 else max(0, pos - 3000)):pos]
        offa = [0]
        for x in a: offa.append(offa[-1] + len(x))
        rega = key_regions(old)
        items = [(b[j], new, off[j], regs) for j in range(j1, j2)] + [(a[i], old, offa[i], rega) for i in range(i1, i2)]
        for st, text, pos, rg in items:
            core = VERONLY.sub('', st).strip()
            if not core or core in ('}', '{', ';') or COMMENT.match(st):
                continue
            # جملة تبدأ بتعليق ثم كود: يفحص الكود
            if not les_ok(ctx_of(text, pos) + st, enclosing_key(rg, pos)):
                static_bad.append(f'{f}: تغيير غير مقيد بدرس مسموح {S_LES}: «{st.strip()[:110]}»')
if static_bad:
    fails.append(f'{len(static_bad)} تغييرا في ملفات الدروس غير مقيد برقم الدرس (data-les أو مفتاح الدرس):')
    fails.extend('   ' + x for x in static_bad[:25])
else:
    oks.append('كل تغييرات ملفات الدروس مقيدة بالدرس المسموح' + (' (تعديل مكون مشترك مصرح به: البصمة هي الحكم)' if S_SHARED else ''))

# ---------- 3) النسخ القديمة ----------
APPROVED = re.compile(r'/\*[^*]{0,240}?(?:المدرب|نوفمبر|أكتوبر)[^*]{0,240}?\*/')
old_bad = 0
for f in sorted(chg):
    if chg[f] == 'D' or not re.search(r'\.(html|js|gs|json|css)$', f) or f.startswith('.guard/'):
        continue
    new = read(NEW, f)
    if new is None:
        continue
    blob = sh(f'git hash-object "{f}"').strip()
    refblob = sh(f'git rev-parse {refsha}:"{f}" 2>/dev/null').strip()
    hist = set(re.findall(r'^:\d+ \d+ [0-9a-f]+ ([0-9a-f]{40}) ', sh(f'git log --raw --no-abbrev --format= {refsha} -- "{f}"'), re.M))
    if blob in hist and blob != refblob and f not in RESTORE_OK:
        old_bad += 1; fails.append(f'{f}: محتواه يطابق نسخة قديمة من سجله (استرجاع ملف قديم)')
    old = read(REF, f)
    if old is None:
        continue
    lost = [c for c in set(APPROVED.findall(old)) if c not in new and not any(x in c for x in RM_OK)]
    for c in lost:
        old_bad += 1; fails.append(f'{f}: تعليق تعديل معتمد اختفى: {c[:110]}')
    gone = [l for l in set(old.split('\n')) - set(new.split('\n')) if len(l.strip()) > 40]
    if len(gone) > max(12, int(GONE_OK.get(f, 0))):
        old_bad += 1; fails.append(f'{f}: {len(gone)} سطرا من المرجع اختفت (احتمال البناء على نسخة قديمة)')
if not old_bad:
    oks.append('لا استرجاع لنسخ قديمة، ولا تعليقات معتمدة مفقودة')

# ---------- 4) أرقام الإصدارات ----------
VER = re.compile(r'([\w./-]+\.(?:js|css|json|png|webp|jpg|svg))\?v=([\w.]+)')
def vers(root):
    d = {}
    for f in os.listdir(root):
        if f.endswith('.html'):
            for n, v in VER.findall(read(root, f) or ''):
                d.setdefault((f, n), []).append(v)
    return d
def vnum(v):
    return int(re.sub(r'\D', '', v) or 0)
vo, vn = vers(REF), vers(NEW)
vbad = 0
for k, olds in vo.items():
    if k in vn and max(map(vnum, vn[k])) < max(map(vnum, olds)):
        vbad += 1; fails.append(f'{k[0]}: رقم إصدار {k[1]} نزل من {max(olds, key=vnum)} إلى {max(vn[k], key=vnum)}')
for f in chg:
    if f.endswith(('.js', '.css')) and chg[f] == 'M':
        refs = [k for k in vn if k[1].split('/')[-1] == f]
        if refs and all(vn.get(k) == vo.get(k) for k in refs):
            warns.append(f'{f} تغير ولم يرفع رقم إصداره ?v= (قد يرى المتدرب النسخة القديمة من الذاكرة المؤقتة)')
if not vbad:
    oks.append('لا رقم إصدار نزل لأي ملف')

# ---------- 5) الصوت ----------
gq = set()
for root in (REF, NEW):
    p = os.path.join(root, 'gqall.json')
    if os.path.isfile(p):
        gq.update(json.load(open(p, encoding='utf8')))
gold = json.load(open(os.path.join(G, 'voicegold.json'), encoding='utf8'))
sent = sorted(gq | {t for t, _ in gold})
tmp = '/tmp/guard_voice'; os.makedirs(tmp, exist_ok=True)
json.dump(sent, open(f'{tmp}/s.json', 'w', encoding='utf8'), ensure_ascii=False)
for tag, root in (('ref', REF), ('new', NEW)):
    subprocess.run(['node', os.path.join(G, 'gemout.js'), root, f'{tmp}/s.json', f'{tmp}/{tag}.json'], capture_output=True, text=True, timeout=600)
try:
    R = json.load(open(f'{tmp}/ref.json')); N = json.load(open(f'{tmp}/new.json'))
except Exception as e:
    R = N = None; fails.append(f'تعذر تشغيل فحص الصوت: {e}')
if N is not None:
    if not N['ok']:
        fails.append('GEMPREP غير موجودة في النسخة الجديدة')
    gbad = [t for t, exp in gold if N['out'].get(t) != exp]
    for t in gbad[:10]:
        fails.append(f'مثال صوت ثابت تغير: «{t}» → «{N["out"].get(t)}»')
    diff = [t for t in gq if R['ok'] and R['out'].get(t) != N['out'].get(t)]
    if diff:
        msg = f'{len(diff)} جملة من {len(gq)} تغير نطقها مقارنة بالمرجع'
        ex = [f'   «{t[:70]}»: «{R["out"][t][:70]}» → «{N["out"][t][:70]}»' for t in diff[:8]]
        if S_VOICE:
            review.append(msg + ' (مسموح في النطاق، راجع الأمثلة بالسماع):'); review.extend(ex)
        else:
            fails.append(msg + ' والنطاق لا يسمح بتغيير الصوت:'); fails.extend(ex)
    if not gbad and not diff:
        oks.append(f'نطق كل الجمل مطابق للمرجع ({len(gq)} جملة) وأمثلة الصوت الثابتة صحيحة ({len(gold)})')

# ---------- التقرير ----------
lines = [f'## الفحوص الثابتة: {"❌ فشل" if fails else "✅ نجح"}',
         f'المرجع: `{REFNAME}` ({refsha[:7]}) · النطاق: {scope.get("note", "")} · الدروس: {S_LES or "لا شيء"} · مكون مشترك: {"نعم" if S_SHARED else "لا"} · الصوت: {"مسموح" if S_VOICE else "ممنوع"}',
         f'الملفات المتغيرة: {", ".join(sorted(chg)) or "لا شيء"}', '']
lines += ['### ❌ فشل'] + [f'- {x}' for x in fails] + [''] if fails else []
lines += ['### ⚠️ تنبيهات'] + [f'- {x}' for x in warns] + [''] if warns else []
lines += ['### 👁 يحتاج مراجعتك'] + [f'- {x}' for x in review] + [''] if review else []
lines += ['### ✅ نجح'] + [f'- {x}' for x in oks]
rep = '\n'.join(lines)
print(rep)
if OUTMD:
    open(OUTMD, 'a', encoding='utf8').write(rep + '\n')
sys.exit(1 if fails else 0)
