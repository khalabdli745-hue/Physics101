/* بطاقات العرض ثلاثية الأبعاد (الدرس النموذجي: الشحنات الكهربائية وقانون كولوم 3-1)
   - على السبورة: تستبدل شرائح مختارة ببطاقات تظهر أجزاؤها بالتتابع ويقرؤها المدرب الذكي.
   - في الأمثلة والتمارين التفاعلية: رسم ثلاثي الأبعاد فوق السؤال، وتظهر أسهم القوى بعد الحل. */
(function(){
'use strict';
const POSC='#E4572E',NEGC='#2F6FED',FC='#F59E0B',RC='#A855F7';
/* ---------- تعريفات SVG المشتركة (تحقن مرة واحدة) ---------- */
function defs(){if(document.getElementById('kcDefs'))return;
  const d=document.createElement('div');d.id='kcDefs';d.style.cssText='position:absolute;width:0;height:0;overflow:hidden';
  d.innerHTML=`<svg width="0" height="0" aria-hidden="true"><defs>
  <radialGradient id="kc-sP" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff1f1"/><stop offset=".18" stop-color="#fca5a5"/><stop offset=".55" stop-color="#dc2626"/><stop offset="1" stop-color="#5f0a0a"/></radialGradient>
  <radialGradient id="kc-sN" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#f1f6ff"/><stop offset=".18" stop-color="#a9c4ff"/><stop offset=".55" stop-color="#2f6fed"/><stop offset="1" stop-color="#0b2363"/></radialGradient>
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
  </defs></svg>`;document.body.appendChild(d)}
/* ---------- عناصر الرسم ---------- */
const f1=v=>Number(v).toFixed(1);
function stage(w,h,floorY){let g=`<rect width="${w}" height="${h}" fill="url(#kc-bg)"/>`;
  for(let i=0;i<26;i++){const x=(i*97)%w,y=(i*53)%(floorY-20)+6;g+=`<circle cx="${x}" cy="${y}" r="${i%3?0.8:1.3}" fill="#b7c9e8" opacity="${i%2?.0:.0}"/>`}
  g+=`<polygon points="40,${floorY} ${w-40},${floorY} ${w},${h} 0,${h}" fill="url(#kc-fl)"/>`;
  for(let i=1;i<9;i++){const t=i/9,x0=40+(w-80)*t,x1=w*t;g+=`<line x1="${f1(x0)}" y1="${floorY}" x2="${f1(x1)}" y2="${h}" stroke="#9fb3d4" stroke-width="1"/>`}
  for(let i=1;i<4;i++){const y=floorY+(h-floorY)*Math.pow(i/4,1.4),dx=40*(1-(y-floorY)/(h-floorY));g+=`<line x1="${f1(dx)}" y1="${f1(y)}" x2="${f1(w-dx)}" y2="${f1(y)}" stroke="#9fb3d4" stroke-width="1"/>`}
  return g+`<line x1="40" y1="${floorY}" x2="${w-40}" y2="${floorY}" stroke="#7f9cc9" stroke-width="1.5" opacity=".9"/>`}
function sphere(x,y,r,sign,floorY,cls=''){const s=sign==='+'?'P':sign==='-'?'N':'Z',sy=floorY+8;
  return `<g class="kSph ${cls}"><ellipse cx="${x}" cy="${sy}" rx="${f1(r*1.15)}" ry="${f1(r*.28)}" fill="url(#kc-sh)"/>`+
  (s!=='Z'?`<circle class="kGlow" cx="${x}" cy="${y}" r="${f1(r*1.75)}" fill="url(#kc-g${s})"/>`:'')+
  `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#kc-s${s})"/><ellipse cx="${f1(x-r*.34)}" cy="${f1(y-r*.42)}" rx="${f1(r*.3)}" ry="${f1(r*.18)}" fill="#fff" opacity=".6"/>`+
  (s!=='Z'?`<text x="${x}" y="${f1(y+r*.36)}" text-anchor="middle" font-size="${f1(r*1.05)}" font-weight="900" fill="#fff" style="paint-order:stroke" stroke="rgba(0,0,0,.25)" stroke-width="1.5">${sign==='+'?'+':'−'}</text>`:'')+`</g>`}
/* سهم مجسم أفقي من x1 إلى x2 */
function arrow(x1,x2,y,kind,delay,th){th=th||13;const dir=x2>x1?1:-1,L=Math.abs(x2-x1),hl=Math.min(24,L*.45),hw=th*1.05,b=x2-dir*hl;
  const pts=(dx,dy)=>[[x1,y-th/2],[b,y-th/2],[b,y-hw],[x2,y],[b,y+hw],[b,y+th/2],[x1,y+th/2]].map(([a,c])=>f1(a+dx)+','+f1(c+dy)).join(' ');
  const g=kind==='R'?'url(#kc-aR)':'url(#kc-aF)',dk=kind==='R'?'#3b0764':'#78350f';
  return `<g class="kAr" style="--d:${delay||0}s;transform-origin:${x1}px ${y}px"><polygon points="${pts(3,5)}" fill="${dk}" opacity=".85"/><polygon points="${pts(0,0)}" fill="${g}" stroke="rgba(255,255,255,.35)" stroke-width="1"/></g>`}
function pill(x,y,t,c,delay,cls){const w=t.length*10.2+26;
  return `<g class="kPl ${cls||''}" style="--d:${delay||0}s"><rect x="${f1(x-w/2)}" y="${y-17}" width="${f1(w)}" height="30" rx="15" fill="#ffffff" stroke="${c}" stroke-width="2" filter="drop-shadow(0 2px 3px rgba(30,58,95,.18))"/><text x="${x}" y="${y+4.5}" text-anchor="middle" font-size="17" font-weight="800" fill="${c}" direction="ltr">${t}</text></g>`}
function lbl(x,y,t,c,s){return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${s||14.5}" font-weight="800" fill="${c||'#1e3a5f'}" direction="ltr">${t}</text>`}
function dim(x1,x2,y,t){return `<g class="kDim"><line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#0369a1" stroke-width="1.6" stroke-dasharray="5 4"/><line x1="${x1}" y1="${y-7}" x2="${x1}" y2="${y+7}" stroke="#0369a1" stroke-width="1.6"/><line x1="${x2}" y1="${y-7}" x2="${x2}" y2="${y+7}" stroke="#0369a1" stroke-width="1.6"/>`+pill((x1+x2)/2,y,t,'#0369a1',0,'kOn0')+`</g>`}
function flow(x1,x2,y,rep){return `<line class="kFlow ${rep?'kRep':'kAtt'}" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${rep?'#dc2626':'#2563eb'}" stroke-width="2" stroke-dasharray="4 9" opacity=".55"/>`}
function svg(w,h,body,cls){return `<svg class="kSvg ${cls||''}" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">${body}</svg>`}
/* ---------- المشاهد ---------- */
/* شحنتان: F₁ على q₁ و F₂ على q₂ */
function pair(o){const W=640,H=300,FY=196,y=128,R=34,x1=170,x2=470,rep=o.s1===o.s2,L=92;
  let b=stage(W,H,FY);
  b+=flow(x1+R+6,x2-R-6,y,rep);
  b+=sphere(x1,y,R,o.s1,FY)+sphere(x2,y,R,o.s2,FY);
  b+=lbl(x1,y-R-16,o.l1,o.s1==='+'?'#b91c1c':'#1d4ed8',19)+lbl(x2,y-R-16,o.l2,o.s2==='+'?'#b91c1c':'#1d4ed8',19);
  if(rep){b+=arrow(x1-R-6,x1-R-6-L,y,'F',.1)+arrow(x2+R+6,x2+R+6+L,y,'F',.35);b+=pill(x1-R-50,y+36,'F₁','#b45309',.2)+pill(x2+R+50,y+36,'F₂','#b45309',.45)}
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
const kFrac=()=>{let K='';try{K=key(pos.u,pos.l)}catch(e){}if(K!=='3-1')return;
  document.querySelectorAll('code,bdi,.kM,.eq').forEach(el=>{if(el.dataset.fr||el.children.length)return;const t=el.textContent.trim(),m=t.match(/^([FE][₀-₉]*\s*=\s*)(.+)\s\/\s*([^\s=]+)(\s*(?:[=≈][\s\S]*)?)$/);if(!m||!/q|10⁻|k/.test(m[2]))return;
    let pre='',num=m[2];const k=num.match(/^(k|[0-9.]+ [×/] [0-9.]+[⁰-⁹⁻]+|[0-9.]+[⁰-⁹⁻]+)\s*[·×]\s*/);if(k){pre=k[1]+' × ';num=num.slice(k[0].length)}
    el.dataset.fr=1;el.innerHTML=kEsc(m[1])+kEsc(pre)+'<span class="kFr"><span>'+kEsc(num.replace(/\s*·\s*/g,' × '))+'</span><span>'+kEsc(m[3].replace(/^\((.*)\)(²?)$/,'$1$2'))+'</span></span>'+kEsc(m[4])})};
const kMulti=()=>document.querySelectorAll('.board .bContent').forEach(c=>{const m=c.querySelectorAll('.bStep .kFig').length>1;if(c.classList.contains('kMultiFig')!==m)c.classList.toggle('kMultiFig',m)});
try{new MutationObserver(()=>{kimgFill();kMulti();kFrac()}).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}
const imf=(src,cap,ref)=>({html:`<div class="kc kFig"><img data-kimg="${src}" loading="lazy" decoding="async" alt="${cap}" style="display:block;width:100%;max-width:640px;margin:0 auto;border-radius:12px;background:#fff"><div class="kCap">${cap}</div></div>`});
const pt=(t)=>({html:`<div class="kc kPt">${t}</div>`});
function S(o,say){o.say=say;return o}
const CARDS={'3-1':{
  /* إضافة: أهداف الوحدة (طلب المدرب 14:31) */
  goals:{title:'أهداف الوحدة',sayT:'والآن، لنتعرف على أهداف الوحدة.',steps:()=>[
    S({html:`<div class="kc kPt kKeep">في نهاية هذه الوحدة يكون المتدرب قادرا على:</div>`},'في نهاية هذه الوحدة، يكون المتدرب قادرا على:'),
    S({html:`<div class="kc kPt kKeep"><b>1</b> تعريف الشحنة الكهربائية وأنواعها وطرق شحن الأجسام.</div>`},'تعريف الشحنة الكهربائية وأنواعها وطرق شحن الأجسام.'),
    S({html:`<div class="kc kPt kKeep"><b>2</b> تطبيق قانون كولوم لحساب القوة بين شحنتين.</div>`},'تطبيق قانون كولوم لحساب القوة بين شحنتين.'),
    S({html:`<div class="kc kPt kKeep"><b>3</b> حساب شدة المجال الكهربائي ورسم خطوطه.</div>`},'حساب شدة المجال الكهربائي ورسم خطوطه.'),
    S({html:`<div class="kc kPt kKeep"><b>4</b> حساب الجهد الكهربائي وفرق الجهد.</div>`},'حساب الجهد الكهربائي وفرق الجهد.'),
    S({html:`<div class="kc kPt kKeep"><b>5</b> التعرف على المكثفات وحساب سعتها وطاقتها وطرق توصيلها.</div>`},'التعرف على المكثفات وحساب سعتها، والمقارنة بين توصيلها على التوالي وعلى التوازي، وإيجاد الطاقة المختزنة فيها.')]},
  /* طرق شحن الأجسام بالكهرباء الساكنة (طلب المدرب 16:30) */
  rub:{title:'طرق شحن الأجسام بالكهرباء الساكنة',sayT:'بعد أن عرفنا أنواع المواد، نتعرف الآن على طرق شحن الأجسام بالكهرباء الساكنة.',steps:()=>[
    S(pt('تشحن الأجسام بالكهرباء الساكنة بثلاث طرق هي: '+B('الدلك')+'، و'+B('اللمس')+'، و'+B('الحث')+'.'),''),
    S({html:'<h3>1. الشحن بالدلك</h3>'},'الطريقة الأولى: الشحن بالدلك.'),
    S(pt(B('الشحن بالدلك')+': عند دلك جسمين مختلفين أحدهما بالآخر، تنتقل الإلكترونات من أحدهما إلى الآخر.'),''),
    S(pt('الجسم الذي '+B('يفقد')+' الإلكترونات يصبح موجبا، والذي '+B('يكتسبها')+' يصبح سالبا.'),''),
    S(fig(rubFig(),'الشحن بالدلك: تنتقل الإلكترونات من الصوف إلى البلاستيك'),'لاحظ في الرسم انتقال الإلكترونات من الصوف إلى البلاستيك.'),
    S(pt(B('مثال')+': عند دلك مسطرة بلاستيكية بقطعة صوف، تنتقل الإلكترونات من الصوف إلى البلاستيك، فيصبح البلاستيك سالبا والصوف موجبا.'),'')]},
  touch:{title:'طرق شحن الأجسام بالكهرباء الساكنة (تابع)',sayT:'ونكمل طرق شحن الأجسام: الشحن باللمس، والشحن بالحث.',steps:()=>[
    S({html:'<h3>2. الشحن باللمس</h3>'},'الطريقة الثانية: الشحن باللمس.'),
    S(pt(B('الشحن باللمس (التوصيل)')+': موصل مشحون يلامس موصلا متعادلا فيتقاسمان الشحنة.'),''),
    S(fig(touchFig(),'الشحن باللمس: الموصلان يتقاسمان الشحنة بعد التلامس'),'لاحظ في الرسم أن الموصلين يتقاسمان الشحنة بعد التلامس.'),
    S({html:'<h3>3. الشحن بالحث</h3>'},'الطريقة الثالثة: الشحن بالحث.'),
    S(pt(B('الشحن بالحث (التأثير)')+': شحن جسم متعادل '+B('دون ملامسته')+' بتقريب جسم مشحون منه.'),''),
    S(fig(inductFig(),'الشحن بالحث: نقرب جسما مشحونا دون لمس، ثم نوصل الموصل بالأرض فيصبح موجبا'),'لاحظ في الرسم: نقرب جسما سالبا دون أن يلامس الموصل، ثم نوصل الموصل بالأرض فتهرب الإلكترونات إليها، فيبقى الموصل موجبا.')]},
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
    S(fig(atom(),'الذرة: نواة فيها بروتونات موجبة ونيوترونات متعادلة، وحولها إلكترونات سالبة'),'تَأَمَّلْ هَذِهِ الذَّرَّةَ: في وسطها النواة، وفيها البروتونات الموجبة والنيوترونات المتعادلة وحولها تدور الإلكترونات السالبة.'),
    S(pt('المادة '+B('متعادلة')+' طبيعيا: عدد '+'<span style="white-space:nowrap">'+B('البروتونات الموجبة')+' <span class="kSg kSp">+</span></span> يساوي عدد '+'<span style="white-space:nowrap">'+B('الإلكترونات السالبة')+' <span class="kSg kSn">−</span></span>'),'المادة متعادلة طبيعيا، لأن عدد البروتونات الموجبة يساوي عدد الْإِلِكْتِرُونَاتِ السالبة.'),
    S(pt('تشحن المادة عندما '+B('تفقد')+' إلكترونات فتصبح موجبة، أو '+B('تكتسب')+' إلكترونات فتصبح سالبة.'),'تشحن المادة عندما تفقد إلكترونات فتصبح موجبة، أو تكتسب إلكترونات فتصبح سالبة.'),
    S(fig(likeUnlike(),'الشحنات المتشابهة تتنافر، والمختلفة تتجاذب'),'وَالْقَاعِدَةُ الْمُهِمَّةُ: الشُّحْنَاتُ المتشابهة تتنافر، والشحنات المختلفة تتجاذب. لاحظ الْأَسْهُمَ: في التنافر تبتعد الشحنتان، وفي التجاذب تقتربان.')]},
  /* شرح: قانون كولوم */
  law:{title:'قانون كولوم (تابع)',sayT:'والآن، نتعرف على تعريف قانون كولوم.',steps:()=>[
    S({html:'<h3>تعريف قانون كولوم</h3>'},''),
    S(pt('القوة بين شحنتين نقطيتين تتناسب '+B('طرديا')+' مع حاصل ضرب الشحنتين، و'+B('عكسيا')+' مع مربع المسافة بينهما.'),''),
    S(fig(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'r',cls:'kAuto'}),'القوة F₁ على q₁ والقوة F₂ على q₂: متساويتان في المقدار ومتعاكستان في الاتجاه'),'في الرسم: F₁ هي القوة على الشحنة الأولى، و F₂ هي القوة على الشحنة الثانية، وهما متساويتان في المقدار ومتعاكستان في الاتجاه.'),
    Object.assign(S(pt('<div class="kLaw">'+M('F = k·|q₁|·|q₂| / r²')+'</div>'),'وقانون كولوم: `F = k·|q₁|·|q₂| / r²`'),{md:'`F = k·|q₁|·|q₂| / r²`'}),
    S({html:'<div class="kc kPt kKeep">حيث:<br>'+M('F')+' القوة الكهربائية بين الشحنتين، ووحدتها النيوتن '+M('N')+'<br>'+M('k')+' ثابت كولوم، ويساوي '+M('9 × 10⁹ N·m²/C²')+'<br>'+M('q₁')+' و '+M('q₂')+' مقدار الشحنتين، ووحدتهما الكولوم '+M('C')+'<br>'+M('r')+' المسافة بين الشحنتين، ووحدتها المتر '+M('m')+'</div>'},'حيث: `F` القوة الكهربائية بين الشحنتين، ووحدتها النيوتن. و `k` ثابت كولوم، ويساوي `9 × 10⁹ N·m²/C²`. و `q₁` و `q₂` مقدار الشحنتين، ووحدتهما الكولوم. و `r` المسافة بين الشحنتين، ووحدتها المتر.'),
    S({html:'<div class="kc kPt kKeep">تحويل الوحدات: '+M('1 µC = 10⁻⁶ C')+' و '+M('1 nC = 10⁻⁹ C')+'</div>'},'ولتحويل الوحدات: `1 µC = 10⁻⁶ C`، و `1 nC = 10⁻⁹ C`.'),
    S(pt('مضاعفة المسافة ← القوة تقل إلى '+B('الربع')+' (لأن المسافة مربعة).'),'وإذا ضاعفنا المسافة تقل القوة إلى الربع، لأن المسافة مربعة في المقام.')]},
  /* مثال 1 صفحة 92 */
  ex1:{title:'مثال ١ · صفحة 92',steps:()=>[
    S(q('شحنتان '+M('q₁ = 2 × 10⁻⁶ C')+' و '+M('q₂ = 3 × 10⁻⁶ C')+' والمسافة بينهما '+M('1.5 m')+'. أوجد القوة الكهربائية بينهما.','المثال · صفحة 92'),'لدينا هذا السؤال: شحنتان `q₁ = 2 × 10⁻⁶ C` و `q₂ = 3 × 10⁻⁶ C` والمسافة بينهما `1.5 m`، أوجد القوة الكهربائية بينهما.'),
    S(gr(['q₁ = 2 × 10⁻⁶ C','q₂ = 3 × 10⁻⁶ C','r = 1.5 m','k = 9 × 10⁹ N·m²/C²'],'مقدار القوة بين الشحنتين '+M('F₁₂')+' واتجاهها'),'المعطيات أمامك على السبورة. والمطلوب: مقدار القوة بين الشحنتين واتجاهها.'),
    S(fig(pair({s1:'+',s2:'+',l1:'q₁ = +2 µC',l2:'q₂ = +3 µC',r:'r = 1.5 m',F:'F₁₂ = 0.024 N'})),'لنرسم الشحنتين: q₁ و q₂ موجبتان، والمسافة بينهما متر ونصف.'),
    S(st(1,'القانون: '+M('F₁₂ = k·|q₁|·|q₂| / r²')),'نستخدم قانون كولوم: `F₁₂ = k·|q₁|·|q₂| / r²`'),
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
    S(st(1,'القانون: '+M('F₁₂ = k·|q₁|·|q₂| / r²')),'القانون: `F₁₂ = k·|q₁|·|q₂| / r²`'),
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
/* ---------- التطبيق على السبورة ---------- */
const VOCK={"كولوم": "كُولُوم", "الرسم": "الرَّسْمِ", "رمزها": "رَمْزُهَا", "لنرسم": "لِنَرْسُمِ", "انظر": "انْظُرْ", "رمزه": "رَمْزُهُ", "القياس": "الْقِيَاسِ", "له": "لَهُ", "لها": "لَهَا", "الإلكترونات": "الْإِلِكْتِرُونَاتُ", "إلكترونات": "إِلِكْتِرُونَاتٍ", "أي": "أَيْ", "فتتجه": "فَتَتَّجِهُ", "السهمين": "السَّهْمَيْنِ", "لنتعرف": "لِنَتَعَرَّفْ", "المهمة": "الْمُهِمَّةِ", "فولت": "فُولْت", "فاراد": "فَارَادْ", "تأمل": "تَأَمَّلْ", "وسطها": "وَسَطِهَا", "والنيوترونات": "وَالنْيُوتِرُونَاتُ", "وحولها": "وَحَوْلَهَا", "تدور": "تَدُورُ", "والقاعدة": "وَالْقَاعِدَةُ", "الأسهم": "الْأَسْهُمِ", "التنافر": "التَّنَافُرِ", "تبتعد": "تَبْتَعِدُ", "التجاذب": "التَّجَاذُبِ", "تقتربان": "تَقْتَرِبَانِ", "والميكروكولوم": "وَالْمَايْكْرُوكُولُوم", "والنانوكولوم": "وَالنَّانُوكُولُوم", "ضاعفنا": "ضَاعَفْنَا", "مربعة": "مُرَبَّعَةٌ", "ونصف": "وَنِصْفْ", "نستخدم": "نَسْتَخْدِمُ", "والآن": "وَالْآنَ", "نحدد": "نُحَدِّدُ", "متشابهتان": "مُتَشَابِهَتَانِ", "والمسافتان": "وَالْمَسَافَتَانِ", "نحسب": "نَحْسُبُ", "ونحدد": "وَنُحَدِّدُ", "نجمع": "نَجْمَعُ", "القوتين": "الْقُوَّتَيْنِ", "كانتا": "كَانَتَا", "ونطرحهما": "وَنَطْرَحُهُمَا", "تعاكستا": "تَعَاكَسَتَا", "أيضا": "أَيْضًا", "القوتان": "الْقُوَّتَانِ", "فنطرح": "فَنَطْرَحُ", "الصغرى": "الصُّغْرَى", "الكبرى": "الْكُبْرَى", "تتجه": "تَتَّجِهُ", "السهم": "السَّهْمَ", "البنفسجي": "الْبَنَفْسَجِيَّ", "نحول": "نُحَوِّلُ", "النانوكولوم": "النَّانُوكُولُوم", "الكولوم": "الْكُولُوم", "الموجبتين": "الْمُوجَبَتَيْنِ", "تبعد": "تُبْعِدُ", "العالم": "الْعَالِمِ", "شارل": "شَارْل", "الجذب": "الْجَذْبِ", "العام": "الْعَامِّ", "شعرت": "شَعَرْتَ", "يوما": "يَوْمًا", "بشرارة": "بِشَرَارَةٍ", "لمست": "لَمَسْتَ", "الباب": "الْبَابِ", "بعد": "بَعْدَ", "السجاد": "السَّجَّادِ", "صوفية": "صُوفِيَّةٍ", "وتنشأ": "وَتَنْشَأُ", "خاصية": "خَاصِّيَّةٌ", "ورمزها": "وَرَمْزُهَا", "جسيمات": "جُسَيْمَاتِ", "جسيم": "جُسَيْمٍ", "وكتلته": "وَكُتْلَتُهُ", "البروتون": "الْبُرُوتُونُ", "الإلكترون": "الْإِلِكْتِرُونُ", "النيوترون": "النْيُوتِرُونُ", "كرتان": "كُرَتَانِ", "مشحونتان": "مَشْحُونَتَانِ", "ذراع": "ذِرَاعٍ", "معلق": "مُعَلَّقٍ", "بخيط": "بِخَيْطٍ", "الكرتان": "الْكُرَتَانِ", "يلتوي": "يَلْتَوِي", "الخيط": "الْخَيْطُ", "الالتواء": "الِالْتِوَاءِ", "نعرف": "نَعْرِفُ", "عام": "عَامِ", "ألف": "أَلْفٍ", "وسبعمئة": "وَسَبْعِمِئَةٍ", "وأربعة": "وَأَرْبَعَةٍ", "وثمانين": "وَثَمَانِينَ", "مشحونين": "مَشْحُونَيْنِ", "الالتوائي": "الِالْتِوَائِيِّ", "اخترعه": "اخْتَرَعَهُ", "تجاربه": "تَجَارِبِهِ", "وقيمته": "وَقِيمَتُهُ", "ونقربها": "وَنُقَرِّبُهَا", "يشبه": "يُشْبِهُ", "كتلتين": "كُتْلَتَيْنِ", "كليهما": "كِلَيْهِمَا", "التربيع": "التَّرْبِيعِ", "العكسي": "الْعَكْسِيِّ", "لكولوم": "لِكُولُوم", "ستة": "سِتَّةُ", "إبسلون": "إِبْسِلُونْ", "صفر": "صِفْرٍ", "سماحية": "سَمَاحِيَّةِ", "الفراغ": "الْفَرَاغِ", "ثابت": "ثَابِتُ", "يبين": "يُبَيِّنُ", "قدرة": "قُدْرَةَ", "نقل": "نَقْلِ", "التأثير": "التَّأْثِيرِ", "الشحنات": "الشُّحْنَاتِ", "حيث": "حَيْثُ", "هي": "هِيَ", "يساوي": "يُسَاوِي", "واحدا": "وَاحِدًا", "مقسوما": "مَقْسُومًا", "أربعة": "أَرْبَعَةِ", "باي": "بَايْ", "قيمتها": "قِيمَتُهَا"};
function vk(t){return String(t||'').split(/(`[^`]*`)/).map(x=>x[0]==='`'?x:x.replace(/[\u0621-\u064A]+/g,w=>VOCK[w]||w)).join('')}
/* المدرب يقرأ المكتوب على السبورة نفسه في بطاقات النص (الرسوم والجداول والقوانين لها وصف منطوق) */
const SFIX=[['ومن تجاربه استنتج أن','وَمِنْ تَجَارِبِهِ اسْتَنْتَجَ أَنَّ'],['ومن تجاربه استنتج','وَمِنْ تَجَارِبِهِ اسْتَنْتَجَ'],['دون أن يلامسه','دُونَ أَنْ يُلَامِسَهُ'],['تبعد شحنتها','تُبْعِدُ شُحْنَتَهَا'],['عند دلك','عِنْدَ دَلْكِ'],['تكتسب شحنات كهربائية','تَكْتَسِبُ شُحْنَاتٍ كَهْرَبَائِيَّةً'],['عدد الإلكترونات','عدد الْإِلِكْتِرُونَاتِ'],['درس العالم','دَرَسَ الْعَالِمُ'],['`1784`','ألف وسبعمئة وأربعة وثمانين']];
function sayOf(h){const d=document.createElement('div');d.innerHTML=h;d.querySelectorAll('.kSg,.kSt>i,.kRes>span,.kDirOn').forEach(e=>e.remove());
  d.querySelectorAll('.kM').forEach(e=>{e.textContent='`'+e.textContent+'`'});
  const gr=d.querySelector('.kGR');if(gr){const r=gr.querySelector('.kR');const tg=r&&r.querySelector('.kTag');if(tg)tg.remove();return 'المعطيات أمامك على السبورة. والمطلوب: '+(r?r.textContent:'').replace(/\s+/g,' ').trim()+'.'}
  const tq=d.querySelector('.kQ>.kTag');if(tq)tq.textContent='السؤال: ';
  let t=d.textContent.replace(/\s+/g,' ').trim();SFIX.forEach(([a,b])=>{t=t.split(a).join(b)});return t}
function card(k,id,o){const c=CARDS[k][id];return {type:'c',title:(o&&o.title)||c.title,sayT:(o&&o.sayT)||c.sayT,steps:c.steps(o&&o.lead).map((x,i)=>{if(x.html&&/class="kc k(Q|GR|St|Res|Pt)\b/.test(x.html)&&!/kLaw|kFig|kKeep|<svg/.test(x.html)){const L=i===0&&o&&o.lead?o.lead:'';x.say=L+sayOf(x.html)}if(x.say)x.say=vk(x.say);return x}),kc:1}}
function apply(out,K2){if(!CARDS[K2])return out;defs();
  const T=sl=>String(sl.title||''),base=t=>t.replace(/\s*\(تابع\)\s*$/,'');
  const R=[[/^مقدمة الوحدة وأهدافها$/,sl=>{sl.steps=sl.steps.map(x=>x&&x.h==='تعريف الكهرباء الساكنة'?{html:'<h3>تعريف الكهرباء الساكنة</h3>',say:'ونبدأ بتعريف الكهرباء الساكنة.'}:x);const c=card(K2,'life');c.steps[0].html='<h3>الكهرباء الساكنة من حولنا</h3>'+c.steps[0].html;sl.steps=sl.steps.concat(c.steps);return [sl,card(K2,'goals')]}],[/^المفاهيم الأساسية في الوحدة$/,()=>null],[/^وحدات مهمة$/,()=>null],[/^الشحن بالدلك$/,()=>card(K2,'rub')],[/^الشحن باللمس والحث$/,()=>card(K2,'touch')],[/^الشحنة الكهربائية$/,()=>[card(K2,'charge',{title:'الشحنات الكهربائية',sayT:'بعد أن تعرفنا على أهداف الوحدة، نبدأ أول موضوعاتها: الشحنات الكهربائية.'}),card(K2,'particles')]],[/^قانون كولوم$/,()=>[card(K2,'history'),card(K2,'law'),card(K2,'grav')]],
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
  /* الرسوم التوضيحية: المدرب يقرأ تعليق الرسم بدل جملة عامة */
  res.forEach(sl=>{if(!sl||!sl.steps)return;sl.steps=sl.steps.map(x=>{if(x&&x.html&&/<figure/.test(x.html)&&/^انظر معي إلى هذا الرسم/.test(x.say||'')){const m=x.html.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/)||x.html.match(/aria-label="([^"]+)"/);const c=m&&m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();if(c){let t='لاحظ في الرسم: '+c.replace(/[.。]$/,'')+'.';for(const f of SFIX)t=t.split(f[0]).join(f[1]);x.say=vk(t)}return x}if(!x||!x.md||!/^\s*\[\[fig:/.test(x.md)||typeof md!=='function')return x;try{const h=md(x.md);const m=h.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/);if(!m)return x;const c=m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();return c?{html:h,say:vk('لاحظ في الرسم: '+c.replace(/[.。]$/,'')+'.')}:x}catch(e){return x}})});
  return res}
/* ---------- الأمثلة والتمارين التفاعلية ---------- */
function probFig(K2,p){const L=PFIG[K2];if(!L)return null;const m=L.find(([re])=>re.test(String(p.q||'')));if(!m)return null;defs();
  const d=document.createElement('div');d.className='kc kFig kProb';d.dataset.cap=m[2];d.innerHTML=m[1]()+'<div class="kCap">تظهر أسهم القوى واتجاهها بعد أن تحسب القوة</div>';return d}
function probDone(el){if(!el)return;el.classList.add('kOn');const c=el.querySelector('.kCap');if(c)c.textContent=el.dataset.cap||''}

/* حرارة: جسم ساخن وجسم بارد يتلامسان (سؤال الربط بالدرس السابق) */
function heat(){const W=640,H=260,FY=190;let b=stage(W,H,FY);
  const cube=(x,c1,c2,c3,t)=>`<g><polygon points="${x},110 ${x+110},110 ${x+140},88 ${x+30},88" fill="${c1}"/><polygon points="${x+110},110 ${x+140},88 ${x+140},168 ${x+110},190" fill="${c3}"/><rect x="${x}" y="110" width="110" height="80" fill="${c2}"/><text x="${x+55}" y="158" text-anchor="middle" font-size="17" font-weight="900" fill="#fff">${t}</text></g>`;
  b+=cube(150,'#fca5a5','#dc2626','#991b1b','ساخن')+cube(262,'#93c5fd','#2563eb','#1e3a8a','بارد');
  b+=arrow(215,375,70,'F',.1,10)+`<text x="300" y="52" text-anchor="middle" font-size="14" font-weight="800" fill="#b45309">الحرارة تنتقل من الجسم الساخن إلى البارد</text>`;
  return svg(W,H,b,'kAuto')}
function lawFig(){return `<div class="kLawBox"><div class="kLawF"><bdi dir="ltr">F = k · |q₁| · |q₂| / r²</bdi></div><div class="kLawT"><span>F القوة (N)</span><span>k ثابت كولوم</span><span>q₁ و q₂ الشحنتان (C)</span><span>r المسافة (m)</span></div></div>`}
function solveFig(){return `<div class="kLawBox"><div class="kLawF kStep1"><bdi dir="ltr">F = k · q₁ · q₂ / r²</bdi></div><div class="kLawA">↓ نضرب في r² ونقسم على k·q₂</div><div class="kLawF kStep2"><bdi dir="ltr">q₁ = ?</bdi></div></div>`}
const QFIG={'3-1':{r:()=>svg2(heat()),s:()=>svg2(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'r',cls:'kAuto'}))+lawFig(),i:()=>svg2(pair({s1:'+',s2:'+',l1:'q₁',l2:'q₂',r:'2r',cls:'kAuto'}))+'<div class="kLawBox"><div class="kLawF"><bdi dir="ltr">F = k · q₁ · q₂ / r²</bdi></div></div>',m:()=>svg2(likeUnlike())}};
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
.kPt{background:#fff;border-inline-start:5px solid var(--kA);border-radius:10px;padding:6px 12px;line-height:1.85}
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
.kProb{margin:8px 0 12px}
.board .bContent:has(.kc){font-size:clamp(16.5px,min(2.5vw,2.6vh),25px)}
.board .bContent:has(.kc) .bStep.in{margin:0 0 10px}
@media (min-width:1000px){.board .bContent:has(.kFig):not(:has(.bQ)){display:grid;grid-template-columns:1fr 1.08fr;column-gap:18px;align-items:start}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bH{grid-column:1/-1}.board .bContent:has(.kFig):not(:has(.bQ))>.bStep{grid-column:1}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bStep:has(.kFig){grid-column:2;grid-row:2/span 40;position:sticky;top:4px}
 .board .bContent:has(.kFig):not(:has(.bQ))>.bStep:has(.kFig)~.bStep:has(.kFig){grid-row:auto;position:static}
 .board .bContent.kMultiFig{display:block!important}.board .bContent.kMultiFig>.bStep{position:static!important}.board .bContent.kMultiFig .kFig{max-width:min(620px,60vh);margin-inline:auto}}
@media (max-width:999px){.board .bContent:has(.kFig)>.bStep.in:has(.kFig):not(:has(.kAuto)){position:sticky;top:0;z-index:3;background:#fdfdfb;padding-bottom:6px}}
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
window.KC={apply,probFig,probDone,decorQ,has:k=>!!CARDS[k],_pair:pair,_three:three,_atom:atom,_lu:likeUnlike,defs};
})();
