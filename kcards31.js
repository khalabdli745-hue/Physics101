/* بطاقات العرض ثلاثية الأبعاد (الدروس النموذجية: الشحنات الكهربائية وقانون كولوم 3-1، والمجال الكهربائي 3-3)
   - على السبورة: تستبدل شرائح مختارة ببطاقات تظهر أجزاؤها بالتتابع ويقرؤها المدرب الذكي.
   - في الأمثلة والتمارين التفاعلية: رسم ثلاثي الأبعاد فوق السؤال، وتظهر أسهم القوى بعد الحل. */
(function(){
'use strict';
const POSC='#E4572E',NEGC='#2F6FED',FC='#F59E0B',RC='#A855F7';
/* ---------- تعريفات SVG المشتركة (تحقن مرة واحدة) ---------- */
let PGK=.48;const PG=h=>({t:4,dx:Math.round(h*PGK),dy:Math.round(h*PGK*.71)});
const narrow=f=>function(){const k=PGK;PGK=.3;try{return f.apply(this,arguments)}finally{PGK=k}};
function defs(){if(document.getElementById('kcDefs'))return;
  const d=document.createElement('div');d.id='kcDefs';d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML=`<svg width="0" height="0" aria-hidden="true"><defs>
  <radialGradient id="kc-sP" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff1f1"/><stop offset=".18" stop-color="#fca5a5"/><stop offset=".55" stop-color="#dc2626"/><stop offset="1" stop-color="#5f0a0a"/></radialGradient>
  <radialGradient id="kc-sN" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f1f6ff"/><stop offset=".18" stop-color="#a9c4ff"/><stop offset=".55" stop-color="#2f6fed"/><stop offset="1" stop-color="#0b2363"/></radialGradient>
  <radialGradient id="kc-limb" cx="50%" cy="50%" r="50%"><stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset=".9" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient>
  <linearGradient id="kc-win" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="kc-spec"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".45" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="kc-bnc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".16"/></linearGradient>
  <radialGradient id="kc-sZ" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#e2e8f0"/><stop offset=".65" stop-color="#94a3b8"/><stop offset="1" stop-color="#334155"/></radialGradient>
  <radialGradient id="kc-gP"><stop offset="0" stop-color="#ef4444" stop-opacity=".5"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></radialGradient>
  <radialGradient id="kc-gN"><stop offset="0" stop-color="#5b8cff" stop-opacity=".55"/><stop offset="1" stop-color="#5b8cff" stop-opacity="0"/></radialGradient>
  <radialGradient id="kc-sh"><stop offset="0" stop-color="#1e3a5f" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <linearGradient id="kc-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dbe7f7"/><stop offset="1" stop-color="#b8cbe6"/></linearGradient>
  <linearGradient id="kc-aF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#f59e0b"/><stop offset="1" stop-color="#b45309"/></linearGradient>
  <linearGradient id="kc-aR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d5ff"/><stop offset=".5" stop-color="#a855f7"/><stop offset="1" stop-color="#6b21a8"/></linearGradient>
  <linearGradient id="kc-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7fbff"/><stop offset=".62" stop-color="#e8f1fc"/><stop offset="1" stop-color="#dbe7f7"/></linearGradient>
  <linearGradient id="kc-glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#93c5fd" stop-opacity=".55"/><stop offset=".12" stop-color="#ffffff" stop-opacity=".75"/><stop offset=".3" stop-color="#dbeafe" stop-opacity=".2"/><stop offset=".8" stop-color="#bfdbfe" stop-opacity=".25"/><stop offset="1" stop-color="#60a5fa" stop-opacity=".6"/></linearGradient>
  <linearGradient id="kc-metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#64748b"/><stop offset=".35" stop-color="#f1f5f9"/><stop offset=".6" stop-color="#94a3b8"/><stop offset="1" stop-color="#334155"/></linearGradient>
  <linearGradient id="kc-wood" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c08552"/><stop offset=".5" stop-color="#9a6234"/><stop offset="1" stop-color="#6b3f1d"/></linearGradient>
  <linearGradient id="kc-door" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dcb8"/><stop offset=".55" stop-color="#e0bb86"/><stop offset="1" stop-color="#c49a62"/></linearGradient>
  <linearGradient id="kc-skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde2c8"/><stop offset=".55" stop-color="#f2b98c"/><stop offset="1" stop-color="#c98a5e"/></linearGradient>
  <linearGradient id="kc-cloth" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".4" stop-color="#3b82f6"/><stop offset="1" stop-color="#172554"/></linearGradient>
  <linearGradient id="kc-shoe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e2e8f0"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
  <linearGradient id="kc-rug" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#6d28d9"/></linearGradient>
  </defs></svg>`+'<svg width="0" height="0" aria-hidden="true">'+EGRD+'</svg><svg width="0" height="0" aria-hidden="true"><defs>'+RLD+'</defs></svg>';document.body.appendChild(d)}
/* ---------- عناصر الرسم ---------- */
const f1=v=>Number(v).toFixed(1);
function stage(w,h,floorY){let g=`<rect width="${w}" height="${h}" fill="url(#kc-bg)"/>`;
  for(let i=0;i<26;i++){const x=(i*97)%w,y=(i*53)%(floorY-20)+6;g+=`<circle cx="${x}" cy="${y}" r="${i%3?0.8:1.3}" fill="#b7c9e8" opacity="${i%2?.0:.0}"/>`}
  g+=`<polygon points="40,${floorY} ${w-40},${floorY} ${w},${h} 0,${h}" fill="url(#kc-fl)"/>`;
  for(let i=1;i<9;i++){const t=i/9,x0=40+(w-80)*t,x1=w*t;g+=`<line x1="${f1(x0)}" y1="${floorY}" x2="${f1(x1)}" y2="${h}" stroke="#9fb3d4" stroke-width="1"/>`}
  for(let i=1;i<4;i++){const y=floorY+(h-floorY)*Math.pow(i/4,1.4),dx=40*(1-(y-floorY)/(h-floorY));g+=`<line x1="${f1(dx)}" y1="${f1(y)}" x2="${f1(w-dx)}" y2="${f1(y)}" stroke="#9fb3d4" stroke-width="1"/>`}
  return g+`<line x1="40" y1="${floorY}" x2="${w-40}" y2="${floorY}" stroke="#7f9cc9" stroke-width="1.5" opacity=".9"/>`}
function sphere(x,y,r,sign,floorY,cls=''){const s=sign==='+'?'P':sign==='-'?'N':'Z',sy=floorY+8,R=r;
  return `<g class="kSph ${cls}"><ellipse cx="${x}" cy="${sy}" rx="${f1(R*1.15)}" ry="${f1(R*.28)}" fill="url(#kc-sh)"/><ellipse cx="${x}" cy="${f1(sy-1)}" rx="${f1(R*.5)}" ry="${f1(R*.1)}" fill="#0b1220" opacity=".35"/>`+
  (s!=='Z'?`<circle class="kGlow" cx="${x}" cy="${y}" r="${f1(R*1.75)}" fill="url(#kc-g${s})"/>`:'')+
  `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#kc-s${s})"/><circle cx="${x}" cy="${y}" r="${R}" fill="url(#kc-limb)"/>`+
  `<ellipse cx="${f1(x-R*.08)}" cy="${f1(y-R*.5)}" rx="${f1(R*.62)}" ry="${f1(R*.3)}" fill="url(#kc-win)" opacity=".55"/>`+
  `<ellipse cx="${f1(x)}" cy="${f1(y+R*.7)}" rx="${f1(R*.55)}" ry="${f1(R*.17)}" fill="url(#kc-bnc)"/>`+
  `<ellipse cx="${f1(x-R*.36)}" cy="${f1(y-R*.42)}" rx="${f1(R*.2)}" ry="${f1(R*.13)}" fill="url(#kc-spec)" transform="rotate(-30 ${f1(x-R*.36)} ${f1(y-R*.42)})"/><circle cx="${f1(x-R*.42)}" cy="${f1(y-R*.47)}" r="${f1(Math.max(.8,R*.05))}" fill="#fff"/>`+
  (s!=='Z'?`<text x="${x}" y="${f1(y+R*.36)}" text-anchor="middle" font-size="${f1(R*1.05)}" font-weight="900" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,.3)" stroke-width="1.6">${sign==='+'?'+':'−'}</text>`:'')+`</g>`}
/* سهم مجسم أفقي من x1 إلى x2 */
function arrow(x1,x2,y,kind,delay,th){th=th||13;const dir=x2>x1?1:-1,L=Math.abs(x2-x1),hl=Math.min(24,L*.45),hw=th*1.05,b=x2-dir*hl;
  const pts=(dx,dy)=>[[x1,y-th/2],[b,y-th/2],[b,y-hw],[x2,y],[b,y+hw],[b,y+th/2],[x1,y+th/2]].map(([a,c])=>f1(a+dx)+','+f1(c+dy)).join(' ');
  const g=kind==='R'?'url(#kc-aR)':'url(#kc-aF)',dk=kind==='R'?'#3b0764':'#78350f';
  return `<g class="kAr" style="--d:${delay||0}s;transform-origin:${x1}px ${y}px"><polygon points="${pts(3,5)}" fill="${dk}" opacity=".85"/><polygon points="${pts(0,0)}" fill="${g}" stroke="rgba(255,255,255,.35)" stroke-width="1"/></g>`}
/* المدرب 2 نوفمبر: TS يكبر الكتابة في رسوم أمثلة المكثفات فقط (3-5 و3-6) */
let TS=1;
function pill(x,y,t,c,delay,cls){const k=TS,w=(t.length*10.2+26)*k;
  return `<g class="kPl ${cls||''}" style="--d:${delay||0}s"><rect x="${f1(x-w/2)}" y="${f1(y-17*k)}" width="${f1(w)}" height="${f1(30*k)}" rx="${f1(15*k)}" fill="#ffffff" stroke="${c}" stroke-width="2" filter="drop-shadow(0 2px 3px rgba(30,58,95,.18))"/><text x="${x}" y="${f1(y+4.5*k)}" text-anchor="middle" font-size="${f1(17*k)}" font-weight="800" fill="${c}" direction="ltr">${t}</text></g>`}
function lbl(x,y,t,c,s){return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${f1((s||14.5)*TS)}" font-weight="800" fill="${c||'#1e3a5f'}" direction="ltr">${t}</text>`}
function dim(x1,x2,y,t,px){px=px==null?(x1+x2)/2:px;return `<g class="kDim"><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#0369a1" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="${x1}" y1="${y-7}" x2="${x1}" y2="${y+7}" stroke="#0369a1" stroke-width="1.6"/><line x1="${x2}" y1="${y-7}" x2="${x2}" y2="${y+7}" stroke="#0369a1" stroke-width="1.6"/>`+pill(px,y,t,'#0369a1',0,'kOn0')+`</g>`}
function flow(x1,x2,y,rep){return `<line class="kFlow ${rep?'kRep':'kAtt'}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${rep?'#dc2626':'#2563eb'}" stroke-width="2" stroke-dasharray="4 9" opacity=".55"/>`}
function svg(w,h,body,cls){return `<svg class="kSvg ${cls||''}" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">${body}</svg>`}
/* ---------- المشاهد ---------- */
/* شحنتان: F₁ على q₁ و F₂ على q₂ */
function pair(o){const W=640,H=300,FY=196,y=128,R=34,x1=170,x2=470,rep=o.s1===o.s2,L=92;
  let b=stage(W,H,FY);
  b+=flow(x1+R+6,x2-R-6,y,rep);
  b+=sphere(x1,y,R,o.s1,FY)+sphere(x2,y,R,o.s2,FY);
  b+=lbl(x1,y-R-16,o.l1,o.s1==='+'?'#b91c1c':'#1d4ed8',19)+lbl(x2,y-R-16,o.l2,o.s2==='+'?'#b91c1c':'#1d4ed8',19);
  if(rep){b+=arrow(x1-R-6,x1-R-6-L,y,'F',.1)+arrow(x2+R+6,x2+R+6+L,y,'F',.35);b+=pill(x1-R-50,y+36,o.one?'F':'F₁','#b45309',.2)+pill(x2+R+50,y+36,o.one?'F':'F₂','#b45309',.45)}/* المدرب 8 نوفمبر: o.one يكتب F على السهمين */
  else{b+=arrow(x1+R+6,x1+R+6+L*.8,y,'F',.1)+arrow(x2-R-6,x2-R-6-L*.8,y,'F',.35);b+=pill(x1+R+44,y+36,'F₁','#b45309',.2)+pill(x2-R-44,y+36,'F₂','#b45309',.45)}
  if(o.r)b+=dim(x1,x2,FY+44,o.r);
  if(o.F)b+=pill(W/2,40,o.F,'#b45309',.7);
  b+=`<g class="kPl" style="--d:.8s"><rect x="${W/2-46}" y="${o.F?62:30}" width="92" height="26" rx="13" fill="${rep?'#7f1d1d':'#1e3a8a'}" opacity=".9"/><text x="${W/2}" y="${o.F?80:48}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">${rep?'تنافر':'تجاذب'}</text></g>`;
  return svg(W,H,b,o.cls)}
/* ثلاث شحنات على خط واحد: القوى على q₂ والقوة الكلية */
function three(){const W=700,H=380,FY=200,y=122,R=30,X1=80,X2=280,X3=680-80;
  let b=stage(W,H,FY);
  b+=flow(X1+R+4,X2-R-4,y,false)+flow(X2+R+4,X3-R-4,y,false);
  b+=sphere(X1,y,R,'+',FY)+sphere(X2,y,R,'-',FY)+sphere(X3,y,R,'+',FY);
  b+=lbl(X1,y-R-34,'q₁','#b91c1c',19)+lbl(X1,y-R-12,'+4 µC','#b91c1c',16)+lbl(X2,y-R-34,'q₂','#1d4ed8',19)+lbl(X2,y-R-12,'−5 µC','#1d4ed8',16)+lbl(X3,y-R-34,'q₃','#b91c1c',19)+lbl(X3,y-R-12,'+6 µC','#b91c1c',16);
  b+=arrow(X2-R-5,X2-R-5-96,y,'F',.1)+pill(X2-R-56,y+40,'F₁₂ = 0.045 N','#b45309',.25);
  b+=arrow(X2+R+5,X2+R+5+44,y,'F',.45)+pill(X2+R+110,y+40,'F₂₃ = 0.017 N','#b45309',.6);
  b+=arrow(X1+R+5,X1+R+5+30,y,'F',.3,7)+arrow(X3-R-5,X3-R-5-40,y,'F',.6,7);
  b+=dim(X1,X2,FY+40,'2 m')+dim(X2,X3,FY+40,'4 m');
  b+=`<g class="kTot">`+arrow(X2-20,X2-160,FY+100,'R',1.1,15)+sphere(X2,FY+100,18,'-',FY+120).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+lbl(X2,FY+75,'q₂','#1d4ed8',16)+pill(X2-90,FY+140,'Fₜₒₜₐₗ = 0.028 N','#7e22ce',1.3)+`</g>`;
  return svg(W,H,b,'kThree')}
/* الذرة: نواة من بروتونات ونيوترونات وإلكترونات تدور */
function atom(){const W=640,H=300,cx=320,cy=150;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  for(let i=0;i<30;i++)b+=`<circle cx="${(i*131)%W}" cy="${(i*71)%H}" r="${i%3?0.8:1.3}" fill="#9fb6ff" opacity=".35"/>`;
  [[0,'#5eead4'],[50,'#fcd34d'],[-50,'#c4b5fd']].forEach(([a,c],i)=>{b+=`<g transform="rotate(${a} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="170" ry="52" fill="none" stroke="${c}" stroke-width="2" opacity=".55"/><g class="kOrb" style="--t:${5+i*1.3}s;--o:${i*.33}"><circle r="10" fill="url(#kc-sN)"><animateMotion dur="${5+i*1.3}s" repeatCount="indefinite" begin="${-i*1.7}s" path="M${cx+170},${cy} a170,52 0 1,1 -340,0 a170,52 0 1,1 340,0"/></circle></g></g>`});
  const nuc=[[0,0,'+'],[16,-8,'Z'],[-15,-9,'+'],[8,15,'Z'],[-10,14,'+'],[20,10,'Z'],[-22,6,'Z'],[2,-20,'+']];
  b+=`<circle cx="${cx}" cy="${cy}" r="48" fill="url(#kc-gP)"/>`;
  nuc.sort((a,b2)=>a[1]-b2[1]).forEach(([dx,dy,s])=>{b+=sphere(cx+dx,cy+dy,13,s==='Z'?'0':s,cy+dy+6).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  b+=`<text x="${cx}" y="${cy+70}" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3a5f">النواة</text>`;
  b+=`<g transform="translate(30,${H-66})">`+sphere(14,0,11,'+',9).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`<text x="32" y="5" font-size="15" font-weight="800" fill="#b91c1c" text-anchor="start" direction="ltr">+ بروتون</text>`+sphere(14,26,11,'0',35).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`<text x="32" y="31" font-size="15" font-weight="800" fill="#475569" text-anchor="start" direction="ltr">0 نيوترون</text></g>`;
  b+=`<g transform="translate(${W-160},${H-40})"><circle cx="14" cy="0" r="10" fill="url(#kc-sN)"/><text x="32" y="5" font-size="15" font-weight="800" fill="#1d4ed8" text-anchor="start" direction="ltr">− إلكترون</text></g>`;
  return svg(W,H,b,'kAuto kAtom')}
/* الشحن بالدلك: انتقال الإلكترونات من الصوف إلى البلاستيك */
function rubFig(){const W=640,H=290;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<text x="${W/2}" y="34" text-anchor="middle" font-size="17" font-weight="800" fill="#1e3a5f">انتقال الإلكترونات من الصوف إلى البلاستيك</text>`;
  b+=`<rect x="390" y="72" width="210" height="130" rx="26" fill="#f3e3c3" stroke="#d6b98a" stroke-width="2"/>`;
  for(let i=0;i<7;i++)b+=`<path d="M${404+i*28} 92 q8 10 0 20 q-8 10 0 20 q8 10 0 20 q-8 10 0 20" fill="none" stroke="#e2c99a" stroke-width="3"/>`;
  [[430,110],[500,96],[560,124],[455,170],[530,165]].forEach(([x,y])=>{b+=sphere(x,y,12,'+',y+5).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  b+=`<defs><linearGradient id="kc-ruler" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset="1" stop-color="#7c3aed"/></linearGradient></defs>`;
  b+=`<rect x="40" y="112" width="290" height="50" rx="10" fill="url(#kc-ruler)" stroke="#5b21b6" stroke-width="2"/>`;
  for(let i=0;i<14;i++)b+=`<line x1="${58+i*20}" y1="112" x2="${58+i*20}" y2="${i%2?124:130}" stroke="#ede9fe" stroke-width="2"/>`;
  [[90,145],[150,145],[210,145],[270,145]].forEach(([x,y])=>{b+=sphere(x,y,11,'-',y+5).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  [[100,'.0s'],[150,'.7s'],[200,'1.4s']].forEach(([y,d],i)=>{const yy=96+i*28;b+=`<line x1="384" y1="${yy}" x2="346" y2="${yy}" stroke="#f59e0b" stroke-width="4"/><polygon points="336,${yy} 348,${yy-7} 348,${yy+7}" fill="#f59e0b"/><circle cx="380" cy="${yy}" r="8" fill="url(#kc-sN)"><animate attributeName="cx" from="380" to="344" dur="1.6s" begin="${d}" repeatCount="indefinite"/><animate attributeName="cy" from="${yy}" to="${yy}" dur="1.6s" repeatCount="indefinite"/></circle>`});
  b+=`<text x="495" y="232" text-anchor="middle" font-size="16" font-weight="800" fill="#b91c1c">الصوف يفقد إلكترونات</text><text x="495" y="258" text-anchor="middle" font-size="15" font-weight="700" fill="#b91c1c">فيصبح موجبا</text>`;
  b+=`<text x="185" y="232" text-anchor="middle" font-size="16" font-weight="800" fill="#1d4ed8">البلاستيك يكتسب إلكترونات</text><text x="185" y="258" text-anchor="middle" font-size="15" font-weight="700" fill="#1d4ed8">فيصبح سالبا</text>`;
  return svg(W,H,b,'kRub')}
/* الشحن باللمس والحث */
const kMetal=`<defs><radialGradient id="kc-metal" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#d7dde6"/><stop offset=".8" stop-color="#8a96a8"/><stop offset="1" stop-color="#4b5563"/></radialGradient></defs>`;
const kEl=(x,y,s)=>sphere(x,y,11,s,y+4).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'');
const kLeg=(x,y)=>kEl(x,y,'+')+`<text x="${x+18}" y="${y+5}" font-size="13" font-weight="800" fill="#b91c1c" text-anchor="start" direction="ltr">شحنة موجبة</text>`+kEl(x,y+28,'-')+`<text x="${x+18}" y="${y+33}" font-size="13" font-weight="800" fill="#1d4ed8" text-anchor="start" direction="ltr">شحنة سالبة</text>`;
const kBall=(x,y,r,pts)=>`<line x1="${x}" y1="${y+r}" x2="${x}" y2="${y+r+26}" stroke="#64748b" stroke-width="5"/><rect x="${x-22}" y="${y+r+24}" width="44" height="7" rx="3" fill="#475569"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#kc-metal)" stroke="#64748b" stroke-width="1.5"/>`+pts.map(([dx,dy,g])=>kEl(x+dx,y+dy,g)).join('');
/* مشهد متحرك: الشحن بالدلك (دورة 10 ثوان): قبل الدلك متعادلان ← الدلك وانتقال الإلكترونات ← بعد الدلك موجب وسالب */
function rubScene(){const W=640,H=436,D=10,T=60,KT=(a)=>a.map(x=>(x/D).toFixed(3)).join(';');
  const fade=(t0,t1)=>`<animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${KT([0,t0,t0+.4,t1,t1+.3,D])}" values="0;0;1;1;0;0"/>`;
  const Q=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="11" fill="${c=='+'?'#dc2626':'#2563eb'}" stroke="#fff" stroke-width="2.2"/><path d="${c=='+'?'M-6 0H6M0 -6V6':'M-6 0H6'}" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>`;
  const show=(t0,t1,inner)=>`<g opacity="0">${fade(t0,t1)}${inner}</g>`;
  /* لقطتان واقعيتان: قبل/بعد الدلك، وأثناء الدلك */
  let b=`<rect width="${W}" height="${H}" fill="#f8fafc"/><g transform="translate(0 ${T})"><image href="k-rub0.webp?v=1" x="0" y="0" width="${W}" height="320"/>`;
  b+=`<clipPath id="kr-clip"><rect width="${W}" height="320"/></clipPath><g clip-path="url(#kr-clip)" opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${KT([0,1.4,1.8,6.0,6.4,D])}" values="0;0;1;1;0;0"/>`+
     `<g><animateTransform attributeName="transform" type="translate" dur="0.5s" repeatCount="indefinite" values="0 0;-4 1;0 0;4 -1;0 0"/><image href="k-rub1.webp?v=1" x="-6" y="0" width="${W+12}" height="320" preserveAspectRatio="xMidYMid slice"/></g></g>`;
  /* العناوين الثلاثة */
  /*rubTxt: المدرب 9 نوفمبر: أشرطة مشهد الدلك بشكل البطاقات وكتابة أكبر*/const cap=(t,c,t0,t1)=>`<g opacity="0">${fade(t0,t1)}<rect x="12" y="328" width="${W-24}" height="44" rx="14" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${W/2}" y="358" text-anchor="middle" font-size="${Math.min(23,Math.floor(580/(t.length*.54)))}" font-weight="800" fill="${c}">${t}</text></g>`;
  b+=cap('1. قبل الدلك: الجسمان متعادلان','#475569',0,1.6)+cap('2. الدلك: تنتقل الإلكترونات من الصوف','#b45309',1.6,6.2)+cap('3. بعد الدلك: الصوف موجب، والبلاستيك سالب','#7e22ce',6.2,9.7);
  /* قبل الدلك: أزواج متعادلة على البلاستيك والصوف */
  const rodP=[[225,136],[270,102],[315,68]],woolP=[[425,130],[445,190],[420,245]];const PR=(x,y)=>Q(x-10,y+7.5,'+')+Q(x+10,y-7.5,'-');
  let n='';rodP.forEach(([x,y])=>{n+=PR(x,y)});woolP.forEach(([x,y])=>{n+=Q(x-12,y,'+')+Q(x+12,y,'-')});
  const pill=(x,y,t,c,w)=>{w=Math.min(W-24,w*1.3);const fs=Math.min(20,Math.floor((w-24)/(t.length*.54)));return `<rect x="${Math.max(12,Math.min(W-12-w,x-w/2))}" y="${y-20}" width="${w}" height="40" rx="13" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${Math.max(12+w/2,Math.min(W-12-w/2,x))}" y="${y+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${c}">${t}</text>`};
  b+=show(0.1,1.5,n+pill(215,30-T,'البلاستيك: متعادل','#475569',160)+pill(450,30-T,'الصوف: متعادل','#475569',140));
  /* أثناء الدلك: إلكترونات تنتقل من الصوف إلى البلاستيك */
  [[2.4,[335,128],[292,174]],[3.4,[338,172],[262,186]],[4.4,[470,120],[545,70]]].forEach(([t,[x0,y0],[x1,y1]])=>{
    b+=`<g opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${KT([0,t,t+.15,6.0,6.3,D])}" values="0;0;1;1;0;0"/><g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${KT([0,t,t+1.1,D])}" values="${x0} ${y0};${x0} ${y0};${x1} ${y1};${x1} ${y1}"/>${Q(0,0,'-')}</g></g>`});
  b+=show(2.2,6.0,pill(W/2,30-T,'الإلكترونات السالبة تنتقل من الصوف إلى البلاستيك ←','#b45309',400));
  /* بعد الدلك: البلاستيك فيه إلكترونات زائدة، والصوف فقد إلكترونات */
  let a='';rodP.forEach(([x,y])=>{a+=PR(x,y)});
  [[214,165],[259,131],[304,97]].forEach(([x,y])=>{a+=Q(x,y,'-')});
  woolP.forEach(([x,y])=>{a+=Q(x,y,'+')});
  a+=pill(215,30-T,'البلاستيك: سالب −','#1d4ed8',160)+pill(450,30-T,'الصوف: موجب +','#b91c1c',140);
  b+=show(6.4,9.7,a);
  b+=`<line x1="0" y1="-1" x2="${W}" y2="-1" stroke="#cbd5e1"/><line x1="0" y1="320.5" x2="${W}" y2="320.5" stroke="#cbd5e1"/></g>`;
  return svg(W,H,b,'kRub kScene')}

/* ===== مشاهد متحركة للدرس النموذجي 3-1 (SVG SMIL، تتكرر تلقائيا) ===== */
const scK=(D,a)=>a.map(x=>Math.min(1,Math.max(0,x/D)).toFixed(4)).join(';');
/* تحريك مجموعة عبر نقاط زمنية [[t,x,y],...] */
const scMove=(D,P,inner)=>{const T=[0].concat(P.map(p=>p[0])).concat([D]),V=[P[0]].concat(P).concat([P[P.length-1]]);
  return `<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,T)}" values="${V.map(p=>p[1]+' '+p[2]).join(';')}"/>${inner}</g>`};
/* ظهور واختفاء: يظهر بين t0 و t1 */
const scShow=(D,t0,t1,inner,soft)=>soft?`<g opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t0+.35,t1,Math.min(D,t1+.3),D])}" values="0;0;1;1;0;0"/>${inner}</g>`
  :`<g opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" calcMode="discrete" keyTimes="${scK(D,[0,t0,t1,D])}" values="0;1;0;0"/>${inner}</g>`;
const scCap=(D,W,t,c,t0,t1)=>scShow(D,t0,t1,`<rect x="${W/2-250}" y="10" width="500" height="38" rx="19" fill="${c}"/><text x="${W/2}" y="36" text-anchor="middle" font-size="17.5" font-weight="800" fill="#fff">${t}</text>`,true);
/* سهم قوة يتغير طوله: يبدأ من (x,y) باتجاه dir، والأطوال L[i] عند الأزمنة T[i] */
const scArrow=(D,x,y,dir,T,L,col)=>{col=col||'#f59e0b';const th=11,hl=20;
  const shape=`<polygon points="0,${-th/2} 80,${-th/2} 80,${-th} 100,0 80,${th} 80,${th/2} 0,${th/2}" fill="${col}" stroke="#78350f" stroke-width="1.2"/>`;
  const TT=[0].concat(T).concat([D]),LL=[L[0]].concat(L).concat([L[L.length-1]]);
  return `<g transform="translate(${x} ${y}) scale(${dir} 1)"><g><animateTransform attributeName="transform" type="scale" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,TT)}" values="${LL.map(l=>(l/100).toFixed(3)+' 1').join(';')}"/>${shape}</g></g>`};
const scTag=(x,y,t,c,w)=>{const k=TS;w=(w||t.length*9+28)*k;return `<rect x="${f1(x-w/2)}" y="${f1(y-15*k)}" width="${f1(w)}" height="${f1(30*k)}" rx="${f1(15*k)}" fill="${c}"/><text x="${x}" y="${f1(y+6*k)}" text-anchor="middle" font-size="${f1(15*k)}" font-weight="800" fill="#fff" direction="ltr">${t}</text>`};

/* 1) الشحن باللمس (التوصيل) */
function touchScene(){const W=640,H=436,D=10,T=60;
  const Q=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="8.5" fill="${c=='+'?'#dc2626':'#2563eb'}" stroke="#fff" stroke-width="1.8"/><path d="${c=='+'?'M-4.5 0H4.5M0 -4.5V4.5':'M-4.5 0H4.5'}" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>`;
  /*touchTxt2*/const pill=(x,y,t,c,w)=>{w=Math.min(W-24,w);const fs=Math.min(21,Math.floor((w-24)/(t.length*.54)));return `<rect x="${Math.max(12,Math.min(W-12-w,x-w/2))}" y="${y-20}" width="${w}" height="40" rx="13" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${Math.max(12+w/2,Math.min(W-12-w/2,x))}" y="${y+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${c}">${t}</text>`};
  /* تفتيح الكرات المعدنية حتى تتضح الشحنات عليها */
  const lite=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#kt-lite)"/>`;
  let b=`<defs><radialGradient id="kt-lite" cx=".42" cy=".38" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".78"/><stop offset=".75" stop-color="#f1f5f9" stop-opacity=".62"/><stop offset="1" stop-color="#e2e8f0" stop-opacity=".35"/></radialGradient></defs>`;
  /* لقطتان واقعيتان: الكرتان متباعدتان، والكرتان متلامستان */
  b+=`<rect width="${W}" height="${H}" fill="#f8fafc"/><g transform="translate(0 ${T})"><image href="k-touch0.webp?v=1" x="0" y="0" width="${W}" height="320"/>`+lite(105,81,51)+lite(539,81,51);
  b+=`<g opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,2.0,2.4,5.8,6.2,D])}" values="0;0;1;1;0;0"/><image href="k-touch1.webp?v=1" x="0" y="0" width="${W}" height="320"/>${lite(259,75,58)+lite(380,75,58)}</g>`;
  /* العناوين أسفل المشهد حتى لا تغطي الكرات */
  const cap=(t,c,t0,t1)=>scShow(D,t0,t1,pill(W/2,348,t,c,470),true);
  b+=cap('1. قبل التلامس: موصل مشحون وموصل متعادل','#475569',0,2.2)+cap('2. التلامس: تنتقل بعض الإلكترونات','#b45309',2.2,6)+cap('3. بعد الفصل: يتقاسمان الشحنة، وكلاهما سالب','#7e22ce',6,9.7);
  /* اثنا عشر إلكترونا زائدا على الكرة المشحونة */
  const stay=[[10,-30],[10,-10],[30,-10],[10,10],[30,10],[10,30]],move=[[-10,-30],[-30,-10],[-10,-10],[-30,10],[-10,10],[-10,30]];
  const dst=[[-10,-30],[-30,-10],[-10,-10],[-30,10],[-10,10],[-10,30]];
  const at=(cx,cy,P)=>P.map(([x,y])=>Q(cx+x,cy+y,'-')).join('');
  b+=scShow(D,0,2.1,at(539,81,stay.concat(move))+pill(105,30-T,'متعادل','#475569',90)+pill(520,30-T,'مشحون: 12 إلكترونا زائدا','#1d4ed8',210),true);
  /* أثناء التلامس: ستة تبقى، وستة تنتقل إلى الكرة اليسرى واحدا بعد الآخر */
  b+=scShow(D,2.3,5.9,at(380,75,stay)+pill(320,30-T,'تلامس ↓','#b45309',90),true);
  move.forEach(([x0,y0],k)=>{const t=2.8+k*.45,[x1,y1]=dst[k];
    b+=scShow(D,2.3,5.9,scMove(D,[[t,380+x0,75+y0],[t+.6,259+x1,75+y1]],Q(0,0,'-')),true)});
  /* بعد الفصل: ستة إلكترونات زائدة في كل كرة */
  b+=scShow(D,6.2,9.7,at(105,81,dst)+at(539,81,stay)+pill(105,30-T,'6 إلكترونات زائدة','#1d4ed8',150)+pill(539,30-T,'6 إلكترونات زائدة','#1d4ed8',150),true);
  b+=`<line x1="0" y1="-1" x2="${W}" y2="-1" stroke="#cbd5e1"/><line x1="0" y1="320.5" x2="${W}" y2="320.5" stroke="#cbd5e1"/></g>`;
  return svg(W,H,b,'kTouch kScene')}

/* 2) الشحن بالحث (التأثير) */
function inductScene(){const W=640,H=436,D=14,T=60;
  const Q=(x,y,c)=>`<g transform="translate(${x} ${y})"><circle r="8.5" fill="${c=='+'?'#dc2626':'#2563eb'}" stroke="#fff" stroke-width="1.8"/><path d="${c=='+'?'M-4.5 0H4.5M0 -4.5V4.5':'M-4.5 0H4.5'}" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></g>`;
  /*touchTxt: المدرب 9 نوفمبر: أشرطة مشهدي اللمس والحث بشكل البطاقات*/const pill=(x,y,t,c,w)=>{w=Math.min(W-24,w);const fs=Math.min(21,Math.floor((w-24)/(t.length*.54)));return `<rect x="${Math.max(12,Math.min(W-12-w,x-w/2))}" y="${y-20}" width="${w}" height="40" rx="13" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${Math.max(12+w/2,Math.min(W-12-w/2,x))}" y="${y+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${c}">${t}</text>`};
  const lite=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#ki-lite)"/>`;
  const vis=(K,V)=>`<animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,K)}" values="${V}"/>`;
  /* ثلاث لقطات واقعية: الموصل وحده، تقريب الجسم السالب، التوصيل بالأرض */
  let b=`<defs><radialGradient id="ki-lite" cx=".42" cy=".38" r=".62"><stop offset="0" stop-color="#fff" stop-opacity=".78"/><stop offset=".75" stop-color="#f1f5f9" stop-opacity=".62"/><stop offset="1" stop-color="#e2e8f0" stop-opacity=".35"/></radialGradient></defs>`;
  b+=`<rect width="${W}" height="${H}" fill="#f8fafc"/><g transform="translate(0 ${T})"><image href="k-ind0.webp?v=1" x="0" y="0" width="${W}" height="320"/>${lite(455,69,61)}`;
  b+=`<g opacity="0">${vis([0,1.9,2.2,4.5,4.7,7.7,7.9,9.0,9.3,D],'0;0;1;1;0;0;1;1;0;0')}<image href="k-ind1.webp?v=1" x="0" y="0" width="${W}" height="320"/>${lite(456,69,62)}</g>`;
  b+=`<g opacity="0">${vis([0,4.5,4.7,7.7,7.9,D],'0;0;1;1;0;0')}<image href="k-ind2.webp?v=1" x="0" y="0" width="${W}" height="320"/>${lite(446,70,63)}</g>`;
  /* الشحنات الموجبة ثابتة، ثم تنتشر بعد إبعاد الجسم */
  const P=[[-29,-26],[11,-26],[-29,0],[11,0],[-29,26],[11,26]],S=[[0,-36],[31,-18],[31,18],[0,36],[-31,18],[-31,-18]];
  P.forEach(([x,y],i)=>{b+=scMove(D,[[0,455+x,69+y],[4.5,456+x,69+y],[4.7,446+x,70+y],[7.7,446+x,70+y],[7.9,456+x,69+y],[10.4,456+x,69+y],[11.4,455+S[i][0],69+S[i][1]]],Q(0,0,'+'))});
  /* الإلكترونات: تبتعد عن الجسم السالب، ثم تهرب عبر سلك الأرض */
  const N=[[-11,-26],[29,-26],[-11,0],[29,0],[-11,26],[29,26]],TG=[[24,-40],[38,-26],[44,-8],[44,10],[38,28],[24,42]];
  const WP=[[.25,517,90],[.45,538,125],[.62,536,165],[.78,540,205],[.9,560,218],[1.0,598,218],[1.15,600,282]];
  N.forEach(([x,y],i)=>{const t=4.9+i*.35,[tx,ty]=TG[i];
    const pts=[[0,455+x,69+y],[2.2,456+x,69+y],[3.4,456+tx,69+ty],[4.5,456+tx,69+ty],[4.7,446+tx,70+ty],[t,446+tx,70+ty]].concat(WP.map(([d,px,py])=>[t+d,px,py]));
    b+=scShow(D,0,t+1.2,scMove(D,pts,Q(0,0,'-')))});
  /* شحنات الجسم السالب على القضيب */
  b+=scShow(D,2.1,9.1,Q(285,82,'-')+Q(318,82,'-')+Q(351,82,'-'),true);
  /* الشريط العلوي: الأسماء */
  b+=scShow(D,0,1.9,pill(455,30-T,'موصل متعادل','#475569',130),true);
  b+=scShow(D,2.1,9.1,pill(170,30-T,'جسم مشحون سالب','#1d4ed8',150),true);
  b+=scShow(D,2.4,4.5,pill(455,30-T,'الإلكترونات تبتعد','#b45309',140),true);
  b+=scShow(D,4.7,7.7,pill(470,30-T,'سلك الأرض','#0369a1',110)+pill(590,30-T,'الأرض','#334155',80),true);
  b+=scShow(D,10.4,13.7,pill(455,30-T,'موجب +','#b91c1c',100),true);
  /* الشريط السفلي: عناوين المراحل */
  const cap=(t,c,t0,t1)=>scShow(D,t0,t1,pill(W/2,348,t,c,500),true);
  b+=cap('1. موصل متعادل: موجباته تساوي سوالبه','#475569',0,2)+cap('2. نقرب جسما سالبا دون لمس: تبتعد الإلكترونات','#b45309',2,4.6)+cap('3. نوصل الموصل بالأرض: تهرب الإلكترونات إليها','#0369a1',4.6,7.8)+cap('4. نفصل الأرض أولا، ثم نبعد الجسم السالب','#475569',7.8,10.2)+cap('5. النتيجة: يبقى الموصل مشحونا بشحنة موجبة','#7e22ce',10.2,13.7);
  b+=`<line x1="0" y1="-1" x2="${W}" y2="-1" stroke="#cbd5e1"/><line x1="0" y1="320.5" x2="${W}" y2="320.5" stroke="#cbd5e1"/></g>`;
  return svg(W,H,b,'kInd kScene')}

/* 3) تصنيف المواد: حركة الإلكترونات في الموصل وشبه الموصل والعازل */
function matScene(){const W=640,H=330,D=6;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<defs><linearGradient id="sc-cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdba74"/><stop offset="1" stop-color="#c2410c"/></linearGradient><linearGradient id="sc-si" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#475569"/></linearGradient><linearGradient id="sc-pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs>`;
  const row=(y,fill,ar,en,ex,col,mode)=>{let g=`<rect x="40" y="${y}" width="400" height="56" rx="12" fill="url(#${fill})" stroke="rgba(0,0,0,.25)" stroke-width="1.5"/>`;
    for(let i=0;i<8;i++)g+=`<circle cx="${68+i*50}" cy="${y+28}" r="9" fill="#fff" opacity=".35"/><text x="${68+i*50}" y="${y+33}" text-anchor="middle" font-size="13" font-weight="900" fill="#fff" opacity=".9">+</text>`;
    const n=mode==='free'?6:mode==='slow'?3:6;
    for(let i=0;i<n;i++){const y0=y+(i%2?16:40);
      if(mode==='free'||mode==='slow'){const dur=mode==='free'?2.4:6,beg=-(i*(dur/n));g+=`<g><animateTransform attributeName="transform" type="translate" dur="${dur}s" repeatCount="indefinite" begin="${beg.toFixed(2)}s" values="52 ${y0};428 ${y0}"/>${kEl(0,0,'-')}</g>`}
      else{const x0=93+i*60;g+=`<g transform="translate(${x0} ${y0})"><animateTransform attributeName="transform" type="translate" additive="sum" dur="${.5+i*.07}s" repeatCount="indefinite" values="0 0;3 -2;-3 2;0 0"/>${kEl(0,0,'-')}</g>`}}
    g+=`<text x="560" y="${y+24}" text-anchor="middle" font-size="17" font-weight="900" fill="${col}">${ar}</text><text x="560" y="${y+44}" text-anchor="middle" font-size="13.5" font-weight="700" fill="#475569" direction="ltr">${en}</text><text x="560" y="${y+62}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#64748b">${ex}</text>`;
    return g};
  b+=row(26,'sc-cu','موصل','Conductor','نحاس، حديد، ألومنيوم','#c2410c','free');
  b+=row(126,'sc-si','شبه موصل','Semiconductor','سيليكون، جرمانيوم','#334155','slow');
  b+=row(226,'sc-pl','عازل','Insulator','زجاج، بلاستيك، خشب','#6d28d9','fixed');
  b+=`<text x="240" y="318" text-anchor="middle" font-size="13.5" font-weight="800" fill="#1e3a5f">الإلكترونات: حرة في الموصل، وقليلة الحركة في شبه الموصل، ومقيدة في العازل</text>`;
  return svg(W,H,b,'kMat kScene')}

/* 4) قانون كولوم: أثر المسافة وأثر مقدار الشحنة */
function lawScene(){const W=640,H=362,D=15,Y=150,R=30,X1=230;let b=stage(W,H,Y+R+44)+kBand(W,56,302);
  b+=kPill(D,W/2,331,'المسافة r: القوة F بين الشحنتين','#0B7A70',470,0,3)+kPill(D,W/2,331,'نضاعف المسافة إلى 2r: تقل القوة إلى الربع','#b45309',470,3,7.4)+kPill(D,W/2,331,'نضاعف إحدى الشحنتين إلى 2q: تتضاعف القوة','#7e22ce',470,7.4,14.7);
  const XR=[[0,370],[3.4,370],[4.6,510],[7,510],[8,370]];
  /* الشحنة الأولى: تكبر عند مضاعفتها */
  b+=`<g transform="translate(${X1} ${Y})"><g><animateTransform attributeName="transform" type="scale" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,8.6,9.4,14.6,D])}" values="1;1;1.28;1.28;1"/>${sphere(0,0,R,'+',R+38)}</g></g>`;
  b+=scMove(D,XR.map(([t,x])=>[t,x,0]),sphere(0,Y,R,'+',Y+R+38));
  /* الأسهم: الطول 90 ثم ربعه ثم 90 ثم ضعفه */
  const TL=[3.4,4.8,7,8,8.8,9.8],LL=[70,17.5,17.5,70,70,140];
  b+=scArrow(D,X1-R-6,Y,-1,TL,LL);
  b+=scMove(D,XR.map(([t,x])=>[t,x+R+6,Y]),scArrow(D,0,0,1,TL,LL));
  /* البعد r ثم 2r */
  b+=scShow(D,0,4,`<line x1="${X1}" y1="${Y+R+60}" x2="370" y2="${Y+R+60}" stroke="#0369a1" stroke-width="2" stroke-dasharray="5 4"/>`+scTag((X1+370)/2,Y+R+60,'r','#0369a1',40),true);
  b+=scShow(D,4.6,7.4,`<line x1="${X1}" y1="${Y+R+60}" x2="510" y2="${Y+R+60}" stroke="#0369a1" stroke-width="2" stroke-dasharray="5 4"/>`+scTag((X1+510)/2,Y+R+60,'2r','#0369a1',50),true);
  b+=scShow(D,8.2,14.7,`<line x1="${X1}" y1="${Y+R+60}" x2="370" y2="${Y+R+60}" stroke="#0369a1" stroke-width="2" stroke-dasharray="5 4"/>`+scTag((X1+370)/2,Y+R+60,'r','#0369a1',40),true);
  /* أسماء الشحنات والقوة */
  b+=scShow(D,0,8.8,lbl(X1,Y-R-14,'q','#b91c1c',19),true)+scShow(D,8.8,14.7,lbl(X1,Y-R-22,'2q','#b91c1c',20),true);
  b+=scShow(D,0,3.4,scTag(W/2,78,'F','#b45309',60),true)+scShow(D,4.8,7.4,scTag(W/2,78,'F ÷ 4','#b45309',90),true)+scShow(D,9.8,14.7,scTag(W/2,78,'2F','#7e22ce',70),true);
  b+=`<text x="${W/2}" y="35" text-anchor="middle" font-size="18" font-weight="800" fill="#0B7A70" direction="ltr">F = k·q₁·q₂ / r²</text>`;
  return svg(W,H,b,'kLawS kScene')}
/* 5) التنافر والتجاذب: الكرات تتحرك فعلا مع أسهم القوة */
function chargeScene(){const W=640,H=446,D=8,R=24;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`+kBand(W,56,386)+`<rect x="40" y="6" width="560" height="44" rx="14" fill="#fff" stroke="#334155" stroke-width="2.5"/><text x="${W/2}" y="36" text-anchor="middle" font-size="22" font-weight="800" fill="#334155">الشحنات المتشابهة تتنافر، والمختلفة تتجاذب</text>`+kPill(D,W/2,416,'لاحظ الأسهم: في التنافر تبتعدان، وفي التجاذب تقتربان','#475569',470,0,D)+'<g transform="translate(0 62)">';
  const ar=(dir,col)=>`<g transform="scale(${dir} 1)"><polygon points="0,-5 46,-5 46,-11 64,0 46,11 46,5 0,5" fill="${col}" stroke="#78350f" stroke-width="1.1"/></g>`;
  const ball=(s,dirA)=>sphere(0,0,R,s,R+4).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`<g transform="translate(${dirA*(R+4)} 0)">${ar(dirA,'#f59e0b')}</g>`;
  const row=(y,s1,s2,t)=>{const rep=s1===s2;
    const A=rep?[[0,250],[1,250],[3,190],[7.2,190],[7.8,250]]:[[0,170],[1,170],[3,225],[7.2,225],[7.8,170]];
    const Bx=rep?[[0,390],[1,390],[3,450],[7.2,450],[7.8,390]]:[[0,470],[1,470],[3,415],[7.2,415],[7.8,470]];
    let g=scMove(D,A.map(([tt,x])=>[tt,x,y]),ball(s1,rep?-1:1))+scMove(D,Bx.map(([tt,x])=>[tt,x,y]),ball(s2,rep?1:-1));
    return g+`<text x="${W/2}" y="${y-R-10}" text-anchor="middle" font-size="21" font-weight="800" fill="${rep?'#b91c1c':'#1d4ed8'}">${t}</text>`};
  b+=row(72,'+','+','متشابهتان موجبتان: تنافر، فتبتعدان')+row(172,'-','-','متشابهتان سالبتان: تنافر، فتبتعدان')+row(272,'+','-','مختلفتان: تجاذب، فتقتربان');
  b+='</g>';return svg(W,H,b,'kChg kScene')}

/* 6) الذرة تفقد إلكترونا فتصبح موجبة، وتكتسب إلكترونا فتصبح سالبة */
const kBand=(W,y0,y1)=>`<rect x="0" y="0" width="${W}" height="${y0}" fill="#f8fafc"/><line x1="0" y1="${y0}" x2="${W}" y2="${y0}" stroke="#cbd5e1"/><rect x="0" y="${y1}" width="${W}" height="60" fill="#f8fafc"/><line x1="0" y1="${y1}" x2="${W}" y2="${y1}" stroke="#cbd5e1"/>`;
/*scTxt: المدرب 9 نوفمبر: كتابة المشاهد أكبر وأشرطتها بشكل البطاقات (أبيض بإطار ملون)*/const kPill=(D,x,y,t,c,w,t0,t1)=>{w=Math.max(w,616);const fs=Math.min(22,Math.floor((w-36)/(String(t).length*.54)));return scShow(D,t0,t1,`<rect x="${x-w/2}" y="${y-21}" width="${w}" height="42" rx="14" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${x}" y="${y+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${c}">${t}</text>`,true)};
function ionScene(){const W=640,H=360,D=13,cx=320,cy=180,OR=96;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`+kBand(W,56,304);
  b+=kPill(D,W/2,332,'1. ذرة متعادلة: البروتونات = الإلكترونات','#475569',470,0,4)+kPill(D,W/2,332,'2. تفقد إلكترونا: تصبح موجبة','#b91c1c',470,4,8)+kPill(D,W/2,332,'3. تكتسب إلكترونا: تصبح سالبة','#1d4ed8',470,8,12.8);
  b+=`<circle cx="${cx}" cy="${cy}" r="${OR}" fill="none" stroke="#93c5fd" stroke-width="2" stroke-dasharray="6 5" opacity=".9"/>`;
  b+=`<circle cx="${cx}" cy="${cy}" r="36" fill="url(#kc-gP)"/>`;
  [[0,-12],[-13,9],[13,9]].forEach(([dx,dy])=>{b+=sphere(cx+dx,cy+dy,13,'+',cy+dy+6).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  const el=(x,y)=>kEl(x,y,'-');
  let orb=el(OR*Math.cos(2.094),OR*Math.sin(2.094))+el(OR*Math.cos(4.189),OR*Math.sin(4.189));
  /* الإلكترون الذي يغادر ثم يعود */
  /*ionIn: المدرب 9 نوفمبر: الإلكترون المغادر والداخل يبقيان داخل المشهد*/orb+=scMove(D,[[4,OR,0],[5.3,124,0],[8,124,0],[8.01,124,0],[9.3,OR,0]],el(0,0));
  /* إلكترون جديد يدخل */
  orb+=scShow(D,8,12.8,scMove(D,[[8,-124,0],[9.3,-OR,0]],el(0,0)));
  b+=`<g transform="translate(${cx} ${cy})"><g><animateTransform attributeName="transform" type="rotate" dur="9s" repeatCount="indefinite" values="0;360"/>${orb}</g></g>`;
  const tag=(t,c)=>`<rect x="${W/2-260}" y="6" width="520" height="44" rx="14" fill="#fff" stroke="${c}" stroke-width="2.5"/><text x="${W/2}" y="36" text-anchor="middle" font-size="22" font-weight="900" fill="${c}">${t}</text>`;
  b+=scShow(D,0,4,tag('3 بروتونات و3 إلكترونات: متعادلة 0','#475569'),true)+scShow(D,5.3,8,tag('3 بروتونات وإلكترونان: موجبة +','#b91c1c'),true)+scShow(D,9.3,12.8,tag('3 بروتونات و4 إلكترونات: سالبة −','#1d4ed8'),true);
  return svg(W,H,b,'kIon kScene')}

function touchFig(){const W=640,H=330;let b=kMetal+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const six=[[-24,-12,'-'],[0,-12,'-'],[24,-12,'-'],[-24,12,'-'],[0,12,'-'],[24,12,'-']],three=[[-14,-12,'-'],[14,-12,'-'],[0,14,'-']];
  b+=`<text x="${W/2}" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3a5f">قبل التلامس: موصل مشحون وموصل متعادل</text>`;
  b+=kBall(430,80,40,six)+kBall(210,80,40,[]);
  b+=`<text x="530" y="85" text-anchor="middle" font-size="14" font-weight="800" fill="#1d4ed8">مشحون</text><text x="110" y="85" text-anchor="middle" font-size="14" font-weight="800" fill="#475569">متعادل</text>`;
  b+=`<line x1="470" y1="148" x2="470" y2="176" stroke="#f59e0b" stroke-width="4"/><polygon points="470,186 462,174 478,174" fill="#f59e0b"/><line x1="170" y1="148" x2="170" y2="176" stroke="#f59e0b" stroke-width="4"/><polygon points="170,186 162,174 178,174" fill="#f59e0b"/><text x="320" y="172" font-size="14" font-weight="800" fill="#b45309" text-anchor="middle">نلامس بينهما ثم نبعدهما</text>`;
  b+=`<text x="${W/2}" y="208" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3a5f">بعد التلامس: يتقاسمان الشحنة</text>`;
  b+=kBall(430,258,40,three)+kBall(210,258,40,three);
  b+=kLeg(28,268);
  return svg(W,H,b,'kTouch')}
function inductFig(){const W=640,H=340;let b=kMetal+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const rod=(y)=>`<rect x="470" y="${y-14}" width="150" height="28" rx="12" fill="#a78bfa" stroke="#5b21b6" stroke-width="2"/>`+[500,540,580].map(x=>kEl(x,y,'-')).join('')+`<text x="545" y="${y+36}" text-anchor="middle" font-size="14" font-weight="800" fill="#5b21b6">جسم مشحون بشحنة سالبة</text><line x1="388" y1="${y}" x2="462" y2="${y}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4"/><text x="425" y="${y-10}" text-anchor="middle" font-size="12" font-weight="800" fill="#64748b">دون لمس</text>`;
  b+=`<text x="${W/2}" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3a5f">1) نقرب جسما مشحونا دون أن يلامس الموصل</text>`;
  b+=rod(90)+kBall(330,90,48,[[30,-18,'+'],[38,8,'+'],[26,30,'+'],[-30,-18,'-'],[-38,8,'-'],[-26,30,'-']]);
  b+=`<text x="150" y="96" text-anchor="middle" font-size="14" font-weight="800" fill="#475569">تتوزع الشحنات</text>`;
  b+=`<text x="${W/2}" y="196" text-anchor="middle" font-size="16" font-weight="800" fill="#1e3a5f">2) نوصل الموصل بالأرض فتهرب الإلكترونات إليها</text>`;
  b+=rod(258)+kBall(330,258,48,[[30,-18,'+'],[38,8,'+'],[26,30,'+']]);
  b+=`<polyline points="282,258 200,258 200,300" fill="none" stroke="#334155" stroke-width="3"/><line x1="180" y1="300" x2="220" y2="300" stroke="#334155" stroke-width="3"/><line x1="187" y1="308" x2="213" y2="308" stroke="#334155" stroke-width="3"/><line x1="194" y1="316" x2="206" y2="316" stroke="#334155" stroke-width="3"/>`;
  b+=kEl(240,258,'-')+`<polygon points="214,258 226,251 226,265" fill="#f59e0b"/><text x="110" y="262" text-anchor="middle" font-size="14" font-weight="800" fill="#b91c1c">يبقى موجبا</text>`;
  b+=kLeg(28,296);
  return svg(W,H,b,'kInduct')}
/* ميزان كولوم الالتوائي: رسم ثلاثي الأبعاد للجهاز المستخدم في المختبر */
function torsionFig(){const W=640,H=540,cx=320,lid=200,gb=430,R=172,ry=32;
  const g=(id,a,stops,dir)=>`<${a} id="${id}" ${dir||''}>${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</${a.split(' ')[0]}>`;
  let b=`<defs>`+
  g('tq-bg','radialGradient',[[0,'#ffffff'],[1,'#e2eaf4']],'cx="50%" cy="40%" r="75%"')+
  g('tq-wood','linearGradient',[[0,'#6b1414'],[.5,'#9f2a22'],[1,'#5a0f0f']],'x1="0" x2="1"')+
  g('tq-woodtop','radialGradient',[[0,'#c2483c'],[1,'#8e2219']],'cx="50%" cy="40%" r="70%"')+
  g('tq-black','linearGradient',[[0,'#0f0f10'],[.45,'#4b4b4f'],[.55,'#2a2a2d'],[1,'#050505']],'x1="0" x2="1"')+
  g('tq-plate','radialGradient',[[0,'#f3e6a3'],[1,'#c9b25a']],'cx="45%" cy="40%" r="70%"')+
  g('tq-glass','linearGradient',[[0,'#94a3b8',.45],[.1,'#e2e8f0',.18],[.5,'#ffffff',.04],[.9,'#e2e8f0',.18],[1,'#94a3b8',.5]],'x1="0" x2="1"')+
  g('tq-shine','linearGradient',[[0,'#fff',0],[.5,'#fff',.9],[1,'#fff',0]],'x1="0" x2="1"')+
  g('tq-brass','linearGradient',[[0,'#7a4b08'],[.35,'#f8dc8a'],[.6,'#d9a238'],[1,'#6b3f08']],'x1="0" x2="1"')+
  g('tq-steel','linearGradient',[[0,'#475569'],[.4,'#f1f5f9'],[.6,'#cbd5e1'],[1,'#334155']],'x1="0" x2="1"')+
  g('tq-silv','radialGradient',[[0,'#ffffff'],[.35,'#d6dde6'],[.8,'#7b8794'],[1,'#3b4450']],'cx="35%" cy="30%" r="75%"')+
  g('tq-blk','radialGradient',[[0,'#8a8f98'],[.3,'#2f3238'],[1,'#050506']],'cx="35%" cy="30%" r="75%"')+
  g('tq-gold','radialGradient',[[0,'#fff6d6'],[.35,'#f4c955'],[1,'#7a4b08']],'cx="35%" cy="30%" r="75%"')+
  `<filter id="tq-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter></defs><rect width="${W}" height="${H}" fill="url(#tq-bg)"/>`;
  const ball=(x,y,r,f)=>`<ellipse cx="${x+3}" cy="${y+r+4}" rx="${r}" ry="${r*.3}" fill="#000" opacity=".12" filter="url(#tq-blur)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${f})"/>`;
  /* الرجل والقاعدة الحمراء */
  b+=`<ellipse cx="${cx}" cy="${gb+70}" rx="230" ry="26" fill="#000" opacity=".2" filter="url(#tq-blur)"/>`;
  b+=`<path d="M${cx-14} ${gb+40} l-6 46 h40 l-6 -46 z" fill="url(#tq-black)"/><ellipse cx="${cx}" cy="${gb+88}" rx="22" ry="7" fill="#111"/>`;
  b+=`<path d="M${cx-212} ${gb+16} v22 a212 40 0 0 0 424 0 v-22 z" fill="url(#tq-wood)"/><ellipse cx="${cx}" cy="${gb+16}" rx="212" ry="40" fill="url(#tq-woodtop)"/>`;
  b+=`<ellipse cx="${cx}" cy="${gb+6}" rx="${R+10}" ry="${ry+6}" fill="none" stroke="#111" stroke-width="10"/>`;
  /* الجهة الخلفية للزجاج والقاعدة الداخلية */
  b+=`<ellipse cx="${cx}" cy="${gb}" rx="${R}" ry="${ry}" fill="#8e2a22" opacity=".9"/>`;
  b+=`<path d="M${cx-R} ${lid+8} A${R} ${ry} 0 0 1 ${cx+R} ${lid+8}" fill="none" stroke="#94a3b8" stroke-width="1.5" opacity=".6"/>`;
  /* التدريج الخلفي */
  for(let k=0;k<=36;k++){const t=Math.PI+Math.PI*k/36,x=cx+R*Math.cos(t),y=300+ry*Math.sin(t);b+=`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+(k%3?6:10)}" stroke="#dc2626" stroke-width="1" opacity=".35"/>`}
  /* الحامل الأوسط */
  b+=`<polygon points="${cx-12},${gb+2} ${cx+12},${gb+2} ${cx+16},${gb-8} ${cx+8},${gb-16} ${cx-8},${gb-16} ${cx-16},${gb-8}" fill="url(#tq-steel)"/>`;
  b+=`<rect x="${cx-4}" y="330" width="8" height="${gb-340}" fill="url(#tq-steel)"/>`;
  b+=`<ellipse cx="${cx}" cy="342" rx="40" ry="9" fill="#1f2937"/><rect x="${cx-40}" y="326" width="80" height="16" fill="url(#tq-black)"/><ellipse cx="${cx}" cy="326" rx="40" ry="9" fill="#374151"/>`;
  b+=`<ellipse cx="${cx}" cy="318" rx="30" ry="7" fill="#111"/><rect x="${cx-30}" y="306" width="60" height="12" fill="url(#tq-black)"/><ellipse cx="${cx}" cy="306" rx="30" ry="7" fill="#4b5563"/>`;
  /* الذراع الدوار والخيط */
  const pv=280,lx=cx-135,ly=pv+10,rx2=cx+128,ry2=pv-9;
  b+=`<line x1="${cx}" y1="70" x2="${cx}" y2="${pv-30}" stroke="#e5e7eb" stroke-width="1.6"/><line x1="${cx+.6}" y1="70" x2="${cx+.6}" y2="${pv-30}" stroke="#64748b" stroke-width=".6"/>`;
  b+=`<rect x="${cx-3.5}" y="${pv-32}" width="7" height="44" rx="3" fill="url(#tq-brass)"/>`;
  b+=`<line x1="${lx}" y1="${ly}" x2="${rx2}" y2="${ry2}" stroke="#b7882b" stroke-width="5" stroke-linecap="round"/><line x1="${lx}" y1="${ly-1.6}" x2="${rx2}" y2="${ry2-1.6}" stroke="#fde68a" stroke-width="1.3"/>`;
  b+=ball(lx,ly,18,'tq-blk')+ball(rx2,ry2,11,'tq-gold');
  /* الكرة الثابتة المعلقة من الغطاء */
  const fx=cx+158,fy=pv+6;
  b+=`<rect x="${fx-3}" y="${lid+6}" width="6" height="${fy-lid-18}" fill="url(#tq-steel)"/>`+ball(fx,fy,14,'tq-silv');
  b+=`<text x="${rx2}" y="${ry2+4}" font-size="12" font-weight="900" fill="#7a2e00" text-anchor="middle">+</text><text x="${fx}" y="${fy+4}" font-size="13" font-weight="900" fill="#7a2e00" text-anchor="middle">+</text>`;
  b+=`<line x1="${rx2-14}" y1="${ry2-2}" x2="${rx2-44}" y2="${ry2+2}" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/><polygon points="${rx2-54},${ry2+3} ${rx2-42},${ry2-5} ${rx2-42},${ry2+9}" fill="#f59e0b"/>`;
  /* الزجاج الأمامي */
  b+=`<path d="M${cx-R} ${lid+8} V${gb} A${R} ${ry} 0 0 0 ${cx+R} ${gb} V${lid+8}" fill="url(#tq-glass)" stroke="#9aa9bb" stroke-width="1.6"/>`;
  b+=`<rect x="${cx-R+18}" y="${lid+20}" width="14" height="${gb-lid-40}" rx="7" fill="url(#tq-shine)" opacity=".75"/><rect x="${cx+R-40}" y="${lid+30}" width="7" height="${gb-lid-70}" rx="4" fill="url(#tq-shine)" opacity=".5"/>`;
  /* التدريج الأمامي على الزجاج */
  for(let k=0;k<=36;k++){const t=Math.PI*k/36,x=cx+R*Math.cos(t),y=300+ry*Math.sin(t),big=k%3===0;b+=`<line x1="${x}" y1="${y}" x2="${x}" y2="${y+(big?12:7)}" stroke="#dc2626" stroke-width="${big?1.6:1}"/>`;if(big&&k>2&&k<34)b+=`<text x="${x}" y="${y+24}" font-size="10" font-weight="700" fill="#b91c1c" text-anchor="middle" direction="ltr">${(k*10)%360}</text>`}
  /* الغطاء الأسود واللوح الأصفر */
  b+=`<path d="M${cx-R-12} ${lid} v14 a${R+12} ${ry+8} 0 0 0 ${2*(R+12)} 0 v-14 z" fill="url(#tq-black)"/>`;
  b+=`<ellipse cx="${cx}" cy="${lid}" rx="${R+12}" ry="${ry+8}" fill="#18181b"/><ellipse cx="${cx}" cy="${lid-1}" rx="${R-4}" ry="${ry+1}" fill="url(#tq-plate)"/>`;
  b+=`<ellipse cx="${cx}" cy="${lid-2}" rx="32" ry="9" fill="#111"/><ellipse cx="${cx}" cy="${lid-8}" rx="22" ry="7" fill="#27272a"/>`;
  b+=`<path d="M${fx-20} ${lid-8} v12 a20 6 0 0 0 40 0 v-12 z" fill="#efe3c0"/><ellipse cx="${fx}" cy="${lid-8}" rx="20" ry="6" fill="#fbf5e3"/>`;
  /* الأنبوب الزجاجي ورأس الالتواء */
  b+=`<rect x="${cx-17}" y="64" width="34" height="${lid-72}" fill="url(#tq-glass)" stroke="#9aa9bb" stroke-width="1.2"/><rect x="${cx-12}" y="70" width="5" height="${lid-86}" fill="#fff" opacity=".7"/>`;
  b+=`<ellipse cx="${cx}" cy="64" rx="20" ry="5" fill="#111"/><rect x="${cx-20}" y="44" width="40" height="20" fill="url(#tq-black)"/>`;
  b+=`<ellipse cx="${cx}" cy="44" rx="44" ry="9" fill="#18181b"/><rect x="${cx-48}" y="40" width="10" height="7" rx="3" fill="#111"/><rect x="${cx+38}" y="40" width="10" height="7" rx="3" fill="#111"/>`;
  for(let k=0;k<12;k++){const t=Math.PI*k/11;b+=`<line x1="${cx-40*Math.cos(t)}" y1="${44+8*Math.sin(t)}" x2="${cx-34*Math.cos(t)}" y2="${44+6.8*Math.sin(t)}" stroke="#fde68a" stroke-width="1"/>`}
  b+=`<rect x="${cx-8}" y="18" width="16" height="24" rx="3" fill="url(#tq-brass)"/><ellipse cx="${cx}" cy="18" rx="10" ry="4" fill="#f8dc8a"/>`;
  /* الأسماء */
  const lab=(tx,ty,t,c,lx2,ly2)=>`<line x1="${lx2}" y1="${ly2}" x2="${tx+(tx<cx?60:-60)}" y2="${ty-5}" stroke="${c}" stroke-width="1.5"/><circle cx="${lx2}" cy="${ly2}" r="3" fill="${c}"/><text x="${tx}" y="${ty}" font-size="14.5" font-weight="800" fill="${c}" text-anchor="middle">${t}</text>`;
  b+=lab(520,30,'رأس الالتواء','#92400e',cx+46,42);
  b+=lab(540,120,'خيط رفيع داخل الأنبوب','#475569',cx+2,140);
  b+=lab(570,262,'كرة مشحونة ثابتة','#b91c1c',fx+14,fy-4);
  b+=lab(560,360,'تدريج زاوية الالتواء','#b91c1c',cx+150,316);
  b+=lab(80,236,'كرة مشحونة متحركة','#b45309',rx2-2,ry2-11);
  b+=lab(78,330,'وزن موازن','#334155',lx-16,ly+4);
  return svg(W,H,b,'kTorsion')}
/* مكان جسيمات الذرة */
function atomLoc(){const W=640,H=300,cx=455,cy=150,rx=150,ry=100;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  for(let i=0;i<24;i++)b+=`<circle cx="${(i*131)%W}" cy="${(i*71)%H}" r="${i%3?0.8:1.3}" fill="#9fb6ff" opacity=".35"/>`;
  b+=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#93c5fd" stroke-width="2" stroke-dasharray="6 6"/>`;
  const E=[25,150,265].map(a=>[cx+rx*Math.cos(a*Math.PI/180),cy+ry*Math.sin(a*Math.PI/180)]);
  b+=`<line x1="${cx-46}" y1="${cy-14}" x2="292" y2="96" stroke="#dc2626" stroke-width="2"/><circle cx="${cx-46}" cy="${cy-14}" r="3.5" fill="#dc2626"/>`;
  b+=`<line x1="${E[1][0]-12}" y1="${E[1][1]+4}" x2="292" y2="214" stroke="#2563eb" stroke-width="2"/>`;
  b+=`<circle cx="${cx}" cy="${cy}" r="52" fill="url(#kc-gP)"/>`;
  [[0,0,'+'],[16,-8,'0'],[-15,-9,'+'],[8,15,'0'],[-10,14,'+'],[20,10,'0'],[-22,6,'0'],[2,-20,'+']].sort((a,c)=>a[1]-c[1]).forEach(([dx,dy,g])=>{b+=sphere(cx+dx,cy+dy,13,g,cy+dy+6).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  E.forEach(([x,y])=>{b+=sphere(x,y,13,'-',y+6).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')});
  b+=`<rect x="36" y="56" width="256" height="80" rx="14" fill="#fff" fill-opacity=".9" stroke="#fca5a5" stroke-width="2"/><text x="164" y="88" text-anchor="middle" font-size="18" font-weight="800" fill="#b91c1c">النواة في المركز</text><text x="164" y="118" text-anchor="middle" font-size="15" font-weight="700" fill="#334155">فيها البروتونات والنيوترونات</text>`;
  b+=`<rect x="36" y="174" width="256" height="80" rx="14" fill="#fff" fill-opacity=".9" stroke="#93c5fd" stroke-width="2"/><text x="164" y="206" text-anchor="middle" font-size="18" font-weight="800" fill="#1d4ed8">الإلكترونات حول النواة</text><text x="164" y="236" text-anchor="middle" font-size="15" font-weight="700" fill="#334155">تدور في مدارات حولها</text>`;
  return svg(W,H,b,'kAtomLoc')}
/* التنافر والتجاذب: ثلاث حالات */
function likeUnlike(){const W=640,H=330,R=24;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const row=(y,s1,s2,t,d)=>{const rep=s1===s2,x1=200,x2=440;let g=flow(x1+R+4,x2-R-4,y,rep)+sphere(x1,y,R,s1,y+R+4)+sphere(x2,y,R,s2,y+R+4);
    g+=rep?arrow(x1-R-5,x1-R-5-70,y,'F',d,10)+arrow(x2+R+5,x2+R+5+70,y,'F',d+.15,10):arrow(x1+R+5,x1+R+5+62,y,'F',d,10)+arrow(x2-R-5,x2-R-5-62,y,'F',d+.15,10);
    return g+`<text x="${W/2}" y="${y-R-10}" text-anchor="middle" font-size="15" font-weight="800" fill="${rep?'#b91c1c':'#1d4ed8'}">${t}</text>`};
  b+=row(70,'+','+','متشابهتان موجبتان: تنافر',.1)+row(170,'-','-','متشابهتان سالبتان: تنافر',.5)+row(270,'+','-','مختلفتان: تجاذب',.9);
  return svg(W,H,b,'kAuto')}

/* أمثلة من الحياة: شرارة مقبض الباب والمشي على السجاد */
function life(){const W=640,H=280;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<polygon points="0,236 640,236 640,280 0,280" fill="url(#kc-fl)"/>`;
  /* باب مجسم: إطار وسمك وألواح بارزة */
  b+=`<ellipse cx="140" cy="240" rx="110" ry="8" fill="url(#kc-sh)"/>`;
  b+=`<polygon points="214,24 230,16 230,232 214,240" fill="#a87a45"/><rect x="56" y="24" width="158" height="216" rx="4" fill="url(#kc-door)" stroke="#9a6b38" stroke-width="2"/>`;
  [[72,40,126,80],[72,134,126,92]].forEach(([x,y,w,h])=>{b+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#e9c995"/><path d="M${x},${y+h} L${x},${y} L${x+w},${y}" fill="none" stroke="#fff6e6" stroke-width="3"/><path d="M${x+w},${y} L${x+w},${y+h} L${x},${y+h}" fill="none" stroke="#a87a45" stroke-width="3"/>`});
  b+=`<rect x="186" y="120" width="14" height="44" rx="5" fill="url(#kc-metal)"/><ellipse cx="200" cy="142" rx="5" ry="9" fill="#475569"/><circle cx="205" cy="142" r="12" fill="url(#kc-sZ)"/><ellipse cx="201" cy="137" rx="4" ry="3" fill="#fff" opacity=".8"/>`;
  /* يد بإصبع ممدود */
  b+=`<rect x="300" y="122" width="60" height="44" rx="12" fill="url(#kc-cloth)"/><ellipse cx="300" cy="144" rx="7" ry="22" fill="#1e3a8a"/>`;
  b+=`<path d="M300,128 C285,124 268,126 262,132 L232,134 C224,135 224,145 232,146 L262,147 C264,156 272,162 286,162 L300,160 Z" fill="url(#kc-skin)" stroke="#b97c52" stroke-width="1.5"/><path d="M264,150 C270,153 280,153 290,151" fill="none" stroke="#b97c52" stroke-width="1.2"/><ellipse cx="236" cy="138" rx="5" ry="3" fill="#ffd9c0"/>`;
  b+=`<circle class="kSpark" cx="222" cy="140" r="11" fill="#fde68a" opacity=".7"/><path class="kSpark" d="M226,134 L220,139 L225,141 L217,146" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  b+=`<text x="150" y="268" text-anchor="middle" font-size="15" font-weight="800" fill="#1e3a5f">شرارة عند لمس مقبض الباب</text>`;
  /* سجادة مجسمة وحذاءان */
  b+=`<polygon points="380,232 640,232 640,240 372,240" fill="#4c1d95"/><polygon points="410,196 620,196 640,232 380,232" fill="url(#kc-rug)"/>`;
  for(let i=1;i<6;i++){const t=i/6;b+=`<line x1="${f1(410+210*t)}" y1="196" x2="${f1(380+260*t)}" y2="232" stroke="#c4b5fd" stroke-width="1" opacity=".6"/>`}
  b+=`<line x1="398" y1="208" x2="628" y2="208" stroke="#ddd6fe" stroke-width="2" opacity=".7"/><line x1="388" y1="222" x2="634" y2="222" stroke="#ddd6fe" stroke-width="2" opacity=".7"/>`;
  for(let x=376;x<=636;x+=8)b+=`<line x1="${x}" y1="240" x2="${x-2}" y2="247" stroke="#7c3aed" stroke-width="1.5"/>`;
  const shoe=(tx,ty,rot)=>`<g transform="translate(${tx},${ty}) rotate(${rot})"><rect x="4" y="-118" width="26" height="92" rx="6" fill="url(#kc-cloth)"/><path d="M0,0 L0,-26 C0,-34 8,-36 16,-34 L32,-30 C44,-28 60,-22 68,-13 C74,-6 73,0 67,0 Z" fill="url(#kc-shoe)" stroke="#64748b" stroke-width="1.5"/><rect x="-2" y="-1" width="74" height="7" rx="3" fill="#334155"/><path d="M30,-28 L40,-20 M38,-27 L46,-19" stroke="#94a3b8" stroke-width="1.6"/></g>`;
  b+=shoe(450,222,0)+shoe(528,200,-14);
  b+=[[430,214],[600,220],[505,226]].map(([x,y])=>`<g class="kSpark">`+sphere(x,y,7,'+',y+8).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`</g>`).join('');
  b+=[[466,150],[468,124],[548,112]].map(([x,y])=>`<g class="kSpark">`+sphere(x,y,7,'-',y+8).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`</g>`).join('');
  b+=`<text x="510" y="268" text-anchor="middle" font-size="15" font-weight="800" fill="#1e3a5f">المشي على السجاد يشحن الجسم</text>`;
  return svg(W,H,b,'kAuto')}
/* ميزان كولوم الالتوائي (1784م) */
function torsion(){const W=640,H=330;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;const cx=320,T=112,Bt=262,R=135,ry=20;
  /* قاعدة خشبية */
  b+=`<ellipse cx="${cx}" cy="${Bt+30}" rx="${R+40}" ry="${ry+8}" fill="url(#kc-sh)"/><path d="M${cx-R-22},${Bt+6} L${cx-R-22},${Bt+20} A${R+22},${ry+4} 0 0 0 ${cx+R+22},${Bt+20} L${cx+R+22},${Bt+6} Z" fill="#6b3f1d"/><ellipse cx="${cx}" cy="${Bt+6}" rx="${R+22}" ry="${ry+4}" fill="url(#kc-wood)"/>`;
  /* الجزء الخلفي للأسطوانة */
  b+=`<ellipse cx="${cx}" cy="${Bt}" rx="${R}" ry="${ry}" fill="#dbeafe" opacity=".7" stroke="#93c5fd" stroke-width="2"/><path d="M${cx-R},${T} A${R},${ry} 0 0 1 ${cx+R},${T}" fill="none" stroke="#93c5fd" stroke-width="2"/>`;
  /* أنبوب الخيط ورأس الالتواء */
  b+=`<rect x="${cx-13}" y="36" width="26" height="${T-36}" fill="url(#kc-glass)" stroke="#93c5fd" stroke-width="1.5"/><rect x="${cx-24}" y="22" width="48" height="16" rx="3" fill="url(#kc-metal)"/><ellipse cx="${cx}" cy="22" rx="24" ry="6" fill="#e2e8f0" stroke="#64748b"/>`;
  for(let i=0;i<7;i++)b+=`<line x1="${cx-20+i*6.6}" y1="38" x2="${cx-20+i*6.6}" y2="${i%3?33:30}" stroke="#334155" stroke-width="1"/>`;
  b+=`<line x1="${cx}" y1="24" x2="${cx}" y2="172" stroke="#334155" stroke-width="1.6"/>`;
  /* الكرة الثابتة على قضيب من الغطاء */
  const fx=cx-78,fy=196;
  b+=`<rect x="${fx-4}" y="${T-6}" width="8" height="${fy-T}" fill="url(#kc-metal)"/>`;
  /* الواجهة الزجاجية والتدريج */
  b+=`<path d="M${cx-R},${T} L${cx-R},${Bt} A${R},${ry} 0 0 0 ${cx+R},${Bt} L${cx+R},${T} A${R},${ry} 0 0 1 ${cx-R},${T} Z" fill="url(#kc-glass)" stroke="#60a5fa" stroke-width="2"/>`;
  /* الذراع الأفقي مائل قليلا للعمق */
  const ax1=cx-112,ay1=164,ax2=cx+98,ay2=178;
  b+=`<g class="kSwing"><line x1="${ax1}" y1="${ay1}" x2="${ax2}" y2="${ay2}" stroke="#1f2937" stroke-width="5" stroke-linecap="round"/><line x1="${ax1}" y1="${ay1-1.5}" x2="${ax2}" y2="${ay2-1.5}" stroke="#94a3b8" stroke-width="1.5"/>`+sphere(ax1,ay1,15,'+',ay1+20).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'')+`<ellipse cx="${ax2+4}" cy="${ay2}" rx="8" ry="14" fill="url(#kc-metal)" stroke="#334155"/></g>`;
  b+=sphere(fx,fy,15,'+',fy+20).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'');
  b+=`<path d="M${cx-R},${T} A${R},${ry} 0 0 0 ${cx+R},${T}" fill="none" stroke="#60a5fa" stroke-width="2.5"/><path d="M${cx-R},214 A${R},${ry} 0 0 0 ${cx+R},214" fill="none" stroke="#1e3a5f" stroke-width="1.4"/>`;
  for(let i=0;i<=36;i++){const a=Math.PI*i/36,x=cx-R*Math.cos(a),y=214+ry*Math.sin(a);b+=`<line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y-(i%6?5:11))}" stroke="#1e3a5f" stroke-width="${i%6?1:1.6}"/>`}
  b+=`<rect x="${cx-R+10}" y="${T+8}" width="10" height="${Bt-T-20}" rx="5" fill="#fff" opacity=".45"/>`;
  const L=(x,y,t,ax,ay)=>`<line x1="${ax}" y1="${ay}" x2="${x}" y2="${y-5}" stroke="#64748b" stroke-width="1.2"/><circle cx="${ax}" cy="${ay}" r="2.5" fill="#64748b"/><text x="${x}" y="${y+10}" text-anchor="middle" font-size="14.5" font-weight="800" fill="#1e3a5f">${t}</text>`;
  b+=L(500,40,'رأس الالتواء',cx+24,30)+L(510,96,'خيط رفيع يلتوي',cx+2,90)+L(560,170,'ثقل للاتزان',ax2+12,ay2)+L(90,92,'كرة مشحونة متحركة',ax1-6,ay1-12)+L(80,250,'كرة مشحونة ثابتة',fx-12,fy+10)+L(540,296,'تدريج لقياس زاوية الالتواء',cx+110,228);
  return svg(W,H,b,'kAuto')}
/* مقارنة قانون كولوم بقانون الجذب العام */
const frS=(cx,y,pre,num,den,c)=>`<text x="${cx-30}" y="${y}" text-anchor="end" font-size="18" font-weight="800" fill="${c}" direction="ltr">${pre}</text><text x="${cx+12}" y="${y-9}" text-anchor="middle" font-size="16" font-weight="800" fill="${c}" direction="ltr">${num}</text><line x1="${cx-26}" y1="${y-4}" x2="${cx+50}" y2="${y-4}" stroke="${c}" stroke-width="2"/><text x="${cx+12}" y="${y+14}" text-anchor="middle" font-size="16" font-weight="800" fill="${c}" direction="ltr">${den}</text>`;
function gravity(){const W=640,H=280;let b=`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<line x1="320" y1="20" x2="320" y2="260" stroke="#c9daf0" stroke-width="2" stroke-dasharray="5 5"/>`;
  b+=`<text x="160" y="40" text-anchor="middle" font-size="17" font-weight="900" fill="#1e3a5f">قانون الجذب العام</text>`;
  b+=`<circle cx="70" cy="130" r="30" fill="url(#kc-sN)"/><circle cx="62" cy="122" r="9" fill="#86efac" opacity=".8"/><circle cx="250" cy="130" r="14" fill="url(#kc-sZ)"/>`;
  b+=arrow(102,170,130,'F',.2,8)+arrow(234,184,130,'F',.4,8);
  b+=lbl(70,184,'m₁','#1e3a5f',17)+lbl(250,184,'m₂','#1e3a5f',17)+dim(70,250,212,'r')+frS(160,250,'F = G ×','m₁ × m₂','r²','#0B7A70');
  b+=`<text x="480" y="40" text-anchor="middle" font-size="17" font-weight="900" fill="#1e3a5f">قانون كولوم</text>`;
  b+=sphere(400,130,22,'+',160)+sphere(560,130,22,'+',160)+arrow(378,330,130,'F',.6,8)+arrow(582,630,130,'F',.8,8);
  b+=lbl(400,184,'q₁','#b91c1c',17)+lbl(560,184,'q₂','#b91c1c',17)+dim(400,560,212,'r')+frS(480,250,'F = k ×','q₁ × q₂','r²','#0B7A70');
  return svg(W,H,b,'kAuto')}
/* ---------- البطاقات ---------- */
const B=t=>'<b>'+t+'</b>',M=t=>'<bdi dir="ltr" class="kM">'+t+'</bdi>';
const q=(t,lab)=>({html:`<div class="kc kQ"><span class="kTag">${lab||'السؤال'}</span><div>${t}</div></div>`});
const gr=(g,r)=>({html:`<div class="kc kGR"><div class="kG"><span class="kTag">المعطيات</span>${g.map(x=>`<div>${M(x)}</div>`).join('')}</div><div class="kR"><span class="kTag">المطلوب</span><div>${r}</div></div></div>`});
const fig=(s,cap)=>({html:`<div class="kc kFig">${s}${cap?`<div class="kCap">${cap}</div>`:''}</div>`});
const st=(n,t,cls)=>({html:`<div class="kc kSt ${cls||''}"><i>${n}</i><div>${t}</div></div>`});
const res=t=>({html:`<div class="kc kRes"><span>✓</span><div>${t}</div></div>`});

const KIMG={TOR:'k-tor.webp?v=1',LIFE:'k-life.webp?v=1'};
const kimgFill=()=>document.querySelectorAll('img[data-kimg]:not([src])').forEach(i=>{i.src=KIMG[i.dataset.kimg]||''});
/* 3-1: قانون كولوم والتعويض بشكل كسر (بسط ومقام) في كل أقسام الدرس (طلب المدرب 17:26) */
const kEsc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const kFrac=()=>{let K='';try{K=key(pos.u,pos.l)}catch(e){}try{document.documentElement.classList.toggle('L31',!!K)/* 7 نوفمبر: عرض كولوم المضغوط لكل الدروس */}catch(e){}if(!/^3-[13-6]$/.test(K))return;
  document.querySelectorAll('code,bdi,.kM,.eq').forEach(el=>{if(el.dataset.fr||el.children.length)return;if(K!=='3-1'&&el.closest('.lab'))return;const t=el.textContent.trim(),m=t.match(/^([FE][₀-₉]*\s*=\s*)(.+)\s\/\s*([0-9.]+ × 10[⁰-⁹⁻]+|[^\s=]+)(\s*(?:[=≈][\s\S]*)?)$/);if(!m||!(K==='3-3'?/q|10⁻|k|F|V|[0-9]/:/q|10⁻|k/).test(m[2]))return;
    let pre='',num=m[2];const k=num.match(/^(k|[0-9.]+ [×/] [0-9.]+[⁰-⁹⁻]+|[0-9.]+[⁰-⁹⁻]+)\s*[·×]\s*/);if(k){pre=k[1]+' × ';num=num.slice(k[0].length)}
    el.dataset.fr=1;el.innerHTML=kEsc(m[1])+kEsc(pre)+'<span class="kFr"><span>'+kEsc(num.replace(/\s*·\s*/g,' × '))+'</span><span>'+kEsc(m[3].replace(/^\((.*)\)(²?)$/,'$1$2'))+'</span></span>'+kEsc(m[4])})};
const kMulti=()=>document.querySelectorAll('.board .bContent').forEach(c=>{const m=c.querySelectorAll('.bStep .kFig').length>1;if(c.classList.contains('kMultiFig')!==m)c.classList.toggle('kMultiFig',m)});
/* 7 نوفمبر: التعويض في سطر واحد لكل الدروس، ويصغر خطه تلقائيا إذا كان أعرض من الشاشة */const kFit=()=>document.querySelectorAll('.board .kc.kSt .kM').forEach(m=>{const p=m.parentElement;if(!p||!m.offsetWidth)return;const W=p.clientWidth-8;if(m.dataset.fw==W&&m.dataset.ft==m.textContent.length)return;m.style.fontSize='';const w=m.scrollWidth;if(w>W){const f=parseFloat(getComputedStyle(m).fontSize);m.style.setProperty('font-size',Math.max(9,f*W/w-0.3).toFixed(1)+'px','important')}m.dataset.fw=W;m.dataset.ft=m.textContent.length});
try{new MutationObserver(()=>{kimgFill();kMulti();kFrac();try{kFit()}catch(e){}}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
const imf=(src,cap,ref)=>({html:`<div class="kc kFig${src==='LIFE'?' kLife':''}"><img class="kL0" data-kimg="${src}" loading="lazy" decoding="async" alt="${cap}" style="display:block;width:100%;max-width:640px;margin:0 auto;border-radius:12px;background:#fff">${src==='LIFE'?'<div class="kL2"><img class="kLa" data-kimg="LIFE" alt=""><img class="kLb" data-kimg="LIFE" alt=""></div>':''}<div class="kCap">${cap}</div></div>`});
/* المدرب 7 نوفمبر: صورتا «الكهرباء الساكنة من حولنا» فوق بعض وبعرض كامل في الجوال العمودي */
try{const st=document.createElement('style');st.textContent='.kLife .kL2{display:none}@media (orientation:portrait) and (max-width:700px){.kLife .kL0{display:none!important}.kLife .kL2{display:flex;flex-direction:column;gap:8px}.kLife .kL2 img{display:block;width:100%;aspect-ratio:640/338;object-fit:cover;border-radius:12px;background:#fff}.kLife .kLa{object-position:left center}.kLife .kLb{object-position:right center}}@media (max-width:999px){html body .board .bContent>.bStep.in:has(.kLife){position:static!important}}';document.head.appendChild(st)}catch(e){}/* المدرب 7 نوفمبر 22:48: بطاقة الصورتين طويلة فلا تثبت أعلى السبورة (كانت تغطي البطاقة التي بعدها) */
const pt=(t)=>({html:`<div class="kc kPt">${t}</div>`});
function S(o,say){o.say=say;return o}
const CARDS={'3-1':{
  /* إضافة: أهداف الوحدة (طلب المدرب 14:31) */
  goals:{title:'أهداف الوحدة',sayT:'والآن، لنتعرف على أهداف الوحدة.',steps:()=>[
    S({html:`<div class="kc kPt kKeep kcB">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'في نهاية هذه الوحدة، يكون المتدرب قادرا على:'),
    S({html:`<div class="kc kPt kKeep kcT"><b>1</b> تعريف الشحنة الكهربائية وأنواعها وطرق شحن الأجسام.</div>`},'تعريف الشحنة الكهربائية وأنواعها وطرق شحن الأجسام.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>2</b> تطبيق قانون كولوم لحساب القوة بين شحنتين.</div>`},'تطبيق قانون كولوم لحساب القوة بين شحنتين.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>3</b> حساب شدة المجال الكهربائي ورسم خطوطه.</div>`},'حساب شدة المجال الكهربائي ورسم خطوطه.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>4</b> حساب الجهد الكهربائي وفرق الجهد.</div>`},'حساب الجهد الكهربائي وفرق الجهد.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>5</b> التعرف على المكثفات وحساب سعتها وطاقتها وطرق توصيلها.</div>`},'التعرف على المكثفات وحساب سعتها، والمقارنة بين توصيلها على التوالي وعلى التوازي، وإيجاد الطاقة المختزنة فيها.')]},
  /* إضافة: مصطلحات الدرس بالإنجليزية مع الرمز والوحدة (طلب المدرب 30 أكتوبر) */
  terms:{title:'مصطلحات الدرس',sayT:'وقبل أن نبدأ، لنتعرف على مصطلحات الدرس باللغة الإنجليزية، مع رموز الكميات ووحدات قياسها.',steps:()=>{
    const T=(cap,h,rows)=>`<div class="kc kTerms"><div class="kTc">${cap}</div><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map((c,i)=>`<td${i===1?' class="kTen" dir="ltr"':i>1?' class="kTs" dir="ltr"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    return [
    S({html:T('الكميات الفيزيائية',['الكمية','English','الرمز','الوحدة'],[['الشحنة الكهربائية','Electric Charge','<i>q</i>','C'],['القوة الكهربائية','Electric Force','<i>F</i>','N'],['المسافة بين الشحنتين','Distance','<i>r</i>','m'],['ثابت كولوم',"Coulomb's Constant",'<i>k</i>','N·m²/C²'],['الشحنة الأساسية','Elementary Charge','<i>e</i>','C']])},
      'الشحنة الكهربائية Electric Charge، رمزها `q`، ووحدتها الكولوم `C`. والقوة الكهربائية Electric Force، رمزها `F`، ووحدتها النيوتن `N`. والمسافة Distance، رمزها `r`، ووحدتها المتر `m`. وثابت كولوم Coulomb\'s Constant، رمزه `k`. والشحنة الأساسية Elementary Charge، رمزها `e`.'),
    S({html:T('المفاهيم (1)',['المصطلح','English'],[['الكهرباء الساكنة','Static Electricity'],['الإلكترون','Electron'],['البروتون','Proton'],['النيوترون','Neutron'],['المادة الموصلة','Conductor'],['المادة العازلة','Insulator']])},
      'وهذه مصطلحات المفاهيم: الكهرباء الساكنة Static Electricity، والإلكترون Electron، والبروتون Proton، والنيوترون Neutron، والمادة الموصلة Conductor، والمادة العازلة Insulator.'),
    S({html:T('المفاهيم (2)',['المصطلح','English'],[['المادة شبه الموصلة','Semiconductor'],['الشحن بالدلك','Charging by Friction'],['الشحن باللمس','Charging by Conduction'],['الشحن بالحث','Charging by Induction'],['قانون كولوم',"Coulomb's Law"],['قانون التربيع العكسي','Inverse-Square Law']])},
      'والمادة شبه الموصلة Semiconductor، والشحن بالدلك Charging by Friction، والشحن باللمس Charging by Conduction، والشحن بالحث Charging by Induction، وقانون كولوم Coulomb\'s Law، وقانون التربيع العكسي Inverse-Square Law.')]}},
  /* طرق شحن الأجسام بالكهرباء الساكنة (طلب المدرب 16:30) */
  rub:{title:'طرق شحن الأجسام بالكهرباء الساكنة',sayT:'بعد أن عرفنا أنواع المواد، نتعرف الآن على طرق شحن الأجسام بالكهرباء الساكنة.',steps:()=>[
    S(pt('تشحن الأجسام بالكهرباء الساكنة بثلاث طرق هي: '+B('الدلك')+'، و'+B('اللمس')+'، و'+B('الحث')+'.'),''),
    S({html:'<h3>1. الشحن بالدلك</h3>'},'الطريقة الأولى: الشحن بالدلك.'),
    S(pt(B('الشحن بالدلك')+': عند دلك جسمين مختلفين أحدهما بالآخر، تنتقل الإلكترونات من أحدهما إلى الآخر.'),''),
    S(pt('الجسم الذي '+B('يفقد')+' الإلكترونات يصبح موجبا، والذي '+B('يكتسبها')+' يصبح سالبا.'),''),
    S(fig(rubScene(),'مشهد: الشحن بالدلك'),'شاهد المشهد: قبل الدلك يكون الصوف والبلاستيك متعادلين، وعند الدلك تنتقل الإلكترونات من الصوف إلى البلاستيك، فيصبح الصوف موجبا والبلاستيك سالبا.'),
    S(pt(B('مثال')+': عند دلك مسطرة بلاستيكية بقطعة صوف، تنتقل الإلكترونات من الصوف إلى البلاستيك، فيصبح البلاستيك سالبا والصوف موجبا.'),'')]},
  touch:{title:'طرق شحن الأجسام بالكهرباء الساكنة (تابع)',sayT:'ونكمل طرق شحن الأجسام: الشحن باللمس، والشحن بالحث.',steps:()=>[
    S({html:'<h3>2. الشحن باللمس</h3>'},'الطريقة الثانية: الشحن باللمس.'),
    S(pt(B('الشحن باللمس (التوصيل)')+': موصل مشحون يلامس موصلا متعادلا فيتقاسمان الشحنة.'),''),
    S(fig(touchScene(),'مشهد: الشحن باللمس'),'شاهد المشهد: يلامس الموصل المشحون الموصل المتعادل، فتنتقل إليه بعض الإلكترونات، وبعد فصلهما يصبح كلاهما سالبا.'),
    S({html:'<h3>3. الشحن بالحث</h3>'},'الطريقة الثالثة: الشحن بالحث.'),
    S(pt(B('الشحن بالحث (التأثير)')+': شحن جسم متعادل '+B('دون ملامسته')+' بتقريب جسم مشحون منه.'),''),
    S(fig(inductScene(),'مشهد: الشحن بالحث'),'شاهد المشهد: نقرب جسما سالبا دون أن يلامس الموصل فتبتعد الإلكترونات، ثم نوصل الموصل بالأرض فتهرب الإلكترونات إليها، ثم نفصل الأرض ونبعد الجسم، فيبقى الموصل موجبا.')]},
  /* إضافة: أمثلة من الحياة */
  life:{title:'الكهرباء الساكنة من حولنا',steps:()=>[
    S(imf('LIFE','من الحياة: شرارة مقبض الباب، والمشي على السجاد','المرجع: الحقيبة التدريبية، صفحة 91 (الشحن بالدلك)'),'هل شعرت يوما بشرارة صغيرة عندما لمست مقبض الباب؟ أو بعد المشي على السجاد؟ هذه هي الكهرباء الساكنة.'),
    S(pt('عند '+B('دلك')+' الأجسام الموصلة أو العازلة بمادة صوفية أو حريرية، تفقد أو تكتسب '+B('شحنات كهربائية')+'، وتنشأ بينها '+B('قوة كهروستاتيكية')+' تجعلها تتجاذب أو تتنافر.'),'عِنْدَ دَلْكِ الأجسام الموصلة أو العازلة بمادة صوفية أو حريرية، تفقد أو تكتسب شحنات كهربائية، وتنشأ بينها قوة كهروستاتيكية تجعلها تتجاذب أو تتنافر.')]},
  /* إضافة: تعريف الشحنة وجسيمات الذرة */
  particles:{title:'الشحنة وجسيمات الذرة',steps:()=>{const P=[['البروتون','+','+1.6 × 10⁻¹⁹ C','1.67 × 10⁻²⁷ kg','موجبة'],['الإلكترون','-','−1.6 × 10⁻¹⁹ C','9.11 × 10⁻³¹ kg','سالبة'],['النيوترون','0','0','1.67 × 10⁻²⁷ kg','متعادل']];
    return [S(pt('الشحنة الكهربائية '+B('خاصية فيزيائية')+' للمادة، رمزها '+M('q')+'، ووحدتها '+B('الكولوم')+' ورمزها '+M('C')+'، نسبة إلى العالم شارل كولوم.'),'الشحنة الكهربائية خاصية فيزيائية للمادة، رمزها `q`، ووحدتها الكولوم ورمزها `C`، نسبة إلى العالم شارل كولوم.'),
     S({html:`<div class="kc kUH kPH"><span>الجسيم</span><span>الشحنة q</span><span>الكتلة m</span></div>`},'وهذا جدول جسيمات الذرة: شحنة كل جسيم وكتلته.')].concat(P.map(([n,sg,q,m,t])=>S({html:`<div class="kc kUR kPR"><span>${sg==='0'?'<span class="kSg" style="background:radial-gradient(circle at 35% 30%,#fff,#94a3b8 60%,#334155)">0</span>':`<span class="kSg ${sg==='+'?'kSp':'kSn'}">${sg==='+'?'+':'−'}</span>`} ${n}</span><span>${M(q)}</span><span>${M(m)}</span></div>`},n+' شحنته `'+q+'`، وكتلته `'+m+'`.'))).concat([S(fig(atomLoc(),'مكان الجسيمات: البروتونات والنيوترونات في النواة، والإلكترونات حولها'),'ولاحظ مكان كل جسيم في الرسم: البروتونات والنيوترونات في النواة، والإلكترونات تدور حولها.')])}},
  /* إضافة: تجربة كولوم 1784م */
  history:{title:'قانون كولوم',sayT:'بعد أن عرفنا كيف تشحن الأجسام، ننتقل إلى الموضوع الثاني في درسنا: قانون كولوم.',steps:()=>[
    S({html:'<h3>كيف توصل كولوم إلى قانونه؟</h3>'},'ولنبدأ بالسؤال الآتي: كيف توصل كولوم إلى قانونه؟'),
    S(imf('TOR','ميزان كولوم الالتوائي: تتنافر الكرتان فيلتوي الخيط، وزاوية الالتواء تقيس القوة'),'تأمل ميزان كولوم: كرتان مشحونتان، إحداهما ثابتة والأخرى على ذراع معلق بخيط رفيع. عندما تتنافر الكرتان يلتوي الخيط، ومن زاوية الالتواء نعرف مقدار القوة.'),
    S(pt('في عام '+M('1784')+' درس العالم '+B('شارل كولوم')+' القوة بين جسمين مشحونين باستخدام '+B('الميزان الالتوائي')+' الذي اخترعه.'),'في عام ألف وسبعمئة وأربعة وثمانين، دَرَسَ الْعَالِمُ شارل كولوم القوة بين جسمين مشحونين باستخدام الميزان الالتوائي الذي اخترعه.'),
    S(pt('ومن تجاربه توصل إلى قانون يحدد القوة بين شحنتين، وسمي باسمه: '+B('قانون كولوم')+'.'),'')]},
  /* إضافة: ثابت كولوم والمقارنة بالجذب العام */
  grav:{title:'قانون كولوم وقانون الجذب العام والتشابه بينهما',sayT:'والآن، نقارن بين قانون كولوم وقانون الجذب العام لنيوتن.',steps:()=>[
    S(fig(gravity(),'كلا القانونين: القوة تقل مع مربع المسافة (قانون التربيع العكسي)'),'وقانون كولوم يشبه قانون الجذب العام لنيوتن: في الجذب العام القوة بين كتلتين، وفي كولوم القوة بين شحنتين، وفي كليهما تقل القوة مع مربع المسافة.'),
    S(pt('لذلك يسمى قانون كولوم أيضا: '+B('قانون التربيع العكسي لكولوم')+'.'),'لذلك يسمى قانون كولوم أيضا: قانون التربيع العكسي لكولوم.')]},
  /* إضافة: مثال الحقيبة صفحة 91 */
  ex91:{title:'مثال ١ · صفحة 91',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، من صفحة 91.',steps:()=>[
    S(q('أوجد القوة التي تؤثر بها الشحنة الأولى '+M('q₁ = 4 × 10⁻⁶ C')+' على الشحنة الثانية '+M('q₂ = 9 × 10⁻⁶ C')+' إذا كانت المسافة بينهما '+M('0.06 m')+'.','المثال · صفحة 91'),'لدينا هذا السؤال: أوجد القوة التي تؤثر بها الشحنة الأولى `q₁ = 4 × 10⁻⁶ C` على الشحنة الثانية `q₂ = 9 × 10⁻⁶ C` إذا كانت المسافة بينهما `0.06 m`.'),
    S(gr(['q₁ = 4 × 10⁻⁶ C','q₂ = 9 × 10⁻⁶ C','r = 0.06 m','k = 9 × 10⁹ N·m²/C²'],'مقدار القوة بين الشحنتين '+M('F₁₂')+' واتجاهها'),'المعطيات أمامك على السبورة. والمطلوب: مقدار القوة بين الشحنتين واتجاهها.'),
    S(fig(pair({s1:'+',s2:'+',l1:'q₁ = +4 µC',l2:'q₂ = +9 µC',r:'r = 0.06 m',F:'F₁₂ = 90 N'})),'لنرسم الشحنتين: q₁ و q₂ موجبتان، والمسافة بينهما ستة سَنْتِيمِتْرَاتٍ.'),
    S(st(1,'القانون: '+M('F₁₂ = k·q₁·q₂ / r²')),'نستخدم قانون كولوم: `F₁₂ = k·q₁·q₂ / r²`'),
    S(st(2,'التعويض: '+M('F₁₂ = 9 × 10⁹ × 4 × 10⁻⁶ × 9 × 10⁻⁶ / 0.06²')),'نعوض: `F₁₂ = 9 × 10⁹ × 4 × 10⁻⁶ × 9 × 10⁻⁶ / 0.06²`'),
    S(st(3,'الحساب: '+M('F₁₂ = 0.324 ÷ 0.0036 = 90 N')),'البسط `0.324` والمقام `0.0036`، إذن `F₁₂ = 90 N`'),
    S(st(4,'الاتجاه: الشحنتان موجبتان، فبينهما '+B('تنافر')+': '+M('F₁')+' على '+M('q₁')+' بعيدا عن '+M('q₂')+'، و '+M('F₂')+' على '+M('q₂')+' بعيدا عن '+M('q₁')+'.<span class="kDirOn"></span>','kDir'),'والآن نحدد الاتجاه: الشحنتان موجبتان أي متشابهتان، فبينهما تنافر. انظر إلى الرسم: القوة F₁ على q₁ تتجه بعيدا عن q₂، والقوة F₂ على q₂ تتجه بعيدا عن q₁.'),
    S(res(M('F₁₂ = 90 N')+' قوة تنافر'),'النتيجة: `F₁₂ = 90 N` قوة تنافر.')]},
  /* شرح: وحدات مهمة (جدول واضح: الكمية، الوحدة، الرمز) */
  units:{title:'وحدات مهمة',steps:()=>{const U=[['الشحنة','q','الكولوم','C','كولوم'],['القوة','F','النيوتن','N','نيوتن'],['المجال الكهربائي','E','نيوتن لكل كولوم','N/C','نيوتن لكل كولوم'],['الجهد الكهربائي','V','الفولت','V','فولت'],['السعة الكهربائية','C','الفاراد','F','فاراد']];
    return [S({html:`<div class="kc kUH"><span>الكمية</span><span>رمز الكمية</span><span>وحدة القياس</span><span>رمز الوحدة</span></div>`},'لنتعرف على الوحدات المهمة في هذه الوحدة.')].concat(U.map(([n,sy,u,us,sp])=>S({html:`<div class="kc kUR"><span>${n}</span><span>${M(sy)}</span><span>${u}</span><span class="kUS">${M(us)}</span></div>`},n+(/^(المجال|الجهد)/.test(n)?' رمزه `':' رمزها `')+sy+'`، '+(/^(المجال|الجهد)/.test(n)?'وَوَحْدَتُهُ ':'وَوَحْدَتُهَا ')+u+'، ورمزها `'+us+'`.')))}},
  /* شرح: الشحنة الكهربائية */
  charge:{title:'الشحنة الكهربائية',steps:()=>[
    S(fig(atom(),'الذرة: نواة فيها بروتونات موجبة ونيوترونات متعادلة، وحولها إلكترونات سالبة'),'تَأَمَّلْ هَذِهِ الذَّرَّةَ: في وسطها النواة، وَفِيهَا الْبُرُوتُونَاتُ الْمُوجَبَةُ وَالنُّيُوتْرُونَاتُ الْمُتَعَادِلَةُ، وَحَوْلَهَا تَدُورُ الْإِلِكْتِرُونَاتُ السَّالِبَهْ.'),
    /* المدرب 8 نوفمبر 12:36: بطاقة «المادة متعادلة طبيعيا» خانتان بينهما =، ورمزا الشحنة دائرتان كاملتان */S(pt('<span class="kPtH">المادة '+B('متعادلة')+' طبيعيا:</span><span hidden> عدد البروتونات الموجبة يساوي عدد الإلكترونات السالبة</span><span class="kVisOnly" style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px"><span style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:14px;background:#fff;white-space:nowrap;font-size:.95em;border:1.5px solid #fecaca">'+B('عدد<br>البروتونات')+'<span class="kSg kSp" style="flex:none;width:1.6em;height:1.6em;aspect-ratio:1;font-size:1.05em">+</span></span><span style="font-weight:900;font-size:1.3em;color:#334155">=</span><span style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:14px;background:#fff;white-space:nowrap;font-size:.95em;border:1.5px solid #bfdbfe">'+B('عدد<br>الإلكترونات')+'<span class="kSg kSn" style="flex:none;width:1.6em;height:1.6em;aspect-ratio:1;font-size:1.05em">−</span></span></span>'),'المادة متعادلة طبيعيا، لأن عدد البروتونات الموجبة يساوي عدد الْإِلِكْتِرُونَاتِ السالبة.'),
    S(pt('تشحن المادة عندما '+B('تفقد')+' إلكترونات فتصبح موجبة، أو '+B('تكتسب')+' إلكترونات فتصبح سالبة.'),'تشحن المادة عندما تفقد إلكترونات فتصبح موجبة، أو تكتسب إلكترونات فتصبح سالبة.'),
    S(fig(ionScene(),'مشهد: الذرة تفقد إلكترونا فتصبح موجبة، وتكتسب إلكترونا فتصبح سالبة'),'شاهد المشهد: الذَّرَّةُ الْمُتَعَادِلَةُ فِيهَا ثَلَاثَةُ بُرُوتُونَاتٍ وَثَلَاثَةُ إِلِكْتِرُونَاتٍ، فَإِذَا فَقَدَتْ إِلِكْتِرُونًا أَصْبَحَتْ مُوجَبَةً، وَإِذَا اكْتَسَبَتْ إِلِكْتِرُونًا أَصْبَحَتْ سَالِبَهْ.'),
    S(fig(chargeScene(),'مشهد: الشحنات المتشابهة تتنافر، والمختلفة تتجاذب'),'وَالْقَاعِدَةُ الْمُهِمَّةُ: الشُّحْنَاتُ المتشابهة تتنافر، والشحنات المختلفة تتجاذب. لاحظ الْأَسْهُمَ: في التنافر تبتعد الشحنتان، وفي التجاذب تقتربان.')]},
  /* شرح: قانون كولوم */
  law:{title:'قانون كولوم (تابع)',sayT:'والآن، نتعرف على تعريف قانون كولوم.',steps:()=>[
    S({html:'<h3>تعريف قانون كولوم</h3>'},''),
    S(pt('القوة بين شحنتين نقطيتين تتناسب '+B('طرديا')+' مع حاصل ضرب الشحنتين، و'+B('عكسيا')+' مع مربع المسافة بينهما.'),''),
    /* المدرب 8 نوفمبر 07:51 (أ): قوة التنافر F بين الشحنتين برمز واحد على السهمين، ويعاد توليد هذه الجملة وحدها في جيميناي */S(fig(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'r',cls:'kAuto',one:1}),'قوة التنافر F بين الشحنتين: متساوية في المقدار، ومتعاكسة في الاتجاه على الشحنتين'),'في الرسم: قوة التنافر بين الشحنتين يرمز لها F، وتؤثر على كل شحنة بالمقدار نفسه وفي اتجاهين متعاكسين.'),
    Object.assign(S(pt('<div class="kLaw">'+M('F = k·q₁·q₂ / r²')+'</div>'),'وقانون كولوم: `F = k·q₁·q₂ / r²`'),{md:'`F = k·q₁·q₂ / r²`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('F')+' القوة الكهربائية بين الشحنتين، ووحدتها النيوتن '+M('N')+'<br>'+M('k')+' ثابت كولوم، ويساوي '+M('9 × 10⁹ N·m²/C²')+'<br>'+M('q₁')+' و '+M('q₂')+' مقدار الشحنتين، ووحدتهما الكولوم '+M('C')+'<br>'+M('r')+' المسافة بين الشحنتين، ووحدتها المتر '+M('m')+'</div>'},'حيث: `F` القوة الكهربائية بين الشحنتين، ووحدتها النيوتن. و `k` ثابت كولوم، ويساوي `9 × 10⁹ N·m²/C²`. و `q₁` و `q₂` مقدار الشحنتين، ووحدتهما الكولوم. و `r` المسافة بين الشحنتين، ووحدتها المتر.'),
    S({html:'<div class="kc kPt kKeep">تحويل الوحدات: '+M('1 µC = 10⁻⁶ C')+' و '+M('1 nC = 10⁻⁹ C')+'</div>'},'ولتحويل الوحدات: `1 µC = 10⁻⁶ C`، و `1 nC = 10⁻⁹ C`.'),
    S(pt('مضاعفة المسافة ← القوة تقل إلى '+B('الربع')+' (لأن المسافة مربعة).'),'وإذا ضاعفنا المسافة تقل القوة إلى الربع، لأن المسافة مربعة في المقام.'),
    S(fig(lawScene(),'مشهد: أثر المسافة ومقدار الشحنة في القوة'),'شاهد المشهد: عِنْدَمَا نُضَاعِفُ الْمَسَافَةَ تَقِلُّ الْقُوَّةُ إِلَى الرُّبْعِ، وَعِنْدَمَا نُضَاعِفُ إِحْدَى الشُّحْنَتَيْنِ تَتَضَاعَفُ الْقُوَّهْ.')]},
  /* مثال 1 صفحة 92 */
  ex1:{title:'مثال ١ · صفحة 92',steps:()=>[
    S(q('شحنتان '+M('q₁ = 2 × 10⁻⁶ C')+' و '+M('q₂ = 3 × 10⁻⁶ C')+' والمسافة بينهما '+M('1.5 m')+'. أوجد القوة الكهربائية بينهما.','المثال · صفحة 92'),'لدينا هذا السؤال: شحنتان `q₁ = 2 × 10⁻⁶ C` و `q₂ = 3 × 10⁻⁶ C` والمسافة بينهما `1.5 m`، أوجد القوة الكهربائية بينهما.'),
    S(gr(['q₁ = 2 × 10⁻⁶ C','q₂ = 3 × 10⁻⁶ C','r = 1.5 m','k = 9 × 10⁹ N·m²/C²'],'مقدار القوة بين الشحنتين '+M('F₁₂')+' واتجاهها'),'المعطيات أمامك على السبورة. والمطلوب: مقدار القوة بين الشحنتين واتجاهها.'),
    S(fig(pair({s1:'+',s2:'+',l1:'q₁ = +2 µC',l2:'q₂ = +3 µC',r:'r = 1.5 m',F:'F₁₂ = 0.024 N'})),'لنرسم الشحنتين: q₁ و q₂ موجبتان، والمسافة بينهما متر ونصف.'),
    S(st(1,'القانون: '+M('F₁₂ = k·q₁·q₂ / r²')),'نستخدم قانون كولوم: `F₁₂ = k·q₁·q₂ / r²`'),
    S(st(2,'التعويض: '+M('F₁₂ = 9 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶ / 1.5²')),'نعوض: `F₁₂ = 9 × 10⁹ × 2 × 10⁻⁶ × 3 × 10⁻⁶ / 1.5²`'),
    S(st(3,'الحساب: '+M('F₁₂ = 0.054 ÷ 2.25 = 0.024 N')),'البسط `0.054` والمقام `2.25`، إذن `F₁₂ = 0.024 N`'),
    S(st(4,'الاتجاه: الشحنتان موجبتان، فبينهما '+B('تنافر')+': '+M('F₁')+' على '+M('q₁')+' بعيدا عن '+M('q₂')+'، و '+M('F₂')+' على '+M('q₂')+' بعيدا عن '+M('q₁')+'.<span class="kDirOn"></span>','kDir'),'والآن نحدد الاتجاه: الشحنتان موجبتان أي متشابهتان، فبينهما تنافر. انظر إلى الرسم: القوة F₁ على q₁ تتجه بعيدا عن q₂، والقوة F₂ على q₂ تتجه بعيدا عن q₁.'),
    S(res(M('F₁₂ = 0.024 N')+' قوة تنافر'),'النتيجة: `F₁₂ = 0.024 N` قوة تنافر.')]},
  /* مثال 2 صفحة 93: ثلاث شحنات */
  ex2:{title:'مثال ٢ · صفحة 93',steps:lead=>[
    S(q('ثلاث شحنات على خط واحد: '+M('q₁ = 4 µC')+' ثم '+M('q₂ = −5 µC')+' ثم '+M('q₃ = 6 µC')+'، المسافة بين '+M('q₁')+' و '+M('q₂')+' تساوي '+M('2 m')+' وبين '+M('q₂')+' و '+M('q₃')+' تساوي '+M('4 m')+'. أوجد القوة الكلية المؤثرة على '+M('q₂')+'.','المثال · صفحة 93'),(lead||'')+'لدينا هذا السؤال: ثلاث شحنات على خط واحد: `q₁ = 4 µC` ثم `q₂ = −5 µC` ثم `q₃ = 6 µC`، المسافة بين q₁ و q₂ تساوي `2 m`، وبين q₂ و q₃ تساوي `4 m`. أوجد القوة الكلية المؤثرة على q₂.'),
    S(gr(['q₁ = 4 × 10⁻⁶ C','q₂ = −5 × 10⁻⁶ C','q₃ = 6 × 10⁻⁶ C','r₁₂ = 2 m','r₂₃ = 4 m','k = 9 × 10⁹ N·m²/C²'],'القوة الكلية المؤثرة على '+M('q₂')+' واتجاهها'),'المعطيات أمامك على السبورة. والمطلوب: القوة الكلية على q₂ واتجاهها.'),
    S(fig(three()),'لنرسم الشحنات الثلاث على خط واحد: q₁ موجبة، و q₂ سالبة في الوسط، و q₃ موجبة.'),
    S(st(1,'الطريقة: نحسب القوة بين '+M('q₂')+' وكل شحنة وحدها، ونحدد اتجاهها، ثم نجمع القوتين إذا كانتا في اتجاه واحد ونطرحهما إذا تعاكستا.'),'الطريقة: نحسب القوة بين q₂ وكل شحنة وحدها، ونحدد اتجاهها، ثم نجمع القوتين إذا كانتا في اتجاه واحد، ونطرحهما إذا تعاكستا.'),
    S(st(2,M('F₁₂ = 9 × 10⁹ × 4 × 10⁻⁶ × 5 × 10⁻⁶ / 2² = 0.045 N')+'، q₁ موجبة و q₂ سالبة: '+B('تجاذب')+'، فتتجه على q₂ '+B('نحو q₁')),'القوة بين q₁ و q₂: `F₁₂ = 9 × 10⁹ × 4 × 10⁻⁶ × 5 × 10⁻⁶ / 2² = 0.045 N`. والشحنتان مختلفتان فبينهما تجاذب، فتتجه هذه القوة على q₂ نحو q₁.'),
    S(st(3,M('F₂₃ = 9 × 10⁹ × 6 × 10⁻⁶ × 5 × 10⁻⁶ / 4² ≈ 0.017 N')+'، q₃ موجبة و q₂ سالبة: '+B('تجاذب')+'، فتتجه على q₂ '+B('نحو q₃')+'<span class="kDirOn"></span>','kDir'),'القوة بين q₂ و q₃: `F₂₃ = 9 × 10⁹ × 6 × 10⁻⁶ × 5 × 10⁻⁶ / 4²`، أي تقريبا `0.017 N`. وبينهما تجاذب أيضا، فتتجه على q₂ نحو q₃. انظر إلى السهمين على q₂ في الرسم.'),
    S(st(4,'القوتان متعاكستان فنطرح: '+M('Fₜₒₜₐₗ = F₁₂ − F₂₃ = 0.045 − 0.017 = 0.028 N')+'، والقوة الكلية '+B('نحو q₁')+' لأن '+M('F₁₂')+' أكبر.<span class="kTotOn"></span>','kDir'),'القوتان متعاكستان، فنطرح الصغرى من الكبرى: `F_total = 0.045 − 0.017 = 0.028 N`. والقوة الكلية تتجه نحو q₁، لأن F₁₂ هي الأكبر. لاحظ السهم البنفسجي في الرسم.'),
    S(res(M('Fₜₒₜₐₗ = 0.028 N')+' نحو '+M('q₁')),'النتيجة: القوة الكلية على q₂ تساوي `0.028 N` نحو q₁.')]},
  /* تمرين 2 */
  tr2:{title:'تمرين ١ · ورقة العمل · سؤال ٤ (صفحة 105)',sayT:'هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الرابع، صفحة 105.',steps:()=>[
    S(q('شحنتان '+M('q₁ = 3 × 10⁻⁹ C')+' و '+M('q₂ = −5 × 10⁻⁹ C')+' والمسافة بينهما '+M('2 m')+'. أوجد القوة الكهربائية.'),''),
    S(gr(['q₁ = 3 × 10⁻⁹ C','q₂ = −5 × 10⁻⁹ C','r = 2 m','k = 9 × 10⁹ N·m²/C²'],'مقدار القوة بين الشحنتين '+M('F₁₂')+' واتجاهها'),''),
    S(fig(pair({s1:'+',s2:'-',l1:'q₁ = +3 nC',l2:'q₂ = −5 nC',r:'r = 2 m',F:'F₁₂ = 3.375 × 10⁻⁸ N'})),'لنرسم الشحنتين: q₁ موجبة، و q₂ سالبة، والمسافة بينهما مِتْرَانِ.'),
    S(st(1,'القانون: '+M('F₁₂ = k·q₁·q₂ / r²')),'القانون: `F₁₂ = k·q₁·q₂ / r²`'),
    S(st(2,'التعويض: '+M('F₁₂ = 9 × 10⁹ × 3 × 10⁻⁹ × 5 × 10⁻⁹ / 2²')),'نعوض في قانون كولوم: `F₁₂ = 9 × 10⁹ × 3 × 10⁻⁹ × 5 × 10⁻⁹ / 2²`'),
    S(st(3,'الحساب: '+M('F₁₂ = 1.35 × 10⁻⁷ / 4 = 3.375 × 10⁻⁸ N')),'الحساب: `F₁₂ = 3.375 × 10⁻⁸ N`'),
    S(st(4,'الاتجاه: الشحنتان مختلفتان، فبينهما '+B('تجاذب')+': '+M('F₁')+' على '+M('q₁')+' نحو '+M('q₂')+'، و '+M('F₂')+' على '+M('q₂')+' نحو '+M('q₁')+'.<span class="kDirOn"></span>','kDir'),''),
    S(res(M('F₁₂ = 3.375 × 10⁻⁸ N')+' قوة تجاذب'),'')]},
}};
/* رسوم الأمثلة والتمارين التفاعلية: تطابق بالأرقام في نص السؤال */
const REPT='الاتجاه: الشحنتان موجبتان فبينهما تنافر، وكل قوة تبعد شحنتها عن الأخرى';
const PFIG={'3-1':[
  [/ثلاث شحنات/,()=>three(),'الاتجاه: F₁₂ على q₂ نحو q₁ و F₂₃ نحو q₃، والقوة الكلية Fₜₒₜₐₗ = 0.028 N نحو q₁'],
  [/1\.5\s*m/,()=>pair({s1:'+',s2:'+',l1:'q₁ = +2 µC',l2:'q₂ = +3 µC',r:'r = 1.5 m',F:'F₁₂ = 0.024 N'}),REPT],
  [/3\s*nC/,()=>pair({s1:'+',s2:'-',l1:'q₁ = +3 nC',l2:'q₂ = −5 nC',r:'r = 2 m',F:'F₁₂ = 3.375 × 10⁻⁸ N'}),'الاتجاه: الشحنتان مختلفتان فبينهما تجاذب، وكل قوة تتجه نحو الشحنة الأخرى'],
  [/0\.3\s*m/,()=>pair({s1:'+',s2:'+',l1:'q₁ = +4 µC',l2:'q₂ = +2 µC',r:'r = 0.3 m',F:'F₁₂ = 0.8 N'}),REPT],
  [/0\.5\s*m/,()=>pair({s1:'+',s2:'+',l1:'q₁ = +5 µC',l2:'q₂ = +4 µC',r:'r = 0.5 m',F:'F₁₂ = 0.72 N'}),REPT],
  [/0\.9\s*N/,()=>pair({s1:'+',s2:'+',l1:'q₁ = +3 µC',l2:'q₂ = +3 µC',r:'r = 0.3 m',F:'F₁₂ = 0.9 N'}),REPT]]};
/* ===== الدرس النموذجي 3-3: المجال الكهربائي وخطوطه (بنفس طريقة درس كولوم 3-1) ===== */
const EGR='',EGRD='<defs><linearGradient id="kc-aE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a7f3d0"/><stop offset=".5" stop-color="#10b981"/><stop offset="1" stop-color="#065f46"/></linearGradient>'+
  '<radialGradient id="kc-halo"><stop offset="0" stop-color="#ef4444" stop-opacity=".30"/><stop offset=".55" stop-color="#ef4444" stop-opacity=".10"/><stop offset="1" stop-color="#ef4444" stop-opacity="0"/></radialGradient>'+
  '<linearGradient id="kc-plP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7f1d1d"/><stop offset=".5" stop-color="#ef4444"/><stop offset="1" stop-color="#991b1b"/></linearGradient>'+
  '<linearGradient id="kc-plN" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".5" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e40af"/></linearGradient><linearGradient id="kc-dyF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fef9c3"/><stop offset=".55" stop-color="#fde68a"/><stop offset="1" stop-color="#facc15"/></linearGradient><linearGradient id="kc-mtF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset=".2" stop-color="#cbd5e1"/><stop offset=".42" stop-color="#f1f5f9"/><stop offset=".62" stop-color="#94a3b8"/><stop offset=".82" stop-color="#e2e8f0"/><stop offset="1" stop-color="#64748b"/></linearGradient><linearGradient id="kc-mtT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cbd5e1"/></linearGradient><linearGradient id="kc-mtS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2e8f0"/><stop offset=".25" stop-color="#94a3b8"/><stop offset=".45" stop-color="#f8fafc"/><stop offset=".6" stop-color="#cbd5e1"/><stop offset=".8" stop-color="#7c8a9e"/><stop offset="1" stop-color="#cbd5e1"/></linearGradient><linearGradient id="kc-pP2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#991b1b"/><stop offset=".35" stop-color="#f87171"/><stop offset=".55" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/></linearGradient><linearGradient id="kc-pN2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".35" stop-color="#60a5fa"/><stop offset=".55" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient><linearGradient id="kc-cB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d4ed8"/><stop offset=".3" stop-color="#60a5fa"/><stop offset=".6" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient><linearGradient id="kc-bt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b5563"/><stop offset=".3" stop-color="#9ca3af"/><stop offset=".55" stop-color="#1f2937"/><stop offset="1" stop-color="#030712"/></linearGradient><linearGradient id="kc-bc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b45309"/><stop offset=".3" stop-color="#fcd34d"/><stop offset=".6" stop-color="#d97706"/><stop offset="1" stop-color="#78350f"/></linearGradient><linearGradient id="kc-wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6a46a"/><stop offset="1" stop-color="#b07a44"/></linearGradient><linearGradient id="kc-lg" x1="0" x2="1"><stop offset="0" stop-color="#6b7280"/><stop offset=".5" stop-color="#f3f4f6"/><stop offset="1" stop-color="#4b5563"/></linearGradient><radialGradient id="kc-sd"><stop offset="0" stop-color="#0b1220" stop-opacity=".35"/><stop offset="1" stop-color="#0b1220" stop-opacity="0"/></radialGradient></defs>';
const EC='#0f766e',ECL='#14b8a6';
const lblR=(x,y,t,c,sz)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz||14.5}" font-weight="800" fill="${c||'#1e3a5f'}" direction="rtl" unicode-bidi="plaintext">${t}</text>`;
const tagR=(x,y,t,c,w)=>{const k=TS;w=(w||t.length*8.6+30)*k;return `<rect x="${f1(x-w/2)}" y="${f1(y-15*k)}" width="${f1(w)}" height="${f1(30*k)}" rx="${f1(15*k)}" fill="${c}"/><text x="${x}" y="${f1(y+6*k)}" text-anchor="middle" font-size="${f1(15*k)}" font-weight="800" fill="#fff" direction="rtl" unicode-bidi="plaintext">${t}</text>`};
/* سهم المجال الأخضر (ينمو بنفس حركة أسهم القوى) */
const arrowE=(x1,x2,y,d,th)=>arrow(x1,x2,y,'F',d,th).replace('url(#kc-aF)','url(#kc-aE)').replace('#78350f','#064e3b');
/* سهم ثابت بأي زاوية */
function arrA(x,y,ang,len,col,th){th=th||9;const hl=Math.min(18,len*.45),hw=th*1.1,b=len-hl;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"><polygon points="0,${-th/2} ${f1(b)},${-th/2} ${f1(b)},${-hw} ${f1(len)},0 ${f1(b)},${hw} ${f1(b)},${th/2} 0,${th/2}" fill="${col||'#f59e0b'}" stroke="rgba(0,0,0,.35)" stroke-width="1"/></g>`}
const sph=(x,y,r,s)=>sphere(x,y,r,s,y+4).replace(/<ellipse[^>]*kc-sh[^>]*\/>/,'');
/* تتبع خطوط المجال لشحنات نقطية */
function eAt(C,x,y){let ex=0,ey=0;C.forEach(c=>{const dx=x-c.x,dy=y-c.y,r2=dx*dx+dy*dy,r=Math.sqrt(r2)||1e-6;ex+=c.q*dx/(r2*r);ey+=c.q*dy/(r2*r)});return [ex,ey]}
function trace(C,x,y,W,H,R){const P=[[x,y]];for(let i=0;i<900;i++){const [ex,ey]=eAt(C,x,y),m=Math.hypot(ex,ey)||1e-9;x+=3*ex/m;y+=3*ey/m;P.push([x,y]);
    if(x<-20||x>W+20||y<-20||y>H+20)break;if(C.some(c=>c.q<0&&Math.hypot(x-c.x,y-c.y)<R))break}return P}
const pD=P=>'M'+P.map(p=>f1(p[0])+','+f1(p[1])).join(' L');
/* رأس سهم صغير على الخط عند نسبة f من طوله */
function headAt(P,f,col){const i=Math.max(1,Math.min(P.length-2,Math.round((P.length-1)*f))),[x,y]=P[i],[a,b]=P[i-1],ang=Math.atan2(y-b,x-a)*180/Math.PI;
  return `<polygon points="-7,-6 7,0 -7,6" fill="${col}" transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)})"/>`}
/* خط مجال متدفق (شرطات تتحرك في اتجاه المجال) */
const flowLine=(d,col,dur)=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="2.4" opacity=".35"/><path d="${d}" fill="none" stroke="${col}" stroke-width="2.6" stroke-dasharray="7 11" stroke-linecap="round"><animate attributeName="stroke-dashoffset" from="36" to="0" dur="${dur||1.2}s" repeatCount="indefinite"/></path>`;
/* خطوط شعاعية حول شحنة منفردة */
function radial(cx,cy,R,L,n,out,col,rot){let g='';for(let i=0;i<n;i++){const a=(i/n)*2*Math.PI+(rot||0),x1=cx+R*Math.cos(a),y1=cy+R*Math.sin(a),x2=cx+L*Math.cos(a),y2=cy+L*Math.sin(a);
    const P=out?[[x1,y1],[x2,y2]]:[[x2,y2],[x1,y1]];g+=flowLine(pD(P),col)+headAt([P[0],[(P[0][0]+P[1][0])/2,(P[0][1]+P[1][1])/2],P[1]],.55,col)}return g}

/* 1) المجال: المنطقة حول الشحنة التي يظهر فيها تأثيرها (مشهد متحرك 12 ث) */
function eIntroScene(){const W=640,H=330,D=12,cx=300,cy=185;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<circle cx="${cx}" cy="${cy}" r="150"  fill="url(#kc-halo)"><animate attributeName="r" values="140;158;140" dur="3s" repeatCount="indefinite"/></circle>`;
  b+=radial(cx,cy,40,150,12,true,'#f87171');
  b+=sph(cx,cy,34,'+')+lbl(cx,cy+58,'Q','#b91c1c',17);
  const T=(x,y,ang,len,t0,lab)=>scShow(D,t0,D-.2,sph(x,y,12,'+')+arrA(x+14*Math.cos(ang*Math.PI/180),y+14*Math.sin(ang*Math.PI/180),ang,len,'#f59e0b',9)+lbl(x,y-20,'q₀','#b91c1c',15)+(lab?lbl(x+(len+30)*Math.cos(ang*Math.PI/180),y+(len+30)*Math.sin(ang*Math.PI/180)+5,lab,'#b45309',15):''),true);
  b+=T(cx+92,cy,0,86,1.6,'F');
  b+=T(cx+150*Math.cos(-2.3),cy+150*Math.sin(-2.3),-2.3*180/Math.PI,38,4.6,'F');
  b+=T(cx+210*Math.cos(.55),cy+210*Math.sin(.55),.55*180/Math.PI,18,4.6,'');
  b+=scCap(D,W,'1. شحنة موجبة Q يحيط بها مجال كهربائي','#475569',0,1.6)+scCap(D,W,'2. شحنة اختبار q₀ قريبة: تتأثر بقوة كبيرة','#b45309',1.6,4.6)+scCap(D,W,'3. كلما ابتعدنا عن الشحنة ضعفت القوة','#0f766e',4.6,8)+scCap(D,W,'4. المجال: المنطقة التي يظهر فيها تأثير الشحنة','#7e22ce',8,D);
  return svg(W,H,b,'kScene')}
/* 2) تمثيل المجال بالخطوط: الاتجاه والشدة */
function eRepFig(){const W=640,H=320,cx=320,cy=170;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=radial(cx,cy,38,165,16,true,'#dc2626');b+=sph(cx,cy,32,'+');
  b+=`<circle cx="${cx}" cy="${cy}" r="70" fill="none" stroke="#0f766e" stroke-width="2" stroke-dasharray="4 5"/><circle cx="${cx}" cy="${cy}" r="150" fill="none" stroke="#64748b" stroke-width="2" stroke-dasharray="4 5"/>`;
  b+=`<g>${tagR(cx+128,cy-62,'متقاربة: مجال قوي','#0f766e',150)}</g><g>${tagR(cx-180,cy+130,'متباعدة: مجال ضعيف','#475569',160)}</g>`;
  b+=`<g>${tagR(120,40,'الخط يحدد اتجاه المجال','#b45309',190)}</g>`;
  return svg(W,H,b,'kAuto')}
/* 3) أشكال الخطوط: تخرج من الموجبة وتدخل في السالبة (متحرك) */
function eShapesScene(){const W=640,H=320;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=radial(165,160,36,128,12,true,'#dc2626')+sph(165,160,30,'+');
  b+=radial(475,160,36,128,12,false,'#2563eb')+sph(475,160,30,'-');
  b+=`<line x1="320" y1="30" x2="320" y2="290" stroke="#c9daf0" stroke-width="2" stroke-dasharray="6 6"/>`;
  b+=`<g>${tagR(165,304,'تخرج من الموجبة (إلى الخارج)','#b91c1c',230)}</g><g>${tagR(475,304,'تدخل في السالبة (إلى الداخل)','#1d4ed8',230)}</g>`;
  return svg(W,H,b,'kScene')}
/* 4) خطوط المجال لشحنتين (مختلفتين أو متشابهتين) مرسومة بالحساب، ولا تتقاطع */
function ePairLines(like){const W=640,H=330,y=165,x1=210,x2=430,R=30;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const C=[{x:x1,y,q:1},{x:x2,y,q:like?1:-1}],n=16;let ls='';
  C.filter(c=>c.q>0).forEach(c=>{for(let i=0;i<n;i++){const a=(i+.5)/n*2*Math.PI,P=trace(C,c.x+R*Math.cos(a),c.y+R*Math.sin(a),W,H,R);if(P.length<8)continue;
    ls+=flowLine(pD(P),'#0f766e',1.4)+headAt(P,like?.35:.5,'#0f766e')}});
  if(!like){const c=C[1];for(let i=0;i<n;i++){const a=(i+.5)/n*2*Math.PI;let x=c.x+R*Math.cos(a),y0=c.y+R*Math.sin(a),yy=y0;const P=[[x,yy]];let hit=false;
    for(let k=0;k<900;k++){const [ex,ey]=eAt(C,x,yy),m=Math.hypot(ex,ey)||1e-9;x-=3*ex/m;yy-=3*ey/m;P.push([x,yy]);if(x<-20||x>W+20||yy<-20||yy>H+20)break;if(Math.hypot(x-C[0].x,yy-C[0].y)<R){hit=true;break}}
    if(hit||P.length<8)continue;P.reverse();ls+=flowLine(pD(P),'#0f766e',1.4)+headAt(P,.5,'#0f766e')}}
  b+=ls+sph(x1,y,R-2,'+')+sph(x2,y,R-2,like?'+':'-');
  b+=lbl(x1,y+R+26,'+q','#b91c1c',16)+lbl(x2,y+R+26,like?'+q':'−q',like?'#b91c1c':'#1d4ed8',16);
  b+=`<g>${scTag(W/2,26,like?'شحنتان متشابهتان: الخطوط تتنافر ولا تتقاطع':'شحنتان مختلفتان: من الموجبة إلى السالبة، ولا تتقاطع',like?'#7f1d1d':'#1e3a8a',like?360:420)}</g>`;
  return svg(W,H,b,'kScene')}
/* 5) نوعا المجال: منتظم وغير منتظم */
function eTypesFig(){const W=640,H=320;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=plateCap(70,190,96,250,6,0,'',4).svg;
  b+=`<g>${tagR(160,295,'منتظم: ثابت الشدة والاتجاه','#0f766e',220)}</g>`;
  b+=`<line x1="320" y1="30" x2="320" y2="300" stroke="#c9daf0" stroke-width="2" stroke-dasharray="6 6"/>`;
  /* غير منتظم: شحنة نقطية */
  b+=radial(480,160,32,125,12,true,'#dc2626')+sph(480,160,28,'+');
  b+=`<g>${tagR(480,295,'غير منتظم: يتغير مقداره واتجاهه','#7e22ce',240)}</g>`;
  return svg(W,H,b,'kScene')}
/* 6) شدة المجال: نضاعف شحنة الاختبار فتتضاعف القوة ويبقى E ثابتا (متحرك 12 ث) */
function eTestScene(){const W=640,H=330,D=12,cy=175,Qx=120,Px=380;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=radial(Qx,cy,40,150,10,true,'#fca5a5');b+=sph(Qx,cy,34,'+')+lbl(Qx,cy+58,'Q','#b91c1c',17);
  b+=`<line x1="${Qx+40}" y1="${cy}" x2="${Px}" y2="${cy}" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5 5"/>`+lbl(Px,cy+44,'P','#1e3a5f',17);
  b+=scShow(D,1.4,6.2,sph(Px,cy,12,'+')+lbl(Px,cy-22,'q₀','#b91c1c',16)+arrA(Px+14,cy,0,80,'#f59e0b',10)+lbl(Px+70,cy-16,'F','#b45309',18),true);
  b+=scShow(D,6.2,D-.1,sph(Px,cy,17,'+')+lbl(Px,cy-27,'2q₀','#b91c1c',16)+arrA(Px+19,cy,0,160,'#f59e0b',12)+lbl(Px+110,cy-18,'2F','#b45309',18),true);
  b+=scShow(D,3,D-.1,`<g>${scTag(W/2+40,86,'E = F / q₀','#0f766e',160)}</g>`,true);
  b+=scShow(D,8.4,D-.1,`<g>${scTag(W/2-10,268,'E = 2F / 2q₀ = F / q₀','#7e22ce',230)+tagR(W/2+170,268,'لا يتغير','#0f766e',90)}</g>`,true);
  b+=scCap(D,W,'1. شحنة اختبار q₀ عند النقطة P تتأثر بقوة F','#b45309',0,6.2)+scCap(D,W,'2. نضاعف شحنة الاختبار: تتضاعف القوة','#475569',6.2,8.4)+scCap(D,W,'3. شدة المجال عند النقطة لا تتغير','#7e22ce',8.4,D);
  return svg(W,H,b,'kScene')}
/* 7) المجال المنتظم بين لوحين: شحنة تتحرك وقوتها ثابتة (متحرك 8 ث) */
function eUniformScene(){const W=640,H=375,D=8,L=200,Rr=390,top=104,bot=250;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const P=plateCap(L,Rr,top,bot,5,318,'V',4);b+=P.svg;
  const mv=sph(0,0,12,'+')+arrA(14,0,0,60,'#f59e0b',9)+lbl(46,-14,'F','#b45309',16);
  b+=scMove(D,[[0,L+P.g.dx+14,150],[D-1,Rr-40,150]],mv);
  b+=`<g>${scTag(W/2-90,30,'E = V / d','#0f766e',130)}${tagR(W/2+90,30,'ثابت في كل النقاط','#7e22ce',170)}</g>`;
  b+=dim(L,Rr+2,bot+16,'d');
  return svg(W,H,b,'kScene')}
/* 8) مجال شحنة نقطية: يقل مع مربع المسافة (متحرك 12 ث) */
function ePointScene(){const W=640,H=320,D=12,cx=80,cy=165,u=140;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=radial(cx,cy,38,260,14,true,'#fecaca');b+=sph(cx,cy,32,'+')+lbl(cx,cy+56,'q','#b91c1c',17);
  const pt=(k,len,lab,t0)=>{const x=cx+k*u*.95;return scShow(D,t0,D-.1,`<circle cx="${x}" cy="${cy}" r="6" fill="#1e3a5f"/>`+arrA(x+8,cy,0,len,'#10b981',11)+`<g>${scTag(x+20,cy-40,lab,'#0f766e',lab.length*9+40)}</g>`+`<line x1="${cx}" y1="${cy+70+k*14}" x2="${x}" y2="${cy+70+k*14}" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="5 4"/>`+lbl(x-10,cy+66+k*14,k===1?'r':k+'r','#0369a1',15),true)};
  b+=pt(1,108,'E',1)+pt(2,27,'E / 4',4.2)+pt(3,13,'E / 9',7.2);
  b+=scCap(D,W,'1. على بعد r: المجال E','#0f766e',0,4.2)+scCap(D,W,'2. ضعف المسافة: المجال يقل إلى الربع','#b45309',4.2,7.2)+scCap(D,W,'3. ثلاثة أضعاف المسافة: المجال يقل إلى التسع','#7e22ce',7.2,D);
  return svg(W,H,b,'kScene')}
/* 9) القوة على شحنة من شحنتين: نحسب كل قوة ثم نجمعهما مع مراعاة الاتجاه */
function eMultiFig(){const W=640,H=320,y=140;let b=EGR+stage(W,H,200);
  b+=sphere(110,y,30,'+',200)+sphere(530,y,30,'-',200)+sphere(300,y,16,'+',200);
  b+=lbl(110,y-44,'q₁','#b91c1c',18)+lbl(530,y-44,'q₂','#1d4ed8',18)+lbl(300,y-28,'q₀','#b91c1c',16);
  b+=arrow(318,408,y-10,'F',.1,10)+pill(372,y-42,'F₁','#b45309',.2);
  b+=arrow(318,388,y+12,'F',.5,10)+pill(356,y+44,'F₂','#b45309',.6);
  b+=arrow(230,390,256,'R',1,14)+pill(310,292,'Fₜₒₜₐₗ = F₁ + F₂','#7e22ce',1.3);
  b+=pill(W/2,34,'القوتان في اتجاه واحد: نجمعهما','#0f766e',.8);
  return svg(W,H,b,'kAuto')}
/* رسوم الأمثلة: مجال على بعد r من شحنة نقطية */
function eAtP(o){const W=640,H=300,FY=196,y=128,Qx=150,Px=440;let b=EGR+stage(W,H,FY);
  b+=`<line x1="${Qx+36}" y1="${y}" x2="${Px}" y2="${y}" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5 5"/>`;
  b+=sphere(Qx,y,34,'+',FY)+lbl(Qx,y-50,o.q,'#b91c1c',18)+`<circle cx="${Px}" cy="${y}" r="7" fill="#1e3a5f"/>`+lbl(Px,y-20,'P','#1e3a5f',18);
  b+=arrowE(Px+10,Px+120,y,.1,13)+(o.E?pill(Px+66,y+40,o.E,EC,.3):'')+(o.r?dim(Qx,Px,FY+44,o.r):'');
  return svg(W,H,b,o.cls)}
/* رسوم الأمثلة: شحنة اختبار في مجال وقوة عليها */
function eTestQ(o){const W=640,H=300,FY=196,y=128,Px=300;let b=EGR+stage(W,H,FY);
  for(let i=0;i<4;i++){const yy=58+i*32;b+=`<line x1="60" y1="${yy}" x2="580" y2="${yy}" stroke="#99f6e4" stroke-width="2" stroke-dasharray="7 9"/><polygon points="-6,-5 6,0 -6,5" fill="#5eead4" transform="translate(${120+i*120} ${yy})"/>`}
  b+=sphere(Px,y,20,'+',FY)+lbl(Px,y-30,o.q,'#b91c1c',17);
  b+=arrow(Px+24,Px+140,y,'F',.1,12)+pill(Px+80,y+40,o.F,'#b45309',.3);
  b+=(o.E?pill(W/2,FY+50,o.E,EC,.6):'')+lbl(90,36,'E','#0f766e',18);
  return svg(W,H,b,o.cls)}
const lawE=(f,t)=>`<div class="kLawBox"><div class="kLawF"><bdi dir="ltr">${f}</bdi></div>${t?`<div class="kLawT">${t.map(x=>`<span>${x}</span>`).join('')}</div>`:''}</div>`;
CARDS['3-3']={
  field:{title:'المجال الكهربائي',sayT:'نبدأ أول موضوعات درسنا: المجال الكهربائي.',steps:()=>[
    S(pt(B('المجال الكهربائي')+': هو المنطقة المحيطة بالشحنة الكهربائية التي يظهر فيها تأثيرها.'),''),
    S(fig(eIntroScene(),'مشهد: المجال الكهربائي حول شحنة موجبة'),'شاهد المشهد: حول الشحنة الموجبة منطقة يظهر فيها تأثيرها. عندما نضع فيها شحنة اختبار صغيرة تتأثر بقوة، وكلما ابتعدنا عن الشحنة ضعفت القوة. هذه المنطقة هي المجال الكهربائي.'),
    S(pt('لا نرى المجال الكهربائي، لكننا نعرف وجوده من '+B('القوة')+' التي يؤثر بها على شحنة توضع فيه.'),'')]},
  rep:{title:'تمثيل المجال الكهربائي',sayT:'والآن، كيف نمثل المجال الكهربائي بالرسم؟',steps:()=>[
    S(pt('يمكن تمثيل المجال الكهربائي بخطوط تعرف باسم '+B('خطوط المجال الكهربائي')+'.'),''),
    S(pt(B('أهمية خطوط المجال')+': (1) تحديد '+B('اتجاه')+' المجال. (2) تحديد '+B('شدة')+' المجال الكهربائي.'),''),
    S(fig(eRepFig(),'اتجاه الخط يحدد اتجاه المجال، وتقارب الخطوط يدل على قوته'),'لاحظ الرسم: اتجاه الخط يحدد اتجاه المجال. وقرب الشحنة تكون الخطوط متقاربة فالمجال قوي، وبعيدا عنها تكون متباعدة فالمجال ضعيف.')]},
  props:{title:'خصائص خطوط المجال الكهربائي',sayT:'ولخطوط المجال الكهربائي خصائص مهمة، لنتعرف عليها.',steps:()=>[
    S(pt('تخرج دائما من الشحنة '+B('الموجبة')+' وتدخل إلى الشحنة '+B('السالبة')+'.'),''),
    S(pt(B('لا تتقاطع')+' مع بعضها البعض أبدا.'),''),
    S(pt('تكون '+B('متقاربة')+' في المجالات القوية، و'+B('متباعدة')+' في المجالات الضعيفة.'),''),
    S(fig(ePairLines(false),'مشهد: خطوط المجال بين شحنتين مختلفتين'),'شاهد المشهد: خطوط المجال تخرج من الشحنة الموجبة وتدخل في السالبة، ولا يتقاطع خطان أبدا، وتتقارب الخطوط قرب الشحنتين حيث المجال قوي.')]},
  shapes:{title:'أشكال خطوط المجال',sayT:'والآن، كيف تبدو خطوط المجال حول الشحنات؟',steps:()=>[
    S(pt(B('الشحنة الموجبة')+': خطوط المجال منتشرة إلى '+B('الخارج')+'.'),''),
    S(pt(B('الشحنة السالبة')+': خطوط المجال منتشرة إلى '+B('الداخل')+'.'),''),
    S(fig(eShapesScene(),'مشهد: الخطوط تخرج من الموجبة وتدخل في السالبة'),'شاهد المشهد: حول الشحنة الموجبة تخرج الخطوط إلى الخارج، وحول الشحنة السالبة تدخل الخطوط إلى الداخل.'),
    S(fig(ePairLines(true),'مشهد: خطوط المجال بين شحنتين متشابهتين'),'وبين شحنتين متشابهتين تتنافر الخطوط ولا تتقاطع، وتبقى بينهما منطقة خالية من الخطوط.')]},
  types:{title:'أنواع المجال الكهربائي',sayT:'وللمجال الكهربائي نوعان، لنتعرف عليهما.',steps:()=>[
    S(pt(B('المجال الكهربائي المنتظم')+': هو مجال كهربائي ثابت الشدة والاتجاه عند جميع النقاط.'),''),
    S(pt(B('المجال الكهربائي غير المنتظم')+': هو المجال المتغير في المقدار أو الاتجاه أو كليهما معا، وينشأ عن الشحنات النقطية.'),''),
    S(fig(eTypesFig(),'المنتظم بين لوحين متوازيين، وغير المنتظم حول شحنة نقطية'),'قارن في الرسم: بين اللوحين خطوط مستقيمة متوازية فالمجال منتظم، وحول الشحنة النقطية خطوط شعاعية تتباعد فالمجال غير منتظم.')]},
  strength:{title:'شدة المجال الكهربائي',sayT:'ننتقل الآن إلى الموضوع الثاني في درسنا: شدة المجال الكهربائي.',steps:()=>[
    S(pt(B('شدة المجال الكهربائي')+': القوة الكهربائية المؤثرة على وحدة الشحنات الموجبة (شحنة اختبار موجبة) الموضوعة عند تلك النقطة.'),''),
    S(fig(eTestScene(),'مشهد: نضاعف شحنة الاختبار فتتضاعف القوة، وتبقى شدة المجال ثابتة'),'شاهد المشهد: نضع شحنة اختبار عند النقطة P فتتأثر بقوة F. وعندما نضاعف شحنة الاختبار تتضاعف القوة، لكن ناتج قسمة القوة على الشحنة يبقى ثابتا، وهو شدة المجال عند النقطة.'),
    Object.assign(S(pt('<div class="kLaw">'+M('E = F / q₀')+'</div>'),'وقانون شدة المجال: `E = F / q₀`'),{md:'`E = F / q₀`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('E')+' شدة المجال الكهربائي، ووحدتها '+M('N/C')+'<br>'+M('F')+' القوة الكهربائية المؤثرة على شحنة الاختبار، ووحدتها النيوتن '+M('N')+'<br>'+M('q₀')+' شحنة الاختبار، ووحدتها الكولوم '+M('C')+'</div>'},'حيث: `E` شدة المجال الكهربائي، ووحدتها نيوتن لكل كولوم. و `F` القوة الكهربائية المؤثرة على شحنة الاختبار، ووحدتها النيوتن. و `q₀` شحنة الاختبار، ووحدتها الكولوم.'),
    S(pt('شدة المجال '+B('كمية متجهة')+'، واتجاهها هو اتجاه القوة المؤثرة على شحنة الاختبار الموجبة.'),'')]},
  uniform:{title:'المجال الكهربائي المنتظم',sayT:'والآن، لنتعرف أكثر على المجال الكهربائي المنتظم.',steps:()=>[
    S(pt(B('تعريفه')+': مجال كهربائي ثابت الشدة والاتجاه عند جميع النقاط.'),''),
    S(pt(B('كيف ينشأ؟')+' بين لوحين معدنيين متوازيين (مكثف) موصلين بمصدر جهد مستمر.'),''),
    S(pt(B('خطوطه')+': مستقيمة ومتوازية ومتساوية التباعد، وتتجه من اللوح الموجب إلى اللوح السالب.'),''),
    S(fig(eUniformScene(),'مشهد: الشحنة بين اللوحين تتأثر بالقوة نفسها في كل مكان'),'شاهد المشهد: بين اللوحين خطوط مستقيمة متوازية من اللوح الموجب إلى السالب، والشحنة أينما كانت بينهما تتأثر بالقوة نفسها، لأن المجال منتظم.'),
    Object.assign(S(pt('<div class="kLaw">'+M('E = V / d')+'</div>'),'وقانونه: `E = V / d`'),{md:'`E = V / d`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('E')+' شدة المجال المنتظم، ووحدتها '+M('N/C')+' (وتكافئ '+M('V/m')+')<br>'+M('V')+' فرق الجهد بين اللوحين، ووحدته الفولت '+M('V')+'<br>'+M('d')+' المسافة بين اللوحين، ووحدتها المتر '+M('m')+'</div>'},'حيث: `E` شدة المجال المنتظم، ووحدتها نيوتن لكل كولوم، وتكافئ فولت لكل متر. و `V` فرق الجهد بين اللوحين، ووحدته الفولت. و `d` المسافة بين اللوحين، ووحدتها المتر.')]},
  point:{title:'المجال الكهربائي غير المنتظم (الناشئ عن شحنة نقطية)',sayT:'وننتقل إلى المجال الكهربائي غير المنتظم، الناشئ عن شحنة نقطية.',steps:()=>[
    S(pt(B('تعريفه')+': مجال يتغير في المقدار أو الاتجاه أو كليهما معا، وينشأ عن الشحنات النقطية.'),''),
    S(pt(B('خطوطه')+': شعاعية، تخرج من الشحنة الموجبة وتدخل في السالبة، وتتباعد كلما ابتعدنا عن الشحنة فيضعف المجال.'),''),
    Object.assign(S(pt('<div class="kLaw">'+M('E = k·q / r²')+'</div>'),'وقانونه: `E = k·q / r²`'),{md:'`E = k·q / r²`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('E')+' شدة المجال الكهربائي عند النقطة، ووحدتها '+M('N/C')+'<br>'+M('k')+' ثابت كولوم، ويساوي '+M('9 × 10⁹ N·m²/C²')+'<br>'+M('q')+' الشحنة المولدة للمجال، ووحدتها الكولوم '+M('C')+'<br>'+M('r')+' بعد النقطة عن الشحنة، ووحدته المتر '+M('m')+'</div>'},'حيث: `E` شدة المجال الكهربائي عند النقطة، ووحدتها نيوتن لكل كولوم. و `k` ثابت كولوم، ويساوي `9 × 10⁹ N·m²/C²`. و `q` الشحنة المولدة للمجال، ووحدتها الكولوم. و `r` بُعْدُ النقطة عن الشحنة، ووحدته المتر.'),
    S(pt('مضاعفة المسافة ← المجال يقل إلى '+B('الربع')+' (لأن المسافة مربعة).'),'وإذا ضاعفنا المسافة يقل المجال إلى الربع، لأن المسافة مربعة في المقام.'),
    S(fig(ePointScene(),'مشهد: المجال يضعف كلما ابتعدنا عن الشحنة'),'شاهد المشهد: عَلَى بُعْدِ r يكون المجال E، وعند ضعف المسافة يقل إلى الربع، وعند ثلاثة أضعافها يقل إلى التسع.')]},
  multi:{title:'القوة على شحنات متعددة',sayT:'وإذا أثرت أكثر من شحنة على شحنة واحدة، فكيف نحسب القوة عليها؟',steps:()=>[
    S(pt('احسب كل قوة على حدة بقانون كولوم، ثم اجمعها مع مراعاة الاتجاهات.'),''),
    S(fig(eMultiFig(),'القوتان على q₀ في اتجاه واحد، فالقوة الكلية مجموعهما'),'لاحظ الرسم: الشحنة الموجبة q₁ تدفع q₀ بعيدا عنها، والشحنة السالبة q₂ تجذبها نحوها، فالقوتان في اتجاه واحد، والقوة الكلية مجموعهما. وإذا تعاكستا نطرح الصغرى من الكبرى.')]},
  ex1:{title:'مثال ١ · صفحة 95',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، من صفحة 95.',steps:()=>[
    S(q('أوجد شدة المجال الكهربائي على بعد '+M('0.3 m')+' من شحنة كهربائية '+M('q = 5 × 10⁻⁹ C')+'.','المثال · صفحة 95'),''),
    S(gr(['q = 5 × 10⁻⁹ C','r = 0.3 m','k = 9 × 10⁹ N·m²/C²'],'شدة المجال '+M('E')+' عند النقطة واتجاهه'),''),
    S(fig(eAtP({q:'q = +5 nC',r:'r = 0.3 m',E:'E = 500 N/C'})),'لنرسم الشحنة الموجبة والنقطة P عَلَى بُعْدِ ثلاثة أعشار المتر منها.'),
    S(st(1,'القانون: '+M('E = k·q / r²')+' لأن المجال ناشئ عن شحنة نقطية واحدة.'),'نستخدم قانون مجال الشحنة النقطية: `E = k·q / r²`، لأن المجال هنا ناشئ عن شحنة نقطية واحدة.'),
    S(st(2,'التعويض: '+M('E = 9 × 10⁹ × 5 × 10⁻⁹ / 0.3²')),'نعوض: `E = 9 × 10⁹ × 5 × 10⁻⁹ / 0.3²`'),
    S(st(3,'الحساب: '+M('E = 45 ÷ 0.09 = 500 N/C')),'البسط `45` والمقام `0.09`، إذن `E = 500 N/C`'),
    S(st(4,'الاتجاه: الشحنة '+B('موجبة')+'، فالمجال عند النقطة يتجه '+B('بعيدا عن الشحنة')+'.<span class="kDirOn"></span>','kDir'),'والآن نحدد الاتجاه: الشحنة موجبة، وخطوط المجال تخرج من الشحنة الموجبة، لذلك يتجه المجال عند النقطة بعيدا عن الشحنة. انظر إلى السهم الأخضر في الرسم.'),
    S(res(M('E = 500 N/C')+' بعيدا عن الشحنة'),'النتيجة: `E = 500 N/C` باتجاه بعيد عن الشحنة.')]},
  ex2:{title:'مثال ٢ · صفحة 95',sayT:'وتأمل معي المثال الثاني، من صفحة 95.',steps:()=>[
    S(q('شحنة كهربائية '+M('2 × 10⁻⁹ C')+' وضعت عند نقطة في مجال كهربائي فتأثرت بقوة '+M('4 × 10⁻⁶ N')+'. ما مقدار المجال الكهربائي في تلك النقطة؟','المثال · صفحة 95'),''),
    S(gr(['q₀ = 2 × 10⁻⁹ C','F = 4 × 10⁻⁶ N'],'شدة المجال '+M('E')+' عند النقطة'),''),
    S(fig(eTestQ({q:'q₀ = 2 nC',F:'F = 4 × 10⁻⁶ N',E:'E = 2000 N/C'})),'لنرسم شحنة الاختبار في المجال، والقوة المؤثرة عليها.'),
    S(st(1,'القانون: '+M('E = F / q₀')+' لأننا نعرف القوة المؤثرة على الشحنة.'),'نستخدم تعريف شدة المجال: `E = F / q₀`، لأننا نعرف القوة التي أثر بها المجال على الشحنة.'),
    S(st(2,'التعويض: '+M('E = 4 × 10⁻⁶ / 2 × 10⁻⁹')),'نعوض: `E = 4 × 10⁻⁶ / 2 × 10⁻⁹`'),
    S(st(3,'الحساب: '+M('E = 2 × 10³ N/C = 2000 N/C')+'<span class="kDirOn"></span>'),'نقسم الأعداد: أربعة على اثنين يساوي اثنين، ونطرح الأسس، إذن `E = 2000 N/C`'),
    S(res(M('E = 2 × 10³ N/C')),'النتيجة: `E = 2 × 10³ N/C`.'),
    S(pt(B('ملاحظة')+': قيمة المجال صفة للنقطة نفسها، فلو وضعنا شحنة أكبر لزادت القوة بالنسبة نفسها وبقي '+M('E')+' ثابتا.'),'')]},
  tr1:{title:'تمرين ١ · ورقة العمل · سؤال ٥ (صفحة 105)',sayT:'هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الخامس، صفحة 105.',steps:()=>[
    S(q('شحنة '+M('4 × 10⁻⁶ C')+' تأثرت بقوة '+M('8 × 10⁻³ N')+'. ما شدة المجال؟'),''),
    S(gr(['q₀ = 4 × 10⁻⁶ C','F = 8 × 10⁻³ N'],'شدة المجال '+M('E')),''),
    S(fig(eTestQ({q:'q₀ = 4 µC',F:'F = 8 × 10⁻³ N',E:'E = 2000 N/C'})),'لنرسم شحنة الاختبار والقوة المؤثرة عليها.'),
    S(st(1,'القانون: '+M('E = F / q₀')),'القانون: `E = F / q₀`'),
    S(st(2,'التعويض: '+M('E = 8 × 10⁻³ / 4 × 10⁻⁶')),'نعوض: `E = 8 × 10⁻³ / 4 × 10⁻⁶`'),
    S(st(3,'الحساب: '+M('E = 2 × 10³ = 2000 N/C')+'<span class="kDirOn"></span>'),'الحساب: `E = 2000 N/C`'),
    S(res(M('E = 2000 N/C')),'')]},
  tr2:{title:'تمرين ٢ · ورقة العمل · سؤال ٦ (صفحة 105)',sayT:'والتمرين الثاني، من ورقة العمل، السؤال السادس، صفحة 105.',steps:()=>[
    S(q('أوجد شدة المجال الكهربائي على بعد '+M('0.25 m')+' من شحنة كهربائية مقدارها '+M('3 × 10⁻⁹ C')+'.'),''),
    S(gr(['q = 3 × 10⁻⁹ C','r = 0.25 m','k = 9 × 10⁹ N·m²/C²'],'شدة المجال '+M('E')+' واتجاهه'),''),
    S(fig(eAtP({q:'q = +3 nC',r:'r = 0.25 m',E:'E = 432 N/C'})),'لنرسم الشحنة والنقطة عَلَى بُعْدِ ربع متر منها.'),
    S(st(1,'القانون: '+M('E = k·q / r²')),'القانون: `E = k·q / r²`'),
    S(st(2,'التعويض: '+M('E = 9 × 10⁹ × 3 × 10⁻⁹ / 0.25²')),'نعوض: `E = 9 × 10⁹ × 3 × 10⁻⁹ / 0.25²`'),
    S(st(3,'الحساب: '+M('E = 27 ÷ 0.0625 = 432 N/C')),'البسط `27` والمقام `0.0625`، إذن `E = 432 N/C`'),
    S(st(4,'الاتجاه: الشحنة موجبة، فالمجال يتجه '+B('بعيدا عنها')+'.<span class="kDirOn"></span>','kDir'),''),
    S(res(M('E = 432 N/C')+' بعيدا عن الشحنة'),'')]}
};
PFIG['3-3']=[
  [/0\.3\s*m/,()=>eAtP({q:'q = +5 nC',r:'r = 0.3 m',E:'E = 500 N/C'}),'الاتجاه: الشحنة موجبة، فالمجال عند النقطة يتجه بعيدا عنها'],
  [/0\.25\s*m/,()=>eAtP({q:'q = +3 nC',r:'r = 0.25 m',E:'E = 432 N/C'}),'الاتجاه: الشحنة موجبة، فالمجال يتجه بعيدا عنها'],
  [/0\.2\s*m/,()=>eAtP({q:'q = +8 nC',r:'r = 0.2 m',E:'E = 1800 N/C'}),'الاتجاه: الشحنة موجبة، فالمجال يتجه بعيدا عنها'],
  [/0\.6\s*m/,()=>eAtP({q:'q = +4 µC',r:'r = 0.6 m',E:'E = 1 × 10⁵ N/C'}),'الاتجاه: الشحنة موجبة، فالمجال يتجه بعيدا عنها'],
  [/2 × 10⁻⁹ C/,()=>eTestQ({q:'q₀ = 2 nC',F:'F = 4 × 10⁻⁶ N',E:'E = 2000 N/C'}),'شدة المجال صفة للنقطة: E = F / q₀ = 2000 N/C'],
  [/4 × 10⁻⁶ C/,()=>eTestQ({q:'q₀ = 4 µC',F:'F = 8 × 10⁻³ N',E:'E = 2000 N/C'}),'شدة المجال صفة للنقطة: E = F / q₀ = 2000 N/C'],
  [/2000 N\/C/,()=>eTestQ({q:'q = 3 µC',F:'F = 0.006 N',E:'E = 2000 N/C'}),'القوة F = q·E = 0.006 N في اتجاه المجال لأن الشحنة موجبة']];

/* 3-3: استبدال شرائح الدرس ببطاقات الدرس النموذجي */
const IM33={"tv": "data:image/webp;base64,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", "xray": "data:image/webp;base64,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", "fish": "data:image/webp;base64,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"};
function apply33(out){defs();if(!SFIX.__33){SFIX.push(['على بعد','عَلَى بُعْدِ'],['بعد النقطة','بُعْدُ النقطة'],['لأننا نعرف','لِأَنَّنَا نَعْرِفُ']);SFIX.__33=1}const K2='3-3',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');let seenProps=0;
  const R=[[/^المجال الكهربائي$/,()=>card(K2,'field')],[/^تمثيل المجال الكهربائي$/,()=>card(K2,'rep')],
    [/^خصائص خطوط المجال الكهربائي$/,()=>seenProps++?null:card(K2,'props')],[/^أشكال خطوط المجال$/,()=>card(K2,'shapes')],
    [/^أنواع المجال الكهربائي$/,()=>card(K2,'types')],[/^شدة المجال الكهربائي$/,()=>card(K2,'strength')],
    [/^المجال الكهربائي المنتظم$/,()=>card(K2,'uniform')],[/^المجال الكهربائي غير المنتظم/,()=>card(K2,'point')],
    [/^القوة على شحنات متعددة$/,()=>card(K2,'multi')],[/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],
    [/^مثال ٢:.*صفحة 95/,()=>card(K2,'ex2')],[/^رسم توضيحي [12]$/,()=>null],
    [/^تمرين 1 · ورقة العمل/,()=>card(K2,'tr1')],[/^تمرين 2 · ورقة العمل/,()=>card(K2,'tr2')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وبعد أن فهمنا المجال الكهربائي وشدته، لنرى أين نجده في حياتنا.';const IC=[[/شاشات|الأشعة/,'tv'],[/أسماك|الرعاش/,'fish']];
      sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;
        const ik=(IC.find(([re])=>re.test(m[1]))||[0,''])[1],icn=ik?'<img src="'+IM33[ik]+'" alt="">':'💡',il=typeof inl==='function'?inl:(t=>t);
        return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">${icn}</span><div><b>${il(m[1])}</b> ${il(m[2])}</div></div>`,say:m[1].trim()+' '+m[2]}});return sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  /* ترتيب الحقيبة: التطبيقات بعد الأمثلة وقبل التمارين كما هي */
  return res}

const IM34={"bat": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMWYyOTM3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM2YjcyODAiLz48c3RvcCBvZmZzZXQ9Ii41NSIgc3RvcC1jb2xvcj0iIzM3NDE1MSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMCIgeDI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I0NTMwOSIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmJiZjI0Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iI2Q5NzcwNiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc4MzUwZiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ0IiB4MT0iMCIgeDI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzljYTNhZiIvPjxzdG9wIG9mZnNldD0iLjQiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2YjcyODAiLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0icyIgY3g9Ii41IiBjeT0iLjUiIHI9Ii41Ij48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDAiIHN0b3Atb3BhY2l0eT0iLjM1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz4KPGVsbGlwc2UgY3g9IjgyIiBjeT0iMTQ2IiByeD0iNDQiIHJ5PSI4IiBmaWxsPSJ1cmwoI3MpIi8+PHJlY3QgeD0iNDgiIHk9IjQwIiB3aWR0aD0iNjQiIGhlaWdodD0iMTAwIiByeD0iNiIgZmlsbD0idXJsKCNiKSIvPjxlbGxpcHNlIGN4PSI4MCIgY3k9IjE0MCIgcng9IjMyIiByeT0iNyIgZmlsbD0iIzExMTgyNyIvPjxyZWN0IHg9IjQ4IiB5PSI0MCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ0IiBmaWxsPSJ1cmwoI2MpIi8+PGVsbGlwc2UgY3g9IjgwIiBjeT0iNDAiIHJ4PSIzMiIgcnk9IjciIGZpbGw9IiNkMWQ1ZGIiLz48cmVjdCB4PSI2OCIgeT0iMjQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxNiIgZmlsbD0idXJsKCN0KSIvPjxlbGxpcHNlIGN4PSI4MCIgY3k9IjI0IiByeD0iMTIiIHJ5PSIzLjUiIGZpbGw9IiNmOWZhZmIiLz48dGV4dCB4PSI4MCIgeT0iNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC13ZWlnaHQ9IjkwMCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiI+KzwvdGV4dD48dGV4dCB4PSI4MCIgeT0iMTIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNlNWU3ZWIiPjEuNVY8L3RleHQ+PHJlY3QgeD0iNTQiIHk9IjQ0IiB3aWR0aD0iNiIgaGVpZ2h0PSI5MiIgcng9IjMiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4yNSIvPjwvc3ZnPg==", "pole": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im0iIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNDc1NTY5Ii8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iI2NiZDVlMSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMzNDE1NSIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJzIiBjeD0iLjUiIGN5PSIuNSIgcj0iLjUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIuMzUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDAiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ6IiB4MT0iMCIgeDI9IjAiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmRlMDQ3Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZjU5ZTBiIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+CjxlbGxpcHNlIGN4PSI4MCIgY3k9IjE1MCIgcng9IjQ2IiByeT0iNiIgZmlsbD0idXJsKCNzKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNtKSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01MCAxNDggTDc0IDE4IEw4NiAxOCBMMTEwIDE0OCIvPjxwYXRoIGQ9Ik01NyAxMTAgTDEwMyAxMTAgTTYyIDgwIEw5OCA4MCBNNjcgNTIgTDkzIDUyIi8+PHBhdGggZD0iTTU3IDExMCBMOTggODAgTTEwMyAxMTAgTDYyIDgwIE02MiA4MCBMOTMgNTIgTTk4IDgwIEw2NyA1MiBNNTAgMTQ4IEwxMDMgMTEwIE0xMTAgMTQ4IEw1NyAxMTAiLz48cGF0aCBkPSJNMzAgNDIgTDEzMCA0MiBNMzYgNjYgTDEyNCA2NiIvPjwvZz4KPGcgZmlsbD0iI2UyZThmMCIgc3Ryb2tlPSIjNjQ3NDhiIiBzdHJva2Utd2lkdGg9IjEuNSI+PHJlY3QgeD0iMjciIHk9IjQyIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgcng9IjIiLz48cmVjdCB4PSIxMjciIHk9IjQyIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgcng9IjIiLz48cmVjdCB4PSIzMyIgeT0iNjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiByeD0iMiIvPjxyZWN0IHg9IjEyMSIgeT0iNjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiByeD0iMiIvPjwvZz48cGF0aCBkPSJNOCA1OCBRMzAgNjQgMzAgNTQgTTE1MiA1OCBRMTMwIDY0IDEzMCA1NCBNOCA4MiBRMzYgODggMzYgNzggTTE1MiA4MiBRMTI0IDg4IDEyNCA3OCIgc3Ryb2tlPSIjMWYyOTM3IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNODQgOTIgTDcyIDExMiBMODIgMTEyIEw3NCAxMzQgTDk2IDEwNiBMODUgMTA2IEw5NCA5MloiIGZpbGw9InVybCgjeikiIHN0cm9rZT0iI2I0NTMwOSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4="};
/* ===== عناصر شبه حقيقية للوحدة الرابعة (1 نوفمبر): ألواح معدنية مجسمة، مكثفات وبطارية وأسلاك واقعية ===== */
const RGR='<linearGradient id="kc-pP2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#991b1b"/><stop offset=".35" stop-color="#f87171"/><stop offset=".55" stop-color="#dc2626"/><stop offset="1" stop-color="#7f1d1d"/></linearGradient>'+
 '<linearGradient id="kc-pN2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".35" stop-color="#60a5fa"/><stop offset=".55" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>'+
 '<linearGradient id="kc-cB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d4ed8"/><stop offset=".3" stop-color="#60a5fa"/><stop offset=".6" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>'+
 '<linearGradient id="kc-bt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b5563"/><stop offset=".3" stop-color="#9ca3af"/><stop offset=".55" stop-color="#1f2937"/><stop offset="1" stop-color="#030712"/></linearGradient>'+
 '<linearGradient id="kc-bc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b45309"/><stop offset=".3" stop-color="#fcd34d"/><stop offset=".6" stop-color="#d97706"/><stop offset="1" stop-color="#78350f"/></linearGradient>'+
 '<linearGradient id="kc-wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6a46a"/><stop offset="1" stop-color="#b07a44"/></linearGradient>'+
 '<linearGradient id="kc-lg" x1="0" x2="1"><stop offset="0" stop-color="#6b7280"/><stop offset=".5" stop-color="#f3f4f6"/><stop offset="1" stop-color="#4b5563"/></linearGradient>'+
 '<radialGradient id="kc-sd"><stop offset="0" stop-color="#0b1220" stop-opacity=".35"/><stop offset="1" stop-color="#0b1220" stop-opacity="0"/></radialGradient>';
/* لوح معدني مجسم رأسي: وجه أمامي بسمك وجانب وأعلى، ولمعة، وظل تلامس */
function rPlate(x,top,bot,pos,n,noSign){const w=14,dx=20,dy=15,g=pos?'kc-pP2':'kc-pN2',sd=pos?'#7f1d1d':'#1e3a8a',tp=pos?'#fecaca':'#bfdbfe';
  let s=`<ellipse cx="${x+w/2+dx/2}" cy="${bot+4}" rx="${w+dx}" ry="6" fill="url(#kc-sd)"/>`;
  s+=`<polygon points="${x+w},${top} ${x+w+dx},${top-dy} ${x+w+dx},${bot-dy} ${x+w},${bot}" fill="${sd}"/>`;
  s+=`<polygon points="${x},${top} ${x+dx},${top-dy} ${x+w+dx},${top-dy} ${x+w},${top}" fill="${tp}"/>`;
  s+=`<rect x="${x}" y="${top}" width="${w}" height="${bot-top}" fill="url(#${g})"/><rect x="${x+3}" y="${top+4}" width="2.4" height="${bot-top-8}" fill="#fff" opacity=".45"/>`;
  if(!noSign){const k=n||Math.max(3,Math.floor((bot-top)/40));for(let i=0;i<k;i++){const yy=top+((bot-top)/(k))*(i+.5)+5;s+=`<text x="${x+w/2}" y="${f1(yy)}" text-anchor="middle" font-size="${pos?14:16}" font-weight="900" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,.35)" stroke-width="1.4">${pos?'+':'−'}</text>`}}
  return s}
/* سلك واقعي: ظل، جسم داكن، لمعة */
const rWire=(d,col)=>`<path d="${d}" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(1.5,2.5)"/><path d="${d}" fill="none" stroke="${col||'#1f2937'}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" transform="translate(-.6,-1)"/>`;
/* مكثف حقيقي مجسم (صندوق أزرق بساقين معدنيتين) — مركز الوجه الأمامي (x,y)، والساقان تنتهيان عند y+h/2+legL */
function rCap(x,y,lab,val,o){o=o||{};const w=o.w||46,h=o.h||52,dx=12,dy=10,L=x-w/2,T=y-h/2,legL=o.leg||16;
  let s=`<ellipse cx="${x+4}" cy="${y+h/2+legL+3}" rx="${w*.7}" ry="5" fill="url(#kc-sd)"/>`;
  s+=`<rect x="${x-12}" y="${y+h/2-2}" width="3.5" height="${legL+2}" fill="url(#kc-lg)"/><rect x="${x+8.5}" y="${y+h/2-2}" width="3.5" height="${legL+2}" fill="url(#kc-lg)"/>`;
  s+=`<polygon points="${L+w},${T} ${L+w+dx},${T-dy} ${L+w+dx},${T+h-dy} ${L+w},${T+h}" fill="#1e3a8a"/><polygon points="${L},${T} ${L+dx},${T-dy} ${L+w+dx},${T-dy} ${L+w},${T}" fill="#93c5fd"/>`;
  s+=`<rect x="${L}" y="${T}" width="${w}" height="${h}" rx="3" fill="url(#kc-cB)" stroke="#1e3a8a"/><rect x="${L+4}" y="${T+4}" width="4" height="${h-8}" rx="2" fill="#fff" opacity=".35"/>`;
  if(lab)s+=`<text x="${x}" y="${T+h*.42}" text-anchor="middle" font-size="14" font-weight="900" fill="#fff" direction="ltr">${lab}</text>`;
  if(val)s+=`<text x="${x}" y="${T+h*.78}" text-anchor="middle" font-size="${val.length>6?10:11.5}" font-weight="800" fill="#e0f2fe" direction="ltr">${val}</text>`;
  return s}
/* بطارية مجسمة أفقية (أسطوانة) — مركزها (x,y)، والقطب الموجب يمين */
function rBat(x,y,lab,o){o=o||{};const w=o.w||86,h=o.h||30,L=x-w/2,T=y-h/2;
  let s=`<ellipse cx="${x}" cy="${y+h/2+5}" rx="${w*.6}" ry="5" fill="url(#kc-sd)"/>`;
  s+=`<rect x="${L}" y="${T}" width="${w*.62}" height="${h}" fill="url(#kc-bt)"/><rect x="${L+w*.62}" y="${T}" width="${w*.38}" height="${h}" fill="url(#kc-bc)"/>`;
  s+=`<ellipse cx="${L}" cy="${y}" rx="5" ry="${h/2}" fill="#374151"/><ellipse cx="${L+w}" cy="${y}" rx="5" ry="${h/2}" fill="#fcd34d" stroke="#92400e" stroke-width=".8"/><rect x="${L+w+3}" y="${y-5}" width="6" height="10" rx="2" fill="url(#kc-lg)" stroke="#6b7280" stroke-width=".6"/>`;
  s+=`<text x="${L+w*.8}" y="${y+5}" text-anchor="middle" font-size="15" font-weight="900" fill="#78350f">+</text><text x="${L+w*.18}" y="${y+5}" text-anchor="middle" font-size="16" font-weight="900" fill="#e5e7eb">−</text>`;
  if(lab)s+=lbl(x,y+h/2+24,lab,'#334155',15);
  return s}
/* لوح خشبي بمنظور تحت الدائرة */
const rBoard=(x0,x1,y0,y1)=>`<polygon points="${x0+18},${y0} ${x1+18},${y0} ${x1},${y1} ${x0},${y1}" fill="url(#kc-wd)" stroke="#8a5a2e"/><rect x="${x0}" y="${y1}" width="${x1-x0}" height="9" fill="#9a6a3a"/>`;
/* بطارية مقلوبة (الموجب يسار) */
function rBatL(x,y,lab){return `<g transform="translate(${2*x} 0) scale(-1 1)">${rBat(x,y,'').replace(/<text[^>]*>[+−]<\/text>/g,'')}</g>`+`<text x="${x-86*.3}" y="${y+5}" text-anchor="middle" font-size="15" font-weight="900" fill="#78350f">+</text><text x="${x+86*.32}" y="${y+5}" text-anchor="middle" font-size="16" font-weight="900" fill="#e5e7eb">−</text>`+(lab?lbl(x,y+39,lab,'#334155',15):'')}
/* لوحة توصيل بشريطين: الموجب (أحمر) خلفي والسالب (أزرق) أمامي */
function rBread(x0,x1,yr,yb){let s=`<rect x="${x0}" y="${yr-22}" width="${x1-x0}" height="${yb-yr+40}" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/><rect x="${x0}" y="${yb+18}" width="${x1-x0}" height="7" rx="2" fill="#e2e8f0"/>`;
  for(let x=x0+12;x<x1-6;x+=12)s+=`<rect x="${x-1.4}" y="${yr-12}" width="2.8" height="2.6" fill="#94a3b8"/><rect x="${x-1.4}" y="${yb+8}" width="2.8" height="2.6" fill="#94a3b8"/>`;
  s+=`<line x1="${x0+8}" y1="${yr}" x2="${x1-8}" y2="${yr}" stroke="#dc2626" stroke-width="3"/><line x1="${x0+8}" y1="${yb}" x2="${x1-8}" y2="${yb}" stroke="#2563eb" stroke-width="3"/>`;
  return s}
/* ===== الدرس النموذجي 3-4: الجهد الكهربائي (بنفس طريقة 3-1 و 3-3) ===== */
const VC='#7e22ce',VCL='#a855f7';
/* لوحان متوازيان مع خطوط مجال منتظمة */
/* مكثف اللوحين المعتمد مع خطوط المجال من وسط اللوح، واختياريا الأسلاك ورمز البطارية */
function plateCap(L,R,top,bot,n,yb,lab,T){T=T||4;const h=bot-top,g=PG(h),my=(top+bot)/2,cL=[L-T+g.dx*.5,my-g.dy*.5],cR=[R+2+T+g.dx*.5,my-g.dy*.5],Lw=g.dx*.5+28,xL=L-T-Lw,xR=cR[0]+Lw,cx=(xL+xR)/2;let b='';
  if(yb)b+=rWire(`M${f1(cL[0])},${f1(cL[1])} H${f1(xL)} V${yb} H${f1(cx-8)}`,'#1f2937');
  b+=`<ellipse cx="${f1((L+R)/2+g.dx*.4)}" cy="${f1(bot+4)}" rx="${f1((R-L)/2+g.dx*.6)}" ry="7" fill="url(#kc-sd)"/>`+mPlate(L-T,top,T,h,g.dx,g.dy,true);
  for(let i=0;i<(n||5);i++){const yy=top+18+i*((h-36)/((n||5)-1))-g.dy*.5;b+=flowLine(`M${f1(L+g.dx*.5)},${f1(yy)} L${f1(R+2+g.dx*.5)},${f1(yy)}`,'#0f766e',1.3)}
  b+=mSurf(L,top,h,g.dx,g.dy,true).replace(/<polygon[^>]*\/>/g,'');
  if(yb){mSurf.hole=1;b+=mPlate(R+2,top,T,h,g.dx,g.dy,false);mSurf.hole=0;b+=rWire(`M${f1(cR[0])},${f1(cR[1])} H${f1(xR)} V${yb} H${f1(cx+8)}`,'#1f2937')+batSym(cx,yb,lab||'')}
  else b+=mPlate(R+2,top,T,h,g.dx,g.dy,false);
  return {svg:b,g,cx,xL,xR}}
function vPlates(L,R,top,bot,n){const h=bot-top,g=PG(h);let b=`<ellipse cx="${f1((L+R)/2+g.dx*.4)}" cy="${f1(bot+4)}" rx="${f1((R-L)/2+g.dx*.6)}" ry="7" fill="url(#kc-sd)"/>`+mPlate(L-4,top,4,h,g.dx,g.dy,true);
  for(let i=0;i<(n||5);i++){const yy=top+18+i*((h-36)/((n||5)-1))-g.dy*.5;b+=flowLine(`M${f1(L+g.dx*.5)},${f1(yy)} L${f1(R+2+g.dx*.5)},${f1(yy)}`,'#0f766e',1.3)}
  b+=mSurf(L,top,h,g.dx,g.dy,true).replace(/<polygon[^>]*\/>/g,'');
  return b+mPlate(R+2,top,4,h,g.dx,g.dy,false)}
/* خط تساوي جهد رأسي متقطع بقيمة */
const vEq=(x,top,bot,t,c)=>`<line x1="${x}" y1="${top}" x2="${x}" y2="${bot}" stroke="${c||VC}" stroke-width="2.2" stroke-dasharray="6 6" opacity=".85"/>`+(t?`<g>${scTag(x,top-14,t,c||VC,t.length*9+26)}</g>`:'');
/* 1) الجهد: نقل شحنة عكس المجال يخزن فيها طاقة وضع (متحرك 12 ث) */
function vPEScene(){const W=640,H=330,D=12,L=130,R=510,top=112,bot=268,cy=210;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vPlates(L-80,R,top,bot,5)+lbl(W/2+20,top-48,'E','#0f766e',18);
  b+=`<circle cx="${R-70}" cy="${cy}" r="5" fill="#1e3a5f"/>`+lbl(R-70,cy+30,'B','#1e3a5f',17)+`<circle cx="${L+70}" cy="${cy}" r="5" fill="#1e3a5f"/>`+lbl(L+70,cy+30,'A','#1e3a5f',17);
  const ch=sph(0,0,14,'+')+lbl(0,-22,'q₀','#b91c1c',15);
  b+=scMove(D,[[0,R-70,cy],[1.6,R-70,cy],[5.6,L+70,cy],[D-.2,L+70,cy]],ch);
  b+=scShow(D,1.6,5.6,arrA(R-150,cy-46,180,120,'#f59e0b',10)+lblR(R-210,cy-58,'شغل W ضد المجال','#b45309',15),true);
  b+=scShow(D,5.6,D-.1,`<g>${scTag(L+150,cy-62,'PE','#b45309',70)}</g>`,true);
  b+=scShow(D,8.2,D-.1,`<g>${scTag(W/2,cy+56,'V = PE / q₀','#7e22ce',170)}</g>`,true);
  b+=scCap(D,W,'1. شحنة اختبار q₀ داخل مجال منتظم','#475569',0,1.6)+scCap(D,W,'2. ننقلها عكس المجال: نبذل شغلا W','#b45309',1.6,5.6)+scCap(D,W,'3. يخزن الشغل فيها طاقة وضع PE','#0f766e',5.6,8.2)+scCap(D,W,'4. الجهد: طاقة الوضع لكل وحدة شحنة','#7e22ce',8.2,D);
  return svg(W,H,b,'kScene')}
/* 2) فرق الجهد بين نقطتين */
function vDiffFig(){const W=640,H=320,L=120,R=520,top=110,bot=268,cy=190,xa=430,xb=210;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vPlates(L-80,R,top,bot,5);
  b+=`<line x1="${xa}" y1="${cy}" x2="${xb+12}" y2="${cy}" stroke="#f59e0b" stroke-width="3" stroke-dasharray="7 5"/>`+`<polygon points="-8,-7 8,0 -8,7" fill="#f59e0b" transform="translate(${xb+16} ${cy}) rotate(180)"/>`;
  b+=sph(xa,cy,13,'+')+lbl(xa,cy-22,'q₀','#b91c1c',15)+`<circle cx="${xb}" cy="${cy}" r="6" fill="#1e3a5f"/>`;
  b+=`<g>${scTag(xa,cy+46,'V_A','#1d4ed8',70)}${scTag(xb,cy+46,'V_B','#b91c1c',70)}</g>`+lblR((xa+xb)/2,cy-16,'الشغل W','#b45309',15);
  b+=`<g>${scTag(W/2,34,'ΔV = V_B − V_A = W / q₀','#7e22ce',270)}</g>`;
  return svg(W,H,b,'kAuto')}
/* 3) الجهد في نوعي المجال */
function vKindsFig(){const W=640,H=320;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vPlates(30,226,100,240,5)+vEq(130,100,240)+vEq(200,100,240);
  b+=`<g>${tagR(160,290,'منتظم: ΔV = E·d','#0f766e',180)}</g>`;
  b+=`<line x1="320" y1="30" x2="320" y2="300" stroke="#c9daf0" stroke-width="2" stroke-dasharray="6 6"/>`;
  b+=radial(480,160,32,120,10,true,'#fca5a5')+[60,95].map(r=>`<circle cx="480" cy="160" r="${r}" fill="none" stroke="${VC}" stroke-width="2.2" stroke-dasharray="6 6"/>`).join('')+sph(480,160,26,'+');
  b+=`<g>${tagR(480,290,'شحنة نقطية: V = k·q / r','#7e22ce',210)}</g>`+lblR(320,22,'الخطوط المتقطعة: خطوط تساوي الجهد','#475569',14);
  return svg(W,H,b,'kScene')}
/* 4) جهد شحنة نقطية: يقل مع المسافة (لا مع مربعها) — متحرك 12 ث */
function vPointScene(){const W=640,H=320,D=12,cx=90,cy=170,u=150;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=radial(cx,cy,38,250,12,true,'#fecaca');
  const P=(k,lab,t0)=>{const x=cx+k*u*.95;return scShow(D,t0,D-.1,(()=>{const Rr=x-cx,th=Math.min(1.25,Math.asin(Math.min(1,118/Rr))),x1=cx+Rr*Math.cos(th),y1=cy-Rr*Math.sin(th),y2=cy+Rr*Math.sin(th);return `<path d="M${f1(x1)},${f1(y1)} A${f1(Rr)},${f1(Rr)} 0 0 1 ${f1(x1)},${f1(y2)}" fill="none" stroke="${VC}" stroke-width="2.2" stroke-dasharray="6 6"/>`})()+`<circle cx="${f1(x)}" cy="${cy}" r="6" fill="#1e3a5f"/><g>${scTag(x+4,cy-36,lab,VC,lab.length*9+40)}</g><line x1="${cx}" y1="${cy+60+k*16}" x2="${f1(x)}" y2="${cy+60+k*16}" stroke="#0369a1" stroke-width="1.5" stroke-dasharray="5 4"/>`+lbl(x-10,cy+56+k*16,k===1?'r':k+'r','#0369a1',15),true)};
  b+=sph(cx,cy,32,'+')+lbl(cx,cy+56,'q','#b91c1c',17);
  b+=P(1,'V',1)+P(2,'V / 2',4.2)+P(3,'V / 3',7.2);
  b+=scCap(D,W,'1. على بعد r: الجهد V','#7e22ce',0,4.2)+scCap(D,W,'2. ضعف المسافة: الجهد يقل إلى النصف','#b45309',4.2,7.2)+scCap(D,W,'3. ثلاثة أضعاف المسافة: الجهد يقل إلى الثلث','#0f766e',7.2,D);
  return svg(W,H,b,'kScene')}
/* 5) فرق الجهد في المجال المنتظم: الجهد يقل باتجاه خطوط المجال — متحرك 10 ث */
function vUniformScene(){const W=640,H=330,D=10,L=130,R=510,top=112,bot=262;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vPlates(L-80,R,top,bot,5);
  const xs=[L+60,L+150,L+240,L+330],vs=['8 V','6 V','4 V','2 V'];
  xs.forEach((x,i)=>{b+=scShow(D,.6+i*.9,D-.1,vEq(x,top,bot,vs[i]),true)});
  b+=`<text x="${L-30}" y="${bot+28}" text-anchor="middle" font-size="15" font-weight="800" fill="#b91c1c" direction="ltr">10 V</text><text x="${R+30}" y="${bot+28}" text-anchor="middle" font-size="15" font-weight="800" fill="#1d4ed8" direction="ltr">0 V</text>`;
  b+=scShow(D,4.6,D-.1,`<circle cx="${xs[0]}" cy="200" r="6" fill="#1e3a5f"/>`+lbl(xs[0]-14,222,'a','#1e3a5f',17)+`<circle cx="${xs[2]}" cy="200" r="6" fill="#1e3a5f"/>`+lbl(xs[2]+14,222,'b','#1e3a5f',17)+dim(xs[0],xs[2],bot+20,'d'),true);
  b+=scShow(D,6.6,D-.1,`<g>${scTag(W/2,bot+56,'ΔV = E·d','#7e22ce',140)}</g>`,true);
  b+=scCap(D,W,'1. خطوط تساوي الجهد عمودية على خطوط المجال','#7e22ce',0,4.6)+scCap(D,W,'2. الجهد يقل باتجاه خطوط المجال','#0f766e',4.6,6.6)+scCap(D,W,'3. فرق الجهد بين a و b يساوي E × d','#b45309',6.6,D);
  return svg(W,H,b,'kScene')}
/* رسوم الأمثلة */
function vAtP(o){const W=640,H=300,FY=196,y=128,Qx=150,Px=440;let b=EGR+stage(W,H,FY);
  b+=`<path d="M${Px-14},${y-70} A${Px-Qx},${Px-Qx} 0 0 1 ${Px-14},${y+66}" fill="none" stroke="${VC}" stroke-width="2.2" stroke-dasharray="6 6" opacity=".7"/>`+lblR(Px-8,y-80,'خط تساوي جهد',VC,13);
  b+=`<line x1="${Qx+36}" y1="${y}" x2="${Px}" y2="${y}" stroke="#94a3b8" stroke-width="1.6" stroke-dasharray="5 5"/>`;
  b+=sphere(Qx,y,34,'+',FY)+lbl(Qx,y-50,o.q,'#b91c1c',18)+`<circle cx="${Px}" cy="${y}" r="7" fill="#1e3a5f"/>`+lbl(Px,y-20,'P','#1e3a5f',18);
  b+=(o.V?pill(Px+70,y+40,o.V,VC,.3):'')+(o.r?dim(Qx,Px,FY+44,o.r):'');
  return svg(W,H,b,o.cls)}
function vEd(o){const W=640,H=300,L=120,R=520,top=92,bot=218,y=160,xa=200,xb=440;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vPlates(L-80,R,top,bot,4)+(o.E?`<g>${scTag(W/2,top-22,o.E,'#0f766e',o.E.length*9+30)}</g>`:'');
  b+=vEq(xa,top,bot,'',VC)+vEq(xb,top,bot,'',VC);
  b+=`<circle cx="${xa}" cy="${y}" r="6" fill="#1e3a5f"/>`+lbl(xa-16,y-10,'a','#1e3a5f',17)+`<circle cx="${xb}" cy="${y}" r="6" fill="#1e3a5f"/>`+lbl(xb+16,y-10,'b','#1e3a5f',17);
  b+=(o.d?dim(xa,xb,bot+26,o.d):'')+(o.V?pill(W/2,bot+66,o.V,VC,.4):'');
  return svg(W,H,b,o.cls)}
const lawV=(f,t)=>lawE(f,t);
CARDS['3-4']={
  volt:{title:'الجهد الكهربائي',sayT:'نبدأ أول موضوعات درسنا: الجهد الكهربائي.',steps:()=>[
    S(pt(B('الجهد الكهربائي')+': هو طاقة الوضع التي تمتلكها وحدة الشحنة.'),''),
    S(fig(vPEScene(),'مشهد: نقل الشحنة عكس المجال يخزن فيها طاقة وضع'),'شاهد المشهد: شُحْنَةُ اخْتِبَارٍ دَاخِلَ مَجَالٍ مُنْتَظِمٍ. عندما نَنْقُلُهَا عَكْسَ اتِّجَاهِ الْمَجَالِ نَبْذُلُ شُغْلًا، وهذا الشغل يُخَزِّنُ فِيهَا طَاقَةَ وَضْعٍ. وَطَاقَةُ الْوَضْعِ لِكُلِّ وِحْدَةِ شُحْنَةٍ هِيَ الجهد الكهربائي.'),
    Object.assign(S(pt('<div class="kLaw">'+M('V = PE / q₀')+'</div>'),'وقانون الجهد الكهربائي: `V = PE / q₀`'),{md:'`V = PE / q₀`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('V')+' الجهد الكهربائي، ووحدته الفولت '+M('V')+'<br>'+M('PE')+' طاقة الوضع الكهربائية، ووحدتها الجول '+M('J')+'<br>'+M('q₀')+' شحنة الاختبار، ووحدتها الكولوم '+M('C')+'</div>'},'حيث: `V` الجهد الكهربائي، ووحدته الفولت. و `PE` طَاقَةُ الْوَضْعِ الْكَهْرَبَائِيَّةُ، ووحدتها الجول. و `q₀` شحنة الاختبار، ووحدتها الكولوم.'),
    S(pt('وحدة الجهد '+B('الفولت')+'، والفولت يساوي جولا لكل كولوم '+M('V = J/C')+'.'),'ووحدة الجهد الفولت، والفولت يساوي جولا لكل كولوم.')]},
  diff:{title:'فرق الجهد بين نقطتين',sayT:'والآن، ماذا نعني بفرق الجهد بين نقطتين؟',steps:()=>[
    S(pt(B('فرق الجهد')+': التغير في طاقة الوضع الكهربائية لكل وحدة شحنة.'),''),
    Object.assign(S(pt('<div class="kLaw">'+M('V_B − V_A = (PE_B − PE_A) / q₀')+'</div>'),'وقانونه: فَرْقُ الْجُهْدِ يُسَاوِي التَّغَيُّرَ فِي طَاقَةِ الْوَضْعِ مَقْسُومًا عَلَى شُحْنَةِ الِاخْتِبَارْ.'),{md:'`V_B − V_A = (PE_B − PE_A) / q₀`'}),
    S(pt(B('تعريف آخر')+': الشغل المبذول في نقل شحنة اختبار من إحدى النقطتين إلى الأخرى، مقسوما على شحنة الاختبار.'),''),
    S(fig(vDiffFig(),'ننقل شحنة الاختبار من A إلى B فنبذل شغلا W'),'لاحظ الرسم: نَنْقُلُ شُحْنَةَ الِاخْتِبَارِ مِنَ النُّقْطَةِ A إِلَى النُّقْطَةِ B، فَنَبْذُلُ شُغْلًا. وفرق الجهد بين النقطتين يساوي هذا الشغل مَقْسُومًا عَلَى الشُّحْنَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('ΔV = W / q₀')+'</div>'),'وقانونه: `ΔV = W / q₀`'),{md:'`ΔV = W / q₀`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('ΔV')+' فرق الجهد بين النقطتين، ووحدته الفولت '+M('V')+'<br>'+M('W')+' الشغل المبذول، ووحدته الجول '+M('J')+'<br>'+M('q₀')+' شحنة الاختبار، ووحدتها الكولوم '+M('C')+'</div>'},'حيث: `ΔV` فرق الجهد بين النقطتين، ووحدته الفولت. و `W` الشغل المبذول، ووحدته الجول. و `q₀` شحنة الاختبار، ووحدتها الكولوم.')]},
  kinds:{title:'الجهد في نوعي المجال الكهربائي',sayT:'وكيف نحسب الجهد في نوعي المجال الكهربائي؟',steps:()=>[
    S(pt(B('في المجال غير المنتظم')+' حول شحنة نقطية: نحسب جهد النقطة بالقانون '+M('V = k·q / r')+'.'),'فِي الْمَجَالِ غَيْرِ الْمُنْتَظِمِ حَوْلَ شُحْنَةٍ نُقْطِيَّةٍ، نَحْسُبُ جُهْدَ النُّقْطَةِ بِقَانُونِ جُهْدِ الشُّحْنَةِ النُّقْطِيَّهْ.'),
    S(pt(B('في المجال المنتظم')+': نحسب فرق الجهد بين نقطتين بالقانون '+M('ΔV = E·d')+'.'),'وَفِي الْمَجَالِ الْمُنْتَظِمِ، نَحْسُبُ فَرْقَ الْجُهْدِ بَيْنَ نُقْطَتَيْنِ بِحَاصِلِ ضَرْبِ شِدَّةِ الْمَجَالِ فِي الْمَسَافَهْ.'),
    S(fig(vKindsFig(),'خطوط تساوي الجهد: مستقيمة في المنتظم، ودوائر حول الشحنة النقطية'),'قارن في الرسم: فِي الْمَجَالِ الْمُنْتَظِمِ خُطُوطُ تَسَاوِي الْجُهْدِ مُسْتَقِيمَةٌ وَعَمُودِيَّةٌ عَلَى خُطُوطِ الْمَجَالِ، وَحَوْلَ الشُّحْنَةِ النُّقْطِيَّةِ تَكُونُ دَوَائِرَ حَوْلَهَا.')]},
  point:{title:'الجهد الناشئ عن شحنة نقطية (مجال غير منتظم)',sayT:'وَنَبْدَأُ بِالْجُهْدِ النَّاشِئِ عَنْ شُحْنَةٍ نُقْطِيَّةٍ، فِي الْمَجَالِ غَيْرِ الْمُنْتَظِمْ.',steps:()=>[
    S(pt(B('تعريفه')+': طاقة الوضع الكهربائية التي تمتلكها وحدة الشحنات الموجبة عند نقطة تبعد مسافة '+M('r')+' عن الشحنة.'),'تعريفه: طَاقَةُ الْوَضْعِ الْكَهْرَبَائِيَّةُ الَّتِي تَمْتَلِكُهَا وِحْدَةُ الشُّحْنَاتِ الْمُوجَبَةِ، عِنْدَ نُقْطَةٍ تَبْعُدُ مَسَافَةَ r عن الشحنة.'),
    S(pt(B('خطوط تساوي الجهد')+': دوائر حول الشحنة، ويقل الجهد كلما ابتعدنا عن الشحنة الموجبة.'),''),
    Object.assign(S(pt('<div class="kLaw">'+M('V = k·q / r')+'</div>'),'وقانونه: `V = k·q / r`'),{md:'`V = k·q / r`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('V')+' الجهد الكهربائي عند النقطة، ووحدته الفولت '+M('V')+'<br>'+M('k')+' ثابت كولوم، ويساوي '+M('9 × 10⁹ N·m²/C²')+'<br>'+M('q')+' الشحنة المولدة للمجال مع إشارتها، ووحدتها الكولوم '+M('C')+'<br>'+M('r')+' بعد النقطة عن الشحنة، ووحدته المتر '+M('m')+'</div>'},'حيث: `V` الْجُهْدُ الْكَهْرَبَائِيُّ عِنْدَ النُّقْطَةِ، ووحدته الفولت. و `k` ثابت كولوم. و `q` الشُّحْنَةُ الْمُوَلِّدَةُ لِلْمَجَالِ مَعَ إِشَارَتِهَا، ووحدتها الكولوم. و `r` بُعْدُ النُّقْطَةِ عَنِ الشُّحْنَةِ، ووحدته المتر.'),
    S(pt(B('انتبه')+': المسافة '+M('r')+' في قانون الجهد '+B('غير مربعة')+'، بخلاف قانوني القوة والمجال.'),'انتبه: الْمَسَافَةُ فِي قَانُونِ الْجُهْدِ غَيْرُ مُرَبَّعَةٍ، بِخِلَافِ قَانُونَيِ الْقُوَّةِ وَالْمَجَالْ.'),
    S(fig(vPointScene(),'مشهد: الجهد يقل كلما ابتعدنا عن الشحنة'),'شاهد المشهد: عَلَى بُعْدِ r يكون الجهد V، وَعِنْدَ ضِعْفِ الْمَسَافَةِ يَقِلُّ إِلَى النِّصْفِ، وَعِنْدَ ثَلَاثَةِ أَضْعَافِهَا يَقِلُّ إِلَى الثُّلُثْ.')]},
  uniform:{title:'فرق الجهد في المجال الكهربائي المنتظم',sayT:'وننتقل إلى فرق الجهد في المجال الكهربائي المنتظم.',steps:()=>[
    S(pt(B('تعريفه')+': الشغل المبذول لنقل وحدة الشحنات الموجبة بين نقطتين في مجال ثابت الشدة والاتجاه، ويساوي شدة المجال مضروبة في المسافة بين النقطتين باتجاه خطوط المجال.'),''),
    S(pt(B('خطوط تساوي الجهد')+': مستقيمة وعمودية على خطوط المجال، والجهد على الخط الواحد ثابت.'),''),
    S(pt(B('اتجاه التغير')+': يقل الجهد كلما تحركنا باتجاه خطوط المجال، من اللوح الموجب إلى اللوح السالب.'),''),
    S(fig(vUniformScene(),'مشهد: الجهد يقل باتجاه خطوط المجال'),'شاهد المشهد: بَيْنَ اللَّوْحَيْنِ خُطُوطُ تَسَاوِي جُهْدٍ مُسْتَقِيمَةٌ، وَالْجُهْدُ يَقِلُّ كُلَّمَا اتَّجَهْنَا نَحْوَ اللَّوْحِ السَّالِبِ. وفرق الجهد بين النقطتين a و b يُسَاوِي شِدَّةَ الْمَجَالِ مَضْرُوبَةً فِي الْمَسَافَةِ بَيْنَهُمَا.'),
    Object.assign(S(pt('<div class="kLaw">'+M('ΔV = E·d')+'</div>'),'وقانونه: `ΔV = E·d`'),{md:'`ΔV = E·d`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('ΔV')+' فرق الجهد بين النقطتين، ووحدته الفولت '+M('V')+'<br>'+M('E')+' شدة المجال المنتظم، ووحدتها '+M('N/C')+' (وتكافئ '+M('V/m')+')<br>'+M('d')+' المسافة بين النقطتين باتجاه خطوط المجال، ووحدتها المتر '+M('m')+'</div>'},'حيث: `ΔV` فرق الجهد بين النقطتين، ووحدته الفولت. و `E` شِدَّةُ الْمَجَالِ الْمُنْتَظِمِ، ووحدتها نيوتن لكل كولوم، وَتُكَافِئُ فولت لكل متر. و `d` الْمَسَافَةُ بَيْنَ النُّقْطَتَيْنِ بِاتِّجَاهِ خُطُوطِ الْمَجَالِ، ووحدتها المتر.')]},
  ex1:{title:'مثال ١ · صفحة 96',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 96.',steps:()=>[
    S(q('أوجد فرق الجهد بين نقطتين في مجال كهربائي منتظم شدته '+M('10000 N/C')+' والمسافة الفاصلة بينهما '+M('0.01 m')+'.','المثال · صفحة 96'),''),
    S(gr(['E = 10000 N/C','d = 0.01 m'],'فرق الجهد '+M('ΔV')+' بين النقطتين'),''),
    S(fig(vEd({E:'E = 10000 N/C',d:'d = 0.01 m',V:'ΔV = 100 V'})),'لنرسم المجال المنتظم بين اللوحين، والنقطتين a و b.'),
    S(st(1,'القانون: '+M('ΔV = E·d')+' لأن المجال منتظم.'),'نستخدم قانون فرق الجهد في المجال المنتظم: `ΔV = E·d`، لِأَنَّ الْمَجَالَ مُنْتَظِمٌ ثَابِتُ الشِّدَّةِ وَالِاتِّجَاهْ.'),
    S(st(2,'التعويض: '+M('ΔV = 10000 × 0.01')),'نعوض: `ΔV = 10000 × 0.01`'),
    S(st(3,'الحساب: '+M('ΔV = 100 V')+'<span class="kDirOn"></span>'),'إذن `ΔV = 100 V`'),
    S(res(M('ΔV = 100 V')),'النتيجة: `ΔV = 100 V`.'),
    S(pt(B('معنى الناتج')+': لنقل شحنة مقدارها '+M('1 C')+' بين النقطتين يلزم شغل مقداره '+M('100 J')+'.'),'ومعنى الناتج: لنقل شحنة مقدارها كولوم واحد بين النقطتين، يلزم شغل مقداره مئة جول.')]},
  ex2:{title:'مثال ٢ · صفحة 96',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 96.',steps:()=>[
    S(q('أوجد الجهد على بعد '+M('0.1 m')+' من شحنة نقطية '+M('2 × 10⁻⁶ C')+'.','المثال · صفحة 96'),''),
    S(gr(['q = 2 × 10⁻⁶ C','r = 0.1 m','k = 9 × 10⁹ N·m²/C²'],'الجهد '+M('V')+' عند النقطة'),''),
    S(fig(vAtP({q:'q = +2 µC',r:'r = 0.1 m',V:'V = 1.8 × 10⁵ V'})),'لِنَرْسُمِ الشُّحْنَةَ الْمُوجَبَةَ، وَالنُّقْطَةَ P عَلَى بُعْدِ عُشْرِ مِتْرٍ مِنْهَا.'),
    S(st(1,'القانون: '+M('V = k·q / r')+' لأن المطلوب جهد نقطة حول شحنة نقطية.'),'نستخدم قانون جهد الشحنة النقطية: `V = k·q / r`، لأن المطلوب جهد نقطة حول شحنة نقطية.'),
    S(st(2,'التعويض: '+M('V = 9 × 10⁹ × 2 × 10⁻⁶ / 0.1')),'نعوض: `V = 9 × 10⁹ × 2 × 10⁻⁶ / 0.1`'),
    S(st(3,'الحساب: '+M('V = 18000 ÷ 0.1 = 1.8 × 10⁵ V')+'<span class="kDirOn"></span>'),'البسط `18000` والمقام `0.1`، إذن `V = 1.8 × 10⁵ V`'),
    S(st(4,'الإشارة: الشحنة '+B('موجبة')+'، فالجهد عند النقطة '+B('موجب')+'.'),'وَالشُّحْنَةُ مُوجَبَةٌ، لِذَلِكَ الْجُهْدُ عِنْدَ النُّقْطَةِ مُوجَبْ.'),
    S(res(M('V = 1.8 × 10⁵ V')),'النتيجة: `V = 1.8 × 10⁵ V`.')]},
  tr1:{title:'تمرين ١ · ورقة العمل · سؤال ٧ (صفحة 106)',sayT:'هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال السابع، صَفْحَةِ 106.',steps:()=>[
    S(q('أوجد فرق الجهد بين نقطتين في مجال كهربائي منتظم شدته '+M('1000 N/C')+' والمسافة الفاصلة بينهما '+M('0.02 m')+'.'),''),
    S(gr(['E = 1000 N/C','d = 0.02 m'],'فرق الجهد '+M('ΔV')),''),
    S(fig(vEd({E:'E = 1000 N/C',d:'d = 0.02 m',V:'ΔV = 20 V'})),'لنرسم المجال المنتظم والنقطتين.'),
    S(st(1,'القانون: '+M('ΔV = E·d')),'القانون: `ΔV = E·d`'),
    S(st(2,'التعويض: '+M('ΔV = 1000 × 0.02')),'نعوض: `ΔV = 1000 × 0.02`'),
    S(st(3,'الحساب: '+M('ΔV = 20 V')+'<span class="kDirOn"></span>'),'الحساب: `ΔV = 20 V`'),
    S(res(M('ΔV = 20 V')),'')]},
  tr2:{title:'تمرين ٢ · ورقة العمل · سؤال ٨ (صفحة 106)',sayT:'والتمرين الثاني، من ورقة العمل، السؤال الثامن، صَفْحَةِ 106.',steps:()=>[
    S(q('أوجد الجهد على بعد '+M('0.2 m')+' من شحنة '+M('4 × 10⁻⁶ C')+'.'),''),
    S(gr(['q = 4 × 10⁻⁶ C','r = 0.2 m','k = 9 × 10⁹ N·m²/C²'],'الجهد '+M('V')),''),
    S(fig(vAtP({q:'q = +4 µC',r:'r = 0.2 m',V:'V = 1.8 × 10⁵ V'})),'لِنَرْسُمِ الشُّحْنَةَ وَالنُّقْطَةَ عَلَى بُعْدِ خُمْسِ مِتْرٍ مِنْهَا.'),
    S(st(1,'القانون: '+M('V = k·q / r')),'القانون: `V = k·q / r`'),
    S(st(2,'التعويض: '+M('V = 9 × 10⁹ × 4 × 10⁻⁶ / 0.2')),'نعوض: `V = 9 × 10⁹ × 4 × 10⁻⁶ / 0.2`'),
    S(st(3,'الحساب: '+M('V = 36000 ÷ 0.2 = 1.8 × 10⁵ V')+'<span class="kDirOn"></span>'),'البسط `36000` والمقام `0.2`، إذن `V = 1.8 × 10⁵ V`'),
    S(res(M('V = 1.8 × 10⁵ V')),'')]}
};
PFIG['3-4']=[
  [/0\.5\s*m/,()=>vAtP({q:'q = +5 nC',r:'r = 0.5 m',V:'V = 90 V'}),'الشحنة موجبة، فالجهد عند النقطة موجب: V = 90 V'],
  [/250 V/,()=>vEd({E:'',d:'',V:'ΔV = 250 V'}),'الشغل W = q × ΔV = 0.001 J']];
function apply34(out){defs();if(!SFIX.__34){SFIX.push(['على بعد','عَلَى بُعْدِ'],["تمتلكها وحدة الشحنات الموجبة عند نقطة تبعد مسافة", "تَمْتَلِكُهَا وِحْدَةُ الشُّحْنَاتِ الْمُوجَبَةِ عِنْدَ نُقْطَةٍ تَبْعُدُ مَسَافَةَ"],["خطوط تساوي الجهد", "خُطُوطُ تَسَاوِي الْجُهْدِ"],["دوائر حول الشحنة،", "دَوَائِرُ حَوْلَ الشُّحْنَةِ،"],["التغير في طاقة الوضع الكهربائية لكل وحدة شحنة", "التَّغَيُّرُ فِي طَاقَةِ الْوَضْعِ الْكَهْرَبَائِيَّةِ لِكُلِّ وِحْدَةِ شُحْنَةٍ"],["في نقل شحنة اختبار", "فِي نَقْلِ شُحْنَةِ اخْتِبَارٍ"],["مقسوما على شحنة الاختبار", "مَقْسُومًا عَلَى شُحْنَةِ الِاخْتِبَارِ"],["لنقل وحدة الشحنات الموجبة بين نقطتين في مجال ثابت الشدة والاتجاه", "لِنَقْلِ وِحْدَةِ الشُّحْنَاتِ الْمُوجَبَةِ بَيْنَ نُقْطَتَيْنِ فِي مَجَالٍ ثَابِتِ الشِّدَّةِ وَالِاتِّجَاهِ"],["ويساوي شدة المجال مضروبة في", "وَيُسَاوِي شِدَّةَ الْمَجَالِ مَضْرُوبَةً فِي"],["مستقيمة وعمودية على خطوط المجال", "مُسْتَقِيمَةٌ وَعَمُودِيَّةٌ عَلَى خُطُوطِ الْمَجَالِ"],["والجهد على الخط الواحد ثابت.", "وَالْجُهْدُ عَلَى الْخَطِّ الْوَاحِدِ ثَابِتْ."],["هو طاقة الوضع التي تمتلكها وحدة الشحنة", "هُوَ طَاقَةُ الْوَضْعِ الَّتِي تَمْتَلِكُهَا وِحْدَةُ الشُّحْنَةِ"],["الشحنة موجبة، فالجهد عند النقطة موجب", "الشُّحْنَةُ مُوجَبَةٌ، فَالْجُهْدُ عِنْدَ النُّقْطَةِ مُوجَبٌ"],["والفولت يساوي جولا لكل كولوم", "وَالْفُولْتُ يُسَاوِي جُولًا لِكُلِّ كُولُومٍ"]);SFIX.push(["لأن المطلوب جهد نقطة حول شحنة نقطية", "لِأَنَّ الْمَطْلُوبَ جُهْدُ نُقْطَةٍ حَوْلَ شُحْنَةٍ نُقْطِيَّةٍ"],["حول شحنة نقطية:", "حَوْلَ شُحْنَةٍ نُقْطِيَّةٍ،"],["نحسب جهد النقطة بالقانون", "نَحْسُبُ جُهْدَ النُّقْطَةِ بِالْقَانُونِ"],["المسافة بين النقطتين باتجاه خطوط المجال.", "الْمَسَافَةِ بَيْنَ النُّقْطَتَيْنِ بِاتِّجَاهِ خُطُوطِ الْمَجَالْ."],["غير مربعة، بخلاف قانوني القوة والمجال", "غَيْرُ مُرَبَّعَةٍ، بِخِلَافِ قَانُونَيِ الْقُوَّةِ وَالْمَجَالْ"],["في قانون الجهد", "فِي قَانُونِ الْجُهْدِ"]);SFIX.__34=1}const K2='3-4',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');let ex=0;
  const R=[[/^الجهد الكهربائي V?$/,()=>card(K2,'volt')],[/^فرق الجهد بين نقطتين$/,()=>card(K2,'diff')],[/^الجهد في نوعي المجال الكهربائي$/,()=>card(K2,'kinds')],
    [/^الجهد الناشئ عن شحنة نقطية/,()=>card(K2,'point')],[/^فرق الجهد في المجال الكهربائي المنتظم$/,()=>card(K2,'uniform')],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال ٢:.*صفحة 96/,()=>card(K2,'ex2')],[/^رسم توضيحي [12]$/,()=>null],
    [/^تمرين 1 · ورقة العمل/,()=>card(K2,'tr1')],[/^تمرين 2 · ورقة العمل/,()=>card(K2,'tr2')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وبعد أن فهمنا الجهد الكهربائي وفرق الجهد، لنرى أين نجدهما في حياتنا.';const IC=[[/البطارية/,'bat'],[/الضغط العالي/,'pole']];
      sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;
        const ik=(IC.find(([re])=>re.test(m[1]))||[0,''])[1],icn=ik&&IM34[ik]?'<img src="'+IM34[ik]+'" alt="">':'💡',il=typeof inl==='function'?inl:(t=>t);
        return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">${icn}</span><div><b>${il(m[1])}</b> ${il(m[2])}</div></div>`,say:m[1].trim()+' '+m[2]}});return sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

const IM35={"flash": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0YjU1NjMiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxMTE4MjciLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0ibCIgY3g9Ii40IiBjeT0iLjM1IiByPSIuNyI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOTNjNWZkIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiMxZTNhOGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMjA2MTciLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZiIgeDE9IjAiIHgyPSIwIiB5MT0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZkZTY4YSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxlbGxpcHNlIGN4PSI4MCIgY3k9IjE0NiIgcng9IjU2IiByeT0iNyIgZmlsbD0idXJsKCNzKSIvPjxyZWN0IHg9IjIwIiB5PSI1OCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI4MCIgcng9IjEyIiBmaWxsPSJ1cmwoI2IpIi8+PHJlY3QgeD0iNDAiIHk9IjQ0IiB3aWR0aD0iNDAiIGhlaWdodD0iMTgiIHJ4PSI0IiBmaWxsPSIjMzc0MTUxIi8+PHJlY3QgeD0iOTYiIHk9IjQwIiB3aWR0aD0iMzQiIGhlaWdodD0iMjAiIHJ4PSIzIiBmaWxsPSJ1cmwoI2YpIiBzdHJva2U9IiNkOTc3MDYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjEwMCIgcj0iMzAiIGZpbGw9IiMxZjI5MzciIHN0cm9rZT0iIzZiNzI4MCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PGNpcmNsZSBjeD0iODAiIGN5PSIxMDAiIHI9IjIyIiBmaWxsPSJ1cmwoI2wpIi8+PGNpcmNsZSBjeD0iNzIiIGN5PSI5MiIgcj0iNSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjciLz48cGF0aCBkPSJNMTEzIDE4IGwtOCAxNCBoNyBsLTYgMTIgMTQgLTE3IGgtNyBsNyAtOXoiIGZpbGw9IiNmYWNjMTUiIHN0cm9rZT0iI2I0NTMwOSIvPjwvc3ZnPg==", "heart": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImgiIGN4PSIuMzUiIGN5PSIuMyIgcj0iLjgiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZjYTVhNSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiNkYzI2MjYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3ZjFkMWQiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxNDYiIHJ4PSI1MCIgcnk9IjciIGZpbGw9InVybCgjcykiLz48cGF0aCBkPSJNODAgMTM2IEMyMCA5NiAxNCA2MCAzOCA0MiBDNTYgMzAgNzQgMzggODAgNTQgQzg2IDM4IDEwNCAzMCAxMjIgNDIgQzE0NiA2MCAxNDAgOTYgODAgMTM2WiIgZmlsbD0idXJsKCNoKSIgc3Ryb2tlPSIjN2YxZDFkIiBzdHJva2Utd2lkdGg9IjIiLz48ZWxsaXBzZSBjeD0iNTYiIGN5PSI1OCIgcng9IjEyIiByeT0iNyIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iLjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgtMzAgNTYgNTgpIi8+PHBhdGggZD0iTTMwIDkwIEg2MiBMNzAgNzQgTDgwIDEwNiBMOTAgODQgSDEzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMTA4IDE0IGwtOCAxNCBoNyBsLTYgMTIgMTQgLTE3IGgtNyBsNyAtOXoiIGZpbGw9IiNmYWNjMTUiIHN0cm9rZT0iI2I0NTMwOSIvPjwvc3ZnPg==", "touch": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InAiIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMTExODI3Ii8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzM3NDE1MSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExMTgyNyIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNjBhNWZhIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN2MzYWVkIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImsiIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZjVkMGI1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZDg5Yjc2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PGVsbGlwc2UgY3g9IjcyIiBjeT0iMTQ4IiByeD0iNDAiIHJ5PSI2IiBmaWxsPSJ1cmwoI3MpIi8+PHJlY3QgeD0iNDAiIHk9IjE0IiB3aWR0aD0iNjQiIGhlaWdodD0iMTMwIiByeD0iMTIiIGZpbGw9InVybCgjcCkiLz48cmVjdCB4PSI0NiIgeT0iMjYiIHdpZHRoPSI1MiIgaGVpZ2h0PSIxMDQiIHJ4PSI1IiBmaWxsPSJ1cmwoI2cpIi8+PGNpcmNsZSBjeD0iNzYiIGN5PSI3NCIgcj0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIuOSIvPjxjaXJjbGUgY3g9Ijc2IiBjeT0iNzQiIHI9IjE4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iLjUiLz48cGF0aCBkPSJNNzggNzYgQzgwIDcwIDg4IDcwIDkwIDc2IEw5MiA5MiBDMTAwIDg4IDEwOCA5MiAxMDggMTAwIEwxMDYgMTI0IEMxMDQgMTM4IDk0IDE0NiA4MiAxNDYgQzcwIDE0NiA2NCAxMzggNjIgMTI4IEw2MCAxMDQgQzYwIDk4IDY4IDk2IDcwIDEwMiBMNzIgMTEwIFoiIGZpbGw9InVybCgjaykiIHN0cm9rZT0iI2ExNjIwNyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4="};
/* ===== الدرس النموذجي 3-5: السعة الكهربائية والمكثفات ===== */
/* لوح مجسم رأسي بمنظور: وجه أمامي ووجه علوي ووجه جانبي */
function cSlab(x,y,h,w,dx0,dy0,grad,side,n){const {t,dx,dy}=PG(h),pos=grad==='kc-plP';return mPlate(x+w-t,y,t,h,dx,dy,pos,n)}
/* رمز البطارية: الخط الطويل موجب والقصير السميك سالب */
function batSym(x,y,lab){return `<rect x="${x-9}" y="${y-6}" width="18" height="12" fill="#eef4fb"/><line x1="${x-7}" y1="${y-22}" x2="${x-7}" y2="${y+22}" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/><line x1="${x+7}" y1="${y-12}" x2="${x+7}" y2="${y+12}" stroke="#1d4ed8" stroke-width="8" stroke-linecap="round"/>`+lbl(x-20,y-22,'+','#b91c1c',18)+lbl(x+20,y-16,'−','#1d4ed8',20)+(lab?lbl(x,y+22+18*TS,lab,'#334155',15):'')}
/* قطبا مصدر الجهد: موجب وسالب */
function srcPoles(x,y,lab){const P=(px,pos)=>`<circle cx="${px}" cy="${y+3}" r="20" fill="#000" opacity=".15"/><circle cx="${px}" cy="${y}" r="20" fill="${pos?'#dc2626':'#2563eb'}" stroke="#fff" stroke-width="3"/><circle cx="${px-6}" cy="${y-7}" r="6" fill="#fff" opacity=".35"/><text x="${px}" y="${y+(pos?9:8)}" text-anchor="middle" font-size="${pos?26:30}" font-weight="900" fill="#fff">${pos?'+':'−'}</text>`;
  return P(x-46,true)+P(x+46,false)+(lab?lbl(x,y+42,lab,'#334155',16):'')}
/* مكثف ذو لوحين في دائرة مع بطارية */
function cCircuit(L,R,top,bot,V,showQ,n){const yb=bot+40,g=PG(bot-top),my=(top+bot)/2,cL=[L-4+g.dx*.5,my-g.dy*.5],cR=[R+16+g.dx*.5,my-g.dy*.5],Lw=g.dx*.5+26,xL=L-4-Lw,xR=cR[0]+Lw,cx=(xL+xR)/2;
  let b=rWire(`M${cL[0]},${cL[1]} H${xL} V${yb} H${cx-8}`,'#1f2937');
  b+=cSlab(L-16,top,bot-top,16,30,24,'kc-plP','#7f1d1d');mSurf.hole=1;b+=cSlab(R,top,bot-top,16,30,24,'kc-plN','#1e3a8a');mSurf.hole=0;
  b+=rWire(`M${cx+8},${yb} H${xR} V${cR[1]} H${cR[0]}`,'#1f2937');
  b+=batSym(cx,yb,V||'');
  return b}
cCircuit=narrow(cCircuit);
/* 1) السعة: مضاعفة الجهد تضاعف الشحنة والنسبة ثابتة (متحرك 12 ث) */
function cChargeScene(){const W=640,H=330,D=12,L=284,R=284+Math.round(114*.3)+10,top=98,bot=212;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=scShow(D,0,6,cCircuit(L,R,top,bot,'V',true,3),false)+scShow(D,6,D,cCircuit(L,R,top,bot,'2V',true,6),false);
  b+=scShow(D,1.4,6,`<g>${scTag(L-95,top+20,'+q','#b91c1c',60)}${scTag(R+165,top+20,'−q','#1d4ed8',60)}</g>`,true);
  b+=scShow(D,6.6,D-.1,`<g>${scTag(L-99,top+20,'+2q','#b91c1c',70)}${scTag(R+169,top+20,'−2q','#1d4ed8',70)}</g>`,true);
  b+=scShow(D,3.2,D-.1,`<g>${scTag(W/2+10,bot+104,'C = q / V = 2q / 2V','#7e22ce',230)}</g>`,true);
  b+=scCap(D,W,'1. فرق الجهد V يشحن اللوحين بالشحنة q','#475569',0,3.2)+scCap(D,W,'2. نسبة الشحنة إلى الجهد هي السعة C','#7e22ce',3.2,6)+scCap(D,W,'3. نضاعف الجهد: تتضاعف الشحنة وتبقى السعة ثابتة','#0f766e',6,D);
  return svg(W,H,b,'kScene')}
/* 2) المكثف ذو اللوحين المتوازيين بمنظور ثلاثي الأبعاد */
function cPlatesFig(){const W=640,H=330,top=110,bot=255,h=bot-top,g=PG(h),L=280,R=L+g.dx+34;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=mPlate(L-4,top,4,h,g.dx,g.dy,true);const rows=4;
  for(let i=0;i<rows;i++){const yy=top+(i+.5)*h/rows-g.dy*.5+h/rows*.5;b+=fArrow(L+g.dx*.5,R+2,yy)}
  b+=mSurf(L,top,h,g.dx,g.dy,true).replace(/<polygon[^>]*\/>/g,'')+mPlate(R+2,top,4,h,g.dx,g.dy,false);
  b+=lbl(L+g.dx*.5,top-g.dy-12,'+Q','#b91c1c',17)+lbl(R+6+g.dx*.5,top-g.dy-12,'−Q','#1d4ed8',17);
  b+=dim(L+g.dx,R+2,bot+30,'d');
  b+=`<g>${tagR(L-110,top+70,'مساحة اللوح A','#b45309',140)}</g><line x1="${L-40}" y1="${top+70}" x2="${L-6}" y2="${top+70}" stroke="#b45309" stroke-width="2"/>`;
  b+=`<g>${tagR((L+R)/2+g.dx*.5,top-g.dy-44,'وسط عازل (هواء)','#0369a1',150)}</g>`+lbl(R+g.dx+40,top+h*.45,'E','#0f766e',20)+`<line x1="${R+g.dx+28}" y1="${top+h*.45-6}" x2="${R+g.dx-4}" y2="${top+h*.45-6}" stroke="#0f766e" stroke-width="1.6" stroke-dasharray="3 3"/>`;
  return svg(W,H,b,'kAuto')}
/* 3) السماحية: الوسط العازل يزيد السعة */
function cPermFig(){const W=640,H=340;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=vertCap(150,175,130,90,false)+`<g>${scTag(160,318,'C = ε₀·A / d','#0f766e',150)}</g>`;
  b+=vertCap(480,175,130,90,true)+`<g>${scTag(490,318,'C = εᵣ·ε₀·A / d','#7e22ce',170)}</g>`;
  b+=arrA(282,175,0,72,'#7e22ce',10)+lblR(318,157,'تزيد السعة','#7e22ce',14);
  b+=`<g>${tagR(W/2,30,'سماحية الوسط: ε = ε₀·εᵣ','#475569',220)}</g>`;
  return svg(W,H,b,'kAuto')}
/* لوح رقيق مجسم وعازل شفاف (مشهدا الوسط العازل والعوامل) */
function tPlate(x,top,bot,pos){const w=7,dx=10,dy=8,g=pos?'kc-pP2':'kc-pN2',sd=pos?'#7f1d1d':'#1e3a8a',tp=pos?'#fecaca':'#bfdbfe';
  return `<ellipse cx="${x+8}" cy="${bot+4}" rx="18" ry="4" fill="url(#kc-sd)"/><polygon points="${x+w},${top} ${x+w+dx},${top-dy} ${x+w+dx},${bot-dy} ${x+w},${bot}" fill="${sd}"/><polygon points="${x},${top} ${x+dx},${top-dy} ${x+w+dx},${top-dy} ${x+w},${top}" fill="${tp}"/><rect x="${x}" y="${top}" width="${w}" height="${bot-top}" fill="url(#${g})"/><rect x="${x+1.6}" y="${top+4}" width="1.6" height="${bot-top-8}" fill="#fff" opacity=".5"/>`}
function tDiel(x0,x1,top,bot){/* مكعب عازل مجسم في وسط الفراغ بين اللوحين، أصفر فاتح، مكتوب عليه εᵣ */
  const gap=x1-x0,w=Math.min(gap*.62,120),h=Math.min((bot-top)*.62,w*1.25),L=x0+(gap-w)/2,T=(top+bot)/2-h/2+6,dx=Math.min(22,w*.22),dy=Math.min(17,w*.17);
  return `<ellipse cx="${f1(L+w/2+dx/2)}" cy="${f1(T+h+4)}" rx="${f1(w*.62)}" ry="6" fill="url(#kc-sd)"/>`
   +`<polygon points="${f1(L+w)},${f1(T)} ${f1(L+w+dx)},${f1(T-dy)} ${f1(L+w+dx)},${f1(T+h-dy)} ${f1(L+w)},${f1(T+h)}" fill="#eab308" stroke="#ca8a04" stroke-width="1.2"/>`
   +`<polygon points="${f1(L)},${f1(T)} ${f1(L+dx)},${f1(T-dy)} ${f1(L+w+dx)},${f1(T-dy)} ${f1(L+w)},${f1(T)}" fill="#fef3c7" stroke="#ca8a04" stroke-width="1.2"/>`
   +`<rect x="${f1(L)}" y="${f1(T)}" width="${f1(w)}" height="${f1(h)}" fill="url(#kc-dyF)" stroke="#ca8a04" stroke-width="1.4"/><rect x="${f1(L+5)}" y="${f1(T+6)}" width="4" height="${f1(h-12)}" rx="2" fill="#fff" opacity=".55"/>`
   +`<text x="${f1(L+w/2)}" y="${f1(T+h/2+11)}" text-anchor="middle" font-size="${f1(Math.min(34,w*.36))}" font-weight="900" fill="#92400e" direction="ltr" style="paint-order:stroke" stroke="#fff7d6" stroke-width="3">εᵣ</text>`}
/* مكثف بألواح أفقية مكدسة (منظور ثلاثي الأبعاد): لوح علوي موجب، ووسط (هواء أو عازل أصفر فاتح)، ولوح سفلي سالب، وطرفا توصيل */
function slab(x,y,w,t,dx,dy,front,top,side,st){return `<polygon points="${f1(x)},${f1(y)} ${f1(x+dx)},${f1(y-dy)} ${f1(x+w+dx)},${f1(y-dy)} ${f1(x+w)},${f1(y)}" fill="${top}" stroke="${st}" stroke-width="1"/><polygon points="${f1(x+w)},${f1(y)} ${f1(x+w+dx)},${f1(y-dy)} ${f1(x+w+dx)},${f1(y+t-dy)} ${f1(x+w)},${f1(y+t)}" fill="${side}" stroke="${st}" stroke-width="1"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(t)}" fill="${front}" stroke="${st}" stroke-width="1"/>`}
function stackCap(cx,cy,w,gap,diel,o){o=o||{};const dx=o.dx||52,dy=o.dy||40,t=11,x=cx-w/2-dx/2,yTop=cy-gap/2-t,yBot=cy+gap/2;let b='';
  b+=`<ellipse cx="${f1(cx)}" cy="${f1(yBot+t+10)}" rx="${f1(w*.62)}" ry="9" fill="url(#kc-sd)"/>`;
  b+=`<rect x="${f1(cx+dx/2-3)}" y="${f1(yBot+t-dy/2)}" width="6" height="34" rx="3" fill="#374151"/>`;
  b+=slab(x,yBot,w,t,dx,dy,'url(#kc-pN2)','#93c5fd','#1e3a8a','#1e3a8a');
  if(diel)b+=slab(x,yTop+t,w,gap,dx,dy,'url(#kc-dyF)','#fef3c7','#facc15','#ca8a04')+`<text x="${f1(x+w/2)}" y="${f1(cy+Math.min(9,gap*.32))}" text-anchor="middle" font-size="${f1(Math.min(24,gap*.85))}" font-weight="900" fill="#92400e" direction="ltr">εᵣ</text>`;
  b+=slab(x,yTop,w,t,dx,dy,'url(#kc-pP2)','#fecaca','#7f1d1d','#7f1d1d');
  b+=`<rect x="${f1(cx+dx/2-3)}" y="${f1(yTop-dy/2-34)}" width="6" height="34" rx="3" fill="#374151"/>`;
  b+=`<text x="${f1(x-14)}" y="${f1(yTop+9)}" text-anchor="middle" font-size="17" font-weight="900" fill="#dc2626">+</text><text x="${f1(x-14)}" y="${f1(yBot+10)}" text-anchor="middle" font-size="19" font-weight="900" fill="#2563eb">−</text>`;
  return b}
/* مكثف رأسي بلا أطراف: لوح أحمر موجب يسارا، ووسط (هواء أو عازل أصفر فاتح مكتوب عليه «وسط عازل»)، ولوح أزرق سالب يمينا — منظور ثلاثي الأبعاد */
const qB=(x,y,pos,r)=>{r=r||8.5;return `<g filter="drop-shadow(0 1.5px 1.5px rgba(15,23,42,.35))"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${pos?'#dc2626':'#2563eb'}" stroke="#fff" stroke-width="1.6"/><text x="${f1(x)}" y="${f1(y+r*.48)}" text-anchor="middle" font-size="${f1(r*1.55)}" font-weight="900" fill="#fff">${pos?'+':'−'}</text></g>`};
/* سطح اللوح المعدني (الوجه العريض) بانعكاسات، والشحنات عليه */
function mSurf(x,top,h,dx,dy,pos,n){const P=(u,v)=>[x+u*dx,top+v*h-u*dy],pp=a=>a.map(p=>f1(p[0])+','+f1(p[1])).join(' ');let b=`<polygon points="${pp([P(0,0),P(1,0),P(1,1),P(0,1)])}" fill="url(#kc-mtS)" stroke="#475569" stroke-width=".9"/>`;
  b+=`<polygon points="${pp([P(.08,.02),P(.42,0),P(.18,1),P(0,.98)])}" fill="#fff" opacity=".35"/><polygon points="${pp([P(.6,0),P(.74,0),P(.5,1),P(.4,1)])}" fill="#fff" opacity=".25"/>`;
  const cols=Math.max(dx<34?1:2,Math.round(dx/30)),rows=n||Math.max(2,2*Math.round(h/68)),r=Math.min(9,h/rows*.36,dx/cols*.4);
  for(let j=0;j<cols;j++)for(let i=0;i<rows;i++){const u=(j+.5)/cols,vw=.5+(u-.5)*dy/h,v=(mSurf.hole&&u>=.5)?vw+(i-(rows-1)/2)*Math.min(1/rows,(1-2*(r+2)/h-Math.abs(vw-.5)*2)/(rows-1)):(i+.5)/rows,q=P(u,v);b+=qB(q[0],q[1],pos,r)}
  return b}
/* خط مجال واضح بسهم بين لوحين متقاربين */
const fArrow=(x1,x2,y)=>`<line x1="${f1(x1)}" y1="${f1(y)}" x2="${f1(x2)}" y2="${f1(y)}" stroke="#0f766e" stroke-width="2.6" stroke-linecap="round"/><polygon points="${f1((x1+x2)/2-6)},${f1(y-5)} ${f1((x1+x2)/2+6)},${f1(y)} ${f1((x1+x2)/2-6)},${f1(y+5)}" fill="#0f766e"/>`;
/* لوح معدني رأسي مجسم (ألومنيوم بلمعة) وعليه شحنات واضحة */
function mPlate(x,top,t,h,dx,dy,pos,nq){return `<polygon points="${f1(x)},${f1(top)} ${f1(x+dx)},${f1(top-dy)} ${f1(x+t+dx)},${f1(top-dy)} ${f1(x+t)},${f1(top)}" fill="url(#kc-mtT)" stroke="#475569" stroke-width=".9"/>`+mSurf(x+t,top,h,dx,dy,pos,nq)+`<rect x="${f1(x)}" y="${f1(top)}" width="${f1(t)}" height="${f1(h)}" fill="url(#kc-mtF)" stroke="#475569" stroke-width=".9"/><rect x="${f1(x+2)}" y="${f1(top+5)}" width="2" height="${f1(h-10)}" fill="#fff" opacity=".8"/>`}
function vertCap(cx,cy,h,gap,diel,lab){const {t,dx,dy}=PG(h),x0=cx-(2*t+gap+dx)/2,top=cy-h/2+dy/2,xr=x0+t+gap;let b='';
  b+=`<ellipse cx="${f1(cx)}" cy="${f1(top+h+6)}" rx="${f1((gap+2*t+dx)*.55)}" ry="8" fill="url(#kc-sd)"/>`;
  b+=mPlate(x0,top,t,h,dx,dy,true);
  if(diel){const X=x0+t;b+=`<g opacity=".55"><polygon points="${f1(X)},${f1(top)} ${f1(X+dx)},${f1(top-dy)} ${f1(xr+dx)},${f1(top-dy)} ${f1(xr)},${f1(top)}" fill="#fef3c7"/><rect x="${f1(X)}" y="${f1(top)}" width="${f1(gap)}" height="${f1(h)}" fill="url(#kc-dyF)"/></g><polygon points="${f1(X)},${f1(top)} ${f1(X+dx)},${f1(top-dy)} ${f1(xr+dx)},${f1(top-dy)} ${f1(xr)},${f1(top)}" fill="none" stroke="#ca8a04" stroke-width="1.2"/><rect x="${f1(X)}" y="${f1(top)}" width="${f1(gap)}" height="${f1(h)}" fill="none" stroke="#ca8a04" stroke-width="1.2"/>`+mSurf(X,top,h,dx,dy,true).replace(/<polygon[^>]*\/>/g,'');}
  b+=mPlate(xr,top,t,h,dx,dy,false);
  if(lab!==false){const fs=Math.max(11,Math.min(14,gap*.16)),ty=top-dy-(diel?30:10),T=diel?'وسط عازل εᵣ':'هواء';if(diel){const ax=x0+t+gap/2+dx*.5,ay=top-dy*.5;b+=`<line x1="${f1(ax)}" y1="${f1(ty+5)}" x2="${f1(ax)}" y2="${f1(ay-9)}" stroke="#a16207" stroke-width="2.5"/><polygon points="${f1(ax-6)},${f1(ay-11)} ${f1(ax+6)},${f1(ay-11)} ${f1(ax)},${f1(ay-1)}" fill="#a16207"/>`}
    b+=`<text x="${f1(x0+t+gap/2+dx*.5)}" y="${f1(ty)}" text-anchor="middle" font-size="${f1(fs)}" font-weight="900" fill="${diel?'#a16207':'#475569'}" stroke="#fff" stroke-width="3" paint-order="stroke">${T}</text>`;
    b+=lbl(x0-14,top+h*.5,'+Q','#b91c1c',15)+lbl(xr+t+dx+18,top+h*.5-dy*.5,'−Q','#1d4ed8',15);
    b+=dim(x0+t,xr,top+h+22,'d');
    b+=`<text x="${f1(xr+t/2+dx*.75)}" y="${f1(top-dy*.75-8)}" text-anchor="middle" font-size="15" font-weight="900" fill="#b45309" stroke="#fff" stroke-width="3" paint-order="stroke">A</text>`}
  return b}
/* 4) العوامل المؤثرة على السعة (متحرك 12 ث) */
function cFactorsScene(){const W=640,H=330,D=12,cx=320,cy=162;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const tag=(t,c)=>`<g>${tagR(W/2,H-22,t,c,t.length*8.6+40)}</g>`;
  b+=scShow(D,0,1.8,vertCap(cx,cy,95,100,false),false)+scShow(D,1.8,4,vertCap(cx,cy,150,100,false),false)+scShow(D,1.8,4,tag('المساحة A تزيد ← السعة C تزيد','#0f766e'),true);
  b+=scShow(D,4,5.8,vertCap(cx,cy,130,70,false),false)+scShow(D,5.8,8,vertCap(cx,cy,130,170,false),false)+scShow(D,5.8,8,tag('المسافة d تزيد ← السعة C تقل','#b45309'),true);
  b+=scShow(D,8,9.6,vertCap(cx,176,110,100,false),false)+scShow(D,9.6,D,vertCap(cx,176,110,100,true),false)+scShow(D,9.6,D,tag('وسط عازل εᵣ ← السعة C تزيد','#7e22ce'),true);
  b+=scCap(D,W,'1. مساحة اللوحين: علاقة طردية','#0f766e',0,4)+scCap(D,W,'2. المسافة بين اللوحين: علاقة عكسية','#b45309',4,8)+scCap(D,W,'3. الوسط العازل بين اللوحين','#7e22ce',8,D);
  return svg(W,H,b,'kScene')}
/* رسوم الأمثلة: مكثف في دائرة */
function cCapEx(o){const W=640,H=300,L=300,R=300+Math.round(130*.3)+10,top=60,bot=190;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=cCircuit(L,R,top,bot,o.V||'',true,4);
  if(o.q){const bw=o.q.length*9+26,t0=TS;TS=Math.min(t0,(L-44)/bw);const w=bw*TS;b+=`<g>${scTag(Math.min(L-128,L-34-w/2),top+10,o.q,'#b91c1c',bw)}</g>`;TS=t0}
  if(o.C){const w=(o.C.length*9+26)*TS;b+=`<g>${scTag(Math.max(R+168,R+70+w/2),top+10,o.C,'#7e22ce',o.C.length*9+26)}</g>`}
  if(o.res)b+=pill(W/2,top-26,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls)}
function cPlatesEx(o){const W=640,H=300,top=80,bot=215,h=bot-top,g=PG(h),L=290,R=L+g.dx+34;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=mPlate(L-4,top,4,h,g.dx,g.dy,true);const rows=4;
  for(let i=0;i<rows;i++){const yy=top+(i+.5)*h/rows-g.dy*.5+h/rows*.5;b+=fArrow(L+g.dx*.5,R+2,yy)}
  b+=mSurf(L,top,h,g.dx,g.dy,true).replace(/<polygon[^>]*\/>/g,'')+mPlate(R+2,top,4,h,g.dx,g.dy,false);
  b+=dim(L+g.dx,R+2,bot+30,o.d||'d')+(o.A?`<g>${tagR(Math.min(L-90,L-30-(o.A.length*9+30)*TS/2),top+60,o.A,'#b45309',o.A.length*9+30)}</g>`:'')+(o.V?`<g>${scTag(Math.max(R+g.dx+90,R+g.dx+34+(o.V.length*9+26)*TS/2),top+60,o.V,'#334155',o.V.length*9+26)}</g>`:'');
  if(o.res)b+=pill(W/2,top-46,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls)}
cPlatesFig=narrow(cPlatesFig);cPlatesEx=narrow(cPlatesEx);
/* بطاقة تمرين عامة: سؤال، معطيات، رسم، قانون، تعويض، حساب، نتيجة */
function trCard(t,sayT,o){return {title:t,sayT,steps:()=>[S(q(o.q),''),S(gr(o.g,o.r),''),...(o.fig?[S(fig(o.fig()),o.figSay||'لنرسم المكثف بالمعطيات.')]:[]),
  S(st(1,'القانون: '+M(o.law)),'القانون: `'+o.law+'`'),S(st(2,'التعويض: '+M(o.sub)),'نعوض: `'+o.sub+'`'),S(st(3,'الحساب: '+M(o.calc)+'<span class="kDirOn"></span>'),'الحساب: `'+o.calc+'`'),S(res(M(o.ans)),'')]}}
CARDS['3-5']={
  cap:{title:'السعة الكهربائية',sayT:'نبدأ أول موضوعات درسنا: السعة الكهربائية.',steps:()=>[
    S(pt(B('السعة الكهربائية')+': هي كمية الشحنة الكهربائية اللازمة لتغيير جهد المكثف بمقدار واحد فولت.'),''),
    S(fig(cChargeScene(),'مشهد: نضاعف الجهد فتتضاعف الشحنة وتبقى السعة ثابتة'),'شاهد المشهد: فَرْقُ الْجُهْدِ يَشْحَنُ اللَّوْحَيْنِ، أَحَدُهُمَا بِشُحْنَةٍ مُوجَبَةٍ وَالْآخَرُ بِشُحْنَةٍ سَالِبَةٍ. وَعِنْدَمَا نُضَاعِفُ الْجُهْدَ تَتَضَاعَفُ الشُّحْنَةُ، فَتَبْقَى النِّسْبَةُ بَيْنَهُمَا ثَابِتَةً، وَهَذِهِ النِّسْبَةُ هِيَ السِّعَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('C = q / V')+'</div>'),'وقانون السعة: `C = q / V`'),{md:'`C = q / V`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('C')+' السعة الكهربائية، ووحدتها الفاراد '+M('F')+'<br>'+M('q')+' الشحنة على أحد اللوحين، ووحدتها الكولوم '+M('C')+'<br>'+M('V')+' فرق الجهد بين اللوحين، ووحدته الفولت '+M('V')+'</div>'},'حيث: `C` السِّعَةُ الْكَهْرَبَائِيَّةُ، ووحدتها الفاراد. و `q` الشُّحْنَةُ عَلَى أَحَدِ اللَّوْحَيْنِ، ووحدتها الكولوم. و `V` فَرْقُ الْجُهْدِ بَيْنَ اللَّوْحَيْنِ، ووحدته الفولت.'),
    S(pt('الفاراد وحدة كبيرة، لذلك نستخدم أجزاءه: الميكروفاراد '+M('µF = 10⁻⁶ F')+' والبيكوفاراد '+M('pF = 10⁻¹² F')+'.'),'الْفَارَادُ وَحْدَةٌ كَبِيرَةٌ، لذلك نَسْتَخْدِمُ أَجْزَاءَهُ: الميكروفاراد، وَيُسَاوِي عَشَرَةً أُسُّ سَالِبِ سِتَّةٍ مِنَ الْفَارَادِ، والبيكوفاراد، وَيُسَاوِي عَشَرَةً أُسُّ سَالِبِ اثْنَيْ عَشَرَ مِنَ الْفَارَادْ.')]},
  plate:{title:'المكثف ذو اللوحين المتوازيين',sayT:'والآن، لنتعرف على المكثف ذي اللوحين المتوازيين.',steps:()=>[
    S(pt(B('المكثف ذو اللوحين المتوازيين')+': لوحان متوازيان من مادة ناقلة للكهرباء، يفصل بينهما وسط عازل، ويحمل وجهاهما الداخليان شحنات كهربائية متعاكسة بسبب فرق الجهد بينهما.'),''),
    S(fig(cPlatesFig(),'المكثف: لوحان متوازيان مساحة كل منهما A، والمسافة بينهما d'),'لاحظ الرسم: لَوْحَانِ مُتَوَازِيَانِ، مِسَاحَةُ كُلٍّ مِنْهُمَا A، وَالْمَسَافَةُ بَيْنَهُمَا d، وَبَيْنَهُمَا هَوَاءٌ. اللَّوْحُ الْأَيْسَرُ يَحْمِلُ شُحْنَةً مُوجَبَةً، وَالْأَيْمَنُ شُحْنَةً سَالِبَةً، وَالْمَجَالُ بَيْنَهُمَا مُنْتَظِمْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('C = ε₀·A / d')+'</div>'),'وقانون سعته إذا كان بين اللوحين هواء أو فراغ: `C = ε₀·A / d`'),{md:'`C = ε₀·A / d`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('C')+' سعة المكثف، ووحدتها الفاراد '+M('F')+'<br>'+M('ε₀')+' سماحية الفراغ، وتساوي '+M('8.85 × 10⁻¹² F/m')+'<br>'+M('A')+' مساحة سطح أحد اللوحين، ووحدتها '+M('m²')+'<br>'+M('d')+' المسافة بين اللوحين، ووحدتها المتر '+M('m')+'</div>'},'حيث: `C` سِعَةُ الْمُكَثِّفِ، ووحدتها الفاراد. و `ε₀` سَمَاحِيَّةُ الْفَرَاغِ. و `A` مِسَاحَةُ سَطْحِ أَحَدِ اللَّوْحَيْنِ، ووحدتها المتر المربع. و `d` الْمَسَافَةُ بَيْنَ اللَّوْحَيْنِ، ووحدتها المتر.'),
    S(pt('المجال بين اللوحين '+B('منتظم')+'، ونحسب فرق الجهد بينهما من '+M('ΔV = E·d')+'.'),'')]},
  perm:{title:'سماحية الوسط العازل',sayT:'وماذا لو وضعنا بين اللوحين وسطا عازلا غير الهواء؟',steps:()=>[
    S(pt(B('سماحية الفراغ')+' '+M('ε₀')+': مقدار ثابت يصف قدرة الفراغ على السماح بنشوء المجال الكهربائي فيه، وقيمتها '+M('8.85 × 10⁻¹² F/m')+'.'),''),
    S(pt(B('السماحية النسبية')+' '+M('εᵣ')+': النسبة بين سماحية الوسط العازل وسماحية الفراغ، وليس لها وحدة. وللهواء '+M('εᵣ = 1')+'.'),''),
    S(fig(cPermFig(),'الوسط العازل بين اللوحين يضاعف السعة'),'قارن في الرسم: إِذَا وَضَعْنَا بَيْنَ اللَّوْحَيْنِ وَسَطًا عَازِلًا سَمَاحِيَّتُهُ النِّسْبِيَّةُ إِبْسِلُونْ آرْ، تَزِيدُ السِّعَةُ بِالنِّسْبَةِ نَفْسِهَا.'),
    Object.assign(S(pt('<div class="kLaw">'+M('C = εᵣ·ε₀·A / d')+'</div>'),'وتصبح العلاقة: `C = εᵣ·ε₀·A / d`'),{md:'`C = εᵣ·ε₀·A / d`'})]},
  factors:{title:'العوامل المؤثرة على سعة المكثف',sayT:'وَمِنَ الْقَانُونِ نَسْتَنْتِجُ الْعَوَامِلَ الْمُؤَثِّرَةَ عَلَى سِعَةِ الْمُكَثِّفْ.',steps:()=>[
    S(pt(B('المساحة السطحية للوحين')+': علاقة طردية، فإذا زادت المساحة زادت السعة.'),''),
    S(pt(B('المسافة بين اللوحين')+': علاقة عكسية، فإذا زادت المسافة قلت السعة.'),''),
    S(pt(B('الوسط العازل')+': كلما زادت سماحيته النسبية زادت السعة.'),''),
    S(fig(cFactorsScene(),'مشهد: أثر المساحة والمسافة والوسط العازل في السعة'),'شاهد المشهد: عِنْدَمَا تَزِيدُ مِسَاحَةُ اللَّوْحَيْنِ تَزِيدُ السِّعَةُ، وَعِنْدَمَا تَزِيدُ الْمَسَافَةُ بَيْنَهُمَا تَقِلُّ السِّعَةُ، وَعِنْدَمَا نَضَعُ وَسَطًا عَازِلًا بَيْنَهُمَا تَزِيدُ السِّعَهْ.')]},
  ex1:{title:'مثال ١ · صفحة 98',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 98.',steps:()=>[
    S(q('أوجد السعة الكهربائية لمكثف يحمل شحنة '+M('4.5 × 10⁻⁴ C')+' وفرق الجهد بين لوحيه '+M('150 V')+'.','المثال · صفحة 98'),''),
    S(gr(['q = 4.5 × 10⁻⁴ C','V = 150 V'],'سعة المكثف '+M('C')),''),
    S(fig(cCapEx({q:'q = 4.5 × 10⁻⁴ C',V:'V = 150 V',res:'C = 3 µF'})),'لنرسم المكثف موصولا بمصدر الجهد.'),
    S(st(1,'القانون: '+M('C = q / V')+' لأننا نعرف الشحنة والجهد.'),'نستخدم تعريف السعة: `C = q / V`، لأننا نعرف الشحنة والجهد مباشرة.'),
    S(st(2,'التعويض: '+M('C = 4.5 × 10⁻⁴ / 150')),'نعوض: `C = 4.5 × 10⁻⁴ / 150`'),
    S(st(3,'الحساب: '+M('C = 3 × 10⁻⁶ F = 3 µF')+'<span class="kDirOn"></span>'),'نقسم: أربعة ونصف على مئة وخمسين، فتكون السعة ثلاثة ميكروفاراد.'),
    S(res(M('C = 3 × 10⁻⁶ F = 3 µF')),'النتيجة: `C = 3 µF`.')]},
  ex2:{title:'مثال ٢ · صفحة 98',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 98.',steps:()=>[
    S(q('مكثف سعته '+M('27 × 10⁻⁶ F')+' وفرق الجهد بين لوحيه '+M('45 V')+'، أوجد الشحنة.','المثال · صفحة 98'),''),
    S(gr(['C = 27 × 10⁻⁶ F','V = 45 V'],'الشحنة '+M('q')),''),
    S(fig(cCapEx({C:'C = 27 µF',V:'V = 45 V',res:'q = 1.215 × 10⁻³ C'})),'لنرسم المكثف وسعته والجهد بين لوحيه.'),
    S(st(1,'القانون: '+M('q = C·V')+' من تعريف السعة.'),'من تعريف السعة نحصل على الشحنة: `q = C·V`'),
    S(st(2,'التعويض: '+M('q = 27 × 10⁻⁶ × 45')),'نعوض: `q = 27 × 10⁻⁶ × 45`'),
    S(st(3,'الحساب: '+M('q = 1215 × 10⁻⁶ = 1.215 × 10⁻³ C')+'<span class="kDirOn"></span>'),'سبعة وعشرون في خمسة وأربعين يساوي ألفا ومئتين وخمسة عشر، إذن `q = 1.215 × 10⁻³ C`'),
    S(res(M('q = 1.215 × 10⁻³ C')),'النتيجة: `q = 1.215 × 10⁻³ C`.')]},
  ex3:{title:'مثال ٣ · صفحة 99',sayT:'والمثال الثالث، مِنْ صَفْحَةِ 99.',steps:()=>[
    S(q('مكثف متوازي اللوحين، المسافة بين لوحيه '+M('5 × 10⁻³ m')+' ومساحة سطح كل من لوحيه '+M('2 m²')+' وفرق الجهد بينهما '+M('10⁻⁴ V')+'. أوجد: سعة المكثف، والشحنة على كل لوح، وشدة المجال بين لوحيه.','المثال · صفحة 99'),''),
    S(gr(['d = 5 × 10⁻³ m','A = 2 m²','V = 1 × 10⁻⁴ V','ε₀ = 8.85 × 10⁻¹² F/m'],'ثلاث كميات: '+M('C')+' و '+M('q')+' و '+M('E')),''),
    S(fig(cPlatesEx({A:'A = 2 m²',d:'d = 5 mm',V:'V = 10⁻⁴ V'})),'لنرسم المكثف وأبعاده.'),
    S(st(1,'السعة: '+M('C = ε₀·A / d = 8.85 × 10⁻¹² × 2 / 5 × 10⁻³ = 3.54 × 10⁻⁹ F')),'أولا السعة: `C = ε₀·A / d`، نعوض فتكون السعة ثلاثة فاصلة أربعة وخمسين في عشرة أس سالب تسعة فاراد.'),
    S(st(2,'الشحنة: '+M('q = C·V = 3.54 × 10⁻⁹ × 10⁻⁴ ≈ 3.5 × 10⁻¹³ C')),'ثانيا الشحنة: `q = C·V`، فتكون الشحنة على كل لوح ثلاثة فاصلة خمسة في عشرة أس سالب ثلاثة عشر كولوم.'),
    S(st(3,'المجال: '+M('E = ΔV / d = 10⁻⁴ / 5 × 10⁻³ = 0.02 N/C')+'<span class="kDirOn"></span>'),'ثالثا المجال المنتظم بين اللوحين: `E = ΔV / d`، فيكون المجال صفرا فاصلة صفر اثنين نيوتن لكل كولوم.'),
    S(res(M('C = 3.54 × 10⁻⁹ F')+' · '+M('q ≈ 3.5 × 10⁻¹³ C')+' · '+M('E = 0.02 N/C')),'')]},
  tr2:trCard('تمرين ١ · ورقة العمل · سؤال ٩ (صفحة 106)','هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال التاسع، صَفْحَةِ 106.',{q:'أوجد السعة الكهربائية لمكثف يحمل شحنة مقدارها '+M('4 × 10⁻⁴ C')+' وفرق الجهد بين لوحيه '+M('100 V')+'.',g:['q = 4 × 10⁻⁴ C','V = 100 V'],r:'السعة '+M('C'),fig:()=>cCapEx({q:'q = 4 × 10⁻⁴ C',V:'V = 100 V'}),law:'C = q / V',sub:'C = 4 × 10⁻⁴ / 100',calc:'C = 4 × 10⁻⁶ F',ans:'C = 4 × 10⁻⁶ F'}),
  tr3:trCard('تمرين ٢ · ورقة العمل · سؤال ١٠ (صفحة 107)','والتمرين الثاني، من ورقة العمل، السؤال العاشر، صَفْحَةِ 107.',{q:'مكثف سعته '+M('4.5 × 10⁻¹² F')+' يتصل ببطارية '+M('12 V')+'. أوجد شحنته.',g:['C = 4.5 × 10⁻¹² F','V = 12 V'],r:'الشحنة '+M('q'),fig:()=>cCapEx({C:'C = 4.5 pF',V:'V = 12 V'}),law:'q = C·V',sub:'q = 4.5 × 10⁻¹² × 12',calc:'q = 5.4 × 10⁻¹¹ C',ans:'q = 5.4 × 10⁻¹¹ C'}),
  tr4:trCard('تمرين ٣ · ورقة العمل · سؤال ١١ (صفحة 107)','والتمرين الثالث، من ورقة العمل، السؤال الحادي عشر، صَفْحَةِ 107.',{q:'مكثف متوازي اللوحين سعته '+M('6 × 10⁻⁶ F')+'، ربط بفرق جهد حتى أصبحت شحنته '+M('6 × 10⁻⁶ C')+'. أوجد فرق الجهد بين لوحيه.',g:['C = 6 × 10⁻⁶ F','q = 6 × 10⁻⁶ C'],r:'فرق الجهد '+M('V'),fig:()=>cCapEx({q:'q = 6 µC',C:'C = 6 µF'}),law:'V = q / C',sub:'V = 6 × 10⁻⁶ / 6 × 10⁻⁶',calc:'V = 1 V',ans:'V = 1 V'}),
  tr5:trCard('تمرين ٤ · ورقة العمل · سؤال ١١ (صفحة 107)','وَالتَّمْرِينُ الرَّابِعُ، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهْ.',{q:'في المكثف السابق فرق الجهد بين لوحيه '+M('1 V')+' والمسافة الفاصلة بينهما '+M('1 × 10⁻³ m')+'. أوجد شدة المجال داخله.',g:['V = 1 V','d = 1 × 10⁻³ m'],r:'شدة المجال '+M('E'),fig:()=>cPlatesEx({d:'d = 1 mm',V:'V = 1 V'}),law:'E = V / d',sub:'E = 1 / 1 × 10⁻³',calc:'E = 1000 V/m',ans:'E = 1000 V/m'})
};
PFIG['3-5']=[[/0\.5 m²/,()=>cPlatesEx({A:'A = 0.5 m²',d:'d = 2 mm',res:'C = 2.2 × 10⁻⁹ F'}),'السعة C = ε₀·A / d = 2.2 × 10⁻⁹ F'],[/120 V/,()=>cPlatesEx({d:'d = 4 mm',V:'V = 120 V',res:'E = 30000 V/m'}),'المجال منتظم بين اللوحين: E = V / d = 30000 V/m']];
function apply35(out){defs();if(!SFIX.__35){SFIX.push(["هي كمية الشحنة الكهربائية اللازمة لتغيير جهد المكثف بمقدار واحد فولت", "هِيَ كَمِّيَّةُ الشُّحْنَةِ الْكَهْرَبَائِيَّةِ اللَّازِمَةِ لِتَغْيِيرِ جُهْدِ الْمُكَثِّفِ بِمِقْدَارِ وَاحِدِ فُولْتْ"],["الفاراد وحدة كبيرة، لذلك نستخدم أجزاءه", "الْفَارَادُ وَحْدَةٌ كَبِيرَةٌ، لِذَلِكَ نَسْتَخْدِمُ أَجْزَاءَهُ"],["لوحان متوازيان من مادة ناقلة للكهرباء، يفصل بينهما وسط عازل، ويحمل وجهاهما الداخليان شحنات كهربائية متعاكسة بسبب فرق الجهد بينهما", "لَوْحَانِ مُتَوَازِيَانِ مِنْ مَادَّةٍ نَاقِلَةٍ لِلْكَهْرَبَاءِ، يَفْصِلُ بَيْنَهُمَا وَسَطٌ عَازِلٌ، وَيَحْمِلُ وَجْهَاهُمَا الدَّاخِلِيَّانِ شُحْنَاتٍ كَهْرَبَائِيَّةً مُتَعَاكِسَةً بِسَبَبِ فَرْقِ الْجُهْدِ بَيْنَهُمَا"],["النسبة بين سماحية الوسط العازل وسماحية الفراغ، وليس لها وحدة", "النِّسْبَةُ بَيْنَ سَمَاحِيَّةِ الْوَسَطِ الْعَازِلِ وَسَمَاحِيَّةِ الْفَرَاغِ، وَلَيْسَ لَهَا وَحْدَةٌ"],["علاقة طردية، فإذا زادت المساحة زادت السعة", "عَلَاقَةٌ طَرْدِيَّةٌ، فَإِذَا زَادَتِ الْمِسَاحَةُ زَادَتِ السِّعَةُ"],["علاقة عكسية، فإذا زادت المسافة قلت السعة", "عَلَاقَةٌ عَكْسِيَّةٌ، فَإِذَا زَادَتِ الْمَسَافَةُ قَلَّتِ السِّعَةُ"],["كلما زادت سماحيته النسبية زادت السعة", "كُلَّمَا زَادَتْ سَمَاحِيَّتُهُ النِّسْبِيَّةُ زَادَتِ السِّعَةُ"],["لأننا نعرف الشحنة والجهد", "لِأَنَّنَا نَعْرِفُ الشُّحْنَةَ وَالْجُهْدْ"]);SFIX.push(["أوجد: سعة المكثف، والشحنة على كل لوح، وشدة المجال بين لوحيه", "أَوْجِدْ سِعَةَ الْمُكَثِّفِ، وَالشُّحْنَةَ عَلَى كُلِّ لَوْحٍ، وَشِدَّةَ الْمَجَالِ بَيْنَ لَوْحَيْهْ"]);SFIX.__35=1}const K2='3-5',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^السعة الكهربائية C?$/,()=>card(K2,'cap')],[/^المكثف ذو اللوحين المتوازيين$/,()=>card(K2,'plate')],[/^سماحية الوسط العازل/,()=>card(K2,'perm')],
    [/^أنواع المكثفات$/,()=>null],[/^رمز المكثف في الدوائر/,sl=>{const SY=[[/^- يرمز/,'يُرْمَزُ لِلْمُكَثِّفِ فِي الدَّوَائِرِ الْكَهْرَبَائِيَّةِ بِخَطَّيْنِ مُتَوَازِيَيْنِ يُمَثِّلَانِ اللَّوْحَيْنْ.'],[/^- المكثف الإلكتروليتي/,'الْمُكَثِّفُ الْإِلِكْتِرُولِيتِيُّ لَهُ قُطْبِيَّةٌ، فَيُرْسَمُ أَحَدُ لَوْحَيْهِ مُنْحَنِيًا، وَيُكْتَبُ بِجَانِبِ الطَّرَفِ الْمُوجَبِ إِشَارَةُ الْمُوجَبْ.'],[/^- المكثف المتغير/,'الْمُكَثِّفُ الْمُتَغَيِّرُ يُرْسَمُ عَلَيْهِ سَهْمٌ مَائِلْ.']];sl.sayT='وَكَيْفَ نَرْسُمُ الْمُكَثِّفَ فِي الدَّوَائِرِ الْكَهْرَبَائِيَّةِ؟';const il=typeof inl==='function'?inl:(t=>t);sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=SY.find(([re])=>re.test(x.md));if(m)return {html:'<div class="kc kPt">'+il(x.md.replace(/^[-•]\s*/,''))+'</div>',say:m[1]};return x});return sl}],[/^العوامل المؤثرة على السعة$/,()=>card(K2,'factors')],[/^العوامل المؤثرة في سعة المكثف/,()=>null],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال ٢:.*صفحة 98/,()=>card(K2,'ex2')],[/^مثال ٣:.*صفحة 99/,()=>card(K2,'ex3')],[/^رسم توضيحي [12]$/,()=>null],
    [/^تمرين 1 · مثال/,()=>null],[/^تمرين 2 · ورقة العمل/,()=>card(K2,'tr2')],[/^تمرين 3 · ورقة العمل/,()=>card(K2,'tr3')],[/^تمرين 4 · ورقة العمل/,()=>card(K2,'tr4')],[/^تمرين 5 · ورقة العمل/,()=>card(K2,'tr5')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا السِّعَةَ وَالْمُكَثِّفَاتِ، لِنَرَى أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.';const IC=[[/الكاميرا/,'flash'],[/القلبية/,'heart'],[/اللمس/,'touch']];
      sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;
        const ik=(IC.find(([re])=>re.test(m[1]))||[0,''])[1],icn=ik&&IM35[ik]?'<img src="'+IM35[ik]+'" alt="">':'💡',il=typeof inl==='function'?inl:(t=>t);
        return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">${icn}</span><div><b>${il(m[1])}</b> ${il(m[2])}</div></div>`,say:m[1].trim()+': '+m[2]}});return sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

const IM36={"fac": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InciIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNjQ3NDhiIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iI2NiZDVlMSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQ3NTU2OSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxlbGxpcHNlIGN4PSI4MCIgY3k9IjE0OCIgcng9IjYyIiByeT0iNiIgZmlsbD0idXJsKCNzKSIvPjxwYXRoIGQ9Ik0xOCAxNDQgVjgwIEw0OCA2MiBWODAgTDc4IDYyIFY4MCBMMTA4IDYyIFYxNDRaIiBmaWxsPSJ1cmwoI3cpIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjExMiIgeT0iMzAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxMTQiIGZpbGw9IiNiOTFjMWMiIHN0cm9rZT0iIzdmMWQxZCIvPjxyZWN0IHg9IjExMiIgeT0iNDAiIHdpZHRoPSIyMiIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMTEyIiB5PSI2MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjgiIGZpbGw9IiNmZmYiLz48ZyBmaWxsPSIjZmRlNjhhIiBzdHJva2U9IiM5MjQwMGUiPjxyZWN0IHg9IjI4IiB5PSIxMDAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIvPjxyZWN0IHg9IjUyIiB5PSIxMDAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIvPjxyZWN0IHg9Ijc2IiB5PSIxMDAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIvPjwvZz48Y2lyY2xlIGN4PSIxMjgiIGN5PSIyMCIgcj0iOSIgZmlsbD0iI2UyZThmMCIgb3BhY2l0eT0iLjgiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxMCIgcj0iNyIgZmlsbD0iI2UyZThmMCIgb3BhY2l0eT0iLjYiLz48L3N2Zz4=", "ser": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIwIiB4Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMWU0MGFmIi8+PHN0b3Agb2Zmc2V0PSIuNDUiIHN0b3AtY29sb3I9IiM2MGE1ZmEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZTNhOGEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxNDgiIHJ4PSI2MCIgcnk9IjYiIGZpbGw9InVybCgjcykiLz48cGF0aCBkPSJNMTAgMTIwIEgxNTAiIHN0cm9rZT0iIzk0YTNiOCIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMTgiIHk9IjYwIiB3aWR0aD0iMzIiIGhlaWdodD0iNzAiIHJ4PSI2IiBmaWxsPSJ1cmwoI2MpIiBzdHJva2U9IiMxZTNhOGEiLz48ZWxsaXBzZSBjeD0iMzQiIGN5PSI2MCIgcng9IjE2IiByeT0iNSIgZmlsbD0iIzkzYzVmZCIvPjxyZWN0IHg9IjE4IiB5PSI2NiIgd2lkdGg9IjYiIGhlaWdodD0iNTgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zIi8+PGxpbmUgeDE9IjMwIiB5MT0iMTMwIiB4Mj0iMzAiIHkyPSIxNDQiIHN0cm9rZT0iI2NiZDVlMSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGxpbmUgeDE9IjM4IiB5MT0iMTMwIiB4Mj0iMzgiIHkyPSIxNDQiIHN0cm9rZT0iI2NiZDVlMSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHJlY3QgeD0iNjQiIHk9IjYwIiB3aWR0aD0iMzIiIGhlaWdodD0iNzAiIHJ4PSI2IiBmaWxsPSJ1cmwoI2MpIiBzdHJva2U9IiMxZTNhOGEiLz48ZWxsaXBzZSBjeD0iODAiIGN5PSI2MCIgcng9IjE2IiByeT0iNSIgZmlsbD0iIzkzYzVmZCIvPjxyZWN0IHg9IjY0IiB5PSI2NiIgd2lkdGg9IjYiIGhlaWdodD0iNTgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zIi8+PGxpbmUgeDE9Ijc2IiB5MT0iMTMwIiB4Mj0iNzYiIHkyPSIxNDQiIHN0cm9rZT0iI2NiZDVlMSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGxpbmUgeDE9Ijg0IiB5MT0iMTMwIiB4Mj0iODQiIHkyPSIxNDQiIHN0cm9rZT0iI2NiZDVlMSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHJlY3QgeD0iMTEwIiB5PSI2MCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjcwIiByeD0iNiIgZmlsbD0idXJsKCNjKSIgc3Ryb2tlPSIjMWUzYThhIi8+PGVsbGlwc2UgY3g9IjEyNiIgY3k9IjYwIiByeD0iMTYiIHJ5PSI1IiBmaWxsPSIjOTNjNWZkIi8+PHJlY3QgeD0iMTEwIiB5PSI2NiIgd2lkdGg9IjYiIGhlaWdodD0iNTgiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4zIi8+PGxpbmUgeDE9IjEyMiIgeTE9IjEzMCIgeDI9IjEyMiIgeTI9IjE0NCIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2Utd2lkdGg9IjMiLz48bGluZSB4MT0iMTMwIiB5MT0iMTMwIiB4Mj0iMTMwIiB5Mj0iMTQ0IiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMyIvPjwvc3ZnPg==", "bus": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0YWRlODAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNTgwM2QiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxNDAiIHJ4PSI3MCIgcnk9IjciIGZpbGw9InVybCgjcykiLz48cmVjdCB4PSIxMiIgeT0iNTAiIHdpZHRoPSIxMzYiIGhlaWdodD0iNzYiIHJ4PSIxNCIgZmlsbD0idXJsKCNiKSIgc3Ryb2tlPSIjMTQ1MzJkIiBzdHJva2Utd2lkdGg9IjIiLz48ZyBmaWxsPSIjYmFlNmZkIiBzdHJva2U9IiMwYzRhNmUiPjxyZWN0IHg9IjIyIiB5PSI2MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI2IiByeD0iMyIvPjxyZWN0IHg9IjUyIiB5PSI2MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI2IiByeD0iMyIvPjxyZWN0IHg9IjgyIiB5PSI2MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI2IiByeD0iMyIvPjxyZWN0IHg9IjExMiIgeT0iNjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgcng9IjMiLz48L2c+PGNpcmNsZSBjeD0iNDQiIGN5PSIxMjgiIHI9IjEzIiBmaWxsPSIjMTExODI3Ii8+PGNpcmNsZSBjeD0iNDQiIGN5PSIxMjgiIHI9IjUiIGZpbGw9IiM5Y2EzYWYiLz48Y2lyY2xlIGN4PSIxMTgiIGN5PSIxMjgiIHI9IjEzIiBmaWxsPSIjMTExODI3Ii8+PGNpcmNsZSBjeD0iMTE4IiBjeT0iMTI4IiByPSI1IiBmaWxsPSIjOWNhM2FmIi8+PHBhdGggZD0iTTg0IDE0IGwtMTAgMTggaDkgbC03IDE2IDE4IC0yMiBoLTkgbDggLTEyeiIgZmlsbD0iI2ZhY2MxNSIgc3Ryb2tlPSIjYjQ1MzA5Ii8+PHBhdGggZD0iTTYwIDQwIEw4NCAzMCBNMTAwIDQwIEw4NCAzMCIgc3Ryb2tlPSIjMzM0MTU1IiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=", "warn": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InMiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDAwIiBzdG9wLW9wYWNpdHk9Ii4zNSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InkiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZGUwNDciLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlYWIzMDgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iODAiIGN5PSIxNDYiIHJ4PSI2MCIgcnk9IjYiIGZpbGw9InVybCgjcykiLz48cGF0aCBkPSJNODAgMTQgTDE1MCAxMzYgSDEwWiIgZmlsbD0idXJsKCN5KSIgc3Ryb2tlPSIjMTExODI3IiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODggNDYgbC0yMCA0MCBoMTYgbC0xMiAzNCAzMiAtNDYgaC0xNiBsMTQgLTI4eiIgZmlsbD0iIzExMTgyNyIvPjwvc3ZnPg=="};
/* ===== رسوم الدوائر بالرموز الملونة (طلب المدرب 1 نوفمبر: ج، ملونة بشكل أجمل) ===== */
const SW=(d)=>`<path d="${d}" fill="none" stroke="#0f172a" stroke-opacity=".12" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" transform="translate(2,3)"/><path d="${d}" fill="none" stroke="#334155" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`;
/* تدفق الشحنة على السلك (نقاط برتقالية متحركة) */
const SF=(d,dur)=>`<path d="${d}" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="1 17" opacity=".95"><animate attributeName="stroke-dashoffset" from="36" to="0" dur="${dur||1.4}s" repeatCount="indefinite"/></path>`;
const SDot=(x,y)=>`<circle cx="${x}" cy="${y}" r="5.5" fill="#334155" stroke="#fff" stroke-width="1.5"/>`;
/* رمز المكثف: لوحان سميكان بتدرج أحمر وأزرق، أفقي (اللوحان رأسيان) أو رأسي (اللوحان أفقيان) */
function SCap(x,y,vert,lab,val){const g=vert?`<rect x="${x-26}" y="${y-16}" width="52" height="8" rx="4" fill="url(#kc-pP2)"/><rect x="${x-26}" y="${y+8}" width="52" height="8" rx="4" fill="url(#kc-pN2)"/><text x="${x-34}" y="${y-6}" text-anchor="middle" font-size="15" font-weight="900" fill="#dc2626">+</text><text x="${x-34}" y="${y+19}" text-anchor="middle" font-size="17" font-weight="900" fill="#2563eb">−</text>`
   :`<rect x="${x-16}" y="${y-26}" width="8" height="52" rx="4" fill="url(#kc-pP2)"/><rect x="${x+8}" y="${y-26}" width="8" height="52" rx="4" fill="url(#kc-pN2)"/><text x="${x-12}" y="${y-32}" text-anchor="middle" font-size="15" font-weight="900" fill="#dc2626">+</text><text x="${x+12}" y="${y-32}" text-anchor="middle" font-size="17" font-weight="900" fill="#2563eb">−</text>`;
  const bg=vert?`<rect x="${x-30}" y="${y-8}" width="60" height="16" fill="#f8fbff"/>`:`<rect x="${x-8}" y="${y-30}" width="16" height="60" fill="#f8fbff"/>`;
  let l='';if(lab){const tx=vert?x+40:x,ty=vert?y+6:y+50,an=vert?'start':'middle';l=`<text x="${tx}" y="${ty}" text-anchor="${an}" font-size="17" font-weight="900" fill="#1e3a5f" direction="ltr">${lab}</text>`+(val?`<text x="${tx}" y="${ty+19}" text-anchor="${an}" font-size="14" font-weight="800" fill="#0369a1" direction="ltr">${val}</text>`:'')}
  return bg+`<g filter="drop-shadow(0 2px 3px rgba(30,58,95,.25))">${g}</g>`+l}
/* رمز البطارية: الخط الطويل موجب (أحمر) والقصير السميك سالب (أزرق) */
function SBat(x,y,vert,lab){const g=vert?`<rect x="${x-24}" y="${y-9}" width="48" height="5" rx="2.5" fill="#dc2626"/><rect x="${x-13}" y="${y+4}" width="26" height="9" rx="3" fill="#1d4ed8"/>`
   :`<rect x="${x-9}" y="${y-24}" width="5" height="48" rx="2.5" fill="#dc2626"/><rect x="${x+4}" y="${y-13}" width="9" height="26" rx="3" fill="#1d4ed8"/>`;
  const bg=vert?`<rect x="${x-28}" y="${y-11}" width="56" height="26" fill="#f8fbff"/>`:`<rect x="${x-12}" y="${y-28}" width="28" height="56" fill="#f8fbff"/>`;
  return bg+`<g filter="drop-shadow(0 2px 3px rgba(30,58,95,.25))">${g}</g>`+(lab?`<g>${scTag(vert?x-74:x+2,vert?y+2:y+46,lab,'#334155',lab.length*9+28)}</g>`:'')}
const SBG=(W,H)=>`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/><rect x="40" y="58" width="${W-80}" height="${H-78}" rx="22" fill="#ffffff" opacity=".7" stroke="#dbeafe" stroke-width="2"/>`;
/* ===== الدرس النموذجي 3-6: توصيل المكثفات والطاقة المختزنة ===== */
/* رمز مكثف أفقي على سلك (لوحان رأسيان) */
const kCap=(x,y,lab,c)=>`<rect x="${x-10}" y="${y-22}" width="20" height="44" fill="#f8fbff"/><line x1="${x-6}" y1="${y-20}" x2="${x-6}" y2="${y+20}" stroke="#b91c1c" stroke-width="5" stroke-linecap="round"/><line x1="${x+6}" y1="${y-20}" x2="${x+6}" y2="${y+20}" stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"/>`+(lab?lbl(x,y-30,lab,c||'#1e3a5f',16):'');
/* رمز مكثف رأسي على سلك (لوحان أفقيان) */
const kCapV=(x,y,lab,c)=>`<rect x="${x-22}" y="${y-10}" width="44" height="20" fill="#f8fbff"/><line x1="${x-20}" y1="${y-6}" x2="${x+20}" y2="${y-6}" stroke="#b91c1c" stroke-width="5" stroke-linecap="round"/><line x1="${x-20}" y1="${y+6}" x2="${x+20}" y2="${y+6}" stroke="#1d4ed8" stroke-width="5" stroke-linecap="round"/>`+(lab?`<text x="${x+28}" y="${y+6}" text-anchor="start" font-size="16" font-weight="800" fill="${c||'#1e3a5f'}" direction="ltr">${lab}</text>`:'');
const kBat=(x,y,lab)=>`<rect x="${x-14}" y="${y-22}" width="28" height="44" fill="#f8fbff"/><line x1="${x-6}" y1="${y-20}" x2="${x-6}" y2="${y+20}" stroke="#b91c1c" stroke-width="4"/><line x1="${x+6}" y1="${y-11}" x2="${x+6}" y2="${y+11}" stroke="#1d4ed8" stroke-width="7"/>`+(lab?lbl(x,y+42,lab,'#334155',16):'');
/* مكثف مجسم صغير (اللوحان المعتمدان) لدوائر التوالي والتوازي: يعيد الرسم ونقطتي التوصيل */
function cap3D(x0,top,h,gap){const g=PG(h),t=4;gap=g.dx+1;const xr=x0+t+gap,my=top+h/2;let b=mPlate(x0,top,t,h,g.dx,g.dy,true);mSurf.hole=1;b+=mPlate(xr,top,t,h,g.dx,g.dy,false);mSurf.hole=0;
  return {svg:b,L:[x0+g.dx*.5,my-g.dy*.5],R:[xr+t+g.dx*.5,my-g.dy*.5],x0,xe:xr+t+g.dx,cx:(x0+xr+t+g.dx)/2,g}}
const jDot=(x,y)=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="#1f2937" stroke="#fff" stroke-width="1.5"/>`;
cap3D=narrow(cap3D);
/* توالي: مكثفات في صف واحد، والبطارية أسفل الوسط، وأسلاك سوداء متماثلة */
function serRow(n,top,h,gap,sp,W,yb){const g=PG(h);gap=g.dx+1;const cw=8+gap+g.dx,tot=n*cw+(n-1)*sp;let x=W/2-tot/2,caps=[];for(let i=0;i<n;i++){caps.push(cap3D(x,top,h,gap));x+=cw+sp}
  const Lw=g.dx*.5+28,xL=caps[0].x0-Lw,xR=caps[n-1].R[0]+Lw,cx=(xL+xR)/2,y0=caps[0].L[1];
  let b=rWire(`M${f1(caps[0].L[0])},${f1(y0)} H${f1(xL)} V${yb} H${f1(cx-8)}`,'#1f2937');
  caps.forEach((c,i)=>{if(i)b+=rWire(`M${f1(caps[i-1].R[0])},${f1(y0)} H${f1(c.L[0])}`,'#1f2937');b+=c.svg});
  b+=rWire(`M${f1(caps[n-1].R[0])},${f1(y0)} H${f1(xR)} V${yb} H${f1(cx+8)}`,'#1f2937')+batSym(cx,yb,'');
  return {svg:b,caps,cx,xL,xR}}
/* توازي: مكثفات فوق بعض، وموصلان جانبيان، والبطارية أسفل */
function parCol(n,x0,top,pitch,h,gap,yb){const g=PG(h);let caps=[];for(let i=0;i<n;i++)caps.push(cap3D(x0,top+i*pitch,h,gap));
  const Lw=g.dx*.5+26,bL=x0-Lw,bR=caps[0].R[0]+Lw,ya=caps[0].L[1],yz=caps[n-1].L[1],ym=(ya+yz)/2,oL=bL-34,oR=bR+34,cx=(oL+oR)/2;
  let b=rWire(`M${f1(bL)},${f1(ya)} V${f1(yz)}`,'#1f2937')+caps.map(c=>rWire(`M${f1(c.L[0])},${f1(c.L[1])} H${f1(bL)}`,'#1f2937')).join('');
  b+=rWire(`M${f1(bL)},${f1(ym)} H${f1(oL)} V${yb} H${f1(cx-8)}`,'#1f2937');
  b+=caps.map(c=>c.svg).join('');
  b+=rWire(`M${f1(bR)},${f1(ya)} V${f1(yz)}`,'#1f2937')+caps.map(c=>rWire(`M${f1(c.R[0])},${f1(c.R[1])} H${f1(bR)}`,'#1f2937')).join('');
  b+=rWire(`M${f1(bR)},${f1(ym)} H${f1(oR)} V${yb} H${f1(cx+8)}`,'#1f2937');
  b+=caps.slice(1,n-1).map(c=>jDot(bL,c.L[1])+jDot(bR,c.R[1])).join('')+jDot(bL,ym)+jDot(bR,ym);
  b+=batSym(cx,yb,'');
  return {svg:b,caps,cx,bL,bR,oL,oR}}
serRow=narrow(serRow);parCol=narrow(parCol);
/* 1) التوالي: الشحنة واحدة والجهد يتوزع (متحرك 10 ث) */
function sSeriesScene(){const W=640,H=360,D=10,top=124,h=80,yb=292;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const S3=serRow(3,top,h,42,80,W,yb),dy=S3.caps[0].g.dy;b+=S3.svg+lbl(S3.cx,yb+42,'V','#334155',17);
  b+=S3.caps.map((c,i)=>lbl(c.cx,top+h+22,'C'+'₁₂₃'[i],'#1e3a5f',17)).join('');
  b+=scShow(D,1,D-.1,S3.caps.map(c=>`<g>${scTag(c.cx,top-dy-16,'q','#b45309',46)}</g>`).join(''),true);
  b+=scShow(D,4,D-.1,S3.caps.map((c,i)=>`<g>${scTag(c.cx,top+h+50,'V'+'₁₂₃'[i],'#0369a1',56)}</g>`).join(''),true);
  b+=scShow(D,6.8,D-.1,`<g>${scTag(W/2+165,yb+36,'V = V₁ + V₂ + V₃','#7e22ce',190)}</g>`,true);
  b+=scCap(D,W,'1. على التوالي: المكثفات على مسار واحد','#475569',0,1)+scCap(D,W,'2. الشحنة متساوية على كل المكثفات','#b45309',1,4)+scCap(D,W,'3. جهد المصدر يتوزع على المكثفات','#0369a1',4,6.8)+scCap(D,W,'4. السعة المكافئة أصغر من أصغر سعة','#7e22ce',6.8,D);
  return svg(W,H,b,'kScene')}
/* 2) التوازي: الجهد واحد والشحنات تجمع (متحرك 10 ث) */
function sParScene(){const W=640,H=455,D=10,h=64,yb=400;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const P=parCol(3,230,96,100,h,35,yb);b+=P.svg+lbl(P.cx,yb+42,'V','#334155',17);
  const lx=P.oR+34;b+=P.caps.map((c,i)=>`<text x="${f1(lx)}" y="${f1(c.R[1]+6)}" font-size="17" font-weight="900" fill="#1e3a5f" direction="ltr">${'C'+'₁₂₃'[i]}</text>`).join('');
  b+=scShow(D,1,D-.1,P.caps.map(c=>`<g>${scTag(lx+74,c.R[1],'V','#0369a1',40)}</g>`).join(''),true);
  b+=scShow(D,4,D-.1,P.caps.map((c,i)=>`<g>${scTag(lx+132,c.R[1],'q'+'₁₂₃'[i],'#b45309',50)}</g>`).join(''),true);
  b+=scShow(D,6.8,D-.1,`<g>${scTag(P.oR+120,yb,'q = q₁ + q₂ + q₃','#7e22ce',180)}</g>`,true);
  b+=scCap(D,W,'1. على التوازي: كل مكثف متصل بقطبي المصدر','#475569',0,1)+scCap(D,W,'2. الجهد متساو على كل المكثفات','#0369a1',1,4)+scCap(D,W,'3. الشحنة الكلية مجموع الشحنات','#b45309',4,6.8)+scCap(D,W,'4. السعة المكافئة أكبر من أكبر سعة','#7e22ce',6.8,D);
  return svg(W,H,b,'kScene')}
/* 3) الطاقة المختزنة: المساحة تحت منحنى الجهد مع الشحنة */
function sEnergyFig(){const W=640,H=320,x0=170,y0=260,x1=470,y1=70;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<polygon points="${x0},${y0} ${x1},${y1} ${x1},${y0}" fill="#c4b5fd" opacity=".7"/>`;
  b+=`<line x1="${x0}" y1="${y0}" x2="${x1+50}" y2="${y0}" stroke="#334155" stroke-width="2.4"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1-30}" stroke="#334155" stroke-width="2.4"/>`;
  b+=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#7e22ce" stroke-width="3.5"/><line x1="${x1}" y1="${y1}" x2="${x1}" y2="${y0}" stroke="#7e22ce" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="${x0}" y1="${y1}" x2="${x1}" y2="${y1}" stroke="#7e22ce" stroke-width="1.6" stroke-dasharray="5 4"/>`;
  b+=lblR(x1+70,y0+6,'الشحنة','#334155',15)+lblR(x0,y1-40,'الجهد','#334155',15)+lbl(x1,y0+24,'q','#b45309',16)+lbl(x0-22,y1+6,'V','#0369a1',16);
  b+=`<g>${scTag(x1-70,y0-44,'PE = ½·q·V','#7e22ce',150)}</g>`+lblR(x0+120,y1+20,'الجهد يزيد بانتظام أثناء الشحن','#475569',14);
  return svg(W,H,b,'kAuto')}
/* رسوم الأمثلة */
function sParEx(o){const W=640,H=330,h=60,yb=282;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const P=parCol(2,250,84,96,h,33,yb);b+=P.svg+lbl(P.cx,yb+40,o.V||'V','#334155',16);
  const lx=P.oR+30;b+=P.caps.map((c,i)=>`<text x="${f1(lx)}" y="${f1(c.R[1]+2)}" font-size="${f1(17*TS)}" font-weight="900" fill="#1e3a5f" direction="ltr">${'C'+'₁₂'[i]}</text>`+(((o.C||[])[i]||'').replace(/^C[₁₂] = /,'')&&!/^C[₁₂]$/.test((o.C||[])[i])?`<text x="${f1(lx)}" y="${f1(c.R[1]+22*TS)}" font-size="${f1(14*TS)}" font-weight="800" fill="#0369a1" direction="ltr">${(o.C[i]).replace(/^C[₁₂] = /,'')}</text>`:'')).join('');
  if(o.res)b+=pill(W/2+40,30,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls)}
function sSerEx(o){const W=640,H=330,top=112,h=80,yb=262;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  const S2=serRow(2,top,h,42,130,W,yb);b+=S2.svg+lbl(S2.cx,yb+40,o.V||'V','#334155',16);
  b+=S2.caps.map((c,i)=>lbl(c.cx,top+h+22,'C'+'₁₂'[i],'#1e3a5f',17)+(((o.C||[])[i]||'')&&!/^C[₁₂]$/.test(o.C[i])?lbl(c.cx,top+h+22+20*TS,o.C[i].replace(/^C[₁₂] = /,''),'#0369a1',14):'')).join('');
  if(o.res)b+=pill(W/2,30,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls)}
CARDS['3-6']={
  ser:{title:'التوصيل على التوالي',sayT:'نبدأ أول موضوعات درسنا: توصيل المكثفات، وأوله التوصيل على التوالي.',steps:()=>[
    S(pt(B('الشحنة متساوية')+' على كل المكثفات، والجهود مختلفة.'),''),
    S(fig(sSeriesScene(),'مشهد: على التوالي الشحنة واحدة والجهد يتوزع'),'شاهد المشهد: الْمُكَثِّفَاتُ عَلَى مَسَارٍ وَاحِدٍ، فَالشُّحْنَةُ مُتَسَاوِيَةٌ عَلَيْهَا جَمِيعًا، وَجُهْدُ الْمَصْدَرِ يَتَوَزَّعُ عَلَيْهَا، وَالسِّعَةُ الْمُكَافِئَةُ أَصْغَرُ مِنْ أَصْغَرِ سِعَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('1/C_total = 1/C₁ + 1/C₂ + 1/C₃')+'</div>'),'وَقَانُونُ السِّعَةِ الْمُكَافِئَةِ: مَقْلُوبُ السِّعَةِ الْكُلِّيَّةِ يُسَاوِي مَجْمُوعَ مَقْلُوبَاتِ السِّعَاتْ.'),{md:'`1/C_total = 1/C₁ + 1/C₂ + 1/C₃`'}),
    Object.assign(S(pt('لمكثفين فقط: <div class="kLaw">'+M('C_total = C₁·C₂ / (C₁ + C₂)')+'</div>'),'ولمكثفين فقط: حاصل ضرب السعتين على مجموعهما.'),{md:'`C_total = C₁·C₂ / (C₁ + C₂)`'}),
    S(pt('الجهد الكلي '+M('V_total = V₁ + V₂ + V₃')+'، والسعة المكافئة '+B('أصغر')+' من أصغر سعة.'),'')]},
  par:{title:'التوصيل على التوازي',sayT:'والآن، التوصيل على التوازي.',steps:()=>[
    S(pt(B('الجهد متساو')+' على كل المكثفات، والشحنات مختلفة.'),''),
    S(fig(sParScene(),'مشهد: على التوازي الجهد واحد والشحنات تجمع'),'شاهد المشهد: كُلُّ مُكَثِّفٍ مُتَّصِلٌ مُبَاشَرَةً بِقُطْبَيِ الْمَصْدَرِ، فَالْجُهْدُ مُتَسَاوٍ عَلَيْهَا جَمِيعًا، وَالشُّحْنَةُ الْكُلِّيَّةُ مَجْمُوعُ الشُّحْنَاتِ، وَالسِّعَةُ الْمُكَافِئَةُ أَكْبَرُ مِنْ أَكْبَرِ سِعَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('C_total = C₁ + C₂ + C₃')+'</div>'),'وَقَانُونُ السِّعَةِ الْمُكَافِئَةِ هُنَا: مَجْمُوعُ السِّعَاتْ.'),{md:'`C_total = C₁ + C₂ + C₃`'}),
    S(pt('الشحنة الكلية '+M('q_total = q₁ + q₂ + q₃')+' حيث '+M('q = C·V')+'، والسعة المكافئة '+B('أكبر')+' من أكبر سعة.'),'')]},
  energy:{title:'الطاقة المختزنة في المكثف',sayT:'ننتقل الآن إلى الموضوع الثاني في درسنا: الطاقة المختزنة في المكثف.',steps:()=>[
    S(pt('يختزن المكثف المشحون طاقة وضع كهربائية '+M('PE')+'، ووحدتها الجول '+M('J')+'.'),''),
    S(fig(sEnergyFig(),'الطاقة المختزنة تساوي مساحة المثلث تحت خط الجهد'),'لاحظ الرسم: أَثْنَاءَ الشَّحْنِ يَزِيدُ الْجُهْدُ بِانْتِظَامٍ مِنَ الصِّفْرِ حَتَّى V، فَالطَّاقَةُ الْمُخْتَزَنَةُ تُسَاوِي مِسَاحَةَ الْمُثَلَّثِ، أَيْ نِصْفَ الشُّحْنَةِ فِي الْجُهْدْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('PE = ½·C·V²')+'</div>'),'وَنَحْسُبُ الطَّاقَةَ الْمُخْتَزَنَةَ بِإِحْدَى ثَلَاثِ صِيَغٍ، أُولَاهَا: `PE = ½·C·V²`'),{md:'`PE = ½·C·V²`'}),
    Object.assign(S(pt('<div class="kLaw">'+M('PE = ½·q·V')+'</div>'),'والثانية: `PE = ½·q·V`'),{md:'`PE = ½·q·V`'}),
    Object.assign(S(pt('<div class="kLaw">'+M('PE = q² / 2C')+'</div>'),'والثالثة: `PE = q² / 2C`'),{md:'`PE = q² / 2C`'}),
    S(pt(B('اختر الصيغة')+' التي تحتوي المعطيات مباشرة.'),'')]},
  ex1:{title:'مثال ١ · صفحة 101',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 101.',steps:()=>[
    S(q('مكثفان سعة كل منهما '+M('200 × 10⁻¹² F')+' و '+M('600 × 10⁻¹² F')+' وصلا على التوازي ثم شحنا حتى صار فرق الجهد بينهما '+M('120 V')+'. أوجد: السعة الكلية، والشحنة على كل مكثف، والشحنة الكلية.','المثال · صفحة 101'),''),
    S(gr(['C₁ = 200 pF','C₂ = 600 pF','V = 120 V'],M('C_total')+' و '+M('q₁')+' و '+M('q₂')+' و '+M('q_total')),''),
    S(fig(sParEx({C:['C₁ = 200 pF','C₂ = 600 pF'],V:'120 V',res:'C_total = 800 pF'})),'لنرسم المكثفين على التوازي مع المصدر.'),
    S(st(1,'السعة الكلية: '+M('C_total = C₁ + C₂ = 200 + 600 = 800 pF')),'أولا السعة الكلية على التوازي: نجمع السعتين، فتكون ثمانمئة بيكوفاراد.'),
    S(st(2,'الشحنتان: '+M('q₁ = C₁·V = 200 × 10⁻¹² × 120 = 2.4 × 10⁻⁸ C')+' و '+M('q₂ = C₂·V = 7.2 × 10⁻⁸ C')),'ثانيا الشحنة على كل مكثف: نضرب سعته في الجهد المشترك، فتكون الأولى اثنين فاصلة أربعة في عشرة أس سالب ثمانية كولوم، والثانية سبعة فاصلة اثنين في عشرة أس سالب ثمانية كولوم.'),
    S(st(3,'الشحنة الكلية: '+M('q_total = q₁ + q₂ = 9.6 × 10⁻⁸ C')+'<span class="kDirOn"></span>'),'ثالثا الشحنة الكلية: مجموع الشحنتين، تسعة فاصلة ستة في عشرة أس سالب ثمانية كولوم.'),
    S(res(M('C_total = 800 pF')+' · '+M('q_total = 9.6 × 10⁻⁸ C')),'')]},
  ex2:{title:'مثال ٢ · صفحة 102',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 102.',steps:()=>[
    S(q('مكثفان سعة كل منهما '+M('3 × 10⁻¹² F')+' و '+M('6 × 10⁻¹² F')+' وصلا على التوالي ثم وصلت المجموعة بفرق جهد مقداره '+M('10 V')+'. أوجد: السعة الكلية، والشحنة على كل لوح، وفرق الجهد عبر كل مكثف.','المثال · صفحة 102'),''),
    S(gr(['C₁ = 3 pF','C₂ = 6 pF','V = 10 V'],M('C_total')+' و '+M('q')+' و '+M('V₁')+' و '+M('V₂')),''),
    S(fig(sSerEx({C:['C₁ = 3 pF','C₂ = 6 pF'],V:'10 V',res:'C_total = 2 pF'})),'لنرسم المكثفين على التوالي مع المصدر.'),
    S(st(1,'السعة الكلية: '+M('C_total = C₁·C₂ / (C₁ + C₂) = 18 / 9 = 2 pF')),'أولا السعة الكلية لمكثفين على التوالي: حاصل الضرب على المجموع، ثمانية عشر على تسعة، فتكون اثنين بيكوفاراد.'),
    S(st(2,'الشحنة: '+M('q = C_total·V = 2 × 10⁻¹² × 10 = 2 × 10⁻¹¹ C')+'، وهي نفسها على كل مكثف.'),'ثانيا الشحنة: السعة الكلية في الجهد، اثنان في عشرة أس سالب أحد عشر كولوم، وهي نفسها على كل مكثف لأن التوصيل على التوالي.'),
    S(st(3,'الجهدان: '+M('V₁ = q / C₁ = 6.67 V')+' و '+M('V₂ = q / C₂ = 3.33 V')+'<span class="kDirOn"></span>'),'ثالثا الجهد على كل مكثف: الشحنة على سعته، فيكون الأول ستة فاصلة سبعة وستين فولت، والثاني ثلاثة فاصلة ثلاثة وثلاثين فولت، ومجموعهما عشرة فولت.'),
    S(res(M('C_total = 2 pF')+' · '+M('q = 2 × 10⁻¹¹ C')+' · '+M('V₁ = 6.67 V')+' · '+M('V₂ = 3.33 V')),'')]},
  ex3:{title:'مثال ٣ · صفحة 103',sayT:'والمثال الثالث، مِنْ صَفْحَةِ 103.',steps:()=>[
    S(q('مكثف سعته '+M('2 × 10⁻⁶ F')+' وصل قطباه مع مصدر فرق جهد '+M('12 V')+'. ما الطاقة المختزنة في المكثف؟','المثال · صفحة 103'),''),
    S(gr(['C = 2 × 10⁻⁶ F','V = 12 V'],'الطاقة المختزنة '+M('PE')),''),
    S(st(1,'القانون: '+M('PE = ½·C·V²')+' لأن المعطى السعة والجهد.'),'نختار الصيغة: `PE = ½·C·V²`، لأن المعطى السعة والجهد.'),
    S(st(2,'التعويض: '+M('PE = ½ × 2 × 10⁻⁶ × 12²')),'نعوض: `PE = ½ × 2 × 10⁻⁶ × 12²`'),
    S(st(3,'الحساب: '+M('PE = 144 × 10⁻⁶ = 1.44 × 10⁻⁴ J')+'<span class="kDirOn"></span>'),'نربع الجهد فيكون مئة وأربعة وأربعين، إذن `PE = 1.44 × 10⁻⁴ J`'),
    S(res(M('PE = 1.44 × 10⁻⁴ J')),'النتيجة: `PE = 1.44 × 10⁻⁴ J`.')]},
  ex4:{title:'مثال ٤ · صفحة 103',sayT:'والمثال الرابع، مِنْ صَفْحَةِ 103.',steps:()=>[
    S(q('مكثف يحمل شحنة مقدارها '+M('2.4 C')+' وصل قطباه مع مصدر فرق جهد '+M('200 V')+'. ما الطاقة المختزنة في المكثف؟','المثال · صفحة 103'),''),
    S(gr(['q = 2.4 C','V = 200 V'],'الطاقة المختزنة '+M('PE')),''),
    S(st(1,'القانون: '+M('PE = ½·q·V')+' لأن المعطى الشحنة والجهد.'),'نختار الصيغة: `PE = ½·q·V`، لأن المعطى الشحنة والجهد.'),
    S(st(2,'التعويض: '+M('PE = ½ × 2.4 × 200')),'نعوض: `PE = ½ × 2.4 × 200`'),
    S(st(3,'الحساب: '+M('PE = 480 ÷ 2 = 240 J')+'<span class="kDirOn"></span>'),'إذن `PE = 240 J`'),
    S(res(M('PE = 240 J')),'النتيجة: `PE = 240 J`.')]},
  tr4:trCard('تمرين ١ · ورقة العمل · سؤال ١٢ (صفحة 108)','هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الثاني عشر، صَفْحَةِ 108.',{q:'مكثفان سعتاهما '+M('2 µF')+' و '+M('4 µF')+' وصلا على التوالي، أوجد السعة الكلية.',g:['C₁ = 2 µF','C₂ = 4 µF'],r:'السعة الكلية '+M('C_total'),fig:()=>sSerEx({C:['2 µF','4 µF']}),figSay:'لنرسم المكثفين على التوالي.',law:'C_total = C₁·C₂ / (C₁ + C₂)',sub:'C_total = 2 × 4 / (2 + 4)',calc:'C_total = 8 / 6 = 1.33 µF',ans:'C_total = 1.33 µF'}),
  tr5:trCard('تمرين ٢ · ورقة العمل · سؤال ١٢ (صفحة 108)','وَالتَّمْرِينُ الثَّانِي، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهِ بِالتَّوْصِيلِ عَلَى التَّوَازِي.',{q:'مكثفان سعتاهما '+M('2 µF')+' و '+M('4 µF')+' وصلا على التوازي، أوجد السعة الكلية.',g:['C₁ = 2 µF','C₂ = 4 µF'],r:'السعة الكلية '+M('C_total'),fig:()=>sParEx({C:['2 µF','4 µF']}),figSay:'لنرسم المكثفين على التوازي.',law:'C_total = C₁ + C₂',sub:'C_total = 2 + 4',calc:'C_total = 6 µF',ans:'C_total = 6 µF'}),
  tr6:trCard('تمرين ٣ · ورقة العمل · سؤال ١٣ (صفحة 108)','والتمرين الثالث، من ورقة العمل، السؤال الثالث عشر، صَفْحَةِ 108.',{q:'مكثفان '+M('C₁ = 4 nF')+' و '+M('C₂ = 2 nF')+' وصلا على التوالي وطبق عليهما فرق جهد '+M('12 V')+'. أوجد السعة الكلية.',g:['C₁ = 4 nF','C₂ = 2 nF','V = 12 V'],r:'السعة الكلية '+M('C_total'),fig:()=>sSerEx({C:['4 nF','2 nF'],V:'12 V'}),figSay:'لنرسم المكثفين على التوالي مع المصدر.',law:'C_total = C₁·C₂ / (C₁ + C₂)',sub:'C_total = 4 × 2 / (4 + 2)',calc:'C_total = 8 / 6 = 1.33 nF',ans:'C_total = 1.33 nF'}),
  tr7:trCard('تمرين ٤ · ورقة العمل · سؤال ١٤ (صفحة 109)','والتمرين الرابع، من ورقة العمل، السؤال الرابع عشر، صَفْحَةِ 109.',{q:'مكثفان '+M('C₁ = 400 nF')+' و '+M('C₂ = 100 nF')+' وصلا على التوازي وطبق عليهما فرق جهد '+M('110 V')+'. أوجد السعة الكلية.',g:['C₁ = 400 nF','C₂ = 100 nF','V = 110 V'],r:'السعة الكلية '+M('C_total'),fig:()=>sParEx({C:['400 nF','100 nF'],V:'110 V'}),figSay:'لنرسم المكثفين على التوازي مع المصدر.',law:'C_total = C₁ + C₂',sub:'C_total = 400 + 100',calc:'C_total = 500 nF',ans:'C_total = 500 nF'}),
  tr8:trCard('تمرين ٥ · ورقة العمل · سؤال ١٠ (صفحة 107)','والتمرين الخامس، من ورقة العمل، السؤال العاشر، صَفْحَةِ 107.',{q:'مكثف سعته '+M('4.5 × 10⁻¹² F')+' يتصل لوحاه ببطارية جهدها '+M('12 V')+'. أوجد الطاقة المختزنة فيه.',g:['C = 4.5 × 10⁻¹² F','V = 12 V'],r:'الطاقة المختزنة '+M('PE'),law:'PE = ½·C·V²',sub:'PE = ½ × 4.5 × 10⁻¹² × 12²',calc:'PE = 3.24 × 10⁻¹⁰ J',ans:'PE = 3.24 × 10⁻¹⁰ J'})
};
PFIG['3-6']=[[/2 µF و 3 µF و 5 µF/,()=>sParEx({C:['2 µF','3 µF'],res:'C = 10 µF'}),'على التوازي نجمع السعات: C = 2 + 3 + 5 = 10 µF'],[/2 µF و 6 µF/,()=>sSerEx({C:['2 µF','6 µF'],V:'20 V',res:'q = 3 × 10⁻⁵ C'}),'السعة المكافئة 1.5 µF، والشحنة متساوية على المكثفين: q = 3 × 10⁻⁵ C']];
function apply36(out){defs();if(!SFIX.__36){SFIX.push(["والسعة المكافئة أصغر من أصغر سعة", "وَالسِّعَةُ الْمُكَافِئَةُ أَصْغَرُ مِنْ أَصْغَرِ سِعَةٍ"],["والسعة المكافئة أكبر من أكبر سعة", "وَالسِّعَةُ الْمُكَافِئَةُ أَكْبَرُ مِنْ أَكْبَرِ سِعَةٍ"],["يختزن المكثف المشحون طاقة وضع كهربائية", "يَخْتَزِنُ الْمُكَثِّفُ الْمَشْحُونُ طَاقَةَ وَضْعٍ كَهْرَبَائِيَّةً"],["التي تحتوي المعطيات مباشرة", "الَّتِي تَحْتَوِي الْمُعْطَيَاتِ مُبَاشَرَةً"],["أوجد: السعة الكلية، والشحنة على كل لوح، وفرق الجهد عبر كل مكثف", "أَوْجِدِ السِّعَةَ الْكُلِّيَّةَ، وَالشُّحْنَةَ عَلَى كُلِّ لَوْحٍ، وَفَرْقَ الْجُهْدِ عَبْرَ كُلِّ مُكَثِّفْ"],["أوجد: السعة الكلية، والشحنة على كل مكثف، والشحنة الكلية", "أَوْجِدِ السِّعَةَ الْكُلِّيَّةَ، وَالشُّحْنَةَ عَلَى كُلِّ مُكَثِّفٍ، وَالشُّحْنَةَ الْكُلِّيَّهْ"],["لأن المعطى السعة والجهد", "لِأَنَّ الْمُعْطَى السِّعَةُ وَالْجُهْدْ"],["لأن المعطى الشحنة والجهد", "لِأَنَّ الْمُعْطَى الشُّحْنَةُ وَالْجُهْدْ"],["ثم وصلت المجموعة بفرق جهد", "ثُمَّ وُصِلَتِ الْمَجْمُوعَةُ بِفَرْقِ جُهْدٍ"]);SFIX.push(["اختر الصيغة", "اخْتَرِ الصِّيغَةَ"]);SFIX.__36=1}const K2='3-6',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^التوصيل على التوالي$/,()=>card(K2,'ser')],[/^التوصيل على التوازي$/,()=>card(K2,'par')],[/^الطاقة المختزنة في المكثف$/,()=>card(K2,'energy')],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال: مكثفان موصولان على التوالي/,()=>card(K2,'ex2')],[/^مثال ١: الطاقة المختزنة/,()=>card(K2,'ex3')],[/^مثال ٢: الطاقة المختزنة/,()=>card(K2,'ex4')],
    [/^رسم توضيحي/,()=>null],[/^تمرين [123] · مثال/,()=>null],
    [/^تمرين 4 · ورقة العمل/,()=>card(K2,'tr4')],[/^تمرين 5 · ورقة العمل/,()=>card(K2,'tr5')],[/^تمرين 6 · ورقة العمل/,()=>card(K2,'tr6')],[/^تمرين 7 · ورقة العمل/,()=>card(K2,'tr7')],[/^تمرين 8 · ورقة العمل/,()=>card(K2,'tr8')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا تَوْصِيلَ الْمُكَثِّفَاتِ وَطَاقَتَهَا، لِنَرَى أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.';const IC=[[/المصانع/,'fac'],[/التوالي/,'ser'],[/الفائقة/,'bus'],[/احذر/,'warn']];
      sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;
        const ik=(IC.find(([re])=>re.test(m[1]))||[0,''])[1],icn=ik&&IM36[ik]?'<img src="'+IM36[ik]+'" alt="">':'💡',il=typeof inl==='function'?inl:(t=>t);
        return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">${icn}</span><div><b>${il(m[1])}</b> ${il(m[2])}</div></div>`,say:/احذر/.test(m[1])?'احْذَرْ: الْمُكَثِّفَاتُ فِي الْأَجْهِزَةِ الْمُطْفَأَةِ قَدْ تَبْقَى مَشْحُونَةً وَخَطِرَهْ.':m[1].trim()+' '+m[2]}});return sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

/* ---------- التطبيق على السبورة ---------- */
const VOCK={"كولوم": "كُولُوم", "الرسم": "الرَّسْمِ", "رمزها": "رَمْزُهَا", "لنرسم": "لِنَرْسُمِ", "انظر": "انْظُرْ", "رمزه": "رَمْزُهُ", "القياس": "الْقِيَاسِ", "له": "لَهُ", "لها": "لَهَا", "الإلكترونات": "الْإِلِكْتِرُونَات", "إلكترونات": "إِلِكْتِرُونَاتٍ", "أي": "أَيْ", "فتتجه": "فَتَتَّجِهُ", "السهمين": "السَّهْمَيْنِ", "لنتعرف": "لِنَتَعَرَّفْ", "المهمة": "الْمُهِمَّةِ", "فولت": "فُولْت", "فاراد": "فَارَادْ", "تأمل": "تَأَمَّلْ", "وسطها": "وَسَطِهَا", "والنيوترونات": "وَالنُّيُوتْرُونَات", "وحولها": "وَحَوْلَهَا", "تدور": "تَدُورُ", "والقاعدة": "وَالْقَاعِدَةُ", "الأسهم": "الْأَسْهُمِ", "التنافر": "التَّنَافُرِ", "تبتعد": "تَبْتَعِدُ", "التجاذب": "التَّجَاذُبِ", "تقتربان": "تَقْتَرِبَانِ", "والميكروكولوم": "وَالْمَايْكْرُوكُولُوم", "والنانوكولوم": "وَالنَّانُوكُولُوم", "ضاعفنا": "ضَاعَفْنَا", "مربعة": "مُرَبَّعَةٌ", "ونصف": "وَنِصْفْ", "نستخدم": "نَسْتَخْدِمُ", "والآن": "وَالْآنَ", "نحدد": "نُحَدِّدُ", "متشابهتان": "مُتَشَابِهَتَانِ", "والمسافتان": "وَالْمَسَافَتَانِ", "نحسب": "نَحْسُبُ", "ونحدد": "وَنُحَدِّدُ", "نجمع": "نَجْمَعُ", "القوتين": "الْقُوَّتَيْنِ", "كانتا": "كَانَتَا", "ونطرحهما": "وَنَطْرَحُهُمَا", "تعاكستا": "تَعَاكَسَتَا", "أيضا": "أَيْضًا", "القوتان": "الْقُوَّتَانِ", "فنطرح": "فَنَطْرَحُ", "الصغرى": "الصُّغْرَى", "الكبرى": "الْكُبْرَى", "تتجه": "تَتَّجِهُ", "السهم": "السَّهْمَ", "البنفسجي": "الْبَنَفْسَجِيَّ", "نحول": "نُحَوِّلُ", "النانوكولوم": "النَّانُوكُولُوم", "الكولوم": "الْكُولُوم", "الموجبتين": "الْمُوجَبَتَيْنِ", "تبعد": "تُبْعِدُ", "العالم": "الْعَالِمِ", "شارل": "شَارْل", "الجذب": "الْجَذْبِ", "العام": "الْعَامِّ", "شعرت": "شَعَرْتَ", "يوما": "يَوْمًا", "بشرارة": "بِشَرَارَةٍ", "لمست": "لَمَسْتَ", "الباب": "الْبَابِ", "بعد": "بَعْدَ", "السجاد": "السَّجَّادِ", "صوفية": "صُوفِيَّةٍ", "وتنشأ": "وَتَنْشَأُ", "خاصية": "خَاصِّيَّةٌ", "ورمزها": "وَرَمْزُهَا", "جسيمات": "جُسَيْمَاتِ", "جسيم": "جُسَيْمٍ", "وكتلته": "وَكُتْلَتُهُ", "البروتون": "الْبُرُوتُون", "الإلكترون": "الْإِلِكْتِرُون", "النيوترون": "النُّيُوتْرُون", "كرتان": "كُرَتَانِ", "مشحونتان": "مَشْحُونَتَانِ", "ذراع": "ذِرَاعٍ", "معلق": "مُعَلَّقٍ", "بخيط": "بِخَيْطٍ", "الكرتان": "الْكُرَتَانِ", "يلتوي": "يَلْتَوِي", "الخيط": "الْخَيْطُ", "الالتواء": "الِالْتِوَاءِ", "نعرف": "نَعْرِفُ", "عام": "عَامِ", "ألف": "أَلْفٍ", "وسبعمئة": "وَسَبْعِمِئَةٍ", "وأربعة": "وَأَرْبَعَةٍ", "وثمانين": "وَثَمَانِينَ", "مشحونين": "مَشْحُونَيْنِ", "الالتوائي": "الِالْتِوَائِيِّ", "اخترعه": "اخْتَرَعَهُ", "تجاربه": "تَجَارِبِهِ", "وقيمته": "وَقِيمَتُهُ", "ونقربها": "وَنُقَرِّبُهَا", "يشبه": "يُشْبِهُ", "كتلتين": "كُتْلَتَيْنِ", "كليهما": "كِلَيْهِمَا", "التربيع": "التَّرْبِيعِ", "العكسي": "الْعَكْسِيِّ", "لكولوم": "لِكُولُوم", "ستة": "سِتَّةُ", "إبسلون": "إِبْسِلُونْ", "صفر": "صِفْرٍ", "سماحية": "سَمَاحِيَّةِ", "الفراغ": "الْفَرَاغِ", "ثابت": "ثَابِتُ", "يبين": "يُبَيِّنُ", "قدرة": "قُدْرَةَ", "نقل": "نَقْلِ", "التأثير": "التَّأْثِيرِ", "الشحنات": "الشُّحْنَاتِ", "حيث": "حَيْثُ", "هي": "هِيَ", "يساوي": "يُسَاوِي", "واحدا": "وَاحِدًا", "مقسوما": "مَقْسُومًا", "أربعة": "أَرْبَعَةِ", "باي": "بَايْ", "قيمتها": "قِيمَتُهَا"};
function vk(t){return String(t||'').split(/(`[^`]*`)/).map(x=>x[0]==='`'?x:x.replace(/[\u0621-\u064A]+/g,w=>VOCK[w]||w)).join('')}
/* المدرب يقرأ المكتوب على السبورة نفسه في بطاقات النص (الرسوم والجداول والقوانين لها وصف منطوق) */
const SFIX=[['ومن تجاربه استنتج أن','وَمِنْ تَجَارِبِهِ اسْتَنْتَجَ أَنَّ'],['ومن تجاربه استنتج','وَمِنْ تَجَارِبِهِ اسْتَنْتَجَ'],['دون أن يلامسه','دُونَ أَنْ يُلَامِسَهُ'],['تبعد شحنتها','تُبْعِدُ شُحْنَتَهَا'],['عند دلك','عِنْدَ دَلْكِ'],['تكتسب شحنات كهربائية','تَكْتَسِبُ شُحْنَاتٍ كَهْرَبَائِيَّةً'],['عدد الإلكترونات','عدد الْإِلِكْتِرُونَاتِ'],['درس العالم','دَرَسَ الْعَالِمُ'],['`1784`','ألف وسبعمئة وأربعة وثمانين']];
function sayOf(h){const d=document.createElement('div');d.innerHTML=h;d.querySelectorAll('.kSg,.kSt>i,.kRes>span,.kDirOn').forEach(e=>e.remove());/* المدرب 8 نوفمبر 13:15: ما هو للعرض فقط (kVisOnly) لا ينطق، فيبقى نطق بطاقة «المادة متعادلة» كما كان حرفيا */d.querySelectorAll('.kVisOnly').forEach(e=>e.remove());
  d.querySelectorAll('.kM').forEach(e=>{e.textContent='`'+e.textContent+'`'});
  const gr=d.querySelector('.kGR');if(gr){const r=gr.querySelector('.kR');const tg=r&&r.querySelector('.kTag');if(tg)tg.remove();return 'المعطيات أمامك على السبورة. والمطلوب: '+(r?r.textContent:'').replace(/\s+/g,' ').trim()+'.'}
  const tq=d.querySelector('.kQ>.kTag');if(tq)tq.textContent='السؤال: ';
  let t=d.textContent.replace(/\s+/g,' ').trim();SFIX.forEach(([a,b])=>{t=t.split(a).join(b)});return t}
function card(k,id,o){const c=CARDS[k][id];/*cardPart: المدرب 9 نوفمبر: تقسيم بطاقات شريحة إلى شريحتين (part=[من,إلى]) بلا تغيير في النطق*/const P=o&&o.part;return {type:'c',title:(o&&o.title)||c.title,sayT:(o&&o.sayT)||c.sayT,s4:(o&&o.s4)||undefined,en:(o&&o.en)||undefined,steps:c.steps(o&&o.lead).filter((x,i)=>!P||(i>=P[0]&&(P[1]==null||i<P[1]))).map((x,i)=>{if(x.html&&/class="kc k(Q|GR|St|Res|Pt)\b/.test(x.html)&&!/kLaw|kFig|kKeep|<svg/.test(x.html)){const L=i===0&&o&&o.lead?o.lead:'';x.say=L+sayOf(x.html)}if(x.say)x.say=vk(x.say);return x}),kc:1}}
/* المدرب 2 نوفمبر (أ): نطق درس المجال 3-3 مشكول كاملا بالإعراب للصوت فقط، والنص المعروض كما هو */const D33={"نبدأ أول موضوعات درسنا: المجال الكهربائي.": "نَبْدَأُ أَوَّلَ مَوْضُوعَاتِ دَرْسِنَا: الْمَجَالُ الْكَهْرَبَائِيُّ.", "المجال الكهربائي: هو المنطقة المحيطة بالشحنة الكهربائية التي يظهر فيها تأثيرها.": "الْمَجَالُ الْكَهْرَبَائِيُّ: هُوَ الْمِنْطَقَةُ الْمُحِيطَةُ بِالشُّحْنَةِ الْكَهْرَبَائِيَّةِ الَّتِي يَظْهَرُ فِيهَا تَأْثِيرُهَا.", "شاهد المشهد: حول الشحنة الموجبة منطقة يظهر فيها تأثيرها. عندما نضع فيها شحنة اختبار صغيرة تتأثر بقوة، وكلما ابتعدنا عن الشحنة ضعفت القوة. هذه المنطقة هِيَ المجال الكهربائي.": "شَاهِدِ الْمَشْهَدَ: حَوْلَ الشُّحْنَةِ الْمُوجَبَةِ مِنْطَقَةٌ يَظْهَرُ فِيهَا تَأْثِيرُهَا. عِنْدَمَا نَضَعُ فِيهَا شُحْنَةَ اخْتِبَارٍ صَغِيرَةً تَتَأَثَّرُ بِقُوَّةٍ، وَكُلَّمَا ابْتَعَدْنَا عَنِ الشُّحْنَةِ ضَعُفَتِ الْقُوَّةُ. هَذِهِ الْمِنْطَقَةُ هِيَ الْمَجَالُ الْكَهْرَبَائِيُّ.", "لا نرى المجال الكهربائي، لكننا نَعْرِفُ وجوده من القوة التي يؤثر بها على شحنة توضع فيه.": "لَا نَرَى الْمَجَالَ الْكَهْرَبَائِيَّ، لَكِنَّنَا نَعْرِفُ وُجُودَهُ مِنَ الْقُوَّةِ الَّتِي يُؤَثِّرُ بِهَا عَلَى شُحْنَةٍ تُوضَعُ فِيهِ.", "والآن، كيف نمثل المجال الكهربائي بالرسم؟": "وَالْآنَ، كَيْفَ نُمَثِّلُ الْمَجَالَ الْكَهْرَبَائِيَّ بِالرَّسْمِ؟", "يمكن تمثيل المجال الكهربائي بخطوط تعرف باسم خطوط المجال الكهربائي.": "يُمْكِنُ تَمْثِيلُ الْمَجَالِ الْكَهْرَبَائِيِّ بِخُطُوطٍ تُعْرَفُ بِاسْمِ خُطُوطِ الْمَجَالِ الْكَهْرَبَائِيِّ.", "أهمية خطوط المجال: (1) تحديد اتجاه المجال. (2) تحديد شدة المجال الكهربائي.": "أَهَمِّيَّةُ خُطُوطِ الْمَجَالِ: (1) تَحْدِيدُ اتِّجَاهِ الْمَجَالِ. (2) تَحْدِيدُ شِدَّةِ الْمَجَالِ الْكَهْرَبَائِيِّ.", "لاحظ الرَّسْمِ: اتجاه الخط يحدد اتجاه المجال. وقرب الشحنة تكون الخطوط متقاربة فالمجال قوي، وبعيدا عنها تكون متباعدة فالمجال ضعيف.": "لَاحِظِ الرَّسْمَ: اتِّجَاهُ الْخَطِّ يُحَدِّدُ اتِّجَاهَ الْمَجَالِ. وَقُرْبَ الشُّحْنَةِ تَكُونُ الْخُطُوطُ مُتَقَارِبَةً فَالْمَجَالُ قَوِيٌّ، وَبَعِيدًا عَنْهَا تَكُونُ مُتَبَاعِدَةً فَالْمَجَالُ ضَعِيفٌ.", "ولخطوط المجال الكهربائي خصائص مهمة، لنتعرف عليها.": "وَلِخُطُوطِ الْمَجَالِ الْكَهْرَبَائِيِّ خَصَائِصُ مُهِمَّةٌ، لِنَتَعَرَّفْ عَلَيْهَا.", "تخرج دائما من الشحنة الموجبة وتدخل إلى الشحنة السالبة.": "تَخْرُجُ دَائِمًا مِنَ الشُّحْنَةِ الْمُوجَبَةِ وَتَدْخُلُ إِلَى الشُّحْنَةِ السَّالِبَةِ.", "لا تتقاطع مع بعضها البعض أبدا.": "لَا تَتَقَاطَعُ مَعَ بَعْضِهَا الْبَعْضِ أَبَدًا.", "تكون متقاربة في المجالات القوية، ومتباعدة في المجالات الضعيفة.": "تَكُونُ مُتَقَارِبَةً فِي الْمَجَالَاتِ الْقَوِيَّةِ، وَمُتَبَاعِدَةً فِي الْمَجَالَاتِ الضَّعِيفَةِ.", "شاهد المشهد: خطوط المجال تخرج من الشحنة الموجبة وتدخل في السالبة، ولا يتقاطع خطان أبدا، وتتقارب الخطوط قرب الشحنتين حَيْثُ المجال قوي.": "شَاهِدِ الْمَشْهَدَ: خُطُوطُ الْمَجَالِ تَخْرُجُ مِنَ الشُّحْنَةِ الْمُوجَبَةِ وَتَدْخُلُ فِي السَّالِبَةِ، وَلَا يَتَقَاطَعُ خَطَّانِ أَبَدًا، وَتَتَقَارَبُ الْخُطُوطُ قُرْبَ الشُّحْنَتَيْنِ حَيْثُ الْمَجَالُ قَوِيٌّ.", "والآن، كيف تبدو خطوط المجال حول الشحنات؟": "وَالْآنَ، كَيْفَ تَبْدُو خُطُوطُ الْمَجَالِ حَوْلَ الشُّحْنَاتِ؟", "الشحنة الموجبة: خطوط المجال منتشرة إلى الخارج.": "الشُّحْنَةُ الْمُوجَبَةُ: خُطُوطُ الْمَجَالِ مُنْتَشِرَةٌ إِلَى الْخَارِجِ.", "الشحنة السالبة: خطوط المجال منتشرة إلى الداخل.": "الشُّحْنَةُ السَّالِبَةُ: خُطُوطُ الْمَجَالِ مُنْتَشِرَةٌ إِلَى الدَّاخِلِ.", "شاهد المشهد: حول الشحنة الموجبة تخرج الخطوط إلى الخارج، وحول الشحنة السالبة تدخل الخطوط إلى الداخل.": "شَاهِدِ الْمَشْهَدَ: حَوْلَ الشُّحْنَةِ الْمُوجَبَةِ تَخْرُجُ الْخُطُوطُ إِلَى الْخَارِجِ، وَحَوْلَ الشُّحْنَةِ السَّالِبَةِ تَدْخُلُ الْخُطُوطُ إِلَى الدَّاخِلِ.", "وبين شحنتين متشابهتين تتنافر الخطوط ولا تتقاطع، وتبقى بينهما منطقة خالية من الخطوط.": "وَبَيْنَ شُحْنَتَيْنِ مُتَشَابِهَتَيْنِ تَتَنَافَرُ الْخُطُوطُ وَلَا تَتَقَاطَعُ، وَتَبْقَى بَيْنَهُمَا مِنْطَقَةٌ خَالِيَةٌ مِنَ الْخُطُوطِ.", "وللمجال الكهربائي نوعان، لنتعرف عليهما.": "وَلِلْمَجَالِ الْكَهْرَبَائِيِّ نَوْعَانِ، لِنَتَعَرَّفْ عَلَيْهِمَا.", "المجال الكهربائي المنتظم: هو مجال كهربائي ثَابِتُ الشدة والاتجاه عند جميع النقاط.": "الْمَجَالُ الْكَهْرَبَائِيُّ الْمُنْتَظِمُ: هُوَ مَجَالٌ كَهْرَبَائِيٌّ ثَابِتُ الشِّدَّةِ وَالِاتِّجَاهِ عِنْدَ جَمِيعِ النِّقَاطِ.", "المجال الكهربائي غير المنتظم: هو المجال المتغير في المقدار أو الاتجاه أو كِلَيْهِمَا معا، وينشأ عن الشُّحْنَاتِ النقطية.": "الْمَجَالُ الْكَهْرَبَائِيُّ غَيْرُ الْمُنْتَظِمِ: هُوَ الْمَجَالُ الْمُتَغَيِّرُ فِي الْمِقْدَارِ أَوِ الِاتِّجَاهِ أَوْ كِلَيْهِمَا مَعًا، وَيَنْشَأُ عَنِ الشُّحْنَاتِ النُّقْطِيَّةِ.", "قارن في الرَّسْمِ: بين اللوحين خطوط مستقيمة متوازية فالمجال منتظم، وحول الشحنة النقطية خطوط شعاعية تتباعد فالمجال غير منتظم.": "قَارِنْ فِي الرَّسْمِ: بَيْنَ اللَّوْحَيْنِ خُطُوطٌ مُسْتَقِيمَةٌ مُتَوَازِيَةٌ فَالْمَجَالُ مُنْتَظِمٌ، وَحَوْلَ الشُّحْنَةِ النُّقْطِيَّةِ خُطُوطٌ شُعَاعِيَّةٌ تَتَبَاعَدُ فَالْمَجَالُ غَيْرُ مُنْتَظِمٍ.", "ننتقل الآن إلى الموضوع الثاني في درسنا: شدة المجال الكهربائي.": "نَنْتَقِلُ الْآنَ إِلَى الْمَوْضُوعِ الثَّانِي فِي دَرْسِنَا: شِدَّةُ الْمَجَالِ الْكَهْرَبَائِيِّ.", "شدة المجال الكهربائي: القوة الكهربائية المؤثرة على وحدة الشُّحْنَاتِ الموجبة (شحنة اختبار موجبة) الموضوعة عند تلك النقطة.": "شِدَّةُ الْمَجَالِ الْكَهْرَبَائِيِّ: الْقُوَّةُ الْكَهْرَبَائِيَّةُ الْمُؤَثِّرَةُ عَلَى وِحْدَةِ الشُّحْنَاتِ الْمُوجَبَةِ (شُحْنَةِ اخْتِبَارٍ مُوجَبَةٍ) الْمَوْضُوعَةِ عِنْدَ تِلْكَ النُّقْطَةِ.", "شاهد المشهد: نضع شحنة اختبار عند النقطة P فتتأثر بقوة F. وعندما نضاعف شحنة الاختبار تتضاعف القوة، لكن ناتج قسمة القوة على الشحنة يبقى ثابتا، وهو شدة المجال عند النقطة.": "شَاهِدِ الْمَشْهَدَ: نَضَعُ شُحْنَةَ اخْتِبَارٍ عِنْدَ النُّقْطَةِ P فَتَتَأَثَّرُ بِقُوَّةٍ F. وَعِنْدَمَا نُضَاعِفُ شُحْنَةَ الِاخْتِبَارِ تَتَضَاعَفُ الْقُوَّةُ، لَكِنَّ نَاتِجَ قِسْمَةِ الْقُوَّةِ عَلَى الشُّحْنَةِ يَبْقَى ثَابِتًا، وَهُوَ شِدَّةُ الْمَجَالِ عِنْدَ النُّقْطَةِ.", "وقانون شدة المجال: `E = F / q₀`": "وَقَانُونُ شِدَّةِ الْمَجَالِ: `E = F / q₀`", "حَيْثُ: `E` شدة المجال الكهربائي، ووحدتها نيوتن لكل كُولُوم. و `F` القوة الكهربائية المؤثرة على شحنة الاختبار، ووحدتها النيوتن. و `q₀` شحنة الاختبار، ووحدتها الْكُولُوم.": "حَيْثُ: `E` شِدَّةُ الْمَجَالِ الْكَهْرَبَائِيِّ، وَوِحْدَتُهَا نِيُوتِنْ لِكُلِّ كُولُومْ. وَ `F` الْقُوَّةُ الْكَهْرَبَائِيَّةُ الْمُؤَثِّرَةُ عَلَى شُحْنَةِ الِاخْتِبَارِ، وَوِحْدَتُهَا النِّيُوتِنْ. وَ `q₀` شُحْنَةُ الِاخْتِبَارِ، وَوِحْدَتُهَا الْكُولُومْ.", "شدة المجال كمية متجهة، واتجاهها هو اتجاه القوة المؤثرة على شحنة الاختبار الموجبة.": "شِدَّةُ الْمَجَالِ كَمِّيَّةٌ مُتَّجِهَةٌ، وَاتِّجَاهُهَا هُوَ اتِّجَاهُ الْقُوَّةِ الْمُؤَثِّرَةِ عَلَى شُحْنَةِ الِاخْتِبَارِ الْمُوجَبَةِ.", "والآن، لنتعرف أكثر على المجال الكهربائي المنتظم.": "وَالْآنَ، لِنَتَعَرَّفْ أَكْثَرَ عَلَى الْمَجَالِ الْكَهْرَبَائِيِّ الْمُنْتَظِمِ.", "تعريفه: مجال كهربائي ثَابِتُ الشدة والاتجاه عند جميع النقاط.": "تَعْرِيفُهُ: مَجَالٌ كَهْرَبَائِيٌّ ثَابِتُ الشِّدَّةِ وَالِاتِّجَاهِ عِنْدَ جَمِيعِ النِّقَاطِ.", "كيف ينشأ؟ بين لوحين معدنيين متوازيين (مكثف) موصلين بمصدر جهد مستمر.": "كَيْفَ يَنْشَأُ؟ بَيْنَ لَوْحَيْنِ مَعْدِنِيَّيْنِ مُتَوَازِيَيْنِ (مُكَثِّفٍ) مُوَصَّلَيْنِ بِمَصْدَرِ جُهْدٍ مُسْتَمِرٍّ.", "خطوطه: مستقيمة ومتوازية ومتساوية التباعد، وتتجه من اللوح الموجب إلى اللوح السالب.": "خُطُوطُهُ: مُسْتَقِيمَةٌ وَمُتَوَازِيَةٌ وَمُتَسَاوِيَةُ التَّبَاعُدِ، وَتَتَّجِهُ مِنَ اللَّوْحِ الْمُوجَبِ إِلَى اللَّوْحِ السَّالِبِ.", "شاهد المشهد: بين اللوحين خطوط مستقيمة متوازية من اللوح الموجب إلى السالب، والشحنة أينما كانت بينهما تتأثر بالقوة نفسها، لأن المجال منتظم.": "شَاهِدِ الْمَشْهَدَ: بَيْنَ اللَّوْحَيْنِ خُطُوطٌ مُسْتَقِيمَةٌ مُتَوَازِيَةٌ مِنَ اللَّوْحِ الْمُوجَبِ إِلَى السَّالِبِ، وَالشُّحْنَةُ أَيْنَمَا كَانَتْ بَيْنَهُمَا تَتَأَثَّرُ بِالْقُوَّةِ نَفْسِهَا، لِأَنَّ الْمَجَالَ مُنْتَظِمٌ.", "وقانونه: `E = V / d`": "وَقَانُونُهُ: `E = V / d`", "حَيْثُ: `E` شدة المجال المنتظم، ووحدتها نيوتن لكل كُولُوم، وتكافئ فُولْت لكل متر. و `V` فرق الجهد بين اللوحين، ووحدته الفولت. و `d` المسافة بين اللوحين، ووحدتها المتر.": "حَيْثُ: `E` شِدَّةُ الْمَجَالِ الْمُنْتَظِمِ، وَوِحْدَتُهَا نِيُوتِنْ لِكُلِّ كُولُومْ، وَتُكَافِئُ فُولْتْ لِكُلِّ مِتْرْ. وَ `V` فَرْقُ الْجُهْدِ بَيْنَ اللَّوْحَيْنِ، وَوِحْدَتُهُ الْفُولْتْ. وَ `d` الْمَسَافَةُ بَيْنَ اللَّوْحَيْنِ، وَوِحْدَتُهَا الْمِتْرُ.", "وننتقل إلى المجال الكهربائي غير المنتظم، الناشئ عن شحنة نقطية.": "وَنَنْتَقِلُ إِلَى الْمَجَالِ الْكَهْرَبَائِيِّ غَيْرِ الْمُنْتَظِمِ، النَّاشِئِ عَنْ شُحْنَةٍ نُقْطِيَّةٍ.", "تعريفه: مجال يتغير في المقدار أو الاتجاه أو كِلَيْهِمَا معا، وينشأ عن الشُّحْنَاتِ النقطية.": "تَعْرِيفُهُ: مَجَالٌ يَتَغَيَّرُ فِي الْمِقْدَارِ أَوِ الِاتِّجَاهِ أَوْ كِلَيْهِمَا مَعًا، وَيَنْشَأُ عَنِ الشُّحْنَاتِ النُّقْطِيَّةِ.", "خطوطه: شعاعية، تخرج من الشحنة الموجبة وتدخل في السالبة، وتتباعد كلما ابتعدنا عن الشحنة فيضعف المجال.": "خُطُوطُهُ: شُعَاعِيَّةٌ، تَخْرُجُ مِنَ الشُّحْنَةِ الْمُوجَبَةِ وَتَدْخُلُ فِي السَّالِبَةِ، وَتَتَبَاعَدُ كُلَّمَا ابْتَعَدْنَا عَنِ الشُّحْنَةِ فَيَضْعُفُ الْمَجَالُ.", "وقانونه: `E = k·q / r²`": "وَقَانُونُهُ: `E = k·q / r²`", "حَيْثُ: `E` شدة المجال الكهربائي عند النقطة، ووحدتها نيوتن لكل كُولُوم. و `k` ثَابِتُ كُولُوم، ويساوي `9 × 10⁹ N·m²/C²`. و `q` الشحنة المولدة للمجال، ووحدتها الْكُولُوم. و `r` بُعْدُ النقطة عن الشحنة، ووحدته المتر.": "حَيْثُ: `E` شِدَّةُ الْمَجَالِ الْكَهْرَبَائِيِّ عِنْدَ النُّقْطَةِ، وَوِحْدَتُهَا نِيُوتِنْ لِكُلِّ كُولُومْ. وَ `k` ثَابِتُ كُولُومْ، وَيُسَاوِي `9 × 10⁹ N·m²/C²`. وَ `q` الشُّحْنَةُ الْمُوَلِّدَةُ لِلْمَجَالِ، وَوِحْدَتُهَا الْكُولُومْ. وَ `r` بُعْدُ النُّقْطَةِ عَنِ الشُّحْنَةِ، وَوِحْدَتُهُ الْمِتْرُ.", "مضاعفة المسافة ← المجال يقل إلى الربع (لأن المسافة مُرَبَّعَةٌ).": "مُضَاعَفَةُ الْمَسَافَةِ ← الْمَجَالُ يَقِلُّ إِلَى الرُّبُعِ (لِأَنَّ الْمَسَافَةَ مُرَبَّعَةٌ).", "شاهد المشهد: عَلَى بُعْدِ r يكون المجال E، وعند ضعف المسافة يقل إلى الربع، وعند ثلاثة أضعافها يقل إلى التسع.": "شَاهِدِ الْمَشْهَدَ: عَلَى بُعْدِ r يَكُونُ الْمَجَالُ E، وَعِنْدَ ضِعْفِ الْمَسَافَةِ يَقِلُّ إِلَى الرُّبُعِ، وَعِنْدَ ثَلَاثَةِ أَضْعَافِهَا يَقِلُّ إِلَى التُّسُعِ.", "وإذا أثرت أكثر من شحنة على شحنة واحدة، فكيف نحسب القوة عليها؟": "وَإِذَا أَثَّرَتْ أَكْثَرُ مِنْ شُحْنَةٍ عَلَى شُحْنَةٍ وَاحِدَةٍ، فَكَيْفَ نَحْسُبُ الْقُوَّةَ عَلَيْهَا؟", "احسب كل قوة على حدة بقانون كُولُوم، ثم اجمعها مع مراعاة الاتجاهات.": "احْسُبْ كُلَّ قُوَّةٍ عَلَى حِدَةٍ بِقَانُونِ كُولُومْ، ثُمَّ اجْمَعْهَا مَعَ مُرَاعَاةِ الِاتِّجَاهَاتِ.", "لاحظ الرَّسْمِ: الشحنة الموجبة q₁ تدفع q₀ بعيدا عنها، والشحنة السالبة q₂ تجذبها نحوها، فالقوتان في اتجاه واحد، والقوة الكلية مجموعهما. وإذا تَعَاكَسَتَا نطرح الصُّغْرَى من الْكُبْرَى.": "لَاحِظِ الرَّسْمَ: الشُّحْنَةُ الْمُوجَبَةُ q₁ تَدْفَعُ q₀ بَعِيدًا عَنْهَا، وَالشُّحْنَةُ السَّالِبَةُ q₂ تَجْذِبُهَا نَحْوَهَا، فَالْقُوَّتَانِ فِي اتِّجَاهٍ وَاحِدٍ، وَالْقُوَّةُ الْكُلِّيَّةُ مَجْمُوعُهُمَا. وَإِذَا تَعَاكَسَتَا نَطْرَحُ الصُّغْرَى مِنَ الْكُبْرَى.", "والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، من صفحة 95.": "وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ أَمْثِلَةِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ. لِنَأْخُذِ الْمِثَالَ الْأَوَّلَ، مِنْ صَفْحَةِ 95.", "السؤال: أوجد شدة المجال الكهربائي عَلَى بُعْدِ `0.3 m` من شحنة كهربائية `q = 5 × 10⁻⁹ C`.": "السُّؤَالُ: أَوْجِدْ شِدَّةَ الْمَجَالِ الْكَهْرَبَائِيِّ عَلَى بُعْدِ `0.3 m` مِنْ شُحْنَةٍ كَهْرَبَائِيَّةٍ `q = 5 × 10⁻⁹ C`.", "المعطيات أمامك على السبورة. والمطلوب: شدة المجال `E` عند النقطة واتجاهه.": "الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ. وَالْمَطْلُوبُ: شِدَّةُ الْمَجَالِ `E` عِنْدَ النُّقْطَةِ وَاتِّجَاهُهُ.", "لِنَرْسُمِ الشحنة الموجبة والنقطة P عَلَى بُعْدِ ثلاثة أعشار المتر منها.": "لِنَرْسُمِ الشُّحْنَةَ الْمُوجَبَةَ وَالنُّقْطَةَ P عَلَى بُعْدِ ثَلَاثَةِ أَعْشَارِ الْمِتْرِ مِنْهَا.", "القانون: `E = k·q / r²` لأن المجال ناشئ عن شحنة نقطية واحدة.": "الْقَانُونُ: `E = k·q / r²` لِأَنَّ الْمَجَالَ نَاشِئٌ عَنْ شُحْنَةٍ نُقْطِيَّةٍ وَاحِدَةٍ.", "التعويض: `E = 9 × 10⁹ × 5 × 10⁻⁹ / 0.3²`": "التَّعْوِيضُ: `E = 9 × 10⁹ × 5 × 10⁻⁹ / 0.3²`", "الحساب: `E = 45 ÷ 0.09 = 500 N/C`": "الْحِسَابُ: `E = 45 ÷ 0.09 = 500 N/C`", "الاتجاه: الشحنة موجبة، فالمجال عند النقطة يتجه بعيدا عن الشحنة.": "الِاتِّجَاهُ: الشُّحْنَةُ مُوجَبَةٌ، فَالْمَجَالُ عِنْدَ النُّقْطَةِ يَتَّجِهُ بَعِيدًا عَنِ الشُّحْنَةِ.", "`E = 500 N/C` بعيدا عن الشحنة": "`E = 500 N/C` بَعِيدًا عَنِ الشُّحْنَةِ", "وتأمل معي المثال الثاني، من صفحة 95.": "وَتَأَمَّلْ مَعِي الْمِثَالَ الثَّانِيَ، مِنْ صَفْحَةِ 95.", "السؤال: شحنة كهربائية `2 × 10⁻⁹ C` وضعت عند نقطة في مجال كهربائي فتأثرت بقوة `4 × 10⁻⁶ N`. ما مقدار المجال الكهربائي في تلك النقطة؟": "السُّؤَالُ: شُحْنَةٌ كَهْرَبَائِيَّةٌ `2 × 10⁻⁹ C` وُضِعَتْ عِنْدَ نُقْطَةٍ فِي مَجَالٍ كَهْرَبَائِيٍّ فَتَأَثَّرَتْ بِقُوَّةٍ `4 × 10⁻⁶ N`. مَا مِقْدَارُ الْمَجَالِ الْكَهْرَبَائِيِّ فِي تِلْكَ النُّقْطَةِ؟", "المعطيات أمامك على السبورة. والمطلوب: شدة المجال `E` عند النقطة.": "الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ. وَالْمَطْلُوبُ: شِدَّةُ الْمَجَالِ `E` عِنْدَ النُّقْطَةِ.", "لِنَرْسُمِ شحنة الاختبار في المجال، والقوة المؤثرة عليها.": "لِنَرْسُمْ شُحْنَةَ الِاخْتِبَارِ فِي الْمَجَالِ، وَالْقُوَّةَ الْمُؤَثِّرَةَ عَلَيْهَا.", "القانون: `E = F / q₀` لِأَنَّنَا نَعْرِفُ القوة المؤثرة على الشحنة.": "الْقَانُونُ: `E = F / q₀` لِأَنَّنَا نَعْرِفُ الْقُوَّةَ الْمُؤَثِّرَةَ عَلَى الشُّحْنَةِ.", "التعويض: `E = 4 × 10⁻⁶ / 2 × 10⁻⁹`": "التَّعْوِيضُ: `E = 4 × 10⁻⁶ / 2 × 10⁻⁹`", "الحساب: `E = 2 × 10³ N/C = 2000 N/C`": "الْحِسَابُ: `E = 2 × 10³ N/C = 2000 N/C`", "`E = 2 × 10³ N/C`": "`E = 2 × 10³ N/C`", "ملاحظة: قيمة المجال صفة للنقطة نفسها، فلو وضعنا شحنة أكبر لزادت القوة بالنسبة نفسها وبقي `E` ثابتا.": "مُلَاحَظَةٌ: قِيمَةُ الْمَجَالِ صِفَةٌ لِلنُّقْطَةِ نَفْسِهَا، فَلَوْ وَضَعْنَا شُحْنَةً أَكْبَرَ لَزَادَتِ الْقُوَّةُ بِالنِّسْبَةِ نَفْسِهَا وَبَقِيَ `E` ثَابِتًا.", "وبعد أن فهمنا المجال الكهربائي وشدته، لنرى أين نجده في حياتنا.": "وَبَعْدَ أَنْ فَهِمْنَا الْمَجَالَ الْكَهْرَبَائِيَّ وَشِدَّتَهُ، لِنَرَ أَيْنَ نَجِدُهُ فِي حَيَاتِنَا.", "شاشات الأشعة المهبطية وأجهزة الأشعة السينية تستخدم المجال لتسريع الإلكترونات وتوجيهها.": "شَاشَاتُ الْأَشِعَّةِ الْمِهْبَطِيَّةِ وَأَجْهِزَةُ الْأَشِعَّةِ السِّينِيَّةِ تَسْتَخْدِمُ الْمَجَالَ لِتَسْرِيعِ الْإِلِكْتِرُونَاتِ وَتَوْجِيهِهَا.", "أسماك الرعاش الكهربائي تستشعر المجالات الكهربائية للفرائس.": "أَسْمَاكُ الرَّعَّاشِ الْكَهْرَبَائِيِّ تَسْتَشْعِرُ الْمَجَالَاتِ الْكَهْرَبَائِيَّةَ لِلْفَرَائِسِ.", "هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الخامس، صفحة 105.": "هَيَّا نُطَبِّقْ مَا تَعَلَّمْنَاهُ فِي التَّمْرِينِ الْأَوَّلِ، مِنْ وَرَقَةِ الْعَمَلِ، السُّؤَالِ الْخَامِسِ، صَفْحَةِ 105.", "السؤال: شحنة `4 × 10⁻⁶ C` تأثرت بقوة `8 × 10⁻³ N`. ما شدة المجال؟": "السُّؤَالُ: شُحْنَةٌ `4 × 10⁻⁶ C` تَأَثَّرَتْ بِقُوَّةٍ `8 × 10⁻³ N`. مَا شِدَّةُ الْمَجَالِ؟", "المعطيات أمامك على السبورة. والمطلوب: شدة المجال `E`.": "الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ. وَالْمَطْلُوبُ: شِدَّةُ الْمَجَالِ `E`.", "لِنَرْسُمِ شحنة الاختبار والقوة المؤثرة عليها.": "لِنَرْسُمْ شُحْنَةَ الِاخْتِبَارِ وَالْقُوَّةَ الْمُؤَثِّرَةَ عَلَيْهَا.", "القانون: `E = F / q₀`": "الْقَانُونُ: `E = F / q₀`", "التعويض: `E = 8 × 10⁻³ / 4 × 10⁻⁶`": "التَّعْوِيضُ: `E = 8 × 10⁻³ / 4 × 10⁻⁶`", "الحساب: `E = 2 × 10³ = 2000 N/C`": "الْحِسَابُ: `E = 2 × 10³ = 2000 N/C`", "`E = 2000 N/C`": "`E = 2000 N/C`", "والتمرين الثاني، من ورقة العمل، السؤال السادس، صفحة 105.": "وَالتَّمْرِينُ الثَّانِي، مِنْ وَرَقَةِ الْعَمَلِ، السُّؤَالِ السَّادِسِ، صَفْحَةِ 105.", "السؤال: أوجد شدة المجال الكهربائي عَلَى بُعْدِ `0.25 m` من شحنة كهربائية مقدارها `3 × 10⁻⁹ C`.": "السُّؤَالُ: أَوْجِدْ شِدَّةَ الْمَجَالِ الْكَهْرَبَائِيِّ عَلَى بُعْدِ `0.25 m` مِنْ شُحْنَةٍ كَهْرَبَائِيَّةٍ مِقْدَارُهَا `3 × 10⁻⁹ C`.", "المعطيات أمامك على السبورة. والمطلوب: شدة المجال `E` واتجاهه.": "الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ. وَالْمَطْلُوبُ: شِدَّةُ الْمَجَالِ `E` وَاتِّجَاهُهُ.", "لِنَرْسُمِ الشحنة والنقطة عَلَى بُعْدِ ربع متر منها.": "لِنَرْسُمِ الشُّحْنَةَ وَالنُّقْطَةَ عَلَى بُعْدِ رُبُعِ مِتْرٍ مِنْهَا.", "القانون: `E = k·q / r²`": "الْقَانُونُ: `E = k·q / r²`", "التعويض: `E = 9 × 10⁹ × 3 × 10⁻⁹ / 0.25²`": "التَّعْوِيضُ: `E = 9 × 10⁹ × 3 × 10⁻⁹ / 0.25²`", "الحساب: `E = 27 ÷ 0.0625 = 432 N/C`": "الْحِسَابُ: `E = 27 ÷ 0.0625 = 432 N/C`", "الاتجاه: الشحنة موجبة، فالمجال يتجه بعيدا عنها.": "الِاتِّجَاهُ: الشُّحْنَةُ مُوجَبَةٌ، فَالْمَجَالُ يَتَّجِهُ بَعِيدًا عَنْهَا.", "`E = 432 N/C` بعيدا عن الشحنة": "`E = 432 N/C` بَعِيدًا عَنِ الشُّحْنَةِ"};function V33(out){(out||[]).forEach(sl=>{if(!sl)return;if(sl.sayT&&D33[sl.sayT])sl.sayT=D33[sl.sayT];(sl.steps||[]).forEach(x=>{if(!x)return;const t=x.say!==undefined&&x.say!==''?x.say:(x.md||'');if(t&&D33[t])x.say=D33[t]})});return out}
/* ===== الوحدة الخامسة: الدرس النموذجي 4-1 التيار الكهربائي (المدرب 1 نوفمبر: تطبيق الدرس النموذجي على الوحدة الخامسة) ===== */
/* سلك نحاسي مجسم أفقي: x0..x1 ومحوره y ونصف قطره r */
/* إلكترونات تنجرف داخل السلك: صف متكرر بفاصل P يتحرك نحو الاتجاه dir (−1 لليسار) */
/* بطارية مجسمة صغيرة: x,y مركزها */
const bat3=(x,y)=>`<g><rect x="${x-44}" y="${y-22}" width="88" height="44" rx="7" fill="#1f2937" stroke="#0b1220"/><rect x="${x-44}" y="${y-22}" width="34" height="44" rx="7" fill="#dc2626"/><rect x="${x+44}" y="${y-8}" width="7" height="16" rx="2" fill="#94a3b8" stroke="#475569"/><text x="${x-27}" y="${y+7}" text-anchor="middle" font-size="20" font-weight="900" fill="#fff">+</text><text x="${x+22}" y="${y+7}" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">−</text><rect x="${x-40}" y="${y-19}" width="80" height="5" rx="2" fill="#fff" opacity=".25"/></g>`;
/* سهم تيار عريض */
const iArr=(x,y,len,c,lab)=>arrA(x,y,0,len,c||'#dc2626',10)+(lab?lbl(x+len/2,y-16,lab,c||'#dc2626',17):'');
const iArrL=(x,y,len,c,lab)=>arrA(x,y,180,len,c||'#2563eb',10)+(lab?lbl(x-len/2,y-16,lab,c||'#2563eb',17):'');

/* 1) التيار: سيل من الشحنات يتحرك بانتظام (متحرك 12 ث) */
/* 2) شدة التيار: الشحنة المارة عبر المقطع في زمن معين (متحرك 12 ث) */
/* 3) اتجاه التيار في دائرة: الاصطلاحي والحقيقي */
/* رمز مقاومة متعرج على سلك أفقي */
/* 4) كثافة التيار: نفس التيار في مقطعين مختلفين */
/* 5) سرعة الانجراف: إلكترون يتصادم مع ذرات الموصل وينجرف ببطء عكس المجال (متحرك 12 ث) */
/* 6) التيار المستمر والمتردد: رسمان للتيار مع الزمن */
/* رسم المسائل: سلك بمقطع دائري وبيانات */

CARDS['4-1']={
  goals:{title:'أهداف الوحدة',sayT:'والآن، لنتعرف على أهداف الوحدة.',steps:()=>[
    S({html:`<div class="kc kPt kKeep kcB">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'في نهاية هذه الوحدة، يكون المتدرب قادرا على:'),
    S({html:`<div class="kc kPt kKeep kcT"><b>1.</b> تعريف التيار الكهربائي وحساب شدته وكثافته وسرعة الانجراف.</div>`},'تعريف التيار الكهربائي، وحساب شدته وكثافته وسرعة الانجراف.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>2.</b> التمييز بين التيار المستمر والتيار المتردد.</div>`},'التمييز بين التيار المستمر والتيار المتردد.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>3.</b> تعريف المقاومة وتطبيق قانون أوم والقدرة الكهربائية.</div>`},'تعريف المقاومة، وتطبيق قانون أوم والقدرة الكهربائية.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>4.</b> حساب المقاومة المكافئة للتوصيل على التوالي وعلى التوازي.</div>`},'حساب المقاومة المكافئة للتوصيل على التوالي وعلى التوازي.')]},
  units:{title:'وحدات مهمة',steps:()=>{const U=[['التيار الكهربائي','I','الأمبير','A'],['الجهد الكهربائي','V','الفولت','V'],['المقاومة','R','الأوم','Ω'],['القدرة الكهربائية','P','الواط','W'],['المقاومة النوعية','ρ','أوم متر','Ω·m']];
    return [S({html:`<div class="kc kUH"><span>الكمية</span><span>رمز الكمية</span><span>وحدة القياس</span><span>رمز الوحدة</span></div>`},'لنتعرف على الوحدات المهمة في هذه الوحدة.')].concat(U.map(([n,sy,u,us])=>{const m=/^(التيار|الجهد)/.test(n);return S({html:`<div class="kc kUR"><span>${n}</span><span>${M(sy)}</span><span>${u}</span><span class="kUS">${M(us)}</span></div>`},n+(m?' رمزه `':' رمزها `')+sy+'`، '+(m?'وَوَحْدَتُهُ ':'وَوَحْدَتُهَا ')+u+'، ورمزها `'+us+'`.')}))}},
  cur:{title:'التيار الكهربائي',sayT:'نبدأ أول موضوعات درسنا: التيار الكهربائي.',steps:()=>[
    S(pt(B('التيار الكهربائي')+': سيل من الشحنات يتحرك بانتظام في اتجاه معين.'),''),
    S(fig(iFlowScene(),'مشهد: الشحنات تتحرك في السلك، والتيار الاصطلاحي عكس حركة الإلكترونات'),'شاهد المشهد: الْإِلِكْتِرُونَاتُ تَتَحَرَّكُ دَاخِلَ السِّلْكِ بِانْتِظَامٍ، وَالتَّيَّارُ الِاصْطِلَاحِيُّ يَتَّجِهُ مِنَ الْمُوجَبِ إِلَى السَّالِبِ، أَيْ عَكْسَ حَرَكَةِ الْإِلِكْتِرُونَاتْ.')]},
  inten:{title:'شدة التيار',sayT:'وكيف نقيس مقدار التيار؟ بشدة التيار.',steps:()=>[
    S(pt(B('شدة التيار')+': معدل مرور الشحنة عبر مقطع الموصل، أي الشحنة التي تعبر المقطع في كل ثانية.'),''),
    S(fig(iCountScene(),'مشهد: نعد الشحنة التي تعبر المقطع خلال زمن معين'),'شاهد المشهد: نَعُدُّ الشُّحْنَةَ الَّتِي تَعْبُرُ مَقْطَعَ السِّلْكِ خِلَالَ زَمَنٍ مُعَيَّنٍ، فَتَكُونُ شِدَّةُ التَّيَّارِ هِيَ الشُّحْنَةَ الْمَارَّةَ فِي كُلِّ ثَانِيَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('I = q / t')+'</div>'),'وقانون شدة التيار: `I = q / t`'),{md:'`I = q / t`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('I')+' شدة التيار، ووحدتها الأمبير '+M('A = C/s')+'<br>'+M('q')+' الشحنة المارة، ووحدتها الكولوم '+M('C')+'<br>'+M('t')+' الزمن، ووحدته الثانية '+M('s')+'</div>'},'حيث: `I` شِدَّةُ التَّيَّارِ، ووحدتها الأمبير، وتساوي كولوم لكل ثانية. و `q` الشُّحْنَةُ الْمَارَّةُ، ووحدتها الكولوم. و `t` الزَّمَنُ، ووحدته الثانية.')]},
  elec:{title:'الشحنة وعدد الإلكترونات',sayT:'والشحنة المارة تتكون من عدد كبير من الإلكترونات.',steps:()=>[
    S(pt('الشحنة تساوي عدد الإلكترونات مضروبا في شحنة الإلكترون الواحد.'),''),
    Object.assign(S(pt('<div class="kLaw">'+M('q = n·e')+'</div>'),'والقانون: `q = n·e`'),{md:'`q = n·e`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('n')+' عدد الإلكترونات، وليس له وحدة<br>'+M('e')+' شحنة الإلكترون، وتساوي '+M('1.6 × 10⁻¹⁹ C')+'</div>'},'حيث: `n` عَدَدُ الْإِلِكْتِرُونَاتِ، وليس له وحدة. و `e` شُحْنَةُ الْإِلِكْتِرُونِ، وَتُسَاوِي واحد فاصلة ستة في عشرة أس سالب تسعة عشر كولوم.'),
    S(pt('ومنه عدد الإلكترونات: '+M('n = q / e')+'.'),'ومنه عدد الإلكترونات: `n = q / e`')]},
  dir:{title:'اتجاه التيار',sayT:'وما اتجاه التيار في الدائرة؟',steps:()=>[
    S(pt(B('الاتجاه الاصطلاحي')+': اتجاه حركة الشحنات الموجبة، من القطب الموجب إلى القطب السالب خارج المصدر.'),''),
    S(pt(B('الاتجاه الحقيقي')+': حركة الإلكترونات من القطب السالب إلى القطب الموجب.'),''),
    S(fig(iDirFig(),'الاتجاه الاصطلاحي للتيار بالأحمر، وحركة الإلكترونات بالأزرق'),'لاحظ الرسم: التَّيَّارُ الِاصْطِلَاحِيُّ بِالْأَحْمَرِ يَخْرُجُ مِنَ الْقُطْبِ الْمُوجَبِ وَيَعُودُ إِلَى السَّالِبِ، وَالْإِلِكْتِرُونَاتُ بِالْأَزْرَقِ تَتَحَرَّكُ فِي الِاتِّجَاهِ الْمُعَاكِسْ.')]},
  dens:{title:'كثافة التيار',sayT:'ننتقل الآن إلى كثافة التيار.',steps:()=>[
    S(pt(B('كثافة التيار')+': شدة التيار المار لكل وحدة مساحة من مقطع الموصل، وهي كمية '+B('متجهة')+' في اتجاه التيار.'),''),
    S(fig(iDensFig(),'التيار نفسه في مقطعين: كلما صغرت المساحة زادت الكثافة'),'لاحظ الرسم: التَّيَّارُ نَفْسُهُ يَمُرُّ فِي الْجُزْأَيْنِ، لَكِنَّ الْمَقْطَعَ الصَّغِيرَ يَزْدَحِمُ فِيهِ التَّيَّارُ، فَتَكُونُ كَثَافَتُهُ أَكْبَرْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('J = I / A')+'</div>'),'وقانون كثافة التيار: `J = I / A`'),{md:'`J = I / A`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('J')+' كثافة التيار، ووحدتها '+M('A/m²')+'<br>'+M('I')+' شدة التيار، ووحدتها الأمبير '+M('A')+'<br>'+M('A')+' مساحة المقطع، ووحدتها '+M('m²')+'</div>'},'حيث: `J` كَثَافَةُ التَّيَّارِ، ووحدتها أمبير لكل متر مربع. و `I` شِدَّةُ التَّيَّارِ بالأمبير. و `A` مِسَاحَةُ الْمَقْطَعِ بالمتر المربع.'),
    S(pt('تحويل المساحة: '+M('1 mm² = 10⁻⁶ m²')+' و '+M('1 cm² = 10⁻⁴ m²')+'، ومساحة المقطع الدائري '+M('A = π·r²')+'.'),'تحويل المساحة مهم جدا: المليمتر المربع يساوي عشرة أس سالب ستة متر مربع، والسنتيمتر المربع يساوي عشرة أس سالب أربعة متر مربع، ومساحة المقطع الدائري `A = π·r²`')]},
  drift:{title:'سرعة الانجراف',sayT:'وبأي سرعة تتحرك الإلكترونات داخل الموصل؟',steps:()=>[
    S(pt(B('سرعة الانجراف')+': السرعة المتوسطة لحركة الإلكترونات بتأثير المجال الكهربائي داخل الموصل، وهي '+B('صغيرة جدا')+' بسبب التصادمات المتكررة مع ذرات الموصل.'),''),
    S(fig(iDriftScene(),'مشهد: الإلكترون يتصادم مع ذرات الموصل وينجرف ببطء عكس المجال'),'شاهد المشهد: الْإِلِكْتِرُونُ يَتَصَادَمُ بِاسْتِمْرَارٍ مَعَ ذَرَّاتِ الْمُوَصِّلِ، وَالْمَجَالُ يَدْفَعُهُ فِي الِاتِّجَاهِ الْمُعَاكِسِ لَهُ، فَيَنْجَرِفُ بِبُطْءٍ شَدِيدْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('v_d = J / (n·e)')+'</div>'),'وقانون سرعة الانجراف: `v_d = J / (n·e)`'),{md:'`v_d = J / (n·e)`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('v_d')+' سرعة الانجراف، ووحدتها '+M('m/s')+'<br>'+M('n')+' عدد الإلكترونات الحرة في كل متر مكعب، ووحدته '+M('m⁻³')+'<br>'+M('e')+' شحنة الإلكترون '+M('1.6 × 10⁻¹⁹ C')+'</div>'},'حيث: `v_d` سُرْعَةُ الِانْجِرَافِ، ووحدتها متر لكل ثانية. و `n` عَدَدُ الْإِلِكْتِرُونَاتِ الْحُرَّةِ فِي كُلِّ مِتْرٍ مُكَعَّبْ. و `e` شُحْنَةُ الْإِلِكْتِرُونْ.')]},
  dcac:{title:'أنواع التيار الكهربائي',sayT:'وللتيار الكهربائي نوعان.',steps:()=>[
    S(pt(B('التيار المستمر DC')+': يسري دائما في اتجاه واحد، مثل البطاريات والخلايا الشمسية.'),''),
    S(pt(B('التيار المتردد AC')+': يتغير مقداره واتجاهه دوريا مع الزمن، مثل كهرباء المنازل '+M('220 V')+' وتردد '+M('60 Hz')+'.'),''),
    S(fig(iDcAcFig(),'التيار مع الزمن: المستمر ثابت، والمتردد يتغير اتجاهه دوريا'),'لاحظ الرسم: التَّيَّارُ الْمُسْتَمِرُّ خَطٌّ ثَابِتٌ فِي اتِّجَاهٍ وَاحِدٍ، وَالتَّيَّارُ الْمُتَرَدِّدُ يَتَغَيَّرُ مِقْدَارُهُ وَاتِّجَاهُهُ دَوْرِيًّا مَعَ الزَّمَنْ.'),
    S(pt('نستخدم التيار المتردد في الشبكات لأنه يسهل رفع جهده وخفضه بالمحولات، فينقل لمسافات بعيدة بفقد أقل.'),'')]},
  ex1:{title:'مثال ١ · صفحة 118',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 118.',steps:()=>[
    S(q('شحنة مقدارها '+M('10 C')+' تمر في سلك لمدة '+M('60 s')+'. أوجد التيار الكهربائي.','المثال · صفحة 118'),''),
    S(gr(['q = 10 C','t = 60 s'],'شدة التيار '+M('I')),''),
    S(fig(iWireEx({q:'q = 10 C',t:'t = 60 s',res:'I ≈ 0.17 A'})),'لنرسم السلك والشحنة المارة.'),
    S(st(1,'القانون: '+M('I = q / t')+' لأننا نعرف الشحنة والزمن.'),'نستخدم تعريف شدة التيار: `I = q / t`، لأننا نعرف الشحنة والزمن.'),
    S(st(2,'التعويض: '+M('I = 10 / 60')),'نعوض: `I = 10 / 60`'),
    S(st(3,'الحساب: '+M('I ≈ 0.17 A')+'<span class="kDirOn"></span>'),'نقسم عشرة على ستين، فتكون شدة التيار صفر فاصلة سبعة عشر أمبير تقريبا.'),
    S(res(M('I ≈ 0.17 A')),'النتيجة: `I ≈ 0.17 A`.')]},
  ex2:{title:'مثال ٢ · صفحة 119',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 119.',steps:()=>[
    S(q('موصل مساحة مقطعه الدائري '+M('0.785 × 10⁻⁶ m²')+' ويحمل تيارا مقداره '+M('1 A')+'. أوجد كثافة التيار.','المثال · صفحة 119'),''),
    S(gr(['I = 1 A','A = 0.785 × 10⁻⁶ m²'],'كثافة التيار '+M('J')),''),
    S(fig(iWireEx({I:'I = 1 A',A:'A = 0.785 mm²',res:'J ≈ 1.27 × 10⁶ A/m²'})),'لنرسم الموصل ومقطعه.'),
    S(st(1,'القانون: '+M('J = I / A')),'القانون: `J = I / A`'),
    S(st(2,'التعويض: '+M('J = 1 / (0.785 × 10⁻⁶)')),'نعوض: `J = 1 / (0.785 × 10⁻⁶)`'),
    S(st(3,'الحساب: '+M('J ≈ 1.274 × 10⁶ A/m²')+'<span class="kDirOn"></span>'),'واحد مقسوما على صفر فاصلة سبعمئة وخمسة وثمانين يساوي واحد فاصلة مئتين وأربعة وسبعين، والقوة تصبح موجبة ستة.'),
    S(res(M('J ≈ 1.274 × 10⁶ A/m²')),'النتيجة: `J ≈ 1.274 × 10⁶ A/m²`.')]},
  ex3:{title:'مثال ٣ · صفحة 119',sayT:'والمثال الثالث، مِنْ صَفْحَةِ 119.',steps:()=>[
    S(q('شحنة مقدارها '+M('5 C')+' تمر على مقطع موصل في زمن '+M('4 s')+'، ومساحة المقطع '+M('2.5 mm²')+'. أوجد التيار الكهربائي وكثافة التيار.','المثال · صفحة 119'),''),
    S(gr(['q = 5 C','t = 4 s','A = 2.5 × 10⁻⁶ m²'],'التيار '+M('I')+' وكثافته '+M('J')),''),
    S(fig(iWireEx({q:'q = 5 C',t:'t = 4 s',A:'A = 2.5 mm²',res:'I = 1.25 A · J = 5 × 10⁵ A/m²'})),'لنرسم الموصل والمعطيات.'),
    S(st(1,'التيار: '+M('I = q / t = 5 / 4 = 1.25 A')),'أولا التيار: `I = q / t`، خمسة على أربعة يساوي واحد فاصلة خمسة وعشرين أمبير.'),
    S(st(2,'الكثافة: '+M('J = I / A = 1.25 / (2.5 × 10⁻⁶)')),'ثانيا الكثافة: `J = I / A`، بعد تحويل المساحة إلى المتر المربع.'),
    S(st(3,'الحساب: '+M('J = 5 × 10⁵ A/m²')+'<span class="kDirOn"></span>'),'واحد فاصلة خمسة وعشرين على اثنين فاصلة خمسة يساوي نصفا، فتكون الكثافة خمسة في عشرة أس خمسة أمبير لكل متر مربع.'),
    S(res(M('I = 1.25 A')+' · '+M('J = 5 × 10⁵ A/m²')),'')]},
  ex4:{title:'مثال ٤ · صفحة 120',sayT:'والمثال الرابع، مِنْ صَفْحَةِ 120.',steps:()=>[
    S(q('موصل من الفضة مساحة مقطعه '+M('0.785 mm²')+' ويحمل تيارا '+M('1 A')+'، وعدد الإلكترونات الحرة '+M('n = 5.8 × 10²⁸ m⁻³')+'. احسب كثافة التيار وسرعة الانجراف.','المثال · صفحة 120'),''),
    S(gr(['I = 1 A','A = 0.785 × 10⁻⁶ m²','n = 5.8 × 10²⁸ m⁻³','e = 1.6 × 10⁻¹⁹ C'],'كثافة التيار '+M('J')+' وسرعة الانجراف '+M('v_d')),''),
    S(fig(iWireEx({I:'I = 1 A',A:'A = 0.785 mm²',n:'n = 5.8 × 10²⁸ m⁻³',res:'v_d ≈ 1.37 × 10⁻⁴ m/s'})),'لنرسم سلك الفضة والإلكترونات الحرة فيه.'),
    S(st(1,'الكثافة: '+M('J = I / A ≈ 1.274 × 10⁶ A/m²')),'أولا الكثافة: `J = I / A`، فتكون واحد فاصلة مئتين وأربعة وسبعين في عشرة أس ستة.'),
    S(st(2,'المقام: '+M('n·e = 5.8 × 10²⁸ × 1.6 × 10⁻¹⁹ = 9.28 × 10⁹')),'ثانيا نضرب `n` في `e`، فيكون الناتج تسعة فاصلة ثمانية وعشرين في عشرة أس تسعة.'),
    S(st(3,'السرعة: '+M('v_d = 1.274 × 10⁶ / 9.28 × 10⁹ ≈ 1.37 × 10⁻⁴ m/s')+'<span class="kDirOn"></span>'),'ثالثا نقسم الكثافة على الناتج، فتكون سرعة الانجراف واحد فاصلة سبعة وثلاثين في عشرة أس سالب أربعة متر لكل ثانية.'),
    S(res(M('J ≈ 1.274 × 10⁶ A/m²')+' · '+M('v_d ≈ 1.37 × 10⁻⁴ m/s')),'')]},
  tr1:trCard('تمرين ١ · ورقة العمل · سؤال ٣ (صفحة 128)','هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الثالث، صَفْحَةِ 128.',{q:'يمر تيار '+M('2 A')+' في موصل لمدة '+M('4 s')+'. احسب الشحنة المارة.',g:['I = 2 A','t = 4 s'],r:'الشحنة '+M('q'),fig:()=>iWireEx({I:'I = 2 A',t:'t = 4 s'}),figSay:'لنرسم الموصل والتيار المار فيه.',law:'q = I·t',sub:'q = 2 × 4',calc:'q = 8 C',ans:'q = 8 C'}),
  tr2:trCard('تمرين ٢ · ورقة العمل · سؤال ٣ (صفحة 128)','والتمرين الثاني، تكملة للسؤال نفسه.',{q:'شحنة مقدارها '+M('8 C')+'. كم إلكترونا تحتوي؟',g:['q = 8 C','e = 1.6 × 10⁻¹⁹ C'],r:'عدد الإلكترونات '+M('n'),law:'n = q / e',sub:'n = 8 / (1.6 × 10⁻¹⁹)',calc:'n = 5 × 10¹⁹',ans:'n = 5 × 10¹⁹ إلكترون'}),
  tr3:trCard('تمرين ٣ · ورقة العمل · سؤال ٤ (صفحة 128)','والتمرين الثالث، من ورقة العمل، السؤال الرابع، صَفْحَةِ 128.',{q:'موصل مساحة مقطعه الدائري '+M('8 × 10⁻⁷ m²')+' يمر فيه تيار '+M('5.2 × 10⁻³ A')+'. أوجد كثافة التيار.',g:['A = 8 × 10⁻⁷ m²','I = 5.2 × 10⁻³ A'],r:'كثافة التيار '+M('J'),fig:()=>iWireEx({I:'I = 5.2 mA',A:'A = 8 × 10⁻⁷ m²'}),figSay:'لنرسم الموصل ومقطعه.',law:'J = I / A',sub:'J = 5.2 × 10⁻³ / (8 × 10⁻⁷)',calc:'J = 6500 A/m²',ans:'J = 6500 A/m²'})
};
PFIG['4-1']=[[/0\.5 A.*دقيقة/,()=>iWireEx({I:'I = 0.5 A',t:'t = 60 s',res:'q = 30 C'}),'q = I·t = 30 C، وعدد الإلكترونات n ≈ 1.9 × 10²⁰'],
  [/1\.5 mm²/,()=>iWireEx({I:'I = 3 A',A:'A = 1.5 mm²',res:'J = 2 × 10⁶ A/m²'}),'J = I / A = 2 × 10⁶ A/m²'],
  [/(سلك|موصل).*الفضة|فضة/,()=>iWireEx({I:'I = 1 A',A:'A = 0.785 mm²',n:'n = 5.8 × 10²⁸',res:'v_d ≈ 1.37 × 10⁻⁴ m/s'}),'v_d = J / (n·e) ≈ 1.37 × 10⁻⁴ m/s'],
  [/q\s*=?\s*10 C|10 C.*60 s/,()=>iWireEx({q:'q = 10 C',t:'t = 60 s',res:'I ≈ 0.17 A'}),'I = q / t ≈ 0.17 A'],
  [/2 A.*4 s|4 s.*2 A/,()=>iWireEx({I:'I = 2 A',t:'t = 4 s',res:'q = 8 C'}),'q = I·t = 8 C'],
  [/8 C/,()=>iWireEx({q:'q = 8 C',res:'n = 5 × 10¹⁹'}),'n = q / e = 5 × 10¹⁹'],
  [/5 C.*4 s|4 s.*5 C/,()=>iWireEx({q:'q = 5 C',t:'t = 4 s',res:'I = 1.25 A'}),'I = q / t = 1.25 A'],
  [/2\.5 mm²|1\.25 A/,()=>iWireEx({I:'I = 1.25 A',A:'A = 2.5 mm²',res:'J = 5 × 10⁵ A/m²'}),'J = I / A = 5 × 10⁵ A/m²'],
  [/8 × 10⁻⁷/,()=>iWireEx({I:'I = 5.2 mA',A:'A = 8 × 10⁻⁷ m²',res:'J = 6500 A/m²'}),'J = I / A = 6500 A/m²'],
  [/0\.785/,()=>iWireEx({I:'I = 1 A',A:'A = 0.785 mm²',res:'J ≈ 1.27 × 10⁶ A/m²'}),'J = I / A ≈ 1.27 × 10⁶ A/m²']];
/* ===== المدرب 2 نوفمبر (أ): مشاهد واقعية شبه ثلاثية الأبعاد للوحدة الخامسة (4-1 و4-5) ===== */
const RLD=`<linearGradient id="kc-cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c2d12"/><stop offset=".2" stop-color="#d97706"/><stop offset=".33" stop-color="#fde68a"/><stop offset=".48" stop-color="#ea8a3a"/><stop offset=".8" stop-color="#9a3412"/><stop offset="1" stop-color="#431407"/></linearGradient>
<radialGradient id="kc-cuE" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fde68a"/><stop offset=".7" stop-color="#d97706"/><stop offset="1" stop-color="#7c2d12"/></radialGradient>
<linearGradient id="kr-cuIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2410" stop-opacity=".9"/><stop offset=".5" stop-color="#b45309" stop-opacity=".35"/><stop offset="1" stop-color="#3b1406" stop-opacity=".9"/></linearGradient>
<linearGradient id="kr-pvc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f1d1d"/><stop offset=".22" stop-color="#ef4444"/><stop offset=".35" stop-color="#fca5a5"/><stop offset=".5" stop-color="#dc2626"/><stop offset="1" stop-color="#450a0a"/></linearGradient>
<radialGradient id="kr-ion" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff7ed"/><stop offset=".35" stop-color="#f59e0b"/><stop offset="1" stop-color="#7c2d12"/></radialGradient>
<radialGradient id="kr-el" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#7dd3fc"/><stop offset=".75" stop-color="#2563eb"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>
<radialGradient id="kr-glow" r=".5"><stop offset="0" stop-color="#60a5fa" stop-opacity=".55"/><stop offset="1" stop-color="#60a5fa" stop-opacity="0"/></radialGradient>
<linearGradient id="kr-met" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset=".3" stop-color="#f1f5f9"/><stop offset=".6" stop-color="#94a3b8"/><stop offset="1" stop-color="#334155"/></linearGradient>
<linearGradient id="kr-bat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset=".3" stop-color="#475569"/><stop offset=".45" stop-color="#1e293b"/><stop offset="1" stop-color="#020617"/></linearGradient>
<linearGradient id="kr-batC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c2d12"/><stop offset=".3" stop-color="#fbbf24"/><stop offset=".5" stop-color="#d97706"/><stop offset="1" stop-color="#451a03"/></linearGradient>
<linearGradient id="kr-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset=".74" stop-color="#e2e8f0"/><stop offset=".74" stop-color="#d6c3a5"/><stop offset="1" stop-color="#b39672"/></linearGradient>
<linearGradient id="kc-rB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8865a"/><stop offset=".28" stop-color="#f5deb3"/><stop offset=".55" stop-color="#d8b98a"/><stop offset="1" stop-color="#7a5a32"/></linearGradient>
<radialGradient id="kr-glass" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fffbeb"/><stop offset=".45" stop-color="#fef3c7" stop-opacity=".9"/><stop offset="1" stop-color="#fbbf24" stop-opacity=".55"/></radialGradient>
<radialGradient id="kr-halo" r=".5"><stop offset="0" stop-color="#fde047" stop-opacity=".75"/><stop offset="1" stop-color="#fde047" stop-opacity="0"/></radialGradient>
<radialGradient id="kr-heat" r=".5"><stop offset="0" stop-color="#f97316" stop-opacity=".7"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/></radialGradient>
<linearGradient id="kr-mB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#475569"/><stop offset=".15" stop-color="#1f2937"/><stop offset="1" stop-color="#030712"/></linearGradient>
<linearGradient id="kr-mF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient>
<linearGradient id="kr-swP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f8fafc"/><stop offset="1" stop-color="#e2e8f0"/></linearGradient>
<linearGradient id="kr-tvS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d4ed8"/><stop offset=".6" stop-color="#60a5fa"/><stop offset="1" stop-color="#bae6fd"/></linearGradient><linearGradient id="kr-fanB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset="1" stop-color="#2563eb"/></linearGradient>
<filter id="kr-sh" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="6"/></filter>`;
let RID=0;
const bgR=(W,H)=>`<rect width="${W}" height="${H}" fill="url(#kr-bg)"/>`;
const shR=(cx,cy,rx)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="9" fill="#000" opacity=".26" filter="url(#kr-sh)"/>`;
/* أسطوانة نحاس مكشوفة */
function cuWire(x0,x1,y,r){return `<rect x="${x0}" y="${f1(y-r)}" width="${x1-x0}" height="${f1(2*r)}" fill="url(#kc-cu)"/><rect x="${x0}" y="${f1(y-r*.58)}" width="${x1-x0}" height="${f1(Math.max(2,r*.14))}" rx="2" fill="#fff" opacity=".42"/>`}
const cuEnd=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${f1(Math.max(4,r*.3))}" ry="${r}" fill="url(#kc-cuE)" stroke="#7c2d12" stroke-width="1"/>`;
/* عازل بلاستيكي حول السلك */
const pvcR=(x0,x1,y,R)=>`<rect x="${x0}" y="${y-R}" width="${x1-x0}" height="${2*R}" fill="url(#kr-pvc)"/><rect x="${x0}" y="${f1(y-R*.62)}" width="${x1-x0}" height="6" rx="3" fill="#fff" opacity=".35"/>`;
const pvcEnd=(x,y,R,r)=>`<ellipse cx="${x}" cy="${y}" rx="${f1(R*.3)}" ry="${R}" fill="#b91c1c" stroke="#7f1d1d"/><ellipse cx="${x}" cy="${y}" rx="${f1(r*.3)}" ry="${r}" fill="url(#kc-cuE)"/>`;
/* إلكترون حر متوهج */
const elR=(x,y,s)=>{s=s||5.5;return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(s*2.3)}" fill="url(#kr-glow)"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${s}" fill="url(#kr-el)"/>`};
/* أيونات النحاس تهتز في أماكنها */
function ionsR(x0,x1,ys,gap,s){let g='';ys.forEach((yy,j)=>{for(let x=x0+gap/2+(j%2)*gap/2,i=0;x<x1;x+=gap,i++)g+=`<circle cx="${f1(x)}" cy="${yy}" r="${s||9}" fill="url(#kr-ion)"><animateTransform attributeName="transform" type="translate" values="0 0;1.6 -1;-1.2 1.4;0 0" dur="${(.45+((i+j)%3)*.13).toFixed(2)}s" repeatCount="indefinite"/></circle>`});return g}
/* إلكترونات تنجرف داخل السلك: dir = −1 لليسار */
function eFlow(x0,x1,ys,P,dur,dir,r){let g='';const n=Math.ceil((x1-x0)/P)+2;ys.forEach((y,j)=>{let s='';for(let i=-1;i<n;i++){const x=x0+i*P+(j%3)*P/3;if(x<x0-P||x>x1+P)continue;s+=elR(x,y,(r||7)*.75)}
  g+=`<g><animateTransform attributeName="transform" type="translate" from="0 0" to="${dir*P} 0" dur="${(dur*(1+j*.12)).toFixed(2)}s" repeatCount="indefinite"/>${s}</g>`});
  const id='kr-c'+(++RID);const ys0=Math.min(...ys)-(r||7)*2,ys1=Math.max(...ys)+(r||7)*2;
  return `<clipPath id="${id}"><rect x="${x0-2}" y="${ys0}" width="${x1-x0+4}" height="${ys1-ys0}"/></clipPath><g clip-path="url(#${id})">${g}</g>`}
/* سلك معزول بمقطع مكشوف يظهر النحاس والأيونات والإلكترونات */
function cableCut(x0,x1,y,R,r,c0,c1,o){o=o||{};let b=shR((x0+x1)/2,y+R+20,(x1-x0)/2);
  b+=pvcR(x0,c0,y,R)+pvcR(c1,x1,y,R)+`<rect x="${c0}" y="${y-r}" width="${c1-c0}" height="${2*r}" fill="url(#kc-cu)"/><rect x="${c0}" y="${y-r}" width="${c1-c0}" height="${2*r}" fill="url(#kr-cuIn)"/>`;
  const id='kr-c'+(++RID);b+=`<clipPath id="${id}"><rect x="${c0}" y="${y-r}" width="${c1-c0}" height="${2*r}"/></clipPath><g clip-path="url(#${id})">${ionsR(c0,c1,[y-r*.5,y+r*.5],38,r*.3)}</g>`;
  if(o.flow!==false)b+=o.flowWrap?o.flowWrap(eFlow(c0,c1,[y,y-r*.75,y+r*.72],46,2.2,-1,7)):eFlow(c0,c1,[y,y-r*.75,y+r*.72],46,2.2,-1,7);
  b+=`<rect x="${c0}" y="${f1(y-r*.6)}" width="${c1-c0}" height="5" rx="2" fill="#fff" opacity=".42"/>`;
  b+=pvcEnd(c0,y,R,r)+pvcEnd(c1,y,R,r)+pvcEnd(x1,y,R,r);
  b+=`<rect x="${x0-34}" y="${y-14}" width="40" height="28" rx="5" fill="url(#kr-met)" stroke="#334155"/><ellipse cx="${x0}" cy="${y}" rx="${f1(R*.3)}" ry="${R}" fill="#b91c1c" stroke="#7f1d1d"/>`;
  return b}
const termR=(x,y,s)=>s==='+'?`<circle cx="${x}" cy="${y}" r="17" fill="#dc2626" stroke="#7f1d1d" stroke-width="2"/><text x="${x}" y="${y+8}" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">+</text>`:`<circle cx="${x}" cy="${y}" r="17" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="2"/><text x="${x}" y="${y+8}" text-anchor="middle" font-size="26" font-weight="900" fill="#fff">−</text>`;
const legR=(x,y)=>`<g font-size="13" font-weight="700" fill="#334155"><circle cx="${x}" cy="${y}" r="8" fill="url(#kr-ion)"/><text x="${x-14}" y="${y+5}" text-anchor="start">أيونات النحاس</text>${elR(x-130,y,5.5)}<text x="${x-144}" y="${y+5}" text-anchor="start">إلكترونات حرة</text></g>`;
/* أسلاك الدائرة: كابل أسود لامع */
const cabR=d=>`<path d="${d}" fill="none" stroke="#000" stroke-opacity=".2" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" transform="translate(2 3)"/><path d="${d}" fill="none" stroke="#111827" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#9ca3af" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" transform="translate(-1 -1.6)"/>`;
const nodeR=(x,y)=>`<circle cx="${x}" cy="${y}" r="6.5" fill="url(#kr-met)" stroke="#334155"/>`;
/* بطارية أسطوانية واقعية أفقية، القطب الموجب يمينا ما لم تعكس */
function batR(x,y,flip){const w=118,h=44;let s=`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="9" fill="url(#kr-bat)" stroke="#020617"/><rect x="${x+w/2-40}" y="${y-h/2}" width="40" height="${h}" rx="9" fill="url(#kr-batC)"/><rect x="${x+w/2-40}" y="${y-h/2}" width="12" height="${h}" fill="url(#kr-batC)"/>`;
  s+=`<rect x="${x+w/2}" y="${y-9}" width="8" height="18" rx="2" fill="url(#kr-met)" stroke="#334155"/><rect x="${x-w/2-4}" y="${y-15}" width="5" height="30" rx="2" fill="url(#kr-met)" stroke="#334155"/>`;
  s+=`<text x="${x+w/2-20}" y="${y+8}" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">+</text><text x="${x-w/2+20}" y="${y+8}" text-anchor="middle" font-size="24" font-weight="900" fill="#e2e8f0">−</text><text x="${x-6}" y="${y+5}" text-anchor="middle" font-size="12" font-weight="800" fill="#fbbf24" direction="ltr">1.5 V</text>`;
  return flip?`<g transform="translate(${2*x} 0) scale(-1 1)">${s.replace(/<text[^>]*>[^<]*<\/text>/g,'')}</g><text x="${x-w/2+20}" y="${y+8}" text-anchor="middle" font-size="22" font-weight="900" fill="#fff">+</text><text x="${x+w/2-20}" y="${y+8}" text-anchor="middle" font-size="24" font-weight="900" fill="#e2e8f0">−</text>`:s}
/* جهاز قياس تماثلي واقعي (أميتر A أو فولتميتر V) */
function meterR(x,y,t,c){let s=`<rect x="${x-34}" y="${y-30}" width="68" height="60" rx="11" fill="url(#kr-mB)" stroke="${c}" stroke-width="3"/><rect x="${x-26}" y="${y-23}" width="52" height="30" rx="5" fill="url(#kr-mF)"/>`;
  for(let i=0;i<=8;i++){const a=(-60+i*15)*Math.PI/180;s+=`<line x1="${f1(x+Math.sin(a)*19)}" y1="${f1(y+4-Math.cos(a)*19)}" x2="${f1(x+Math.sin(a)*(i%2?16:14))}" y2="${f1(y+4-Math.cos(a)*(i%2?16:14))}" stroke="#334155" stroke-width="1.3"/>`}
  s+=`<g><animateTransform attributeName="transform" type="rotate" values="-8 ${x} ${y+4};14 ${x} ${y+4};8 ${x} ${y+4};14 ${x} ${y+4}" dur="3s" repeatCount="indefinite"/><line x1="${x}" y1="${y+4}" x2="${x}" y2="${y-15}" stroke="#dc2626" stroke-width="2"/></g><circle cx="${x}" cy="${y+4}" r="3" fill="#111827"/>`;
  return s+`<text x="${x}" y="${y+25}" text-anchor="middle" font-size="15" font-weight="900" fill="${c==='#2563eb'?'#93c5fd':'#fca5a5'}">${t}</text>`}
const mtr=(x,y,t,c)=>meterR(x,y,t,c);
/* مقاومة كربونية واقعية بحلقات ألوان وأطراف معدنية */
function res3(x,y,w,glow){const h=w*.34;const ld=Math.max(5,w*.06);let s=`<line x1="${f1(x-w/2-ld)}" y1="${y}" x2="${f1(x+w/2+ld)}" y2="${y}" stroke="#cbd5e1" stroke-width="4.5"/><line x1="${f1(x-w/2-ld)}" y1="${y-1}" x2="${f1(x+w/2+ld)}" y2="${y-1}" stroke="#fff" stroke-width="1.2" opacity=".8"/>`;
  if(glow)s+=`<ellipse cx="${x}" cy="${y}" rx="${w*.75}" ry="${h*1.4}" fill="url(#kr-heat)" opacity="0"><animate attributeName="opacity" values="0;.9;0" dur="2s" repeatCount="indefinite"/></ellipse>`;
  s+=`<rect x="${x-w/2}" y="${y-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="url(#kc-rB)" stroke="#6b4a22" stroke-width="1.2"/>`;
  [['#a16207',.22],['#111827',.36],['#dc2626',.5],['#d4af37',.78]].forEach(([c,f])=>{s+=`<rect x="${f1(x-w/2+w*f-w*.025)}" y="${f1(y-h/2+1)}" width="${f1(w*.05)}" height="${f1(h-2)}" fill="${c}"/><rect x="${f1(x-w/2+w*f-w*.025)}" y="${f1(y-h/2+1)}" width="${f1(w*.05)}" height="${f1(h-2)}" fill="url(#kr-cuIn)" opacity=".35"/>`});
  return s+`<rect x="${x-w/2+h*.4}" y="${f1(y-h*.32)}" width="${f1(w-h*.8)}" height="${f1(h*.14)}" rx="3" fill="#fff" opacity=".45"/>`}
/* رمز مقاومة: صار مقاومة واقعية صغيرة */
function resSym(x,y,lab,val){return `<rect x="${x-42}" y="${y-14}" width="84" height="28" fill="none"/>`+res3(x,y,62)+(lab?lbl(x,y-24,lab,'#92400e',16):'')+(val?lbl(x,y+34,val,'#0369a1',14):'')}
/* مصباح واقعي يتوهج، قاعدته على السلك عند (x,y) */
function bulbR(x,y,on){let s='';if(on!==false)s+=`<circle cx="${x}" cy="${y-38}" r="56" fill="url(#kr-halo)"><animate attributeName="r" values="48;62;48" dur="1.8s" repeatCount="indefinite"/></circle>`;
  s+=`<path d="M${x-13},${y-8} C${x-13},${y-20} ${x-30},${y-28} ${x-30},${y-46} A30,30 0 1 1 ${x+30},${y-46} C${x+30},${y-28} ${x+13},${y-20} ${x+13},${y-8} Z" fill="url(#kr-glass)" stroke="#d97706" stroke-width="1.4"/>`;
  s+=`<path d="M${x-6},${y-10} L${x-8},${y-40} M${x+6},${y-10} L${x+8},${y-40}" stroke="#78716c" stroke-width="1.5"/><path d="M${x-8},${y-40} q4,-8 8,0 q4,8 8,0" fill="none" stroke="#f97316" stroke-width="2.6"/>`;
  s+=`<ellipse cx="${x-12}" cy="${y-56}" rx="6" ry="11" fill="#fff" opacity=".65"/>`;
  s+=`<rect x="${x-14}" y="${y-10}" width="28" height="20" rx="3" fill="url(#kr-met)" stroke="#475569"/>`;
  for(let i=0;i<3;i++)s+=`<line x1="${x-14}" y1="${y-5+i*6}" x2="${x+14}" y2="${y-3+i*6}" stroke="#475569" stroke-width="1.2"/>`;
  return s+`<path d="M${x-6},${y+10} h12 l-3,6 h-6z" fill="#1f2937"/>`}

/* 1) التيار: سيل من الشحنات يتحرك بانتظام (متحرك 12 ث) */
function iFlowScene(){const W=640,H=330,D=12,y=170;let b=bgR(W,H);
  b+=cableCut(110,530,y,40,27,205,435,{flowWrap:f=>scShow(D,1,D,f,true)});
  b+=termR(58,y,'+')+termR(582,y,'−');
  b+=scShow(D,4.5,D-.1,iArr(245,y-72,150,'#dc2626','التيار الاصطلاحي I'),true);
  b+=scShow(D,8,D-.1,iArrL(395,y+66,150,'#2563eb','حركة الإلكترونات e⁻'),true);
  b+=legR(612,306);
  b+=scCap(D,W,'1. سيل من الشحنات يتحرك بانتظام في اتجاه معين','#475569',0,4.5)+scCap(D,W,'2. الاتجاه الاصطلاحي: من الموجب إلى السالب','#b91c1c',4.5,8)+scCap(D,W,'3. الإلكترونات تتحرك في الاتجاه المعاكس','#1d4ed8',8,D);
  return svg(W,H,b,'kScene')}
/* 2) شدة التيار: الشحنة المارة عبر المقطع في زمن معين (متحرك 12 ث) */
function iCountScene(){const W=640,H=330,D=12,y=160,xs=320;let b=bgR(W,H);
  b+=cableCut(90,550,y,44,30,170,470);
  b+=`<ellipse cx="${xs}" cy="${y}" rx="14" ry="38" fill="#facc15" opacity=".5" stroke="#ca8a04" stroke-width="2.5" stroke-dasharray="6 4"><animate attributeName="opacity" values=".35;.65;.35" dur="1.6s" repeatCount="indefinite"/></ellipse>`;
  b+=lblR(xs,y-52,'مقطع السلك','#a16207',15)+termR(44,y,'+')+termR(596,y,'−');
  b+=scShow(D,2.5,D-.1,`<g>${scTag(160,262,'الشحنة q','#b45309',110)}${scTag(480,262,'الزمن t','#0369a1',100)}</g>`,true);
  b+=scShow(D,6,D-.1,`<g>${scTag(W/2,300,'I = q / t','#7e22ce',150)}</g>`,true);
  b+=scCap(D,W,'1. نعد الشحنة التي تعبر مقطع السلك','#475569',0,2.5)+scCap(D,W,'2. خلال زمن معين t','#0369a1',2.5,6)+scCap(D,W,'3. شدة التيار: الشحنة المارة في كل ثانية','#7e22ce',6,D);
  return svg(W,H,b,'kScene')}
/* 3) اتجاه التيار في دائرة: الاصطلاحي والحقيقي */
function iDirFig(){const W=640,H=320,L=150,R=490,T=80,Bt=240;let b=bgR(W,H);
  b+=shR(W/2,Bt+34,190)+cabR(`M${W/2-66},${Bt} H${L} V${T} H${R} V${Bt} H${W/2+68}`)+batR(W/2,Bt,true)+res3(W/2,T,70);
  b+=iArr(L+18,T-30,110,'#dc2626','I')+arrA(R+26,T+40,90,110,'#dc2626',9)+iArrL(W/2+40,Bt+40,90,'#dc2626')+arrA(L-26,Bt-40,-90,110,'#dc2626',9);
  b+=iArrL(L+150,T+34,110,'#2563eb','e⁻');
  b+=`<g>${tagR(W/2,302,'الاصطلاحي: من + إلى − خارج المصدر · الإلكترونات بالعكس','#334155',470)}</g>`;
  return svg(W,H,b,'kAuto')}
/* 4) كثافة التيار: نفس التيار في مقطعين مختلفين */
function iDensFig(){const W=640,H=330,y=160;let b=bgR(W,H)+shR(320,y+70,280);
  b+=cuWire(40,300,y,54)+`<path d="M300,${y-54} C340,${y-54} 340,${y-24} 380,${y-24} L380,${y+24} C340,${y+24} 340,${y+54} 300,${y+54} Z" fill="url(#kc-cu)"/>`+cuWire(380,600,y,24);
  b+=eFlow(56,300,[y-30,y,y+30],62,3.2,-1,7)+eFlow(380,596,[y-8,y+8],30,1.1,-1,6)+cuEnd(600,y,24)+cuEnd(40,y,54);
  b+=`<g>${tagR(170,52,'مقطع كبير A₁: كثافة أقل','#0369a1',210)}${tagR(490,98,'مقطع صغير A₂: كثافة أكبر','#b91c1c',210)}</g>`;
  b+=`<g>${scTag(W/2,280,'J = I / A','#7e22ce',140)}</g>`+lblR(W/2,314,'التيار I نفسه يمر في الجزأين','#334155',14);
  return svg(W,H,b,'kAuto')}
/* 5) سرعة الانجراف: إلكترون يتصادم مع أيونات الموصل وينجرف ببطء عكس المجال (متحرك 12 ث) */
function iDriftScene(){const W=640,H=330,D=12,x0=50,x1=590,y=170,r=86;let b=bgR(W,H)+shR(320,y+r+18,280);
  b+=cuWire(x0,x1,y,r)+`<rect x="${x0}" y="${y-r}" width="${x1-x0}" height="${2*r}" fill="url(#kr-cuIn)"/>`;
  for(let i=0;i<9;i++)for(let j=0;j<3;j++){const x=x0+40+i*62+(j%2)*31,yy=y-50+j*50;if(x>x1-24)continue;b+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;1.8 -1.2;-1.4 1.5;0 0" dur="${(.45+((i+j)%3)*.13).toFixed(2)}s" repeatCount="indefinite"/><circle cx="${x}" cy="${yy}" r="13" fill="url(#kr-ion)"/><text x="${x}" y="${yy+5}" text-anchor="middle" font-size="14" font-weight="900" fill="#7c2d12">+</text></g>`}
  b+=cuEnd(x1,y,r)+cuEnd(x0,y,r);
  const P=[[0,540,170],[1.2,480,130],[2.2,500,200],[3.4,420,150],[4.6,440,215],[5.8,350,125],[7,370,190],[8.2,290,145],[9.4,300,210],[10.6,230,160],[D-.2,230,160]];
  let d='M'+P.map(p=>p[1]+','+p[2]).join(' L');b+=scShow(D,.5,D-.1,`<path d="${d}" fill="none" stroke="#e0f2fe" stroke-width="2.2" stroke-dasharray="5 4" opacity=".9"/>`,true);
  b+=scMove(D,P.map(p=>[p[0],p[1],p[2]]),elR(0,0,8));
  b+=scShow(D,3,D-.1,arrA(590,y-r-24,180,120,'#0f766e',10)+lblR(410,y-r-18,'المجال E','#0f766e',16),true);
  b+=scShow(D,7,D-.1,`<g>${scTag(W/2,y+r+34,'v_d = J / (n·e)','#7e22ce',170)}</g>`,true);
  b+=scCap(D,W,'1. الإلكترون يتصادم باستمرار مع ذرات الموصل','#475569',0,3)+scCap(D,W,'2. المجال يدفعه في الاتجاه المعاكس له','#0f766e',3,7)+scCap(D,W,'3. سرعة الانجراف صغيرة جدا','#7e22ce',7,D);
  return svg(W,H,b,'kScene')}
/* مقبس كهرباء جداري واقعي */
const sockR=(x,y)=>`<rect x="${x-30}" y="${y-30}" width="60" height="60" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/><rect x="${x-24}" y="${y-24}" width="48" height="48" rx="8" fill="#e2e8f0" stroke="#cbd5e1"/><rect x="${x-13}" y="${y-12}" width="6" height="14" rx="2" fill="#1f2937"/><rect x="${x+7}" y="${y-12}" width="6" height="14" rx="2" fill="#1f2937"/><circle cx="${x}" cy="${y+10}" r="3.5" fill="#1f2937"/>`;
/* 6) التيار المستمر والمتردد: رسمان للتيار مع الزمن ومصدر كل منهما */
function iDcAcFig(){const W=640,H=320;let b=bgR(W,H);
  b+=`<rect x="22" y="20" width="286" height="248" rx="14" fill="#fff" opacity=".85" stroke="#cbd5e1"/><rect x="332" y="20" width="286" height="248" rx="14" fill="#fff" opacity=".85" stroke="#cbd5e1"/>`;
  const ax=(x0,y0,w,h)=>`<line x1="${x0}" y1="${y0}" x2="${x0+w}" y2="${y0}" stroke="#334155" stroke-width="2"/><line x1="${x0}" y1="${y0+h/2}" x2="${x0}" y2="${y0-h/2}" stroke="#334155" stroke-width="2"/>`+lbl(x0+w+4,y0+18,'t','#334155',15)+lbl(x0-14,y0-h/2+6,'I','#334155',15);
  b+=`<g transform="translate(165 58) scale(.62)">${batR(0,0)}</g>`+sockR(475,58);
  b+=ax(44,190,250,130)+`<line x1="44" y1="150" x2="290" y2="150" stroke="#dc2626" stroke-width="4"/>`;
  let p='M354,190';for(let i=0;i<=100;i++){const x=354+i*2.4,yy=190-50*Math.sin(i/100*4*Math.PI);p+=` L${f1(x)},${f1(yy)}`}
  b+=ax(354,190,250,130)+`<path d="${p}" fill="none" stroke="#2563eb" stroke-width="4"/>`;
  b+=`<g>${tagR(165,296,'مستمر DC: اتجاه واحد ثابت','#b91c1c',230)}${tagR(475,296,'متردد AC: يتغير اتجاهه دوريا','#1d4ed8',250)}</g>`;
  return svg(W,H,b,'kAuto')}
/* رسم المسائل: سلك بمقطع مكشوف وبيانات */
function iWireEx(o){const W=640,H=300,y=140;let b=bgR(W,H);
  b+=cableCut(120,520,y,40,27,190,450);
  b+=`<ellipse cx="320" cy="${y}" rx="12" ry="34" fill="#facc15" opacity=".45" stroke="#ca8a04" stroke-width="2.2" stroke-dasharray="6 4"/>`;
  b+=iArr(230,y-66,140,'#dc2626','I')+termR(70,y,'+')+termR(570,y,'−');
  const tg=[o.I,o.q,o.t,o.A,o.n].filter(Boolean);tg.forEach((t,i)=>{b+=`<g>${scTag(120+i*(400/Math.max(1,tg.length-1||1)),252,t,['#b91c1c','#b45309','#0369a1','#0f766e','#7e22ce'][i%5],t.length*9+26)}</g>`});
  if(o.res)b+=pill(500,40,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls)}
/* 4-5 (1) المقاومة: الإلكترونات تتصادم داخل المقاومة فتسخن (متحرك 10 ث) */
function rHeatScene(){const W=640,H=330,D=10,y=165;let b=bgR(W,H)+shR(320,y+40,260);
  b+=pvcR(30,200,y,15)+pvcR(440,610,y,15)+pvcEnd(200,y,15,6)+pvcEnd(440,y,15,6)+`<rect x="196" y="${y-6}" width="34" height="12" fill="url(#kc-cu)"/><rect x="410" y="${y-6}" width="34" height="12" fill="url(#kc-cu)"/>`;
  b+=res3(W/2,y,190,true);
  for(let i=0;i<4;i++){const x=250+i*46;b+=`<path d="M${x},${y-42} q-8,-12 0,-24 q8,-12 0,-24" fill="none" stroke="#f97316" stroke-width="3" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;.8;0" dur="2s" begin="${(i*.4).toFixed(1)}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 6;0 -8" dur="2s" begin="${(i*.4).toFixed(1)}s" repeatCount="indefinite"/></path>`}
  b+=scShow(D,2,D-.1,`<g>${tagR(W/2,y-96,'ممانعة لمرور التيار','#b45309',180)}</g>`,true);
  b+=scShow(D,5,D-.1,`<g>${tagR(W/2,y+64,'ترتفع درجة حرارة الموصل','#dc2626',200)}</g>`,true);
  b+=scShow(D,7.5,D-.1,`<g>${scTag(W/2,y+112,'Ω = V / A','#7e22ce',140)}</g>`,true);
  b+=scCap(D,W,'1. التيار يمر في المقاومة','#475569',0,2)+scCap(D,W,'2. المقاومة تمانع حركة الإلكترونات','#b45309',2,5)+scCap(D,W,'3. فترتفع درجة حرارتها','#dc2626',5,D);
  return svg(W,H,b,'kScene')}
/* دائرة واقعية: بطارية ومقاومة وأميتر على التوالي وفولتميتر على التوازي */
function rCirc(o){o=o||{};const W=640,H=340,L=170,R=470,T=120,Bt=280;let b=bgR(W,H)+shR(W/2,Bt+30,180);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${T} H${R} V${Bt-34} M${R},${Bt-34} V${Bt} H${W/2+68}`)+cabR(`M${W/2-90},${T} V${T-56} H${W/2-36} M${W/2+36},${T-56} H${W/2+90} V${T}`);
  b+=`<rect x="${R-40}" y="${168}" width="80" height="70" fill="none"/>`;
  b+=res3(W/2,T,74)+(o.R?lbl(W/2,T+38,o.R,'#0369a1',14):'')+meterR(W/2,T-56,'V','#dc2626')+meterR(R,200,'A','#2563eb')+batR(W/2,Bt,true);
  b+=nodeR(W/2-90,T)+nodeR(W/2+90,T);
  if(o.V)b+=`<g>${scTag(W/2,Bt+40,o.V,'#334155',o.V.length*9+28)}</g>`;if(o.I)b+=`<g>${scTag(R+90,200,o.I,'#1d4ed8',o.I.length*9+28)}</g>`;
  if(o.P)b+=`<g>${scTag(L-80,200,o.P,'#b45309',o.P.length*9+28)}</g>`;
  b+=lblR(W/2,T-96,'فولتميتر على التوازي','#dc2626',13)+lblR(R+80,244,'أميتر على التوالي','#2563eb',13);
  if(o.res)b+=pill(W/2,200,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls||'kAuto')}
/* 4-5 (2) قانون أوم: نضاعف الجهد فيتضاعف التيار، والمنحنى خط مستقيم (متحرك 12 ث) */
function rOhmScene(){const W=640,H=330,D=12,x0=350,y0=290,sx=55,sy=50;let b=bgR(W,H);
  b+=`<rect x="${x0-20}" y="${y0-232}" width="290" height="262" rx="12" fill="#fff" opacity=".88" stroke="#cbd5e1"/>`;
  b+=`<line x1="${x0}" y1="${y0}" x2="${x0+250}" y2="${y0}" stroke="#334155" stroke-width="2.4"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0-220}" stroke="#334155" stroke-width="2.4"/>`+lbl(x0+232,y0+22,'I (A)','#2563eb',15)+lbl(x0+28,y0-212,'V (V)','#dc2626',15);
  const P=[[1,1],[2,2],[3,3],[4,4]];P.forEach(([i,v],k)=>{b+=scShow(D,1+k*2,D-.1,`<circle cx="${x0+i*sx}" cy="${y0-v*sy*.95}" r="7" fill="#dc2626" stroke="#fff" stroke-width="2"/>`,true)});
  b+=scShow(D,9,D-.1,`<line x1="${x0}" y1="${y0}" x2="${x0+4.4*sx}" y2="${y0-4.4*sy*.95}" stroke="#7c3aed" stroke-width="3.5"/>`+lblR(x0+150,y0-196,'الميل = R','#7c3aed',16),true);
  b+=`<g transform="translate(-84 52) scale(.62)">`+rCirc({}).replace(/^<svg[^>]*>|<\/svg>$/g,'').replace(/<rect width="640" height="340"[^>]*\/>/,'')+`</g>`;
  b+=scCap(D,W,'1. نرفع الجهد بين طرفي المقاومة','#475569',0,5)+scCap(D,W,'2. التيار يزيد بالنسبة نفسها','#2563eb',5,9)+scCap(D,W,'3. خط مستقيم ميله المقاومة','#7c3aed',9,D);
  return svg(W,H,b,'kScene')}
/* 4-5 (3) العوامل: سلك طويل رفيع وسلك قصير سميك */
function rFactFig(){const W=640,H=320;let b=bgR(W,H)+shR(320,124,270)+shR(320,256,130);
  b+=cuWire(60,580,100,10)+cuEnd(580,100,10)+cuEnd(60,100,10)+cuWire(200,440,215,30)+cuEnd(440,215,30)+cuEnd(200,215,30);
  b+=`<g>${tagR(320,58,'طويل ورفيع: مقاومة كبيرة','#b91c1c',220)}${tagR(320,280,'قصير وسميك: مقاومة صغيرة','#0f766e',220)}</g>`;
  b+=dim(60,580,130,'L')+`<g>${scTag(555,215,'R = ρ·L / A','#7e22ce',140)}</g>`;
  return svg(W,H,b,'kAuto')}
/* 4-5 (4) القدرة: مصباح واقعي يتوهج */
function rPowFig(o){o=o||{};const W=640,H=300,L=190,R=450,T=110,Bt=226;let b=bgR(W,H)+shR(W/2,Bt+28,160);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${T} H${W/2-14} M${W/2+14},${T} H${R} V${Bt} H${W/2+68}`)+batR(W/2,Bt,true);
  b+=bulbR(W/2,T);
  [o.V,o.I,o.R,o.P].filter(Boolean).forEach((t,i)=>{b+=`<g>${scTag(100+i*146,280,t,['#334155','#1d4ed8','#b45309','#7e22ce'][i],t.length*9+26)}</g>`});
  if(o.res)b+=pill(W/2+150,40,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls||'kAuto')}

function apply41(out){defs();const K2='4-1',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^مقدمة الوحدة وأهدافها$/,()=>[card(K2,'goals')]],[/^وحدات مهمة$/,()=>card(K2,'units')],[/^التيار الكهربائي$/,()=>card(K2,'cur')],[/^شدة التيار$/,()=>card(K2,'inten')],
    [/^الشحنة وعدد الإلكترونات$/,()=>card(K2,'elec')],[/^اتجاه التيار$/,()=>card(K2,'dir')],[/^كثافة التيار J$/,()=>card(K2,'dens')],[/^تحويل المساحة/,()=>null],[/^سرعة الانجراف/,()=>card(K2,'drift')],
    [/^التيار المستمر DC$/,()=>card(K2,'dcac')],[/^التيار المتردد AC$/,()=>null],[/^لماذا AC/,()=>null],[/^مقارنة بين التيار المستمر/,()=>null],[/^رسم توضيحي \d$/,()=>null],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال ١: كثافة التيار في موصل/,()=>card(K2,'ex2')],[/^مثال ٢: حساب التيار ثم كثافته/,()=>card(K2,'ex3')],[/^مثال ١: كثافة التيار وسرعة الانجراف/,()=>card(K2,'ex4')],
    [/^تمرين 1 · ورقة العمل/,()=>card(K2,'tr1')],[/^تمرين 2 · ورقة العمل/,()=>card(K2,'tr2')],[/^تمرين [346] · مثال/,()=>null],[/^تمرين 5 · ورقة العمل/,()=>card(K2,'tr3')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا التَّيَّارَ الْكَهْرَبَائِيَّ، لِنَرَى أَيْنَ نَجِدُهُ فِي حَيَاتِنَا.';return sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

/* ===== الدرس النموذجي 4-5: المقاومة وقانون أوم والقدرة ===== */
/* مقاومة كربونية مجسمة بحلقات ملونة */
/* 1) المقاومة: الإلكترونات تتصادم داخل المقاومة فتسخن (متحرك 10 ث) */
/* دائرة بسيطة: بطارية ومقاومة وأميتر على التوالي وفولتميتر على التوازي */
/* 2) قانون أوم: نضاعف الجهد فيتضاعف التيار، والمنحنى خط مستقيم (متحرك 12 ث) */
/* 3) العوامل: سلك طويل رفيع وسلك قصير سميك */
/* 4) القدرة: مصباح يتوهج */

CARDS['4-5']={
  resist:{title:'المقاومة الكهربائية',sayT:'نبدأ أول موضوعات درسنا: المقاومة الكهربائية.',steps:()=>[
    S(pt(B('المقاومة')+': ممانعة الموصل لمرور التيار، وينتج عنها ارتفاع في درجة حرارته.'),''),
    S(fig(rHeatScene(),'مشهد: المقاومة تمانع مرور التيار فترتفع درجة حرارتها'),'شاهد المشهد: التَّيَّارُ يَمُرُّ فِي الْمُقَاوَمَةِ، فَتُمَانِعُ حَرَكَةَ الْإِلِكْتِرُونَاتِ، وَتَرْتَفِعُ دَرَجَةُ حَرَارَتِهَا.'),
    S(pt('وحدتها الأوم '+M('Ω = V/A')+'، وفائدتها التحكم في شدة التيار وحماية الدوائر الإلكترونية.'),'')]},
  ohm:{title:'قانون أوم',sayT:'وَالْآنَ نَصِلُ إِلَى قَانُونِ أُومْ.',steps:()=>[
    S(pt(B('قانون أوم')+': عند ثبوت درجة الحرارة يتناسب التيار المار في موصل طرديا مع فرق الجهد بين طرفيه.'),''),
    S(fig(rOhmScene(),'مشهد: كلما زاد الجهد زاد التيار، والمنحنى خط مستقيم ميله المقاومة'),'شاهد المشهد: نَرْفَعُ الْجُهْدَ بَيْنَ طَرَفَيِ الْمُقَاوَمَةِ، فَيَزِيدُ التَّيَّارُ بِالنِّسْبَةِ نَفْسِهَا، وَتَقَعُ النِّقَاطُ عَلَى خَطٍّ مُسْتَقِيمٍ مَيْلُهُ الْمُقَاوَمَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('V = I·R')+'</div>'),'وَقَانُونُ أُومْ: `V = I·R`'),{md:'`V = I·R`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('V')+' فرق الجهد، ووحدته الفولت '+M('V')+'<br>'+M('I')+' شدة التيار، ووحدتها الأمبير '+M('A')+'<br>'+M('R')+' المقاومة، ووحدتها الأوم '+M('Ω')+'</div>'},'حيث: `V` فَرْقُ الْجُهْدِ، ووحدته الفولت. و `I` شِدَّةُ التَّيَّارِ، ووحدتها الأمبير. و `R` الْمُقَاوَمَةُ، ووحدتها الأوم.'),
    S(fig(rCirc({}),'نقيس التيار بالأميتر على التوالي، والجهد بالفولتميتر على التوازي'),'لاحظ الرسم: الْأَمِّيتَرُ يُوَصَّلُ عَلَى التَّوَالِي لِيَقِيسَ التَّيَّارَ، وَالْفُولْتْمِيتَرُ يُوَصَّلُ عَلَى التَّوَازِي لِيَقِيسَ الْجُهْدْ.')]},
  fact:{title:'العوامل المؤثرة في المقاومة',sayT:'وَمَا الْعَوَامِلُ الَّتِي تَتَوَقَّفُ عَلَيْهَا الْمُقَاوَمَةُ؟',steps:()=>[
    S(pt('تتوقف المقاومة على: '+B('نوع المادة')+'، و'+B('الطول')+' طرديا، و'+B('مساحة المقطع')+' عكسيا، و'+B('درجة الحرارة')+'.'),''),
    S(fig(rFactFig(),'السلك الطويل الرفيع مقاومته كبيرة، والقصير السميك مقاومته صغيرة'),'لاحظ الرسم: السِّلْكُ الطَّوِيلُ الرَّفِيعُ مُقَاوَمَتُهُ كَبِيرَةٌ، وَالسِّلْكُ الْقَصِيرُ السَّمِيكُ مُقَاوَمَتُهُ صَغِيرَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('R = ρ·L / A')+'</div>'),'والقانون: `R = ρ·L / A`'),{md:'`R = ρ·L / A`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('ρ')+' المقاومة النوعية، ووحدتها '+M('Ω·m')+'، وتعتمد على نوع المادة فقط<br>'+M('L')+' طول الموصل، ووحدته المتر '+M('m')+'<br>'+M('A')+' مساحة المقطع، ووحدتها '+M('m²')+'</div>'},'حيث: `ρ` الْمُقَاوَمَةُ النَّوْعِيَّةُ، ووحدتها أوم متر، وَتَعْتَمِدُ عَلَى نَوْعِ الْمَادَّةِ فَقَطْ. و `L` طُولُ الْمُوَصِّلِ بالمتر. و `A` مِسَاحَةُ الْمَقْطَعِ بالمتر المربع.'),
    S(pt(B('الموصلية')+' '+M('σ = 1/ρ')+'، ووحدتها '+M('(Ω·m)⁻¹')+'.'),'والموصلية مقلوب المقاومة النوعية.')]},
  temp:{title:'أثر درجة الحرارة في المقاومة',sayT:'وَكَيْفَ تُؤَثِّرُ دَرَجَةُ الْحَرَارَةِ فِي مُقَاوَمَةِ الْمُوَصِّلَاتِ؟',steps:()=>[
    S(pt('مقاومة الموصلات '+B('تزيد')+' بارتفاع درجة الحرارة.'),''),
    Object.assign(S(pt('<div class="kLaw">'+M('R = R₀·(1 + α·(T − T₀))')+'</div>'),'والقانون: `R = R₀·(1 + α·(T − T₀))`'),{md:'`R = R₀·(1 + α·(T − T₀))`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('R₀')+' المقاومة عند درجة الحرارة '+M('T₀')+'<br>'+M('α')+' المعامل الحراري للمقاومة، ووحدته '+M('°C⁻¹')+'</div>'},'حيث: `R₀` الْمُقَاوَمَةُ عِنْدَ دَرَجَةِ الْحَرَارَةِ الِابْتِدَائِيَّةِ. و `α` الْمُعَامِلُ الْحَرَارِيُّ لِلْمُقَاوَمَةِ.')]},
  pow:{title:'القدرة الكهربائية',sayT:'ننتقل الآن إلى القدرة الكهربائية.',steps:()=>[
    S(pt(B('القدرة الكهربائية')+': الطاقة المستهلكة في وحدة الزمن، ووحدتها الواط '+M('W = J/s')+'.'),''),
    S(fig(rPowFig({}),'المصباح يحول الطاقة الكهربائية إلى ضوء وحرارة'),'لاحظ الرسم: الْمِصْبَاحُ يُحَوِّلُ الطَّاقَةَ الْكَهْرَبَائِيَّةَ إِلَى ضَوْءٍ وَحَرَارَهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('P = E / t = I·V = I²·R = V² / R')+'</div>'),'وصيغ القدرة: `P = I·V`، و `P = I²·R`، و `P = V² / R`'),{md:'`P = I·V`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('P')+' القدرة، ووحدتها الواط '+M('W')+'<br>'+M('E')+' الطاقة، ووحدتها الجول '+M('J')+'<br>'+M('t')+' الزمن، ووحدته الثانية '+M('s')+'</div>'},'حيث: `P` الْقُدْرَةُ بالواط. و `E` الطَّاقَةُ بالجول. و `t` الزَّمَنُ بالثانية.')]},
  ex1:{title:'مثال ١ · صفحة 124',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 124.',steps:()=>[
    S(q('فرق الجهد بين طرفي سخان كهربائي '+M('120 V')+' وشدة التيار المار فيه '+M('8 A')+'. احسب مقاومة السخان.','المثال · صفحة 124'),''),
    S(gr(['V = 120 V','I = 8 A'],'المقاومة '+M('R')),''),
    S(fig(rCirc({V:'V = 120 V',I:'I = 8 A',res:'R = 15 Ω'})),'لنرسم دائرة السخان.'),
    S(st(1,'القانون: '+M('V = I·R')),'القانون: `V = I·R`'),S(st(2,'التعويض: '+M('120 = 8 × R')),'نعوض: `120 = 8 × R`'),
    S(st(3,'الحساب: '+M('R = 120 / 8 = 15 Ω')+'<span class="kDirOn"></span>'),'نقسم مئة وعشرين على ثمانية، فتكون المقاومة خمسة عشر أوم.'),S(res(M('R = 15 Ω')),'')]},
  ex2:{title:'مثال ٢ · صفحة 124',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 124.',steps:()=>[
    S(q('أوجد شدة التيار المار في مقاومة '+M('10 Ω')+' وفرق الجهد بين طرفيها '+M('220 V')+'.','المثال · صفحة 124'),''),
    S(gr(['R = 10 Ω','V = 220 V'],'شدة التيار '+M('I')),''),
    S(fig(rCirc({V:'V = 220 V',R:'10 Ω',res:'I = 22 A'})),'لنرسم الدائرة.'),
    S(st(1,'القانون: '+M('I = V / R')),'من قانون أوم: `I = V / R`'),S(st(2,'التعويض: '+M('I = 220 / 10')),'نعوض: `I = 220 / 10`'),
    S(st(3,'الحساب: '+M('I = 22 A')+'<span class="kDirOn"></span>'),'فتكون شدة التيار اثنين وعشرين أمبير.'),S(res(M('I = 22 A')),'')]},
  ex3:{title:'مثال ٣ · صفحة 124',sayT:'والمثال الثالث، مِنْ صَفْحَةِ 124.',steps:()=>[
    S(q('أوجد مقاومة سلك من النحاس طوله '+M('1 m')+' ومساحة مقطعه '+M('1.96 × 10⁻⁵ m²')+'، ومقاومية النحاس '+M('1.77 × 10⁻⁸ Ω·m')+'.','المثال · صفحة 124'),''),
    S(gr(['L = 1 m','A = 1.96 × 10⁻⁵ m²','ρ = 1.77 × 10⁻⁸ Ω·m'],'المقاومة '+M('R')),''),
    S(fig(rFactFig()),'لنتذكر العلاقة بين المقاومة وأبعاد السلك.'),
    S(st(1,'القانون: '+M('R = ρ·L / A')),'القانون: `R = ρ·L / A`'),S(st(2,'التعويض: '+M('R = 1.77 × 10⁻⁸ × 1 / 1.96 × 10⁻⁵')),'نعوض بالقيم.'),
    S(st(3,'الحساب: '+M('R ≈ 9.03 × 10⁻⁴ Ω')+'<span class="kDirOn"></span>'),'فتكون المقاومة تسعة فاصلة صفر ثلاثة في عشرة أس سالب أربعة أوم تقريبا.'),S(res(M('R ≈ 9.03 × 10⁻⁴ Ω')),'')]},
  ex4:{title:'مثال ٤ · صفحة 124',sayT:'والمثال الرابع، مِنْ صَفْحَةِ 124.',steps:()=>[
    S(q('مقاومة سلك من النحاس عند '+M('20 °C')+' تساوي '+M('18 Ω')+'. ما مقاومته عند '+M('60 °C')+' إذا كان المعامل الحراري '+M('3.9 × 10⁻³ °C⁻¹')+'؟','المثال · صفحة 124'),''),
    S(gr(['R₀ = 18 Ω','T₀ = 20 °C','T = 60 °C','α = 3.9 × 10⁻³ °C⁻¹'],'المقاومة '+M('R')+' عند '+M('60 °C')),''),
    S(st(1,'القانون: '+M('R = R₀·(1 + α·(T − T₀))')),'القانون: `R = R₀·(1 + α·(T − T₀))`'),
    S(st(2,'التعويض: '+M('R = 18 × (1 + 3.9 × 10⁻³ × 40)')),'فرق درجات الحرارة أربعون، فنعوض.'),
    S(st(3,'الحساب: '+M('R = 18 × 1.156 ≈ 20.81 Ω')+'<span class="kDirOn"></span>'),'فتكون المقاومة عشرين فاصلة واحد وثمانين أوم تقريبا.'),S(res(M('R ≈ 20.81 Ω')),'')]},
  ex5:{title:'مثال ٥ · صفحة 125',sayT:'والمثال الخامس، مِنْ صَفْحَةِ 125.',steps:()=>[
    S(q('مصباح كهربائي مقاومته '+M('20 Ω')+' ويعمل على فرق جهد '+M('10 V')+'. احسب شدة التيار المار فيه والقدرة الكهربائية.','المثال · صفحة 125'),''),
    S(gr(['R = 20 Ω','V = 10 V'],'التيار '+M('I')+' والقدرة '+M('P')),''),
    S(fig(rPowFig({V:'V = 10 V',R:'R = 20 Ω',res:'I = 0.5 A · P = 5 W'})),'لنرسم دائرة المصباح.'),
    S(st(1,'التيار: '+M('I = V / R = 10 / 20 = 0.5 A')),'أولا التيار من قانون أوم: عشرة على عشرين يساوي نصف أمبير.'),
    S(st(2,'القدرة: '+M('P = I·V = 0.5 × 10')),'ثانيا القدرة: `P = I·V`'),
    S(st(3,'الحساب: '+M('P = 5 W')+'<span class="kDirOn"></span>'),'فتكون القدرة خمسة واط.'),S(res(M('I = 0.5 A')+' · '+M('P = 5 W')),'')]},
  tr1:trCard('تمرين ١ · ورقة العمل · سؤال ٥ (صفحة 129)','هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الخامس، صَفْحَةِ 129.',{q:'سلك مقاومته عند '+M('20 °C')+' تساوي '+M('1 × 10⁻⁴ Ω')+'، والمعامل الحراري لمادته '+M('6.5 × 10⁻³ °C⁻¹')+'. أوجد مقاومته عند '+M('500 °C')+'.',g:['R₀ = 1 × 10⁻⁴ Ω','T₀ = 20 °C','T = 500 °C','α = 6.5 × 10⁻³ °C⁻¹'],r:'المقاومة '+M('R'),law:'R = R₀·(1 + α·(T − T₀))',sub:'R = 10⁻⁴ × (1 + 0.0065 × 480)',calc:'R = 4.12 × 10⁻⁴ Ω',ans:'R = 4.12 × 10⁻⁴ Ω'}),
  tr2:trCard('تمرين ٢ · ورقة العمل · سؤال ٦ (صفحة 129)','والتمرين الثاني، من ورقة العمل، السؤال السادس، صَفْحَةِ 129.',{q:'موصل من النحاس طوله '+M('2 m')+' ومساحة مقطعه '+M('5.03 × 10⁻⁵ m²')+' ومقاومته النوعية '+M('1.756 × 10⁻⁸ Ω·m')+'. أوجد مقاومته.',g:['L = 2 m','A = 5.03 × 10⁻⁵ m²','ρ = 1.756 × 10⁻⁸ Ω·m'],r:'المقاومة '+M('R'),fig:()=>rFactFig(),figSay:'لنتذكر العلاقة بين المقاومة وأبعاد السلك.',law:'R = ρ·L / A',sub:'R = 1.756 × 10⁻⁸ × 2 / 5.03 × 10⁻⁵',calc:'R = 6.98 × 10⁻⁴ Ω',ans:'R = 6.98 × 10⁻⁴ Ω'}),
  tr3:trCard('تمرين ٣ · ورقة العمل · سؤال ٧ (صفحة 130)','والتمرين الثالث، من ورقة العمل، السؤال السابع، صَفْحَةِ 130.',{q:'مصباح كهربائي قدرته '+M('60 W')+' ويعمل على جهد '+M('127 V')+'. احسب مقاومته.',g:['P = 60 W','V = 127 V'],r:'المقاومة '+M('R'),fig:()=>rPowFig({P:'P = 60 W',V:'V = 127 V'}),figSay:'لنرسم دائرة المصباح.',law:'R = V² / P',sub:'R = 127² / 60 = 16129 / 60',calc:'R ≈ 268.8 Ω',ans:'R ≈ 268.8 Ω'}),
  tr4:trCard('تمرين ٤ · ورقة العمل · سؤال ٧ (صفحة 130)','وَالتَّمْرِينُ الرَّابِعُ، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهْ.',{q:'المصباح السابق قدرته '+M('60 W')+' ويعمل على '+M('127 V')+'. احسب التيار.',g:['P = 60 W','V = 127 V'],r:'التيار '+M('I'),law:'I = P / V',sub:'I = 60 / 127',calc:'I ≈ 0.472 A',ans:'I ≈ 0.472 A'})
};
PFIG['4-5']=[[/120 V.*8 A|سخان/,()=>rCirc({V:'V = 120 V',I:'I = 8 A',res:'R = 15 Ω'}),'R = V / I = 15 Ω'],[/10 Ω.*220 V|220 V.*10 Ω/,()=>rCirc({V:'V = 220 V',R:'10 Ω',res:'I = 22 A'}),'I = V / R = 22 A'],
  [/مصباح.*20 Ω|20 Ω.*10 V/,()=>rPowFig({V:'V = 10 V',R:'R = 20 Ω',res:'P = 5 W'}),'I = 0.5 A و P = I·V = 5 W'],[/60 W/,()=>rPowFig({P:'P = 60 W',V:'V = 127 V',res:'R ≈ 268.8 Ω'}),'R = V² / P ≈ 268.8 Ω'],
  [/مقاومي|ρ|Ω·m/,()=>rFactFig(),'R = ρ·L / A'],[/°C/,()=>rHeatScene(),'R = R₀·(1 + α·(T − T₀))'],[/Ω|V|A/,()=>rCirc({}),'قانون أوم: V = I·R']];
function appCards(sl){sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;const il=typeof inl==='function'?inl:(t=>t);
  return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">💡</span><div><b>${il(m[1])}</b> ${il(m[2])}</div></div>`,say:m[1].trim()+': '+m[2]}});return sl}
function apply45(out){defs();const K2='4-5',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^المقاومة R$/,()=>card(K2,'resist')],[/^قانون أوم$/,()=>card(K2,'ohm')],[/^العوامل المؤثرة في المقاومة$/,()=>card(K2,'fact')],[/^أثر درجة الحرارة/,()=>card(K2,'temp')],
    [/^القدرة الكهربائية P$/,()=>card(K2,'pow')],[/^صيغ القدرة$/,()=>null],[/^رسم توضيحي \d$/,()=>null],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال ٢: شدة التيار/,()=>card(K2,'ex2')],[/^مثال ٣: مقاومة سلك/,()=>card(K2,'ex3')],[/^مثال ٤: أثر ارتفاع/,()=>card(K2,'ex4')],[/^مثال ١: تيار مصباح/,()=>card(K2,'ex5')],
    [/^تمرين 1 · ورقة العمل/,()=>card(K2,'tr1')],[/^تمرين 2 · ورقة العمل/,()=>card(K2,'tr2')],[/^تمرين 3 · مثال/,()=>null],[/^تمرين 4 · ورقة العمل/,()=>card(K2,'tr3')],[/^تمرين 5 · ورقة العمل/,()=>card(K2,'tr4')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا الْمُقَاوَمَةَ وَالْقُدْرَةَ، لِنَرَى أَيْنَ نَجِدُهُمَا فِي حَيَاتِنَا.';return appCards(sl)}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

/* ===== الدرس النموذجي 4-8: توصيل المقاومات على التوالي والتوازي (المدرب 2 نوفمبر) ===== */
/* إلكترونات تتحرك على مسار مغلق */
function eLoop(d,n,dur,s){let g='';for(let i=0;i<n;i++)g+=`<g>${elR(0,0,s||5.5)}<animateMotion dur="${dur}s" begin="-${(i*dur/n).toFixed(2)}s" repeatCount="indefinite" path="${d}"/></g>`;return g}
/* 1) التوالي: مسار واحد، التيار نفسه، والجهد يتجزأ (متحرك 12 ث) */
function serScene(){const W=640,H=330,D=12,L=110,R=530,T=110,Bt=270,xs=[200,320,440];let b=bgR(W,H)+shR(W/2,Bt+30,230);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${T} H${R} V${Bt} H${W/2+68}`);
  b+=scShow(D,.6,D,eLoop(`M${R},${T} H${L} V${Bt} H${R} Z`,14,7),true)+batR(W/2,Bt,true);
  xs.forEach((x,i)=>{b+=res3(x,T,62)+lblR(x,T+34,'R'+'₁₂₃'[i],'#92400e',15)});
  b+=scShow(D,4,D-.1,`<g>${scTag(L-2,190,'I','#1d4ed8',40)}${scTag(R+2,190,'I','#1d4ed8',40)}${scTag(W/2,Bt-46,'I = I₁ = I₂ = I₃','#1d4ed8',170)}</g>`,true);
  b+=scShow(D,8,D-.1,`<g>${xs.map((x,i)=>scTag(x,T-40,'V'+'₁₂₃'[i],'#b45309',50)).join('')}${scTag(W/2,Bt+40,'V = V₁ + V₂ + V₃','#b45309',190)}</g>`,true);
  b+=scCap(D,W,'1. مسار واحد يمر فيه التيار','#475569',0,4)+scCap(D,W,'2. التيار نفسه في كل المقاومات','#1d4ed8',4,8)+scCap(D,W,'3. جهد المصدر يتجزأ على المقاومات','#b45309',8,D);
  return svg(W,H,b,'kScene')}
/* 2) التوازي: الجهد نفسه، والتيار يتوزع على الفروع (متحرك 12 ث) */
function parScene(){const W=640,H=356,D=12,L=170,R=470,ys=[90,160,230],Bt=296;let b=bgR(W,H)+shR(W/2,Bt+26,220);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${ys[0]} M${W/2+68},${Bt} H${R} V${ys[0]}`)+ys.map(y=>cabR(`M${L},${y} H${R}`)).join('');
  const nE=[9,6,4];ys.forEach((y,i)=>{b+=scShow(D,.6,D,eLoop(`M${R},${y} H${L}`,nE[i],5),true)});
  b+=scShow(D,.6,D,eLoop(`M${W/2+60},${Bt} H${R} V${ys[0]}`,5,3)+eLoop(`M${L},${ys[2]} V${Bt} H${W/2-60}`,5,3),true)+batR(W/2,Bt,true);
  ys.forEach((y,i)=>{b+=res3(W/2,y,62)+lblR(W/2,y+30,'R'+'₁₂₃'[i],'#92400e',14)+nodeR(L,y)+nodeR(R,y)});
  b+=scShow(D,4,D-.1,`<g>${ys.map((y,i)=>scTag(W/2-96,y-24,'V'+'₁₂₃'[i],'#b45309',46)).join('')}${scTag(84,160,'V = V₁ = V₂ = V₃','#b45309',150)}</g>`,true);
  b+=scShow(D,8,D-.1,`<g>${ys.map((y,i)=>scTag(R+46,y-20,'I'+'₁₂₃'[i],'#1d4ed8',44)).join('')}${scTag(W/2,Bt+40,'I = I₁ + I₂ + I₃','#1d4ed8',170)}</g>`,true);
  b+=scCap(D,W,'1. كل مقاومة بين النقطتين نفسيهما','#475569',0,4)+scCap(D,W,'2. الجهد نفسه على كل الفروع','#b45309',4,8)+scCap(D,W,'3. التيار الرئيسي يتوزع على الفروع','#1d4ed8',8,D);
  return svg(W,H,b,'kScene')}
/* رسم ثابت: مقاومتان على التوالي بالقيم */
function serCirc(o){o=o||{};const W=640,H=320,L=150,R=490,T=110,Bt=250,x1=255,x2=385;let b=bgR(W,H)+shR(W/2,Bt+28,200);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${T} H${R} V${Bt} H${W/2+68}`)+eLoop(`M${R},${T} H${L} V${Bt} H${R} Z`,10,7)+batR(W/2,Bt,true);
  b+=res3(x1,T,66)+res3(x2,T,66)+lblR(x1,T+36,o.R1||'R₁','#92400e',15)+lblR(x2,T+36,o.R2||'R₂','#92400e',15);
  if(o.V1)b+=`<g>${scTag(x1,T-38,o.V1,'#b45309',o.V1.length*9+26)}</g>`;if(o.V2)b+=`<g>${scTag(x2,T-38,o.V2,'#b45309',o.V2.length*9+26)}</g>`;
  if(o.I)b+=`<g>${scTag(R+62,180,o.I,'#1d4ed8',o.I.length*9+26)}</g>`;if(o.V)b+=`<g>${scTag(W/2,Bt+42,o.V,'#334155',o.V.length*9+28)}</g>`;
  b+=lblR(W/2,Bt-40,'توصيل على التوالي','#475569',14);
  if(o.res)b+=pill(W/2,176,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls||'kAuto')}
/* رسم ثابت: مقاومتان على التوازي بالقيم */
function parCirc(o){o=o||{};const W=640,H=330,L=170,R=470,y1=96,y2=176,Bt=270;let b=bgR(W,H)+shR(W/2,Bt+28,190);
  b+=cabR(`M${W/2-66},${Bt} H${L} V${y1} M${W/2+68},${Bt} H${R} V${y1}`)+cabR(`M${L},${y1} H${R}`)+cabR(`M${L},${y2} H${R}`)+eLoop(`M${R},${y1} H${L}`,5,4)+eLoop(`M${R},${y2} H${L}`,7,4)+batR(W/2,Bt,true);
  b+=res3(W/2,y1,66)+res3(W/2,y2,66)+nodeR(L,y1)+nodeR(R,y1)+nodeR(L,y2)+nodeR(R,y2);
  b+=lblR(W/2,y1+34,o.R1||'R₁','#92400e',15)+lblR(W/2,y2+34,o.R2||'R₂','#92400e',15);
  if(o.I1)b+=`<g>${scTag(R+64,y1,o.I1,'#1d4ed8',o.I1.length*9+26)}</g>`;if(o.I2)b+=`<g>${scTag(R+64,y2,o.I2,'#1d4ed8',o.I2.length*9+26)}</g>`;
  if(o.I)b+=`<g>${scTag(L-70,y2+50,o.I,'#1d4ed8',o.I.length*9+26)}</g>`;if(o.V)b+=`<g>${scTag(W/2,Bt+42,o.V,'#334155',o.V.length*9+28)}</g>`;
  b+=lblR(W/2,Bt-40,'توصيل على التوازي','#475569',14);
  if(o.res)b+=pill(W/2,40,o.res,'#7e22ce',.3);
  return svg(W,H,b,o.cls||'kAuto')}
/* لوحة الكهرباء (مصدر 220 V) */
function panelR(x,y){let s=`<rect x="${x-38}" y="${y-62}" width="76" height="124" rx="7" fill="url(#kr-met)" stroke="#334155" stroke-width="2"/><rect x="${x-31}" y="${y-55}" width="62" height="110" rx="4" fill="#e5e7eb" stroke="#94a3b8"/>`;
  s+=`<rect x="${x-26}" y="${y-48}" width="52" height="16" rx="3" fill="#0f172a"/><text x="${x}" y="${y-36}" text-anchor="middle" font-size="11" font-weight="800" fill="#fbbf24" direction="ltr">220 V AC</text>`;
  for(let i=0;i<4;i++){const bx=x-21+i*14;s+=`<rect x="${bx-5}" y="${y-22}" width="10" height="28" rx="2" fill="#f8fafc" stroke="#64748b"/><rect x="${bx-3}" y="${y-18}" width="6" height="9" rx="1.5" fill="${i===3?'#64748b':'#111827'}"/>`}
  s+=`<rect x="${x-26}" y="${y+14}" width="52" height="30" rx="3" fill="#f8fafc" stroke="#94a3b8"/><path d="M${x+3},${y+18} l-9,12 h7 l-4,11 l11,-14 h-7 l4,-9z" fill="#facc15" stroke="#a16207" stroke-width="1"/>`;
  return s}
/* مفتاح جداري حقيقي: لوحة بيضاء مربعة وزر أحمر ولمبة بيان تضيء عند التشغيل */
function swR(x,y,on){const s=21;let g=`<rect x="${x-s+2}" y="${y-s+3}" width="${2*s}" height="${2*s}" rx="6" fill="#000" opacity=".18"/><rect x="${x-s}" y="${y-s}" width="${2*s}" height="${2*s}" rx="6" fill="url(#kr-swP)" stroke="#cbd5e1" stroke-width="1.2"/>`;
  g+=`<circle cx="${x-14}" cy="${y+1}" r="3" fill="#f1f5f9" stroke="#cbd5e1"/><circle cx="${x+14}" cy="${y+1}" r="3" fill="#f1f5f9" stroke="#cbd5e1"/>`;
  g+=on?`<rect x="${x-5}" y="${y-17}" width="10" height="4" rx="1.5" fill="#ef4444"/><rect x="${x-8}" y="${y-19}" width="16" height="8" rx="4" fill="#f87171" opacity=".45"/>`:`<rect x="${x-5}" y="${y-17}" width="10" height="4" rx="1.5" fill="#7f1d1d" opacity=".55"/>`;
  g+=`<text x="${x}" y="${y-8.5}" text-anchor="middle" font-size="4.6" font-weight="700" fill="#334155" direction="ltr">OFF</text><text x="${x}" y="${y+18}" text-anchor="middle" font-size="4.6" font-weight="700" fill="#334155" direction="ltr">ON</text>`;
  g+=`<rect x="${x-6}" y="${y-7}" width="12" height="20" rx="1.8" fill="#dc2626" stroke="#7f1d1d" stroke-width=".8"/>`;
  g+=on?`<rect x="${x-6}" y="${y+3}" width="12" height="10" rx="1.5" fill="#991b1b"/><rect x="${x-5}" y="${y-6}" width="10" height="3" rx="1" fill="#fca5a5" opacity=".7"/>`:`<rect x="${x-6}" y="${y-7}" width="12" height="10" rx="1.5" fill="#991b1b"/><rect x="${x-5}" y="${y+4}" width="10" height="3" rx="1" fill="#fca5a5" opacity=".7"/>`;
  return g}
/* أجهزة المنزل على التوازي: لوحة الكهرباء ومفتاح لكل جهاز */
/* تلفاز شاشة مسطحة: أعلى الإطار عند y-34 وأسفل القاعدة عند y+34 */
function tvR(x,y){let s=`<rect x="${x-46}" y="${y-34}" width="92" height="58" rx="4" fill="#0b0f19" stroke="#334155" stroke-width="1.5"/><rect x="${x-41}" y="${y-29}" width="82" height="48" rx="2" fill="url(#kr-tvS)"/>`;
  s+=`<path d="M${x-41},${y+19} L${x-41},${y+4} Q${x-20},${y-8} ${x},${y+6} Q${x+20},${y-4} ${x+41},${y+4} L${x+41},${y+19}Z" fill="#16a34a" opacity=".85"/><circle cx="${x+24}" cy="${y-16}" r="6" fill="#fde047"/>`;
  s+=`<rect x="${x-41}" y="${y-29}" width="82" height="48" rx="2" fill="#fff" opacity="0"><animate attributeName="opacity" values="0;.12;0" dur="2.6s" repeatCount="indefinite"/></rect><path d="M${x-41},${y-29} L${x-10},${y-29} L${x-30},${y+19} L${x-41},${y+19}Z" fill="#fff" opacity=".1"/>`;
  return s+`<circle cx="${x+40}" cy="${y+21.5}" r="1.4" fill="#22c55e"/><rect x="${x-5}" y="${y+24}" width="10" height="7" fill="url(#kr-met)"/><rect x="${x-24}" y="${y+30}" width="48" height="5" rx="2.5" fill="url(#kr-met)" stroke="#475569" stroke-width=".8"/>`}
/* مروحة طاولة: أعلى الشبك y-34 وأسفل القاعدة y+46 */
function fanR(x,y,on){let s='';const bl=`<g fill="url(#kr-fanB)" stroke="#1e40af" stroke-width=".8"><path d="M${x},${y} C${x-10},${y-12} ${x-6},${y-30} ${x+3},${y-29} C${x+10},${y-24} ${x+6},${y-10} ${x},${y}Z"/><path d="M${x},${y} C${x+15},${y-3} ${x+28},${y+10} ${x+22},${y+18} C${x+15},${y+22} ${x+5},${y+10} ${x},${y}Z"/><path d="M${x},${y} C${x-4},${y+15} ${x-20},${y+24} ${x-26},${y+15} C${x-28},${y+7} ${x-12},${y+2} ${x},${y}Z"/></g>`;
  s+=`<rect x="${x-4}" y="${y+30}" width="8" height="14" fill="url(#kr-met)"/><ellipse cx="${x}" cy="${y+46}" rx="24" ry="5" fill="url(#kr-met)" stroke="#475569" stroke-width=".8"/>`;
  s+=`<circle cx="${x}" cy="${y}" r="34" fill="#e0f2fe" opacity=".18"/>`+(on?`<g><animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="360 ${x} ${y}" dur=".6s" repeatCount="indefinite"/>${bl}</g>`:bl);
  for(let k=0;k<12;k++){const a=k*Math.PI/6;s+=`<line x1="${f1(x+Math.cos(a)*8)}" y1="${f1(y+Math.sin(a)*8)}" x2="${f1(x+Math.cos(a)*34)}" y2="${f1(y+Math.sin(a)*34)}" stroke="#94a3b8" stroke-width=".9"/>`}
  s+=`<circle cx="${x}" cy="${y}" r="34" fill="none" stroke="url(#kr-met)" stroke-width="3"/><circle cx="${x}" cy="${y}" r="22" fill="none" stroke="#94a3b8" stroke-width=".9"/><circle cx="${x}" cy="${y}" r="8" fill="url(#kr-met)" stroke="#475569"/>`;
  return s}
/* أجهزة المنزل على التوازي: لوحة الكهرباء ومفتاح لكل جهاز */
function houseFig(){const W=640,H=330,L=128,T=62,Bt=256,sy=97,px=66,X=[200,350,500],R=X[2],cy=170;let b=bgR(W,H);
  b+=cabR(`M${L},${T} H${R} M${L},${Bt} H${R}`)+cabR(`M${px},${T+90} V${T} H${L} M${px},${Bt-70} V${Bt} H${L}`)+panelR(px,(T+Bt)/2+10);
  b+=cabR(`M${X[0]},${T} V${Bt} M${X[1]},${T} V${cy-34} M${X[1]},${cy+35} V${Bt} M${X[2]},${T} V${Bt}`);
  [0,1].forEach(k=>{b+=nodeR(X[k],T)+nodeR(X[k],Bt)});
  b+=swR(X[0],sy,true)+swR(X[1],sy,true)+swR(X[2],sy,false);
  b+=`<g transform="translate(${X[0]+4} ${cy}) rotate(90) scale(.72)">${bulbR(0,0)}</g>`;
  b+=tvR(X[1],cy)+fanR(X[2],cy-12,false);
  b+=lblR(X[0]+30,46,'مصباح يعمل','#15803d',14)+lblR(X[1],46,'تلفاز يعمل','#15803d',14)+lblR(X[2],46,'مروحة مطفأة','#b91c1c',14)+lblR(px,282,'لوحة الكهرباء','#334155',13);
  b+=`<g>${tagR(W/2+60,298,'إطفاء جهاز لا يؤثر في غيره، وكلها على 220 V','#0f766e',360)}</g>`;
  return svg(W,H,b,'kAuto')}

CARDS['4-8']={
  ser:{title:'التوصيل على التوالي',sayT:'نبدأ أول موضوعات درسنا: توصيل المقاومات على التوالي.',steps:()=>[
    S(pt(B('التوصيل على التوالي')+': توصيل المقاومات واحدة بعد الأخرى في مسار واحد.'),''),
    S(fig(serScene(),'مشهد: مسار واحد، فالتيار نفسه في كل المقاومات، والجهد يتجزأ عليها'),'شاهد المشهد: يَمُرُّ التَّيَّارُ فِي مَسَارٍ وَاحِدٍ، فَيَكُونُ التَّيَّارُ نَفْسُهُ فِي كُلِّ الْمُقَاوَمَاتِ، وَيَتَجَزَّأُ جُهْدُ الْمَصْدَرِ عَلَيْهَا.'),
    S(pt(B('التيار واحد')+' في كل المقاومات: '+M('I = I₁ = I₂ = I₃')),'التَّيَّارُ وَاحِدٌ فِي كُلِّ الْمُقَاوَمَاتِ.'),
    S(pt(B('الجهد يتجزأ')+': '+M('V = V₁ + V₂ + V₃')+'، حيث '+M('V = I·R')),'وَالْجُهْدُ يَتَجَزَّأُ عَلَى الْمُقَاوَمَاتِ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('R_total = R₁ + R₂ + R₃')+'</div>'),'والمقاومة المكافئة: `R_total = R₁ + R₂ + R₃`'),{md:'`R_total = R₁ + R₂ + R₃`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('R_total')+' المقاومة المكافئة، ووحدتها الأوم '+M('Ω')+'<br>'+M('R₁, R₂, R₃')+' المقاومات الموصلة، ووحدتها الأوم '+M('Ω')+'</div>'},'حيث: `R_total` الْمُقَاوَمَةُ الْمُكَافِئَةُ، ووحدتها الأوم. و `R₁` و `R₂` و `R₃` الْمُقَاوَمَاتُ الْمُوَصَّلَةُ.')]},
  par:{title:'التوصيل على التوازي',sayT:'ننتقل الآن إلى توصيل المقاومات على التوازي.',steps:()=>[
    S(pt(B('التوصيل على التوازي')+': توصيل كل مقاومة بين النقطتين نفسيهما، فيكون لكل مقاومة فرع مستقل.'),''),
    S(fig(parScene(),'مشهد: الجهد نفسه على كل الفروع، والتيار الرئيسي يتوزع عليها'),'شاهد المشهد: كُلُّ مُقَاوَمَةٍ مُوَصَّلَةٌ بَيْنَ النُّقْطَتَيْنِ نَفْسَيْهِمَا، فَيَكُونُ الْجُهْدُ نَفْسُهُ عَلَى كُلِّ الْفُرُوعِ، وَيَتَوَزَّعُ التَّيَّارُ الرَّئِيسِيُّ عَلَيْهَا.'),
    S(pt(B('الجهد واحد')+' على كل المقاومات: '+M('V = V₁ = V₂ = V₃')),'الْجُهْدُ وَاحِدٌ عَلَى كُلِّ الْمُقَاوَمَاتِ.'),
    S(pt(B('التيار يتوزع')+': '+M('I = I₁ + I₂ + I₃')+'، حيث '+M('I = V / R')),'وَالتَّيَّارُ الرَّئِيسِيُّ يَتَوَزَّعُ عَلَى الْفُرُوعِ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('1/R_total = 1/R₁ + 1/R₂ + 1/R₃')+'</div>'),'والمقاومة المكافئة: `1/R_total = 1/R₁ + 1/R₂ + 1/R₃`'),{md:'`1/R_total = 1/R₁ + 1/R₂ + 1/R₃`'}),
    S(pt('حالة خاصة لمقاومتين فقط: '+M('R_total = R₁·R₂ / (R₁ + R₂)')),'وَفِي حَالَةِ مُقَاوَمَتَيْنِ فَقَطْ: `R_total = R₁·R₂ / (R₁ + R₂)`'),
    S(pt('المقاومة المكافئة على التوازي '+B('أصغر')+' من أصغر مقاومة.'),'')]},
  home:{title:'تذكّر',sayT:'وَتَذَكَّرْ هَذِهِ الْمَعْلُومَةَ الْمُهِمَّهْ.',steps:()=>[
    S(pt('أجهزة المنزل توصل على '+B('التوازي')+' لتعمل كلها على '+M('220 V')+'، ولا تتأثر بإطفاء أحدها.'),''),
    S(fig(houseFig(),'لوحة الكهرباء مصدر الجهد، ولكل جهاز فرع مستقل ومفتاح خاص'),'لاحظ الرسم: لَوْحَةُ الْكَهْرَبَاءِ هِيَ مَصْدَرُ الْجُهْدِ، وَلِكُلِّ جِهَازٍ فَرْعٌ مُسْتَقِلٌّ وَمِفْتَاحٌ خَاصٌّ، فَإِذَا أَطْفَأْنَا الْمِرْوَحَةَ بَقِيَ الْمِصْبَاحُ وَالتِّلْفَازُ يَعْمَلَانِ.')]},
  ex1:{title:'مثال ١ · صفحة 126',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، مِنْ صَفْحَةِ 126.',steps:()=>[
    S(q('مقاومتان مقدارهما '+M('5 Ω')+' و '+M('9 Ω')+' وصلتا على التوالي، ويمر فيهما تيار '+M('2 A')+'. أوجد: المقاومة الكلية، وفرق الجهد عبر كل مقاومة، وفرق الجهد الكلي.','المثال · صفحة 126'),''),
    S(gr(['R₁ = 9 Ω','R₂ = 5 Ω','I = 2 A'],M('R_total')+' و '+M('V₁')+' و '+M('V₂')+' و '+M('V')),''),
    S(fig(serCirc({R1:'9 Ω',R2:'5 Ω',I:'I = 2 A',V1:'V₁ = 18 V',V2:'V₂ = 10 V',V:'V = 28 V',res:'R_total = 14 Ω'})),'لنرسم الدائرة.'),
    S(st(1,'المقاومة الكلية: '+M('R_total = 9 + 5 = 14 Ω')),'أولا المقاومة الكلية: تسعة زائد خمسة يساوي أربعة عشر أوم.'),
    S(st(2,'جهد كل مقاومة: '+M('V₁ = 2 × 9 = 18 V')+' و '+M('V₂ = 2 × 5 = 10 V')),'ثانيا جهد كل مقاومة: `V₁ = 2 × 9 = 18 V`، و `V₂ = 2 × 5 = 10 V`'),
    S(st(3,'الجهد الكلي: '+M('V = 18 + 10 = 28 V')+'<span class="kDirOn"></span>'),'ثالثا الجهد الكلي: ثمانية عشر زائد عشرة يساوي ثمانية وعشرين فولت.'),
    S(res(M('R_total = 14 Ω')+'<br>'+M('V₁ = 18 V')+'<br>'+M('V₂ = 10 V')+'<br>'+M('V = 28 V')),'')]},
  ex2:{title:'مثال ٢ · صفحة 127',sayT:'وتأمل معي المثال الثاني، مِنْ صَفْحَةِ 127.',steps:()=>[
    S(q('مقاومتان '+M('6 Ω')+' و '+M('3 Ω')+' ربطتا على التوازي، ووصل بين طرفيهما فرق جهد '+M('12 V')+'. أوجد: المقاومة الكلية، والتيار الرئيسي، وتيار كل مقاومة.','المثال · صفحة 127'),''),
    S(gr(['R₁ = 6 Ω','R₂ = 3 Ω','V = 12 V'],M('R_total')+' و '+M('I')+' و '+M('I₁')+' و '+M('I₂')),''),
    S(fig(parCirc({R1:'6 Ω',R2:'3 Ω',V:'V = 12 V',I1:'I₁ = 2 A',I2:'I₂ = 4 A',I:'I = 6 A',res:'R_total = 2 Ω'})),'لنرسم الدائرة.'),
    S(st(1,'المقاومة الكلية: '+M('R_total = 6 × 3 / (6 + 3) = 18 / 9 = 2 Ω')),'أولا المقاومة الكلية: حاصل الضرب ثمانية عشر، على المجموع تسعة، يساوي اثنين أوم.'),
    S(st(2,'التيار الرئيسي: '+M('I = V / R = 12 / 2 = 6 A')),'ثانيا التيار الرئيسي: اثنا عشر على اثنين يساوي ستة أمبير.'),
    S(st(3,'تيار كل مقاومة: '+M('I₁ = 12 / 6 = 2 A')+' و '+M('I₂ = 12 / 3 = 4 A')+'<span class="kDirOn"></span>'),'ثالثا تيار كل مقاومة: `I₁ = 12 / 6 = 2 A`، و `I₂ = 12 / 3 = 4 A`'),
    S(pt('التحقق: '+M('I₁ + I₂ = 2 + 4 = 6 A')+' وهو التيار الرئيسي ✓'),'وللتحقق: اثنان زائد أربعة يساوي ستة، وهو التيار الرئيسي.'),
    S(res(M('R_total = 2 Ω')+'<br>'+M('I = 6 A')+'<br>'+M('I₁ = 2 A')+'<br>'+M('I₂ = 4 A')),'')]},
  tr1:trCard('تمرين ١ · ورقة العمل · سؤال ٨ (صفحة 130)','هيا نطبق ما تعلمناه في التمرين الأول، من ورقة العمل، السؤال الثامن، صَفْحَةِ 130.',{q:'مقاومتان '+M('9 Ω')+' و '+M('6 Ω')+' على التوازي. أوجد المقاومة الكلية.',g:['R₁ = 9 Ω','R₂ = 6 Ω'],r:'المقاومة الكلية '+M('R'),fig:()=>parCirc({R1:'9 Ω',R2:'6 Ω'}),figSay:'لنرسم الدائرة.',law:'R = R₁·R₂ / (R₁ + R₂)',sub:'R = 9 × 6 / (9 + 6) = 54 / 15',calc:'R = 3.6 Ω',ans:'R = 3.6 Ω'}),
  tr2:trCard('تمرين ٢ · ورقة العمل · سؤال ٨ (صفحة 130)','وَالتَّمْرِينُ الثَّانِي، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهْ.',{q:'المقاومتان السابقتان مقاومتهما الكلية '+M('3.6 Ω')+'، ووصل طرفاهما بفرق جهد '+M('18 V')+'. أوجد التيار الرئيسي.',g:['R = 3.6 Ω','V = 18 V'],r:'التيار الرئيسي '+M('I'),fig:()=>parCirc({R1:'9 Ω',R2:'6 Ω',V:'V = 18 V'}),figSay:'لنرسم الدائرة.',law:'I = V / R',sub:'I = 18 / 3.6',calc:'I = 5 A',ans:'I = 5 A'}),
  tr3:trCard('تمرين ٣ · ورقة العمل · سؤال ٩ (صفحة 131)','والتمرين الثالث، من ورقة العمل، السؤال التاسع، صَفْحَةِ 131.',{q:'مقاومتان '+M('1 Ω')+' و '+M('4 Ω')+' على التوالي. أوجد المقاومة الكلية.',g:['R₁ = 1 Ω','R₂ = 4 Ω'],r:'المقاومة الكلية '+M('R'),fig:()=>serCirc({R1:'1 Ω',R2:'4 Ω'}),figSay:'لنرسم الدائرة.',law:'R = R₁ + R₂',sub:'R = 1 + 4',calc:'R = 5 Ω',ans:'R = 5 Ω'}),
  tr4:trCard('تمرين ٤ · ورقة العمل · سؤال ٩ (صفحة 131)','وَالتَّمْرِينُ الرَّابِعُ، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهْ.',{q:'المقاومة الكلية '+M('5 Ω')+' ووصل طرفاها بفرق جهد '+M('10 V')+'. أوجد التيار.',g:['R = 5 Ω','V = 10 V'],r:'التيار '+M('I'),fig:()=>serCirc({R1:'1 Ω',R2:'4 Ω',V:'V = 10 V'}),figSay:'لنرسم الدائرة.',law:'I = V / R',sub:'I = 10 / 5',calc:'I = 2 A',ans:'I = 2 A'}),
  tr5:trCard('تمرين ٥ · ورقة العمل · سؤال ٩ (صفحة 131)','وَالتَّمْرِينُ الْخَامِسُ، تَكْمِلَةٌ لِلسُّؤَالِ نَفْسِهْ.',{q:'في الدائرة السابقة التيار '+M('2 A')+'. أوجد الجهد على المقاومة '+M('4 Ω')+'.',g:['I = 2 A','R₂ = 4 Ω'],r:'الجهد '+M('V₂'),fig:()=>serCirc({R1:'1 Ω',R2:'4 Ω',I:'I = 2 A',V:'V = 10 V'}),figSay:'لنرسم الدائرة.',law:'V₂ = I·R₂',sub:'V₂ = 2 × 4',calc:'V₂ = 8 V',ans:'V₂ = 8 V'}),
  tr6:trCard('تمرين ٦ · ورقة العمل · سؤال ١٠ (صفحة 131)','والتمرين السادس، من ورقة العمل، السؤال العاشر، صَفْحَةِ 131.',{q:'ما المقاومة التي إذا وصلت على التوازي مع '+M('300 Ω')+' تصبح المقاومة الكلية '+M('75 Ω')+'؟',g:['R₁ = 300 Ω','R = 75 Ω'],r:'المقاومة المجهولة '+M('R₂'),fig:()=>parCirc({R1:'300 Ω',R2:'R₂ = ?'}),figSay:'لنرسم الدائرة.',law:'1/R₂ = 1/R − 1/R₁',sub:'1/R₂ = 1/75 − 1/300 = 3/300',calc:'R₂ = 100 Ω',ans:'R₂ = 100 Ω'})
};
PFIG['4-8']=[[/5 Ω.*9 Ω.*2 A|2 A.*9 Ω/,()=>serCirc({R1:'9 Ω',R2:'5 Ω',I:'I = 2 A',res:'V₁ = 18 V'}),'V₁ = I·R₁ = 18 V'],[/5 Ω.*9 Ω|9 Ω.*5 Ω/,()=>serCirc({R1:'9 Ω',R2:'5 Ω',res:'R = 14 Ω'}),'R = R₁ + R₂ = 14 Ω'],
  [/6 Ω.*3 Ω/,()=>parCirc({R1:'6 Ω',R2:'3 Ω',res:'R = 2 Ω'}),'R = R₁·R₂ / (R₁ + R₂) = 2 Ω'],[/2 Ω.*12 V|12 V.*2 Ω/,()=>parCirc({R1:'6 Ω',R2:'3 Ω',V:'V = 12 V',res:'I = 6 A'}),'I = V / R = 6 A'],
  [/3\.6 Ω.*18 V|18 V.*3\.6 Ω/,()=>parCirc({R1:'9 Ω',R2:'6 Ω',V:'V = 18 V',res:'I = 5 A'}),'I = V / R = 5 A'],[/9 Ω.*6 Ω/,()=>parCirc({R1:'9 Ω',R2:'6 Ω',res:'R = 3.6 Ω'}),'R = R₁·R₂ / (R₁ + R₂) = 3.6 Ω'],
  [/1 Ω.*4 Ω.*2 A|4 Ω.*2 A/,()=>serCirc({R1:'1 Ω',R2:'4 Ω',I:'I = 2 A',res:'V₂ = 8 V'}),'V₂ = I·R₂ = 8 V'],[/1 Ω.*4 Ω/,()=>serCirc({R1:'1 Ω',R2:'4 Ω',res:'R = 5 Ω'}),'R = R₁ + R₂ = 5 Ω'],
  [/5 Ω.*10 V|10 V.*5 Ω/,()=>serCirc({R1:'1 Ω',R2:'4 Ω',V:'V = 10 V',res:'I = 2 A'}),'I = V / R = 2 A'],[/300 Ω/,()=>parCirc({R1:'300 Ω',R2:'R₂',res:'R₂ = 100 Ω'}),'1/R₂ = 1/R − 1/R₁'],
  [/توازي|التوازي/,()=>parCirc({}),'1/R = 1/R₁ + 1/R₂'],[/توالي|التوالي/,()=>serCirc({}),'R = R₁ + R₂'],[/Ω|V|A/,()=>serCirc({}),'V = I·R']];
function apply48(out){defs();const K2='4-8',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^التوصيل على التوالي$/,()=>card(K2,'ser')],[/^التوصيل على التوازي$/,()=>card(K2,'par')],[/^تذكّر$/,()=>card(K2,'home')],[/^رسم توضيحي \d$/,()=>null],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^مثال: مقاومتان على التوازي/,()=>card(K2,'ex2')],
    [/^تمرين [1-4] · مثال/,()=>null],[/^تمرين 5 · ورقة العمل/,()=>card(K2,'tr1')],[/^تمرين 6 · ورقة العمل/,()=>card(K2,'tr2')],[/^تمرين 7 · ورقة العمل/,()=>card(K2,'tr3')],
    [/^تمرين 8 · ورقة العمل/,()=>card(K2,'tr4')],[/^تمرين 9 · ورقة العمل/,()=>card(K2,'tr5')],[/^تمرين 10 · ورقة العمل/,()=>card(K2,'tr6')],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا التَّوْصِيلَ عَلَى التَّوَالِي وَالتَّوَازِي، لِنَرَى أَيْنَ نَجِدُهُمَا فِي حَيَاتِنَا.';return appCards(sl)}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

/* ===== الدرس النموذجي 0-1: الكميات الفيزيائية وأنظمة القياس (الحقيبة التدريبية صفحات 10-12) ===== */
const kIM=(f,x,y,w,h,ex)=>`<image href="dv/${f}.webp" x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" preserveAspectRatio="none"${ex||''}/>`;
function kBench(top,fy,x0,x1){const ins=Math.min(26,(fy-top)*.7);let g=`<defs><linearGradient id="kc-wt" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#C08A50"/><stop offset="1" stop-color="#E4B97F"/></linearGradient><linearGradient id="kc-wf" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9A6234"/><stop offset="1" stop-color="#6E4120"/></linearGradient></defs><path d="M${f1(x0+ins)},${f1(top)} L${f1(x1-ins)},${f1(top)} L${x1},${f1(fy)} L${x0},${f1(fy)}Z" fill="url(#kc-wt)" stroke="#7C4A1F" stroke-width=".8"/>`;
  for(let k=1;k<5;k++){const f=k/5,yy=top+(fy-top)*f,a=x0+ins*(1-f)+5,b=x1-ins*(1-f)-5;g+=`<path d="M${f1(a)},${f1(yy)} Q${f1((a+b)/2)},${f1(yy+(k%2?1.5:-1.3))} ${f1(b)},${f1(yy)}" fill="none" stroke="#A8743F" stroke-width=".7" opacity=".5"/>`}
  return g+`<rect x="${x0}" y="${f1(fy)}" width="${x1-x0}" height="12" fill="url(#kc-wf)" stroke="#5B3517" stroke-width=".8"/><line x1="${x0+1}" y1="${f1(fy+.8)}" x2="${x1-1}" y2="${f1(fy+.8)}" stroke="#F0CB95" stroke-width="1" opacity=".7"/>`}
/* ظل واقعي: ضبابي، ملاصق للقاعدة، مائل قليلا بعيدا عن الضوء (طلب المدرب 05:46) */
const kSh=(cx,cy,rx)=>`<defs><filter id="kc-shb" x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="3"/></filter></defs><ellipse cx="${f1(cx+rx*.08)}" cy="${f1(cy-1)}" rx="${f1(rx*.86)}" ry="${f1(Math.min(6,Math.max(3,rx*.07)))}" fill="#2a1a0c" opacity=".45" filter="url(#kc-shb)"/>`;
/* أيقونات صغيرة للكميات الأساسية */
const qIco=k=>{const P={
  L:'<rect x="2" y="9" width="24" height="10" rx="2" fill="#fde68a" stroke="#b45309" stroke-width="1.6"/><path d="M6 9v4M10 9v6M14 9v4M18 9v6M22 9v4" stroke="#b45309" stroke-width="1.4"/>',
  t:'<circle cx="14" cy="15" r="10" fill="#e0f2fe" stroke="#0369a1" stroke-width="1.8"/><path d="M14 15V9M14 15l4 3" stroke="#0369a1" stroke-width="2" stroke-linecap="round"/><rect x="11" y="1.5" width="6" height="3" rx="1" fill="#0369a1"/>',
  m:'<path d="M8 10h12l4 15H4z" fill="#cbd5e1" stroke="#334155" stroke-width="1.6"/><circle cx="14" cy="7" r="3" fill="none" stroke="#334155" stroke-width="1.8"/><text x="14" y="22" text-anchor="middle" font-size="7" font-weight="900" fill="#334155">kg</text>',
  I:'<path d="M16 2L6 16h7l-2 10 11-15h-7z" fill="#fde047" stroke="#a16207" stroke-width="1.5" stroke-linejoin="round"/>',
  T:'<rect x="11" y="2" width="6" height="18" rx="3" fill="#fff" stroke="#b91c1c" stroke-width="1.6"/><circle cx="14" cy="22" r="5" fill="#ef4444" stroke="#b91c1c" stroke-width="1.6"/><rect x="12.6" y="9" width="2.8" height="12" fill="#ef4444"/>',
  Iv:'<circle cx="14" cy="11" r="8" fill="#fef9c3" stroke="#ca8a04" stroke-width="1.6"/><rect x="10" y="19" width="8" height="5" rx="1.5" fill="#94a3b8"/><path d="M14 0v1.5M4 3l1.5 1.5M24 3l-1.5 1.5" stroke="#ca8a04" stroke-width="1.6" stroke-linecap="round"/>',
  n:'<path d="M10 3h8M12 3v7l-7 13a2 2 0 0 0 2 3h14a2 2 0 0 0 2-3l-7-13V3" fill="#dcfce7" stroke="#15803d" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="20" r="1.8" fill="#15803d"/><circle cx="17" cy="22" r="1.4" fill="#15803d"/>'};
  return `<svg class="kQIco" viewBox="0 0 28 28" width="26" height="26" aria-hidden="true" style="vertical-align:middle;margin-inline-end:6px;flex:none">${P[k]||''}</svg>`};
/* عينة أسلوب الوحدتين الرابعة والخامسة: مشاهد متحركة بأجسام لامعة مجسمة */
function gDefs(){return `<defs><linearGradient id="g-cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".35" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
<linearGradient id="g-ct" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#60a5fa"/></linearGradient>
<radialGradient id="g-wh" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#6b7280"/><stop offset=".6" stop-color="#1f2937"/><stop offset="1" stop-color="#030712"/></radialGradient>
<radialGradient id="g-hub" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#cbd5e1"/><stop offset="1" stop-color="#64748b"/></radialGradient>
<linearGradient id="g-wf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6a46a"/><stop offset=".5" stop-color="#b7793f"/><stop offset="1" stop-color="#7c4a1f"/></linearGradient>
<linearGradient id="g-wt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d3a3"/><stop offset="1" stop-color="#cf9a5f"/></linearGradient>
<linearGradient id="g-ws" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a6234"/><stop offset="1" stop-color="#5b3517"/></linearGradient>
<radialGradient id="g-sw" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#e2e8f0"/><stop offset="1" stop-color="#94a3b8"/></radialGradient>
<filter id="g-blur"><feGaussianBlur stdDeviation="3"/></filter></defs>`}
const gSh=(cx,cy,rx)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="6" fill="#1e293b" opacity=".3" filter="url(#g-blur)"/>`;
/* عربة لامعة مجسمة */
function gCart(x,y){return gSh(x+70,y+50,72)+`<polygon points="${x+8},${y} ${x+132},${y} ${x+146},${y-12} ${x+22},${y-12}" fill="url(#g-ct)"/><polygon points="${x+132},${y} ${x+146},${y-12} ${x+146},${y+26} ${x+132},${y+38}" fill="#1e3a8a"/><rect x="${x}" y="${y}" width="132" height="38" rx="8" fill="url(#g-cb)"/><rect x="${x+10}" y="${y+6}" width="112" height="6" rx="3" fill="#fff" opacity=".45"/>`+
  [x+30,x+104].map(cx=>`<circle cx="${cx}" cy="${y+40}" r="14" fill="url(#g-wh)"/><circle cx="${cx}" cy="${y+40}" r="6" fill="url(#g-hub)"/>`).join('')}
/* صندوق خشبي لامع مجسم */
function gBox(x,y,w,h,d,lab){d=d||22;return gSh(x+w/2+8,y+h+2,w*.6)+`<polygon points="${x},${y} ${x+w},${y} ${x+w+d},${y-d*.7} ${x+d},${y-d*.7}" fill="url(#g-wt)"/><polygon points="${x+w},${y} ${x+w+d},${y-d*.7} ${x+w+d},${y+h-d*.7} ${x+w},${y+h}" fill="url(#g-ws)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g-wf)"/>`+[.33,.66].map(f=>`<line x1="${x+3}" y1="${y+h*f}" x2="${x+w-3}" y2="${y+h*f}" stroke="#7c4a1f" stroke-width="1.2" opacity=".5"/>`).join('')+`<rect x="${x+4}" y="${y+3}" width="${w-8}" height="4" fill="#fff" opacity=".3"/>`+(lab?`<text x="${x+w/2}" y="${y+h/2+6}" text-anchor="middle" font-size="16" font-weight="900" fill="#fff" direction="ltr" style="paint-order:stroke;stroke:#5b3517;stroke-width:3px">${lab}</text>`:'')}
/* ساعة إيقاف لامعة بعقرب يدور */
function gWatch(cx,cy,D,t0,t1){return gSh(cx,cy+40,28)+`<rect x="${cx-7}" y="${cy-44}" width="14" height="10" rx="3" fill="#f59e0b"/><circle cx="${cx}" cy="${cy}" r="34" fill="#475569"/><circle cx="${cx}" cy="${cy}" r="28" fill="url(#g-sw)"/>`+[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>`<line x1="${cx+22*Math.sin(a*Math.PI/180)}" y1="${cy-22*Math.cos(a*Math.PI/180)}" x2="${cx+26*Math.sin(a*Math.PI/180)}" y2="${cy-26*Math.cos(a*Math.PI/180)}" stroke="#334155" stroke-width="1.6"/>`).join('')+`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-22}" stroke="#f97316" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t1,D])}" values="0 ${cx} ${cy};0 ${cx} ${cy};300 ${cx} ${cy};300 ${cx} ${cy}"/></line><circle cx="${cx}" cy="${cy}" r="3.5" fill="#0f172a"/>`}
/* سيارة شبه واقعية (جانبية، متجهة لليمين). x يسار السيارة، y مستوى الأرض */
function gCarDefs(){return `<defs><linearGradient id="c-bd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#93c5fd"/><stop offset=".2" stop-color="#3b82f6"/><stop offset=".6" stop-color="#1d4ed8"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
<linearGradient id="c-gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".45" stop-color="#7dd3fc"/><stop offset="1" stop-color="#1e3a5f"/></linearGradient>
<radialGradient id="c-ty" cx="50%" cy="50%" r="50%"><stop offset=".62" stop-color="#374151"/><stop offset=".8" stop-color="#111827"/><stop offset="1" stop-color="#030712"/></radialGradient>
<radialGradient id="c-rm" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#cbd5e1"/><stop offset="1" stop-color="#475569"/></radialGradient>
<linearGradient id="c-ch" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1f5f9"/><stop offset="1" stop-color="#64748b"/></linearGradient></defs>`}
function gWheel(cx,cy,D,t0,t1,turns){const sp=[0,72,144,216,288].map(a=>`<rect x="${cx-2}" y="${cy-13}" width="4" height="13" rx="2" fill="#94a3b8" transform="rotate(${a} ${cx} ${cy})"/>`).join('');
  return `<circle cx="${cx}" cy="${cy}" r="22" fill="url(#c-ty)"/><circle cx="${cx}" cy="${cy}" r="14" fill="url(#c-rm)"/><g>${sp}<animateTransform attributeName="transform" type="rotate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t1,D])}" values="0 ${cx} ${cy};0 ${cx} ${cy};${360*turns} ${cx} ${cy};${360*turns} ${cx} ${cy}"/></g><circle cx="${cx}" cy="${cy}" r="4.5" fill="#334155"/><circle cx="${cx}" cy="${cy}" r="14" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>`}
function gCar(x,y,D,t0,t1,turns){const k=.4,T=(a,b)=>`${f1(x+(680-a)*k)},${f1(y+(b-520)*k)}`,R=v=>f1(v*k);
  const pth=(d)=>d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,a,b)=>T(+a,+b));
  const w1=x+(680-151)*k,w2=x+(680-554)*k,wy=y+(460-520)*k;
  return `<ellipse cx="${f1(x+130)}" cy="${y+1}" rx="132" ry="6" fill="#0f172a" opacity=".45" filter="url(#g-blur)"/>
  <path d="${pth('M640,485 Q682,482 680,440 L676,392 Q672,372 640,368 L600,360 C560,330 520,303 440,300 C380,298 330,300 290,318 L235,352 C150,360 70,372 42,385 Q22,395 24,420 L28,465 Q32,485 60,485 L89,485')} A${R(62)} ${R(62)} 0 0 0 ${T(213,485)} L${T(492,485)} A${R(62)} ${R(62)} 0 0 0 ${T(616,485)} Z" fill="url(#c-bd)" stroke="#172554" stroke-width="1"/>
  <path d="${pth('M89,484')} A${R(62)} ${R(62)} 0 0 0 ${T(213,484)}" fill="none" stroke="#172554" stroke-width="2.5" opacity=".5"/><path d="${pth('M492,484')} A${R(62)} ${R(62)} 0 0 0 ${T(616,484)}" fill="none" stroke="#172554" stroke-width="2.5" opacity=".5"/>
  <path d="${pth('M258,366 C290,340 330,322 388,318 L392,366 Z')}" fill="url(#c-gl)" stroke="#0f172a" stroke-width="2.2"/>
  <path d="${pth('M402,318 C450,316 480,320 494,327 L494,363 L402,366 Z')}" fill="url(#c-gl)" stroke="#0f172a" stroke-width="2.2"/>
  <path d="${pth('M502,330 C516,335 526,343 532,353 L502,358 Z')}" fill="url(#c-gl)" stroke="#0f172a" stroke-width="2"/>
  <path d="${pth('M240,350 C300,312 340,305 400,303')}" fill="none" stroke="#bfdbfe" stroke-width="2" opacity=".7"/>
  <path d="${pth('M50,392 C200,372 450,368 660,378')}" fill="none" stroke="#fff" stroke-width="2.5" opacity=".5"/>
  <path d="${pth('M120,440 C260,432 450,428 600,432')}" fill="none" stroke="#1e3a8a" stroke-width="1.4" opacity=".7"/>
  <path d="${pth('M397,320 L397,478')}" stroke="#172554" stroke-width="1.3"/><path d="${pth('M255,368 Q250,420 240,470')}" fill="none" stroke="#172554" stroke-width="1.3"/><path d="${pth('M535,356 Q545,420 520,470')}" fill="none" stroke="#172554" stroke-width="1.2"/>
  <path d="${pth('M340,392 L370,392')}" stroke="url(#c-ch)" stroke-width="4" stroke-linecap="round"/><path d="${pth('M470,390 L500,390')}" stroke="url(#c-ch)" stroke-width="4" stroke-linecap="round"/>
  <path d="${pth('M262,366 L238,362 L232,378 L256,380 Z')}" fill="#1e3a8a" stroke="#172554" stroke-width=".8"/>
  <path d="${pth('M30,404 Q60,394 102,397 L94,411 Q60,414 32,416 Z')}" fill="#fefce8" stroke="#a16207" stroke-width=".8"/><path d="${pth('M45,404 L90,401')}" stroke="#fff" stroke-width="1.6"/>
  <path d="${pth('M28,440 L80,440 L76,458 L30,458 Z')}" fill="#1e293b"/><path d="${pth('M34,446 L74,446 M34,452 L72,452')}" stroke="#64748b" stroke-width="1"/>
  <path d="${pth('M610,388 L676,392 L677,404 L616,402 Z')}" fill="#ef4444" stroke="#7f1d1d" stroke-width=".9"/><path d="${pth('M620,396 L672,398')}" stroke="#fbbf24" stroke-width="1.5"/>
  <path d="${pth('M215,478 L490,478')}" stroke="#172554" stroke-width="3" opacity=".6"/>
  <circle cx="${f1(w1)}" cy="${f1(wy)}" r="24" fill="#0b0f19"/><circle cx="${f1(w2)}" cy="${f1(wy)}" r="24" fill="#0b0f19"/>
  ${gWheel(w1,wy,D,t0,t1,turns)}${gWheel(w2,wy,D,t0,t1,turns)}`}
/* طريق إسفلتي واقعي */
function gRoad(W,y0,y1){const m=(y0+y1)/2;let r=`<defs><linearGradient id="r-as" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b7280"/><stop offset=".5" stop-color="#4b5563"/><stop offset="1" stop-color="#374151"/></linearGradient><pattern id="r-gr" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".6" fill="#9ca3af" opacity=".5"/><circle cx="4" cy="4" r=".5" fill="#111827" opacity=".4"/></pattern></defs>`;
  r+=`<rect x="0" y="${y0-14}" width="${W}" height="14" fill="#d6d3d1"/>`+Array.from({length:Math.ceil(W/40)},(_,k)=>`<rect x="${k*40}" y="${y0-6}" width="20" height="6" fill="${k%2?'#f8fafc':'#dc2626'}"/><rect x="${k*40+20}" y="${y0-6}" width="20" height="6" fill="${k%2?'#dc2626':'#f8fafc'}"/>`).join('');
  r+=`<rect x="0" y="${y0}" width="${W}" height="${y1-y0}" fill="url(#r-as)"/><rect x="0" y="${y0}" width="${W}" height="${y1-y0}" fill="url(#r-gr)"/><rect x="0" y="${y0}" width="${W}" height="3" fill="#1f2937" opacity=".5"/>`;
  r+=Array.from({length:Math.ceil(W/60)},(_,k)=>`<rect x="${k*60+10}" y="${m+8}" width="34" height="4" rx="1" fill="#f8fafc" opacity=".9"/>`).join('');
  r+=`<rect x="0" y="${y1-6}" width="${W}" height="3" fill="#fde047"/><rect x="0" y="${y1}" width="${W}" height="10" fill="#a8a29e"/>`;return r}
function gFlag(x,y0,y1,c){return `<rect x="${x-1.5}" y="${y0}" width="3" height="${y1-y0}" fill="#e5e7eb"/><line x1="${x}" y1="${y0}" x2="${x}" y2="${y1}" stroke="#475569" stroke-width="3"/><path d="M${x+1},${y0} q14,-4 26,3 q-12,5 -26,10 Z" fill="${c}"/>`}

function gCarS(x,y,sc,D,t0,t1,turns){return `<g transform="translate(${x} ${y}) scale(${sc})">${gCar(0,0,D,t0,t1,turns)}</g>`}

/* ===== مشاهد مجسمة متحركة للدروس النموذجية (الوحدتان الأولى والثانية) بأسلوب الوحدتين الرابعة والخامسة — اعتمدها المدرب 5 نوفمبر ===== */
const zS=(D,t0,inner)=>scShow(D,t0,D-.1,`<g>${inner}</g>`,true);
const zT=(x,y,t,c,w)=>scTag(x,y,t,c,w||Math.max(44,t.length*9.5+30));
/* أسطوانة كتلة معدنية لامعة */
function gCyl(cx,yb,w,h,lab){const r=w/2,ry=w*.16;return `<defs><linearGradient id="z-cy" x1="0" x2="1"><stop offset="0" stop-color="#475569"/><stop offset=".3" stop-color="#e2e8f0"/><stop offset=".55" stop-color="#94a3b8"/><stop offset="1" stop-color="#1e293b"/></linearGradient><radialGradient id="z-ct" cx="40%" cy="40%" r="70%"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#94a3b8"/></radialGradient></defs>`+gSh(cx+6,yb+2,r*1.15)+
  `<path d="M${cx-r},${yb-h} L${cx-r},${yb} A${r} ${ry} 0 0 0 ${cx+r},${yb} L${cx+r},${yb-h} Z" fill="url(#z-cy)" stroke="#334155" stroke-width=".8"/><ellipse cx="${cx}" cy="${yb-h}" rx="${r}" ry="${ry}" fill="url(#z-ct)" stroke="#475569" stroke-width=".8"/>`+
  `<rect x="${cx-4}" y="${yb-h-ry-12}" width="8" height="12" rx="2" fill="#64748b"/><path d="M${cx-7},${yb-h-ry-12} a7 7 0 1 1 14 0" fill="none" stroke="#475569" stroke-width="3"/>`+
  `<rect x="${cx-r+5}" y="${yb-h+ry+4}" width="5" height="${h-ry-10}" rx="2.5" fill="#fff" opacity=".45"/>`+
  (lab?`<text x="${cx}" y="${yb-h/2+6}" text-anchor="middle" font-size="${lab.length>4?13:16}" font-weight="900" fill="#fff" direction="ltr" style="paint-order:stroke;stroke:#1e293b;stroke-width:3px">${lab}</text>`:'')}
/* مسطرة مترية خشبية مجسمة */
function gRuler(x,y,L,o){o=o||{};const h=o.h||30,d=8,n=o.n||10;let r=`<defs><linearGradient id="z-ru" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fef3c7"/><stop offset=".5" stop-color="#fcd34d"/><stop offset="1" stop-color="#d97706"/></linearGradient></defs>`+gSh(x+L/2,y+h+6,L*.5);
  r+=`<polygon points="${x},${y} ${x+L},${y} ${x+L+d},${y-d*.7} ${x+d},${y-d*.7}" fill="#fde68a" stroke="#b45309" stroke-width=".6"/><polygon points="${x+L},${y} ${x+L+d},${y-d*.7} ${x+L+d},${y+h-d*.7} ${x+L},${y+h}" fill="#b45309"/><rect x="${x}" y="${y}" width="${L}" height="${h}" fill="url(#z-ru)" stroke="#92400e" stroke-width=".8"/>`;
  const sub=o.sub||10;for(let i=0;i<=n*sub;i++){const X=x+8+(L-16)*i/(n*sub),big=i%sub===0,mid=sub===10&&i%5===0;r+=`<line x1="${f1(X)}" y1="${y}" x2="${f1(X)}" y2="${y+(big?14:mid?10:6)}" stroke="#451a03" stroke-width="${big?1.4:.7}"/>`;
    if(big&&o.lab!==false)r+=`<text x="${f1(X)}" y="${y+h-4}" text-anchor="middle" font-size="${o.fs||10}" font-weight="800" fill="#451a03" direction="ltr">${o.lab?o.lab(i/sub):i/sub}</text>`}
  return r+`<rect x="${x+2}" y="${y+2}" width="${L-4}" height="3" fill="#fff" opacity=".45"/>`}
/* عداد سرعة لامع بعقرب يتحرك */
function gGauge(cx,cy,R,D,t0,t1,frac,txt){const a0=-120,a1=a0+240*frac;let g=`<defs><radialGradient id="z-gf" cx="45%" cy="38%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#cbd5e1"/></radialGradient><linearGradient id="z-gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#94a3b8"/><stop offset="1" stop-color="#1e293b"/></linearGradient></defs>`+gSh(cx,cy+R+10,R*.9);
  g+=`<circle cx="${cx}" cy="${cy}" r="${R+7}" fill="url(#z-gr)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#z-gf)"/>`;
  const P=(a,r)=>[cx+r*Math.sin(a*Math.PI/180),cy-r*Math.cos(a*Math.PI/180)];
  const [ax,ay]=P(-120,R-10),[bx,by]=P(120,R-10);g+=`<path d="M${f1(ax)},${f1(ay)} A${R-10} ${R-10} 0 1 1 ${f1(bx)},${f1(by)}" fill="none" stroke="#e2e8f0" stroke-width="7"/>`;
  const [mx,my]=P(60,R-10);g+=`<path d="M${f1(mx)},${f1(my)} A${R-10} ${R-10} 0 0 1 ${f1(bx)},${f1(by)}" fill="none" stroke="#ef4444" stroke-width="7"/>`;
  for(let i=0;i<=12;i++){const a=-120+20*i,[p,q]=P(a,R-16),[u,v]=P(a,R-(i%2?22:27));g+=`<line x1="${f1(p)}" y1="${f1(q)}" x2="${f1(u)}" y2="${f1(v)}" stroke="#0f172a" stroke-width="${i%2?1:2}"/>`}
  g+=`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-R+18}" stroke="#ea580c" stroke-width="3.5" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t1,D])}" values="${a0} ${cx} ${cy};${a0} ${cx} ${cy};${a1} ${cx} ${cy};${a1} ${cx} ${cy}"/></line><circle cx="${cx}" cy="${cy}" r="6" fill="#0f172a"/>`;
  if(txt)g+=`<rect x="${cx-34}" y="${cy+R*.35}" width="68" height="20" rx="4" fill="#0f172a"/><text x="${cx}" y="${cy+R*.35+15}" text-anchor="middle" font-size="12" font-weight="800" fill="#4ade80" direction="ltr" font-family="Consolas,monospace">${txt}</text>`;
  return g}
/* ميزان رقمي لامع بشاشة */
function gScale(x,yb,w,txt){const h=54,d=16;return `<defs><linearGradient id="z-sb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#1e293b"/></linearGradient><linearGradient id="z-sp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#94a3b8"/></linearGradient></defs>`+gSh(x+w/2+6,yb+2,w*.55)+
  `<polygon points="${x},${yb-h} ${x+w},${yb-h} ${x+w+d},${yb-h-d*.7} ${x+d},${yb-h-d*.7}" fill="#475569"/><polygon points="${x+w},${yb-h} ${x+w+d},${yb-h-d*.7} ${x+w+d},${yb-d*.7} ${x+w},${yb}" fill="#0f172a"/><rect x="${x}" y="${yb-h}" width="${w}" height="${h}" rx="6" fill="url(#z-sb)"/>`+
  `<polygon points="${x+14},${yb-h-4} ${x+w-14},${yb-h-4} ${x+w+d-18},${yb-h-d*.7-8} ${x+d+10},${yb-h-d*.7-8}" fill="url(#z-sp)" stroke="#64748b" stroke-width=".8"/>`+
  `<rect x="${x+w*.18}" y="${yb-h+12}" width="${w*.64}" height="30" rx="5" fill="#052e16" stroke="#94a3b8" stroke-width="1.5"/><text x="${x+w/2}" y="${yb-h+33}" text-anchor="middle" font-size="${txt.length>6?15:19}" font-weight="900" fill="#4ade80" direction="ltr" font-family="Consolas,monospace">${txt}</text>`+
  `<rect x="${x+6}" y="${yb-h+4}" width="${w-12}" height="3" rx="1.5" fill="#fff" opacity=".25"/>`}
/* حامل معمل لامع: قاعدة وساق وذراع أفقي، ويعيد نقطة التعليق */
function gStand(x,yb,top,ax){const bw=92,th=14,dx=28,dy=22,rx=x+bw/2+dx/2,ry=yb-th-dy/2,arm=ax-rx-7.5;return `<defs><linearGradient id="z-rod" x1="0" x2="1"><stop offset="0" stop-color="#64748b"/><stop offset=".45" stop-color="#f8fafc"/><stop offset="1" stop-color="#475569"/></linearGradient><linearGradient id="z-arm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#64748b"/></linearGradient><linearGradient id="z-bs" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#334155"/></linearGradient></defs>`+gSh(x+bw/2+dx/2,yb+2,bw*.62)+
  `<polygon points="${x},${yb-th} ${x+bw},${yb-th} ${x+bw+dx},${yb-th-dy} ${x+dx},${yb-th-dy}" fill="url(#z-bs)"/><polygon points="${x+bw},${yb-th} ${x+bw+dx},${yb-th-dy} ${x+bw+dx},${yb-dy} ${x+bw},${yb}" fill="#0f172a"/><rect x="${x}" y="${yb-th}" width="${bw}" height="${th}" fill="#1e293b"/><line x1="${x+3}" y1="${yb-th+2}" x2="${x+bw-3}" y2="${yb-th+2}" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>`+
  `<ellipse cx="${rx}" cy="${ry}" rx="12" ry="4" fill="#94a3b8"/><rect x="${rx-4.5}" y="${top}" width="9" height="${ry-top}" rx="3" fill="url(#z-rod)"/><rect x="${rx-10.5}" y="${top+16}" width="22" height="18" rx="3" fill="#1e293b"/><rect x="${rx+7.5}" y="${top+21}" width="${arm}" height="8" rx="3" fill="url(#z-arm)" stroke="#475569" stroke-width=".6"/>`}
/* كرة فولاذية لامعة */
const gBall=(cx,cy,r)=>`<defs><radialGradient id="z-bl" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#cbd5e1"/><stop offset="1" stop-color="#334155"/></radialGradient></defs><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#z-bl)" stroke="#1e293b" stroke-width=".8"/>`;
/* ميزان نابضي أفقي لامع */
function gSpring(x1,y,x2){const L=x2-x1;return `<defs><linearGradient id="z-ss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".5" stop-color="#38bdf8"/><stop offset="1" stop-color="#0369a1"/></linearGradient></defs>`+
  `<line x1="${x1}" y1="${y}" x2="${x1+20}" y2="${y}" stroke="#334155" stroke-width="2.5"/><rect x="${x1+20}" y="${y-11}" width="${L-44}" height="22" rx="8" fill="url(#z-ss)" stroke="#075985" stroke-width=".8"/>`+
  Array.from({length:9},(_,i)=>`<line x1="${f1(x1+34+i*(L-72)/8)}" y1="${y-11}" x2="${f1(x1+34+i*(L-72)/8)}" y2="${y-3}" stroke="#0c4a6e" stroke-width="1"/>`).join('')+
  `<rect x="${x1+24}" y="${y-8}" width="${L-52}" height="3" rx="1.5" fill="#fff" opacity=".55"/><circle cx="${x2-12}" cy="${y}" r="9" fill="none" stroke="#475569" stroke-width="3.5"/>`}

/* 1) مشهد الحركة: سيارة على طريق بين علمين (اعتمده المدرب) */
function qMotion(){const W=640,H=320,FY=220,D=10;let b=gDefs()+gCarDefs()+stage(W,H,FY);
  b+=gRoad(W,FY-34,FY+40)+gFlag(210,FY-70,FY-34,"#16a34a")+gFlag(610,FY-70,FY-34,"#dc2626")+`<rect x="208" y="${FY-34}" width="4" height="74" fill="#fff" opacity=".85"/><rect x="608" y="${FY-34}" width="4" height="74" fill="#fff" opacity=".85"/>`;
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,6,D])}" values="0 0;0 0;400 0;400 0"/>${gCarS(13,FY+16,.75,D,1,6,6)}</g>`;
  b+=gWatch(560,104,D,1,6);
  b+=zS(D,6,dim(210,610,FY+68,'x = 20 m'))+zS(D,6,scTag(440,96,'t = 2 s','#0369a1',100))+zS(D,7.5,scTag(250,96,'v = x / t = 10 m/s','#7e22ce',210));
  b+=scCap(D,W,'1. السيارة تبدأ الحركة من نقطة البداية','#475569',0,3.5)+scCap(D,W,'2. نقيس المسافة والزمن','#b45309',3.5,7.5)+scCap(D,W,'3. ومنهما نحسب السرعة','#7e22ce',7.5,D);
  return svg(W,H,b,'kScene')}

/* 2) من الكميات الأساسية إلى المشتقة: الطول ÷ الزمن = السرعة */
function qTypes(){const W=640,H=290,FY=250,D=9;let b=gDefs()+stage(W,H,FY);
  b+=zS(D,.3,gRuler(26,170,190,{n:5,sub:10,h:30})+zT(125,128,'الطول  m','#1d4ed8'));
  b+=zS(D,2.6,`<text x="250" y="190" text-anchor="middle" font-size="40" font-weight="900" fill="#1e3a5f">÷</text>`+gWatch(318,170,D,2.6,5)+zT(318,104,'الزمن  s','#15803d'));
  b+=zS(D,5.4,vArr(374,170,432,170,'#ea580c',8)+gGauge(526,176,56,D,5.6,7.2,.42,'10 m/s')+zT(526,92,'السرعة  m/s','#7e22ce'));
  b+=zS(D,.3,zT(170,272,'كميتان أساسيتان','#334155',150))+zS(D,5.4,zT(526,272,'كمية مشتقة','#7e22ce',120));
  b+=scCap(D,W,'1. الطول كمية أساسية','#1d4ed8',0,2.6)+scCap(D,W,'2. والزمن كمية أساسية','#15803d',2.6,5.4)+scCap(D,W,'3. الطول ÷ الزمن = السرعة: كمية مشتقة','#7e22ce',5.4,D);
  return svg(W,H+6,b,'kScene')}

/* 3) المتر يساوي 100 سنتيمتر */
function qMeter(o){o=o||{};const W=640,H=230,FY=200,D=7,x=40,L=560,y=104;let b=gDefs()+stage(W,H,FY);
  b+=gRuler(x,y,L,{n:10,sub:10,h:40,fs:12,lab:i=>i*10})+`<text x="${x+L+14}" y="${y+34}" font-size="12" font-weight="800" fill="#78350f" direction="ltr">cm</text>`;
  b+=`<rect x="${x+8}" y="${y+44}" width="0" height="7" rx="3.5" fill="#2563eb"><animate attributeName="width" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,.6,4,D])}" values="0;0;${L-16};${L-16}"/></rect>`;
  b+=zS(D,4,dim(x+8,x+L-8,y+78,o.lab||'1 m = 100 cm'));
  b+=scCap(D,W,'المتر الواحد = 100 سنتيمتر','#1d4ed8',0,D);
  return svg(W,H,b,'kScene')}

/* الميزانان: وحدتا طرفي القانون متساويتان */
function unitBal(L,R){const W=640,H=280,FY=236,D=7;let b=gDefs()+stage(W,H,FY);
  const sc=(x,t,c,lab,t0)=>zS(D,t0,gScale(x,FY-6,200,t)+zT(x+108,FY-104,lab,c,120));
  b+=sc(380,L,'#b91c1c','الطرف الأيسر',.4)+sc(60,R,'#1d4ed8','الطرف الأيمن',1.8);
  b+=zS(D,3.2,`<text x="322" y="${FY-30}" text-anchor="middle" font-size="44" font-weight="900" fill="#15803d">=</text>`);
  b+=scCap(D,W,'نقرأ وحدة كل طرف من القانون','#334155',0,3.2)+scCap(D,W,'الوحدتان متساويتان ✓ القانون صحيح','#15803d',3.2,D);
  return svg(W,H,b,'kScene')}

/* الكمية القياسية والمتجهة: أسطوانتان متماثلتان، والثانية تؤثر فيها قوة */
function sVsV(){const W=640,H=270,FY=230,D=7;let b=gDefs()+stage(W,H,FY)+kBench(150,FY,10,630);
  const yb=FY-18,h=92;b+=gCyl(150,yb,84,h,'m = 5 kg')+gCyl(420,yb,84,h,'');
  b+=zS(D,1,vArr(472,yb-h/2,610,yb-h/2,'#ea580c',10)+zT(545,yb-h/2-34,'F = 10 N','#b45309',110));
  b+=zT(150,70,'قياسية: مقدار ووحدة','#b45309',190)+zS(D,1,zT(470,70,'متجهة: مقدار ووحدة واتجاه','#1d4ed8',240));
  b+=scCap(D,W,'الكتلة 5 kg: لا تحتاج اتجاها','#b45309',0,3)+scCap(D,W,'القوة 10 N نحو اليمين: لها اتجاه','#1d4ed8',3,D);
  return svg(W,H,b,'kScene')}

/* السيارة على الطريق مع بطاقات قيم (السرعة المتوسطة، التسارع، الطاقة الحركية) */
function fTrack(o){o=o||{};const W=640,H=300,FY=200,D=8,acc=/a\s*=/.test(o.b||'');let b=gDefs()+gCarDefs()+stage(W,H,FY);
  b+=gRoad(W,FY-34,FY+40);if(o.x!==undefined)b+=gFlag(210,FY-70,FY-34,"#16a34a")+gFlag(610,FY-70,FY-34,"#dc2626")+`<rect x="208" y="${FY-34}" width="4" height="74" fill="#fff" opacity=".85"/><rect x="608" y="${FY-34}" width="4" height="74" fill="#fff" opacity=".85"/>`;
  const sp=acc?` calcMode="spline" keySplines="0 0 1 1;.55 0 .9 .6;0 0 1 1"`:'';
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,5.5,D])}" values="0 0;0 0;400 0;400 0"${sp}/>${gCarS(13,FY+16,.75,D,1,5.5,6)}</g>`;
  if(o.a)b+=zS(D,.5,zT(125,70,o.a,'#0369a1'));if(o.b)b+=zS(D,1.5,zT(320,70,o.b,'#b45309'));if(o.c)b+=zS(D,5.5,zT(515,70,o.c,'#7c3aed'));
  if(o.x)b+=zS(D,5.5,dim(210,610,FY+66,o.x,330));
  return svg(W,H,b,'kScene')}

/* الحركة في بعد واحد: سيارة على طريق مستقيم على محور x (مشهد أبسط — طلب المدرب 07:20) */
function fAir(){const W=640,H=250,FY=170,D=7;let b=gDefs()+gCarDefs()+stage(W,H,FY);
  b+=gRoad(W,FY-34,FY+40);
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,.8,5.5,D])}" values="0 0;0 0;400 0;400 0"/>${gCarS(13,FY+16,.75,D,.8,5.5,6)}</g>`;
  b+=vArr(40,FY+64,580,FY+64,'#16a34a',7)+zT(606,FY+64,'x','#15803d',40)+`<circle cx="40" cy="${FY+64}" r="5" fill="#15803d"/><text x="40" y="${FY+86}" text-anchor="middle" font-size="13" font-weight="900" fill="#15803d" direction="ltr">0</text>`;
  b+=scCap(D,W,'حركة في بعد واحد: على محور x فقط','#15803d',0,D);
  return svg(W,H+26,b,'kScene')}
/* صندوق خشبي على طاولة يسحبه ميزان نابضي، مع أسهم القوى */
function fPull(o){o=o||{};const W=640,H=300,FY=196,D=7;let b=gDefs()+stage(W,H,FY);
  /* بلا طاولة وبلا ميزان نابضي: الصندوق على الأرض وأسهم القوى فقط (طلب المدرب 07:27) */
  const x=o.x?80:200,w=130,h=80,yb=FY+34,y=yb-h,bx=x+w/2,by=y+h*.5,mv=o.x?150:0;
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1.2,5,D])}" values="0 0;0 0;${mv} 0;${mv} 0"/>${gBox(x,y,w,h,24,'')}`;
  if(o.F)b+=zS(D,.6,vArr(x+w+28,by,x+w+160,by,'#ea580c',9)+zT(x+w+94,by-30,o.F,'#b45309'));
  if(o.ang)b+=zS(D,.6,vArr(x+w+22,by,x+w+22+150*Math.cos(dg(o.ang)),by-150*Math.sin(dg(o.ang)),'#ea580c',9)+zT(x+w+22+150*Math.cos(dg(o.ang))+56,by-150*Math.sin(dg(o.ang))-6,o.Fa||'F','#b45309')+`<line x1="${x+w+22}" y1="${by}" x2="${x+w+152}" y2="${by}" stroke="#7c3aed" stroke-width="1.6" stroke-dasharray="5 4"/>`+arcA(x+w+22,by,44,0,o.ang,'#7c3aed','')+zT(x+w+122,by-24,'θ = '+o.ang+'°','#7c3aed',80));
  if(o.f)b+=zS(D,1.8,vArr(x-6,by+20,x-96,by+20,'#2563eb',9)+zT(x-50,by-14,o.f,'#1d4ed8'));
  if(o.N)b+=zS(D,3,vArr(bx,y-20,bx,y-86,'#16a34a',9)+zT(bx+20+Math.max(44,o.N.length*9.5+30)/2,y-72,o.N,'#15803d'));
  if(o.W)b+=zS(D,3,vArr(bx,yb+4,bx,yb+58,'#dc2626',9)+zT(bx-20-Math.max(44,o.W.length*9.5+30)*TS/2,yb+48,o.W,'#b91c1c'));
  b+='</g>';
  if(o.x)b+=zS(D,5,dim(bx,bx+mv,yb+40,o.x));
  if(o.note)b+=scCap(D,W,o.note,'#334155',0,D);
  return svg(W,H+10,b,'kScene')}
/* أسطوانة كتلة تؤثر فيها قوة أفقية فتتسارع */
function fCylF(o){o=o||{};const W=640,H=270,FY=230,D=7;let b=gDefs()+stage(W,H,FY)+kBench(150,FY,10,630);const yb=FY-18,h=104,cx=150;
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1.6,5.4,D])}" values="0 0;0 0;150 0;150 0" calcMode="spline" keySplines="0 0 1 1;.55 0 .9 .6;0 0 1 1"/>${gCyl(cx,yb,88,h,o.m||'m')}`+zS(D,.5,vArr(cx+52,yb-h/2,cx+190,yb-h/2,'#ea580c',10)+zT(cx+122,yb-h/2-34,o.F||'F','#b45309'))+'</g>';
  if(o.a)b+=zS(D,2,zT(540,80,o.a,'#7c3aed'))+zS(D,2,vArr(470,110,600,110,'#7c3aed',6));
  if(o.note)b+=scCap(D,W,o.note,'#334155',0,D);
  return svg(W,H,b,'kScene')}

/* حامل معمل وكتلة معلقة: الوزن، أو جسم على ارتفاع h */
function fStand(o){o=o||{};const W=640,H=350,FY=310,D=6;let b=gDefs()+stage(W,H,FY)+kBench(150,FY,10,630);const yb=Math.round((150+FY)/2)+10,top=30,sx=216,hx=sx+180,hy=top+25,cy=hy+40,ch=70;
  b+=gStand(sx,yb,top,hx);
  b+=`<g><animateTransform attributeName="transform" type="rotate" dur="3s" repeatCount="indefinite" values="-2 ${hx} ${hy};2 ${hx} ${hy};-2 ${hx} ${hy}"/><line x1="${hx}" y1="${hy}" x2="${hx}" y2="${cy-18}" stroke="#334155" stroke-width="2"/>${gCyl(hx,cy+ch,56,ch,o.m||'m')}</g>`;
  if(o.W)b+=zS(D,.8,vArr(hx,cy+ch+10,hx,cy+ch+70,'#dc2626',8)+zT(hx+60,cy+ch+56,o.W,'#b91c1c'));
  if(o.h)b+=zS(D,.8,`<line x1="${hx+56}" y1="${cy+ch}" x2="${hx+56}" y2="${yb}" stroke="#0369a1" stroke-width="2" stroke-dasharray="6 5"/><line x1="${hx+44}" y1="${cy+ch}" x2="${hx+68}" y2="${cy+ch}" stroke="#0369a1" stroke-width="2"/><line x1="${hx+44}" y1="${yb}" x2="${hx+68}" y2="${yb}" stroke="#0369a1" stroke-width="2"/>`+zT(hx+100,(cy+ch+yb)/2,o.h,'#0369a1'));
  if(o.pe)b+=zS(D,1.8,zT(520,70,o.pe,'#7c3aed'));
  return svg(W,H,b,'kScene')}

/* السقوط الحر: كرة تسقط وتتحول طاقة الوضع إلى طاقة حركية */
function fFall(o){o=o||{};const W=640,H=330,FY=300,D=8,t0=1.2,t1=3.2;let b=gDefs()+stage(W,H,FY)+kBench(190,FY,10,630);const yb=FY-16,top=58,bx=250,y0=104,y1=yb-22;
  b+=gStand(60,yb,top,bx+6)+`<rect x="${bx-14}" y="${top+30}" width="28" height="22" rx="4" fill="#1e3a8a"/>`+gSh(bx+3,yb+2,36)+`<path d="M${bx-32},${yb-7} L${bx-32},${yb-1} A32 7 0 0 0 ${bx+32},${yb-1} L${bx+32},${yb-7} Z" fill="#111827"/><ellipse cx="${bx}" cy="${yb-7}" rx="32" ry="7" fill="#334155"/><ellipse cx="${bx}" cy="${yb-7}" rx="22" ry="4.5" fill="#1f2937"/><ellipse cx="${bx-8}" cy="${yb-9}" rx="10" ry="1.6" fill="#fff" opacity=".2"/>`;
  const kt=scK(D,[0,t0,t1,D]),sp=` calcMode="spline" keySplines="0 0 1 1;.5 0 1 1;0 0 1 1"`;
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${kt}" values="0 0;0 0;0 ${y1-y0};0 ${y1-y0}"${sp}/>${gBall(bx,y0,15)}</g>`;
  b+=`<line x1="${bx+40}" y1="${y0}" x2="${bx+40}" y2="${y1}" stroke="#0369a1" stroke-width="2" stroke-dasharray="6 5"/>`+zT(bx+70,(y0+y1)/2,'h','#0369a1',36);
  const base=250,M=150,bar=(X,c,t,vals)=>`<rect x="${X}" y="${base-M}" width="40" height="${M}" rx="5" fill="${c}" opacity=".12"/><rect x="${X}" width="40" rx="5" fill="${c}"><animate attributeName="y" dur="${D}s" repeatCount="indefinite" keyTimes="${kt}" values="${vals.map(v=>base-v).join(';')}"${sp}/><animate attributeName="height" dur="${D}s" repeatCount="indefinite" keyTimes="${kt}" values="${vals.join(';')}"${sp}/></rect><text x="${X+20}" y="${base+18}" text-anchor="middle" font-size="13" font-weight="900" fill="${c}" direction="ltr">${t}</text>`;
  b+=bar(400,'#2563eb','PE',[M,M,4,4])+bar(456,'#16a34a','KE',[4,4,M,M])+bar(512,'#7c3aed','ME',[M,M,M,M]);
  b+=zT(476,base-M-28,o.me||'ME ثابتة','#7c3aed');
  b+=scCap(D,W,'في الأعلى: طاقة الوضع أكبر ما يمكن','#2563eb',0,t1)+scCap(D,W,'قبل الاصطدام: تحولت إلى طاقة حركية','#16a34a',t1,D);
  return svg(W,H+16,b,'kScene')}




const U01=[['الطول','L','المتر','m','L'],['الزمن','t','الثانية','s','t'],['الكتلة','m','الكيلوجرام','kg','m'],['شدة التيار الكهربائي','I','الأمبير','A','I'],['درجة الحرارة','T','الكلفن','K','T'],['شدة الإضاءة','I_v','الشمعة (الكانديلا)','cd','Iv'],['كمية المادة','n','المول','mol','n']];
const D01=[['المساحة','A','طول × طول','m²','المتر المربع'],['الحجم','V','طول × طول × طول','m³','المتر المكعب'],['السرعة','v','طول مقسوم على زمن','m/s','متر لكل ثانية'],['التسارع','a','سرعة مقسومة على زمن','m/s²','متر لكل ثانية تربيع'],['القوة','F','كتلة × تسارع','N = kg·m/s²','النيوتن'],['الشغل','W','قوة × مسافة','J = kg·m²/s²','الجول'],['الطاقة','E','مثل الشغل','J','الجول']];
const SAYU01=['الطُّولُ رَمْزُهُ `L`، وَوَحْدَةُ قِيَاسِهِ الْمِتْرُ، وَرَمْزُهَا `m`.','الزَّمَنُ رَمْزُهُ `t`، وَوَحْدَةُ قِيَاسِهِ الثَّانِيَةُ، وَرَمْزُهَا `s`.','الْكُتْلَةُ رَمْزُهَا `m`، وَوَحْدَةُ قِيَاسِهَا الْكِيلُوجْرَامُ، وَرَمْزُهَا `kg`.','شِدَّةُ التَّيَّارِ الْكَهْرَبَائِيِّ رَمْزُهَا `I`، وَوَحْدَةُ قِيَاسِهَا الْأَمْبِيرُ، وَرَمْزُهَا `A`.','دَرَجَةُ الْحَرَارَةِ رَمْزُهَا `T`، وَوَحْدَةُ قِيَاسِهَا الْكِلْفِنُ، وَرَمْزُهَا `K`.','شِدَّةُ الْإِضَاءَةِ وَوَحْدَةُ قِيَاسِهَا الشَّمْعَةُ، أَوِ الْكَانْدِيلَا، وَرَمْزُهَا `cd`.','كَمِّيَّةُ الْمَادَّةِ رَمْزُهَا `n`، وَوَحْدَةُ قِيَاسِهَا الْمُولُ، وَرَمْزُهَا `mol`.'];
const SAYD01=['الْمِسَاحَةُ طُولٌ فِي طُولٍ، وَوَحْدَتُهَا الْمِتْرُ الْمُرَبَّعُ.','الْحَجْمُ طُولٌ فِي طُولٍ فِي طُولٍ، وَوَحْدَتُهُ الْمِتْرُ الْمُكَعَّبُ.','السُّرْعَةُ طُولٌ مَقْسُومٌ عَلَى زَمَنٍ، وَوَحْدَتُهَا مِتْرٌ لِكُلِّ ثَانِيَهْ.','التَّسَارُعُ سُرْعَةٌ مَقْسُومَةٌ عَلَى زَمَنٍ، وَوَحْدَتُهُ مِتْرٌ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.','الْقُوَّةُ كُتْلَةٌ فِي تَسَارُعٍ، وَوَحْدَتُهَا النِّيُوتُنُ، وَيُسَاوِي كِيلُوجْرَامًا فِي مِتْرٍ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.','الشُّغْلُ قُوَّةٌ فِي مَسَافَةٍ، وَوَحْدَتُهُ الْجُولُ.','وَالطَّاقَةُ وَحْدَتُهَا الْجُولُ أَيْضًا، مِثْلَ الشُّغْلِ.'];
CARDS['0-1']={
  intro:{title:'الكمية الفيزيائية',sayT:'نَبْدَأُ وِحْدَتَنَا الْأُولَى بِتَعْرِيفِ الْكَمِّيَّةِ الْفِيزْيَائِيَّةِ.',steps:()=>[
    S(pt(B('الكمية الفيزيائية')+': صفة فيزيائية تصف ظاهرة طبيعية، يمكن قياسها أو حسابها.'),'الْكَمِّيَّةُ الْفِيزْيَائِيَّةُ: صِفَةٌ فِيزْيَائِيَّةٌ تَصِفُ ظَاهِرَةً طَبِيعِيَّةً، يُمْكِنُ قِيَاسُهَا أَوْ حِسَابُهَا.'),
    S(fig(qMotion(),'في ظاهرة الحركة: المسافة والزمن والسرعة كميات فيزيائية'),'شَاهِدِ الْمَشْهَدَ: السَّيَّارَةُ تَتَحَرَّكُ عَلَى الطَّرِيقِ بَيْنَ نُقْطَتَيْنِ، فَالْمَسَافَةُ الَّتِي تَقْطَعُهَا، وَالزَّمَنُ الَّذِي تَسْتَغْرِقُهُ، وَالسُّرْعَةُ الَّتِي تَسِيرُ بِهَا، كَمَا تَقِيسُهَا سَاعَةُ الْإِيقَافِ، كُلُّهَا كَمِّيَّاتٌ فِيزْيَائِيَّةٌ، لِأَنَّنَا نَقِيسُهَا بِأَرْقَامٍ وَوَحَدَاتْ.'),
    S(pt('أما '+B('الحركة واللون والصوت والضوء والحرارة')+' فليست كميات فيزيائية، لأنها لا تقاس ولا تتحدد بمقدار.'),'أَمَّا الْحَرَكَةُ وَاللَّوْنُ وَالصَّوْتُ وَالضَّوْءُ وَالْحَرَارَةُ، فَلَيْسَتْ كَمِّيَّاتٍ فِيزْيَائِيَّةً، لِأَنَّهَا لَا تُقَاسُ وَلَا تَتَحَدَّدُ بِمِقْدَارْ.')]},
  goals:{title:'أهداف الوحدة',sayT:'وَالْآنَ، لِنَتَعَرَّفْ عَلَى أَهْدَافِ الْوِحْدَةِ.',steps:()=>[
    S({html:`<div class="kc kPt kKeep kcB">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'فِي نِهَايَةِ هَذِهِ الْوِحْدَةِ، يَكُونُ الْمُتَدَرِّبُ قَادِرًا عَلَى:'),
    S({html:`<div class="kc kPt kKeep kcT"><b>1.</b> التعرف على الكمية الفيزيائية ووحدة القياس.</div>`},'التَّعَرُّفِ عَلَى الْكَمِّيَّةِ الْفِيزْيَائِيَّةِ وَوَحْدَةِ الْقِيَاسِ.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>2.</b> ذكر وحدات القياس الأساسية في الأنظمة العالمية: الجاوسي والبريطاني والدولي.</div>`},'ذِكْرِ وَحَدَاتِ الْقِيَاسِ الْأَسَاسِيَّةِ فِي الْأَنْظِمَةِ الْعَالَمِيَّةِ: الْجَاوْسِيِّ، وَالْبِرِيطَانِيِّ، وَالدَّوْلِيِّ.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>3.</b> ذكر بعض وحدات القياس المشتقة في النظام الدولي وكمياتها الفيزيائية.</div>`},'ذِكْرِ بَعْضِ وَحَدَاتِ الْقِيَاسِ الْمُشْتَقَّةِ فِي النِّظَامِ الدَّوْلِيِّ، وَكَمِّيَّاتِهَا الْفِيزْيَائِيَّةِ.'),
    S({html:`<div class="kc kPt kKeep kcT"><b>4.</b> ذكر أجزاء ومضاعفات وحدات القياس الدولي، والتحويل بينها.</div>`},'ذِكْرِ أَجْزَاءِ وَمُضَاعَفَاتِ وَحَدَاتِ الْقِيَاسِ الدَّوْلِيِّ، وَالتَّحْوِيلِ بَيْنَهَا.')]},
  types:{title:'أنواع الكميات الفيزيائية',sayT:'بَعْدَ أَنْ تَعَرَّفْنَا عَلَى أَهْدَافِ الْوِحْدَةِ، نَبْدَأُ أَوَّلَ مَوْضُوعَاتِهَا: أَنْوَاعُ الْكَمِّيَّاتِ الْفِيزْيَائِيَّةِ.',steps:()=>[
    S(pt('للكميات الفيزيائية نوعان:'),'لِلْكَمِّيَّاتِ الْفِيزْيَائِيَّةِ نَوْعَانِ:'),
    S(pt(B('1. الكميات الأساسية')+': كميات معرفة بذاتها، ولا تعرف بدلالة كميات فيزيائية أخرى، وعددها سبع.'),'الْأَوَّلُ: الْكَمِّيَّاتُ الْأَسَاسِيَّةُ، وَهِيَ كَمِّيَّاتٌ مُعَرَّفَةٌ بِذَاتِهَا، وَلَا تُعَرَّفُ بِدَلَالَةِ كَمِّيَّاتٍ فِيزْيَائِيَّةٍ أُخْرَى، وَعَدَدُهَا سَبْعْ.'),
    S(pt(B('2. الكميات المشتقة')+': كميات تشتق من الكميات الأساسية، وتعرف بدلالتها.'),'وَالثَّانِي: الْكَمِّيَّاتُ الْمُشْتَقَّةُ، وَهِيَ كَمِّيَّاتٌ تُشْتَقُّ مِنَ الْكَمِّيَّاتِ الْأَسَاسِيَّةِ، وَتُعَرَّفُ بِدَلَالَتِهَا.'),
    S(fig(qTypes(),'نقسم الطول على الزمن فنحصل على السرعة، وهي كمية مشتقة'),'لَاحِظِ الصُّورَةَ: نَقْسِمُ الطُّولَ عَلَى الزَّمَنِ، فَنَحْصُلُ عَلَى السُّرْعَةِ، وَهِيَ كَمِّيَّةٌ مُشْتَقَّةٌ مِنْ كَمِّيَّتَيْنِ أَسَاسِيَّتَيْنِ.'),
    S(pt('وأي كمية غير الكميات الأساسية السبع تعد كمية مشتقة، مثل: المساحة والحجم والكثافة والسرعة والتسارع والقوة والطاقة والضغط.'),'وَأَيُّ كَمِّيَّةٍ غَيْرِ الْكَمِّيَّاتِ الْأَسَاسِيَّةِ السَّبْعِ تُعَدُّ كَمِّيَّةً مُشْتَقَّةً، مِثْلَ: الْمِسَاحَةِ، وَالْحَجْمِ، وَالْكَثَافَةِ، وَالسُّرْعَةِ، وَالتَّسَارُعِ، وَالْقُوَّةِ، وَالطَّاقَةِ، وَالضَّغْطِ.')]},
  base:{title:'الكميات الأساسية في النظام الدولي SI',sayT:'لِنَتَعَرَّفِ الْآنَ عَلَى الْكَمِّيَّاتِ الْأَسَاسِيَّةِ السَّبْعِ، وَوَحَدَاتِهَا فِي النِّظَامِ الدَّوْلِيِّ.',steps:()=>[
    S({html:`<div class="kc kUH"><span>الكمية</span><span>رمز الكمية</span><span>وحدة القياس</span><span>رمز الوحدة</span></div>`},'هَذَا جَدْوَلُ الْكَمِّيَّاتِ الْأَسَاسِيَّةِ، نَقْرَؤُهُ مَعًا.')].concat(U01.map(([n,sy,u,us,ic],i)=>S({html:`<div class="kc kUR"><span style="display:flex;align-items:center;gap:2px">${qIco(ic)}${n}</span><span>${M(sy==='I_v'?'I<sub>v</sub>':sy)}</span><span>${u}</span><span class="kUS">${M(us)}</span></div>`},SAYU01[i])))},
  derived:{title:'الكميات المشتقة ووحداتها',sayT:'وَمِنَ الْكَمِّيَّاتِ الْأَسَاسِيَّةِ نَشْتَقُّ كَمِّيَّاتٍ أُخْرَى، وَهَذِهِ أَمْثِلَةٌ عَلَيْهَا.',steps:()=>[
    S({html:`<div class="kc kUH"><span>الكمية</span><span>رمز الكمية</span><span>كيف تشتق</span><span>الوحدة في SI</span></div>`},'نَقْرَأُ جَدْوَلَ الْكَمِّيَّاتِ الْمُشْتَقَّةِ.')].concat(D01.map(([n,sy,h,u],i)=>S({html:`<div class="kc kUR"><span>${n}</span><span>${M(sy)}</span><span>${h}</span><span class="kUS">${M(u)}</span></div>`},SAYD01[i])))},
  conv:{title:'قواعد بعض التحويلات الفيزيائية',sayT:'وَنَحْتَاجُ كَثِيرًا إِلَى التَّحْوِيلِ بَيْنَ الْوَحَدَاتِ، وَهَذِهِ قَوَاعِدُ أَسَاسِيَّةٌ.',steps:()=>[
    S(pt(M('1 m = 100 cm')+' المتر يساوي مئة سنتيمتر.'),'الْمِتْرُ يُسَاوِي مِئَةَ سَنْتِيمِتْرْ.'),
    S(pt(M('1 kg = 1000 g')+' الكيلوجرام يساوي ألف جرام.'),'الْكِيلُوجْرَامُ يُسَاوِي أَلْفَ جْرَامْ.'),
    S(pt(M('1 km = 1000 m')+' الكيلومتر يساوي ألف متر.'),'الْكِيلُومِتْرُ يُسَاوِي أَلْفَ مِتْرْ.'),
    S(pt(M('1 h = 3600 s')+' الساعة تساوي ثلاثة آلاف وست مئة ثانية.'),'السَّاعَةُ تُسَاوِي ثَلَاثَةَ آلَافٍ وَسِتَّ مِئَةِ ثَانِيَهْ.'),
    S(fig(qMeter(),'المتر الواحد مقسم إلى مئة سنتيمتر'),'لَاحِظِ الْمِسْطَرَةَ الْمِتْرِيَّةَ: الْمِتْرُ الْوَاحِدُ مُقَسَّمٌ إِلَى مِئَةِ سَنْتِيمِتْرْ.'),
    S(pt('للتحويل من وحدة كبيرة إلى صغيرة '+B('نضرب')+'، ومن وحدة صغيرة إلى كبيرة '+B('نقسم')+'.'),'وَالْقَاعِدَةُ: لِلتَّحْوِيلِ مِنْ وَحْدَةٍ كَبِيرَةٍ إِلَى وَحْدَةٍ صَغِيرَةٍ نَضْرِبُ، وَمِنْ وَحْدَةٍ صَغِيرَةٍ إِلَى وَحْدَةٍ كَبِيرَةٍ نَقْسِمُ.')]},
  ex1:{title:'مثال ١ · صفحة 12',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ مِثَالِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ، مِنْ صَفْحَةِ 12.',steps:()=>[
    S(q('حول '+M('500 cm')+' إلى المتر.','المثال · صفحة 12'),'حَوِّلْ خَمْسَ مِئَةِ سَنْتِيمِتْرٍ إِلَى الْمِتْرِ.'),
    S(gr(['500 cm'],'الطول بالمتر '+M('m')),'الْمُعْطَى أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الطُّولُ بِالْمِتْرِ.'),
    S(fig(qMeter({lab:'100 cm = 1 m'}),'كل مئة سنتيمتر تساوي مترا واحدا'),'لَاحِظِ الرَّسْمَ: كُلُّ مِئَةِ سَنْتِيمِتْرٍ تُسَاوِي مِتْرًا وَاحِدَا.'),
    S(st(1,'القاعدة: '+M('1 m = 100 cm')+'، ونحول من وحدة صغيرة إلى كبيرة فنقسم.'),'الْقَاعِدَةُ: الْمِتْرُ يُسَاوِي مِئَةَ سَنْتِيمِتْرٍ، وَنُحَوِّلُ مِنْ وَحْدَةٍ صَغِيرَةٍ إِلَى وَحْدَةٍ كَبِيرَةٍ، فَنَقْسِمُ.'),
    S(st(2,'التعويض: '+M('500 ÷ 100')),'نَقْسِمُ خَمْسَ مِئَةٍ عَلَى مِئَهْ.'),
    S(st(3,'الحساب: '+M('500 ÷ 100 = 5')+'<span class="kDirOn"></span>'),'فَيَكُونُ النَّاتِجُ خَمْسَهْ.'),
    S(res(M('500 cm = 5 m')),'النَّتِيجَةُ: خَمْسُ مِئَةِ سَنْتِيمِتْرٍ تُسَاوِي خَمْسَةَ أَمْتَارْ.')]}};
function apply01(out){defs();const K2='0-1',T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^مقدمة الوحدة وأهدافها$/,()=>[card(K2,'intro'),card(K2,'goals')]],[/^ماذا ستتعلم في هذه الوحدة$/,()=>null],
    [/^الكميات الفيزيائية$/,()=>card(K2,'types')],[/^وحدات الكميات الأساسية في SI$/,()=>card(K2,'base')],[/^أمثلة على وحدات مشتقة$/,()=>card(K2,'derived')],[/^تحويلات أساسية$/,()=>card(K2,'conv')],
    [/^أمثلة الحقيبة التدريبية محلولة$/,()=>card(K2,'ex1')],[/^رسم توضيحي/,()=>null],[/^الكميات الأساسية في النظام الدولي SI$/,()=>null],[/^أمثلة على الكميات المشتقة ووحداتها$/,()=>null],
    [/^مثال محلول$/,()=>null],[/^تمرين \d+ · مثال/,()=>null],
    [/^تطبيقات من الحياة$/,sl=>{sl.sayT='وَبَعْدَ أَنْ تَعَرَّفْنَا عَلَى الْكَمِّيَّاتِ الْفِيزْيَائِيَّةِ وَوَحَدَاتِهَا، لِنَرَ أَيْنَ نَسْتَخْدِمُهَا فِي حَيَاتِنَا.';return typeof appCards==='function'?appCards(sl):sl}]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}
/* ===== الدروس النموذجية للوحدة الأولى 0-2 و0-4 و0-5 و0-6 (الحقيبة التدريبية صفحات 13-23) — 5 نوفمبر ===== */
/* سهم مجسم بأي اتجاه */
function vArr(x1,y1,x2,y2,c,th,lab,lx,ly,dash){th=th||7;const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux,hl=Math.min(20,L*.4),hw=th*1.25,bx=x2-ux*hl,by=y2-uy*hl;
  const P=(o)=>[[x1+nx*th/2,y1+ny*th/2],[bx+nx*th/2,by+ny*th/2],[bx+nx*hw,by+ny*hw],[x2,y2],[bx-nx*hw,by-ny*hw],[bx-nx*th/2,by-ny*th/2],[x1-nx*th/2,y1-ny*th/2]].map(([a,b])=>f1(a+o)+','+f1(b+o*1.5)).join(' ');
  let g=dash?`<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${c}" stroke-width="2.4" stroke-dasharray="7 6"/>`:`<polygon points="${P(2)}" fill="#0f172a" opacity=".22"/><polygon points="${P(0)}" fill="${c}" stroke="rgba(255,255,255,.55)" stroke-width="1"/>`;
  if(lab)g+=`<text x="${f1(lx)}" y="${f1(ly)}" text-anchor="middle" font-size="17" font-weight="900" fill="${c}" direction="ltr" style="paint-order:stroke;stroke:#fff;stroke-width:4px">${lab}</text>`;return g}
const dg=a=>a*Math.PI/180;
function arcA(cx,cy,r,a0,a1,c,lab){const p=a=>[cx+r*Math.cos(dg(a)),cy-r*Math.sin(dg(a))],[x0,y0]=p(a0),[x1,y1]=p(a1),m=p((a0+a1)/2),q=[cx+(r+16)*Math.cos(dg((a0+a1)/2)),cy-(r+16)*Math.sin(dg((a0+a1)/2))];
  return `<path d="M${f1(x0)},${f1(y0)} A${r},${r} 0 ${a1-a0>180?1:0} 0 ${f1(x1)},${f1(y1)}" fill="none" stroke="${c||'#7c3aed'}" stroke-width="2.2"/><text x="${f1(q[0])}" y="${f1(q[1]+5)}" text-anchor="middle" font-size="15" font-weight="900" fill="${c||'#7c3aed'}" direction="ltr">${lab||''}</text>`}
/* ورقة رسم بياني مجسمة على الطاولة */
function gPaper(W,H){return `<rect x="22" y="18" width="${W-44}" height="${H-48}" rx="10" fill="#fffdf5" stroke="#d6b48a" stroke-width="3"/>`+Array.from({length:Math.floor((W-60)/24)},(_,i)=>`<line x1="${30+i*24}" y1="24" x2="${30+i*24}" y2="${H-36}" stroke="#e7dcc6" stroke-width="1"/>`).join('')+Array.from({length:Math.floor((H-60)/24)},(_,i)=>`<line x1="28" y1="${30+i*24}" x2="${W-28}" y2="${30+i*24}" stroke="#e7dcc6" stroke-width="1"/>`).join('')+`<rect x="22" y="${H-30}" width="${W-44}" height="10" rx="3" fill="#c49a6c"/>`}
/* محصلة متجهين ذيلا على ذيل */
function vRes(o){const W=640,H=300,ox=150,oy=230,s=o.s||22;let b=svg0(W,H)+gPaper(W,H);
  const A=[ox+o.A*s,oy],t=dg(o.t),Bp=[ox+o.B*s*Math.cos(t),oy-o.B*s*Math.sin(t)],C=[A[0]+Bp[0]-ox,A[1]+Bp[1]-oy];
  b+=vArr(A[0],A[1],C[0],C[1],'#94a3b8',2.5,'','','',1)+vArr(Bp[0],Bp[1],C[0],C[1],'#94a3b8',2.5,'','','',1);
  b+=arcA(ox,oy,40,0,o.t,'#7c3aed','θ = '+o.t+'°');
  b+=vArr(ox,oy,A[0],A[1],'#dc2626',8,'A = '+o.A,(ox+A[0])/2,oy+28)+vArr(ox,oy,Bp[0],Bp[1],'#2563eb',8,'B = '+o.B,(ox+Bp[0])/2-30,(oy+Bp[1])/2-6);
  if(o.res!==false)b+=`<g class="kAr" style="--d:.6s">${vArr(ox,oy,C[0],C[1],'#16a34a',9,o.res||'C',(ox+C[0])/2+40,(oy+C[1])/2-10)}</g>`;
  b+=`<circle cx="${ox}" cy="${oy}" r="5" fill="#0f172a"/>`;return b+'</svg>'}
function svg0(W,H){return `<svg class="kSvg kAuto" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true"><rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`}
/* تحليل متجه إلى مركبتين */
function vComp(o){const W=640,H=320,ox=170,oy=260,s=o.s||40;let b=svg0(W,H)+gPaper(W,H);
  b+=vArr(ox-40,oy,W-60,oy,'#334155',2.5)+vArr(ox,oy+20,ox,40,'#334155',2.5)+`<text x="${W-52}" y="${oy+22}" font-size="16" font-weight="800" fill="#334155">x</text><text x="${ox+10}" y="48" font-size="16" font-weight="800" fill="#334155">y</text>`;
  const t=dg(o.t),ax=ox+o.A*s*Math.cos(t),ay=oy-o.A*s*Math.sin(t);
  b+=`<line x1="${f1(ax)}" y1="${f1(ay)}" x2="${f1(ax)}" y2="${oy}" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6 5"/><line x1="${f1(ax)}" y1="${f1(ay)}" x2="${ox}" y2="${f1(ay)}" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6 5"/>`;
  b+=arcA(ox,oy,46,0,o.t,'#7c3aed','θ = '+o.t+'°');
  b+=`<g class="kAr" style="--d:.5s">${vArr(ox,oy,ax,oy,'#dc2626',8,o.ax||'Aₓ',(ox+ax)/2,oy+30)}</g><g class="kAr" style="--d:.9s">${vArr(ox,oy,ox,ay,'#2563eb',8,o.ay||'Aᵧ',ox-48,(oy+ay)/2)}</g>`;
  b+=vArr(ox,oy,ax,ay,'#16a34a',9,o.lab||'A',(ox+ax)/2+38,(oy+ay)/2-8)+`<circle cx="${ox}" cy="${oy}" r="5" fill="#0f172a"/>`;return b+'</svg>'}
/* محاور ثلاثية الأبعاد ومتجهات الوحدة */
function vUnit(){const W=640,H=300,ox=300,oy=190;let b=svg0(W,H)+gPaper(W,H);
  b+=vArr(ox,oy,ox+230,oy,'#334155',2.5)+vArr(ox,oy,ox,30,'#334155',2.5)+vArr(ox,oy,ox-150,oy+80,'#334155',2.5);
  b+=`<text x="${ox+238}" y="${oy+6}" font-size="17" font-weight="800" fill="#334155">x</text><text x="${ox-6}" y="26" font-size="17" font-weight="800" fill="#334155">y</text><text x="${ox-168}" y="${oy+96}" font-size="17" font-weight="800" fill="#334155">z</text>`;
  b+=`<g class="kAr" style="--d:.3s">${vArr(ox,oy,ox+80,oy,'#dc2626',9,'î',ox+60,oy+30)}</g><g class="kAr" style="--d:.7s">${vArr(ox,oy,ox,oy-80,'#16a34a',9,'ĵ',ox+24,oy-58)}</g><g class="kAr" style="--d:1.1s">${vArr(ox,oy,ox-62,oy+33,'#2563eb',9,'k̂',ox-74,oy+20)}</g>`;
  b+=`<circle cx="${ox}" cy="${oy}" r="5" fill="#0f172a"/><text x="470" y="64" text-anchor="middle" font-size="15" font-weight="900" fill="#1e3a5f">مقدار كل متجه وحدة = 1</text>`;return b+'</svg>'}
/* الضرب القياسي: مسقط B على A */
function vDot(){const W=640,H=280,ox=150,oy=220;let b=svg0(W,H)+gPaper(W,H);const t=dg(40),B=[ox+250*Math.cos(t),oy-250*Math.sin(t)],px=ox+250*Math.cos(t);
  b+=`<line x1="${f1(B[0])}" y1="${f1(B[1])}" x2="${f1(px)}" y2="${oy}" stroke="#64748b" stroke-width="1.8" stroke-dasharray="6 5"/>`;
  b+=arcA(ox,oy,50,0,40,'#7c3aed','θ');
  b+=vArr(ox,oy,ox+380,oy,'#dc2626',8,'A',ox+380,oy+28)+vArr(ox,oy,B[0],B[1],'#2563eb',8,'B',B[0]+14,B[1]-8);
  b+=`<line x1="${ox}" y1="${oy+14}" x2="${f1(px)}" y2="${oy+14}" stroke="#16a34a" stroke-width="5" stroke-linecap="round" class="kAr" style="--d:.6s"/><text x="${f1((ox+px)/2)}" y="${oy+36}" text-anchor="middle" font-size="15" font-weight="900" fill="#16a34a" direction="ltr">|B| cos θ</text>`;
  b+=`<text x="470" y="62" text-anchor="middle" font-size="15" font-weight="900" fill="#1e3a5f">الناتج عدد (كمية قياسية)</text>`;return b+'</svg>'}
/* الضرب الاتجاهي: الناتج عمودي على مستوى المتجهين */
function vCross(){const W=640,H=300,ox=290,oy=210;let b=svg0(W,H)+gPaper(W,H);
  b+=`<polygon points="${ox-170},${oy+40} ${ox+150},${oy+40} ${ox+230},${oy-40} ${ox-90},${oy-40}" fill="#dbeafe" fill-opacity=".7" stroke="#93c5fd" stroke-width="2"/>`;
  b+=vArr(ox,oy,ox+190,oy+10,'#dc2626',8,'A',ox+200,oy+34)+vArr(ox,oy,ox+70,oy-34,'#2563eb',8,'B',ox+92,oy-40);
  b+=arcA(ox,oy,44,-3,26,'#7c3aed','θ');
  b+=`<g class="kAr" style="--d:.6s">${vArr(ox,oy,ox,40,'#16a34a',9,'A × B',ox-50,70)}</g><circle cx="${ox}" cy="${oy}" r="5" fill="#0f172a"/>`;
  b+=`<text x="${ox-120}" y="${oy+66}" font-size="14" font-weight="800" fill="#1d4ed8">مستوى المتجهين</text>`;return b+'</svg>'}
/* لوحة سرعة على الطريق */
function speedSign(){const W=640,H=270,FY=210;let b=stage(W,H,FY);
  b+=`<path d="M0,${FY-4} L${W},${FY-4} L${W},${FY+30} L0,${FY+30}Z" fill="#475569"/><line x1="0" y1="${FY+13}" x2="${W}" y2="${FY+13}" stroke="#f8fafc" stroke-width="3" stroke-dasharray="22 16"/>`;
  b+=`<defs><radialGradient id="kc-sg" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8f0"/></radialGradient><linearGradient id="kc-pl" x1="0" x2="1"><stop offset="0" stop-color="#64748b"/><stop offset=".45" stop-color="#e2e8f0"/><stop offset="1" stop-color="#475569"/></linearGradient></defs>`;
  b+=`<ellipse cx="170" cy="${FY-2}" rx="22" ry="5" fill="#1e3a5f" opacity=".3"/><rect x="164" y="80" width="12" height="${FY-80}" fill="url(#kc-pl)"/><circle cx="173" cy="78" r="58" fill="#7f1d1d"/><circle cx="170" cy="74" r="58" fill="#dc2626"/><circle cx="170" cy="74" r="44" fill="url(#kc-sg)"/><text x="170" y="86" text-anchor="middle" font-size="34" font-weight="900" fill="#0f172a">72</text><text x="170" y="104" text-anchor="middle" font-size="11" font-weight="800" fill="#334155" direction="ltr">km/h</text>`;
  b+=`<g class="kAr" style="--d:.4s">${arrow(260,350,96,'F',0,10)}</g>`+pill(470,70,'72 km/h ÷ 3.6','#0369a1',.6)+pill(470,126,'= 20 m/s','#16a34a',1);
  return svg(W,H+30,b,'kAuto')}

function clBench0(top,fy,x0,x1){const ins=Math.min(26,(fy-top)*.7);let g=`<path d="M${x0+ins},${top} L${x1-ins},${top} L${x1},${fy} L${x0},${fy}Z" fill="#d9a86c" stroke="#7C4A1F" stroke-width=".8"/>`;g+=`<rect x="${x0}" y="${fy}" width="${x1-x0}" height="12" fill="#8a5a30" stroke="#5B3517" stroke-width=".8"/>`;return g}

const RW=(t)=>pt('<b>'+t[0]+':</b> '+t[1]);
CARDS['0-2']={
  rule:{title:'قاعدة التحويل',sayT:'تَعَرَّفْنَا فِي الدَّرْسِ السَّابِقِ عَلَى قَوَاعِدِ التَّحْوِيلِ، وَالْيَوْمَ نُطَبِّقُهَا، ثُمَّ نَتَعَلَّمُ التَّحَقُّقَ مِنْ صِحَّةِ الْقَوَانِينْ.',steps:()=>[
    S(pt('من وحدة '+B('كبيرة')+' إلى وحدة '+B('صغيرة')+' نضرب، ومن وحدة '+B('صغيرة')+' إلى وحدة '+B('كبيرة')+' نقسم.'),'مِنْ وَحْدَةٍ كَبِيرَةٍ إِلَى وَحْدَةٍ صَغِيرَةٍ نَضْرِبُ، وَمِنْ وَحْدَةٍ صَغِيرَةٍ إِلَى وَحْدَةٍ كَبِيرَةٍ نَقْسِمُ.'),
    S(pt(M('1 kg = 1000 g')+' ، '+M('1 km = 1000 m')+' ، '+M('1 h = 3600 s')),'وَنَتَذَكَّرُ: الْكِيلُوجْرَامُ أَلْفُ جْرَامٍ، وَالْكِيلُومِتْرُ أَلْفُ مِتْرٍ، وَالسَّاعَةُ ثَلَاثَةُ آلَافٍ وَسِتُّ مِئَةِ ثَانِيَهْ.')]},
  speed:{title:'تحويل السرعة',sayT:'وَمِنْ أَهَمِّ التَّحْوِيلَاتِ تَحْوِيلُ السُّرْعَةِ.',steps:()=>[
    S(pt('من '+M('km/h')+' إلى '+M('m/s')+': نضرب في 1000 ونقسم على 3600، أي نقسم على '+M('3.6')+'.'),'مِنْ كِيلُومِتْرٍ لِكُلِّ سَاعَةٍ إِلَى مِتْرٍ لِكُلِّ ثَانِيَةٍ: نَضْرِبُ فِي أَلْفٍ، وَنَقْسِمُ عَلَى ثَلَاثَةِ آلَافٍ وَسِتِّ مِئَةٍ، أَيْ نَقْسِمُ عَلَى ثَلَاثَةٍ فَاصِلَةٍ سِتَّهْ.'),
    S(pt('ومن '+M('m/s')+' إلى '+M('km/h')+': نضرب في '+M('3.6')+'.'),'وَمِنْ مِتْرٍ لِكُلِّ ثَانِيَةٍ إِلَى كِيلُومِتْرٍ لِكُلِّ سَاعَةٍ: نَضْرِبُ فِي ثَلَاثَةٍ فَاصِلَةٍ سِتَّهْ.'),
    S(fig(speedSign(),'لوحة السرعة 72 km/h تساوي 20 m/s'),'لَاحِظْ لَوْحَةَ السُّرْعَةِ عَلَى الطَّرِيقِ: اثْنَانِ وَسَبْعُونَ كِيلُومِتْرًا لِكُلِّ سَاعَةٍ، نَقْسِمُهَا عَلَى ثَلَاثَةٍ فَاصِلَةٍ سِتَّةٍ، فَتُسَاوِي عِشْرِينَ مِتْرًا لِكُلِّ ثَانِيَهْ.')]},
  prefix:{title:'البادئات الشائعة في النظام الدولي',sayT:'وَلِلتَّحْوِيلِ بَيْنَ أَجْزَاءِ الْوَحَدَاتِ وَمُضَاعَفَاتِهَا نَسْتَخْدِمُ الْبَادِئَاتِ.',steps:()=>{const P=[['جيجا','G','10⁹','جِيجَا، رَمْزُهَا G، وَتُسَاوِي عَشَرَةً أُسَّ تِسْعَهْ.'],['ميجا','M','10⁶','مِيجَا، رَمْزُهَا M، وَتُسَاوِي عَشَرَةً أُسَّ سِتَّهْ.'],['كيلو','k','10³','كِيلُو، رَمْزُهَا k، وَتُسَاوِي أَلْفَا.'],['سنتي','c','10⁻²','سَنْتِي، رَمْزُهَا c، وَتُسَاوِي عَشَرَةً أُسَّ سَالِبِ اثْنَيْنْ.'],['ملي','m','10⁻³','مِلِّي، رَمْزُهَا m، وَتُسَاوِي عَشَرَةً أُسَّ سَالِبِ ثَلَاثَهْ.'],['ميكرو','µ','10⁻⁶','مِيكْرُو، رَمْزُهَا مْيُو، وَتُسَاوِي عَشَرَةً أُسَّ سَالِبِ سِتَّهْ.'],['نانو','n','10⁻⁹','نَانُو، رَمْزُهَا n، وَتُسَاوِي عَشَرَةً أُسَّ سَالِبِ تِسْعَهْ.']];
    return [S({html:`<div class="kc kUH"><span>البادئة</span><span>الرمز</span><span>القيمة</span><span>مثال</span></div>`},'هَذَا جَدْوَلُ الْبَادِئَاتِ الشَّائِعَةِ، مِنَ الْمَرَاجِعِ الْعِلْمِيَّةِ لِلنِّظَامِ الدَّوْلِيِّ.')].concat(P.map(([n,sy,v,sa])=>S({html:`<div class="kc kUR"><span>${n}</span><span>${M(sy)}</span><span>${M(v)}</span><span class="kUS">${M(sy+'m')}</span></div>`},sa))).concat([S(pt('<small>المصدر: المراجع العلمية للنظام الدولي للوحدات SI.</small>'),'')])}},
  factors:{title:'عوامل تحويل مفيدة',sayT:'وَهَذِهِ عَوَامِلُ تَحْوِيلٍ نَحْتَاجُهَا كَثِيرَا.',steps:()=>{const F=[['km/h','m/s','÷ 3.6','مِنْ كِيلُومِتْرٍ لِكُلِّ سَاعَةٍ إِلَى مِتْرٍ لِكُلِّ ثَانِيَةٍ، نَقْسِمُ عَلَى ثَلَاثَةٍ فَاصِلَةٍ سِتَّهْ.'],['m/s','km/h','× 3.6','وَالْعَكْسُ نَضْرِبُ فِي ثَلَاثَةٍ فَاصِلَةٍ سِتَّهْ.'],['m','cm','× 100','مِنَ الْمِتْرِ إِلَى السَّنْتِيمِتْرِ، نَضْرِبُ فِي مِئَهْ.'],['kg','g','× 1000','مِنَ الْكِيلُوجْرَامِ إِلَى الْجْرَامِ، نَضْرِبُ فِي أَلْفْ.'],['h','s','× 3600','مِنَ السَّاعَةِ إِلَى الثَّانِيَةِ، نَضْرِبُ فِي ثَلَاثَةِ آلَافٍ وَسِتِّ مِئَهْ.'],['km²','m²','× 10⁶','مِنَ الْكِيلُومِتْرِ الْمُرَبَّعِ إِلَى الْمِتْرِ الْمُرَبَّعِ، نَضْرِبُ فِي عَشَرَةٍ أُسَّ سِتَّهْ.'],['g/cm³','kg/m³','× 1000','مِنْ جْرَامٍ لِكُلِّ سَنْتِيمِتْرٍ مُكَعَّبٍ، إِلَى كِيلُوجْرَامٍ لِكُلِّ مِتْرٍ مُكَعَّبٍ، نَضْرِبُ فِي أَلْفْ.'],['L','m³','× 10⁻³','وَمِنَ اللِّتْرِ إِلَى الْمِتْرِ الْمُكَعَّبِ، نَضْرِبُ فِي عَشَرَةٍ أُسَّ سَالِبِ ثَلَاثَهْ.']];
    return [S({html:`<div class="kc kUH"><span>من</span><span>إلى</span><span>العملية</span></div>`},'نَقْرَأُ جَدْوَلَ عَوَامِلِ التَّحْوِيلِ.')].concat(F.map(([a,b,o,sa])=>S({html:`<div class="kc kUR"><span>${M(a)}</span><span>${M(b)}</span><span class="kUS">${M(o)}</span></div>`},sa))).concat([S(pt('عند تحويل المساحة أو الحجم نرفع عامل تحويل الطول إلى الأس 2 أو 3.'),'وَعِنْدَ تَحْوِيلِ الْمِسَاحَةِ أَوِ الْحَجْمِ، نَرْفَعُ عَامِلَ تَحْوِيلِ الطُّولِ إِلَى الْأُسِّ اثْنَيْنِ أَوْ ثَلَاثَهْ.'),S(pt('<small>المصدر: المراجع العلمية للنظام الدولي للوحدات SI.</small>'),'')])}},
  check:{title:'التحقق من صحة القانون بالوحدات',sayT:'وَالْآنَ نَنْتَقِلُ إِلَى اسْتِخْدَامِ الْوَحَدَاتِ لِلتَّأَكُّدِ مِنْ صِحَّةِ الْقَوَانِينِ الْفِيزْيَائِيَّهْ.',steps:()=>[
    S(pt(B('1.')+' نكتب وحدة كل رمز في القانون بوحدات النظام الدولي SI.'),'أَوَّلًا: نَكْتُبُ وَحْدَةَ كُلِّ رَمْزٍ فِي الْقَانُونِ بِوَحَدَاتِ النِّظَامِ الدَّوْلِيِّ.'),
    S(pt(B('2.')+' نعوض الوحدات في الطرف الأيسر والطرف الأيمن كلا على حدة، ونبسطها.'),'ثَانِيًا: نُعَوِّضُ الْوَحَدَاتِ فِي الطَّرَفِ الْأَيْسَرِ وَالطَّرَفِ الْأَيْمَنِ، كُلًّا عَلَى حِدَةٍ، وَنُبَسِّطُهَا.'),
    S(pt(B('3.')+' عند الجمع أو الطرح يجب أن تكون وحدات الحدود متساوية.'),'ثَالِثًا: عِنْدَ الْجَمْعِ أَوِ الطَّرْحِ، يَجِبُ أَنْ تَكُونَ وَحَدَاتُ الْحُدُودِ مُتَسَاوِيَةً.'),
    S(pt(B('4.')+' إذا تساوت وحدتا الطرفين فالقانون '+B('صحيح')+'، وإذا اختلفتا فهو '+B('خاطئ')+'.'),'رَابِعًا: إِذَا تَسَاوَتْ وَحْدَتَا الطَّرَفَيْنِ فَالْقَانُونُ صَحِيحٌ، وَإِذَا اخْتَلَفَتَا فَهُوَ خَاطِئٌ.'),
    S(fig(unitBal('N','kg·m/s²'),'مثل ميزانين يقرآن الوحدة نفسها'),'الْقَانُونُ صَحِيحٌ إِذَا قَرَأَ الطَّرَفَانِ الْوَحْدَةَ نَفْسَهَا، مِثْلَ مِيزَانَيْنِ يَقْرَآنِ الْقِرَاءَةَ نَفْسَهَا.')]},
  ex2:{title:'مثال ٢ · صفحة 13',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ أَمْثِلَةِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ. لِنَأْخُذِ الْمِثَالَ الثَّانِي، مِنْ صَفْحَةِ 13.',steps:()=>[
    S(q('حول '+M('2 kg')+' إلى الجرام.','المثال · صفحة 13'),'حَوِّلِ اثْنَيْنِ كِيلُوجْرَامٍ إِلَى الْجْرَامِ.'),
    S(gr(['m = 2 kg'],'الكتلة بالجرام '+M('g')),'الْمُعْطَى أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْكُتْلَةُ بِالْجْرَامِ.'),
    S(st(1,'القاعدة: '+M('1 kg = 1000 g')+'، ومن كبيرة إلى صغيرة نضرب.'),'الْكِيلُوجْرَامُ أَلْفُ جْرَامٍ، وَمِنْ وَحْدَةٍ كَبِيرَةٍ إِلَى صَغِيرَةٍ نَضْرِبُ.'),
    S(st(2,'التعويض: '+M('2 × 1000')),'نَضْرِبُ اثْنَيْنِ فِي أَلْفٍ.'),
    S(res(M('2 kg = 2000 g')),'النَّتِيجَةُ: أَلْفَا جْرَامْ.')]},
  ex3:{title:'مثال ٣ · صفحة 13',sayT:'وَتَأَمَّلْ مَعِي الْمِثَالَ الثَّالِثَ، مِنْ صَفْحَةِ 13.',steps:()=>[
    S(q('حول '+M('20 km/h')+' إلى '+M('m/s')+'.','المثال · صفحة 13'),'حَوِّلْ عِشْرِينَ كِيلُومِتْرًا لِكُلِّ سَاعَةٍ، إِلَى مِتْرٍ لِكُلِّ ثَانِيَهْ.'),
    S(gr(['v = 20 km/h'],'السرعة بوحدة '+M('m/s')),'الْمُعْطَى أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: السُّرْعَةُ بِوَحْدَةِ مِتْرٍ لِكُلِّ ثَانِيَهْ.'),
    S(st(1,'القاعدة: '+M('1 km = 1000 m')+' و '+M('1 h = 3600 s')),'نُحَوِّلُ الْكِيلُومِتْرَ إِلَى أَمْتَارٍ، وَالسَّاعَةَ إِلَى ثَوَانٍ.'),
    S(st(2,'التعويض: '+M('(20 × 1000) ÷ 3600')),'نَضْرِبُ عِشْرِينَ فِي أَلْفٍ، وَنَقْسِمُ عَلَى ثَلَاثَةِ آلَافٍ وَسِتِّ مِئَهْ.'),
    S(st(3,'الحساب: '+M('20000 ÷ 3600 ≈ 5.56')+'<span class="kDirOn"></span>'),'فَيَكُونُ النَّاتِجُ خَمْسَةً فَاصِلَةً سِتَّةً وَخَمْسِينَ تَقْرِيبَا.'),
    S(res(M('20 km/h ≈ 5.56 m/s')),'النَّتِيجَةُ: خَمْسَةٌ فَاصِلَةٌ سِتَّةٌ وَخَمْسُونَ مِتْرًا لِكُلِّ ثَانِيَهْ.')]},
  law1:{title:'مثال ١ · صفحة 14',sayT:'وَنَنْتَقِلُ إِلَى أَمْثِلَةِ التَّحَقُّقِ مِنْ صِحَّةِ الْقَوَانِينِ، مِنْ صَفْحَةِ 14.',steps:()=>[
    S(q('تأكد من صحة القانون '+M('F = m a')+' باستخدام الوحدات، حيث F القوة، و m الكتلة، و a التسارع.','المثال · صفحة 14'),'تَأَكَّدْ مِنْ صِحَّةِ قَانُونِ الْقُوَّةِ بِاسْتِخْدَامِ الْوَحَدَاتْ.'),
    S(st(1,'الطرف الأيسر: '+M('F → N = kg·m/s²')),'الطَّرَفُ الْأَيْسَرُ: الْقُوَّةُ وَحْدَتُهَا النِّيُوتُنُ، وَيُسَاوِي كِيلُوجْرَامًا فِي مِتْرٍ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.'),
    S(st(2,'الطرف الأيمن: '+M('m a → kg × m/s² = kg·m/s²')),'الطَّرَفُ الْأَيْمَنُ: كِيلُوجْرَامٌ فِي مِتْرٍ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.'),
    S(fig(unitBal('kg·m/s²','kg·m/s²'),'وحدتا الطرفين متساويتان'),'الْوَحْدَتَانِ مُتَسَاوِيَتَانِ فِي الطَّرَفَيْنْ.'),
    S(res('الطرفان متساويان، إذن القانون '+B('صحيح')),'النَّتِيجَةُ: الطَّرَفَانِ مُتَسَاوِيَانِ، إِذَنِ الْقَانُونُ صَحِيحْ.')]},
  law2:{title:'مثال ٢ · صفحة 14',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 14.',steps:()=>[
    S(q('تأكد من صحة القانون '+M('vf = vi + a t')+' باستخدام الوحدات.','المثال · صفحة 14'),'تَأَكَّدْ مِنْ صِحَّةِ قَانُونِ السُّرْعَةِ النِّهَائِيَّةِ بِاسْتِخْدَامِ الْوَحَدَاتْ.'),
    S(st(1,'الطرف الأيسر: '+M('vf → m/s')),'الطَّرَفُ الْأَيْسَرُ: السُّرْعَةُ النِّهَائِيَّةُ وَحْدَتُهَا مِتْرٌ لِكُلِّ ثَانِيَهْ.'),
    S(st(2,'الطرف الأيمن: '+M('vi → m/s')+' و '+M('a t → m/s² × s = m/s')),'الطَّرَفُ الْأَيْمَنُ: حَدَّانِ مَجْمُوعَانِ، وَحْدَةُ كُلٍّ مِنْهُمَا مِتْرٌ لِكُلِّ ثَانِيَةٍ، فَيَجُوزُ جَمْعُهُمَا.'),
    S(res(M('m/s = m/s')+' ، إذن القانون '+B('صحيح')),'النَّتِيجَةُ: الطَّرَفَانِ مُتَسَاوِيَانِ، إِذَنِ الْقَانُونُ صَحِيحْ.')]},
  law3:{title:'مثال ٣ · صفحة 14',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 14.',steps:()=>[
    S(q('تأكد من صحة القانون '+M('W = F x')+' باستخدام الوحدات، حيث W الشغل، و F القوة، و x الإزاحة.','المثال · صفحة 14'),'تَأَكَّدْ مِنْ صِحَّةِ قَانُونِ الشُّغْلِ بِاسْتِخْدَامِ الْوَحَدَاتْ.'),
    S(st(1,'الطرف الأيسر: '+M('W → J = kg·m²/s²')),'الطَّرَفُ الْأَيْسَرُ: الشُّغْلُ وَحْدَتُهُ الْجُولُ، وَيُسَاوِي كِيلُوجْرَامًا فِي مِتْرٍ مُرَبَّعٍ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.'),
    S(st(2,'الطرف الأيمن: '+M('F x → N × m = kg·m²/s²')),'الطَّرَفُ الْأَيْمَنُ: نِيُوتُنُ فِي مِتْرٍ، وَيُسَاوِي الْوَحْدَةَ نَفْسَهَا.'),
    S(res('الطرفان متساويان، إذن القانون '+B('صحيح')),'النَّتِيجَةُ: الطَّرَفَانِ مُتَسَاوِيَانِ، إِذَنِ الْقَانُونُ صَحِيحْ.')]}};
CARDS['0-4']={
  types:{title:'الكمية القياسية والكمية المتجهة',sayT:'نَبْدَأُ الْفَصْلَ الثَّانِيَ مِنَ الْوِحْدَةِ: الْكَمِّيَّةُ الْقِيَاسِيَّةُ وَالْكَمِّيَّةُ الْمُتَّجِهَهْ.',steps:()=>[
    S(pt(B('الكمية القياسية')+': تتحدد بالمقدار ووحدة القياس فقط، مثل: الكتلة والزمن ودرجة الحرارة والمسافة.'),'الْكَمِّيَّةُ الْقِيَاسِيَّةُ: تَتَحَدَّدُ بِالْمِقْدَارِ وَوَحْدَةِ الْقِيَاسِ فَقَطْ، مِثْلَ: الْكُتْلَةِ، وَالزَّمَنِ، وَدَرَجَةِ الْحَرَارَةِ، وَالْمَسَافَهْ.'),
    S(pt(B('الكمية المتجهة')+': تتحدد بالمقدار ووحدة القياس والاتجاه، مثل: السرعة والتسارع والقوة والإزاحة.'),'الْكَمِّيَّةُ الْمُتَّجِهَةُ: تَتَحَدَّدُ بِالْمِقْدَارِ وَوَحْدَةِ الْقِيَاسِ وَالِاتِّجَاهِ، مِثْلَ: السُّرْعَةِ، وَالتَّسَارُعِ، وَالْقُوَّةِ، وَالْإِزَاحَهْ.'),
    S(fig(sVsV(),'كتلة الجسم لا تحتاج اتجاها، أما القوة فلها اتجاه'),'لَاحِظِ الصُّورَةَ: كُتْلَةُ الْجِسْمِ الْأَوَّلِ خَمْسَةُ كِيلُوجْرَامَاتٍ، لَا تَحْتَاجُ اتِّجَاهَا، أَمَّا الْقُوَّةُ الْمُؤَثِّرَةُ فِي الْجِسْمِ الثَّانِي فَلَهَا مِقْدَارٌ وَاتِّجَاهٌ نَحْوَ الْيَمِينْ.')]},
  cos:{title:'قانون جيب التمام',sayT:'وَلِإِيجَادِ مِقْدَارِ مُحَصِّلَةِ مُتَّجِهَيْنِ، نَسْتَخْدِمُ قَانُونَ جَيْبِ التَّمَامْ.',steps:()=>[
    S(pt(B('الحالة الأولى')+': إذا كان المتجهان ذيلا على ذيل.'),'الْحَالَةُ الْأُولَى: إِذَا كَانَ الْمُتَّجِهَانِ ذَيْلًا عَلَى ذَيْلْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('C² = A² + B² + 2AB cos θ')+'</div>'),'وَالْقَانُونُ: `C² = A² + B² + 2AB cos θ`'),{md:'`C² = A² + B² + 2AB cos θ`'}),
    S(pt(B('الحالة الثانية')+': إذا كان رأس المتجه الأول عند ذيل الثاني: '+M('C² = A² + B² − 2AB cos θ')),'الْحَالَةُ الثَّانِيَةُ: إِذَا كَانَ رَأْسُ الْمُتَّجِهِ الْأَوَّلِ عِنْدَ ذَيْلِ الثَّانِي، تُصْبِحُ الْإِشَارَةُ سَالِبَهْ.'),
    S(fig(vRes({A:4,B:6,t:60,res:'C'}),'متجهان ذيلا على ذيل، والمحصلة قطر متوازي الأضلاع'),'لَاحِظِ الرَّسْمَ: الْمُتَّجِهَانِ يَبْدَآنِ مِنْ نُقْطَةٍ وَاحِدَةٍ، وَالْمُحَصِّلَةُ بِالْأَخْضَرِ هِيَ قُطْرُ مُتَوَازِي الْأَضْلَاعْ.'),
    S(pt(B('ملحوظة')+': في الحالة الأولى θ هي الزاوية بين المتجهين، وإشارة '+M('cos θ')+' تتغير وحدها: موجبة إذا كانت θ أصغر من '+M('90°')+'، وسالبة إذا كانت أكبر.'),'مُلَاحَظَةٌ: إِشَارَةُ جَيْبِ التَّمَامِ تَتَغَيَّرُ وَحْدَهَا: مُوجَبَةٌ إِذَا كَانَتِ الزَّاوِيَةُ أَصْغَرَ مِنْ تِسْعِينَ دَرَجَةٍ، وَسَالِبَةٌ إِذَا كَانَتْ أَكْبَرْ.')]},
  ex1:{title:'مثال ١ · صفحة 19',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ أَمْثِلَةِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ. لِنَأْخُذِ الْمِثَالَ الْأَوَّلَ، مِنْ صَفْحَةِ 19.',steps:()=>[
    S(q('باستخدام قانون جيب التمام أوجد محصلة المتجهين '+M('A = 4')+' و '+M('B = 6')+'، والزاوية بينهما '+M('θ = 60°')+'.','المثال · صفحة 19'),''),
    S(gr(['A = 4','B = 6','θ = 60°'],'مقدار المحصلة '+M('C')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: مِقْدَارُ الْمُحَصِّلَهْ.'),
    S(fig(vRes({A:4,B:6,t:60,res:'C ≈ 8.7'}),'المتجهان ذيلا على ذيل بزاوية 60°'),'لِنَرْسُمِ الْمُتَّجِهَيْنِ ذَيْلًا عَلَى ذَيْلْ.'),
    S(st(1,'القانون: '+M('C² = A² + B² + 2AB cos θ')),'نَسْتَخْدِمُ الْحَالَةَ الْأُولَى، لِأَنَّ الْمُتَّجِهَيْنِ ذَيْلٌ عَلَى ذَيْلْ.'),
    S(st(2,'التعويض: '+M('C² = 4² + 6² + 2(4)(6) cos 60°')),'نُعَوِّضُ الْقِيَمَ فِي الْقَانُونْ.'),
    S(st(3,'الحساب: '+M('C² = 52 + 24 = 76')+' ← '+M('C = √76 ≈ 8.7')+'<span class="kDirOn"></span>'),'اثْنَانِ وَخَمْسُونَ زَائِدَ أَرْبَعَةٍ وَعِشْرِينَ يُسَاوِي سِتَّةً وَسَبْعِينَ، وَجَذْرُهَا ثَمَانِيَةٌ فَاصِلَةٌ سَبْعَةٌ تَقْرِيبَا.'),
    S(res(M('C ≈ 8.7')),'النَّتِيجَةُ: الْمُحَصِّلَةُ ثَمَانِيَةٌ فَاصِلَةٌ سَبْعَةٌ تَقْرِيبَا.')]},
  ex2:{title:'مثال ٢ · صفحة 19',sayT:'وَتَأَمَّلْ مَعِي الْمِثَالَ الثَّانِيَ، مِنْ صَفْحَةِ 19.',steps:()=>[
    S(q('باستخدام قانون جيب التمام أوجد محصلة المتجهين '+M('A = 6')+' و '+M('B = 9')+'، والزاوية بينهما '+M('θ = 120°')+'.','المثال · صفحة 19'),''),
    S(gr(['A = 6','B = 9','θ = 120°'],'مقدار المحصلة '+M('C')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: مِقْدَارُ الْمُحَصِّلَهْ.'),
    S(fig(vRes({A:6,B:9,t:120,s:18,res:'C ≈ 7.9'}),'المتجهان ذيلا على ذيل بزاوية منفرجة 120°'),'لِنَرْسُمِ الْمُتَّجِهَيْنِ، وَالزَّاوِيَةُ بَيْنَهُمَا مُنْفَرِجَهْ.'),
    S(st(1,'القانون: '+M('C² = A² + B² + 2AB cos θ')),'الْقَانُونُ نَفْسُهُ، وَإِشَارَةُ جَيْبِ التَّمَامِ هُنَا سَالِبَهْ.'),
    S(st(2,'التعويض: '+M('C² = 6² + 9² + 2(6)(9) cos 120°')),'نُعَوِّضُ الْقِيَمَ فِي الْقَانُونْ.'),
    S(st(3,'الحساب: '+M('C² = 117 − 54 = 63')+' ← '+M('C = √63 ≈ 7.9')+'<span class="kDirOn"></span>'),'مِئَةٌ وَسَبْعَةَ عَشَرَ نَاقِصَ أَرْبَعَةٍ وَخَمْسِينَ يُسَاوِي ثَلَاثَةً وَسِتِّينَ، وَجَذْرُهَا سَبْعَةٌ فَاصِلَةٌ تِسْعَةٌ تَقْرِيبَا.'),
    S(res(M('C ≈ 7.9')),'النَّتِيجَةُ: الْمُحَصِّلَةُ سَبْعَةٌ فَاصِلَةٌ تِسْعَةٌ تَقْرِيبَا.')]}};
CARDS['0-5']={
  comp:{title:'مركبات المتجه (طريقة التحليل)',sayT:'نَتَعَلَّمُ الْيَوْمَ تَحْلِيلَ الْمُتَّجِهِ إِلَى مُرَكَّبَتَيْنْ.',steps:()=>[
    S(pt('أي متجه في الإحداثيات x و y يمكن تحليله إلى '+B('مركبة سينية')+' في اتجاه المحور السيني، و'+B('مركبة صادية')+' في اتجاه المحور الصادي.'),'أَيُّ مُتَّجِهٍ فِي الْإِحْدَاثِيَّاتِ الْكَارْتِيزِيَّةِ، يُمْكِنُ تَحْلِيلُهُ إِلَى مُرَكَّبَةٍ سِينِيَّةٍ فِي اتِّجَاهِ الْمِحْوَرِ السِّينِيِّ، وَمُرَكَّبَةٍ صَادِيَّةٍ فِي اتِّجَاهِ الْمِحْوَرِ الصَّادِي.'),
    S(fig(vComp({A:4,t:60}),'المتجه A ومركبتاه على المحورين'),'لَاحِظِ الرَّسْمَ: الْمُتَّجِهُ بِالْأَخْضَرِ، وَمُرَكَّبَتُهُ السِّينِيَّةُ بِالْأَحْمَرِ، وَمُرَكَّبَتُهُ الصَّادِيَّةُ بِالْأَزْرَقْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('Aₓ = A cos θ')+'</div>'),'الْمُرَكَّبَةُ السِّينِيَّةُ: `Aₓ = A cos θ`'),{md:'`Aₓ = A cos θ`'}),
    Object.assign(S(pt('<div class="kLaw">'+M('Aᵧ = A sin θ')+'</div>'),'وَالْمُرَكَّبَةُ الصَّادِيَّةُ: `Aᵧ = A sin θ`'),{md:'`Aᵧ = A sin θ`'}),
    S(pt('ويحسب مقدار المتجه من مركبتيه: '+M('A = √(Aₓ² + Aᵧ²)')),'وَيُحْسَبُ مِقْدَارُ الْمُتَّجِهِ مِنْ مُرَكَّبَتَيْهِ، بِالْجَذْرِ التَّرْبِيعِيِّ لِمَجْمُوعِ مُرَبَّعَيْهِمَا.')]},
  ex1:{title:'مثال ١ · صفحة 20',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ مِثَالِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ، مِنْ صَفْحَةِ 20.',steps:()=>[
    S(q('أوجد المركبة السينية والمركبة الصادية للمتجه '+M('A = 4')+' الذي يصنع زاوية '+M('60°')+' مع المحور السيني.','المثال · صفحة 20'),''),
    S(gr(['A = 4','θ = 60°'],'المركبتان '+M('Aₓ')+' و '+M('Aᵧ')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْمُرَكَّبَتَانِ السِّينِيَّةُ وَالصَّادِيَّهْ.'),
    S(fig(vComp({A:4,t:60,ax:'Aₓ = 2',ay:'Aᵧ ≈ 3.46'}),'تحليل المتجه A = 4 بزاوية 60°'),'لِنَرْسُمِ الْمُتَّجِهَ وَمُرَكَّبَتَيْهْ.'),
    S(st(1,'السينية: '+M('Aₓ = 4 cos 60° = 4 × 0.5 = 2')),'الْمُرَكَّبَةُ السِّينِيَّةُ: أَرْبَعَةٌ فِي نِصْفٍ، تُسَاوِي اثْنَيْنْ.'),
    S(st(2,'الصادية: '+M('Aᵧ = 4 sin 60° ≈ 3.46')+'<span class="kDirOn"></span>'),'الْمُرَكَّبَةُ الصَّادِيَّةُ: أَرْبَعَةٌ فِي جَيْبِ سِتِّينَ، تُسَاوِي ثَلَاثَةً فَاصِلَةً سِتَّةً وَأَرْبَعِينَ تَقْرِيبَا.'),
    S(res(M('Aₓ = 2')+' · '+M('Aᵧ ≈ 3.46')),'')]},
  tr:{title:'تمرين · صفحة 21',sayT:'وَتَأَمَّلْ مَعِي التَّمْرِينَ، مِنْ صَفْحَةِ 21.',steps:()=>[
    S(q('أوجد المركبة السينية والمركبة الصادية للمتجه '+M('A = 6')+' الذي يصنع زاوية '+M('θ = 45°')+' مع المحور السيني.','التمرين · صفحة 21'),''),
    S(gr(['A = 6','θ = 45°'],'المركبتان '+M('Aₓ')+' و '+M('Aᵧ')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْمُرَكَّبَتَانِ.'),
    S(fig(vComp({A:6,t:45,s:30,ax:'Aₓ ≈ 4.24',ay:'Aᵧ ≈ 4.24'}),'عند الزاوية 45° تتساوى المركبتان'),'عِنْدَ الزَّاوِيَةِ خَمْسٍ وَأَرْبَعِينَ تَتَسَاوَى الْمُرَكَّبَتَانْ.'),
    S(st(1,'السينية: '+M('Aₓ = 6 cos 45° ≈ 4.24')),'الْمُرَكَّبَةُ السِّينِيَّةُ: سِتَّةٌ فِي جَيْبِ تَمَامِ خَمْسٍ وَأَرْبَعِينَ، تُسَاوِي أَرْبَعَةً فَاصِلَةً أَرْبَعَةً وَعِشْرِينَ تَقْرِيبَا.'),
    S(st(2,'الصادية: '+M('Aᵧ = 6 sin 45° ≈ 4.24')+'<span class="kDirOn"></span>'),'وَالْمُرَكَّبَةُ الصَّادِيَّةُ تُسَاوِيهَا.'),
    S(res(M('Aₓ ≈ 4.24')+' · '+M('Aᵧ ≈ 4.24')),'')]}};
CARDS['0-6']={
  unit:{title:'متجهات الوحدة',sayT:'نَبْدَأُ دَرْسَنَا بِمُتَّجِهَاتِ الْوِحْدَهْ.',steps:()=>[
    S(pt(B('متجه الوحدة')+': متجه له اتجاه معين، ومقداره يساوي واحدا.'),'مُتَّجِهُ الْوَحْدَةِ: مُتَّجِهٌ لَهُ اتِّجَاهٌ مُعَيَّنٌ، وَمِقْدَارُهُ يُسَاوِي وَاحِدَا.'),
    S(pt('تستخدم للتعبير عن الاتجاه، ورموزها للمحاور x و y و z: '+M('î , ĵ , k̂')+'.'),'تُسْتَخْدَمُ لِلتَّعْبِيرِ عَنِ الِاتِّجَاهِ، وَرُمُوزُهَا لِلْمَحَاوِرِ الثَّلَاثَةِ: آيْ، وَجَيْ، وَكَيْ.'),
    S(fig(vUnit(),'متجهات الوحدة على المحاور الثلاثة'),'لَاحِظِ الرَّسْمَ: لِكُلِّ مِحْوَرٍ مُتَّجِهُ وَحْدَةٍ مِقْدَارُهُ وَاحِدْ.')]},
  dot:{title:'الضرب القياسي',sayT:'وَلِلْمُتَّجِهَاتِ نَوْعَانِ مِنَ الضَّرْبِ، أَوَّلُهُمَا الضَّرْبُ الْقِيَاسِيُّ.',steps:()=>[
    S(pt(B('الضرب القياسي')+': حاصل ضرب مقدار المتجه الأول في مقدار المتجه الثاني في جيب تمام الزاوية بينهما، والنتيجة '+B('كمية قياسية')+'.'),'الضَّرْبُ الْقِيَاسِيُّ: حَاصِلُ ضَرْبِ مِقْدَارِ الْمُتَّجِهِ الْأَوَّلِ، فِي مِقْدَارِ الْمُتَّجِهِ الثَّانِي، فِي جَيْبِ تَمَامِ الزَّاوِيَةِ بَيْنَهُمَا، وَالنَّتِيجَةُ كَمِّيَّةٌ قِيَاسِيَّهْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('A · B = |A| |B| cos θ')+'</div>'),'وَالْقَانُونُ: `A · B = |A| |B| cos θ`'),{md:'`A · B = |A| |B| cos θ`'}),
    S(fig(vDot(),'الضرب القياسي: A مضروبا في مسقط B عليه'),'لَاحِظِ الرَّسْمَ: نَضْرِبُ الْمُتَّجِهَ الْأَوَّلَ فِي مَسْقَطِ الثَّانِي عَلَيْهِ، فَيَكُونُ النَّاتِجُ عَدَدَا.'),
    S(pt('ومتجهات الوحدة: '+M('î·î = ĵ·ĵ = k̂·k̂ = 1')+' و '+M('î·ĵ = ĵ·k̂ = k̂·î = 0')),'وَضَرْبُ مُتَّجِهِ الْوَحْدَةِ فِي نَفْسِهِ يُسَاوِي وَاحِدًا، وَفِي غَيْرِهِ يُسَاوِي صِفْرَا.')]},
  cross:{title:'الضرب الاتجاهي',sayT:'وَالنَّوْعُ الثَّانِي: الضَّرْبُ الِاتِّجَاهِيُّ.',steps:()=>[
    S(pt(B('الضرب الاتجاهي')+': نتيجته '+B('كمية متجهة')+'، اتجاهها عمودي على مستوى المتجهين.'),'الضَّرْبُ الِاتِّجَاهِيُّ: نَتِيجَتُهُ كَمِّيَّةٌ مُتَّجِهَةٌ، اتِّجَاهُهَا عَمُودِيٌّ عَلَى مُسْتَوَى الْمُتَّجِهَيْنْ.'),
    Object.assign(S(pt('<div class="kLaw">'+M('|A × B| = |A| |B| sin θ')+'</div>'),'وَمِقْدَارُهَا: `|A × B| = |A| |B| sin θ`'),{md:'`|A × B| = |A| |B| sin θ`'}),
    S(fig(vCross(),'ناتج الضرب الاتجاهي عمودي على مستوى المتجهين'),'لَاحِظِ الرَّسْمَ: النَّاتِجُ بِالْأَخْضَرِ عَمُودِيٌّ عَلَى الْمُسْتَوَى الَّذِي فِيهِ الْمُتَّجِهَانْ.'),
    S(pt('ومتجهات الوحدة: '+M('î × ĵ = k̂')+' ، '+M('ĵ × k̂ = î')+' ، '+M('k̂ × î = ĵ')+' ، و '+M('î × î = 0')),'وَضَرْبُ مُتَّجِهِ الْوَحْدَةِ فِي نَفْسِهِ اتِّجَاهِيًّا يُسَاوِي صِفْرَا.')]},
  ex1:{title:'مثال ١ · صفحة 22',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى حَلِّ أَمْثِلَةِ الْحَقِيبَةِ التَّدْرِيبِيَّةِ. لِنَأْخُذِ الْمِثَالَ الْأَوَّلَ، مِنْ صَفْحَةِ 22.',steps:()=>[
    S(q('لديك المتجهان '+M('A = 3î − 4ĵ')+' و '+M('B = −2î + 3k̂')+'. أوجد: '+M('|A|')+' ، '+M('|B|')+' ، '+M('A · B')+' ، والزاوية θ.','المثال · صفحة 22'),''),
    S(st(1,M('|A| = √(3² + (−4)²) = 5')),'مِقْدَارُ الْمُتَّجِهِ الْأَوَّلِ: الْجَذْرُ التَّرْبِيعِيُّ لِتِسْعَةٍ زَائِدَ سِتَّةَ عَشَرَ، يُسَاوِي خَمْسَهْ.'),
    S(st(2,M('|B| = √((−2)² + 3²) = √13 ≈ 3.6')),'مِقْدَارُ الْمُتَّجِهِ الثَّانِي: جَذْرُ ثَلَاثَةَ عَشَرَ، يُسَاوِي ثَلَاثَةً فَاصِلَةً سِتَّةً تَقْرِيبَا.'),
    S(st(3,M('A · B = (3)(−2) + (−4)(0) + (0)(3) = −6')),'الضَّرْبُ الْقِيَاسِيُّ: نَضْرِبُ الْمُرَكَّبَاتِ الْمُتَنَاظِرَةَ وَنَجْمَعُهَا، فَيُسَاوِي سَالِبَ سِتَّهْ.'),
    S(st(4,M('cos θ = −6 ÷ (5 × 3.6) ≈ −0.33')+' ← '+M('θ ≈ 109°')+'<span class="kDirOn"></span>'),'جَيْبُ تَمَامِ الزَّاوِيَةِ سَالِبُ صِفْرٍ فَاصِلَةٍ ثَلَاثَةٍ وَثَلَاثِينَ، فَالزَّاوِيَةُ مِئَةٌ وَتِسْعُ دَرَجَاتٍ تَقْرِيبَا.'),
    S(res(M('|A| = 5')+' · '+M('|B| ≈ 3.6')+' · '+M('A · B = −6')+' · '+M('θ ≈ 109°')),'')]},
  ex2:{title:'مثال ٢ · صفحة 23',sayT:'وَتَأَمَّلْ مَعِي الْمِثَالَ الثَّانِيَ، مِنْ صَفْحَةِ 23.',steps:()=>[
    S(q('للمتجهين '+M('A = 3î − 4ĵ')+' و '+M('B = −2î + 3k̂')+'، أوجد حاصل الضرب الاتجاهي '+M('A × B')+'.','المثال · صفحة 23'),''),
    S(st(1,M('A × B = (3î)×(−2î) + (3î)×(3k̂) + (−4ĵ)×(−2î) + (−4ĵ)×(3k̂)')),'نَضْرِبُ كُلَّ حَدٍّ فِي الْمُتَّجِهِ الْأَوَّلِ، فِي كُلِّ حَدٍّ فِي الثَّانِي.'),
    S(st(2,M('= 0 − 9ĵ − 8k̂ − 12î')),'وَنَسْتَخْدِمُ قَوَاعِدَ ضَرْبِ مُتَّجِهَاتِ الْوَحْدَةِ.'),
    S(res(M('A × B = −12î − 9ĵ − 8k̂')),'النَّتِيجَةُ: مُتَّجِهٌ مُرَكَّبَاتُهُ سَالِبُ اثْنَيْ عَشَرَ، وَسَالِبُ تِسْعَةٍ، وَسَالِبُ ثَمَانِيَهْ.')]},
  ex3:{title:'مثال ٣ · صفحة 23',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 23.',steps:()=>[
    S(q('إذا كان مقدار المتجه '+M('A = 10')+' والمتجه '+M('B = 5')+' والزاوية بينهما '+M('60°')+'، أوجد حاصل الضرب القياسي، ومقدار حاصل الضرب الاتجاهي.','المثال · صفحة 23'),''),
    S(gr(['A = 10','B = 5','θ = 60°'],M('A · B')+' و '+M('|A × B|')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ.'),
    S(st(1,M('A · B = (10)(5) cos 60° = 25')),'الضَّرْبُ الْقِيَاسِيُّ: عَشَرَةٌ فِي خَمْسَةٍ فِي نِصْفٍ، يُسَاوِي خَمْسَةً وَعِشْرِينْ.'),
    S(st(2,M('|A × B| = (10)(5) sin 60° ≈ 43.3')+'<span class="kDirOn"></span>'),'وَمِقْدَارُ الضَّرْبِ الِاتِّجَاهِيِّ: خَمْسُونَ فِي جَيْبِ سِتِّينَ، يُسَاوِي ثَلَاثَةً وَأَرْبَعِينَ فَاصِلَةً ثَلَاثَةً تَقْرِيبَا.'),
    S(res(M('A · B = 25')+' · '+M('|A × B| ≈ 43.3')),'')]}};
function applyU1(out,K2){defs();const T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const C=id=>()=>card(K2,id),X=()=>null,LIFE=s=>sl=>{sl.sayT=s;return typeof appCards==='function'?appCards(sl):sl};
  const RR={
   '0-2':[[/^قاعدة التحويل$/,C('rule')],[/^تحويل السرعة$/,C('speed')],[/^التحقق من صحة القانون بالوحدات$/,C('check')],[/^خطوات التحقق من صحة القانون/,X],
     [/^أمثلة الحقيبة التدريبية محلولة$/,C('ex2')],[/^مثال ٣: تحويل السرعة/,C('ex3')],[/^مثال ١: تأكد من صحة القانون/,C('law1')],[/^مثال ٢: تأكد من صحة القانون/,C('law2')],[/^مثال ٣: تأكد من صحة القانون/,C('law3')],
     [/^رسم توضيحي/,X],[/^البادئات الشائعة/,C('prefix')],[/^عوامل تحويل مفيدة/,C('factors')],[/^تمرين \d+ ·/,X],
     [/^تطبيقات من الحياة$/,LIFE('وَبَعْدَ أَنْ تَدَرَّبْنَا عَلَى التَّحْوِيلِ وَالتَّحَقُّقِ مِنَ الْقَوَانِينِ، لِنَرَ أَيْنَ نَسْتَخْدِمُهُمَا فِي حَيَاتِنَا.')]],
   '0-4':[[/^نوعان من الكميات$/,C('types')],[/^إيجاد المحصلة بقانون جيب التمام$/,C('cos')],[/^ملحوظة: إشارة/,X],[/^أمثلة الحقيبة التدريبية محلولة$/,C('ex1')],[/^مثال ٢: محصلة متجهين/,C('ex2')],
     [/^رسم توضيحي/,X],[/^الكمية القياسية والكمية المتجهة$/,X],[/^تمرين \d+ ·/,X],
     [/^تطبيقات من الحياة$/,LIFE('وَبَعْدَ أَنْ فَهِمْنَا الْمُتَّجِهَاتِ وَمُحَصِّلَتَهَا، لِنَرَ أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.')]],
   '0-5':[[/^تحليل متجه إلى مركبتين$/,C('comp')],[/^نصائح$/,X],[/^أمثلة الحقيبة التدريبية محلولة$/,C('ex1')],[/^تمرين: تمرين تحليل متجه/,C('tr')],[/^رسم توضيحي/,X],[/^تمرين \d+ ·/,X],
     [/^تطبيقات من الحياة$/,LIFE('وَبَعْدَ أَنْ تَعَلَّمْنَا تَحْلِيلَ الْمُتَّجِهِ، لِنَرَ أَيْنَ نَسْتَخْدِمُهُ فِي حَيَاتِنَا.')]],
   '0-6':[[/^متجهات الوحدة$/,C('unit')],[/^الضرب القياسي \(النقطي\)/,C('dot')],[/^أولا: الضرب القياسي/,X],[/^ثانيا: الضرب القياسي/,X],[/^الضرب الاتجاهي A×B/,C('cross')],[/^أولا: الضرب الاتجاهي/,X],[/^ثانيا: الضرب الاتجاهي/,X],
     [/^مثال ١ \(صفحة 22\)$/,C('ex1')],[/^مثال ٢ \(صفحة 23\)$/,C('ex2')],[/^مثال ٣ \(صفحة 23\)$/,C('ex3')],[/^رسم توضيحي/,X],[/^الضرب القياسي والضرب الاتجاهي$/,X],[/^تمرين \d+/,X],
     [/^تطبيقات من الحياة$/,LIFE('وَبَعْدَ أَنْ تَعَرَّفْنَا عَلَى ضَرْبِ الْمُتَّجِهَاتِ، لِنَرَ أَيْنَ نَسْتَخْدِمُهُ فِي حَيَاتِنَا.')]]};
  const R=RR[K2]||[];const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}
/* ===== الدروس النموذجية للوحدة الثانية 1-1 إلى 1-9 (الحقيبة التدريبية صفحات 33-57) — 5 نوفمبر ===== */
const kBG=(W,H)=>`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
/* المسافة والإزاحة: A ثم B غربا ثم C شرقا */
function fDisp(o){o=o||{};const W=640,H=270;let b=svg0(W,H)+gPaper(W,H);const y=150,A=[520,y],B=[130,y],C=[260,y];
  b+=vArr(A[0],y-22,B[0],y-22,'#2563eb',7,'6 km غربا',325,y-36)+vArr(B[0],y+22,C[0],y+22,'#dc2626',7,'2 km شرقا',195,y+52);
  if(o.res!==false)b+=`<g class="kAr" style="--d:.6s">${vArr(A[0],y+70,C[0],y+70,'#16a34a',9,'الإزاحة 4 km غربا',390,y+100)}</g>`;
  [['A',A],['B',B],['C',C]].forEach(([t,p])=>{b+=`<circle cx="${p[0]}" cy="${y}" r="9" fill="#0f172a"/><text x="${p[0]}" y="${y-48}" text-anchor="middle" font-size="18" font-weight="900" fill="#0f172a">${t}</text>`});
  b+=`<text x="580" y="42" font-size="14" font-weight="900" fill="#334155">شرق ←</text><text x="40" y="42" font-size="14" font-weight="900" fill="#334155">→ غرب</text>`;return b+'</svg>'}
const PH=(src,cap,say)=>S({html:`<div class="kc kFig"><img src="${src}" alt="${cap}" style="display:block;width:100%;max-width:640px;margin:0 auto;border-radius:12px"><div class="kCap">${cap}</div></div>`},say);
const LAWB=(f,say)=>Object.assign(S(pt('<div class="kLaw">'+M(f)+'</div>'),say+': `'+f+'`'),{md:'`'+f+'`'});
CARDS['1-1']={
  intro:{title:'الحركة على خط مستقيم',sayT:'مَرْحَبًا بِكَ فِي الْوِحْدَةِ الثَّانِيَةِ: الْحَرَكَةُ وَالْقُوَّةُ وَالشُّغْلُ وَالطَّاقَهْ. وَنَبْدَأُ بِأَنْوَاعِ الْحَرَكَهْ.',steps:()=>[
    S(pt(B('1. الحركة في بعد واحد')+': لمتجه موضع الجسم مركبة واحدة في اتجاه محور واحد.'),'الْأَوَّلُ: الْحَرَكَةُ فِي بُعْدٍ وَاحِدٍ، وَفِيهَا لِمُتَّجِهِ مَوْضِعِ الْجِسْمِ مُرَكَّبَةٌ وَاحِدَهْ.'),
    S(fig(fAir(),'سيارة تتحرك على طريق مستقيم في بعد واحد'),'لَاحِظِ الْمَشْهَدَ: السَّيَّارَةُ عَلَى الطَّرِيقِ تَتَحَرَّكُ فِي خَطٍّ مُسْتَقِيمٍ، أَيْ فِي بُعْدٍ وَاحِدْ.'),
    S(pt(B('2. الحركة في بعدين')+': لمتجه الموضع مركبتان، مثل حركة المقذوفات والحركة الدائرية.'),'الثَّانِي: الْحَرَكَةُ فِي بُعْدَيْنِ، مِثْلَ حَرَكَةِ الْمَقْذُوفَاتِ وَالْحَرَكَةِ الدَّائِرِيَّهْ.'),
    S(pt(B('3. الحركة في ثلاثة أبعاد')+': يتغير موضع الجسم بالنسبة لمحاور الإسناد الثلاثة، مثل حركة طائرة في الجو.'),'الثَّالِثُ: الْحَرَكَةُ فِي ثَلَاثَةِ أَبْعَادٍ، مِثْلَ حَرَكَةِ طَائِرَةٍ فِي الْجَوّْ.')]},
  goals:{title:'أهداف الوحدة',sayT:'وَالْآنَ، لِنَتَعَرَّفْ عَلَى أَهْدَافِ الْوِحْدَةِ.',steps:()=>[
    S({html:`<div class="kc kPt kKeep kcB">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'فِي نِهَايَةِ هَذِهِ الْوِحْدَةِ، يَكُونُ الْمُتَدَرِّبُ قَادِرًا عَلَى:')].concat([
    ['تقديم المفهوم المناسب لقوانين الحركة على خط مستقيم بتسارع ثابت.','تَقْدِيمِ الْمَفْهُومِ الْمُنَاسِبِ لِقَوَانِينِ الْحَرَكَةِ عَلَى خَطٍّ مُسْتَقِيمٍ بِتَسَارُعٍ ثَابِتْ.'],
    ['بيان علاقة القوة بالحركة.','بَيَانِ عَلَاقَةِ الْقُوَّةِ بِالْحَرَكَهْ.'],
    ['التعرف على الكميات الفيزيائية كالإزاحة والسرعة والتسارع.','التَّعَرُّفِ عَلَى الْكَمِّيَّاتِ الْفِيزْيَائِيَّةِ، كَالْإِزَاحَةِ وَالسُّرْعَةِ وَالتَّسَارُعْ.'],
    ['ربط المفاهيم والكميات الفيزيائية بقوانين نيوتن في الحركة.','رَبْطِ الْمَفَاهِيمِ وَالْكَمِّيَّاتِ الْفِيزْيَائِيَّةِ بِقَوَانِينِ نِيُوتُنَ فِي الْحَرَكَهْ.'],
    ['التعرف على العلاقة بين الشغل والتغير في الطاقة الميكانيكية (حفظ الطاقة).','التَّعَرُّفِ عَلَى الْعَلَاقَةِ بَيْنَ الشُّغْلِ وَالتَّغَيُّرِ فِي الطَّاقَةِ الْمِيكَانِيكِيَّهْ.']].map(([t,s],i)=>S({html:`<div class="kc kPt kKeep kcT"><b>${i+1}.</b> ${t}</div>`},s)))},
  dist:{title:'المسافة والإزاحة',sayT:'بَعْدَ أَنْ تَعَرَّفْنَا عَلَى أَهْدَافِ الْوِحْدَةِ، نَبْدَأُ أَوَّلَ مَوْضُوعَاتِهَا: الْمَسَافَةُ وَالْإِزَاحَهْ.',steps:()=>[
    S(pt(B('المسافة')+': طول المسار الفعلي الذي يقطعه الجسم بين نقطتين، وهي كمية '+B('قياسية')+'.'),'الْمَسَافَةُ: طُولُ الْمَسَارِ الْفِعْلِيِّ الَّذِي يَقْطَعُهُ الْجِسْمُ بَيْنَ نُقْطَتَيْنِ، وَهِيَ كَمِّيَّةٌ قِيَاسِيَّهْ.'),
    S(pt(B('الإزاحة')+': التغير في موضع الجسم، وتمثل بمتجه من نقطة البداية إلى نقطة النهاية، وهي كمية '+B('متجهة')+'.'),'الْإِزَاحَةُ: التَّغَيُّرُ فِي مَوْضِعِ الْجِسْمِ، وَتُمَثَّلُ بِمُتَّجِهٍ مِنْ نُقْطَةِ الْبِدَايَةِ إِلَى نُقْطَةِ النِّهَايَةِ، وَهِيَ كَمِّيَّةٌ مُتَّجِهَهْ.')]},
  exd:{title:'مثال · صفحة 35',sayT:'لِنَأْخُذْ مِثَالَ الْحَقِيبَةِ التَّدْرِيبِيَّةِ عَلَى الْمَسَافَةِ وَالْإِزَاحَةِ، مِنْ صَفْحَةِ 35.',steps:()=>[
    S(q('سيارة تحركت من A إلى B غربا '+M('6 km')+'، ثم من B إلى C شرقا '+M('2 km')+'. أوجد: الإزاحة، والمسافة.','المثال · صفحة 35'),''),
    S(fig(fDispR({show:1}),'المسار الفعلي باللونين الأزرق والأحمر، والإزاحة بالأخضر'),'لَاحِظِ الرَّسْمَ: الْمَسَارُ الْفِعْلِيُّ بِالْأَزْرَقِ وَالْأَحْمَرِ، وَالْإِزَاحَةُ بِالْأَخْضَرِ مِنَ الْبِدَايَةِ إِلَى النِّهَايَهْ.'),
    S(st(1,'المسافة: '+M('6 + 2 = 8 km')),'الْمَسَافَةُ مَجْمُوعُ طُولِ الْمَسَارِ: سِتَّةٌ زَائِدَ اثْنَيْنِ، تُسَاوِي ثَمَانِيَةَ كِيلُومِتْرَاتْ.'),
    S(st(2,'الإزاحة: '+M('6 − 2 = 4 km')+' غربا'),'الْإِزَاحَةُ: سِتَّةٌ نَاقِصَ اثْنَيْنِ، تُسَاوِي أَرْبَعَةَ كِيلُومِتْرَاتٍ غَرْبَا.'),
    S(res('المسافة '+M('8 km')+' · الإزاحة '+M('4 km')+' غربا'),'')]},
  speed:{title:'السرعة المتوسطة',sayT:'وَنَنْتَقِلُ إِلَى السُّرْعَةِ الْمُتَوَسِّطَهْ.',steps:()=>[
    S(pt(B('السرعة المتوسطة')+': النسبة بين إزاحة الجسم المتحرك والزمن المستغرق لحدوثها.'),'السُّرْعَةُ الْمُتَوَسِّطَةُ: النِّسْبَةُ بَيْنَ إِزَاحَةِ الْجِسْمِ الْمُتَحَرِّكِ، وَالزَّمَنِ الْمُسْتَغْرَقِ لِحُدُوثِهَا.'),
    LAWB('v̄ = x / t','وَالْقَانُونُ'),
    S(fig(fTrack({a:'t = 2 s',c:'v̄ = 10 m/s',x:'x = 20 m'}),'السيارة تقطع 20 m في 2 s، فسرعتها المتوسطة 10 m/s'),'لَاحِظِ الْمَشْهَدَ: السَّيَّارَةُ تَقْطَعُ عِشْرِينَ مِتْرًا فِي ثَانِيَتَيْنِ، فَسُرْعَتُهَا الْمُتَوَسِّطَةُ عَشَرَةُ أَمْتَارٍ لِكُلِّ ثَانِيَهْ.'),
    S(pt('وحدة قياس السرعة '+M('m/s')+'.'),'وَوَحْدَةُ قِيَاسِ السُّرْعَةِ: مِتْرٌ لِكُلِّ ثَانِيَهْ.')]},
  acc:{title:'التسارع',sayT:'وَإِذَا تَغَيَّرَتِ السُّرْعَةُ، نَتَحَدَّثُ عَنِ التَّسَارُعْ.',steps:()=>[
    S(pt(B('التسارع')+': المعدل الزمني لتغير السرعة، أي التغير في السرعة بالنسبة للزمن.'),'التَّسَارُعُ: الْمُعَدَّلُ الزَّمَنِيُّ لِتَغَيُّرِ السُّرْعَةِ.'),
    LAWB('a = (vf − vi) / t','وَالْقَانُونُ'),
    S(pt('وحدة قياس التسارع '+M('m/s²')+'. التسارع الموجب يزيد السرعة، والسالب يقللها.'),'وَوَحْدَتُهُ مِتْرٌ لِكُلِّ ثَانِيَةٍ تَرْبِيعٌ. التَّسَارُعُ الْمُوجَبُ يَزِيدُ السُّرْعَةَ، وَالسَّالِبُ يُقَلِّلُهَا.')]},
  ex1:{title:'مثال ١ · صفحة 36',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 36.',steps:()=>[
    S(q('سيارة تتحرك في خط مستقيم قطعت '+M('120 m')+' في '+M('10 s')+'. أوجد السرعة المتوسطة.','المثال · صفحة 36'),''),
    S(gr(['x = 120 m','t = 10 s'],'السرعة المتوسطة '+M('v̄')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: السُّرْعَةُ الْمُتَوَسِّطَهْ.'),
    S(st(1,'القانون: '+M('v̄ = x / t')),'نَسْتَخْدِمُ قَانُونَ السُّرْعَةِ الْمُتَوَسِّطَهْ.'),
    S(st(2,'التعويض: '+M('v̄ = 120 / 10')+'<span class="kDirOn"></span>'),'نَقْسِمُ مِئَةً وَعِشْرِينَ عَلَى عَشَرَهْ.'),
    S(res(M('v̄ = 12 m/s')),'النَّتِيجَةُ: اثْنَا عَشَرَ مِتْرًا لِكُلِّ ثَانِيَهْ.')]},
  ex2:{title:'مثال ٢ · صفحة 36',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 36.',steps:()=>[
    S(q('سيارة تتغير سرعتها من '+M('20 m/s')+' إلى '+M('80 m/s')+' في '+M('3 s')+'. أوجد التسارع.','المثال · صفحة 36'),''),
    S(gr(['vi = 20 m/s','vf = 80 m/s','t = 3 s'],'التسارع '+M('a')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: التَّسَارُعْ.'),
    S(st(1,'القانون: '+M('a = (vf − vi) / t')),'نَسْتَخْدِمُ قَانُونَ التَّسَارُعْ.'),
    S(st(2,'التعويض: '+M('a = (80 − 20) / 3 = 60 / 3')+'<span class="kDirOn"></span>'),'التَّغَيُّرُ فِي السُّرْعَةِ سِتُّونَ، نَقْسِمُهُ عَلَى ثَلَاثَهْ.'),
    S(res(M('a = 20 m/s²')),'النَّتِيجَةُ: عِشْرُونَ مِتْرًا لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.')]}};
CARDS['1-2']={
  eqs:{title:'معادلات الحركة بتسارع ثابت',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى مُعَادَلَاتِ الْحَرَكَةِ عَلَى خَطٍّ مُسْتَقِيمٍ بِتَسَارُعٍ ثَابِتْ.',steps:()=>[
    S({html:`<div class="kc kUH"><span>العلاقة</span><span>المعادلة</span></div>`},'هَذَا جَدْوَلُ الْمُعَادَلَاتِ الْخَمْسِ.')].concat([
    ['السرعة والتسارع والزمن','vf = vi + a t','الْأُولَى: عَلَاقَةُ السُّرْعَةِ وَالتَّسَارُعِ وَالزَّمَنْ.'],['السرعة المتوسطة','v̄ = (vf + vi) / 2','الثَّانِيَةُ: السُّرْعَةُ الْمُتَوَسِّطَهْ.'],['الإزاحة والسرعة والزمن','x = v̄ t','الثَّالِثَةُ: الْإِزَاحَةُ تُسَاوِي السُّرْعَةَ الْمُتَوَسِّطَةَ فِي الزَّمَنْ.'],
    ['الإزاحة والسرعة والتسارع والزمن','x = vi t + ½ a t²','الرَّابِعَةُ: عَلَاقَةُ الْإِزَاحَةِ وَالسُّرْعَةِ وَالتَّسَارُعِ وَالزَّمَنْ.'],['السرعة والتسارع والإزاحة','vf² = vi² + 2 a x','الْخَامِسَةُ: عَلَاقَةُ السُّرْعَةِ وَالتَّسَارُعِ وَالْإِزَاحَهْ.']].map(([n,f,s])=>S({html:`<div class="kc kUR"><span>${n}</span><span class="kUS">${M(f)}</span></div>`},s))).concat([
    S(fig(fTrack({a:'vi',b:'a = ثابت',c:'vf',x:'x'}),'سيارة تتسارع بانتظام على الطريق'),'نَخْتَارُ الْمُعَادَلَةَ الَّتِي فِيهَا الْمَعْلُومُ وَالْمَطْلُوبُ، وَلَيْسَ فِيهَا مَجْهُولٌ آخَرْ.')])},
  ex1:{title:'مثال ١ · صفحة 37',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 37.',steps:()=>[
    S(q('سيارة سرعتها '+M('5 m/s')+' ثم توقفت بعد أن قطعت '+M('20 m')+' بتسارع منتظم. أوجد: الزمن، والتسارع.','المثال · صفحة 37'),''),
    S(gr(['vi = 5 m/s','vf = 0','x = 20 m'],'الزمن '+M('t')+' والتسارع '+M('a')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ.'),
    S(st(1,M('v̄ = (0 + 5) / 2 = 2.5 m/s')),'السُّرْعَةُ الْمُتَوَسِّطَةُ: اثْنَانِ فَاصِلَةٌ خَمْسَةٌ.'),
    S(st(2,M('t = x / v̄ = 20 / 2.5 = 8 s')),'الزَّمَنُ: عِشْرُونَ عَلَى اثْنَيْنِ فَاصِلَةٍ خَمْسَةٍ، يُسَاوِي ثَمَانِيَ ثَوَانْ.'),
    S(st(3,M('a = (0 − 5) / 8 = −0.625 m/s²')+'<span class="kDirOn"></span>'),'التَّسَارُعُ سَالِبٌ لِأَنَّ السَّيَّارَةَ تَتَبَاطَأُ: سَالِبُ صِفْرٍ فَاصِلَةٍ سِتِّ مِئَةٍ وَخَمْسَةٍ وَعِشْرِينْ.'),
    S(res(M('t = 8 s')+' · '+M('a = −0.625 m/s²')),'')]},
  ex2:{title:'مثال ٢ · صفحة 38',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 38.',steps:()=>[
    S(q('سيارة تحركت بسرعة '+M('13 m/s')+' وبتسارع منتظم حتى وصلت سرعتها إلى '+M('26 m/s')+' في '+M('10 s')+'. أوجد المسافة.','المثال · صفحة 38'),''),
    S(gr(['vi = 13 m/s','vf = 26 m/s','t = 10 s'],'المسافة '+M('x')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْمَسَافَهْ.'),
    S(st(1,M('v̄ = (26 + 13) / 2 = 19.5 m/s')),'السُّرْعَةُ الْمُتَوَسِّطَةُ: تِسْعَةَ عَشَرَ فَاصِلَةً خَمْسَهْ.'),
    S(st(2,M('x = v̄ t = 19.5 × 10')+'<span class="kDirOn"></span>'),'نَضْرِبُهَا فِي الزَّمَنْ.'),
    S(res(M('x = 195 m')),'النَّتِيجَةُ: مِئَةٌ وَخَمْسَةٌ وَتِسْعُونَ مِتْرَا.')]},
  ex3:{title:'مثال ٣ · صفحة 38',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 38.',steps:()=>[
    S(q('سيارة تحركت من السكون بتسارع منتظم وقطعت '+M('110 m')+' في '+M('5 s')+'. أوجد التسارع.','المثال · صفحة 38'),''),
    S(gr(['vi = 0','x = 110 m','t = 5 s'],'التسارع '+M('a')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: التَّسَارُعْ.'),
    S(st(1,'القانون: '+M('x = vi t + ½ a t²')),'نَسْتَخْدِمُ الْمُعَادَلَةَ الرَّابِعَةَ، لِأَنَّنَا نَعْرِفُ الْإِزَاحَةَ وَالزَّمَنْ.'),
    S(st(2,M('110 = 0 + ½ a (5²) = 12.5 a')),'نُعَوِّضُ: مِئَةٌ وَعَشَرَةٌ تُسَاوِي اثْنَيْ عَشَرَ فَاصِلَةً خَمْسَةً فِي التَّسَارُعْ.'),
    S(st(3,M('a = 110 / 12.5')+'<span class="kDirOn"></span>'),'نَقْسِمُ الطَّرَفَيْنْ.'),
    S(res(M('a = 8.8 m/s²')),'النَّتِيجَةُ: ثَمَانِيَةٌ فَاصِلَةٌ ثَمَانِيَةٌ مِتْرٌ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.')]},
  ex4:{title:'مثال ٤ · صفحة 38',sayT:'وَالْمِثَالُ الرَّابِعُ، مِنْ صَفْحَةِ 38.',steps:()=>[
    S(q('سيارة بدأت من السكون بتسارع '+M('4 m/s²')+'. ما سرعتها بعد أن قطعت '+M('20 m')+'؟','المثال · صفحة 38'),''),
    S(gr(['vi = 0','a = 4 m/s²','x = 20 m'],'السرعة النهائية '+M('vf')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: السُّرْعَةُ النِّهَائِيَّهْ.'),
    S(st(1,'القانون: '+M('vf² = vi² + 2 a x')),'نَسْتَخْدِمُ الْمُعَادَلَةَ الْخَامِسَةَ، لِأَنَّ الزَّمَنَ غَيْرُ مَعْلُومْ.'),
    S(st(2,M('vf² = 0 + 2 × 4 × 20 = 160')),'مُرَبَّعُ السُّرْعَةِ النِّهَائِيَّةِ مِئَةٌ وَسِتُّونْ.'),
    S(st(3,M('vf = √160')+'<span class="kDirOn"></span>'),'نَأْخُذُ الْجَذْرَ التَّرْبِيعِيَّ.'),
    S(res(M('vf ≈ 12.6 m/s')),'النَّتِيجَةُ: اثْنَا عَشَرَ فَاصِلَةٌ سِتَّةٌ مِتْرٌ لِكُلِّ ثَانِيَةٍ تَقْرِيبَا.')]}};
CARDS['1-3']={
  force:{title:'القوة',sayT:'نَبْدَأُ دَرْسَنَا بِمَفْهُومِ الْقُوَّهْ.',steps:()=>[
    S(pt(B('القوة')+': دفع أو سحب يؤثر على الجسم، وهي كمية '+B('متجهة')+'، ووحدة قياسها النيوتن '+M('N')+'.'),'الْقُوَّةُ: دَفْعٌ أَوْ سَحْبٌ يُؤَثِّرُ عَلَى الْجِسْمِ، وَهِيَ كَمِّيَّةٌ مُتَّجِهَةٌ، وَوَحْدَتُهَا النِّيُوتُنْ.'),
    PH('nw-push.jpg','رجل يدفع سيارة: القوة دفع يؤثر على الجسم','لَاحِظِ الصُّورَةَ: الرَّجُلُ يَدْفَعُ السَّيَّارَةَ، فَيُؤَثِّرُ عَلَيْهَا بِقُوَّهْ.')]},
  law1:{title:'قانون نيوتن الأول',sayT:'وَالْآنَ إِلَى قَوَانِينِ نِيُوتُنَ، وَأَوَّلُهَا قَانُونُ الْقُصُورِ الذَّاتِيّْ.',steps:()=>[
    S(pt('الجسم الساكن يبقى ساكنا ما لم تؤثر عليه قوة محصلة خارجية، والجسم المتحرك يستمر في الحركة بسرعة ثابتة وفي خط مستقيم ما لم تؤثر عليه قوة محصلة خارجية.'),'الْجِسْمُ السَّاكِنُ يَبْقَى سَاكِنًا مَا لَمْ تُؤَثِّرْ عَلَيْهِ قُوَّةٌ مُحَصِّلَةٌ خَارِجِيَّةٌ، وَالْجِسْمُ الْمُتَحَرِّكُ يَسْتَمِرُّ فِي الْحَرَكَةِ بِسُرْعَةٍ ثَابِتَةٍ، وَفِي خَطٍّ مُسْتَقِيمٍ، مَا لَمْ تُؤَثِّرْ عَلَيْهِ قُوَّةٌ مُحَصِّلَةٌ خَارِجِيَّهْ.'),
    LAWB('ΣF = 0','أَيْ أَنَّ مُحَصِّلَةَ الْقُوَى صِفْرٌ')]},
  law2:{title:'قانون نيوتن الثاني',sayT:'وَقَانُونُ نِيُوتُنَ الثَّانِي يَرْبِطُ الْقُوَّةَ بِالتَّسَارُعْ.',steps:()=>[
    S(pt('إذا أثرت قوة '+M('F')+' على جسم كتلته '+M('m')+' فإنها تكسبه تسارعا '+M('a')+' يتناسب طرديا مع القوة، وعكسيا مع الكتلة.'),'إِذَا أَثَّرَتْ قُوَّةٌ عَلَى جِسْمٍ، فَإِنَّهَا تُكْسِبُهُ تَسَارُعًا يَتَنَاسَبُ طَرْدِيًّا مَعَ الْقُوَّةِ، وَعَكْسِيًّا مَعَ الْكُتْلَهْ.'),
    LAWB('F = m a','وَالْقَانُونُ'),
    S(fig(fCylF({m:'m',F:'F',a:'a'}),'القوة تكسب الكتلة تسارعا في اتجاهها'),'لَاحِظِ الصُّورَةَ: الْقُوَّةُ تُكْسِبُ الْكُتْلَةَ تَسَارُعًا فِي اتِّجَاهِهَا.'),
    S(pt('حيث: '+M('F')+' القوة بوحدة '+M('N')+'، و'+M('m')+' الكتلة بوحدة '+M('kg')+'، و'+M('a')+' التسارع بوحدة '+M('m/s²')+'.'),'حَيْثُ: الْقُوَّةُ بِالنِّيُوتُنِ، وَالْكُتْلَةُ بِالْكِيلُوجْرَامِ، وَالتَّسَارُعُ بِالْمِتْرِ لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.')]},
  weight:{title:'الوزن',sayT:'وَمِنْ أَهَمِّ الْقُوَى: الْوَزْنْ.',steps:()=>[
    S(pt(B('الوزن')+': قوة جاذبية الأرض للجسم.'),'الْوَزْنُ: قُوَّةُ جَاذِبِيَّةِ الْأَرْضِ لِلْجِسْمْ.'),
    LAWB('W = m g','وَالْقَانُونُ'),
    S(fig(fStand({m:'m',W:'W = m g'}),'الوزن قوة جاذبية الأرض للكتلة المعلقة، واتجاهه إلى الأسفل'),'لَاحِظِ الصُّورَةَ: الْوَزْنُ يَشُدُّ الْكُتْلَةَ الْمُعَلَّقَةَ إِلَى الْأَسْفَلْ.'),
    S(pt('حيث '+M('g = 9.8 m/s²')+' تسارع الجاذبية الأرضية، ووحدة الوزن النيوتن '+M('N')+'.'),'حَيْثُ: تَسَارُعُ الْجَاذِبِيَّةِ الْأَرْضِيَّةِ تِسْعَةٌ فَاصِلَةٌ ثَمَانِيَةٌ، وَوَحْدَةُ الْوَزْنِ النِّيُوتُنْ.'),
    S(pt(B('الفرق بين الوزن والكتلة:')),'وَالْفَرْقُ بَيْنَ الْوَزْنِ وَالْكُتْلَةِ:'),
    S(pt(B('التعريف')+': الوزن قوة جاذبية الأرض للجسم، والكتلة مقدار ما يحتويه الجسم من مادة.'),'الْوَزْنُ قُوَّةُ جَاذِبِيَّةٍ، وَالْكُتْلَةُ مِقْدَارُ الْمَادَّهْ.'),
    S(pt(B('الوحدة')+': الوزن بالنيوتن '+M('N')+'، والكتلة بالكيلوجرام '+M('kg')+'.'),'الْوَزْنُ بِالنِّيُوتُنِ، وَالْكُتْلَةُ بِالْكِيلُوجْرَامْ.'),
    S(pt(B('النوع')+': الوزن كمية متجهة، والكتلة كمية قياسية.'),'الْوَزْنُ كَمِّيَّةٌ مُتَّجِهَةٌ، وَالْكُتْلَةُ كَمِّيَّةٌ قِيَاسِيَّهْ.'),
    S(pt(B('تغير المكان')+': الوزن يتغير لأنه يعتمد على الجاذبية، والكتلة ثابتة.'),'الْوَزْنُ يَتَغَيَّرُ بِتَغَيُّرِ الْمَكَانِ، وَالْكُتْلَةُ ثَابِتَهْ.')]},
  law3:{title:'قانون نيوتن الثالث',sayT:'وَالْقَانُونُ الثَّالِثُ يَتَحَدَّثُ عَنِ الْفِعْلِ وَرَدِّ الْفِعْلْ.',steps:()=>[
    S(pt('لكل فعل رد فعل '+B('مساو')+' له في المقدار و'+B('معاكس')+' له في الاتجاه.'),'لِكُلِّ فِعْلٍ رَدُّ فِعْلٍ، مُسَاوٍ لَهُ فِي الْمِقْدَارِ، وَمُعَاكِسٌ لَهُ فِي الِاتِّجَاهْ.'),
    PH('nw-row.jpg','التجديف: المجداف يدفع الماء للخلف فيندفع القارب للأمام','مِثَالٌ مِنَ الْحَقِيبَةِ: يُؤَثِّرُ الْمِجْدَافُ عَلَى الْمَاءِ بِقُوَّةِ فِعْلٍ إِلَى الْخَلْفِ، فَيَرُدُّ الْمَاءُ عَلَى الْقَارِبِ بِقُوَّةِ رَدِّ فِعْلٍ إِلَى الْأَمَامْ.')]},
  ex1:{title:'مثال ١ · صفحة 40',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 40.',steps:()=>[
    S(q('أوجد القوة المؤثرة على جسم كتلته '+M('5 kg')+' إذا تسارع بمعدل '+M('17 m/s²')+'.','المثال · صفحة 40'),''),
    S(gr(['m = 5 kg','a = 17 m/s²'],'القوة '+M('F')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْقُوَّهْ.'),
    S(fig(fCylF({m:'5 kg',F:'F = ?',a:'a = 17 m/s²'}),'كتلة 5 kg تتسارع 17 m/s²'),'لِنَرْسُمِ الْكُتْلَةَ وَالْقُوَّهْ.'),
    S(st(1,M('F = m a = 5 × 17')+'<span class="kDirOn"></span>'),'نَضْرِبُ الْكُتْلَةَ فِي التَّسَارُعْ.'),
    S(res(M('F = 85 N')),'النَّتِيجَةُ: خَمْسَةٌ وَثَمَانُونَ نِيُوتُنْ.')]},
  ex2:{title:'مثال ٢ · صفحة 40',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 40.',steps:()=>[
    S(q('سيارة أثرت عليها قوة '+M('30000 N')+' وكتلتها '+M('1000 kg')+'. أوجد التسارع.','المثال · صفحة 40'),''),
    S(gr(['F = 30000 N','m = 1000 kg'],'التسارع '+M('a')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: التَّسَارُعْ.'),
    S(st(1,M('a = F / m = 30000 / 1000')+'<span class="kDirOn"></span>'),'نَقْسِمُ الْقُوَّةَ عَلَى الْكُتْلَهْ.'),
    S(res(M('a = 30 m/s²')),'النَّتِيجَةُ: ثَلَاثُونَ مِتْرًا لِكُلِّ ثَانِيَةٍ تَرْبِيعْ.')]},
  ex3:{title:'مثال ٣ · صفحة 41',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 41.',steps:()=>[
    S(q('قوة ثابتة '+M('50 N')+' تؤثر على صندوق ساكن كتلته '+M('10 kg')+'. أوجد سرعته بعد '+M('3 s')+'.','المثال · صفحة 41'),''),
    S(gr(['F = 50 N','m = 10 kg','vi = 0','t = 3 s'],'السرعة النهائية '+M('vf')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: السُّرْعَةُ النِّهَائِيَّهْ.'),
    S(fig(fPull({F:'F = 50 N',note:'صندوق ساكن يسحب بقوة ثابتة'}),'صندوق يسحب بقوة ثابتة 50 N'),'لِنَرْسُمِ الصُّنْدُوقَ وَالْقُوَّهْ.'),
    S(st(1,M('a = F / m = 50 / 10 = 5 m/s²')),'أَوَّلًا التَّسَارُعُ: خَمْسُونَ عَلَى عَشَرَةٍ، يُسَاوِي خَمْسَهْ.'),
    S(st(2,M('vf = vi + a t = 0 + 5 × 3')+'<span class="kDirOn"></span>'),'ثُمَّ السُّرْعَةُ: خَمْسَةٌ فِي ثَلَاثَهْ.'),
    S(res(M('vf = 15 m/s')),'النَّتِيجَةُ: خَمْسَةَ عَشَرَ مِتْرًا لِكُلِّ ثَانِيَهْ.')]},
  ex4:{title:'مثال ٤ · صفحة 41',sayT:'وَالْمِثَالُ الرَّابِعُ، مِنْ صَفْحَةِ 41.',steps:()=>[
    S(q('صندوق ساكن كتلته '+M('20 kg')+' على سطح أملس، سحب بقوة '+M('80 N')+' لمدة '+M('4 s')+'. أوجد: التسارع، والسرعة النهائية، والمسافة.','المثال · صفحة 41'),''),
    S(gr(['m = 20 kg','F = 80 N','vi = 0','t = 4 s'],M('a')+' و '+M('vf')+' و '+M('x')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَهْ.'),
    S(st(1,M('a = 80 / 20 = 4 m/s²')),'التَّسَارُعُ: ثَمَانُونَ عَلَى عِشْرِينَ، يُسَاوِي أَرْبَعَهْ.'),
    S(st(2,M('vf = 0 + 4 × 4 = 16 m/s')),'السُّرْعَةُ النِّهَائِيَّةُ: سِتَّةَ عَشَرَ مِتْرًا لِكُلِّ ثَانِيَهْ.'),
    S(st(3,M('x = 0 + ½ × 4 × 4² = 32 m')+'<span class="kDirOn"></span>'),'الْمَسَافَةُ: اثْنَانِ وَثَلَاثُونَ مِتْرَا.'),
    S(res(M('a = 4 m/s²')+' · '+M('vf = 16 m/s')+' · '+M('x = 32 m')),'')]},
  exw:{title:'مثال · صفحة 42',sayT:'وَمِثَالُ الْوَزْنِ، مِنْ صَفْحَةِ 42.',steps:()=>[
    S(q('جسم كتلته '+M('100 kg')+'، ما وزنه على سطح الأرض؟','المثال · صفحة 42'),''),
    S(gr(['m = 100 kg','g = 9.8 m/s²'],'الوزن '+M('W')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْوَزْنْ.'),
    S(st(1,M('W = m g = 100 × 9.8')+'<span class="kDirOn"></span>'),'نَضْرِبُ الْكُتْلَةَ فِي تَسَارُعِ الْجَاذِبِيَّهْ.'),
    S(res(M('W = 980 N')),'النَّتِيجَةُ: تِسْعُ مِئَةٍ وَثَمَانُونَ نِيُوتُنْ.')]}};
CARDS['1-5']={
  fr:{title:'قوة الاحتكاك',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى قُوَّةِ الِاحْتِكَاكْ.',steps:()=>[
    S(pt(B('قوة الاحتكاك')+': قوة بين سطحين متلامسين تعيق انزلاق أحدهما على الآخر، وتكون دائما معاكسة لاتجاه الحركة.'),'قُوَّةُ الِاحْتِكَاكِ: قُوَّةٌ بَيْنَ سَطْحَيْنِ مُتَلَامِسَيْنِ، تُعِيقُ انْزِلَاقَ أَحَدِهِمَا عَلَى الْآخَرِ، وَتَكُونُ دَائِمًا مُعَاكِسَةً لِاتِّجَاهِ الْحَرَكَهْ.'),
    S(fig(fPull({F:'F',f:'fk',N:'N',W:'W'}),'القوى على الصندوق: السحب F والاحتكاك fk والقوة العمودية N والوزن W'),'لَاحِظِ الْمَشْهَدَ: قُوَّةُ السَّحْبِ تَسْحَبُ الصُّنْدُوقَ إِلَى الْيَمِينِ، وَالِاحْتِكَاكُ يُعَاكِسُهُ إِلَى الْيَسَارِ، وَالْوَزْنُ إِلَى الْأَسْفَلِ، وَالْقُوَّةُ الْعَمُودِيَّةُ إِلَى الْأَعْلَى.'),
    S(pt(B('أنواعها')+': قوة الاحتكاك السكوني، وقوة الاحتكاك الحركي.'),'وَلَهَا نَوْعَانِ: الِاحْتِكَاكُ السُّكُونِيُّ، وَالِاحْتِكَاكُ الْحَرَكِيّْ.'),
    LAWB('fk = μk N','وَقَانُونُ الِاحْتِكَاكِ الْحَرَكِيِّ'),
    S(pt(B('ملحوظة')+': القوة العمودية '+M('N')+' تساوي الوزن '+M('W')+' عندما يكون الجسم على سطح أفقي ولا تؤثر عليه قوى رأسية أخرى.'),'مُلَاحَظَةٌ: الْقُوَّةُ الْعَمُودِيَّةُ تُسَاوِي الْوَزْنَ، عِنْدَمَا يَكُونُ الْجِسْمُ عَلَى سَطْحٍ أُفُقِيّْ.')]},
  ex1:{title:'مثال ١ · صفحة 45',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 45.',steps:()=>[
    S(q('صندوق وزنه '+M('40 N')+' ينزلق على طاولة أفقية، ومعامل الاحتكاك الحركي '+M('0.2')+'. ما قوة الاحتكاك؟','المثال · صفحة 45'),''),
    S(gr(['W = N = 40 N','μk = 0.2'],'قوة الاحتكاك '+M('fk')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: قُوَّةُ الِاحْتِكَاكْ.'),
    S(fig(fPull({f:'fk = ?',N:'N = 40 N',W:'W = 40 N'}),'صندوق وزنه 40 N على طاولة أفقية'),'لِنَرْسُمِ الصُّنْدُوقَ وَالْقُوَى عَلَيْهْ.'),
    S(st(1,M('fk = μk N = 0.2 × 40')+'<span class="kDirOn"></span>'),'نَضْرِبُ الْمُعَامِلَ فِي الْقُوَّةِ الْعَمُودِيَّهْ.'),
    S(res(M('fk = 8 N')),'النَّتِيجَةُ: ثَمَانِيَةُ نِيُوتُنْ.')]},
  ex2:{title:'مثال ٢ · صفحة 45',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 45.',steps:()=>[
    S(q('ما معامل الاحتكاك الحركي إذا كانت القوة العمودية '+M('30 N')+' وقوة الاحتكاك '+M('3 N')+'؟','المثال · صفحة 45'),''),
    S(gr(['N = 30 N','fk = 3 N'],'المعامل '+M('μk')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: مُعَامِلُ الِاحْتِكَاكْ.'),
    S(st(1,M('μk = fk / N = 3 / 30')+'<span class="kDirOn"></span>'),'نَقْسِمُ قُوَّةَ الِاحْتِكَاكِ عَلَى الْقُوَّةِ الْعَمُودِيَّهْ.'),
    S(res(M('μk = 0.1')),'النَّتِيجَةُ: صِفْرٌ فَاصِلَةٌ وَاحِدْ.')]},
  ex3:{title:'مثال ٣ · صفحة 45',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 45: هَلْ يَتَحَرَّكُ الصُّنْدُوقُ؟',steps:()=>[
    S(q('صندوق كتلته '+M('5 kg')+' على طاولة، دفع بقوة أفقية '+M('15 N')+'. إذا كان معامل الاحتكاك السكوني '+M('0.4')+'، هل يتحرك الصندوق؟','المثال · صفحة 45'),''),
    S(gr(['m = 5 kg','F = 15 N','μs = 0.4'],'هل '+M('F')+' أكبر من '+M('fs(max)')+'؟'),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَهْ.'),
    S(st(1,M('N = W = m g = 5 × 9.8 = 49 N')),'الْقُوَّةُ الْعَمُودِيَّةُ تُسَاوِي الْوَزْنَ: تِسْعَةً وَأَرْبَعِينَ نِيُوتُنْ.'),
    S(st(2,M('fs(max) = μs N = 0.4 × 49 = 19.6 N')+'<span class="kDirOn"></span>'),'أَقْصَى احْتِكَاكٍ سُكُونِيٍّ: تِسْعَةَ عَشَرَ فَاصِلَةً سِتَّهْ.'),
    S(res('لا يتحرك، لأن '+M('15 N')+' أقل من '+M('19.6 N')),'النَّتِيجَةُ: الصُّنْدُوقُ لَا يَتَحَرَّكُ، لِأَنَّ قُوَّةَ الدَّفْعِ أَقَلُّ مِنْ أَقْصَى احْتِكَاكٍ سُكُونِيّْ.')]}};
CARDS['1-7']={
  work:{title:'الشغل',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى الشُّغْلْ.',steps:()=>[
    S(pt(B('الشغل')+': حاصل ضرب مركبة القوة في اتجاه الإزاحة في مقدار إزاحة الجسم.'),'الشُّغْلُ: حَاصِلُ ضَرْبِ مُرَكَّبَةِ الْقُوَّةِ فِي اتِّجَاهِ الْإِزَاحَةِ، فِي مِقْدَارِ إِزَاحَةِ الْجِسْمْ.'),
    S(pt(B('1.')+' إذا كانت القوة في اتجاه الإزاحة: '+M('W = F x')),'إِذَا كَانَتِ الْقُوَّةُ فِي اتِّجَاهِ الْإِزَاحَةِ: الشُّغْلُ يُسَاوِي الْقُوَّةَ فِي الْإِزَاحَهْ.'),
    S(fig(fPull({F:'F',x:'x',note:'القوة في اتجاه الإزاحة'}),'قوة في اتجاه الإزاحة تبذل شغلا'),'لَاحِظِ الصُّورَةَ: الْقُوَّةُ فِي اتِّجَاهِ الْحَرَكَةِ، فَتَبْذُلُ شُغْلَا.'),
    S(pt(B('2.')+' إذا صنعت القوة زاوية θ مع الإزاحة:'),'وَإِذَا صَنَعَتِ الْقُوَّةُ زَاوِيَةً مَعَ الْإِزَاحَةِ:'),
    LAWB('W = F x cos θ','فَالْقَانُونُ'),
    S(pt('الشغل كمية '+B('قياسية')+'، ووحدته الجول '+M('J')+': الشغل الذي تبذله قوة '+M('1 N')+' عندما تزيح جسما '+M('1 m')+' في اتجاهها.'),'الشُّغْلُ كَمِّيَّةٌ قِيَاسِيَّةٌ، وَوَحْدَتُهُ الْجُولُ: الشُّغْلُ الَّذِي تَبْذُلُهُ قُوَّةُ نِيُوتُنٍ وَاحِدٍ، عِنْدَمَا تُزِيحُ جِسْمًا مِتْرًا وَاحِدًا فِي اتِّجَاهِهَا.'),
    S(pt(B('ملحوظة')+': الشغل ينعدم بانعدام الإزاحة، أو إذا كانت القوة عمودية على الإزاحة '+M('θ = 90°')+'.'),'مُلَاحَظَةٌ: الشُّغْلُ يَنْعَدِمُ إِذَا انْعَدَمَتِ الْإِزَاحَةُ، أَوْ إِذَا كَانَتِ الْقُوَّةُ عَمُودِيَّةً عَلَى الْإِزَاحَهْ.')]},
  ex1:{title:'مثال ١ · صفحة 53',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 53.',steps:()=>[
    S(q('قوة مقدارها '+M('50 N')+' أثرت على جسم فأزاحته '+M('200 m')+'. أوجد الشغل.','المثال · صفحة 53'),''),
    S(gr(['F = 50 N','x = 200 m','θ = 0°'],'الشغل '+M('W')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الشُّغْلْ.'),
    S(st(1,M('W = F x cos θ = 50 × 200 × cos 0°')+'<span class="kDirOn"></span>'),'نُعَوِّضُ، وَجَيْبُ تَمَامِ الصِّفْرِ يُسَاوِي وَاحِدَا.'),
    S(res(M('W = 10000 J')),'النَّتِيجَةُ: عَشَرَةُ آلَافِ جُولْ.')]},
  ex2:{title:'مثال ٢ · صفحة 53',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 53.',steps:()=>[
    S(q('صندوق سحب بقوة '+M('100 N')+' بزاوية '+M('60°')+' مع الأفقي، فتحرك '+M('8 m')+'. ما الشغل؟','المثال · صفحة 53'),''),
    S(gr(['F = 100 N','θ = 60°','x = 8 m'],'الشغل '+M('W')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الشُّغْلْ.'),
    S(fig(fPull({ang:60,Fa:'F = 100 N',x:'x = 8 m'}),'القوة تصنع زاوية 60° مع اتجاه الحركة'),'لَاحِظِ الرَّسْمَ: الْقُوَّةُ مَائِلَةٌ بِزَاوِيَةِ سِتِّينَ دَرَجَةً مَعَ الْأُفُقِيّْ.'),
    S(st(1,M('W = 100 × 8 × cos 60° = 800 × 0.5')+'<span class="kDirOn"></span>'),'جَيْبُ تَمَامِ سِتِّينَ يُسَاوِي نِصْفَا.'),
    S(res(M('W = 400 J')),'النَّتِيجَةُ: أَرْبَعُ مِئَةِ جُولْ.')]},
  ex3:{title:'مثال ٣ · صفحة 53',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 53.',steps:()=>[
    S(q('احسب الشغل المبذول في تحريك جسم كتلته '+M('0.2 kg')+' مسافة '+M('0.8 m')+' بتسارع '+M('2 m/s²')+'.','المثال · صفحة 53'),''),
    S(gr(['m = 0.2 kg','x = 0.8 m','a = 2 m/s²'],'الشغل '+M('W')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الشُّغْلْ.'),
    S(st(1,M('F = m a = 0.2 × 2 = 0.4 N')),'أَوَّلًا الْقُوَّةُ: صِفْرٌ فَاصِلَةٌ أَرْبَعَةُ نِيُوتُنْ.'),
    S(st(2,M('W = F x = 0.4 × 0.8')+'<span class="kDirOn"></span>'),'ثُمَّ الشُّغْلُ: الْقُوَّةُ فِي الْمَسَافَهْ.'),
    S(res(M('W = 0.32 J')),'النَّتِيجَةُ: صِفْرٌ فَاصِلَةٌ اثْنَانِ وَثَلَاثُونَ جُولْ.')]}};
CARDS['1-8']={
  energy:{title:'الطاقة',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى الطَّاقَهْ.',steps:()=>[
    S(pt(B('الطاقة')+': القدرة على إنجاز شغل، ووحدتها الجول '+M('J')+'.'),'الطَّاقَةُ: الْقُدْرَةُ عَلَى إِنْجَازِ شُغْلٍ، وَوَحْدَتُهَا الْجُولْ.'),
    S(pt(B('أنواعها')+': الميكانيكية (حركية ووضع)، والكهربائية، والحرارية، والكيميائية، والنووية، والشمسية.'),'وَمِنْ أَنْوَاعِهَا: الطَّاقَةُ الْمِيكَانِيكِيَّةُ، وَتَنْقَسِمُ إِلَى حَرَكِيَّةٍ وَوَضْعٍ، وَالْكَهْرَبَائِيَّةُ، وَالْحَرَارِيَّةُ، وَالْكِيمْيَائِيَّةُ، وَالنَّوَوِيَّةُ، وَالشَّمْسِيَّهْ.')]},
  ke:{title:'الطاقة الحركية',sayT:'أَوَّلًا: الطَّاقَةُ الْحَرَكِيَّهْ.',steps:()=>[
    S(pt(B('الطاقة الحركية')+': الطاقة التي يحصل عليها الجسم بسبب حركته.'),'الطَّاقَةُ الْحَرَكِيَّةُ: الطَّاقَةُ الَّتِي يَحْصُلُ عَلَيْهَا الْجِسْمُ بِسَبَبِ حَرَكَتِهْ.'),
    LAWB('KE = ½ m v²','وَالْقَانُونُ'),
    S(fig(fTrack({a:'m',c:'v',x:''}),'السيارة المتحركة تمتلك طاقة حركية'),'لَاحِظِ الْمَشْهَدَ: السَّيَّارَةُ الْمُتَحَرِّكَةُ تَمْتَلِكُ طَاقَةً حَرَكِيَّةً بِسَبَبِ سُرْعَتِهَا.')]},
  pe:{title:'طاقة الوضع',sayT:'ثَانِيًا: الطَّاقَةُ الْكَامِنَةُ، أَوْ طَاقَةُ الْوَضْعْ.',steps:()=>[
    S(pt(B('طاقة الوضع')+': الطاقة التي يحصل عليها الجسم بسبب موضعه، أي ارتفاعه عن مستوى الإسناد.'),'طَاقَةُ الْوَضْعِ: الطَّاقَةُ الَّتِي يَحْصُلُ عَلَيْهَا الْجِسْمُ بِسَبَبِ ارْتِفَاعِهِ عَنْ مُسْتَوَى الْإِسْنَادْ.'),
    LAWB('PE = m g h','وَالْقَانُونُ'),
    S(fig(fStand({m:'m',h:'h',pe:'PE = m g h'}),'كتلة على ارتفاع h عن سطح الطاولة'),'لَاحِظِ الصُّورَةَ: الْكُتْلَةُ عَلَى ارْتِفَاعٍ عَنْ سَطْحِ الطَّاوِلَةِ، فَتَمْتَلِكُ طَاقَةَ وَضْعْ.')]},
  ex1:{title:'مثال ١ · صفحة 55',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 55.',steps:()=>[
    S(q('ما الطاقة الحركية لجسم كتلته '+M('45 kg')+' يتحرك بسرعة '+M('13 m/s')+'؟','المثال · صفحة 55'),''),
    S(gr(['m = 45 kg','v = 13 m/s'],'الطاقة الحركية '+M('KE')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الطَّاقَةُ الْحَرَكِيَّهْ.'),
    S(st(1,M('KE = ½ × 45 × 13² = 7605 / 2')+'<span class="kDirOn"></span>'),'نُعَوِّضُ فِي الْقَانُونِ، وَنَقْسِمُ عَلَى اثْنَيْنْ.'),
    S(res(M('KE = 3802.5 J')),'النَّتِيجَةُ: ثَلَاثَةُ آلَافٍ وَثَمَانِ مِئَةٍ وَاثْنَانِ فَاصِلَةٌ خَمْسَةُ جُولْ.')]},
  ex2:{title:'مثال ٢ · صفحة 55',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 55.',steps:()=>[
    S(q('ما كتلة كرة تتحرك بسرعة '+M('3 m/s')+' وطاقتها الحركية '+M('18 J')+'؟','المثال · صفحة 55'),''),
    S(gr(['v = 3 m/s','KE = 18 J'],'الكتلة '+M('m')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْكُتْلَهْ.'),
    S(st(1,M('18 = ½ m × 3²')+' ← '+M('36 = 9 m')),'نُعَوِّضُ، ثُمَّ نَضْرِبُ الطَّرَفَيْنِ فِي اثْنَيْنْ.'),
    S(st(2,M('m = 36 / 9')+'<span class="kDirOn"></span>'),'نَقْسِمُ عَلَى تِسْعَهْ.'),
    S(res(M('m = 4 kg')),'النَّتِيجَةُ: أَرْبَعَةُ كِيلُوجْرَامَاتْ.')]},
  ex3:{title:'مثال ٣ · صفحة 56',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 56.',steps:()=>[
    S(q('ما طاقة الوضع لجسم كتلته '+M('5 kg')+' وضع على حافة ارتفاعها '+M('3 m')+'؟','المثال · صفحة 56'),''),
    S(gr(['m = 5 kg','h = 3 m','g = 9.8 m/s²'],'طاقة الوضع '+M('PE')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: طَاقَةُ الْوَضْعْ.'),
    S(st(1,M('PE = m g h = 5 × 9.8 × 3')+'<span class="kDirOn"></span>'),'نَضْرِبُ الْكُتْلَةَ فِي تَسَارُعِ الْجَاذِبِيَّةِ فِي الِارْتِفَاعْ.'),
    S(res(M('PE = 147 J')),'النَّتِيجَةُ: مِئَةٌ وَسَبْعَةٌ وَأَرْبَعُونَ جُولْ.')]}};
CARDS['1-9']={
  cons:{title:'مبدأ حفظ الطاقة',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى مَبْدَأِ حِفْظِ الطَّاقَهْ.',steps:()=>[
    S(pt('في أي نظام معزول: الطاقة '+B('لا تفنى ولا تستحدث')+' من العدم، ولكن يمكن تحويلها من صورة إلى أخرى.'),'فِي أَيِّ نِظَامٍ مَعْزُولٍ، الطَّاقَةُ لَا تَفْنَى وَلَا تُسْتَحْدَثُ مِنَ الْعَدَمِ، وَلَكِنْ يُمْكِنُ تَحْوِيلُهَا مِنْ صُورَةٍ إِلَى أُخْرَى.'),
    LAWB('ΔKE + ΔPE = 0','وَعِنْدَ غِيَابِ الِاحْتِكَاكِ'),
    S(fig(fFall({}),'في السقوط الحر تتحول طاقة الوضع إلى طاقة حركية، والطاقة الميكانيكية ثابتة'),'لَاحِظِ الصُّورَةَ: فِي الْأَعْلَى طَاقَةُ الْوَضْعِ كَبِيرَةٌ، وَقَبْلَ الِاصْطِدَامِ تَتَحَوَّلُ إِلَى طَاقَةٍ حَرَكِيَّةٍ، وَالْمَجْمُوعُ ثَابِتْ.')]},
  me:{title:'الطاقة الميكانيكية لنظام محفوظ',sayT:'وَمِنْ هَذَا الْمَبْدَأِ نَصِلُ إِلَى حِفْظِ الطَّاقَةِ الْمِيكَانِيكِيَّهْ.',steps:()=>[
    S(pt(M('KEf − KEi + PEf − PEi = 0')),'نَكْتُبُ التَّغَيُّرَ فِي الطَّاقَتَيْنِ، وَمَجْمُوعُهُمَا صِفْرْ.'),
    S(pt(M('KEf + PEf = KEi + PEi')),'فَيَكُونُ مَجْمُوعُ الطَّاقَتَيْنِ فِي النِّهَايَةِ، مُسَاوِيًا لِمَجْمُوعِهِمَا فِي الْبِدَايَهْ.'),
    LAWB('MEf = MEi','أَيْ أَنَّ الطَّاقَةَ الْمِيكَانِيكِيَّةَ مَحْفُوظَةٌ')]},
  ex1:{title:'مثال ١ · صفحة 56',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 56.',steps:()=>[
    S(q('إذا كانت الطاقة الحركية لجسم ساقط '+M('12 J')+' وطاقة الوضع له '+M('35 J')+'، فما الطاقة الميكانيكية؟','المثال · صفحة 56'),''),
    S(gr(['KE = 12 J','PE = 35 J'],'الطاقة الميكانيكية '+M('ME')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الطَّاقَةُ الْمِيكَانِيكِيَّهْ.'),
    S(st(1,M('ME = KE + PE = 12 + 35')+'<span class="kDirOn"></span>'),'نَجْمَعُ الطَّاقَتَيْنْ.'),
    S(res(M('ME = 47 J')),'النَّتِيجَةُ: سَبْعَةٌ وَأَرْبَعُونَ جُولْ.')]},
  ex2:{title:'مثال ٢ · صفحة 57',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 57.',steps:()=>[
    S(q('قط كتلته '+M('1 kg')+' يركض بسرعة '+M('6 m/s')+'. أوجد أعلى حائط يستطيع أن يقفز عليه.','المثال · صفحة 57'),''),
    S(gr(['m = 1 kg','v = 6 m/s','g = 9.8 m/s²'],'الارتفاع '+M('h')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: أَقْصَى ارْتِفَاعْ.'),
    S(st(1,M('KEi = PEf')+' ← '+M('½ m v² = m g h')),'الطَّاقَةُ الْحَرَكِيَّةُ فِي الْبِدَايَةِ، تَتَحَوَّلُ كُلُّهَا إِلَى طَاقَةِ وَضْعٍ فِي الْأَعْلَى.'),
    S(st(2,M('½ × 1 × 6² = 1 × 9.8 × h')+' ← '+M('18 = 9.8 h')),'نُعَوِّضُ: ثَمَانِيَةَ عَشَرَ تُسَاوِي تِسْعَةً فَاصِلَةً ثَمَانِيَةً فِي الِارْتِفَاعْ.'),
    S(st(3,M('h = 18 / 9.8')+'<span class="kDirOn"></span>'),'نَقْسِمُ الطَّرَفَيْنْ.'),
    S(res(M('h ≈ 1.84 m')),'النَّتِيجَةُ: وَاحِدٌ فَاصِلَةٌ أَرْبَعَةٌ وَثَمَانُونَ مِتْرًا تَقْرِيبَا.')]}};
const RU2={
 '1-1':[[/^مقدمة الوحدة وأهدافها$/,'intro'],[/^الهدف العام للوحدة$/,'goals'],[/^ما ستتعلمه في الوحدة$/,null],[/^المسافة والإزاحة$/,'dist',1],[/^السرعة المتوسطة$/,'speed'],[/^التسارع$/,'acc'],[/^أمثلة الحقيبة التدريبية محلولة$/,['exd','ex1']],[/^مثال ١: سرعة سيارة/,null],[/^مثال ٢: تسارع سيارة/,'ex2']],
 '1-2':[[/^علاقة السرعة والتسارع والزمن$/,'eqs'],[/^السرعة المتوسطة$/,null],[/^علاقة الإزاحة/,null],[/^علاقة السرعة والتسارع والإزاحة$/,null],[/^كيف تختار المعادلة/,null],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: المسافة/,'ex2'],[/^مثال ٣: تسارع سيارة/,'ex3'],[/^مثال ٤: السرعة بعد/,'ex4'],[/^معادلات الحركة بتسارع ثابت$/,null]],
 '1-3':[[/^القوة$/,'force'],[/^قانون نيوتن الأول/,'law1'],[/^قانون نيوتن الثاني$/,'law2'],[/^الوزن$/,'weight'],[/^قانون نيوتن الثالث$/,'law3'],[/^أمثلة على قانون نيوتن الثالث$/,null],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: تسارع سيارة/,'ex2'],[/^مثال ٣: سرعة صندوق/,'ex3'],[/^مثال ٤: صندوق يُسحب/,'ex4'],[/^مثال ١: وزن جسم/,'exw'],[/^ملخص قوانين نيوتن$/,null]],
 '1-5':[[/^قوة الاحتكاك$/,'fr'],[/^أنواع قوى الاحتكاك$/,null],[/^قانون قوة الاحتكاك$/,null],[/^هل يتحرك الجسم/,null],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: إيجاد معامل/,'ex2'],[/^مثال ٣: هل يتحرك/,'ex3']],
 '1-7':[[/^تعريف الشغل$/,'work'],[/^حالات مهمة$/,null],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: شغل قوة/,'ex2'],[/^مثال ٣: الشغل بمعلومية/,'ex3']],
 '1-8':[[/^الطاقة$/,'energy'],[/^أولا: الطاقة الحركية$/,'ke'],[/^ثانيا: الطاقة الكامنة/,'pe'],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: كتلة كرة/,'ex2'],[/^مثال ٣: طاقة الوضع/,'ex3'],[/^الطاقة الحركية وطاقة الوضع$/,null]],
 '1-9':[[/^مبدأ قانون حفظ الطاقة$/,'cons'],[/^الطاقة الميكانيكية لنظام محفوظ$/,'me'],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: أعلى حائط/,'ex2']]};
const LIFE2={'1-1':'وَبَعْدَ أَنْ فَهِمْنَا الْإِزَاحَةَ وَالسُّرْعَةَ وَالتَّسَارُعَ، لِنَرَ أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.','1-2':'وَبَعْدَ أَنْ تَدَرَّبْنَا عَلَى مُعَادَلَاتِ الْحَرَكَةِ، لِنَرَ أَيْنَ نَسْتَخْدِمُهَا فِي حَيَاتِنَا.','1-3':'وَبَعْدَ أَنْ فَهِمْنَا قَوَانِينَ نِيُوتُنَ، لِنَرَ أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.','1-5':'وَبَعْدَ أَنْ فَهِمْنَا الِاحْتِكَاكَ، لِنَرَ أَيْنَ نَجِدُهُ فِي حَيَاتِنَا.','1-7':'وَبَعْدَ أَنْ فَهِمْنَا الشُّغْلَ، لِنَرَ أَيْنَ نَجِدُهُ فِي حَيَاتِنَا.','1-8':'وَبَعْدَ أَنْ فَهِمْنَا الطَّاقَةَ الْحَرَكِيَّةَ وَطَاقَةَ الْوَضْعِ، لِنَرَ أَيْنَ نَجِدُهُمَا فِي حَيَاتِنَا.','1-9':'وَبَعْدَ أَنْ فَهِمْنَا حِفْظَ الطَّاقَةِ، لِنَرَ أَيْنَ نَجِدُهُ فِي حَيَاتِنَا.'};
function applyU2(out,K2){defs();const T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');const seen={};
  const R=(RU2[K2]||[]).map(([re,id,once])=>[re,sl=>{if(once){if(seen[id])return null;seen[id]=1}if(id===null)return null;return Array.isArray(id)?id.map(i=>card(K2,i)):card(K2,id)}]);
  R.push([/^تمرين \d+ ·/,()=>null],[/^رسم توضيحي/,()=>null],[/^تطبيقات من الحياة$/,sl=>{sl.sayT=LIFE2[K2];return typeof appCards==='function'?appCards(sl):sl}]);
  if(K2==='1-1')R.push([/^مقدمة الوحدة وأهدافها$/,()=>null]);
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}
/* ===== مشاهد الوحدة الثالثة (الفيزياء الحرارية) بأجهزة مجسمة واقعية — طلب المدرب 5 نوفمبر 07:33 ===== */
function hDefs(){return `<defs>
<linearGradient id="h-gl" x1="0" x2="1"><stop offset="0" stop-color="#bae6fd" stop-opacity=".75"/><stop offset=".12" stop-color="#e0f2fe" stop-opacity=".25"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".06"/><stop offset=".88" stop-color="#e0f2fe" stop-opacity=".25"/><stop offset="1" stop-color="#7dd3fc" stop-opacity=".8"/></linearGradient>
<linearGradient id="h-cold" x1="0" x2="1"><stop offset="0" stop-color="#1e40af"/><stop offset=".35" stop-color="#3b82f6"/><stop offset=".6" stop-color="#60a5fa"/><stop offset="1" stop-color="#1e3a8a"/></linearGradient>
<linearGradient id="h-hot" x1="0" x2="1"><stop offset="0" stop-color="#991b1b"/><stop offset=".35" stop-color="#ef4444"/><stop offset=".6" stop-color="#fb923c"/><stop offset="1" stop-color="#7f1d1d"/></linearGradient>
<linearGradient id="h-mid" x1="0" x2="1"><stop offset="0" stop-color="#5b21b6"/><stop offset=".45" stop-color="#a78bfa"/><stop offset="1" stop-color="#4c1d95"/></linearGradient>
<linearGradient id="h-tube" x1="0" x2="1"><stop offset="0" stop-color="#94a3b8"/><stop offset=".3" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1f5f9"/><stop offset="1" stop-color="#64748b"/></linearGradient>
<linearGradient id="h-chr" x1="0" x2="1"><stop offset="0" stop-color="#334155"/><stop offset=".25" stop-color="#cbd5e1"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".7" stop-color="#94a3b8"/><stop offset="1" stop-color="#1e293b"/></linearGradient>
<linearGradient id="h-chrV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cbd5e1"/><stop offset="1" stop-color="#334155"/></linearGradient>
<linearGradient id="h-dark" x1="0" x2="1"><stop offset="0" stop-color="#0f172a"/><stop offset=".4" stop-color="#475569"/><stop offset="1" stop-color="#0b1120"/></linearGradient>
<linearGradient id="h-darkV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#0f172a"/></linearGradient>
<linearGradient id="h-jk" x1="0" x2="1"><stop offset="0" stop-color="#94a3b8"/><stop offset=".3" stop-color="#f8fafc"/><stop offset=".6" stop-color="#e2e8f0"/><stop offset="1" stop-color="#64748b"/></linearGradient>
<radialGradient id="h-bR" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fecaca"/><stop offset=".45" stop-color="#ef4444"/><stop offset="1" stop-color="#7f1d1d"/></radialGradient>
<radialGradient id="h-bB" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#bfdbfe"/><stop offset=".45" stop-color="#3b82f6"/><stop offset="1" stop-color="#1e3a8a"/></radialGradient>
<radialGradient id="h-coil" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fde047"/><stop offset=".5" stop-color="#f97316"/><stop offset="1" stop-color="#7c2d12" stop-opacity="0"/></radialGradient>
<radialGradient id="h-ice" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#e0f2fe"/><stop offset="1" stop-color="#7dd3fc"/></radialGradient>
<radialGradient id="h-mc" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#dbeafe"/><stop offset=".5" stop-color="#2563eb"/><stop offset="1" stop-color="#172554"/></radialGradient>
<radialGradient id="h-mh" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fee2e2"/><stop offset=".5" stop-color="#dc2626"/><stop offset="1" stop-color="#450a0a"/></radialGradient>
<linearGradient id="h-fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1d4ed8" stop-opacity=".9"/><stop offset=".45" stop-color="#60a5fa" stop-opacity=".8"/><stop offset="1" stop-color="#bfdbfe" stop-opacity=".2"/></linearGradient>
<linearGradient id="h-fi" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e0f2fe"/><stop offset=".6" stop-color="#7dd3fc"/><stop offset="1" stop-color="#fde047"/></linearGradient>
<radialGradient id="h-sf" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".6" stop-color="#fff" stop-opacity=".15"/><stop offset="1" stop-color="#0f172a" stop-opacity=".25"/></radialGradient><filter id="h-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
<filter id="h-soft"><feGaussianBlur stdDeviation="1.2"/></filter></defs>`}
/* كأس زجاجية أسطوانية مجسمة بسائل وتدريج */
/* سطح سائل مجسم: بيضاوي بتدرج وحافة خلفية داكنة وأمامية لامعة وانعكاس */
function hSurf(cx,ly,rx,ry,fill){return `<ellipse cx="${cx}" cy="${ly}" rx="${rx}" ry="${ry}" fill="${fill}"/><ellipse cx="${cx}" cy="${ly}" rx="${rx}" ry="${ry}" fill="url(#h-sf)"/><path d="M${cx-rx},${ly} A${rx} ${ry} 0 0 1 ${cx+rx},${ly}" fill="none" stroke="#0f172a" stroke-opacity=".35" stroke-width="2"/><path d="M${cx-rx},${ly} A${rx} ${ry} 0 0 0 ${cx+rx},${ly}" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="2"/><ellipse cx="${cx-rx*.25}" cy="${ly-ry*.2}" rx="${rx*.35}" ry="${ry*.28}" fill="#fff" opacity=".45"/><ellipse cx="${cx+rx*.3}" cy="${ly+ry*.25}" rx="${rx*.18}" ry="${ry*.15}" fill="#fff" opacity=".3"/>`}
function bLiq(cx,yb,w,ly){const x=cx-w/2+3,rx=w/2-3,ry=w*.15;return `M${x},${ly} L${x},${yb} A${rx} ${ry} 0 0 0 ${x+2*rx},${yb} L${x+2*rx},${ly} A${rx} ${ry} 0 0 1 ${x},${ly} Z`}
function gBeaker(cx,yb,w,h,lev,fill,extra,top){const x=cx-w/2,rx=w/2,ry=w*.15,ly=yb-h*lev;let g=gSh(cx+4,yb+ry+2,w*.62);
  g+=`<ellipse cx="${cx}" cy="${yb-h}" rx="${rx}" ry="${ry}" fill="#e0f2fe" opacity=".35"/>`;
  if(lev>0)g+=`<path d="${bLiq(cx,yb,w,ly)}" fill="${fill}" opacity=".92"/>`+hSurf(cx,ly,rx-3,ry,fill);
  g+=(extra||'');
  g+=`<path d="M${x},${yb-h} L${x},${yb} A${rx} ${ry} 0 0 0 ${x+w},${yb} L${x+w},${yb-h}" fill="url(#h-gl)" stroke="#94a3b8" stroke-width="1.6"/><path d="M${x},${yb} A${rx} ${ry} 0 0 0 ${x+w},${yb}" fill="none" stroke="#64748b" stroke-width="3" opacity=".6"/>`;
  g+=`<path d="M${x},${yb-h} A${rx} ${ry} 0 0 0 ${x+w},${yb-h}" fill="none" stroke="#e2e8f0" stroke-width="3"/><path d="M${x},${yb-h} A${rx} ${ry} 0 0 1 ${x+w},${yb-h}" fill="none" stroke="#cbd5e1" stroke-width="2"/><path d="M${x-2},${yb-h} q-8,-2 -10,-8" fill="none" stroke="#cbd5e1" stroke-width="2.5"/>`;
  for(let i=1;i<5;i++){const yy=yb-h*i/5;g+=`<path d="M${cx+w*.12},${f1(yy+ry*.9)} L${cx+w*.3},${f1(yy+ry*.7)}" stroke="#334155" stroke-width="1.3" opacity=".7"/><text x="${cx+w*.33}" y="${f1(yy+ry*.7+3)}" font-size="8" font-weight="800" fill="#334155" opacity=".75" direction="ltr">${i*50}</text>`}
  return g+`<rect x="${x+6}" y="${yb-h+ry+4}" width="6" height="${h-ry*2-8}" rx="3" fill="#fff" opacity=".7"/><rect x="${x+16}" y="${yb-h+ry+10}" width="2.5" height="${h-ry*2-24}" rx="1.2" fill="#fff" opacity=".5"/><rect x="${x+w-14}" y="${yb-h+ry+6}" width="4" height="${h-ry*2-14}" rx="2" fill="#fff" opacity=".35"/>`+(top||'')}
/* ترمومتر زجاجي مجسم بعمود يتحرك من p0 إلى p1 */
function gTh(x,yb,h,p0,p1,D,t0,t1,col){const blue=col==='#2563eb',lq=blue?'#2563eb':'#dc2626',top=yb-h,ch0=(h-16)*p0,ch1=(h-16)*p1;
  let g=`<rect x="${x-8}" y="${top}" width="16" height="${h+2}" rx="8" fill="url(#h-tube)" stroke="#94a3b8" stroke-width="1.2"/><circle cx="${x}" cy="${yb+6}" r="12" fill="url(#${blue?'h-bB':'h-bR'})" stroke="#475569" stroke-width="1"/><circle cx="${x-4}" cy="${yb+1}" r="3.5" fill="#fff" opacity=".75"/>`;
  g+=`<rect x="${x-2.2}" width="4.4" rx="2" fill="${lq}"><animate attributeName="y" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t1,D])}" values="${yb-ch0};${yb-ch0};${yb-ch1};${yb-ch1}"/><animate attributeName="height" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,t0,t1,D])}" values="${ch0+6};${ch0+6};${ch1+6};${ch1+6}"/></rect>`;
  for(let i=0;i<=10;i++){const yy=f1(yb-8-(h-22)*i/10);g+=`<line x1="${x+3}" y1="${yy}" x2="${x+(i%5?6.5:8)}" y2="${yy}" stroke="#1e293b" stroke-width="${i%5?.8:1.3}"/>`}
  return g+`<rect x="${x-6}" y="${top+5}" width="2.6" height="${h-12}" rx="1.3" fill="#fff" opacity=".9"/><rect x="${x-5}" y="${top-6}" width="10" height="8" rx="3" fill="url(#h-chr)"/>`}
/* سخان كهربائي مجسم بصفيحة متوهجة ومقبض */
function gPlate(cx,yb,w){const x=cx-w/2,d=16;return gSh(cx+6,yb+4,w*.62)+
  `<polygon points="${x},${yb-30} ${x+w},${yb-30} ${x+w+d},${yb-30-d*.7} ${x+d},${yb-30-d*.7}" fill="#475569"/><polygon points="${x+w},${yb-30} ${x+w+d},${yb-30-d*.7} ${x+w+d},${yb-d*.7} ${x+w},${yb}" fill="#0f172a"/><rect x="${x}" y="${yb-30}" width="${w}" height="30" rx="4" fill="url(#h-darkV)"/><rect x="${x+4}" y="${yb-28}" width="${w-8}" height="2" fill="#fff" opacity=".25"/>`+
  `<ellipse cx="${cx+d/2}" cy="${yb-30-d*.35}" rx="${w/2-12}" ry="7" fill="#111827" stroke="#334155"/><ellipse cx="${cx+d/2}" cy="${yb-30-d*.35}" rx="${w/2-20}" ry="5" fill="url(#h-coil)"><animate attributeName="opacity" dur="1.8s" repeatCount="indefinite" values=".6;1;.6"/></ellipse>`+
  `<circle cx="${x+w-20}" cy="${yb-15}" r="8" fill="url(#h-chr)" stroke="#1e293b"/><line x1="${x+w-20}" y1="${yb-15}" x2="${x+w-15}" y2="${yb-20}" stroke="#0f172a" stroke-width="2"/><circle cx="${x+16}" cy="${yb-15}" r="3.5" fill="#ef4444"><animate attributeName="opacity" dur="1.2s" repeatCount="indefinite" values="1;.35;1"/></circle>`}
/* لهب موقد بنزن واقعي: مخروط أزرق خارجي وداخلي */
const gFlame=(cx,yb,s)=>`<g transform="translate(${cx} ${yb}) scale(${s})"><g><animateTransform attributeName="transform" type="scale" dur=".6s" repeatCount="indefinite" values="1 1;1.05 .92;.96 1.06;1 1"/><path d="M0,0 C-13,-8 -12,-30 0,-50 C12,-30 13,-8 0,0 Z" fill="url(#h-fl)"/><path d="M0,-2 C-6,-8 -6,-18 0,-28 C6,-18 6,-8 0,-2 Z" fill="url(#h-fi)"/></g><ellipse cx="0" cy="-20" rx="14" ry="26" fill="#93c5fd" opacity=".25" filter="url(#h-soft)"/></g>`;
/* موقد بنزن مجسم */
const gBurner=(cx,yb)=>gSh(cx,yb+3,38)+`<ellipse cx="${cx}" cy="${yb-4}" rx="32" ry="9" fill="#1e293b"/><path d="M${cx-32},${yb-10} L${cx-32},${yb-4} A32 9 0 0 0 ${cx+32},${yb-4} L${cx+32},${yb-10} Z" fill="url(#h-dark)"/><ellipse cx="${cx}" cy="${yb-10}" rx="32" ry="9" fill="#334155"/>`+
  `<rect x="${cx-8}" y="${yb-62}" width="16" height="54" fill="url(#h-chr)"/><rect x="${cx-10}" y="${yb-30}" width="20" height="10" rx="2" fill="url(#h-chr)" stroke="#475569" stroke-width=".6"/><rect x="${cx-3}" y="${yb-28}" width="6" height="5" rx="1" fill="#0f172a"/><ellipse cx="${cx}" cy="${yb-62}" rx="8" ry="2.5" fill="#1e293b"/><path d="M${cx+30},${yb-8} q24,2 30,-4" fill="none" stroke="#ea580c" stroke-width="5" stroke-linecap="round"/>`+gFlame(cx,yb-62,1);
/* جزيئات كروية لامعة تهتز: سعة a وزمن دورة p */
function gMols(cx,cy,w,h,n,a,p,c,seed){const gid=c==='#1e3a8a'?'h-mc':'h-mh';let g='';for(let i=0;i<n;i++){const r=(k)=>{const v=Math.sin((i+1)*(seed+k)*12.9898)*43758.5453;return v-Math.floor(v)};const x=cx-w/2+10+r(1)*(w-20),y=cy-h/2+10+r(2)*(h-20);
  const pts=[0,1,2,3].map(k=>`${f1((r(k+3)-.5)*2*a)} ${f1((r(k+7)-.5)*2*a)}`);g+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" fill="url(#${gid})"><animateTransform attributeName="transform" type="translate" dur="${p}s" repeatCount="indefinite" values="0 0;${pts.join(';')};0 0"/></circle>`}return g}
/* قطعة فلز مجسمة */
function gMetal(x,yb,w,h,tint,op){const d=22,e=d*.7;return gSh(x+w/2+8,yb+2,w*.6)+`<defs><linearGradient id="h-mt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/></linearGradient><linearGradient id="h-ms" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#64748b"/><stop offset="1" stop-color="#334155"/></linearGradient></defs>`+
  `<polygon points="${x},${yb-h} ${x+w},${yb-h} ${x+w+d},${yb-h-e} ${x+d},${yb-h-e}" fill="url(#h-mt)" stroke="#64748b" stroke-width="1.2" stroke-linejoin="round"/><polygon points="${x+w},${yb-h} ${x+w+d},${yb-h-e} ${x+w+d},${yb-e} ${x+w},${yb}" fill="url(#h-ms)" stroke="#334155" stroke-width="1.2" stroke-linejoin="round"/><rect x="${x}" y="${yb-h}" width="${w}" height="${h}" fill="url(#h-chrV)" stroke="#475569" stroke-width="1.2"/>`+(tint?`<rect x="${x}" y="${yb-h}" width="${w}" height="${h}" fill="${tint}" opacity="${op||.75}"/><polygon points="${x},${yb-h} ${x+w},${yb-h} ${x+w+d},${yb-h-e} ${x+d},${yb-h-e}" fill="${tint}" opacity="${(op||.75)*.45}"/><polygon points="${x+w},${yb-h} ${x+w+d},${yb-h-e} ${x+w+d},${yb-e} ${x+w},${yb}" fill="${tint}" opacity="${(op||.75)*.6}"/>`:'')+`<line x1="${x+4}" y1="${yb-h+3}" x2="${x+w-4}" y2="${yb-h+3}" stroke="#fff" stroke-width="2" opacity=".7"/><line x1="${x+d*.3}" y1="${yb-h-e*.3}" x2="${x+w+d*.6}" y2="${yb-h-e*.3}" stroke="#fff" stroke-width="1.5" opacity=".5"/>`}

/* 1) الطاقة الداخلية: جزيئات الماء البارد بطيئة والساخن سريعة */
function hMol(){const W=640,H=330,FY=292,D=8;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(170,FY,10,630);const yb=FY-30;
  b+=gBeaker(200,yb,150,160,.78,'url(#h-cold)',gMols(200,yb-62,124,100,12,3,2.4,'#1e3a8a',1))+gTh(150,yb-22,140,.25,.25,D,0,1,'#2563eb');
  b+=gBeaker(440,yb,150,160,.78,'url(#h-hot)',gMols(440,yb-62,124,100,12,9,.45,'#7f1d1d',2))+gTh(390,yb-22,140,.8,.8,D,0,1);
  b+=`<g opacity=".7">${[420,440,460].map((x,i)=>`<path d="M${x},${yb-176} q-8,-14 0,-26 q8,-12 0,-24" fill="none" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" filter="url(#h-soft)"><animate attributeName="opacity" dur="2s" begin="${i*.6}s" repeatCount="indefinite" values="0;1;0"/></path>`).join('')}</g>`;
  b+=zT(200,66,'بارد: حركة بطيئة','#1d4ed8',150)+zT(440,66,'ساخن: حركة سريعة','#b91c1c',150);
  b+=scCap(D,W,'الجسم الساخن طاقته الداخلية أكبر من البارد','#7c3aed',0,D);
  return svg(W,H,b,'kScene')}

/* 2) الحرارة تنتقل من الساخن إلى البارد حتى الاتزان */
function hFlow(){const W=640,H=280,FY=240,D=9;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(150,FY,10,630);const yb=FY-24,bh=90,bw=150;
  b+=`<ellipse cx="225" cy="${yb-bh/2}" rx="95" ry="60" fill="#f97316" opacity=".35" filter="url(#h-glow)"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,5.5,D])}" values=".45;.45;0;0"/></ellipse>`;
  const ov=(x)=>`<rect x="${x}" y="${yb-bh}" width="${bw}" height="${bh}" fill="url(#h-mid)" opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,5.5,D])}" values="0;0;.7;.7"/></rect>`;
  b+=gMetal(300,yb,bw,bh,'url(#h-cold)',.7)+ov(300)+gMetal(150,yb,bw,bh,'url(#h-hot)',.75)+ov(150);
  b+=zS(D,.6,`<g>${vArr(190,yb-bh-40,410,yb-bh-40,'#ea580c',10)}<circle r="6" fill="#fde047"><animateMotion dur="1.2s" repeatCount="indefinite" path="M190,${yb-bh-40} L400,${yb-bh-40}"/></circle></g>`+zT(450,yb-bh-40,'Q','#b45309',44));
  b+=scShow(D,0,5.5,`<g>${zT(225,yb-bh/2,'80 °C','#b91c1c',80)}${zT(375,yb-bh/2,'20 °C','#1d4ed8',80)}</g>`,true)+zS(D,5.5,zT(225,yb-bh/2,'50 °C','#7c3aed',80)+zT(375,yb-bh/2,'50 °C','#7c3aed',80));
  b+=scCap(D,W,'الحرارة تنتقل تلقائيا من الساخن إلى البارد','#b45309',0,5.5)+scCap(D,W,'حتى تتساوى درجتا الحرارة: الاتزان الحراري','#7c3aed',5.5,D);
  return svg(W,H,b,'kScene')}

/* 3) نقطتا تجمد الماء وغليانه على المقاييس الثلاثة */
function hTherm3(){const W=640,H=340,FY=300,D=8;let b=gDefs()+hDefs()+stage(W,H,FY);const yb=FY-40,h=190,yF=yb-8-(h-16)*.25,yB=yb-8-(h-16)*.85;
  b+=`<line x1="40" y1="${f1(yB)}" x2="600" y2="${f1(yB)}" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="6 5"/><line x1="40" y1="${f1(yF)}" x2="600" y2="${f1(yF)}" stroke="#2563eb" stroke-width="1.6" stroke-dasharray="6 5"/>`;
  b+=zT(70,yB-18,'غليان الماء','#b91c1c',100)+zT(70,yF-18,'تجمد الماء','#1d4ed8',100);
  [[230,'المئوي','100 °C','0 °C'],[380,'الكلفن','373 K','273 K'],[530,'الفهرنهايت','212 °F','32 °F']].forEach(([x,n,hb,hf],i)=>{
    b+=gSh(x,yb+22,30)+gTh(x,yb,h,.12,.85,D,.8+i*.2,5+i*.2)+zT(x,yb+46,n,'#334155',96)+zS(D,1.5+i*.2,zT(x+50,yF,hf,'#1d4ed8',70))+zS(D,4.6+i*.2,zT(x+50,yB,hb,'#b91c1c',76))});
  b+=scCap(D,W,'تجمد الماء وغليانه على المقاييس الثلاثة','#334155',0,D);
  return svg(W,H+20,b,'kScene')}

/* 4) تسخين الماء: Q = m c ΔT */
function hHeat(o){o=o||{};const W=640,H=330,FY=300,D=9;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(190,FY,10,630);const yb=FY-20,cx=230,by=yb-38;
  b+=gPlate(cx-8,yb,200);
  const hot=`<path d="${bLiq(cx,by,150,by-140*.72)}" fill="url(#h-hot)" opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,6,D])}" values="0;0;.8;.8"/></path>`;
  b+=gBeaker(cx,by,150,140,.72,'url(#h-cold)',hot,gTh(cx-42,by-26,150,.2,.55,D,1,6));
  b+=zS(D,.6,vArr(cx-150,by-40,cx-82,by-40,'#ea580c',8)+zT(cx-120,by-70,'Q','#b45309',40));
  b+=zT(cx-120,by-120,o.m||'m','#334155');
  b+=scShow(D,0,6,`<g>${zT(480,120,o.Ti||'Ti','#1d4ed8',110)}</g>`,true)+zS(D,6,zT(480,120,o.Tf||'Tf','#b91c1c',110)+zT(480,170,o.dT||'ΔT = Tf − Ti','#7c3aed',150));
  b+=zS(D,6.8,zT(480,220,o.Q||'Q = m c ΔT','#b45309',150));
  b+=scCap(D,W,'نعطي الماء حرارة Q فترتفع درجة حرارته','#b45309',0,6)+scCap(D,W,'كمية الحرارة تعتمد على m و c و ΔT','#7c3aed',6,D);
  return svg(W,H,b,'kScene')}

/* 5) انصهار الجليد: درجة الحرارة ثابتة عند 0 °C */
function hMelt(o){o=o||{};const W=640,H=330,FY=300,D=9;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(190,FY,10,630);const yb=FY-20,cx=230,by=yb-38;
  b+=gPlate(cx-8,yb,200);
  const water=`<g><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,7,D])}" values=".25;.25;.92;.92"/><path d="${bLiq(cx,by,150,by-48)}" fill="url(#h-cold)"/>${hSurf(cx,by-48,72,22.5,"url(#h-cold)")}</g>`;
  const ice=[[-36,-34],[8,-38],[-12,-66],[30,-64]].map(([dx,dy],i)=>`<g transform="translate(${cx+dx} ${by+dy})"><g><animateTransform attributeName="transform" type="scale" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,7,D])}" values="1;1;.15;.15"/><g transform="rotate(${i*13-8})"><polygon points="-17,-12 9,-12 17,-18 -9,-18" fill="#f8fafc" opacity=".95"/><polygon points="9,-12 17,-18 17,8 9,14" fill="#93c5fd" opacity=".9"/><rect x="-17" y="-12" width="26" height="26" rx="3" fill="url(#h-ice)" stroke="#7dd3fc" stroke-width="1"/><rect x="-14" y="-9" width="6" height="16" rx="3" fill="#fff" opacity=".8"/></g></g></g>`).join('');
  b+=gBeaker(cx,by,150,140,0,'',water+ice,gTh(cx-42,by-26,150,.3,.3,D,0,1,'#2563eb'));
  b+=zS(D,.6,vArr(cx-150,by-40,cx-82,by-40,'#ea580c',8)+zT(cx-120,by-70,'Q','#b45309',40));
  b+=zT(480,110,o.T||'T = 0 °C ثابتة','#1d4ed8',150)+zS(D,3,zT(480,160,'صلب ← سائل','#334155',120))+zS(D,5,zT(480,210,o.Q||'Q = m H','#b45309',120));
  b+=scCap(D,W,'الحرارة تصهر الجليد ودرجة حرارته ثابتة','#1d4ed8',0,D);
  return svg(W,H,b,'kScene')}

/* 6) المسعر الحراري: قطعة فلز ساخنة في ماء بارد حتى الاتزان (مقطع يظهر الداخل) */
function hCal(o){o=o||{};const W=640,H=340,FY=310,D=10;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(200,FY,10,630);const yb=FY-28,cx=240,w=190,h=160,x=cx-w/2,rx=w/2,ry=w*.11;
  const ix=cx-62,iw=124,ib=yb-14,ih=h-30,wy=ib-ih*.75,ly=yb-h-10,tx=cx+36,sx2=cx-50;
  b+=gSh(cx+6,yb+ry+2,w*.6);
  b+=`<path d="M${x},${yb-h} L${x},${yb} A${rx} ${ry} 0 0 0 ${x+w},${yb} L${x+w},${yb-h}" fill="url(#h-jk)" opacity=".55" stroke="#64748b" stroke-width="1.4"/>`;
  b+=`<path d="${bLiq(cx,ib,iw,wy)}" fill="url(#h-cold)" opacity=".92"/><path d="${bLiq(cx,ib,iw,wy)}" fill="url(#h-mid)" opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,3,7.5,D])}" values="0;0;.75;.75"/></path>`+hSurf(cx,wy,iw/2-3,iw*.15,'url(#h-cold)');
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,1,2.6,D])}" values="0 -170;0 -170;0 0;0 0" calcMode="spline" keySplines="0 0 1 1;.5 0 1 1;0 0 1 1"/>${gMetal(cx-34,ib-12,52,38,'url(#h-hot)',.8).replace(/<ellipse[^>]*>/,'')}</g>`;
  /* المقلب والترمومتر يمران من ثقبين في الغطاء ويغمران في الماء */
  const ST=`<rect x="${sx2-2.5}" y="${ly-48}" width="5" height="${ib-6-(ly-48)}" rx="2.5" fill="url(#h-chr)"/><circle cx="${sx2}" cy="${ly-50}" r="6" fill="url(#h-chr)"/>`;
  const TH=gTh(tx,ib-24,ib-24-(ly-46),.2,.32,D,3,7.5);
  b+=ST+`<ellipse cx="${sx2}" cy="${ib-8}" rx="10" ry="3" fill="none" stroke="#cbd5e1" stroke-width="3"/>`+TH;
  b+=`<rect x="${sx2-6}" y="${wy}" width="12" height="${ib-6-wy}" fill="url(#h-cold)" opacity=".35"/><rect x="${tx-13}" y="${wy}" width="26" height="${ib+18-wy}" fill="url(#h-cold)" opacity=".3"/><ellipse cx="${tx}" cy="${wy}" rx="11" ry="3" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.2"/><ellipse cx="${sx2}" cy="${wy}" rx="8" ry="2.4" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.2"/>`;
  b+=`<path d="M${ix},${ib-ih} L${ix},${ib} A${iw/2} ${iw*.15} 0 0 0 ${ix+iw},${ib} L${ix+iw},${ib-ih}" fill="url(#h-gl)" stroke="#94a3b8" stroke-width="1.2"/>`;
  b+=`<path d="M${x},${yb-h} A${rx} ${ry} 0 0 0 ${x+w},${yb-h}" fill="none" stroke="#475569" stroke-width="3"/><rect x="${x+8}" y="${yb-h+ry+6}" width="7" height="${h-ry*2-12}" rx="3.5" fill="#fff" opacity=".55"/>`;
  b+=`<ellipse cx="${cx}" cy="${yb-h-8}" rx="${rx+6}" ry="${ry+2}" fill="#1e293b"/><path d="M${x-6},${yb-h-8} L${x-6},${yb-h-2} A${rx+6} ${ry+2} 0 0 0 ${x+w+6},${yb-h-2} L${x+w+6},${yb-h-8} Z" fill="#0f172a"/><ellipse cx="${cx}" cy="${ly}" rx="${rx+2}" ry="${ry}" fill="#334155"/><ellipse cx="${cx-30}" cy="${ly-4}" rx="${rx*.5}" ry="${ry*.3}" fill="#fff" opacity=".08"/>`;
  b+=`<ellipse cx="${tx}" cy="${ly}" rx="10" ry="3.4" fill="#020617"/><ellipse cx="${sx2}" cy="${ly}" rx="7" ry="2.6" fill="#020617"/>`;
  b+=`<defs><clipPath id="h-cu"><rect x="0" y="0" width="${W}" height="${ly}"/></clipPath></defs><g clip-path="url(#h-cu)">${ST}${TH}</g>`;
  b+=zS(D,3,`<g>${[0,1,2].map(i=>`<path d="M${cx-38},${ib-30+i*9} q-12,-6 -24,0" fill="none" stroke="#ea580c" stroke-width="2.5"><animate attributeName="opacity" dur="1s" begin="${i*.3}s" repeatCount="indefinite" values="0;1;0"/></path>`).join('')}</g>`);
  b+=zT(490,80,o.T1||'T1: الفلز الساخن','#b91c1c',170)+zT(490,130,o.T2||'T2: الماء البارد','#1d4ed8',170)+zS(D,7.5,zT(490,180,o.Tf||'Tf: درجة الاتزان','#7c3aed',170))+zS(D,8,zT(490,230,'Q1 + Q2 = 0','#b45309',130));
  b+=zT(sx2-44,ly-34,'مقلب','#475569',56)+zT(tx+54,ly-34,'ترمومتر','#475569',74);
  b+=scCap(D,W,'الفلز الساخن يفقد حرارة والماء البارد يكتسبها','#b45309',0,7.5)+scCap(D,W,'حتى يصلا إلى درجة واحدة Tf','#7c3aed',7.5,D);
  return svg(W,H,b,'kScene')}
/* 7) طرق انتقال الحرارة: التوصيل والحمل والإشعاع */
function hCond(){const W=640,H=270,FY=240,D=8;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(150,FY,10,630);const yb=FY-22,ry=yb-104;
  b+=`<defs><linearGradient id="h-rod" x1="0" x2="1"><stop offset="0" stop-color="#fde047"/><stop offset="0" stop-color="#ef4444"><animate attributeName="offset" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,.5,6,D])}" values="0;0;.6;.6"/></stop><stop offset="0" stop-color="#f97316" stop-opacity=".0"><animate attributeName="offset" dur="${D}s" repeatCount="indefinite" keyTimes="${scK(D,[0,.5,6,D])}" values="0;0;1;1"/></stop><stop offset="1" stop-color="#f97316" stop-opacity="0"/></linearGradient></defs>`;
  b+=gBurner(120,yb)+gSh(470,yb+2,30)+`<rect x="440" y="${yb-10}" width="60" height="10" rx="4" fill="url(#h-darkV)"/><rect x="466" y="${ry+6}" width="8" height="${yb-ry-16}" fill="url(#h-chr)"/><rect x="458" y="${ry+2}" width="24" height="12" rx="3" fill="#1e293b"/>`;
  b+=`<rect x="80" y="${ry-9}" width="400" height="18" rx="9" fill="url(#h-chrV)" stroke="#475569" stroke-width=".8"/><rect x="80" y="${ry-9}" width="400" height="18" rx="9" fill="url(#h-rod)" opacity=".85"/><rect x="88" y="${ry-6}" width="384" height="4" rx="2" fill="#fff" opacity=".6"/>`;
  for(let i=0;i<9;i++){const x=136+i*38,a=Math.max(1,7-i*.7);b+=`<circle cx="${x}" cy="${ry+30}" r="7" fill="url(#h-mh)"><animateTransform attributeName="transform" type="translate" dur="${.25+i*.04}s" repeatCount="indefinite" values="0 0;${a} 0;${-a} 0;0 0"/></circle>`}
  b+=zT(190,ry+62,'اهتزاز قوي','#b91c1c',100)+zT(420,ry+62,'اهتزاز ضعيف','#475569',110);
  b+=scCap(D,W,'التوصيل: تنتقل الحرارة خلال المادة دون انتقالها','#b45309',0,D);
  return svg(W,H,b,'kScene')}
function hConv(){const W=640,H=340,FY=310,D=6;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(210,FY,10,630);const yb=FY-22,cx=250,by=yb-84;
  b+=gBurner(cx,yb)+[[-70,1],[70,1],[0,.5]].map(([dx,o])=>`<line x1="${cx+dx*.75}" y1="${by+4}" x2="${cx+dx}" y2="${yb-2}" stroke="#334155" stroke-width="4" opacity="${o}"/>`).join('')+`<rect x="${cx-96}" y="${by}" width="192" height="6" rx="2" fill="#64748b"/><rect x="${cx-70}" y="${by+1}" width="140" height="4" fill="#94a3b8" opacity=".7"/>`;
  const L=(s)=>`M${cx},${by-16} C${cx},${by-58} ${cx},${by-92} ${cx+s*38},${by-100} C${cx+s*76},${by-100} ${cx+s*86},${by-84} ${cx+s*76},${by-48} C${cx+s*66},${by-20} ${cx+s*30},${by-16} ${cx},${by-16}`;
  let cur='';[-1,1].forEach(s=>{cur+=`<path d="${L(s)}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 6" opacity=".75"/>`;for(let k=0;k<5;k++)cur+=`<circle r="6" fill="#ef4444" stroke="#fff" stroke-width="1.5"><animateMotion dur="${D}s" begin="-${k*D/5}s" repeatCount="indefinite" path="${L(s)}"/><animate attributeName="fill" dur="${D}s" begin="-${k*D/5}s" repeatCount="indefinite" values="#ef4444;#ef4444;#3b82f6;#3b82f6;#ef4444" keyTimes="0;.3;.5;.9;1"/></circle>`});
  b+=gBeaker(cx,by,210,124,.86,'url(#h-cold)',cur);
  b+=zT(510,110,'الساخن يتمدد فيرتفع','#b91c1c',170)+zT(510,160,'البارد الأكثف يهبط','#1d4ed8',170);
  b+=scCap(D,W,'الحمل: تيارات في السوائل والغازات','#b45309',0,D);
  return svg(W,H,b,'kScene')}
function hRad(){const W=640,H=280,FY=250,D=6;let b=gDefs()+hDefs();const cy=140;
  b+=`<defs><radialGradient id="h-space" cx="50%" cy="50%" r="75%"><stop offset="0" stop-color="#1e293b"/><stop offset="1" stop-color="#020617"/></radialGradient>
  <radialGradient id="h-sun" cx="45%" cy="42%" r="55%"><stop offset="0" stop-color="#fffbeb"/><stop offset=".35" stop-color="#fde047"/><stop offset=".75" stop-color="#f97316"/><stop offset="1" stop-color="#c2410c"/></radialGradient>
  <filter id="h-sunT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="4"><animate attributeName="baseFrequency" dur="8s" repeatCount="indefinite" values=".09;.1;.09"/></feTurbulence><feColorMatrix values="0 0 0 0 .75  0 0 0 0 .2  0 0 0 0 0  0 0 0 1.4 -.55"/></filter>
  <radialGradient id="h-ea" cx="38%" cy="35%" r="70%"><stop offset="0" stop-color="#7dd3fc"/><stop offset=".5" stop-color="#2563eb"/><stop offset="1" stop-color="#0c1e4a"/></radialGradient>
  <radialGradient id="h-night" cx="25%" cy="45%" r="85%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#020617" stop-opacity=".85"/></radialGradient>
  <clipPath id="h-sc"><circle cx="110" cy="${cy}" r="56"/></clipPath><clipPath id="h-ec"><circle cx="540" cy="${cy}" r="50"/></clipPath></defs>`;
  b+=`<rect width="${W}" height="${H}" fill="url(#h-space)"/>`+Array.from({length:60},(_,i)=>`<circle cx="${(i*137)%W}" cy="${(i*71)%H}" r="${i%5?.8:1.5}" fill="#fff" opacity="${.3+(i%4)*.15}"/>`).join('');
  b+=`<circle cx="110" cy="${cy}" r="86" fill="#f97316" opacity=".55" filter="url(#h-glow)"><animate attributeName="r" dur="3s" repeatCount="indefinite" values="82;90;82"/></circle><circle cx="110" cy="${cy}" r="56" fill="url(#h-sun)"/><rect x="54" y="${cy-56}" width="112" height="112" filter="url(#h-sunT)" clip-path="url(#h-sc)" opacity=".55"/><circle cx="96" cy="${cy-18}" r="16" fill="#fff" opacity=".25" filter="url(#h-soft)"/>`;
  [-24,0,24].forEach((dy,i)=>{const p=`M175,${cy+dy*.5} q12,-10 24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0`;b+=`<path d="${p}" fill="none" stroke="#fb923c" stroke-width="3" stroke-linecap="round" stroke-dasharray="190 420"><animate attributeName="stroke-dashoffset" dur="2s" begin="${i*.5}s" repeatCount="indefinite" values="200;-420"/></path>`});
  b+=`<circle cx="540" cy="${cy}" r="58" fill="#60a5fa" opacity=".35" filter="url(#h-glow)"/><circle cx="540" cy="${cy}" r="50" fill="url(#h-ea)"/><g clip-path="url(#h-ec)"><path d="M500,${cy-36} q22,-12 34,4 q-8,16 10,26 q-20,14 -40,-4 q-10,-12 -4,-26 Z M548,${cy+4} q22,-8 30,12 q-12,20 -32,8 q-6,-10 2,-20 Z M520,${cy+26} q14,2 16,14 q-14,6 -22,-4 Z" fill="#16a34a"/><path d="M500,${cy-36} q22,-12 34,4 q-8,16 10,26" fill="none" stroke="#a16207" stroke-width="3" opacity=".5"/><path d="M490,${cy-12} q30,-10 60,2 q20,8 46,-4 M500,${cy+16} q30,-8 50,4" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55" filter="url(#h-soft)"/><circle cx="540" cy="${cy}" r="50" fill="url(#h-night)"/></g><circle cx="540" cy="${cy}" r="50" fill="none" stroke="#bae6fd" stroke-width="2" opacity=".6"/>`;
  b+=zT(110,cy+100,'الشمس','#b45309',70)+zT(540,cy+100,'الأرض','#1d4ed8',70)+zT(325,cy+70,'موجات كهرومغناطيسية عبر الفراغ','#7c3aed',270);
  b+=scCap(D,W,'الإشعاع: لا يحتاج وسطا ماديا','#b45309',0,D);
  return svg(W,H,b,'kScene')}

/* ===== الدروس النموذجية للوحدة الثالثة 2-1 و2-3 و2-5 (الحقيبة التدريبية صفحات 69-78) — 5 نوفمبر ===== */
CARDS['2-1']={
  intro:{title:'الطاقة الداخلية',sayT:'مَرْحَبًا بِكَ فِي الْوِحْدَةِ الثَّالِثَةِ: الْفِيزْيَاءُ الْحَرَارِيَّهْ. وَنَبْدَأُ بِالطَّاقَةِ الدَّاخِلِيَّهْ.',steps:()=>[
    S(pt('جزيئات المادة دائمة الحركة، وتمتلك '+B('طاقة حركية')+' (انتقالية واهتزازية)، و'+B('طاقة وضع')+' بسبب قوى التجاذب بينها.'),'جُزَيْئَاتُ الْمَادَّةِ دَائِمَةُ الْحَرَكَةِ، وَتَمْتَلِكُ طَاقَةً حَرَكِيَّةً، وَطَاقَةَ وَضْعٍ بِسَبَبِ قُوَى التَّجَاذُبِ بَيْنَهَا.'),
    S(fig(hMol(),'جزيئات الماء البارد بطيئة، وجزيئات الماء الساخن سريعة'),'لَاحِظِ الْمَشْهَدَ: جُزَيْئَاتُ الْمَاءِ الْبَارِدِ تَتَحَرَّكُ بِبُطْءٍ، وَجُزَيْئَاتُ الْمَاءِ السَّاخِنِ تَتَحَرَّكُ بِسُرْعَهْ.'),
    S(pt(B('الطاقة الداخلية')+': مجموع طاقتي الحركة والوضع للذرات أو الجزيئات المكونة للمادة.'),'الطَّاقَةُ الدَّاخِلِيَّةُ: مَجْمُوعُ طَاقَتَيِ الْحَرَكَةِ وَالْوَضْعِ لِلذَّرَّاتِ أَوِ الْجُزَيْئَاتِ الْمُكَوِّنَةِ لِلْمَادَّهْ.'),
    S(pt('وللجسم نفسه وهو ساخن طاقة داخلية '+B('أعلى')+' مما له وهو بارد.'),'وَلِلْجِسْمِ نَفْسِهِ وَهُوَ سَاخِنٌ طَاقَةٌ دَاخِلِيَّةٌ أَعْلَى مِمَّا لَهُ وَهُوَ بَارِدْ.')]},
  goals:{title:'أهداف الوحدة',sayT:'وَالْآنَ، لِنَتَعَرَّفْ عَلَى أَهْدَافِ الْوِحْدَةِ.',steps:()=>[
    S({html:`<div class="kc kPt kKeep kcB">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'فِي نِهَايَةِ هَذِهِ الْوِحْدَةِ، يَكُونُ الْمُتَدَرِّبُ قَادِرًا عَلَى:')].concat([
    ['تعريف درجة الحرارة، وذكر اسم الجهاز المستخدم لقياسها.','تَعْرِيفِ دَرَجَةِ الْحَرَارَةِ، وَذِكْرِ اسْمِ الْجِهَازِ الْمُسْتَخْدَمِ لِقِيَاسِهَا.'],
    ['تعداد ثلاثة مقاييس مشهورة مع درجتي التجمد والغليان للماء في كل منها.','تَعْدَادِ ثَلَاثَةِ مَقَايِيسَ مَشْهُورَةٍ، مَعَ دَرَجَتَيِ التَّجَمُّدِ وَالْغَلَيَانِ لِلْمَاءِ فِي كُلٍّ مِنْهَا.'],
    ['تحويل قيمة درجة الحرارة من مقياس إلى آخر.','تَحْوِيلِ قِيمَةِ دَرَجَةِ الْحَرَارَةِ مِنْ مِقْيَاسٍ إِلَى آخَرْ.'],
    ['التفريق بين مفهوم درجة الحرارة وكمية الحرارة.','التَّفْرِيقِ بَيْنَ مَفْهُومِ دَرَجَةِ الْحَرَارَةِ وَكَمِّيَّةِ الْحَرَارَهْ.'],
    ['حساب الحرارة النوعية.','حِسَابِ الْحَرَارَةِ النَّوْعِيَّهْ.']].map(([t,s],i)=>S({html:`<div class="kc kPt kKeep kcT"><b>${i+1}.</b> ${t}</div>`},s)))},
  heat:{title:'الحرارة (كمية الحرارة)',sayT:'وَنَتَعَرَّفُ الْآنَ عَلَى الْحَرَارَهْ.',steps:()=>[
    S(pt(B('الحرارة')+': شكل من أشكال الطاقة، تنتقل بين الأجسام بسبب اختلاف درجات حرارتها.'),'الْحَرَارَةُ: شَكْلٌ مِنْ أَشْكَالِ الطَّاقَةِ، تَنْتَقِلُ بَيْنَ الْأَجْسَامِ بِسَبَبِ اخْتِلَافِ دَرَجَاتِ حَرَارَتِهَا.'),
    S(fig(hFlow(),'الحرارة تنتقل من الجسم الساخن إلى الجسم البارد حتى يتساويا'),'لَاحِظِ الْمَشْهَدَ: الْحَرَارَةُ تَنْتَقِلُ تِلْقَائِيًّا مِنَ الْجِسْمِ السَّاخِنِ إِلَى الْجِسْمِ الْبَارِدِ، حَتَّى تَتَسَاوَى دَرَجَتَا حَرَارَتِهِمَا.'),
    S(pt('تنتقل '+B('تلقائيا')+' من الجسم الساخن إلى الجسم البارد حتى يصلا إلى '+B('الاتزان الحراري')+'.'),'وَتَنْتَقِلُ تِلْقَائِيًّا حَتَّى يَصِلَ الْجِسْمَانِ إِلَى الِاتِّزَانِ الْحَرَارِيّْ.'),
    S(pt('وحدتها '+B('الجول')+' '+M('J')+' نسبة للعالم جيمس جول، ومن وحداتها أيضا '+B('السعر')+' '+M('cal')+'.'),'وَوَحْدَتُهَا الْجُولُ، نِسْبَةً لِلْعَالِمِ جِيمْس جُولْ، وَمِنْ وَحَدَاتِهَا أَيْضًا السُّعْرْ.'),
    S(pt(B('مصادرها')+': الشمس، وباطن الأرض، والتفاعلات الكيميائية، والطاقة النووية، والاحتكاك، والكهرباء.'),'وَمِنْ مَصَادِرِهَا: الشَّمْسُ، وَبَاطِنُ الْأَرْضِ، وَالتَّفَاعُلَاتُ الْكِيمْيَائِيَّةُ، وَالطَّاقَةُ النَّوَوِيَّةُ، وَالِاحْتِكَاكُ، وَالْكَهْرَبَاءْ.')]},
  temp:{title:'درجة الحرارة',sayT:'وَالْآنَ، مَا الْفَرْقُ بَيْنَ الْحَرَارَةِ وَدَرَجَةِ الْحَرَارَهْ؟',steps:()=>[
    S(pt(B('درجة الحرارة')+': مقياس لمتوسط طاقة حركة جزيئات المادة، وتقاس بالترمومتر.'),'دَرَجَةُ الْحَرَارَةِ: مِقْيَاسٌ لِمُتَوَسِّطِ طَاقَةِ حَرَكَةِ جُزَيْئَاتِ الْمَادَّةِ، وَتُقَاسُ بِالتِّرْمُومِتْرْ.'),
    S(pt('وهي التي تحدد '+B('اتجاه انتقال الحرارة')+' بين جسمين متلامسين: من الأعلى درجة إلى الأقل.'),'وَهِيَ الَّتِي تُحَدِّدُ اتِّجَاهَ انْتِقَالِ الْحَرَارَةِ بَيْنَ جِسْمَيْنِ مُتَلَامِسَيْنِ: مِنَ الْأَعْلَى دَرَجَةً إِلَى الْأَقَلّْ.'),
    S(pt(B('الفرق')+': درجة الحرارة تصف سخونة الجسم، أما كمية الحرارة فهي الطاقة المنتقلة نفسها، وتقاس بالجول.'),'وَالْفَرْقُ: دَرَجَةُ الْحَرَارَةِ تَصِفُ سُخُونَةَ الْجِسْمِ، أَمَّا كَمِّيَّةُ الْحَرَارَةِ فَهِيَ الطَّاقَةُ الْمُنْتَقِلَةُ نَفْسُهَا، وَتُقَاسُ بِالْجُولْ.')]},
  scales:{title:'المقاييس الثلاثة لدرجة الحرارة',sayT:'وَلِدَرَجَةِ الْحَرَارَةِ ثَلَاثَةُ مَقَايِيسَ مَشْهُورَهْ.',steps:()=>[
    S(fig(hTherm3(),'نقطتا تجمد الماء وغليانه على المقاييس الثلاثة'),'لَاحِظِ الْمَشْهَدَ: نُقْطَتَا تَجَمُّدِ الْمَاءِ وَغَلَيَانِهِ عَلَى الْمَقَايِيسِ الثَّلَاثَهْ.'),
    S(pt(B('المئوي (سلسيوس)')+': التجمد '+M('0 °C')+' والغليان '+M('100 °C')+'، وبينهما 100 قسم.'),'الْمِئَوِيُّ: يَتَجَمَّدُ الْمَاءُ عِنْدَ الصِّفْرِ، وَيَغْلِي عِنْدَ مِئَةٍ، وَبَيْنَهُمَا مِئَةُ قِسْمْ.'),
    S(pt(B('المطلق (الكلفن)')+': التجمد '+M('273 K')+' والغليان '+M('373 K')+'، وبينهما 100 قسم.'),'الْكِلْفِنُ: يَتَجَمَّدُ الْمَاءُ عِنْدَ مِئَتَيْنِ وَثَلَاثَةٍ وَسَبْعِينَ، وَيَغْلِي عِنْدَ ثَلَاثِمِئَةٍ وَثَلَاثَةٍ وَسَبْعِينْ.'),
    S(pt(B('الفهرنهايت')+': التجمد '+M('32 °F')+' والغليان '+M('212 °F')+'، وبينهما 180 قسما.'),'الْفَهْرِنْهَايْتُ: يَتَجَمَّدُ الْمَاءُ عِنْدَ اثْنَيْنِ وَثَلَاثِينَ، وَيَغْلِي عِنْدَ مِئَتَيْنِ وَاثْنَيْ عَشَرَ، وَبَيْنَهُمَا مِئَةٌ وَثَمَانُونَ قِسْمَا.')]},
  laws:{title:'قوانين التحويل',sayT:'وَلِلتَّحْوِيلِ بَيْنَ الْمَقَايِيسِ نَسْتَخْدِمُ ثَلَاثَةَ قَوَانِينْ.',steps:()=>[
    LAWB('TK = TC + 273','أَوَّلًا: مِنَ الْمِئَوِيِّ إِلَى الْكِلْفِنْ'),
    LAWB('TC = (TF − 32) / 1.8','ثَانِيًا: مِنَ الْفَهْرِنْهَايْتِ إِلَى الْمِئَوِيّْ'),
    LAWB('TF = 1.8 TC + 32','ثَالِثًا: مِنَ الْمِئَوِيِّ إِلَى الْفَهْرِنْهَايْتْ')]},
  ex1:{title:'مثال ١ · صفحة 72',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 72.',steps:()=>[
    S(q('درجة حرارة جسم ساخن '+M('300 °C')+'، فما هي على مقياس كلفن؟','المثال · صفحة 72'),''),
    S(gr(['TC = 300 °C'],'درجة الحرارة بالكلفن '+M('TK')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: دَرَجَةُ الْحَرَارَةِ بِالْكِلْفِنْ.'),
    S(st(1,M('TK = TC + 273 = 300 + 273')+'<span class="kDirOn"></span>'),'نُضِيفُ مِئَتَيْنِ وَثَلَاثَةً وَسَبْعِينَ إِلَى الدَّرَجَةِ الْمِئَوِيَّهْ.'),
    S(res(M('TK = 573 K')),'النَّتِيجَةُ: خَمْسُمِئَةٍ وَثَلَاثَةٌ وَسَبْعُونَ كِلْفِنْ.')]},
  ex2:{title:'مثال ٢ · صفحة 73',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 73.',steps:()=>[
    S(q('درجة حرارة الغرفة '+M('72 °F')+'، فما درجة حرارتها على مقياس سلسيوس؟','المثال · صفحة 73'),''),
    S(gr(['TF = 72 °F'],'درجة الحرارة بالمئوي '+M('TC')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: دَرَجَةُ الْحَرَارَةِ بِالْمِئَوِيّْ.'),
    S(st(1,M('TC = (72 − 32) / 1.8 = 40 / 1.8')+'<span class="kDirOn"></span>'),'نَطْرَحُ اثْنَيْنِ وَثَلَاثِينَ، ثُمَّ نَقْسِمُ عَلَى وَاحِدٍ فَاصِلَةٍ ثَمَانِيَهْ.'),
    S(res(M('TC ≈ 22.2 °C')),'النَّتِيجَةُ: اثْنَانِ وَعِشْرُونَ فَاصِلَةُ اثْنَيْنِ دَرَجَةً مِئَوِيَّهْ.')]},
  ex3:{title:'مثال ٣ · صفحة 73',sayT:'وَالْمِثَالُ الثَّالِثُ، مِنْ صَفْحَةِ 73.',steps:()=>[
    S(q('درجة حرارة جسم ساخن '+M('300 °C')+'، فما درجة حرارته على مقياس الفهرنهايت؟','المثال · صفحة 73'),''),
    S(gr(['TC = 300 °C'],'درجة الحرارة بالفهرنهايت '+M('TF')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: دَرَجَةُ الْحَرَارَةِ بِالْفَهْرِنْهَايْتْ.'),
    S(st(1,M('TF = 1.8 × 300 + 32 = 540 + 32')+'<span class="kDirOn"></span>'),'نَضْرِبُ فِي وَاحِدٍ فَاصِلَةٍ ثَمَانِيَةٍ، ثُمَّ نُضِيفُ اثْنَيْنِ وَثَلَاثِينْ.'),
    S(res(M('TF = 572 °F')),'النَّتِيجَةُ: خَمْسُمِئَةٍ وَاثْنَانِ وَسَبْعُونَ فَهْرِنْهَايْتْ.')]},
  q1:{title:'سؤال ١ · صفحة 74',sayT:'وَالْآنَ سُؤَالٌ مِنْ صَفْحَةِ 74: مَتَى تَتَسَاوَى قِرَاءَةُ الْفَهْرِنْهَايْتِ وَالسِّلْسِيُوسْ؟',steps:()=>[
    S(q('متى تتساوى قراءة درجة الحرارة على مقياسي الفهرنهايت والسلسيوس؟','السؤال · صفحة 74'),''),
    S(gr(['TF = TC = x'],'قيمة '+M('x')),'نُسَمِّي الْقِرَاءَةَ الْمُتَسَاوِيَةَ إِكْسْ.'),
    S(st(1,M('x = 1.8 x + 32')),'نُعَوِّضُ فِي قَانُونِ الْفَهْرِنْهَايْتْ.'),
    S(st(2,M('−0.8 x = 32')+'<span class="kDirOn"></span>'),'نَجْمَعُ الْحُدُودَ الَّتِي فِيهَا إِكْسْ فِي طَرَفٍ وَاحِدْ.'),
    S(res(M('x = −40')+' أي '+M('−40 °C = −40 °F')),'النَّتِيجَةُ: يَتَسَاوَى الْمِقْيَاسَانِ عِنْدَ سَالِبِ أَرْبَعِينْ.')]},
  q2:{title:'سؤال ٢ · صفحة 74',sayT:'وَالسُّؤَالُ الثَّانِي: مَتَى تَتَسَاوَى قِرَاءَةُ الْفَهْرِنْهَايْتِ وَالْكِلْفِنْ؟',steps:()=>[
    S(q('متى تتساوى قراءة درجة الحرارة على مقياسي الفهرنهايت والكلفن؟','السؤال · صفحة 74'),''),
    S(gr(['TF = TK = x','TC = TK − 273'],'قيمة '+M('x')),'نَمُرُّ عَبْرَ الْمِقْيَاسِ الْمِئَوِيِّ، لِأَنَّهُ لَا يُوجَدُ قَانُونٌ مُبَاشِرٌ بَيْنَهُمَا.'),
    S(st(1,M('x = 1.8 (x − 273) + 32')),'نُعَوِّضُ فِي قَانُونِ الْفَهْرِنْهَايْتْ.'),
    S(st(2,M('0.8 x = 459.4')+'<span class="kDirOn"></span>'),'نَفُكُّ الْقَوْسَ وَنُرَتِّبُ الْمُعَادَلَهْ.'),
    S(res(M('x = 574.25')+' أي '+M('574.25 K = 574.25 °F')),'النَّتِيجَةُ: يَتَسَاوَى الْمِقْيَاسَانِ عِنْدَ خَمْسِمِئَةٍ وَأَرْبَعَةٍ وَسَبْعِينَ فَاصِلَةِ خَمْسَةٍ وَعِشْرِينْ.')]}};
CARDS['2-3']={
  sh:{title:'الحرارة النوعية',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى الْحَرَارَةِ النَّوْعِيَّهْ.',steps:()=>[
    S(pt(B('الحرارة النوعية')+': كمية الحرارة اللازمة لرفع درجة حرارة كيلوجرام واحد من المادة درجة مئوية واحدة.'),'الْحَرَارَةُ النَّوْعِيَّةُ: كَمِّيَّةُ الْحَرَارَةِ اللَّازِمَةِ لِرَفْعِ دَرَجَةِ حَرَارَةِ كِيلُوجْرَامٍ وَاحِدٍ مِنَ الْمَادَّةِ، دَرَجَةً مِئَوِيَّةً وَاحِدَهْ.'),
    S(fig(hHeat({}),'نعطي الماء حرارة Q فترتفع درجة حرارته بمقدار ΔT'),'لَاحِظِ الْمَشْهَدَ: نُعْطِي الْمَاءَ حَرَارَةً، فَتَرْتَفِعُ دَرَجَةُ حَرَارَتِهِ.'),
    LAWB('Q = m c ΔT','وَالْقَانُونُ'),
    S(pt('حيث '+M('Q')+' كمية الحرارة، و'+M('m')+' الكتلة، و'+M('c')+' الحرارة النوعية، و'+M('ΔT')+' التغير في درجة الحرارة.'),'حَيْثُ: كِيُو كَمِّيَّةُ الْحَرَارَةِ، وَإِمْ الْكُتْلَةُ، وَسِي الْحَرَارَةُ النَّوْعِيَّةُ، وَدِلْتَا تِي التَّغَيُّرُ فِي دَرَجَةِ الْحَرَارَهْ.'),
    S(pt('وحدتها '+M('J/(kg·°C)')+' أو '+M('J/(kg·K)')+'، وللماء '+M('c = 4180 J/(kg·°C)')+'.'),'وَوَحْدَتُهَا: جُولٌ لِكُلِّ كِيلُوجْرَامٍ لِكُلِّ دَرَجَةٍ مِئَوِيَّهْ.')]},
  cap:{title:'السعة الحرارية',sayT:'وَنَنْتَقِلُ إِلَى السَّعَةِ الْحَرَارِيَّهْ.',steps:()=>[
    S(pt(B('السعة الحرارية')+': كمية الحرارة اللازمة لرفع درجة حرارة الجسم كله درجة مئوية واحدة.'),'السَّعَةُ الْحَرَارِيَّةُ: كَمِّيَّةُ الْحَرَارَةِ اللَّازِمَةِ لِرَفْعِ دَرَجَةِ حَرَارَةِ الْجِسْمِ كُلِّهِ، دَرَجَةً مِئَوِيَّةً وَاحِدَهْ.'),
    LAWB('C = m c','وَالْقَانُونُ'),
    S(pt('وحدتها '+M('J/°C')+' أو '+M('J/K')+'.'),'وَوَحْدَتُهَا: جُولٌ لِكُلِّ دَرَجَةٍ مِئَوِيَّهْ.'),
    S(pt(B('تنبيه')+': حول الكتلة إلى الكيلوجرام دائما، مثل '+M('100 g = 0.1 kg')+'.'),'تَنْبِيهٌ: حَوِّلِ الْكُتْلَةَ إِلَى الْكِيلُوجْرَامِ دَائِمَا.')]},
  lat:{title:'الحرارة الكامنة للانصهار',sayT:'وَالْآنَ، مَاذَا يَحْدُثُ عِنْدَ انْصِهَارِ الْجَلِيدْ؟',steps:()=>[
    S(pt(B('الحرارة الكامنة للانصهار')+': كمية الطاقة اللازمة لتحويل كيلوجرام واحد من المادة من الحالة الصلبة إلى الحالة السائلة عند درجة الانصهار.'),'الْحَرَارَةُ الْكَامِنَةُ لِلِانْصِهَارِ: كَمِّيَّةُ الطَّاقَةِ اللَّازِمَةِ لِتَحْوِيلِ كِيلُوجْرَامٍ وَاحِدٍ مِنَ الْمَادَّةِ، مِنَ الْحَالَةِ الصُّلْبَةِ إِلَى الْحَالَةِ السَّائِلَةِ، عِنْدَ دَرَجَةِ الِانْصِهَارْ.'),
    S(fig(hMelt({}),'الجليد ينصهر ودرجة حرارته ثابتة عند 0 °C'),'لَاحِظِ الْمَشْهَدَ: الْجَلِيدُ يَنْصَهِرُ، وَدَرَجَةُ حَرَارَتِهِ ثَابِتَةٌ عِنْدَ الصِّفْرِ الْمِئَوِيّْ.'),
    LAWB('Q = m H','وَالْقَانُونُ'),
    S(pt('حيث '+M('H')+' الحرارة الكامنة لانصهار المادة، ووحدتها '+M('J/kg')+'، و'+M('m')+' كتلة المادة الصلبة.'),'حَيْثُ: إِتْشْ الْحَرَارَةُ الْكَامِنَةُ لِلِانْصِهَارِ، وَوَحْدَتُهَا جُولٌ لِكُلِّ كِيلُوجْرَامْ.')]},
  ex1:{title:'مثال ١ · صفحة 75',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى أَمْثِلَةِ الْحَقِيبَةِ، الْمِثَالُ الْأَوَّلُ مِنْ صَفْحَةِ 75.',steps:()=>[
    S(q('أوجد قيمة الطاقة الحرارية التي تحتاجها لتسخين '+M('100 g')+' من الماء من '+M('10 °C')+' إلى '+M('30 °C')+'، علما بأن الحرارة النوعية للماء '+M('4180 J/(kg·°C)')+'.','المثال · صفحة 75'),''),
    S(gr(['m = 100 g = 0.1 kg','c = 4180 J/(kg·°C)','ΔT = 30 − 10 = 20 °C'],'كمية الحرارة '+M('Q')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: كَمِّيَّةُ الْحَرَارَهْ.'),
    S(fig(hHeat({m:'m = 0.1 kg',Ti:'Ti = 10 °C',Tf:'Tf = 30 °C',dT:'ΔT = 20 °C',Q:'Q = ?'}),'تسخين 0.1 kg من الماء من 10 °C إلى 30 °C'),'لِنَرْسُمِ الْمَاءَ وَهُوَ يَسْخُنْ.'),
    S(st(1,M('Q = m c ΔT = 0.1 × 4180 × 20')+'<span class="kDirOn"></span>'),'نُعَوِّضُ فِي الْقَانُونْ.'),
    S(res(M('Q = 8360 J')),'النَّتِيجَةُ: ثَمَانِيَةُ آلَافٍ وَثَلَاثُمِئَةٍ وَسِتُّونَ جُولْ.')]},
  ex2:{title:'مثال ٢ · صفحة 75',sayT:'وَالْمِثَالُ الثَّانِي، مِنْ صَفْحَةِ 75.',steps:()=>[
    S(q('قطعة من النحاس كتلتها '+M('20 g')+' سخنت من '+M('20 °C')+' إلى '+M('100 °C')+'، علما بأن الحرارة النوعية للنحاس '+M('400 J/(kg·°C)')+'. أوجد السعة الحرارية، وكمية الحرارة.','المثال · صفحة 75'),''),
    S(gr(['m = 20 g = 0.02 kg','c = 400 J/(kg·°C)','ΔT = 100 − 20 = 80 °C'],'السعة الحرارية '+M('C')+' وكمية الحرارة '+M('Q')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: السَّعَةُ الْحَرَارِيَّةُ، وَكَمِّيَّةُ الْحَرَارَهْ.'),
    S(st(1,M('C = m c = 0.02 × 400 = 8 J/°C')),'أَوَّلًا: السَّعَةُ الْحَرَارِيَّةُ تُسَاوِي الْكُتْلَةَ فِي الْحَرَارَةِ النَّوْعِيَّةِ: ثَمَانِيَةُ جُولَاتٍ لِكُلِّ دَرَجَهْ.'),
    S(st(2,M('Q = m c ΔT = 0.02 × 400 × 80')+'<span class="kDirOn"></span>'),'ثَانِيًا: نُعَوِّضُ فِي قَانُونِ كَمِّيَّةِ الْحَرَارَهْ.'),
    S(res(M('C = 8 J/°C')+' · '+M('Q = 640 J')),'النَّتِيجَةُ: السَّعَةُ ثَمَانِيَةُ جُولَاتٍ لِكُلِّ دَرَجَةٍ، وَكَمِّيَّةُ الْحَرَارَةِ سِتُّمِئَةٍ وَأَرْبَعُونَ جُولْ.')]},
  ex3:{title:'مثال · صفحة 76',sayT:'وَالْآنَ مِثَالُ الْحَرَارَةِ الْكَامِنَةِ، مِنْ صَفْحَةِ 76.',steps:()=>[
    S(q('إذا كانت الطاقة الحرارية اللازمة لصهر '+M('4 kg')+' من الجليد عند درجة حرارة '+M('0 °C')+' تساوي '+M('1344000 J')+'، احسب الحرارة الكامنة لانصهار الجليد.','المثال · صفحة 76'),''),
    S(gr(['Q = 1344000 J','m = 4 kg'],'الحرارة الكامنة '+M('H')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: الْحَرَارَةُ الْكَامِنَةُ لِلِانْصِهَارْ.'),
    S(fig(hMelt({Q:'Q = 1344000 J'}),'صهر 4 kg من الجليد عند 0 °C'),'لِنَرْسُمِ الْجَلِيدَ وَهُوَ يَنْصَهِرْ.'),
    S(st(1,M('H = Q / m = 1344000 / 4')+'<span class="kDirOn"></span>'),'نَقْسِمُ كَمِّيَّةَ الْحَرَارَةِ عَلَى الْكُتْلَهْ.'),
    S(res(M('H = 336000 J/kg')),'النَّتِيجَةُ: ثَلَاثُمِئَةٍ وَسِتَّةٌ وَثَلَاثُونَ أَلْفَ جُولٍ لِكُلِّ كِيلُوجْرَامْ.')]}};
CARDS['2-5']={
  eq:{title:'الاتزان الحراري',sayT:'نَتَعَرَّفُ الْيَوْمَ عَلَى الِاتِّزَانِ الْحَرَارِيّْ.',steps:()=>[
    S(pt(B('الاتزان الحراري')+': وصول جسمين في درجتي حرارة مختلفتين إلى درجة حرارة واحدة عند اتصالهما، بحيث تتساوى كمية الحرارة المفقودة مع كمية الحرارة المكتسبة.'),'الِاتِّزَانُ الْحَرَارِيُّ: وُصُولُ جِسْمَيْنِ فِي دَرَجَتَيْ حَرَارَةٍ مُخْتَلِفَتَيْنِ، إِلَى دَرَجَةِ حَرَارَةٍ وَاحِدَةٍ عِنْدَ اتِّصَالِهِمَا.'),
    S(fig(hCal({}),'الفلز الساخن يفقد حرارة، والماء البارد يكتسبها، حتى درجة واحدة'),'لَاحِظِ الْمَشْهَدَ: الْفِلِزُّ السَّاخِنُ يَفْقِدُ حَرَارَةً، وَالْمَاءُ الْبَارِدُ يَكْتَسِبُهَا، حَتَّى يَصِلَا إِلَى دَرَجَةٍ وَاحِدَهْ.'),
    LAWB('Q1 + Q2 = 0','وَالْقَانُونُ'),
    S(pt('أي أن الحرارة المفقودة = الحرارة المكتسبة: '+M('m1 c1 (T1 − Tf) = m2 c2 (Tf − T2)')),'أَيْ أَنَّ الْحَرَارَةَ الْمَفْقُودَةَ تُسَاوِي الْحَرَارَةَ الْمُكْتَسَبَهْ.'),
    S(pt(B('خطوات الحل')+': نحسب الحرارة المكتسبة للجسم البارد، ثم نساويها بالحرارة المفقودة من الساخن، ثم نحل المعادلة للمجهول.'),'وَخُطُوَاتُ الْحَلِّ: نَحْسُبُ الْحَرَارَةَ الْمُكْتَسَبَةَ، ثُمَّ نُسَاوِيهَا بِالْمَفْقُودَةِ، ثُمَّ نَحُلُّ الْمُعَادَلَهْ.')]},
  tr:{title:'طرق انتقال الحرارة',sayT:'وَالْآنَ، كَيْفَ تَنْتَقِلُ الْحَرَارَهْ؟',steps:()=>[
    S(pt(B('أولا: التوصيل')+': انتقال الحرارة خلال المادة من الجزء الساخن إلى الجزء البارد بالتلامس، دون انتقال جزيئات المادة من مكانها.'),'أَوَّلًا: التَّوْصِيلُ: انْتِقَالُ الْحَرَارَةِ خِلَالَ الْمَادَّةِ بِالتَّلَامُسِ، دُونَ انْتِقَالِ جُزَيْئَاتِهَا مِنْ مَكَانِهَا.'),
    S(fig(hCond(),'التوصيل: الجزيئات المهتزة تنقل الطاقة إلى جاراتها'),'لَاحِظِ الْمَشْهَدَ: الطَّرَفُ السَّاخِنُ يَهْتَزُّ بِقُوَّةٍ، وَيَنْقُلُ الطَّاقَةَ عَلَى طُولِ السَّاقْ.'),
    S(pt(B('ثانيا: الحمل')+': انتقال الحرارة في السوائل والغازات، فالمائع الساخن يتمدد وتقل كثافته فيرتفع، ويحل محله مائع بارد.'),'ثَانِيًا: الْحَمْلُ: يَحْدُثُ فِي السَّوَائِلِ وَالْغَازَاتِ، فَالْمَائِعُ السَّاخِنُ يَتَمَدَّدُ فَيَرْتَفِعُ، وَيَحُلُّ مَحَلَّهُ مَائِعٌ بَارِدْ.'),
    S(fig(hConv(),'الحمل: تيارات دائرية في الماء عند تسخينه'),'لَاحِظِ الْمَشْهَدَ: الْمَاءُ السَّاخِنُ يَرْتَفِعُ، وَالْبَارِدُ يَهْبِطُ، فَتَتَكَوَّنُ تَيَّارَاتُ الْحَمْلْ.'),
    S(pt(B('ثالثا: الإشعاع')+': انتقال الطاقة الحرارية على شكل موجات كهرومغناطيسية، ويمكن أن تنتقل في الهواء أو الفراغ.'),'ثَالِثًا: الْإِشْعَاعُ: انْتِقَالُ الطَّاقَةِ عَلَى شَكْلِ مَوْجَاتٍ كَهْرُومَغْنَاطِيسِيَّةٍ، تَنْتَقِلُ فِي الْهَوَاءِ أَوِ الْفَرَاغْ.'),
    S(fig(hRad(),'الإشعاع: حرارة الشمس تصل إلى الأرض عبر الفراغ'),'لَاحِظِ الْمَشْهَدَ: حَرَارَةُ الشَّمْسِ تَصِلُ إِلَى الْأَرْضِ عَبْرَ الْفَرَاغِ، دُونَ وَسَطٍ مَادِّيّْ.')]},
  ex1:{title:'مثال · صفحة 77',sayT:'وَالْآنَ لِنَنْتَقِلْ إِلَى مِثَالِ الْحَقِيبَةِ، مِنْ صَفْحَةِ 77.',steps:()=>[
    S(q('سخنت قطعة من الألمنيوم كتلتها '+M('0.05 kg')+' إلى درجة حرارة غير معروفة، ثم ألقيت في وعاء يحتوي على '+M('0.15 kg')+' من الماء عند '+M('21 °C')+'، فوصلت درجة الحرارة إلى '+M('25 °C')+'. إذا كانت الحرارة النوعية للألمنيوم '+M('899 J/(kg·°C)')+' وللماء '+M('4186 J/(kg·°C)')+'، فما درجة الحرارة الابتدائية لقطعة الألمنيوم؟','المثال · صفحة 77'),''),
    S(gr(['m1 = 0.05 kg · c1 = 899','m2 = 0.15 kg · c2 = 4186','T2 = 21 °C · Tf = 25 °C'],'درجة الألمنيوم الابتدائية '+M('T1')),'الْمُعْطَيَاتُ أَمَامَكَ عَلَى السَّبُّورَةِ، وَالْمَطْلُوبُ: دَرَجَةُ الْحَرَارَةِ الِابْتِدَائِيَّةُ لِلْأَلُمِنْيُومْ.'),
    S(fig(hCal({T1:'T1 = ?',T2:'T2 = 21 °C',Tf:'Tf = 25 °C'}),'الألمنيوم الساخن في الماء حتى 25 °C'),'لِنَرْسُمِ الْأَلُمِنْيُومَ السَّاخِنَ فِي الْمَاءِ الْبَارِدْ.'),
    S(st(1,M('Q2 = 0.15 × 4186 × (25 − 21) = 2511.6 J')),'أَوَّلًا: الْحَرَارَةُ الَّتِي اكْتَسَبَهَا الْمَاءُ.'),
    S(st(2,M('0.05 × 899 × (T1 − 25) = 2511.6')),'ثَانِيًا: نُسَاوِيهَا بِالْحَرَارَةِ الَّتِي فَقَدَهَا الْأَلُمِنْيُومْ.'),
    S(st(3,M('T1 − 25 = 2511.6 / 44.95 = 55.88')+'<span class="kDirOn"></span>'),'ثَالِثًا: نَقْسِمُ، ثُمَّ نُضِيفُ خَمْسَةً وَعِشْرِينْ.'),
    S(res(M('T1 ≈ 80.9 °C')),'النَّتِيجَةُ: ثَمَانُونَ فَاصِلَةُ تِسْعَةٍ دَرَجَةً مِئَوِيَّهْ.')]}};
const RU3={
 '2-1':[[/^مقدمة الوحدة وأهدافها$/,['intro','goals']],[/^درجة الحرارة وكمية الحرارة$/,null],[/^ما ستتعلمه$/,null],[/^الحرارة \(كمية الحرارة\)$/,'heat'],[/^مصادر الطاقة الحرارية$/,null],[/^درجة الحرارة$/,'temp'],[/^المقاييس الثلاثة/,'scales'],[/^قوانين التحويل$/,'laws'],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال ٢: تحويل/,'ex2'],[/^مثال ٣: تحويل/,'ex3'],[/^سؤال ١: متى/,'q1'],[/^سؤال ٢: متى/,'q2']],
 '2-3':[[/^الحرارة النوعية c$/,'sh'],[/^السعة الحرارية C$/,'cap'],[/^تنبيه$/,null],[/^الحرارة الكامنة للانصهار$/,'lat'],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1'],[/^مثال: السعة الحرارية/,'ex2'],[/^مثال: حساب الحرارة الكامنة/,'ex3']],
 '2-5':[[/^الاتزان الحراري$/,'eq'],[/^خطوات الحل$/,null],[/^طرق انتقال الحرارة$/,'tr'],[/^أمثلة الحقيبة التدريبية محلولة$/,'ex1']]};
const LIFE3={'2-1':'وَبَعْدَ أَنْ فَهِمْنَا الْحَرَارَةَ وَدَرَجَةَ الْحَرَارَةِ، لِنَرَ أَيْنَ نَجِدُهُمَا فِي حَيَاتِنَا.','2-3':'وَبَعْدَ أَنْ تَعَرَّفْنَا عَلَى الْحَرَارَةِ النَّوْعِيَّةِ وَالْكَامِنَةِ، لِنَرَ أَيْنَ نَجِدُهُمَا فِي حَيَاتِنَا.','2-5':'وَبَعْدَ أَنْ فَهِمْنَا الِاتِّزَانَ الْحَرَارِيَّ وَطُرُقَ انْتِقَالِ الْحَرَارَةِ، لِنَرَ أَيْنَ نَجِدُهَا فِي حَيَاتِنَا.'};
function applyU3(out,K2){defs();const T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');const seen={};
  const R=(RU3[K2]||[]).map(([re,id,once])=>[re,sl=>{if(once){if(seen[id])return null;seen[id]=1}if(id===null)return null;return Array.isArray(id)?id.map(i=>card(K2,i)):card(K2,id)}]);
  R.push([/^تمرين \d+ ·/,()=>null],[/^رسم توضيحي/,()=>null],[/^تطبيقات من الحياة$/,sl=>{sl.sayT=LIFE3[K2];return typeof appCards==='function'?appCards(sl):sl}]);
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl)skip=null});
  return res}

function apply(out,K2){try{document.documentElement.dataset.kcu=String(K2).split('-')[0]}catch(e){}if(!CARDS[K2])return out;defs();if(K2==='0-1')return apply01(out);if(/^0-[2456]$/.test(K2))return applyU1(out,K2);if(/^1-[1235789]$/.test(K2))return applyU2(out,K2);if(/^2-[135]$/.test(K2))return applyU3(out,K2);if(K2==='4-1')return apply41(out);if(K2==='4-8')return apply48(out);if(K2==='4-5')return apply45(out);if(K2==='3-3')return V33(apply33(out));if(K2==='3-4')return apply34(out);if(K2==='3-5')return apply35(out);if(K2==='3-6')return apply36(out);
  const T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^تصنيف المواد حسب توصيلها للكهرباء$/,sl=>{if(K2!=='3-1')return sl;sl.sayT='بعد أن عرفنا أن الإلكترونات هي التي تنتقل بين الأجسام، لنتعرف الآن على تصنيف المواد حسب توصيلها للكهرباء.';
      sl.steps=sl.steps.concat([{html:fig(matScene(),'مشهد: حركة الإلكترونات في الموصل وشبه الموصل والعازل').html,say:'شاهد المشهد: فِي الْمُوَصِّلِ تَتَحَرَّكُ الْإِلِكْتِرُونَاتُ بِحُرِّيَّةٍ، وَفِي شِبْهِ الْمُوَصِّلِ حَرَكَتُهَا قَلِيلَةٌ، وَفِي الْعَازِلِ تَبْقَى مُقَيَّدَةً فِي مَكَانِهَا.'}]);return sl}],
    [/^تطبيقات من الحياة$/,sl=>{if(K2!=='3-1')return sl;sl.sayT='وَبَعْدَ أَنْ فَهِمْنَا الشُّحْنَاتِ وَقَانُونَ كُولُومَ، لِنَرَى كَيْفَ نَسْتَفِيدُ مِنَ الْكَهْرَبَاءِ السَّاكِنَةِ فِي حَيَاتِنَا الْيَوْمِيَّهْ.';
      /* أيقونات ثلاثية الأبعاد (Fluent Emoji 3D من Microsoft، رخصة MIT، والذرة رسم خاص) طلب المدرب 31 أكتوبر */const IM={"print": "data:image/webp;base64,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", "fact": "data:image/webp;base64,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", "car": "data:image/webp;base64,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", "atom": "data:image/webp;base64,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", "bolt": "data:image/webp;base64,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"};const IC=[[/تصوير|طابع/,'print'],[/فلاتر|غبار/,'fact'],[/طلاء/,'car'],[/كولوم|النواة/,'atom'],[/صواعق/,'bolt']];
      sl.steps=sl.steps.map(x=>{if(!x||!x.md)return x;const m=x.md.replace(/^[-•]\s*/,'').match(/^\*\*([^*]+?):?\*\*:?\s*(.*)$/);if(!m)return x;
        const ik=(IC.find(([re])=>re.test(m[1]))||[0,''])[1],ic=ik?'<img src="'+IM[ik]+'" alt="">':'💡',il=typeof inl==='function'?inl:(t=>t);
        return {html:`<div class="kc kPt kcT kApp"><span class="kIco" aria-hidden="true">${ic}</span><div><b>${il(m[1])}:</b> ${il(m[2])}</div></div>`,say:m[1].trim()+': '+m[2]}});return sl}],
    [/^مقدمة الوحدة وأهدافها$/,sl=>{sl.steps=sl.steps.map(x=>x&&x.h==='تعريف الكهرباء الساكنة'?{html:'<h3>تعريف الكهرباء الساكنة</h3>',say:'ونبدأ بتعريف الكهرباء الساكنة.'}:x);const c=card(K2,'life');c.steps[0].html='<h3>الكهرباء الساكنة من حولنا</h3>'+c.steps[0].html;sl.steps=sl.steps.concat(c.steps);return [sl,card(K2,'goals')]}],[/^المفاهيم الأساسية في الوحدة$/,()=>null],[/^وحدات مهمة$/,()=>null],[/^الشحن بالدلك$/,()=>card(K2,'rub')],[/^الشحن باللمس والحث$/,()=>card(K2,'touch')],[/^الشحنة الكهربائية$/,()=>[card(K2,'charge',{title:'الشحنات الكهربائية',sayT:'بعد أن تعرفنا على أهداف الوحدة، نبدأ أول موضوعاتها: الشحنات الكهربائية.',part:[0,2]}),card(K2,'charge',{title:'الشحنات الكهربائية (تابع)',s4:1,part:[2],en:'Electric Charges'}),card(K2,'particles')]],[/^قانون كولوم$/,()=>[card(K2,'history'),card(K2,'law'),card(K2,'grav')]],
    [/^مثال ١:.*صفحة 92/,()=>card(K2,'ex1',{title:'مثال ١ · صفحة 92',sayT:'والآن لننتقل إلى حل أمثلة الحقيبة التدريبية. لنأخذ المثال الأول، من صفحة 92.'})],[/^مثال على ثلاث شحنات/,()=>null],[/^أمثلة الحقيبة التدريبية محلولة$/,()=>null],[/^مثال ٢:.*صفحة 93/,()=>card(K2,'ex2',{title:'مثال ٢ · صفحة 93',sayT:'حتى تتضح الصورة، تأمل معي المثال الثاني، من صفحة 93.'})],
    [/^تمرين 1 · مثال [٢٣]/,()=>null],
    [/^تمرين 2 · ورقة العمل/,()=>null],[/^رسم توضيحي 1$/,()=>null]];
  const res=[];let skip=null;
  out.forEach(sl=>{const t=T(sl);if(skip&&base(t)===skip&&/\(تابع\)/.test(t))return;skip=null;
    const m=R.find(([re])=>re.test(base(t)));if(!m||sl.type!=='c'){res.push(sl);return}
    if(/^رسم توضيحي 1$/.test(t)&&!/كولوم|coulomb|F₁/i.test((sl.steps[0]||{}).html||''))return res.push(sl);
    skip=base(t);const n=m[1](sl);if(Array.isArray(n))n.forEach(x=>x&&res.push(x));else if(n)res.push(n);if(n===sl||(Array.isArray(n)&&n[0]===sl))skip=null});
  /* 3-1: المقارنة بين طرق الشحن بعد طرق الشحن، وحذف صفحة المواد المكررة (طلب المدرب 16:46) */
  if(K2==='3-1'){const tt=x=>String((x&&x.title)||'');const d=res.findIndex(x=>/^الموصلات والعوازل وأشباه الموصلات/.test(tt(x)));if(d>=0)res.splice(d,1);
    /* حذف المقارنة والرسمين القديمين للدلك والحث (طلب المدرب 16:49) */
    for(let k=res.length-1;k>=0;k--){const x=res[k],t=tt(x),h=JSON.stringify((x&&x.steps)||[]);if(/^مقارنة بين طرق الشحن/.test(t)||(/^رسم توضيحي/.test(t)&&/الشحن بالدلك|الشحن بالحث/.test(h)))res.splice(k,1)}}
  if(K2==='3-1'){const pp=res.find(x=>x&&x.title==='الشحنة وجسيمات الذرة');if(pp)pp.sayT='وَالْآنَ، لِنَتَعَرَّفْ أَكْثَرَ عَلَى الشُّحْنَةِ الْكَهْرَبَائِيَّةِ وَجُسَيْمَاتِ الذَّرَّةِ الَّتِي تَحْمِلُهَا.';
    /* العناوين الفرعية بالإنجليزية */
    const H3=[['تعريف الكهرباء الساكنة','Static Electricity']];
    res.forEach(sl=>{if(sl&&sl.steps)sl.steps.forEach(x=>{if(x&&x.html)H3.forEach(([a,e])=>{x.html=x.html.split('<h3>'+a+'</h3>').join('<h3>'+a+' <bdi class="kEn" dir="ltr">'+e+'</bdi></h3>')})})})}
  /* الرسوم التوضيحية: المدرب يقرأ تعليق الرسم بدل جملة عامة */
  res.forEach(sl=>{if(!sl||!sl.steps)return;sl.steps=sl.steps.map(x=>{if(x&&x.html&&/<figure/.test(x.html)&&/^انظر معي إلى هذا الرسم/.test(x.say||'')){const m=x.html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)||x.html.match(/aria-label="([^"]+)"/);const c=m&&m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();if(c){let t='لاحظ في الرسم: '+c.replace(/[.。]$/,'')+'.';for(const f of SFIX)t=t.split(f[0]).join(f[1]);x.say=vk(t)}return x}if(!x||!x.md||!/^\s*\[\[fig:/.test(x.md)||typeof md!=='function')return x;try{const h=md(x.md);const m=h.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);if(!m)return x;const c=m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();return c?{html:h,say:vk('لاحظ في الرسم: '+c.replace(/[.。]$/,'')+'.')}:x}catch(e){return x}})});
  return res}
/* ---------- الأمثلة والتمارين التفاعلية ---------- */
PFIG['3-4'].unshift([/10000 N\/C/,()=>vEd({E:'E = 10000 N/C',d:'d = 0.01 m',V:'ΔV = 100 V'}),'ΔV = E·d = 10000 × 0.01 = 100 V'],[/0\.1 m من شحنة نقطية/,()=>vAtP({q:'q = +2 µC',r:'r = 0.1 m',V:'V = 1.8 × 10⁵ V'}),'V = k·q / r = 1.8 × 10⁵ V'],[/1000 N\/C/,()=>vEd({E:'E = 1000 N/C',d:'d = 0.02 m',V:'ΔV = 20 V'}),'ΔV = E·d = 1000 × 0.02 = 20 V'],[/0\.2 m من شحنة/,()=>vAtP({q:'q = +4 µC',r:'r = 0.2 m',V:'V = 1.8 × 10⁵ V'}),'V = k·q / r = 1.8 × 10⁵ V']);
PFIG['3-5'].unshift([/4\.5 × 10⁻⁴ C/,()=>cCapEx({q:'q = 4.5 × 10⁻⁴ C',V:'V = 150 V',res:'C = 3 × 10⁻⁶ F'}),'C = q / V = 3 × 10⁻⁶ F'],[/27 × 10⁻⁶ F/,()=>cCapEx({C:'C = 27 µF',V:'V = 45 V',res:'q = 1.215 × 10⁻³ C'}),'q = C·V = 1.215 × 10⁻³ C'],[/مساحة اللوح 2 m²/,()=>cPlatesEx({A:'A = 2 m²',d:'d = 5 mm',res:'C = 3.54 × 10⁻⁹ F'}),'C = ε₀·A / d = 3.54 × 10⁻⁹ F'],[/4 × 10⁻⁴ C/,()=>cCapEx({q:'q = 4 × 10⁻⁴ C',V:'V = 100 V',res:'C = 4 × 10⁻⁶ F'}),'C = q / V = 4 × 10⁻⁶ F'],[/4\.5 × 10⁻¹² F يتصل ببطارية/,()=>cCapEx({C:'C = 4.5 pF',V:'V = 12 V',res:'q = 5.4 × 10⁻¹¹ C'}),'q = C·V = 5.4 × 10⁻¹¹ C'],[/سعته 6 × 10⁻⁶ F/,()=>cCapEx({q:'q = 6 µC',C:'C = 6 µF',res:'V = 1 V'}),'V = q / C = 1 V'],[/شدة المجال داخله/,()=>cPlatesEx({d:'d = 1 mm',V:'V = 1 V',res:'E = 1000 V/m'}),'E = V / d = 1000 V/m']);
PFIG['3-6'].unshift([/200 pF و 600 pF/,()=>sParEx({C:['200 pF','600 pF'],res:'C_total = 800 pF'}),'على التوازي نجمع السعات: C = 200 + 600 = 800 pF'],[/6 pF و 3 pF/,()=>sSerEx({C:['6 pF','3 pF'],res:'C_total = 2 pF'}),'على التوالي: C = 6 × 3 / (6 + 3) = 2 pF'],[/سعتهما المكافئة 2 × 10⁻¹² F/,()=>sSerEx({C:['C₁','C₂'],V:'10 V',res:'q = 2 × 10⁻¹¹ C'}),'الشحنة متساوية على المكثفين: q = C·V = 2 × 10⁻¹¹ C'],[/2 [µμ]F و 4 [µμ]F.*التوالي/,()=>sSerEx({C:['2 µF','4 µF'],res:'C_total = 1.33 µF'}),'على التوالي: C = 2 × 4 / (2 + 4) = 1.33 µF'],[/2 [µμ]F و 4 [µμ]F.*التوازي/,()=>sParEx({C:['2 µF','4 µF'],res:'C_total = 6 µF'}),'على التوازي: C = 2 + 4 = 6 µF'],[/4 nF/,()=>sSerEx({C:['4 nF','2 nF'],V:'12 V',res:'C_total = 1.33 nF'}),'على التوالي: C = 4 × 2 / (4 + 2) = 1.33 nF'],[/400 nF/,()=>sParEx({C:['400 nF','100 nF'],V:'110 V',res:'C_total = 500 nF'}),'على التوازي: C = 400 + 100 = 500 nF'],[/2 × 10⁻⁶ F وُصل بجهد 12 V/,()=>cCapEx({C:'C = 2 µF',V:'V = 12 V',res:'PE = 1.44 × 10⁻⁴ J'}),'PE = ½·C·V² = 1.44 × 10⁻⁴ J'],[/2\.4 C/,()=>cCapEx({q:'q = 2.4 C',V:'V = 200 V',res:'PE = 240 J'}),'PE = ½·q·V = 240 J'],[/4\.5 × 10⁻¹² F يتصل لوحاه|الطاقة المختزنة فيه/,()=>cCapEx({C:'C = 4.5 pF',V:'V = 12 V',res:'PE = 3.24 × 10⁻¹⁰ J'}),'PE = ½·C·V² = 3.24 × 10⁻¹⁰ J']);
/* ---------- الأمثلة والتمارين التفاعلية للوحدات 1-3: مشهد مجسم فوق كل مسألة، والناتج يظهر على المشهد بعد الحل (طلب المدرب 5 نوفمبر 07:54) ---------- */
function pRes(f,res){const m=f.match(/viewBox="0 0 (\d+) (\d+)"/),W=m?+m[1]:640,H=m?+m[2]:300,w=Math.max(96,res.length*9.5+34);
  return f.replace(/<\/svg>\s*$/,`<g class="kPl" style="--d:.15s">${zT(W-w*TS/2-12,H-14-15*TS,res,'#15803d',w)}</g></svg>`)}
function pScale(txt){const W=640,H=250,FY=210;return svg(W,H,gDefs()+stage(W,H,FY)+gScale(220,FY+8,200,txt),'kScene')}
function pArea(a){/* منظر علوي لمربع ضلعه 1 km = 1000 m */const W=640,H=260,X0=230,Y0=24,S=180,X1=X0+S,Y1=Y0+S;let b=gDefs()+`<rect x="0" y="0" width="${W}" height="${H}" fill="#F3F7FC"/>`;
  b+=`<rect x="${X0}" y="${Y0}" width="${S}" height="${S}" fill="#bbf7d0" stroke="#15803d" stroke-width="2.5"/>`+Array.from({length:9},(_,i)=>{const t=(i+1)*S/10;return `<line x1="${X0+t}" y1="${Y0}" x2="${X0+t}" y2="${Y1}" stroke="#15803d" stroke-width=".6" opacity=".35"/><line x1="${X0}" y1="${Y0+t}" x2="${X1}" y2="${Y0+t}" stroke="#15803d" stroke-width=".6" opacity=".35"/>`}).join('');
  b+=`<text x="${X0+S/2}" y="${Y0+S/2}" font-size="30" font-weight="800" text-anchor="middle" fill="#14532d" direction="ltr">1 km²</text><text x="${X0+S/2}" y="${Y0+S/2+28}" font-size="15" font-weight="700" text-anchor="middle" fill="#166534" direction="ltr">1000 m × 1000 m</text>`;
  const vx=X0-26;b+=`<g class="kDim"><line x1="${vx}" y1="${Y0}" x2="${vx}" y2="${Y1}" stroke="#0369a1" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="${vx-7}" y1="${Y0}" x2="${vx+7}" y2="${Y0}" stroke="#0369a1" stroke-width="1.6"/><line x1="${vx-7}" y1="${Y1}" x2="${vx+7}" y2="${Y1}" stroke="#0369a1" stroke-width="1.6"/>`+pill(vx-62,Y0+S/2,'1 km = 1000 m','#0369a1',0,'kOn0')+`</g>`;
  b+=dim(X0,X1,Y1+22,'1 km = 1000 m');return svg(W,H,b,'kScene')}
function pMetal(m,t){const W=640,H=300,FY=270;let b=gDefs()+hDefs()+stage(W,H,FY)+kBench(170,FY,10,630);b+=gPlate(260,FY-18,200)+gMetal(196,FY-58,120,50,t?'url(#h-hot)':'#c2410c',t?.55:.35);const cx=q=>Math.min(500,628-(q.length*9.5+30)*TS/2);b+=zT(cx(m),110,m,'#334155');if(t)b+=zT(cx(t),160,t,'#b91c1c');return svg(W,H,b,'kScene')}
function pTemp(t,col,ru){/* ميزان حرارة زجاجي حقيقي بتدريجين: المعطى يسارا، ومقياس النتيجة يمينا يظهر بعد الحل */
  const W=640,H=320,FY=296,blue=col==='#2563eb',m=t.match(/T([CFK])\s*=\s*(-?[\d.]+)/),lu=m?m[1]:'C',v=m?+m[2]:20;
  const toC=(x,u)=>u==='C'?x:u==='F'?(x-32)/1.8:x-273,fromC=(c,u)=>u==='C'?c:u==='F'?c*1.8+32:c+273;ru=ru||(lu==='C'?'F':'C');
  const C=toC(v,lu),cmin=C<35?-20:0,cmax=[50,100,150,200,250,300,400].find(x=>x>=C*1.12+8)||500;
  const X=320,top=40,yb=246,yTop=60,yBot=226,Y=c=>yBot-(c-cmin)*(yBot-yTop)/(cmax-cmin),uid='tq'+Math.random().toString(36).slice(2,6);
  const nice=r=>[1,2,5,10,20,25,50,100,200].find(s=>r/s<=8);
  const scale=(u,side)=>{const a=fromC(cmin,u),b=fromC(cmax,u),st=nice(b-a),mn=st/5;let g='';
    for(let x=Math.ceil(a/mn)*mn;x<=b+1e-9;x+=mn){const yy=Y(toC(x,u)),big=Math.abs(x/st-Math.round(x/st))<1e-6,L=big?13:7,x0=side<0?X-15:X+15;
      g+=`<line x1="${x0}" y1="${f1(yy)}" x2="${x0+side*L}" y2="${f1(yy)}" stroke="#1f2937" stroke-width="${big?1.6:.8}"/>`;
      if(big)g+=`<text x="${x0+side*(L+4)}" y="${f1(yy+4.5)}" font-size="12.5" font-weight="800" text-anchor="${side<0?'end':'start'}" fill="#1f2937" direction="ltr">${Math.round(x)}</text>`}
    const un=u==='K'?'K':'°'+u;g+=`<text x="${side<0?X-38:X+38}" y="${top+8}" font-size="15" font-weight="900" text-anchor="middle" fill="${side<0?'#7f1d1d':'#14532d'}" direction="ltr">${un}</text>`;return g};
  const lq=blue?['#93c5fd','#2563eb','#1e3a8a']:['#fca5a5','#dc2626','#7f1d1d'],yl=Y(C);
  let b=gDefs()+stage(W,H,FY)+`<defs><linearGradient id="${uid}g" x1="0" x2="1"><stop offset="0" stop-color="#cbd5e1" stop-opacity=".9"/><stop offset=".25" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".5" stop-color="#e2e8f0" stop-opacity=".55"/><stop offset="1" stop-color="#94a3b8" stop-opacity=".9"/></linearGradient>
<linearGradient id="${uid}l" x1="0" x2="1"><stop offset="0" stop-color="${lq[2]}"/><stop offset=".45" stop-color="${lq[0]}"/><stop offset="1" stop-color="${lq[1]}"/></linearGradient>
<radialGradient id="${uid}b" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="${lq[0]}"/><stop offset=".75" stop-color="${lq[1]}"/><stop offset="1" stop-color="${lq[2]}"/></radialGradient>
<linearGradient id="${uid}p" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fffdf5"/><stop offset="1" stop-color="#f3ead6"/></linearGradient>
<linearGradient id="${uid}w" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#9a6234"/><stop offset="1" stop-color="#5b3517"/></linearGradient></defs>`;
  /* لوح التدريج الخشبي بحامل قائم على الطاولة */
  b+=gSh(X,FY-4,90)+`<path d="M${X-70},${FY-6} L${X+70},${FY-6} L${X+58},${FY-22} L${X-58},${FY-22}Z" fill="url(#${uid}w)"/><rect x="${X-8}" y="${yb+8}" width="16" height="${FY-22-yb-8}" fill="#6b4423"/>`;
  b+=`<rect x="${X-78}" y="${top-12}" width="156" height="${yb-top+30}" rx="12" fill="url(#${uid}p)" stroke="#c8b48a" stroke-width="1.5" filter="drop-shadow(0 4px 6px rgba(30,41,59,.25))"/>`;
  b+=scale(lu,-1)+`<g class="kPl" style="--d:.1s">${scale(ru,1)}</g>`;
  /* الأنبوب الزجاجي والخزان */
  b+=`<rect x="${X-9}" y="${top}" width="18" height="${yb-top}" rx="9" fill="url(#${uid}g)" stroke="#94a3b8" stroke-width="1"/><rect x="${X-7}" y="${top-8}" width="14" height="10" rx="3" fill="#94a3b8"/>`;
  b+=`<rect x="${X-3}" y="${f1(yl)}" width="6" height="${f1(yb-yl)}" fill="url(#${uid}l)"><animate attributeName="y" dur="3s" fill="freeze" values="${yb};${f1(yl)}"/><animate attributeName="height" dur="3s" fill="freeze" values="0;${f1(yb-yl)}"/></rect>`;
  b+=`<circle cx="${X}" cy="${yb+8}" r="16" fill="url(#${uid}b)" stroke="${lq[2]}" stroke-width="1"/><ellipse cx="${X-5}" cy="${yb+2}" rx="4" ry="6" fill="#fff" opacity=".6"/><rect x="${X-6}" y="${top+6}" width="2.5" height="${yb-top-14}" rx="1.2" fill="#fff" opacity=".75"/>`;
  /* مؤشر القراءة */
  b+=`<line x1="${X-82}" y1="${f1(yl)}" x2="${X-62}" y2="${f1(yl)}" stroke="${blue?'#1d4ed8':'#b91c1c'}" stroke-width="2" stroke-dasharray="4 3"/><path d="M${X-11},${f1(yl)} l-9,-6 l0,12Z" fill="${blue?'#1d4ed8':'#b91c1c'}"/>`;
  b+=zT(150,yl<70?80:yl,t,blue?'#1d4ed8':'#b91c1c');
  return svg(W,H,b,'kScene')}
function pWatch(txt){/* ساعة حائط واقعية: عقرب الدقائق يدور دورة كاملة = ساعة واحدة */
  const W=640,H=300,cx=330,cy=138,R=104,D=8,u='ck'+Math.random().toString(36).slice(2,6);let b=gDefs()+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;
  b+=`<defs><linearGradient id="${u}r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f5f9"/><stop offset=".35" stop-color="#94a3b8"/><stop offset=".6" stop-color="#e2e8f0"/><stop offset="1" stop-color="#475569"/></linearGradient><radialGradient id="${u}f" cx=".5" cy=".45" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".85" stop-color="#f8fafc"/><stop offset="1" stop-color="#e2e8f0"/></radialGradient><linearGradient id="${u}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  b+=`<ellipse cx="${cx+6}" cy="${cy+10}" rx="${R+12}" ry="${R+12}" fill="#0f172a" opacity=".18" filter="url(#g-blur)"/><circle cx="${cx}" cy="${cy}" r="${R+12}" fill="url(#${u}r)" stroke="#334155" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="${R+3}" fill="#1e293b"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${u}f)"/>`;
  for(let i=0;i<60;i++){const a=i*6*Math.PI/180,big=i%5===0,r1=R-(big?14:7),r2=R-3;b+=`<line x1="${f1(cx+r1*Math.sin(a))}" y1="${f1(cy-r1*Math.cos(a))}" x2="${f1(cx+r2*Math.sin(a))}" y2="${f1(cy-r2*Math.cos(a))}" stroke="#0f172a" stroke-width="${big?3:1.1}" stroke-linecap="round"/>`}
  for(let h=1;h<=12;h++){const a=h*30*Math.PI/180,r=R-30;b+=`<text x="${f1(cx+r*Math.sin(a))}" y="${f1(cy-r*Math.cos(a)+7)}" font-size="20" font-weight="800" text-anchor="middle" fill="#0f172a" direction="ltr" font-family="Georgia,serif">${h}</text>`}
  /* القطاع الذي يمسحه عقرب الدقائق خلال ساعة */
  b+=`<circle cx="${cx}" cy="${cy}" r="${R*.42}" fill="none" stroke="#f97316" stroke-opacity=".35" stroke-width="${R*.84}" pathLength="100" stroke-dasharray="0 100" transform="rotate(-90 ${cx} ${cy})"><animate attributeName="stroke-dasharray" dur="${D}s" repeatCount="indefinite" keyTimes="0;.1;.8;1" values="0 100;0 100;100 0;100 0"/></circle>`;
  const hand=(len,w,c,deg0,deg1,tail)=>`<g><animateTransform attributeName="transform" type="rotate" dur="${D}s" repeatCount="indefinite" keyTimes="0;.1;.8;1" values="${deg0} ${cx} ${cy};${deg0} ${cx} ${cy};${deg1} ${cx} ${cy};${deg1} ${cx} ${cy}"/><path d="M${cx-w/2},${cy+(tail||12)} L${cx-w/3},${cy-len} L${cx},${cy-len-6} L${cx+w/3},${cy-len} L${cx+w/2},${cy+(tail||12)}Z" fill="${c}"/></g>`;
  b+=hand(R*.5,8,'#0f172a',90,120)+hand(R*.78,6,'#1e293b',0,360);
  b+=`<g><animateTransform attributeName="transform" type="rotate" dur="${D/12}s" repeatCount="indefinite" values="0 ${cx} ${cy};360 ${cx} ${cy}"/><line x1="${cx}" y1="${cy+18}" x2="${cx}" y2="${cy-R+10}" stroke="#dc2626" stroke-width="2"/><circle cx="${cx}" cy="${cy-R+26}" r="3.5" fill="#dc2626"/></g>`;
  b+=`<circle cx="${cx}" cy="${cy}" r="7" fill="#dc2626" stroke="#7f1d1d"/><circle cx="${cx}" cy="${cy}" r="2.5" fill="#fca5a5"/><path d="M${cx-R},${cy} A${R},${R} 0 0 1 ${cx+R*.7},${cy-R*.7} L${cx-R*.2},${cy+R*.2}Z" fill="url(#${u}g)"/>`;
  b+=zT(130,cy,txt,'#0369a1')+`<g class="kPl" style="--d:.1s">${zT(530,cy-40,'1 h = 60 min','#b45309')}${zT(530,cy+10,'1 min = 60 s','#7c3aed')}</g>`;
  return svg(W,H,b,'kScene')}
function fDispR(o){/* سيارة على طريق: تتحرك غربا 6 km ثم ترجع شرقا 2 km، والإزاحة من A إلى C */
  o=o||{};const W=640,H=400,D=10,RY=196,K=70,A=560,B=A-6*K,C=B+2*K,u='ds'+Math.random().toString(36).slice(2,6);
  let b=gDefs()+gCarDefs()+`<defs><linearGradient id="${u}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3fb"/><stop offset="1" stop-color="#eef7fd"/></linearGradient><linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4b5563"/><stop offset="1" stop-color="#1f2937"/></linearGradient><linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86c46a"/><stop offset="1" stop-color="#4d8f3a"/></linearGradient></defs>`;
  b+=`<rect width="${W}" height="${H}" fill="url(#${u}s)"/><path d="M0,140 Q80,96 170,128 T340,118 T520,124 T640,112 L640,170 L0,170Z" fill="#a7c99a" opacity=".7"/><path d="M0,156 Q120,128 250,150 T470,146 T640,140 L640,175 L0,175Z" fill="#7fb36b"/>`;
  b+=`<rect x="0" y="168" width="${W}" height="${H-168}" fill="url(#${u}g)"/><rect x="0" y="${RY-26}" width="${W}" height="56" fill="url(#${u}a)"/><rect x="0" y="${RY-28}" width="${W}" height="3" fill="#e5e7eb"/><rect x="0" y="${RY+28}" width="${W}" height="3" fill="#e5e7eb"/>`;
  for(let x=-10;x<W;x+=44)b+=`<rect x="${x}" y="${RY-1.5}" width="24" height="3" fill="#fde047"/>`;
  /* لافتات النقاط وتدريج المسافة */
  for(let i=0;i<=6;i++){const x=A-i*K;b+=`<line x1="${x}" y1="${RY+36}" x2="${x}" y2="${RY+44}" stroke="#14532d" stroke-width="2"/><text x="${x}" y="${RY+58}" font-size="12" font-weight="800" text-anchor="middle" fill="#14532d" direction="ltr">${i} km</text>`}
  b+=`<line x1="${B}" y1="${RY+40}" x2="${A}" y2="${RY+40}" stroke="#14532d" stroke-width="1.5"/>`;
  [['A',A],['B',B],['C',C]].forEach(([t,x])=>{b+=`<rect x="${x-2}" y="${RY-74}" width="4" height="48" fill="#64748b"/><circle cx="${x}" cy="${RY-82}" r="15" fill="#fff" stroke="#0f172a" stroke-width="2.5"/><text x="${x}" y="${RY-76}" font-size="17" font-weight="900" text-anchor="middle" fill="#0f172a">${t}</text>`});
  /* البوصلة */
  {const x=86,y=46;b+=`<circle cx="${x}" cy="${y}" r="30" fill="#fff" opacity=".85" stroke="#334155"/><path d="M${x},${y-24} L${x+6},${y} L${x},${y+24} L${x-6},${y}Z" fill="#94a3b8"/><path d="M${x-24},${y} L${x},${y-6} L${x+24},${y} L${x},${y+6}Z" fill="#475569"/><text x="${x}" y="${y-31}" font-size="11" font-weight="900" text-anchor="middle" fill="#0f172a">شمال</text><text x="${x-48}" y="${y+5}" font-size="13" font-weight="900" text-anchor="middle" fill="#1d4ed8">غرب</text><text x="${x+48}" y="${y+5}" font-size="13" font-weight="900" text-anchor="middle" fill="#b91c1c">شرق</text></g>`.replace('</g>','')}
  /* أسهم المسار: الأزرق غربا ثم الأحمر شرقا، يرسمان مع الحركة */
  const kt='0;.05;.38;.48;.68;1',arr=(x1,x2,y,c,lab,lx,k0,k1)=>{const L=Math.abs(x2-x1),dir=Math.sign(x2-x1);return `<g><line x1="${x1}" y1="${y}" x2="${x2-dir*10}" y2="${y}" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${L} ${L}" stroke-dashoffset="${L}"><animate attributeName="stroke-dashoffset" dur="${D}s" repeatCount="indefinite" keyTimes="0;${k0};${k1};1" values="${L};${L};0;0"/></line><path d="M${x2},${y} l${-dir*16},-9 l0,18Z" fill="${c}" opacity="0"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="0;${k1};${k1+.01};1" values="0;0;1;1"/></path><text x="${lx}" y="${y-10}" font-size="15" font-weight="900" text-anchor="middle" fill="${c}" opacity="0">${lab}<animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" keyTimes="0;${k1};${k1+.01};1" values="0;0;1;1"/></text></g>`};
  b+=arr(A,B,RY-104,'#1d4ed8','6 km غربا',(A+B)/2,.05,.38)+arr(B,C,RY+140,'#dc2626','2 km شرقا',(B+C)/2,.48,.68);
  /* السيارة: تتجه غربا ثم تستدير شرقا */
  const sc=.4,cw=260*sc,cy=RY+12,car=(face,vis)=>`<g opacity="${vis[0]}"><animate attributeName="opacity" dur="${D}s" repeatCount="indefinite" calcMode="discrete" keyTimes="0;.43;1" values="${vis.join(';')}"/>${face<0?`<g transform="translate(${A} 0) scale(-1 1) translate(${-A} 0)">${gCarS(A-cw/2,cy,sc,D,.5,3.8,6)}</g>`:gCarS(A-cw/2,cy,sc,D,4.8,6.8,2)}</g>`;
  b+=`<g><animateTransform attributeName="transform" type="translate" dur="${D}s" repeatCount="indefinite" keyTimes="${kt}" values="0 0;0 0;${B-A} 0;${B-A} 0;${C-A} 0;${C-A} 0"/>${car(-1,[1,0,0])}${car(1,[0,1,1])}</g>`;
  if(o.res!==false)b+=`<g class="${o.show?'':'kPl'}" style="--d:.1s">${vArr(A,RY+92,C,RY+92,'#16a34a',8)}<text x="${(A+C)/2}" y="${RY+80}" font-size="15" font-weight="900" text-anchor="middle" fill="#15803d">الإزاحة</text></g>`;
  return svg(W,H,b,'kScene')}

const P13=(re,fn,res,cap)=>[re,()=>pRes(fn(),res),cap];
PFIG['0-1']=[P13(/500 cm/,()=>qMeter({lab:'500 cm = ? m'}),'= 5 m','500 cm = 500 / 100 = 5 m')];
PFIG['0-2']=[
  P13(/2 kg إلى جرام/,()=>pScale('2 kg'),'= 2000 g','2 kg = 2 × 1000 = 2000 g'),
  P13(/20 km\/h/,()=>fTrack({a:'v = 20 km/h'}),'= 5.56 m/s','20 km/h = 20 / 3.6 = 5.56 m/s'),
  P13(/3 m إلى سنتيمتر/,()=>qMeter({lab:'3 m = ? cm'}),'= 300 cm','3 m = 3 × 100 = 300 cm'),
  P13(/500 g إلى كيلوجرام/,()=>pScale('500 g'),'= 0.5 kg','500 g = 500 / 1000 = 0.5 kg'),
  P13(/4\.4 m\/s/,()=>fTrack({a:'v = 4.4 m/s'}),'= 15.84 km/h','4.4 m/s = 4.4 × 3.6 = 15.84 km/h'),
  P13(/5 m\/s إلى km\/h/,()=>fTrack({a:'v = 5 m/s'}),'= 18 km/h','5 m/s = 5 × 3.6 = 18 km/h'),
  P13(/نانومتر/,()=>qMeter({lab:'1 m = ? nm'}),'= 10⁹ nm','1 m = 10⁹ nm'),
  P13(/km²/,()=>pArea('1 km'),'= 10⁶ m²','1 km² = (1000 m)² = 10⁶ m²'),
  P13(/1 h إلى ثوان/,()=>pWatch('t = 1 h'),'= 3600 s','1 h = 60 × 60 = 3600 s')];
PFIG['0-4']=[
  P13(/A = 4 و B = 6/,()=>vRes({A:4,B:6,t:60,res:'C = ?'}),'C ≈ 8.72','C = √(A² + B² + 2AB cos θ) ≈ 8.72'),
  P13(/A = 6 و B = 9/,()=>vRes({A:6,B:9,t:120,s:18,res:'C = ?'}),'C ≈ 7.94','C = √(36 + 81 + 2 × 6 × 9 × cos 120°) ≈ 7.94'),
  P13(/A = 2 و B = 3/,()=>vRes({A:2,B:3,t:60,s:40,res:'C = ?'}),'C ≈ 4.36','C = √(4 + 9 + 2 × 2 × 3 × cos 60°) ≈ 4.36')];
PFIG['0-5']=[
  P13(/A = 4 .*السينية Ax/,()=>vComp({A:4,t:60}),'Aₓ = 2','Aₓ = A cos θ = 4 × cos 60° = 2'),
  P13(/A = 4 .*الصادية Ay/,()=>vComp({A:4,t:60}),'Aᵧ ≈ 3.46','Aᵧ = A sin θ = 4 × sin 60° ≈ 3.46'),
  P13(/A = 6 .*السينية Ax/,()=>vComp({A:6,t:45,s:30}),'Aₓ ≈ 4.24','Aₓ = 6 × cos 45° ≈ 4.24'),
  P13(/A = 6 .*الصادية Ay/,()=>vComp({A:6,t:45,s:30}),'Aᵧ ≈ 4.24','Aᵧ = 6 × sin 45° ≈ 4.24'),
  P13(/A = 8 بزاوية 30°/,()=>vComp({A:8,t:30,s:24}),'Aₓ ≈ 6.93','Aₓ = 8 × cos 30° ≈ 6.93'),
  P13(/A = 8 .*الصادية Ay/,()=>vComp({A:8,t:30,s:24}),'Aᵧ = 4','Aᵧ = 8 × sin 30° = 4')];
PFIG['0-6']=[
  P13(/A = 3î − 4ĵ، أوجد مقداره/,()=>vUnit(),'|A| = 5','|A| = √(3² + 4²) = 5'),
  P13(/B = −2î \+ 3k̂، أوجد مقداره/,()=>vUnit(),'|B| ≈ 3.6','|B| = √(2² + 3²) ≈ 3.6'),
  P13(/A = 3î − 4ĵ و B = −2î/,()=>vDot(),'A·B = −6','A·B = (3)(−2) + (−4)(0) + (0)(3) = −6'),
  P13(/10 و 5 .*الضرب القياسي/,()=>vDot(),'A·B = 25','A·B = 10 × 5 × cos 60° = 25'),
  P13(/10 و 5 .*الاتجاهي/,()=>vCross(),'|A×B| ≈ 43.3','|A×B| = 10 × 5 × sin 60° ≈ 43.3'),
  P13(/A = 2î \+ 3ĵ، أوجد مقداره/,()=>vUnit(),'|A| ≈ 3.61','|A| = √(2² + 3²) ≈ 3.61'),
  P13(/B = −3î \+ 3ĵ\. أوجد/,()=>vUnit(),'|B| ≈ 4.24','|B| = √(3² + 3²) ≈ 4.24'),
  P13(/A = 2î \+ 3ĵ و B = −3î/,()=>vDot(),'A·B = 3','A·B = (2)(−3) + (3)(3) = 3'),
  P13(/A = 8 و B = 6 .*القياسي/,()=>vDot(),'A·B ≈ 41.57','A·B = 8 × 6 × cos 30° ≈ 41.57'),
  P13(/A = 8 و B = 6 .*الاتجاهي/,()=>vCross(),'|A×B| = 24','|A×B| = 8 × 6 × sin 30° = 24')];
PFIG['1-1']=[
  P13(/120 m في زمن مقداره 10 s/,()=>fTrack({a:'t = 10 s',x:'x = 120 m'}),'v̄ = 12 m/s','v̄ = x / t = 120 / 10 = 12 m/s'),
  P13(/من 20 m\/s إلى 80 m\/s/,()=>fTrack({a:'vi = 20 m/s',b:'a = ?',c:'vf = 80 m/s',x:'t = 3 s'}),'a = 20 m/s²','a = (80 − 20) / 3 = 20 m/s²'),
  P13(/6 km غرب/,()=>fDispR(),'Δx = 4 km غربا','Δx = 6 km − 2 km = 4 km (غربا)'),
  P13(/100 m في زمن مقداره 5 s/,()=>fTrack({a:'t = 5 s',x:'x = 100 m'}),'v̄ = 20 m/s','v̄ = 100 / 5 = 20 m/s'),
  P13(/من 30 m\/s إلى 90 m\/s/,()=>fTrack({a:'vi = 30 m/s',b:'a = ?',c:'vf = 90 m/s',x:'t = 5 s'}),'a = 12 m/s²','a = (90 − 30) / 5 = 12 m/s²'),
  P13(/300 m خلال 10 s/,()=>fTrack({a:'t = 10 s',x:'x = 300 m'}),'v̄ = 30 m/s','v̄ = 300 / 10 = 30 m/s'),
  P13(/من السكون وبعد زمن مقداره 5 s/,()=>fTrack({a:'vi = 0',b:'a = ?',c:'vf = 20 m/s',x:'t = 5 s'}),'a = 4 m/s²','a = (20 − 0) / 5 = 4 m/s²')];
PFIG['1-2']=[
  P13(/سرعتها 5 m\/s ثم توقفت/,()=>fTrack({a:'vi = 5 m/s',c:'vf = 0',x:'x = 20 m'}),'t = 8 s','x = ½ (vi + vf) t ← t = 2 × 20 / 5 = 8 s'),
  P13(/13 m\/s .*26 m\/s/,()=>fTrack({a:'vi = 13 m/s',b:'a = ثابت',c:'vf = 26 m/s',x:'t = 10 s'}),'x = 195 m','x = ½ (13 + 26) × 10 = 195 m'),
  P13(/110 m في زمن مقداره 5 s/,()=>fTrack({a:'vi = 0',b:'a = ?',c:'t = 5 s',x:'x = 110 m'}),'a = 8.8 m/s²','x = ½ a t² ← a = 2 × 110 / 25 = 8.8 m/s²'),
  P13(/4 m\/s² وقطعت مسافة مقدارها 20 m/,()=>fTrack({a:'vi = 0',b:'a = 4 m/s²',c:'vf = ?',x:'x = 20 m'}),'vf ≈ 12.65 m/s','vf² = 2 a x = 160 ← vf ≈ 12.65 m/s'),
  P13(/سرعتها 10 m\/s توقفت/,()=>fTrack({a:'vi = 10 m/s',c:'vf = 0',x:'x = 30 m'}),'t = 6 s','t = 2 x / (vi + vf) = 60 / 10 = 6 s'),
  P13(/10 m\/s .*30 m\/s في 5 s/,()=>fTrack({a:'vi = 10 m/s',b:'a = ثابت',c:'vf = 30 m/s',x:'t = 5 s'}),'x = 100 m','x = ½ (10 + 30) × 5 = 100 m'),
  P13(/10 m\/s²، أوجد سرعته بعد مرور 3 s/,()=>fTrack({a:'vi = 0',b:'a = 10 m/s²',c:'vf = ?',x:'t = 3 s'}),'vf = 30 m/s','vf = vi + a t = 0 + 10 × 3 = 30 m/s'),
  P13(/10 m\/s وزادت سرعتها بتسارع مقداره 2 m\/s²/,()=>fTrack({a:'vi = 10 m/s',b:'a = 2 m/s²',c:'vf = ?',x:'t = 8 s'}),'vf = 26 m/s','vf = 10 + 2 × 8 = 26 m/s'),
  P13(/5 m\/s² لمدة 5 s/,()=>fTrack({a:'vi = 0',b:'a = 5 m/s²',c:'t = 5 s',x:'x = ?'}),'x = 62.5 m','x = ½ a t² = ½ × 5 × 25 = 62.5 m')];
PFIG['1-3']=[
  P13(/5 kg يتسارع بمعدل مقداره 17/,()=>fCylF({m:'5 kg',F:'F = ?',a:'a = 17 m/s²'}),'F = 85 N','F = m a = 5 × 17 = 85 N'),
  P13(/1000 kg أثرت عليها قوة مقدارها 30000/,()=>fTrack({a:'m = 1000 kg',b:'F = 30000 N',c:'a = ?'}),'a = 30 m/s²','a = F / m = 30000 / 1000 = 30 m/s²'),
  P13(/50 N تؤثر على صندوق كتلته 10 kg/,()=>fPull({F:'F = 50 N',note:'m = 10 kg · t = 3 s'}),'vf = 15 m/s','a = 50 / 10 = 5 m/s² ← vf = 5 × 3 = 15 m/s'),
  P13(/20 kg على سطح أملس/,()=>fPull({F:'F = 80 N',note:'m = 20 kg · t = 4 s'}),'x = 32 m','a = 80 / 20 = 4 m/s² ← x = ½ × 4 × 16 = 32 m'),
  P13(/100 kg، ما وزنه/,()=>fStand({m:'100 kg',W:'W = ?'}),'W = 980 N','W = m g = 100 × 9.8 = 980 N'),
  P13(/3 kg إذا كان يتسارع بمعدل 10/,()=>fCylF({m:'3 kg',F:'F = ?',a:'a = 10 m/s²'}),'F = 30 N','F = 3 × 10 = 30 N'),
  P13(/2000 kg تؤثر عليها قوة مقدارها 30000/,()=>fTrack({a:'m = 2000 kg',b:'F = 30000 N',c:'a = ?'}),'a = 15 m/s²','a = 30000 / 2000 = 15 m/s²'),
  P13(/50 N أكسبت جسمًا تسارعًا مقداره 2/,()=>fCylF({m:'m = ?',F:'F = 50 N',a:'a = 2 m/s²'}),'m = 25 kg','m = F / a = 50 / 2 = 25 kg'),
  P13(/120 kg، أوجد وزنه/,()=>fStand({m:'120 kg',W:'W = ?'}),'W = 1176 N','W = 120 × 9.8 = 1176 N'),
  P13(/4 kg تسارعًا مقداره 3/,()=>fCylF({m:'4 kg',F:'F = ?',a:'a = 3 m/s²'}),'F = 12 N','F = 4 × 3 = 12 N'),
  P13(/سهم كتلته 0\.25 kg/,()=>fCylF({m:'0.25 kg',F:'F = 47 N',a:'a = ?'}),'a = 188 m/s²','a = 47 / 0.25 = 188 m/s²'),
  P13(/2000 kg تتحرك بتسارع 3/,()=>fTrack({a:'m = 2000 kg',b:'a = 3 m/s²',c:'F = ?'}),'F = 6000 N','F = 2000 × 3 = 6000 N')];
PFIG['1-5']=[
  P13(/وزنه 40 N ينزلق/,()=>fPull({f:'fk = ?',N:'N = 40 N',W:'W = 40 N'}),'fk = 8 N','fk = μk N = 0.2 × 40 = 8 N'),
  P13(/العمودية مقدارها 30 N/,()=>fPull({f:'fk = 3 N',N:'N = 30 N'}),'μk = 0.1','μk = fk / N = 3 / 30 = 0.1'),
  P13(/5 kg على طاولة، ومعامل الاحتكاك السكوني 0\.4/,()=>fPull({F:'F = 15 N',f:'fs(max) = ?',N:'N = 49 N',W:'W = 49 N'}),'fs(max) = 19.6 N','fs = 0.4 × 49 = 19.6 N > 15 N: لا يتحرك'),
  P13(/وزنه 20 N ينزلق/,()=>fPull({f:'fk = ?',N:'N = 20 N',W:'W = 20 N'}),'fk = 2 N','fk = 0.1 × 20 = 2 N'),
  P13(/العمودية 20 N وقوة الاحتكاك الحركي 2 N/,()=>fPull({f:'fk = 2 N',N:'N = 20 N'}),'μk = 0.1','μk = 2 / 20 = 0.1'),
  P13(/2 kg على سطح أفقي/,()=>fPull({F:'F = 10 N',f:'fs(max) = ?',N:'N = 19.6 N',W:'W = 19.6 N'}),'fs(max) = 3.92 N','fs = 0.2 × 19.6 = 3.92 N < 10 N: يتحرك'),
  P13(/الصلب يتحرك على سطح من النحاس/,()=>fPull({f:'fk = ?',N:'N = 70 N'}),'fk = 21 N','fk = 0.3 × 70 = 21 N')];
PFIG['1-7']=[
  P13(/50 N أزاحت جسمًا مسافة مقدارها 200 m/,()=>fPull({F:'F = 50 N',x:'x = 200 m'}),'W = 10000 J','W = F x = 50 × 200 = 10000 J'),
  P13(/100 N بزاوية مقدارها 60°/,()=>fPull({ang:60,Fa:'F = 100 N',x:'x = 8 m'}),'W = 400 J','W = F x cos θ = 100 × 8 × 0.5 = 400 J'),
  P13(/0\.2 kg يتحرك بتسارع/,()=>fPull({F:'F = m a',x:'x = 0.8 m',note:'m = 0.2 kg · a = 2 m/s²'}),'W = 0.32 J','F = 0.2 × 2 = 0.4 N ← W = 0.4 × 0.8 = 0.32 J'),
  P13(/30 N أزاحت جسمًا مسافة مقدارها 100 m/,()=>fPull({F:'F = 30 N',x:'x = 100 m'}),'W = 3000 J','W = 30 × 100 = 3000 J'),
  P13(/لم يستطع تحريكه/,()=>fPull({F:'F = 200 N',note:'الجسم لم يتحرك: x = 0'}),'W = 0 J','W = F x = 200 × 0 = 0 J'),
  P13(/10 N على عربة صغيرة/,()=>fPull({F:'F = 10 N',x:'x = 5 m'}),'W = 50 J','W = 10 × 5 = 50 J'),
  P13(/50 N تصنع زاوية مقدارها 60°/,()=>fPull({ang:60,Fa:'F = 50 N',x:'x = 3 m'}),'W = 75 J','W = 50 × 3 × cos 60° = 75 J')];
PFIG['1-8']=[
  P13(/45 kg يتحرك بسرعة مقدارها 13/,()=>fTrack({a:'m = 45 kg',c:'v = 13 m/s'}),'KE = 3802.5 J','KE = ½ m v² = ½ × 45 × 169 = 3802.5 J'),
  P13(/3 m\/s وطاقتها الحركية 18 J/,()=>fTrack({a:'m = ?',b:'KE = 18 J',c:'v = 3 m/s'}),'m = 4 kg','m = 2 KE / v² = 36 / 9 = 4 kg'),
  P13(/5 kg على حافة ارتفاعها 3 m/,()=>fStand({m:'5 kg',h:'h = 3 m',pe:'PE = ?'}),'PE = 147 J','PE = m g h = 5 × 9.8 × 3 = 147 J'),
  P13(/20 kg يتحرك بسرعة مقدارها 10/,()=>fTrack({a:'m = 20 kg',c:'v = 10 m/s'}),'KE = 1000 J','KE = ½ × 20 × 100 = 1000 J'),
  P13(/2 kg على ارتفاع 5 m/,()=>fStand({m:'2 kg',h:'h = 5 m',pe:'PE = ?'}),'PE = 98 J','PE = 2 × 9.8 × 5 = 98 J'),
  P13(/8 kg ويتحرك بسرعة 5/,()=>fTrack({a:'m = 8 kg',c:'v = 5 m/s'}),'KE = 100 J','KE = ½ × 8 × 25 = 100 J'),
  P13(/15 kg موضوع على ارتفاع مقداره 3 m/,()=>fStand({m:'15 kg',h:'h = 3 m',pe:'PE = ?'}),'PE = 441 J','PE = 15 × 9.8 × 3 = 441 J')];
PFIG['1-9']=[
  P13(/12 J وطاقة الوضع له 35 J/,()=>fFall({me:'KE = 12 J · PE = 35 J'}),'ME = 47 J','ME = KE + PE = 12 + 35 = 47 J'),
  P13(/قط كتلته 1 kg/,()=>fFall({me:'m = 1 kg · v = 6 m/s'}),'h ≈ 1.84 m','½ m v² = m g h ← h = 36 / 19.6 ≈ 1.84 m'),
  P13(/10 J وطاقة الوضع له 30 J/,()=>fFall({me:'KE = 10 J · PE = 30 J'}),'ME = 40 J','ME = 10 + 30 = 40 J')];
PFIG['2-1']=[
  P13(/300°C\. ما قيمتها بالكلفن/,()=>pTemp('TC = 300 °C',null,'K'),'TK = 573 K','TK = 300 + 273 = 573 K'),
  P13(/72°F/,()=>pTemp('TF = 72 °F',null,'C'),'TC ≈ 22.2 °C','TC = (72 − 32) / 1.8 ≈ 22.2 °C'),
  P13(/300°C، فما درجة حرارته على مقياس فهرنهايت/,()=>pTemp('TC = 300 °C',null,'F'),'TF = 572 °F','TF = 1.8 × 300 + 32 = 572 °F'),
  P13(/200°C\. ما قيمتها بالكلفن/,()=>pTemp('TC = 200 °C',null,'K'),'TK = 473 K','TK = 200 + 273 = 473 K'),
  P13(/150°C\. كم تساوي بالفهرنهايت/,()=>pTemp('TC = 150 °C',null,'F'),'TF = 302 °F','TF = 1.8 × 150 + 32 = 302 °F'),
  P13(/80°F/,()=>pTemp('TF = 80 °F',null,'C'),'TC ≈ 26.7 °C','TC = (80 − 32) / 1.8 ≈ 26.7 °C'),
  P13(/الرياض 30°C/,()=>pTemp('TC = 30 °C',null,'F'),'TF = 86 °F','TF = 1.8 × 30 + 32 = 86 °F'),
  P13(/300 K/,()=>pTemp('TK = 300 K','#2563eb','F'),'TF = 80.6 °F','TC = 300 − 273 = 27 ← TF = 1.8 × 27 + 32 = 80.6 °F'),
  P13(/20°C إلى كلفن/,()=>pTemp('TC = 20 °C','#2563eb','K'),'TK = 293 K','TK = 20 + 273 = 293 K'),
  P13(/95°F/,()=>pTemp('TF = 95 °F',null,'C'),'TC = 35 °C','TC = (95 − 32) / 1.8 = 35 °C'),
  P13(/42°C/,()=>pTemp('TC = 42 °C',null,'F'),'TF = 107.6 °F','TF = 1.8 × 42 + 32 = 107.6 °F')];
PFIG['2-3']=[
  P13(/100 g ماء من 10°C إلى 30°C/,()=>hHeat({m:'m = 0.1 kg',Ti:'Ti = 10 °C',Tf:'Tf = 30 °C',dT:'ΔT = 20 °C',Q:'Q = ?'}),'Q = 8360 J','Q = m c ΔT = 0.1 × 4180 × 20 = 8360 J'),
  P13(/نحاس كتلته 20 g، حرارته النوعية 400/,()=>pMetal('m = 0.02 kg · c = 400'),'C = 8 J/°C','C = m c = 0.02 × 400 = 8 J/°C'),
  P13(/نحاس كتلتها 20 g سُخّنت/,()=>pMetal('m = 0.02 kg · c = 400','Ti = 20 °C · Tf = 100 °C'),'Q = 640 J','Q = 0.02 × 400 × 80 = 640 J'),
  P13(/20 g ماء من 30°C إلى 90°C/,()=>hHeat({m:'m = 0.02 kg',Ti:'Ti = 30 °C',Tf:'Tf = 90 °C',dT:'ΔT = 60 °C',Q:'Q = ?'}),'Q = 5016 J','Q = 0.02 × 4180 × 60 = 5016 J'),
  P13(/الحديد كتلتها 0\.5 kg/,()=>pMetal('m = 0.5 kg · c = 460'),'C = 230 J/°C','C = 0.5 × 460 = 230 J/°C'),
  P13(/امتص 600 J/,()=>pMetal('m = 0.02 kg · Q = 600 J','ΔT = 80 °C'),'c = 375 J/(kg·°C)','c = Q / (m ΔT) = 600 / (0.02 × 80) = 375'),
  P13(/سعته الحرارية 270/,()=>pMetal('C = 270 J/°C · c = 900'),'m = 0.3 kg','m = C / c = 270 / 900 = 0.3 kg'),
  P13(/قدرته 200 W/,()=>hHeat({m:'m = 0.1 kg',Ti:'Ti = 23 °C',Tf:'Tf = 100 °C',dT:'P = 200 W',Q:'t = ?'}),'t ≈ 161.2 s','Q = 0.1 × 4187 × 77 = 32239.9 J ← t = Q / P ≈ 161.2 s'),
  P13(/صهر 4 kg من الجليد/,()=>hMelt({Q:'Q = 1344000 J'}),'H = 336000 J/kg','H = Q / m = 1344000 / 4 = 336000 J/kg'),
  P13(/لصهر 20 g جليد/,()=>hMelt({Q:'Q = ?'}),'Q = 6720 J','Q = m H = 0.02 × 336000 = 6720 J'),
  P13(/قطعة حديد كتلتها 3 kg عند 560°C/,()=>hMelt({Q:'m(جليد) = ?'}),'m ≈ 2.3 kg','Q = 3 × 460 × 560 = 772800 J ← m = 772800 / 336000 ≈ 2.3 kg'),
  P13(/بقية الجليد/,()=>hMelt({Q:'m = 0.7 kg'}),'Q = 235200 J','Q = 0.7 × 336000 = 235200 J')];
PFIG['2-5']=[
  P13(/الحرارة التي اكتسبها الماء/,()=>hCal({T1:'T1 = ?',T2:'T2 = 21 °C',Tf:'Tf = 25 °C'}),'Q2 = 2511.6 J','Q2 = 0.15 × 4186 × (25 − 21) = 2511.6 J'),
  P13(/فقد 2511\.6 J/,()=>hCal({T1:'T1 = ?',T2:'Q = 2511.6 J',Tf:'Tf = 25 °C'}),'T1 ≈ 80.9 °C','T1 − 25 = 2511.6 / (0.05 × 899) ← T1 ≈ 80.9 °C')];
function probFig(K2,p){const L=PFIG[K2];if(!L)return null;const m=L.find(([re])=>re.test(String(p.q||'').replace(/`/g,'')));if(!m)return null;defs();
  const d=document.createElement('div');d.className='kc kFig kProb';d.dataset.cap=m[2];TS=/^3-[56]$/.test(K2)?1.8:/^[012]-\d$/.test(K2)?1.3:1;let fg;try{fg=m[1]()}finally{TS=1}d.innerHTML=fg+'<div class="kCap">'+(K2==='3-3'?'يظهر سهم المجال واتجاهه بعد أن تحسب':/^(3-[456]|4-[158]|[012]-\d)$/.test(K2)?'تظهر النتيجة على الرسم بعد أن تحسب':'تظهر أسهم القوى واتجاهها بعد أن تحسب القوة')+'</div>';return d}
function probDone(el){if(!el)return;el.classList.add('kOn');const c=el.querySelector('.kCap');if(c){c.textContent=el.dataset.cap||'';c.dir='auto';c.style.unicodeBidi='plaintext'}}

/* حرارة: جسم ساخن وجسم بارد يتلامسان (سؤال الربط بالدرس السابق) */
function heat(){/*heatFloor: المدرب 9 نوفمبر: المكعبان على الأرضية لا معلقان*/const W=640,H=260,FY=140;let b=stage(W,H,FY)+'<ellipse cx="296" cy="193" rx="170" ry="9" fill="#0f172a" opacity=".22"/>';
  const cube=(x,c1,c2,c3,t)=>`<g><polygon points="${x},110 ${x+110},110 ${x+140},88 ${x+30},88" fill="${c1}"/><polygon points="${x+110},110 ${x+140},88 ${x+140},168 ${x+110},190" fill="${c3}"/><rect x="${x}" y="110" width="110" height="80" fill="${c2}"/><text x="${x+55}" y="158" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${t}</text></g>`;
  b+=cube(150,'#fca5a5','#dc2626','#991b1b','ساخن')+cube(262,'#93c5fd','#2563eb','#1e3a8a','بارد');
  b+=arrow(215,375,70,'F',.1,10)+`<text x="300" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#b45309">الحرارة تنتقل من الجسم الساخن إلى البارد</text>`;
  return svg(W,H,b,'kAuto')}
function lawFig(){return `<div class="kLawBox"><div class="kLawF"><bdi dir="ltr">F = k · q₁ · q₂ / r²</bdi></div><div class="kLawT"><span>F القوة (N)</span><span>k ثابت كولوم</span><span>q₁ و q₂ الشحنتان (C)</span><span>r المسافة (m)</span></div></div>`}
function solveFig(){return `<div class="kLawBox"><div class="kLawF kStep1"><bdi dir="ltr">F = k · q₁ · q₂ / r²</bdi></div><div class="kLawA">↓ نضرب في r² ونقسم على k·q₂</div><div class="kLawF kStep2"><bdi dir="ltr">q₁ = ?</bdi></div></div>`}
const QFIG={'3-1':{r:()=>svg2(heat()),s:()=>svg2(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'r',cls:'kAuto'}))+lawFig(),i:()=>svg2(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'2r',cls:'kAuto'}))+'<div class="kLawBox"><div class="kLawF"><bdi dir="ltr">F = k · q₁ · q₂ / r²</bdi></div></div>',m:()=>svg2(likeUnlike())}};
QFIG['3-3']={r:()=>svg2(likeUnlike()),s:()=>svg2(eTestQ({q:'q₀',F:'F',E:'',cls:'kAuto'}))+lawE('E = F / q₀',['E شدة المجال (N/C)','F القوة (N)','q₀ شحنة الاختبار (C)']),i:()=>svg2(eTestQ({q:'q₀',F:'F',E:'',cls:'kAuto'}))+lawE('E = F / q₀'),m:()=>svg2(eShapesScene())};
QFIG['3-4']={r:()=>svg2(ePairLines(false)),s:()=>svg2(vDiffFig())+lawE('V = PE / q₀',['V الجهد الكهربائي (V)','PE طاقة الوضع (J)','q₀ شحنة الاختبار (C)']),i:()=>svg2(vDiffFig())+lawE('ΔV = W / q₀'),m:()=>svg2(vKindsFig())};
QFIG['3-5']={r:()=>svg2(vEd({E:'',d:'d',V:'ΔV'})),s:()=>svg2(cCapEx({q:'q',C:'C',V:'V'}))+lawE('C = q / V',['C السعة (F)','q الشحنة (C)','V فرق الجهد (V)']),i:()=>svg2(cPlatesFig())+lawE('C = ε₀·A / d'),m:()=>svg2(cPlatesFig())};
QFIG['3-6']={r:()=>svg2(cPlatesFig()),s:()=>svg2(sParEx({C:['C₁','C₂']}))+lawE('C_total = C₁ + C₂ + C₃'),i:()=>svg2(cCapEx({q:'q',C:'C',V:'V'}))+lawE('V = q / C'),m:()=>svg2(sSerEx({C:['C₁','C₂']}))};
function svg2(x){return `<div class="kc kFig">${x}</div>`}
function decorQ(ct,K2,c){const F=QFIG[K2]&&QFIG[K2][c];if(!F)return;defs();const Q=ct.querySelector('.bQ');if(!Q)return;Q.classList.add('kQz');
  const card=Q.querySelector('.bQcard');if(!card)return;const d=document.createElement('div');d.className='kc kQf';d.innerHTML=F();card.after(d)}
/* ---------- الأنماط ---------- */
const CSS=`
.kQ,.kG,.kR,.kSt,.kUR,.kPt,.kLawBox,.kLawT span,.kG>div{color:#1e293b}.kQ b,.kSt b,.kPt b,.kR b{color:inherit}
.kLesson .kLs{margin:0 0 26px;padding-bottom:18px;border-bottom:1px dashed #c9daf0}.kLesson .kLs:last-child{border-bottom:0}.kLesson .kLst{margin:10px 0}.kLesson .kLs>h3{margin:4px 0 10px}
.kc{--kA:#0B7A70;font-size:inherit;min-width:0;max-width:100%;box-sizing:border-box;overflow-wrap:anywhere}
@media (max-width:999px){.kc .kM{white-space:normal!important;display:inline-block;direction:ltr;text-align:left;max-width:100%;vertical-align:middle}.kG>div{max-width:100%}.board .bContent:has(.kc){font-size:16.5px}}
.kc .kM{font-family:"Noto Sans",system-ui,sans-serif;font-weight:700;white-space:nowrap;unicode-bidi:isolate}
.kTag{display:inline-block;font-size:.72em;font-weight:900;color:#fff;background:var(--kA);border-radius:8px;padding:1px 10px;margin-bottom:4px}
.kQ{background:linear-gradient(180deg,#f3fbfa,#e9f6f4);border:1.5px solid #b7e1db;border-radius:14px;padding:10px 14px;font-weight:700;line-height:1.85;box-shadow:0 6px 16px rgba(11,122,112,.08)}
.kGR{display:flex;gap:10px;flex-wrap:wrap}.kG,.kR{flex:1 1 220px;border-radius:14px;padding:10px 14px;line-height:1.8}
.kG{background:#eef5ff;border:1.5px solid #bfd6ff}.kG>div{display:inline-block;background:#fff;border:1px solid #bfd6ff;border-radius:10px;padding:0 10px;margin:3px 0 3px 6px}.kG .kTag{background:#2563eb}.kR{background:#f0fdf4;border:1.5px solid #bbf7d0;font-weight:700}.kR .kTag{background:#15803d}
.kFig{border-radius:18px;overflow:hidden;background:#eef5fd;box-shadow:0 12px 28px rgba(30,58,95,.16),inset 0 0 0 1.5px #c9daf0}
.kFig svg{display:block;width:100%;height:auto;max-width:none!important}
.kCap{color:#1e3a5f;background:#e3edf9;font-size:.78em;font-weight:700;padding:7px 12px;text-align:center;line-height:1.6;border-top:1px solid #c9daf0}
.kSt{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1.5px solid #e5e9f0;border-radius:14px;padding:8px 12px;line-height:1.85}
.kSt>i{flex:0 0 auto;font-style:normal;width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#0B7A70,#14b8a6);color:#fff;font-weight:900;display:grid;place-items:center;font-size:.8em;margin-top:3px}
.kSt>div,.kRes>div,.kQ>div{min-width:0;flex:1}
.kSt.kDir{background:#fff8eb;border-color:#fcd9a0}.kSt.kDir>i{background:linear-gradient(135deg,#d97706,#f59e0b)}
.kRes{display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#0B7A70,#0e9384 60%,#14b8a6);color:#fff;border-radius:16px;padding:10px 16px;font-weight:900;font-size:1.05em;box-shadow:0 10px 24px rgba(11,122,112,.3)}
.kRes>span{width:32px;height:32px;border-radius:50%;background:#fff;color:#0B7A70;display:grid;place-items:center;font-weight:900}
.kUH,.kUR{display:grid;grid-template-columns:1.3fr .7fr 1.3fr .8fr;gap:8px;align-items:center;text-align:center;border-radius:12px;padding:8px 10px}
.kUH{background:linear-gradient(135deg,#0B7A70,#14b8a6);color:#fff;font-weight:900;font-size:.85em}
.kUR{background:#fff;border:1.5px solid #e5e9f0;font-weight:700}.kUR .kM{font-size:1.1em;color:#1d4ed8}
.kUS .kM{display:inline-block;min-width:2.2em;background:#eef5ff;border:1.5px solid #bfd6ff;border-radius:10px;padding:0 10px;color:#0B7A70}
.kSg{display:inline-grid;place-items:center;width:1.35em;height:1.35em;border-radius:50%;color:#fff;font-weight:900;font-family:system-ui,sans-serif;line-height:1;vertical-align:middle;unicode-bidi:isolate}.kSp{background:radial-gradient(circle at 35% 30%,#fca5a5,#dc2626 60%,#7f1d1d)}.kSn{background:radial-gradient(circle at 35% 30%,#a9c4ff,#2f6fed 60%,#0b2363)}
.kPH,.kPR{grid-template-columns:1.1fr 1fr 1fr!important}.kPR .kM{color:#1e3a5f;font-size:1em}
.kFr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 .15em;line-height:1.25;direction:ltr}.kFr>span:first-child{border-bottom:2px solid currentColor;padding:0 .25em .08em}.kFr>span:last-child{padding:.08em .25em 0}
@media (max-width:599px){.kPR .kM{font-size:.78em;white-space:nowrap}.kPH,.kPR{grid-template-columns:.9fr 1.1fr 1.1fr!important;gap:4px;padding:8px 6px}.kPR>span:first-child{font-size:.9em}}
.kSvg .kSpark{animation:kcSpark 1.2s ease-in-out infinite}@keyframes kcSpark{0%,100%{opacity:.25}50%{opacity:1}}
.kSvg .kSwing{transform-origin:300px 150px;animation:kcSwing 3.5s ease-in-out infinite}@keyframes kcSwing{0%,100%{transform:rotate(0)}50%{transform:rotate(6deg)}}
.kPt{background:#fff;border-inline-start:5px solid var(--kA);border-radius:10px;padding:6px 12px;line-height:1.85}.kPt.kcB{--kA:#2563eb;background:linear-gradient(90deg,#fff,#eff6ff)}.kPt.kcP{--kA:#7c3aed;background:linear-gradient(90deg,#fff,#f5f3ff)}.kPt.kcG{--kA:#16a34a;background:linear-gradient(90deg,#fff,#f0fdf4)}
.kPt.kcA{--kA:#d97706;background:linear-gradient(90deg,#fff,#fffbeb)}.kPt.kcT{--kA:#0B7A70;background:linear-gradient(90deg,#fff,#ecfdf5)}.kPt.kcR{--kA:#db2777;background:linear-gradient(90deg,#fff,#fdf2f8)}
.kPt[class*=" kc"]{box-shadow:0 1px 3px rgba(15,23,42,.08);border:1px solid rgba(15,23,42,.06);border-inline-start:5px solid var(--kA)}
.kPt.kMd>ul,.kPt.kMd>ol{margin:0;padding-inline-start:1.2em}.kPt.kMd>p{margin:0}
html body .board .bTpc .bEnT{margin:0 12px 0 0!important}html body .board .bH .bEnH{display:inline-block;margin:0 14px 0 0;font-size:.62em;vertical-align:middle}/* المدرب 8 نوفمبر 10:54: المصطلح الإنجليزي بجانب عنوان الشريحة أكبر وأوضح */html body .board .bH .bEnH{font-size:.85em;color:#475569}.kApp{display:flex;gap:12px;align-items:center;padding:4px 12px!important;min-height:0}.kApp .kIco{flex:none;width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:2.4em}.kApp .kIco img{width:56px;height:56px;object-fit:contain;filter:drop-shadow(0 3px 4px rgba(0,0,0,.18))}.kApp>div{line-height:1.55}@media(max-width:600px){.kApp{gap:10px;min-height:60px;padding:8px 10px!important}.kApp .kIco,.kApp .kIco img{width:48px;height:48px}}
.kEn{font-size:.72em;font-weight:700;color:#64748b;margin:0 12px 0 0;white-space:nowrap}/* المدرب 8 نوفمبر 12:31: المصطلح الإنجليزي بجانب العناوين الفرعية (مثل Static Electricity) أكبر وأوضح، مثل عنوان الشريحة */html body .kEn{font-size:.85em;color:#475569}
.kTerms{background:#fff;border:1px solid #dbe4f0;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(15,23,42,.08)}
.kTerms .kTc{background:linear-gradient(90deg,#0B7A70,#2563eb);color:#fff;font-weight:800;padding:4px 12px;font-size:.92em}
.kTerms table{width:100%;border-collapse:collapse;font-size:.92em}.kTerms th{background:#f1f5f9;color:#334155;font-weight:800;padding:4px 8px;text-align:start}
.kTerms td{padding:4px 8px;border-top:1px solid #eef2f7;color:#1e293b}.kTerms tr:nth-child(even) td{background:#f8fafc}
.kTerms td.kTen{color:#1d4ed8;font-weight:700;text-align:left;font-family:'Noto Sans',system-ui,sans-serif}.kTerms td.kTs{color:#7c3aed;font-weight:800;text-align:center;font-family:'Noto Sans',system-ui,sans-serif;white-space:nowrap}
.kTerms td.kTs i{font-family:'Times New Roman',serif;font-size:1.1em}
.board .bContent .kFig:has(.kScene){max-width:min(600px,100%,calc((100vh - 120px)*1.9))!important;margin-inline:auto}
@media (max-width:999px){.board .bContent>.bStep.in:has(.kScene){position:static!important}}
.kLaw{text-align:center;font-size:1.35em;padding:6px;color:#0B7A70}
.kSvg .kAr{transform:scaleX(0);opacity:0}.kSvg .kPl{opacity:0}.kSvg .kPl.kOn0{opacity:1}
.kSvg .kFlow{animation:kcFlow 1.1s linear infinite}.kSvg .kFlow.kRep{animation-direction:reverse}
.kSvg .kGlow{animation:kcGlow 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes kcGrow{0%{transform:scaleX(0);opacity:0}60%{opacity:1}80%{transform:scaleX(1.08)}100%{transform:scaleX(1);opacity:1}}
@keyframes kcFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes kcFlow{to{stroke-dashoffset:-26}}
@keyframes kcGlow{0%,100%{opacity:.65;transform:scale(1)}50%{opacity:1;transform:scale(1.12)}}
.kAuto .kAr,.kOn .kAr,.bContent:has(.bStep.in .kDirOn) .kAr{animation:kcGrow .9s cubic-bezier(.2,.9,.3,1.2) var(--d) forwards}
.kAuto .kPl,.kOn .kPl,.bContent:has(.bStep.in .kDirOn) .kPl{animation:kcFade .5s ease var(--d) forwards}
.kThree .kTot .kAr,.kThree .kTot .kPl{animation:none!important;opacity:0}
.kThree .kTot{opacity:0;transition:opacity .5s}.kOn .kThree .kTot,.bContent:has(.bStep.in .kTotOn) .kThree .kTot{opacity:1}
.kOn .kThree .kTot .kAr,.bContent:has(.bStep.in .kTotOn) .kThree .kTot .kAr{animation:kcGrow .9s cubic-bezier(.2,.9,.3,1.2) .2s forwards!important}
.kOn .kThree .kTot .kPl,.bContent:has(.bStep.in .kTotOn) .kThree .kTot .kPl{animation:kcFade .5s ease .5s forwards!important}
.kProb{margin:8px 0 12px}.kProb .kCap{font-size:1.05em;padding:9px 12px;line-height:1.7}
.board .bContent:has(.kc){font-size:clamp(16.5px,min(2.5vw,2.6vh),25px)}
.board .bContent:has(.kc) .bStep.in{margin:0 0 10px}
@media (min-width:1000px){.board .bContent:has(.kFig):not(:has(.bQ)){display:grid;grid-template-columns:1fr 1.08fr;column-gap:18px;align-items:start}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bH{grid-column:1/-1}.board .bContent:has(.kFig):not(:has(.bQ))>.bStep{grid-column:1}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bStep:has(.kFig){grid-column:2;grid-row:2/span 40;position:sticky;top:4px}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bStep:has(.kFig)~.bStep:has(.kFig){grid-row:auto;position:static}
 .board .bContent.kMultiFig{display:block!important}.board .bContent.kMultiFig>.bStep{position:static!important}.board .bContent.kMultiFig .kFig{max-width:min(620px,60vh);margin-inline:auto}}
@media (max-width:999px){.board .bContent:has(.kFig)>.bStep.in:has(.kFig):not(:has(.kAuto)){position:sticky;top:0;z-index:3;background:#fdfdfb;padding-bottom:6px}}
/* المدرب 5 نوفمبر 07:17: الوحدات 1-3 المشهد في منتصف السبورة بعرضها تحت الفقرة على كل الشاشات */
@media (min-width:1000px){html:is([data-kcu="0"],[data-kcu="1"],[data-kcu="2"]) .board .bContent:has(.kFig):not(:has(.bQ)){display:block!important}html:is([data-kcu="0"],[data-kcu="1"],[data-kcu="2"]) .board .bContent:has(.kFig)>.bStep{position:static!important}html:is([data-kcu="0"],[data-kcu="1"],[data-kcu="2"]) .board .bContent .kFig:has(.kScene){max-width:min(640px,100%,calc((100vh - 200px)*1.9))!important;margin:6px auto 12px}}
@media (orientation:landscape) and (max-height:520px){.board .bContent>.bStep.in:has(.kFig){position:static!important}}
@media (min-width:600px) and (max-width:999px){.board .bContent.kMultiFig>.bStep.in{position:static!important}.board .bContent.kMultiFig .kFig{max-width:min(560px,42vh);margin-inline:auto}}
/* أسئلة المدرب الذكي بنفس طريقة العرض */
.bQ.kQz{max-width:860px}
.bQ.kQz .bQcard{background:linear-gradient(180deg,#f3fbfa,#e9f6f4);border-color:#b7e1db;font-weight:700}
.bQ.kQz .kQf{margin:10px 0 12px}.bQ.kQz .kQf .kFig{max-width:620px;margin:0 auto}
.bQ.kQz .bOpts button{background:linear-gradient(180deg,#fff,#f7fafc);border-width:2px;box-shadow:0 6px 0 #e2e8f0,0 10px 18px rgba(15,23,42,.08);transform:translateY(0)}
.bQ.kQz .bOpts button:hover{transform:translateY(-2px)}
.bQ.kQz .bOpts button .bL{background:linear-gradient(135deg,#0B7A70,#14b8a6);color:#fff}
.kLawBox{margin:10px auto 0;max-width:620px;background:linear-gradient(135deg,#f7fbff,#e3edf9);border:1.5px solid #c9daf0;border-radius:16px;padding:14px;color:#1e3a5f;text-align:center;box-shadow:0 10px 24px rgba(10,16,29,.3)}
.kLawF{font:800 1.5em "Noto Sans",system-ui;color:#0B7A70;letter-spacing:.5px}
.kLawT{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:8px}.kLawT span{background:#fff;border:1px solid #c9daf0;border-radius:10px;padding:2px 10px;font-size:.8em}
.kLawA{color:#0369a1;font-weight:800;margin:6px 0;font-size:.9em}.kStep2{color:#7c3aed;animation:kcFade .6s ease .4s both}
@media (prefers-reduced-motion:reduce){.kSvg .kFlow,.kSvg .kGlow{animation:none}}`;
function css(){if(document.getElementById('kcCss'))return;const s=document.createElement('style');s.id='kcCss';s.textContent=CSS;document.head.appendChild(s)}
css();

/* 3-1: عنوان إنجليزي لكل شريحة */
const EN31={'مقدمة الوحدة وأهدافها':'Unit Introduction','أهداف الوحدة':'Unit Objectives','مصطلحات الدرس':'Lesson Terminology','الشحنات الكهربائية':'Electric Charges','الشحنة وجسيمات الذرة':'Charge and Atomic Particles','تصنيف المواد حسب توصيلها للكهرباء':'Conductors, Semiconductors and Insulators','طرق شحن الأجسام بالكهرباء الساكنة':'Methods of Charging','قانون كولوم':"Coulomb's Law",'قانون كولوم وقانون الجذب العام والتشابه بينهما':"Coulomb's Law and Newton's Law of Gravitation",'تطبيقات من الحياة':'Real-Life Applications','ملخص الدرس':'Lesson Summary'};
/* المدرب 31 أكتوبر: الإنجليزي بجانب عنواني «الشحنات الكهربائية» و«قانون كولوم» فقط، والبقية محذوفة */function en(K2,t){if(!/^3-[13-6]$/.test(K2))return '';t=String(t||'');const K=K2==='3-6'?{'التوصيل على التوالي':'Series Connection','التوصيل على التوازي':'Parallel Connection','الطاقة المختزنة في المكثف':'Stored Energy'}:K2==='3-5'?{'السعة الكهربائية':'Capacitance','المكثف ذو اللوحين المتوازيين':'Parallel-Plate Capacitor'}:K2==='3-4'?{'الجهد الكهربائي':'Electric Potential','فرق الجهد بين نقطتين':'Potential Difference'}:K2==='3-3'?{'المجال الكهربائي':'Electric Field','شدة المجال الكهربائي':'Electric Field Strength'}:{'الشحنات الكهربائية':'Electric Charges','قانون كولوم':"Coulomb's Law"};return K[t]||''}
/* 3-1: بطاقات ملونة لكل المحتوى المكتوب حسب نوعه */
function paint(ct,K2,sl){if(!/^3-[13-6]$/.test(K2)||!ct||!sl||sl.type!=='c')return;const T=String(sl.title||''),sum=T==='ملخص الدرس',app=/^تطبيقات/.test(T);let i=0;
  ct.querySelectorAll('.bStep').forEach(st=>{let c=st.firstElementChild;if(!c||st.dataset.kp)return;st.dataset.kp=1;
    if(c.matches('h3,figure,table,.ltWrap,.kFig,.kQ,.kGR,.kSt,.kRes,.kUH,.kUR,.kTerms,.kLawBox,svg'))return;
    if(c.classList.contains('kc')&&!c.classList.contains('kPt'))return;
    if(!c.classList.contains('kc')){if(/^\s*$/.test(st.textContent)||st.querySelector('figure,table,svg,img'))return;const w=document.createElement('div');w.className='kc kPt kMd';while(st.firstChild)w.appendChild(st.firstChild);st.appendChild(w);c=w}
    if(/\bkc[BPGATR]\b/.test(c.className)){i++;return}
    const t=c.textContent.trim();const P=['kcB','kcP','kcG','kcA','kcT','kcR'];
    const k=sum?P[i%6]:app?'kcT':/^(مثال|من الحياة)/.test(t)?'kcG':/(القاعدة|قانون|[FE]\s*=|تتنافر|تتجاذب|الربع|لا تتقاطع)/.test(t)?'kcP':/^(تحويل|مضاعفة|ملاحظة|انتبه|لذلك)/.test(t)?'kcA':/^حيث/.test(t)?'kcA':/(هي|هو|:)/.test(t.slice(0,60))?'kcB':['kcB','kcT','kcR'][i%3];
    c.classList.add(k);i++})}
/* رسوم التجارب (النظرية الفيزيائية) بالمكثف المعتمد */
const LFIG={
 cap:()=>{const W=640,H=375,L=130,R=350,top=110,bot=250,P=plateCap(L,R,top,bot,4,318,'V');let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`+P.svg;
   b+=lblR(L-4+P.g.dx*.5,top-P.g.dy-12,'اللوح الموجب','#b91c1c',15)+lblR(R+16+P.g.dx*.5,top-P.g.dy-12,'اللوح السالب','#1d4ed8',15)+lbl((L+R)/2+P.g.dx*.3,bot-P.g.dy*.5+6,'E','#0f766e',18);
   b+=dim(L,R+2,bot+20,'d')+`<g>${scTag(W-80,top+30,'E = V / d','#0f766e',130)}</g>`+lblR(P.cx+110,362,'مصدر جهد مستمر','#334155',14);return svg(W,H,b,'kAuto')},
 vu:()=>{const W=640,H=375,L=110,R=370,top=110,bot=250,P=plateCap(L,R,top,bot,4,318,'V'),xa=220,xb=300,ya=200;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`+P.svg;
   b+=[xa,xb].map(x=>`<line x1="${x}" y1="${top-10}" x2="${x}" y2="${bot}" stroke="#7c3aed" stroke-width="2.2" stroke-dasharray="6 6"/>`).join('');
   b+=`<circle cx="${xa}" cy="${ya}" r="6" fill="#1e3a5f"/><circle cx="${xb}" cy="${ya}" r="6" fill="#1e3a5f"/>`+lbl(xa-14,ya-10,'a','#1e3a5f',16)+lbl(xb+14,ya-10,'b','#1e3a5f',16);
   b+=dim(xa,xb,bot+20,'d')+`<g>${scTag(W-70,top+20,'ΔV = E·d','#0f766e',120)}</g>`+lblR(W-70,top+62,'خطوط تساوي','#7c3aed',14)+lblR(W-70,top+80,'الجهد','#7c3aed',14)+lblR(P.cx+110,362,'مصدر جهد مستمر','#334155',14);return svg(W,H,b,'kAuto')},
 par3:()=>{const W=640,H=475,yb=420;let b=EGR+`<rect width="${W}" height="${H}" fill="url(#kc-bg)"/>`;const P=parCol(3,240,120,100,64,0,yb);
   const ya=P.caps[0].L[1],yt=ya-62,mx=(P.bL+P.bR)/2;b+=rWire(`M${f1(P.bL)},${f1(ya)} V${f1(yt)} H${f1(mx-22)} M${f1(mx+22)},${f1(yt)} H${f1(P.bR)} V${f1(ya)}`,'#1f2937');
   b+=P.svg+`<circle cx="${f1(mx)}" cy="${f1(yt)}" r="21" fill="#fff" stroke="#dc2626" stroke-width="3.5"/>`+lbl(mx,yt+7,'V','#dc2626',20)+lblR(mx,yt-30,'الفولتميتر','#dc2626',14)+jDot(P.bL,ya)+jDot(P.bR,ya);
   const lx=P.oR+30;b+=P.caps.map((c,i)=>`<text x="${f1(lx)}" y="${f1(c.R[1]+6)}" font-size="17" font-weight="900" fill="#1e3a5f" direction="ltr">${'C'+'₁₂₃'[i]}</text>`).join('');
   b+=lbl(P.cx,yb+42,'V','#334155',17)+lblR(P.cx+110,yb+44,'مصدر جهد مستمر','#334155',14);return svg(W,H,b,'kAuto')}};
function labFig(k){defs();return LFIG[k]?LFIG[k]():''}
try{const FG=window.FIGS=window.FIGS||{};const wrap=(f,c)=>({get(){defs();return `<figure class="fig kc">${LFIG[f]()}<figcaption>${c}</figcaption></figure>`},configurable:true});
  Object.defineProperty(FG,'efUniform',wrap('cap','المجال المنتظم بين لوحين متوازيين موصلين بمصدر جهد: خطوط مستقيمة متوازية متساوية التباعد'));
  Object.defineProperty(FG,'vUniform',wrap('vu','فرق الجهد بين النقطتين a و b في المجال المنتظم يساوي E·d، وخطوط تساوي الجهد عمودية على خطوط المجال'))}catch(e){}
window.KC={en,paint,apply,probFig,labFig,probDone,decorQ,has:k=>!!CARDS[k],_pair:pair,_three:three,_atom:atom,_lu:likeUnlike,defs};
})();
