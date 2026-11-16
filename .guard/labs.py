#!/usr/bin/env python3
"""المرحلة 3: تشغيل كل تجربة ظاهرة فعليا في «شاهد التجربة» و«تنفيذ التجربة» على اللابتوب، وتسجيل بصمة كل خطوة:
عدد الخطوات، نص الخطوة، عناصر المشهد (الأجهزة وأشكالها وألوانها ومواقعها)، موضع اليد، زر «سجل القراءة» ونتيجته، جدول النتائج،
وتوقيت الصوت (بمقاطع صامتة بطول النص) لفحص التزامن: لا قطع، لا تداخل، لا انتقال قبل انتهاء الصوت، زر التسجيل بعد الصوت.
(مبني على labsync وlabchk المعتمدين). الاستعمال: SITE_ROOT=<النسخة> python3 .guard/labs.py <ملف الناتج> [الجزء] [عدد الأجزاء]"""
import sys, os, json, time, math, base64, io, wave, hashlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import shot; shot.BASE = 'http://localhost:8792/'
from shot import open_ctx, sync_playwright

OUT = sys.argv[1]; PART = int(sys.argv[2]) if len(sys.argv) > 2 else 0; NP = int(sys.argv[3]) if len(sys.argv) > 3 else 1
SCALE = int(os.environ.get('SCALE', '6'))  # الصوت الصامت أقصر 6 مرات من الحقيقي لتسريع الفحص (نفس المعامل للمرجع والجديد)
_W = {}
def silence(d):
    if d not in _W:
        b = io.BytesIO(); w = wave.open(b, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(8000)
        w.writeframes(b'\0\0' * 8000 * d); w.close(); _W[d] = base64.b64encode(b.getvalue()).decode()
    return _W[d]

INIT = r"""(()=>{window.__AU=[];const T=()=>Math.round(performance.now()/100)/10;
 const P=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){const a=this;if(!a.__h){a.__h=1;
  a.addEventListener('playing',()=>{if(a.src&&!a.src.startsWith('data:'))__AU.push(['aplay',T(),+(a.duration||0).toFixed(1)])});
  a.addEventListener('ended',()=>{if(a.src&&!a.src.startsWith('data:'))__AU.push(['aend',T()])});
  a.addEventListener('pause',()=>{if(!a.ended&&a.src&&!a.src.startsWith('data:'))__AU.push(['pause',T(),+a.currentTime.toFixed(1),+(a.duration||0).toFixed(1)])})}
  return P.apply(this,arguments)};
 new MutationObserver(ms=>{for(const m of ms){const e=m.target.nodeType===3?m.target.parentElement:m.target;if(!e||!e.closest)continue;
  const bc=e.closest('.barCnt');if(bc&&window.__CLS&&bc.closest('.'+__CLS)){const k=(bc.textContent.match(/(\d+)\s*\/\s*\d+/)||[])[1];if(k&&+k!==window.__LK){window.__LK=+k;__AU.push(['step',T(),+k])}}
  if(e.matches&&e.matches('[data-did=dmRec]')&&m.attributeName==='hidden')__AU.push([e.hidden?'recHide':'recShow',T()]);}})
 .observe(document,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden','class']})})()"""

STEP = r"""(cls)=>{const w=document.querySelector('.lab .'+cls+' .dxW');if(!w)return null;const c=w.querySelector('.barCnt');const m=c&&c.textContent.match(/(\d+)\s*\/\s*(\d+)/);
 const st=w.querySelector('.stage')||w;const S=st.getBoundingClientRect();const L=[];
 st.querySelectorAll('svg path,svg rect,svg circle,svg ellipse,svg polygon,svg line,svg image,svg text,svg polyline').forEach(e=>{const r=e.getBoundingClientRect();if(r.width<2&&r.height<2)return;
  const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.05)return;let an=0;try{an=e.getAnimations({subtree:false}).length}catch(x){}
  L.push([e.tagName,cs.fill,cs.stroke,an?'~':Math.round((r.x-S.x)/8)+','+Math.round((r.y-S.y)/8)+','+Math.round(r.width/8)+','+Math.round(r.height/8),e.tagName==='text'?(e.textContent||'').trim().slice(0,20):''].join('|'))});
 const h=w.querySelector(':scope>img.handH');const hp=h&&h.style.opacity==='1'?[Math.round(h.dataset.px/w.clientWidth*20),Math.round(h.dataset.py/w.clientHeight*20)]:null;
 const cap=(w.closest('.dmP,.ctl')||document).querySelector('.dmCap');
 const U=[...new Set(L.map(x=>{const q=x.split('|');return [q[0],q[1],q[2],(q[4]||'').replace(/[0-9٠-٩.,−-]+/g,'#')].join('|')}))].sort();
 return {k:m?+m[1]:-1,n:m?+m[2]:-1,L:L.join('\n'),U:U.join('\n'),hand:hp,cap:cap?cap.textContent.replace(/\s+/g,' ').slice(0,90):''}}"""

def sync_check(au):
    """قواعد التزامن: المخالفة أن يبقى من صوت سابق أكثر من 0.5 ث عند انتقال الخطوة أو ظهور زر التسجيل، أو تداخل صوتين، أو قطع الصوت"""
    bad = []; cur = None  # (بداية، مدة)
    rem = lambda t: (cur[0] + cur[1] - t) if cur else 0
    for e in au:
        if e[0] == 'aplay':
            if cur and rem(e[1]) > 0.5: bad.append('تداخل صوتين')
            cur = (e[1], e[2])
        elif e[0] == 'aend':
            cur = None
        elif e[0] == 'pause':
            if e[2] + 0.3 < e[3]: bad.append('قطع الصوت قبل نهايته')
            cur = None
        elif e[0] == 'step' and e[2] > 1 and cur and cur[0] < e[1] - 0.8 and rem(e[1]) > 0.5:
            bad.append(f'انتقال إلى الخطوة {e[2]} قبل انتهاء صوت الخطوة السابقة')
        elif e[0] == 'recShow' and cur and rem(e[1]) > 0.5:
            bad.append('زر «سجل القراءة» ظهر قبل انتهاء صوت الخطوة')
    return sorted(set(bad))

def main():
    local = dict(shot.student_local(demo=True), **{'p101-srvtts': True})
    res = {}; errs = []
    with sync_playwright() as p:
        b, c = open_ctx(p, w=1280, h=800, dsf=1, local=local, mobile=False, touch=False)
        c.add_init_script("(()=>{let x=12345;window.__rs=()=>{x=12345};Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648}})()")
        c.add_init_script(INIT)
        pg = c.new_page(); pg.on('pageerror', lambda e: errs.append(str(e)[:150]))
        def api(route):
            if route.request.method == 'GET':
                return route.fulfill(status=200, content_type='application/json', body='{"ok":true,"tts":true}')
            try: o = json.loads(route.request.post_data or '{}')
            except Exception: o = {}
            if o.get('a') in ('tts', 'rtts'):
                txt = o.get('text') or ' '.join(x.get('t', '') for x in o.get('segs', []))
                d = max(1, min(30, math.ceil(len(txt) / 14 / SCALE)))
                return route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True, 'mime': 'audio/wav', 'audio': silence(d)}))
            route.fulfill(status=200, content_type='application/json', body='{"ok":true,"tts":true}')
        pg.route('**/script.google.com/**', api)
        pg.goto(shot.BASE + 'index.html?sim=1'); pg.wait_for_timeout(2500); pg.mouse.click(5, 5)
        keys = pg.evaluate("()=>Object.keys(LABS).filter(k=>{const[u,l]=k.split('-').map(Number);const L=UNITS[u]&&UNITS[u].l[l];return L&&!L.hide}).sort()")
        if os.environ.get('KEYS'): keys = os.environ['KEYS'].split(',')
        for k in keys[PART::NP]:
            u, l = k.split('-'); R = {}
            try:
                pg.evaluate("([u,l])=>{const d=document.getElementById('pendDlg');if(d)d.hidden=true;try{TTS.stop()}catch(e){};__rs();go(+u,+l)}", [u, l]); pg.wait_for_timeout(1200)
                pg.evaluate("()=>{const t=document.querySelector('[data-t=\"lab\"]');if(t)t.click()}"); pg.wait_for_timeout(2200)
                pg.evaluate("()=>{document.querySelectorAll('.lab .accC').forEach(a=>a.classList.add('open'));const s=document.createElement('style');s.textContent='.lab .accB{display:block!important;max-height:none!important;height:auto!important;overflow:visible!important}';document.head.appendChild(s)}"); pg.wait_for_timeout(900)
                pg.evaluate("()=>{document.querySelectorAll('.lab .ctl').forEach(c=>{const h=c.querySelector('h3,h4');if(!h)return;if(/شاهد التجربة/.test(h.textContent)&&!document.querySelector('.lab .lx51'))c.classList.add('lx51');if(/خطوات وتنفيذ التجربة/.test(h.textContent)&&!document.querySelector('.lab .lx52'))c.classList.add('lx52')})}")
                for cls in ('lx51', 'lx52'):
                    S = {'steps': [], 'recs': []}; R[cls] = S
                    if not pg.evaluate(f"()=>!!document.querySelector('.lab .{cls} .dxW')"): S['err'] = 'missing'; continue
                    pg.evaluate("(c)=>{window.__AU=[];window.__LK=-1;window.__CLS=c}",cls)
                    pg.locator(f'.lab .{cls} .dxW').first.scroll_into_view_if_needed()
                    pg.evaluate(f"()=>{{const w=document.querySelector('.lab .{cls} .dxW');const b=w.querySelector('.vcPl')||[...document.querySelectorAll('.lab .{cls} button')].find(x=>/تشغيل/.test(x.textContent));b&&b.click()}}")
                    t0 = time.time(); last = -2; tl = time.time(); seen = set(); h = {}
                    while time.time() - t0 < 420:
                        pg.wait_for_timeout(700)
                        if cls == 'lx52' and pg.evaluate(f"()=>{{const P=document.querySelector('.lab .{cls}');const b=P&&P.querySelector('[data-did=dmRec]');if(b&&!b.hidden&&b.offsetParent){{b.click();return 1}}return 0}}"):
                            pg.wait_for_timeout(1300)
                            S['recs'].append(pg.evaluate(f"()=>{{const c=document.querySelector('.lab .{cls} .dmCap');return c?(/تعذر/.test(c.textContent)?'FAIL':/سجلت القراءة/.test(c.textContent)?'OK':'?'):''}}"))
                        h = pg.evaluate(STEP, cls) or {}
                        if h.get('k') != last: last = h.get('k'); tl = time.time()
                        kk = h.get('k')
                        if kk not in seen and time.time() - tl > 1.6:
                            seen.add(kk)
                            S['steps'].append({'k': kk, 'cap': h.get('cap'), 'hand': h.get('hand'), 'st': hashlib.md5((h.get('U') or '').encode()).hexdigest()[:10], 'stp': hashlib.md5((h.get('L') or '').encode()).hexdigest()[:10], 'u': h.get('U') or ''})
                        if h.get('n', 0) > 0 and h.get('k') == h.get('n') and kk in seen:
                            if cls == 'lx52':
                                for _ in range(40):
                                    pg.wait_for_timeout(800)
                                    s2 = pg.evaluate(f"()=>{{const P=document.querySelector('.lab .{cls}');const b=P.querySelector('[data-did=dmRec]');if(b&&!b.hidden&&b.offsetParent){{b.click();return 'rec'}}const n=P.querySelector('[data-did=dmNext]');return n?n.textContent:''}}")
                                    if s2 == 'rec': S['recs'].append('last'); continue
                                    if 'انتهت' in s2: break
                            break
                        if time.time() - tl > 40: S['stuck'] = kk; break
                    S['n'] = h.get('n'); S['end'] = h.get('k')
                    au = pg.evaluate('()=>__AU'); S['sync'] = sync_check(au); S['narr'] = sum(1 for e in au if e[0] == 'aplay')
                    if cls == 'lx52':
                        S['results'] = pg.evaluate("()=>{const r=document.querySelector('.lab .lx53');return r?r.innerText.replace(/\\s+/g,' ').slice(0,600):'no lx53'}")
                    pg.evaluate(f"()=>{{const w=document.querySelector('.lab .{cls} .dxW');const b=w&&w.querySelector('.vcPl');if(b&&b.dataset.on==='1')b.click();try{{TTS.stop()}}catch(e){{}}}}"); pg.wait_for_timeout(400)
            except Exception as e:
                R['err'] = str(e)[:160]
            res[k] = R
        b.close()
    json.dump({'res': res, 'errs': errs[:20]}, open(OUT, 'w'), ensure_ascii=False, indent=0)
    print('labs', len(res))

main()
