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

fails, allowed_changes, oks = [], [], []
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
            d = '; '.join(f'{x}: {a.get(x)} → {b.get(x)}' for x in sorted(set(a) | set(b)) if a.get(x) != b.get(x))
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
lines += ['### ✅'] + [f'- {x}' for x in oks] + ([] if fails else ['- لا تغيير في أي درس خارج النطاق'])
rep = '\n'.join(lines); print(rep)
if OUTMD: open(OUTMD, 'a', encoding='utf8').write(rep + '\n')
sys.exit(1 if fails else 0)
