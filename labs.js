/* تجارب عملية تفاعلية لكل درس — يتحكم المتدرب في متغيرات التجربة من لوحة التحكم، ويرى أثرها فورا على الحركة والقانون */
(function(){
const CSS=`
.lab{--lo:#F7931E}
.lab .stage{background:linear-gradient(#EAF4FF,#F7FBFF);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin:6px 0 12px}
:root[data-theme="dark"] .lab .stage{background:linear-gradient(#142033,#0F1724)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .lab .stage{background:linear-gradient(#142033,#0F1724)}}
.lab svg{display:block;width:100%;height:auto;direction:ltr}
.lab .hud{display:flex;justify-content:space-between;gap:8px;padding:6px 12px 10px;font-weight:700;font-size:14px;color:var(--ink)}
.lab .hud span{direction:ltr;unicode-bidi:isolate}
.lab .ctl{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:12px}
.lab .ctl h3{margin:0 0 6px;font-size:15px;color:var(--accent)}
.lab .row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:4px 10px;margin:8px 0}
.lab .row label{font-weight:700;font-size:14px}
.lab .row output{direction:ltr;font-weight:800;color:var(--accent);min-width:64px;text-align:left}
.lab .row input{grid-column:1/-1;width:100%;accent-color:var(--lo);height:28px}
.lab .btns{display:flex;gap:8px;margin-top:6px}
.lab .btns button{flex:1;border:0;border-radius:10px;padding:10px;font:inherit;font-weight:800;cursor:pointer}
.lab .go{background:var(--lo);color:#fff}
.lab .rs{background:var(--accent-soft,#E6F0FF);color:var(--ink)}
.lab .law{border-radius:12px;padding:10px 14px;margin-bottom:12px;background:var(--accent-soft,#EEF5FF)}
.lab .law .ln{display:flex;justify-content:space-between;gap:8px;padding:4px 0;border-bottom:1px dashed var(--line);font-size:14.5px}
.lab .law .ln:last-child{border-bottom:0}
.lab .law .ln b{color:var(--muted);font-weight:700;white-space:nowrap}
.lab .law .ln span{direction:ltr;unicode-bidi:isolate;font-weight:800;text-align:left}
.lab .law .res span{color:var(--lo);font-size:16px}
.lab .tags{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.lab .tag{border:1px solid var(--line);border-radius:999px;padding:4px 10px;font-size:13px}
.lab .tag i{font-style:normal;font-weight:800;color:var(--accent)}
.lab .tag.dv{border-color:var(--lo)} .lab .tag.dv i{color:var(--lo)}
.lab .q{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:10px}
.lab .q p{margin:0 0 8px;font-weight:700}
.lab .q .op{display:flex;flex-wrap:wrap;gap:6px}
.lab .q .op button{flex:1 1 30%;border:1px solid var(--line);background:var(--panel);color:var(--ink);border-radius:10px;padding:8px;font:inherit;cursor:pointer}
.lab .q .op button.ok{background:#DCFCE7;border-color:#16A34A;color:#14532D}
.lab .q .op button.no{background:#FEE2E2;border-color:#DC2626;color:#7F1D1D}
.lab .q .fb{margin-top:8px;font-size:14px;line-height:1.7}
.lab .q .fb:empty{display:none}
.lab .ans{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:12px}
.lab .ans label{flex:1 1 100%;font-weight:700;font-size:14px}
.lab .ans input{flex:1 1 40%;min-width:0;border:1px solid var(--line);border-radius:10px;padding:10px;font:inherit;font-size:16px;background:var(--panel);color:var(--ink)}
.lab .ans button{border:0;border-radius:10px;padding:10px 14px;font:inherit;font-weight:800;cursor:pointer}
.lab .btns button[data-d],.lab .btns button[data-m]{padding:8px 4px;font-size:13px;direction:ltr}
.lab .fb2{white-space:pre-line;margin-top:8px;font-size:14px;line-height:1.7;border-radius:10px;padding:8px 10px}
.lab .fb2:empty{display:none}
.lab .fb2.ok{background:#DCFCE7;color:#14532D}.lab .fb2.no{background:#FEE2E2;color:#7F1D1D}
.lab .ctl .stage{margin:6px 0 8px}
.lab .intro{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:12px}.lab .intro h3{margin:0 0 6px;font-size:15px;color:var(--accent)}.lab .intro .tool p{margin:0 0 6px;font-size:14px;line-height:1.7}.lab .law .sym{padding:6px 0;border-bottom:1px dashed var(--line);font-size:14px}.lab .law .sym b{color:var(--muted)}.lab .law .sym ul{margin:4px 0 0;padding-inline-start:18px;line-height:1.8}.lab .law .sym li span{font-weight:800}.lab .labKind{display:block;font-size:14px;font-weight:700;color:var(--muted);margin-bottom:4px}.lab .labName{display:block;margin:0;font-size:18px;font-weight:800;line-height:1.6}.lab .intro h3,.lab .secH,.lab .res h3{font-size:20px!important;font-weight:800}.lab .ctl:not(.res) h3{font-size:17px!important}.lab .slh{margin:-2px 0 8px;font-size:13px;line-height:1.6;color:var(--muted);background:var(--accent-soft,#EEF5FF);border-radius:8px;padding:6px 10px}.lab .secH{margin:22px 0 8px;font-size:17px;color:var(--accent)}.lab .startBand{margin:0 0 14px;padding:18px 14px;border-radius:14px;background:var(--lo);color:#fff;font-size:22px;font-weight:800;text-align:center;line-height:1.5;box-shadow:0 4px 14px rgba(247,147,30,.35)}.lab .tw{overflow-x:auto}.lab table.rt{width:100%;border-collapse:collapse;font-size:13px}.lab table.rt th,.lab table.rt td{border:1px solid var(--line);padding:7px 6px;text-align:center}.lab table.rt th{background:var(--accent-soft,#E6F0FF);color:var(--ink)}.lab table.rt td{font-variant-numeric:tabular-nums}.lab table.rt td:nth-child(3){white-space:nowrap}.lab .rn{white-space:pre-line;margin:8px 0 0;font-size:14px;line-height:1.7;color:var(--muted)}.lab .intro ol.gl{margin:0;padding-inline-start:22px;font-size:14px;line-height:1.8}.lab .intro ol.gl li::marker{color:var(--accent);font-weight:800}.lab .intro ol.steps{margin:0 0 14px;padding-inline-start:22px;font-size:14px;line-height:1.75}.lab .intro ol.steps li::marker{color:#2563EB;font-weight:800}.lab .intro .stage{background:var(--panel)}

/* ألوان ومربعات */
.lab .intro,.lab .ctl{border-inline-start:4px solid var(--accent)!important;background:linear-gradient(90deg,transparent,rgba(56,189,248,.04))}
.lab .ctl.res{border-inline-start-color:#16A34A!important}
.lab .intro h3,.lab .ctl h3{display:inline-block;padding:4px 12px;border-radius:10px;background:var(--accent-soft,#E6F0FF)}
.lab .secH{display:block!important;padding:8px 14px;border-radius:12px;background:var(--accent-soft,#E6F0FF);border-inline-start:5px solid var(--accent)}
.lab .labName{padding:10px 14px;border-radius:12px;background:rgba(247,147,30,.12);border:1px solid rgba(247,147,30,.45)}
.lab ol.gl{list-style:none;padding:0!important;counter-reset:g;display:grid;gap:8px}
.lab ol.gl li{counter-increment:g;position:relative;padding:8px 12px;padding-inline-start:42px;border-radius:10px;background:var(--accent-soft,#EEF5FF);border:1px solid var(--line)}
.lab ol.gl li::before{content:counter(g);position:absolute;inset-inline-start:10px;top:9px;width:22px;height:22px;border-radius:50%;background:var(--accent);color:#fff;font-weight:800;font-size:13px;display:grid;place-items:center}
.lab .intro .tool p{padding:10px 12px;border-radius:10px;background:rgba(247,147,30,.10);border:1px solid rgba(247,147,30,.35)}
.lab .law{border:2px solid var(--lo);background:rgba(247,147,30,.08)}
.lab .law .ln:first-child span{font-size:21px;padding:6px 14px;border-radius:10px;background:var(--panel);border:1px solid var(--lo);color:var(--lo)}
.lab .law .sym ul{list-style:none;padding:0!important;display:grid;gap:6px}
.lab .law .sym li{display:block;line-height:1.9;padding:6px 10px;border-radius:8px;background:var(--panel);border:1px solid var(--line)}
.lab .law .sym li .chip{display:inline-block;margin-inline-end:8px;min-width:28px;text-align:center;padding:1px 6px;border-radius:6px;background:var(--lo);color:#fff;font-weight:800}
.lab .slh{border:1px dashed var(--accent)}
.lab .rn{padding:10px 12px;border-radius:10px;background:rgba(22,163,74,.10);border:1px solid rgba(22,163,74,.45);color:var(--ink)!important}
.lab table.rt th{background:var(--accent)!important;color:#fff!important}
.lab .vcap{text-align:center;font-size:13px;font-weight:700;color:var(--muted);margin:2px 0 10px}.ftl .ln.lw{flex-direction:column;align-items:stretch;gap:4px}
.lab .ftl .ln.lw span{display:block;text-align:center!important;font-size:16px!important;padding:6px 8px;border-radius:10px;background:var(--panel);border:1px solid var(--lo);color:var(--lo);font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;overflow-x:auto}
.lab .hsel{margin:0 0 8px}
.lab .ftl .ln.lw b{white-space:normal;line-height:1.6}
/* قوانين التحويل والحاسبة */
.lab .labCalc{margin-top:12px}.lab .labCalc .calcbtn{width:100%;justify-content:center}
.lab .law .cv li{text-align:center}
.lab .law .cv .fx{display:inline-block;font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;font-size:19px;font-weight:700;color:var(--ink)}
`;
function css(){if(document.getElementById('labCss'))return;const s=document.createElement('style');s.id='labCss';s.textContent=CSS;document.head.appendChild(s)}
const E=t=>'\u2066'+t+'\u2069';
const sci=(x,d=3)=>{const e=Math.floor(Math.log10(Math.abs(x)));const m=(x/10**e).toFixed(d);const sup={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};return m+' × 10'+String(e).split('').map(c=>sup[c]).join('')};
const f=(n,d=2)=>{const r=Math.round(n*10**d)/10**d;return String(r)};
function quiz(root,qs){qs.forEach(q=>{const d=document.createElement('div');d.className='q';d.innerHTML='<p></p><div class="op"></div><div class="fb"></div>';d.querySelector('p').textContent=q.q;
  q.o.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.dir='auto';b.textContent=o;b.onclick=()=>{d.querySelectorAll('.op button').forEach(x=>x.className='');b.className=i===q.a?'ok':'no';d.querySelector('.fb').textContent=(i===q.a?'✓ إجابة صحيحة. ':'✗ حاول مرة أخرى. ')+(i===q.a?q.e:q.h)};d.querySelector('.op').appendChild(b)});root.appendChild(d)})}

