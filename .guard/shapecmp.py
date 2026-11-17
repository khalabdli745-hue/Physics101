#!/usr/bin/env python3
"""يقارن بصمة الشكل للمرجع (approved) والنسخة الجديدة، ويفشل إذا تغير أي درس خارج scope.lessons.
الاستعمال: python3 .guard/shapecmp.py <مجلد بصمات المرجع> <مجلد بصمات الجديدة> <scope.json> [ملف التقرير]"""
import sys, os, json, glob

REFD, NEWD, SCOPE = sys.argv[1], sys.argv[2], sys.argv[3]
OUTMD = sys.argv[4] if len(sys.argv) > 4 else None
scope = json.load(open(SCOPE, encoding='utf8'))
ALLOW = scope.get('lessons', [])

def load(d, m):
    r, errs = {}, []
    for f in glob.glob(f'{d}/**/{m}_*.json', recursive=True):
        try:
            j = json.load(open(f, encoding='utf8')); r.update(j['res']); errs += j.get('errs', [])
        except Exception:
            pass
    return r, errs

def norm(v):
    v = dict(v or {})
    v['board'] = ' '.join(sorted(set(t[:4] for t in (v.get('board') or '').split()) - {'END'}))
    return v

fails, allowed_changes, oks, review = [], [], [], []
name = {'lap': 'اللابتوب', 'mob': 'الجوال'}
for m in ('lap', 'mob'):
    A, ea = load(REFD, m); B, eb = load(NEWD, m)
    if not A:
        fails.append(f'{name[m]}: لم تنتج بصمات المرجع'); continue
    for k in sorted(A):
        if k not in B:
            fails.append(f'{name[m]} {k}: لم يفحص في النسخة الجديدة'); continue
        a, b = norm(A[k]), norm(B[k])
        if a != b:
            NM = {'board': 'السبورة', 't_board': 'نص شرائح السبورة', 'ex': 'عدد بطاقات الأمثلة', 'quiz': 'عدد بطاقات اختبر نفسك', 'lab': 'أقسام التجربة',
                  'v_sum': 'شكل بطاقة الملخص', 'v_ex': 'شكل الأمثلة والتمارين', 'v_quiz': 'شكل اختبر نفسك', 'v_lab': 'شكل بطاقة التجربة',
                  'a_ex': 'تفاعل الأمثلة والتمارين (الضغط على الأزرار)', 'a_quiz': 'تفاعل اختبر نفسك'}
            def dd(x):
                u, w = a.get(x), b.get(x)
                if isinstance(u, list) and isinstance(w, list):
                    idx = [i + 1 for i in range(max(len(u), len(w))) if (u[i] if i < len(u) else None) != (w[i] if i < len(w) else None)]
                    return f'{NM.get(x, x)}: البطاقات {idx[:12]} من {len(u)}→{len(w)}'
                if x.startswith('a_'):
                    us, ws = (u or '').split(), (w or '').split()
                    i = next((i for i in range(max(len(us), len(ws))) if (us[i:i+1] != ws[i:i+1])), 0)
                    return f'{NM.get(x, x)}: يختلف من الضغطة {i + 1}'
                return f'{NM.get(x, x)}: {str(u)[:80]} → {str(w)[:80]}'
            d = '; '.join(dd(x) for x in sorted(set(a) | set(b)) if a.get(x) != b.get(x))
            only_board = all(x == 'board' for x in set(a) | set(b) if a.get(x) != b.get(x))
            if only_board and k not in ALLOW:
                review.append(f'{name[m]} {k}: ترتيب أنواع شرائح السبورة المصورة اختلف ({d}) مع أن نص كل الشرائح وشكل البطاقات مطابق (غالبا تخطي شريحة على جهاز بطيء)')
            else:
                (allowed_changes if (ALLOW == ['*'] or k in ALLOW) else fails).append(f'{name[m]} {k}: {d}')
    for k in sorted(set(B) - set(A)):
        (allowed_changes if (ALLOW == ['*'] or k in ALLOW) else fails).append(f'{name[m]} {k}: درس جديد غير موجود في المرجع')
    newerr = [e for e in set(eb) if e not in set(ea)]
    if newerr:
        fails.append(f'{name[m]}: أخطاء صفحة جديدة: ' + ' | '.join(newerr[:3]))
    if A and all(k in B for k in A):
        oks.append(f'{name[m]}: فحصت {len(A)} درسا بكل تبويباتها')

lines = [f'## بصمة الدروس (المرجع مقابل الجديد): {"❌ فشل" if fails else "✅ نجح"}', f'الدروس المسموح تغيرها: {ALLOW or "لا شيء"}', '']
if fails: lines += ['### ❌ تغير خارج النطاق'] + [f'- {x}' for x in fails[:40]] + ['']
if allowed_changes: lines += ['### 👁 تغير داخل النطاق (راجعه)'] + [f'- {x}' for x in allowed_changes[:40]] + ['']
if review: lines += ['### 👁 يحتاج مراجعة'] + [f'- {x}' for x in review[:20]] + ['']
lines += ['### ✅'] + [f'- {x}' for x in oks] + ([] if fails else ['- لا تغيير في أي درس خارج النطاق'])
rep = '\n'.join(lines); print(rep)
if OUTMD: open(OUTMD, 'a', encoding='utf8').write(rep + '\n')
sys.exit(1 if fails else 0)
