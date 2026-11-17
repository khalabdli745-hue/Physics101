# shape: بصمة الشكل لكل الدروس الظاهرة وتبويباتها على اللابتوب والجوال (منقولة من shapechk المعتمد 16 نوفمبر)
# الاستعمال: SITE_ROOT=<جذر النسخة> python3 .guard/shape.py lap|mob <ملف الناتج> [الجزء] [عدد الأجزاء]
import sys,os,json,subprocess
MODE=sys.argv[1]  # lap|mob
OUT=sys.argv[2]
PART=int(sys.argv[3]) if len(sys.argv)>3 else 0;NP=int(sys.argv[4]) if len(sys.argv)>4 else 1
R=os.environ['SITE_ROOT']
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)));import shot;shot.BASE='http://localhost:8792/'
from shot import open_ctx,sync_playwright
keys=json.loads(subprocess.run(['node','-e',"global.window={};eval(require('fs').readFileSync('data.js','utf8'));const o=[];window.UNITS.forEach((u,i)=>u.l.forEach((l,j)=>{if(!l.hide)o.push(i+'-'+j)}));console.log(JSON.stringify(o))"],cwd=R,capture_output=True,text=True).stdout)
local={'p101-auth':{'id':'demo','name':'خالد','token':'tok-d','demo':1},'p101-welc|demo':'1','p101-inst-once':'1','p101-pendday':'__DAY__'}
SL="""()=>{const s=[...document.querySelectorAll('.board .bSlide')].find(e=>e.offsetParent&&e.getBoundingClientRect().width>200);if(!s)return null;const c=s.querySelector('.bContent');const q=s.querySelector('.bQ');
 const cnt=[(s.innerText||'').replace(/\\s+/g,' ').slice(0,60)+'|'+s.querySelectorAll('.bStep.in').length];const END=/انتهى شرح الدرس/.test(s.innerText||'');
 if(q){const o=q.querySelector('.bOpts');const cols=o?getComputedStyle(o).gridTemplateColumns.split(' ').filter(Boolean).length:0;const h=q.querySelector('.bQh');const hc=h?Math.round((h.getBoundingClientRect().left+h.getBoundingClientRect().right)/2-(q.getBoundingClientRect().left+q.getBoundingClientRect().right)/2):0;
  const eq=q.querySelectorAll('.bQq .eq').length;return {n:cnt[0]||'',f:'q'+(q.querySelector('.kQf .kFig')?'F':'-')+'c'+cols+(Math.abs(hc)<40?'m':'s')+'e'+eq}}
 if(c&&c.querySelector('.kFig'))return {n:cnt[0]||'',f:'k'+getComputedStyle(c).display[0]};return {n:cnt[0]||'',f:END?'END':'o'}}"""
LAB="""()=>{const out=[];document.querySelectorAll('#view .card.lab .accC').forEach((C,i)=>{const t=[...C.querySelectorAll('.intro>.tool')].map(x=>getComputedStyle(x).display[0]).join('');const B=C.querySelector(':scope>.accB');const g=B?getComputedStyle(B):null;
 out.push(i+':'+t+'/'+(g?g.display[0]+g.gridTemplateColumns.split(' ').filter(x=>x&&x!=='none').length:''))});return out.join(' ')}"""

import hashlib
# المرحلة 2: بصمة بصرية لكل بطاقة (الشكل والألوان والأحجام والمواقع داخل البطاقة والنص) وبصمة تفاعلية (نتيجة الضغط على أزرار البطاقات)
VIS="""()=>{try{document.getAnimations().forEach(a=>{try{a.pause();a.currentTime=0}catch(e){}})}catch(e){}document.querySelectorAll('svg').forEach(g=>{try{g.pauseAnimations();g.setCurrentTime(0)}catch(e){}});
 const v=document.querySelector('#view');if(!v)return [];const cards=[...v.querySelectorAll('.inner > *')].filter(c=>c.offsetParent);
 return cards.map(cd=>{const R=cd.getBoundingClientRect();const o=[Math.round(R.width/3),Math.round(R.height/3),(cd.innerText||'').replace(/\\s+/g,' ')].join('|');const C0=getComputedStyle(cd);const L=[o,['CARD',C0.color,C0.backgroundColor,C0.backgroundImage.slice(0,80),C0.borderTopColor,C0.borderTopWidth,C0.borderRadius,C0.boxShadow.slice(0,60),C0.fontSize,C0.opacity,C0.paddingTop].join('|')];let n=0;
  for(const e of cd.querySelectorAll('*')){const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;const c=getComputedStyle(e);if(c.visibility==='hidden'||c.display==='none')continue;
   const cl=(e.className&&e.className.baseVal!==undefined)?e.className.baseVal:(e.className||'');
   L.push([e.tagName,cl,Math.round((r.x-R.x)/3),Math.round((r.y-R.y)/3),Math.round(r.width/3),Math.round(r.height/3),c.color,c.backgroundColor,c.fontSize,c.fontWeight,c.borderTopColor,c.borderTopWidth,c.opacity].join('|'));if(++n>3000)break}
  return L.join('\\n')})}"""
def vis(pg):
  try:return [hashlib.md5(x.encode()).hexdigest()[:10] for x in pg.evaluate(VIS)]
  except Exception as e:return ['ERR']