function toolsIntro(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const bd=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="11" fill="#2563EB" stroke="#fff" stroke-width="2"/><text x="${x}" y="${y+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">${n}</text>`;
  let tk='';for(let i=0;i<=105;i++){const x=62+i*3;if(x>372)break;tk+=`<line x1="${x}" y1="66" x2="${x}" y2="${i%10===0?78:i%5===0?74:71}" stroke="#1F2937" stroke-width="${i%10===0?1.3:.8}"/>`;if(i%10===0&&i>0)tk+=`<text x="${x}" y="91" font-size="9" text-anchor="middle" fill="#1F2937">${i/10}</text>`}
  let vk='';for(let i=0;i<=10;i++){const x=147+i*6.5;vk+=`<line x1="${x}" y1="96" x2="${x}" y2="${i%5===0?110:105}" stroke="#7C2D12" stroke-width=".9"/>`}
  const cal=`<svg viewBox="16 0 372 242" aria-label="أداة القدمة ذات الورنية">
    <defs><linearGradient id="iCyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>
    <rect x="32" y="64" width="352" height="32" rx="3" fill="#CBD5E1" stroke="#475569"/>${tk}
    <path d="M32,64 V96 H62 V196 L44,172 H32 Z" fill="#F7931E" stroke="#9A3412"/><path d="M36,64 V26 L52,36 V64 Z" fill="#F7931E" stroke="#9A3412"/>
    <rect x="62" y="128" width="78" height="44" rx="3" fill="url(#iCyl)"/>
    <rect x="140" y="56" width="90" height="58" rx="5" fill="#FB923C" stroke="#9A3412"/><rect x="144" y="94" width="80" height="18" fill="#FDE7C8" stroke="#9A3412" stroke-width=".7"/>${vk}
    <path d="M140,114 V196 L158,172 H168 V114 Z" fill="#F7931E" stroke="#9A3412"/><path d="M140,56 V26 L126,36 V56 Z" fill="#F7931E" stroke="#9A3412"/>
    <circle cx="192" cy="124" r="8" fill="#9A3412"/><rect x="384" y="78" width="12" height="5" fill="#475569"/>
    ${lbl(48,160,24,222,'الفك الثابت','start')}${lbl(152,160,186,222,'الفك المتحرك')}${lbl(100,150,100,190,'الجسم المقيس')}
    ${lbl(300,70,322,20,'التدريج الرئيسي')}${lbl(190,104,214,20,'تدريج الورنية')}${lbl(44,32,62,20,'فكا القياس الداخلي','start')}${lbl(390,82,380,222,'ساق قياس العمق','end')}${lbl(192,132,262,160,'عجلة التحريك','start')}
    
  </svg>`;
  let sk='';for(let i=0;i<=8;i++){sk+=`<line x1="${232+i*6}" y1="104" x2="${232+i*6}" y2="${i%2?111:96}" stroke="#1F2937" stroke-width=".9"/>`}
  let th='';[[-2,'45'],[-1,''],[0,'0'],[1,''],[2,'5']].forEach(([k,n])=>{const y=104+k*7;th+=`<line x1="284" y1="${y}" x2="${n?296:291}" y2="${y}" stroke="#7C2D12" stroke-width="1"/>`+(n?`<text x="299" y="${y+3.5}" font-size="8" font-weight="700" fill="#7C2D12">${n}</text>`:'')});
  let kn='';for(let i=0;i<9;i++)kn+=`<line x1="${318+i*4}" y1="84" x2="${318+i*4}" y2="124" stroke="#9A3412" stroke-width=".8" opacity=".6"/>`;
  let rk='';for(let i=0;i<6;i++)rk+=`<line x1="${352+i*5}" y1="94" x2="${352+i*5}" y2="114" stroke="#9A3412" stroke-width=".8" opacity=".7"/>`;
  const mic=`<svg viewBox="16 0 372 242" aria-label="أداة الميكرومتر">
    <defs><radialGradient id="iCyl2"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".6" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></radialGradient>
      <linearGradient id="iTh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset=".45" stop-color="#F7931E"/><stop offset="1" stop-color="#C2410C"/></linearGradient></defs>
    <path d="M40,74 H58 V160 Q58,178 80,178 H208 Q226,178 226,160 V116 H244 V164 Q244,196 210,196 H80 Q40,196 40,162 Z" fill="#64748B" stroke="#334155"/>
    <rect x="58" y="96" width="26" height="16" fill="#F7931E" stroke="#9A3412"/>
    <defs><linearGradient id="iRod" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E3A8A"/><stop offset=".45" stop-color="#60A5FA"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs><rect x="84" y="70" width="26" height="70" fill="url(#iRod)"/><ellipse cx="97" cy="70" rx="13" ry="4" fill="#BFDBFE" stroke="#1E3A8A" stroke-width=".8"/><ellipse cx="97" cy="140" rx="13" ry="4" fill="#1E3A8A"/>
    <rect x="110" y="97" width="120" height="14" fill="#CBD5E1" stroke="#64748B"/><rect x="110" y="96" width="7" height="16" fill="#F7931E"/>
    <rect x="228" y="92" width="58" height="24" fill="#E5E7EB" stroke="#475569"/><line x1="228" y1="104" x2="286" y2="104" stroke="#1F2937" stroke-width="1.2"/>${sk}
    <path d="M280,84 H352 V124 H280 L286,118 V90 Z" fill="url(#iTh)" stroke="#9A3412"/>${kn}${th}
    <rect x="352" y="94" width="32" height="20" rx="5" fill="#FB923C" stroke="#9A3412"/>${rk}<rect x="196" y="85" width="12" height="12" fill="#334155"/>
    ${lbl(70,96,72,28,'السندان الثابت')}${lbl(160,104,182,62,'العمود المتحرك')}${lbl(97,130,80,222,'الجسم المقيس')}
    ${lbl(250,98,268,48,'التدريج الخطي')}${lbl(316,124,382,196,'الأسطوانة الدوارة','end')}${lbl(370,114,380,160,'مقبض الضبط الدوراني','end')}${lbl(160,188,190,222,'الإطار')}${lbl(202,88,200,28,'مثبت العمود')}
    
  </svg>`;
  return `<div class="intro"><h3>3. الأدوات المستخدمة</h3>
    <div class="tool"><div class="stage">${cal}</div><p><b>أداة القدمة ذات الورنية:</b> تقيس الأطوال والأقطار الخارجية والداخلية والأعماق بدقة <span dir="ltr">0.1 mm</span>.</p>
    </div>
    <div class="tool"><div class="stage">${mic}</div><p><b>أداة الميكرومتر:</b> تقيس الأقطار والسماكات الصغيرة بدقة <span dir="ltr">0.01 mm</span>.</p>
    </div></div>`}
/* ===== الوحدة الأولى — الكميات الفيزيائية وأنظمة القياس: معمل القياس (أداة القدمة ذات الورنية وأداة الميكرومتر) ===== */

function convBox(rows){return `<div class="sym cv"><b>قوانين التحويل:</b><ul>`+rows.map(r=>`<li><span class="fx" dir="ltr">${r}</span></li>`).join('')+`</ul></div>`}
function calcInit(root){const h=root.querySelector('.labCalc');if(!h||typeof makeCalc!=='function')return;let tgt=null;
 root.addEventListener('focusin',e=>{if(e.target.matches('.ans input'))tgt=e.target});
 const C=makeCalc(v=>{let t=tgt;if(!t||!h.parentElement.contains(t))t=[...h.parentElement.querySelectorAll('.ans input')].find(i=>!i.value)||h.parentElement.querySelector('.ans input');if(!t)return;t.value=v;t.focus()});
 const u=C.panel.querySelector('.cuse');if(u)u.textContent='✓ ضع النتيجة في خانة الحساب';h.appendChild(C.btn);h.appendChild(C.panel)}
function measureLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">القياس بأداة القدمة ذات الورنية وأداة الميكرومتر</p></div>
  <p class="sub">يتحكم المتدرب في متغيرات التجربة من لوحة التحكم، ويرى أثرها فورا على الحركة والقانون.</p>
  <div class="tags"><span class="tag">الجسم: <i>أسطوانة معدنية</i></span><span class="tag">الطول L: <i>أداة القدمة ذات الورنية</i> · 0.1 mm</span><span class="tag">القطر D: <i>أداة الميكرومتر</i> · 0.01 mm</span><span class="tag dv">الحجم V: <i>كمية مشتقة</i> · m³</span></div>
  
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء أداة القدمة ذات الورنية وأداة الميكرومتر.</li>
    <li>قراءة القياس بأداة القدمة ذات الورنية من التدريج الرئيسي وتدريج الورنية بدقة <span dir="ltr">0.1 mm</span>.</li>
    <li>قراءة القياس بأداة الميكرومتر من التدريج الخطي والتدريج الدائري بدقة <span dir="ltr">0.01 mm</span>.</li>
    <li>اختيار أداة القياس المناسبة (أداة القدمة ذات الورنية أو أداة الميكرومتر) حسب الدقة المطلوبة.</li>
    <li>تحويل القياسات إلى وحدات النظام الدولي SI، وحساب الحجم بوصفه كمية مشتقة.</li></ol></div>
  ${toolsIntro()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 أسطوانة جديدة</button></div>

  <div class="ctl"><h3>4.1 قياس الطول L بأداة القدمة ذات الورنية</h3>
    <div class="stage"><svg id="vTop" viewBox="0 0 400 120"></svg><svg id="vZm" viewBox="0 0 400 150"></svg><div class="hud"><span id="vSt"></span></div></div>
    <div class="row"><label for="vR">فتحة الفكين</label><output id="vO"></output><input id="vR" type="range" min="0" max="100" step="0.1" value="100"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك الفك المتحرك حتى يلامس الأسطوانة.</p>
    <div class="ans"><label>قراءتك للطول L</label><input id="vIn" inputmode="decimal" dir="ltr" placeholder="mm"><button type="button" class="go" id="vCk">تحقق</button><button type="button" class="rs" id="vHn">تلميح</button></div><div class="fb2" id="vFb"></div>
  </div>

  <div class="ctl"><h3>4.2 قياس القطر D بأداة الميكرومتر</h3>
    <div class="stage"><svg id="mTop" viewBox="0 0 400 160"></svg><svg id="mZm" viewBox="0 0 400 152"></svg><div class="hud"><span id="mSt"></span></div></div>
    <div class="row"><label for="mR">دوران أسطوانة أداة الميكرومتر</label><output id="mO"></output><input id="mR" type="range" min="0" max="25" step="0.01" value="25"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتدوير الأسطوانة الدوارة حتى يلامس العمود الجسم.</p>
    <div class="ans"><label>قراءتك للقطر D</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="mm"><button type="button" class="go" id="mCk">تحقق</button><button type="button" class="rs" id="mHn">تلميح</button></div><div class="fb2" id="mFb"></div>
  </div>

  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law" id="vol"><div class="ln"><b>القانون</b><span>V = π D² L / 4</span></div><div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">V</span> حجم الأسطوانة، ووحدته <span dir="ltr">m³</span></li>
      <li><span class="chip" dir="ltr">π</span> النسبة التقريبية، وقيمتها <span dir="ltr">3.14</span>، وليس لها وحدة</li>
      <li><span class="chip" dir="ltr">D</span> قطر الأسطوانة، ويقاس بأداة الميكرومتر، ووحدته <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">L</span> طول الأسطوانة، ويقاس بأداة القدمة ذات الورنية، ووحدته <span dir="ltr">m</span></li></ul></div>
      ${convBox(['L(cm) = L(mm) / 10','L(m) = L(mm) / 1000','V(cm³) = V(mm³) / 1000','V(m³) = V(cm³) / 1000000'])}</div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law"><div class="ln"><b>التعويض</b><span id="vS">أكمل القياسين 4.1 و 4.2</span></div></div>
    <div class="ans"><label>احسب الحجم V بوحدة cm³</label><input id="cIn" inputmode="decimal" dir="ltr" placeholder="cm³"><button type="button" class="go" id="cCk">تحقق</button></div><div class="fb2" id="cFb"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th><th>بوحدة SI</th></tr></thead>
    <tbody><tr><td>الطول L</td><td>أداة القدمة ذات الورنية</td><td id="rL1">—</td><td id="rL2">—</td></tr>
    <tr><td>القطر D</td><td>أداة الميكرومتر</td><td id="rD1">—</td><td id="rD2">—</td></tr>
    <tr><td>الحجم V</td><td>بالحساب: <span dir="ltr">V = π D² L / 4</span></td><td id="rV1">—</td><td id="rV2">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>
`;
  const $=id=>box.querySelector('#'+id);
  let L,D,okL=false,okD=false,vHint=false,mHint=false;
  const r1=x=>Math.round(x*10)/10,r2=x=>Math.round(x*100)/100;
  function newObj(){L=r1(25+Math.random()*60);D=r2(4+Math.random()*16);okL=okD=false;okV=false;vHint=mHint=false;$('vR').value=100;$('mR').value=25;['vIn','mIn','cIn'].forEach(k=>$(k).value='');['vFb','mFb','cFb'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});vDraw();mDraw();vol()}
  /* --- القدمة --- */
  function vVal(){let o=r1(+$('vR').value);if(o<L){o=L;$('vR').value=o}return o}
  function vDraw(){const o=vVal(),touch=Math.abs(o-L)<1e-6;$('vO').textContent=o.toFixed(1)+' mm';
    $('vSt').textContent=touch?'✓ فكا أداة القدمة يلامسان الأسطوانة، اقرأ القياس من التدريجين':'يوجد فراغ بين الفك والأسطوانة، قرّب الفك';
    const px=3.4,x0=30,xo=x0+o*px,xl=x0+L*px,h=Math.min(D*3.2,60);
    $('vTop').innerHTML=`<rect x="10" y="14" width="385" height="16" rx="3" fill="#94A3B8"/>${Array.from({length:11},(_,i)=>`<line x1="${x0+i*10*px}" y1="14" x2="${x0+i*10*px}" y2="22" stroke="#1F2937"/>`).join('')}
      <path d="M${x0-14} 14 H${x0} V110 H${x0-6} L${x0-14} 96 Z" fill="#F7931E"/>
      <rect x="${x0}" y="${70-h/2}" width="${L*px}" height="${h}" rx="3" fill="url(#cyl)"/>
      <defs><linearGradient id="cyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>
      <path d="M${xo} 10 H${xo+40} V34 H${xo+14} V110 H${xo+6} L${xo} 96 Z" fill="#F7931E" opacity=".95"/>`;
    const k=13,s0=Math.floor(o)-5,X=mm=>20+(mm-s0)*k;let g='<rect x="0" y="18" width="400" height="52" fill="#E5E7EB"/><rect x="0" y="70" width="400" height="56" fill="#FDE7C8"/>';
    for(let m=s0;m<=s0+28;m++){const x=X(m),c=m%10===0,f5=m%5===0;g+=`<line x1="${x}" y1="70" x2="${x}" y2="${70-(c?24:f5?16:10)}" stroke="#111827" stroke-width="${c?1.6:1}"/>`;if(c&&m>=0)g+=`<text x="${x}" y="38" font-size="12" text-anchor="middle" font-weight="700" fill="#111827">${m/10}</text>`}
    for(let i=0;i<=10;i++){const x=X(o+0.9*i),b=i%5===0,hl=vHint&&touch&&Math.abs(((o+0.9*i)%1+1)%1)<0.02||vHint&&touch&&Math.abs(((o+0.9*i)%1+1)%1-1)<0.02;g+=`<line x1="${x}" y1="70" x2="${x}" y2="${70+(b?20:13)}" stroke="${hl?'#DC2626':'#111827'}" stroke-width="${hl?2.4:1}"/>`;if(b)g+=`<text x="${x}" y="104" font-size="12" text-anchor="middle" font-weight="700" fill="#111827">${i}</text>`}
    g+=`<text x="396" y="13" font-size="10" text-anchor="end" fill="#334155">التدريج الرئيسي</text><text x="396" y="122" font-size="10" text-anchor="end" fill="#9A3412">تدريج الورنية</text>`;
    $('vZm').innerHTML=g}
  /* --- الميكرومتر --- */
  function mVal(){let r=r2(+$('mR').value);if(r<D){r=D;$('mR').value=r}return r}
  function mDraw(){const r=mVal(),touch=Math.abs(r-D)<1e-6;$('mO').textContent=r.toFixed(2)+' mm';
    $('mSt').textContent=touch?'✓ عمود أداة الميكرومتر يلامس السلك، اقرأ القياس':'يوجد فراغ، أدر الأسطوانة حتى يلامس السلك';
    const px=4,a=84,sp=a+r*px,dd=D*px,cy=70;
    let kn='';for(let q=0;q<9;q++)kn+=`<line x1="${308+q*4}" y1="52" x2="${308+q*4}" y2="88" stroke="#9A3412" stroke-width=".8" opacity=".6"/>`;
    let rk='';for(let q=0;q<6;q++)rk+=`<line x1="${346+q*5}" y1="61" x2="${346+q*5}" y2="79" stroke="#9A3412" stroke-width=".8" opacity=".7"/>`;
    let sk='';for(let q=0;q<=8;q++)sk+=`<line x1="${236+q*6}" y1="${cy}" x2="${236+q*6}" y2="${q%2?cy+6:cy-7}" stroke="#1F2937" stroke-width=".9"/>`;
    $('mTop').innerHTML=`<defs><linearGradient id="mRod" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E3A8A"/><stop offset=".45" stop-color="#60A5FA"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient>
        <linearGradient id="mTh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset=".45" stop-color="#F7931E"/><stop offset="1" stop-color="#C2410C"/></linearGradient></defs>
      <path d="M48,44 H66 V122 Q66,136 84,136 H210 Q224,136 224,122 V82 H240 V126 Q240,152 212,152 H84 Q48,152 48,124 Z" fill="#64748B" stroke="#334155"/>
      <rect x="66" y="${cy-8}" width="${a-66}" height="16" fill="#F7931E" stroke="#9A3412"/>
      <rect x="${a}" y="${cy-36}" width="${dd}" height="72" fill="url(#mRod)"/><ellipse cx="${a+dd/2}" cy="${cy-36}" rx="${dd/2}" ry="4" fill="#BFDBFE" stroke="#1E3A8A" stroke-width=".8"/><ellipse cx="${a+dd/2}" cy="${cy+36}" rx="${dd/2}" ry="4" fill="#1E3A8A"/>
      <rect x="${sp}" y="${cy-7}" width="${232-sp}" height="14" fill="#CBD5E1" stroke="#64748B"/><rect x="${sp}" y="${cy-8}" width="7" height="16" fill="#F7931E"/>
      <rect x="230" y="${cy-12}" width="58" height="24" fill="#E5E7EB" stroke="#475569"/><line x1="230" y1="${cy}" x2="288" y2="${cy}" stroke="#1F2937" stroke-width="1.2"/>${sk}
      <path d="M282,52 H342 V88 H282 L288,82 V58 Z" fill="url(#mTh)" stroke="#9A3412"/>${kn}
      <rect x="342" y="60" width="34" height="20" rx="5" fill="#FB923C" stroke="#9A3412"/>${rk}`;
    const k=14,X=mm=>18+mm*k,xe=X(r);let g='<rect x="0" y="40" width="'+xe+'" height="70" fill="#E5E7EB"/><line x1="0" y1="75" x2="'+xe+'" y2="75" stroke="#111827" stroke-width="1.5"/>';
    for(let m=0;m<=25;m++){if(X(m)>xe+0.5)break;g+=`<line x1="${X(m)}" y1="75" x2="${X(m)}" y2="${m%5===0?58:64}" stroke="#111827"/>`;if(m%5===0)g+=`<text x="${X(m)}" y="52" font-size="11" text-anchor="middle" font-weight="700" fill="#111827">${m}</text>`;
      if(X(m+0.5)<=xe+0.5)g+=`<line x1="${X(m+0.5)}" y1="75" x2="${X(m+0.5)}" y2="85" stroke="#111827"/>`}
    const t=((r%0.5)+0.5)%0.5/0.01;g+=`<rect x="${xe}" y="16" width="${400-xe}" height="118" fill="#FDE7C8" stroke="#C2410C"/>`;
    for(let j=Math.floor(t)-7;j<=Math.ceil(t)+7;j++){const y=75-(j-t)*7.5;if(y<20||y>130)continue;const jj=((j%50)+50)%50,b=jj%5===0,hl=mHint&&touch&&Math.abs(j-t)<0.5;g+=`<line x1="${xe}" y1="${y}" x2="${xe+(b?18:11)}" y2="${y}" stroke="${hl?'#DC2626':'#111827'}" stroke-width="${hl?2.4:1}"/>`;if(b)g+=`<text x="${xe+22}" y="${y+4}" font-size="11" font-weight="700" fill="#111827">${jj}</text>`}
    g+=`<text x="6" y="124" font-size="10" text-anchor="start" fill="#334155">التدريج الخطي</text><text x="396" y="147" font-size="10" text-anchor="end" fill="#9A3412">التدريج الدائري</text>`;
    $('mZm').innerHTML=g}
  let okV=false;
  function results(){const E=x=>'\u2066'+x+'\u2069';
    $('rL1').textContent=okL?E(L.toFixed(1)+' mm'):'—';$('rL2').textContent=okL?E((L/1000).toFixed(4)+' m'):'—';
    $('rD1').textContent=okD?E(D.toFixed(2)+' mm'):'—';$('rD2').textContent=okD?E((D/1000).toFixed(5)+' m'):'—';
    const V=Math.PI*D*D*L/4;$('rV1').textContent=okV?E((V/1000).toFixed(2)+' cm³'):'—';$('rV2').textContent=okV?E(sci(V*1e-9)+' m³'):'—';
    $('rNote').textContent=okL&&okD&&okV?'الاستنتاج: أداة الميكرومتر أدق، فدقتها '+E('0.01 mm')+' مقابل '+E('0.1 mm')+' لأداة القدمة ذات الورنية، لذلك استُخدمت لقياس القطر الصغير. والحجم كمية مشتقة حُسبت من كميتين أساسيتين مقيستين.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  function vol(){results();if(!(okL&&okD)){$('vS').textContent='أكمل القياسين 4.1 و 4.2';return}
    const Lm=L/1000,Dm=D/1000,V=Math.PI*Dm*Dm*Lm/4;
    $('vS').textContent=`V = π × (${sci(Dm)} m)² × ${sci(Lm)} m / 4 = ${sci(V)} m³`}
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  $('vR').oninput=vDraw;$('mR').oninput=mDraw;
  box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{$('vR').value=r1(+$('vR').value+ +b.dataset.d);vDraw()});
  box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{$('mR').value=r2(+$('mR').value+ +b.dataset.m);mDraw()});
  $('vHn').onclick=()=>{vHint=true;vDraw();fb('vFb',true,'تلميح: اقرأ أولا آخر ملليمتر في التدريج الرئيسي قبل صفر الورنية، ثم ابحث عن خط الورنية المنطبق تماما على خط من التدريج الرئيسي (ظهر باللون الأحمر)، واضرب رقمه في 0.1 mm.')};
  $('mHn').onclick=()=>{mHint=true;mDraw();fb('mFb',true,'تلميح: اقرأ آخر خط ظاهر في التدريج الخطي (ملليمتر كامل أو نصف ملليمتر)، ثم أضف رقم قسم التدريج الدائري المنطبق على الخط الأفقي (ظهر باللون الأحمر) مضروبا في 0.01 mm.')};
  $('vCk').onclick=()=>{const o=vVal(),v=num($('vIn').value);if(Math.abs(o-L)>1e-6)return fb('vFb',false,'قرّب الفك حتى يلامس الأسطوانة أولا.');if(isNaN(v))return fb('vFb',false,'اكتب قراءتك بالملليمتر.');
    const mm=Math.floor(L+1e-9),n=Math.round((L-mm)*10);if(Math.abs(v-L)<0.05){okL=true;fb('vFb',true,'✓ قراءة صحيحة:\n'+E(`L = ${mm} mm + ${n} × 0.1 mm = ${L.toFixed(1)} mm = ${(L/1000).toFixed(4)} m`))}else fb('vFb',false,'✗ القراءة غير صحيحة، أعد قراءة التدريجين أو استخدم التلميح.');vol()};
  $('mCk').onclick=()=>{const r=mVal(),v=num($('mIn').value);if(Math.abs(r-D)>1e-6)return fb('mFb',false,'أدر الأسطوانة حتى يلامس العمود السلك أولا.');if(isNaN(v))return fb('mFb',false,'اكتب قراءتك بالملليمتر.');
    const lin=Math.floor(D*2+1e-9)/2,c=Math.round((D-lin)*100);if(Math.abs(v-D)<0.005){okD=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`D = ${lin.toFixed(1)} mm + ${c} × 0.01 mm = ${D.toFixed(2)} mm = ${(D/1000).toFixed(5)} m`))}else fb('mFb',false,'✗ القراءة غير صحيحة، أعد قراءة التدريجين أو استخدم التلميح.');vol()};
  $('cCk').onclick=()=>{if(!(okL&&okD))return fb('cFb',false,'أكمل قياس الطول والقطر أولا.');const v=num($('cIn').value),V=Math.PI*D*D*L/4/1000;if(isNaN(v))return fb('cFb',false,'اكتب الحجم بوحدة cm³.');
    if(Math.abs(v-V)/V<0.02){okV=true;results();}if(Math.abs(v-V)/V<0.02)fb('cFb',true,'✓ إجابة صحيحة:\n'+E(`V = ${V.toFixed(2)} cm³ = ${sci(V*1e-6)} m³`)+'\nلأن '+E('1 cm³ = 10⁻⁶ m³')+'.');else fb('cFb',false,'✗ راجع التحويل: حوّل D وL إلى cm أولا (1 cm = 10 mm)، ثم عوّض في V = π D² L / 4.')};
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

