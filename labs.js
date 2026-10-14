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
.lab .intro{border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin-bottom:12px}.lab .intro h3{margin:0 0 6px;font-size:15px;color:var(--accent)}.lab .intro .tool p{margin:0 0 6px;font-size:14px;line-height:1.7}.lab .law .sym{padding:6px 0;border-bottom:1px dashed var(--line);font-size:14px}.lab .law .sym b{color:var(--muted)}.lab .law .sym ul{margin:4px 0 0;padding-inline-start:18px;line-height:1.8}.lab .law .sym li span{font-weight:800}.lab .labKind{display:block;font-size:14px;font-weight:700;color:var(--muted);margin-bottom:4px}.lab .labName{display:block;margin:0;font-size:18px;font-weight:800;line-height:1.6}.lab .intro h3,.lab .secH,.lab .res h3{font-size:20px!important;font-weight:800}.lab .ctl:not(.res) h3{font-size:17px!important}.lab .slh{margin:-2px 0 8px;font-size:13px;line-height:1.6;color:var(--muted);background:var(--accent-soft,#EEF5FF);border-radius:8px;padding:6px 10px}.lab .secH{margin:22px 0 8px;font-size:17px;color:var(--accent)}.lab .startBand{margin:0 0 14px;padding:18px 14px;border-radius:14px;background:var(--lo);color:#fff;font-size:22px;font-weight:800;text-align:center;line-height:1.5;box-shadow:0 4px 14px rgba(247,147,30,.35)}.lab .tw{overflow-x:auto}.lab table.rt{width:100%;border-collapse:collapse;font-size:13px}.lab table.rt th,.lab table.rt td{border:1px solid var(--line);padding:7px 6px;text-align:center}.lab table.rt th{background:var(--accent-soft,#E6F0FF);color:var(--ink)}.lab table.rt td{font-variant-numeric:tabular-nums}.lab table.rt td:nth-child(3){white-space:nowrap}.lab .rn{margin:8px 0 0;font-size:14px;line-height:1.7;color:var(--muted)}.lab .intro ol.gl{margin:0;padding-inline-start:22px;font-size:14px;line-height:1.8}.lab .intro ol.gl li::marker{color:var(--accent);font-weight:800}.lab .intro ol.steps{margin:0 0 14px;padding-inline-start:22px;font-size:14px;line-height:1.75}.lab .intro ol.steps li::marker{color:#2563EB;font-weight:800}.lab .intro .stage{background:var(--panel)}

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

  <h3 class="secH">5. القانون المستخدم والحسابات</h3>
  <div class="ctl"><h3>5.1 القانون المستخدم</h3>
    <div class="law" id="vol"><div class="ln"><b>القانون</b><span>V = π D² L / 4</span></div><div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">V</span> حجم الأسطوانة، ووحدته <span dir="ltr">m³</span></li>
      <li><span class="chip" dir="ltr">π</span> النسبة التقريبية، وقيمتها <span dir="ltr">3.14</span>، وليس لها وحدة</li>
      <li><span class="chip" dir="ltr">D</span> قطر الأسطوانة، ويقاس بأداة الميكرومتر، ووحدته <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">L</span> طول الأسطوانة، ويقاس بأداة القدمة ذات الورنية، ووحدته <span dir="ltr">m</span></li></ul></div></div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <div class="law"><div class="ln"><b>التعويض</b><span id="vS">أكمل القياسين 4.1 و 4.2</span></div></div>
    <div class="ans"><label>احسب الحجم V بوحدة cm³</label><input id="cIn" inputmode="decimal" dir="ltr" placeholder="cm³"><button type="button" class="go" id="cCk">تحقق</button></div><div class="fb2" id="cFb"></div>
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
  newObj();
}

window.LABS={'0-1':{t:'القياس بأداة القدمة ذات الورنية وأداة الميكرومتر',run:measureLab}};
window.renderLabCard=function(host,u,l){const L=window.LABS[u+'-'+l];if(!L)return false;css();
  const c=document.createElement('div');c.className='card lab';c.innerHTML='<h2></h2><div class="labBody"></div>';c.querySelector('h2').remove();
  host.appendChild(c);L.run(c.querySelector('.labBody'));return true};
})();