NAV=("التالي","السابق","الدرس","ابدأ الاختبار","سجل","خروج","إغلاق","تسجيل")
BTN="[...document.querySelectorAll('#view .inner button')].filter(b=>!b.closest('.calc,.calcbox')&&!/(^|\\s)(ck|cx|calcbtn|wFsBtn)(\\s|$)/.test(b.className))"
def act(pg,les,U,L,t):
  """يضغط أزرار البطاقات بالترتيب (حتى 24) ويسجل بصمة نص كل البطاقات بعد كل ضغطة"""
  out=[]
  n=pg.evaluate("()=>"+BTN+".length")
  for i in range(min(n,24)):
    bt=pg.evaluate("(i)=>{const b="+BTN+"[i];if(!b||!b.offsetParent||b.disabled)return null;return (b.innerText||b.title||'').trim().slice(0,30)}",i)
    if bt is None or any(x in bt for x in NAV):continue
    pg.evaluate("(i)=>{const b="+BTN+"[i];if(b)b.click()}",i);pg.wait_for_timeout(220)
    nl=pg.evaluate("()=>pos.u+'-'+pos.l")
    if nl!=les:
      out.append('NAV>'+str(nl));pg.evaluate(f"()=>{{window.__rs&&__rs();go({U},{L});const b=document.querySelector('[data-t=\"{t}\"]');if(b)b.click()}}");pg.wait_for_timeout(600);continue
    txt=pg.evaluate("()=>[...document.querySelectorAll('#view .inner > *')].map(c=>(c.innerText||'').replace(/\\s+/g,' ')).join('¦')")
    out.append(bt[:12]+':'+hashlib.md5(txt.encode()).hexdigest()[:8])
  try:pg.evaluate("()=>{if(window.TTS&&TTS.stop)TTS.stop()}")
  except Exception:pass
  return ' '.join(out)
keys=keys[PART::NP]
if os.environ.get('KEYS'):keys=os.environ['KEYS'].split(',')
res={}
with sync_playwright() as p:
  if MODE=='mob': b,c=open_ctx(p,local=local)
  else: b,c=open_ctx(p,w=1280,h=529,dsf=1,local=local,mobile=False,touch=False)
  c.add_init_script("(()=>{let x=12345;window.__rs=()=>{x=12345};Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}})()")
  pg=c.new_page();errs=[]
  pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
  pg.route('**/script.google.com/**',lambda r:r.fulfill(status=200,content_type='application/json',body='{"ok":true}'))
  pg.goto(shot.BASE+'index.html');pg.wait_for_timeout(2500)
  for k in keys:
    U,L=k.split('-');F={}
    pg.evaluate(f"()=>{{const d=document.getElementById('pendDlg');if(d)d.hidden=true;go({U},{L})}}");pg.wait_for_timeout(900)
    pg.mouse.click(5,5)
    F['v_sum']=vis(pg)
    if pg.evaluate("()=>{const b=document.querySelector('.sbGo');if(b){b.click();return 1}return 0}"):
      pg.wait_for_timeout(1500);seen=[];last=None
      F['t_board']=[hashlib.md5(x.encode()).hexdigest()[:10] for x in pg.evaluate("()=>[...document.querySelectorAll('.board .bSlide')].map(e=>(e.textContent||'').replace(/\\s+/g,' '))")]
      for i in range(70):
        s=pg.evaluate(SL)
        if s and s['n']!=last and s['f']!='o':seen.append(s['f'])
        if s:last=s['n']
        if s and s['f']=='END':break
        nx=pg.evaluate("()=>{const n=[...document.querySelectorAll('.board .bNext')].find(e=>e.offsetParent);if(n){n.click();return 1}return 0}")
        if not nx:pg.keyboard.press('ArrowLeft')
        for w in range(12):
          pg.wait_for_timeout(100)
          s2=pg.evaluate(SL)
          if s2 and s2['n']!=last:break
        else:
          stuck=locals().get('stuck',0)+1
          if stuck>=3:break
          continue
        stuck=0
        pg.wait_for_timeout(150)
      F['board']=' '.join(seen)
      pg.keyboard.press('Escape');pg.wait_for_timeout(400)
      pg.evaluate("()=>{const x=document.querySelector('.board .bClose,.board [data-act=close]');if(x)x.click()}")
    for t in ['ex','quiz']:
      pg.evaluate(f"()=>{{window.__rs&&__rs();const b=document.querySelector('[data-t=\"{t}\"]');if(b)b.click()}}");pg.wait_for_timeout(900)
      F[t]=pg.evaluate("()=>{const v=document.querySelector('#view');return v?v.querySelectorAll('.card').length:0}")
      F['v_'+t]=vis(pg)
      F['a_'+t]=act(pg,k,U,L,t)
      pg.evaluate(f"()=>{{go({U},{L})}}");pg.wait_for_timeout(500)
    pg.evaluate("()=>{const t=document.querySelector('[data-t=\"lab\"]');if(t)t.click()}");pg.wait_for_timeout(1200)
    n=pg.evaluate("()=>document.querySelectorAll('#view .card.lab .accC').length")
    L1=[]
    for i in range(n):
      pg.evaluate("(i)=>{const C=document.querySelectorAll('#view .card.lab .accC')[i];if(!C.classList.contains('open')){const h=C.querySelector('.accH');if(h)h.click()}}",i);pg.wait_for_timeout(500)
      L1.append(pg.evaluate("(i)=>{const C=document.querySelectorAll('#view .card.lab .accC')[i];const t=[...C.querySelectorAll('.intro>.tool')].map(x=>getComputedStyle(x).display[0]).join('');const B=C.querySelector(':scope>.accB');const g=B?getComputedStyle(B):null;return i+':'+t+'/'+(g?g.display[0]+g.gridTemplateColumns.split(' ').filter(x=>x&&x!=='none').length:'')}",i))
    if n:F['lab']=' '.join(L1);F['v_lab']=vis(pg)
    res[k]=F
  b.close()
json.dump({'res':res,'errs':errs[:20]},open(OUT,'w'),ensure_ascii=False,indent=0)
print(MODE,len(res),'lessons')