/* ===== الوحدة الأولى — التحويل بين الوحدات: سرعة عربة على مسار (أداة الشريط المتري وأداة ساعة الإيقاف) ===== */
function speedTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let tk='';for(let c=0;c<=24;c++){const x=118+c*10.5;tk+=`<line x1="${x}" y1="104" x2="${x}" y2="${c%5===0?118:111}" stroke="#1F2937" stroke-width="${c%5===0?1.3:.8}"/>`;if(c%5===0&&c>0)tk+=`<text x="${x}" y="130" font-size="12" font-weight="800" text-anchor="middle" fill="#1F2937">${c}</text>`}
  const tape=`<svg viewBox="16 0 372 230" aria-label="أداة الشريط المتري">
    <rect x="118" y="102" width="256" height="30" fill="#FDE68A" stroke="#A16207"/>${tk}
    <path d="M374,96 H384 V140 H374 Z" fill="#F7931E" stroke="#9A3412"/><rect x="128" y="140" width="44" height="24" rx="6" fill="#F7931E"/><text x="150" y="157" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text>
    <rect x="34" y="70" width="88" height="96" rx="22" fill="#F7931E" stroke="#9A3412"/><circle cx="78" cy="118" r="22" fill="#FB923C" stroke="#9A3412"/><circle cx="78" cy="118" r="7" fill="#9A3412"/>
    <rect x="62" y="60" width="32" height="12" rx="4" fill="#334155"/>
    ${lbl(78,150,62,206,'العلبة')}${lbl(240,117,250,190,'الشريط المدرج')}${lbl(379,118,384,190,'الخطاف','end')}${lbl(78,62,92,22,'زر التثبيت')}${lbl(200,106,250,40,'التدريج بالسنتيمتر')}
  </svg>`;
  let dk='';for(let i=0;i<30;i++){const a=i/30*2*Math.PI-Math.PI/2,five=i%5===0,one=true,r1=five?50:56,x1=200+r1*Math.cos(a),y1=122+r1*Math.sin(a),x2=200+63*Math.cos(a),y2=122+63*Math.sin(a);dk+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1F2937" stroke-width="${five?1.6:one?1:.5}"/>`;if(five){dk+=`<text x="${200+40*Math.cos(a)}" y="${122+40*Math.sin(a)+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#1F2937">${i}</text>`}}
  const sw=`<svg viewBox="16 0 372 230" aria-label="أداة ساعة الإيقاف">
    <rect x="190" y="30" width="20" height="16" rx="3" fill="#F7931E" stroke="#9A3412"/><rect x="186" y="44" width="28" height="8" rx="3" fill="#64748B"/>
    <rect x="258" y="56" width="14" height="22" rx="3" transform="rotate(40 265 67)" fill="#334155"/>
    <circle cx="200" cy="122" r="76" fill="#64748B" stroke="#334155" stroke-width="2"/><circle cx="200" cy="122" r="66" fill="#F8FAFC" stroke="#94A3B8"/>${dk}
    <line x1="200" y1="122" x2="${200+55*Math.cos(7/30*2*Math.PI-Math.PI/2)}" y2="${122+55*Math.sin(7/30*2*Math.PI-Math.PI/2)}" stroke="#F7931E" stroke-width="3" stroke-linecap="round"/><circle cx="200" cy="122" r="5" fill="#F7931E"/><rect x="187" y="129" width="26" height="18" rx="5" fill="#F7931E"/><text x="200" y="143" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">s</text>
    ${lbl(200,34,120,18,'زر التشغيل والإيقاف')}${lbl(268,64,330,40,'زر التصفير')}${lbl(150,160,110,206,'القرص المدرج بالثانية')}${lbl(222,112,320,150,'العقرب','start')}${lbl(270,150,330,206,'الإطار')}
  </svg>`;
  return `<div class="intro"><h3>3. الأدوات المستخدمة</h3>
    <div class="tool"><div class="stage">${tape}</div><p><b>أداة الشريط المتري:</b> تقيس المسافات والأطوال الكبيرة بالسنتيمتر بدقة <span dir="ltr">0.1 cm</span>.</p></div>
    <div class="tool"><div class="stage">${sw}</div><p><b>أداة ساعة الإيقاف:</b> تقيس الزمن بالثانية بدقة <span dir="ltr">1 s</span>، ودورة العقرب الكاملة <span dir="ltr">30 s</span>.</p></div></div>`}
function speedLab2(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">قياس سرعة جسم متحرك والتحويل بين وحداتها</p></div>
  <div class="tags"><span class="tag">المسافة d: <i>أداة الشريط المتري</i> · cm</span><span class="tag">الزمن t: <i>أداة ساعة الإيقاف</i> · s</span><span class="tag dv">السرعة v: <i>كمية مشتقة</i> · cm/s ← m/s ← km/h</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء أداة الشريط المتري وأداة ساعة الإيقاف.</li>
    <li>قراءة المسافة بأداة الشريط المتري بدقة <span dir="ltr">0.1 cm</span>.</li>
    <li>قراءة الزمن بأداة ساعة الإيقاف بدقة <span dir="ltr">1 s</span>.</li>
    <li>حساب السرعة بوحدة <span dir="ltr">cm/s</span> من القياسين.</li>
    <li>تحويل السرعة إلى <span dir="ltr">m/s</span> ثم إلى <span dir="ltr">km/h</span> باستخدام معاملات التحويل.</li></ol></div>
  ${speedTools()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 مسار جديد</button></div>
  <div class="ctl"><h3>4.1 قياس المسافة d بأداة الشريط المتري</h3>
    <div class="stage"><svg id="tTop" viewBox="0 0 400 120"></svg><svg id="tZm" viewBox="0 0 400 120"></svg><div class="hud"><span id="tSt"></span></div></div>
    <div class="row"><label for="tR">سحب الشريط</label><output id="tO"></output><input id="tR" type="range" min="0" max="200" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لسحب الشريط حتى يصل الخطاف إلى خط النهاية.</p>
    <div class="ans"><label>قراءتك للمسافة d</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <div class="ctl"><h3>4.2 قياس الزمن t بأداة ساعة الإيقاف</h3>
    <div class="stage"><svg id="sTop" viewBox="0 0 400 90"></svg><svg id="sW" viewBox="0 0 400 262"></svg><div class="hud"><span id="sSt"></span></div></div>
    <div class="row"><label for="sR">حركة العربة</label><output id="sO"></output><input id="sR" type="range" min="0" max="30" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك العربة من خط البداية حتى خط النهاية، وتتوقف ساعة الإيقاف عند وصولها.</p>
    <div class="ans"><label>قراءتك للزمن t</label><input id="sIn" inputmode="decimal" dir="ltr" placeholder="s"><button type="button" class="go" id="sCk">تحقق</button><button type="button" class="rs" id="sHn">تلميح</button></div><div class="fb2" id="sFb"></div>
  </div>
  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law"><div class="ln"><b>القانون</b><span>v = d / t</span></div><div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">v</span> سرعة العربة، ووحدتها <span dir="ltr">m/s</span></li>
      <li><span class="chip" dir="ltr">d</span> المسافة، وتقاس بأداة الشريط المتري، ووحدتها <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">t</span> الزمن، ويقاس بأداة ساعة الإيقاف، ووحدته <span dir="ltr">s</span></li></ul></div>
      ${convBox(['d(m) = d(cm) / 100','d(km) = d(m) / 1000','v(m/s) = v(cm/s) / 100','v(km/h) = v(m/s) × 3.6'])}</div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law"><div class="ln"><b>التعويض</b><span id="vS">أكمل القياسين 4.1 و 4.2</span></div></div>
    <div class="ans"><label>1. احسب السرعة v بوحدة cm/s</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="cm/s"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div>
    <div class="ans"><label>2. حوّل السرعة إلى m/s</label><input id="c2" inputmode="decimal" dir="ltr" placeholder="m/s"><button type="button" class="go" id="c2k">تحقق</button></div><div class="fb2" id="c2f"></div>
    <div class="ans"><label>3. حوّل السرعة إلى km/h</label><input id="c3" inputmode="decimal" dir="ltr" placeholder="km/h"><button type="button" class="go" id="c3k">تحقق</button></div><div class="fb2" id="c3f"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th><th>بوحدة SI</th></tr></thead>
    <tbody><tr><td>المسافة d</td><td>أداة الشريط المتري</td><td id="r1a">—</td><td id="r1b">—</td></tr>
    <tr><td>الزمن t</td><td>أداة ساعة الإيقاف</td><td id="r2a">—</td><td id="r2b">—</td></tr>
    <tr><td>السرعة v</td><td>بالحساب: <span dir="ltr">v = d / t</span></td><td id="r3a">—</td><td id="r3b">—</td></tr>
    <tr><td>السرعة v</td><td>بالتحويل</td><td id="r4a">—</td><td>—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  let d,T,okD,okT,ok1,ok2,ok3,tHint,sHint;
  const r1=x=>Math.round(x*10)/10;
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const X0=40,PX=1.6;
  function track(svg,cartX,extra){return `<rect x="0" y="${svg==='s'?62:78}" width="400" height="10" fill="#94A3B8"/>
    <line x1="${X0}" y1="${svg==='s'?18:30}" x2="${X0}" y2="${svg==='s'?72:88}" stroke="#16A34A" stroke-width="3"/><text x="${X0}" y="${svg==='s'?14:26}" font-size="10" font-weight="700" text-anchor="middle" fill="#16A34A">البداية</text>
    <line x1="${X0+d*PX}" y1="${svg==='s'?18:30}" x2="${X0+d*PX}" y2="${svg==='s'?72:88}" stroke="#DC2626" stroke-width="3"/><text x="${X0+d*PX}" y="${svg==='s'?14:26}" font-size="10" font-weight="700" text-anchor="middle" fill="#DC2626">النهاية</text>${extra||''}`}
  function newObj(){d=r1(40+Math.random()*140);T=Math.round(5+Math.random()*23);okD=okT=ok1=ok2=ok3=false;tHint=sHint=false;
    $('tR').value=0;$('sR').value=0;['tIn','sIn','c1','c2','c3'].forEach(k=>$(k).value='');['tFb','sFb','c1f','c2f','c3f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});tDraw();sDraw();sub();results()}
  function tVal(){let e=r1(+$('tR').value);if(e>d){e=d;$('tR').value=e}return e}
  function tDraw(){const e=tVal(),touch=Math.abs(e-d)<1e-6;$('tO').textContent=e.toFixed(1)+' cm';
    $('tSt').textContent=touch?'✓ الخطاف عند خط النهاية، اقرأ المسافة من التدريج':'اسحب الشريط حتى يصل الخطاف إلى خط النهاية';
    const xe=X0+e*PX;
    $('tTop').innerHTML=track('t',0,`<rect x="${X0}" y="60" width="${e*PX}" height="12" fill="#FDE68A" stroke="#A16207" stroke-width=".6"/><rect x="${X0-34}" y="46" width="34" height="34" rx="9" fill="#F7931E" stroke="#9A3412"/><circle cx="${X0-17}" cy="63" r="9" fill="#FB923C" stroke="#9A3412"/><rect x="${xe-2}" y="56" width="5" height="20" fill="#F7931E" stroke="#9A3412"/>`);
    const k=26,s0=Math.floor(e)-6,XX=c=>20+(c-s0)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#FDE68A"/>';
    for(let m=s0*10;m<=(s0+15)*10;m++){const c=m/10,x=XX(c);if(x<0||x>400)continue;const big=m%10===0,mid=m%5===0;const hl=tHint&&touch&&m===Math.round(d*10);g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?22:mid?15:9)}" stroke="${hl?'#DC2626':'#1F2937'}" stroke-width="${hl?2.4:big?1.4:.8}"/>`;if(big&&c>=0)g+=`<text x="${x}" y="58" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${c}</text>`}
    g+=`<line x1="${XX(e)}" y1="10" x2="${XX(e)}" y2="86" stroke="#F7931E" stroke-width="3"/><text x="${XX(e)}" y="100" font-size="10" text-anchor="middle" fill="var(--ink)">حافة الخطاف</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="109" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="110" font-size="12" font-weight="700" text-anchor="start" fill="var(--muted)">تكبير التدريج</text>`;
    $('tZm').innerHTML=g}
  function sVal(){let t=+$('sR').value;if(t>T){t=T;$('sR').value=t}return t}
  function sDraw(){const t=sVal(),done=Math.abs(t-T)<1e-6;$('sO').textContent=done?'وصلت العربة':'';
    $('sSt').textContent=done?'✓ وصلت العربة إلى خط النهاية وتوقفت ساعة الإيقاف، اقرأ الزمن':'حرّك العربة حتى تصل إلى خط النهاية';
    const cx=X0+d*PX*t/T;
    $('sTop').innerHTML=track('s',0,`<g transform="translate(${cx},0)"><rect x="-34" y="34" width="34" height="20" rx="4" fill="#3B82F6" stroke="#1E3A8A"/><circle cx="-26" cy="58" r="5" fill="#111827"/><circle cx="-8" cy="58" r="5" fill="#111827"/></g>`);
    const C=130,R=118;let g=`<circle cx="200" cy="${C}" r="${R+8}" fill="#64748B" stroke="#334155" stroke-width="2"/><circle cx="200" cy="${C}" r="${R}" fill="#F8FAFC" stroke="#94A3B8"/><rect x="188" y="0" width="24" height="8" rx="3" fill="#F7931E"/>`;
    for(let i=0;i<30;i++){const a=i/30*2*Math.PI-Math.PI/2,five=i%5===0,one=true,r1=five?R-22:R-13;const hl=sHint&&done&&i===Math.round(T)%30;g+=`<line x1="${200+r1*Math.cos(a)}" y1="${C+r1*Math.sin(a)}" x2="${200+(R-1)*Math.cos(a)}" y2="${C+(R-1)*Math.sin(a)}" stroke="${hl?'#DC2626':'#1F2937'}" stroke-width="${hl?2.6:five?2.2:one?1.5:1}"/>`;if(five)g+=`<text x="${200+(R-38)*Math.cos(a)}" y="${C+(R-38)*Math.sin(a)+6}" font-size="17" font-weight="800" text-anchor="middle" fill="#1F2937">${i}</text>`}
    const a=t/30*2*Math.PI-Math.PI/2;g+=`<line x1="200" y1="${C}" x2="${200+(R-6)*Math.cos(a)}" y2="${C+(R-6)*Math.sin(a)}" stroke="#F7931E" stroke-width="3.5" stroke-linecap="round"/><circle cx="200" cy="${C}" r="7" fill="#F7931E"/><rect x="185" y="${C+22}" width="30" height="20" rx="5" fill="#F7931E"/><text x="200" y="${C+37}" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">s</text>`;
    $('sW').innerHTML=g}
  const vc=()=>d/T,vm=()=>d/T/100,vk=()=>d/T/100*3.6;
  function sub(){$('vS').textContent=okD&&okT?E(`v = d / t = ${d.toFixed(1)} cm / ${T} s`):'أكمل القياسين 4.1 و 4.2'}
  function results(){
    $('r1a').textContent=okD?E(d.toFixed(1)+' cm'):'—';$('r1b').textContent=okD?E((d/100).toFixed(3)+' m'):'—';
    $('r2a').textContent=okT?E(T+' s'):'—';$('r2b').textContent=okT?E(T+' s'):'—';
    $('r3a').textContent=ok1?E(vc().toFixed(1)+' cm/s'):'—';$('r3b').textContent=ok2?E(vm().toFixed(3)+' m/s'):'—';
    $('r4a').textContent=ok3?E(vk().toFixed(2)+' km/h'):'—';
    $('rNote').textContent=ok1&&ok2&&ok3?'الاستنتاج: تحويل الوحدات يغير العدد ولا يغير الكمية، فالسرعة نفسها تساوي:\n'+E(vc().toFixed(1)+' cm/s = '+vm().toFixed(3)+' m/s = '+vk().toFixed(2)+' km/h'):'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('tR').oninput=tDraw;$('sR').oninput=sDraw;
  $('tHn').onclick=()=>{tHint=true;tDraw();fb('tFb',true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل حافة الخطاف، ثم عُدّ الأقسام الصغيرة حتى الخط الأحمر.')};
  $('sHn').onclick=()=>{sHint=true;sDraw();fb('sFb',true,'تلميح: الأرقام على القرص بالثانية وبين كل رقمين '+E('5 s')+'، وكل قسم صغير '+E('1 s')+'. اقرأ آخر رقم مر به العقرب، ثم عُدّ الأقسام حتى العقرب (ظهر باللون الأحمر).')};
  $('tCk').onclick=()=>{if(Math.abs(tVal()-d)>1e-6)return fb('tFb',false,'اسحب الشريط حتى يصل الخطاف إلى خط النهاية أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب قراءتك بالسنتيمتر.');
    if(Math.abs(v-d)<0.05){okD=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`d = ${d.toFixed(1)} cm = ${(d/100).toFixed(3)} m`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('sCk').onclick=()=>{if(Math.abs(sVal()-T)>1e-6)return fb('sFb',false,'حرّك العربة حتى تصل إلى خط النهاية أولا.');const v=num($('sIn').value);if(isNaN(v))return fb('sFb',false,'اكتب قراءتك بالثانية.');
    if(Math.abs(v-T)<0.05){okT=true;fb('sFb',true,'✓ قراءة صحيحة:\n'+E(`t = ${T} s`))}else fb('sFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  const chk=(inp,f,val,unit,okMsg,badMsg,set)=>{if(!(okD&&okT))return fb(f,false,'أكمل القياسين 4.1 و 4.2 أولا.');const v=num($(inp).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة '+unit+'.');
    if(Math.abs(v-val)/val<0.02){set();fb(f,true,okMsg)}else fb(f,false,badMsg);results()};
  $('c1k').onclick=()=>chk('c1','c1f',vc(),'cm/s','✓ إجابة صحيحة:\n'+E(`v = ${d.toFixed(1)} / ${T} = ${vc().toFixed(1)} cm/s`),'✗ اقسم المسافة بالسنتيمتر على الزمن بالثانية.',()=>ok1=true);
  $('c2k').onclick=()=>chk('c2','c2f',vm(),'m/s','✓ إجابة صحيحة:\n'+E(`${vc().toFixed(1)} cm/s / 100 = ${vm().toFixed(3)} m/s`),'✗ لأن '+E('1 m = 100 cm')+'، اقسم السرعة بوحدة cm/s على 100.',()=>ok2=true);
  $('c3k').onclick=()=>chk('c3','c3f',vk(),'km/h','✓ إجابة صحيحة:\n'+E(`${vm().toFixed(3)} m/s × 3.6 = ${vk().toFixed(2)} km/h`),'✗ اضرب السرعة بوحدة m/s في 3600 ثم اقسم على 1000، أي اضربها في 3.6.',()=>ok3=true);
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function ftDisk(o){/* o:{strings:[{a,c,lab}],ring:[dx,dy],mag:a,hl} */
  const C=200,R=138,P=(r,a)=>[C+r*Math.cos(a*Math.PI/180),C-r*Math.sin(a*Math.PI/180)];
  let g=`<circle cx="${C}" cy="${C}" r="${R+8}" fill="#CBD5E1" stroke="#475569" stroke-width="2"/><circle cx="${C}" cy="${C}" r="${R}" fill="#F8FAFC" stroke="#94A3B8"/>`;
  for(let i=0;i<360;i++){const big=i%10===0,mid=i%5===0;const[a1,b1]=P(R-(big?14:mid?9:5),i),[a2,b2]=P(R,i);g+=`<line x1="${a1}" y1="${b1}" x2="${a2}" y2="${b2}" stroke="#1F2937" stroke-width="${big?1.3:.6}"/>`;
    if(i%30===0){const[t1,t2]=P(R-28,i);g+=`<text x="${t1}" y="${t2+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#1F2937">${i}°</text>`}}
  const [rx,ry]=o.ring||[0,0];
  (o.strings||[]).forEach(s=>{const[px,py]=P(R+18,s.a),[hx,hy]=P(R+40,s.a);
    g+=`<line x1="${C+rx}" y1="${C+ry}" x2="${px}" y2="${py}" stroke="${s.c}" stroke-width="3"/><circle cx="${px}" cy="${py}" r="9" fill="#94A3B8" stroke="#334155" stroke-width="2"/><circle cx="${px}" cy="${py}" r="3" fill="#334155"/>
      <rect x="${hx-15}" y="${hy-11}" width="30" height="22" rx="5" fill="${s.c}"/><text x="${hx}" y="${hy+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">${s.lab}</text>`});
  g+=`<circle cx="${C+rx}" cy="${C+ry}" r="13" fill="none" stroke="#F7931E" stroke-width="5"/><circle cx="${C}" cy="${C}" r="4" fill="#DC2626"/>`;
  if(o.mag!=null){const[mx,my]=P(R-8,o.mag);g+=`<circle cx="${mx}" cy="${my}" r="17" fill="rgba(247,147,30,.18)" stroke="#F7931E" stroke-width="3"/>`}
  return g}
function ftBalance(m,disp,hy){return `<rect x="110" y="150" width="180" height="46" rx="8" fill="#64748B" stroke="#334155" stroke-width="2"/>
  <rect x="150" y="160" width="100" height="26" rx="4" fill="#C9D8C0" stroke="#1B2416"/><text x="240" y="179" font-size="17" font-weight="800" text-anchor="end" fill="#1B2416" direction="ltr">${disp}</text>
  <rect x="120" y="140" width="160" height="10" rx="3" fill="#94A3B8" stroke="#334155"/>
  ${m?`<g transform="translate(0,${hy})"><line x1="200" y1="0" x2="200" y2="40" stroke="#334155" stroke-width="3"/><path d="M190 0 Q200 -12 210 0" fill="none" stroke="#334155" stroke-width="3"/>
  <rect x="170" y="40" width="60" height="10" rx="2" fill="#2563EB" stroke="#1E3A8A"/><rect x="172" y="50" width="56" height="10" rx="2" fill="#3B82F6" stroke="#1E3A8A"/><rect x="174" y="60" width="52" height="10" rx="2" fill="#2563EB" stroke="#1E3A8A"/><rect x="166" y="70" width="68" height="6" rx="2" fill="#334155"/></g>`:''}`}
function ft3D(strs){/* منظر ثلاثي الأبعاد لجهاز طاولة القوى */
  const cx=230,cy=150,rx=175,ry=58,T=12,D=Math.PI/180,P=(a,k)=>[cx+rx*k*Math.cos(a*D),cy-ry*k*Math.sin(a*D)];
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let defs=`<defs><linearGradient id="t3top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8FAFC"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient><linearGradient id="t3side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#64748B"/><stop offset=".5" stop-color="#94A3B8"/><stop offset="1" stop-color="#475569"/></linearGradient><linearGradient id="t3rod" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#475569"/><stop offset=".5" stop-color="#CBD5E1"/><stop offset="1" stop-color="#334155"/></linearGradient><linearGradient id="t3w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#78350F"/><stop offset=".45" stop-color="#D97706"/><stop offset="1" stop-color="#78350F"/></linearGradient></defs>`;
  /* القاعدة الثلاثية والعمود */
  let base=`<ellipse cx="${cx}" cy="388" rx="150" ry="16" fill="#0F172A" opacity=".10"/>
    <path d="M${cx-6} 330 L${cx-130} 385 M${cx+6} 330 L${cx+130} 385 M${cx} 332 L${cx+18} 370" stroke="#334155" stroke-width="9" stroke-linecap="round"/>
    <rect x="${cx-9}" y="${cy+T}" width="18" height="${330-cy-T}" fill="url(#t3rod)"/><rect x="${cx-16}" y="318" width="32" height="18" rx="4" fill="#334155"/>`;
  /* الكتل المعلقة */
  const hang=(st)=>{const [px,py]=P(st.a,1.06),y0=py+8,yh=py+125;
    let w='';for(let i=0;i<3;i++){const yy=yh+6+i*11;w+=`<rect x="${px-17}" y="${yy}" width="34" height="9" fill="url(#t3w)"/><ellipse cx="${px}" cy="${yy}" rx="17" ry="4" fill="#F59E0B" stroke="#78350F" stroke-width=".8"/>`}
    return `<line x1="${px+7}" y1="${y0}" x2="${px+7}" y2="${yh}" stroke="${st.c}" stroke-width="2.2"/><line x1="${px+7}" y1="${yh}" x2="${px+7}" y2="${yh+6}" stroke="#334155" stroke-width="3"/>${w}<rect x="${px-19}" y="${yh+39}" width="38" height="5" rx="2" fill="#334155"/><rect x="${px-15}" y="${yh+48}" width="30" height="20" rx="5" fill="${st.c}"/><text x="${px}" y="${yh+63}" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">${st.lab}</text>`};
  const back=strs.filter(st=>Math.sin(st.a*D)>0.05),front=strs.filter(st=>!(Math.sin(st.a*D)>0.05));
  let g=defs+base+back.map(hang).join('');
  /* القرص */
  g+=`<path d="M${cx-rx} ${cy} L${cx-rx} ${cy+T} A${rx} ${ry} 0 0 0 ${cx+rx} ${cy+T} L${cx+rx} ${cy} Z" fill="url(#t3side)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#t3top)" stroke="#475569" stroke-width="1.6"/><ellipse cx="${cx}" cy="${cy}" rx="${rx*.86}" ry="${ry*.86}" fill="none" stroke="#94A3B8" stroke-width="1"/>`;
  for(let a=0;a<360;a+=10){const [x1,y1]=P(a,1),[x2,y2]=P(a,a%30?.94:.9);g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="${a%30?1:1.6}"/>`}
  [0,90,180,270].forEach(a=>{const [x,y]=P(a,.76);g+=`<text x="${x}" y="${y+4}" font-size="11" font-weight="800" fill="#334155" text-anchor="middle">${a}°</text>`});
  /* الخيوط على القرص والبكرات */
  strs.forEach(st=>{const [px,py]=P(st.a,1.06);g+=`<line x1="${cx}" y1="${cy-4}" x2="${px}" y2="${py-5}" stroke="${st.c}" stroke-width="2.4"/>`});
  strs.forEach(st=>{const [px,py]=P(st.a,1.06),[bx,by]=P(st.a,.98);g+=`<line x1="${bx}" y1="${by}" x2="${px}" y2="${py+4}" stroke="#334155" stroke-width="5"/><ellipse cx="${px}" cy="${py}" rx="9" ry="9" fill="#E2E8F0" stroke="#334155" stroke-width="2.4"/><circle cx="${px}" cy="${py}" r="2.6" fill="#334155"/>`});
  g+=`<ellipse cx="${cx}" cy="${cy-4}" rx="11" ry="5" fill="none" stroke="#F7931E" stroke-width="3.6"/><rect x="${cx-2.5}" y="${cy-18}" width="5" height="16" rx="2" fill="#1F2937"/>`;
  g+=front.map(hang).join('');
  g+=lbl(cx,cy-18,cx-95,40,'المسمار المركزي')+lbl(cx+10,cy-4,cx+110,40,'الحلقة')+lbl(P(235,1)[0],P(235,1)[1]+T,155,240,'القرص المدرج')+lbl(cx+9,300,cx+80,335,'الحامل','start')+(()=>{const q=strs.map(st=>P(st.a,1.06)).sort((u,v)=>u[0]-v[0])[0];return lbl(q[0]-6,q[1]-7,20,75,'البكرة','start')})()+lbl(P(40,1.06)[0]+17,P(40,1.06)[1]+145,452,205,'الكتل','end');
  return g}
function ftTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const t3=`<svg viewBox="0 10 460 395" aria-label="جهاز طاولة القوى ثلاثي الأبعاد">${ft3D([{a:30,c:'#2563EB',lab:'m₁'},{a:150,c:'#16A34A',lab:'m₂'},{a:270,c:'#F7931E',lab:'m₃'}])}</svg>`;
  const tbl=`<svg viewBox="-60 -50 520 510" aria-label="جهاز طاولة القوى">${ftDisk({strings:[{a:30,c:'#2563EB',lab:'m₁'},{a:150,c:'#16A34A',lab:'m₂'},{a:270,c:'#F7931E',lab:'m₃'}]})}
    ${lbl(200,200,90,-26,'المسمار المركزي')}${lbl(211,191,320,-26,'الحلقة')}${lbl(335,122,455,40,'البكرة','end')}${lbl(278,155,455,232,'الخيط','end')}${lbl(70,247,-55,330,'القرص المدرج بالدرجات','start')}${lbl(200,382,330,440,'حامل الكتل')}</svg>`;
  const bal=`<svg viewBox="20 30 360 215" aria-label="جهاز الميزان الرقمي">${ftBalance(1,'150.0 g',62)}${lbl(205,100,350,70,'حامل الكتل','end')}${lbl(150,145,60,110,'الكفة')}${lbl(170,173,60,222,'الشاشة')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${t3}</div><div class="vcap">منظر ثلاثي الأبعاد</div><div class="stage">${tbl}</div><div class="vcap">منظر علوي</div><p><b>جهاز طاولة القوى:</b> قرص أفقي مدرج من <span dir="ltr">0°</span> إلى <span dir="ltr">360°</span> بدقة <span dir="ltr">1°</span>، تُعلق على بكراته كتل بخيوط مربوطة بحلقة حول مسمار مركزي، وتكون القوى متزنة عندما تستقر الحلقة في المركز.</p></div>
    <div class="tool"><div class="stage">${bal}</div><p><b>جهاز الميزان الرقمي:</b> يقيس كتلة حامل الكتل مع ما عليه بالجرام بدقة <span dir="ltr">0.1 g</span>.</p></div></div>`}
function forceLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">إيجاد محصلة متجهين باستخدام طاولة القوى</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>جهاز الميزان الرقمي</i> · g</span><span class="tag">الزاوية θ: <i>جهاز طاولة القوى</i> · °</span><span class="tag dv">المحصلة R: <i>كمية متجهة</i> · N</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء جهاز طاولة القوى وجهاز الميزان الرقمي.</li>
    <li>قياس الكتل المعلقة بجهاز الميزان الرقمي.</li>
    <li>قراءة زوايا القوى من تدريج جهاز طاولة القوى بدقة <span dir="ltr">1°</span>.</li>
    <li>إيجاد قوة الاتزان تجريبيا بضبط الكتلة الثالثة وزاويتها حتى تستقر الحلقة في المركز.</li>
    <li>حساب مقدار محصلة متجهين بقانون جيب التمام، وتمثيلها بالرسم مع زاويتها، ومقارنتها بقوة الاتزان.</li></ol></div>
  ${ftTools()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قوى جديدة</button></div>
  <div class="ctl"><h3>4.1 قياس الكتلتين m₁ و m₂ بجهاز الميزان الرقمي</h3>
    <div class="btns hsel"><button type="button" data-h="1">الحامل m₁</button><button type="button" data-h="2">الحامل m₂</button></div>
    <div class="stage"><svg id="bS" viewBox="40 -10 320 220"></svg><div class="hud"><span id="bSt"></span></div></div>
    <div class="row"><label for="bR">إنزال الحامل على الكفة</label><output id="bO"></output><input id="bR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اختر الحامل، ثم اسحب المؤشر البرتقالي لإنزاله حتى يستقر على كفة الميزان.</p>
    <div class="ans"><label>قراءتك للكتلة m₁</label><input id="m1In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m1Ck">تحقق</button></div><div class="fb2" id="m1Fb"></div>
    <div class="ans"><label>قراءتك للكتلة m₂</label><input id="m2In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m2Ck">تحقق</button></div><div class="fb2" id="m2Fb"></div>
  </div>
  <div class="ctl"><h3>4.2 قياس الزاويتين θ₁ و θ₂ بجهاز طاولة القوى</h3>
    <div class="stage"><svg id="aS" viewBox="-30 -30 460 460"></svg><svg id="aZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="a1R">عدسة التكبير على خيط m₁</label><output id="a1O"></output><input id="a1R" type="range" min="0" max="359" step="1" value="0"></div>
    <div class="row"><label for="a2R">عدسة التكبير على خيط m₂</label><output id="a2O"></output><input id="a2R" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك عدسة التكبير على تدريج القرص حتى تتوقف عند الخيط.</p>
    <div class="ans"><label>قراءتك للزاوية θ₁</label><input id="t1In" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="t1Ck">تحقق</button><button type="button" class="rs" id="t1Hn">تلميح</button></div><div class="fb2" id="t1Fb"></div>
    <div class="ans"><label>قراءتك للزاوية θ₂</label><input id="t2In" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="t2Ck">تحقق</button><button type="button" class="rs" id="t2Hn">تلميح</button></div><div class="fb2" id="t2Fb"></div>
  </div>
  <div class="ctl"><h3>4.3 إيجاد قوة الاتزان</h3>
    <div class="stage"><svg id="eS" viewBox="-30 -30 460 460"></svg><div class="hud"><span id="eSt"></span></div></div>
    <div class="row"><label for="m3R">الكتلة الثالثة m₃</label><output id="m3O"></output><input id="m3R" type="range" min="0" max="600" step="5" value="0"></div>
    <div class="row"><label for="t3R">زاوية البكرة الثالثة θ₃</label><output id="t3O"></output><input id="t3R" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 حرّك المؤشر الأول لزيادة الكتلة m₃.<br>ثم حرّك المؤشر الثاني لتدوير البكرة الثالثة إلى الجهة المقابلة للخيطين حتى تستقر الحلقة في المركز، واضغط «تحقق».</p>
    <div class="ans"><label>عند استقرار الحلقة في المركز اضغط تحقق</label><button type="button" class="go" id="eCk">تحقق</button><button type="button" class="rs" id="eHn">تلميح</button></div><div class="fb2" id="eFb"></div>
  </div>
  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law ftl"><div class="ln lw"><b>وزن الكتلة</b><span>F = m g</span></div>
      <div class="ln lw"><b>مقدار المحصلة (قانون جيب التمام)</b><span>R = √( F₁² + F₂² + 2 F₁ F₂ cos θ )</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">F₁, F₂</span> القوتان المؤثرتان (وزن الكتلتين)، ووحدتهما <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">m</span> الكتلة المعلقة، وتقاس بجهاز الميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية الأرضية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">θ₁, θ₂</span> زاويتا القوتين، وتقاسان بتدريج جهاز طاولة القوى، ووحدتهما الدرجة <span dir="ltr">°</span></li>
      <li><span class="chip" dir="ltr">θ</span> الزاوية بين القوتين <span dir="ltr">θ = θ₂ − θ₁</span>، ووحدتها الدرجة <span dir="ltr">°</span></li>
      <li><span class="chip" dir="ltr">R</span> مقدار المحصلة، ووحدتها <span dir="ltr">N</span></li>
      </ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسين 4.1 و 4.2</span></div></div>
    <div class="ans"><label>احسب مقدار المحصلة R بوحدة N</label><input id="c4" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="c4k">تحقق</button></div><div class="fb2" id="c4f"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th><th>بوحدة SI</th></tr></thead>
    <tbody><tr><td>الكتلة m₁</td><td>جهاز الميزان الرقمي</td><td id="r1a">—</td><td id="r1b">—</td></tr>
    <tr><td>الكتلة m₂</td><td>جهاز الميزان الرقمي</td><td id="r2a">—</td><td id="r2b">—</td></tr>
    <tr><td>الزاوية θ₁</td><td>جهاز طاولة القوى</td><td id="r3a">—</td><td>—</td></tr>
    <tr><td>الزاوية θ₂</td><td>جهاز طاولة القوى</td><td id="r4a">—</td><td>—</td></tr>
    <tr><td>الزاوية بين القوتين θ</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">θ = θ₂ − θ₁</span></td><td id="r8a">—</td><td>—</td></tr>
    <tr><td>المحصلة R</td><td>بالحساب</td><td id="r5a">—</td><td id="r5b">—</td></tr>
    <tr><td>زاوية المحصلة θR</td><td>بالحساب</td><td id="r7a">—</td><td>—</td></tr>
    <tr><td>قوة الاتزان</td><td>جهاز طاولة القوى (تجريبيا)</td><td id="r6a">—</td><td id="r6b">—</td></tr></tbody></table></div>
    <div class="stage" id="rStage" hidden><svg id="rS" viewBox="0 0 400 428"></svg></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id),G=9.8,D2R=Math.PI/180;
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fx=(x,n)=>String(+x.toFixed(n));
  let m1,m2,t1,t2,ok={},hs=1,zoomOf=1,h1=false,h2=false;
  const F1=()=>m1/1000*G,F2=()=>m2/1000*G,TH=()=>t2-t1;
  const RR=()=>Math.sqrt(F1()**2+F2()**2+2*F1()*F2()*Math.cos(TH()*D2R));
  const AL=()=>Math.atan2(F2()*Math.sin(TH()*D2R),F1()+F2()*Math.cos(TH()*D2R))/D2R;
  const TR=()=>t1+AL(),TE=()=>(TR()+180)%360,MR=()=>RR()/G*1000;
  const adiff=(a,b)=>{let d=Math.abs(a-b)%360;return d>180?360-d:d};
  function newObj(){m1=100+10*Math.floor(Math.random()*21);m2=100+10*Math.floor(Math.random()*21);t1=Math.floor(Math.random()*61);t2=t1+70+Math.floor(Math.random()*71);
    ok={};h1=h2=false;hs=1;zoomOf=1;['bR','a1R','a2R','m3R','t3R'].forEach(k=>$(k).value=0);
    ['m1In','m2In','t1In','t2In','c4'].forEach(k=>$(k).value='');['m1Fb','m2Fb','t1Fb','t2Fb','eFb','c4f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    bDraw();aDraw();eDraw();sub();results()}
  function bDraw(){box.querySelectorAll('.hsel button').forEach(b=>b.className=+b.dataset.h===hs?'go':'rs');
    const p=+$('bR').value,on=p>=100,m=hs===1?m1:m2;$('bO').textContent=on?'على الكفة':'';
    $('bSt').textContent=on?'✓ الحامل m'+(hs===1?'₁':'₂')+' على الكفة، اقرأ الكتلة من الشاشة':'أنزل الحامل حتى يستقر على الكفة';
    $('bS').innerHTML=ftBalance(1,on?m.toFixed(1)+' g':'0.0 g',-4+p*0.66)}
  function aVal(i){const R=$('a'+i+'R'),T=i===1?t1:t2;let a=+R.value;if(a>T){a=T;R.value=a}return a}
  function aDraw(){const a1=aVal(1),a2=aVal(2),a=zoomOf===1?a1:a2,T=zoomOf===1?t1:t2,touch=a===T,hl=(zoomOf===1?h1:h2)&&touch;
    $('a1O').textContent=a1+'°';$('a2O').textContent=a2+'°';
    $('aSt').textContent=touch?'✓ العدسة على خيط m'+(zoomOf===1?'₁':'₂')+'، اقرأ الزاوية من التدريج':'حرّك العدسة حتى تتوقف عند الخيط';
    $('aS').innerHTML=ftDisk({strings:[{a:t1,c:'#2563EB',lab:'m₁'},{a:t2,c:'#16A34A',lab:'m₂'}],mag:a});
    const k=26,XX=d=>200+(d-a)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#F8FAFC" stroke="#94A3B8"/>';
    for(let d=a-8;d<=a+8;d++){const x=XX(d),dd=((d%360)+360)%360,big=dd%10===0,mid=dd%5===0,isH=hl&&dd===T;g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?24:mid?16:9)}" stroke="${isH?'#DC2626':'#1F2937'}" stroke-width="${isH?2.6:big?1.5:.9}"/>`;if(mid)g+=`<text x="${x}" y="62" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${dd}</text>`}
    [[t1,'#2563EB'],[t2,'#16A34A']].forEach(([s,c])=>{const x=XX(s);if(x>0&&x<400)g+=`<line x1="${x}" y1="0" x2="${x}" y2="18" stroke="${c}" stroke-width="4"/><path d="M${x-6} 12 L${x+6} 12 L${x} 20 Z" fill="${c}"/>`});
    g+=`<text x="6" y="110" font-size="12" font-weight="700" fill="var(--muted)">تكبير التدريج</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="110" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">°</text>`;
    $('aZ').innerHTML=g}
  function eDraw(){const m3=+$('m3R').value,t3=+$('t3R').value;$('m3O').textContent=m3+' g';$('t3O').textContent=t3+'°';
    const bal=Math.abs(m3-MR())<=6&&adiff(t3,TE())<=2;
    let nx=F1()*Math.cos(t1*D2R)+F2()*Math.cos(t2*D2R)+m3/1000*G*Math.cos(t3*D2R),ny=F1()*Math.sin(t1*D2R)+F2()*Math.sin(t2*D2R)+m3/1000*G*Math.sin(t3*D2R);
    const n=Math.hypot(nx,ny),s=bal?0:Math.min(30,Math.max(6,n/Math.max(F1(),F2())*40));const rx=n?nx/n*s:0,ry=n?-ny/n*s:0;
    $('eSt').textContent=bal?'✓ استقرت الحلقة في المركز، القوى الثلاث متزنة':'الحلقة منحرفة عن المركز، القوى غير متزنة';
    $('eS').innerHTML=ftDisk({strings:[{a:t1,c:'#2563EB',lab:'m₁'},{a:t2,c:'#16A34A',lab:'m₂'}].concat(m3>0?[{a:t3,c:'#F7931E',lab:'m₃'}]:[]),ring:[rx,ry]});return bal}
  function sub(){const f1=fx(F1(),3),f2=fx(F2(),3);$('vS').textContent=ok.m1&&ok.m2&&ok.t1&&ok.t2?[`F₁ = ${m1/1000} × 9.8 = ${f1} N`,`F₂ = ${m2/1000} × 9.8 = ${f2} N`,`θ = ${t2}° − ${t1}° = ${TH()}°`,`R = √( ${f1}² + ${f2}² + 2 × ${f1} × ${f2} × cos ${TH()}° )`].map(E).join('\n'):'أكمل القياسين 4.1 و 4.2'}

  function rDraw(){const st=$('rStage');if(!ok.c4){st.hidden=true;return}st.hidden=false;
    const C=[200,175],P=(r,a)=>[C[0]+r*Math.cos(a*D2R),C[1]-r*Math.sin(a*D2R)],k=135/Math.max(RR(),F1(),F2());
    const arr=(r,a,c,w,lab)=>{const[x,y]=P(r,a),[h1x,h1y]=P(r-14,a+6),[h2x,h2y]=P(r-14,a-6),[lx,ly]=P(r+18,a);
      return `<line x1="${C[0]}" y1="${C[1]}" x2="${x}" y2="${y}" stroke="${c}" stroke-width="${w}"/><path d="M${x} ${y} L${h1x} ${h1y} L${h2x} ${h2y} Z" fill="${c}"/><text x="${lx}" y="${ly+6}" font-size="17" font-weight="800" text-anchor="middle" fill="${c}">${lab}</text>`};
    const[ax,ay]=P(F1()*k,t1),[bx,by]=P(F2()*k,t2),[rx,ry]=P(RR()*k,TR());
    let g=`<line x1="20" y1="${C[1]}" x2="385" y2="${C[1]}" stroke="var(--muted)" stroke-width="1.2"/><text x="388" y="${C[1]+5}" font-size="13" font-weight="700" fill="var(--muted)">0°</text><line x1="${C[0]}" y1="20" x2="${C[0]}" y2="335" stroke="var(--muted)" stroke-width="1" stroke-dasharray="3 4"/><text x="${C[0]}" y="15" font-size="13" font-weight="700" text-anchor="middle" fill="var(--muted)">90°</text>`;
    g+=`<line x1="${ax}" y1="${ay}" x2="${rx}" y2="${ry}" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="6 5"/><line x1="${bx}" y1="${by}" x2="${rx}" y2="${ry}" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="6 5"/>`;
    const ra=38,[s1,s2]=P(ra,0),[e1,e2]=P(ra,TR());g+=`<path d="M${s1} ${s2} A${ra} ${ra} 0 ${TR()>180?1:0} 0 ${e1} ${e2}" fill="none" stroke="#DC2626" stroke-width="2.5"/>`;
    const[tx,ty]=P(ra+16,TR()/2);g+=`<text x="${tx}" y="${ty+5}" font-size="14" font-weight="800" text-anchor="middle" fill="#DC2626">θR</text>`;
    g+=arr(F1()*k,t1,'#2563EB',4,'F₁')+arr(F2()*k,t2,'#16A34A',4,'F₂')+arr(RR()*k,TR(),'#DC2626',5,'R')+(ok.e?arr(ok.e.m/1000*G*k,ok.e.t,'#F7931E',4,'Fₑ'):'')+`<circle cx="${C[0]}" cy="${C[1]}" r="5" fill="var(--ink)"/>`;
    g+=`<rect x="20" y="348" width="170" height="32" rx="8" fill="#DC2626"/><text x="105" y="370" font-size="16" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">R = ${fx(RR(),2)} N</text><rect x="210" y="348" width="170" height="32" rx="8" fill="#DC2626"/><text x="295" y="370" font-size="16" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">θR = ${fx(TR(),1)}°</text>`;
    if(ok.e)g+=`<rect x="20" y="388" width="360" height="32" rx="8" fill="#F7931E"/><text x="200" y="410" font-size="16" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">Fₑ = m₃ g = ${fx(ok.e.m/1000*G,2)} N ,  θ₃ = ${ok.e.t}°</text>`;
    $('rS').innerHTML=g}
  function results(){
    $('r1a').textContent=ok.m1?E(m1.toFixed(1)+' g'):'—';$('r1b').textContent=ok.m1?E(m1/1000+' kg'):'—';
    $('r2a').textContent=ok.m2?E(m2.toFixed(1)+' g'):'—';$('r2b').textContent=ok.m2?E(m2/1000+' kg'):'—';
    $('r3a').textContent=ok.t1?E(t1+'°'):'—';$('r8a').textContent=ok.t1&&ok.t2?E(TH()+'°'):'—';$('r4a').textContent=ok.t2?E(t2+'°'):'—';
    $('r5a').textContent=ok.c4?E(fx(RR(),2)+' N'):'—';$('r5b').textContent=ok.c4?E(fx(RR(),2)+' N'):'—';$('r7a').textContent=ok.c4?E('θR = '+fx(TR(),1)+'°'):'—';$('r6a').textContent=ok.e?E(ok.e.m+' g , '+ok.e.t+'°'):'—';$('r6b').textContent=ok.e?E(fx(ok.e.m/1000*G,2)+' N'):'—';rDraw();
    $('rNote').textContent=ok.c4&&ok.e?'الاستنتاج: قوة الاتزان التجريبية تساوي المحصلة في المقدار وتعاكسها في الاتجاه:\n'+E(`m₃ g = ${fx(ok.e.m/1000*G,2)} N ≈ R = ${fx(RR(),2)} N`)+'\n'+E(`θ₃ = ${ok.e.t}° ≈ θR + 180° = ${fx(TE(),1)}°`):ok.c4?'أكمل البند 4.3 لمقارنة قوة الاتزان مع المحصلة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  box.querySelectorAll('.hsel button').forEach(b=>b.onclick=()=>{hs=+b.dataset.h;$('bR').value=0;bDraw()});
  $('bR').oninput=bDraw;$('a1R').oninput=()=>{zoomOf=1;aDraw()};$('a2R').oninput=()=>{zoomOf=2;aDraw()};$('m3R').oninput=eDraw;$('t3R').oninput=eDraw;
  const mChk=(i)=>{const m=i===1?m1:m2,f='m'+i+'Fb';const v=num($('m'+i+'In').value);if(isNaN(v))return fb(f,false,'ضع الحامل على الكفة واكتب قراءة الشاشة بالجرام.');
    if(Math.abs(v-m)<0.05){ok['m'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`m${i===1?'₁':'₂'} = ${m.toFixed(1)} g = ${m/1000} kg`))}else fb(f,false,'✗ القراءة غير صحيحة، اختر الحامل الصحيح وأنزله على الكفة ثم اقرأ الشاشة.');sub();results()};
  $('m1Ck').onclick=()=>mChk(1);$('m2Ck').onclick=()=>mChk(2);
  const tChk=(i)=>{const T=i===1?t1:t2,f='t'+i+'Fb';if(aVal(i)!==T)return fb(f,false,'حرّك عدسة التكبير حتى تتوقف عند خيط m'+(i===1?'₁':'₂')+' أولا.');const v=num($('t'+i+'In').value);if(isNaN(v))return fb(f,false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-T)<0.5){ok['t'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`θ${i===1?'₁':'₂'} = ${T}°`))}else fb(f,false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('t1Ck').onclick=()=>tChk(1);$('t2Ck').onclick=()=>tChk(2);
  const tHn=i=>{if(i===1)h1=true;else h2=true;zoomOf=i;aDraw();fb('t'+i+'Fb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  $('t1Hn').onclick=()=>tHn(1);$('t2Hn').onclick=()=>tHn(2);
  $('eCk').onclick=()=>{if(!eDraw())return fb('eFb',false,'✗ الحلقة لم تستقر في المركز بعد، غيّر الكتلة الثالثة وزاويتها.');const m3=+$('m3R').value,t3=+$('t3R').value;ok.e={m:m3,t:t3};
    fb('eFb',true,'✓ القوى الثلاث متزنة:\n'+E(`m₃ = ${m3} g ,  θ₃ = ${t3}°`));results()};
  $('eHn').onclick=()=>fb('eFb',true,'تلميح: قوة الاتزان تقع في الجهة المقابلة للقوتين تقريبا. ابدأ بزاوية بين '+E(Math.round(TE()-20)%360+'°')+' و '+E(Math.round(TE()+20)%360+'°')+'، ثم زد الكتلة تدريجيا حتى تقترب الحلقة من المركز.');
  const chk=(i,val,unit,tol,okMsg,badMsg)=>{const f='c'+i+'f';if(!(ok.m1&&ok.m2&&ok.t1&&ok.t2))return fb(f,false,'أكمل القياسين 4.1 و 4.2 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة '+unit+'.');
    const good=unit==='°'?adiff(v,val)<=tol:Math.abs(v-val)/Math.abs(val)<=tol;if(good){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,badMsg);results()};
  $('c4k').onclick=()=>chk(4,RR(),'N',.02,'✓ إجابة صحيحة:\n'+E(`R = ${fx(RR(),2)} N`),'✗ عوّض في قانون جيب التمام، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function vrTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const t3=`<svg viewBox="0 10 460 395" aria-label="جهاز طاولة القوى ثلاثي الأبعاد">${ft3D([{a:40,c:'#DC2626',lab:'m'},{a:180,c:'#2563EB',lab:'mₓ'},{a:270,c:'#16A34A',lab:'mᵧ'}])}</svg>`;
  const tbl=`<svg viewBox="-60 -50 520 510" aria-label="جهاز طاولة القوى">${ftDisk({strings:[{a:40,c:'#DC2626',lab:'m'},{a:180,c:'#2563EB',lab:'mₓ'},{a:270,c:'#16A34A',lab:'mᵧ'}]})}
    ${lbl(200,200,90,-26,'المسمار المركزي')}${lbl(211,191,320,-26,'الحلقة')}${lbl(318,101,455,40,'البكرة','end')}${lbl(270,141,455,232,'الخيط','end')}${lbl(70,247,-55,330,'القرص المدرج بالدرجات','start')}${lbl(200,382,330,440,'حامل الكتل')}</svg>`;
  const bal=`<svg viewBox="20 30 360 215" aria-label="جهاز الميزان الرقمي">${ftBalance(1,'150.0 g',62)}${lbl(205,100,350,70,'حامل الكتل','end')}${lbl(150,145,60,110,'الكفة')}${lbl(170,173,60,222,'الشاشة')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${t3}</div><div class="vcap">منظر ثلاثي الأبعاد</div><div class="stage">${tbl}</div><div class="vcap">منظر علوي</div><p><b>جهاز طاولة القوى:</b> قرص أفقي مدرج من <span dir="ltr">0°</span> إلى <span dir="ltr">360°</span> بدقة <span dir="ltr">1°</span>، تعلق على بكراته كتل بخيوط مربوطة بحلقة حول مسمار مركزي، وتكون القوى متزنة عندما تستقر الحلقة في المركز.</p></div>
    <div class="tool"><div class="stage">${bal}</div><p><b>جهاز الميزان الرقمي:</b> يقيس كتلة حامل الكتل مع ما عليه بالجرام بدقة <span dir="ltr">0.1 g</span>.</p></div></div>`}
function vecLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">تحليل قوة إلى مركبتين باستخدام طاولة القوى</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>جهاز الميزان الرقمي</i> · g</span><span class="tag">الزاوية θ: <i>جهاز طاولة القوى</i> · °</span><span class="tag dv">المركبتان Fx و Fy: <i>تحليل المتجه</i> · N</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء جهاز طاولة القوى وجهاز الميزان الرقمي.</li>
    <li>قياس الكتلة المعلقة بجهاز الميزان الرقمي.</li>
    <li>قراءة زاوية القوة من تدريج جهاز طاولة القوى بدقة <span dir="ltr">1°</span>.</li>
    <li>إيجاد المركبتين السينية والصادية للقوة تجريبيا بكتلتين على المحورين حتى تستقر الحلقة في المركز.</li>
    <li>حساب المركبتين بالقانونين <span dir="ltr">Fx = F cos θ</span> و <span dir="ltr">Fy = F sin θ</span>، ومقارنتهما بالقيم التجريبية.</li></ol></div>
  ${vrTools()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قوة جديدة</button></div>
  <div class="ctl"><h3>4.1 قياس الكتلة m بجهاز الميزان الرقمي</h3>
    <div class="stage"><svg id="bS" viewBox="40 -10 320 220"></svg><div class="hud"><span id="bSt"></span></div></div>
    <div class="row"><label for="bR">إنزال الحامل على الكفة</label><output id="bO"></output><input id="bR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال الحامل حتى يستقر على كفة الميزان.</p>
    <div class="ans"><label>قراءتك للكتلة m</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk">تحقق</button></div><div class="fb2" id="mFb"></div>
  </div>
  <div class="ctl"><h3>4.2 قياس زاوية القوة θ بجهاز طاولة القوى</h3>
    <div class="stage"><svg id="aS" viewBox="-30 -30 460 460"></svg><svg id="aZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="aR">عدسة التكبير على خيط القوة</label><output id="aO"></output><input id="aR" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك عدسة التكبير على تدريج القرص حتى تتوقف عند الخيط.</p>
    <div class="ans"><label>قراءتك لزاوية القوة θ</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <div class="ctl"><h3>4.3 إيجاد المركبتين تجريبيا</h3>
    <div class="stage"><svg id="eS" viewBox="-30 -30 460 460"></svg><div class="hud"><span id="eSt"></span></div></div>
    <div class="row"><label for="xR">الكتلة mₓ على البكرة 180°</label><output id="xO"></output><input id="xR" type="range" min="0" max="500" step="5" value="0"></div>
    <div class="row"><label for="yR">الكتلة mᵧ على البكرة 270°</label><output id="yO"></output><input id="yR" type="range" min="0" max="500" step="5" value="0"></div>
    <p class="slh">👆 حرّك المؤشر الأول لزيادة الكتلة mₓ على المحور السيني.<br>ثم حرّك المؤشر الثاني لزيادة الكتلة mᵧ على المحور الصادي حتى تستقر الحلقة في المركز، واضغط «تحقق».</p>
    <p class="slh" style="border-style:solid;background:rgba(247,147,30,.10)"><b>ملاحظة:</b> الكتلتان mₓ و mᵧ تشدان الحلقة <b>عكس</b> مركبتي القوة حتى تتزن، فتكون قوتهما مساوية للمركبتين في المقدار ومعاكسة لهما في الاتجاه.</p>
    <div class="ans"><label>عند استقرار الحلقة في المركز اضغط تحقق</label><button type="button" class="go" id="eCk">تحقق</button><button type="button" class="rs" id="eHn">تلميح</button></div><div class="fb2" id="eFb"></div>
  </div>
  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law ftl"><div class="ln lw"><b>مقدار القوة (وزن الكتلة)</b><span>F = m g</span></div>
      <div class="ln lw"><b>المركبة السينية</b><span>Fx = F cos θ</span></div>
      <div class="ln lw"><b>المركبة الصادية</b><span>Fy = F sin θ</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">F</span> مقدار القوة المؤثرة (وزن الكتلة m)، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">m</span> الكتلة المعلقة، وتقاس بجهاز الميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية الأرضية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">θ</span> زاوية القوة مع المحور السيني، وتقاس بتدريج جهاز طاولة القوى، ووحدتها الدرجة <span dir="ltr">°</span></li>
      <li><span class="chip" dir="ltr">Fx</span> المركبة السينية للقوة، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">Fy</span> المركبة الصادية للقوة، ووحدتها <span dir="ltr">N</span></li></ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسين 4.1 و 4.2</span></div></div>
    <div class="ans"><label>1. احسب المركبة السينية Fx بوحدة N</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div>
    <div class="ans"><label>2. احسب المركبة الصادية Fy بوحدة N</label><input id="c2" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="c2k">تحقق</button></div><div class="fb2" id="c2f"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th><th>بوحدة SI</th></tr></thead>
    <tbody><tr><td>الكتلة m</td><td>جهاز الميزان الرقمي</td><td id="r1a">—</td><td id="r1b">—</td></tr>
    <tr><td>الزاوية θ</td><td>جهاز طاولة القوى</td><td id="r2a">—</td><td>—</td></tr>
    <tr><td>القوة F</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">F = m g</span></td><td id="r3a">—</td><td>—</td></tr>
    <tr><td>المركبة Fx</td><td>بالحساب</td><td id="r4a">—</td><td>—</td></tr>
    <tr><td>المركبة Fy</td><td>بالحساب</td><td id="r5a">—</td><td>—</td></tr>
    <tr><td>المركبة السينية تجريبيا</td><td>جهاز طاولة القوى (mₓ)</td><td id="r6a">—</td><td id="r6b">—</td></tr>
    <tr><td>المركبة الصادية تجريبيا</td><td>جهاز طاولة القوى (mᵧ)</td><td id="r7a">—</td><td id="r7b">—</td></tr></tbody></table></div>
    <div class="stage" id="rStage" hidden><svg id="rS" viewBox="0 0 400 355"></svg></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id),G=9.8,D2R=Math.PI/180;
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fx=(x,n)=>String(+x.toFixed(n));
  let m,th,ok={},hT=false;
  const F=()=>m/1000*G,FX=()=>F()*Math.cos(th*D2R),FY=()=>F()*Math.sin(th*D2R),MX=()=>m*Math.cos(th*D2R),MY=()=>m*Math.sin(th*D2R);
  function newObj(){m=200+10*Math.floor(Math.random()*31);th=20+Math.floor(Math.random()*51);ok={};hT=false;
    ['bR','aR','xR','yR'].forEach(k=>$(k).value=0);['mIn','tIn','c1','c2'].forEach(k=>$(k).value='');['mFb','tFb','eFb','c1f','c2f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    bDraw();aDraw();eDraw();sub();results()}
  function bDraw(){const p=+$('bR').value,on=p>=100;$('bO').textContent=on?'على الكفة':'';$('bSt').textContent=on?'✓ الحامل على الكفة، اقرأ الكتلة من الشاشة':'أنزل الحامل حتى يستقر على الكفة';
    $('bS').innerHTML=ftBalance(1,on?m.toFixed(1)+' g':'0.0 g',-4+p*0.66)}
  function aVal(){let a=+$('aR').value;if(a>th){a=th;$('aR').value=a}return a}
  function aDraw(){const a=aVal(),touch=a===th,hl=hT&&touch;$('aO').textContent=a+'°';
    $('aSt').textContent=touch?'✓ العدسة على خيط القوة، اقرأ الزاوية من التدريج':'حرّك العدسة حتى تتوقف عند الخيط';
    $('aS').innerHTML=ftDisk({strings:[{a:th,c:'#DC2626',lab:'m'}],mag:a});
    const k=26,XX=d=>200+(d-a)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#F8FAFC" stroke="#94A3B8"/>';
    for(let d=a-8;d<=a+8;d++){const x=XX(d),dd=((d%360)+360)%360,big=dd%10===0,mid=dd%5===0,isH=hl&&dd===th;g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?24:mid?16:9)}" stroke="${isH?'#DC2626':'#1F2937'}" stroke-width="${isH?2.6:big?1.5:.9}"/>`;if(mid)g+=`<text x="${x}" y="62" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${dd}</text>`}
    const xs=XX(th);if(xs>0&&xs<400)g+=`<line x1="${xs}" y1="0" x2="${xs}" y2="18" stroke="#DC2626" stroke-width="4"/><path d="M${xs-6} 12 L${xs+6} 12 L${xs} 20 Z" fill="#DC2626"/>`;
    g+=`<text x="6" y="110" font-size="12" font-weight="700" fill="var(--muted)">تكبير التدريج</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="110" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">°</text>`;
    $('aZ').innerHTML=g}
  function eDraw(){const mx=+$('xR').value,my=+$('yR').value;$('xO').textContent=mx+' g';$('yO').textContent=my+' g';
    const bal=Math.abs(mx-MX())<=5&&Math.abs(my-MY())<=5;
    const nx=(m*Math.cos(th*D2R)-mx),ny=(m*Math.sin(th*D2R)-my),n=Math.hypot(nx,ny),sz=bal?0:Math.min(30,Math.max(6,n/m*60));
    $('eSt').textContent=bal?'✓ استقرت الحلقة في المركز، المركبتان توازنان القوة':'الحلقة منحرفة عن المركز';
    const st=[{a:th,c:'#DC2626',lab:'m'}];if(mx>0)st.push({a:180,c:'#2563EB',lab:'mₓ'});if(my>0)st.push({a:270,c:'#16A34A',lab:'mᵧ'});
    $('eS').innerHTML=ftDisk({strings:st,ring:[n?nx/n*sz:0,n?-ny/n*sz:0]});return bal}
  function sub(){const f=fx(F(),3);$('vS').textContent=ok.m&&ok.t?[`F = ${m/1000} × 9.8 = ${f} N`,`Fx = ${f} × cos ${th}°`,`Fy = ${f} × sin ${th}°`].map(E).join('\n'):'أكمل القياسين 4.1 و 4.2'}
  function rDraw(){const st=$('rStage');if(!(ok.c1&&ok.c2)){st.hidden=true;return}st.hidden=false;
    const ox=200,oy=180,K=135/F(),fxp=FX()*K,fyp=FY()*K;
    const arr=(x1,y1,x2,y2,c,lab,lx,ly)=>{const a=Math.atan2(y2-y1,x2-x1),h=13;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="4"/><path d="M${x2} ${y2} L${x2-h*Math.cos(a-.4)} ${y2-h*Math.sin(a-.4)} L${x2-h*Math.cos(a+.4)} ${y2-h*Math.sin(a+.4)} Z" fill="${c}"/><text x="${x2+lx}" y="${y2+ly}" font-size="16" font-weight="800" fill="${c}" text-anchor="middle">${lab}</text>`};
    let g=`<line x1="20" y1="${oy}" x2="390" y2="${oy}" stroke="var(--muted)" stroke-width="1.2"/><line x1="${ox}" y1="20" x2="${ox}" y2="330" stroke="var(--muted)" stroke-width="1.2"/><text x="388" y="${oy+16}" font-size="13" font-weight="700" fill="var(--muted)" text-anchor="end">x</text><text x="${ox+10}" y="22" font-size="13" font-weight="700" fill="var(--muted)">y</text>`;
    g+=`<line x1="${ox+fxp}" y1="${oy}" x2="${ox+fxp}" y2="${oy-fyp}" stroke="#94A3B8" stroke-dasharray="6 5" stroke-width="1.6"/><line x1="${ox}" y1="${oy-fyp}" x2="${ox+fxp}" y2="${oy-fyp}" stroke="#94A3B8" stroke-dasharray="6 5" stroke-width="1.6"/>`;
    const R=40;g+=`<path d="M${ox+R} ${oy} A${R} ${R} 0 0 0 ${ox+R*Math.cos(th*D2R)} ${oy-R*Math.sin(th*D2R)}" fill="none" stroke="#DC2626" stroke-width="2.5"/><text x="${ox+(R+14)*Math.cos(th*D2R/2)}" y="${oy-(R+14)*Math.sin(th*D2R/2)+5}" font-size="14" font-weight="800" fill="#DC2626" text-anchor="middle">θ</text>`;
    const darr=(x2,y2,c,lab,lx,ly)=>{const a=Math.atan2(y2-oy,x2-ox),h=12;return `<line x1="${ox}" y1="${oy}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="3" stroke-dasharray="7 5"/><path d="M${x2} ${y2} L${x2-h*Math.cos(a-.4)} ${y2-h*Math.sin(a-.4)} L${x2-h*Math.cos(a+.4)} ${y2-h*Math.sin(a+.4)} Z" fill="${c}"/><text x="${x2+lx}" y="${y2+ly}" font-size="14" font-weight="800" fill="${c}" text-anchor="middle" direction="ltr">${lab}</text>`};
    if(ok.e)g+=darr(ox-ok.e.x/1000*G*K,oy,'#2563EB','mₓg',0,-10)+darr(ox,oy+ok.e.y/1000*G*K,'#16A34A','mᵧg',24,0);
    g+=arr(ox,oy,ox+fxp,oy,'#2563EB','Fx',0,20)+arr(ox,oy,ox,oy-fyp,'#16A34A','Fy',-18,4)+arr(ox,oy,ox+fxp,oy-fyp,'#DC2626','F',12,-6)+`<circle cx="${ox}" cy="${oy}" r="5" fill="var(--ink)"/>`;
    g+=`<rect x="240" y="250" width="150" height="30" rx="8" fill="#2563EB"/><text x="315" y="270" font-size="14" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">Fx = ${fx(FX(),2)} N</text><rect x="240" y="286" width="150" height="30" rx="8" fill="#16A34A"/><text x="315" y="306" font-size="14" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">Fy = ${fx(FY(),2)} N</text>`;
    g+=ok.e?`<text x="390" y="345" font-size="12.5" font-weight="700" fill="var(--muted)" text-anchor="end">السهمان المتقطعان: قوتا الكتلتين على طاولة القوى (عكس المركبتين)</text>`:'';
    $('rS').innerHTML=g}
  function results(){
    $('r1a').textContent=ok.m?E(m.toFixed(1)+' g'):'—';$('r1b').textContent=ok.m?E(m/1000+' kg'):'—';
    $('r2a').textContent=ok.t?E(th+'°'):'—';$('r3a').textContent=ok.m?E(fx(F(),3)+' N'):'—';
    $('r4a').textContent=ok.c1?E(fx(FX(),2)+' N'):'—';$('r5a').textContent=ok.c2?E(fx(FY(),2)+' N'):'—';
    $('r6a').textContent=ok.e?E(ok.e.x+' g'):'—';$('r6b').textContent=ok.e?E(fx(ok.e.x/1000*G,2)+' N'):'—';$('r7a').textContent=ok.e?E(ok.e.y+' g'):'—';$('r7b').textContent=ok.e?E(fx(ok.e.y/1000*G,2)+' N'):'—';
    rDraw();
    $('rNote').textContent=ok.e&&ok.c1&&ok.c2?'الاستنتاج: نتائج المركبتين في التجربة تساوي تقريبا نتائجهما بالحساب، فالقوة تكافئ مركبتيها معا:\n'+E(`mₓ g = ${fx(ok.e.x/1000*G,2)} N ≈ Fx = ${fx(FX(),2)} N`)+'\n'+E(`mᵧ g = ${fx(ok.e.y/1000*G,2)} N ≈ Fy = ${fx(FY(),2)} N`)+'\n\nالكتلتان '+E('mₓ')+' و '+E('mᵧ')+' تشدان الحلقة عكس مركبتي القوة حتى تتزن، فتكون قوتهما مساوية للمركبتين في المقدار ومعاكسة لهما في الاتجاه.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('bR').oninput=bDraw;$('aR').oninput=aDraw;$('xR').oninput=eDraw;$('yR').oninput=eDraw;
  $('mCk').onclick=()=>{if(+$('bR').value<100)return fb('mFb',false,'أنزل الحامل على الكفة أولا.');const v=num($('mIn').value);if(isNaN(v))return fb('mFb',false,'اكتب قراءة الشاشة بالجرام.');
    if(Math.abs(v-m)<0.05){ok.m=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`m = ${m.toFixed(1)} g = ${m/1000} kg`))}else fb('mFb',false,'✗ القراءة غير صحيحة، اقرأ الرقم الظاهر على الشاشة.');sub();results()};
  $('tCk').onclick=()=>{if(aVal()!==th)return fb('tFb',false,'حرّك عدسة التكبير حتى تتوقف عند الخيط أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;aDraw();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  $('eCk').onclick=()=>{if(!eDraw())return fb('eFb',false,'✗ الحلقة لم تستقر في المركز بعد، غيّر الكتلتين.');ok.e={x:+$('xR').value,y:+$('yR').value};fb('eFb',true,'✓ استقرت الحلقة:\n'+E(`mₓ = ${ok.e.x} g ,  mᵧ = ${ok.e.y} g`));results()};
  $('eHn').onclick=()=>fb('eFb',true,'تلميح: كلما زادت زاوية القوة احتاجت الكتلة mᵧ إلى قيمة أكبر والكتلة mₓ إلى قيمة أصغر. غيّر كل كتلة حتى يقترب مركز الحلقة من المسمار.');
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.m&&ok.t))return fb(f,false,'أكمل القياسين 4.1 و 4.2 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة N.');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);results()};
  $('c1k').onclick=()=>chk(1,FX(),'✓ إجابة صحيحة:\n'+E(`Fx = ${fx(FX(),2)} N`),'✗ اضرب مقدار القوة في جيب تمام الزاوية cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
  $('c2k').onclick=()=>chk(2,FY(),'✓ إجابة صحيحة:\n'+E(`Fy = ${fx(FY(),2)} N`),'✗ اضرب مقدار القوة في جيب الزاوية sin θ.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function wkScale(rd,big){/* أداة الميزان الزنبركي أفقيا: الخطاف عند x=0، الحلقة في النهاية. rd القراءة بالنيوتن */
  const L=150,y=0,h=big?26:22,x0=14,xe=x0+L,u=(L-24)/10,ip=xe-12-rd*u;
  let t='';for(let i=0;i<=100;i++){const x=xe-12-i*u/10,bg=i%10===0,md=i%5===0;t+=`<line x1="${x}" y1="${y-h/2+2}" x2="${x}" y2="${y-h/2+2+(bg?8:md?6:3.5)}" stroke="#1F2937" stroke-width="${bg?1.1:.5}"/>`;if(bg&&big)t+=`<text x="${x}" y="${y+h/2-3}" font-size="7.5" font-weight="700" text-anchor="middle" fill="#1F2937">${i/10}</text>`}
  let sp='';for(let i=0;i<9;i++){const a=ip+4+i*((xe-14-ip-4)/9);sp+=`<path d="M${a} ${y-4} l3 8" stroke="#64748B" stroke-width="1.2" fill="none"/>`}
  return `<line x1="0" y1="${y}" x2="${ip}" y2="${y}" stroke="#334155" stroke-width="2"/><path d="M0 ${y} q-6 0 -6 6 q0 6 6 6" fill="none" stroke="#334155" stroke-width="2.4"/>
  <rect x="${x0}" y="${y-h/2}" width="${L}" height="${h}" rx="${h/2}" fill="#E0F2FE" stroke="#0369A1" stroke-width="2"/>${t}${sp}
  <rect x="${ip-2.5}" y="${y-h/2-3}" width="5" height="${h+6}" rx="2" fill="#F7931E" stroke="#9A3412"/>
  <circle cx="${xe+12}" cy="${y}" r="9" fill="none" stroke="#334155" stroke-width="3"/>`}
function wkProt(cx,cy,R,th,mag,hl){/* أداة المنقلة */
  let g=`<path d="M${cx-R} ${cy} A${R} ${R} 0 0 1 ${cx+R} ${cy} Z" fill="rgba(254,243,199,.85)" stroke="#B45309" stroke-width="1.6"/>`;
  for(let a=0;a<=180;a++){const r1=R,r2=R-(a%10===0?11:a%5===0?7:4),c=Math.cos(a*Math.PI/180),s=Math.sin(a*Math.PI/180);g+=`<line x1="${cx+r1*c}" y1="${cy-r1*s}" x2="${cx+r2*c}" y2="${cy-r2*s}" stroke="#78350F" stroke-width="${a%10===0?1:.5}"/>`;
    if(a%30===0)g+=`<text x="${cx+(R-20)*c}" y="${cy-(R-20)*s+3}" font-size="8" font-weight="700" text-anchor="middle" fill="#78350F">${a}</text>`}
  g+=`<circle cx="${cx}" cy="${cy}" r="2.6" fill="#B45309"/>`;
  if(mag!=null){const c=Math.cos(mag*Math.PI/180),s=Math.sin(mag*Math.PI/180);g+=`<circle cx="${cx+(R-5)*c}" cy="${cy-(R-5)*s}" r="10" fill="rgba(247,147,30,.18)" stroke="#F7931E" stroke-width="2.6"/>`}
  return g}
function wkTape(x0,y,len,k,big){/* أداة الشريط المتري: العلبة عند x0 والشريط إلى اليمين بطول len سم، k بكسل لكل سم */
  let t=`<rect x="${x0}" y="${y-7}" width="${len*k}" height="14" fill="#FDE047" stroke="#A16207" stroke-width="1"/>`;
  for(let c=0;c<=len;c++){const x=x0+c*k,bg=c%10===0,md=c%5===0;if(k*1>=3||md)t+=`<line x1="${x}" y1="${y-7}" x2="${x}" y2="${y-7+(bg?9:md?6:3)}" stroke="#422006" stroke-width="${bg?1.1:.5}"/>`;if(bg&&c>0&&(big||c%20===0))t+=`<text x="${x}" y="${y+5.5}" font-size="7" font-weight="800" text-anchor="middle" fill="#422006">${c}</text>`}
  t+=`<rect x="${x0+len*k-1}" y="${y-9}" width="4" height="18" fill="#64748B"/>`;
  return `<rect x="${x0-34}" y="${y-22}" width="38" height="36" rx="8" fill="#F7931E" stroke="#9A3412" stroke-width="1.6"/><circle cx="${x0-15}" cy="${y-4}" r="9" fill="#FB923C" stroke="#9A3412"/>`+t}
function wkTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const sc=`<svg viewBox="0 0 400 165" aria-label="أداة الميزان الزنبركي"><g transform="translate(40 78) scale(1.75)">${wkScale(3.4,1)}</g>${lbl(30,88,40,135,'الخطاف')}${lbl(140,64,110,20,'الأنبوب المدرج')}${lbl(183,72,230,20,'المؤشر')}${lbl(250,78,300,135,'النابض')}${lbl(366,70,370,20,'الحلقة','end')}</svg>`;
  const pr=`<svg viewBox="0 0 400 215" aria-label="أداة المنقلة">${wkProt(200,160,140)}<line x1="40" y1="160" x2="360" y2="160" stroke="#B45309" stroke-width="2"/>${lbl(200,160,200,192,'مركز المنقلة')}${lbl(300,62,370,20,'التدريج بالدرجات','end')}${lbl(80,160,40,192,'خط القاعدة','start')}</svg>`;
  const tp=`<svg viewBox="0 0 400 130" aria-label="أداة الشريط المتري"><g transform="translate(0 0)">${wkTape(70,70,56,5,1)}</g>${lbl(52,52,40,20,'العلبة','start')}${lbl(200,66,200,20,'الشريط المدرج بالسنتيمتر')}${lbl(352,62,372,108,'الطرف المعدني','end')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${sc}</div><p><b>أداة الميزان الزنبركي:</b> تقيس قوة السحب بالنيوتن من استطالة النابض، وتدريجها من <span dir="ltr">0</span> إلى <span dir="ltr">10 N</span> بدقة <span dir="ltr">0.1 N</span>.</p></div>
    <div class="tool"><div class="stage">${pr}</div><p><b>أداة المنقلة:</b> تقيس الزاوية بين خيط السحب واتجاه الحركة بدقة <span dir="ltr">1°</span>، ويوضع مركزها عند نقطة ربط الخيط.</p></div>
    <div class="tool"><div class="stage">${tp}</div><p><b>أداة الشريط المتري:</b> تقيس إزاحة الصندوق بالسنتيمتر بدقة <span dir="ltr">1 cm</span>.</p></div></div>`}
function workLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب الشغل بالضرب القياسي لمتجهي القوة والإزاحة</p></div>
  <div class="tags"><span class="tag">القوة F: <i>أداة الميزان الزنبركي</i> · N</span><span class="tag">الزاوية θ: <i>أداة المنقلة</i> · °</span><span class="tag">الإزاحة x: <i>أداة الشريط المتري</i> · cm</span><span class="tag dv">الشغل W: <i>ضرب قياسي</i> · J</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء أداة الميزان الزنبركي وأداة المنقلة وأداة الشريط المتري.</li>
    <li>قياس قوة السحب بأداة الميزان الزنبركي.</li>
    <li>قياس الزاوية بين القوة والإزاحة بأداة المنقلة بدقة <span dir="ltr">1°</span>.</li>
    <li>قياس إزاحة الصندوق بأداة الشريط المتري.</li>
    <li>حساب الشغل بالضرب القياسي لمتجهي القوة والإزاحة <span dir="ltr">W = F x cos θ</span>.</li></ol></div>
  ${wkTools()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 سحب جديد</button></div>
  <div class="ctl"><h3>4.1 قياس قوة السحب F بأداة الميزان الزنبركي</h3>
    <div class="stage"><svg id="fS" viewBox="0 -30 400 240"></svg><svg id="fZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="fSt"></span></div></div>
    <div class="row"><label for="fR">سحب الميزان الزنبركي</label><output id="fO"></output><input id="fR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لشد الميزان الزنبركي بقوة ثابتة حتى يتحرك الصندوق على السطح الأملس، ثم اقرأ الميزان.</p>
    <div class="ans"><label>قراءتك لقوة السحب F</label><input id="fIn" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="fCk">تحقق</button><button type="button" class="rs" id="fHn">تلميح</button></div><div class="fb2" id="fFb"></div>
  </div>
  <div class="ctl"><h3>4.2 قياس الزاوية θ بأداة المنقلة</h3>
    <div class="stage"><svg id="aS" viewBox="0 -30 400 240"></svg><svg id="aZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="aR">عدسة التكبير على تدريج المنقلة</label><output id="aO"></output><input id="aR" type="range" min="0" max="90" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك عدسة التكبير على تدريج المنقلة حتى تتوقف عند خيط السحب.</p>
    <div class="ans"><label>قراءتك للزاوية θ</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <div class="ctl"><h3>4.3 قياس الإزاحة x بأداة الشريط المتري</h3>
    <div class="stage"><svg id="dS" viewBox="0 30 400 200"></svg><svg id="dZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="dSt"></span></div></div>
    <div class="row"><label for="dR">مد الشريط المتري</label><output id="dO"></output><input id="dR" type="range" min="0" max="160" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لمد الشريط من خط البداية حتى يلامس مؤخرة الصندوق.</p>
    <div class="ans"><label>قراءتك للإزاحة x</label><input id="dIn" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="dCk">تحقق</button><button type="button" class="rs" id="dHn">تلميح</button></div><div class="fb2" id="dFb"></div>
  </div>
  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law ftl"><div class="ln lw"><b>الشغل بالضرب القياسي</b><span>W = F⃗ · x⃗ = F x cos θ</span></div>
            <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">W</span> الشغل المبذول، ووحدته الجول <span dir="ltr">J</span></li>
      <li><span class="chip" dir="ltr">F</span> قوة السحب، وتقاس بأداة الميزان الزنبركي، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">x</span> الإزاحة، وتقاس بأداة الشريط المتري، ووحدتها <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">θ</span> الزاوية بين القوة والإزاحة، وتقاس بأداة المنقلة، ووحدتها الدرجة <span dir="ltr">°</span></li></ul></div>
      ${convBox(['x(m) = x(cm) / 100'])}</div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسات 4.1 و 4.2 و 4.3</span></div></div>
    <div class="ans"><label>احسب الشغل بالضرب القياسي بوحدة J</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th><th>بوحدة SI</th></tr></thead>
    <tbody><tr><td>القوة F</td><td>أداة الميزان الزنبركي</td><td id="r1a">—</td><td id="r1b">—</td></tr>
    <tr><td>الزاوية θ</td><td>أداة المنقلة</td><td id="r2a">—</td><td>—</td></tr>
    <tr><td>الإزاحة x</td><td>أداة الشريط المتري</td><td id="r3a">—</td><td id="r3b">—</td></tr>
    <tr><td>الشغل بالضرب القياسي</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">F x cos θ</span></td><td id="r6a">—</td><td>—</td></tr></tbody></table></div>
    <div class="stage" id="rStage" hidden><svg id="rS" viewBox="0 0 400 295"></svg></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p>
    <div class="stage" id="fbd" hidden style="margin-top:10px"><svg id="fbS" viewBox="0 -10 400 330"></svg><div class="vcap">القوى المؤثرة على الصندوق</div></div>
    <div class="tw" id="kT" hidden style="margin-top:10px"><table class="rt"><thead><tr><th>الكمية</th><th>نوعها</th></tr></thead><tbody><tr><td>القوة <span dir="ltr">F⃗</span></td><td>متجهة (مقدار واتجاه)</td></tr><tr><td>الإزاحة <span dir="ltr">x⃗</span></td><td>متجهة (مقدار واتجاه)</td></tr><tr><td>الشغل <span dir="ltr">W = F⃗ · x⃗</span></td><td>قياسية (مقدار فقط)</td></tr></tbody></table></div></div>`;
  const $=id=>box.querySelector('#'+id),D2R=Math.PI/180;
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fx=(x,n)=>String(+x.toFixed(n));
  let F,th,d,ok={},hF=false,hT=false,hD=false;
  const FX=()=>F*Math.cos(th*D2R),FY=()=>F*Math.sin(th*D2R),DM=()=>d/100,W=()=>F*DM()*Math.cos(th*D2R);
  function newObj(){F=(20+Math.floor(Math.random()*61))/10;th=15+Math.floor(Math.random()*46);d=50+Math.floor(Math.random()*101);ok={};hF=hT=hD=false;
    ['fR','aR','dR'].forEach(k=>$(k).value=0);['fIn','tIn','dIn','c1'].forEach(k=>$(k).value='');['fFb','tFb','dFb','c1f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    fDraw();aDraw();dDraw();sub();results()}
  /* المشهد: طاولة وعربة وخيط بزاوية θ */
  const TY=170;
  function cart(x){return `<rect x="${x}" y="${TY-40}" width="60" height="40" rx="2" fill="url(#wkC)" stroke="#78350F" stroke-width="1.6"/><path d="M${x} ${TY-27} H${x+60} M${x} ${TY-13} H${x+60}" stroke="#92400E" stroke-width="1"/><path d="M${x+3} ${TY-3} L${x+57} ${TY-37} M${x+3} ${TY-37} L${x+57} ${TY-3}" stroke="#92400E" stroke-width="2.2" opacity=".55"/><rect x="${x}" y="${TY-40}" width="60" height="40" rx="2" fill="none" stroke="#78350F" stroke-width="2.4"/><circle cx="${x+60}" cy="${TY-21}" r="2.8" fill="#1F2937"/>`}
  const defs=`<defs><linearGradient id="wkC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCD9A0"/><stop offset=".55" stop-color="#E0A458"/><stop offset="1" stop-color="#B7792E"/></linearGradient></defs>`;
  const table=`<rect x="0" y="${TY}" width="400" height="10" fill="#A16207"/><rect x="0" y="${TY+10}" width="400" height="40" fill="#E8D5A3"/><text x="392" y="${TY+30}" font-size="12" font-weight="800" fill="#78350F" text-anchor="end">سطح أملس (نهمل الاحتكاك)</text>`;
  function scene(cx,rd,ext,prot,mag){const hx=cx+60,hy=TY-21,c=Math.cos(th*D2R),sn=Math.sin(th*D2R);
    const L=Math.min(200,112/sn,(306-hx)/c),sl=Math.max(10,L-104-ext),gp=sl+ext+91,Hx=hx+(gp+12)*c,Hy=hy-(gp+12)*sn;
    /* المتدرب: يقف خلف الطاولة ويسحب الميزان */
    const Sx=Hx+40,Sy=Hy-4,hip=Sy+64,K='#F1C7A0',KS='#B7855A',SH='#0E7C3A',SL='#16A34A';
    const A=[Sx-4,Sy+8],Ex=(A[0]+Hx)/2+4,Ey=(A[1]+Hy)/2+12;
    let man=`<g stroke-linecap="round" stroke-linejoin="round">
      <path d="M${Sx+6} ${hip} L${Sx-6} ${hip+60}" stroke="#1E3A8A" stroke-width="13"/><path d="M${Sx+20} ${hip} L${Sx+30} ${hip+60}" stroke="#1E40AF" stroke-width="13"/>
      <ellipse cx="${Sx-12}" cy="${hip+64}" rx="11" ry="5" fill="#111827"/><ellipse cx="${Sx+28}" cy="${hip+64}" rx="11" ry="5" fill="#111827"/>
      <path d="M${Sx-10} ${Sy+2} Q${Sx+10} ${Sy-8} ${Sx+30} ${Sy+4} L${Sx+30} ${hip+2} Q${Sx+12} ${hip+8} ${Sx-4} ${hip+2} Z" fill="${SL}" stroke="${SH}" stroke-width="1.6"/>
      <path d="M${Sx-4} ${hip-4} L${Sx+30} ${hip-4}" stroke="#1F2937" stroke-width="4"/>
      <path d="M${Sx+2} ${Sy-2} L${Sx+10} ${Sy+10} L${Sx+18} ${Sy-2}" fill="none" stroke="${SH}" stroke-width="2"/>
      <path d="M${Sx+26} ${Sy+8} Q${Sx+34} ${Sy+30} ${Sx+28} ${Sy+48}" fill="none" stroke="${SH}" stroke-width="9"/><circle cx="${Sx+28}" cy="${Sy+52}" r="5" fill="${K}" stroke="${KS}"/>
      <rect x="${Sx+5}" y="${Sy-12}" width="11" height="12" fill="${K}"/>
      <ellipse cx="${Sx+10}" cy="${Sy-30}" rx="14" ry="16" fill="${K}" stroke="${KS}" stroke-width="1.4"/>
      <ellipse cx="${Sx+20}" cy="${Sy-29}" rx="3" ry="5" fill="${K}" stroke="${KS}" stroke-width="1.2"/>
      <path d="M${Sx-4} ${Sy-32} Q${Sx-4} ${Sy-50} ${Sx+12} ${Sy-48} Q${Sx+27} ${Sy-46} ${Sx+24} ${Sy-28} Q${Sx+20} ${Sy-40} ${Sx+10} ${Sy-40} Q${Sx} ${Sy-40} ${Sx-4} ${Sy-32} Z" fill="#1F2937"/>
      <path d="M${Sx-1} ${Sy-35} l5 -1" stroke="#1F2937" stroke-width="1.6"/><circle cx="${Sx+1.5}" cy="${Sy-31}" r="1.7" fill="#1F2937"/>
      <path d="M${Sx-4} ${Sy-29} l-3 5 l4 1" fill="none" stroke="${KS}" stroke-width="1.3"/><path d="M${Sx-2} ${Sy-19} q3 2 6 0" fill="none" stroke="#9A3412" stroke-width="1.4"/>
      <path d="M${A[0]} ${A[1]} L${Ex} ${Ey}" stroke="${SL}" stroke-width="12"/><path d="M${(A[0]+Ex*2)/3} ${(A[1]+Ey*2)/3} L${Ex} ${Ey} L${Hx} ${Hy}" fill="none" stroke="${K}" stroke-width="7.5"/><path d="M${A[0]} ${A[1]} L${(A[0]+Ex*2)/3} ${(A[1]+Ey*2)/3}" stroke="${SH}" stroke-width="1" />
      </g><text x="${Sx-8}" y="${Sy-44}" font-size="12.5" font-weight="800" fill="#9A3412" text-anchor="end">المتدرب يسحب</text>`;
    /* اليد تقبض على حلقة الميزان */
    const hand=`<g transform="translate(${gp} 0) scale(.62)" stroke-linejoin="round"><path d="M4 -9 Q16 -11 22 -6 L22 6 Q16 11 4 9 Z" fill="${K}" stroke="${KS}" stroke-width="1.3"/>
      ${[-8,-3.2,1.6,6.4].map(y=>`<rect x="-6" y="${y-1.8}" width="13" height="5.6" rx="2.8" fill="${K}" stroke="${KS}" stroke-width="1.1"/>`).join('')}
      <path d="M14 -9 Q6 -15 -2 -11 Q-5 -9 -2 -7 Q4 -9 10 -6" fill="${K}" stroke="${KS}" stroke-width="1.2"/><path d="M-1 -10 l2 1" stroke="#E7B48E" stroke-width="1.6"/></g>`;
    let g=defs+man+table+`<line x1="40" y1="${TY-48}" x2="40" y2="${TY}" stroke="#DC2626" stroke-width="2" stroke-dasharray="4 3"/><text x="40" y="${TY-52}" font-size="11" font-weight="700" text-anchor="middle" fill="#DC2626">خط البداية</text>`+cart(cx);
    if(prot)g+=wkProt(hx,hy,62,th,mag)+`<line x1="${hx}" y1="${hy}" x2="${hx+70}" y2="${hy}" stroke="#B45309" stroke-width="1" stroke-dasharray="3 3"/>`+cart(cx);
    g+=`<g transform="translate(${hx} ${hy}) rotate(${-th})"><line x1="0" y1="0" x2="${sl+ext}" y2="0" stroke="#DC2626" stroke-width="2"/><g transform="translate(${sl+ext} 0) scale(.5)">${wkScale(rd,0)}</g>${hand}</g>`;
    return g}
  function zoom(id,a,val,step,k,lab,hl,fmt){let g='<rect x="0" y="20" width="400" height="56" fill="#F8FAFC" stroke="#94A3B8"/>';
    const XX=v=>200+(v-a)/step*k;for(let i=-Math.ceil(200/k)-1;i<=Math.ceil(200/k)+1;i++){const v=Math.round((a/step+i))*step,x=XX(v),n=Math.round(v/step);if(v<-1e-9)continue;const big=n%10===0,mid=n%5===0,isH=hl&&Math.abs(v-val)<step/2;
      g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?24:mid?16:9)}" stroke="${isH?'#DC2626':'#1F2937'}" stroke-width="${isH?2.6:big?1.5:.9}"/>`;if(mid)g+=`<text x="${x}" y="62" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${fmt(v)}</text>`}
    const xs=XX(val);if(xs>0&&xs<400)g+=`<line x1="${xs}" y1="0" x2="${xs}" y2="18" stroke="#DC2626" stroke-width="4"/><path d="M${xs-6} 12 L${xs+6} 12 L${xs} 20 Z" fill="#DC2626"/>`;
    g+=`<text x="6" y="110" font-size="12" font-weight="700" fill="var(--muted)">تكبير التدريج</text><rect x="346" y="92" width="50" height="24" rx="6" fill="#F7931E"/><text x="371" y="110" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">${lab}</text>`;
    $(id).innerHTML=g}
  function fDraw(){const p=+$('fR').value,on=p>=100,rd=Math.round(F*Math.min(p,100)/10)/10;$('fO').textContent=on?'يتحرك':'';
    $('fSt').textContent=on?'✓ الصندوق يتحرك بقوة سحب ثابتة، اقرأ الميزان':'اشدد الميزان حتى يتحرك الصندوق';
    $('fS').innerHTML=scene(on?70:40,rd,rd*3,false);
    zoom('fZ',rd,on&&hF?F:rd,0.1,26,'N',hF&&on,v=>fx(v,1))}
  function aVal(){let a=+$('aR').value;if(a>th){a=th;$('aR').value=a}return a}
  function aDraw(){const a=aVal(),touch=a===th;$('aO').textContent=a+'°';$('aSt').textContent=touch?'✓ العدسة على خيط السحب، اقرأ الزاوية من التدريج':'حرّك العدسة حتى تتوقف عند الخيط';
    $('aS').innerHTML=scene(95,F,F*3,true,a);zoom('aZ',a,th,1,26,'°',hT&&touch,v=>String(v))}
  function dVal(){let v=+$('dR').value;if(v>d){v=d;$('dR').value=v}return v}
  function dDraw(){const v=dVal(),touch=v===d,k=1.6;$('dO').textContent=v+' cm';$('dSt').textContent=touch?'✓ الشريط يلامس مؤخرة الصندوق، اقرأ الإزاحة':'مد الشريط حتى يلامس مؤخرة الصندوق';
    const cx=40+d*k;let g=defs+table+`<line x1="40" y1="${TY-60}" x2="40" y2="${TY}" stroke="#DC2626" stroke-width="2" stroke-dasharray="4 3"/><text x="40" y="${TY-64}" font-size="11" font-weight="700" text-anchor="middle" fill="#DC2626">خط البداية</text>`;
    g+=`<rect x="40" y="${TY-40}" width="60" height="40" rx="2" fill="none" stroke="#94A3B8" stroke-dasharray="4 3"/>`+cart(cx)+`<line x1="${cx+60}" y1="${TY-21}" x2="${Math.min(cx+100,398)}" y2="${TY-21-40*Math.tan(th*D2R)}" stroke="#DC2626" stroke-width="2"/>`;
    g+=`<path d="M70 ${TY-50} L${cx+20} ${TY-50}" stroke="#16A34A" stroke-width="2.4"/><path d="M${cx+20} ${TY-50} l-8 -5 l0 10 Z" fill="#16A34A"/><text x="${(70+cx+20)/2}" y="${TY-56}" font-size="12" font-weight="800" text-anchor="middle" fill="#16A34A">x⃗</text>`;
    g+=`<line x1="${cx}" y1="${TY-40}" x2="${cx}" y2="${TY+28}" stroke="#1E3A8A" stroke-width="1.4" stroke-dasharray="4 3"/><g transform="translate(0 ${TY+20})">${wkTape(40,0,v,k,0)}</g>`;$('dS').innerHTML=g;
    zoom('dZ',v,d,1,26,'cm',hD&&touch,c=>String(c))}
  function sub(){$('vS').textContent=ok.f&&ok.t&&ok.d?[`x = ${d} / 100 = ${DM()} m`,`W = ${F} × ${DM()} × cos ${th}°`].map(E).join('\n'):'أكمل القياسات 4.1 و 4.2 و 4.3'}
  function rDraw(){const st=$('rStage');if(!ok.c1){st.hidden=true;return}st.hidden=false;
    const ox=50,oy=200,LF=200,Ld=300,fxp=LF*Math.cos(th*D2R),fyp=LF*Math.sin(th*D2R);
    const arr=(x1,y1,x2,y2,c,lab,lx,ly,w,da)=>{const a=Math.atan2(y2-y1,x2-x1),h=13;return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w||4}" ${da?'stroke-dasharray="7 5"':''}/><path d="M${x2} ${y2} L${x2-h*Math.cos(a-.4)} ${y2-h*Math.sin(a-.4)} L${x2-h*Math.cos(a+.4)} ${y2-h*Math.sin(a+.4)} Z" fill="${c}"/><text x="${x2+lx}" y="${y2+ly}" font-size="16" font-weight="800" fill="${c}" text-anchor="middle">${lab}</text>`};
    let g=`<line x1="20" y1="${oy}" x2="395" y2="${oy}" stroke="var(--muted)" stroke-width="1.2"/><line x1="${ox}" y1="15" x2="${ox}" y2="245" stroke="var(--muted)" stroke-width="1.2"/><text x="${ox+8}" y="22" font-size="13" font-weight="700" fill="var(--muted)">y</text>`;
    g+=`<line x1="${ox+fxp}" y1="${oy}" x2="${ox+fxp}" y2="${oy-fyp}" stroke="#94A3B8" stroke-dasharray="6 5" stroke-width="1.6"/>`;
    const R=45;g+=`<path d="M${ox+R} ${oy} A${R} ${R} 0 0 0 ${ox+R*Math.cos(th*D2R)} ${oy-R*Math.sin(th*D2R)}" fill="none" stroke="#DC2626" stroke-width="2.5"/><text x="${ox+(R+14)*Math.cos(th*D2R/2)}" y="${oy-(R+14)*Math.sin(th*D2R/2)+5}" font-size="14" font-weight="800" fill="#DC2626" text-anchor="middle">θ</text>`;
    g+=arr(ox,oy+22,ox+Ld,oy+22,'#16A34A','x⃗',10,5,4)+arr(ox,oy,ox+fxp,oy,'#F7931E','F cos θ',0,-8,3,1)+arr(ox,oy,ox,oy-fyp,'#7C3AED','F sin θ',-4,-8,3,1)+arr(ox,oy,ox+fxp,oy-fyp,'#DC2626','F⃗',10,-6)+`<circle cx="${ox}" cy="${oy}" r="5" fill="var(--ink)"/>`;
    g+=`<rect x="200" y="236" width="190" height="30" rx="8" fill="#F7931E"/><text x="295" y="256" font-size="14" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">W = ${fx(W(),3)} J</text>`;
    g+=`<text x="390" y="286" font-size="12.5" font-weight="700" fill="var(--muted)" direction="rtl" text-anchor="start">المركبة ⁦F sin θ⁩ عمودية على الإزاحة ⁦x⁩ فلا تبذل شغلا</text>`;
    $('rS').innerHTML=g}
  function fbDraw(){const cx=170,cy=160,c=Math.cos(th*D2R),sn=Math.sin(th*D2R),L=130;
    const ar=(x1,y1,x2,y2,col,lab,lx,ly,da)=>{const a=Math.atan2(y2-y1,x2-x1),h=12;return `<line x1="${x1}" y1="${y1}" x2="${x2-8*Math.cos(a)}" y2="${y2-8*Math.sin(a)}" stroke="${col}" stroke-width="3.5" ${da?'stroke-dasharray="7 5"':''}/><path d="M${x2} ${y2} L${x2-h*Math.cos(a-.4)} ${y2-h*Math.sin(a-.4)} L${x2-h*Math.cos(a+.4)} ${y2-h*Math.sin(a+.4)} Z" fill="${col}"/><text x="${x2+lx}" y="${y2+ly}" font-size="15" font-weight="800" fill="${col}" text-anchor="middle" direction="ltr">${lab}</text>`};
    let g=`<defs><linearGradient id="wkC2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCD9A0"/><stop offset=".55" stop-color="#E0A458"/><stop offset="1" stop-color="#B7792E"/></linearGradient></defs><rect x="20" y="${cy+30}" width="360" height="10" fill="#A16207"/>
      <rect x="${cx-40}" y="${cy-30}" width="80" height="60" rx="3" fill="url(#wkC2)" stroke="#78350F" stroke-width="2.4"/><circle cx="${cx}" cy="${cy}" r="4" fill="#1F2937"/>`;
    g+=ar(cx,cy,cx+L*c,cy-L*sn,'#DC2626','F',10,-6)+ar(cx,cy,cx+L*c,cy,'#F7931E','F cos θ',0,26,1)+`<line x1="${cx+L*c}" y1="${cy}" x2="${cx+L*c}" y2="${cy-L*sn}" stroke="#94A3B8" stroke-dasharray="5 4"/>`;
    const W0=140,FS=L*sn,NN=W0-FS;g+=ar(cx,cy,cx,cy-NN,'#16A34A','',0,0)+ar(cx,cy-NN,cx,cy-W0,'#7C3AED','',0,0,1)+`<text x="${cx-12}" y="${cy-NN/2+5}" font-size="14" font-weight="800" fill="#16A34A" text-anchor="end">N قوة رد الفعل</text><text x="${cx-12}" y="${cy-NN-FS/2+5}" font-size="14" font-weight="800" fill="#7C3AED" text-anchor="end" direction="ltr">F sin θ</text><text x="${cx}" y="${cy-W0-12}" font-size="14" font-weight="800" fill="#7C3AED" text-anchor="middle" direction="ltr">F sin θ + N</text>`+ar(cx+8,cy,cx+8,cy+W0,'#1F2937','',0,0)+`<text x="${cx+20}" y="${cy+W0-4}" font-size="14" font-weight="800" fill="#1F2937">Fg قوة الجذب</text>`;
    $('fbS').innerHTML=g}
  function results(){
    $('r1a').textContent=ok.f?E(F.toFixed(1)+' N'):'—';$('r1b').textContent=ok.f?E(F.toFixed(1)+' N'):'—';
    $('r2a').textContent=ok.t?E(th+'°'):'—';$('r3a').textContent=ok.d?E(d+' cm'):'—';$('r3b').textContent=ok.d?E(DM()+' m'):'—';
    $('r6a').textContent=ok.c1?E(fx(W(),3)+' J'):'—';
    rDraw();$('kT').hidden=!ok.c1;$('fbd').hidden=!ok.c1;if(ok.c1)fbDraw();
    $('rNote').textContent=ok.c1?'الاستنتاج: الشغل يساوي حاصل الضرب القياسي لمتجهي القوة والإزاحة:\n'+E(`W = F⃗ · x⃗ = F x cos θ = ${fx(W(),3)} J`)+'\n\nتوضيح:\n1. ناتج الضرب القياسي لمتجهين كمية قياسية، لذلك الشغل '+E('W')+' له مقدار ووحدة '+E('J')+' فقط، وليس له اتجاه.\n2. السطح أملس فنهمل قوة الاحتكاك، والشغل المحسوب هو شغل قوة السحب '+E('F')+'.\n3. المركبة '+E('F\u00a0cos\u00a0θ')+' في اتجاه الإزاحة، فهي التي تبذل الشغل.\n4. المركبة '+E('F\u00a0sin\u00a0θ')+' عمودية على الإزاحة، فلا تبذل شغلا.\n5. حسب قانون نيوتن الأول، الصندوق لا يتحرك رأسيا، فمجموع المركبة '+E('F\u00a0sin\u00a0θ')+' وقوة رد الفعل '+E('N')+' يساوي قوة الجذب '+E('Fg')+' ويعاكسها، فيلغيانها:\n'+E('F sin θ + N = Fg')+'\n6. حسب قانون نيوتن الثالث، يؤثر الصندوق على السطح بقوة الفعل إلى الأسفل، فيؤثر السطح على الصندوق بقوة رد الفعل '+E('N')+' إلى الأعلى، مساوية لها في المقدار ومعاكسة في الاتجاه:\n'+E('F sin θ + N = Fg'):'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('fR').oninput=fDraw;$('aR').oninput=aDraw;$('dR').oninput=dDraw;
  $('fCk').onclick=()=>{if(+$('fR').value<100)return fb('fFb',false,'اشدد الميزان حتى يتحرك الصندوق أولا.');const v=num($('fIn').value);if(isNaN(v))return fb('fFb',false,'اكتب قراءة الميزان بالنيوتن.');
    if(Math.abs(v-F)<0.05){ok.f=true;fb('fFb',true,'✓ قراءة صحيحة:\n'+E(`F = ${F.toFixed(1)} N`))}else fb('fFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('fHn').onclick=()=>{hF=true;fDraw();fb('fFb',true,'تلميح: الأرقام على التدريج كل '+E('0.5 N')+'، وكل قسم صغير '+E('0.1 N')+'. اقرأ آخر رقم قبل المؤشر، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  $('tCk').onclick=()=>{if(aVal()!==th)return fb('tFb',false,'حرّك عدسة التكبير حتى تتوقف عند الخيط أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;aDraw();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  $('dCk').onclick=()=>{if(dVal()!==d)return fb('dFb',false,'مد الشريط حتى يلامس مؤخرة الصندوق أولا.');const v=num($('dIn').value);if(isNaN(v))return fb('dFb',false,'اكتب الإزاحة بالسنتيمتر.');
    if(Math.abs(v-d)<0.5){ok.d=true;fb('dFb',true,'✓ قراءة صحيحة:\n'+E(`x = ${d} cm = ${DM()} m`))}else fb('dFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('dHn').onclick=()=>{hD=true;dDraw();fb('dFb',true,'تلميح: الأرقام على التدريج كل '+E('5 cm')+'، وكل قسم صغير '+E('1 cm')+'. اقرأ آخر رقم قبل طرف الشريط، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.f&&ok.t&&ok.d))return fb(f,false,'أكمل القياسات 4.1 و 4.2 و 4.3 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة J.');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);results()};
  $('c1k').onclick=()=>chk(1,W(),'✓ إجابة صحيحة:\n'+E(`W = ${fx(W(),3)} J`),'✗ حوّل الإزاحة إلى المتر أولا، ثم اضرب F × x × cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}
function dpBoard(o){/* لوحة الإحداثيات: o={A:[x,y],B:[x,y],pA,pB,prot:{a0,th,mag},arc,unit} */
  const X=v=>40+v*40,Y=v=>360-v*40,V='⃗';
  let g=`<rect x="20" y="20" width="370" height="360" rx="10" fill="#FFFBEB" stroke="#B45309" stroke-width="2"/>`;
  for(let i=0;i<=8;i++){g+=`<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(8)}" stroke="#CBD5E1" stroke-width="1"/><line x1="${X(0)}" y1="${Y(i)}" x2="${X(8)}" y2="${Y(i)}" stroke="#CBD5E1" stroke-width="1"/>`;
    if(i>0)g+=`<text x="${X(i)}" y="${Y(0)+15}" font-size="11" font-weight="700" text-anchor="middle" fill="#475569">${i}</text><text x="${X(0)-8}" y="${Y(i)+4}" font-size="11" font-weight="700" text-anchor="end" fill="#475569">${i}</text>`}
  g+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(8.4)}" y2="${Y(0)}" stroke="#1F2937" stroke-width="2"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(8.4)}" stroke="#1F2937" stroke-width="2"/><text x="${X(8.4)}" y="${Y(0)-6}" font-size="13" font-weight="800" fill="#1F2937">x</text><text x="${X(0)+6}" y="${Y(8.4)+4}" font-size="13" font-weight="800" fill="#1F2937">y</text>`;
  const ar=(x1,y1,x2,y2,c,w)=>{const a=Math.atan2(y2-y1,x2-x1),h=12;return `<line x1="${x1}" y1="${y1}" x2="${x2-h*.6*Math.cos(a)}" y2="${y2-h*.6*Math.sin(a)}" stroke="${c}" stroke-width="${w}"/><path d="M${x2} ${y2} L${x2-h*Math.cos(a-.4)} ${y2-h*Math.sin(a-.4)} L${x2-h*Math.cos(a+.4)} ${y2-h*Math.sin(a+.4)} Z" fill="${c}"/>`};
  if(o.unit)g+=ar(X(0),Y(0),X(1),Y(0),'#7C3AED',4)+ar(X(0),Y(0),X(0),Y(1),'#7C3AED',4)+`<text x="${X(.5)}" y="${Y(0)+30}" font-size="14" font-weight="800" fill="#7C3AED" text-anchor="middle">i</text><text x="${X(0)-24}" y="${Y(.5)+5}" font-size="14" font-weight="800" fill="#7C3AED" text-anchor="middle">j</text>`;
  const proj=(P,p,c)=>{if(!p)return '';const x=X(P[0]),y=Y(P[1]);return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y+(Y(0)-y)*p}" stroke="${c}" stroke-width="2" stroke-dasharray="6 4"/><line x1="${x}" y1="${y}" x2="${x-(x-X(0))*p}" y2="${y}" stroke="${c}" stroke-width="2" stroke-dasharray="6 4"/>`+(p>=1?`<circle cx="${x}" cy="${Y(0)}" r="5" fill="${c}"/><circle cx="${X(0)}" cy="${y}" r="5" fill="${c}"/>`:'')};
  g+=proj(o.A,o.pA,'#DC2626')+proj(o.B,o.pB,'#2563EB');
  if(o.prot){const R=110,cx=X(0),cy=Y(0);g+=`<defs><clipPath id="dpClip"><rect x="20" y="20" width="370" height="360" rx="10"/></clipPath></defs><g clip-path="url(#dpClip)"><g transform="rotate(${-o.prot.a0} ${cx} ${cy})">${wkProt(cx,cy,R,0,o.prot.mag)}</g></g>`}
  if(o.arc){const r=55,a1=o.arc[0]*Math.PI/180,a2=o.arc[1]*Math.PI/180,m=(a1+a2)/2;g+=`<path d="M${X(0)+r*Math.cos(a1)} ${Y(0)-r*Math.sin(a1)} A${r} ${r} 0 0 0 ${X(0)+r*Math.cos(a2)} ${Y(0)-r*Math.sin(a2)}" fill="none" stroke="#F7931E" stroke-width="3"/><text x="${X(0)+(r+14)*Math.cos(m)}" y="${Y(0)-(r+14)*Math.sin(m)+5}" font-size="15" font-weight="800" fill="#F7931E" text-anchor="middle">θ</text>`}
  const vec=(P,c,lab)=>{const x=X(P[0]),y=Y(P[1]);return ar(X(0),Y(0),x,y,c,4)+`<circle cx="${x}" cy="${y}" r="4" fill="#1F2937"/><text x="${x+10}" y="${y-8}" font-size="17" font-weight="800" fill="${c}">${lab}${V}</text>`};
  g+=vec(o.A,'#DC2626','A')+vec(o.B,'#2563EB','B')+`<circle cx="${X(0)}" cy="${Y(0)}" r="5" fill="#1F2937"/>`;
  return g}
function dpTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const bd=`<svg viewBox="0 -30 410 462" aria-label="أداة لوحة الإحداثيات">${dpBoard({A:[6,2],B:[3,5],unit:1})}${lbl(40,360,20,402,'نقطة الأصل','start')}${lbl(62,360,150,402,'متجها الوحدة')}${lbl(220,300,320,402,'خيط المتجه')}${lbl(300,100,392,-14,'المربع = 1 cm','end')}</svg>`;
  const pr=`<svg viewBox="0 0 400 215" aria-label="أداة المنقلة">${wkProt(200,160,140)}<line x1="40" y1="160" x2="360" y2="160" stroke="#B45309" stroke-width="2"/>${lbl(200,160,200,192,'مركز المنقلة')}${lbl(300,62,370,20,'التدريج بالدرجات','end')}${lbl(80,160,40,192,'خط القاعدة','start')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${bd}</div><p><b>أداة لوحة الإحداثيات:</b> لوحة مربعات كل مربع منها <span dir="ltr">1 cm</span>، يُشد عليها خيطان من نقطة الأصل يمثلان المتجهين، ومتجها الوحدة <span dir="ltr">i</span> و <span dir="ltr">j</span> طول كل منهما مربع واحد.</p></div>
    <div class="tool"><div class="stage">${pr}</div><p><b>أداة المنقلة:</b> تقيس الزاوية بين المتجهين بدقة <span dir="ltr">1°</span>، ويوضع مركزها عند نقطة الأصل.</p></div></div>`}
function dotLab(box){
  const V='⃗';
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">الضرب القياسي لمتجهين بمتجهات الوحدة على لوحة الإحداثيات</p></div>
  <div class="tags"><span class="tag">المركبات: <i>أداة لوحة الإحداثيات</i> · cm</span><span class="tag">الزاوية θ: <i>أداة المنقلة</i> · °</span><span class="tag dv">الضرب القياسي: <i>كمية قياسية</i> · cm²</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>قراءة مركبتي كل متجه من أداة لوحة الإحداثيات، وكتابته بمتجهات الوحدة.</li>
    <li>قياس الزاوية بين المتجهين بأداة المنقلة.</li>
    <li>حساب الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية وبالإحداثيات القطبية، والمقارنة بين النتيجتين.</li></ol></div>
  ${dpTools()}
  <h3 class="secH">4. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 متجهان جديدان</button></div>
  <div class="ctl"><h3>4.1 قراءة مركبتي المتجه A${V}</h3>
    <div class="stage"><svg id="s1" viewBox="0 10 410 390"></svg></div>
    <div class="row"><label for="p1">إسقاط المتجه على المحورين</label><output id="o1"></output><input id="p1" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإسقاط رأس المتجه على المحورين، ثم عُدّ المربعات.</p>
    <div class="ans"><label>قراءتك لمركبتي A${V} بوحدة cm</label><input id="ax" inputmode="decimal" dir="ltr" placeholder="Ax"><input id="ay" inputmode="decimal" dir="ltr" placeholder="Ay"><button type="button" class="go" id="aCk">تحقق</button></div><div class="fb2" id="aFb"></div>
  </div>
  <div class="ctl"><h3>4.2 قراءة مركبتي المتجه B${V}</h3>
    <div class="stage"><svg id="s2" viewBox="0 10 410 390"></svg></div>
    <div class="row"><label for="p2">إسقاط المتجه على المحورين</label><output id="o2"></output><input id="p2" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإسقاط رأس المتجه على المحورين، ثم عُدّ المربعات.</p>
    <div class="ans"><label>قراءتك لمركبتي B${V} بوحدة cm</label><input id="bx" inputmode="decimal" dir="ltr" placeholder="Bx"><input id="by" inputmode="decimal" dir="ltr" placeholder="By"><button type="button" class="go" id="bCk">تحقق</button></div><div class="fb2" id="bFb"></div>
  </div>
  <div class="ctl"><h3>4.3 قياس الزاوية θ بين المتجهين بأداة المنقلة</h3>
    <div class="stage"><svg id="s3" viewBox="0 10 410 390"></svg><svg id="z3" viewBox="0 0 400 120"></svg><div class="hud"><span id="st3"></span></div></div>
    <div class="row"><label for="p3">عدسة التكبير على تدريج المنقلة</label><output id="o3"></output><input id="p3" type="range" min="0" max="90" step="1" value="0"></div>
    <p class="slh">👆 صفر المنقلة على المتجه A${V}. اسحب المؤشر البرتقالي لتحريك العدسة حتى تتوقف عند المتجه B${V}.</p>
    <div class="ans"><label>قراءتك للزاوية θ</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <h3 class="secH">5. القوانين المستخدمة والحسابات</h3>
  <div class="ctl"><h3>5.1 القوانين المستخدمة</h3>
    <div class="law ftl"><div class="ln lw"><b>المتجهان بمتجهات الوحدة</b><span>A${V} = Ax i + Ay j ,  B${V} = Bx i + By j</span></div>
      <div class="ln lw"><b>الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية</b><span>A${V} · B${V} = Ax Bx + Ay By</span></div>
      <div class="ln lw"><b>الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية</b><span>A${V} · B${V} = A B cos θ</span></div>
      <div class="ln lw"><b>مقدار المتجه</b><span>A = √(Ax² + Ay²)</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">Ax , Ay</span> مركبتا المتجه <span dir="ltr">A${V}</span>، وتقرآن من أداة لوحة الإحداثيات، ووحدتهما <span dir="ltr">cm</span></li>
      <li><span class="chip" dir="ltr">Bx , By</span> مركبتا المتجه <span dir="ltr">B${V}</span>، ووحدتهما <span dir="ltr">cm</span></li>
      <li><span class="chip" dir="ltr">i , j</span> متجها الوحدة على المحورين، مقدار كل منهما 1 وليس لهما وحدة</li>
      <li><span class="chip" dir="ltr">A , B</span> مقدارا المتجهين، ووحدتهما <span dir="ltr">cm</span></li>
      <li><span class="chip" dir="ltr">θ</span> الزاوية بين المتجهين، وتقاس بأداة المنقلة، ووحدتها الدرجة <span dir="ltr">°</span></li></ul></div></div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law ftl"><div class="ln lw"><b>1. الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية</b><span id="vS1" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسات 4.1 و 4.2</span></div></div>
    <div class="ans"><label>احسب الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية بوحدة cm²</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="cm²"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div>
    <div class="law ftl" style="margin-top:16px"><div class="ln lw"><b>2. الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية</b><span id="vS2" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسات 4.1 و 4.2 و 4.3</span></div></div>
    <div class="ans"><label>احسب الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية بوحدة cm²</label><input id="c2" inputmode="decimal" dir="ltr" placeholder="cm²"><button type="button" class="go" id="c2k">تحقق</button></div><div class="fb2" id="c2f"></div>
    <div class="labCalc"></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th></tr></thead>
    <tbody><tr><td>المتجه A${V}</td><td>أداة لوحة الإحداثيات</td><td id="r1">—</td></tr>
    <tr><td>المتجه B${V}</td><td>أداة لوحة الإحداثيات</td><td id="r2">—</td></tr>
    <tr><td>الزاوية θ</td><td>أداة المنقلة</td><td id="r3">—</td></tr>
    <tr><td>الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">Ax Bx + Ay By</span></td><td id="r4">—</td></tr>
    <tr><td>الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">A B cos θ</span></td><td id="r5">—</td></tr></tbody></table></div>
    <div class="stage" id="rStage" hidden><svg id="rS" viewBox="0 10 410 390"></svg></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id),D2R=Math.PI/180;
  const num=v=>parseFloat(String(v).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace('٫','.').replace(',','.'));
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fx=(x,n)=>String(+x.toFixed(n));
  let A,B,aA,aB,th,ok={},hT=false;
  const MA=()=>Math.hypot(A[0],A[1]),MB=()=>Math.hypot(B[0],B[1]),DC=()=>A[0]*B[0]+A[1]*B[1],DT=()=>MA()*MB()*Math.cos(th*D2R);
  function newObj(){do{A=[3+Math.floor(Math.random()*6),1+Math.floor(Math.random()*4)];B=[1+Math.floor(Math.random()*4),3+Math.floor(Math.random()*6)];
      aA=Math.atan2(A[1],A[0])/D2R;aB=Math.atan2(B[1],B[0])/D2R;th=Math.round(aB-aA)}while(th<20||th>85);
    ok={};hT=false;['p1','p2','p3'].forEach(k=>$(k).value=0);['ax','ay','bx','by','tIn','c1','c2'].forEach(k=>$(k).value='');['aFb','bFb','tFb','c1f','c2f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    d1();d2();d3();sub();results()}
  function d1(){const p=+$('p1').value/100;$('o1').textContent=p>=1?'تم':'';$('s1').innerHTML=dpBoard({A,B,pA:p,unit:1})}
  function d2(){const p=+$('p2').value/100;$('o2').textContent=p>=1?'تم':'';$('s2').innerHTML=dpBoard({A,B,pB:p,unit:1})}
  function tVal(){let a=+$('p3').value;if(a>th){a=th;$('p3').value=a}return a}
  function d3(){const a=tVal(),touch=a===th;$('o3').textContent=a+'°';$('st3').textContent=touch?'✓ العدسة على المتجه الأزرق، اقرأ الزاوية':'حرّك العدسة حتى تتوقف عند المتجه الأزرق';
    $('s3').innerHTML=dpBoard({A,B,prot:{a0:aA,mag:a}});
    const k=26,XX=d=>200+(d-a)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#F8FAFC" stroke="#94A3B8"/>';
    for(let d=a-8;d<=a+8;d++){if(d<0)continue;const x=XX(d),big=d%10===0,mid=d%5===0,isH=hT&&touch&&d===th;g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?24:mid?16:9)}" stroke="${isH?'#DC2626':'#1F2937'}" stroke-width="${isH?2.6:big?1.5:.9}"/>`;if(mid)g+=`<text x="${x}" y="62" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${d}</text>`}
    const xs=XX(th);if(xs>0&&xs<400)g+=`<line x1="${xs}" y1="0" x2="${xs}" y2="18" stroke="#2563EB" stroke-width="4"/><path d="M${xs-6} 12 L${xs+6} 12 L${xs} 20 Z" fill="#2563EB"/>`;
    g+=`<text x="6" y="110" font-size="12" font-weight="700" fill="var(--muted)">تكبير التدريج</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="110" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">°</text>`;
    $('z3').innerHTML=g}
  function sub(){$('vS1').textContent=ok.a&&ok.b?[`A${V} = ${A[0]} i + ${A[1]} j`,`B${V} = ${B[0]} i + ${B[1]} j`,`A${V} · B${V} = Ax Bx + Ay By`,`A${V} · B${V} = (${A[0]})(${B[0]}) + (${A[1]})(${B[1]})`].map(E).join('\n'):'أكمل القياسات 4.1 و 4.2';
    $('vS2').textContent=ok.a&&ok.b&&ok.t?[`A = √(${A[0]}² + ${A[1]}²) = ${fx(MA(),2)} cm`,`B = √(${B[0]}² + ${B[1]}²) = ${fx(MB(),2)} cm`,`A${V} · B${V} = A B cos θ`,`A${V} · B${V} = ${fx(MA(),2)} × ${fx(MB(),2)} × cos ${th}°`].map(E).join('\n'):'أكمل القياسات 4.1 و 4.2 و 4.3'}
  function results(){
    $('r1').textContent=ok.a?E(`${A[0]} i + ${A[1]} j  cm`):'—';$('r2').textContent=ok.b?E(`${B[0]} i + ${B[1]} j  cm`):'—';$('r3').textContent=ok.t?E(th+'°'):'—';
    $('r4').textContent=ok.c1?E(DC()+' cm²'):'—';$('r5').textContent=ok.c2?E(fx(DT(),1)+' cm²'):'—';
    const done=ok.c1&&ok.c2;$('rStage').hidden=!done;if(done)$('rS').innerHTML=dpBoard({A,B,unit:1,arc:[aA,aB]});
    $('rNote').textContent=done?'الاستنتاج: الطريقتان تعطيان نفس الناتج تقريبا:\nبالإحداثيات الديكارتية: '+E(`A${V} · B${V} = ${DC()} cm²`)+'\nبالإحداثيات القطبية: '+E(`A${V} · B${V} = ${fx(DT(),1)} cm²`)+'\n\nتوضيح:\n1. ناتج الضرب القياسي لمتجهين كمية قياسية (عدد ووحدة فقط، وليس له اتجاه).\n2. في الإحداثيات الديكارتية نضرب المركبتين السينيتين معا، والمركبتين الصاديتين معا، ثم نجمع.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('p1').oninput=d1;$('p2').oninput=d2;$('p3').oninput=d3;
  const rd=(P,ix,iy,f,pid,nm)=>{if(+$(pid).value<100)return fb(f,false,'اسحب المؤشر حتى يكتمل الإسقاط أولا.');const x=num($(ix).value),y=num($(iy).value);if(isNaN(x)||isNaN(y))return fb(f,false,'اكتب المركبتين بالسنتيمتر.');
    if(x===P[0]&&y===P[1]){fb(f,true,'✓ قراءة صحيحة:\n'+E(`${nm}${V} = ${P[0]} i + ${P[1]} j`));return true}fb(f,false,'✗ عُدّ المربعات من نقطة الأصل حتى النقطة الملونة على كل محور.');return false};
  $('aCk').onclick=()=>{if(rd(A,'ax','ay','aFb','p1','A'))ok.a=true;sub();results()};
  $('bCk').onclick=()=>{if(rd(B,'bx','by','bFb','p2','B'))ok.b=true;sub();results()};
  $('tCk').onclick=()=>{if(tVal()!==th)return fb('tFb',false,'حرّك العدسة حتى تتوقف عند المتجه الأزرق أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;d3();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل السهم الأزرق، ثم عُدّ الأقسام حتى الخط الأحمر.')};
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.a&&ok.b&&(i===1||ok.t)))return fb(f,false,i===1?'أكمل القياسين 4.1 و 4.2 أولا.':'أكمل القياسات 4.1 و 4.2 و 4.3 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة cm².');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);results()};
  $('c1k').onclick=()=>chk(1,DC(),'✓ إجابة صحيحة:\n'+E(`A${V} · B${V} = ${A[0]*B[0]} + ${A[1]*B[1]} = ${DC()} cm²`),'✗ اضرب Ax في Bx، ثم Ay في By، واجمع الناتجين.');
  $('c2k').onclick=()=>chk(2,DT(),'✓ إجابة صحيحة:\n'+E(`A${V} · B${V} = ${fx(DT(),1)} cm²`),'✗ اضرب المقدارين A و B في cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}
window.LABS={'0-1':{t:'القياس بأداة القدمة ذات الورنية وأداة الميكرومتر',run:measureLab},'0-2':{t:'قياس سرعة جسم متحرك والتحويل بين وحداتها',run:speedLab2},'0-4':{t:'إيجاد محصلة متجهين باستخدام طاولة القوى',run:forceLab},'0-5':{t:'تحليل قوة إلى مركبتين باستخدام طاولة القوى',run:vecLab},'0-6':[{t:'حساب الشغل بالضرب القياسي لمتجهي القوة والإزاحة',run:workLab},{t:'الضرب القياسي لمتجهين بمتجهات الوحدة على لوحة الإحداثيات',run:dotLab}]};
window.renderLabCard=function(host,u,l){const L=window.LABS[u+'-'+l];if(!L)return false;css();
  (Array.isArray(L)?L:[L]).forEach(x=>{const c=document.createElement('div');c.className='card lab';c.innerHTML='<div class="labBody"></div>';host.appendChild(c);x.run(c.querySelector('.labBody'))});return true};
})();
