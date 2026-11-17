#!/usr/bin/env python3
"""يقارن تشغيل التجارب (المرجع مقابل الجديد) ويفشل عند أي تغيير في تجربة خارج scope.lessons، أو مخالفة تزامن جديدة.
الاستعمال: python3 .guard/labcmp.py <مجلد المرجع> <مجلد الجديد> <scope.json> [ملف التقرير]"""
import sys, json, glob, re
REFD, NEWD, SCOPE = sys.argv[1:4]; OUTMD = sys.argv[4] if len(sys.argv) > 4 else None
ALLOW = json.load(open(SCOPE, encoding='utf8')).get('lessons', [])
def load(d):
    r, e = {}, []
    for f in glob.glob(f'{d}/**/labs_*.json', recursive=True):
        try: j = json.load(open(f, encoding='utf8')); r.update(j['res']); e += j.get('errs', [])
        except Exception: pass
    return r, e
A, ea = load(REFD); B, eb = load(NEWD)
SEC = {'lx51': '«شاهد»', 'lx52': '«نفذ»'}
fails, allowed, review, oks = [], [], [], []; moving = set()
D = lambda t: re.sub(r'[0-9٠-٩][0-9٠-٩.,]*', '#', t or '')
U = lambda z: re.sub(r'url\("?#[^)"]*"?\)', 'url', z)  # أسماء التدرجات اللونية تولد تلقائيا في كل تشغيل
def sig(S):
    return {'عدد الخطوات': S.get('n'), 'وصل إلى الخطوة': S.get('end'), 'توقف عند': S.get('stuck'),
            'الخطوات ونصها': [(x['k'], D(x['cap'])) for x in S.get('steps', [])],
            'أجهزة المشهد وأشكالها وألوانها ونصوصها (كل الخطوات)': sorted({U(z) for x in S.get('steps', []) for z in (x.get('u') or '').split('\n') if z}),
            'عدد مقاطع الصوت': S.get('narr'), 'ضغطات سجل القراءة': len(S.get('recs', [])), 'تسجيل فاشل': S.get('recs', []).count('FAIL'),
            'بنية جدول النتائج (العناوين والوحدات)': re.sub(r'[0-9٠-٩][0-9٠-٩.,]*', '#', S.get('results') or ''), 'خطأ': S.get('err')}
if not A: fails.append('لم تنتج نتائج المرجع')
for k in sorted(A):
    if k not in B: fails.append(f'التجربة {k}: لم تفحص في الجديد'); continue
    tgt = allowed if (ALLOW == ['*'] or k in ALLOW) else fails
    if A[k].get('err') != B[k].get('err'): tgt.append(f'التجربة {k}: خطأ تشغيل {B[k].get("err")}')
    for c in ('lx51', 'lx52'):
        a, b = A[k].get(c) or {}, B[k].get(c) or {}
        sa, sb = sig(a), sig(b)
        d = [x for x in sa if sa[x] != sb[x]]
        if d:
            det = []
            for x in d:
                if x.startswith('أجهزة'):
                    det.append(f'{x}: اختفى {[z for z in sa[x] if z not in sb[x]][:3]} وظهر {[z for z in sb[x] if z not in sa[x]][:3]}')
                elif x.startswith('الخطوات'):
                    i = next((i for i, (p, q) in enumerate(zip(sa[x], sb[x])) if p != q), min(len(sa[x]), len(sb[x])))
                    det.append(f'{x}: يختلف من الخطوة {i + 1}')
                else: det.append(f'{x}: {str(sa[x])[:60]} → {str(sb[x])[:60]}')
            tgt.append(f'التجربة {k} {SEC[c]}: ' + '؛ '.join(det))
        newsync = [x for x in b.get('sync', []) if x not in a.get('sync', [])]
        if newsync: tgt.append(f'التجربة {k} {SEC[c]}: مخالفة تزامن جديدة: ' + '، '.join(newsync[:4]))
        old = [x for x in b.get('sync', []) if x in a.get('sync', [])]
        if old: review.append(f'التجربة {k} {SEC[c]}: مخالفة تزامن موجودة في المرجع أيضا: ' + '، '.join(old[:3]))
        if a.get('results') != b.get('results') and not d: review.append(f'التجربة {k} {SEC[c]}: أرقام جدول النتائج اختلفت (قراءات القياس تتغير بالتوقيت، راجعها)')
        pa = [x.get('stp') for x in a.get('steps', [])]; pb = [x.get('stp') for x in b.get('steps', [])]
        if pa != pb and not d: moving.add(k)
        ha = sorted({tuple(x['hand']) for x in a.get('steps', []) if x.get('hand')}); hb = sorted({tuple(x['hand']) for x in b.get('steps', []) if x.get('hand')})
        if ha != hb and k not in ALLOW: moving.add(k)
if moving: review.append(f'مواضع اليد والأجزاء المتحركة لحظة التصوير اختلفت في {len(moving)} تجربة (طبيعي بسبب سرعة الجهاز، لا تفحص آليا بدقة؛ راجع بالنظر التجارب المعدلة فقط)')
for k in sorted(set(B) - set(A)): (allowed if (ALLOW == ['*'] or k in ALLOW) else fails).append(f'التجربة {k}: جديدة غير موجودة في المرجع')
ne = [e for e in set(eb) if e not in set(ea)]
if ne: fails.append('أخطاء صفحة جديدة أثناء تشغيل التجارب: ' + ' | '.join(ne[:3]))
if A and all(k in B for k in A): oks.append(f'شغلت {len(A)} تجربة كاملة في «شاهد» و«نفذ» خطوة خطوة')
lines = [f'## تشغيل التجارب (المرجع مقابل الجديد): {"❌ فشل" if fails else "✅ نجح"}', f'الدروس/التجارب المسموح تغيرها: {ALLOW or "لا شيء"}', '']
if fails: lines += ['### ❌ تغير خارج النطاق'] + [f'- {x}' for x in fails[:40]] + ['']
if allowed: lines += ['### 👁 تغير داخل النطاق (راجعه)'] + [f'- {x}' for x in allowed[:40]] + ['']
if review: lines += ['### 👁 يحتاج مراجعة بصرية أو سمعية'] + [f'- {x}' for x in review[:40]] + ['']
lines += ['### ✅'] + [f'- {x}' for x in oks] + ([] if fails else ['- لا تغيير في أي تجربة خارج النطاق، ولا مخالفة تزامن جديدة'])
rep = '\n'.join(lines); print(rep)
if OUTMD: open(OUTMD, 'a', encoding='utf8').write(rep + '\n')
sys.exit(1 if fails else 0)
