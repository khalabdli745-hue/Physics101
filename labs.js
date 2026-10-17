/* تجارب عملية تفاعلية لكل درس — يتحكم المتدرب في متغيرات التجربة من لوحة التحكم، ويرى أثرها فورا على الحركة والقانون */
(function(){
const CSS=`
.lab{--lo:#F7931E}
.lab .stage{background:linear-gradient(#EAF4FF,#F7FBFF);border:1px solid var(--line);border-radius:12px;overflow:hidden;margin:6px 0 12px}
:root[data-theme="dark"] .lab .stage{background:linear-gradient(#142033,#0F1724)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .lab .stage{background:linear-gradient(#142033,#0F1724)}}
.lab svg{display:block;width:100%;height:auto;direction:ltr}
.lab .stage svg text[fill="var(--ink)"]{paint-order:stroke;stroke:#F2F8FF;stroke-width:3px;stroke-linejoin:round}
:root[data-theme="dark"] .lab .stage svg text[fill="var(--ink)"]{stroke:#121C2C}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .lab .stage svg text[fill="var(--ink)"]{stroke:#121C2C}}
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
.lab .drv ol{list-style:none;margin:4px 0;padding-inline-start:0;line-height:1.9}.lab .drv li.key{background:#FFEDD5;border-radius:6px;padding:2px 6px;font-weight:800}.lab .drv ol.dsteps{list-style:none;counter-reset:d;margin:6px 0 10px;padding:0;line-height:1.9}.lab .drv ol.dsteps li{counter-increment:d;margin:4px 0;padding:4px 8px;border-radius:8px;background:var(--accent-soft,#FFF7ED);font-weight:700}.lab .drv ol.dsteps li::before{content:counter(d) ") ";color:var(--accent);font-weight:800}.lab .drv ol.dsteps li:last-child{background:#FFEDD5}.lab .drv ol.dsteps li>span[dir=ltr]:last-child{display:block;text-align:center;white-space:nowrap;font-size:16px;margin-top:2px}.lab .drv p.dl{margin:6px 0 8px;font-weight:700;line-height:1.9;color:var(--ink)}
.lab .drvBtn{display:inline-block;margin-inline-start:6px;padding:3px 10px;border-radius:999px;border:1.5px solid var(--accent);background:var(--accent-soft,#FFF7ED);color:var(--accent);font:inherit;font-size:13px;font-weight:800;cursor:pointer;vertical-align:middle}
.lab .lwf{display:block;text-align:center;font-weight:800;font-size:16px;color:var(--accent);margin:2px 0 4px;white-space:nowrap}
.lab h4.sbh{margin:16px 0 8px;font-size:15px;font-weight:800;color:var(--accent);border-inline-start:4px solid var(--accent);padding-inline-start:8px}
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
.lab .ftl .ln.lw span.mu{display:inline;padding:0;border:0;border-radius:0;background:none;color:inherit;font-size:1.1em!important;overflow:visible}
/* قوانين التحويل والحاسبة */
.lab .labCalc{margin-top:12px}.lab .labCalc .calcbtn{width:100%;justify-content:center}
.lab .law .cv li{text-align:center}
.lab .law .cv .fx{display:inline-block;font-family:"Cambria Math","STIX Two Math","Times New Roman",serif;font-size:19px;font-weight:700;color:var(--ink)}
/* مراجع التجربة */
.lab .lrefs .rlead{margin:0 0 8px;font-size:13.5px;line-height:1.7;color:var(--muted)}
.lab .lrefs ol.rl{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.lab .lrefs ol.rl li{padding:8px 10px;border-radius:10px;background:var(--panel);border:1px solid var(--line)}
.lab .lrefs .en{display:block;direction:ltr;text-align:left;font-family:Georgia,"Times New Roman",serif;font-size:13px;line-height:1.6;color:var(--ink)}
.lab .lrefs .ar{display:block;margin-top:6px;font-size:13px;font-weight:700;color:var(--accent);line-height:1.7}
.lab .lrefs .en a{color:var(--accent);word-break:break-all;text-decoration:none}
`;
function css(){if(document.getElementById('labCss'))return;const s=document.createElement('style');s.id='labCss';s.textContent=CSS;document.head.appendChild(s)}
const E=t=>'\u2066'+t+'\u2069';
const sci=(x,d=3)=>{const e=Math.floor(Math.log10(Math.abs(x)));const m=(x/10**e).toFixed(d);const sup={'-':'⁻','0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'};return m+' × 10'+String(e).split('').map(c=>sup[c]).join('')};
const f=(n,d=2)=>{const r=Math.round(n*10**d)/10**d;return String(r)};
function quiz(root,qs){qs.forEach(q=>{const d=document.createElement('div');d.className='q';d.innerHTML='<p></p><div class="op"></div><div class="fb"></div>';d.querySelector('p').textContent=q.q;
  q.o.forEach((o,i)=>{const b=document.createElement('button');b.type='button';b.dir='auto';b.textContent=o;b.onclick=()=>{d.querySelectorAll('.op button').forEach(x=>x.className='');b.className=i===q.a?'ok':'no';d.querySelector('.fb').textContent=(i===q.a?'✓ إجابة صحيحة. ':'✗ حاول مرة أخرى. ')+(i===q.a?q.e:q.h)};d.querySelector('.op').appendChild(b)});root.appendChild(d)})}

/* ===== مناظر ثلاثية الأبعاد للتجارب الأولى ===== */
function ob3(BASE){const S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const table=(T)=>box(6,346,0,86,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  return {S,P,poly,box,lbl,table}}
function ms3D(){/* القدمة ذات الورنية والميكرومتر على طاولة المعمل مع الأسطوانة */
  const BASE=210,T=12,{S,poly,box,lbl,table}=ob3(BASE);let g=`<defs><linearGradient id="msCy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient><linearGradient id="msCv" x1="0" x2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>`;
  g+=table(T);
  /* أداة القدمة ذات الورنية قائمة على فكيها فوق الطاولة، ووجهها المدرج نحو الناظر، والأسطوانة بين الفكين */
  const FD=36,BK=6,ZB0=T+62,ZB1=T+84,J0=26,J1=36,JM0=118,JM1=128,BX0=16,BX1=232;
  g+=box(BX0,BX1,FD,FD+BK,ZB0,ZB1,'#CBD5E1','#F1F5F9','#94A3B8','#475569');
  for(let i=0;i<=46;i++){const x=J1+i*4;if(x>BX1-6)break;const big=i%10===0,mid=i%5===0,[a,b]=S(x,FD,ZB0+2),[,b2]=S(x,FD,ZB0+2+(big?9:mid?6:4));g+=`<line x1="${a}" y1="${b}" x2="${a}" y2="${b2}" stroke="#1F2937" stroke-width="${big?1.2:.7}"/>`;if(big){const [q,w]=S(x,FD,ZB0+13);g+=`<text x="${q}" y="${w+4}" font-size="9" font-weight="800" text-anchor="middle" fill="#1F2937">${i/10}</text>`}}
  {const [q,w]=S(BX1-12,FD,ZB0+13);g+=`<text x="${q}" y="${w+4}" font-size="9" font-weight="800" text-anchor="middle" fill="#475569">cm</text>`}
  /* الفك الثابت والأسطوانة والفك المتحرك */
  g+=box(J0,J1,FD,FD+BK,T,ZB0,'#F7931E','#FDBA74','#C2410C','#9A3412');
  {const r=13,x0=J1,x1=JM0,[a,ya]=S(x0,FD+BK/2,T+r),[b,yb]=S(x1,FD+BK/2,T+r);
   g+=`<path d="M${a},${ya-r} L${b},${yb-r} L${b},${yb+r} L${a},${ya+r} Z" fill="url(#msCy)" stroke="#1E3A8A"/><ellipse cx="${b}" cy="${yb}" rx="6" ry="${r}" fill="#93C5FD" stroke="#1E3A8A"/>`}
  g+=box(JM0,JM1,FD,FD+BK,T,ZB0,'#F7931E','#FDBA74','#C2410C','#9A3412');
  /* الورنية المنزلقة ونافذتها وتدريجها */
  g+=box(JM0,JM0+50,FD-3,FD+BK,ZB0-8,ZB1+2,'#F7931E','#FDBA74','#C2410C','#9A3412');
  {const a=S(JM1+2,FD-3,ZB0-6),b=S(JM0+48,FD-3,ZB0+8);g+=`<rect x="${a[0]}" y="${b[1]}" width="${b[0]-a[0]}" height="${a[1]-b[1]}" fill="#FEF3C7" stroke="#7C2D12" stroke-width=".8"/>`;
   for(let k=0;k<=10;k++){const x=JM1+4+k*3.6,[q,w]=S(x,FD-3,ZB0+8),[,w2]=S(x,FD-3,ZB0+8-(k%5?4:7));g+=`<line x1="${q}" y1="${w}" x2="${q}" y2="${w2}" stroke="#7C2D12" stroke-width=".8"/>`;if(k%5===0){g+=`<text x="${q}" y="${w2+7}" font-size="7" font-weight="800" text-anchor="middle" fill="#7C2D12">${k}</text>`}}}
  {const [a,b]=S(JM0+26,FD-3,ZB0-12);g+=`<circle cx="${a}" cy="${b}" r="6" fill="#9A3412" stroke="#7C2D12"/>`}
  g+=box(JM0+34,JM0+42,FD,FD+BK,ZB1+2,ZB1+7,'#1F2937','#475569','#0F172A','#000');
  /* ساق قياس العمق */
  g+=box(BX1,BX1+16,FD+2,FD+4,ZB0+9,ZB0+12,'#94A3B8','#E2E8F0','#64748B','#475569');
  /* أداة الميكرومتر قائمة على حامل */
  const MX=258,MD=44;g+=box(MX-14,MX+70,MD-10,MD+12,T,T+5,'#334155','#64748B','#1F2937','#0F172A');
  {const p=(x,z)=>S(x,MD,z).join(',');g+=`<path d="M${p(MX,T+58)} L${p(MX,T+18)} Q${p(MX+30,T+8)} ${p(MX+60,T+18)} L${p(MX+60,T+46)}" fill="none" stroke="#475569" stroke-width="11" stroke-linejoin="round"/>`}
  g+=box(MX-2,MX+8,MD-3,MD+3,T+53,T+61,'#F7931E','#FDBA74','#C2410C','#9A3412');
  {const [cx,cb]=S(MX+16,MD,T+44),[,ct]=S(MX+16,MD,T+72),rx=7,ry=3;g+=`<path d="M${cx-rx},${ct} L${cx-rx},${cb} A${rx},${ry} 0 0 0 ${cx+rx},${cb} L${cx+rx},${ct} Z" fill="url(#msCv)" stroke="#1E3A8A"/><ellipse cx="${cx}" cy="${ct}" rx="${rx}" ry="${ry}" fill="#93C5FD" stroke="#1E3A8A"/>`}
  g+=box(MX+24,MX+60,MD-3,MD+3,T+53,T+61,'#CBD5E1','#F1F5F9','#94A3B8','#64748B')+box(MX+60,MX+92,MD-5,MD+5,T+51,T+63,'#EA580C','#FDBA74','#C2410C','#9A3412')+box(MX+92,MX+104,MD-3,MD+3,T+53,T+61,'#F97316','#FED7AA','#C2410C','#9A3412');
  for(let i=0;i<6;i++){const [a,b]=S(MX+64+i*5,MD-5,T+51),[,c]=S(MX+64+i*5,MD-5,T+63);g+=`<line x1="${a}" y1="${b}" x2="${a}" y2="${c}" stroke="#7C2D12" stroke-width=".7"/>`}
  g+=lbl(...S(200,FD,ZB1),180,16,'المسطرة الرئيسية (التدريج الرئيسي)')+lbl(...S(JM0+38,FD-3,ZB0+2),250,BASE-150,'الورنية','start')+lbl(...S(J0+5,FD,T+30),12,96,'الفك الثابت','start')+lbl(...S(JM0+5,FD,T+20),170,BASE+24,'الفك المتحرك')+lbl(...S(70,FD+3,T+6),8,BASE+24,'الأسطوانة: الطول L','start')+lbl(...S(JM0+26,FD-3,ZB0-12),200,134,'عجلة التحريك','start')+lbl(...S(JM0+38,FD,ZB1+6),12,40,'برغي التثبيت','start')+lbl(...S(MX+16,MD,T+64),396,22,'الأسطوانة: القطر D','end')+lbl(...S(MX+80,MD-5,T+57),390,BASE+24,'أداة الميكرومتر','end');
  return `<svg viewBox="0 0 400 ${BASE+40}" aria-label="أداة القدمة ذات الورنية وأداة الميكرومتر على طاولة المعمل">${g}</svg>`}
function sp3D(dd,o){/* مسار العربة على طاولة: الشريط المتري والعربة وساعة الإيقاف؛ dd المسافة بالسنتيمتر */
  o=o||{};const BASE=150,T=12,K=1.6,X0=48,{S,poly,box,lbl,table}=ob3(BASE);let g=table(T);
  g+=box(20,346,26,50,T,T+4,'#64748B','#94A3B8','#475569','#334155');
  const line=(x,c)=>{const a=S(x,26,T+4),b=S(x,50,T+4);return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="3"/>`};
  g+=line(X0,'#16A34A')+line(X0+dd*K,'#DC2626');
  {const a=S(X0,26,T),b=S(X0+dd*K,26,T);g+=`<text x="${a[0]}" y="${a[1]+11}" font-size="10" font-weight="800" text-anchor="middle" fill="#16A34A">البداية</text><text x="${b[0]}" y="${b[1]+11}" font-size="10" font-weight="800" text-anchor="middle" fill="#DC2626">النهاية</text>`}
  /* أداة الشريط المتري: علبة بقرص دائري وزر تثبيت عند خط البداية، وشريط مدرج بالسنتيمتر ممدود على المسار ينتهي بخطاف */
  const te=o.tape==null?0:o.tape,CX0=X0-32,CX1=X0-2,CD0=34,CD1=54,ZT0=T+4,CZ=ZT0+24;
  if(!o.noTape){const TD0=40,TD1=50,ZT=ZT0+0.8;g+=box(X0-2,X0+te*K,TD0,TD1,ZT0,ZT,'#FACC15','#FEF08A','#CA8A04','#A16207');
    for(let c=0;c<=te;c++){const big=c%10===0,mid=c%5===0;if(!mid&&te>80)continue;const [a,b]=S(X0+c*K,TD0,ZT),[a2,b2]=S(X0+c*K,TD0+(big?6:mid?4:2.5),ZT);g+=`<line x1="${a}" y1="${b}" x2="${a2}" y2="${b2}" stroke="#1F2937" stroke-width="${big?1.1:.6}"/>`;if(big&&c>0){const [q,w]=S(X0+c*K,TD0+8.5,ZT);g+=`<text x="${q}" y="${w+1}" font-size="8.5" font-weight="800" text-anchor="middle" fill="#1F2937">${c}</text>`}}
    const hx=X0+te*K;g+=box(hx,hx+3,TD0-2,TD1+2,ZT0,ZT0+9,'#F7931E','#FDBA74','#C2410C','#9A3412')}
  if(!o.noTape){g+=box(CX0,CX1,CD0,CD1,ZT0,CZ,'#EA580C','#FB923C','#C2410C','#9A3412');
  {const [cx,cy]=S((CX0+CX1)/2,CD0,(ZT0+CZ)/2);g+=`<circle cx="${cx}" cy="${cy}" r="9" fill="#FDBA74" stroke="#9A3412" stroke-width="1.4"/><circle cx="${cx}" cy="${cy}" r="3" fill="#9A3412"/>`}
  g+=box(CX0+10,CX0+20,CD0+4,CD0+12,CZ,CZ+4,'#1F2937','#475569','#0F172A','#000');}
  /* العربة */
  if(o.cart!=null){const cx=X0+o.cart*K;g+=box(cx-30,cx,27,38,T+8,T+20,'#2563EB','#93C5FD','#1E40AF','#1E3A8A');[[cx-24,27],[cx-6,27]].forEach(([x,d])=>{const [a,b]=S(x,d,T+8);g+=`<circle cx="${a}" cy="${b}" r="4.5" fill="#111827"/>`})}
  if(o.lab){g+=lbl(...S(X0-17,34,T+16),20,20,'أداة الشريط المتري','start')+(te>0?lbl(...S(X0+te*K+1,50,T+12),300,20,'الخطاف'):'')+lbl(...S(200,26,T+2),200,BASE+24,'مسار الحركة')+lbl(...S(X0,38,T+4),60,BASE+24,'خط البداية')+lbl(...S(X0+dd*K,38,T+4),330,BASE+24,'خط النهاية')+(o.cart!=null?lbl(...S(X0+o.cart*K-15,38,T+20),190,20,'العربة'):'')}
  return `<svg viewBox="0 ${o.lab?0:46} 400 ${BASE+(o.lab?40:12)-(o.lab?0:46)}" aria-label="مسار العربة والشريط المتري">${g}</svg>`}
function dp3D(){/* لوحة الإحداثيات على الطاولة مع الخيطين والمنقلة */
  const BASE=230,T=12,{S,poly,box,lbl,table}=ob3(BASE);let g=table(T);
  const O=[60,6],U=26,B=(i,j)=>S(O[0]+i*U,O[1]+j*U*0.62,T+3);
  g+=box(40,300,0,80,T,T+3,'#B45309','#FFFBEB','#92400E','#B45309');
  for(let i=0;i<=8;i++){const a=B(i,0),b=B(i,4.6);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#E5D3B3" stroke-width=".8"/>`}
  for(let j=0;j<=4;j++){const a=B(0,j),b=B(9,j);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#E5D3B3" stroke-width=".8"/>`}
  {const o=B(0,0),x=B(9.3,0),y=B(0,4.8);g+=`<line x1="${o[0]}" y1="${o[1]}" x2="${x[0]}" y2="${x[1]}" stroke="#1F2937" stroke-width="1.6"/><line x1="${o[0]}" y1="${o[1]}" x2="${y[0]}" y2="${y[1]}" stroke="#1F2937" stroke-width="1.6"/><text x="${x[0]+4}" y="${x[1]+4}" font-size="12" font-weight="800" fill="#1F2937">x</text><text x="${y[0]-4}" y="${y[1]-4}" font-size="12" font-weight="800" fill="#1F2937">y</text>`;
   const a=B(6,1.3),b=B(3,3.2);g+=`<line x1="${o[0]}" y1="${o[1]}" x2="${a[0]}" y2="${a[1]}" stroke="#DC2626" stroke-width="3"/><circle cx="${a[0]}" cy="${a[1]}" r="3.5" fill="#1F2937"/><text x="${a[0]+6}" y="${a[1]}" font-size="14" font-weight="800" fill="#DC2626">A⃗</text><line x1="${o[0]}" y1="${o[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#2563EB" stroke-width="3"/><circle cx="${b[0]}" cy="${b[1]}" r="3.5" fill="#1F2937"/><text x="${b[0]+6}" y="${b[1]}" font-size="14" font-weight="800" fill="#2563EB">B⃗</text><circle cx="${o[0]}" cy="${o[1]}" r="4" fill="#1F2937"/>`}
  /* المنقلة موضوعة بجانب اللوحة */
  {const c=S(250,62,T+3);let p=`<path d="M${c[0]-38},${c[1]} A38,22 0 0 1 ${c[0]+38},${c[1]} Z" fill="#FDE68A" fill-opacity=".9" stroke="#B45309" stroke-width="1.4"/>`;for(let k=0;k<=18;k++){const t=Math.PI*k/18,x1=c[0]-38*Math.cos(t),y1=c[1]-22*Math.sin(t),x2=c[0]-33*Math.cos(t),y2=c[1]-19*Math.sin(t);p+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#92400E" stroke-width=".8"/>`}g+=p}
  g+=lbl(...B(9,4.6),330,20,'لوحة الإحداثيات','end')+lbl(...B(4.5,0.98),150,BASE+24,'خيط المتجه A⃗')+lbl(...B(1.5,1.6),20,40,'خيط المتجه B⃗','start')+lbl(...S(250,62,T+18),330,BASE+24,'المنقلة')+lbl(...B(0,0),30,BASE+24,'نقطة الأصل','start');
  return `<svg viewBox="0 0 400 ${BASE+40}" aria-label="لوحة الإحداثيات والمنقلة على طاولة المعمل">${g}</svg>`}
function cv3D(p,o){/* الحمل: كأس زجاجي فوق سخان من جهة واحدة، مع صبغة */
  o=o||{};const BASE=220,T=12,{S,poly,box,lbl,table}=ob3(BASE);let g=table(T);
  g+=box(140,262,18,62,T,T+12,'#334155','#64748B','#1F2937','#0F172A');{const [a,b]=S(166,40,T+12);g+=`<ellipse cx="${a}" cy="${b}" rx="18" ry="6" fill="${p>0?'#EF4444':'#94A3B8'}"/>`}
  const cx=200,cd=40,R=48,Z0=T+12,Z1=Z0+120,[x0,y0]=S(cx,cd,Z0),[,y1]=S(cx,cd,Z1),[,yw]=S(cx,cd,Z1-14);
  g+=`<path d="M${x0-R},${yw} L${x0-R},${y0} A${R},14 0 0 0 ${x0+R},${y0} L${x0+R},${yw} Z" fill="#BFDBFE" opacity=".85"/><ellipse cx="${x0}" cy="${yw}" rx="${R}" ry="14" fill="#93C5FD" stroke="#1D4ED8" stroke-width=".8"/>`;
  const L=470,dash=`stroke-dasharray="${L*p} ${L}"`,Lx=x0-26,Rx=x0+26,top=yw+14,bot=y0-10;
  g+=`<path d="M${Lx},${bot} L${Lx},${top+12} Q${Lx},${top} ${Lx+12},${top} L${Rx-12},${top} Q${Rx},${top} ${Rx},${top+12} L${Rx},${bot-12} Q${Rx},${bot} ${Rx-12},${bot} L${Lx+12},${bot}" fill="none" stroke="#9333EA" stroke-width="5" stroke-linecap="round" ${dash} opacity=".85"/>`;
  if(p>0.2)g+=`<path d="M${Lx-6},${(top+bot)/2} l6,-10 l6,10" fill="none" stroke="#DC2626" stroke-width="3"/>`;if(p>0.6)g+=`<path d="M${Rx-6},${(top+bot)/2} l6,10 l6,-10" fill="none" stroke="#2563EB" stroke-width="3"/>`;
  g+=`<path d="M${x0-R},${y1} L${x0-R},${y0} A${R},14 0 0 0 ${x0+R},${y0} L${x0+R},${y1}" fill="none" stroke="#1E3A8A" stroke-width="2"/><ellipse cx="${x0}" cy="${y1}" rx="${R}" ry="14" fill="none" stroke="#1E3A8A" stroke-width="1.6"/>`;
  if(o.lab)g+=lbl(Lx,(top+bot)/2,40,60,'ماء ساخن يرتفع','start')+lbl(Rx,(top+bot)/2,360,60,'ماء بارد ينزل','end')+lbl(...S(150,18,T+6),110,BASE+24,'سخان كهربائي')+lbl(x0,top,200,20,'صبغة ملونة')+lbl(x0+R,y0-40,330,BASE+24,'وعاء زجاجي فيه ماء','end');
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?40:12)}" aria-label="تيار الحمل في كأس ماء">${g}</svg>`}
function toolsIntro(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const bd=(x,y,n)=>`<circle cx="${x}" cy="${y}" r="11" fill="#2563EB" stroke="#fff" stroke-width="2"/><text x="${x}" y="${y+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">${n}</text>`;
  let tk='';for(let i=0;i<=105;i++){const x=62+i*3;if(x>372)break;tk+=`<line x1="${x}" y1="66" x2="${x}" y2="${i%10===0?78:i%5===0?74:71}" stroke="#1F2937" stroke-width="${i%10===0?1.3:.8}"/>`;if(i%10===0&&i>0)tk+=`<text x="${x}" y="91" font-size="9" text-anchor="middle" fill="#1F2937">${i/10}</text>`}
  let vk='';for(let i=0;i<=10;i++){const x=147+i*6.5;vk+=`<line x1="${x}" y1="96" x2="${x}" y2="${i%5===0?110:105}" stroke="#7C2D12" stroke-width=".9"/>`}
  const cal=`<svg viewBox="16 0 386 242" aria-label="القدمة ذات الورنية">
    <defs><linearGradient id="iCyl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>
    <rect x="32" y="64" width="352" height="32" rx="3" fill="#CBD5E1" stroke="#475569"/>${tk}
    <path d="M32,64 V96 H62 V196 L44,172 H32 Z" fill="#F7931E" stroke="#9A3412"/><path d="M36,64 V26 L52,36 V64 Z" fill="#F7931E" stroke="#9A3412"/>
    <rect x="62" y="128" width="78" height="44" rx="3" fill="url(#iCyl)"/>
    <rect x="140" y="56" width="90" height="58" rx="5" fill="#FB923C" stroke="#9A3412"/><rect x="144" y="94" width="80" height="18" fill="#FDE7C8" stroke="#9A3412" stroke-width=".7"/>${vk}
    <path d="M140,114 V196 L158,172 H168 V114 Z" fill="#F7931E" stroke="#9A3412"/><path d="M140,56 V26 L126,36 V56 Z" fill="#F7931E" stroke="#9A3412"/>
    <circle cx="192" cy="124" r="8" fill="#9A3412"/><rect x="384" y="78" width="12" height="5" fill="#475569"/>
    ${lbl(48,160,24,222,'الفك الثابت','start')}${lbl(152,160,186,222,'الفك المتحرك')}${lbl(100,150,100,190,'الجسم المقيس')}
    ${lbl(300,70,322,20,'التدريج الرئيسي')}${lbl(190,104,214,20,'تدريج الورنية')}${lbl(44,32,62,20,'فكا القياس الداخلي','start')}${lbl(392,80,380,222,'ساق قياس العمق','end')}${lbl(192,132,262,160,'عجلة التحريك','start')}
    
  </svg>`;
  let sk='';for(let i=0;i<=8;i++){sk+=`<line x1="${232+i*6}" y1="104" x2="${232+i*6}" y2="${i%2?111:96}" stroke="#1F2937" stroke-width=".9"/>`}
  let th='';[[-2,'45'],[-1,''],[0,'0'],[1,''],[2,'5']].forEach(([k,n])=>{const y=104+k*7;th+=`<line x1="284" y1="${y}" x2="${n?296:291}" y2="${y}" stroke="#7C2D12" stroke-width="1"/>`+(n?`<text x="299" y="${y+3.5}" font-size="8" font-weight="700" fill="#7C2D12">${n}</text>`:'')});
  let kn='';for(let i=0;i<9;i++)kn+=`<line x1="${318+i*4}" y1="84" x2="${318+i*4}" y2="124" stroke="#9A3412" stroke-width=".8" opacity=".6"/>`;
  let rk='';for(let i=0;i<6;i++)rk+=`<line x1="${352+i*5}" y1="94" x2="${352+i*5}" y2="114" stroke="#9A3412" stroke-width=".8" opacity=".7"/>`;
  const mic=`<svg viewBox="16 0 372 242" aria-label="الميكرومتر">
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
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${ms3D()}</div><div class="vcap">أداة القدمة ذات الورنية وأداة الميكرومتر والأسطوانة على طاولة المعمل: منظر ثلاثي الأبعاد</div><p><b>ترتيب الأدوات:</b> تقاس الأسطوانة نفسها مرتين: طولها L بأداة القدمة ذات الورنية، وقطرها D بأداة الميكرومتر.</p></div>
    <div class="tool"><div class="stage">${cal}</div><p><b>القدمة ذات الورنية:</b> تقيس الأطوال والأقطار الخارجية والداخلية والأعماق بدقة <span dir="ltr">0.1 mm</span>.</p>
    </div>
    <div class="tool"><div class="stage">${mic}</div><p><b>الميكرومتر:</b> تقيس الأقطار والسماكات الصغيرة بدقة <span dir="ltr">0.01 mm</span>.</p>
    </div></div>`}
/* ===== الوحدة الأولى — الكميات الفيزيائية وأنظمة القياس: معمل القياس (أداة القدمة ذات الورنية وأداة الميكرومتر) ===== */

function convBox(rows){return `<div class="sym cv"><b>قوانين التحويل:</b><ul>`+rows.map(r=>`<li><span class="fx" dir="ltr">${r}</span></li>`).join('')+`</ul></div>`}
/* قراءة رقم المتدرب: أرقام عربية، وفاصلة عشرية، وصيغة الأس العلمي مثل 1.23×10⁻⁸ أو 1.23x10^-8 أو 1.23e-8 */
function labNum(v){let t=String(v).trim().replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/٫/g,'.').replace(/,/g,'.').replace(/\s+/g,'');
  const SUP={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};t=t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUP[c]).replace(/[−–]/g,'-');
  const m=t.match(/^([-+]?\d*\.?\d+)(?:[×xX*·]10\^?([-+]?\d+))$/);if(m)return parseFloat(m[1])*Math.pow(10,+m[2]);
  if(/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(t))return parseFloat(t);return NaN}
function calcInit(root){if(typeof makeCalc!=='function')return;const hs=[...root.querySelectorAll('.labCalc')];if(!hs.length)return;let tgt=null;
 root.addEventListener('focusin',e=>{if(e.target.matches('.ans input'))tgt=e.target});
 hs.forEach(h=>{const P=h.parentElement;
 const C=makeCalc(v=>{let t=tgt;if(!t||!P.contains(t))t=[...P.querySelectorAll('.ans input')].find(i=>!i.value)||P.querySelector('.ans input');if(!t)return;t.value=v;t.focus()});
 const u=C.panel.querySelector('.cuse');if(u)u.textContent='✓ ضع النتيجة في خانة الحساب';h.appendChild(C.btn);h.appendChild(C.panel)})}
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
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law" id="vol"><div class="ln"><b>القانون</b><span>V = π D² L / 4</span></div><div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">V</span> حجم الأسطوانة، ووحدته <span dir="ltr">m³</span></li>
      <li><span class="chip" dir="ltr">π</span> النسبة التقريبية، وقيمتها <span dir="ltr">3.14</span>، وليس لها وحدة</li>
      <li><span class="chip" dir="ltr">D</span> قطر الأسطوانة، ويقاس بأداة الميكرومتر، ووحدته <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">L</span> طول الأسطوانة، ويقاس بأداة القدمة ذات الورنية، ووحدته <span dir="ltr">m</span></li></ul></div>
      ${convBox(['L(cm) = L(mm) / 10','L(m) = L(mm) / 1000','V(cm³) = V(mm³) / 1000','V(m³) = V(cm³) / 1000000'])}</div>
  </div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 أسطوانة جديدة</button></div>

  <div class="ctl"><h3>5.1 قياس الطول L بأداة القدمة ذات الورنية</h3>
    <div class="stage"><svg id="vTop" viewBox="0 0 400 120"></svg><svg id="vZm" viewBox="0 0 400 150"></svg><div class="hud"><span id="vSt"></span></div></div>
    <div class="row"><label for="vR">فتحة الفكين</label><output id="vO"></output><input id="vR" type="range" min="0" max="100" step="0.1" value="100"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك الفك المتحرك حتى يلامس الأسطوانة.</p>
    <div class="ans"><label>قراءتك للطول L</label><input id="vIn" inputmode="decimal" dir="ltr" placeholder="mm"><button type="button" class="go" id="vCk">تحقق</button><button type="button" class="rs" id="vHn">تلميح</button></div><div class="fb2" id="vFb"></div>
  </div>

  <div class="ctl"><h3>5.2 قياس القطر D بأداة الميكرومتر</h3>
    <div class="stage"><svg id="mTop" viewBox="0 0 400 160"></svg><svg id="mZm" viewBox="0 0 400 152"></svg><div class="hud"><span id="mSt"></span></div></div>
    <div class="row"><label for="mR">دوران أسطوانة أداة الميكرومتر</label><output id="mO"></output><input id="mR" type="range" min="0" max="25" step="0.01" value="25"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتدوير الأسطوانة الدوارة حتى يلامس العمود الجسم.</p>
    <div class="ans"><label>قراءتك للقطر D</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="mm"><button type="button" class="go" id="mCk">تحقق</button><button type="button" class="rs" id="mHn">تلميح</button></div><div class="fb2" id="mFb"></div>
  </div>

    <div class="ctl"><h3>5.3 الحسابات</h3>
    <h4 class="sbh">أ) تحويل الطول L من mm إلى cm</h4>
    ${hxCalcStep('L','L(cm) = L(mm) / 10','احسب الطول L بوحدة cm','cm')}
    <h4 class="sbh">ب) تحويل القطر D من mm إلى cm</h4>
    ${hxCalcStep('D','D(cm) = D(mm) / 10','احسب القطر D بوحدة cm','cm')}
    <h4 class="sbh">ج) حساب حجم الأسطوانة</h4>
    ${hxCalcStep('V','V = π·D²·L / 4','احسب الحجم V بوحدة cm³','cm³')}
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
  function newObj(){L=r1(25+Math.random()*60);D=r2(4+Math.random()*16);okL=okD=false;okV=false;vHint=mHint=false;$('vR').value=100;$('mR').value=25;okCL=okCD=false;['vIn','mIn','cL','cD','cV'].forEach(k=>$(k).value='');['vFb','mFb','cLf','cDf','cVf'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});vDraw();mDraw();vol()}
  /* --- القدمة --- */
  function vVal(){let o=r1(+$('vR').value);if(o<L){o=L;$('vR').value=o}return o}
  function vDraw(){const o=vVal(),touch=Math.abs(o-L)<1e-6;$('vO').textContent=o.toFixed(1)+' mm';
    $('vSt').textContent=touch?'✓ فكا أداة القدمة يلامسان الأسطوانة، اقرأ القياس من التدريجين':'يوجد فراغ بين الفك والأسطوانة، اسحب الفك نحو الأسطوانة';
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
  let okV=false,okCL=false,okCD=false;
  function results(){const E=x=>'\u2066'+x+'\u2069';
    $('rL1').textContent=okL?E(L.toFixed(1)+' mm'):'—';$('rL2').textContent=okL?E((L/1000).toFixed(4)+' m'):'—';
    $('rD1').textContent=okD?E(D.toFixed(2)+' mm'):'—';$('rD2').textContent=okD?E((D/1000).toFixed(5)+' m'):'—';
    const V=Math.PI*D*D*L/4;$('rV1').textContent=okV?E((V/1000).toFixed(2)+' cm³'):'—';$('rV2').textContent=okV?E(sci(V*1e-9)+' m³'):'—';
    $('rNote').textContent=okL&&okD&&okV?'الاستنتاج: أداة الميكرومتر أدق، فدقتها '+E('0.01 mm')+' مقابل '+E('0.1 mm')+' لأداة القدمة ذات الورنية، لذلك تستخدم لقياس القطر الصغير. والحجم كمية مشتقة تحسب من كميتين أساسيتين مقيستين.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  const LC=()=>L/10,DC=()=>D/10,VC=()=>Math.PI*DC()*DC()*LC()/4;
  function vol(){results();
    $('sbL').textContent=okL?['L(cm) = L(mm) / 10',E(`L = ${L.toFixed(1)} / 10`)].join('\n'):'L(cm) = L(mm) / 10';
    $('sbD').textContent=okD?['D(cm) = D(mm) / 10',E(`D = ${D.toFixed(2)} / 10`)].join('\n'):'D(cm) = D(mm) / 10';
    $('sbV').textContent=okCL&&okCD?['V = π·D²·L / 4',E(`V = π × ${(+DC().toFixed(3))}² × ${(+LC().toFixed(2))} / 4`)].join('\n'):'V = π·D²·L / 4'}
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  $('vR').oninput=vDraw;$('mR').oninput=mDraw;
  box.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{$('vR').value=r1(+$('vR').value+ +b.dataset.d);vDraw()});
  box.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{$('mR').value=r2(+$('mR').value+ +b.dataset.m);mDraw()});
  $('vHn').onclick=()=>{vHint=true;vDraw();fb('vFb',true,'تلميح: اقرأ أولا آخر ملليمتر في التدريج الرئيسي قبل صفر الورنية، ثم ابحث عن خط الورنية المنطبق تماما على خط من التدريج الرئيسي (ظهر باللون الأحمر)، واضرب رقمه في 0.1 mm.')};
  $('mHn').onclick=()=>{mHint=true;mDraw();fb('mFb',true,'تلميح: اقرأ آخر خط ظاهر في التدريج الخطي (ملليمتر كامل أو نصف ملليمتر)، ثم أضف رقم قسم التدريج الدائري المنطبق على الخط الأفقي (ظهر باللون الأحمر) مضروبا في 0.01 mm.')};
  $('vCk').onclick=()=>{const o=vVal(),v=num($('vIn').value);if(Math.abs(o-L)>1e-6)return fb('vFb',false,'اسحب الفك حتى يلامس الأسطوانة أولا.');if(isNaN(v))return fb('vFb',false,'اكتب قراءتك بالملليمتر.');
    const mm=Math.floor(L+1e-9),n=Math.round((L-mm)*10);if(Math.abs(v-L)<0.05){okL=true;fb('vFb',true,'✓ قراءة صحيحة:\n'+E(`L = ${mm} mm + ${n} × 0.1 mm = ${L.toFixed(1)} mm = ${(L/1000).toFixed(4)} m`))}else fb('vFb',false,'✗ القراءة غير صحيحة، أعد قراءة التدريجين أو استخدم التلميح.');vol()};
  $('mCk').onclick=()=>{const r=mVal(),v=num($('mIn').value);if(Math.abs(r-D)>1e-6)return fb('mFb',false,'أدر الأسطوانة حتى يلامس العمود السلك أولا.');if(isNaN(v))return fb('mFb',false,'اكتب قراءتك بالملليمتر.');
    const lin=Math.floor(D*2+1e-9)/2,c=Math.round((D-lin)*100);if(Math.abs(v-D)<0.005){okD=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`D = ${lin.toFixed(1)} mm + ${c} × 0.01 mm = ${D.toFixed(2)} mm = ${(D/1000).toFixed(5)} m`))}else fb('mFb',false,'✗ القراءة غير صحيحة، أعد قراءة التدريجين أو استخدم التلميح.');vol()};
  $('cLk').onclick=()=>{if(!okL)return fb('cLf',false,'أكمل قياس الطول بأداة القدمة أولا.');const v=num($('cL').value);if(isNaN(v))return fb('cLf',false,'اكتب الناتج بوحدة cm.');
    if(Math.abs(v-LC())<0.006){okCL=true;fb('cLf',true,'✓ إجابة صحيحة:\n'+E(`L = ${L.toFixed(1)} / 10 = ${+LC().toFixed(2)} cm`))}else fb('cLf',false,'✗ لأن '+E('1 cm = 10 mm')+'، اقسم الطول بالملليمتر على 10:\n'+E(`L = ${L.toFixed(1)} / 10`));vol()};
  $('cDk').onclick=()=>{if(!okD)return fb('cDf',false,'أكمل قياس القطر بأداة الميكرومتر أولا.');const v=num($('cD').value);if(isNaN(v))return fb('cDf',false,'اكتب الناتج بوحدة cm.');
    if(Math.abs(v-DC())<0.0006){okCD=true;fb('cDf',true,'✓ إجابة صحيحة:\n'+E(`D = ${D.toFixed(2)} / 10 = ${+DC().toFixed(3)} cm`))}else fb('cDf',false,'✗ لأن '+E('1 cm = 10 mm')+'، اقسم القطر بالملليمتر على 10:\n'+E(`D = ${D.toFixed(2)} / 10`));vol()};
  $('cVk').onclick=()=>{if(!(okCL&&okCD))return fb('cVf',false,'أكمل تحويل الطول والقطر إلى cm أولا.');const v=num($('cV').value),V=VC();if(isNaN(v))return fb('cVf',false,'اكتب الحجم بوحدة cm³.');
    if(Math.abs(v-V)/V<0.02){okV=true;fb('cVf',true,'✓ إجابة صحيحة:\n'+E(`V = ${V.toFixed(2)} cm³ = ${sci(V*1e-6)} m³`)+'\nلأن '+E('1 cm³ = 10⁻⁶ m³')+'.')}else fb('cVf',false,'✗ احسب مربع القطر أولا، ثم اضرب في π وفي الطول، ثم اقسم على 4:\n'+E(`V = π × ${(+DC().toFixed(3))}² × ${(+LC().toFixed(2))} / 4`));vol()};
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

/* ===== الوحدة الأولى — التحويل بين الوحدات: سرعة عربة على مسار (أداة الشريط المتري وأداة ساعة الإيقاف) ===== */
function speedTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let tk='';for(let c=0;c<=24;c++){const x=118+c*10.5;tk+=`<line x1="${x}" y1="104" x2="${x}" y2="${c%5===0?118:111}" stroke="#1F2937" stroke-width="${c%5===0?1.3:.8}"/>`;if(c%5===0&&c>0)tk+=`<text x="${x}" y="130" font-size="12" font-weight="800" text-anchor="middle" fill="#1F2937">${c}</text>`}
  const tape=`<svg viewBox="16 0 372 230" aria-label="الشريط المتري">
    <rect x="118" y="102" width="256" height="30" fill="#FDE68A" stroke="#A16207"/>${tk}
    <path d="M374,96 H384 V140 H374 Z" fill="#F7931E" stroke="#9A3412"/><rect x="128" y="140" width="44" height="24" rx="6" fill="#F7931E"/><text x="150" y="157" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text>
    <rect x="34" y="70" width="88" height="96" rx="22" fill="#F7931E" stroke="#9A3412"/><circle cx="78" cy="118" r="22" fill="#FB923C" stroke="#9A3412"/><circle cx="78" cy="118" r="7" fill="#9A3412"/>
    <rect x="62" y="60" width="32" height="12" rx="4" fill="#334155"/>
    ${lbl(78,150,62,206,'العلبة')}${lbl(240,117,250,190,'الشريط المدرج')}${lbl(379,118,384,190,'الخطاف','end')}${lbl(78,62,92,22,'زر التثبيت')}${lbl(200,106,250,40,'التدريج بالسنتيمتر')}
  </svg>`;
  let dk='';for(let i=0;i<30;i++){const a=i/30*2*Math.PI-Math.PI/2,five=i%5===0,one=true,r1=five?50:56,x1=200+r1*Math.cos(a),y1=122+r1*Math.sin(a),x2=200+63*Math.cos(a),y2=122+63*Math.sin(a);dk+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1F2937" stroke-width="${five?1.6:one?1:.5}"/>`;if(five){dk+=`<text x="${200+40*Math.cos(a)}" y="${122+40*Math.sin(a)+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#1F2937">${i}</text>`}}
  const sw=`<svg viewBox="16 0 372 230" aria-label="ساعة الإيقاف">
    <rect x="190" y="30" width="20" height="16" rx="3" fill="#F7931E" stroke="#9A3412"/><rect x="186" y="44" width="28" height="8" rx="3" fill="#64748B"/>
    <rect x="258" y="56" width="14" height="22" rx="3" transform="rotate(40 265 67)" fill="#334155"/>
    <circle cx="200" cy="122" r="76" fill="#64748B" stroke="#334155" stroke-width="2"/><circle cx="200" cy="122" r="66" fill="#F8FAFC" stroke="#94A3B8"/>${dk}
    <line x1="200" y1="122" x2="${200+55*Math.cos(7/30*2*Math.PI-Math.PI/2)}" y2="${122+55*Math.sin(7/30*2*Math.PI-Math.PI/2)}" stroke="#F7931E" stroke-width="3" stroke-linecap="round"/><circle cx="200" cy="122" r="5" fill="#F7931E"/><rect x="187" y="129" width="26" height="18" rx="5" fill="#F7931E"/><text x="200" y="143" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">s</text>
    ${lbl(200,34,120,18,'زر التشغيل والإيقاف')}${lbl(268,64,330,40,'زر التصفير')}${lbl(150,160,110,206,'القرص المدرج بالثانية')}${lbl(227,119,320,150,'العقرب','start')}${lbl(270,150,330,206,'الإطار')}
  </svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${sp3D(120,{tape:120,cart:14,lab:true})}</div><div class="vcap">مسار العربة وأداة الشريط المتري على طاولة المعمل: منظر ثلاثي الأبعاد</div><p><b>ترتيب الأدوات:</b> مسار مستقيم عليه خط البداية وخط النهاية، والعربة عند خط البداية، وأداة الشريط المتري عند خط البداية لقياس المسافة بين الخطين، وساعة الإيقاف لقياس زمن الحركة.</p></div>
    <div class="tool"><div class="stage">${tape}</div><p><b>الشريط المتري:</b> تقيس المسافات والأطوال الكبيرة بالسنتيمتر بدقة <span dir="ltr">0.1 cm</span>.</p></div>
    <div class="tool"><div class="stage">${sw}</div><p><b>ساعة الإيقاف:</b> تقيس الزمن بالثانية بدقة <span dir="ltr">1 s</span>، ودورة العقرب الكاملة <span dir="ltr">30 s</span>.</p></div></div>`}
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
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law"><div class="ln"><b>القانون</b><span>v = d / t</span></div><div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">v</span> سرعة العربة، ووحدتها <span dir="ltr">m/s</span></li>
      <li><span class="chip" dir="ltr">d</span> المسافة، وتقاس بأداة الشريط المتري، ووحدتها <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">t</span> الزمن، ويقاس بأداة ساعة الإيقاف، ووحدته <span dir="ltr">s</span></li></ul></div>
      ${convBox(['d(m) = d(cm) / 100','d(km) = d(m) / 1000','v(m/s) = v(cm/s) / 100','v(km/h) = v(m/s) × 3.6'])}</div>
  </div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 مسار جديد</button></div>
  <div class="ctl"><h3>5.1 قياس المسافة d بأداة الشريط المتري</h3>
    <div class="stage"><div id="tTop"></div><svg id="tZm" viewBox="0 0 400 120"></svg><div class="hud"><span id="tSt"></span></div></div>
    <div class="row"><label for="tR">سحب الشريط</label><output id="tO"></output><input id="tR" type="range" min="0" max="200" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لسحب الشريط حتى يصل الخطاف إلى خط النهاية.</p>
    <div class="ans"><label>قراءتك للمسافة d</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <div class="ctl"><h3>5.2 قياس الزمن t بأداة ساعة الإيقاف</h3>
    <div class="stage"><div id="sTop"></div><svg id="sW" viewBox="0 0 400 262"></svg><div class="hud"><span id="sSt"></span></div></div>
    <div class="row"><label for="sR">حركة العربة</label><output id="sO"></output><input id="sR" type="range" min="0" max="30" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك العربة من خط البداية حتى خط النهاية، وتتوقف ساعة الإيقاف عند وصولها.</p>
    <div class="ans"><label>قراءتك للزمن t</label><input id="sIn" inputmode="decimal" dir="ltr" placeholder="s"><button type="button" class="go" id="sCk">تحقق</button><button type="button" class="rs" id="sHn">تلميح</button></div><div class="fb2" id="sFb"></div>
  </div>
    <div class="ctl"><h3>5.3 الحسابات</h3>
    <h4 class="sbh">أ) حساب السرعة</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS1" style="white-space:pre-line;line-height:2">v = d / t</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب السرعة v بوحدة cm/s</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="cm/s"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div></div>
    <h4 class="sbh">ب) تحويل السرعة من cm/s إلى m/s</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS2" style="white-space:pre-line;line-height:2">v(m/s) = v(cm/s) / 100</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب السرعة v بوحدة m/s</label><input id="c2" inputmode="decimal" dir="ltr" placeholder="m/s"><button type="button" class="go" id="c2k">تحقق</button></div><div class="fb2" id="c2f"></div></div>
    <h4 class="sbh">ج) تحويل السرعة من m/s إلى km/h</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS3" style="white-space:pre-line;line-height:2">v(km/h) = v(m/s) × 3.6</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب السرعة v بوحدة km/h</label><input id="c3" inputmode="decimal" dir="ltr" placeholder="km/h"><button type="button" class="go" id="c3k">تحقق</button></div><div class="fb2" id="c3f"></div></div>
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
  const num=labNum;
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
    $('tTop').innerHTML=sp3D(d,{tape:e,cart:0});
    const k=26,s0=Math.floor(e)-6,XX=c=>20+(c-s0)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#FDE68A"/>';
    for(let m=s0*10;m<=(s0+15)*10;m++){const c=m/10,x=XX(c);if(x<0||x>400)continue;const big=m%10===0,mid=m%5===0;const hl=tHint&&touch&&m===Math.round(d*10);g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?22:mid?15:9)}" stroke="${hl?'#DC2626':'#1F2937'}" stroke-width="${hl?2.4:big?1.4:.8}"/>`;if(big&&c>=0)g+=`<text x="${x}" y="58" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${c}</text>`}
    g+=`<line x1="${XX(e)}" y1="10" x2="${XX(e)}" y2="86" stroke="#F7931E" stroke-width="3"/><text x="${XX(e)}" y="100" font-size="10" text-anchor="middle" fill="var(--ink)">حافة الخطاف</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="109" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="110" font-size="12" font-weight="700" text-anchor="start" fill="var(--muted)">تكبير التدريج</text>`;
    $('tZm').innerHTML=g}
  function sVal(){let t=+$('sR').value;if(t>T){t=T;$('sR').value=t}return t}
  function sDraw(){const t=sVal(),done=Math.abs(t-T)<1e-6;$('sO').textContent=done?'وصلت العربة':'';
    $('sSt').textContent=done?'✓ وصلت العربة إلى خط النهاية وتوقفت ساعة الإيقاف، اقرأ الزمن':'اسحب العربة حتى تصل إلى خط النهاية';
    const cx=X0+d*PX*t/T;
    $('sTop').innerHTML=sp3D(d,{tape:d,cart:d*t/T});
    const C=130,R=118;let g=`<circle cx="200" cy="${C}" r="${R+8}" fill="#64748B" stroke="#334155" stroke-width="2"/><circle cx="200" cy="${C}" r="${R}" fill="#F8FAFC" stroke="#94A3B8"/><rect x="188" y="0" width="24" height="8" rx="3" fill="#F7931E"/>`;
    for(let i=0;i<30;i++){const a=i/30*2*Math.PI-Math.PI/2,five=i%5===0,one=true,r1=five?R-22:R-13;const hl=sHint&&done&&i===Math.round(T)%30;g+=`<line x1="${200+r1*Math.cos(a)}" y1="${C+r1*Math.sin(a)}" x2="${200+(R-1)*Math.cos(a)}" y2="${C+(R-1)*Math.sin(a)}" stroke="${hl?'#DC2626':'#1F2937'}" stroke-width="${hl?2.6:five?2.2:one?1.5:1}"/>`;if(five)g+=`<text x="${200+(R-38)*Math.cos(a)}" y="${C+(R-38)*Math.sin(a)+6}" font-size="17" font-weight="800" text-anchor="middle" fill="#1F2937">${i}</text>`}
    const a=t/30*2*Math.PI-Math.PI/2;g+=`<line x1="200" y1="${C}" x2="${200+(R-6)*Math.cos(a)}" y2="${C+(R-6)*Math.sin(a)}" stroke="#F7931E" stroke-width="3.5" stroke-linecap="round"/><circle cx="200" cy="${C}" r="7" fill="#F7931E"/><rect x="185" y="${C+22}" width="30" height="20" rx="5" fill="#F7931E"/><text x="200" y="${C+37}" font-size="14" font-weight="800" text-anchor="middle" fill="#fff">s</text>`;
    $('sW').innerHTML=g}
  const vc=()=>d/T,vm=()=>d/T/100,vk=()=>d/T/100*3.6;
  function sub(){$('vS1').textContent=okD&&okT?['v = d / t',E(`v = ${d.toFixed(1)} / ${T}`)].join('\n'):'v = d / t';
    $('vS2').textContent=ok1?['v(m/s) = v(cm/s) / 100',E(`v = ${vc().toFixed(1)} / 100`)].join('\n'):'v(m/s) = v(cm/s) / 100';
    $('vS3').textContent=ok2?['v(km/h) = v(m/s) × 3.6',E(`v = ${vm().toFixed(3)} × 3.6`)].join('\n'):'v(km/h) = v(m/s) × 3.6'}
  function results(){
    $('r1a').textContent=okD?E(d.toFixed(1)+' cm'):'—';$('r1b').textContent=okD?E((d/100).toFixed(3)+' m'):'—';
    $('r2a').textContent=okT?E(T+' s'):'—';$('r2b').textContent=okT?E(T+' s'):'—';
    $('r3a').textContent=ok1?E(vc().toFixed(1)+' cm/s'):'—';$('r3b').textContent=ok2?E(vm().toFixed(3)+' m/s'):'—';
    $('r4a').textContent=ok3?E(vk().toFixed(2)+' km/h'):'—';
    $('rNote').textContent=ok1&&ok2&&ok3?'الاستنتاج: تحويل الوحدات يغير العدد ولا يغير الكمية، فالسرعة نفسها تساوي:\n'+E(vc().toFixed(1)+' cm/s = '+vm().toFixed(3)+' m/s = '+vk().toFixed(2)+' km/h'):'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('tR').oninput=tDraw;$('sR').oninput=sDraw;
  $('tHn').onclick=()=>{tHint=true;tDraw();fb('tFb',true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل حافة الخطاف، ثم احسب عدد الأقسام الصغيرة حتى الخط الأحمر.')};
  $('sHn').onclick=()=>{sHint=true;sDraw();fb('sFb',true,'تلميح: الأرقام على القرص بالثانية وبين كل رقمين '+E('5 s')+'، وكل قسم صغير '+E('1 s')+'. اقرأ آخر رقم مر به العقرب، ثم احسب عدد الأقسام حتى العقرب (ظهر باللون الأحمر).')};
  $('tCk').onclick=()=>{if(Math.abs(tVal()-d)>1e-6)return fb('tFb',false,'اسحب الشريط حتى يصل الخطاف إلى خط النهاية أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب قراءتك بالسنتيمتر.');
    if(Math.abs(v-d)<0.05){okD=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`d = ${d.toFixed(1)} cm = ${(d/100).toFixed(3)} m`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('sCk').onclick=()=>{if(Math.abs(sVal()-T)>1e-6)return fb('sFb',false,'اسحب العربة حتى تصل إلى خط النهاية أولا.');const v=num($('sIn').value);if(isNaN(v))return fb('sFb',false,'اكتب قراءتك بالثانية.');
    if(Math.abs(v-T)<0.05){okT=true;fb('sFb',true,'✓ قراءة صحيحة:\n'+E(`t = ${T} s`))}else fb('sFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  const chk=(inp,f,val,unit,okMsg,badMsg,set,need,needMsg)=>{if(!(okD&&okT))return fb(f,false,'أكمل القياسين 5.1 و 5.2 أولا.');if(need&&!need())return fb(f,false,needMsg);const v=num($(inp).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة '+unit+'.');
    if(Math.abs(v-val)/val<0.02){set();fb(f,true,okMsg)}else fb(f,false,badMsg);sub();results()};
  $('c1k').onclick=()=>chk('c1','c1f',vc(),'cm/s','✓ إجابة صحيحة:\n'+E(`v = ${d.toFixed(1)} / ${T} = ${vc().toFixed(1)} cm/s`),'✗ اقسم المسافة بالسنتيمتر على الزمن بالثانية.',()=>ok1=true);
  $('c2k').onclick=()=>chk('c2','c2f',vm(),'m/s','✓ إجابة صحيحة:\n'+E(`${vc().toFixed(1)} cm/s / 100 = ${vm().toFixed(3)} m/s`),'✗ لأن '+E('1 m = 100 cm')+'، اقسم السرعة بوحدة cm/s على 100.',()=>ok2=true,()=>ok1,'احسب السرعة بوحدة cm/s أولا.');
  $('c3k').onclick=()=>chk('c3','c3f',vk(),'km/h','✓ إجابة صحيحة:\n'+E(`${vm().toFixed(3)} m/s × 3.6 = ${vk().toFixed(2)} km/h`),'✗ اضرب السرعة بوحدة m/s في 3600 ثم اقسم على 1000، أي اضربها في 3.6.',()=>ok3=true,()=>ok2,'احسب السرعة بوحدة m/s أولا.');
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
  g+=lbl(cx,cy-18,cx-95,40,'المسمار المركزي')+lbl(cx+10,cy-4,cx+110,40,'الحلقة')+lbl(P(235,1)[0],P(235,1)[1]+T,155,240,'القرص المدرج')+lbl(cx-3,290,cx+80,335,'الحامل','start')+(()=>{const q=strs.map(st=>P(st.a,1.06)).sort((u,v)=>u[0]-v[0])[0];return lbl(q[0]-6,q[1]-7,20,75,'البكرة','start')})()+lbl(P(40,1.06)[0]+17,P(40,1.06)[1]+145,452,205,'الكتل','end');
  return g}
function ftTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const t3=`<svg viewBox="0 10 460 395" aria-label="طاولة القوى ثلاثي الأبعاد">${ft3D([{a:30,c:'#2563EB',lab:'m₁'},{a:150,c:'#16A34A',lab:'m₂'},{a:270,c:'#F7931E',lab:'m₃'}])}</svg>`;
  const tbl=`<svg viewBox="-60 -50 520 510" aria-label="طاولة القوى">${ftDisk({strings:[{a:30,c:'#2563EB',lab:'m₁'},{a:150,c:'#16A34A',lab:'m₂'},{a:270,c:'#F7931E',lab:'m₃'}]})}
    ${lbl(200,200,90,-26,'المسمار المركزي')}${lbl(211,191,320,-26,'الحلقة')}${lbl(335,122,455,40,'البكرة','end')}${lbl(278,155,455,232,'الخيط','end')}${lbl(70,247,-55,330,'القرص المدرج بالدرجات','start')}${lbl(200,382,330,440,'حامل الكتل')}</svg>`;
  const bal=`<svg viewBox="20 30 360 215" aria-label="الميزان الرقمي">${ftBalance(1,'150.0 g',62)}${lbl(205,100,350,70,'حامل الكتل','end')}${lbl(150,145,60,110,'الكفة')}${lbl(170,173,60,222,'الشاشة')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${t3}</div><div class="vcap">منظر ثلاثي الأبعاد</div><div class="stage">${tbl}</div><div class="vcap">منظر علوي</div><p><b>طاولة القوى:</b> قرص أفقي مدرج من <span dir="ltr">0°</span> إلى <span dir="ltr">360°</span> بدقة <span dir="ltr">1°</span>، على بكراته كتل معلقة بخيوط مربوطة بحلقة حول مسمار مركزي، وتكون القوى متزنة عندما تستقر الحلقة في المركز.</p></div>
    <div class="tool"><div class="stage">${bal}</div><p><b>الميزان الرقمي:</b> يقيس كتلة حامل الكتل مع ما عليه بالجرام بدقة <span dir="ltr">0.1 g</span>.</p></div></div>`}
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
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
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
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قوى جديدة</button></div>
  <div class="ctl"><h3>5.1 قياس الكتلتين m₁ و m₂ بجهاز الميزان الرقمي</h3>
    <div class="btns hsel"><button type="button" data-h="1">الحامل m₁</button><button type="button" data-h="2">الحامل m₂</button></div>
    <div class="stage"><svg id="bS" viewBox="40 -10 320 220"></svg><div class="hud"><span id="bSt"></span></div></div>
    <div class="row"><label for="bR">إنزال الحامل على الكفة</label><output id="bO"></output><input id="bR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اختر الحامل، ثم اسحب المؤشر البرتقالي لإنزاله حتى يستقر على كفة الميزان.</p>
    <div class="ans"><label>قراءتك للكتلة m₁</label><input id="m1In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m1Ck">تحقق</button></div><div class="fb2" id="m1Fb"></div>
    <div class="ans"><label>قراءتك للكتلة m₂</label><input id="m2In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m2Ck">تحقق</button></div><div class="fb2" id="m2Fb"></div>
  </div>
  <div class="ctl"><h3>5.2 قياس الزاويتين θ₁ و θ₂ بجهاز طاولة القوى</h3>
    <div class="stage"><svg id="aS" viewBox="-30 -30 460 460"></svg><svg id="aZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="a1R">عدسة التكبير على خيط m₁</label><output id="a1O"></output><input id="a1R" type="range" min="0" max="359" step="1" value="0"></div>
    <div class="row"><label for="a2R">عدسة التكبير على خيط m₂</label><output id="a2O"></output><input id="a2R" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك عدسة التكبير على تدريج القرص حتى تتوقف عند الخيط.</p>
    <div class="ans"><label>قراءتك للزاوية θ₁</label><input id="t1In" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="t1Ck">تحقق</button><button type="button" class="rs" id="t1Hn">تلميح</button></div><div class="fb2" id="t1Fb"></div>
    <div class="ans"><label>قراءتك للزاوية θ₂</label><input id="t2In" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="t2Ck">تحقق</button><button type="button" class="rs" id="t2Hn">تلميح</button></div><div class="fb2" id="t2Fb"></div>
  </div>
  <div class="ctl"><h3>5.3 إيجاد قوة الاتزان</h3>
    <div class="stage"><svg id="eS" viewBox="-30 -30 460 460"></svg><div class="hud"><span id="eSt"></span></div></div>
    <div class="row"><label for="m3R">الكتلة الثالثة m₃</label><output id="m3O"></output><input id="m3R" type="range" min="0" max="600" step="5" value="0"></div>
    <div class="row"><label for="t3R">زاوية البكرة الثالثة θ₃</label><output id="t3O"></output><input id="t3R" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر الأول لزيادة الكتلة m₃.<br>ثم اسحب المؤشر الثاني لتدوير البكرة الثالثة إلى الجهة المقابلة للخيطين حتى تستقر الحلقة في المركز، واضغط «تحقق».</p>
    <div class="ans"><label>عند استقرار الحلقة في المركز اضغط تحقق</label><button type="button" class="go" id="eCk">تحقق</button><button type="button" class="rs" id="eHn">تلميح</button></div><div class="fb2" id="eFb"></div>
  </div>
    <div class="ctl"><h3>5.4 الحسابات</h3>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <h4 class="sbh">أ) حساب القوة F₁</h4>
    ${hxCalcStep('F1','F₁ = m₁·g','احسب القوة F₁ بوحدة N','N')}
    <h4 class="sbh">ب) حساب القوة F₂</h4>
    ${hxCalcStep('F2','F₂ = m₂·g','احسب القوة F₂ بوحدة N','N')}
    <h4 class="sbh">ج) حساب الزاوية بين القوتين θ</h4>
    ${hxCalcStep('TH','θ = θ₂ − θ₁','احسب الزاوية θ بالدرجات','°')}
    <h4 class="sbh">د) حساب مقدار المحصلة R</h4>
    ${hxCalcStep('4','R = √( F₁² + F₂² + 2·F₁·F₂·cos θ )','احسب مقدار المحصلة R بوحدة N','N')}
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
  const num=labNum;
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
    ['m1In','m2In','t1In','t2In','cF1','cF2','cTH','c4'].forEach(k=>$(k).value='');['m1Fb','m2Fb','t1Fb','t2Fb','eFb','cF1f','cF2f','cTHf','c4f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    bDraw();aDraw();eDraw();sub();results()}
  function bDraw(){box.querySelectorAll('.hsel button').forEach(b=>b.className=+b.dataset.h===hs?'go':'rs');
    const p=+$('bR').value,on=p>=100,m=hs===1?m1:m2;$('bO').textContent=on?'على الكفة':'';
    $('bSt').textContent=on?'✓ الحامل m'+(hs===1?'₁':'₂')+' على الكفة، اقرأ الكتلة من الشاشة':'أنزل الحامل حتى يستقر على الكفة';
    $('bS').innerHTML=ftBalance(1,on?m.toFixed(1)+' g':'0.0 g',-4+p*0.66)}
  function aVal(i){const R=$('a'+i+'R'),T=i===1?t1:t2;let a=+R.value;if(a>T){a=T;R.value=a}return a}
  function aDraw(){const a1=aVal(1),a2=aVal(2),a=zoomOf===1?a1:a2,T=zoomOf===1?t1:t2,touch=a===T,hl=(zoomOf===1?h1:h2)&&touch;
    $('a1O').textContent=a1+'°';$('a2O').textContent=a2+'°';
    $('aSt').textContent=touch?'✓ العدسة على خيط m'+(zoomOf===1?'₁':'₂')+'، اقرأ الزاوية من التدريج':'اسحب العدسة حتى تتوقف عند الخيط';
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
  function sub(){const f1=fx(F1(),3),f2=fx(F2(),3);
    $('sbF1').textContent=ok.m1?['F₁ = m₁·g',E(`m₁ = ${m1.toFixed(1)} g = ${m1/1000} kg`),E(`F₁ = ${m1/1000} × 9.8`)].join('\n'):'F₁ = m₁·g';
    $('sbF2').textContent=ok.m2?['F₂ = m₂·g',E(`m₂ = ${m2.toFixed(1)} g = ${m2/1000} kg`),E(`F₂ = ${m2/1000} × 9.8`)].join('\n'):'F₂ = m₂·g';
    $('sbTH').textContent=ok.t1&&ok.t2?['θ = θ₂ − θ₁',E(`θ = ${t2}° − ${t1}°`)].join('\n'):'θ = θ₂ − θ₁';
    $('sb4').textContent=ok.cF1&&ok.cF2&&ok.cTH?['R = √( F₁² + F₂² + 2·F₁·F₂·cos θ )',E(`R = √( ${f1}² + ${f2}² + 2 × ${f1} × ${f2} × cos ${TH()}° )`)].join('\n'):'R = √( F₁² + F₂² + 2·F₁·F₂·cos θ )'}

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
    $('rNote').textContent=ok.c4&&ok.e?'الاستنتاج: قوة الاتزان التجريبية تساوي المحصلة في المقدار وتعاكسها في الاتجاه:\n'+E(`m₃ g = ${fx(ok.e.m/1000*G,2)} N ≈ R = ${fx(RR(),2)} N`)+'\n'+E(`θ₃ = ${ok.e.t}° ≈ θR + 180° = ${fx(TE(),1)}°`):ok.c4?'أكمل البند 5.3 لمقارنة قوة الاتزان مع المحصلة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  box.querySelectorAll('.hsel button').forEach(b=>b.onclick=()=>{hs=+b.dataset.h;$('bR').value=0;bDraw()});
  $('bR').oninput=bDraw;$('a1R').oninput=()=>{zoomOf=1;aDraw()};$('a2R').oninput=()=>{zoomOf=2;aDraw()};$('m3R').oninput=eDraw;$('t3R').oninput=eDraw;
  const mChk=(i)=>{const m=i===1?m1:m2,f='m'+i+'Fb';const v=num($('m'+i+'In').value);if(isNaN(v))return fb(f,false,'ضع الحامل على الكفة واكتب قراءة الشاشة بالجرام.');
    if(Math.abs(v-m)<0.05){ok['m'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`m${i===1?'₁':'₂'} = ${m.toFixed(1)} g = ${m/1000} kg`))}else fb(f,false,'✗ القراءة غير صحيحة، اختر الحامل الصحيح وأنزله على الكفة ثم اقرأ الشاشة.');sub();results()};
  $('m1Ck').onclick=()=>mChk(1);$('m2Ck').onclick=()=>mChk(2);
  const tChk=(i)=>{const T=i===1?t1:t2,f='t'+i+'Fb';if(aVal(i)!==T)return fb(f,false,'اسحب عدسة التكبير حتى تتوقف عند خيط m'+(i===1?'₁':'₂')+' أولا.');const v=num($('t'+i+'In').value);if(isNaN(v))return fb(f,false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-T)<0.5){ok['t'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`θ${i===1?'₁':'₂'} = ${T}°`))}else fb(f,false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('t1Ck').onclick=()=>tChk(1);$('t2Ck').onclick=()=>tChk(2);
  const tHn=i=>{if(i===1)h1=true;else h2=true;zoomOf=i;aDraw();fb('t'+i+'Fb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  $('t1Hn').onclick=()=>tHn(1);$('t2Hn').onclick=()=>tHn(2);
  $('eCk').onclick=()=>{if(!eDraw())return fb('eFb',false,'✗ الحلقة لم تستقر في المركز بعد، اضبط الكتلة الثالثة وزاويتها.');const m3=+$('m3R').value,t3=+$('t3R').value;ok.e={m:m3,t:t3};
    fb('eFb',true,'✓ القوى الثلاث متزنة:\n'+E(`m₃ = ${m3} g ,  θ₃ = ${t3}°`));results()};
  $('eHn').onclick=()=>fb('eFb',true,'تلميح: قوة الاتزان تقع في الجهة المقابلة للقوتين تقريبا. ابدأ بزاوية بين '+E(Math.round(TE()-20)%360+'°')+' و '+E(Math.round(TE()+20)%360+'°')+'، ثم زد الكتلة تدريجيا حتى تقترب الحلقة من المركز.');
  const chk=(i,val,unit,tol,okMsg,badMsg)=>{const f='c'+i+'f';if(!(ok.m1&&ok.m2&&ok.t1&&ok.t2))return fb(f,false,'أكمل القياسين 5.1 و 5.2 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة '+unit+'.');
    const good=unit==='°'?adiff(v,val)<=tol:Math.abs(v-val)/Math.abs(val)<=tol;if(good){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,badMsg);sub();results()};
  $('cF1k').onclick=()=>chk('F1',F1(),'N',.01,'✓ إجابة صحيحة:\n'+E(`F₁ = ${m1/1000} × 9.8 = ${fx(F1(),3)} N`),'✗ اكتب الكتلة بوحدة kg، ثم اضربها في 9.8:\n'+E(`F₁ = ${m1/1000} × 9.8`));
  $('cF2k').onclick=()=>chk('F2',F2(),'N',.01,'✓ إجابة صحيحة:\n'+E(`F₂ = ${m2/1000} × 9.8 = ${fx(F2(),3)} N`),'✗ اكتب الكتلة بوحدة kg، ثم اضربها في 9.8:\n'+E(`F₂ = ${m2/1000} × 9.8`));
  $('cTHk').onclick=()=>chk('TH',TH(),'°',.5,'✓ إجابة صحيحة:\n'+E(`θ = ${t2}° − ${t1}° = ${TH()}°`),'✗ اطرح الزاوية الصغرى من الكبرى:\n'+E(`θ = ${t2}° − ${t1}°`));
  $('c4k').onclick=()=>{if(!(ok.cF1&&ok.cF2&&ok.cTH))return fb('c4f',false,'أكمل حساب F₁ و F₂ و θ أولا.');chk(4,RR(),'N',.02,'✓ إجابة صحيحة:\n'+E(`R = ${fx(RR(),2)} N`),'✗ ضع القيم في قانون جيب التمام، وانتبه أن الآلة الحاسبة على وضع الدرجات D.')};
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function vrTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const t3=`<svg viewBox="0 10 460 395" aria-label="طاولة القوى ثلاثي الأبعاد">${ft3D([{a:40,c:'#DC2626',lab:'m'},{a:180,c:'#2563EB',lab:'mₓ'},{a:270,c:'#16A34A',lab:'mᵧ'}])}</svg>`;
  const tbl=`<svg viewBox="-60 -50 520 510" aria-label="طاولة القوى">${ftDisk({strings:[{a:40,c:'#DC2626',lab:'m'},{a:180,c:'#2563EB',lab:'mₓ'},{a:270,c:'#16A34A',lab:'mᵧ'}]})}
    ${lbl(200,200,90,-26,'المسمار المركزي')}${lbl(211,191,320,-26,'الحلقة')}${lbl(318,101,455,40,'البكرة','end')}${lbl(270,141,455,232,'الخيط','end')}${lbl(70,247,-55,330,'القرص المدرج بالدرجات','start')}${lbl(200,382,330,440,'حامل الكتل')}</svg>`;
  const bal=`<svg viewBox="20 30 360 215" aria-label="الميزان الرقمي">${ftBalance(1,'150.0 g',62)}${lbl(205,100,350,70,'حامل الكتل','end')}${lbl(150,145,60,110,'الكفة')}${lbl(170,173,60,222,'الشاشة')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${t3}</div><div class="vcap">منظر ثلاثي الأبعاد</div><div class="stage">${tbl}</div><div class="vcap">منظر علوي</div><p><b>طاولة القوى:</b> قرص أفقي مدرج من <span dir="ltr">0°</span> إلى <span dir="ltr">360°</span> بدقة <span dir="ltr">1°</span>، على بكراته كتل معلقة بخيوط مربوطة بحلقة حول مسمار مركزي، وتكون القوى متزنة عندما تستقر الحلقة في المركز.</p></div>
    <div class="tool"><div class="stage">${bal}</div><p><b>الميزان الرقمي:</b> يقيس كتلة حامل الكتل مع ما عليه بالجرام بدقة <span dir="ltr">0.1 g</span>.</p></div></div>`}
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
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
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
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قوة جديدة</button></div>
  <div class="ctl"><h3>5.1 قياس الكتلة m بجهاز الميزان الرقمي</h3>
    <div class="stage"><svg id="bS" viewBox="40 -10 320 220"></svg><div class="hud"><span id="bSt"></span></div></div>
    <div class="row"><label for="bR">إنزال الحامل على الكفة</label><output id="bO"></output><input id="bR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال الحامل حتى يستقر على كفة الميزان.</p>
    <div class="ans"><label>قراءتك للكتلة m</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk">تحقق</button></div><div class="fb2" id="mFb"></div>
  </div>
  <div class="ctl"><h3>5.2 قياس زاوية القوة θ بجهاز طاولة القوى</h3>
    <div class="stage"><svg id="aS" viewBox="-30 -30 460 460"></svg><svg id="aZ" viewBox="0 0 400 120"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="aR">عدسة التكبير على خيط القوة</label><output id="aO"></output><input id="aR" type="range" min="0" max="359" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك عدسة التكبير على تدريج القرص حتى تتوقف عند الخيط.</p>
    <div class="ans"><label>قراءتك لزاوية القوة θ</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
  <div class="ctl"><h3>5.3 إيجاد المركبتين تجريبيا</h3>
    <div class="stage"><svg id="eS" viewBox="-30 -30 460 460"></svg><div class="hud"><span id="eSt"></span></div></div>
    <div class="row"><label for="xR">الكتلة mₓ على البكرة 180°</label><output id="xO"></output><input id="xR" type="range" min="0" max="500" step="5" value="0"></div>
    <div class="row"><label for="yR">الكتلة mᵧ على البكرة 270°</label><output id="yO"></output><input id="yR" type="range" min="0" max="500" step="5" value="0"></div>
    <p class="slh">👆 اسحب المؤشر الأول لزيادة الكتلة mₓ على المحور السيني.<br>ثم اسحب المؤشر الثاني لزيادة الكتلة mᵧ على المحور الصادي حتى تستقر الحلقة في المركز، واضغط «تحقق».</p>
    <p class="slh" style="border-style:solid;background:rgba(247,147,30,.10)"><b>ملاحظة:</b> الكتلتان mₓ و mᵧ تشدان الحلقة <b>عكس</b> مركبتي القوة حتى تتزن، فتكون قوتهما مساوية للمركبتين في المقدار ومعاكسة لهما في الاتجاه.</p>
    <div class="ans"><label>عند استقرار الحلقة في المركز اضغط تحقق</label><button type="button" class="go" id="eCk">تحقق</button><button type="button" class="rs" id="eHn">تلميح</button></div><div class="fb2" id="eFb"></div>
  </div>
    <div class="ctl"><h3>5.4 الحسابات</h3>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <h4 class="sbh">أ) حساب مقدار القوة F</h4>
    ${hxCalcStep('F','F = m·g','احسب مقدار القوة F بوحدة N','N')}
    <h4 class="sbh">ب) حساب المركبة السينية Fx</h4>
    ${hxCalcStep('1','Fx = F·cos θ','احسب المركبة السينية Fx بوحدة N','N')}
    <h4 class="sbh">ج) حساب المركبة الصادية Fy</h4>
    ${hxCalcStep('2','Fy = F·sin θ','احسب المركبة الصادية Fy بوحدة N','N')}
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
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fx=(x,n)=>String(+x.toFixed(n));
  let m,th,ok={},hT=false;
  const F=()=>m/1000*G,FX=()=>F()*Math.cos(th*D2R),FY=()=>F()*Math.sin(th*D2R),MX=()=>m*Math.cos(th*D2R),MY=()=>m*Math.sin(th*D2R);
  function newObj(){m=200+10*Math.floor(Math.random()*31);th=20+Math.floor(Math.random()*51);ok={};hT=false;
    ['bR','aR','xR','yR'].forEach(k=>$(k).value=0);['mIn','tIn','cF','c1','c2'].forEach(k=>$(k).value='');['mFb','tFb','eFb','cFf','c1f','c2f'].forEach(k=>{$(k).textContent='';$(k).className='fb2'});
    bDraw();aDraw();eDraw();sub();results()}
  function bDraw(){const p=+$('bR').value,on=p>=100;$('bO').textContent=on?'على الكفة':'';$('bSt').textContent=on?'✓ الحامل على الكفة، اقرأ الكتلة من الشاشة':'أنزل الحامل حتى يستقر على الكفة';
    $('bS').innerHTML=ftBalance(1,on?m.toFixed(1)+' g':'0.0 g',-4+p*0.66)}
  function aVal(){let a=+$('aR').value;if(a>th){a=th;$('aR').value=a}return a}
  function aDraw(){const a=aVal(),touch=a===th,hl=hT&&touch;$('aO').textContent=a+'°';
    $('aSt').textContent=touch?'✓ العدسة على خيط القوة، اقرأ الزاوية من التدريج':'اسحب العدسة حتى تتوقف عند الخيط';
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
  function sub(){const f=fx(F(),3);
    $('sbF').textContent=ok.m?['F = m·g',E(`m = ${m} g = ${m/1000} kg`),E(`F = ${m/1000} × 9.8`)].join('\n'):'F = m·g';
    $('sb1').textContent=ok.cF&&ok.t?['Fx = F·cos θ',E(`Fx = ${f} × cos ${th}°`)].join('\n'):'Fx = F·cos θ';
    $('sb2').textContent=ok.cF&&ok.t?['Fy = F·sin θ',E(`Fy = ${f} × sin ${th}°`)].join('\n'):'Fy = F·sin θ'}
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
    g+=ok.e?`<text x="390" y="345" font-size="12.5" font-weight="700" fill="var(--muted)" text-anchor="end">‏السهمان المتقطعان: قوتا الكتلتين على طاولة القوى (عكس المركبتين)‏</text>`:'';
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
  $('tCk').onclick=()=>{if(aVal()!==th)return fb('tFb',false,'اسحب عدسة التكبير حتى تتوقف عند الخيط أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;aDraw();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  $('eCk').onclick=()=>{if(!eDraw())return fb('eFb',false,'✗ الحلقة لم تستقر في المركز بعد، اضبط الكتلتين.');ok.e={x:+$('xR').value,y:+$('yR').value};fb('eFb',true,'✓ استقرت الحلقة:\n'+E(`mₓ = ${ok.e.x} g ,  mᵧ = ${ok.e.y} g`));results()};
  $('eHn').onclick=()=>fb('eFb',true,'تلميح: كلما زادت زاوية القوة احتاجت الكتلة mᵧ إلى قيمة أكبر والكتلة mₓ إلى قيمة أصغر. اضبط كل كتلة حتى يقترب مركز الحلقة من المسمار.');
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.m&&ok.t))return fb(f,false,'أكمل القياسين 5.1 و 5.2 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة N.');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);sub();results()};
  $('cFk').onclick=()=>chk('F',F(),'✓ إجابة صحيحة:\n'+E(`F = ${m/1000} × 9.8 = ${fx(F(),3)} N`),'✗ اكتب الكتلة بوحدة kg، ثم اضربها في 9.8:\n'+E(`F = ${m/1000} × 9.8`));
  $('c1k').onclick=()=>ok.cF?chk(1,FX(),'✓ إجابة صحيحة:\n'+E(`Fx = ${fx(FX(),2)} N`),'✗ اضرب مقدار القوة في جيب تمام الزاوية cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.'):fb('c1f',false,'احسب مقدار القوة F أولا.');
  $('c2k').onclick=()=>ok.cF?chk(2,FY(),'✓ إجابة صحيحة:\n'+E(`Fy = ${fx(FY(),2)} N`),'✗ اضرب مقدار القوة في جيب الزاوية sin θ.'):fb('c2f',false,'احسب مقدار القوة F أولا.');
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
  const sc=`<svg viewBox="0 0 400 165" aria-label="الميزان الزنبركي"><g transform="translate(40 78) scale(1.75)">${wkScale(3.4,1)}</g>${lbl(30,88,40,135,'الخطاف')}${lbl(140,64,110,20,'الأنبوب المدرج')}${lbl(183,72,230,20,'المؤشر')}${lbl(250,78,300,135,'النابض')}${lbl(366,70,370,20,'الحلقة','end')}</svg>`;
  const pr=`<svg viewBox="0 0 400 215" aria-label="المنقلة">${wkProt(200,160,140)}<line x1="40" y1="160" x2="360" y2="160" stroke="#B45309" stroke-width="2"/>${lbl(200,160,200,192,'مركز المنقلة')}${lbl(300,62,370,20,'التدريج بالدرجات','end')}${lbl(80,160,40,192,'خط القاعدة','start')}</svg>`;
  const tp=`<svg viewBox="0 0 400 130" aria-label="الشريط المتري"><g transform="translate(0 0)">${wkTape(70,70,56,5,1)}</g>${lbl(52,52,40,20,'العلبة','start')}${lbl(200,66,200,20,'الشريط المدرج بالسنتيمتر')}${lbl(352,62,372,108,'الطرف المعدني','end')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${sc}</div><p><b>الميزان الزنبركي:</b> تقيس قوة السحب بالنيوتن من استطالة النابض، وتدريجها من <span dir="ltr">0</span> إلى <span dir="ltr">10 N</span> بدقة <span dir="ltr">0.1 N</span>.</p></div>
    <div class="tool"><div class="stage">${pr}</div><p><b>المنقلة:</b> تقيس الزاوية بين خيط السحب واتجاه الحركة بدقة <span dir="ltr">1°</span>، ويوضع مركزها عند نقطة ربط الخيط.</p></div>
    <div class="tool"><div class="stage">${tp}</div><p><b>الشريط المتري:</b> تقيس إزاحة الصندوق بالسنتيمتر بدقة <span dir="ltr">1 cm</span>.</p></div></div>`}
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
    <div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS" style="white-space:pre-line;line-height:2;text-align:left!important">أكمل القياسات 5.1 و 5.2 و 5.3</span></div></div>
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
  const num=labNum;
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
  const table=`<rect x="0" y="${TY}" width="400" height="10" fill="#A16207"/><rect x="0" y="${TY+10}" width="400" height="40" fill="#E8D5A3"/><text x="392" y="${TY+30}" font-size="12" font-weight="800" fill="#78350F" text-anchor="end">‏سطح أملس (نهمل الاحتكاك)‏</text>`;
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
  function aDraw(){const a=aVal(),touch=a===th;$('aO').textContent=a+'°';$('aSt').textContent=touch?'✓ العدسة على خيط السحب، اقرأ الزاوية من التدريج':'اسحب العدسة حتى تتوقف عند الخيط';
    $('aS').innerHTML=scene(95,F,F*3,true,a);zoom('aZ',a,th,1,26,'°',hT&&touch,v=>String(v))}
  function dVal(){let v=+$('dR').value;if(v>d){v=d;$('dR').value=v}return v}
  function dDraw(){const v=dVal(),touch=v===d,k=1.6;$('dO').textContent=v+' cm';$('dSt').textContent=touch?'✓ الشريط يلامس مؤخرة الصندوق، اقرأ الإزاحة':'مد الشريط حتى يلامس مؤخرة الصندوق';
    const cx=40+d*k;let g=defs+table+`<line x1="40" y1="${TY-60}" x2="40" y2="${TY}" stroke="#DC2626" stroke-width="2" stroke-dasharray="4 3"/><text x="40" y="${TY-64}" font-size="11" font-weight="700" text-anchor="middle" fill="#DC2626">خط البداية</text>`;
    g+=`<rect x="40" y="${TY-40}" width="60" height="40" rx="2" fill="none" stroke="#94A3B8" stroke-dasharray="4 3"/>`+cart(cx)+`<line x1="${cx+60}" y1="${TY-21}" x2="${Math.min(cx+100,398)}" y2="${TY-21-40*Math.tan(th*D2R)}" stroke="#DC2626" stroke-width="2"/>`;
    g+=`<path d="M70 ${TY-50} L${cx+20} ${TY-50}" stroke="#16A34A" stroke-width="2.4"/><path d="M${cx+20} ${TY-50} l-8 -5 l0 10 Z" fill="#16A34A"/><text x="${(70+cx+20)/2}" y="${TY-56}" font-size="12" font-weight="800" text-anchor="middle" fill="#16A34A">x⃗</text>`;
    g+=`<line x1="${cx}" y1="${TY-40}" x2="${cx}" y2="${TY+28}" stroke="#1E3A8A" stroke-width="1.4" stroke-dasharray="4 3"/><g transform="translate(0 ${TY+20})">${wkTape(40,0,v,k,0)}</g>`;$('dS').innerHTML=g;
    zoom('dZ',v,d,1,26,'cm',hD&&touch,c=>String(c))}
  function sub(){$('vS').textContent=ok.f&&ok.t&&ok.d?[`x = ${d} / 100 = ${DM()} m`,`W = ${F} × ${DM()} × cos ${th}°`].map(E).join('\n'):'أكمل القياسات 5.1 و 5.2 و 5.3'}
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
  $('fHn').onclick=()=>{hF=true;fDraw();fb('fFb',true,'تلميح: الأرقام على التدريج كل '+E('0.5 N')+'، وكل قسم صغير '+E('0.1 N')+'. اقرأ آخر رقم قبل المؤشر، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  $('tCk').onclick=()=>{if(aVal()!==th)return fb('tFb',false,'اسحب عدسة التكبير حتى تتوقف عند الخيط أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;aDraw();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل الخيط، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  $('dCk').onclick=()=>{if(dVal()!==d)return fb('dFb',false,'مد الشريط حتى يلامس مؤخرة الصندوق أولا.');const v=num($('dIn').value);if(isNaN(v))return fb('dFb',false,'اكتب الإزاحة بالسنتيمتر.');
    if(Math.abs(v-d)<0.5){ok.d=true;fb('dFb',true,'✓ قراءة صحيحة:\n'+E(`x = ${d} cm = ${DM()} m`))}else fb('dFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('dHn').onclick=()=>{hD=true;dDraw();fb('dFb',true,'تلميح: الأرقام على التدريج كل '+E('5 cm')+'، وكل قسم صغير '+E('1 cm')+'. اقرأ آخر رقم قبل طرف الشريط، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.f&&ok.t&&ok.d))return fb(f,false,'أكمل القياسات 5.1 و 5.2 و 5.3 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة J.');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);results()};
  $('c1k').onclick=()=>chk(1,W(),'✓ إجابة صحيحة:\n'+E(`W = ${fx(W(),3)} J`),'✗ اكتب الإزاحة بوحدة المتر أولا، ثم اضرب F × x × cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
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
  const bd=`<svg viewBox="0 -30 410 462" aria-label="لوحة الإحداثيات">${dpBoard({A:[6,2],B:[3,5],unit:1})}${lbl(40,360,20,402,'نقطة الأصل','start')}${lbl(62,360,150,402,'متجها الوحدة')}${lbl(220,300,320,402,'خيط المتجه')}${lbl(300,100,392,-14,'المربع = \u202a1 cm\u202c','end')}</svg>`;
  const pr=`<svg viewBox="0 0 400 215" aria-label="المنقلة">${wkProt(200,160,140)}<line x1="40" y1="160" x2="360" y2="160" stroke="#B45309" stroke-width="2"/>${lbl(200,160,200,192,'مركز المنقلة')}${lbl(300,62,370,20,'التدريج بالدرجات','end')}${lbl(80,160,40,192,'خط القاعدة','start')}</svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${dp3D()}</div><div class="vcap">لوحة الإحداثيات والمنقلة على طاولة المعمل: منظر ثلاثي الأبعاد</div></div>
    <div class="tool"><div class="stage">${bd}</div><p><b>لوحة الإحداثيات:</b> لوحة مربعات كل مربع منها <span dir="ltr">1 cm</span>، عليها خيطان مشدودان من نقطة الأصل يمثلان المتجهين، ومتجها الوحدة <span dir="ltr">i</span> و <span dir="ltr">j</span> طول كل منهما مربع واحد.</p></div>
    <div class="tool"><div class="stage">${pr}</div><p><b>المنقلة:</b> تقيس الزاوية بين المتجهين بدقة <span dir="ltr">1°</span>، ويوضع مركزها عند نقطة الأصل.</p></div></div>`}
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
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
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
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 متجهان جديدان</button></div>
  <div class="ctl"><h3>5.1 قراءة مركبتي المتجه A${V}</h3>
    <div class="stage"><svg id="s1" viewBox="0 10 410 390"></svg></div>
    <div class="row"><label for="p1">إسقاط المتجه على المحورين</label><output id="o1"></output><input id="p1" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإسقاط رأس المتجه على المحورين، ثم احسب عدد المربعات.</p>
    <div class="ans"><label>قراءتك لمركبتي A${V} بوحدة cm</label><input id="ax" inputmode="decimal" dir="ltr" placeholder="Ax"><input id="ay" inputmode="decimal" dir="ltr" placeholder="Ay"><button type="button" class="go" id="aCk">تحقق</button></div><div class="fb2" id="aFb"></div>
  </div>
  <div class="ctl"><h3>5.2 قراءة مركبتي المتجه B${V}</h3>
    <div class="stage"><svg id="s2" viewBox="0 10 410 390"></svg></div>
    <div class="row"><label for="p2">إسقاط المتجه على المحورين</label><output id="o2"></output><input id="p2" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإسقاط رأس المتجه على المحورين، ثم احسب عدد المربعات.</p>
    <div class="ans"><label>قراءتك لمركبتي B${V} بوحدة cm</label><input id="bx" inputmode="decimal" dir="ltr" placeholder="Bx"><input id="by" inputmode="decimal" dir="ltr" placeholder="By"><button type="button" class="go" id="bCk">تحقق</button></div><div class="fb2" id="bFb"></div>
  </div>
  <div class="ctl"><h3>5.3 قياس الزاوية θ بين المتجهين بأداة المنقلة</h3>
    <div class="stage"><svg id="s3" viewBox="0 10 410 390"></svg><svg id="z3" viewBox="0 0 400 120"></svg><div class="hud"><span id="st3"></span></div></div>
    <div class="row"><label for="p3">عدسة التكبير على تدريج المنقلة</label><output id="o3"></output><input id="p3" type="range" min="0" max="90" step="1" value="0"></div>
    <p class="slh">👆 صفر المنقلة على المتجه A${V}. اسحب المؤشر البرتقالي لتحريك العدسة حتى تتوقف عند المتجه B${V}.</p>
    <div class="ans"><label>قراءتك للزاوية θ</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="°"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="tHn">تلميح</button></div><div class="fb2" id="tFb"></div>
  </div>
    <div class="ctl"><h3>5.4 الحسابات</h3>
    <h4 class="sbh">أ) الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS1" style="white-space:pre-line;line-height:2">—</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب الضرب القياسي بوحدة cm²</label><input id="c1" inputmode="decimal" dir="ltr" placeholder="cm²"><button type="button" class="go" id="c1k">تحقق</button></div><div class="fb2" id="c1f"></div></div>
    <h4 class="sbh">ب) الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="vS2" style="white-space:pre-line;line-height:2">—</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب الضرب القياسي بوحدة cm²</label><input id="c2" inputmode="decimal" dir="ltr" placeholder="cm²"><button type="button" class="go" id="c2k">تحقق</button></div><div class="fb2" id="c2f"></div></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القراءة</th></tr></thead>
    <tbody><tr><td>المتجه A${V}</td><td>أداة لوحة الإحداثيات</td><td id="r1">—</td></tr>
    <tr><td>المتجه B${V}</td><td>أداة لوحة الإحداثيات</td><td id="r2">—</td></tr>
    <tr><td>الزاوية θ</td><td>أداة المنقلة</td><td id="r3">—</td></tr>
    <tr><td>الضرب القياسي لمتجهين ممثلين بالإحداثيات الديكارتية</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">Ax Bx + Ay By</span></td><td id="r4">—</td></tr>
    <tr><td>الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية</td><td>بالحساب:<br><span dir="ltr" style="white-space:nowrap;font-size:12px">A B cos θ</span></td><td id="r5">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id),D2R=Math.PI/180;
  const num=labNum;
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
  function d3(){const a=tVal(),touch=a===th;$('o3').textContent=a+'°';$('st3').textContent=touch?'✓ العدسة على المتجه الأزرق، اقرأ الزاوية':'اسحب العدسة حتى تتوقف عند المتجه الأزرق';
    $('s3').innerHTML=dpBoard({A,B,prot:{a0:aA,mag:a}});
    const k=26,XX=d=>200+(d-a)*k;let g='<rect x="0" y="20" width="400" height="56" fill="#F8FAFC" stroke="#94A3B8"/>';
    for(let d=a-8;d<=a+8;d++){if(d<0)continue;const x=XX(d),big=d%10===0,mid=d%5===0,isH=hT&&touch&&d===th;g+=`<line x1="${x}" y1="20" x2="${x}" y2="${20+(big?24:mid?16:9)}" stroke="${isH?'#DC2626':'#1F2937'}" stroke-width="${isH?2.6:big?1.5:.9}"/>`;if(mid)g+=`<text x="${x}" y="62" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${d}</text>`}
    const xs=XX(th);if(xs>0&&xs<400)g+=`<line x1="${xs}" y1="0" x2="${xs}" y2="18" stroke="#2563EB" stroke-width="4"/><path d="M${xs-6} 12 L${xs+6} 12 L${xs} 20 Z" fill="#2563EB"/>`;
    g+=`<text x="6" y="110" font-size="12" font-weight="700" fill="var(--muted)">تكبير التدريج</text><rect x="352" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="110" font-size="16" font-weight="800" text-anchor="middle" fill="#fff">°</text>`;
    $('z3').innerHTML=g}
  function sub(){const L1=`A${V} · B${V} = Ax·Bx + Ay·By`,L2=`A${V} · B${V} = A·B·cos θ`;
    $('vS1').textContent=ok.a&&ok.b?[L1,...[`A${V} = ${A[0]} i + ${A[1]} j`,`B${V} = ${B[0]} i + ${B[1]} j`,`A${V} · B${V} = (${A[0]})(${B[0]}) + (${A[1]})(${B[1]})`].map(E)].join('\n'):L1;
    $('vS2').textContent=ok.a&&ok.b&&ok.t?[L2,...[`A = √(${A[0]}² + ${A[1]}²) = ${fx(MA(),2)} cm`,`B = √(${B[0]}² + ${B[1]}²) = ${fx(MB(),2)} cm`,`A${V} · B${V} = ${fx(MA(),2)} × ${fx(MB(),2)} × cos ${th}°`].map(E)].join('\n'):L2}
  function results(){
    $('r1').textContent=ok.a?E(`${A[0]} i + ${A[1]} j  cm`):'—';$('r2').textContent=ok.b?E(`${B[0]} i + ${B[1]} j  cm`):'—';$('r3').textContent=ok.t?E(th+'°'):'—';
    $('r4').textContent=ok.c1?E(DC()+' cm²'):'—';$('r5').textContent=ok.c2?E(fx(DT(),1)+' cm²'):'—';
    const done=ok.c1&&ok.c2;
    $('rNote').textContent=done?'الاستنتاج: الطريقتان تعطيان نفس الناتج تقريبا:\nبالإحداثيات الديكارتية: '+E(`A${V} · B${V} = ${DC()} cm²`)+'\nبالإحداثيات القطبية: '+E(`A${V} · B${V} = ${fx(DT(),1)} cm²`)+'\n\nتوضيح:\n1. ناتج الضرب القياسي لمتجهين كمية قياسية (عدد ووحدة فقط، وليس له اتجاه).\n2. في الإحداثيات الديكارتية نضرب المركبتين السينيتين معا، والمركبتين الصاديتين معا، ثم نجمع.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('p1').oninput=d1;$('p2').oninput=d2;$('p3').oninput=d3;
  const rd=(P,ix,iy,f,pid,nm)=>{if(+$(pid).value<100)return fb(f,false,'اسحب المؤشر حتى يكتمل الإسقاط أولا.');const x=num($(ix).value),y=num($(iy).value);if(isNaN(x)||isNaN(y))return fb(f,false,'اكتب المركبتين بالسنتيمتر.');
    if(x===P[0]&&y===P[1]){fb(f,true,'✓ قراءة صحيحة:\n'+E(`${nm}${V} = ${P[0]} i + ${P[1]} j`));return true}fb(f,false,'✗ احسب عدد المربعات من نقطة الأصل حتى النقطة الملونة على كل محور.');return false};
  $('aCk').onclick=()=>{if(rd(A,'ax','ay','aFb','p1','A'))ok.a=true;sub();results()};
  $('bCk').onclick=()=>{if(rd(B,'bx','by','bFb','p2','B'))ok.b=true;sub();results()};
  $('tCk').onclick=()=>{if(tVal()!==th)return fb('tFb',false,'اسحب العدسة حتى تتوقف عند المتجه الأزرق أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب الزاوية بالدرجات.');
    if(Math.abs(v-th)<0.5){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`θ = ${th}°`))}else fb('tFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('tHn').onclick=()=>{hT=true;d3();fb('tFb',true,'تلميح: الأرقام على التدريج كل '+E('5°')+'، وكل قسم صغير '+E('1°')+'. اقرأ آخر رقم قبل السهم الأزرق، ثم احسب عدد الأقسام حتى الخط الأحمر.')};
  const chk=(i,val,okMsg,bad)=>{const f='c'+i+'f';if(!(ok.a&&ok.b&&(i===1||ok.t)))return fb(f,false,i===1?'أكمل القياسين 5.1 و 5.2 أولا.':'أكمل القياسات 5.1 و 5.2 و 5.3 أولا.');const v=num($('c'+i).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بوحدة cm².');
    if(Math.abs(v-val)/val<=0.02){ok['c'+i]=true;fb(f,true,okMsg)}else fb(f,false,bad);results()};
  $('c1k').onclick=()=>chk(1,DC(),'✓ إجابة صحيحة:\n'+E(`A${V} · B${V} = ${A[0]*B[0]} + ${A[1]*B[1]} = ${DC()} cm²`),'✗ اضرب Ax في Bx، ثم Ay في By، واجمع الناتجين.');
  $('c2k').onclick=()=>chk(2,DT(),'✓ إجابة صحيحة:\n'+E(`A${V} · B${V} = ${fx(DT(),1)} cm²`),'✗ اضرب المقدارين A و B في cos θ، وانتبه أن الآلة الحاسبة على وضع الدرجات D.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}
/* ===== الوحدة الثانية — المسافة والإزاحة والسرعة والتسارع: تسارع عربة على المسار الهوائي (البوابتان الضوئيتان وجهاز المؤقت الرقمي وأداة المسطرة) ===== */
function atTrackPic(){/* المسار الهوائي بمنظر ثلاثي الأبعاد */
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const tl=x=>(370-x)*0.09,S=(x,d,z)=>[x+d*0.8,213-d*0.5-z-tl(x)],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st,w)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-width="${w||1}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const FL=228,leg=(x,d,bot)=>{const [a,b]=S(x,d,-16),[c]=S(x+12,d,-16),y2=bot||FL;return `<polygon points="${a},${b} ${c},${b} ${c},${y2} ${a},${y2}" fill="#64748B" stroke="#334155"/>`};
  let g=`<defs><linearGradient id="at3T" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8FAFC"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient><linearGradient id="at3F" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CBD5E1"/><stop offset="1" stop-color="#94A3B8"/></linearGradient></defs>`;
  g+=`<ellipse cx="225" cy="${FL+2}" rx="190" ry="8" fill="#0F172A" opacity=".07"/><line x1="24" y1="${FL}" x2="392" y2="${FL}" stroke="#94A3B8" stroke-width="2"/>`;
  /* قطعة الرفع تحت الطرف الأيسر للمسار */
  {const zf=-15-tl(90);g+=box(72,110,0,34,zf,-16,'#B45309','#F59E0B','#92400E','#78350F');}
  /* المسار */
  g+=box(64,362,0,34,-16,0,'url(#at3F)','url(#at3T)','#64748B');
  for(let x=78;x<356;x+=14)for(const d of [10,24]){const [a,b]=S(x+(d>20?7:0),d,0);g+=`<ellipse cx="${a}" cy="${b}" rx="1.7" ry="1.1" fill="#475569"/>`}
  for(let i=0;i<=20;i++){const x=76+i*14,[a,b]=S(x,0,-2),[c,e]=S(x,0,i%5===0?-11:-7);g+=`<line x1="${a}" y1="${b}" x2="${c}" y2="${e}" stroke="#1F2937" stroke-width="${i%5===0?1.2:.7}"/>`}
  g+=box(54,64,-2,36,-18,2,'#475569','#94A3B8','#334155');
  g+=box(362,370,2,32,0,22,'#DC2626','#F87171','#991B1B','#7F1D1D');
  /* العربة والوسادة */
  g+=poly([[168,3,0.5],[236,3,0.5],[236,3,2.5],[168,3,2.5]],'#7DD3FC','#0284C7',.6);
  g+=box(168,236,3,31,2.5,15,'#2563EB','#93C5FD','#1E3A8A','#1E3A8A');
  /* الخرطوم والمضخة */
  const [hx,hy]=S(54,16,-8);g+=`<path d="M${hx},${hy} C${hx-26},${hy+6} 38,${FL-50} 40,${FL-24}" fill="none" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/><rect x="22" y="${FL-26}" width="36" height="26" rx="4" fill="#475569" stroke="#1F2937"/><circle cx="34" cy="${FL-13}" r="4.5" fill="#94A3B8"/>`;
  g+=`<path d="M250,26 h40 M282,20 l8,6 l-8,6" stroke="#2563EB" stroke-width="2" fill="none"/><text x="296" y="30" font-size="12" font-weight="700" fill="#2563EB">اتجاه الحركة</text>`;
  g+=lbl(...S(200,17,15),150,40,'العربة')+lbl(...S(172,3,2),70,70,'الوسادة الهوائية')+lbl(...S(370,17,20),386,56,'المصد','end')+lbl(...S(308,24,0),346,236,'ثقوب الهواء')+lbl(...S(210,0,-9),250,236,'تدريج المسار')+lbl(...S(90,0,-30),150,236,'قطعة الرفع')+lbl(37,FL-36,18,112,'خرطوم ومضخة الهواء','start');
  return `<svg viewBox="12 0 380 254" aria-label="المسار الهوائي ثلاثي الأبعاد">${g}</svg>`}

function pgLbl(x,y,tx,ty,t,anc){return `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`}
function pg3D(){/* البوابة الضوئية بمنظر ثلاثي الأبعاد: قوس يحيط بالمسار، والشعاع عمودي على اتجاه الحركة */
  const S=(x,d,z)=>[x+d*0.85,206-d*0.5-z],pt=(x,d,z)=>S(x,d,z).join(','),poly=(a,f,st)=>`<polygon points="${a.map(p=>pt(...p)).join(' ')}" fill="${f}" stroke="${st||'#1F2937'}" stroke-width="1"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf);
  let g=`<ellipse cx="210" cy="232" rx="170" ry="10" fill="#0F172A" opacity=".07"/>`;
  /* الساق الخلفية */
  g+=box(150,172,84,96,-18,118,'#475569','#94A3B8','#334155');
  g+=`<circle cx="${S(161,84,9)[0]}" cy="${S(161,84,9)[1]}" r="6" fill="#EF4444" stroke="#7F1D1D"/>`;
  /* المسار */
  g+=poly([[24,0,0],[300,0,0],[300,70,0],[24,70,0]],'#E2E8F0','#64748B')+poly([[24,0,-12],[300,0,-12],[300,0,0],[24,0,0]],'#94A3B8','#64748B')+poly([[300,0,-12],[300,70,-12],[300,70,0],[300,0,0]],'#64748B','#475569');
  for(let x=36;x<296;x+=13)for(const d of [20,50]){const [a,b]=S(x+(d>30?6:0),d,0);g+=`<circle cx="${a}" cy="${b}" r="1.2" fill="#475569"/>`}
  /* الشعاع */
  const B1=S(161,84,9),B0=S(161,-6,9);
  /* العربة */
  g+=box(104,160,18,52,2,16,'#3B82F6','#93C5FD','#1E3A8A');
  g+=`<line x1="${B1[0]}" y1="${B1[1]}" x2="${B0[0]}" y2="${B0[1]}" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="6 4"/>`;
  /* الساق الأمامية والذراع العلوية */
  g+=box(150,172,-18,-6,-18,118,'#475569','#94A3B8','#334155');
  g+=`<rect x="${B0[0]-3}" y="${B0[1]-7}" width="6" height="14" rx="2" fill="#0EA5E9" stroke="#075985"/>`;
  g+=box(150,172,-18,96,118,134,'#64748B','#CBD5E1','#475569');
  const L=S(161,40,134);g+=`<circle cx="${L[0]}" cy="${L[1]}" r="5" fill="#22C55E" stroke="#14532D"/>`;
  const C=S(172,90,126);g+=`<path d="M${C[0]},${C[1]} C${C[0]+60},${C[1]-10} ${C[0]+60},${C[1]+50} 386,${C[1]+40}" fill="none" stroke="#1F2937" stroke-width="3"/>`;
  g+=`<path d="M40,${30} h40 M72,24 l8,6 l-8,6" stroke="#2563EB" stroke-width="2" fill="none"/><text x="86" y="34" font-size="12" font-weight="700" fill="#2563EB">اتجاه الحركة</text>`;
  const mid=S(161,66,9);
  g+=pgLbl(B1[0],B1[1],282,96,'مصدر الضوء','start')+pgLbl(B0[0],B0[1],176,234,'الكاشف الضوئي')+pgLbl(mid[0],mid[1],300,140,'الشعاع الضوئي','start')+pgLbl(...S(152,35,16),70,70,'العربة')+pgLbl(L[0],L[1],260,20,'مؤشر ضوئي','start')+pgLbl(...S(150,-12,90),66,124,'ذراعا البوابة')+pgLbl(...S(260,30,0),318,234,'المسار الهوائي');
  return `<svg viewBox="16 0 372 250" aria-label="البوابة الضوئية ثلاثي الأبعاد">${g}</svg>`}
function pgTop(){/* البوابة الضوئية بمنظر علوي */
  let g=`<rect x="20" y="92" width="370" height="46" fill="#E2E8F0" stroke="#64748B"/>`;
  for(let x=30;x<385;x+=12){g+=`<circle cx="${x}" cy="104" r="1.3" fill="#475569"/><circle cx="${x+6}" cy="126" r="1.3" fill="#475569"/>`}
  g+=`<rect x="190" y="44" width="30" height="34" rx="3" fill="#475569" stroke="#1F2937"/><rect x="190" y="152" width="30" height="34" rx="3" fill="#475569" stroke="#1F2937"/>`;
  g+=`<rect x="190" y="44" width="30" height="142" rx="4" fill="#94A3B8" opacity=".25" stroke="#475569" stroke-dasharray="5 4"/>`;
  g+=`<circle cx="205" cy="80" r="5" fill="#EF4444" stroke="#7F1D1D"/><rect x="199" y="146" width="12" height="6" rx="2" fill="#0EA5E9"/>`;
  g+=`<line x1="205" y1="85" x2="205" y2="146" stroke="#EF4444" stroke-width="2.2" stroke-dasharray="6 4"/>`;
  g+=`<rect x="128" y="100" width="70" height="30" rx="4" fill="#3B82F6" stroke="#1E3A8A"/>`;
  g+=`<path d="M250,172 h40 M282,166 l8,6 l-8,6" stroke="#2563EB" stroke-width="2" fill="none"/><text x="296" y="176" font-size="12" font-weight="700" fill="#2563EB">اتجاه الحركة</text>`;
  g+=pgLbl(205,80,160,30,'مصدر الضوء')+pgLbl(205,149,140,206,'الكاشف الضوئي')+pgLbl(205,112,300,30,'الشعاع الضوئي')+pgLbl(150,124,70,206,'العربة')+pgLbl(360,130,380,206,'المسار الهوائي','end');
  return `<svg viewBox="16 0 372 224" aria-label="البوابة الضوئية منظر علوي">${g}</svg>`}

function atSetup(nb){/* الأجهزة كاملة بمنظر ثلاثي الأبعاد من الأعلى؛ nb عدد قطع الرفع */
  nb=nb||1;let LF=false;const E=x=>nb*13*(350-x)/310;
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const S=(x,d,z)=>[x+d*0.62,152-d*0.6-(z+(LF?E(x):0))-(340-x)*0.03],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st,w)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-width="${w||1}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const gate=(x,part)=>part==='back'?box(x,x+14,52,60,-14,62,'#475569','#94A3B8','#334155'):box(x,x+14,-20,-12,-14,62,'#475569','#94A3B8','#334155')+box(x,x+14,-20,60,62,72,'#64748B','#CBD5E1','#475569');
  const beam=x=>{const a=S(x+7,52,7),b=S(x+7,-12,7);return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="5 3"/>`};
  let g=`<defs><linearGradient id="su3T" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8FAFC"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient></defs>`;
  /* الطاولة */
  g+=poly([[10,-110,-30],[380,-110,-30],[380,120,-30],[10,120,-30]],'#FEF9EF','#E7D7B9');
  /* قطع الرفع */
  {const top=-16+E(41),h=(top+30)/nb;for(let i=0;i<nb;i++)g+=box(30,56,0,40,-30+h*i,-30+h*(i+1),'#B45309','#F59E0B','#92400E','#78350F');}
  LF=true;
  /* البوابتان (الأرجل الخلفية) */
  g+=gate(130,'back')+gate(262,'back');
  /* المسار */
  g+=box(40,350,0,40,-14,0,'#94A3B8','url(#su3T)','#64748B');
  for(let x=52;x<346;x+=12)for(const d of [12,28]){const [a,b]=S(x+(d>20?6:0),d,0);g+=`<ellipse cx="${a}" cy="${b}" rx="1.5" ry="1" fill="#475569"/>`}
  g+=box(30,40,-2,42,-16,2,'#475569','#94A3B8','#334155')+box(350,356,4,36,0,18,'#DC2626','#F87171','#991B1B','#7F1D1D');
  /* العربة */
  g+=box(84,136,5,35,1,13,'#2563EB','#93C5FD','#1E3A8A','#1E3A8A');
  g+=beam(130)+beam(262)+gate(130,'front')+gate(262,'front');
  LF=false;
  /* المؤقت الرقمي والأسلاك */
  g+=box(170,260,-96,-60,-30,-6,'#334155','#475569','#1F2937','#0F172A');
  const sc=[S(180,-96,-10),S(250,-96,-10),S(250,-96,-26),S(180,-96,-26)];
  g+=`<polygon points="${sc.map(p=>p.join(',')).join(' ')}" fill="#BBF7D0" stroke="#14532D"/>`;
  const [tx,ty]=S(215,-96,-18);g+=`<text x="${tx}" y="${ty+4}" font-size="10" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr">tf = 0.0846 s</text>`;
  LF=true;const c1=S(137,-20,0),c2=S(269,-20,0);LF=false;const k1=S(185,-60,-6),k2=S(245,-60,-6);
  g+=`<path d="M${c1[0]},${c1[1]} C${c1[0]},${c1[1]+30} ${k1[0]-10},${k1[1]-10} ${k1[0]},${k1[1]}" fill="none" stroke="#1F2937" stroke-width="2.2"/><path d="M${c2[0]},${c2[1]} C${c2[0]},${c2[1]+30} ${k2[0]+10},${k2[1]-10} ${k2[0]},${k2[1]}" fill="none" stroke="#1F2937" stroke-width="2.2"/>`;
  /* المضخة والخرطوم */
  LF=true;const h0=S(30,20,-6);LF=false;g+=box(44,80,-84,-54,-30,-8,'#475569','#64748B','#334155','#1F2937');const h1=S(62,-54,-8);
  g+=`<path d="M${h0[0]},${h0[1]} C${h0[0]-20},${h0[1]+10} ${h1[0]+10},${h1[1]-20} ${h1[0]},${h1[1]}" fill="none" stroke="#1F2937" stroke-width="3.5" stroke-linecap="round"/>`;
  g+=`<path d="M136,14 h40 M168,8 l8,6 l-8,6" stroke="#2563EB" stroke-width="2" fill="none"/><text x="182" y="18" font-size="12" font-weight="700" fill="#2563EB">اتجاه الحركة</text>`;
  LF=true;[[137,'xi'],[269,'xf']].forEach(([x,t])=>{const [a,b]=S(x,-20,-14);g+=`<rect x="${a-28}" y="${b-4}" width="26" height="16" rx="5" fill="#F7931E"/><text x="${a-15}" y="${b+8}" font-size="12" font-weight="800" text-anchor="middle" fill="#fff">${t}</text>`});LF=false;
  LF=true;const T=[S(137,20,72),S(269,20,72),S(104,8,8),S(320,4,-8),S(353,20,18),S(136,22,13)];LF=false;
  g+=`<line x1="${T[5][0]}" y1="${T[5][1]}" x2="110" y2="74" stroke="#C2410C" stroke-width="1.3"/><circle cx="${T[5][0]}" cy="${T[5][1]}" r="3" fill="#C2410C"/><text x="72" y="70" font-size="12" font-weight="800" text-anchor="middle" direction="rtl" fill="#C2410C">العربة ساكنة Vi = 0</text><rect x="8" y="284" width="384" height="44" rx="8" fill="#FFF7ED" stroke="#F7931E"/><text x="200" y="301" font-size="12" font-weight="800" text-anchor="middle" direction="rtl" fill="#C2410C">العربة ساكنة (Vi = 0) ومقدمتها عند شعاع البوابة الأولى</text><text x="200" y="319" font-size="12" font-weight="800" text-anchor="middle" direction="rtl" fill="#C2410C">عند انطلاقها تبدأ البوابة الأولى العد من ti = 0</text>`;
  g+=lbl(...T[0],16,40,'البوابة الضوئية الأولى','start')+lbl(...T[1],392,30,'البوابة الضوئية الثانية','end')+lbl(...T[2],200,264,'العربة')+lbl(...S(43,0,-26),62,241,nb===1?'قطعة رفع واحدة':'قطعتا رفع','start')+lbl(...T[3],384,174,'المسار الهوائي','end')+lbl(...T[4],384,98,'المصد','end')+lbl(...S(250,-78,-6),330,264,'المؤقت الرقمي')+lbl(...S(62,-70,-8),16,264,'مضخة الهواء','start');
  return `<svg viewBox="0 0 400 332" aria-label="الأجهزة كاملة">${g}</svg>`}

function atTools(){
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const gate=`<svg viewBox="16 0 372 232" aria-label="المؤقت الرقمي">
    <rect x="120" y="30" width="170" height="150" rx="12" fill="#334155" stroke="#0F172A" stroke-width="2"/>
    <rect x="134" y="44" width="142" height="84" rx="6" fill="#BBF7D0" stroke="#14532D"/>
    <text x="205" y="68" font-size="14" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr">ti = 0.0000 s</text><text x="205" y="92" font-size="14" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr">tf = 1.2846 s</text><text x="205" y="116" font-size="14" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr">Vf = 0.712 m/s</text>
    <rect x="144" y="146" width="50" height="20" rx="5" fill="#F7931E"/><rect x="216" y="146" width="50" height="20" rx="5" fill="#94A3B8"/>
     <path d="M120,80 C90,80 80,110 50,110" fill="none" stroke="#1F2937" stroke-width="2.4"/><path d="M290,80 C320,80 330,110 360,110" fill="none" stroke="#1F2937" stroke-width="2.4"/>
    ${lbl(205,48,205,18,'شاشة الزمن والسرعة')}${lbl(169,166,160,206,'زر البدء')}${lbl(241,166,250,206,'زر التصفير')}${lbl(60,108,22,186,'سلك البوابة الأولى','start')}${lbl(350,108,388,186,'سلك البوابة الثانية','end')}
  </svg>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${atSetup(1)}</div><div class="vcap">الأجهزة كاملة في المحاولة الأولى بقطعة رفع واحدة: منظر ثلاثي الأبعاد من الأعلى</div><div class="stage">${atSetup(2)}</div><div class="vcap">الأجهزة كاملة في المحاولة الثانية بقطعتي رفع (ميل أكبر): منظر ثلاثي الأبعاد من الأعلى</div><p><b>ترتيب الأجهزة:</b> توضع العربة ساكنة <span dir="ltr">(Vi = 0)</span> قبل البوابة الأولى مباشرة ومقدمتها عند شعاعها، فعند انطلاقها تبدأ البوابة الأولى العد من <span dir="ltr">ti = 0</span>، وتتحرك العربة على المسار الهوائي المائل بقطعة الرفع حتى البوابة الثانية، والبوابتان متصلتان بالمؤقت الرقمي، ومضخة الهواء تدفع الهواء في المسار.</p></div>
    <div class="tool"><div class="stage">${atTrackPic()}</div><div class="vcap">منظر ثلاثي الأبعاد</div><p><b>المسار الهوائي:</b> مسار مثقوب يدفع منه الهواء، فتطفو العربة على طبقة رقيقة من الهواء وتنزلق بلا احتكاك تقريبا، ويرفع أحد طرفيه بقطعة الرفع فتتحرك العربة بتسارع ثابت، وكلما زادت قطع الرفع زاد الميل.</p></div>
    <div class="tool"><div class="stage">${pg3D()}</div><div class="vcap">منظر ثلاثي الأبعاد</div><div class="stage">${pgTop()}</div><div class="vcap">منظر علوي</div><p><b>البوابة الضوئية (Photogate):</b> جهاز على شكل قوس يحيط بالمسار، في إحدى ذراعيه مصدر ضوء وفي الأخرى كاشف ضوئي، والشعاع بينهما عمودي على اتجاه الحركة. عندما تقطع العربة الشعاع ترسل البوابة إشارة إلى المؤقت الرقمي، فالبوابة الأولى تبدأ العد والثانية توقفه. والبوابة الثانية مضبوطة أيضا على وضع قياس السرعة، فتقيس السرعة النهائية للعربة لحظة عبورها شعاعها.</p></div>
    <div class="tool"><div class="stage">${gate}</div><p><b>المؤقت الرقمي:</b> يستقبل إشارة البوابة الضوئية، فيبدأ العد (ti) عند انطلاق العربة من البوابة الأولى، ويتوقف (tf) عند وصولها إلى البوابة الثانية، ويعرض الزمن بدقة <span dir="ltr">0.0001 s</span>، ويعرض معه السرعة النهائية <span dir="ltr">Vf</span> بوحدة <span dir="ltr">m/s</span>.</p></div></div>`}
function atScene3D(xf,gx1,gx2,act,nb,ptr,tm){/* مشهد التنفيذ بمنظر ثلاثي الأبعاد من الأعلى؛ xf مقدمة العربة، nb عدد قطع الرفع */
  let LF=true;const E=x=>nb*16*(370-x)/358,S=(x,d,z)=>[x*0.97+d*0.62+8,150-d*0.6-z-(LF?E(x):0)],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const gate=(c,part)=>{const x=c-7;return part==='back'?box(x,x+14,52,60,-14,70,'#475569','#94A3B8','#334155'):box(x,x+14,-20,-12,-14,70,'#475569','#94A3B8','#334155')+box(x,x+14,-20,60,70,80,'#64748B','#CBD5E1','#475569')};
  const beam=c=>{const a=S(c,52,7),b=S(c,-12,7);return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="5 3"/>`};
  let g=`<defs><linearGradient id="sc3T" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F8FAFC"/><stop offset="1" stop-color="#E2E8F0"/></linearGradient></defs>`;
  LF=false;{const top=-14+E(26),h=(top+14)/nb;for(let i=0;i<nb;i++)g+=box(14,46,0,40,-14+h*i,-14+h*(i+1),'#B45309','#F59E0B','#92400E','#78350F');}LF=true;
  g+=gate(gx1,'back')+gate(gx2,'back');
  g+=box(8,368,0,40,-14,0,'#94A3B8','url(#sc3T)','#64748B');
  for(let x=20;x<364;x+=12)for(const d of [12,28]){const [a,b]=S(x+(d>20?6:0),d,0);g+=`<ellipse cx="${a}" cy="${b}" rx="1.5" ry="1" fill="#475569"/>`}
  g+=box(2,8,-2,42,-16,2,'#475569','#94A3B8','#334155')+box(368,374,4,36,0,18,'#DC2626','#F87171','#991B1B','#7F1D1D');
  g+=box(xf-46,xf,5,35,1,13,'#2563EB','#93C5FD','#1E3A8A','#1E3A8A');
  g+=beam(gx1)+beam(gx2)+gate(gx1,'front')+gate(gx2,'front');
  if(ptr){const Q=290,O=14;for(let c=0;c<=120;c+=10){const x=O+c/100*Q,[a1,b1]=S(x,0,-1),[a2,b2]=S(x,0,c%50===0?-9:-6);g+=`<line x1="${a1}" y1="${b1}" x2="${a2}" y2="${b2}" stroke="#1F2937" stroke-width="1"/>`;if(c%20===0){const [a3,b3]=S(x,0,-14);g+=`<text x="${a3}" y="${b3+10}" font-size="9" font-weight="700" text-anchor="middle" fill="var(--ink)">${c}</text>`}}
    const px=O+ptr.p/100*Q,[pa,pb]=S(px,-3,6),[qa,qb]=S(px,-3,-16);g+=`<line x1="${pa}" y1="${pb}" x2="${qa}" y2="${qb}" stroke="#F7931E" stroke-width="3"/><path d="M${qa-6},${qb+9} L${qa},${qb} L${qa+6},${qb+9} Z" fill="#F7931E"/>`;
    if(ptr.touch){const [ca,cb]=S(px,20,22);g+=`<circle cx="${ca}" cy="${cb}" r="7" fill="none" stroke="#16A34A" stroke-width="2.5"/>`}}
  act.forEach(c=>{const [a,b]=S(c,20,80);g+=`<circle cx="${a}" cy="${b-10}" r="6" fill="#F7931E"/>`});
  [[gx1,'البوابة الأولى','xi'],[gx2,'البوابة الثانية','xf']].forEach(([c,t,x])=>{const [a,b]=S(c,-16,-14);g+=(ptr?'':`<text x="${a}" y="${b+16}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">${t}</text>`)+`<rect x="${a-17}" y="${b+21}" width="34" height="17" rx="5" fill="#F7931E"/><text x="${a}" y="${b+34}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff">${x}</text>`});
  g+=`<text x="14" y="18" font-size="12" font-weight="700" fill="#2563EB">اتجاه الحركة →</text><text x="386" y="18" font-size="12" font-weight="700" text-anchor="end" fill="#B45309">${nb===1?'قطعة رفع واحدة':'قطعتا رفع'}</text>`;
  if(tm){const w1=S(gx1,-20,-14),w2=S(gx2,-20,-14);
    g+=`<path d="M${w1[0]},${w1[1]+40} C${w1[0]},${w1[1]+60} 120,236 132,240" fill="none" stroke="#1F2937" stroke-width="2.4"/><path d="M${w2[0]},${w2[1]+40} C${w2[0]},${w2[1]+60} 280,236 268,240" fill="none" stroke="#1F2937" stroke-width="2.4"/>`;
    g+=`<polygon points="100,246 300,246 314,234 114,234" fill="#475569" stroke="#0F172A"/><polygon points="300,246 314,234 314,344 300,356" fill="#1F2937" stroke="#0F172A"/><rect x="100" y="246" width="200" height="110" rx="6" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="112" y="254" width="176" height="92" rx="5" fill="#BBF7D0" stroke="#14532D"/>`;
    const row=(lab,v,y,h,u)=>`<text x="200" y="${y}" font-size="16" font-weight="800" text-anchor="middle" fill="${h?'#DC2626':'#14532D'}" direction="ltr" font-family="Consolas,monospace">${lab} = ${v} ${u||'s'}</text>`;
    g+=row('ti',tm.ti,278)+row('tf',tm.tf,304,tm.hl)+row('Vf',tm.vf||'-.---',330,tm.hl,'m/s')+`<text x="94" y="304" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">المؤقت الرقمي</text>`}
  return g}
function airLab(box){
  const K=n=>'';
  const part=(n,lab,desc)=>`<div class="ctl"><h3>5.${n} ${lab}</h3>
    <div class="stage">${atSetup(n)}</div><div class="vcap">${n===1?'وضع الأجهزة في المحاولة الأولى: قطعة رفع واحدة':'وضع الأجهزة في المحاولة الثانية: قطعتا رفع (ميل أكبر)'}</div>
    <h4 class="sbh">أ) قياس الزمن النهائي والسرعة النهائية، والزمن الابتدائي <span dir="ltr" style="white-space:nowrap">ti = 0</span></h4>
    <div class="stage"><svg id="gS${n}" viewBox="0 0 400 362"></svg><div class="hud"><span id="gSt${n}"></span></div></div>
    <div class="row"><label for="gR${n}">حركة العربة</label><output id="gO${n}"></output><input id="gR${n}" type="range" min="0" max="100" step="0.2" value="0"></div>
    <p class="slh">👆 ${desc}</p>
    <div class="ans"><label>قراءتك للزمن النهائي tf</label><input id="tIn${n}" inputmode="decimal" dir="ltr" placeholder="s"><button type="button" class="go" id="tCk${n}">تحقق</button><button type="button" class="rs" id="gHn${n}">تلميح</button></div><div class="fb2" id="tFb${n}"></div>
    <div class="ans"><label>قراءتك للسرعة النهائية Vf</label><input id="vIn${n}" inputmode="decimal" dir="ltr" placeholder="m/s"><button type="button" class="go" id="vCk${n}">تحقق</button></div><div class="fb2" id="vFb${n}"></div>
    <h4 class="sbh">ب) حساب التسارع</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> السرعة الابتدائية <b dir="ltr">Vi = 0 m/s</b> (العربة تبدأ من السكون عند البوابة الأولى)</p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sba${n}" style="white-space:pre-line;line-height:2">a = (Vf − Vi) / Δt</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب التسارع a = (Vf − Vi) / Δt بوحدة m/s²</label><input id="ca${n}" inputmode="decimal" dir="ltr" placeholder="m/s²"><button type="button" class="go" id="ca${n}k">تحقق</button></div><div class="fb2" id="ca${n}f"></div></div>
  </div>`;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">إيجاد تسارع عربة على المسار الهوائي المائل وأثر زيادة الميل على السرعة والتسارع</p></div>
  <div class="tags"><span class="tag">الزمن: <i>جهاز المؤقت الرقمي</i> · s</span><span class="tag">السرعة النهائية Vf: <i>البوابة الضوئية والمؤقت الرقمي</i> · m/s</span><span class="tag dv">التسارع a: <i>كمية مشتقة</i> · m/s²</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء جهاز المسار الهوائي وجهاز البوابة الضوئية وجهاز المؤقت الرقمي.</li>
    <li>قياس الزمن النهائي من جهاز المؤقت الرقمي بدقة <span dir="ltr">0.0001 s</span>، والزمن الابتدائي <span dir="ltr" style="white-space:nowrap">ti = 0</span>.</li>
    <li>قياس السرعة النهائية <span dir="ltr">Vf</span> بالبوابة الضوئية في المحاولتين.</li>
    <li>حساب التسارع <span dir="ltr">a</span> من تغير السرعة بالنسبة لتغير الزمن في المحاولتين.</li>
    <li>المقارنة بين تسارع العربة بقطعة رفع واحدة وبقطعتي رفع.</li></ol></div>
  ${atTools()}
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الزمن</b><span>Δt = tf − ti</span></div>
      <div class="ln lw"><b>التسارع</b><span>a = (Vf − Vi) / Δt</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">ti, tf</span> زمنا بدء العد وتوقفه، ويقرآن من جهاز المؤقت الرقمي، ووحدتهما <span dir="ltr">s</span>، و <span dir="ltr">ti = 0</span></li>
      <li><span class="chip" dir="ltr">Δt</span> الفرق بين الزمن الابتدائي <span dir="ltr">ti = 0</span> عند البوابة الأولى والزمن النهائي <span dir="ltr">tf</span> المقاس عند وصول العربة إلى البوابة الثانية، ووحدته <span dir="ltr">s</span></li>
      <li><span class="chip" dir="ltr">a</span> تسارع العربة، ووحدته <span dir="ltr">m/s²</span></li>
      <li><span class="chip" dir="ltr">Vi</span> السرعة الابتدائية، وهي معطاة، و <span dir="ltr">Vi = 0</span> لأن العربة تبدأ من السكون</li>
      <li><span class="chip" dir="ltr">Vf</span> السرعة النهائية للعربة عند البوابة الثانية، وتقرأ من المؤقت الرقمي، ووحدتها <span dir="ltr">m/s</span></li>
      </ul></div>
      </div>
  </div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 مسار جديد</button></div>
  ${part(1,'المحاولة الأولى: بقطعة رفع واحدة','اسحب المؤشر البرتقالي لتنطلق العربة من السكون عند البوابة الأولى، فيبدأ المؤقت الرقمي (ti)، ويتوقف (tf) عندما تصل العربة إلى البوابة الثانية.')}
  ${part(2,'المحاولة الثانية: بقطعتي رفع','بعد إضافة قطعة رفع ثانية وإعادة العربة إلى البوابة الأولى وتصفير المؤقت الرقمي، اسحب المؤشر البرتقالي لتنطلق العربة من السكون، فيبدأ المؤقت (ti)، ويتوقف (tf) عندما تصل إلى البوابة الثانية.')}
  <div class="ctl"><h3>5.3 المقارنة بين التسارعين في المحاولتين</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل حساب التسارع في المحاولتين</span></div></div>
    <p class="rn" id="cmpN"></p></div>
    <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>المحاولة الأولى<br>(قطعة رفع واحدة)</th><th>المحاولة الثانية<br>(قطعتا رفع)</th></tr></thead>
    <tbody><tr><td>الزمن Δt</td><td id="rt1">—</td><td id="rt2">—</td></tr>
    <tr><td>السرعة النهائية Vf</td><td id="rv1">—</td><td id="rv2">—</td></tr>
    <tr><td>التسارع a</td><td id="ra1">—</td><td id="ra2">—</td></tr></tbody></table></div>
    <div class="stage" id="chV" hidden><svg id="chVs" viewBox="0 0 400 290"></svg></div><div class="vcap" id="chVc" hidden>منحنى السرعة مع الزمن: ميل كل خط يساوي التسارع a</div>
    <div class="stage" id="chA" hidden><svg id="chAs" viewBox="0 0 400 290"></svg></div><div class="vcap" id="chAc" hidden>منحنى التسارع مع الزمن: الخط أفقي لأن التسارع ثابت لا يتغير مع الزمن في كل محاولة</div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  function fb0(id){$(id).textContent='';$(id).className='fb2'}
  const r1=x=>Math.round(x*10)/10,r4=x=>Math.round(x*1e4)/1e4,fx=(x,n)=>String(+x.toFixed(n));
  let XI,XF,a1,T1,T2,ok={},hG={};
  const DX=()=>(XF-XI)/100,TT=n=>n===1?T1:T2,VF=n=>+(2*DX()/TT(n)).toFixed(3),AC=n=>VF(n)/TT(n);
  const trOK=n=>ok['t'+n]&&ok['v'+n];
  function newObj(){XI=r1(20+Math.random()*10);XF=r1(XI+55+Math.random()*30);a1=(15+Math.floor(Math.random()*16))/100;
    T1=r4(Math.sqrt(2*DX()/a1));T2=r4(Math.sqrt(2*DX()/(2*a1)));ok={};hG={};
    [1,2].forEach(n=>{$('gR'+n).value=0;['tIn','vIn','ca'].forEach(i=>$(i+n).value='');['tFb'+n,'vFb'+n,'ca'+n+'f'].forEach(fb0)});
    [1,2].forEach(gDraw);sub();results()}
  const Q=290,O=14;
  function sOf(n){return +$('gR'+n).value/100*(DX()+0.06)}
  function done(n){return sOf(n)>=DX()-1e-9}
  function gDraw(n){const s=sOf(n),started=s>0,dn=done(n);
    $('gO'+n).textContent=dn?'توقف المؤقت':'';
    $('gSt'+n).textContent=dn?'✓ وصلت العربة إلى البوابة الثانية وتوقف المؤقت الرقمي، اقرأ الزمن النهائي tf والسرعة النهائية Vf':started?'المؤقت الرقمي يعد…':'العربة ساكنة عند البوابة الأولى (Vi = 0)، وعند انطلاقها تبدأ البوابة الأولى العد من ti = 0';
    const gx1=O+XI/100*Q,gx2=O+XF/100*Q;
    $('gS'+n).innerHTML=atScene3D(gx1+s*Q,gx1,gx2,[gx1,gx2],n,null,{ti:started?'0.0000':'-.----',tf:dn?TT(n).toFixed(4):'-.----',vf:dn?VF(n).toFixed(3):'-.---',hl:hG[n]&&dn})}
  function sub(){[1,2].forEach(n=>{$('sba'+n).textContent=trOK(n)?['a = (Vf − Vi) / Δt',E(`Δt = ${TT(n).toFixed(4)} − 0 = ${TT(n).toFixed(4)} s`),E(`a = (${fx(VF(n),3)} − 0) / ${TT(n).toFixed(4)}`)].join('\n'):'a = (Vf − Vi) / Δt'})}
  const nice=m=>{const e=Math.pow(10,Math.floor(Math.log10(m))),f=m/e;return (f<=1.5?1:f<=3?2:f<=7?5:10)*e};
  function curve(id,kind){const col=['#3B82F6','#F7931E'],T=[TT(1),TT(2)],V=[VF(1),VF(2)],Aa=[AC(1),AC(2)];
    const L=58,R=360,TOP=46,B=222,tm=Math.max(...T)*1.12,ym=(kind==='v'?Math.max(...V):Math.max(...Aa))*1.3,X=x=>L+x/tm*(R-L),Y=y=>B-y/ym*(B-TOP);
    const ts=nice(tm/4),ys=nice(ym/4);
    let g=`<text x="200" y="15" font-size="14" font-weight="800" text-anchor="middle" fill="var(--ink)">${kind==='v'?'منحنى السرعة مع الزمن':'منحنى التسارع مع الزمن'}</text>`;
    for(let y=ys;y<=ym+1e-9;y+=ys)g+=`<line x1="${L}" y1="${Y(y)}" x2="${R}" y2="${Y(y)}" stroke="var(--line)"/><text x="${L-6}" y="${Y(y)+4}" font-size="11" text-anchor="end" fill="var(--ink)" direction="ltr">${+y.toFixed(3)}</text>`;
    for(let x=ts;x<=tm+1e-9;x+=ts)g+=`<line x1="${X(x)}" y1="${B}" x2="${X(x)}" y2="${B+5}" stroke="var(--ink)"/><text x="${X(x)}" y="${B+18}" font-size="11" text-anchor="middle" fill="var(--ink)" direction="ltr">${+x.toFixed(2)}</text>`;
    g+=`<line x1="${L}" y1="${B}" x2="${R+10}" y2="${B}" stroke="var(--ink)" stroke-width="1.5"/><line x1="${L}" y1="${B}" x2="${L}" y2="${TOP-12}" stroke="var(--ink)" stroke-width="1.5"/><text x="${R+14}" y="${B+4}" font-size="12" font-weight="700" text-anchor="start" fill="var(--ink)" direction="ltr">t</text><text x="${R+14}" y="${B+18}" font-size="11" text-anchor="start" fill="var(--ink)" direction="ltr">(s)</text><text x="${L-5}" y="${TOP-10}" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)" direction="ltr">${kind==='v'?'V (m/s)':'a (m/s²)'}</text><text x="${L+6}" y="${TOP-10}" font-size="12" font-weight="700" text-anchor="start" fill="var(--muted)">${kind==='v'?'‏سرعة العربة‏':'‏تسارع العربة‏'}</text>`;
    [1,0].forEach(i=>{const x1=X(T[i]);if(kind==='v'){const y1=Y(V[i]);g+=`<polygon points="${X(0)},${B} ${x1},${B} ${x1},${y1}" fill="${col[i]}" opacity=".16"/><line x1="${X(0)}" y1="${B}" x2="${x1}" y2="${y1}" stroke="${col[i]}" stroke-width="3"/><line x1="${x1}" y1="${y1}" x2="${x1}" y2="${B}" stroke="${col[i]}" stroke-width="1.3" stroke-dasharray="4 3"/><circle cx="${x1}" cy="${y1}" r="5" fill="${col[i]}"/><text x="${x1-6}" y="${y1-9}" font-size="12" font-weight="800" text-anchor="end" fill="${col[i]}" direction="ltr">Vf = ${fx(V[i],3)}</text>`}
      else{const y1=Y(Aa[i]);g+=`<line x1="${X(0)}" y1="${y1}" x2="${x1}" y2="${y1}" stroke="${col[i]}" stroke-width="3"/><line x1="${x1}" y1="${y1}" x2="${x1}" y2="${B}" stroke="${col[i]}" stroke-width="1.3" stroke-dasharray="4 3"/><text x="${x1-4}" y="${y1-7}" font-size="12" font-weight="800" text-anchor="end" fill="${col[i]}" direction="ltr">a = ${fx(Aa[i],2)}</text><text x="${X(0)+8}" y="${y1-7}" font-size="12" font-weight="800" text-anchor="start" fill="${col[i]}">تسارع ثابت</text>`;[0.25,0.5,0.75].forEach(f=>{const xx=X(0)+(x1-X(0))*f;g+=`<circle cx="${xx}" cy="${y1}" r="3.5" fill="${col[i]}"/>`})}});
    g+=`<rect x="378" y="252" width="12" height="12" rx="2" fill="${col[0]}"/><text x="372" y="263" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">‏المحاولة الأولى (قطعة رفع واحدة)‏</text><rect x="378" y="272" width="12" height="12" rx="2" fill="${col[1]}"/><text x="372" y="283" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">‏المحاولة الثانية (قطعتا رفع)‏</text>`;
    $(id).innerHTML=g}
  function results(){
    $('rt1').textContent=ok.t1?E(T1.toFixed(4)+' s'):'—';$('rt2').textContent=ok.t2?E(T2.toFixed(4)+' s'):'—';
    $('rv1').textContent=ok.v1?E(fx(VF(1),3)+' m/s'):'—';$('rv2').textContent=ok.v2?E(fx(VF(2),3)+' m/s'):'—';
    $('ra1').textContent=ok.ca1?E(fx(AC(1),2)+' m/s²'):'—';$('ra2').textContent=ok.ca2?E(fx(AC(2),2)+' m/s²'):'—';
    const vOK=ok.t1&&ok.v1&&ok.t2&&ok.v2,both=ok.ca1&&ok.ca2;
    ['chV','chVc'].forEach(k=>$(k).hidden=!vOK);['chA','chAc'].forEach(k=>$(k).hidden=!both);
    if(vOK)curve('chVs','v');
    if(both)curve('chAs','a');
    $('cmpS').textContent=both?['المحاولة الأولى (قطعة رفع واحدة): '+E(`a = ${fx(AC(1),2)} m/s²`),'المحاولة الثانية (قطعتا رفع): '+E(`a = ${fx(AC(2),2)} m/s²`),'تسارع المحاولة الثانية أكبر'].join('\n'):'أكمل حساب التسارع في المحاولتين';
    $('cmpN').textContent=both?'تسارع العربة في المحاولة الثانية أكبر من تسارعها في المحاولة الأولى، لأن زيادة ميل المسار زادت التسارع، وبالتالي زادت سرعة العربة النهائية.':'';
    $('rNote').textContent=both?'الاستنتاج: بزيادة ميل المسار زادت السرعة النهائية من '+E(fx(VF(1),3)+' m/s')+' إلى '+E(fx(VF(2),3)+' m/s')+'، وزاد التسارع من '+E(fx(AC(1),2)+' m/s²')+' إلى '+E(fx(AC(2),2)+' m/s²')+'.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  [1,2].forEach(n=>{
    $('gR'+n).oninput=()=>gDraw(n);
    $('gHn'+n).onclick=()=>{hG[n]=true;gDraw(n);fb('tFb'+n,true,'تلميح: يبدأ العد عندما تنطلق العربة من البوابة الأولى، ويتوقف عندما تصل إلى البوابة الثانية. الزمن الابتدائي '+E('ti = 0')+'، فاكتب الزمن النهائي '+E('tf')+' والسرعة النهائية '+E('Vf')+' كما يظهران على الشاشة (باللون الأحمر).')};
    $('tCk'+n).onclick=()=>{if(!done(n))return fb('tFb'+n,false,'اسحب العربة حتى تصل إلى البوابة الثانية ويتوقف المؤقت الرقمي أولا.');const v=num($('tIn'+n).value);if(isNaN(v))return fb('tFb'+n,false,'اكتب قراءتك بالثانية.');
      if(Math.abs(v-TT(n))<0.00005){ok['t'+n]=true;fb('tFb'+n,true,'✓ قراءة صحيحة:\n'+E(`tf = ${TT(n).toFixed(4)} s`)+'\n'+E(`Δt = tf − ti = ${TT(n).toFixed(4)} − 0 = ${TT(n).toFixed(4)} s`))}else fb('tFb'+n,false,'✗ القراءة غير صحيحة، اكتب الزمن كما يظهر على الشاشة بأربعة أرقام عشرية.');sub();results()};
    $('vCk'+n).onclick=()=>{if(!done(n))return fb('vFb'+n,false,'اسحب العربة حتى تصل إلى البوابة الثانية أولا.');const v=num($('vIn'+n).value);if(isNaN(v))return fb('vFb'+n,false,'اكتب قراءتك بوحدة m/s.');
      if(Math.abs(v-VF(n))<0.0005){ok['v'+n]=true;fb('vFb'+n,true,'✓ قراءة صحيحة:\n'+E(`Vf = ${VF(n).toFixed(3)} m/s`))}else fb('vFb'+n,false,'✗ اكتب السرعة النهائية كما تظهر على الشاشة بثلاثة أرقام عشرية.');sub();results()};
    $('ca'+n+'k').onclick=()=>{if(!trOK(n))return fb('ca'+n+'f',false,'أكمل قراءة الزمن النهائي والسرعة النهائية في هذه المحاولة أولا.');const v=num($('ca'+n).value);if(isNaN(v))return fb('ca'+n+'f',false,'اكتب الناتج بوحدة m/s².');
      if(Math.abs(v-AC(n))/AC(n)<0.03){ok['ca'+n]=true;fb('ca'+n+'f',true,'✓ إجابة صحيحة:\n'+E(`a = (Vf − Vi) / Δt = (${fx(VF(n),3)} − 0) / ${TT(n).toFixed(4)} = ${fx(AC(n),2)} m/s²`))}else fb('ca'+n+'f',false,'✗ اطرح السرعة الابتدائية من السرعة النهائية، ثم اقسم الناتج على الزمن Δt.');sub();results()}});
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}
/* ===== الوحدة الثانية — معادلات الحركة بتسارع ثابت: حساب ارتفاع سقوط كرة من زمن سقوطها ===== */
function ffScene(h,s,o){/* منظر ثلاثي الأبعاد: h الارتفاع بالمتر، s ما سقطته الكرة بالمتر، o خيارات */
  o=o||{};const K=150,z0=8+h*K,ZT=z0+24,BASE=ZT+46,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0_,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0_],[x1,d1,z0_],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0_],[x1,d0,z0_],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g=`<defs><radialGradient id="ffB" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></radialGradient></defs>`;
  g+=poly([[10,-40,0],[330,-40,0],[330,70,0],[10,70,0]],'#FEF9EF','#E7D7B9');
  /* الحامل */
  g+=box(30,110,0,40,0,8,'#475569','#94A3B8','#334155')+box(64,74,16,26,8,ZT+16,'#64748B','#CBD5E1','#475569');
  g+=box(64,196,16,26,ZT,ZT+10,'#64748B','#CBD5E1','#475569');
  /* جهاز السقوط الحر */
  g+=box(180,212,10,32,ZT-12,ZT,'#334155','#64748B','#1F2937')+box(212,222,18,24,ZT-8,ZT-2,'#F7931E','#FDBA74','#C2410C');
  /* وسادة الاستقبال */
  g+=box(172,228,2,38,0,8,'#1F2937','#475569','#0F172A')+poly([[176,6,8],[224,6,8],[224,34,8],[176,34,8]],'#F7931E','#C2410C');
  /* الشريط المتري الرأسي: الخطاف (الصفر) على سطح وسادة الاستقبال، والعلبة في الأعلى فوق مستوى الإفلات */
  {const a=S(218,20,8),b=S(218,20,z0+6),c=S(228,20,z0+6),d=S(228,20,8);g+=`<polygon points="${a} ${b} ${c} ${d}" fill="#FACC15" stroke="#A16207"/>`;
   for(let i=0;i<=Math.floor(h*20+1e-9);i++){const zz=8+i*K/20,[p,q]=S(228,20,zz),big=i%2===0,[p2]=S(big?222:225,20,zz);g+=`<line x1="${p}" y1="${q}" x2="${p2}" y2="${q}" stroke="#1F2937" stroke-width="${big?1.1:.6}"/>`;
     if(big)g+=`<text x="${p+3}" y="${q+3}" font-size="7.5" font-weight="700" text-anchor="start" fill="#1F2937">${i*5}</text>`}
   g+=`<rect x="${a[0]-2}" y="${a[1]-2}" width="${d[0]-a[0]+4}" height="4" fill="#F7931E" stroke="#9A3412" stroke-width=".8"/>`}
  g+=box(214,238,14,28,z0+6,z0+28,'#EA580C','#FB923C','#C2410C','#9A3412');{const [cx,cy]=S(226,14,z0+17);g+=`<circle cx="${cx}" cy="${cy}" r="7" fill="#FDBA74" stroke="#9A3412" stroke-width="1.3"/><circle cx="${cx}" cy="${cy}" r="2.4" fill="#9A3412"/>`}g+=box(221,231,17,24,z0+28,z0+31,'#1F2937','#475569','#0F172A','#000');
  /* مسار السقوط */
  {const a=S(196,20,z0-2),b=S(196,20,10);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3 4"/>`}
  /* الكرة */
  {const [bx,by]=S(196,20,z0+9-s*K);g+=`<circle cx="${bx}" cy="${by}" r="9" fill="url(#ffB)" stroke="#1E3A8A"/>`}
  /* المؤقت الرقمي والأسلاك */
  {const [tx,ty]=S(262,-36,0);g+=box(266,362,24,52,0,52,'#334155','#475569','#1F2937','#0F172A');const s1=S(271,24,8),s2=S(357,24,46);
   g+=`<rect x="${s1[0]}" y="${s2[1]}" width="${s2[0]-s1[0]}" height="${s1[1]-s2[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/>`;
   if(o.tm){g+=`<text x="${(s1[0]+s2[0])/2}" y="${s2[1]+14}" font-size="10.5" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">ti = ${o.tm.ti} s</text><text x="${(s1[0]+s2[0])/2}" y="${s2[1]+29}" font-size="10.5" font-weight="800" text-anchor="middle" fill="${o.tm.hl?'#DC2626':'#14532D'}" direction="ltr" font-family="Consolas,monospace">tf = ${o.tm.tf} s</text>`}
   const w1=S(212,21,ZT-6),w2=S(228,20,4),k1=S(280,38,52),k2=S(266,38,6);
   g+=`<path d="M${w1[0]},${w1[1]} C${w1[0]+50},${w1[1]-6} ${k1[0]},${k1[1]-40} ${k1[0]},${k1[1]}" fill="none" stroke="#1F2937" stroke-width="2"/><path d="M${w2[0]},${w2[1]} C${w2[0]+8},${w2[1]+10} ${k2[0]-10},${k2[1]+6} ${k2[0]},${k2[1]}" fill="none" stroke="#1F2937" stroke-width="2"/>`}
  /* السهم والارتفاع h */
  {const a=S(160,20,z0),b=S(160,20,8);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#2563EB" stroke-width="1.6"/><path d="M${a[0]-5},${a[1]+8} L${a[0]},${a[1]} L${a[0]+5},${a[1]+8} M${b[0]-5},${b[1]-8} L${b[0]},${b[1]} L${b[0]+5},${b[1]-8}" stroke="#2563EB" stroke-width="1.6" fill="none"/><text x="${a[0]-6}" y="${(a[1]+b[1])/2+5}" font-size="15" font-weight="800" text-anchor="end" fill="#2563EB">h</text>`}
  if(o.ptr){const r1=S(204,20,z0),r2=S(218,20,z0);g+=`<line x1="${r1[0]}" y1="${r1[1]}" x2="${r2[0]}" y2="${r2[1]}" stroke="#DC2626" stroke-width="1.6" stroke-dasharray="5 3"/>`}
  if(o.ptr){const [p,q]=S(236,20,8+o.ptr.p*K);g+=`<path d="M${p+12},${q-6} L${p+2},${q} L${p+12},${q+6} Z" fill="#F7931E"/><line x1="${p+2}" y1="${q}" x2="${p+26}" y2="${q}" stroke="#F7931E" stroke-width="2.5"/>`;if(o.ptr.touch){const [c1,c2]=S(228,20,z0);g+=`<circle cx="${c1}" cy="${c2}" r="7" fill="none" stroke="#16A34A" stroke-width="2.5"/>`}}
  if(o.lab){const B=S(196,20,z0+9-s*K);g+=lbl(...S(70,20,ZT-60),20,ZT-20>0?60:60,'الحامل','start')+lbl(...S(196,21,ZT-6),150,22,'جهاز السقوط الحر')+lbl(B[0]-3,B[1]+4,128,B[1]+34,'الكرة','end')+lbl(...S(200,20,4),110,BASE+24,'وسادة الاستقبال')+lbl(...S(223,20,z0*0.75),292,S(0,0,z0*0.9)[1],'الشريط المتري','start')+lbl(...S(330,24,4),340,BASE+24,'المؤقت الرقمي')}
  if(o.note)g+=`<text x="12" y="18" font-size="12" font-weight="800" fill="#C2410C">${o.note}</text>`;
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?40:14)}" aria-label="جهاز السقوط الحر">${g}</svg>`}
function ffTools(){
  const tbl=`<div class="tw"><table class="rt ffMap"><thead><tr><th></th><th>الحركة بتسارع ثابت</th><th>السقوط الحر</th></tr></thead><tbody>
    <tr><td><b>المعادلة العامة</b></td><td dir="ltr">x = Vi·t + ½·a·t²</td><td dir="ltr">y = Vi·t + ½·g·t²</td></tr>
    <tr><td><b>من السكون (Vi = 0)</b></td><td dir="ltr">x = ½·a·t²</td><td dir="ltr">h = ½·g·t²</td></tr>
    <tr><td><b>الإزاحة</b></td><td>x (أفقية)</td><td>y = h (رأسية)</td></tr>
    <tr><td><b>السرعة الابتدائية</b></td><td dir="ltr">Vi</td><td dir="ltr">Vi = 0</td></tr>
    <tr><td><b>التسارع</b></td><td dir="ltr">a</td><td dir="ltr">g = 9.8 m/s²</td></tr>
    <tr><td><b>الزمن</b></td><td dir="ltr">t</td><td dir="ltr">t</td></tr></tbody></table></div>`;
  return `<div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${ffScene(1.0,0,{lab:true,tm:{ti:'0.0000',tf:'0.4518'}})}</div><div class="vcap">جهاز السقوط الحر (Free Fall Adapter): منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> يمسك جهاز السقوط الحر الكرة ساكنة <span dir="ltr">(Vi = 0)</span> فوق وسادة الاستقبال، والجهازان متصلان بالمؤقت الرقمي، والشريط المتري رأسي بجانب مسار السقوط.</p></div>
    <div class="tool"><p><b>جهاز السقوط الحر (Free Fall Adapter):</b> ماسك يمسك الكرة الفولاذية، وعند فتحه تسقط الكرة من السكون ويبدأ المؤقت الرقمي العد من <span dir="ltr">ti = 0</span>.</p>
    <p><b>وسادة الاستقبال:</b> تستقبل الكرة عند ارتطامها، فترسل إشارة توقف المؤقت الرقمي عند الزمن النهائي <span dir="ltr">tf</span>.</p>
    <p><b>المؤقت الرقمي:</b> يعرض الزمن الابتدائي والزمن النهائي بدقة <span dir="ltr">0.0001 s</span>.</p>
    <p><b>الشريط المتري:</b> شريط رأسي يبدأ صفره من سطح وسادة الاستقبال وعلبته في الأعلى، ويقاس به ارتفاع السقوط <span dir="ltr">h</span> بدقة <span dir="ltr">0.1 cm</span>.</p></div>
    <div class="tool"><p><b>ربط معادلة الحركة بالسقوط الحر:</b> السقوط الحر حركة بتسارع ثابت، فنستخدم نفس المعادلة الثانية بعد تغيير الرموز:</p>${tbl}</div></div>`}
function ffLab(box){
  const K=n=>'';
  const part=(n,lab)=>`<div class="ctl"><h3>5.${n} ${lab}</h3>
    <h4 class="sbh">أ) قياس الزمن النهائي، والزمن الابتدائي <span dir="ltr" style="white-space:nowrap">ti = 0</span></h4>
    <div class="stage"><div id="gS${n}"></div><svg id="tmS${n}" viewBox="0 0 400 126" aria-label="شاشة المؤقت الرقمي"></svg><div class="hud"><span id="gSt${n}"></span></div></div>
    <div class="row"><label for="gR${n}">إفلات الكرة</label><output id="gO${n}"></output><input id="gR${n}" type="range" min="0" max="100" step="0.5" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتسقط الكرة من السكون، فيبدأ المؤقت الرقمي (ti) عند الإفلات، ويتوقف (tf) عند ارتطامها بوسادة الاستقبال.</p>
    <div class="ans"><label>قراءتك للزمن النهائي tf</label><input id="tIn${n}" inputmode="decimal" dir="ltr" placeholder="s"><button type="button" class="go" id="tCk${n}">تحقق</button><button type="button" class="rs" id="gHn${n}">تلميح</button></div><div class="fb2" id="tFb${n}"></div>
    <h4 class="sbh">ب) حساب ارتفاع السقوط</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> السرعة الابتدائية <b dir="ltr">Vi = 0</b>، وتسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sb${n}" style="white-space:pre-line;line-height:2">h = ½·g·Δt²</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب ارتفاع السقوط h = ½·g·Δt² بوحدة m</label><input id="ch${n}" inputmode="decimal" dir="ltr" placeholder="m"><button type="button" class="go" id="ch${n}k">تحقق</button></div><div class="fb2" id="ch${n}f"></div></div>
    <h4 class="sbh">ج) التحقق بقياس الارتفاع بالشريط المتري</h4>
    <div class="stage"><div id="pS${n}"></div><svg id="pZ${n}" viewBox="0 0 400 110"></svg><div class="hud"><span id="pSt${n}"></span></div></div>
    <div class="row"><label for="pR${n}">مؤشر القياس</label><output id="pO${n}"></output><input id="pR${n}" type="range" min="0" max="160" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي على الشريط المتري من سطح وسادة الاستقبال (صفر الشريط) حتى يصل إلى مستوى الإفلات (أسفل الكرة قبل إفلاتها).</p>
    <div class="ans"><label>قراءتك للارتفاع h</label><input id="hIn${n}" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="hCk${n}">تحقق</button><button type="button" class="rs" id="hHn${n}">تلميح</button></div><div class="fb2" id="hFb${n}"></div>
  </div>`;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب ارتفاع سقوط كرة باستخدام معادلة الحركة الثانية <span dir="ltr" style="white-space:nowrap">x = Vi·t + ½·a·t²</span></p></div>
  <div class="tags"><span class="tag">الزمن: <i>جهاز المؤقت الرقمي</i> · s</span><span class="tag">الارتفاع h: <i>الشريط المتري</i> · cm</span><span class="tag dv">الارتفاع المحسوب: <i>كمية مشتقة</i> · m</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء جهاز السقوط الحر ووسادة الاستقبال وجهاز المؤقت الرقمي والشريط المتري.</li>
    <li>ربط معادلة الحركة بتسارع ثابت <span dir="ltr">x = Vi·t + ½·a·t²</span> بمعادلة السقوط الحر <span dir="ltr">h = ½·g·t²</span>.</li>
    <li>قياس زمن سقوط الكرة من جهاز المؤقت الرقمي بدقة <span dir="ltr">0.0001 s</span>.</li>
    <li>حساب ارتفاع السقوط من زمن السقوط.</li>
    <li>التحقق من الارتفاع المحسوب بقياسه بالشريط المتري.</li></ol></div>
  ${ffTools()}
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الزمن</b><span>Δt = tf − ti</span></div>
      <div class="ln lw"><b>معادلة الحركة بتسارع ثابت</b><span>x = Vi·t + ½·a·t²</span></div>
      <div class="ln lw"><b>ارتفاع السقوط الحر (من السكون)</b><span>h = ½·g·Δt²</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">ti, tf</span> الزمن الابتدائي عند الإفلات والزمن النهائي عند الارتطام، ويقرآن من جهاز المؤقت الرقمي، ووحدتهما <span dir="ltr">s</span>، و <span dir="ltr">ti = 0</span></li>
      <li><span class="chip" dir="ltr">Δt</span> زمن السقوط، ووحدته <span dir="ltr">s</span></li>
      <li><span class="chip" dir="ltr">h</span> ارتفاع السقوط (الإزاحة الرأسية y)، ووحدته <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">Vi</span> السرعة الابتدائية، و <span dir="ltr">Vi = 0</span> لأن الكرة تفلت من السكون</li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span>، ويحل محل <span dir="ltr">a</span></li>
      </ul></div>
      ${convBox(['h(m) = h(cm) / 100'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 ارتفاع جديد</button></div>
  ${part(1,'قياس زمن السقوط وحساب الارتفاع')}
  <div class="ctl"><h3>5.2 المقارنة بين الارتفاع المحسوب والمقاس</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
    <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>الأداة</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>زمن السقوط Δt</td><td>جهاز المؤقت الرقمي</td><td id="rt1">—</td></tr>
    <tr><td>الارتفاع المحسوب h</td><td>بالحساب</td><td id="rc1">—</td></tr>
    <tr><td>الارتفاع المقاس h</td><td>الشريط المتري</td><td id="rm1">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const r1=x=>Math.round(x*10)/10,r4=x=>Math.round(x*1e4)/1e4,fx=(x,n)=>String(+x.toFixed(n)),G=9.8;
  let H={},T={},ok={},hG={},hH={};
  const HC=n=>0.5*G*T[n]*T[n];
  function newObj(){H[1]=r1(60+Math.random()*90);T[1]=r4(Math.sqrt(2*H[1]/100/G));ok={};hG={};hH={};
    [1].forEach(n=>{$('gR'+n).value=0;$('pR'+n).value=0;['tIn'+n,'ch'+n,'hIn'+n].forEach(k=>$(k).value='');['tFb'+n,'ch'+n+'f','hFb'+n].forEach(fb0);gDraw(n);pDraw(n)});sub();results()}
  const sOf=n=>+$('gR'+n).value/100*H[n]/100,landed=n=>+$('gR'+n).value>=100;
  function gDraw(n){const s=sOf(n),st=s>0,dn=landed(n);
    $('gO'+n).textContent=dn?'توقف المؤقت':'';
    $('gSt'+n).textContent=dn?'✓ ارتطمت الكرة بوسادة الاستقبال وتوقف المؤقت الرقمي، اقرأ الزمن النهائي tf':st?'الكرة تسقط والمؤقت الرقمي يعد…':'الكرة ساكنة في جهاز السقوط الحر (Vi = 0)، وعند إفلاتها يبدأ العد من ti = 0';
    $('gS'+n).innerHTML=ffScene(H[n]/100,s,{tm:{ti:st?'0.0000':'-.----',tf:dn?T[n].toFixed(4):'-.----',hl:hG[n]&&dn},note:'h = ? m'});
    const row=(lab,v,y,h)=>`<text x="200" y="${y}" font-size="22" font-weight="800" text-anchor="middle" fill="${h?'#DC2626':'#14532D'}" direction="ltr" font-family="Consolas,monospace">${lab} = ${v} s</text>`;
    $('tmS'+n).innerHTML=`<rect x="40" y="4" width="320" height="104" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="56" y="16" width="288" height="80" rx="8" fill="#BBF7D0" stroke="#14532D"/>${row('ti',st?'0.0000':'-.----',50)}${row('tf',dn?T[n].toFixed(4):'-.----',84,hG[n]&&dn)}<text x="200" y="122" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏شاشة المؤقت الرقمي (مكبرة)‏</text>`}
  function pVal(n){let p=r1(+$('pR'+n).value);if(p>H[n]){p=H[n];$('pR'+n).value=p}return p}
  const pTouch=n=>Math.abs(pVal(n)-H[n])<1e-6;
  function pDraw(n){const v=H[n],p=pVal(n),touch=pTouch(n),hl=hH[n]&&touch,c0=Math.floor(v)-7,X=c=>(c-c0)*26;
    $('pO'+n).textContent=p.toFixed(1)+' cm';$('pSt'+n).textContent=touch?'✓ المؤشر عند مستوى الإفلات، اقرأ الارتفاع من الشريط':'اسحب المؤشر حتى يصل إلى مستوى الإفلات';
    $('pS'+n).innerHTML=ffScene(v/100,v/100,{ptr:{p:p/100,touch}});
    let z=`<rect x="0" y="34" width="400" height="58" fill="#FEF3C7" stroke="#A16207"/>`;
    for(let m=Math.ceil(c0*10);m<=Math.floor((c0+15.4)*10);m++){const x=X(m/10),big=m%10===0,mid=m%5===0,h=hl&&m===Math.round(v*10);z+=`<line x1="${x}" y1="34" x2="${x}" y2="${34+(big?22:mid?15:9)}" stroke="${h?'#2563EB':'#1F2937'}" stroke-width="${h?2.6:big?1.4:.8}"/>`;if(big)z+=`<text x="${x}" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${m/10}</text>`}
    const xb=X(v);z+=`<line x1="${xb}" y1="8" x2="${xb}" y2="98" stroke="#C2410C" stroke-width="2.2" stroke-dasharray="6 4"/><text x="${xb-6}" y="20" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">مستوى الإفلات</text>`;
    const xp=X(p);z+=`<line x1="${xp}" y1="30" x2="${xp}" y2="96" stroke="#F7931E" stroke-width="3.5"/><path d="M${xp-7},104 L${xp},94 L${xp+7},104 Z" fill="#F7931E"/><rect x="352" y="82" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="99" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="106" font-size="12" font-weight="700" fill="var(--muted)">تكبير الشريط المتري</text>`;
    $('pZ'+n).innerHTML=z}
  const subN=n=>[E(`Δt = ${T[n].toFixed(4)} − 0 = ${T[n].toFixed(4)} s`),E(`h = ½ × 9.8 × ${T[n].toFixed(4)}²`)];
  function sub(){[1].forEach(n=>$('sb'+n).textContent=ok['t'+n]?['h = ½·g·Δt²',...subN(n)].join('\n'):'h = ½·g·Δt²');
    if($('vS'))$('vS').textContent=ok.t1?['h = ½·g·Δt²',...subN(1)].join('\n'):'أكمل قياس الزمن في 5.1'}
  function results(){const n=1;$('rt1').textContent=ok.t1?E(T[1].toFixed(4)+' s'):'—';$('rc1').textContent=ok.c1?E(fx(HC(1),3)+' m'):'—';$('rm1').textContent=ok.m1?E(fx(H[1]/100,3)+' m'):'—';
    const all=ok.c1&&ok.m1;
    $('cmpS').textContent=all?['الارتفاع المحسوب: '+E(`h = ${fx(HC(1),3)} m`),'الارتفاع المقاس: '+E(`h = ${fx(H[1]/100,3)} m`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'الارتفاع المحسوب من زمن السقوط يساوي الارتفاع المقاس بالشريط المتري تقريبا.':'';
    $('rNote').textContent=all?'الاستنتاج: معادلة الحركة الثانية x = Vi·t + ½·a·t² تصف السقوط الحر بعد التعويض Vi = 0 و a = g، فأصبحت h = ½·g·t²، والارتفاع المحسوب منها يساوي الارتفاع المقاس.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  [1].forEach(n=>{
    $('gR'+n).oninput=()=>gDraw(n);$('pR'+n).oninput=()=>pDraw(n);
    $('gHn'+n).onclick=()=>{hG[n]=true;gDraw(n);fb('tFb'+n,true,'تلميح: يبدأ العد عند إفلات الكرة، ويتوقف عند ارتطامها بوسادة الاستقبال. الزمن الابتدائي '+E('ti = 0')+'، فاكتب الزمن النهائي '+E('tf')+' كما يظهر على الشاشة بأربعة أرقام عشرية (باللون الأحمر).')};
    $('tCk'+n).onclick=()=>{if(!landed(n))return fb('tFb'+n,false,'اسحب المؤشر حتى ترتطم الكرة بوسادة الاستقبال أولا.');const v=num($('tIn'+n).value);if(isNaN(v))return fb('tFb'+n,false,'اكتب قراءتك بالثانية.');
      if(Math.abs(v-T[n])<0.00005){ok['t'+n]=true;fb('tFb'+n,true,'✓ قراءة صحيحة:\n'+E(`tf = ${T[n].toFixed(4)} s`)+'\n'+E(`Δt = tf − ti = ${T[n].toFixed(4)} − 0 = ${T[n].toFixed(4)} s`))}else fb('tFb'+n,false,'✗ القراءة غير صحيحة، اكتب الزمن كما يظهر على الشاشة بأربعة أرقام عشرية.');sub();results()};
    $('ch'+n+'k').onclick=()=>{if(!ok['t'+n])return fb('ch'+n+'f',false,'اقرأ الزمن النهائي أولا.');const v=num($('ch'+n).value);if(isNaN(v))return fb('ch'+n+'f',false,'اكتب الناتج بوحدة m.');
      if(Math.abs(v-HC(n))/HC(n)<0.01){ok['c'+n]=true;fb('ch'+n+'f',true,'✓ إجابة صحيحة:\n'+E(`h = ½ × 9.8 × ${T[n].toFixed(4)}² = ${fx(HC(n),3)} m`))}else fb('ch'+n+'f',false,'✗ احسب مربع الزمن Δt، ثم اضربه في 9.8، ثم اقسم الناتج على 2.');results()};
    $('hHn'+n).onclick=()=>{hH[n]=true;pDraw(n);fb('hFb'+n,true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل المؤشر، ثم احسب عدد الأقسام الصغيرة حتى الخط الأزرق.')};
    $('hCk'+n).onclick=()=>{if(!pTouch(n))return fb('hFb'+n,false,'اسحب المؤشر حتى يصل إلى مستوى الإفلات أولا.');const v=num($('hIn'+n).value);if(isNaN(v))return fb('hFb'+n,false,'اكتب قراءتك بالسنتيمتر.');
      if(Math.abs(v-H[n])<0.05){ok['m'+n]=true;fb('hFb'+n,true,'✓ قراءة صحيحة:\n'+E(`h = ${H[n].toFixed(1)} cm = ${fx(H[n]/100,3)} m`)+(ok['c'+n]?'\nالارتفاع المحسوب '+E(`h = ${fx(HC(n),3)} m`)+' يساوي المقاس تقريبا.':''))}else fb('hFb'+n,false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');results()}});
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

/* ===== الوحدة الثانية — القوة وقوانين نيوتن للحركة: التحقق من قانون نيوتن الثاني باستخدام جهاز آتوود ===== */
function awScene(h,s,o){/* h ارتفاع m₁ عن الوسادة بالمتر، s ما نزلته m₁ */
  o=o||{};const K=150,ZP=7,Z1=ZP+h*K,TOP=Z1+142,BASE=TOP+40,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const XL=117,XR=205,PZ=TOP-50;/* موضعا الخيطين ومركز البكرة */
  let g=poly([[10,-40,0],[330,-40,0],[330,70,0],[10,70,0]],'#FEF9EF','#E7D7B9');
  g+=box(30,110,0,40,0,8,'#475569','#94A3B8','#334155')+box(64,74,16,26,8,TOP+14,'#64748B','#CBD5E1','#475569')+box(64,182,16,26,TOP+6,TOP+14,'#64748B','#CBD5E1','#475569');
  /* وسادة الاستقبال تحت m₁ */
  g+=box(XR-17,XR+17,6,34,0,ZP,'#1F2937','#475569','#0F172A')+poly([[XR-14,9,ZP],[XR+14,9,ZP],[XR+14,31,ZP],[XR-14,31,ZP]],'#F7931E','#C2410C');
  /* البوابة الضوئية فوق وسادة الاستقبال */
  const Zg=ZP+12,GW=36,GX=XR+9;/* البوابة الضوئية: رأس على شكل U (مصدر ضوء وكاشف في طرفي الذراعين) مثبت بماسك على قضيب حامل */
  g+=box(GX-12,GX+14,50,62,0,4,'#334155','#64748B','#1F2937','#0F172A')+box(GX-2,GX+3,54,58,4,Zg+26,'#94A3B8','#E2E8F0','#64748B','#475569');
  g+=box(GX-6,GX+7,50,60,Zg-6,Zg+6,'#1F2937','#475569','#0F172A','#000');
  g+=box(GX-GW-8,GX+GW+8,40,50,Zg-12,Zg+12,'#1F2937','#475569','#111827','#000')+box(GX-GW-8,GX-GW,-6,50,Zg-12,Zg+12,'#1F2937','#475569','#111827','#000');
  {const a=S(GX-GW,20,Zg),b=S(GX+GW,20,Zg),l=S(GX,45,Zg+12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#EF4444" stroke-width="2" stroke-dasharray="4 3"/><circle cx="${a[0]}" cy="${a[1]}" r="3.2" fill="#EF4444" stroke="#7F1D1D"/><ellipse cx="${l[0]}" cy="${l[1]}" rx="4" ry="2" fill="${o.blk?'#EF4444':'#22C55E'}" stroke="#14532D"/>`}
  /* الكتلتان والخيط */
  const z1=Z1-s*K,z2=8+s*K,hb=26;
  {const [px,py]=S((XL+XR)/2,20,PZ);const [l1]=S(XL,20,0),[r1]=S(XR,20,0);const yl=S(XL,20,z2+hb)[1],yr=S(XR,20,z1+hb)[1];
   g+=`<line x1="${l1}" y1="${py}" x2="${l1}" y2="${yl}" stroke="#7C2D12" stroke-width="2.4"/><line x1="${r1}" y1="${py}" x2="${r1}" y2="${yr}" stroke="#7C2D12" stroke-width="2.4"/>`;
   g+=box(XL-12,XL+12,8,32,z2,z2+hb,'#60A5FA','#BFDBFE','#3B82F6','#1E3A8A')+box(XR-14,XR+14,6,34,z1,z1+hb+6,'#2563EB','#93C5FD','#1E3A8A','#1E3A8A');
   const [ax,ay]=S(XL,20,z2+hb/2),[bx,by]=S(XR,20,z1+hb/2+3);g+=`<text x="${ax+6}" y="${ay+5}" font-size="12" font-weight="800" text-anchor="middle" fill="#1E3A8A" direction="ltr">m₂</text><text x="${bx+6}" y="${by+5}" font-size="12" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m₁</text>`;
   g+=`<circle cx="${px}" cy="${py}" r="${(r1-l1)/2}" fill="#CBD5E1" stroke="#334155" stroke-width="2"/><path d="M${l1},${py} A${(r1-l1)/2},${(r1-l1)/2} 0 0 1 ${r1},${py}" fill="none" stroke="#7C2D12" stroke-width="2.4"/><circle cx="${px}" cy="${py}" r="4" fill="#334155"/>`;{const [,ay]=S((XL+XR)/2,20,TOP+6);g+=`<path d="M${px-5},${ay} L${px-3},${py} M${px+5},${ay} L${px+3},${py}" stroke="#475569" stroke-width="3"/>`}}
  /* الجانب الأمامي للبوابة الضوئية (أمام الكتلة m₁) */
  g+=box(GX+GW,GX+GW+8,-6,50,Zg-12,Zg+12,'#1F2937','#475569','#111827','#000');
  {const d=S(GX+GW,20,Zg);g+=`<rect x="${d[0]-3}" y="${d[1]-3}" width="6" height="6" rx="1" fill="#38BDF8" stroke="#0C4A6E"/>`}
  /* المؤقت الرقمي */
  {g+=box(276,364,24,52,0,52,'#334155','#475569','#1F2937','#0F172A');const s1=S(280,24,8),s2=S(360,24,46);
   g+=`<rect x="${s1[0]}" y="${s2[1]}" width="${s2[0]-s1[0]}" height="${s1[1]-s2[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/>`;
   if(o.tm){const cx=(s1[0]+s2[0])/2,row=(l,v,y,h,u)=>`<text x="${cx}" y="${s2[1]+y}" font-size="8.6" font-weight="800" text-anchor="middle" fill="${h?'#DC2626':'#14532D'}" direction="ltr" font-family="Consolas,monospace">${l} = ${v} ${u||'s'}</text>`;g+=row('ti',o.tm.ti,11)+row('tf',o.tm.tf,23,o.tm.hl)+row('Vf',o.tm.vf||'-.---',35,o.tm.hl,'m/s')};
   const w=S(GX+GW+8,40,Zg),k=S(276,38,6);g+=`<path d="M${w[0]},${w[1]} C${w[0]+10},${w[1]+10} ${k[0]-10},${k[1]+6} ${k[0]},${k[1]}" fill="none" stroke="#1F2937" stroke-width="2"/>`}
  if(o.lab){g+=lbl(...S(175,20,PZ+20),250,18,'البكرة','start')+lbl(...S(XL,20,(z2+hb+PZ)/2),90,BASE-200,'الخيط','start')+lbl(...S(70,20,TOP-60),20,70,'الحامل','start')+lbl(...S(XL-8,20,z2+14),160,BASE-128,'الكتلة الأخف m₂','start')+lbl(...S(XR+14,20,z1+30),262,48,'الكتلة الأثقل m₁','start')+lbl(...S(XR+8,20,ZP),300,BASE-150,'وسادة الاستقبال','start')+lbl(...S(GX+GW+4,-6,Zg-8),230,BASE+24,'البوابة الضوئية')+lbl(...S(GX-GW+12,20,Zg),70,BASE+24,'الشعاع الضوئي')+lbl(...S(GX+5,56,Zg+22),396,BASE-112,'قضيب وماسك البوابة','end')+lbl(...S(340,24,4),352,BASE+24,'المؤقت الرقمي')}
  if(o.note)g+=`<text x="12" y="18" font-size="12" font-weight="800" fill="#C2410C">${o.note}</text>`;
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?40:14)}" aria-label="جهاز آتوود">${g}</svg>`}
function awBal(v,lab){return `<svg viewBox="0 0 400 150" aria-label="الميزان الرقمي"><rect x="90" y="70" width="220" height="62" rx="10" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="110" y="84" width="130" height="34" rx="5" fill="#BBF7D0" stroke="#14532D"/><text x="175" y="108" font-size="20" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${v}</text><text x="270" y="108" font-size="16" font-weight="800" fill="#fff">g</text><rect x="120" y="58" width="160" height="12" rx="3" fill="#94A3B8" stroke="#475569"/><rect x="170" y="22" width="60" height="36" rx="4" fill="${lab==='m₁'?'#2563EB':'#60A5FA'}" stroke="#1E3A8A"/><text x="200" y="45" font-size="15" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">${lab}</text><text x="12" y="146" font-size="12" font-weight="700" fill="var(--muted)">الميزان الرقمي</text></svg>`}
function awLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">التحقق من قانون نيوتن الثاني <span dir="ltr" style="white-space:nowrap">F = m·a</span> باستخدام جهاز آتوود</p></div>
  <div class="tags"><span class="tag">الكتلة: <i>الميزان الرقمي</i> · g</span><span class="tag">الزمن: <i>جهاز المؤقت الرقمي</i> · s</span><span class="tag">السرعة النهائية Vf: <i>البوابة الضوئية والمؤقت الرقمي</i> · m/s</span><span class="tag dv">التسارع a: <i>كمية مشتقة</i> · m/s²</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أجزاء جهاز آتوود والميزان الرقمي والبوابة الضوئية وجهاز المؤقت الرقمي.</li>
    <li>قياس الكتلتين، وزمن نزول الكتلة الأثقل وسرعتها النهائية.</li>
    <li>حساب التسارع المقاس من السرعة النهائية والزمن.</li>
    <li>حساب التسارع من قانون نيوتن الثاني <span dir="ltr" style="white-space:nowrap">a = F / m</span>.</li>
    <li>المقارنة بين التسارع المقاس والتسارع من القانون.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${awScene(1.0,0,{lab:true,tm:{ti:'0.0000',tf:'1.2245',vf:'1.633'}})}</div><div class="vcap">جهاز آتوود (Atwood Machine): منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> كتلتان على طرفي خيط يمر فوق البكرة، الأثقل <span dir="ltr">m₁</span> في الأعلى فوق وسادة الاستقبال، والأخف <span dir="ltr">m₂</span> على الطاولة، وتبدأ الكتلتان من السكون <span dir="ltr">(Vi = 0)</span>.</p></div>
    <div class="tool"><p><b>جهاز آتوود (Atwood Machine):</b> بكرة خفيفة مثبتة على حامل، يمر فوقها خيط في طرفيه كتلتان مختلفتان، فتنزل الأثقل وتصعد الأخف بتسارع ثابت.</p>
    <p><b>الميزان الرقمي:</b> يقيس كتلة كل جسم بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>وسادة الاستقبال والمؤقت الرقمي:</b> يبدأ المؤقت العد من <span dir="ltr">ti = 0</span> عند إفلات الكتلتين، ويتوقف عند الزمن النهائي <span dir="ltr">tf</span> لحظة ارتطام الكتلة الأثقل بالوسادة.</p>
    <p><b>قاعدة الوسادة:</b> ترفع وسادة الاستقبال إلى مستوى تحت شعاع البوابة الضوئية مباشرة، فتصل الكتلة الأثقل إلى الوسادة بعد عبورها الشعاع مباشرة.</p>
    <p><b>البوابة الضوئية (Photogate):</b> مثبتة فوق وسادة الاستقبال بمسافة أكبر قليلا من طول الكتلة، ومضبوطة على وضع قياس السرعة، فتعبر الكتلة الأثقل شعاعها كاملة، وتقيس سرعتها النهائية قبل ملامسة الوسادة مباشرة، وتعرضها على المؤقت الرقمي بوحدة <span dir="ltr">m/s</span>.</p></div>
    <div class="tool"><p><b>ربط قانون نيوتن الثاني بجهاز آتوود:</b></p><div class="tw"><table class="rt"><thead><tr><th></th><th>قانون نيوتن الثاني</th><th>جهاز آتوود</th></tr></thead><tbody>
    <tr><td><b>القوة المحصلة</b></td><td dir="ltr">F</td><td dir="ltr">F = (m₁ − m₂)·g</td></tr>
    <tr><td><b>الكتلة المتحركة</b></td><td dir="ltr">m</td><td dir="ltr">m₁ + m₂</td></tr>
    <tr><td><b>التسارع</b></td><td dir="ltr">a = F / m</td><td dir="ltr">a = (m₁ − m₂)·g / (m₁ + m₂)</td></tr></tbody></table></div></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الزمن</b><span>Δt = tf − ti</span></div>
      <div class="ln lw"><b>التسارع المقاس</b><span>a = (Vf − Vi) / Δt</span></div>
      <div class="ln lw"><b>وزن الكتلة الأثقل</b><span>W₁ = m₁·g</span></div>
      <div class="ln lw"><b>وزن الكتلة الأخف</b><span>W₂ = m₂·g</span></div>
      <div class="ln lw"><b>القوة المحصلة (الفرق بين الوزنين)</b><span>F = W₁ − W₂ = (m₁ − m₂)·g</span></div>
      <div class="ln lw"><b>الكتلة الكلية المتحركة (الخيط يربط الكتلتين فتتحركان معا بنفس التسارع)</b><span>m = m₁ + m₂</span></div>
      <div class="vfig"><svg viewBox="0 0 340 352" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="رسم قوى الوزن على كتلتي جهاز آتوود">
      <defs><marker id="awAr" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#DC2626"/></marker>
      <marker id="awAb" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563EB"/></marker>
      <linearGradient id="awBk" x1="0" x2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>
      <rect x="110" y="14" width="120" height="8" rx="3" fill="var(--line)"/><line x1="170" y1="22" x2="170" y2="34" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="170" cy="58" r="28" fill="var(--panel)" stroke="#F7931E" stroke-width="4"/><circle cx="170" cy="58" r="4" fill="var(--ink)"/>
      <line x1="198" y1="58" x2="198" y2="96" stroke="var(--ink)" stroke-width="2"/><line x1="142" y1="58" x2="142" y2="196" stroke="var(--ink)" stroke-width="2"/>
      <rect x="170" y="96" width="56" height="62" rx="5" fill="url(#awBk)"/><text x="198" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" dir="ltr">m₁</text>
      <rect x="120" y="196" width="44" height="44" rx="5" fill="url(#awBk)"/><text x="142" y="223" text-anchor="middle" font-size="14" font-weight="700" fill="#fff" dir="ltr">m₂</text>
      <line x1="198" y1="160" x2="198" y2="246" stroke="#DC2626" stroke-width="4" marker-end="url(#awAr)"/>
      <text x="206" y="206" text-anchor="start" font-size="13" font-weight="700" fill="#DC2626" dir="ltr">W₁ = m₁·g</text>
      <line x1="142" y1="242" x2="142" y2="296" stroke="#DC2626" stroke-width="4" marker-end="url(#awAr)"/>
      <text text-anchor="end" x="134" y="276" font-size="13" font-weight="700" fill="#DC2626" dir="ltr">W₂ = m₂·g</text>
      <line x1="248" y1="104" x2="248" y2="150" stroke="#2563EB" stroke-width="3" marker-end="url(#awAb)"/><text x="270" y="132" text-anchor="middle" font-size="13" fill="#2563EB">تنزل</text>
      <line x1="96" y1="236" x2="96" y2="196" stroke="#2563EB" stroke-width="3" marker-end="url(#awAb)"/><text x="68" y="220" text-anchor="middle" font-size="13" fill="#2563EB">تصعد</text>
      <text x="170" y="322" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" dir="ltr">F = W₁ − W₂</text>
      <text x="170" y="344" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" dir="ltr">m = m₁ + m₂</text>
      </svg><div class="vcap">وزن الكتلة الأثقل أكبر من وزن الكتلة الأخف، والفرق بين الوزنين هو القوة المحصلة التي تحرك الكتلتين معا، ومجموع الكتلتين هو الكتلة الكلية المتحركة</div></div>
      <div class="ln lw"><b>قانون نيوتن الثاني</b><span>F = m·a</span></div>
      <div class="ln lw"><b>ومنه التسارع (بقسمة الطرفين على m)</b><span>a = F / m</span></div>
      <div class="ln lw"><b>التسارع في جهاز آتوود، بالتعويض عن <bdi dir="ltr">F</bdi> و <bdi dir="ltr">m</bdi> في <bdi dir="ltr">a = F / m</bdi></b><span>a = (m₁ − m₂)·g / (m₁ + m₂)</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m₁, m₂</span> كتلة الأثقل والأخف، وتقاسان بالميزان الرقمي، ووحدتهما <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">ti, tf</span> الزمن الابتدائي عند الإفلات والنهائي عند الارتطام، ووحدتهما <span dir="ltr">s</span>، و <span dir="ltr">ti = 0</span></li>
      <li><span class="chip" dir="ltr">Vi, Vf</span> السرعة الابتدائية، و <span dir="ltr">Vi = 0</span>، والسرعة النهائية للكتلة الأثقل وتقرأ من المؤقت الرقمي، ووحدتهما <span dir="ltr">m/s</span></li>
      <li><span class="chip" dir="ltr">W₁, W₂</span> وزن الكتلة الأثقل والأخف، ووحدته <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">F</span> القوة المحصلة، وهي الفرق بين وزني الكتلتين، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">m</span> الكتلة الكلية المتحركة، وهي مجموع الكتلتين، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">a</span> تسارع الكتلتين، ووحدته <span dir="ltr">m/s²</span></li>
      </ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 كتل جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس الكتلتين بالميزان الرقمي</h4>
    <div class="stage"><div id="bl1"></div></div>
    <div class="ans"><label>قراءتك لكتلة الأثقل m₁</label><input id="mIn1" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk1">تحقق</button></div><div class="fb2" id="mFb1"></div>
    <div class="stage"><div id="bl2"></div></div>
    <div class="ans"><label>قراءتك لكتلة الأخف m₂</label><input id="mIn2" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk2">تحقق</button></div><div class="fb2" id="mFb2"></div>
    <h4 class="sbh">ب) قياس الزمن النهائي والسرعة النهائية، والزمن الابتدائي <span dir="ltr" style="white-space:nowrap">ti = 0</span></h4>
    <div class="stage"><div id="gS"></div><svg id="tmS" viewBox="0 0 400 152"></svg><div class="hud"><span id="gSt"></span></div></div>
    <div class="row"><label for="gR">إفلات الكتلتين</label><output id="gO"></output><input id="gR" type="range" min="0" max="100" step="0.5" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتتحرك الكتلتان من السكون، فيبدأ المؤقت الرقمي (ti) عند الإفلات، ويتوقف (tf) عند ارتطام الكتلة الأثقل بالوسادة، وتقيس البوابة الضوئية سرعتها النهائية (Vf).</p>
    <div class="ans"><label>قراءتك للزمن النهائي tf</label><input id="tIn" inputmode="decimal" dir="ltr" placeholder="s"><button type="button" class="go" id="tCk">تحقق</button><button type="button" class="rs" id="gHn">تلميح</button></div><div class="fb2" id="tFb"></div>
    <div class="ans"><label>قراءتك للسرعة النهائية Vf</label><input id="vIn" inputmode="decimal" dir="ltr" placeholder="m/s"><button type="button" class="go" id="vCk">تحقق</button></div><div class="fb2" id="vFb"></div>
    <h4 class="sbh">ج) حساب التسارع المقاس</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> السرعة الابتدائية <b dir="ltr">Vi = 0</b> لأن الكتلتين تبدآن من السكون</p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbA" style="white-space:pre-line;line-height:2">a = (Vf − Vi) / Δt</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب التسارع المقاس a = (Vf − Vi) / Δt بوحدة m/s²</label><input id="ca" inputmode="decimal" dir="ltr" placeholder="m/s²"><button type="button" class="go" id="cak">تحقق</button></div><div class="fb2" id="caf"></div></div>
    <h4 class="sbh">د) حساب القوة المحصلة</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbN" style="white-space:pre-line;line-height:2">F = (m₁ − m₂)·g</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب القوة المحصلة F = (m₁ − m₂)·g بوحدة N</label><input id="cF" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="cFk">تحقق</button></div><div class="fb2" id="cFf"></div></div>
    <h4 class="sbh">هـ) حساب التسارع من قانون نيوتن الثاني</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbB" style="white-space:pre-line;line-height:2">a = F / (m₁ + m₂)</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب التسارع من القانون a = F / (m₁ + m₂) بوحدة m/s²</label><input id="cN" inputmode="decimal" dir="ltr" placeholder="m/s²"><button type="button" class="go" id="cNk">تحقق</button></div><div class="fb2" id="cNf"></div></div>
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين التسارع المقاس والتسارع من القانون</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>القوة المحصلة F</td><td id="r5">—</td></tr>
    <tr><td>التسارع المقاس a</td><td id="r4">—</td></tr>
    <tr><td>التسارع من القانون a</td><td id="r6">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const r1=x=>Math.round(x*10)/10,r4=x=>Math.round(x*1e4)/1e4,fx=(x,n)=>String(+x.toFixed(n)),G=9.8;
  let M1,M2,H,T,ok={},hG=false;
  const AT=()=>(M1-M2)*G/(M1+M2),DX=()=>H/100,VF=()=>+(2*DX()/T).toFixed(3),AM=()=>VF()/T,FF=()=>(M1-M2)/1000*G;
  function newObj(){M2=150+10*Math.floor(Math.random()*6);M1=M2+20+10*Math.floor(Math.random()*4);H=r1(80+Math.random()*60);T=r4(Math.sqrt(2*DX()/AT()));ok={};hG=false;
    $('gR').value=0;['mIn1','mIn2','tIn','vIn','ca','cF','cN'].forEach(k=>$(k).value='');['mFb1','mFb2','tFb','vFb','caf','cFf','cNf'].forEach(fb0);
    $('bl1').innerHTML=awBal(M1,'m₁');$('bl2').innerHTML=awBal(M2,'m₂');gDraw();sub();results()}
  const done=()=>+$('gR').value>=100;
  function gDraw(){const s=+$('gR').value/100*DX(),st=s>0,dn=done();
    $('gO').textContent=dn?'توقف المؤقت':'';
    $('gSt').textContent=dn?'✓ ارتطمت الكتلة الأثقل بوسادة الاستقبال وتوقف المؤقت الرقمي، اقرأ الزمن النهائي tf':st?'الكتلتان تتحركان والمؤقت الرقمي يعد…':'الكتلتان ساكنتان (Vi = 0)، وعند إفلاتهما يبدأ العد من ti = 0';
    $('gS').innerHTML=awScene(DX(),s,{tm:{ti:st?'0.0000':'-.----',tf:dn?T.toFixed(4):'-.----',vf:dn?VF().toFixed(3):'-.---',hl:hG&&dn}});
    const row=(lab,v,y,h,u)=>`<text x="200" y="${y}" font-size="21" font-weight="800" text-anchor="middle" fill="${h?'#DC2626':'#14532D'}" direction="ltr" font-family="Consolas,monospace">${lab} = ${v} ${u||'s'}</text>`;
    $('tmS').innerHTML=`<rect x="40" y="4" width="320" height="128" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="56" y="14" width="288" height="108" rx="8" fill="#BBF7D0" stroke="#14532D"/>${row('ti',st?'0.0000':'-.----',44)}${row('tf',dn?T.toFixed(4):'-.----',76,hG&&dn)}${row('Vf',dn?VF().toFixed(3):'-.---',108,hG&&dn,'m/s')}<text x="200" y="148" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏شاشة المؤقت الرقمي (مكبرة)‏</text>`}
  const allM=()=>ok.m1&&ok.m2&&ok.t&&ok.v;
  function sub(){const kg=v=>fx(v/1000,3);
    $('sbA').textContent=ok.t&&ok.v?['a = (Vf − Vi) / Δt',E(`Δt = ${T.toFixed(4)} − 0 = ${T.toFixed(4)} s`),E(`a = (${fx(VF(),3)} − 0) / ${T.toFixed(4)}`)].join('\n'):'a = (Vf − Vi) / Δt';
    $('sbN').textContent=ok.m1&&ok.m2?['F = (m₁ − m₂)·g',E(`m₁ = ${M1} g = ${kg(M1)} kg`),E(`m₂ = ${M2} g = ${kg(M2)} kg`),E(`F = (${kg(M1)} − ${kg(M2)}) × 9.8`)].join('\n'):'F = (m₁ − m₂)·g';
    $('sbB').textContent=ok.cF?['a = F / (m₁ + m₂)',E(`a = ${fx(FF(),3)} / (${kg(M1)} + ${kg(M2)})`)].join('\n'):'a = F / (m₁ + m₂)';
    if($('vS'))$('vS').textContent=allM()?['التسارع المقاس:',E(`Vf = 2 × ${fx(DX(),3)} / ${T.toFixed(4)}`),E(`a = (Vf − 0) / ${T.toFixed(4)}`),'التسارع من قانون نيوتن الثاني:',E(`F = (${kg(M1)} − ${kg(M2)}) × 9.8`),E(`a = F / (${kg(M1)} + ${kg(M2)})`)].join('\n'):'أكمل القياسات في 5.1'}
  function results(){
    $('r4').textContent=ok.ca?E(fx(AM(),2)+' m/s²'):'—';$('r5').textContent=ok.cF?E(fx(FF(),3)+' N'):'—';$('r6').textContent=ok.cN?E(fx(AT(),2)+' m/s²'):'—';
    const all=ok.ca&&ok.cN;
    $('cmpS').textContent=all?['التسارع المقاس: '+E(`a = ${fx(AM(),2)} m/s²`),'التسارع من القانون: '+E(`a = ${fx(AT(),2)} m/s²`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'التسارع المقاس من السرعة النهائية والزمن يساوي التسارع المحسوب من قانون نيوتن الثاني تقريبا.':'';
    $('rNote').textContent=all?'الاستنتاج: التسارعان متساويان تقريبا، فيتحقق قانون نيوتن الثاني '+E('F = m·a')+'.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  [1,2].forEach(k=>$('mCk'+k).onclick=()=>{const v=num($('mIn'+k).value),val=k===1?M1:M2;if(isNaN(v))return fb('mFb'+k,false,'اكتب قراءتك بالجرام.');
    if(Math.abs(v-val)<0.5){ok['m'+k]=true;fb('mFb'+k,true,'✓ قراءة صحيحة:\n'+E(`m${k===1?'₁':'₂'} = ${val} g = ${fx(val/1000,3)} kg`))}else fb('mFb'+k,false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()});
  $('gR').oninput=gDraw;
  $('gHn').onclick=()=>{hG=true;gDraw();fb('tFb',true,'تلميح: يبدأ العد عند إفلات الكتلتين، ويتوقف عند ارتطام الكتلة الأثقل بالوسادة. الزمن الابتدائي '+E('ti = 0')+'، فاكتب الزمن النهائي '+E('tf')+' كما يظهر على الشاشة بأربعة أرقام عشرية، والسرعة النهائية '+E('Vf')+' بثلاثة أرقام عشرية (باللون الأحمر).')};
  $('tCk').onclick=()=>{if(!done())return fb('tFb',false,'اسحب المؤشر حتى ترتطم الكتلة الأثقل بالوسادة أولا.');const v=num($('tIn').value);if(isNaN(v))return fb('tFb',false,'اكتب قراءتك بالثانية.');
    if(Math.abs(v-T)<0.00005){ok.t=true;fb('tFb',true,'✓ قراءة صحيحة:\n'+E(`tf = ${T.toFixed(4)} s`)+'\n'+E(`Δt = tf − ti = ${T.toFixed(4)} − 0 = ${T.toFixed(4)} s`))}else fb('tFb',false,'✗ القراءة غير صحيحة، اكتب الزمن كما يظهر على الشاشة بأربعة أرقام عشرية.');sub();results()};
  const chk=(c,need,needMsg,val,unit,tol,okMsg,bad)=>{if(!need())return fb(c+'f',false,needMsg);const v=num($(c).value);if(isNaN(v))return fb(c+'f',false,'اكتب الناتج بوحدة '+unit+'.');
    if(Math.abs(v-val)/Math.abs(val)<tol){ok[c]=true;fb(c+'f',true,okMsg())}else fb(c+'f',false,typeof bad==='function'?bad():bad);sub();results()};
  $('vCk').onclick=()=>{if(!done())return fb('vFb',false,'اسحب المؤشر حتى ترتطم الكتلة الأثقل بالوسادة أولا.');const v=num($('vIn').value);if(isNaN(v))return fb('vFb',false,'اكتب قراءتك بوحدة m/s.');
    if(Math.abs(v-VF())<0.0005){ok.v=true;fb('vFb',true,'✓ قراءة صحيحة:\n'+E(`Vf = ${VF().toFixed(3)} m/s`))}else fb('vFb',false,'✗ اكتب السرعة النهائية كما تظهر على الشاشة بثلاثة أرقام عشرية.');sub();results()};
  $('cak').onclick=()=>chk('ca',()=>ok.t&&ok.v,'أكمل قراءة الزمن النهائي والسرعة النهائية أولا.',AM(),'m/s²',0.03,()=>'✓ إجابة صحيحة:\n'+E(`a = (${fx(VF(),3)} − 0) / ${T.toFixed(4)} = ${fx(AM(),2)} m/s²`),'✗ اطرح السرعة الابتدائية (صفر) من السرعة النهائية، ثم اقسم الناتج على الزمن Δt.');
  $('cFk').onclick=()=>chk('cF',()=>ok.m1&&ok.m2,'أكمل قياس الكتلتين أولا.',FF(),'N',0.01,()=>'✓ إجابة صحيحة:\n'+E(`F = (${fx(M1/1000,3)} − ${fx(M2/1000,3)}) × 9.8 = ${fx(FF(),3)} N`),()=>'✗ اطرح أولا: '+E(`${fx(M1/1000,3)} − ${fx(M2/1000,3)} = ${fx((M1-M2)/1000,3)}`)+'، ثم اضرب الناتج في 9.8.');
  $('cNk').onclick=()=>chk('cN',()=>ok.cF,'احسب القوة المحصلة F أولا.',AT(),'m/s²',0.03,()=>'✓ إجابة صحيحة:\n'+E(`a = ${fx(FF(),3)} / (${fx(M1/1000,3)} + ${fx(M2/1000,3)}) = ${fx(AT(),2)} m/s²`),()=>'✗ اجمع أولا: '+E(`${fx(M1/1000,3)} + ${fx(M2/1000,3)} = ${fx((M1+M2)/1000,3)}`)+'، ثم اقسم القوة المحصلة '+E(`F = ${fx(FF(),3)}`)+' على الناتج.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function frHand(x,y,k){/* يد مع ذراع تمسك حلقة السحب عند (x,y) */
  k=k||1;const P=(a,b)=>`${x+a*k},${y+b*k}`;
  return `<g stroke="#9A6340" stroke-width="${1.4*k}" stroke-linejoin="round"><polygon points="${P(6,-8)} ${P(78,-48)} ${P(90,-28)} ${P(14,8)}" fill="#EBB98F"/><polygon points="${P(66,-41)} ${P(86,-52)} ${P(98,-31)} ${P(78,-21)}" fill="#3B82F6" stroke="#1E3A8A"/>
  <rect x="${x-2*k}" y="${y-11*k}" width="${22*k}" height="${22*k}" rx="${8*k}" fill="#F5C9A0"/>
  <path d="M${P(1,-5)} h${7*k} M${P(1,0)} h${7*k} M${P(1,5)} h${7*k}" fill="none" stroke-width="${1*k}"/>
  <ellipse cx="${x+4*k}" cy="${y-12*k}" rx="${7*k}" ry="${4*k}" fill="#F5C9A0"/></g>`}
function frScene(s,o){/* s إزاحة الصندوق بالبكسل أثناء السحب */
  o=o||{};const BASE=150,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g='';
  /* السطح الخشبي الأفقي */
  g+=box(8,330,0,70,0,12,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  for(let i=0;i<7;i++){const a=S(20+i*44,4,12),b=S(46+i*44,66,12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#D2A86E" stroke-width="1"/>`}
  /* الصندوق الخشبي */
  const x0=34+s,x1=x0+70;
  g+=box(x0,x1,18,52,12,46,'#A0642F','#C98B4C','#7C4A1F','#5B3412');
  {const [tx,ty]=S((x0+x1)/2,18,26);g+=`<text x="${tx}" y="${ty+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m</text>`}
  /* الخطاف والخيط */
  const hk=S(x1,35,29),sx0=x1+30,sx1=sx0+110,sp=S(sx0,35,29);
  g+=`<circle cx="${hk[0]+3}" cy="${hk[1]}" r="3.4" fill="none" stroke="#1F2937" stroke-width="1.6"/><line x1="${hk[0]+6}" y1="${hk[1]}" x2="${sp[0]}" y2="${sp[1]}" stroke="#1F2937" stroke-width="1.4"/>`;
  /* الميزان النابضي */
  g+=box(sx0,sx1,30,40,23,35,'#94A3B8','#E2E8F0','#64748B','#334155');
  {const a=S(sx0+14,30,35),b=S(sx1-10,30,35);g+=`<line x1="${a[0]}" y1="${a[1]-0.5}" x2="${b[0]}" y2="${b[1]-0.5}" stroke="#F7931E" stroke-width="2"/>`;
   for(let i=0;i<=10;i++){const c=S(sx0+14+i*(sx1-sx0-24)/10,30,35);g+=`<line x1="${c[0]}" y1="${c[1]}" x2="${c[0]}" y2="${c[1]-(i%5?3:6)}" stroke="#1F2937" stroke-width="0.8"/>`}
   const r=S(sx1+10,35,29),q=S(sx1,35,29);g+=`<line x1="${q[0]}" y1="${q[1]}" x2="${r[0]-6}" y2="${r[1]}" stroke="#334155" stroke-width="2"/><circle cx="${r[0]}" cy="${r[1]}" r="7" fill="none" stroke="#F7931E" stroke-width="3.5"/>`;
   if(o.F!=null){const m=S((sx0+sx1)/2,30,46);g+=`<rect x="${m[0]-26}" y="${m[1]-15}" width="52" height="18" rx="4" fill="#FFF7ED" stroke="#F7931E"/><text x="${m[0]}" y="${m[1]-1.5}" font-size="11.5" font-weight="800" text-anchor="middle" fill="#C2410C" direction="ltr">${o.F} N</text>`}
   g+=frHand(r[0]+3,r[1],0.8);
   if(o.pull){const a=S(sx1+14,35,29);g+=`<line x1="${a[0]}" y1="${a[1]+18}" x2="${a[0]+34}" y2="${a[1]+18}" stroke="#F7931E" stroke-width="3"/><path d="M${a[0]+42},${a[1]+18} l-10,-6 v12 Z" fill="#F7931E"/>`}}
  if(o.v){const a=S(x0+10,18,58),b=S(x1-10,18,58);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]-8}" y2="${b[1]}" stroke="#2563EB" stroke-width="2.4"/><path d="M${b[0]},${b[1]} l-9,-5 v10 Z" fill="#2563EB"/><text x="${(a[0]+b[0])/2}" y="${a[1]-11}" font-size="12" font-weight="800" text-anchor="middle" fill="#2563EB">سرعة ثابتة</text>`}
  if(o.lab){g+=lbl(...S(x0+20,30,46),40,22,'الصندوق الخشبي','start')+lbl(...S(14,30,12),70,BASE+26,'السطح الخشبي الأفقي')+lbl(...S(x1+16,35,29),190,BASE+26,'الخيط')+lbl(...S(sx0+60,35,35),215,30,'الميزان النابضي')+lbl(...S(sx1+10,35,29),330,BASE+26,'حلقة السحب')+lbl(...S(sx1+60,35,60),366,22,'يد المتدرب')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?44:14)}" aria-label="سحب صندوق خشبي بميزان نابضي">${g}</svg>`}
function frZoom(F,hl){/* تكبير تدريج الميزان النابضي */
  const c0=Math.max(0,Math.floor(F*2)/2-1),X=v=>24+(v-c0)*140;
  let z=`<rect x="8" y="26" width="384" height="64" rx="10" fill="#E2E8F0" stroke="#334155" stroke-width="1.5"/><rect x="16" y="34" width="368" height="48" rx="4" fill="#FFFFFF" stroke="#94A3B8"/>`;
  for(let m=Math.round(c0*10);m<=Math.round((c0+2.55)*10);m++){const x=X(m/10);if(x>380)break;const big=m%5===0,h=hl&&m===Math.round(F*10);
    z+=`<line x1="${x}" y1="34" x2="${x}" y2="${34+(m%10===0?22:big?16:9)}" stroke="${h?'#DC2626':'#1F2937'}" stroke-width="${h?2.6:m%10===0?1.5:.9}"/>`;
    if(big)z+=`<text x="${x}" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${(m/10).toFixed(1)}</text>`}
  const xp=X(F);z+=`<path d="M${xp-8},18 L${xp+8},18 L${xp},32 Z" fill="#F7931E"/><line x1="${xp}" y1="30" x2="${xp}" y2="84" stroke="#F7931E" stroke-width="3"/><rect x="342" y="92" width="44" height="24" rx="6" fill="#F7931E"/><text x="364" y="109" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">N</text><text x="8" y="112" font-size="12" font-weight="700" fill="var(--muted)">تكبير تدريج الميزان النابضي</text>`;
  return z}
function frSpring(F,nm){/* رسم تفصيلي لتوصيل الميزان النابضي */
  F=F||0;nm=nm||'الصندوق الخشبي';const x0=150,x1=330,xi=x0+12+F*30;
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g=`<rect x="0" y="112" width="470" height="10" rx="2" fill="#E9C894" stroke="#9A6A3A"/>`;
  g+=`<rect x="6" y="66" width="58" height="46" rx="4" fill="#A0642F" stroke="#5B3412"/><text x="35" y="94" font-size="14" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m</text>`;
  g+=`<circle cx="70" cy="86" r="5" fill="none" stroke="#1F2937" stroke-width="2"/><line x1="75" y1="86" x2="118" y2="86" stroke="#1F2937" stroke-width="1.8"/>`;
  g+=`<path d="M118,86 q8,-10 14,-2 q4,6 -2,8" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round"/><line x1="132" y1="84" x2="${x0}" y2="84" stroke="#334155" stroke-width="3"/>`;
  g+=`<rect x="${x0}" y="64" width="${x1-x0}" height="40" rx="8" fill="#E2E8F0" stroke="#334155" stroke-width="2"/><rect x="${x0+8}" y="76" width="${x1-x0-16}" height="16" rx="3" fill="#FFFFFF" stroke="#94A3B8"/>`;
  {let z='M'+(x0+8)+',84';const n=14,w=(xi-x0-8)/n;for(let i=0;i<n;i++)z+=` l${w/2},${i%2?6:-6} l${w/2},${i%2?-6:6}`;g+=`<path d="${z}" fill="none" stroke="#64748B" stroke-width="1.6"/>`}
  g+=`<line x1="${xi}" y1="74" x2="${xi}" y2="94" stroke="#F7931E" stroke-width="4"/><line x1="${xi}" y1="84" x2="${x1+6}" y2="84" stroke="#334155" stroke-width="2.4"/>`;
  for(let i=0;i<=50;i++){const x=x0+12+i*3;if(x>x1-6)break;g+=`<line x1="${x}" y1="64" x2="${x}" y2="${64+(i%10===0?9:i%5===0?6:3)}" stroke="#1F2937" stroke-width="${i%10===0?1.2:.6}"/>`;if(i%10===0)g+=`<text x="${x}" y="60" font-size="10" font-weight="700" text-anchor="middle" fill="var(--ink)">${i/10}</text>`}
  g+=`<line x1="${x1}" y1="84" x2="${x1+20}" y2="84" stroke="#334155" stroke-width="3"/><circle cx="${x1+30}" cy="84" r="10" fill="none" stroke="#F7931E" stroke-width="4"/>`;
  g+=frHand(x1+34,84,1.2)+`<line x1="${x1+50}" y1="104" x2="${x1+92}" y2="104" stroke="#F7931E" stroke-width="3"/><path d="M${x1+100},104 l-10,-6 v12 Z" fill="#F7931E"/>`;
  g+=lbl(30,70,8,22,nm,'start')+lbl(96,86,96,150,'الخيط')+lbl(126,80,112,22,'خطاف الميزان','start')+lbl(x0+40,84,x0+30,150,'النابض')+lbl(x0+96,66,248,22,'التدريج بوحدة N')+lbl(xi,94,xi+30,150,'المؤشر')+lbl(x1+24,92,x1+20,150,'حلقة السحب')+lbl(x1+90,50,420,22,'يد المتدرب','middle')+lbl(x1-20,100,304,22,'جسم الميزان','start');
  return `<svg viewBox="0 0 470 168" aria-label="توصيل الميزان النابضي بالصندوق">${g}</svg>`}
function frLab(box){
  const MU=0.3;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب قوة الاحتكاك الحركي باستخدام القانون <span dir="ltr" style="white-space:nowrap">fk = μk·N</span> والتحقق منها بالميزان النابضي</p></div>
  <div class="tags"><span class="tag">الكتلة: <i>الميزان الرقمي</i> · g</span><span class="tag">قوة السحب (الشد) F: <i>الميزان النابضي</i> · N</span><span class="tag dv">قوة الاحتكاك fk: <i>كمية مشتقة</i> · N</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الصندوق الخشبي والسطح الخشبي الأفقي والميزان الرقمي والميزان النابضي.</li>
    <li>قياس كتلة الصندوق بالميزان الرقمي.</li>
    <li>حساب القوة العمودية <span dir="ltr" style="white-space:nowrap">N = m·g</span>.</li>
    <li>حساب قوة الاحتكاك الحركي <span dir="ltr" style="white-space:nowrap">fk = μk·N</span>.</li>
    <li>التحقق من قوة الاحتكاك بقراءة الميزان النابضي أثناء سحب الصندوق بسرعة ثابتة.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${frScene(0,{lab:true})}</div><div class="vcap">سحب صندوق خشبي بميزان نابضي: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> صندوق خشبي على سطح خشبي أفقي، مربوط بخيط أفقي إلى الميزان النابضي، ويسحب المتدرب الميزان بيده من حلقة السحب.</p></div>
    <div class="tool"><div class="stage">${frSpring(1.6)}</div><div class="vcap">توصيل الميزان النابضي بالصندوق</div>
    <p><b>طريقة التوصيل:</b> يربط الخيط بين خطاف الصندوق وخطاف الميزان النابضي، ويكون الخيط أفقيا موازيا للسطح. يمسك المتدرب حلقة السحب بيده ويسحبها سحبا أفقيا هادئا بسرعة ثابتة، فيتمدد النابض ويتحرك المؤشر على التدريج ليبين قوة السحب بالنيوتن.</p></div>
    <div class="tool"><p><b>الصندوق الخشبي والسطح الخشبي الأفقي:</b> سطحان متلامسان من الخشب، ومعامل الاحتكاك الحركي بينهما <span dir="ltr">μk = ${MU}</span>.</p>
    <p><b>الميزان الرقمي:</b> يقيس كتلة الصندوق بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>الميزان النابضي:</b> يقيس قوة السحب بالنيوتن، وأصغر تدريج فيه <span dir="ltr">0.1 N</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الوزن</b><span>W = m·g</span></div>
      <div class="ln lw"><b>القوة العمودية <bdi dir="ltr">N</bdi> (الصندوق على سطح أفقي، فتساوي الوزن)</b><span>N = W = m·g</span></div>
      <div class="ln lw"><b>قوة الاحتكاك الحركي</b><span>fk = μk·N</span></div>
      <div class="ln lw"><b>قوة السحب (قوة الشد) <bdi dir="ltr">F</bdi> عند السحب بسرعة ثابتة (التسارع صفر، فالقوة المحصلة صفر)</b><span>F − fk = 0  ⟹  F = fk</span></div>
      <p class="slh">ℹ️ القوتان <b>F</b> و <b>fk</b> متساويتان في المقدار ومتعاكستان في الاتجاه، لأن الصندوق يتحرك بسرعة ثابتة فتسارعه صفر، فتكون القوة المحصلة عليه صفرا حسب قانون نيوتن الثاني <bdi dir="ltr">F = m·a</bdi>.</p>
      <div class="vfig"><svg viewBox="0 0 340 300" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="رسم القوى على الصندوق">
      <defs><marker id="frR" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#DC2626"/></marker>
      <marker id="frG" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#16A34A"/></marker>
      <marker id="frO" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#F7931E"/></marker>
      <marker id="frB" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563EB"/></marker>
      <linearGradient id="frW" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#D9A066"/><stop offset="1" stop-color="#8B5A2B"/></linearGradient></defs>
      <rect x="20" y="186" width="300" height="16" rx="3" fill="#E9C894" stroke="#9A6A3A"/>
      <rect x="125" y="126" width="90" height="60" rx="5" fill="url(#frW)" stroke="#5B3412"/><text x="170" y="162" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" dir="ltr">m</text>
      <line x1="170" y1="126" x2="170" y2="44" stroke="#16A34A" stroke-width="4" marker-end="url(#frG)"/><text x="180" y="62" font-size="13" font-weight="700" fill="#16A34A" dir="ltr">N</text>
      <line x1="170" y1="186" x2="170" y2="268" stroke="#DC2626" stroke-width="4" marker-end="url(#frR)"/><text x="180" y="258" font-size="13" font-weight="700" fill="#DC2626" dir="ltr">W = m·g</text>
      <line x1="215" y1="156" x2="300" y2="156" stroke="#F7931E" stroke-width="4" marker-end="url(#frO)"/><text x="262" y="146" text-anchor="middle" font-size="13" font-weight="700" fill="#C2410C" dir="ltr">F (الشد)</text>
      <line x1="125" y1="178" x2="40" y2="178" stroke="#2563EB" stroke-width="4" marker-end="url(#frB)"/><text x="80" y="168" text-anchor="middle" font-size="13" font-weight="700" fill="#2563EB" dir="ltr">fk</text>
      <text x="170" y="292" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" dir="ltr">N = W  ,  F = fk</text>
      </svg><div class="vcap">القوة العمودية N تساوي الوزن W لأن السطح أفقي، وعند السحب بسرعة ثابتة تساوي قوة السحب (قوة الشد) F قوة الاحتكاك fk المعاكسة للحركة</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m</span> كتلة الصندوق، وتقاس بالميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">W</span> وزن الصندوق، ووحدته <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">N</span> القوة العمودية، وهي قوة السطح على الصندوق عموديا عليه، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">μk</span> معامل الاحتكاك الحركي بين السطحين، وليس له وحدة</li>
      <li><span class="chip" dir="ltr">fk</span> قوة الاحتكاك الحركي، وتعاكس اتجاه الحركة، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">F</span> قوة السحب (قوة الشد في الخيط)، وهي القوة التي يسحب بها المتدرب الصندوق عبر الخيط، وتقاس بالميزان النابضي، ووحدتها <span dir="ltr">N</span></li>
      </ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 صندوق جديد</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس كتلة الصندوق بالميزان الرقمي</h4>
    <div class="stage"><div id="bl"></div></div>
    <div class="ans"><label>قراءتك لكتلة الصندوق m</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk">تحقق</button></div><div class="fb2" id="mFb"></div>
    <h4 class="sbh">ب) حساب القوة العمودية <bdi dir="ltr">N</bdi></h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbN" style="white-space:pre-line;line-height:2">N = m·g</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب القوة العمودية N = m·g بوحدة N</label><input id="cN" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="cNk">تحقق</button></div><div class="fb2" id="cNf"></div></div>
    <h4 class="sbh">ج) حساب قوة الاحتكاك الحركي</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> معامل الاحتكاك الحركي <b dir="ltr">μk = ${MU}</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbF" style="white-space:pre-line;line-height:2">fk = μk·N</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب قوة الاحتكاك الحركي fk = μk·N بوحدة N</label><input id="cF" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="cFk">تحقق</button></div><div class="fb2" id="cFf"></div></div>
    <h4 class="sbh">د) التحقق بالميزان النابضي</h4>
    <div class="stage"><div id="gS"></div><svg id="gZ" viewBox="0 0 400 118"></svg><div class="hud"><span id="gSt"></span></div></div>
    <div class="row"><label for="gR">سحب الصندوق</label><output id="gO"></output><input id="gR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي ليتحرك الصندوق بسرعة ثابتة، ثم اقرأ الميزان النابضي من التدريج المكبر.</p>
    <div class="ans"><label>قراءتك للميزان النابضي، وهي قوة السحب (قوة الشد) F</label><input id="fIn" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="fCk">تحقق</button><button type="button" class="rs" id="fHn">تلميح</button></div><div class="fb2" id="fFb"></div>
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين قوة الاحتكاك المحسوبة وقوة السحب (قوة الشد)</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>القوة العمودية N</td><td id="r1">—</td></tr>
    <tr><td>قوة الاحتكاك المحسوبة fk</td><td id="r2">—</td></tr>
    <tr><td>قوة السحب (الشد) F بالميزان النابضي</td><td id="r3">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n)),G=9.8;
  let M,ok={},hF=false;
  const KG=()=>M/1000,NN=()=>KG()*G,FK=()=>MU*NN(),FS=()=>Math.round(FK()*10)/10;
  const moving=()=>+$('gR').value>=20;
  function newObj(){M=300+10*Math.floor(Math.random()*41);ok={};hF=false;$('gR').value=0;
    ['mIn','cN','cF','fIn'].forEach(k=>$(k).value='');['mFb','cNf','cFf','fFb'].forEach(fb0);
    $('bl').innerHTML=awBal(M,'m');gDraw();sub();results()}
  function gDraw(){const v=+$('gR').value,mv=moving(),F=v>0?FS():0;
    $('gO').textContent=mv?'سرعة ثابتة':v>0?'يبدأ السحب':'';
    $('gSt').textContent=mv?'✓ الصندوق يتحرك بسرعة ثابتة، اقرأ الميزان النابضي F من التدريج المكبر':v>0?'استمر في السحب…':'الصندوق ساكن والميزان النابضي يقرأ صفرا';
    $('gS').innerHTML=frScene(v*0.5,{F:mv?F.toFixed(1):(v>0?'…':'0.0'),pull:v>0,v:mv});
    $('gZ').innerHTML=frZoom(mv?F:0,hF&&mv)}
  function sub(){
    $('sbN').textContent=ok.m?['N = m·g',E(`m = ${M} g = ${fx(KG(),3)} kg`),E(`N = ${fx(KG(),3)} × 9.8`)].join('\n'):'N = m·g';
    $('sbF').textContent=ok.cN?['fk = μk·N',E(`fk = ${MU} × ${fx(NN(),3)}`)].join('\n'):'fk = μk·N'}
  function results(){
    $('r1').textContent=ok.cN?E(fx(NN(),3)+' N'):'—';$('r2').textContent=ok.cF?E(FK().toFixed(2)+' N'):'—';$('r3').textContent=ok.f?E(FS().toFixed(1)+' N'):'—';
    const all=ok.cF&&ok.f;
    $('cmpS').textContent=all?['قوة الاحتكاك المحسوبة: '+E(`fk = ${FK().toFixed(2)} N`),'قوة السحب (قوة الشد): '+E(`F = ${FS().toFixed(1)} N`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'قوة الاحتكاك المحسوبة تساوي قوة السحب (قوة الشد) المقاسة بالميزان النابضي تقريبا، لأن الصندوق يتحرك بسرعة ثابتة فتكون F = fk.':'';
    $('rNote').innerHTML=all?'الاستنتاج: قوة الاحتكاك الحركي المحسوبة من <span dir="ltr" style="white-space:nowrap">fk = μk·N</span> تساوي قوة السحب (قوة الشد) المقاسة بالميزان النابضي تقريبا عند السحب بسرعة ثابتة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('mCk').onclick=()=>{const v=num($('mIn').value);if(isNaN(v))return fb('mFb',false,'اكتب قراءتك بالجرام.');
    if(Math.abs(v-M)<0.5){ok.m=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`m = ${M} g = ${fx(KG(),3)} kg`))}else fb('mFb',false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()};
  const chk=(c,need,needMsg,val,unit,tol,okMsg,bad)=>{if(!need())return fb(c+'f',false,needMsg);const v=num($(c).value);if(isNaN(v))return fb(c+'f',false,'اكتب الناتج بوحدة '+unit+'.');
    if(Math.abs(v-val)/Math.abs(val)<tol){ok[c]=true;fb(c+'f',true,okMsg())}else fb(c+'f',false,bad);sub();results()};
  $('cNk').onclick=()=>chk('cN',()=>ok.m,'قس كتلة الصندوق أولا.',NN(),'N',0.01,()=>'✓ إجابة صحيحة:\n'+E(`N = ${fx(KG(),3)} × 9.8 = ${fx(NN(),3)} N`),'✗ اكتب الكتلة بوحدة kg، ثم اضربها في 9.8.');
  $('cFk').onclick=()=>chk('cF',()=>ok.cN,'احسب القوة العمودية N أولا.',FK(),'N',0.01,()=>'✓ إجابة صحيحة:\n'+E(`fk = ${MU} × ${fx(NN(),3)} = ${FK().toFixed(2)} N`),'✗ اضرب معامل الاحتكاك الحركي '+MU+' في القوة العمودية N.');
  $('gR').oninput=gDraw;
  $('fHn').onclick=()=>{hF=true;gDraw();fb('fFb',true,'تلميح: الأرقام على التدريج بالنيوتن، وبين كل رقمين 5 أقسام صغيرة كل قسم '+E('0.1 N')+'. اسحب الصندوق حتى يتحرك بسرعة ثابتة، ثم اقرأ الخط الأحمر تحت المؤشر.')};
  $('fCk').onclick=()=>{if(!moving())return fb('fFb',false,'اسحب المؤشر حتى يتحرك الصندوق بسرعة ثابتة أولا.');const v=num($('fIn').value);if(isNaN(v))return fb('fFb',false,'اكتب قراءتك بالنيوتن.');
    if(Math.abs(v-FS())<0.01){ok.f=true;fb('fFb',true,'✓ قراءة صحيحة:\n'+E(`F = ${FS().toFixed(1)} N`))}else fb('fFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');results()};
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function wkScene(s,o){/* s إزاحة الصندوق بالبكسل، والشريط المتري على حافة السطح */
  o=o||{};const BASE=150,K=1.3,XS=34,W=460,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g='';
  /* السطح الخشبي الأفقي */
  g+=box(8,380,0,70,0,12,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  for(let i=0;i<8;i++){const a=S(20+i*44,10,12),b=S(46+i*44,66,12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#D2A86E" stroke-width="1"/>`}
  /* الشريط المتري على الحافة الأمامية */
  g+=poly([[XS,0,12.6],[XS+K*120,0,12.6],[XS+K*120,9,12.6],[XS,9,12.6]],'#FACC15','#A16207');
  g+=box(XS-28,XS-2,0,16,12,34,'#EA580C','#FB923C','#C2410C','#9A3412');{const [cx,cy]=S(XS-15,0,23);g+=`<circle cx="${cx}" cy="${cy}" r="8" fill="#FDBA74" stroke="#9A3412" stroke-width="1.3"/><circle cx="${cx}" cy="${cy}" r="2.6" fill="#9A3412"/>`}g+=box(XS-20,XS-11,3,10,34,37,'#1F2937','#475569','#0F172A','#000');
  for(let c=0;c<=120;c+=5){const a=S(XS+c*K,1,12),b=S(XS+c*K,c%10?4:7,12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#1F2937" stroke-width="${c%10?.6:1}"/>`;if(c%20===0){const t=S(XS+c*K,0,12);g+=`<text x="${t[0]}" y="${t[1]+11}" font-size="9" font-weight="700" text-anchor="middle" fill="#1F2937">${c}</text>`}}
  /* الموضع الابتدائي */
  {const a=S(XS,0,12),b=S(XS,60,12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#2563EB" stroke-width="1.6" stroke-dasharray="4 3"/>`;if(o.xi){const t=S(XS,62,12);g+=`<text x="${t[0]-2}" y="${t[1]-4}" font-size="11" font-weight="800" text-anchor="middle" fill="#2563EB" direction="ltr">xi = 0</text>`}}
  /* الصندوق الخشبي */
  const x0=XS+s,x1=x0+70;
  g+=box(x0,x1,18,52,12,46,'#A0642F','#C98B4C','#7C4A1F','#5B3412');
  {const [tx,ty]=S((x0+x1)/2,18,26);g+=`<text x="${tx}" y="${ty+5}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m</text>`}
  {const a=S(x0,1,12),b=S(x0,18,12);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#DC2626" stroke-width="1.6"/>`}
  if(o.ptr){const [p,q]=S(XS+o.ptr.p*K,1,12);g+=`<path d="M${p-6},${q+14} L${p},${q+3} L${p+6},${q+14} Z" fill="#F7931E"/>`;if(o.ptr.touch)g+=`<circle cx="${p}" cy="${q}" r="6" fill="none" stroke="#16A34A" stroke-width="2.2"/>`}
  /* الخطاف والخيط والميزان النابضي */
  const hk=S(x1,35,29),sx0=x1+26,sx1=sx0+90,sp=S(sx0,35,29);
  g+=`<circle cx="${hk[0]+3}" cy="${hk[1]}" r="3.4" fill="none" stroke="#1F2937" stroke-width="1.6"/><line x1="${hk[0]+6}" y1="${hk[1]}" x2="${sp[0]}" y2="${sp[1]}" stroke="#1F2937" stroke-width="1.4"/>`;
  g+=box(sx0,sx1,30,40,23,35,'#94A3B8','#E2E8F0','#64748B','#334155');
  {const a=S(sx0+12,30,35),b=S(sx1-8,30,35);g+=`<line x1="${a[0]}" y1="${a[1]-0.5}" x2="${b[0]}" y2="${b[1]-0.5}" stroke="#F7931E" stroke-width="2"/>`;
   for(let i=0;i<=10;i++){const c=S(sx0+12+i*(sx1-sx0-20)/10,30,35);g+=`<line x1="${c[0]}" y1="${c[1]}" x2="${c[0]}" y2="${c[1]-(i%5?3:6)}" stroke="#1F2937" stroke-width="0.8"/>`}
   const r=S(sx1+10,35,29),q=S(sx1,35,29);g+=`<line x1="${q[0]}" y1="${q[1]}" x2="${r[0]-6}" y2="${r[1]}" stroke="#334155" stroke-width="2"/><circle cx="${r[0]}" cy="${r[1]}" r="7" fill="none" stroke="#F7931E" stroke-width="3.5"/>`;
   if(o.F!=null){const m=S((sx0+sx1)/2,30,46);g+=`<rect x="${m[0]-26}" y="${m[1]-15}" width="52" height="18" rx="4" fill="#FFF7ED" stroke="#F7931E"/><text x="${m[0]}" y="${m[1]-1.5}" font-size="11.5" font-weight="800" text-anchor="middle" fill="#C2410C" direction="ltr">${o.F} N</text>`}
   g+=frHand(r[0]+3,r[1],0.8);
   if(o.pull){const a=S(sx1+14,35,29);g+=`<line x1="${a[0]}" y1="${a[1]+18}" x2="${a[0]+34}" y2="${a[1]+18}" stroke="#F7931E" stroke-width="3"/><path d="M${a[0]+42},${a[1]+18} l-10,-6 v12 Z" fill="#F7931E"/>`}}
  if(o.v){const a=S(x0+10,18,58),b=S(x1-10,18,58);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]-8}" y2="${b[1]}" stroke="#2563EB" stroke-width="2.4"/><path d="M${b[0]},${b[1]} l-9,-5 v10 Z" fill="#2563EB"/><text x="${(a[0]+b[0])/2}" y="${a[1]-11}" font-size="12" font-weight="800" text-anchor="middle" fill="#2563EB">سرعة ثابتة</text>`}
  if(o.lab){g+=lbl(...S(x0+20,30,46),40,22,'الصندوق الخشبي','start')+lbl(...S(XS+K*100,4,12),150,BASE+28,'الشريط المتري')+lbl(...S(320,40,12),330,BASE+28,'السطح الخشبي الأفقي')+lbl(...S(sx0+50,35,35),230,24,'الميزان النابضي')+lbl(...S(sx1+60,35,60),400,24,'يد المتدرب')}
  return `<svg viewBox="0 0 ${W} ${BASE+(o.lab?46:16)}" aria-label="سحب صندوق وقياس إزاحته">${g}</svg>`}
function wkLab2(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب الشغل المبذول على صندوق خشبي بقوة أفقية باستخدام القانون <span dir="ltr" style="white-space:nowrap">W = F·x</span></p></div>
  <div class="tags"><span class="tag">قوة السحب (الشد) F: <i>الميزان النابضي</i> · N</span><span class="tag">الإزاحة x: <i>الشريط المتري</i> · cm</span><span class="tag dv">الشغل W: <i>كمية مشتقة</i> · J</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الصندوق الخشبي والميزان النابضي والشريط المتري.</li>
    <li>قياس قوة السحب (قوة الشد) <span dir="ltr">F</span> بالميزان النابضي أثناء سحب الصندوق بسرعة ثابتة.</li>
    <li>قياس إزاحة الصندوق <span dir="ltr">x</span> بالشريط المتري.</li>
    <li>حساب الشغل المبذول <span dir="ltr" style="white-space:nowrap">W = F·x</span>.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${wkScene(0,{lab:true,xi:true})}</div><div class="vcap">سحب صندوق خشبي وقياس إزاحته: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> صندوق خشبي على سطح خشبي أفقي، مربوط بخيط أفقي إلى الميزان النابضي، ويسحب المتدرب الميزان بيده من حلقة السحب. والشريط المتري مثبت على حافة السطح، وصفره عند الموضع الابتدائي للصندوق <span dir="ltr">xi = 0</span>.</p></div>
    <div class="tool"><div class="stage">${frSpring(1.6,'الصندوق الخشبي')}</div><div class="vcap">توصيل الميزان النابضي بالصندوق</div>
    <p><b>طريقة التوصيل:</b> يربط الخيط بين خطاف الصندوق وخطاف الميزان النابضي، ويكون الخيط أفقيا موازيا للسطح. يمسك المتدرب حلقة السحب بيده ويسحبها سحبا أفقيا هادئا بسرعة ثابتة، فيتمدد النابض ويتحرك المؤشر على التدريج ليبين قوة السحب بالنيوتن.</p></div>
    <div class="tool"><p><b>الميزان النابضي:</b> يقيس قوة السحب (قوة الشد) بالنيوتن، وأصغر تدريج فيه <span dir="ltr">0.1 N</span>.</p>
    <p><b>الشريط المتري:</b> يقيس إزاحة الصندوق من موضعه الابتدائي إلى موضعه النهائي بالسنتيمتر، بدقة <span dir="ltr">0.1 cm</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الإزاحة</b><span>x = xf − xi</span></div>
      <div class="ln lw"><b>الشغل بقوة ثابتة</b><span>W = F·x·cos θ</span></div>
      <div class="ln lw"><b>القوة في اتجاه الإزاحة (<bdi dir="ltr">θ = 0</bdi> و <bdi dir="ltr">cos 0 = 1</bdi>)</b><span>W = F·x</span></div>
      <div class="vfig"><svg viewBox="0 0 340 210" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="القوة والإزاحة في اتجاه واحد">
      <defs><marker id="wkO" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#F7931E"/></marker>
      <marker id="wkB" viewBox="0 0 10 10" refX="8" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563EB"/></marker>
      <linearGradient id="wkW" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#D9A066"/><stop offset="1" stop-color="#8B5A2B"/></linearGradient></defs>
      <rect x="10" y="120" width="320" height="14" rx="3" fill="#E9C894" stroke="#9A6A3A"/>
      <rect x="30" y="74" width="70" height="46" rx="5" fill="url(#wkW)" stroke="#5B3412" opacity=".35" stroke-dasharray="4 3"/>
      <rect x="200" y="74" width="70" height="46" rx="5" fill="url(#wkW)" stroke="#5B3412"/><text x="235" y="103" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" dir="ltr">m</text>
      <line x1="270" y1="97" x2="330" y2="97" stroke="#F7931E" stroke-width="4" marker-end="url(#wkO)"/><text x="300" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#C2410C" dir="ltr">F</text>
      <line x1="30" y1="152" x2="30" y2="140" stroke="var(--ink)" stroke-width="1.5"/><line x1="200" y1="152" x2="200" y2="140" stroke="var(--ink)" stroke-width="1.5"/>
      <line x1="32" y1="160" x2="196" y2="160" stroke="#2563EB" stroke-width="3.5" marker-end="url(#wkB)"/><text x="114" y="182" text-anchor="middle" font-size="13" font-weight="700" fill="#2563EB" dir="ltr">x = xf − xi</text>
      <text x="30" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)" dir="ltr">xi</text><text x="200" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)" dir="ltr">xf</text>
      <text x="170" y="204" text-anchor="middle" font-size="14" font-weight="700" fill="var(--ink)" dir="ltr">θ = 0  ,  W = F·x</text>
      </svg><div class="vcap">قوة السحب F في نفس اتجاه الإزاحة x، فالزاوية بينهما صفر، ويكون الشغل حاصل ضرب القوة في الإزاحة</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">W</span> الشغل، وهو كمية قياسية، ووحدته الجول <span dir="ltr">J = N·m</span></li>
      <li><span class="chip" dir="ltr">F</span> قوة السحب (قوة الشد في الخيط)، وتقاس بالميزان النابضي، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">x</span> إزاحة الصندوق، ووحدتها <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">xi, xf</span> الموضع الابتدائي والنهائي للصندوق على الشريط المتري، و <span dir="ltr">xi = 0</span></li>
      <li><span class="chip" dir="ltr">θ</span> الزاوية بين القوة والإزاحة، وهنا <span dir="ltr">θ = 0</span></li>
      </ul></div>
      ${convBox(['x(m) = x(cm) / 100'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 سحب جديد</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس قوة السحب (قوة الشد) بالميزان النابضي</h4>
    <div class="stage"><div id="gS"></div><svg id="gZ" viewBox="0 0 400 118"></svg><div class="hud"><span id="gSt"></span></div></div>
    <div class="row"><label for="gR">سحب الصندوق</label><output id="gO"></output><input id="gR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي ليتحرك الصندوق بسرعة ثابتة حتى نهاية السحب، ثم اقرأ الميزان النابضي من التدريج المكبر.</p>
    <div class="ans"><label>قراءتك للميزان النابضي، وهي قوة السحب (قوة الشد) F</label><input id="fIn" inputmode="decimal" dir="ltr" placeholder="N"><button type="button" class="go" id="fCk">تحقق</button><button type="button" class="rs" id="fHn">تلميح</button></div><div class="fb2" id="fFb"></div>
    <h4 class="sbh">ب) قياس الإزاحة بالشريط المتري</h4>
    <div class="stage"><div id="pS"></div><svg id="pZ" viewBox="0 0 400 110"></svg><div class="hud"><span id="pSt"></span></div></div>
    <div class="row"><label for="pR">مؤشر القياس</label><output id="pO"></output><input id="pR" type="range" min="0" max="120" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي على الشريط المتري من الموضع الابتدائي <bdi dir="ltr">xi = 0</bdi> حتى يلامس الحافة الخلفية للصندوق في موضعه النهائي.</p>
    <div class="ans"><label>قراءتك للموضع النهائي xf</label><input id="xIn" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="xCk">تحقق</button><button type="button" class="rs" id="xHn">تلميح</button></div><div class="fb2" id="xFb"></div>
    <h4 class="sbh">ج) حساب الشغل</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbW" style="white-space:pre-line;line-height:2">W = F·x</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب الشغل W = F·x بوحدة J</label><input id="cW" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="cWk">تحقق</button></div><div class="fb2" id="cWf"></div></div>
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>قوة السحب (الشد) F</td><td id="r1">—</td></tr>
    <tr><td>الإزاحة x</td><td id="r2">—</td></tr>
    <tr><td>الشغل W</td><td id="r3">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n)),r1=x=>Math.round(x*10)/10,K=1.3;
  let F,X,ok={},hF=false,hX=false;
  const XM=()=>X/100,WW=()=>F*XM();
  const moving=()=>+$('gR').value>=20,done=()=>+$('gR').value>=100;
  function newObj(){F=r1(1+Math.random()*2);X=r1(40+Math.random()*60);ok={};hF=false;hX=false;['gR','pR'].forEach(k=>$(k).value=0);
    ['fIn','xIn','cW'].forEach(k=>$(k).value='');['fFb','xFb','cWf'].forEach(fb0);gDraw();pDraw();sub();results()}
  function gDraw(){const v=+$('gR').value,mv=moving(),dn=done();
    $('gO').textContent=dn?'نهاية السحب':mv?'سرعة ثابتة':v>0?'يبدأ السحب':'';
    $('gSt').textContent=dn?'✓ توقف الصندوق في موضعه النهائي، اقرأ الميزان النابضي F من التدريج المكبر':mv?'الصندوق يتحرك بسرعة ثابتة…':v>0?'استمر في السحب…':'الصندوق ساكن في موضعه الابتدائي xi = 0';
    $('gS').innerHTML=wkScene(v/100*X*K,{F:mv?F.toFixed(1):(v>0?'…':'0.0'),pull:v>0&&!dn,v:mv&&!dn,xi:true});
    $('gZ').innerHTML=frZoom(mv?F:0,hF&&mv);pDraw()}
  function pVal(){let p=r1(+$('pR').value);if(p>X){p=X;$('pR').value=p}return p}
  const pTouch=()=>done()&&Math.abs(pVal()-X)<1e-6;
  function pDraw(){const dn=done(),p=pVal(),touch=pTouch(),hl=hX&&touch,c0=Math.max(0,Math.floor(X)-7),XX=c=>(c-c0)*26;
    $('pO').textContent=p.toFixed(1)+' cm';$('pSt').textContent=!dn?'اسحب الصندوق حتى نهاية السحب في الخطوة أ أولا':touch?'✓ المؤشر عند الحافة الخلفية للصندوق، اقرأ الموضع النهائي من الشريط':'اسحب المؤشر حتى يلامس الحافة الخلفية للصندوق';
    $('pS').innerHTML=wkScene(dn?X*K:0,{ptr:{p,touch},xi:true});
    let z=`<rect x="0" y="34" width="400" height="58" fill="#FEF3C7" stroke="#A16207"/>`;
    for(let m=Math.ceil(c0*10);m<=Math.floor((c0+15.4)*10);m++){const x=XX(m/10),big=m%10===0,mid=m%5===0,h=hl&&m===Math.round(X*10);z+=`<line x1="${x}" y1="34" x2="${x}" y2="${34+(big?22:mid?15:9)}" stroke="${h?'#2563EB':'#1F2937'}" stroke-width="${h?2.6:big?1.4:.8}"/>`;if(big)z+=`<text x="${x}" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${m/10}</text>`}
    if(dn){const xb=XX(X);z+=`<line x1="${xb}" y1="8" x2="${xb}" y2="98" stroke="#C2410C" stroke-width="2.2" stroke-dasharray="6 4"/><text x="${xb-6}" y="20" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">الحافة الخلفية للصندوق</text>`}
    const xp=XX(p);if(xp>=0&&xp<=400)z+=`<line x1="${xp}" y1="30" x2="${xp}" y2="96" stroke="#F7931E" stroke-width="3.5"/><path d="M${xp-7},104 L${xp},94 L${xp+7},104 Z" fill="#F7931E"/>`;
    z+=`<rect x="352" y="82" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="99" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="106" font-size="12" font-weight="700" fill="var(--muted)">تكبير الشريط المتري</text>`;
    $('pZ').innerHTML=z}
  function sub(){$('sbW').textContent=ok.f&&ok.x?['W = F·x',E(`F = ${F.toFixed(1)} N`),'x = xf − xi',E(`x = ${X.toFixed(1)} − 0 = ${X.toFixed(1)} cm = ${fx(XM(),3)} m`),E(`W = ${F.toFixed(1)} × ${fx(XM(),3)}`)].join('\n'):'W = F·x'}
  function results(){
    $('r1').textContent=ok.f?E(F.toFixed(1)+' N'):'—';$('r2').textContent=ok.x?E(fx(XM(),3)+' m'):'—';$('r3').textContent=ok.cW?E(fx(WW(),3)+' J'):'—';
    $('rNote').innerHTML=ok.cW?'الاستنتاج: الشغل المبذول يساوي حاصل ضرب قوة السحب (قوة الشد) في الإزاحة <span dir="ltr" style="white-space:nowrap">W = F·x</span>، لأن القوة في اتجاه الحركة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('gR').oninput=gDraw;$('pR').oninput=pDraw;
  $('fHn').onclick=()=>{hF=true;gDraw();fb('fFb',true,'تلميح: الأرقام على التدريج بالنيوتن، وبين كل رقمين 5 أقسام صغيرة كل قسم '+E('0.1 N')+'. اسحب الصندوق حتى يتحرك بسرعة ثابتة، ثم اقرأ الخط الأحمر تحت المؤشر.')};
  $('fCk').onclick=()=>{if(!moving())return fb('fFb',false,'اسحب المؤشر حتى يتحرك الصندوق بسرعة ثابتة أولا.');const v=num($('fIn').value);if(isNaN(v))return fb('fFb',false,'اكتب قراءتك بالنيوتن.');
    if(Math.abs(v-F)<0.01){ok.f=true;fb('fFb',true,'✓ قراءة صحيحة:\n'+E(`F = ${F.toFixed(1)} N`))}else fb('fFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('xHn').onclick=()=>{hX=true;pDraw();fb('xFb',true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل المؤشر، ثم احسب عدد الأقسام الصغيرة حتى الخط الأزرق.')};
  $('xCk').onclick=()=>{if(!done())return fb('xFb',false,'اسحب الصندوق حتى نهاية السحب في الخطوة أ أولا.');if(!pTouch())return fb('xFb',false,'اسحب المؤشر حتى يلامس الحافة الخلفية للصندوق أولا.');const v=num($('xIn').value);if(isNaN(v))return fb('xFb',false,'اكتب قراءتك بالسنتيمتر.');
    if(Math.abs(v-X)<0.05){ok.x=true;fb('xFb',true,'✓ قراءة صحيحة:\n'+E(`xf = ${X.toFixed(1)} cm`)+'\n'+E(`x = xf − xi = ${X.toFixed(1)} − 0 = ${X.toFixed(1)} cm = ${fx(XM(),3)} m`))}else fb('xFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('cWk').onclick=()=>{if(!(ok.f&&ok.x))return fb('cWf',false,'أكمل قياس القوة والإزاحة أولا.');const v=num($('cW').value);if(isNaN(v))return fb('cWf',false,'اكتب الناتج بوحدة J.');
    if(Math.abs(v-WW())/WW()<0.01){ok.cW=true;fb('cWf',true,'✓ إجابة صحيحة:\n'+E(`W = ${F.toFixed(1)} × ${fx(XM(),3)} = ${fx(WW(),3)} J`))}else fb('cWf',false,'✗ اكتب الإزاحة بوحدة المتر، ثم اضربها في قوة السحب F.');results()};
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function peScene(h,o){/* h ارتفاع أسفل الجسم (الثقل) عن سطح الطاولة بالسنتيمتر، والجسم (الثقل) معلق في ذراع الحامل المعملي */
  o=o||{};const BASE=300,K=1.7,T=14,RX=100,MX=210,MD=57,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g=`<defs><linearGradient id="peBl" x1="0" x2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>`;
  /* سطح الطاولة */
  g+=box(10,330,0,82,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* قاعدة الحامل وقضيبه */
  g+=box(56,156,42,80,T,T+6,'#334155','#64748B','#1F2937','#0F172A');
  g+=box(74,94,52,62,T+6,T+232,'#94A3B8','#E2E8F0','#64748B','#475569');
    const Z0=T+h*K,Z1=Z0+44,ZA=Z1+16,TX=MX+58,TD=MD;
  /* ذراع الحامل وماسكه والخطاف */
  g+=box(94,MX+4,55,59,ZA,ZA+5,'#94A3B8','#E2E8F0','#64748B','#475569');
  g+=box(70,98,48,66,ZA-6,ZA+11,'#1F2937','#475569','#0F172A','#0F172A');
  {const [a,b]=S(MX,MD,ZA),[,c]=S(MX,MD,Z1);g+=`<line x1="${a}" y1="${b}" x2="${a}" y2="${c-8}" stroke="#334155" stroke-width="2"/><path d="M${a},${c-12} a4,4 0 1 0 0.1,0" fill="none" stroke="#334155" stroke-width="2"/>`}
  /* أداة الشريط المتري الرأسي يمين الجسم (الثقل): الخطاف (الصفر) على سطح الطاولة، والشريط ممدود لأعلى، والعلبة في الأعلى */
  {const ZT=T+120*K;
   g+=box(TX,TX+14,TD,TD+2,T,ZT,'#FACC15','#FEF08A','#CA8A04','#A16207');
   for(let c=0;c<=120;c++){const [a,b]=S(TX,TD,T+c*K),w=c%10===0?9:c%5===0?6:3.5;g+=`<line x1="${a}" y1="${b}" x2="${a+w}" y2="${b}" stroke="#1F2937" stroke-width="${c%10?.55:1.1}"/>`;if(c%10===0&&c>0&&c<120)g+=`<text x="${a-3}" y="${b+3.5}" font-size="9.5" font-weight="800" text-anchor="end" fill="#1F2937" stroke="#fff" stroke-width="2.6" paint-order="stroke">${c}</text>`}
   {const [a,b]=S(TX,TD,T);g+=`<text x="${a-3}" y="${b+3.5}" font-size="9.5" font-weight="800" text-anchor="end" fill="#1F2937" stroke="#fff" stroke-width="2.6" paint-order="stroke">0</text>`;const p1=S(TX-2,TD-6,T),p2=S(TX+16,TD-6,T),p3=S(TX+16,TD+4,T),p4=S(TX-2,TD+4,T);g+=`<polygon points="${p1} ${p2} ${p3} ${p4}" fill="#F7931E" stroke="#9A3412" stroke-width=".9"/>`}
   g+=box(TX-5,TX+19,TD-6,TD+10,ZT,ZT+24,'#EA580C','#FB923C','#C2410C','#9A3412');{const [cx,cy]=S(TX+7,TD-6,ZT+12);g+=`<circle cx="${cx}" cy="${cy}" r="7.5" fill="#FDBA74" stroke="#9A3412" stroke-width="1.3"/><circle cx="${cx}" cy="${cy}" r="2.5" fill="#9A3412"/>`}g+=box(TX+2,TX+12,34,TD+4,ZT+24,ZT+27,'#1F2937','#475569','#0F172A','#000')}
  /* الجسم (الثقل) (أسطوانة) */
  const [cx,cb]=S(MX,MD,Z0),[,ct]=S(MX,MD,Z1),rx=20,ry=7;
  g+=`<path d="M${cx-rx},${ct} L${cx-rx},${cb} A${rx},${ry} 0 0 0 ${cx+rx},${cb} L${cx+rx},${ct} Z" fill="url(#peBl)" stroke="#1E3A8A"/><ellipse cx="${cx}" cy="${ct}" rx="${rx}" ry="${ry}" fill="#93C5FD" stroke="#1E3A8A"/><text x="${cx}" y="${(ct+cb)/2+6}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m</text>`;
  /* أسفل الجسم (الثقل) حتى الشريط المتري */
  if(h>0){const b=S(TX,TD,Z0);g+=`<line x1="${cx+rx}" y1="${cb}" x2="${b[0]}" y2="${b[1]}" stroke="#DC2626" stroke-width="1.6" stroke-dasharray="5 3"/>`}
  if(o.harr&&h>0){const a=S(MX-52,MD,T),b=S(MX-52,MD,Z0);g+=`<line x1="${a[0]}" y1="${a[1]-2}" x2="${b[0]}" y2="${b[1]+2}" stroke="#2563EB" stroke-width="2"/><path d="M${a[0]-5},${a[1]-10} L${a[0]},${a[1]-2} L${a[0]+5},${a[1]-10} M${b[0]-5},${b[1]+10} L${b[0]},${b[1]+2} L${b[0]+5},${b[1]+10}" stroke="#2563EB" stroke-width="2" fill="none"/><text x="${a[0]-18}" y="${(a[1]+b[1])/2+5}" font-size="15" font-weight="800" fill="#2563EB" direction="ltr">h</text>`}
  if(o.ptr){const [p,q]=S(TX+14,TD,T+o.ptr.p*K);g+=`<path d="M${p+14},${q-6} L${p+3},${q} L${p+14},${q+6} Z" fill="#F7931E"/><line x1="${p+3}" y1="${q}" x2="${p+30}" y2="${q}" stroke="#F7931E" stroke-width="2.5"/>`;if(o.ptr.touch)g+=`<circle cx="${p+3}" cy="${q}" r="7" fill="none" stroke="#16A34A" stroke-width="2.5"/>`}
  if(o.arr){const [a,b]=S(68,48,ZA+2);g+=`<path d="M${a-14},${b+10} v-26 m-5,7 l5,-7 l5,7 M${a-14},${b+18} v14 m-5,-7 l5,7 l5,-7" stroke="#F7931E" stroke-width="2.4" fill="none"/>`}
  if(o.lab){const [bx,by]=S(90,57,ZA+3);g+=lbl(...S(90,57,T+185),40,22,'الحامل المعملي','start')+lbl(bx,by,12,Math.min(by+50,BASE-60),'الماسك المزدوج','start')+lbl(...S(160,57,ZA+5),250,22,'ذراع الحامل','start')+lbl(cx,cb-4,cx-10,cb+22,'‏الجسم (الثقل)‏')+lbl(...S(TX+6,TD,T+15*K),330,BASE+26,'أداة الشريط المتري')+lbl(...S(60,60,T+6),60,BASE+26,'قاعدة الحامل')+lbl(...S(170,20,T),195,BASE+26,'سطح الطاولة')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?44:14)}" aria-label="الجسم (الثقل) معلق في ذراع حامل معملي وقياس ارتفاعه">${g}</svg>`}
function peLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">إيجاد طاقة الوضع لجسم وعلاقتها بالارتفاع باستخدام القانون <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span></p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>الميزان الرقمي</i> · g</span><span class="tag">الارتفاع h: <i>أداة الشريط المتري</i> · cm</span><span class="tag dv">طاقة الوضع PE: <i>كمية مشتقة</i> · J</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الحامل المعملي والجسم (الثقل) والميزان الرقمي وأداة الشريط المتري.</li>
    <li>قياس كتلة الجسم (الثقل) <span dir="ltr">m</span> بالميزان الرقمي.</li>
    <li>قياس ارتفاع الجسم (الثقل) <span dir="ltr">h</span> عن سطح الطاولة بأداة الشريط المتري عند ارتفاعين مختلفين.</li>
    <li>حساب طاقة الوضع <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span> عند كل ارتفاع.</li>
    <li>المقارنة بين طاقتي الوضع، وبيان أثر زيادة الارتفاع على طاقة الوضع.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${peScene(45,{lab:true,harr:true})}</div><div class="vcap">الجسم (الثقل) معلق في ذراع حامل معملي: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> حامل معملي على سطح الطاولة، فيه ذراع أفقية بماسك يتحرك على القضيب لأعلى ولأسفل، ويعلق الجسم (الثقل) في خطاف طرف الذراع. وأداة الشريط المتري ممدودة رأسيا يمين الجسم (الثقل): علبتها في الأعلى، وخطافها (الصفر) على سطح الطاولة، فيقاس الارتفاع من الأسفل إلى الأعلى.</p></div>
    <div class="tool"><p><b>الحامل المعملي:</b> قاعدة ثقيلة وقضيب رأسي، عليه ماسك يثبت الذراع على أي ارتفاع، فيبقى الجسم (الثقل) ثابتا أثناء القياس.</p>
    <p><b>الجسم (الثقل):</b> ثقل ذو خطاف <span dir="ltr">(Hooked Mass)</span>، وهو أسطوانة معدنية معلومة الكتلة لها خطاف في أعلاها، ويسمى في المراجع الكتلة المعلقة <span dir="ltr">(Hanging Mass)</span>.</p>
    <p><b>الميزان الرقمي:</b> يقيس كتلة الجسم (الثقل) بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>أداة الشريط المتري:</b> شريط رأسي يقاس به ارتفاع أسفل الجسم (الثقل) عن سطح الطاولة بالسنتيمتر، بدقة <span dir="ltr">0.1 cm</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl">      <div class="ln lw"><b>الوزن</b><span>W = m·g</span></div>
      <div class="ln lw"><b>طاقة الوضع (الوزن × الارتفاع)</b><span>PE = W·h = m·g·h</span></div>
      <p class="slh">ℹ️ طاقة الوضع هي الطاقة المختزنة في الجسم (الثقل) بسبب ارتفاعه، وتقاس بالنسبة لمستوى إسناد، وهنا مستوى الإسناد سطح الطاولة <bdi dir="ltr">h = 0</bdi>.</p>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">PE</span> طاقة الوضع، ووحدتها الجول <span dir="ltr">J = N·m</span></li>
      <li><span class="chip" dir="ltr">m</span> كتلة الجسم (الثقل)، وتقاس بالميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">W</span> وزن الجسم (الثقل)، ووحدته <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">h</span> الارتفاع: المسافة الرأسية من سطح الطاولة (مستوى الإسناد) إلى السطح السفلي للجسم (الثقل)، ويقرأ مباشرة من أداة الشريط المتري لأن صفرها عند سطح الطاولة، ووحدته <span dir="ltr">m</span></li>
      </ul></div>
      ${convBox(['m(kg) = m(g) / 1000','h(m) = h(cm) / 100'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 جسم جديد</button></div>
  <div class="ctl"><h3>5.1 قياس كتلة الجسم (الثقل) بالميزان الرقمي</h3>
    <p class="slh">ℹ️ نستخدم نفس الجسم (الثقل) في المحاولتين، فتبقى كتلته ثابتة.</p>
    <div class="stage"><div id="bl"></div></div>
    <div class="ans"><label>قراءتك لكتلة الجسم (الثقل) m</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk">تحقق</button></div><div class="fb2" id="mFb"></div>
  </div>
  <div class="ctl"><h3>5.2 المحاولة الأولى: ارتفاع منخفض</h3>
    <h4 class="sbh">أ) رفع الجسم (الثقل) وقياس ارتفاعه بأداة الشريط المتري</h4>
    <div class="stage"><div id="gS1"></div><svg id="pZ1" viewBox="0 0 400 110"></svg><div class="hud"><span id="gSt1"></span></div></div>
    <div class="row"><label for="gR1">رفع ذراع الحامل</label><output id="gO1"></output><input id="gR1" type="range" min="0" max="100" step="1" value="0"></div>
    <div class="row"><label for="pR1">مؤشر القياس</label><output id="pO1"></output><input id="pR1" type="range" min="0" max="100" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب مؤشر «رفع ذراع الحامل» حتى نهايته ليرتفع الجسم (الثقل)، وثبت الماسك المزدوج، ثم اسحب «مؤشر القياس» على أداة الشريط المتري من صفرها عند سطح الطاولة حتى يلامس السطح السفلي للجسم (الثقل).</p>
    <div class="ans"><label>قراءتك للارتفاع h بوحدة m</label><input id="hIn1" inputmode="decimal" dir="ltr" placeholder="m"><button type="button" class="go" id="hCk1">تحقق</button><button type="button" class="rs" id="hHn1">تلميح</button></div><div class="fb2" id="hFb1"></div>
    <h4 class="sbh">ب) حساب طاقة الوضع</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbP1" style="white-space:pre-line;line-height:2">PE = m·g·h</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب طاقة الوضع PE = m·g·h بوحدة J</label><input id="cP1" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="cPk1">تحقق</button></div><div class="fb2" id="cPf1"></div></div>
  </div>
  <div class="ctl"><h3>5.3 المحاولة الثانية: ارتفاع أعلى</h3>
    <h4 class="sbh">أ) رفع الجسم (الثقل) وقياس ارتفاعه بأداة الشريط المتري</h4>
    <div class="stage"><div id="gS2"></div><svg id="pZ2" viewBox="0 0 400 110"></svg><div class="hud"><span id="gSt2"></span></div></div>
    <div class="row"><label for="gR2">رفع ذراع الحامل</label><output id="gO2"></output><input id="gR2" type="range" min="0" max="100" step="1" value="0"></div>
    <div class="row"><label for="pR2">مؤشر القياس</label><output id="pO2"></output><input id="pR2" type="range" min="0" max="100" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب مؤشر «رفع ذراع الحامل» حتى نهايته ليرتفع الجسم (الثقل)، وثبت الماسك المزدوج، ثم اسحب «مؤشر القياس» على أداة الشريط المتري من صفرها عند سطح الطاولة حتى يلامس السطح السفلي للجسم (الثقل).</p>
    <div class="ans"><label>قراءتك للارتفاع h بوحدة m</label><input id="hIn2" inputmode="decimal" dir="ltr" placeholder="m"><button type="button" class="go" id="hCk2">تحقق</button><button type="button" class="rs" id="hHn2">تلميح</button></div><div class="fb2" id="hFb2"></div>
    <h4 class="sbh">ب) حساب طاقة الوضع</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbP2" style="white-space:pre-line;line-height:2">PE = m·g·h</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب طاقة الوضع PE = m·g·h بوحدة J</label><input id="cP2" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="cPk2">تحقق</button></div><div class="fb2" id="cPf2"></div></div>
  </div>
  <div class="ctl"><h3>5.4 المقارنة بين طاقتي الوضع عند الارتفاعين</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل المحاولتين أولا</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <p class="slh" id="rM">كتلة الجسم (الثقل) m: —</p>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>المحاولة الأولى</th><th>المحاولة الثانية</th></tr></thead>
    <tbody><tr><td>الارتفاع h</td><td id="rh1">—</td><td id="rh2">—</td></tr>
    <tr><td>طاقة الوضع PE</td><td id="rp1">—</td><td id="rp2">—</td></tr></tbody></table></div>
    <div id="peC"></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n)),r1=x=>Math.round(x*10)/10,G=9.8;
  let M,H={},ok={},hX={};
  const KG=()=>M/1000,HM=k=>H[k]/100,PE=k=>KG()*G*HM(k);
  const done=k=>+$('gR'+k).value>=100;
  function newObj(){M=100+10*Math.floor(Math.random()*41);H[1]=r1(20+Math.random()*25);H[2]=r1(H[1]+20+Math.random()*25);ok={};hX={};
    [1,2].forEach(k=>{['gR','pR'].forEach(i=>$(i+k).value=0);['hIn','cP'].forEach(i=>$(i+k).value='');['hFb','cPf'].forEach(i=>fb0(i+k))});
    $('mIn').value='';fb0('mFb');$('bl').innerHTML=awBal(M,'m');draw(1);draw(2);sub();results()}
  function pVal(k){let p=r1(+$('pR'+k).value);if(p>H[k]){p=H[k];$('pR'+k).value=p}return p}
  const pTouch=k=>done(k)&&Math.abs(pVal(k)-H[k])<1e-6;
  function draw(k){const v=+$('gR'+k).value,dn=done(k),p=pVal(k),touch=pTouch(k),hl=hX[k]&&touch,h=v/100*H[k],HH=H[k];
    $('gO'+k).textContent=dn?'استقر الجسم (الثقل)':v>0?'يرتفع…':'';$('pO'+k).textContent=p.toFixed(1)+' cm';
    $('gSt'+k).textContent=!dn?(v>0?'ذراع الحامل يرتفع بالجسم (الثقل)…':'الجسم (الثقل) على سطح الطاولة، ارفع ذراع الحامل بمؤشر «رفع ذراع الحامل»'):touch?'✓ المؤشر عند أسفل الجسم (الثقل)، اقرأ الارتفاع من الشريط المتري':'اسحب «مؤشر القياس» حتى يلامس أسفل الجسم (الثقل)';
    $('gS'+k).innerHTML=peScene(h,{ptr:{p,touch},arr:!dn});
    const c0=Math.max(0,Math.floor(HH)-7),XX=c=>(c-c0)*26;
    let z=`<rect x="0" y="34" width="400" height="58" fill="#FEF3C7" stroke="#A16207"/>`;
    for(let m=Math.ceil(c0*10);m<=Math.floor((c0+15.4)*10);m++){const x=XX(m/10),big=m%10===0,mid=m%5===0,hh=hl&&m===Math.round(HH*10);z+=`<line x1="${x}" y1="34" x2="${x}" y2="${34+(big?22:mid?15:9)}" stroke="${hh?'#2563EB':'#1F2937'}" stroke-width="${hh?2.6:big?1.4:.8}"/>`;if(big)z+=`<text x="${x}" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${m/10}</text>`}
    if(dn){const xb=XX(HH);z+=`<line x1="${xb}" y1="8" x2="${xb}" y2="98" stroke="#C2410C" stroke-width="2.2" stroke-dasharray="6 4"/><text x="${xb-6}" y="20" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">‏أسفل الجسم (الثقل)‏</text>`}
    const xp=XX(p);if(xp>=0&&xp<=400)z+=`<line x1="${xp}" y1="30" x2="${xp}" y2="96" stroke="#F7931E" stroke-width="3.5"/><path d="M${xp-7},104 L${xp},94 L${xp+7},104 Z" fill="#F7931E"/>`;
    z+=`<rect x="352" y="82" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="99" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="106" font-size="12" font-weight="700" fill="var(--muted)">تكبير الشريط المتري</text>`;
    $('pZ'+k).innerHTML=z}
  function sub(){[1,2].forEach(k=>{$('sbP'+k).textContent=ok.m&&ok['h'+k]?['PE = m·g·h',E(`m = ${M} g = ${fx(KG(),3)} kg`),E(`h = ${H[k].toFixed(1)} cm = ${fx(HM(k),3)} m`),E(`PE = ${fx(KG(),3)} × 9.8 × ${fx(HM(k),3)}`)].join('\n'):'PE = m·g·h'})}
  function chart(){if(!(ok.cP1&&ok.cP2)){$('peC').innerHTML='';return}
    const hs=[0,HM(1),HM(2)],ps=hs.map(h=>KG()*G*h),hx=Math.ceil((HM(2)+0.3)*5)/5,pxm=Math.ceil(PE(2)*2+0.0001)/2;
    const X0=48,Y0=232,W=300,H=200,X=h=>X0+h/hx*W,Y=p=>Y0-p/pxm*H;let s='';
    const nh=Math.round(hx/0.2),np=Math.round(pxm/0.5);
    for(let i=0;i<=nh;i++){const h=i*0.2;s+=`<line x1="${X(h)}" y1="${Y0}" x2="${X(h)}" y2="${Y0-H}" stroke="var(--line)"/><text x="${X(h)}" y="${Y0+16}" font-size="11" text-anchor="middle" fill="var(--ink)">${h.toFixed(1)}</text>`}
    for(let i=0;i<=np;i++){const p=i*0.5;s+=`<line x1="${X0}" y1="${Y(p)}" x2="${X0+W}" y2="${Y(p)}" stroke="var(--line)"/><text x="${X0-6}" y="${Y(p)+4}" font-size="11" text-anchor="end" fill="var(--ink)">${p.toFixed(1)}</text>`}
    s+=`<line x1="${X0}" y1="${Y0}" x2="${X0+W+8}" y2="${Y0}" stroke="var(--ink)" stroke-width="1.6"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0-H-8}" stroke="var(--ink)" stroke-width="1.6"/>`;
    s+=`<text x="${X0+W}" y="${Y0+34}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">h (m)</text><text x="${X0+4}" y="${Y0-H-12}" font-size="13" font-weight="700" fill="var(--ink)">PE (J)</text>`;
    {const he=Math.min(hx,pxm/(KG()*G));s+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(he)}" y2="${Y(KG()*G*he)}" stroke="#F7931E" stroke-width="3"/>`}
    hs.forEach((h,k)=>{s+=`<circle cx="${X(h)}" cy="${Y(ps[k])}" r="6" fill="${k?'#2563EB':'var(--ink)'}" stroke="#fff" stroke-width="2"/>`;if(k)s+=`<text x="${X(h)+10}" y="${Y(ps[k])+18}" font-size="11.5" font-weight="700" fill="#2563EB" direction="ltr" text-anchor="start">${k===1?'المحاولة الأولى':'المحاولة الثانية'}</text><text x="${X(h)+10}" y="${Y(ps[k])+33}" font-size="11" fill="#2563EB">(${fx(h,3)} m , ${fx(ps[k],3)} J)</text>`});
    $('peC').innerHTML=`<div class="stage"><svg viewBox="0 0 380 280" style="direction:ltr;display:block;width:100%;height:auto" aria-label="رسم طاقة الوضع مع الارتفاع">${s}</svg></div><div class="vcap">رسم طاقة الوضع مع الارتفاع: خط مستقيم يمر بنقطة الأصل، فطاقة الوضع تتناسب طرديا مع الارتفاع</div>`}
  function results(){
    $('rM').textContent='كتلة الجسم (الثقل) m: '+(ok.m?E(fx(KG(),3)+' kg'):'—')+' (نفسها في المحاولتين)';
    [1,2].forEach(k=>{$('rh'+k).textContent=ok['h'+k]?E(fx(HM(k),3)+' m'):'—';$('rp'+k).textContent=ok['cP'+k]?E(fx(PE(k),3)+' J'):'—'});
    const all=ok.cP1&&ok.cP2;
    $('cmpS').textContent=all?['المحاولة الأولى (ارتفاع منخفض):',E(`h = ${fx(HM(1),3)} m`),E(`PE = ${fx(PE(1),3)} J`),'المحاولة الثانية (ارتفاع أعلى):',E(`h = ${fx(HM(2),3)} m`),E(`PE = ${fx(PE(2),3)} J`)].join('\n'):'أكمل المحاولتين أولا';
    $('cmpN').textContent=all?'طاقة الوضع في المحاولة الثانية أكبر، لأن الجسم (الثقل) نفسه رفع إلى ارتفاع أعلى.':'';
    chart();$('rNote').innerHTML=all?'الاستنتاج: كلما زاد ارتفاع الجسم (الثقل) زادت طاقة الوضع، لأن طاقة الوضع تتناسب طرديا مع الارتفاع <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span>.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('mCk').onclick=()=>{const v=num($('mIn').value);if(isNaN(v))return fb('mFb',false,'اكتب قراءتك بالجرام.');
    if(Math.abs(v-M)<0.5){ok.m=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`m = ${M} g = ${fx(KG(),3)} kg`))}else fb('mFb',false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()};
  [1,2].forEach(k=>{
    $('gR'+k).oninput=()=>draw(k);$('pR'+k).oninput=()=>draw(k);
    $('hHn'+k).onclick=()=>{hX[k]=true;draw(k);fb('hFb'+k,true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل المؤشر، ثم احسب عدد الأقسام الصغيرة حتى الخط الأزرق، ثم اقسم القراءة على 100 لتصبح بوحدة '+E('m')+'.')};
    $('hCk'+k).onclick=()=>{if(!done(k))return fb('hFb'+k,false,'ارفع ذراع الحامل بمؤشر «رفع ذراع الحامل» حتى نهايته أولا.');if(!pTouch(k))return fb('hFb'+k,false,'اسحب «مؤشر القياس» حتى يلامس أسفل الجسم (الثقل) أولا.');const v=num($('hIn'+k).value);if(isNaN(v))return fb('hFb'+k,false,'اكتب قراءتك بوحدة m.');
      if(Math.abs(v-H[k]/100)<0.0005){ok['h'+k]=true;fb('hFb'+k,true,'✓ قراءة صحيحة:\n'+E(`h = ${H[k].toFixed(1)} cm = ${fx(HM(k),3)} m`))}else fb('hFb'+k,false,'✗ القراءة غير صحيحة، اقرأ الشريط المتري بالسنتيمتر ثم اقسم على 100 لتصبح بوحدة m، أو استخدم التلميح.');sub();results()};
    $('cPk'+k).onclick=()=>{if(!(ok.m&&ok['h'+k]))return fb('cPf'+k,false,'أكمل قياس الكتلة والارتفاع أولا.');const v=num($('cP'+k).value);if(isNaN(v))return fb('cPf'+k,false,'اكتب الناتج بوحدة J.');
      if(Math.abs(v-PE(k))/PE(k)<0.01){ok['cP'+k]=true;fb('cPf'+k,true,'✓ إجابة صحيحة:\n'+E(`PE = ${fx(KG(),3)} × 9.8 × ${fx(HM(k),3)} = ${fx(PE(k),3)} J`))}else fb('cPf'+k,false,'✗ اكتب الكتلة بوحدة kg والارتفاع بوحدة m، ثم اضرب الكتلة في 9.8 في الارتفاع.');results()}});
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function ceScene(h,s,o){/* h الارتفاع (سم) من شعاع البوابة إلى أسفل الجسم، s المسافة التي سقطها الجسم (سم) */
  o=o||{};const BASE=330,K=1.55,T=14,G=T+56,RX=100,MX=210,MD=57,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  let g=`<defs><linearGradient id="ceBl" x1="0" x2="1"><stop offset="0" stop-color="#BFDBFE"/><stop offset=".5" stop-color="#3B82F6"/><stop offset="1" stop-color="#1E3A8A"/></linearGradient></defs>`;
  const ZT=G+h*K,ZA=ZT+44+16,zb=Math.max(T+5,ZT-s*K),zt=zb+44,rel=s>0;
  /* الطاولة وقاعدة الحامل وقضيبه */
  g+=box(10,330,0,82,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  g+=box(56,156,42,80,T,T+6,'#334155','#64748B','#1F2937','#0F172A');
  g+=box(86,94,54,60,T+6,ZA+30,'#94A3B8','#E2E8F0','#64748B','#475569');
  /* وسادة الاستقبال */
  g+=box(MX-26,MX+26,MD-20,MD+6,T,T+5,'#1F2937','#F7931E','#C2410C','#9A3412');
  /* البوابة الضوئية وذراعها (خلف الجسم) */
  g+=box(94,MX-24,58,62,G-3,G+2,'#94A3B8','#E2E8F0','#64748B','#475569');
  g+=box(MX-30,MX+30,MD+8,MD+14,G-10,G+10,'#475569','#94A3B8','#334155','#1F2937');
  g+=box(MX-30,MX-24,MD-12,MD+14,G-10,G+10,'#475569','#94A3B8','#334155','#1F2937');
  {const a=S(MX-24,MD,G),b=S(MX+24,MD,G);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#EF4444" stroke-width="1.8" stroke-dasharray="4 3"/><circle cx="${a[0]}" cy="${a[1]}" r="2.6" fill="#EF4444" stroke="#7F1D1D"/>`}
  /* الجسم (أسطوانة) */
  const [cx,cb]=S(MX,MD,zb),[,ct]=S(MX,MD,zt),rx=20,ry=7;
  g+=`<path d="M${cx-rx},${ct} L${cx-rx},${cb} A${rx},${ry} 0 0 0 ${cx+rx},${cb} L${cx+rx},${ct} Z" fill="url(#ceBl)" stroke="#1E3A8A"/><ellipse cx="${cx}" cy="${ct}" rx="${rx}" ry="${ry}" fill="#93C5FD" stroke="#1E3A8A"/><text x="${cx}" y="${(ct+cb)/2+6}" font-size="13" font-weight="800" text-anchor="middle" fill="#fff" direction="ltr">m</text>`;
  /* قرص حديدي أعلى الجسم يلتصق بالمغناطيس */
  g+=box(MX-9,MX+9,MD-6,MD+6,zt,zt+3,'#64748B','#94A3B8','#475569','#1F2937');
  /* الجانب الأمامي للبوابة */
  g+=box(MX+24,MX+30,MD-12,MD+14,G-10,G+10,'#475569','#94A3B8','#334155','#1F2937');
  /* ذراع الحامل والمغناطيس الكهربائي */
  g+=box(94,MX+4,55,59,ZA,ZA+5,'#94A3B8','#E2E8F0','#64748B','#475569');
  g+=box(82,98,50,64,ZA-6,ZA+11,'#1F2937','#475569','#0F172A','#0F172A');
  /* المغناطيس الكهربائي: قلب حديدي ملفوف بسلك نحاسي في طرف الذراع، يمسك القرص الحديدي أعلى الجسم ما دام التيار يمر، وعند فصل التيار بالمفتاح يسقط الجسم */
  {const on=!rel;g+=box(MX-11,MX+11,MD-8,MD+8,ZA-12,ZA-9,'#334155','#64748B','#1F2937','#0F172A');
   g+=box(MX-11,MX+11,MD-8,MD+8,ZA-9,ZA+4,'#D97706','#F59E0B','#B45309','#78350F');
   for(let z=ZA-7;z<=ZA+2;z+=2.2){const [x1,y1]=S(MX-11,MD-8,z),[x2,y2]=S(MX+11,MD-8,z);g+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#78350F" stroke-width=".7"/>`}
   {const [lx,ly]=S(MX+8,MD-8,ZA+1);g+=`<circle cx="${lx}" cy="${ly}" r="2.6" fill="${on?'#22C55E':'#475569'}" stroke="#14532D" stroke-width=".8"/>`}
   const w=[S(MX,MD,ZA+4),S(MX-24,MD,ZA+12),S(100,MD,ZA+12),S(97,50,ZA+2),S(97,50,T+12),S(44,17,T+9)];
   g+=`<path d="M${w[0]} Q${w[1]} ${w[2]} L${w[3]} L${w[4]} Q${S(70,30,T+10)} ${w[5]}" fill="none" stroke="#1F2937" stroke-width="1.6"/>`;
   g+=box(18,50,8,26,T,T+9,'#1F2937','#475569','#0F172A','#000');
   {const k0=S(34,17,T+9),k1=on?S(29,17,T+17):S(40,17,T+17);g+=`<line x1="${k0[0]}" y1="${k0[1]}" x2="${k1[0]}" y2="${k1[1]}" stroke="#CBD5E1" stroke-width="2.6" stroke-linecap="round"/><circle cx="${k1[0]}" cy="${k1[1]}" r="2.8" fill="${on?'#22C55E':'#DC2626'}" stroke="#0F172A" stroke-width=".8"/>`}}
  /* المسطرة المترية: صفرها عند شعاع البوابة */
  g+=box(94,RX,56,60,G+40*K,G+40*K+6,'#334155','#64748B','#1F2937','#0F172A');
  g+=box(RX,RX+12,57,61,G-4,G+102*K,'#FCD34D','#FEF3C7','#D97706','#A16207');
  for(let c=0;c<=100;c++){const [a,b]=S(RX,57,G+c*K),w=c%10===0?9:c%5===0?6:3;g+=`<line x1="${a}" y1="${b}" x2="${a+w}" y2="${b}" stroke="#1F2937" stroke-width="${c%10?.5:1}"/>`;if(c%10===0)g+=`<text x="${a-3}" y="${b+3.5}" font-size="9" font-weight="700" text-anchor="end" fill="#1F2937" stroke="#fff" stroke-width="2.6" paint-order="stroke">${c}</text>`}
  /* أسفل الجسم حتى المسطرة */
  if(!rel){const b=S(RX+12,57,ZT);g+=`<line x1="${cx-rx}" y1="${cb}" x2="${b[0]}" y2="${b[1]}" stroke="#DC2626" stroke-width="1.6" stroke-dasharray="5 3"/>`}
  if(o.harr&&!rel){const a=S(MX+44,MD,G),b=S(MX+44,MD,ZT);g+=`<line x1="${a[0]}" y1="${a[1]-2}" x2="${b[0]}" y2="${b[1]+2}" stroke="#2563EB" stroke-width="2"/><path d="M${a[0]-5},${a[1]-10} L${a[0]},${a[1]-2} L${a[0]+5},${a[1]-10} M${b[0]-5},${b[1]+10} L${b[0]},${b[1]+2} L${b[0]+5},${b[1]+10}" stroke="#2563EB" stroke-width="2" fill="none"/><text x="${a[0]+8}" y="${(a[1]+b[1])/2+5}" font-size="15" font-weight="800" fill="#2563EB" direction="ltr">h</text>`}
  if(rel&&s<h){const [a,b]=S(MX+36,MD,zb+22);g+=`<path d="M${a},${b-12} v22 m-5,-7 l5,7 l5,-7" stroke="#2563EB" stroke-width="2.4" fill="none"/>`}
  if(o.ptr){const [p,q]=S(RX+12,57,G+o.ptr.p*K);g+=`<path d="M${p+14},${q-6} L${p+3},${q} L${p+14},${q+6} Z" fill="#F7931E"/><line x1="${p+3}" y1="${q}" x2="${p+30}" y2="${q}" stroke="#F7931E" stroke-width="2.5"/>`;if(o.ptr.touch)g+=`<circle cx="${p+3}" cy="${q}" r="7" fill="none" stroke="#16A34A" stroke-width="2.5"/>`}
  /* عداد البوابة الضوئية */
  {g+=box(272,332,2,24,T,T+40,'#334155','#475569','#1F2937','#0F172A');const s1=S(276,2,T+6),s2=S(328,2,T+34);
   g+=`<rect x="${s1[0]}" y="${s2[1]}" width="${s2[0]-s1[0]}" height="${s1[1]-s2[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/><text x="${(s1[0]+s2[0])/2}" y="${(s1[1]+s2[1])/2+4}" font-size="10" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.v||'-.--'} m/s</text>`;
   const w=S(MX+30,MD,G),k=S(272,14,T+30);g+=`<path d="M${w[0]},${w[1]} C${w[0]+18},${w[1]+10} ${k[0]-10},${k[1]-10} ${k[0]},${k[1]}" fill="none" stroke="#1F2937" stroke-width="2"/>`}
  if(o.lab){const [bx,by]=S(MX,MD,ZA);g+=lbl(...S(90,57,ZA+24),30,22,'الحامل المعملي','start')+lbl(...S(MX+2,MD-8,ZA-3),250,22,'المغناطيس الكهربائي','start')+lbl(...S(30,17,T+9),8,BASE-96,'مفتاح التيار','start')+lbl(cx+rx-4,(ct+cb)/2,300,ZA>200?96:120,'‏الجسم (الثقل)‏','start')+lbl(...S(RX+6,57,G+60*K),6,BASE-150,'المسطرة المترية','start')+lbl(...S(MX-27,MD-12,G),80,BASE+26,'البوابة الضوئية')+lbl(...S(MX+10,MD-12,T+5),200,BASE+26,'وسادة الاستقبال')+lbl(...S(300,2,T+20),340,BASE+26,'عداد البوابة')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?44:14)}" aria-label="إفلات جسم من ارتفاع فوق بوابة ضوئية">${g}</svg>`}
function ceLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">التحقق من حفظ الطاقة الميكانيكية لجسم ساقط سقوطا حرا</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>الميزان الرقمي</i> · g</span><span class="tag">الارتفاع h: <i>المسطرة المترية</i> · cm</span><span class="tag">السرعة v: <i>البوابة الضوئية</i> · m/s</span><span class="tag dv">الطاقة PE و KE: <i>كمية مشتقة</i> · J</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الحامل المعملي والمغناطيس الكهربائي والبوابة الضوئية والمسطرة المترية والميزان الرقمي.</li>
    <li>قياس كتلة الجسم (الثقل) <span dir="ltr">m</span> وارتفاع إفلاته <span dir="ltr">h</span>.</li>
    <li>قياس سرعة الجسم (الثقل) <span dir="ltr">v</span> عند البوابة الضوئية.</li>
    <li>حساب طاقة الوضع <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span> وطاقة الحركة <span dir="ltr" style="white-space:nowrap">KE = ½·m·v²</span>.</li>
    <li>المقارنة بينهما للتحقق من حفظ الطاقة الميكانيكية.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${ceScene(50,0,{lab:true,harr:true})}</div><div class="vcap">إفلات جسم فوق بوابة ضوئية: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> الجسم (الثقل) ملتصق بالمغناطيس الكهربائي في طرف ذراع الحامل المعملي، وتحته بوابة ضوئية مثبتة على الحامل، ثم وسادة استقبال على الطاولة. صفر المسطرة المترية عند شعاع البوابة الضوئية.</p></div>
    <div class="tool"><p><b>المغناطيس الكهربائي:</b> قلب حديدي ملفوف بسلك نحاسي، يمسك الجسم (الثقل) من القرص الحديدي أعلاه ما دام التيار يمر فيه، وعند فصل التيار بالمفتاح يسقط الجسم من السكون دون دفع <span dir="ltr">(Vi = 0)</span>.</p>
    <p><b>البوابة الضوئية (Photogate):</b> مضبوطة على وضع قياس السرعة، فتعرض سرعة الجسم لحظة قطعه لشعاعها مباشرة بوحدة <span dir="ltr">m/s</span>.</p>
    <p><b>المسطرة المترية:</b> يقاس بها ارتفاع أسفل الجسم (الثقل) فوق شعاع البوابة بدقة <span dir="ltr">0.1 cm</span>.</p>
    <p><b>الميزان الرقمي:</b> يقيس كتلة الجسم (الثقل) بالجرام بدقة <span dir="ltr">1 g</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl">      <div class="ln lw"><b>طاقة الوضع عند الإفلات (الجسم ساكن، فطاقة حركته صفر)</b><span>PE = m·g·h</span></div>
      <div class="ln lw"><b>طاقة الحركة عند البوابة الضوئية (مستوى الإسناد، فطاقة الوضع صفر)</b><span>KE = ½·m·v²</span></div>
      <div class="ln lw"><b>الطاقة الميكانيكية</b><span>ME = PE + KE</span></div>
      <div class="ln lw"><b>حفظ الطاقة الميكانيكية (بإهمال مقاومة الهواء)</b><span>MEi = MEf  ⟹  m·g·h = ½·m·v²</span></div>
      <div class="vfig"><svg viewBox="0 0 340 230" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="تحول طاقة الوضع إلى طاقة حركة">
      <rect x="20" y="186" width="300" height="2" fill="var(--ink)"/>
      <rect x="44" y="46" width="44" height="140" rx="4" fill="#2563EB"/><rect x="104" y="184" width="44" height="2" fill="#16A34A"/>
      <rect x="192" y="184" width="44" height="2" fill="#2563EB"/><rect x="252" y="46" width="44" height="140" rx="4" fill="#16A34A"/>
      <text x="66" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="#2563EB" dir="ltr">PE</text><text x="126" y="176" text-anchor="middle" font-size="13" font-weight="800" fill="#16A34A" dir="ltr">KE = 0</text>
      <text x="214" y="176" text-anchor="middle" font-size="13" font-weight="800" fill="#2563EB" dir="ltr">PE = 0</text><text x="274" y="38" text-anchor="middle" font-size="13" font-weight="800" fill="#16A34A" dir="ltr">KE</text>
      <text x="96" y="208" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">عند الإفلات</text><text x="244" y="208" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">عند البوابة الضوئية</text>
      <path d="M150,110 H186 m-8,-6 l8,6 l-8,6" stroke="#F7931E" stroke-width="3" fill="none"/>
      </svg><div class="vcap">طاقة الوضع عند الإفلات تتحول إلى طاقة حركة عند البوابة الضوئية، والطاقة الميكانيكية ثابتة</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m</span> كتلة الجسم (الثقل)، وتقاس بالميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      <li><span class="chip" dir="ltr">h</span> الارتفاع: المسافة الرأسية من شعاع البوابة الضوئية إلى السطح السفلي للجسم (الثقل) قبل سقوطه، ويقرأ مباشرة من المسطرة المترية لأن صفرها عند الشعاع، ووحدته <span dir="ltr">m</span></li>
      <li><span class="chip" dir="ltr">v</span> سرعة الجسم (الثقل) عند البوابة الضوئية، ووحدتها <span dir="ltr">m/s</span></li>
      <li><span class="chip" dir="ltr">PE</span> طاقة الوضع، و <span class="chip" dir="ltr">KE</span> طاقة الحركة، ووحدتهما الجول <span dir="ltr">J</span></li>
      <li><span class="chip" dir="ltr">ME</span> الطاقة الميكانيكية، وهي مجموع طاقتي الوضع والحركة، ووحدتها <span dir="ltr">J</span></li>
      </ul></div>
      ${convBox(['m(kg) = m(g) / 1000','h(m) = h(cm) / 100'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 جسم جديد</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس كتلة الجسم (الثقل) بالميزان الرقمي</h4>
    <div class="stage"><div id="bl"></div></div>
    <div class="ans"><label>قراءتك لكتلة الجسم (الثقل) m</label><input id="mIn" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="mCk">تحقق</button></div><div class="fb2" id="mFb"></div>
    <h4 class="sbh">ب) قياس الارتفاع بالمسطرة المترية</h4>
    <div class="stage"><div id="pS"></div><svg id="pZ" viewBox="0 0 400 110"></svg><div class="hud"><span id="pSt"></span></div></div>
    <div class="row"><label for="pR">مؤشر القياس</label><output id="pO"></output><input id="pR" type="range" min="0" max="100" step="0.1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي على المسطرة المترية من صفرها عند شعاع البوابة حتى يلامس السطح السفلي للجسم (الثقل).</p>
    <div class="ans"><label>قراءتك للارتفاع h</label><input id="hIn" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="hCk">تحقق</button><button type="button" class="rs" id="hHn">تلميح</button></div><div class="fb2" id="hFb"></div>
    <h4 class="sbh">ج) إفلات الجسم (الثقل) وقراءة سرعته بالبوابة الضوئية</h4>
    <div class="stage"><div id="gS"></div><svg id="vS" viewBox="0 0 400 112"></svg><div class="hud"><span id="gSt"></span></div></div>
    <div class="row"><label for="gR">فصل التيار</label><output id="gO"></output><input id="gR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لفصل تيار المغناطيس الكهربائي، فيسقط الجسم (الثقل) من السكون ويعبر شعاع البوابة الضوئية، ثم اقرأ سرعته من الشاشة المكبرة.</p>
    <div class="ans"><label>قراءتك لسرعة الجسم (الثقل) v</label><input id="vIn" inputmode="decimal" dir="ltr" placeholder="m/s"><button type="button" class="go" id="vCk">تحقق</button></div><div class="fb2" id="vFb"></div>
    <h4 class="sbh">د) حساب طاقة الوضع عند الإفلات</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> تسارع الجاذبية <b dir="ltr">g = 9.8 m/s²</b></p>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbP" style="white-space:pre-line;line-height:2">PE = m·g·h</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب طاقة الوضع PE = m·g·h بوحدة J</label><input id="cP" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="cPk">تحقق</button></div><div class="fb2" id="cPf"></div></div>
    <h4 class="sbh">هـ) حساب طاقة الحركة عند البوابة الضوئية</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbK" style="white-space:pre-line;line-height:2">KE = ½·m·v²</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب طاقة الحركة KE = ½·m·v² بوحدة J</label><input id="cK" inputmode="decimal" dir="ltr" placeholder="J"><button type="button" class="go" id="cKk">تحقق</button></div><div class="fb2" id="cKf"></div></div>
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين طاقة الوضع وطاقة الحركة</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>الكتلة m</td><td id="r1">—</td></tr>
    <tr><td>الارتفاع h</td><td id="r2">—</td></tr>
    <tr><td>السرعة v</td><td id="r3">—</td></tr>
    <tr><td>طاقة الوضع PE</td><td id="r4">—</td></tr>
    <tr><td>طاقة الحركة KE</td><td id="r5">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n)),r1=x=>Math.round(x*10)/10,G=9.8;
  let M,H,V,ok={},hX=false;
  const KG=()=>M/1000,HM=()=>H/100,PE=()=>KG()*G*HM(),KE=()=>0.5*KG()*V*V;
  const fallen=()=>+$('gR').value>=60;
  function newObj(){M=100+10*Math.floor(Math.random()*41);H=r1(30+Math.random()*50);V=Math.round(Math.sqrt(2*G*HM())*0.99*100)/100;ok={};hX=false;
    ['gR','pR'].forEach(k=>$(k).value=0);['mIn','hIn','vIn','cP','cK'].forEach(k=>$(k).value='');['mFb','hFb','vFb','cPf','cKf'].forEach(fb0);
    $('bl').innerHTML=awBal(M,'m');pDraw();gDraw();sub();results()}
  function pVal(){let p=r1(+$('pR').value);if(p>H){p=H;$('pR').value=p}return p}
  const pTouch=()=>Math.abs(pVal()-H)<1e-6;
  function pDraw(){const p=pVal(),touch=pTouch(),hl=hX&&touch,c0=Math.max(0,Math.floor(H)-7),XX=c=>(c-c0)*26;
    $('pO').textContent=p.toFixed(1)+' cm';$('pSt').textContent=touch?'✓ المؤشر عند أسفل الجسم (الثقل)، اقرأ الارتفاع من المسطرة':'اسحب المؤشر حتى يلامس أسفل الجسم (الثقل)';
    $('pS').innerHTML=ceScene(H,0,{ptr:{p,touch}});
    let z=`<rect x="0" y="34" width="400" height="58" fill="#FEF3C7" stroke="#A16207"/>`;
    for(let m=Math.ceil(c0*10);m<=Math.floor((c0+15.4)*10);m++){const x=XX(m/10),big=m%10===0,mid=m%5===0,hh=hl&&m===Math.round(H*10);z+=`<line x1="${x}" y1="34" x2="${x}" y2="${34+(big?22:mid?15:9)}" stroke="${hh?'#2563EB':'#1F2937'}" stroke-width="${hh?2.6:big?1.4:.8}"/>`;if(big)z+=`<text x="${x}" y="74" font-size="13" font-weight="700" text-anchor="middle" fill="#1F2937">${m/10}</text>`}
    const xb=XX(H);z+=`<line x1="${xb}" y1="8" x2="${xb}" y2="98" stroke="#C2410C" stroke-width="2.2" stroke-dasharray="6 4"/><text x="${xb-6}" y="20" font-size="12" font-weight="700" text-anchor="end" fill="var(--ink)">‏أسفل الجسم (الثقل)‏</text>`;
    const xp=XX(p);if(xp>=0&&xp<=400)z+=`<line x1="${xp}" y1="30" x2="${xp}" y2="96" stroke="#F7931E" stroke-width="3.5"/><path d="M${xp-7},104 L${xp},94 L${xp+7},104 Z" fill="#F7931E"/>`;
    z+=`<rect x="352" y="82" width="44" height="24" rx="6" fill="#F7931E"/><text x="374" y="99" font-size="15" font-weight="800" text-anchor="middle" fill="#fff">cm</text><text x="6" y="106" font-size="12" font-weight="700" fill="var(--muted)">تكبير المسطرة المترية</text>`;
    $('pZ').innerHTML=z}
  function gDraw(){const v=+$('gR').value,dn=fallen(),sMax=H+(56-5)/1.55,s=v<=0?0:Math.min(sMax,v/60*H+(v>=60?(v-60)/40*(sMax-H):0));
    $('gO').textContent=v>=100?'استقر على الوسادة':dn?'عبر البوابة':v>0?'يسقط…':'';
    $('gSt').textContent=dn?'✓ عبر الجسم (الثقل) شعاع البوابة الضوئية، اقرأ سرعته v من الشاشة المكبرة':v>0?'الجسم (الثقل) يسقط من السكون…':'الجسم (الثقل) ساكن ملتصق بالمغناطيس الكهربائي (Vi = 0)';
    $('gS').innerHTML=ceScene(H,s,{v:dn?V.toFixed(2):null});
    $('vS').innerHTML=`<rect x="40" y="4" width="320" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="56" y="16" width="288" height="62" rx="8" fill="#BBF7D0" stroke="#14532D"/><text x="200" y="58" font-size="26" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">v = ${dn?V.toFixed(2):'-.--'} m/s</text><text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏شاشة عداد البوابة الضوئية (مكبرة)‏</text>`}
  function sub(){
    $('sbP').textContent=ok.m&&ok.h?['PE = m·g·h',E(`m = ${M} g = ${fx(KG(),3)} kg`),E(`h = ${H.toFixed(1)} cm = ${fx(HM(),3)} m`),E(`PE = ${fx(KG(),3)} × 9.8 × ${fx(HM(),3)}`)].join('\n'):'PE = m·g·h';
    $('sbK').textContent=ok.m&&ok.v?['KE = ½·m·v²',E(`m = ${fx(KG(),3)} kg , v = ${V.toFixed(2)} m/s`),E(`KE = 0.5 × ${fx(KG(),3)} × ${V.toFixed(2)}²`)].join('\n'):'KE = ½·m·v²'}
  function results(){
    $('r1').textContent=ok.m?E(fx(KG(),3)+' kg'):'—';$('r2').textContent=ok.h?E(fx(HM(),3)+' m'):'—';$('r3').textContent=ok.v?E(V.toFixed(2)+' m/s'):'—';
    $('r4').textContent=ok.cP?E(fx(PE(),3)+' J'):'—';$('r5').textContent=ok.cK?E(fx(KE(),3)+' J'):'—';
    const all=ok.cP&&ok.cK;
    $('cmpS').textContent=all?['طاقة الوضع عند الإفلات:',E(`PE = ${fx(PE(),3)} J`),'طاقة الحركة عند البوابة الضوئية:',E(`KE = ${fx(KE(),3)} J`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'طاقة الحركة عند البوابة تساوي طاقة الوضع عند الإفلات تقريبا، والفرق الصغير بسبب مقاومة الهواء.':'';
    $('rNote').innerHTML=all?'الاستنتاج: طاقة الوضع للجسم (الثقل) تحولت إلى طاقة حركة أثناء السقوط، فالطاقة الميكانيكية محفوظة <span dir="ltr" style="white-space:nowrap">m·g·h = ½·m·v²</span>.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('pR').oninput=pDraw;$('gR').oninput=gDraw;
  $('mCk').onclick=()=>{const v=num($('mIn').value);if(isNaN(v))return fb('mFb',false,'اكتب قراءتك بالجرام.');
    if(Math.abs(v-M)<0.5){ok.m=true;fb('mFb',true,'✓ قراءة صحيحة:\n'+E(`m = ${M} g = ${fx(KG(),3)} kg`))}else fb('mFb',false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()};
  $('hHn').onclick=()=>{hX=true;pDraw();fb('hFb',true,'تلميح: الأرقام الكبيرة بالسنتيمتر، وبين كل رقمين 10 أقسام صغيرة كل قسم '+E('0.1 cm')+'. اقرأ آخر رقم قبل المؤشر، ثم احسب عدد الأقسام الصغيرة حتى الخط الأزرق.')};
  $('hCk').onclick=()=>{if(!pTouch())return fb('hFb',false,'اسحب المؤشر حتى يلامس أسفل الجسم (الثقل) أولا.');const v=num($('hIn').value);if(isNaN(v))return fb('hFb',false,'اكتب قراءتك بالسنتيمتر.');
    if(Math.abs(v-H)<0.05){ok.h=true;fb('hFb',true,'✓ قراءة صحيحة:\n'+E(`h = ${H.toFixed(1)} cm = ${fx(HM(),3)} m`))}else fb('hFb',false,'✗ القراءة غير صحيحة، أعد القراءة أو استخدم التلميح.');sub();results()};
  $('vCk').onclick=()=>{if(!fallen())return fb('vFb',false,'افصل تيار المغناطيس الكهربائي حتى يعبر الجسم (الثقل) البوابة الضوئية أولا.');const v=num($('vIn').value);if(isNaN(v))return fb('vFb',false,'اكتب قراءتك بوحدة m/s.');
    if(Math.abs(v-V)<0.005){ok.v=true;fb('vFb',true,'✓ قراءة صحيحة:\n'+E(`v = ${V.toFixed(2)} m/s`))}else fb('vFb',false,'✗ اكتب السرعة كما تظهر على الشاشة المكبرة.');sub();results()};
  const chk=(c,need,needMsg,val,okMsg,bad)=>{if(!need())return fb(c+'f',false,needMsg);const v=num($(c).value);if(isNaN(v))return fb(c+'f',false,'اكتب الناتج بوحدة J.');
    if(Math.abs(v-val)/val<0.01){ok[c]=true;fb(c+'f',true,okMsg())}else fb(c+'f',false,bad);sub();results()};
  $('cPk').onclick=()=>chk('cP',()=>ok.m&&ok.h,'أكمل قياس الكتلة والارتفاع أولا.',PE(),()=>'✓ إجابة صحيحة:\n'+E(`PE = ${fx(KG(),3)} × 9.8 × ${fx(HM(),3)} = ${fx(PE(),3)} J`),'✗ اكتب الكتلة بوحدة kg والارتفاع بوحدة m، ثم اضرب الكتلة في 9.8 في الارتفاع.');
  $('cKk').onclick=()=>chk('cK',()=>ok.m&&ok.v,'أكمل قياس الكتلة والسرعة أولا.',KE(),()=>'✓ إجابة صحيحة:\n'+E(`KE = 0.5 × ${fx(KG(),3)} × ${V.toFixed(2)}² = ${fx(KE(),3)} J`),'✗ احسب مربع السرعة، ثم اضربها في الكتلة بالكيلوجرام وفي 0.5.');
  $('nw').onclick=newObj;
  calcInit(box);newObj();
}

function htScene(o){/* o:{px,tz,R,t,lab,hl,cl,pour} مجس الحرارة: px موضع محوره، tz ارتفاع طرفه، R قراءة الشاشة، t زمن ساعة الإيقاف، hl مستوى الماء الساخن في الوعاء الزجاجي 0..1، cl مستوى الماء في المسعر 0..1، pour سكب (يرتفع الغطاء) */
  o=o||{};const BASE=250,T=14,D=40,CH=78,HX=110,CX=228,RX=30,RY=10,RO=33,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const hl=o.hl==null?1:o.hl,cl=o.cl==null?(o.lab?1:0.5):o.cl,mix=o.cl!=null&&cl>0.55,wc=mix?'#D8B4FE':'#93C5FD',ws=mix?'#7E22CE':'#1D4ED8';
  const cyl=(cx,yt,yb,r,ry)=>`M${cx-r},${yt} L${cx-r},${yb} A${r},${ry} 0 0 0 ${cx+r},${yb} L${cx+r},${yt} A${r},${ry} 0 0 1 ${cx-r},${yt} Z`;
  let g=`<defs><linearGradient id="htCal" x1="0" x2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset=".4" stop-color="#F1F5F9"/><stop offset="1" stop-color="#64748B"/></linearGradient><linearGradient id="htRod" x1="0" x2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset=".5" stop-color="#F1F5F9"/><stop offset="1" stop-color="#64748B"/></linearGradient></defs>`;
  g+=box(6,346,0,86,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  const [hx,hyt]=S(HX,D,T+CH),[,hyb]=S(HX,D,T),[cx,cyt]=S(CX,D,T+CH),[,cyb]=S(CX,D,T);
  /* الوعاء الزجاجي: الحافة الخلفية والماء الساخن */
  g+=`<ellipse cx="${hx}" cy="${hyt}" rx="${RX}" ry="${RY}" fill="#E0F2FE" fill-opacity=".5" stroke="#64748B" stroke-width="1.3"/>`;
  /* المسعر الحراري: الفتحة من الداخل */
  g+=`<ellipse cx="${cx}" cy="${cyt}" rx="${RO}" ry="${RY+1}" fill="#475569" stroke="#334155" stroke-width="1.4"/><ellipse cx="${cx}" cy="${cyt}" rx="${RX-3}" ry="${RY-2}" fill="#1E293B"/>`;
  if(hl>0.05){for(let i=-1;i<=1;i++)g+=`<path d="M${hx+i*12},${hyt-6} c-6,-8 6,-14 0,-22 c-6,-8 6,-14 0,-20" fill="none" stroke="#94A3B8" stroke-width="2" opacity=".55"/>`}
  if(o.pour){const a=S(HX+RX-2,D,T+CH),b=S(CX-RX+8,D,T+CH);g+=`<path d="M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${a[1]-26} ${b[0]},${b[1]}" fill="none" stroke="#F87171" stroke-width="5" stroke-linecap="round" opacity=".9"/>`}
  /* الميزان الحراري الرقمي */
  g+=box(282,340,6,30,T,T+50,'#334155','#475569','#1F2937','#0F172A');
  {const a=S(286,6,T+40),b=S(336,6,T+14);g+=`<rect x="${a[0]}" y="${a[1]}" width="${b[0]-a[0]}" height="${b[1]-a[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b[0])/2}" y="${(a[1]+b[1])/2+4}" font-size="11" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.R||'--.-'} °C</text>`}
  const px=o.px==null?CX:o.px,tz=o.tz==null?T+CH+26:o.tz,[ax,ay]=S(px,D,tz),[,ry]=S(px,D,tz+72),[,hy]=S(px,D,tz+96);
  const inC=Math.abs(px-CX)<1,inH=Math.abs(px-HX)<1;
  const rod=(y0,y1)=>y1>y0?`<rect x="${ax-2}" y="${y0}" width="4" height="${y1-y0}" fill="url(#htRod)" stroke="#475569" stroke-width=".8"/>`:'';
  const head=()=>`<rect x="${ax-5}" y="${hy}" width="10" height="${ry-hy}" rx="3" fill="#1F2937" stroke="#0F172A"/>`;
  {const k=S(300,18,T+50);g+=`<path d="M${ax},${hy} C${ax+30},${hy-36} ${k[0]+10},${k[1]-90} ${k[0]},${k[1]}" fill="none" stroke="#1F2937" stroke-width="2.2"/>`}
  g+=rod(ry,ay)+`<circle cx="${ax}" cy="${ay}" r="2.6" fill="#F7931E"/>`+head();
  /* الماء الساخن داخل الوعاء الزجاجي ثم جداره الشفاف */
  if(hl>0.03){const [,yw]=S(HX,D,T+4+hl*(CH-16));g+=`<path d="${cyl(hx,yw,hyb-2,RX-2,RY-1)}" fill="#F87171" fill-opacity=".55"/><ellipse cx="${hx}" cy="${yw}" rx="${RX-2}" ry="${RY-1}" fill="#FCA5A5" stroke="#B91C1C" stroke-width="1"/>`}
  g+=`<path d="${cyl(hx,hyt,hyb,RX,RY)}" fill="#E0F2FE" fill-opacity=".28" stroke="#64748B" stroke-width="1.4"/><path d="M${hx-RX+6},${hyt+10} L${hx-RX+6},${hyb-4}" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`;
  /* جدار المسعر ونافذة القطع */
  g+=`<path d="${cyl(cx,cyt,cyb,RO,RY+1)}" fill="url(#htCal)" stroke="#334155" stroke-width="1.5"/>`;
  const wl=cx-15,wr=cx+15,wt=cyt+16,wb=cyb-6;
  g+=`<rect x="${wl}" y="${wt}" width="${wr-wl}" height="${wb-wt}" fill="#CBD5E1" stroke="#1F2937" stroke-width="1.6"/>`;
  if(cl>0.03){const [,yw]=S(CX,D,T+6+cl*(CH-18)),y=Math.max(wt,yw);g+=`<rect x="${wl}" y="${y}" width="${wr-wl}" height="${wb-y}" fill="${wc}"/>`+(yw>wt?`<line x1="${wl}" y1="${yw}" x2="${wr}" y2="${yw}" stroke="${ws}" stroke-width="1.6"/>`:'')}
  /* أداة التحريك داخل النافذة */
  const sx=cx-9;g+=`<line x1="${sx}" y1="${wt}" x2="${sx}" y2="${wb-8}" stroke="#475569" stroke-width="2"/><ellipse cx="${sx+3}" cy="${wb-8}" rx="9" ry="3" fill="none" stroke="#475569" stroke-width="2"/>`;
  if(inC&&ay>wt)g+=`<rect x="${ax-2}" y="${wt}" width="4" height="${Math.min(ay,wb)-wt}" fill="url(#htRod)" stroke="#475569" stroke-width=".8"/><circle cx="${ax}" cy="${Math.min(ay,wb)}" r="2.6" fill="#F7931E"/>`;
  g+=`<rect x="${wl}" y="${wt}" width="${wr-wl}" height="${wb-wt}" fill="none" stroke="#1F2937" stroke-width="1.6"/>`;
  /* غطاء المسعر: يرتفع أثناء السكب */
  const lift=o.pour?22:0,ly=cyt-lift-3;
  g+=`<path d="${cyl(cx,ly-4,ly,RO+3,RY+2)}" fill="#334155" stroke="#0F172A" stroke-width="1.2"/><ellipse cx="${cx}" cy="${ly-4}" rx="${RO+3}" ry="${RY+2}" fill="#64748B" stroke="#0F172A" stroke-width="1.2"/><ellipse cx="${cx}" cy="${ly-4}" rx="5" ry="2" fill="#0F172A"/>`;
  g+=`<line x1="${sx}" y1="${ly-4}" x2="${sx}" y2="${ly-30}" stroke="#475569" stroke-width="2.4"/><ellipse cx="${sx}" cy="${ly-34}" rx="6" ry="4" fill="none" stroke="#475569" stroke-width="2.4"/>`;
  if(inC&&ry<ly-4)g+=rod(ry,ly-4)+head();
  if(inH||(!inC&&!inH))g+=rod(ry,Math.min(ay,hyt))+head();
  {const [sx2,sy]=S(26,70,T);g+=`<rect x="${sx2-4}" y="${sy-44}" width="8" height="6" rx="1.5" fill="#475569"/><circle cx="${sx2}" cy="${sy-22}" r="17" fill="#1F2937" stroke="#0F172A"/><circle cx="${sx2}" cy="${sy-22}" r="13" fill="#E2E8F0"/><text x="${sx2}" y="${sy-18}" font-size="10" font-weight="800" text-anchor="middle" fill="#0F172A" font-family="Consolas,monospace" direction="ltr">${o.t==null?'0':o.t} s</text>`}
  if(o.lab){const [,rt]=S(px,D,tz+40);
    g+=lbl(hx-8,(hyt+hyb)/2-4,8,24,'ماء ساخن m₁','start')
      +lbl(sx-6,ly-34,190,24,'أداة التحريك')
      +lbl(ax+2,rt,396,60,'مجس الميزان الحراري','end')
      +lbl(cx-RO-1,ly-4,150,74,'غطاء المسعر')
      +lbl(wr-4,(wt+wb)/2+8,396,104,'ماء بارد m₂','end')
      +lbl(...S(26,70,T+30),6,BASE+28,'ساعة الإيقاف','start')
      +lbl(hx,hyb-6,118,BASE+28,'وعاء زجاجي')
      +lbl(cx-RO+4,cyb-10,214,BASE+28,'المسعر الحراري')
      +lbl(...S(330,6,T+30),396,BASE+28,'شاشة الميزان الحراري','end')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?44:12)}" aria-label="مجس حرارة رقمي ووعاء زجاجي فيه ماء ساخن ومسعر حراري فيه ماء بارد">${g}</svg>`}
function htBal(v,lab,hot){const wc=hot?'#FCA5A5':'#93C5FD',sc=hot?'#B91C1C':'#1D4ED8';
  const cup=hot?`<path d="M171,40 L172,79 L228,79 L229,40 Z" fill="#F87171" fill-opacity=".55"/><ellipse cx="200" cy="40" rx="29" ry="4.5" fill="${wc}" stroke="${sc}"/><path d="M170,24 L172,80 L228,80 L230,24 Z" fill="#E0F2FE" fill-opacity=".3" stroke="#64748B" stroke-width="1.4"/><path d="M176,30 L177,74" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/><ellipse cx="200" cy="24" rx="30" ry="5" fill="#E0F2FE" fill-opacity=".5" stroke="#64748B"/><text x="200" y="66" font-size="14" font-weight="800" text-anchor="middle" fill="${sc}" direction="ltr">${lab}</text><path d="M188,18 c-5,-6 5,-10 0,-16 M200,18 c-5,-6 5,-10 0,-16 M212,18 c-5,-6 5,-10 0,-16" fill="none" stroke="#94A3B8" stroke-width="1.8" opacity=".6"/>`
    :`<defs><linearGradient id="hbCal" x1="0" x2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset=".4" stop-color="#F1F5F9"/><stop offset="1" stop-color="#64748B"/></linearGradient></defs><path d="M168,24 L168,80 L232,80 L232,24 Z" fill="url(#hbCal)" stroke="#334155" stroke-width="1.5"/><rect x="186" y="34" width="28" height="40" fill="#CBD5E1" stroke="#1F2937" stroke-width="1.4"/><rect x="186" y="44" width="28" height="30" fill="${wc}" stroke="#1F2937" stroke-width="1.4"/><line x1="186" y1="44" x2="214" y2="44" stroke="${sc}" stroke-width="1.6"/><ellipse cx="200" cy="24" rx="32" ry="5" fill="#475569" stroke="#334155"/><text x="200" y="66" font-size="13" font-weight="800" text-anchor="middle" fill="${sc}" direction="ltr">${lab}</text>`;
  return `<svg viewBox="0 0 400 170" aria-label="الميزان الرقمي"><rect x="90" y="92" width="220" height="62" rx="10" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="110" y="106" width="130" height="34" rx="5" fill="#BBF7D0" stroke="#14532D"/><text x="175" y="130" font-size="20" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${v}</text><text x="270" y="130" font-size="16" font-weight="800" fill="#fff">g</text><rect x="120" y="80" width="160" height="12" rx="3" fill="#94A3B8" stroke="#475569"/>
  ${cup}
  <text x="12" y="166" font-size="12" font-weight="700" fill="var(--muted)">‏الميزان الرقمي (مصفر لكتلة ${hot?'الوعاء الزجاجي':'المسعر الحراري'})‏</text></svg>`}
function eqLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">التحقق من الاتزان الحراري بخلط ماء ساخن وماء بارد</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>الميزان الرقمي</i> · g</span><span class="tag">درجة الحرارة T: <i>أداة الميزان الحراري الرقمي</i> · °C</span><span class="tag">الزمن t: <i>ساعة الإيقاف</i> · s</span><span class="tag dv">درجة حرارة الخليط (درجة حرارة الاتزان) T_final: <i>مقاسة ومحسوبة</i> · °C</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الميزان الرقمي وأداة الميزان الحراري الرقمي وساعة الإيقاف.</li>
    <li>قياس كتلتي الماء الساخن <span dir="ltr">m₁</span> والماء البارد <span dir="ltr">m₂</span> بالميزان الرقمي.</li>
    <li>قياس درجتي حرارة الماء البارد <span dir="ltr">T₂</span> والماء الساخن <span dir="ltr">T₁</span> بأداة الميزان الحراري الرقمي.</li>
    <li>خلط الماء الساخن بالماء البارد وقراءة درجة حرارة الخليط مع الزمن حتى الاتزان الحراري <span dir="ltr">T_final</span>.</li>
    <li>حساب <span dir="ltr">T_final</span> من قانون الاتزان الحراري ومقارنتها بالقيمة المقاسة.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${htScene({lab:true,px:228,tz:14+78+26})}</div><div class="vcap">مجس حرارة رقمي ووعاء زجاجي ومسعر حراري: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> على الطاولة وعاء زجاجي فيه ماء ساخن، ومسعر حراري فيه ماء بارد. ومجس الميزان الحراري متصل بسلك بشاشته، وساعة الإيقاف لقياس الزمن.</p></div>
    <div class="tool"><div class="stage">${htBal('150','m₁',true)}</div><p><b>الميزان الرقمي:</b> يصفر بالوعاء الفارغ، ثم يقيس كتلة الماء وحده بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>أداة الميزان الحراري الرقمي <span dir="ltr">(Digital Thermometer)</span>:</b> طرفه المعدني يوضع في الماء، فتظهر درجة حرارته على شاشة الميزان الحراري بوحدة <span dir="ltr">°C</span> بدقة <span dir="ltr">0.1 °C</span>.</p>
    <p><b>المسعر الحراري:</b> وعاء معزول بجدارين وغطاء، فيه نافذة لرؤية الماء، يقلل تبادل الحرارة بين الماء والهواء المحيط. يرفع غطاؤه عند سكب الماء الساخن، وتحرك أداة التحريك الخليط حتى تتساوى درجة حرارته.</p>
    <p><b>الوعاء الزجاجي:</b> يوضع فيه الماء الساخن قبل سكبه في المسعر الحراري.</p>
    <p><b>ساعة الإيقاف:</b> تقيس الزمن <span dir="ltr">t</span> بالثانية من لحظة سكب الماء الساخن.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>اتجاه انتقال الحرارة: تنتقل تلقائيا من الجسم الأعلى حرارة إلى الأقل حرارة حتى تتساوى درجتا الحرارة</b><span>T₁ > T_final > T₂</span></div>
      <div class="ln lw"><b>الاتزان الحراري: مجموع كميات الحرارة المتبادلة صفر</b><span>Q₁ + Q₂ = 0</span></div>
      <div class="ln lw"><b>الحرارة التي يفقدها الماء الساخن = الحرارة التي يكتسبها الماء البارد</b><span>m₁·c₁·(T₁ − T_final) = m₂·c₂·(T_final − T₂)</span></div>
      <div class="ln lw"><b>وبما أن المادتين ماء <bdi dir="ltr">(c₁ = c₂)</bdi> تختصر الحرارة النوعية، ونحل المعادلة لإيجاد <bdi dir="ltr">T_final</bdi></b><span>T_final = (m₁·T₁ + m₂·T₂) / (m₁ + m₂)</span></div>
      <div class="vfig"><svg viewBox="0 0 340 170" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="انتقال الحرارة من الماء الساخن إلى الماء البارد">
      <rect x="30" y="50" width="90" height="70" rx="10" fill="#FCA5A5" stroke="#B91C1C"/><text x="75" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#7F1D1D">ماء ساخن</text><text x="75" y="104" text-anchor="middle" font-size="13" font-weight="800" fill="#7F1D1D" dir="ltr">m₁ , T₁</text>
      <rect x="220" y="50" width="90" height="70" rx="10" fill="#93C5FD" stroke="#1D4ED8"/><text x="265" y="80" text-anchor="middle" font-size="14" font-weight="800" fill="#1E3A8A">ماء بارد</text><text x="265" y="104" text-anchor="middle" font-size="13" font-weight="800" fill="#1E3A8A" dir="ltr">m₂ , T₂</text>
      <path d="M128,85 H210 m-10,-8 l10,8 l-10,8" stroke="#F7931E" stroke-width="4" fill="none"/><text x="170" y="74" text-anchor="middle" font-size="15" font-weight="800" fill="#C2410C" dir="ltr">Q</text>
      <text x="170" y="150" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">‏حتى تتساوى درجتا الحرارة (الاتزان الحراري) عند T_final‏</text>
      </svg><div class="vcap">يفقد الماء الساخن حرارة ويكتسبها الماء البارد حتى يصل الخليط إلى درجة حرارة واحدة</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m₁</span> كتلة الماء الساخن، و <span class="chip" dir="ltr">m₂</span> كتلة الماء البارد، وتقاسان بالميزان الرقمي بوحدة <span dir="ltr">g</span></li>
      <li><span class="chip" dir="ltr">c₁ = c₂</span> الحرارة النوعية للماء، وقيمتها <span dir="ltr">4186 J/kg·°C</span>، وتختصر من الطرفين</li>
      <li><span class="chip" dir="ltr">T₁</span> درجة حرارة الماء الساخن، و <span class="chip" dir="ltr">T₂</span> درجة حرارة الماء البارد، ووحدتهما <span dir="ltr">°C</span></li>
      <li><span class="chip" dir="ltr">T_final</span> درجة حرارة الخليط (درجة حرارة الاتزان)، ووحدتها <span dir="ltr">°C</span></li>
      <li><span class="chip" dir="ltr">Q₁ , Q₂</span> كمية الحرارة التي يفقدها الماء الساخن ويكتسبها الماء البارد، ووحدتها <span dir="ltr">J</span></li>
      <li><span class="chip" dir="ltr">t</span> الزمن من لحظة سكب الماء الساخن، ووحدته <span dir="ltr">s</span></li>
      </ul></div>
      <p class="slh">ℹ️ لا نحتاج تحويل الكتلة إلى <span dir="ltr">kg</span>، لأن الكتلتين في البسط والمقام بنفس الوحدة.</p></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس كتلة الماء الساخن m₁ بالميزان الرقمي</h4>
    <div class="stage"><div id="b1"></div></div>
    <div class="ans"><label>قراءتك لكتلة الماء الساخن m₁</label><input id="m1In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m1Ck">تحقق</button></div><div class="fb2" id="m1Fb"></div>
    <h4 class="sbh">ب) قياس كتلة الماء البارد m₂ بالميزان الرقمي</h4>
    <div class="stage"><div id="b2"></div></div>
    <div class="ans"><label>قراءتك لكتلة الماء البارد m₂</label><input id="m2In" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m2Ck">تحقق</button></div><div class="fb2" id="m2Fb"></div>
    <h4 class="sbh">ج) قياس درجة حرارة الماء البارد T₂</h4>
    <div class="stage"><div id="aS"></div><svg id="aZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="aSt"></span></div></div>
    <div class="row"><label for="aR">إنزال المجس</label><output id="aO"></output><input id="aR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال مجس الميزان الحراري في المسعر الحراري (ماء بارد)، ثم اقرأ درجة الحرارة من الشاشة المكبرة.</p>
    <div class="ans"><label>قراءتك لدرجة حرارة الماء البارد T₂</label><input id="aIn" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="aCk">تحقق</button></div><div class="fb2" id="aFb"></div>
    <h4 class="sbh">د) قياس درجة حرارة الماء الساخن T₁</h4>
    <div class="stage"><div id="bS"></div><svg id="bZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="bSt"></span></div></div>
    <div class="row"><label for="bR">نقل المجس</label><output id="bO"></output><input id="bR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لنقل مجس الميزان الحراري إلى الوعاء الزجاجي (ماء ساخن) حتى تثبت القراءة، ثم اقرأ درجة الحرارة.</p>
    <div class="ans"><label>قراءتك لدرجة حرارة الماء الساخن T₁</label><input id="bIn" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="bCk">تحقق</button></div><div class="fb2" id="bFb"></div>
    <h4 class="sbh">هـ) خلط الماء الساخن بالماء البارد</h4>
    <div class="stage"><div id="cS"></div><svg id="cZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="cSt"></span></div></div>
    <div class="row"><label for="cR">نقل المجس</label><output id="cO"></output><input id="cR" type="range" min="0" max="100" step="1" value="0"></div>
    <div class="row"><label for="pR">سكب الماء الساخن</label><output id="pO"></output><input id="pR" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 انقل المجس إلى المسعر الحراري (ماء بارد)، ثم اسكب الماء الساخن فيه كاملا. ساعة الإيقاف تبدأ من <bdi dir="ltr">t = 0 s</bdi>.</p>
    <h4 class="sbh">و) قراءة درجة حرارة الخليط عند الزمن <bdi dir="ltr">t = 10 s</bdi></h4>
    <div class="stage"><div id="dS0"></div><svg id="dZ0" viewBox="0 0 400 112"></svg><div class="hud"><span id="dSt0"></span></div></div>
    <div class="row"><label for="tR0">ساعة الإيقاف</label><output id="tO0"></output><input id="tR0" type="range" min="0" max="10" step="1" value="0"></div>
    <p class="slh">👆 اسحب مؤشر ساعة الإيقاف من <bdi dir="ltr">t = 0 s</bdi> حتى <bdi dir="ltr">t = 10 s</bdi>، ثم اقرأ درجة حرارة الخليط.</p>
    <div class="ans"><label>درجة حرارة الخليط عند <bdi dir="ltr">t = 10 s</bdi></label><input id="k1" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="k1Ck">تحقق</button></div><div class="fb2" id="k1Fb"></div>
    <h4 class="sbh">ز) قراءة درجة حرارة الخليط عند الزمن <bdi dir="ltr">t = 30 s</bdi></h4>
    <div class="stage"><div id="dS1"></div><svg id="dZ1" viewBox="0 0 400 112"></svg><div class="hud"><span id="dSt1"></span></div></div>
    <div class="row"><label for="tR1">ساعة الإيقاف</label><output id="tO1"></output><input id="tR1" type="range" min="10" max="30" step="1" value="10"></div>
    <p class="slh">👆 اسحب مؤشر ساعة الإيقاف من <bdi dir="ltr">t = 10 s</bdi> حتى <bdi dir="ltr">t = 30 s</bdi>، ثم اقرأ درجة حرارة الخليط.</p>
    <div class="ans"><label>درجة حرارة الخليط عند <bdi dir="ltr">t = 30 s</bdi></label><input id="k2" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="k2Ck">تحقق</button></div><div class="fb2" id="k2Fb"></div>
    <h4 class="sbh">ح) قراءة درجة حرارة الخليط عند الزمن <bdi dir="ltr">t = 60 s</bdi></h4>
    <div class="stage"><div id="dS2"></div><svg id="dZ2" viewBox="0 0 400 112"></svg><div class="hud"><span id="dSt2"></span></div></div>
    <div class="row"><label for="tR2">ساعة الإيقاف</label><output id="tO2"></output><input id="tR2" type="range" min="30" max="60" step="1" value="30"></div>
    <p class="slh">👆 اسحب مؤشر ساعة الإيقاف من <bdi dir="ltr">t = 30 s</bdi> حتى <bdi dir="ltr">t = 60 s</bdi>، ثم اقرأ درجة حرارة الخليط.</p>
    <div class="ans"><label>درجة حرارة الخليط (درجة حرارة الاتزان) <bdi dir="ltr">T_final</bdi> عند <bdi dir="ltr" style="white-space:nowrap">t = 60 s</bdi></label><input id="k3" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="k3Ck">تحقق</button></div><div class="fb2" id="k3Fb"></div>
    <h4 class="sbh">ط) حساب T_final من القانون</h4>
    <div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sbT" style="white-space:pre-line;line-height:2">T_final = (m₁·T₁ + m₂·T₂) / (m₁ + m₂)</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>احسب T_final من القانون بوحدة °C</label><input id="cT" inputmode="decimal" dir="ltr" placeholder="°C"><button type="button" class="go" id="cTk">تحقق</button></div><div class="fb2" id="cTf"></div></div>
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين درجة حرارة الاتزان المقاسة والمحسوبة</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>كتلة الماء الساخن m₁</td><td id="r1">—</td></tr>
    <tr><td>كتلة الماء البارد m₂</td><td id="r2">—</td></tr>
    <tr><td>درجة حرارة الماء البارد T₂</td><td id="r3">—</td></tr>
    <tr><td>درجة حرارة الماء الساخن T₁</td><td id="r4">—</td></tr>
    <tr><td>الخليط عند <bdi dir="ltr" style="white-space:nowrap">t = 10 s</bdi></td><td id="r5">—</td></tr>
    <tr><td>الخليط عند <bdi dir="ltr" style="white-space:nowrap">t = 30 s</bdi></td><td id="r6">—</td></tr>
    <tr><td>T_final المقاسة بالمجس</td><td id="r7">—</td></tr>
    <tr><td>T_final المحسوبة من القانون</td><td id="r8">—</td></tr></tbody></table></div>
    <div id="htC"></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const r1=x=>Math.round(x*10)/10,fx=(x,n)=>String(+x.toFixed(n));
  const TT=14,CH=78,HX=110,CX=228,ZIN=TT+20,ZUP=TT+CH+26,TAU=8,TS=[10,30,60];
  let M1,M2,T1,T2,TFM,ok={};
  const TFC=()=>(M1*T1+M2*T2)/(M1+M2),Tt=t=>r1(TFM+(T2-TFM)*Math.exp(-t/TAU));
  const path=(v,x0,x1)=>v<=30?{px:x0,tz:ZIN+v/30*(ZUP-ZIN)}:v<=70?{px:x0+(x1-x0)*(v-30)/40,tz:ZUP}:{px:x1,tz:ZUP-(v-70)/30*(ZUP-ZIN)};
  const zoom=(lines,cap)=>`<rect x="20" y="4" width="360" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/>`+lines+`<text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${cap}</text>`;
  const scr=(x,w,txt)=>`<rect x="${x}" y="16" width="${w}" height="62" rx="8" fill="#BBF7D0" stroke="#14532D"/><text x="${x+w/2}" y="57" font-size="24" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${txt}</text>`;
  const CL=()=>M2/(M1+M2);
  function newObj(){M1=100+10*Math.floor(Math.random()*11);M2=100+10*Math.floor(Math.random()*11);T1=r1(60+Math.random()*20);T2=r1(20+Math.random()*6);TFM=r1(TFC()-(0.3+Math.random()*0.5));ok={};
    ['aR','bR','cR','pR'].forEach(k=>$(k).value=0);[0,1,2].forEach(n=>$('tR'+n).value=[0,10,30][n]);['m1In','m2In','aIn','bIn','k1','k2','k3','cT'].forEach(k=>$(k).value='');['m1Fb','m2Fb','aFb','bFb','k1Fb','k2Fb','k3Fb','cTf'].forEach(fb0);
    $('b1').innerHTML=htBal(M1,'m₁',true);$('b2').innerHTML=htBal(M2,'m₂',false);aDraw();bDraw();cDraw();sub();results()}
  function aDraw(){const v=+$('aR').value,on=v>=100,p=on?ZIN:ZUP-v/100*(ZUP-ZIN);
    $('aO').textContent=on?'في الماء':'';$('aSt').textContent=on?'✓ المجس في الماء البارد، اقرأ درجة الحرارة T₂':'أنزل المجس حتى يستقر في الماء';
    $('aS').innerHTML=htScene({px:CX,tz:p,R:on?T2.toFixed(1):null,cl:CL()});
    $('aZ').innerHTML=zoom(scr(56,288,`T = ${on?T2.toFixed(1):'--.-'} °C`),'‏شاشة الميزان الحراري (مكبرة)‏')}
  function bDraw(){const v=+$('bR').value,on=v>=100,q=path(100-v,HX,CX);
    $('bO').textContent=on?'في الماء الساخن':'';$('bSt').textContent=on?'✓ ثبتت القراءة، اقرأ درجة حرارة الماء الساخن T₁':v>30&&v<70?'المجس في الهواء…':'انقل المجس إلى الوعاء الزجاجي (ماء ساخن)';
    $('bS').innerHTML=htScene({px:q.px,tz:q.tz,R:on?T1.toFixed(1):null,cl:CL()});
    $('bZ').innerHTML=zoom(scr(56,288,`T = ${on?T1.toFixed(1):'--.-'} °C`),'‏شاشة الميزان الحراري (مكبرة)‏')}
  function cDraw(){const v=+$('cR').value,in2=v>=100;if(!in2)$('pR').value=0;const pr=+$('pR').value,mixed=pr>=100;
    const q=path(100-v,CX,HX),hl=1-pr/100,cl=CL()+(1-CL())*pr/100,R=!in2?'--.-':mixed?Tt(0).toFixed(1):T2.toFixed(1);
    $('cO').textContent=in2?'في الماء البارد':'';$('pO').textContent=mixed?'تم السكب':pr>0?'يسكب…':'';
    $('cSt').textContent=!in2?'انقل المجس من الماء الساخن إلى المسعر الحراري (ماء بارد)':!mixed?'اسكب الماء الساخن كاملا في المسعر الحراري':'✓ تم الخلط، انتقل إلى الخطوة التالية لتشغيل ساعة الإيقاف';
    $('cS').innerHTML=htScene({px:q.px,tz:q.tz,R:in2?R:null,t:0,hl,cl,pour:pr>0&&pr<100});
    $('cZ').innerHTML=zoom(scr(30,196,`T = ${R} °C`)+scr(234,136,`t = 0 s`),'‏شاشة الميزان الحراري وساعة الإيقاف (مكبرتان)‏');[0,1,2].forEach(dDraw)}
  function dDraw(n){const mixed=+$('pR').value>=100&&+$('cR').value>=100,to=TS[n],t=+$('tR'+n).value,R=mixed?Tt(t).toFixed(1):'--.-';
    $('tO'+n).textContent=t+' s';
    $('dSt'+n).textContent=!mixed?'أكمل خلط الماء الساخن بالماء البارد في الخطوة (هـ) أولا':t<to?'درجة حرارة الخليط ترتفع… استمر في سحب ساعة الإيقاف':n===2?'✓ ثبتت القراءة، اقرأ درجة حرارة الخليط (درجة حرارة الاتزان)':'✓ وصلت ساعة الإيقاف إلى الزمن المطلوب، اقرأ درجة حرارة الخليط';
    $('dS'+n).innerHTML=htScene(mixed?{px:CX,tz:ZIN,R,t,hl:0,cl:1}:{px:CX,tz:ZUP,R:null,t,hl:1,cl:CL()});
    $('dZ'+n).innerHTML=zoom(scr(30,196,`T = ${R} °C`)+scr(234,136,`t = ${t} s`),'‏شاشة الميزان الحراري وساعة الإيقاف (مكبرتان)‏')}
  function sub(){$('sbT').textContent=ok.m1&&ok.m2&&ok.a&&ok.b?['T_final = (m₁·T₁ + m₂·T₂) / (m₁ + m₂)',E(`T_final = (${M1} × ${T1.toFixed(1)} + ${M2} × ${T2.toFixed(1)}) / (${M1} + ${M2})`)].join('\n'):'T_final = (m₁·T₁ + m₂·T₂) / (m₁ + m₂)'}
  function chart(){if(!ok.k3){$('htC').innerHTML='';return}
    const y0=Math.floor(T2/10)*10,y1=Math.ceil((TFC()+2)/10)*10,X0=48,Yb=232,W=300,H=200,X=t=>X0+t/60*W,Y=v=>Yb-(v-y0)/(y1-y0)*H;let s='';
    for(let t=0;t<=60;t+=10)s+=`<line x1="${X(t)}" y1="${Yb}" x2="${X(t)}" y2="${Yb-H}" stroke="var(--line)"/><text x="${X(t)}" y="${Yb+16}" font-size="11" text-anchor="middle" fill="var(--ink)">${t}</text>`;
    for(let v=y0;v<=y1;v+=5)s+=`<line x1="${X0}" y1="${Y(v)}" x2="${X0+W}" y2="${Y(v)}" stroke="var(--line)"/><text x="${X0-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" fill="var(--ink)">${v}</text>`;
    s+=`<line x1="${X0}" y1="${Yb}" x2="${X0+W+8}" y2="${Yb}" stroke="var(--ink)" stroke-width="1.6"/><line x1="${X0}" y1="${Yb}" x2="${X0}" y2="${Yb-H-8}" stroke="var(--ink)" stroke-width="1.6"/>`;
    s+=`<text x="${X0+W}" y="${Yb+34}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">t (s)</text><text x="${X0+4}" y="${Yb-H-12}" font-size="13" font-weight="700" fill="var(--ink)">T (°C)</text>`;
    if(ok.cT)s+=`<line x1="${X0}" y1="${Y(TFC())}" x2="${X0+W}" y2="${Y(TFC())}" stroke="#2563EB" stroke-width="1.6" stroke-dasharray="6 4"/><text x="${X(26)}" y="${Y(TFC())-8}" font-size="12" font-weight="800" text-anchor="end" fill="#2563EB">المحسوبة</text><text x="${X(28)}" y="${Y(TFC())-8}" font-size="12" font-weight="800" text-anchor="start" fill="#2563EB">T_final = ${fx(TFC(),1)} °C</text>`;
    let d='';for(let t=0;t<=60;t+=1)d+=(t?'L':'M')+X(t).toFixed(1)+','+Y(TFM+(T2-TFM)*Math.exp(-t/TAU)).toFixed(1);s+=`<path d="${d}" fill="none" stroke="#F7931E" stroke-width="3"/>`;
    [[0,T2],[10,Tt(10)],[30,Tt(30)],[60,Tt(60)]].forEach(([t,v])=>{s+=`<circle cx="${X(t)}" cy="${Y(v)}" r="5.5" fill="#7E22CE" stroke="#fff" stroke-width="2"/><text x="${X(t)+6}" y="${Y(v)+18}" font-size="11" font-weight="700" fill="#6B21A8">${v.toFixed(1)}</text>`});
    $('htC').innerHTML=`<div class="stage"><svg viewBox="0 0 380 280" style="direction:ltr;display:block;width:100%;height:auto" aria-label="منحنى درجة حرارة الخليط مع الزمن">${s}</svg></div><div class="vcap">ترتفع درجة حرارة الخليط ثم تثبت عند درجة حرارة الاتزان T_final</div>`}
  function results(){
    $('r1').textContent=ok.m1?E(M1+' g'):'—';$('r2').textContent=ok.m2?E(M2+' g'):'—';$('r3').textContent=ok.a?E(T2.toFixed(1)+' °C'):'—';$('r4').textContent=ok.b?E(T1.toFixed(1)+' °C'):'—';
    $('r5').textContent=ok.k1?E(Tt(10).toFixed(1)+' °C'):'—';$('r6').textContent=ok.k2?E(Tt(30).toFixed(1)+' °C'):'—';$('r7').textContent=ok.k3?E(TFM.toFixed(1)+' °C'):'—';$('r8').textContent=ok.cT?E(fx(TFC(),1)+' °C'):'—';
    const all=ok.k3&&ok.cT;
    $('cmpS').textContent=all?['درجة حرارة الاتزان المقاسة بالمجس:',E(`T_final = ${TFM.toFixed(1)} °C`),'درجة حرارة الاتزان المحسوبة من القانون:',E(`T_final = ${fx(TFC(),1)} °C`),'الفرق:',E(`${fx(TFC(),1)} − ${TFM.toFixed(1)} = ${fx(r1(TFC())-TFM,1)} °C`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'درجة حرارة الاتزان المقاسة قريبة من المحسوبة، وأقل منها قليلا لأن جزءا صغيرا من الحرارة انتقل إلى المسعر الحراري والهواء المحيط.':'';
    chart();
    $('rNote').innerHTML=all?'الاستنتاج: فقد الماء الساخن حرارة واكتسبها الماء البارد حتى وصل الخليط إلى درجة حرارة واحدة <span dir="ltr">T_final</span> بين <span dir="ltr">T₂</span> و <span dir="ltr">T₁</span>، وهذا هو الاتزان الحراري، والحرارة المفقودة تساوي الحرارة المكتسبة <span dir="ltr" style="white-space:nowrap">Q₁ + Q₂ = 0</span>.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('aR').oninput=aDraw;$('bR').oninput=bDraw;['cR','pR'].forEach(k=>$(k).oninput=cDraw);[0,1,2].forEach(n=>$('tR'+n).oninput=()=>dDraw(n));
  const mk=(inp,f,val,key,lab)=>{const v=num($(inp).value);if(isNaN(v))return fb(f,false,'اكتب قراءتك بالجرام.');
    if(Math.abs(v-val)<0.5){ok[key]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${val} g`))}else fb(f,false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()};
  $('m1Ck').onclick=()=>mk('m1In','m1Fb',M1,'m1','m₁');$('m2Ck').onclick=()=>mk('m2In','m2Fb',M2,'m2','m₂');
  const rd=(inp,f,need,needMsg,val,key,lab)=>{if(!need())return fb(f,false,needMsg);const v=num($(inp).value);if(isNaN(v))return fb(f,false,'اكتب قراءتك بوحدة °C.');
    if(Math.abs(v-val)<0.05){ok[key]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${val.toFixed(1)} °C`))}else fb(f,false,'✗ اكتب درجة الحرارة كما تظهر على الشاشة المكبرة، برقم عشري واحد.');sub();results()};
  $('aCk').onclick=()=>rd('aIn','aFb',()=>+$('aR').value>=100,'أنزل المجس حتى يستقر في الماء أولا.',T2,'a','T₂');
  $('bCk').onclick=()=>rd('bIn','bFb',()=>+$('bR').value>=100,'انقل المجس إلى الماء الساخن حتى تثبت القراءة أولا.',T1,'b','T₁');
  [['k1',0],['k2',1],['k3',2]].forEach(([k,i])=>{$(k+'Ck').onclick=()=>{const t=TS[i];
    rd(k,k+'Fb',()=>+$('pR').value>=100&&+$('cR').value>=100&&+$('tR'+i).value===t,+$('cR').value<100?'انقل المجس إلى الماء البارد في الخطوة (هـ) أولا.':+$('pR').value<100?'اسكب الماء الساخن كاملا في الخطوة (هـ) أولا.':`اسحب ساعة الإيقاف حتى t = ${t} s أولا.`,Tt(t),k,i===2?'T_final':`T (${t} s)`)}});
  $('cTk').onclick=()=>{if(!(ok.m1&&ok.m2&&ok.a&&ok.b))return fb('cTf',false,'أكمل قياس الكتلتين ودرجتي الحرارة أولا.');const v=num($('cT').value);if(isNaN(v))return fb('cTf',false,'اكتب الناتج بوحدة °C.');
    const x=TFC();if(Math.abs(v-x)<=0.1){ok.cT=true;fb('cTf',true,'✓ إجابة صحيحة:\n'+E(`T_final = (${M1} × ${T1.toFixed(1)} + ${M2} × ${T2.toFixed(1)}) / ${M1+M2}`)+'\n'+E(`T_final = ${fx(M1*T1+M2*T2,1)} / ${M1+M2} = ${fx(x,1)} °C`))}
    else fb('cTf',false,'✗ اضرب كل كتلة في درجة حرارتها واجمع الناتجين:\n'+E(`${M1} × ${T1.toFixed(1)} + ${M2} × ${T2.toFixed(1)} = ${fx(M1*T1+M2*T2,1)}`)+'\nثم اقسم على مجموع الكتلتين '+E(`${M1} + ${M2} = ${M1+M2}`));sub();results()};
  $('nw').onclick=newObj;
  /* القوانين في سطر واحد: يصغر الخط حتى يتسع القانون لعرض الشاشة */
  function fitL(){box.querySelectorAll('.law .ln > span, h4.sbh').forEach(e=>{if(!e.offsetWidth)return;e.style.fontSize='';if(e.dataset.pl==null)e.dataset.pl=/pre-line/.test(e.getAttribute('style')||'')?'1':'';const pre=e.dataset.pl==='1';e.style.whiteSpace=pre?'pre':'nowrap';e.style.display='block';e.style.overflow='hidden';
    let f=parseFloat(getComputedStyle(e).fontSize),k=0;while(e.scrollWidth>e.clientWidth+1&&f>9&&k++<80){f-=0.5;e.style.fontSize=f+'px'}});const hs=[...box.querySelectorAll('h4.sbh')].filter(e=>e.offsetWidth);if(hs.some(e=>e.style.fontSize)){const m=Math.min(...hs.map(e=>parseFloat(getComputedStyle(e).fontSize)));hs.forEach(e=>e.style.fontSize=m+'px')}}
  const qf=()=>requestAnimationFrame(fitL);addEventListener('resize',qf);new MutationObserver(qf).observe(box,{childList:true,subtree:true,characterData:true});
  calcInit(box);newObj();qf();
}

/* ===== أدوات مشتركة لتجارب الوحدة الثالثة (الفيزياء الحرارية) ===== */
function hxScene(o){/* o:{cups:[{x,wc,sc,lv,ice,boil,steam}],probe:{x,tz},R,heater:{x,on},jm,sw,pour:[x0,x1],lbls:[[x,d,z,tx,ty,t,anc]]} */
  o=o||{};const BASE=250,T=14,D=40,CH=78,RX=30,RY=10,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${t}</text>`;
  const cups=o.cups||[],rimFix=[];
  let g=`<defs><linearGradient id="hxCup" x1="0" x2="1"><stop offset="0" stop-color="#E2E8F0"/><stop offset=".45" stop-color="#FFFFFF"/><stop offset="1" stop-color="#CBD5E1"/></linearGradient><linearGradient id="hxRod" x1="0" x2="1"><stop offset="0" stop-color="#94A3B8"/><stop offset=".5" stop-color="#F1F5F9"/><stop offset="1" stop-color="#64748B"/></linearGradient></defs>`;
  g+=box(6,346,0,86,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* عداد الطاقة (الجول ميتر) خلف الكوب */
  if(o.jm!=null){g+=box(36,112,52,72,T,T+44,'#1E3A8A','#3B82F6','#1E40AF','#172554');const a=S(40,52,T+36),b=S(108,52,T+14);
    g+=`<rect x="${a[0]}" y="${a[1]}" width="${b[0]-a[0]}" height="${b[1]-a[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b[0])/2}" y="${(a[1]+b[1])/2+4}" font-size="10.5" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.jm} J</text>`;
    const p=S(36,62,T+30);g+=`<path d="M${p[0]},${p[1]} c-14,4 -20,20 -24,34" fill="none" stroke="#1F2937" stroke-width="2"/><rect x="${p[0]-30}" y="${p[1]+32}" width="12" height="8" rx="2" fill="#334155"/>`}
  cups.forEach(c=>{const [cx,yt]=S(c.x,D,T+CH);if(c.cal)g+=`<ellipse cx="${cx}" cy="${yt}" rx="${RX+6}" ry="${RY+2}" fill="#CBD5E1" stroke="#475569" stroke-width="1.4"/>`;g+=`<ellipse cx="${cx}" cy="${yt}" rx="${RX}" ry="${RY}" fill="${c.glass?'#E0F2FE':'#94A3B8'}" stroke="${c.glass?'#64748B':'#475569'}" stroke-width="1.4"/>`;
    if(!c.cal&&c.lv>0.03){const [,yw]=S(c.x,D,T+CH-5-(1-Math.min(1,c.lv))*6);g+=`<ellipse cx="${cx}" cy="${yw}" rx="${RX-3}" ry="${RY-1}" fill="${c.wc}" stroke="${c.sc}" stroke-width="1"/>`;
      if(c.boil)for(let i=0;i<7;i++)g+=`<circle cx="${cx-18+i*6}" cy="${yw-3+(i%3)*3}" r="${1.6+(i%2)}" fill="#fff" stroke="${c.sc}" stroke-width=".6"/>`;
      if(c.ice){const k=c.isz==null?1:c.isz;for(let i=0;i<c.ice;i++){const w=10*k,x=cx-20+i*13,y=yw-5+(i%2)*4;if(w>1.5)g+=`<rect x="${x}" y="${y-w/2}" width="${w}" height="${w}" rx="2" fill="#F0F9FF" stroke="#7DD3FC" stroke-width="1.2" transform="rotate(${i*17-10} ${x+w/2} ${y})"/>`}}}
    else if(!c.cal&&!c.glass&&c.ice){const [,yb]=S(c.x,D,T+CH-4);for(let i=0;i<c.ice;i++){const x=cx-20+(i%3)*13,y=yb-4-Math.floor(i/3)*10;g+=`<rect x="${x}" y="${y-5}" width="10" height="10" rx="2" fill="#F0F9FF" stroke="#7DD3FC" stroke-width="1.2" transform="rotate(${i*17-10} ${x+5} ${y})"/>`}}
    if(c.steam){for(let i=-1;i<=1;i++)g+=`<path d="M${cx+i*12},${yt-6} c-6,-8 6,-14 0,-22 c-6,-8 6,-14 0,-20" fill="none" stroke="#94A3B8" stroke-width="2" opacity=".55"/>`}
});
  if(o.pour){const a=S(o.pour[0]+RX-4,D,T+CH),b=S(o.pour[1]-6,D,T+CH-8);g+=`<path d="M${a[0]},${a[1]} Q${(a[0]+b[0])/2},${a[1]-40} ${b[0]},${b[1]}" fill="none" stroke="${o.pourC||'#F87171'}" stroke-width="5" stroke-linecap="round" opacity=".85"/>`}
  if(o.flyIce){const [x,y0]=S(o.flyIce[0],D,o.flyIce[1]),y=y0+(cups.some(c=>c.cal)?17:0);for(let i=0;i<3;i++)rimFix[rimFix.length]=`<rect x="${x-16+i*12}" y="${y-5}" width="10" height="10" rx="2" fill="#F0F9FF" stroke="#7DD3FC" stroke-width="1.2"/>`}
  /* جهاز القراءة الرقمي */
  if(o.probe){g+=box(282,340,6,30,T,T+50,'#334155','#475569','#1F2937','#0F172A');const a=S(286,6,T+40),b=S(336,6,T+14);
    g+=`<rect x="${a[0]}" y="${a[1]}" width="${b[0]-a[0]}" height="${b[1]-a[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b[0])/2}" y="${(a[1]+b[1])/2+4}" font-size="11" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.R||'--.-'} °C</text>`}
  /* السخان الكهربائي (سخان غمر) */
  if(o.heater){const hx=o.heater.x,on=o.heater.on,[a,yb]=S(hx-8,D,T+10),[b]=S(hx+8,D,T+10),[,yh]=S(hx,D,T+CH+34),[,yh2]=S(hx,D,T+CH+50);
    let z=`M${a},${yh} V${yb-8}`;for(let i=0;i<5;i++)z+=` q${8},${6} 16,0 q${-8},${-6} -16,0`;z+=` M${b},${yb-8} V${yh}`;
    const hs=`<path d="${z}" fill="none" stroke="${on?'#EF4444':'#64748B'}" stroke-width="3"/><rect x="${a-4}" y="${yh2}" width="${b-a+8}" height="${yh-yh2}" rx="3" fill="#1F2937"/>`;
    g+=hs;rimFix.push(`<path d="M${a},${yh} V${S(hx,D,T+CH)[1]+RY} M${b},${yh} V${S(hx,D,T+CH)[1]+RY}" fill="none" stroke="${on?'#EF4444':'#64748B'}" stroke-width="3"/><rect x="${a-4}" y="${yh2}" width="${b-a+8}" height="${yh-yh2}" rx="3" fill="#1F2937"/>`);
    if(o.jm!=null){const k=S(112,62,T+40);g+=`<path d="M${(a+b)/2},${yh2} C${(a+b)/2-10},${yh2-30} ${k[0]+20},${k[1]-30} ${k[0]},${k[1]}" fill="none" stroke="#1F2937" stroke-width="2.2"/>`}}
  if(o.probe){const px=o.probe.x,tz=o.probe.tz,[ax,ay]=S(px,D,tz),[,ry]=S(px,D,tz+72),[,hy]=S(px,D,tz+96);
    {const k=S(300,18,T+50);g+=`<path d="M${ax},${hy} C${ax+30},${hy-36} ${k[0]+10},${k[1]-90} ${k[0]},${k[1]}" fill="none" stroke="#1F2937" stroke-width="2.2"/>`}
    g+=`<rect x="${ax-2}" y="${ry}" width="4" height="${ay-ry}" fill="url(#hxRod)" stroke="#475569" stroke-width=".8"/><circle cx="${ax}" cy="${ay}" r="2.6" fill="#F7931E"/><rect x="${ax-5}" y="${hy}" width="10" height="${ry-hy}" rx="3" fill="#1F2937" stroke="#0F172A"/>`;
    const [,rim]=S(px,D,T+CH),pc=cups.find(c=>Math.abs(c.x-px)<1),pe=pc&&pc.cal?rim-7:rim+RY;if(pc&&ay>rim)rimFix.push(`<rect x="${ax-2}" y="${ry}" width="4" height="${Math.max(0,pe-ry)}" fill="url(#hxRod)" stroke="#475569" stroke-width=".8"/><rect x="${ax-5}" y="${hy}" width="10" height="${ry-hy}" rx="3" fill="#1F2937" stroke="#0F172A"/>`)}
  cups.forEach(c=>{const [cx,yt]=S(c.x,D,T+CH),[,yb]=S(c.x,D,T),R2=c.cal?RX+6:RX,Q2=c.cal?RY+2:RY;if(c.glass){/* وعاء زجاجي شفاف: يظهر الجليد داخله */g+=`<path d="M${cx-R2},${yt} L${cx-R2},${yb} A${R2},${Q2} 0 0 0 ${cx+R2},${yb} L${cx+R2},${yt}" fill="#E0F2FE" fill-opacity=".35" stroke="#64748B" stroke-width="1.4"/>`;if(c.ice&&!(c.lv>0.03)){for(let i=0;i<c.ice;i++){const col=i%3,row=Math.floor(i/3),w=12,x=cx-21+col*14+(row%2)*4,y=yb-6-w-row*11;g+=`<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="2" fill="#F0F9FF" stroke="#38BDF8" stroke-width="1.2" transform="rotate(${i*19-12} ${x+w/2} ${y+w/2})"/>`}}g+=`<path d="M${cx-R2},${yt} A${R2},${Q2} 0 0 0 ${cx+R2},${yt}" fill="none" stroke="#64748B" stroke-width="1.4"/><path d="M${cx-R2+5},${yt+12} L${cx-R2+5},${yb-6}" stroke="#FFFFFF" stroke-width="3" opacity=".7"/>`}else g+=`<path d="M${cx-R2},${yt} L${cx-R2},${yb} A${R2},${Q2} 0 0 0 ${cx+R2},${yb} L${cx+R2},${yt} A${R2},${Q2} 0 0 1 ${cx-R2},${yt} Z" fill="url(#hxCup)" stroke="#475569" stroke-width="1.4"/>`;if(c.cal){/* المسعر الحراري: غطاء كامل فيه فتحتان، ونافذة مقطع أمامية تظهر الماء والجليد داخله */
      const L=cx-R2,Rr=cx+R2,h=5,up=o.flyIce?22:0,ly=yt-h-up;if(up)g+=`<path d="M${cx-RX},${yt} A${RX},${RY} 0 0 0 ${cx+RX},${yt}" fill="none" stroke="#475569" stroke-width="1.2"/>`;g+=`<path d="M${L},${ly+h} L${L},${ly} A${R2},${Q2} 0 0 0 ${Rr},${ly} L${Rr},${ly+h} A${R2},${Q2} 0 0 1 ${L},${ly+h} Z" fill="#94A3B8" stroke="#475569" stroke-width="1.2"/><ellipse cx="${cx}" cy="${ly}" rx="${R2}" ry="${Q2}" fill="#E2E8F0" stroke="#475569" stroke-width="1.3"/><ellipse cx="${cx}" cy="${ly}" rx="4" ry="1.8" fill="#334155"/><ellipse cx="${cx+15}" cy="${ly+2}" rx="3" ry="1.4" fill="#334155"/>`;
      const x0=cx-17,x1=cx+21,y0=yt+Q2+6,y1=yb-2,lv=Math.max(0,Math.min(1,c.lv||0)),wT=y0+(1-lv)*(y1-y0)*0.92;
      g+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="#CBD5E1"/>`;
      if(lv>0.03){g+=`<rect x="${x0}" y="${wT}" width="${x1-x0}" height="${y1-wT}" fill="${c.wc}" opacity=".95"/><line x1="${x0}" y1="${wT}" x2="${x1}" y2="${wT}" stroke="${c.sc}" stroke-width="1.2"/>`;
        if(c.ice){const k=c.isz==null?1:c.isz,n=Math.min(7,c.ice+2),w=k>0.05?5+4.5*k:0;if(w)for(let i=0;i<n;i++){const r=i<4?0:1,xi=x0+3+(r?4.5:0)+(i%4)*9,yi=wT-w*0.55+r*(w*0.9);g+=`<rect x="${xi}" y="${yi}" width="${w}" height="${w}" rx="1.5" fill="#F0F9FF" stroke="#38BDF8" stroke-width="1" transform="rotate(${i*23-12} ${xi+w/2} ${yi+w/2})"/>`}}}
      if(o.probe&&Math.abs(o.probe.x-c.x)<1){const [,ty]=S(c.x,D,o.probe.tz),yb2=Math.min(ty,y1-1);if(yb2>y0){g+=`<rect x="${cx-2}" y="${y0}" width="4" height="${yb2-y0}" fill="url(#hxRod)" stroke="#475569" stroke-width=".7"/>`;if(ty<y1)g+=`<circle cx="${cx}" cy="${ty}" r="2.4" fill="#F7931E"/>`}}
      {const sx=cx+15,[,sb]=S(c.x,D,T+18);g+=`<line x1="${sx}" y1="${y0}" x2="${sx}" y2="${sb}" stroke="#64748B" stroke-width="2"/><ellipse cx="${sx}" cy="${sb}" rx="5" ry="1.8" fill="none" stroke="#64748B" stroke-width="1.8"/>`;
        rimFix.push(`<line x1="${sx}" y1="${ly-40}" x2="${sx}" y2="${ly+2}" stroke="#64748B" stroke-width="2.4"/><circle cx="${sx}" cy="${ly-46}" r="6" fill="none" stroke="#64748B" stroke-width="2.4"/>`)}
      g+=`<rect x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" fill="none" stroke="#475569" stroke-width="1.4"/><rect x="${x0+2.5}" y="${y0+2.5}" width="${x1-x0-5}" height="${y1-y0-5}" fill="none" stroke="#94A3B8" stroke-width="1" stroke-dasharray="3 2"/>`}});
  g+=rimFix.join('');
  if(o.sw!=null){const [sx,sy]=S(26,70,T);g+=`<rect x="${sx-4}" y="${sy-44}" width="8" height="6" rx="1.5" fill="#475569"/><circle cx="${sx}" cy="${sy-22}" r="17" fill="#1F2937" stroke="#0F172A"/><circle cx="${sx}" cy="${sy-22}" r="13" fill="#E2E8F0"/><text x="${sx}" y="${sy-18}" font-size="10" font-weight="800" text-anchor="middle" fill="#0F172A" font-family="Consolas,monospace" direction="ltr">${o.sw} s</text>`}
  (o.lbls||[]).forEach(([x,d,z,tx,ty,t,anc])=>{g+=lbl(...S(x,d,z),tx,ty,t,anc)});
  return `<svg viewBox="0 0 400 ${BASE+((o.lbls||[]).length?44:12)}" aria-label="${o.aria||'أدوات تجربة حرارية'}">${g}</svg>`}
function hxBal(v,lab,kind){/* kind: hot|cold|ice */const wc=kind==='hot'?'#FCA5A5':kind==='warm'?'#FECACA':'#93C5FD',sc=kind==='hot'||kind==='warm'?'#B91C1C':'#1D4ED8';
  let cup=`<path d="M170,24 L172,80 L228,80 L230,24 Z" fill="#F8FAFC" stroke="#475569" stroke-width="1.4"/>`;
  if(kind==='ice')for(let i=0;i<6;i++){const x=176+(i%3)*16,y=60-Math.floor(i/3)*16;cup+=`<rect x="${x}" y="${y}" width="13" height="13" rx="2" fill="#F0F9FF" stroke="#0EA5E9" stroke-width="1.2" transform="rotate(${i*13-8} ${x+6} ${y+6})"/>`}
  else cup+=`<path d="M171,40 L172,79 L228,79 L229,40 Z" fill="${wc}" stroke="${sc}"/>`;
  return `<svg viewBox="0 0 400 170" aria-label="الميزان الرقمي"><rect x="90" y="92" width="220" height="62" rx="10" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="110" y="106" width="130" height="34" rx="5" fill="#BBF7D0" stroke="#14532D"/><text x="175" y="130" font-size="20" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${v}</text><text x="270" y="130" font-size="16" font-weight="800" fill="#fff">g</text><rect x="120" y="80" width="160" height="12" rx="3" fill="#94A3B8" stroke="#475569"/>${cup}<ellipse cx="200" cy="24" rx="30" ry="5" fill="#E2E8F0" stroke="#475569"/>${kind!=='ice'?`<text x="200" y="66" font-size="14" font-weight="800" text-anchor="middle" fill="${sc}" direction="ltr">${lab}</text>`:''}
  <text x="12" y="166" font-size="12" font-weight="700" fill="var(--muted)">‏الميزان الرقمي (مصفر لكتلة الكوب)‏</text></svg>`}
const hxZoom=(scrs,cap)=>`<rect x="20" y="4" width="360" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/>`+scrs.map(([x,w,txt])=>`<rect x="${x}" y="16" width="${w}" height="62" rx="8" fill="#BBF7D0" stroke="#14532D"/><text x="${x+w/2}" y="57" font-size="${w<150?20:24}" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${txt}</text>`).join('')+`<text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏${cap}‏</text>`;
function hxKit(box){/* أدوات مشتركة داخل كل تجربة */
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  return {$,num,fb,fb0,r1:x=>Math.round(x*10)/10,fx:(x,n)=>String(+(+x).toFixed(n))}}
const hxCalcStep=(id,lawTxt,label,unit)=>`<div class="cstep"><div class="law ftl"><div class="ln lw"><b>التعويض</b><span id="sb${id}" style="white-space:pre-line;line-height:2">${lawTxt}</span></div></div>
    <p class="slh">🧮 احسب الناتج بنفسك بالآلة الحاسبة، ثم ضع النتيجة في الخانة.</p><div class="labCalc"></div>
    <div class="ans"><label>${label}</label><input id="c${id}" inputmode="decimal" dir="ltr" placeholder="${unit}"><button type="button" class="go" id="c${id}k">تحقق</button></div><div class="fb2" id="c${id}f"></div></div>`;
const hxRow=(id,lab)=>`<div class="row"><label for="${id}">${lab}</label><output id="${id}O"></output><input id="${id}" type="range" min="0" max="100" step="1" value="0"></div>`;
const hxAns=(id,lab,unit)=>`<div class="ans"><label>${lab}</label><input id="${id}" inputmode="decimal" dir="ltr" placeholder="${unit}"><button type="button" class="go" id="${id}Ck">تحقق</button></div><div class="fb2" id="${id}Fb"></div>`;
const HX_T=14,HX_CH=78,HX_IN=34,HX_UP=14+78+26;
const hxPath=(v,x0,x1)=>v<=30?{x:x0,tz:HX_IN+v/30*(HX_UP-HX_IN)}:v<=70?{x:x0+(x1-x0)*(v-30)/40,tz:HX_UP}:{x:x1,tz:HX_UP-(v-70)/30*(HX_UP-HX_IN)};

/* ===== 2-1 الحرارة: الطاقة الحرارية من سخان كهربائي والتحويل بين الجول والسعر ===== */
function q1Lab(box){
  const CX=228,W=['#93C5FD','#1D4ED8'];
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">قياس الطاقة الحرارية الناتجة من سخان كهربائي وتحويلها بين الجول والسعر</p></div>
  <div class="tags"><span class="tag">الطاقة الحرارية Q: <i>عداد الطاقة (Joulemeter)</i> · J</span><span class="tag">درجة الحرارة T: <i>أداة الميزان الحراري الرقمي</i> · °C</span><span class="tag dv">Q بالسعر والكيلو سعر: <i>كمية محولة</i> · cal و kcal</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على سخان الغمر الكهربائي وعداد الطاقة وأداة الميزان الحراري الرقمي.</li>
    <li>ملاحظة تحول الطاقة الكهربائية إلى طاقة حرارية تنتقل إلى الماء فترتفع درجة حرارته.</li>
    <li>قراءة الطاقة الحرارية <span dir="ltr">Q</span> بالجول من عداد الطاقة.</li>
    <li>تحويل الطاقة الحرارية من الجول إلى السعر، ثم إلى الكيلو سعر.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${hxScene({cups:[{x:CX,wc:W[0],sc:W[1],lv:0.75}],heater:{x:CX-8,on:false},jm:'0',probe:{x:CX+14,tz:HX_IN},R:'22.0',lbls:[[CX-30,40,40,200,264,'كوب عازل فيه ماء'],[CX-16,40,110,170,24,'سخان الغمر الكهربائي'],[60,52,30,46,264,'عداد الطاقة'],[CX+16,40,130,396,60,'مجس الميزان الحراري','end'],[320,6,30,396,264,'شاشة الميزان الحراري','end']]})}</div><div class="vcap">سخان غمر كهربائي في كوب ماء، متصل بعداد طاقة: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> سخان الغمر الكهربائي مغمور في ماء داخل كوب عازل، وهو موصل بالكهرباء عبر عداد الطاقة الذي يقيس الطاقة المستهلكة بالجول، ومجس الميزان الحراري في الماء متصل بشاشته.</p></div>
    <div class="tool"><p><b>سخان الغمر الكهربائي <span dir="ltr">(Immersion Heater)</span>:</b> ملف معدني يسخن عند مرور التيار الكهربائي، فيحول الطاقة الكهربائية إلى طاقة حرارية تنتقل إلى الماء.</p>
    <p><b>عداد الطاقة <span dir="ltr">(Joulemeter)</span>:</b> يعرض الطاقة التي يحولها السخان بوحدة الجول <span dir="ltr">J</span> مباشرة.</p>
    <p><b>أداة الميزان الحراري الرقمي:</b> يعرض درجة حرارة الماء بوحدة <span dir="ltr">°C</span> بدقة <span dir="ltr">0.1 °C</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الحرارة شكل من أشكال الطاقة، ومن مصادرها الكهرباء، ووحدتها في النظام الدولي الجول</b><span>Q (J)</span></div>
      <div class="ln lw"><b>العلاقة بين السعر والجول</b><span>1 cal = 4.186 J</span></div>
      <div class="ln lw"><b>العلاقة بين الكيلو سعر والسعر</b><span>1 kcal = 1000 cal</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">Q</span> كمية الحرارة (الطاقة الحرارية)، ووحدتها في النظام الدولي الجول <span dir="ltr">J</span></li>
      <li><span class="chip" dir="ltr">cal</span> السعر الحراري: كمية الحرارة اللازمة لرفع درجة حرارة <span dir="ltr">1 g</span> من الماء درجة سلسيوس واحدة</li>
      <li><span class="chip" dir="ltr">kcal</span> الكيلو سعر، ويساوي <span dir="ltr">1000 cal</span></li>
      <li><span class="chip" dir="ltr">T</span> درجة حرارة الماء، ووحدتها <span dir="ltr">°C</span></li></ul></div>
      ${convBox(['Q(cal) = Q(J) / 4.186','Q(kcal) = Q(cal) / 1000'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) تشغيل السخان وقراءة الطاقة الحرارية من عداد الطاقة</h4>
    <div class="stage"><div id="sS"></div><svg id="sZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="sSt"></span></div></div>
    ${hxRow('sR','تشغيل السخان')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لتشغيل السخان حتى يتوقف تلقائيا، ولاحظ ارتفاع درجة حرارة الماء، ثم اقرأ الطاقة من شاشة عداد الطاقة.</p>
    ${hxAns('qIn','قراءتك للطاقة الحرارية Q','J')}
    <h4 class="sbh">ب) تحويل الطاقة الحرارية من الجول إلى السعر</h4>
    ${hxCalcStep('C','Q(cal) = Q(J) / 4.186','احسب Q بوحدة cal','cal')}
    <h4 class="sbh">ج) تحويل الطاقة الحرارية من السعر إلى الكيلو سعر</h4>
    ${hxCalcStep('K','Q(kcal) = Q(cal) / 1000','احسب Q بوحدة kcal','kcal')}
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين قيم الطاقة الحرارية بالوحدات الثلاث</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>درجة حرارة الماء قبل التسخين</td><td id="r1">—</td></tr><tr><td>درجة حرارة الماء بعد التسخين</td><td id="r2">—</td></tr>
    <tr><td>الطاقة الحرارية Q بالجول</td><td id="r3">—</td></tr><tr><td>الطاقة الحرارية Q بالسعر</td><td id="r4">—</td></tr><tr><td>الطاقة الحرارية Q بالكيلو سعر</td><td id="r5">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const {$,num,fb,fb0,r1,fx}=hxKit(box);let Q,T0,DT,ok={};
  const QC=()=>Q/4.186,QK=()=>QC()/1000;
  function newObj(){Q=10*Math.floor(300+Math.random()*600);T0=r1(20+Math.random()*5);DT=r1(Q/(0.2*4186));ok={};$('sR').value=0;['qIn','cC','cK'].forEach(k=>$(k).value='');['qInFb','cCf','cKf'].forEach(fb0);sDraw();sub();results()}
  function sDraw(){const v=+$('sR').value,done=v>=100,E=Math.round(Q*v/100),T=r1(T0+DT*v/100);
    $('sRO').textContent=done?'توقف السخان':v>0?'يعمل…':'';$('sSt').textContent=done?'✓ توقف السخان، اقرأ الطاقة الحرارية من عداد الطاقة':v>0?'السخان يحول الطاقة الكهربائية إلى حرارة، ودرجة حرارة الماء ترتفع…':'السخان متوقف';
    $('sS').innerHTML=hxScene({cups:[{x:CX,wc:W[0],sc:W[1],lv:0.75,steam:v>60}],heater:{x:CX-8,on:v>0&&!done},jm:String(E),probe:{x:CX+14,tz:HX_IN},R:T.toFixed(1)});
    $('sZ').innerHTML=hxZoom([[36,210,`Q = ${E} J`],[256,108,`${T.toFixed(1)}°C`]],'شاشتا عداد الطاقة وجهاز قراءة الحرارة (مكبرتان)')}
  function sub(){$('sbC').textContent=ok.q?['Q(cal) = Q(J) / 4.186',E(`Q = ${Q} / 4.186`)].join('\n'):'Q(cal) = Q(J) / 4.186';
    $('sbK').textContent=ok.cC?['Q(kcal) = Q(cal) / 1000',E(`Q = ${fx(QC(),1)} / 1000`)].join('\n'):'Q(kcal) = Q(cal) / 1000'}
  function results(){$('r1').textContent=ok.q?E(T0.toFixed(1)+' °C'):'—';$('r2').textContent=ok.q?E(r1(T0+DT).toFixed(1)+' °C'):'—';$('r3').textContent=ok.q?E(Q+' J'):'—';$('r4').textContent=ok.cC?E(fx(QC(),1)+' cal'):'—';$('r5').textContent=ok.cK?E(fx(QK(),3)+' kcal'):'—';
    const all=ok.cK;$('cmpS').textContent=all?[E(`Q = ${Q} J`),E(`Q = ${fx(QC(),1)} cal`),E(`Q = ${fx(QK(),3)} kcal`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'الكمية نفسها من الطاقة الحرارية، لكن عددها بالجول أكبر لأن الجول وحدة أصغر من السعر، وعددها بالكيلو سعر أصغر لأنه وحدة أكبر.':'';
    $('rNote').innerHTML=all?`الاستنتاج: تحولت الطاقة الكهربائية في السخان إلى طاقة حرارية انتقلت إلى الماء فارتفعت درجة حرارته من <span dir="ltr">${T0.toFixed(1)} °C</span> إلى <span dir="ltr">${r1(T0+DT).toFixed(1)} °C</span>، والحرارة طاقة تقاس بالجول ويمكن تحويلها إلى السعر <span dir="ltr" style="white-space:nowrap">1 cal = 4.186 J</span>.`:'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('sR').oninput=sDraw;
  $('qInCk').onclick=()=>{if(+$('sR').value<100)return fb('qInFb',false,'ابدأ تشغيل السخان حتى يتوقف تلقائيا أولا.');const v=num($('qIn').value);if(isNaN(v))return fb('qInFb',false,'اكتب قراءتك بالجول.');
    if(Math.abs(v-Q)<0.5){ok.q=true;fb('qInFb',true,'✓ قراءة صحيحة:\n'+E(`Q = ${Q} J`))}else fb('qInFb',false,'✗ اكتب الرقم الظاهر على شاشة عداد الطاقة.');sub();results()};
  $('cCk').onclick=()=>{if(!ok.q)return fb('cCf',false,'اقرأ الطاقة من عداد الطاقة أولا.');const v=num($('cC').value);if(isNaN(v))return fb('cCf',false,'اكتب الناتج بوحدة cal.');
    if(Math.abs(v-QC())/QC()<0.005){ok.cC=true;fb('cCf',true,'✓ إجابة صحيحة:\n'+E(`Q = ${Q} / 4.186 = ${fx(QC(),1)} cal`))}else fb('cCf',false,'✗ اقسم الطاقة بالجول على 4.186:\n'+E(`Q = ${Q} / 4.186`));sub();results()};
  $('cKk').onclick=()=>{if(!ok.cC)return fb('cKf',false,'أكمل التحويل إلى السعر أولا.');const v=num($('cK').value);if(isNaN(v))return fb('cKf',false,'اكتب الناتج بوحدة kcal.');
    if(Math.abs(v-QK())/QK()<0.005){ok.cK=true;fb('cKf',true,'✓ إجابة صحيحة:\n'+E(`Q = ${fx(QC(),1)} / 1000 = ${fx(QK(),3)} kcal`))}else fb('cKf',false,'✗ اقسم الطاقة بالسعر على 1000:\n'+E(`Q = ${fx(QC(),1)} / 1000`));sub();results()};
  $('nw').onclick=newObj;calcInit(box);newObj()}

/* ===== 2-2 درجة الحرارة ومقاييسها ===== */
function tsLab(box){
  const HX=110,CX=228,BW=['#FCA5A5','#B91C1C'],IW=['#BAE6FD','#0369A1'];
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">قياس درجتي انصهار الجليد وغليان الماء والتحويل بين مقاييس درجة الحرارة</p></div>
  <div class="tags"><span class="tag">درجة الحرارة C: <i>أداة الميزان الحراري الرقمي</i> · °C</span><span class="tag dv">K و F: <i>كميات محولة</i> · K و °F</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على أداة الميزان الحراري الرقمي ومجسها وشاشتها.</li>
    <li>قياس درجة حرارة خليط الماء والجليد (نقطة انصهار الجليد) بالمقياس السلسيوسي.</li>
    <li>قياس درجة حرارة الماء المغلي (نقطة غليان الماء) بالمقياس السلسيوسي.</li>
    <li>تحويل القراءتين إلى مقياس كلفن والمقياس الفهرنهايتي ومقارنتها بالقيم المعيارية.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${hxScene({cups:[{x:HX,wc:BW[0],sc:BW[1],lv:1,boil:true,steam:true},{x:CX,wc:IW[0],sc:IW[1],lv:0.85,ice:4}],probe:{x:CX,tz:HX_UP},lbls:[[HX-14,40,86,8,24,'ماء يغلي','start'],[CX-16,40,85,150,24,'ماء وجليد'],[CX,40,HX_UP+40,396,60,'مجس الميزان الحراري','end'],[320,6,30,396,264,'شاشة الميزان الحراري','end'],[HX,40,20,150,264,'كوب عازل']]})}</div><div class="vcap">مجس حرارة رقمي وكوبان: ماء يغلي وماء وجليد</div>
    <p><b>ترتيب الأجهزة:</b> كوب فيه خليط من الماء والجليد، وكوب فيه ماء يغلي، ومجس الميزان الحراري متصل بسلك بشاشته.</p></div>
    <div class="tool"><p><b>أداة الميزان الحراري الرقمي <span dir="ltr">(Digital Thermometer)</span>:</b> يقيس درجة الحرارة بالمقياس السلسيوسي <span dir="ltr">°C</span> بدقة <span dir="ltr">0.1 °C</span>.</p>
    <p><b>خليط الماء والجليد:</b> درجة حرارته ثابتة عند نقطة انصهار الجليد ما دام فيه جليد.</p>
    <p><b>الماء المغلي:</b> درجة حرارته ثابتة عند نقطة الغليان ما دام يغلي، وهي <span dir="ltr">100 °C</span> عند الضغط الجوي المعياري، وأقل قليلا في المرتفعات.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>التحويل من المقياس السلسيوسي إلى مقياس كلفن</b><span>K = C + 273</span></div>
      <div class="ln lw"><b>التحويل من المقياس السلسيوسي إلى المقياس الفهرنهايتي</b><span>F = 1.8·C + 32</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">C</span> درجة الحرارة بالمقياس السلسيوسي، ووحدتها <span dir="ltr">°C</span></li>
      <li><span class="chip" dir="ltr">K</span> درجة الحرارة بمقياس كلفن (المقياس المطلق)، ووحدتها <span dir="ltr">K</span></li>
      <li><span class="chip" dir="ltr">F</span> درجة الحرارة بالمقياس الفهرنهايتي، ووحدتها <span dir="ltr">°F</span></li>
      <li><span class="chip" dir="ltr">273</span> و <span class="chip" dir="ltr">32</span> و <span class="chip" dir="ltr">1.8</span> ثوابت التحويل، وليس لها وحدة</li></ul></div>
      <div class="tw"><table class="rt"><thead><tr><th>النقطة</th><th>°C</th><th>K</th><th>°F</th></tr></thead><tbody><tr><td>انصهار الجليد</td><td>0</td><td>273</td><td>32</td></tr><tr><td>غليان الماء</td><td>100</td><td>373</td><td>212</td></tr></tbody></table></div></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس درجة حرارة خليط الماء والجليد C₁</h4>
    <div class="stage"><div id="aS"></div><svg id="aZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="aSt"></span></div></div>
    ${hxRow('aR','إنزال المجس')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال مجس الميزان الحراري في خليط الماء والجليد، ثم اقرأ درجة الحرارة من الشاشة المكبرة.</p>
    ${hxAns('aIn','قراءتك لدرجة حرارة خليط الماء والجليد C₁','°C')}
    <h4 class="sbh">ب) قياس درجة حرارة الماء المغلي C₂</h4>
    <div class="stage"><div id="bS"></div><svg id="bZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="bSt"></span></div></div>
    ${hxRow('bR','نقل المجس')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لنقل مجس الميزان الحراري إلى الماء المغلي حتى تثبت القراءة، ثم اقرأ درجة الحرارة.</p>
    ${hxAns('bIn','قراءتك لدرجة حرارة الماء المغلي C₂','°C')}
    <h4 class="sbh">ج) التحويل إلى مقياس كلفن</h4>
    ${hxCalcStep('K1','K = C + 273','احسب K₁ لخليط الماء والجليد','K')}
    ${hxCalcStep('K2','K = C + 273','احسب K₂ للماء المغلي','K')}
    <h4 class="sbh">د) التحويل إلى المقياس الفهرنهايتي</h4>
    ${hxCalcStep('F1','F = 1.8·C + 32','احسب F₁ لخليط الماء والجليد','°F')}
    ${hxCalcStep('F2','F = 1.8·C + 32','احسب F₂ للماء المغلي','°F')}
  </div>
  <div class="ctl"><h3>5.2 المقارنة بالقيم المعيارية</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>القياس</th><th>°C</th><th>K</th><th>°F</th></tr></thead>
    <tbody><tr><td>خليط الماء والجليد</td><td id="r1">—</td><td id="r2">—</td><td id="r3">—</td></tr><tr><td>الماء المغلي</td><td id="r4">—</td><td id="r5">—</td><td id="r6">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const {$,num,fb,fb0,r1,fx}=hxKit(box);let C1,C2,ok={};
  const KK=c=>c+273,FF=c=>1.8*c+32;
  function newObj(){C1=r1(Math.random()*0.4);C2=r1(98.5+Math.random()*1.3);ok={};['aR','bR'].forEach(k=>$(k).value=0);['aIn','bIn','cK1','cK2','cF1','cF2'].forEach(k=>$(k).value='');['aInFb','bInFb','cK1f','cK2f','cF1f','cF2f'].forEach(fb0);aDraw();bDraw();sub();results()}
  const cups=()=>[{x:HX,wc:BW[0],sc:BW[1],lv:1,boil:true,steam:true},{x:CX,wc:IW[0],sc:IW[1],lv:0.85,ice:4}];
  function aDraw(){const v=+$('aR').value,on=v>=100;$('aRO').textContent=on?'في الخليط':'';$('aSt').textContent=on?'✓ المجس في خليط الماء والجليد، اقرأ درجة الحرارة':'أنزل المجس حتى يستقر في الخليط';
    $('aS').innerHTML=hxScene({cups:cups(),probe:{x:CX,tz:HX_UP-v/100*(HX_UP-HX_IN)},R:on?C1.toFixed(1):null});$('aZ').innerHTML=hxZoom([[56,288,`T = ${on?C1.toFixed(1):'--.-'} °C`]],'شاشة الميزان الحراري (مكبرة)')}
  function bDraw(){const v=+$('bR').value,on=v>=100,q=hxPath(100-v,HX,CX);$('bRO').textContent=on?'في الماء المغلي':'';$('bSt').textContent=on?'✓ ثبتت القراءة، اقرأ درجة حرارة الماء المغلي':'انقل المجس إلى الماء المغلي';
    $('bS').innerHTML=hxScene({cups:cups(),probe:{x:q.x,tz:q.tz},R:on?C2.toFixed(1):null});$('bZ').innerHTML=hxZoom([[56,288,`T = ${on?C2.toFixed(1):'--.-'} °C`]],'شاشة الميزان الحراري (مكبرة)')}
  function sub(){$('sbK1').textContent=ok.a?['K = C + 273',E(`K₁ = ${C1.toFixed(1)} + 273`)].join('\n'):'K = C + 273';$('sbK2').textContent=ok.b?['K = C + 273',E(`K₂ = ${C2.toFixed(1)} + 273`)].join('\n'):'K = C + 273';
    $('sbF1').textContent=ok.a?['F = 1.8·C + 32',E(`F₁ = 1.8 × ${C1.toFixed(1)} + 32`)].join('\n'):'F = 1.8·C + 32';$('sbF2').textContent=ok.b?['F = 1.8·C + 32',E(`F₂ = 1.8 × ${C2.toFixed(1)} + 32`)].join('\n'):'F = 1.8·C + 32'}
  function results(){$('r1').textContent=ok.a?E(C1.toFixed(1)):'—';$('r4').textContent=ok.b?E(C2.toFixed(1)):'—';$('r2').textContent=ok.K1?E(fx(KK(C1),1)):'—';$('r5').textContent=ok.K2?E(fx(KK(C2),1)):'—';$('r3').textContent=ok.F1?E(fx(FF(C1),2)):'—';$('r6').textContent=ok.F2?E(fx(FF(C2),2)):'—';
    const all=ok.K1&&ok.K2&&ok.F1&&ok.F2;
    $('cmpS').textContent=all?['خليط الماء والجليد:',E(`${C1.toFixed(1)} °C = ${fx(KK(C1),1)} K = ${fx(FF(C1),2)} °F`),'(القيمة المعيارية: 0 °C = 273 K = 32 °F)','الماء المغلي:',E(`${C2.toFixed(1)} °C = ${fx(KK(C2),1)} K = ${fx(FF(C2),2)} °F`),'(القيمة المعيارية: 100 °C = 373 K = 212 °F)'].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'القراءتان قريبتان من القيم المعيارية، ودرجة غليان الماء أقل قليلا من 100 °C لأن الضغط الجوي في المعمل أقل من الضغط المعياري.':'';
    $('rNote').innerHTML=all?'الاستنتاج: درجة الحرارة الواحدة يعبر عنها بأرقام مختلفة في المقاييس الثلاثة، ويحول بينها بالقانونين <span dir="ltr" style="white-space:nowrap">K = C + 273</span> و <span dir="ltr" style="white-space:nowrap">F = 1.8·C + 32</span>، ومقياس كلفن لا يحتوي على قيم سالبة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('aR').oninput=aDraw;$('bR').oninput=bDraw;
  const rd=(id,need,msg,val,key,lab)=>{if(!need())return fb(id+'Fb',false,msg);const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,'اكتب قراءتك بوحدة °C.');
    if(Math.abs(v-val)<0.05){ok[key]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${val.toFixed(1)} °C`))}else fb(id+'Fb',false,'✗ اكتب درجة الحرارة كما تظهر على الشاشة المكبرة، برقم عشري واحد.');sub();results()};
  $('aInCk').onclick=()=>rd('aIn',()=>+$('aR').value>=100,'أنزل المجس في الخليط أولا.',C1,'a','C₁');
  $('bInCk').onclick=()=>rd('bIn',()=>+$('bR').value>=100,'انقل المجس إلى الماء المغلي أولا.',C2,'b','C₂');
  const ck=(id,need,val,unit,okTxt,bad)=>{$('c'+id+'k').onclick=()=>{if(!ok[need])return fb('c'+id+'f',false,'أكمل القراءة أولا.');const v=num($('c'+id).value);if(isNaN(v))return fb('c'+id+'f',false,`اكتب الناتج بوحدة ${unit}.`);
    if(Math.abs(v-val())<=0.051){ok[id]=true;fb('c'+id+'f',true,'✓ إجابة صحيحة:\n'+E(okTxt()))}else fb('c'+id+'f',false,bad());sub();results()}};
  ck('K1','a',()=>KK(C1),'K',()=>`K₁ = ${C1.toFixed(1)} + 273 = ${fx(KK(C1),1)} K`,()=>'✗ أضف 273 إلى درجة الحرارة السلسيوسية:\n'+E(`K₁ = ${C1.toFixed(1)} + 273`));
  ck('K2','b',()=>KK(C2),'K',()=>`K₂ = ${C2.toFixed(1)} + 273 = ${fx(KK(C2),1)} K`,()=>'✗ أضف 273 إلى درجة الحرارة السلسيوسية:\n'+E(`K₂ = ${C2.toFixed(1)} + 273`));
  ck('F1','a',()=>FF(C1),'°F',()=>`F₁ = 1.8 × ${C1.toFixed(1)} + 32 = ${fx(FF(C1),2)} °F`,()=>'✗ اضرب أولا ثم أضف 32:\n'+E(`1.8 × ${C1.toFixed(1)} = ${fx(1.8*C1,2)}`)+'\n'+E(`F₁ = ${fx(1.8*C1,2)} + 32`));
  ck('F2','b',()=>FF(C2),'°F',()=>`F₂ = 1.8 × ${C2.toFixed(1)} + 32 = ${fx(FF(C2),2)} °F`,()=>'✗ اضرب أولا ثم أضف 32:\n'+E(`1.8 × ${C2.toFixed(1)} = ${fx(1.8*C2,2)}`)+'\n'+E(`F₂ = ${fx(1.8*C2,2)} + 32`));
  $('nw').onclick=newObj;calcInit(box);newObj()}

/* ===== 2-3 الحرارة النوعية: Q = m·c·ΔT ===== */
function shLab(box){
  const CX=228,W=['#93C5FD','#1D4ED8'],c=4180;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب كمية الحرارة اللازمة لتسخين الماء باستخدام القانون Q = m·c·ΔT</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>الميزان الرقمي</i> · g</span><span class="tag">درجة الحرارة T: <i>أداة الميزان الحراري الرقمي</i> · °C</span><span class="tag">الطاقة E: <i>عداد الطاقة</i> · J</span><span class="tag dv">C و Q: <i>كميات مشتقة</i> · J/°C و J</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الميزان الرقمي وسخان الغمر الكهربائي وعداد الطاقة وأداة الميزان الحراري الرقمي.</li>
    <li>قياس كتلة الماء <span dir="ltr">m</span> ودرجتي حرارته قبل التسخين <span dir="ltr">Ti</span> وبعده <span dir="ltr">Tf</span>.</li>
    <li>حساب السعة الحرارية للماء <span dir="ltr" style="white-space:nowrap">C = m·c</span>.</li>
    <li>حساب كمية الحرارة التي اكتسبها الماء <span dir="ltr" style="white-space:nowrap">Q = m·c·ΔT</span>، ومقارنتها بالطاقة التي قاسها عداد الطاقة.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${hxScene({cups:[{x:CX,wc:W[0],sc:W[1],lv:0.75}],heater:{x:CX-8,on:false},jm:'0',probe:{x:CX+14,tz:HX_IN},R:'22.0',lbls:[[CX-30,40,40,200,264,'كوب عازل فيه ماء'],[CX-16,40,110,170,24,'سخان الغمر الكهربائي'],[60,52,30,46,264,'عداد الطاقة'],[CX+16,40,130,396,60,'مجس الميزان الحراري','end'],[320,6,30,396,264,'شاشة الميزان الحراري','end']]})}</div><div class="vcap">تسخين كتلة من الماء بسخان غمر كهربائي: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> ماء معلوم الكتلة في كوب عازل، وفيه سخان الغمر الكهربائي الموصل بعداد الطاقة، ومجس الميزان الحراري المتصل بشاشته.</p></div>
    <div class="tool"><div class="stage">${hxBal('200','m',false)}</div><p><b>الميزان الرقمي:</b> يصفر بالكوب الفارغ، ثم يقيس كتلة الماء وحده بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>سخان الغمر الكهربائي وعداد الطاقة:</b> السخان يحول الطاقة الكهربائية إلى حرارة، والعداد يعرض الطاقة المستهلكة <span dir="ltr">E</span> بالجول.</p>
    <p><b>أداة الميزان الحراري الرقمي:</b> يعرض درجة حرارة الماء بدقة <span dir="ltr">0.1 °C</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>التغير في درجة الحرارة</b><span>ΔT = Tf − Ti</span></div>
      <div class="ln lw"><b>السعة الحرارية</b><span>C = m·c</span></div>
      <div class="ln lw"><b>كمية الحرارة اللازمة لتغيير درجة حرارة جسم</b><span>Q = m·c·ΔT</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m</span> كتلة الماء، وتقاس بالميزان الرقمي، ووحدتها <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">c</span> الحرارة النوعية للماء، وقيمتها <span dir="ltr">4180 J/kg·°C</span>: كمية الحرارة اللازمة لرفع درجة حرارة <span dir="ltr">1 kg</span> من الماء درجة سلسيوس واحدة</li>
      <li><span class="chip" dir="ltr">C</span> السعة الحرارية: كمية الحرارة اللازمة لرفع درجة حرارة الجسم كله درجة واحدة، ووحدتها <span dir="ltr">J/°C</span></li>
      <li><span class="chip" dir="ltr">Ti</span> درجة الحرارة الابتدائية للماء قبل التسخين، و <span class="chip" dir="ltr">Tf</span> درجة الحرارة النهائية بعده، و <span class="chip" dir="ltr">ΔT = Tf − Ti</span> التغير في درجة الحرارة (النهائية − الابتدائية)، ووحدتها <span dir="ltr">°C</span></li>
      <li><span class="chip" dir="ltr">Q</span> كمية الحرارة التي اكتسبها الماء، و <span class="chip" dir="ltr">E</span> الطاقة التي قاسها عداد الطاقة، ووحدتهما <span dir="ltr">J</span></li></ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس كتلة الماء m بالميزان الرقمي</h4>
    <div class="stage"><div id="bl"></div></div>
    ${hxAns('mIn','قراءتك لكتلة الماء m','g')}
    <h4 class="sbh">ب) قياس درجة حرارة الماء قبل التسخين Ti</h4>
    <div class="stage"><div id="aS"></div><svg id="aZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="aSt"></span></div></div>
    ${hxRow('aR','إنزال المجس')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال مجس الميزان الحراري في الماء، ثم اقرأ درجة الحرارة من الشاشة المكبرة.</p>
    ${hxAns('aIn','قراءتك لدرجة الحرارة قبل التسخين Ti','°C')}
    <h4 class="sbh">ج) تسخين الماء وقراءة درجة حرارته بعد التسخين Tf والطاقة E</h4>
    <div class="stage"><div id="sS"></div><svg id="sZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="sSt"></span></div></div>
    ${hxRow('sR','تشغيل السخان')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لتشغيل السخان حتى يتوقف تلقائيا، ثم اقرأ درجة حرارة الماء وقراءة عداد الطاقة.</p>
    ${hxAns('tIn','قراءتك لدرجة الحرارة بعد التسخين Tf','°C')}
    ${hxAns('eIn','قراءتك لعداد الطاقة E','J')}
    <h4 class="sbh">د) حساب السعة الحرارية للماء</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> الحرارة النوعية للماء <b dir="ltr">c = 4180 J/kg·°C</b></p>
    ${hxCalcStep('C','C = m·c','احسب السعة الحرارية C بوحدة J/°C','J/°C')}
    <h4 class="sbh">هـ) حساب كمية الحرارة التي اكتسبها الماء</h4>
    ${hxCalcStep('Q','Q = m·c·ΔT','احسب كمية الحرارة Q بوحدة J','J')}
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين كمية الحرارة المحسوبة والطاقة المقاسة</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>كتلة الماء m</td><td id="r1">—</td></tr><tr><td>Ti قبل التسخين</td><td id="r2">—</td></tr><tr><td>Tf بعد التسخين</td><td id="r3">—</td></tr><tr><td>التغير ΔT</td><td id="r4">—</td></tr>
    <tr><td>السعة الحرارية C</td><td id="r5">—</td></tr><tr><td>كمية الحرارة Q</td><td id="r6">—</td></tr><tr><td>طاقة العداد E</td><td id="r7">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const {$,num,fb,fb0,r1,fx}=hxKit(box);let M,T1,T2,EN,ok={};
  const KG=()=>M/1000,DT=()=>r1(T2-T1),CC=()=>KG()*c,QQ=()=>KG()*c*DT();
  function newObj(){M=150+10*Math.floor(Math.random()*11);T1=r1(20+Math.random()*5);EN=10*Math.floor(500+Math.random()*500);T2=r1(T1+EN*(0.9+Math.random()*0.05)/(M/1000*c));ok={};
    ['aR','sR'].forEach(k=>$(k).value=0);['mIn','aIn','tIn','eIn','cC','cQ'].forEach(k=>$(k).value='');['mInFb','aInFb','tInFb','eInFb','cCf','cQf'].forEach(fb0);$('bl').innerHTML=hxBal(M,'m',false);aDraw();sDraw();sub();results()}
  function aDraw(){const v=+$('aR').value,on=v>=100;$('aRO').textContent=on?'في الماء':'';$('aSt').textContent=on?'✓ المجس في الماء، اقرأ Ti':'أنزل المجس حتى يستقر في الماء';
    $('aS').innerHTML=hxScene({cups:[{x:CX,wc:W[0],sc:W[1],lv:0.75}],heater:{x:CX-8,on:false},jm:'0',probe:{x:CX+14,tz:HX_UP-v/100*(HX_UP-HX_IN)},R:on?T1.toFixed(1):null});$('aZ').innerHTML=hxZoom([[56,288,`T = ${on?T1.toFixed(1):'--.-'} °C`]],'شاشة الميزان الحراري (مكبرة)')}
  function sDraw(){const v=+$('sR').value,done=v>=100,T=r1(T1+(T2-T1)*v/100),e=Math.round(EN*v/100);$('sRO').textContent=done?'توقف السخان':v>0?'يعمل…':'';
    $('sSt').textContent=done?'✓ توقف السخان، اقرأ Tf وقراءة عداد الطاقة E':v>0?'درجة حرارة الماء ترتفع…':'السخان متوقف';
    $('sS').innerHTML=hxScene({cups:[{x:CX,wc:W[0],sc:W[1],lv:0.75}],heater:{x:CX-8,on:v>0&&!done},jm:String(e),probe:{x:CX+14,tz:HX_IN},R:T.toFixed(1)});
    $('sZ').innerHTML=hxZoom([[36,210,`T = ${T.toFixed(1)} °C`],[256,108,`${e} J`]],'شاشتا جهاز قراءة الحرارة وعداد الطاقة (مكبرتان)')}
  function sub(){$('sbC').textContent=ok.m?['C = m·c',E(`m = ${M} g = ${fx(KG(),3)} kg`),E(`C = ${fx(KG(),3)} × 4180`)].join('\n'):'C = m·c';
    $('sbQ').textContent=ok.m&&ok.a&&ok.t?['Q = m·c·ΔT','ΔT = Tf − Ti',E(`ΔT = ${T2.toFixed(1)} − ${T1.toFixed(1)} = ${DT().toFixed(1)} °C`),E(`Q = ${fx(KG(),3)} × 4180 × ${DT().toFixed(1)}`)].join('\n'):'Q = m·c·ΔT'}
  function results(){$('r1').textContent=ok.m?E(fx(KG(),3)+' kg'):'—';$('r2').textContent=ok.a?E(T1.toFixed(1)+' °C'):'—';$('r3').textContent=ok.t?E(T2.toFixed(1)+' °C'):'—';$('r4').textContent=ok.a&&ok.t?E(DT().toFixed(1)+' °C'):'—';
    $('r5').textContent=ok.cC?E(fx(CC(),1)+' J/°C'):'—';$('r6').textContent=ok.cQ?E(fx(QQ(),1)+' J'):'—';$('r7').textContent=ok.e?E(EN+' J'):'—';
    const all=ok.cQ&&ok.e;$('cmpS').textContent=all?['كمية الحرارة التي اكتسبها الماء:',E(`Q = ${fx(QQ(),1)} J`),'الطاقة التي قاسها عداد الطاقة:',E(`E = ${EN} J`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'كمية الحرارة التي اكتسبها الماء أقل قليلا من الطاقة الكهربائية، لأن جزءا من الحرارة انتقل إلى الكوب والسخان والهواء المحيط.':'';
    $('rNote').innerHTML=all?'الاستنتاج: كمية الحرارة اللازمة لتسخين الماء تتناسب مع كتلته وحرارته النوعية والتغير في درجة حرارته <span dir="ltr" style="white-space:nowrap">Q = m·c·ΔT</span>، والسعة الحرارية <span dir="ltr" style="white-space:nowrap">C = m·c</span> هي الحرارة اللازمة لرفع درجة حرارة الماء كله درجة واحدة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('aR').oninput=aDraw;$('sR').oninput=sDraw;
  $('mInCk').onclick=()=>{const v=num($('mIn').value);if(isNaN(v))return fb('mInFb',false,'اكتب قراءتك بالجرام.');if(Math.abs(v-M)<0.5){ok.m=true;fb('mInFb',true,'✓ قراءة صحيحة:\n'+E(`m = ${M} g = ${fx(KG(),3)} kg`))}else fb('mInFb',false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()};
  const rd=(id,need,msg,val,key,lab,u,tol)=>{if(!need())return fb(id+'Fb',false,msg);const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,`اكتب قراءتك بوحدة ${u}.`);
    if(Math.abs(v-val)<tol){ok[key]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${u==='J'?val:val.toFixed(1)} ${u}`))}else fb(id+'Fb',false,'✗ اكتب القراءة كما تظهر على الشاشة المكبرة.');sub();results()};
  $('aInCk').onclick=()=>rd('aIn',()=>+$('aR').value>=100,'أنزل المجس في الماء أولا.',T1,'a','Ti','°C',0.05);
  $('tInCk').onclick=()=>rd('tIn',()=>+$('sR').value>=100,'ابدأ تشغيل السخان حتى يتوقف تلقائيا أولا.',T2,'t','Tf','°C',0.05);
  $('eInCk').onclick=()=>rd('eIn',()=>+$('sR').value>=100,'ابدأ تشغيل السخان حتى يتوقف تلقائيا أولا.',EN,'e','E','J',0.5);
  $('cCk').onclick=()=>{if(!ok.m)return fb('cCf',false,'أكمل قياس الكتلة أولا.');const v=num($('cC').value);if(isNaN(v))return fb('cCf',false,'اكتب الناتج بوحدة J/°C.');
    if(Math.abs(v-CC())/CC()<0.005){ok.cC=true;fb('cCf',true,'✓ إجابة صحيحة:\n'+E(`C = ${fx(KG(),3)} × 4180 = ${fx(CC(),1)} J/°C`))}else fb('cCf',false,'✗ اكتب الكتلة بوحدة kg ثم اضربها في 4180:\n'+E(`C = ${fx(KG(),3)} × 4180`));sub();results()};
  $('cQk').onclick=()=>{if(!(ok.m&&ok.a&&ok.t))return fb('cQf',false,'أكمل قياس الكتلة ودرجتي الحرارة أولا.');const v=num($('cQ').value);if(isNaN(v))return fb('cQf',false,'اكتب الناتج بوحدة J.');
    if(Math.abs(v-QQ())/QQ()<0.005){ok.cQ=true;fb('cQf',true,'✓ إجابة صحيحة:\n'+E(`Q = ${fx(KG(),3)} × 4180 × ${DT().toFixed(1)} = ${fx(QQ(),1)} J`))}else fb('cQf',false,'✗ اطرح أولا ثم اضرب:\n'+E(`ΔT = ${T2.toFixed(1)} − ${T1.toFixed(1)} = ${DT().toFixed(1)} °C`)+'\n'+E(`Q = ${fx(KG(),3)} × 4180 × ${DT().toFixed(1)}`));sub();results()};
  $('nw').onclick=newObj;calcInit(box);newObj()}

/* ===== 2-4 الحرارة الكامنة: Q = m·H ===== */
function lhLab(box){
  const HX=110,CX=228,WW=['#FECACA','#B91C1C'],c=4180,HR=336000;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">حساب الحرارة الكامنة لانصهار الجليد باستخدام القانون Q = m·H</p></div>
  <div class="tags"><span class="tag">الكتلة m: <i>الميزان الرقمي</i> · g</span><span class="tag">درجة الحرارة T: <i>أداة الميزان الحراري الرقمي</i> · °C</span><span class="tag dv">Q و H: <i>كميات مشتقة</i> · J و J/kg</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الميزان الرقمي وأداة الميزان الحراري الرقمي والمسعر الحراري.</li>
    <li>قياس كتلة الماء الدافئ <span dir="ltr">m_w</span> وكتلة الجليد <span dir="ltr">m_ice</span> ودرجة حرارة الماء <span dir="ltr">Ti</span>.</li>
    <li>إضافة الجليد إلى الماء الدافئ وقياس درجة الحرارة النهائية <span dir="ltr">Tf</span> بعد انصهاره كاملا.</li>
    <li>حساب الحرارة الكامنة لانصهار الجليد <span dir="ltr">H</span> من القانون <span dir="ltr" style="white-space:nowrap">Q = m·H</span> ومقارنتها بالقيمة المرجعية.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${hxScene({cups:[{x:HX,cal:1,wc:WW[0],sc:WW[1],lv:0.6},{x:CX,glass:1,lv:0,ice:10}],probe:{x:HX,cal:1,tz:HX_IN},R:'45.0',lbls:[[HX-12,40,28,8,205,'ماء دافئ','start'],[CX-4,40,32,200,24,'مكعبات جليد عند \u202a0 °C\u202c'],[CX+26,40,60,236,264,'وعاء زجاجي'],[HX,40,130,396,60,'مجس الميزان الحراري','end'],[320,6,30,396,264,'شاشة الميزان الحراري','end'],[HX-26,40,22,150,264,'المسعر الحراري'],[HX-18,40,97,8,24,'غطاء المسعر','start'],[HX+21,40,144,166,101,'أداة التحريك','start']]})}</div><div class="vcap">مسعر حراري فيه ماء دافئ ومكعبات جليد عند 0 °C</div>
    <p><b>ترتيب الأجهزة:</b> ماء دافئ معلوم الكتلة في المسعر الحراري، ومكعبات جليد تذوب عند <span dir="ltr">0 °C</span> معلومة الكتلة، ومجس الميزان الحراري متصل بشاشته.</p></div>
    <div class="tool"><div class="stage">${hxBal('40','m_ice','ice')}</div><p><b>الميزان الرقمي:</b> يقيس كتلة الماء الدافئ وكتلة الجليد بالجرام بدقة <span dir="ltr">1 g</span>.</p>
    <p><b>أداة الميزان الحراري الرقمي:</b> يعرض درجة حرارة الماء بدقة <span dir="ltr">0.1 °C</span>.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>الحرارة التي يفقدها الماء الدافئ عند تبرده من Ti إلى Tf</b><span>Q₁ = m_w·c·(Ti − Tf)</span></div>
      <div class="ln lw"><b>الحرارة التي يكتسبها ماء الجليد المنصهر عند تسخينه من 0 °C إلى Tf</b><span>Q₂ = m_ice·c·(Tf − 0)</span></div>
      <div class="ln lw"><b>الحرارة اللازمة لصهر الجليد (الحرارة الكامنة)</b><span>Q = m·H ⟹ Q₁ − Q₂ = m_ice·H</span></div>
      <div class="ln lw"><b>الحرارة الكامنة لانصهار الجليد</b><span>H = (Q₁ − Q₂) / m_ice</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">m_w</span> كتلة الماء الدافئ، و <span class="chip" dir="ltr">m_ice</span> كتلة الجليد، ووحدتهما <span dir="ltr">kg</span></li>
      <li><span class="chip" dir="ltr">c</span> الحرارة النوعية للماء، وقيمتها <span dir="ltr">4180 J/kg·°C</span></li>
      <li><span class="chip" dir="ltr">Ti</span> درجة الحرارة الابتدائية للماء الدافئ، و <span class="chip" dir="ltr">Tf</span> درجة الحرارة النهائية بعد انصهار الجليد كاملا، ووحدتهما <span dir="ltr">°C</span></li>
      <li><span class="chip" dir="ltr">H</span> الحرارة الكامنة للانصهار: كمية الحرارة اللازمة لصهر <span dir="ltr">1 kg</span> من الجليد دون تغير درجة حرارته، ووحدتها <span dir="ltr">J/kg</span>، وقيمتها المرجعية <span dir="ltr">336000 J/kg</span></li>
      <li><span class="chip" dir="ltr">Q₁, Q₂, Q</span> كميات الحرارة، ووحدتها <span dir="ltr">J</span></li></ul></div>
      ${convBox(['m(kg) = m(g) / 1000'])}</div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس والحساب</h3>
    <h4 class="sbh">أ) قياس كتلة الماء الدافئ m_w</h4>
    <div class="stage"><div id="b1"></div></div>
    ${hxAns('wIn','قراءتك لكتلة الماء الدافئ m_w','g')}
    <h4 class="sbh">ب) قياس كتلة الجليد m_ice</h4>
    <div class="stage"><div id="b2"></div></div>
    ${hxAns('iIn','قراءتك لكتلة الجليد m_ice','g')}
    <h4 class="sbh">ج) قياس درجة حرارة الماء الدافئ Ti</h4>
    <div class="stage"><div id="aS"></div><svg id="aZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="aSt"></span></div></div>
    ${hxRow('aR','إنزال المجس')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال مجس الميزان الحراري في الماء الدافئ، ثم اقرأ درجة الحرارة.</p>
    ${hxAns('aIn','قراءتك لدرجة حرارة الماء الدافئ Ti','°C')}
    <h4 class="sbh">د) إضافة الجليد وقراءة درجة الحرارة النهائية Tf</h4>
    <div class="stage"><div id="dS"></div><svg id="dZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="dSt"></span></div></div>
    ${hxRow('dR','إضافة الجليد والتحريك')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لإضافة الجليد إلى الماء الدافئ وتحريكه حتى ينصهر كاملا، ثم اقرأ درجة الحرارة النهائية.</p>
    ${hxAns('fIn','قراءتك لدرجة الحرارة النهائية Tf','°C')}
    <h4 class="sbh">هـ) حساب الحرارة التي فقدها الماء الدافئ</h4>
    <p class="slh">ℹ️ <b>المعطيات:</b> الحرارة النوعية للماء <b dir="ltr">c = 4180 J/kg·°C</b></p>
    ${hxCalcStep('1','Q₁ = m_w·c·(Ti − Tf)','احسب Q₁ بوحدة J','J')}
    <h4 class="sbh">و) حساب الحرارة التي اكتسبها ماء الجليد المنصهر</h4>
    ${hxCalcStep('2','Q₂ = m_ice·c·(Tf − 0)','احسب Q₂ بوحدة J','J')}
    <h4 class="sbh">ز) حساب الحرارة الكامنة لانصهار الجليد</h4>
    ${hxCalcStep('H','H = (Q₁ − Q₂) / m_ice','احسب H بوحدة J/kg','J/kg')}
  </div>
  <div class="ctl"><h3>5.2 المقارنة بالقيمة المرجعية</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>كتلة الماء الدافئ m_w</td><td id="r1">—</td></tr><tr><td>كتلة الجليد m_ice</td><td id="r2">—</td></tr><tr><td>Ti</td><td id="r3">—</td></tr><tr><td>Tf</td><td id="r4">—</td></tr>
    <tr><td>Q₁</td><td id="r5">—</td></tr><tr><td>Q₂</td><td id="r6">—</td></tr><tr><td>الحرارة الكامنة H</td><td id="r7">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const {$,num,fb,fb0,r1,fx}=hxKit(box);let MW,MI,T1,TF,ok={};
  const KW=()=>MW/1000,KI=()=>MI/1000,Q1=()=>KW()*c*(T1-TF),Q2=()=>KI()*c*TF,HH=()=>(Q1()-Q2())/KI();
  function newObj(){MW=200+10*Math.floor(Math.random()*11);MI=30+2*Math.floor(Math.random()*11);T1=r1(40+Math.random()*10);const he=HR*(0.97+Math.random()*0.05);TF=r1((KW()*c*T1-KI()*he)/(c*(KW()+KI())));ok={};
    ['aR','dR'].forEach(k=>$(k).value=0);['wIn','iIn','aIn','fIn','c1','c2','cH'].forEach(k=>$(k).value='');['wInFb','iInFb','aInFb','fInFb','c1f','c2f','cHf'].forEach(fb0);$('b1').innerHTML=hxBal(MW,'m_w','warm');$('b2').innerHTML=hxBal(MI,'m_ice','ice');aDraw();dDraw();sub();results()}
  function aDraw(){const v=+$('aR').value,on=v>=100;$('aRO').textContent=on?'في الماء':'';$('aSt').textContent=on?'✓ المجس في الماء الدافئ، اقرأ Ti':'أنزل المجس حتى يستقر في الماء';
    $('aS').innerHTML=hxScene({cups:[{x:HX,cal:1,wc:WW[0],sc:WW[1],lv:0.6},{x:CX,glass:1,lv:0,ice:10}],probe:{x:HX,cal:1,tz:HX_UP-v/100*(HX_UP-HX_IN)},R:on?T1.toFixed(1):null});$('aZ').innerHTML=hxZoom([[56,288,`T = ${on?T1.toFixed(1):'--.-'} °C`]],'شاشة الميزان الحراري (مكبرة)')}
  function dDraw(){const v=+$('dR').value,done=v>=100,fly=v>0&&v<25,inC=v>=25,melt=inC?Math.min(1,(v-25)/75):0,T=done?TF:inC?r1(T1-(T1-TF)*Math.pow(melt,0.7)):T1;
    $('dRO').textContent=done?'انصهر الجليد':inC?'ينصهر…':fly?'يضاف…':'';$('dSt').textContent=done?'✓ انصهر الجليد كاملا وثبتت القراءة، اقرأ Tf':inC?'الجليد يمتص الحرارة من الماء الدافئ وينصهر…':'أضف الجليد إلى الماء الدافئ';
    const flyP=fly?[CX-(CX-HX)*v/25,14+78+30]:null;
    $('dS').innerHTML=hxScene({cups:[{x:HX,cal:1,wc:inC?(done?'#E0E7FF':'#FBCFE8'):WW[0],sc:WW[1],lv:0.6+0.12*melt,ice:inC&&!done?5:0,isz:1-melt},{x:CX,glass:1,lv:0,ice:v>0?0:10}],flyIce:flyP,probe:{x:HX,cal:1,tz:HX_IN},R:T.toFixed(1)});
    $('dZ').innerHTML=hxZoom([[56,288,`T = ${T.toFixed(1)} °C`]],'شاشة الميزان الحراري (مكبرة)')}
  function sub(){const rd=ok.w&&ok.i&&ok.a&&ok.f;
    $('sb1').textContent=rd?['Q₁ = m_w·c·(Ti − Tf)',E(`m_w = ${MW} g = ${fx(KW(),3)} kg`),E(`Q₁ = ${fx(KW(),3)} × 4180 × (${T1.toFixed(1)} − ${TF.toFixed(1)})`)].join('\n'):'Q₁ = m_w·c·(Ti − Tf)';
    $('sb2').textContent=rd?['Q₂ = m_ice·c·(Tf − 0)',E(`m_ice = ${MI} g = ${fx(KI(),3)} kg`),E(`Q₂ = ${fx(KI(),3)} × 4180 × ${TF.toFixed(1)}`)].join('\n'):'Q₂ = m_ice·c·(Tf − 0)';
    $('sbH').textContent=ok.c1&&ok.c2?['H = (Q₁ − Q₂) / m_ice',E(`H = (${fx(Q1(),1)} − ${fx(Q2(),1)}) / ${fx(KI(),3)}`)].join('\n'):'H = (Q₁ − Q₂) / m_ice'}
  function results(){$('r1').textContent=ok.w?E(fx(KW(),3)+' kg'):'—';$('r2').textContent=ok.i?E(fx(KI(),3)+' kg'):'—';$('r3').textContent=ok.a?E(T1.toFixed(1)+' °C'):'—';$('r4').textContent=ok.f?E(TF.toFixed(1)+' °C'):'—';
    $('r5').textContent=ok.c1?E(fx(Q1(),1)+' J'):'—';$('r6').textContent=ok.c2?E(fx(Q2(),1)+' J'):'—';$('r7').textContent=ok.cH?E(fx(HH(),0)+' J/kg'):'—';
    const all=ok.cH;$('cmpS').textContent=all?['الحرارة الكامنة المحسوبة:',E(`H = ${fx(HH(),0)} J/kg`),'القيمة المرجعية:',E(`H = 336000 J/kg`),'الفرق:',E(`${fx(Math.abs(HH()-HR),0)} J/kg`)].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'الحرارة الكامنة المحسوبة قريبة من القيمة المرجعية، والفرق بسبب تبادل جزء صغير من الحرارة مع الكوب والهواء المحيط.':'';
    $('rNote').innerHTML=all?'الاستنتاج: يمتص الجليد كمية من الحرارة لينصهر دون أن ترتفع درجة حرارته عن <span dir="ltr">0 °C</span>، وهذه الحرارة تتناسب مع كتلته <span dir="ltr" style="white-space:nowrap">Q = m·H</span>، والحرارة الكامنة لانصهار الجليد نحو <span dir="ltr">336000 J/kg</span>.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('aR').oninput=aDraw;$('dR').oninput=dDraw;
  const mk=(id,val,key,lab,k)=>{$(id+'Ck').onclick=()=>{const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,'اكتب قراءتك بالجرام.');if(Math.abs(v-val())<0.5){ok[key]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${val()} g = ${fx(k(),3)} kg`))}else fb(id+'Fb',false,'✗ اقرأ الرقم الظاهر على شاشة الميزان.');sub();results()}};
  mk('wIn',()=>MW,'w','m_w',KW);mk('iIn',()=>MI,'i','m_ice',KI);
  const rd=(id,need,msg,val,key,lab)=>{$(id+'Ck').onclick=()=>{if(!need())return fb(id+'Fb',false,msg);const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,'اكتب قراءتك بوحدة °C.');
    if(Math.abs(v-val())<0.05){ok[key]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`${lab} = ${val().toFixed(1)} °C`))}else fb(id+'Fb',false,'✗ اكتب درجة الحرارة كما تظهر على الشاشة المكبرة.');sub();results()}};
  rd('aIn',()=>+$('aR').value>=100,'أنزل المجس في الماء الدافئ أولا.',()=>T1,'a','Ti');rd('fIn',()=>+$('dR').value>=100,'أضف الجليد وحركه حتى ينصهر كاملا أولا.',()=>TF,'f','Tf');
  const ck=(id,need,val,okTxt,bad)=>{$('c'+id+'k').onclick=()=>{if(!need())return fb('c'+id+'f',false,'أكمل القياسات والخطوات السابقة أولا.');const v=num($('c'+id).value);if(isNaN(v))return fb('c'+id+'f',false,'اكتب الناتج بالأرقام.');
    if(Math.abs(v-val())/Math.abs(val())<0.005){ok['c'+id]=true;fb('c'+id+'f',true,'✓ إجابة صحيحة:\n'+E(okTxt()))}else fb('c'+id+'f',false,bad());sub();results()}};
  const all4=()=>ok.w&&ok.i&&ok.a&&ok.f;
  ck('1',all4,Q1,()=>`Q₁ = ${fx(KW(),3)} × 4180 × ${fx(T1-TF,1)} = ${fx(Q1(),1)} J`,()=>'✗ اطرح أولا ثم اضرب:\n'+E(`Ti − Tf = ${T1.toFixed(1)} − ${TF.toFixed(1)} = ${fx(T1-TF,1)} °C`)+'\n'+E(`Q₁ = ${fx(KW(),3)} × 4180 × ${fx(T1-TF,1)}`));
  ck('2',all4,Q2,()=>`Q₂ = ${fx(KI(),3)} × 4180 × ${TF.toFixed(1)} = ${fx(Q2(),1)} J`,()=>'✗ اكتب كتلة الجليد بوحدة kg ثم اضرب:\n'+E(`Q₂ = ${fx(KI(),3)} × 4180 × ${TF.toFixed(1)}`));
  ck('H',()=>ok.c1&&ok.c2,HH,()=>`H = ${fx(Q1()-Q2(),1)} / ${fx(KI(),3)} = ${fx(HH(),0)} J/kg`,()=>'✗ اطرح أولا ثم اقسم على كتلة الجليد بالكيلوجرام:\n'+E(`Q₁ − Q₂ = ${fx(Q1(),1)} − ${fx(Q2(),1)} = ${fx(Q1()-Q2(),1)} J`)+'\n'+E(`H = ${fx(Q1()-Q2(),1)} / ${fx(KI(),3)}`));
  $('nw').onclick=newObj;calcInit(box);newObj()}

/* ===== 2-6 طرق انتقال الحرارة ===== */
function cdScene(t,fall,o){/* قضبان النحاس والألومنيوم والحديد على مصدر حرارة، وكرات شمع في أطرافها؛ fall أزمنة السقوط */
  o=o||{};const BASE=230,T=14,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,tt,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${tt}</text>`;
  let g='';g+=box(6,346,0,86,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* مصدر الحرارة والكتلة النحاسية الوسطى */
  g+=box(30,80,18,62,T,T+30,'#334155','#64748B','#1F2937','#0F172A');{const [a,b]=S(55,40,T+30);g+=`<ellipse cx="${a}" cy="${b-1}" rx="18" ry="6" fill="${t>0?'#EF4444':'#94A3B8'}" opacity=".9"/>`}
  g+=box(44,66,26,54,T+30,T+120,'#92400E','#D97706','#78350F','#451A03');
  const rods=[['#B45309','#F59E0B',T+108,'نحاس'],['#94A3B8','#E2E8F0',T+82,'ألومنيوم'],['#334155','#64748B',T+56,'حديد']],d=40;
  rods.forEach(([c1,c2,z,n],i)=>{g+=box(66,290,d-3,d+3,z-6,z,c1,c2,c1,'#1F2937');
    if(t>0){const k=Math.min(1,t/fall[i]),a=S(66,d-3,z),b=S(66+224*k,d-3,z);g+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#EF4444" stroke-width="2.6" opacity=".8"/>`}
    const [ex,ey]=S(284,d,z-6);if(t>=fall[i]){const [fx2,fy]=S(250+i*16,70,T+3);g+=`<circle cx="${fx2}" cy="${fy}" r="6" fill="#CBD5E1" stroke="#475569"/>`}else g+=`<path d="M${ex},${ey} v5" stroke="#EAB308" stroke-width="4" stroke-linecap="round"/><circle cx="${ex}" cy="${ey+11}" r="6" fill="#CBD5E1" stroke="#475569"/>`;
    const [lx,ly]=S(296,d,z-3);g+=`<text x="${lx}" y="${ly+4}" font-size="12" font-weight="800" fill="var(--ink)" text-anchor="start">${n}</text>`});
  if(o.sw!=null){const [sx,sy]=S(330,80,T);g+=`<rect x="${sx-4}" y="${sy-44}" width="8" height="6" rx="1.5" fill="#475569"/><circle cx="${sx}" cy="${sy-22}" r="17" fill="#1F2937" stroke="#0F172A"/><circle cx="${sx}" cy="${sy-22}" r="13" fill="#E2E8F0"/><text x="${sx}" y="${sy-18}" font-size="10" font-weight="800" text-anchor="middle" fill="#0F172A" font-family="Consolas,monospace" direction="ltr">${o.sw} s</text>`}
  if(o.lab){g+=lbl(...S(284,40,T+39),330,BASE+20,'كرة معدنية مثبتة بالشمع')+lbl(...S(55,26,T+100),110,22,'كتلة نحاسية','start')+lbl(...S(40,18,T+15),20,BASE+20,'سخان كهربائي','start')+lbl(...S(180,37,T+108),200,22,'قضبان فلزية متساوية','start')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?40:10)}" aria-label="قضبان فلزية على مصدر حرارة وكرات شمع في أطرافها">${g}</svg>`}
function lcScene(sel,R,o){/* مكعب ليزلي: الوجه الأمامي أسود والجانبي لامع، والميزان الحراري بالأشعة تحت الحمراء؛ sel 0..100 */
  o=o||{};const BASE=240,T=14,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const lbl=(x,y,tx,ty,tt,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${tt}</text>`;
  let g=`<defs><linearGradient id="lcSh" x1="0" x2="1"><stop offset="0" stop-color="#CBD5E1"/><stop offset=".5" stop-color="#F8FAFC"/><stop offset="1" stop-color="#94A3B8"/></linearGradient></defs>`;
  g+=poly([[6,0,T],[346,0,T],[346,86,T],[6,86,T]],'#E9C894','#7C4A1F')+poly([[6,0,0],[346,0,0],[346,0,T],[6,0,T]],'#B7834A','#7C4A1F');
  const X0=120,X1=210,D0=30,D1=70,Z0=T,Z1=T+90;
  g+=poly([[X0,D0,Z1],[X1,D0,Z1],[X1,D1,Z1],[X0,D1,Z1]],'#475569','#1F2937');
  g+=poly([[X1,D0,Z0],[X1,D1,Z0],[X1,D1,Z1],[X1,D0,Z1]],'url(#lcSh)','#475569');
  g+=poly([[X0,D0,Z0],[X1,D0,Z0],[X1,D0,Z1],[X0,D0,Z1]],'#0F172A','#000');
  {const [a,b]=S(165,50,Z1);g+=`<path d="M${a-6},${b} v-14 h12 v14" fill="#64748B" stroke="#334155"/>`;for(let i=-1;i<=1;i++)g+=`<path d="M${a+i*8},${b-18} c-5,-6 5,-10 0,-16" fill="none" stroke="#94A3B8" stroke-width="1.8" opacity=".6"/>`}
  /* الميزان الحراري بالأشعة تحت الحمراء يتحرك من أمام الوجه الأسود إلى أمام الوجه اللامع */
  const u=sel/100,tgt=u<0.5?S(150,D0,T+45):S(X1,50,T+45),g0=[X0-62,D0-16],g1=[X1+72,50],gun=u<=0?g0:u>=1?g1:[g0[0]+(g1[0]-g0[0])*u,g0[1]+(g1[1]-g0[1])*u],[gx,gy]=S(gun[0],gun[1],T+47);
  g+=irGun(gx,gy,tgt[0],tgt[1],R||'--.-',0.72);
  if(o.lab){g+=lbl(...S(140,D0,T+70),30,26,'الوجه الأسود','start')+lbl(...S(X1,60,T+70),360,26,'الوجه اللامع','end')+lbl(...S(165,50,Z1+10),200,20,'ماء ساخن')+lbl(gx-8,gy+24,140,BASE+18,'‏الميزان الحراري بالأشعة تحت الحمراء‏')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?40:10)}" aria-label="مكعب ليزلي والميزان الحراري بالأشعة تحت الحمراء">${g}</svg>`}
function cvScene(p,o){/* الحمل: وعاء زجاجي فيه ماء يسخن من أسفل جانبه الأيسر مع صبغة */
  o=o||{};const W=400,H=230;let g=`<rect x="120" y="30" width="160" height="160" rx="6" fill="#DBEAFE" stroke="#1E3A8A" stroke-width="2.4" opacity=".9"/><rect x="120" y="44" width="160" height="146" fill="#BFDBFE" opacity=".8"/>`;
  g+=`<rect x="130" y="196" width="40" height="10" rx="2" fill="#334155"/><path d="M140,196 c-4,-8 4,-10 0,-16 M150,196 c-4,-8 4,-10 0,-16 M160,196 c-4,-8 4,-10 0,-16" fill="none" stroke="#EF4444" stroke-width="2"/>`;
  const L=520,dash=`stroke-dasharray="${L*p} ${L}"`;
  g+=`<path d="M150,180 L150,70 Q150,58 162,58 L238,58 Q250,58 250,70 L250,170 Q250,182 238,182 L162,182" fill="none" stroke="#9333EA" stroke-width="5" stroke-linecap="round" ${dash} opacity=".85"/>`;
  if(p>0.2)g+=`<path d="M144,110 l6,-10 l6,10" fill="none" stroke="#DC2626" stroke-width="3"/>`;if(p>0.6)g+=`<path d="M244,110 l6,10 l6,-10" fill="none" stroke="#2563EB" stroke-width="3"/>`;
  if(o.lab)g+=`<text x="100" y="110" font-size="13" font-weight="700" text-anchor="end" fill="#DC2626">ماء ساخن يرتفع</text><text x="300" y="110" font-size="13" font-weight="700" text-anchor="start" fill="#2563EB">ماء بارد ينزل</text><text x="150" y="224" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">مصدر الحرارة</text><text x="200" y="22" font-size="13" font-weight="700" text-anchor="middle" fill="#7E22CE">صبغة ملونة</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" aria-label="تيار الحمل في كأس ماء">${g}</svg>`}
function irGun(gx,gy,tx,ty,R,s){/* الميزان الحراري بالأشعة تحت الحمراء (مسدس حراري): عدسة استشعار في المقدمة، وشاشة في الخلف، وزناد ومقبض؛ يوجه نحو الهدف */
  s=s||1;const dx=tx-gx,fl=dx<0,a=Math.atan2(ty-gy,Math.abs(dx)||1),deg=a*180/Math.PI,c=Math.cos(a),sn=Math.sin(a),sx=fl?-1:1;
  const lx=gx+sx*s*(50*c),ly=gy+s*(50*sn);
  let g=`<line x1="${lx}" y1="${ly}" x2="${tx}" y2="${ty}" stroke="#DC2626" stroke-width="1.6" stroke-dasharray="5 4"/><circle cx="${tx}" cy="${ty}" r="3.4" fill="#DC2626"/><circle cx="${tx}" cy="${ty}" r="7" fill="none" stroke="#DC2626" stroke-width="1" opacity=".6"/>`;
  g+=`<g transform="translate(${gx},${gy}) scale(${sx*s},${s}) rotate(${deg})">`+
   `<path d="M-6,8 L4,8 L-6,52 Q-7,57 -12,57 L-20,57 Q-25,57 -24,52 Z" fill="#1F2937" stroke="#0F172A" stroke-width="1"/>`+
   `<path d="M6,10 q8,2 6,14 q-5,-3 -9,-12 z" fill="#334155" stroke="#0F172A" stroke-width=".8"/>`+
   `<path d="M-40,-14 H30 Q36,-14 36,-8 V8 Q36,12 30,12 H-40 Q-46,12 -46,6 V-8 Q-46,-14 -40,-14 Z" fill="#F7931E" stroke="#9A3412" stroke-width="1.2"/>`+
   `<path d="M36,-10 L48,-7 L48,7 L36,10 Z" fill="#1F2937" stroke="#0F172A"/><circle cx="49" cy="0" r="5.2" fill="#0F172A" stroke="#475569"/><circle cx="47.6" cy="-1.6" r="1.6" fill="#7DD3FC"/>`+
   `<rect x="-42" y="-10" width="34" height="16" rx="2.5" fill="#BBF7D0" stroke="#14532D"/>`+
   `<g transform="translate(-25,-2) scale(${sx},1) rotate(${-deg})"><text x="0" y="3.5" font-size="8" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${R||'--.-'}</text></g>`+
   `</g>`;
  return g}
function irTool(){/* صورة مكبرة للميزان الحراري بالأشعة تحت الحمراء بأسماء أجزائه */
  const lbl=(x,y,tx,ty,tt,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${tt}</text>`;
  let g=irGun(150,92,395,92,'72.4°C',2.3);
  g+=lbl(263,92,300,30,'عدسة الاستشعار')+lbl(58,72,30,30,'الشاشة','start')+lbl(171,129,215,226,'الزناد')+lbl(122,184,40,226,'المقبض','start')+lbl(332,92,350,140,'شعاع ليزر للتوجيه');
  return `<svg viewBox="0 0 400 250" aria-label="الميزان الحراري بالأشعة تحت الحمراء بأجزائه">${g}</svg>`}
function trAll(){/* طاولة واحدة: جهاز التوصيل الحراري، والوعاء الزجاجي للحمل، ومكعب ليزلي مع الميزان الحراري بالأشعة تحت الحمراء */
  const BASE=262,T=14,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,tt,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)">${tt}</text>`;
  const plate=(x0,x1,d0,d1,hx)=>{let s=box(x0,x1,d0,d1,T,T+14,'#334155','#64748B','#1F2937','#0F172A');const [a,b]=S(hx,(d0+d1)/2,T+14);s+=`<ellipse cx="${a}" cy="${b}" rx="17" ry="5.5" fill="#EF4444" opacity=".9"/><circle cx="${S(x1-8,d0,T+7)[0]}" cy="${S(x1-8,d0,T+7)[1]}" r="3" fill="#F7931E"/>`;return s};
  let g=`<defs><linearGradient id="taSh" x1="0" x2="1"><stop offset="0" stop-color="#CBD5E1"/><stop offset=".5" stop-color="#F8FAFC"/><stop offset="1" stop-color="#94A3B8"/></linearGradient></defs>`;
  g+=box(6,736,0,86,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* 1) التوصيل */
  g+=plate(26,86,18,62,56);
  g+=box(44,66,26,54,T+14,T+120,'#92400E','#D97706','#78350F','#451A03');
  [['#B45309','#F59E0B',T+108,'نحاس'],['#94A3B8','#E2E8F0',T+82,'ألومنيوم'],['#334155','#64748B',T+56,'حديد']].forEach(([c1,c2,z,n])=>{g+=box(66,262,37,43,z-6,z,c1,c2,c1,'#1F2937');const [ex,ey]=S(256,40,z-6);g+=`<path d="M${ex},${ey} v5" stroke="#EAB308" stroke-width="4" stroke-linecap="round"/><circle cx="${ex}" cy="${ey+11}" r="6" fill="#CBD5E1" stroke="#475569"/>`;const [lx,ly]=S(266,40,z-3);g+=`<text x="${lx}" y="${ly+4}" font-size="12" font-weight="800" fill="var(--ink)">${n}</text>`});
  /* 2) الحمل */
  g+=plate(356,470,18,62,382);
  {const cx=416,cd=40,R=40,Z0=T+14,Z1=Z0+108,[x0,y0]=S(cx,cd,Z0),[,y1]=S(cx,cd,Z1),[,yw]=S(cx,cd,Z1-12);
   g+=`<path d="M${x0-R},${yw} L${x0-R},${y0} A${R},12 0 0 0 ${x0+R},${y0} L${x0+R},${yw} Z" fill="#BFDBFE" opacity=".85"/><ellipse cx="${x0}" cy="${yw}" rx="${R}" ry="12" fill="#93C5FD" stroke="#1D4ED8" stroke-width=".8"/>`;
   const Lx=x0-22,Rx=x0+22,top=yw+14,bot=y0-10;
   g+=`<path d="M${Lx},${bot} L${Lx},${top+10} Q${Lx},${top} ${Lx+10},${top} L${Rx-10},${top} Q${Rx},${top} ${Rx},${top+10} L${Rx},${bot-10} Q${Rx},${bot} ${Rx-10},${bot} L${Lx+10},${bot}" fill="none" stroke="#9333EA" stroke-width="4.5" stroke-linecap="round" opacity=".85"/><path d="M${Lx-6},${(top+bot)/2} l6,-10 l6,10" fill="none" stroke="#DC2626" stroke-width="3"/><path d="M${Rx-6},${(top+bot)/2} l6,10 l6,-10" fill="none" stroke="#2563EB" stroke-width="3"/>`;
   g+=`<path d="M${x0-R},${y1} L${x0-R},${y0} A${R},12 0 0 0 ${x0+R},${y0} L${x0+R},${y1}" fill="none" stroke="#1E3A8A" stroke-width="2"/><ellipse cx="${x0}" cy="${y1}" rx="${R}" ry="12" fill="none" stroke="#1E3A8A" stroke-width="1.6"/>`;
   g+=lbl(Lx,(top+bot)/2,330,52,'ماء ساخن يرتفع','end')+lbl(Rx,(top+bot)/2,520,52,'ماء بارد ينزل','start')+lbl(x0,top,430,26,'صبغة ملونة')+lbl(x0+R,y0-36,488,BASE+24,'وعاء زجاجي فيه ماء')}
  /* 3) الإشعاع */
  {const X0=560,X1=640,D0=30,D1=66,Z0=T,Z1=T+84;
   g+=poly([[X0,D0,Z1],[X1,D0,Z1],[X1,D1,Z1],[X0,D1,Z1]],'#475569','#1F2937')+poly([[X1,D0,Z0],[X1,D1,Z0],[X1,D1,Z1],[X1,D0,Z1]],'url(#taSh)','#475569')+poly([[X0,D0,Z0],[X1,D0,Z0],[X1,D0,Z1],[X0,D0,Z1]],'#0F172A','#000');
   {const [a,b]=S(600,48,Z1);g+=`<path d="M${a-6},${b} v-12 h12 v12" fill="#64748B" stroke="#334155"/>`;for(let i=-1;i<=1;i++)g+=`<path d="M${a+i*8},${b-16} c-5,-6 5,-10 0,-16" fill="none" stroke="#94A3B8" stroke-width="1.8" opacity=".6"/>`}
   /* الميزان الحراري بالأشعة تحت الحمراء: محمول بمقبض على بعد من الوجه الأسود */
   const [tx,ty]=S(600,D0,T+44),[gx,gy]=S(531,-10,T+50);
   g+=irGun(gx,gy,tx,ty,'72.4',0.8);
   g+=lbl(...S(580,D0,T+70),600,26,'الوجه الأسود','end')+lbl(...S(X1,56,T+64),736,52,'الوجه اللامع','end')+lbl(...S(600,48,Z1+8),700,26,'ماء ساخن','start')+lbl(gx-14,gy+40,790,BASE+24,'‏الميزان الحراري بالأشعة تحت الحمراء‏','end')}
  /* أسماء التوصيل والمصادر */
  g+=lbl(...S(230,40,T+108),150,26,'قضبان فلزية متساوية')+lbl(...S(55,26,T+100),20,52,'كتلة نحاسية','start')+lbl(...S(256,40,T+39),296,BASE+24,'كرة معدنية مثبتة بالشمع','end')+lbl(...S(36,18,T+8),20,BASE+24,'سخان كهربائي','start')+lbl(...S(366,18,T+8),366,BASE+24,'سخان كهربائي');
  return `<svg viewBox="0 0 800 ${BASE+40}" aria-label="أجهزة تجربة مقارنة طرق انتقال الحرارة على طاولة المعمل">${g}</svg>`}

function trLab(box){
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">مقارنة انتقال الحرارة بالتوصيل في قضبان فلزية وبالحمل في الماء وبالإشعاع من سطح أسود وسطح لامع</p></div>
  <div class="tags"><span class="tag">الزمن t: <i>ساعة الإيقاف</i> · s</span><span class="tag">درجة حرارة السطح T: <i>الميزان الحراري بالأشعة تحت الحمراء</i> · °C</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على جهاز توصيل الحرارة في القضبان الفلزية ومكعب ليزلي والميزان الحراري بالأشعة تحت الحمراء.</li>
    <li>قياس زمن سقوط الكرة المعدنية عن قضبان النحاس والألومنيوم والحديد بساعة الإيقاف، وترتيب الفلزات حسب التوصيل الحراري.</li>
    <li>ملاحظة تيار الحمل في الماء عند تسخينه من أسفل.</li>
    <li>قياس درجة حرارة الوجه الأسود والوجه اللامع لمكعب ليزلي، والمقارنة بين إشعاعهما الحراري.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${trAll()}</div><div class="vcap">ترتيب الأجهزة على طاولة المعمل: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> جهاز التوصيل الحراري على سخان كهربائي، ووعاء زجاجي فيه ماء وصبغة ملونة فوق سخان كهربائي من جانب واحد، ومكعب ليزلي فيه ماء ساخن، والميزان الحراري بالأشعة تحت الحمراء موجه إلى وجهه الأسود دون تلامس.</p></div>
    <div class="tool"><div class="stage">${cdScene(0,[1,1,1],{lab:true})}</div><div class="vcap">جهاز التوصيل الحراري: ثلاثة قضبان فلزية متصلة بكتلة نحاسية فوق مصدر حرارة</div>
    <p><b>جهاز التوصيل الحراري:</b> ثلاثة قضبان متساوية الطول والسمك من النحاس والألومنيوم والحديد، متصلة بكتلة نحاسية فوق مصدر حرارة، وفي طرف كل قضيب كرة معدنية صغيرة مثبتة بالشمع.</p></div>
    <div class="tool"><div class="stage">${cv3D(0.8,{lab:true})}</div><div class="vcap">وعاء زجاجي فيه ماء يسخن من أسفل جانبه الأيسر، مع صبغة ملونة</div>
    <p><b>الوعاء الزجاجي والصبغة:</b> تسخين الماء من أسفل جانب واحد مع قطرات صبغة ملونة لرؤية حركة الماء.</p></div>
    <div class="tool"><div class="stage">${irTool()}</div><div class="vcap">الميزان الحراري بالأشعة تحت الحمراء: صورة مكبرة بأسماء أجزائه</div>
    <p><b>الميزان الحراري بالأشعة تحت الحمراء:</b> جهاز محمول يوجه نحو السطح دون أن يلامسه، فتستقبل عدسة الاستشعار في مقدمته الأشعة تحت الحمراء الصادرة من السطح، وتظهر درجة حرارته على الشاشة عند الضغط على الزناد، وشعاع الليزر الأحمر يحدد النقطة المقيسة.</p></div>
    <div class="tool"><div class="stage">${lcScene(0,null,{lab:true})}</div><div class="vcap">مكعب ليزلي والميزان الحراري بالأشعة تحت الحمراء</div>
    <p><b>مكعب ليزلي <span dir="ltr">(Leslie Cube)</span>:</b> مكعب معدني يملأ بماء ساخن، أحد وجهيه مطلي بالأسود والآخر لامع، فيكونان عند درجة الحرارة نفسها.</p>
    <p><b>الميزان الحراري بالأشعة تحت الحمراء:</b> يقيس الإشعاع الصادر من السطح دون تلامس، ويعرضه درجة حرارة بوحدة <span dir="ltr">°C</span>، فالسطح الذي يشع أكثر يعطي قراءة أعلى.</p></div></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>التوصيل: انتقال الحرارة خلال المادة بالتلامس من جزيء لآخر دون انتقال المادة نفسها</b><span>الفلزات موصلات جيدة</span></div>
      <div class="ln lw"><b>الحمل: في السوائل والغازات، المائع الساخن يتمدد وتقل كثافته فيرتفع، ويحل محله المائع البارد</b><span>تيار الحمل</span></div>
      <div class="ln lw"><b>الإشعاع: انتقال الطاقة على شكل موجات كهرومغناطيسية، ولا يحتاج وسطا ماديا</b><span>السطح الأسود يشع أكثر</span></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">t</span> زمن سقوط الكرة المعدنية من لحظة تشغيل مصدر الحرارة، ووحدته <span dir="ltr">s</span>، وكلما قل الزمن كان القضيب أجود توصيلا للحرارة</li>
      <li><span class="chip" dir="ltr">T</span> درجة حرارة السطح كما يقرؤها الميزان الحراري بالأشعة تحت الحمراء، ووحدتها <span dir="ltr">°C</span>، وكلما زادت كان إشعاع السطح أكبر</li></ul></div></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 قراءات جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس</h3>
    <h4 class="sbh">أ) التوصيل: قياس زمن سقوط الكرة المعدنية عن كل قضيب</h4>
    <div class="stage"><div id="cS"></div><svg id="cZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="cSt"></span></div></div>
    <div class="row"><label for="tR">ساعة الإيقاف</label><output id="tO"></output><input id="tR" type="range" min="0" max="120" step="1" value="0"></div>
    <p class="slh">👆 اسحب مؤشر ساعة الإيقاف ببطء، وتوقف عند لحظة سقوط كل كرة، ثم اكتب الزمن الظاهر على ساعة الإيقاف.</p>
    ${hxAns('t1','زمن سقوط الكرة عن قضيب النحاس','s')}
    ${hxAns('t2','زمن سقوط الكرة عن قضيب الألومنيوم','s')}
    ${hxAns('t3','زمن سقوط الكرة عن قضيب الحديد','s')}
    <h4 class="sbh">ب) الحمل: ملاحظة حركة الماء عند تسخينه</h4>
    <div class="stage"><div id="vS"></div><div class="hud"><span id="vSt"></span></div></div>
    ${hxRow('vR','تسخين الماء')}
    <p class="slh">👆 اسحب المؤشر البرتقالي لتسخين الماء، ولاحظ مسار الصبغة الملونة.</p>
    <h4 class="sbh">ج) الإشعاع: قياس درجة حرارة الوجه الأسود والوجه اللامع لمكعب ليزلي</h4>
    <div class="stage"><div id="lS"></div><svg id="lZ" viewBox="0 0 400 112"></svg><div class="hud"><span id="lSt"></span></div></div>
    ${hxRow('lR','توجيه المقياس')}
    <p class="slh">👆 المقياس موجه إلى الوجه الأسود، اقرأ القراءة، ثم اسحب المؤشر البرتقالي لتوجيهه إلى الوجه اللامع واقرأ القراءة.</p>
    ${hxAns('b1','قراءة المقياس أمام الوجه الأسود','°C')}
    ${hxAns('b2','قراءة المقياس أمام الوجه اللامع','°C')}
  </div>
  <div class="ctl"><h3>5.2 المقارنة بين طرق انتقال الحرارة</h3>
    <div class="law ftl"><div class="ln lw"><b>المقارنة</b><span id="cmpS" style="white-space:pre-line;line-height:2">أكمل الخطوات في 5.1</span></div></div>
    <p class="rn" id="cmpN"></p></div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>القياس</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>زمن السقوط: النحاس</td><td id="r1">—</td></tr><tr><td>زمن السقوط: الألومنيوم</td><td id="r2">—</td></tr><tr><td>زمن السقوط: الحديد</td><td id="r3">—</td></tr>
    <tr><td>الحمل في الماء</td><td id="r4">—</td></tr><tr><td>قراءة الوجه الأسود</td><td id="r5">—</td></tr><tr><td>قراءة الوجه اللامع</td><td id="r6">—</td></tr></tbody></table></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const {$,num,fb,fb0,r1}=hxKit(box);let F,BK,SH,ok={};
  function newObj(){F=[18+Math.floor(Math.random()*8),32+Math.floor(Math.random()*10),70+Math.floor(Math.random()*25)];BK=r1(76+Math.random()*6);SH=r1(30+Math.random()*6);ok={};
    ['tR','vR','lR'].forEach(k=>$(k).value=0);['t1','t2','t3','b1','b2'].forEach(k=>$(k).value='');['t1Fb','t2Fb','t3Fb','b1Fb','b2Fb'].forEach(fb0);cDraw();vDraw();lDraw();results()}
  function cDraw(){const t=+$('tR').value,n=F.filter(x=>t>=x).length;$('tO').textContent=t+' s';
    $('cSt').textContent=t===0?'ابدأ تشغيل ساعة الإيقاف مع تشغيل مصدر الحرارة':F.includes(t)?'✓ سقطت كرة الآن، اقرأ الزمن من ساعة الإيقاف':`سقط ${n} من 3 كرات`;
    $('cS').innerHTML=cdScene(t,F,{sw:t});$('cZ').innerHTML=hxZoom([[56,288,`t = ${t} s`]],'شاشة ساعة الإيقاف (مكبرة)')}
  function vDraw(){const v=+$('vR').value;$('vRO').textContent=v>=100?'تكون تيار الحمل':'';$('vSt').textContent=v>=100?'✓ الماء الساخن يرتفع، والبارد ينزل ليحل محله: تيار الحمل':v>0?'الصبغة تتحرك مع الماء…':'ابدأ تشغيل مصدر الحرارة';
    $('vS').innerHTML=cv3D(v/100,{lab:v>=100});if(v>=100&&!ok.v){ok.v=true;results()}}
  function lDraw(){const v=+$('lR').value,R=v===0?BK.toFixed(1):v===100?SH.toFixed(1):null;$('lRO').textContent=v===0?'الوجه الأسود':v===100?'الوجه اللامع':'';
    $('lSt').textContent=v===0?'✓ المقياس موجه إلى الوجه الأسود':v===100?'✓ المقياس موجه إلى الوجه اللامع':'أدر المقياس حتى يواجه الوجه اللامع';
    $('lS').innerHTML=lcScene(v,R);$('lZ').innerHTML=hxZoom([[56,288,`T = ${R||'--.-'} °C`]],'شاشة الميزان الحراري بالأشعة تحت الحمراء (مكبرة)')}
  function results(){['r1','r2','r3'].forEach((r,i)=>$(r).textContent=ok['t'+(i+1)]?E(F[i]+' s'):'—');$('r4').textContent=ok.v?'الماء الساخن يرتفع والبارد ينزل':'—';$('r5').textContent=ok.b1?E(BK.toFixed(1)+' °C'):'—';$('r6').textContent=ok.b2?E(SH.toFixed(1)+' °C'):'—';
    const all=ok.t1&&ok.t2&&ok.t3&&ok.v&&ok.b1&&ok.b2;
    $('cmpS').textContent=all?['التوصيل (الأسرع أجود توصيلا):',E(`${F[0]} s < ${F[1]} s < ${F[2]} s`),'النحاس ثم الألومنيوم ثم الحديد','الإشعاع:',E(`${BK.toFixed(1)} °C > ${SH.toFixed(1)} °C`),'الوجه الأسود يشع أكثر من الوجه اللامع'].join('\n'):'أكمل الخطوات في 5.1';
    $('cmpN').textContent=all?'الوجهان عند درجة الحرارة نفسها لأن الماء الساخن نفسه بداخلهما، لكن الوجه الأسود يصدر إشعاعا حراريا أكبر فيقرؤه المقياس أعلى.':'';
    $('rNote').innerHTML=all?'الاستنتاج: تنتقل الحرارة بالتوصيل في المواد الصلبة، والنحاس أجود الفلزات الثلاثة توصيلا للحرارة ثم الألومنيوم ثم الحديد، وتنتقل بالحمل في السوائل بحركة المائع الساخن إلى أعلى، وتنتقل بالإشعاع على شكل موجات كهرومغناطيسية، والسطح الأسود يشع أكثر من السطح اللامع.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  $('tR').oninput=cDraw;$('vR').oninput=vDraw;$('lR').oninput=lDraw;
  const nm=['النحاس','الألومنيوم','الحديد'];
  [0,1,2].forEach(i=>{$('t'+(i+1)+'Ck').onclick=()=>{const id='t'+(i+1);if(+$('tR').value<F[i])return fb(id+'Fb',false,'اسحب مؤشر ساعة الإيقاف حتى تسقط الكرة عن قضيب '+nm[i]+' أولا.');const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,'اكتب الزمن بالثانية.');
    if(Math.abs(v-F[i])<=1){ok[id]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`t = ${F[i]} s`))}else fb(id+'Fb',false,'✗ ارجع بساعة الإيقاف إلى أول لحظة سقطت فيها الكرة، واقرأ الزمن.');results()}});
  const rb=(id,pos,val,lab)=>{$(id+'Ck').onclick=()=>{if(+$('lR').value!==pos)return fb(id+'Fb',false,`أدر المقياس نحو ${lab} أولا.`);const v=num($(id).value);if(isNaN(v))return fb(id+'Fb',false,'اكتب القراءة بوحدة °C.');
    if(Math.abs(v-val())<0.05){ok[id]=true;fb(id+'Fb',true,'✓ قراءة صحيحة:\n'+E(`T = ${val().toFixed(1)} °C`))}else fb(id+'Fb',false,'✗ اكتب القراءة كما تظهر على الشاشة المكبرة.');results()}};
  rb('b1',0,()=>BK,'الوجه الأسود');rb('b2',100,()=>SH,'الوجه اللامع');
  $('nw').onclick=newObj;newObj()}

/* مراجع التجارب (نفس مراجع التقرير) */
/* ===== تجربة الوحدة الرابعة: قانون كولوم بالميزان الرقمي ===== */
function clScene(o){/* o:{r (cm), m (نص قراءة الميزان), lab} */
  o=o||{};const BASE=290,T=14,PX=9,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px">${t}</text>`;
  const r=o.r==null?12:o.r,CX=200,D=45,ZL=96,RS=12,ZU=ZL+r*PX,ZA=ZU+40;
  let g=`<defs><radialGradient id="clSph" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#F8FAFC"/><stop offset=".45" stop-color="#CBD5E1"/><stop offset="1" stop-color="#475569"/></radialGradient><linearGradient id="clRod" x1="0" x2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset=".5" stop-color="#FFFBEB"/><stop offset="1" stop-color="#D97706"/></linearGradient><linearGradient id="clSt" x1="0" x2="1"><stop offset="0" stop-color="#64748B"/><stop offset=".5" stop-color="#E2E8F0"/><stop offset="1" stop-color="#475569"/></linearGradient></defs>`;
  g+=box(6,370,0,90,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* الحامل: قاعدة وعمود */
  g+=box(40,100,30,62,T,T+6,'#334155','#475569','#1F2937','#0F172A');
  {const [x,y0]=S(70,46,T+6),[,y1]=S(70,46,ZA+16);g+=`<rect x="${x-3}" y="${y1}" width="6" height="${y0-y1}" fill="url(#clSt)" stroke="#334155" stroke-width=".8"/>`}
  /* الميزان الرقمي */
  g+=box(150,250,20,70,T,T+28,'#E2E8F0','#F1F5F9','#CBD5E1','#475569');
  {const a=S(158,20,T+22),b=S(222,20,T+6);g+=`<rect x="${a[0]}" y="${a[1]}" width="${b[0]-a[0]}" height="${b[1]-a[1]}" rx="3" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b[0])/2}" y="${(a[1]+b[1])/2+4}" font-size="11" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.m||'0.000'} g</text>`;
   const c=S(234,20,T+14);g+=`<circle cx="${c[0]}" cy="${c[1]}" r="4" fill="#94A3B8" stroke="#334155"/>`}
  {const [px,py]=S(CX,D,T+28);g+=`<ellipse cx="${px}" cy="${py}" rx="30" ry="9" fill="#CBD5E1" stroke="#475569"/><ellipse cx="${px}" cy="${py-2}" rx="28" ry="8" fill="#F8FAFC" stroke="#94A3B8"/>`}
  /* الساق العازلة السفلية والكرة السفلية */
  {const [x,y0]=S(CX,D,T+30),[,y1]=S(CX,D,ZL-RS+2);g+=`<rect x="${x-3}" y="${y1}" width="6" height="${y0-y1}" fill="url(#clRod)" stroke="#B45309" stroke-width=".8"/>`}
  const [lx,ly]=S(CX,D,ZL),[ux,uy]=S(CX,D,ZU);
  g+=`<circle cx="${lx}" cy="${ly}" r="${RS}" fill="url(#clSph)" stroke="#334155"/><text x="${lx}" y="${ly+5}" font-size="15" font-weight="900" text-anchor="middle" fill="#B91C1C">+</text>`;
  /* المسطرة المترية: صفرها عند مركز الكرة السفلية (o.mode: half نصف سنتيمتر، mm مليمترية، vernier ورنية على الحامل، digital رقمية على الحامل) */
  const MODE=o.mode||'mm',SIDE=MODE==='half'||MODE==='mm';
  {const RX=268,[rx,ry0]=S(RX,D,ZL),[,ry1]=S(RX,D,ZL+12.5*PX),[,rb]=S(RX,D,T);
   if(SIDE){g+=`<rect x="${rx-2}" y="${ry0}" width="4" height="${rb-ry0}" fill="#94A3B8"/><rect x="${rx}" y="${ry1-4}" width="20" height="${ry0-ry1+8}" rx="2" fill="#FEF3C7" stroke="#92400E"/>`;
   const stp=MODE==='mm'?0.1:0.5;for(let n=0;n<=Math.round(12/stp);n++){const c=Math.round(n*stp*10)/10,[,ty]=S(RX,D,ZL+c*PX),big=c%2===0,mid=c%1===0,hf=Math.abs(c*2-Math.round(c*2))<1e-6;g+=`<line x1="${rx}" y1="${ty}" x2="${rx+(big?10:mid?7:hf?5:3)}" y2="${ty}" stroke="#78350F" stroke-width="${big?1.4:mid?1:0.5}"/>`+(big?`<text x="${rx+12}" y="${ty+3.5}" font-size="8" font-weight="700" fill="#78350F" direction="ltr">${c}</text>`:'')}
   g+=`<line x1="${lx+RS}" y1="${ly}" x2="${rx}" y2="${ly}" stroke="#64748B" stroke-dasharray="3 3"/><line x1="${ux+RS}" y1="${uy}" x2="${rx}" y2="${uy}" stroke="#F7931E" stroke-width="1.6" stroke-dasharray="3 3"/>`}
   const ax=lx-RS-14;g+=`<line x1="${ax}" y1="${uy}" x2="${ax}" y2="${ly}" stroke="#F7931E" stroke-width="2"/><line x1="${ax-5}" y1="${uy}" x2="${ax+5}" y2="${uy}" stroke="#F7931E" stroke-width="2"/><line x1="${ax-5}" y1="${ly}" x2="${ax+5}" y2="${ly}" stroke="#F7931E" stroke-width="2"/><text x="${ax-6}" y="${(uy+ly)/2+5}" font-size="14" font-weight="800" text-anchor="end" fill="#C2410C" direction="ltr">r</text>`}
  /* الذراع الأفقية والماسك والساق العازلة العلوية */
  g+=box(64,78,40,52,ZA-4,ZA+10,'#334155','#475569','#1F2937','#0F172A');
  g+=box(78,CX+4,43,49,ZA,ZA+5,'#94A3B8','#CBD5E1','#64748B','#334155');
  {const [x,y0]=S(CX,D,ZA),[,y1]=S(CX,D,ZU+RS-2);g+=`<rect x="${x-3}" y="${y0}" width="6" height="${y1-y0}" fill="url(#clRod)" stroke="#B45309" stroke-width=".8"/>`}
  if(!SIDE){const [sx0,sy0]=S(80,40,ZL+40),[,sy1]=S(80,40,ZL+40+12.5*PX),[,cy]=S(80,40,ZA+3);
    g+=`<rect x="${sx0}" y="${sy1}" width="12" height="${sy0-sy1}" fill="${MODE==='vernier'?'#F3F4F6':'#CBD5E1'}" stroke="#334155" stroke-width=".8"/>`;
    if(MODE==='vernier'){for(let n=0;n<=120;n++){const c=n/10,[,ty]=S(80,40,ZL+40+c*PX),big=n%10===0;g+=`<line x1="${sx0}" y1="${ty}" x2="${sx0+(big?7:3)}" y2="${ty}" stroke="#111827" stroke-width="${big?1:.4}"/>`+(big&&n%20===0?`<text x="${sx0+7}" y="${ty+3}" font-size="7" font-weight="700" fill="#111827" direction="ltr">${c}</text>`:'')}
      g+=`<rect x="${sx0+12}" y="${cy-9}" width="14" height="18" rx="2" fill="#F7931E" stroke="#9A3412"/>`;for(let k=0;k<=10;k++){const yy=cy+9-k*1.62;g+=`<line x1="${sx0+12}" y1="${yy}" x2="${sx0+(k%5?16:20)}" y2="${yy}" stroke="#431407" stroke-width=".6"/>`}}
    else{g+=`<rect x="${sx0+12}" y="${cy-12}" width="50" height="22" rx="3" fill="#1F2937" stroke="#0F172A"/><rect x="${sx0+15}" y="${cy-9}" width="44" height="12" rx="2" fill="#BBF7D0"/><text x="${sx0+37}" y="${cy+0.5}" font-size="8.5" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${r.toFixed(2)} cm</text>`}}
  g+=`<circle cx="${ux}" cy="${uy}" r="${RS}" fill="url(#clSph)" stroke="#334155"/><text x="${ux}" y="${uy+5}" font-size="15" font-weight="900" text-anchor="middle" fill="#B91C1C">+</text>`;
  if(o.lab){const [sx,sy]=S(70,46,ZA-30),[bx,by]=S(170,20,T+10),[dx,dy]=S(214,20,T+8),[rx]=S(268,D,0),[,ry]=S(268,D,ZL+8*PX),[,rod2]=S(CX,D,ZA-14);
    g+=lbl(ux-RS+1,uy-3,188,uy-10,'الكرة العلوية','end')+lbl(lx-RS+1,ly+5,188,ly+26,'الكرة السفلية','end')
      +lbl(sx-2,sy,8,22,'حامل بساق عازلة','start')+lbl(ux+3,rod2,248,20,'ساق عازلة','start')
      +lbl(rx+20,ry,396,40,'المسطرة المليمترية','end')+lbl(bx,by,110,BASE+26,'الميزان الرقمي','middle')+lbl(dx,dy,316,BASE+26,'شاشة الميزان','middle')}
  return `<svg viewBox="0 0 400 ${BASE+(o.lab?46:12)}" aria-label="ميزان رقمي عليه كرة مشحونة، وفوقها كرة مشحونة معلقة بحامل، ومسطرة لقياس المسافة بين مركزيهما">${g}</svg>`}

function clLab(box){
  const K=9e9,G=9.8,RS_=[4,8],RMAX=12;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">التحقق من قانون كولوم</p></div>
  <div class="tags"><span class="tag">المسافة r: <i>المسطرة المليمترية</i> · cm</span><span class="tag">قراءة الميزان m: <i>الميزان الرقمي</i> · g</span><span class="tag dv">القوة الكهربائية F: <i>محسوبة</i> · N</span><span class="tag dv">الشحنة q: <i>محسوبة</i> · nC</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الميزان الرقمي والمسطرة المليمترية والحامل بساق عازلة.</li>
    <li>قياس قوة التنافر بين كرتين مشحونتين بشحنتين موجبتين متساويتين في المقدار بالميزان الرقمي عند مسافتين <span dir="ltr">r</span> تقاس بالمسطرة المليمترية.</li>
    <li>التحقق من أن القوة الكهربائية تتناسب عكسيا مع مربع المسافة بين الشحنتين.</li>
    <li>حساب مقدار الشحنة <span dir="ltr">q</span> على كل كرة من قانون كولوم.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${clScene({lab:true,r:9,m:'0.000',mode:'mm'})}</div><div class="vcap">الميزان الرقمي والكرتان المشحونتان والمسطرة المليمترية: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> كرة معدنية مثبتة على ساق عازلة فوق كفة الميزان الرقمي، وفوقها كرة معدنية ثانية معلقة في حامل بساق عازلة، تنزل وترتفع مع ماسك الحامل على عموده. والمسطرة المليمترية بجانبهما، وصفرها عند مركز الكرة السفلية.</p></div>
    <p><b>الميزان الرقمي:</b> ميزان دقيق يقرأ بالجرام بدقة <span dir="ltr">0.001 g</span>، صفر قبل التجربة والكرة السفلية عليه، فيقرأ فقط الكتلة الإضافية الناتجة عن قوة التنافر.</p>
    <p><b>الكرتان المعدنيتان:</b> مشحونتان بشحنتين موجبتين متساويتين <span dir="ltr">q</span>، فتتنافران، وتدفع الكرة العلوية الكرة السفلية إلى أسفل.</p>
    <p><b>المسطرة المليمترية:</b> مقسمة كل <span dir="ltr">1 mm</span>، وتقاس بها المسافة <span dir="ltr">r</span> بين مركزي الكرتين بالسنتيمتر بدقة <span dir="ltr">0.1 cm</span>.</p>
    <p><b>الحامل بساق عازلة:</b> حامل معدني بقاعدة وعمود وماسك متحرك، تعلق فيه الكرة العلوية بساق عازلة تمنع تسرب الشحنة منها، وبمثلها تثبت الكرة السفلية على الميزان.</p></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>قانون كولوم: القوة بين شحنتين نقطيتين</b><span>F = k·q₁·q₂ / r²</span></div>
      <div class="ln lw"><b>الكرتان مشحونتان بشحنتين متساويتين <bdi dir="ltr">q₁ = q₂ = q</bdi></b><span>F = k·q² / r²</span></div>
      <div class="ln lw"><b>قوة التنافر تدفع الكرة السفلية إلى أسفل، فيقرأ الميزان كتلة إضافية m</b><span>F = m·g</span></div>
      <div class="ln lw"><b>عند ثبات الشحنة، النسبة بين قوتين عند مسافتين</b><span>F₁ / F₂ = (r₂ / r₁)²</span></div>
      <div class="ln lw"><b>ومن قانون كولوم نحسب الشحنة</b><span>q = r·√(F / k)</span></div>
      <p class="slh" style="margin:2px 0 8px">ℹ️ حيث <bdi dir="ltr">F = m·g</bdi> قوة التنافر المقاسة بالميزان الرقمي.</p>
      <div class="vfig"><svg viewBox="0 0 340 190" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="كرتان موجبتان تتنافران">
      <defs><marker id="clA" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#F7931E"/></marker></defs>
      <circle cx="170" cy="60" r="15" fill="#FCA5A5" stroke="#B91C1C" stroke-width="2"/><text x="170" y="66" text-anchor="middle" font-size="17" font-weight="900" fill="#B91C1C">+</text>
      <circle cx="170" cy="140" r="15" fill="#FCA5A5" stroke="#B91C1C" stroke-width="2"/><text x="170" y="146" text-anchor="middle" font-size="17" font-weight="900" fill="#B91C1C">+</text>
      <line x1="170" y1="43" x2="170" y2="6" stroke="#F7931E" stroke-width="3.5" marker-end="url(#clA)"/><text x="182" y="22" font-size="14" font-weight="800" fill="#C2410C" direction="ltr">F</text>
      <line x1="170" y1="157" x2="170" y2="186" stroke="#F7931E" stroke-width="3.5" marker-end="url(#clA)"/><text x="182" y="182" font-size="14" font-weight="800" fill="#C2410C" direction="ltr">F</text>
      <line x1="120" y1="60" x2="120" y2="140" stroke="var(--ink)" stroke-width="1.5"/><line x1="114" y1="60" x2="126" y2="60" stroke="var(--ink)" stroke-width="1.5"/><line x1="114" y1="140" x2="126" y2="140" stroke="var(--ink)" stroke-width="1.5"/><text x="108" y="105" font-size="15" font-weight="800" text-anchor="end" fill="var(--ink)" direction="ltr">r</text>
      <text x="148" y="66" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)" direction="ltr">q</text><text x="148" y="146" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)" direction="ltr">q</text>
      <text x="268" y="105" font-size="13" font-weight="700" text-anchor="middle" fill="var(--ink)">‏شحنتان متشابهتان: تنافر‏</text>
      </svg><div class="vcap">القوتان متساويتان في المقدار ومتعاكستان في الاتجاه، وتقل القوة كلما زادت المسافة</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">F</span> القوة الكهربائية بين الشحنتين، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">k</span> ثابت كولوم، وقيمته <span dir="ltr">9 × 10⁹ N·m²/C²</span></li>
      <li><span class="chip" dir="ltr">q</span> شحنة كل كرة، ووحدتها <span dir="ltr">C</span>، و <span dir="ltr">1 nC = 10⁻⁹ C</span></li>
      <li><span class="chip" dir="ltr">r</span> المسافة بين مركزي الكرتين، ووحدتها <span dir="ltr">m</span>، و <span dir="ltr">1 cm = 0.01 m</span></li>
      <li><span class="chip" dir="ltr">m</span> قراءة الميزان الرقمي، ووحدتها <span dir="ltr">kg</span>، و <span dir="ltr">1 g = 0.001 kg</span></li>
      <li><span class="chip" dir="ltr">g</span> تسارع الجاذبية، وقيمته <span dir="ltr">9.8 m/s²</span></li>
      </ul></div>
      <p class="slh">ℹ️ في نسبة القوتين لا نحتاج تحويل الوحدات، لأن <span dir="ltr">F₁ / F₂ = m₁ / m₂</span> والمسافتان بنفس الوحدة.</p></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 شحنة جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس</h3>
    ${RS_.map((r,i)=>`<h4 class="sbh">${'أبج'[i]}) قراءة الميزان عند المسافة <bdi dir="ltr">r${'₁₂₃'[i]} = ${r} cm</bdi></h4>
    <div class="stage"><div id="sS${i}"></div><svg id="sM${i}" viewBox="0 0 400 120"></svg><svg id="sZ${i}" viewBox="0 0 400 112"></svg><div class="hud"><span id="sSt${i}"></span></div></div>
    <div class="row"><label for="sR${i}">إنزال الكرة العلوية</label><output id="sO${i}"></output><input id="sR${i}" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لإنزال الكرة العلوية حتى يقع خط مركز الكرة العلوية على التدريج <bdi dir="ltr">${r}.0 cm</bdi> في التكبير، ثم اقرأ المسافة وقراءة الميزان.</p>
    <div class="ans"><label>قراءة المسطرة <bdi dir="ltr">r${'₁₂₃'[i]}</bdi></label><input id="d${i}" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="d${i}Ck">تحقق</button></div><div class="fb2" id="d${i}Fb"></div>
    <div class="ans"><label>قراءة الميزان <bdi dir="ltr">m${'₁₂₃'[i]}</bdi> عند <bdi dir="ltr" style="white-space:nowrap">r = ${r} cm</bdi></label><input id="m${i}" inputmode="decimal" dir="ltr" placeholder="g"><button type="button" class="go" id="m${i}Ck">تحقق</button></div><div class="fb2" id="m${i}Fb"></div>`).join('')}
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <p class="slh">ℹ️ <b>المعطيات:</b> <b dir="ltr">g = 9.8 m/s²</b> ، <b dir="ltr">k = 9 × 10⁹ N·m²/C²</b></p>
    <h4 class="sbh">أ) حساب النسبة F₁ / F₂ ومقارنتها بـ (r₂ / r₁)²</h4>
    <p class="slh">ℹ️ حيث <bdi dir="ltr">F = m·g</bdi> قوة التنافر المقاسة بالميزان الرقمي، فتختصر <bdi dir="ltr">g</bdi> في النسبة.</p>
    ${hxCalcStep('R2','F₁ / F₂ = m₁ / m₂','احسب النسبة F₁ / F₂','')}
    <h4 class="sbh">ب) حساب الشحنة q على كل كرة</h4>
    <p class="slh">ℹ️ حيث <bdi dir="ltr">F₁ = m₁·g</bdi> قوة التنافر المقاسة بالميزان الرقمي عند <bdi dir="ltr">r₁</bdi>، فنعوضها في <bdi dir="ltr">q = r₁·√(F₁ / k)</bdi>.</p>
    ${hxCalcStep('Q','q = r₁·√(m₁·g / k)','احسب الشحنة q بوحدة nC','nC')}
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>قراءة الميزان <bdi dir="ltr">m₁</bdi> عند <bdi dir="ltr" style="white-space:nowrap">4 cm</bdi></td><td id="r0">—</td></tr>
    <tr><td>قراءة الميزان <bdi dir="ltr">m₂</bdi> عند <bdi dir="ltr" style="white-space:nowrap">8 cm</bdi></td><td id="r1">—</td></tr>
    <tr><td><bdi dir="ltr">F₁ / F₂</bdi> المقاسة و <bdi dir="ltr">(r₂ / r₁)²</bdi></td><td id="r4">—</td></tr>
    <tr><td>الشحنة <bdi dir="ltr">q</bdi> على كل كرة</td><td id="r6">—</td></tr></tbody></table></div>
    <div id="clC"></div>
    <p class="rn" id="rNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n));
  const zoom=(lines,cap)=>`<rect x="20" y="4" width="360" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/>`+lines+`<text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${cap}</text>`;
  const scr=(x,w,txt)=>`<rect x="${x}" y="16" width="${w}" height="62" rx="8" fill="#BBF7D0" stroke="#14532D"/><text x="${x+w/2}" y="57" font-size="24" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${txt}</text>`;
  const mmZ=r=>{let s=`<rect x="10" y="4" width="380" height="94" rx="12" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="24" y="14" width="352" height="70" rx="4" fill="#FEF3C7"/>`;const X=v=>200+(v-r)*160;
    for(let n=Math.ceil((r-1.2)*10);n<=Math.floor((r+1.2)*10);n++){const v=n/10,x=X(v);if(x<26||x>374||v<0)continue;const big=n%10===0,hf=n%5===0;s+=`<line x1="${x}" y1="14" x2="${x}" y2="${14+(big?30:hf?22:14)}" stroke="#78350F" stroke-width="${big?2:1.2}"/>`+(big?`<text x="${x}" y="66" font-size="16" font-weight="800" text-anchor="middle" fill="#78350F" direction="ltr">${Math.round(v)}</text>`:'')}
    return s+`<line x1="200" y1="10" x2="200" y2="48" stroke="#EA580C" stroke-width="2.5"/><line x1="200" y1="72" x2="200" y2="88" stroke="#EA580C" stroke-width="2.5"/><text x="32" y="80" font-size="12" font-weight="800" text-anchor="start" fill="#78350F" direction="ltr">cm</text><text x="200" y="114" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏تدريج المسطرة المليمترية عند خط مركز الكرة العلوية (مكبر)‏</text>`};
  let Q,NZ=[1,1,1],ok={};const MR=(r,i)=>Math.round(K*Q*Q/(r/100)**2/G*1e6*(i==null?1:NZ[i]))/1000,M=()=>RS_.map((r,i)=>MR(r,i));
  const F1=()=>M()[0]/1000*G,QC=()=>RS_[0]/100*Math.sqrt(F1()/K)*1e9;
  function newObj(){Q=(30+Math.floor(Math.random()*21))*1e-9;NZ=[1,0.975+Math.random()*0.05];ok={};
    RS_.forEach((r,i)=>{$('sR'+i).value=0;$('m'+i).value='';$('d'+i).value='';fb0('m'+i+'Fb');fb0('d'+i+'Fb');sDraw(i)});['R2','Q'].forEach(k=>{$('c'+k).value='';fb0('c'+k+'f')});sub();results()}
  function sDraw(i){const v=+$('sR'+i).value,to=RS_[i],r=Math.round((RMAX-(RMAX-to)*v/100)*10)/10,at=v>=100,m=MR(r,i).toFixed(3);
    $('sO'+i).textContent='';
    $('sSt'+i).textContent=at?'✓ وصلت الكرة إلى المسافة المطلوبة، اقرأ المسطرة ثم الميزان':'كلما اقتربت الكرتان زادت قوة التنافر وزادت قراءة الميزان';
    $('sS'+i).innerHTML=clScene({r,m,mode:'mm'});$('sM'+i).innerHTML=mmZ(r);
    $('sZ'+i).innerHTML=zoom(scr(90,220,`${m} g`),'‏شاشة الميزان الرقمي (مكبرة)‏')}
  function sub(){const m=M();
    $('sbR2').textContent=ok.m0&&ok.m1?['F₁ / F₂ = m₁ / m₂',E(`F₁ / F₂ = ${m[0]} / ${m[1]}`)].join('\n'):'F₁ / F₂ = m₁ / m₂';
    $('sbQ').textContent=ok.m0?['q = r₁·√(m₁·g / k)',E(`q = 0.04 × √(${fx(m[0]/1000,6)} × 9.8 / (9 × 10⁹))`)].join('\n'):'q = r₁·√(m₁·g / k)'}
  function chart(){const m=M();if(!(ok.m0&&ok.m1)){$('clC').innerHTML='';return}
    const pts=RS_.map((r,i)=>[1/(r/100)**2,m[i]/1000*G]),xm=700,ym=Math.ceil(pts[0][1]*1000/2+0.5)*2/1000,X0=56,Yb=232,W=290,H=196,X=x=>X0+x/xm*W,Y=y=>Yb-y/ym*H;let s='';
    for(let x=0;x<=xm;x+=100)s+=`<line x1="${X(x)}" y1="${Yb}" x2="${X(x)}" y2="${Yb-H}" stroke="var(--line)"/><text x="${X(x)}" y="${Yb+16}" font-size="11" text-anchor="middle" fill="var(--ink)">${x}</text>`;
    const st=ym/4;for(let k=0;k<=4;k++){const y=st*k;s+=`<line x1="${X0}" y1="${Y(y)}" x2="${X0+W}" y2="${Y(y)}" stroke="var(--line)"/><text x="${X0-6}" y="${Y(y)+4}" font-size="11" text-anchor="end" fill="var(--ink)">${fx(y*1000,1)}</text>`}
    s+=`<line x1="${X0}" y1="${Yb}" x2="${X0+W+8}" y2="${Yb}" stroke="var(--ink)" stroke-width="1.6"/><line x1="${X0}" y1="${Yb}" x2="${X0}" y2="${Yb-H-8}" stroke="var(--ink)" stroke-width="1.6"/>`;
    s+=`<text x="${X0+W}" y="${Yb+34}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">1/r² (1/m²)</text><text x="${X0+4}" y="${Yb-H-12}" font-size="13" font-weight="700" fill="var(--ink)">F (mN)</text>`;
    const sl=pts[0][1]/pts[0][0];s+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(xm)}" y2="${Y(sl*xm)}" stroke="#F7931E" stroke-width="3"/>`;
    pts.forEach(([x,y],i)=>{s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="5.5" fill="#7E22CE" stroke="#fff" stroke-width="2"/><text x="${X(x)+8}" y="${Y(y)+16}" font-size="11" font-weight="700" fill="#6B21A8" direction="ltr">${RS_[i]} cm</text>`});
    $('clC').innerHTML=`<div class="stage"><svg viewBox="0 0 380 280" style="direction:ltr;display:block;width:100%;height:auto" aria-label="القوة مقابل مقلوب مربع المسافة">${s}</svg></div><div class="vcap">النقطتان على خط مستقيم يمر بنقطة الأصل، أي أن F تتناسب طرديا مع 1/r²</div>`}
  function results(){const m=M();
    RS_.forEach((r,i)=>$('r'+i).textContent=ok['m'+i]?E(m[i].toFixed(3)+' g'):'—');
    $('r4').textContent=ok.cR2?E(`${fx(m[0]/m[1],2)} ≈ ${fx((RS_[1]/RS_[0])**2,2)}`):'—';
    $('r6').textContent=ok.cQ?E(fx(QC(),1)+' nC'):'—';
    chart();
    $('rNote').innerHTML=ok.cR2&&ok.cQ?'الاستنتاج: عند مضاعفة المسافة من <span dir="ltr">4 cm</span> إلى <span dir="ltr">8 cm</span> قلت القوة إلى الربع تقريبا، فالقوة الكهربائية تتناسب عكسيا مع مربع المسافة <span dir="ltr" style="white-space:nowrap">F ∝ 1/r²</span> كما في قانون كولوم، ومنه حسبنا شحنة كل كرة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  RS_.forEach((r,i)=>{$('sR'+i).oninput=()=>sDraw(i);
    $('d'+i+'Ck').onclick=()=>{const f='d'+i+'Fb';if(+$('sR'+i).value<100)return fb(f,false,`أنزل الكرة العلوية حتى تصل إلى ${r} cm أولا.`);const v=num($('d'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة المسطرة بالسنتيمتر.');
      if(Math.abs(v-r)<0.05){ok['d'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`r${'₁₂₃'[i]} = ${r.toFixed(1)} cm`))}else fb(f,false,'✗ اقرأ الرقم الكبير قبل الخط البرتقالي، ثم عد أقسام المليمتر الصغيرة حتى الخط.')};
    $('m'+i+'Ck').onclick=()=>{const f='m'+i+'Fb';if(+$('sR'+i).value<100)return fb(f,false,`أنزل الكرة العلوية حتى تصبح المسافة ${r} cm أولا.`);const v=num($('m'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة الميزان بالجرام.');
      const val=M()[i];if(Math.abs(v-val)<0.0005){ok['m'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`m${'₁₂₃'[i]} = ${val.toFixed(3)} g`))}else fb(f,false,'✗ اكتب الرقم الظاهر على شاشة الميزان كما هو، بثلاثة أرقام عشرية.');sub();results()}});
  const chk=(id,need,needMsg,val,tol,okMsg,badMsg)=>{const f='c'+id+'f';if(!need())return fb(f,false,needMsg);const v=num($('c'+id).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بالأرقام.');
    if(Math.abs(v-val)/Math.abs(val)<=tol){ok['c'+id]=true;fb(f,true,okMsg())}else fb(f,false,badMsg());sub();results()};
  $('cR2k').onclick=()=>chk('R2',()=>ok.m0&&ok.m1,'أكمل القراءتين (أ) و (ب) أولا.',M()[0]/M()[1],.02,()=>'✓ إجابة صحيحة:\n'+E(`F₁ / F₂ = ${M()[0]} / ${M()[1]} = ${fx(M()[0]/M()[1],2)}`)+'\n'+E(`(r₂ / r₁)² = (8 / 4)² = 4`)+'\nالقيمتان متساويتان تقريبا: عند مضاعفة المسافة تقل القوة إلى الربع.',()=>'✗ اقسم قراءة الميزان الأولى على الثانية:\n'+E(`F₁ / F₂ = ${M()[0]} / ${M()[1]}`));
  /* قبول الناتج بأي وحدة للشحنة (C أو mC أو µC أو pC) والتعرف عليها من مقداره، ثم تحويله إلى nC */
  {const inp=$('cQ');const orig=()=>{const v=num(inp.value);if(isNaN(v)||!(ok.m0))return false;const U=[['C',1e-9,'الضرب في 10⁹'],['mC',1e-6,'الضرب في 10⁶'],['µC',1e-3,'الضرب في 1000'],['pC',1e3,'القسمة على 1000']].find(([u,f])=>Math.abs(v-QC()*f)/(QC()*f)<=.02);if(!U)return false;ok['cQ']=true;fb('cQf',true,'✓ إجابة صحيحة بوحدة '+U[0]+':\n'+E(`q = ${inp.value.trim()} ${U[0]}`)+'\nوبالتحويل إلى nC ('+U[2]+'):\n'+E(`q = ${fx(QC(),1)} nC`));sub();results();return true};
   $('cQk').addEventListener('click',e=>{if(orig())e.stopImmediatePropagation()},true)}
  $('cQk').onclick=()=>chk('Q',()=>ok.m0,'أكمل القراءة (أ) أولا.',QC(),.02,()=>'✓ إجابة صحيحة:\n'+E(`q = 0.04 × √(${fx(M()[0]/1000,6)} × 9.8 / (9 × 10⁹))`)+'\n'+E(`q = ${fx(QC(),1)} × 10⁻⁹ C = ${fx(QC(),1)} nC`),()=>'✗ حول m₁ إلى kg واضربها في 9.8، ثم اقسم على k، ثم خذ الجذر، ثم اضرب في 0.04، ثم في 10⁹:\n'+E(`√(${fx(M()[0]/1000,6)} × 9.8 / (9 × 10⁹)) = ${(Math.sqrt(F1()/K)).toExponential(3)}`));
  $('nw').onclick=newObj;
  function fitL(){box.querySelectorAll('.law .ln > span, h4.sbh').forEach(e=>{if(!e.offsetWidth)return;e.style.fontSize='';if(e.dataset.pl==null)e.dataset.pl=/pre-line/.test(e.getAttribute('style')||'')?'1':'';const pre=e.dataset.pl==='1';e.style.whiteSpace=pre?'pre':'nowrap';e.style.display='block';e.style.overflow='hidden';
    let f=parseFloat(getComputedStyle(e).fontSize),k=0;while(e.scrollWidth>e.clientWidth+1&&f>9&&k++<80){f-=0.5;e.style.fontSize=f+'px'}});const hs=[...box.querySelectorAll('h4.sbh')].filter(e=>e.offsetWidth);if(hs.some(e=>e.style.fontSize)){const m=Math.min(...hs.map(e=>parseFloat(getComputedStyle(e).fontSize)));hs.forEach(e=>e.style.fontSize=m+'px')}}
  const qf=()=>requestAnimationFrame(fitL);addEventListener('resize',qf);new MutationObserver(qf).observe(box,{childList:true,subtree:true,characterData:true});
  calcInit(box);newObj();qf();
}

/* ===== تجربة الوحدة الرابعة: شدة المجال الكهربائي حول شحنة نقطية ===== */
function efScene(o){/* o:{r (cm), e (نص قراءة المقياس), lab} */
  o=o||{};const BASE=262,T=14,PX=10,S=(x,d,z)=>[x+d*0.6,BASE-z-d*0.5],P=(x,d,z)=>S(x,d,z).join(',');
  const poly=(a,f,st)=>`<polygon points="${a.map(p=>P(...p)).join(' ')}" fill="${f}" stroke="${st||'#334155'}" stroke-linejoin="round"/>`;
  const box=(x0,x1,d0,d1,z0,z1,cf,ct,cs,st)=>poly([[x0,d0,z1],[x1,d0,z1],[x1,d1,z1],[x0,d1,z1]],ct,st)+poly([[x1,d0,z0],[x1,d1,z0],[x1,d1,z1],[x1,d0,z1]],cs,st)+poly([[x0,d0,z0],[x1,d0,z0],[x1,d0,z1],[x0,d0,z1]],cf,st);
  const lbl=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px">${t}</text>`;
  const r=o.r==null?22:o.r,SX=120,D=50,ZC=T+112,RS=22,PXr=SX+r*PX;
  let g=`<defs><radialGradient id="efSph" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#F8FAFC"/><stop offset=".45" stop-color="#CBD5E1"/><stop offset="1" stop-color="#475569"/></radialGradient><linearGradient id="efRod" x1="0" x2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset=".5" stop-color="#FFFBEB"/><stop offset="1" stop-color="#D97706"/></linearGradient></defs>`;
  g+=box(6,440,0,130,0,T,'#B7834A','#E9C894','#9A6A3A','#7C4A1F');
  /* المسطرة المليمترية على الطاولة: صفرها تحت مركز الكرة */
  const RM=o.rm||'c',UP=RM==='c'?5:0;
  if(RM==='c'){g+=box(SX-28,SX+29*PX,D-18,D+18,T,T+5,'#CBD5E1','#E2E8F0','#94A3B8','#475569');
   for(let n=0;n<=270;n+=5){const x=SX+n/10*PX,[x0,y0]=S(x,D-18,T+5),[,y1]=S(x,D-18,T+5-(n%50===0?5:n%10===0?3.5:2));g+=`<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1}" stroke="#111827" stroke-width="${n%50===0?1.2:.6}"/>`;if(n%50===0)g+=`<text x="${x0}" y="${y0+15}" font-size="9" font-weight="700" text-anchor="middle" fill="#111827" direction="ltr">${n/10}</text>`}}
  if(RM==='b'){const z=T+0.5,d0=D-34,d1=D-22;g+=poly([[SX-4,d0,z],[SX+27*PX,d0,z],[SX+27*PX,d1,z],[SX-4,d1,z]],'#FEF3C7','#92400E');
   for(let n=0;n<=260;n+=5){const x=SX+n/10*PX,[x0,y0]=S(x,d1,z),[x1,y1]=S(x,d1-(n%50===0?8:n%10===0?5:3),z);g+=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#78350F" stroke-width="${n%50===0?1.2:.6}"/>`;if(n%50===0){const [tx,ty]=S(x,d0,z);g+=`<text x="${tx}" y="${ty+9}" font-size="8" font-weight="700" text-anchor="middle" fill="#78350F" direction="ltr">${n/10}</text>`}}}
  if(RM==='old'){const z=T+0.5,d0=6,d1=18;g+=poly([[SX-4,d0,z],[SX+27*PX,d0,z],[SX+27*PX,d1,z],[SX-4,d1,z]],'#FEF3C7','#92400E');
   for(let n=0;n<=260;n+=5){const x=SX+n/10*PX,[x0,y0]=S(x,d0,z),[x1,y1]=S(x,d0+(n%50===0?8:n%10===0?5:3),z);g+=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#78350F" stroke-width="${n%50===0?1.2:.6}"/>`;
     if(n%50===0){const [tx,ty]=S(x,d0-1,z);g+=`<text x="${tx}" y="${ty+9}" font-size="8" font-weight="700" text-anchor="middle" fill="#78350F" direction="ltr">${n/10}</text>`}}}
  const [cx,cy]=S(SX,D,ZC);
  /* مصدر الجهد العالي ومجس الشحن: الكرة تشحن باللمس ثم يبعد المجس */
  g+=box(10,68,96,118,T,T+40,'#E5E7EB','#F3F4F6','#CBD5E1','#475569');
  {const a=S(14,96,T+32),b2=S(50,96,T+15);g+=`<rect x="${a[0]}" y="${a[1]}" width="${b2[0]-a[0]}" height="${b2[1]-a[1]}" rx="2" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b2[0])/2}" y="${(a[1]+b2[1])/2+3}" font-size="10" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">5.0 kV</text>`;
   const k1=S(56,96,T+24),k2=S(63,96,T+24);g+=`<circle cx="${k1[0]}" cy="${k1[1]}" r="3" fill="#DC2626" stroke="#7F1D1D"/><circle cx="${k2[0]}" cy="${k2[1]}" r="3" fill="#1F2937"/>`}
  {const [kx,ky]=S(56,96,T+24);let tx,ty,hx,hy;if(o.charge){tx=cx-RS*0.72;ty=cy-RS*0.72;hx=tx-30;hy=ty-34}else{const p=S(18,110,T+40);tx=p[0];ty=p[1]-2;hx=tx+34;hy=ty-4}
   g+=`<path d="M${kx},${ky} C${kx+12},${ky-20} ${hx+20},${hy+6} ${hx},${hy}" fill="none" stroke="#DC2626" stroke-width="1.8"/>`;
   const ux=(tx-hx),uy=(ty-hy),L=Math.hypot(ux,uy),mx=hx+ux*0.55,my=hy+uy*0.55;
   g+=`<line x1="${hx}" y1="${hy}" x2="${mx}" y2="${my}" stroke="#1F2937" stroke-width="6" stroke-linecap="round"/><line x1="${mx}" y1="${my}" x2="${tx}" y2="${ty}" stroke="#94A3B8" stroke-width="3" stroke-linecap="round"/><circle cx="${tx}" cy="${ty}" r="2.6" fill="#F7931E"/>`;
   o._pr=[mx,my]}
  /* حامل الكرة بساق عازلة */
  g+=box(SX-24,SX+24,D-16,D+16,T+UP,T+7+UP,'#334155','#475569','#1F2937','#0F172A');
  {const [x,y0]=S(SX,D,T+7+UP),[,y1]=S(SX,D,ZC-RS+2);g+=`<rect x="${x-4}" y="${y1}" width="8" height="${y0-y1}" fill="url(#efRod)" stroke="#B45309" stroke-width=".8"/>`}
  if(RM==='old'){const [,ry]=S(SX,6,T+0.5);const [rx]=S(SX,6,T);g+=`<line x1="${cx}" y1="${cy}" x2="${rx}" y2="${ry}" stroke="#64748B" stroke-dasharray="3 3"/>`}
  g+=`<circle cx="${cx}" cy="${cy}" r="${RS}" fill="url(#efSph)" stroke="#334155"/><text x="${cx}" y="${cy+8}" font-size="24" font-weight="900" text-anchor="middle" fill="#B91C1C">+</text>`;
  /* مقياس المجال الكهربائي على حامل يتحرك على الطاولة */
  const MX=PXr;g+=box(MX-4,MX+56,D-14,D+14,T+UP,T+6+UP,'#334155','#475569','#1F2937','#0F172A');
  {const [x,y0]=S(MX+26,D,T+6+UP),[,y1]=S(MX+26,D,ZC-18);g+=`<rect x="${x-3.5}" y="${y1}" width="7" height="${y0-y1}" fill="#94A3B8" stroke="#475569" stroke-width=".8"/>`}
  g+=box(MX+10,MX+70,D-12,D+12,ZC-20,ZC+30,'#1F2937','#334155','#111827','#0F172A');
  {const a=S(MX+15,D-12,ZC+24),b=S(MX+65,D-12,ZC-8);g+=`<rect x="${a[0]}" y="${a[1]}" width="${b[0]-a[0]}" height="${b[1]-a[1]}" rx="2" fill="#BBF7D0" stroke="#14532D"/><text x="${(a[0]+b[0])/2}" y="${(a[1]+b[1])/2+3}" font-size="12" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">${o.e||'0.00'}</text>`}
  {const [x0,y0]=S(MX,D,ZC),[x1]=S(MX+10,D,ZC);g+=`<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="#475569" stroke-width="5"/><circle cx="${x0}" cy="${y0}" r="2.6" fill="#F7931E"/>`;
   if(RM==='old'){const [,ry]=S(MX,6,T+0.5),[rx]=S(MX,6,T);g+=`<line x1="${x0}" y1="${y0}" x2="${rx}" y2="${ry}" stroke="#F7931E" stroke-width="1.4" stroke-dasharray="3 3"/>`}
   if(RM==='a'){const ZR=ZC-RS-14,[r0,y0r]=S(SX,D-14,ZR),[r1,y1r]=S(SX+26*PX,D-14,ZR-12);
     {const [p0x,p0y]=S(SX+262,D-14,ZR-12),[,pb]=S(SX+262,D-14,T);g+=`<rect x="${p0x-2}" y="${p0y}" width="4" height="${pb-p0y}" fill="#94A3B8"/>`}
     g+=`<rect x="${r0-2}" y="${y0r}" width="${r1-r0+4}" height="${y1r-y0r}" fill="#FEF3C7" stroke="#92400E"/>`;
     for(let n=0;n<=260;n+=5){const [x]=S(SX+n/10*PX,D-14,ZR);g+=`<line x1="${x}" y1="${y0r}" x2="${x}" y2="${y0r+(n%50===0?7:n%10===0?5:3)}" stroke="#78350F" stroke-width="${n%50===0?1.2:.6}"/>`+(n%50===0?`<text x="${x}" y="${y1r-1}" font-size="7" font-weight="700" text-anchor="middle" fill="#78350F" direction="ltr">${n/10}</text>`:'')}
     const [a0]=S(SX,D-14,ZR),[a1]=S(MX,D-14,ZR);g+=`<line x1="${cx}" y1="${cy}" x2="${a0}" y2="${y0r}" stroke="#64748B" stroke-dasharray="3 3"/><line x1="${x0}" y1="${y0}" x2="${a1}" y2="${y0r}" stroke="#F7931E" stroke-width="1.4" stroke-dasharray="3 3"/>`}
   if(RM==='b'){[[SX,'#64748B'],[MX,'#F7931E']].forEach(([X,c])=>{const [ax,ay]=S(X,D-16,T+1),[bx,by]=S(X,D-22,T+0.5);g+=`<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="${c}" stroke-width="2"/><path d="M${bx-4},${by-3} L${bx},${by+3} L${bx+4},${by-3} Z" fill="${c}"/>`});
     g+=`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${S(SX,D,T+7)[1]}" stroke="#64748B" stroke-dasharray="3 3"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${S(MX,D,T+6)[1]}" stroke="#F7931E" stroke-width="1.4" stroke-dasharray="3 3"/>`}
   if(RM==='c'){[[SX,'#64748B'],[MX,'#F7931E']].forEach(([X,c])=>{const [px2,py2]=S(X,D-16,T+5);g+=`<path d="M${px2-7},${py2-10} L${px2},${py2} L${px2+7},${py2-10} Z" fill="${c}" stroke="#7C2D12" stroke-width=".6"/>`});
     g+=`<line x1="${cx}" y1="${cy}" x2="${cx}" y2="${S(SX,D,T+7+UP)[1]}" stroke="#64748B" stroke-dasharray="3 3"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${S(MX,D,T+6+UP)[1]}" stroke="#F7931E" stroke-width="1.4" stroke-dasharray="3 3"/>`}

   const yy=cy-RS-26;g+=`<line x1="${cx}" y1="${yy}" x2="${x0}" y2="${yy}" stroke="#F7931E" stroke-width="2"/><line x1="${cx}" y1="${yy-5}" x2="${cx}" y2="${yy+5}" stroke="#F7931E" stroke-width="2"/><line x1="${x0}" y1="${yy-5}" x2="${x0}" y2="${yy+5}" stroke="#F7931E" stroke-width="2"/><text x="${(cx+x0)/2}" y="${yy-6}" font-size="14" font-weight="800" text-anchor="middle" fill="#C2410C" direction="ltr">r</text>`}
  if(o.lab){const [mx,my]=S(MX+54,D-10,ZC+10),[px,py]=S(MX+3,D,ZC),[sx,sy]=S(SX,D,T+40),[rx,ry]=S(SX+215,D-18,T+3);
    const [hx2,hy2]=S(30,96,T+40);g+=(o.charge?lbl(o._pr[0],o._pr[1],8,24,'مجس الشحن','start'):'')+lbl(hx2,hy2,60,hy2-34,'مصدر الجهد العالي','middle');
    g+=lbl(cx-RS+4,cy-8,8,40,'كرة مشحونة','start')+lbl(sx-2,sy,150,BASE+26,'حامل بساق عازلة','middle')+lbl(px-1,py+2,px-10,py+46,'المجس','end')
      +lbl(mx,my,446,40,'مقياس شدة المجال الكهربائي','end')+lbl(rx,ry+2,340,BASE+26,'المسار المدرج','middle')}
  return `<svg viewBox="0 0 450 ${BASE+(o.lab?44:12)}" aria-label="كرة مشحونة على حامل بساق عازلة، ومقياس المجال الكهربائي على مسافة r منها، ومسطرة مليمترية على الطاولة">${g}</svg>`}

function efChargeFig(){/* رسم توضيحي: شحن الكرة بالتوصيل (اللمس) من مصدر الجهد العالي */
  const lb=(x,y,tx,ty,t,anc)=>`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="var(--muted)" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.4" fill="var(--muted)"/><text x="${tx}" y="${ty+(ty<y?-4:13)}" font-size="13" font-weight="700" text-anchor="${anc||'middle'}" fill="var(--ink)" style="paint-order:stroke;stroke:var(--panel);stroke-width:3px">${t}</text>`;
  let g=`<defs><radialGradient id="efcS" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#F8FAFC"/><stop offset=".45" stop-color="#CBD5E1"/><stop offset="1" stop-color="#475569"/></radialGradient><linearGradient id="efcR" x1="0" x2="1"><stop offset="0" stop-color="#FDE68A"/><stop offset=".5" stop-color="#FFFBEB"/><stop offset="1" stop-color="#D97706"/></linearGradient><marker id="efcA" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#DC2626"/></marker></defs>`;
  g+=`<polygon points="10,200 330,200 380,170 60,170" fill="#E9C894" stroke="#7C4A1F"/><polygon points="10,200 330,200 330,212 10,212" fill="#B7834A" stroke="#7C4A1F"/><polygon points="330,200 380,170 380,182 330,212" fill="#9A6A3A" stroke="#7C4A1F"/>`;
  /* الكرة على حامل بساق عازلة */
  g+=`<polygon points="70,188 120,188 132,180 82,180" fill="#475569" stroke="#0F172A"/><rect x="70" y="188" width="50" height="7" fill="#334155" stroke="#0F172A"/><rect x="97" y="96" width="8" height="88" fill="url(#efcR)" stroke="#B45309" stroke-width=".8"/>`;
  g+=`<circle cx="101" cy="78" r="24" fill="url(#efcS)" stroke="#334155"/>`;
  [[-14,-8],[12,-12],[-4,12],[16,8],[-16,10],[2,-18]].forEach(([dx,dy])=>{g+=`<text x="${101+dx}" y="${78+dy+4}" font-size="11" font-weight="900" text-anchor="middle" fill="#B91C1C">+</text>`});
  /* مصدر الجهد العالي */
  g+=`<polygon points="250,186 340,186 356,176 266,176" fill="#F3F4F6" stroke="#475569"/><rect x="250" y="122" width="90" height="64" fill="#E5E7EB" stroke="#475569"/><polygon points="250,122 340,122 356,112 266,112" fill="#F3F4F6" stroke="#475569"/><polygon points="340,122 356,112 356,176 340,186" fill="#CBD5E1" stroke="#475569"/>`;
  g+=`<rect x="258" y="132" width="52" height="20" rx="2" fill="#BBF7D0" stroke="#14532D"/><text x="284" y="146" font-size="11" font-weight="800" text-anchor="middle" fill="#14532D" font-family="Consolas,monospace" direction="ltr">5.0 kV</text>`;
  g+=`<circle cx="320" cy="140" r="5" fill="#DC2626" stroke="#7F1D1D"/><text x="320" y="128" font-size="11" font-weight="900" text-anchor="middle" fill="#B91C1C">+</text><circle cx="320" cy="166" r="5" fill="#1F2937"/><text x="306" y="170" font-size="12" font-weight="900" text-anchor="middle" fill="#1F2937">−</text>`;
  g+=`<path d="M320,171 V198" stroke="#1F2937" stroke-width="1.6"/><path d="M310,198 H330 M313,202 H327 M317,206 H323" stroke="#1F2937" stroke-width="1.6"/>`;
  /* السلك ومجس الشحن يلمس الكرة */
  g+=`<path d="M320,135 C330,60 230,30 176,46" fill="none" stroke="#DC2626" stroke-width="2.2"/>`;
  g+=`<line x1="176" y1="46" x2="150" y2="58" stroke="#1F2937" stroke-width="8" stroke-linecap="round"/><line x1="150" y1="58" x2="121" y2="68" stroke="#94A3B8" stroke-width="3.5" stroke-linecap="round"/><circle cx="121" cy="68" r="3" fill="#F7931E"/>`;
  g+=lb(162,52,180,18,'مجس الشحن (مقبض عازل)','middle')+lb(300,62,396,40,'سلك التوصيل','end')+lb(101,118,30,150,'ساق عازلة','middle')
    +lb(84,66,8,30,'كرة معدنية','start')+lb(266,160,200,220,'مصدر الجهد العالي','middle')+lb(320,140,396,98,'القطب الموجب','end')+lb(320,204,396,220,'تأريض القطب السالب','end');
  return `<svg viewBox="0 0 400 246" aria-label="شحن الكرة المعدنية بالتوصيل من مصدر الجهد العالي بمجس الشحن">${g}</svg>`}

function efLab(box){
  const K=9e9,RS_=[10,20],RMAX=22;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">قياس شدة المجال الكهربائي حول شحنة نقطية</p></div>
  <div class="tags"><span class="tag">المسافة r: <i>المسار المدرج</i> · cm</span><span class="tag">شدة المجال E: <i>مقياس شدة المجال الكهربائي</i> · N/C</span><span class="tag dv">الشحنة q: <i>محسوبة</i> · nC</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على مقياس شدة المجال الكهربائي والمسار المدرج والحامل بساق عازلة.</li>
    <li>قياس شدة المجال الكهربائي حول كرة مشحونة بشحنة موجبة بمقياس شدة المجال الكهربائي عند مسافتين <span dir="ltr">r</span> تقاس بالمسار المدرج.</li>
    <li>التحقق من أن شدة المجال الكهربائي تتناسب عكسيا مع مربع المسافة عن الشحنة.</li>
    <li>حساب شحنة الكرة <span dir="ltr">q</span> من قانون المجال الكهربائي الناشئ عن شحنة نقطية.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${efScene({lab:true,r:16,e:'0'})}</div><div class="vcap">الكرة المشحونة، ومقياس شدة المجال الكهربائي، والمسار المدرج: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> كرة معدنية على حامل بساق عازلة، تشحن باللمس من مصدر الجهد العالي بمجس الشحن، ومقياس شدة المجال الكهربائي على حامل، ومجسه في مستوى مركز الكرة. والقاعدتان على مسار مدرج بالمليمتر تنزلق عليه قاعدة المقياس، وفي كل قاعدة مؤشر على التدريج: مؤشر الكرة عند الصفر، ومؤشر المقياس تحت طرف المجس.</p></div>
    <div class="tool"><div class="stage">${efChargeFig()}</div><div class="vcap">شحن الكرة بالتوصيل (اللمس) قبل القياس</div>
    <p><b>طريقة الشحن بالتوصيل:</b> يوصل مجس الشحن بالقطب الموجب لمصدر الجهد العالي، ثم يلمس به الكرة المعدنية فتنتقل إليها شحنة موجبة، ثم يبعد المجس فتبقى الشحنة على الكرة لأنها على ساق عازلة.</p></div>
    <p><b>مقياس شدة المجال الكهربائي <span dir="ltr">(Electric Field Meter)</span>:</b> جهاز رقمي بمجس يوضع عند النقطة المراد قياس المجال عندها، ويعرض شدة المجال بوحدة <span dir="ltr">N/C</span> (وهي نفسها <span dir="ltr">V/m</span>) بدقة <span dir="ltr">10 N/C</span>.</p>
    <p><b>الكرة المعدنية المشحونة:</b> تشحن <b>باللمس (التوصيل)</b> قبل القياس: يلمسها مجس الشحن المتصل بالقطب الموجب لمصدر الجهد العالي، فتنتقل إليها شحنة موجبة <span dir="ltr">q</span>، ثم يبعد المجس فتبقى الشحنة عليها لأنها على ساق عازلة. ويكون مجالها خارجها كمجال شحنة نقطية في مركزها.</p>
    <p><b>مصدر الجهد العالي <span dir="ltr">(High Voltage Power Supply)</span> ومجس الشحن <span dir="ltr">(Charging Probe)</span>:</b> مصدر يعطي جهدا حتى <span dir="ltr">10 kV</span>، ومجس معدني بمقبض عازل يوصل الشحنة إلى الكرة.</p>
    <p><b>المسار المدرج:</b> مسار مقسم كل <span dir="ltr">1 mm</span> تنزلق عليه قاعدة المقياس، ويقرأ مؤشرها المسافة <span dir="ltr">r</span> بين مركز الكرة وطرف المجس بدقة <span dir="ltr">0.1 cm</span>.</p>
    <p><b>الحامل بساق عازلة:</b> يمسك الكرة بساق عازلة تمنع تسرب الشحنة منها.</p></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>شدة المجال الكهربائي: القوة المؤثرة على شحنة اختبار موجبة</b><span>E = F / q</span></div>
      <div class="ln lw"><b>المجال الكهربائي الناشئ عن شحنة نقطية</b><span>E = k·q / r²</span></div>
      <div class="ln lw"><b>عند ثبات الشحنة، النسبة بين شدتي المجال عند مسافتين</b><span>E₁ / E₂ = (r₂ / r₁)²</span></div>
      <div class="ln lw"><b>ومن قانون المجال نحسب الشحنة</b><span>q = E·r² / k</span></div>
      <div class="vfig"><svg viewBox="0 0 340 220" style="width:100%;max-width:420px;display:block;margin:6px auto" role="img" aria-label="خطوط المجال الكهربائي حول شحنة موجبة">
      <defs><marker id="efA" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#F7931E"/></marker></defs>
      ${[...Array(12)].map((_,i)=>{const a=i*Math.PI/6,x1=120+Math.cos(a)*24,y1=105+Math.sin(a)*24,x2=120+Math.cos(a)*92,y2=105+Math.sin(a)*92;return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#F7931E" stroke-width="2.2" marker-end="url(#efA)"/>`}).join('')}
      <circle cx="120" cy="105" r="18" fill="#FCA5A5" stroke="#B91C1C" stroke-width="2"/><text x="120" y="112" text-anchor="middle" font-size="20" font-weight="900" fill="#B91C1C">+</text>
      <circle cx="265" cy="66" r="3.5" fill="var(--ink)"/><line x1="137" y1="100" x2="265" y2="66" stroke="var(--ink)" stroke-dasharray="4 3"/><text x="205" y="74" font-size="14" font-weight="800" text-anchor="middle" fill="var(--ink)" direction="ltr">r</text><text x="275" y="62" font-size="14" font-weight="800" fill="var(--ink)" direction="ltr">E</text>
      </svg><div class="vcap">رسم توضيحي: خطوط المجال تخرج من الشحنة الموجبة في كل الاتجاهات، وتتباعد كلما زادت المسافة فيضعف المجال</div></div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">E</span> شدة المجال الكهربائي، ووحدتها <span dir="ltr">N/C</span></li>
      <li><span class="chip" dir="ltr">F</span> القوة الكهربائية المؤثرة على شحنة الاختبار، ووحدتها <span dir="ltr">N</span></li>
      <li><span class="chip" dir="ltr">k</span> ثابت كولوم، وقيمته <span dir="ltr">9 × 10⁹ N·m²/C²</span></li>
      <li><span class="chip" dir="ltr">q</span> شحنة الكرة، ووحدتها <span dir="ltr">C</span>، و <span dir="ltr">1 nC = 10⁻⁹ C</span></li>
      <li><span class="chip" dir="ltr">r</span> المسافة بين مركز الكرة ونقطة القياس، ووحدتها <span dir="ltr">m</span>، و <span dir="ltr">1 cm = 0.01 m</span></li>
      </ul></div>
      <p class="slh">ℹ️ في نسبة شدتي المجال لا نحتاج تحويل الوحدات، لأن القراءتين بنفس الوحدة والمسافتين بنفس الوحدة.</p></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 شحنة جديدة</button></div>
  <div class="ctl"><h3>5.1 القياس</h3>
    ${RS_.map((r,i)=>`<h4 class="sbh">${'أب'[i]}) قراءة شدة المجال عند المسافة <bdi dir="ltr">r${'₁₂'[i]} = ${r} cm</bdi></h4>
    <div class="stage"><div id="eS${i}"></div><svg id="eM${i}" viewBox="0 0 400 120"></svg><svg id="eZ${i}" viewBox="0 0 400 112"></svg><div class="hud"><span id="eSt${i}"></span></div></div>
    <div class="row"><label for="eR${i}">تحريك مقياس المجال</label><output id="eO${i}"></output><input id="eR${i}" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتقريب مقياس المجال من الكرة حتى يقع مؤشر قاعدة المقياس على التدريج <bdi dir="ltr">${r}.0 cm</bdi> في التكبير، ثم اقرأ المسافة وشدة المجال.</p>
    <div class="ans"><label>قراءة المسار المدرج <bdi dir="ltr">r${'₁₂'[i]}</bdi></label><input id="ed${i}" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="ed${i}Ck">تحقق</button></div><div class="fb2" id="ed${i}Fb"></div>
    <div class="ans"><label>قراءة مقياس المجال <bdi dir="ltr">E${'₁₂'[i]}</bdi> عند <bdi dir="ltr" style="white-space:nowrap">r = ${r} cm</bdi></label><input id="ee${i}" inputmode="decimal" dir="ltr" placeholder="N/C"><button type="button" class="go" id="ee${i}Ck">تحقق</button></div><div class="fb2" id="ee${i}Fb"></div>`).join('')}
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <p class="slh">ℹ️ <b>المعطيات:</b> <b dir="ltr">k = 9 × 10⁹ N·m²/C²</b></p>
    <h4 class="sbh">أ) حساب النسبة E₁ / E₂ ومقارنتها بـ (r₂ / r₁)²</h4>
    ${hxCalcStep('ER','E₁ / E₂','احسب النسبة E₁ / E₂','')}
    <h4 class="sbh">ب) حساب شحنة الكرة q</h4>
    <p class="slh">ℹ️ حول <bdi dir="ltr">r₁</bdi> إلى <bdi dir="ltr">m</bdi> بالقسمة على 100.</p>
    ${hxCalcStep('EQ','q = E₁·r₁² / k','احسب الشحنة q بوحدة nC','nC')}
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>شدة المجال <bdi dir="ltr">E₁</bdi> عند <bdi dir="ltr" style="white-space:nowrap">10 cm</bdi></td><td id="er0">—</td></tr>
    <tr><td>شدة المجال <bdi dir="ltr">E₂</bdi> عند <bdi dir="ltr" style="white-space:nowrap">20 cm</bdi></td><td id="er1">—</td></tr>
    <tr><td><bdi dir="ltr">E₁ / E₂</bdi> المقاسة و <bdi dir="ltr">(r₂ / r₁)²</bdi></td><td id="er2">—</td></tr>
    <tr><td>شحنة الكرة <bdi dir="ltr">q</bdi></td><td id="er3">—</td></tr></tbody></table></div>
    <div id="efC"></div>
    <p class="rn" id="eNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+x.toFixed(n));
  const zoom=(lines,cap)=>`<rect x="20" y="4" width="360" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/>`+lines+`<text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${cap}</text>`;
  const scr=(x,w,txt)=>`<rect x="${x}" y="16" width="${w}" height="62" rx="8" fill="#BBF7D0" stroke="#14532D"/><text x="${x+w/2}" y="57" font-size="24" font-weight="800" text-anchor="middle" fill="#14532D" direction="ltr" font-family="Consolas,monospace">${txt}</text>`;
  const mmZ=r=>{let s=`<rect x="10" y="4" width="380" height="94" rx="12" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="24" y="14" width="352" height="70" rx="4" fill="#FEF3C7"/>`;const X=v=>200+(v-r)*160;
    for(let n=Math.ceil((r-1.2)*10);n<=Math.floor((r+1.2)*10);n++){const v=n/10,x=X(v);if(x<26||x>374||v<0)continue;const big=n%10===0,hf=n%5===0;s+=`<line x1="${x}" y1="14" x2="${x}" y2="${14+(big?30:hf?22:14)}" stroke="#78350F" stroke-width="${big?2:1.2}"/>`+(big?`<text x="${x}" y="66" font-size="16" font-weight="800" text-anchor="middle" fill="#78350F" direction="ltr">${Math.round(v)}</text>`:'')}
    return s+`<line x1="200" y1="10" x2="200" y2="48" stroke="#EA580C" stroke-width="2.5"/><line x1="200" y1="72" x2="200" y2="88" stroke="#EA580C" stroke-width="2.5"/><text x="32" y="80" font-size="12" font-weight="800" text-anchor="start" fill="#78350F" direction="ltr">cm</text><text x="200" y="114" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏تدريج المسار المدرج عند مؤشر قاعدة المقياس (مكبر)‏</text>`};
  let Q,NZ=[1,1],ok={};const EV=(r,i)=>Math.round(K*Q/(r/100)**2*(i==null?1:NZ[i])/10)*10,EE=()=>RS_.map((r,i)=>EV(r,i));
  const QC=()=>EE()[0]*(RS_[0]/100)**2/K*1e9;
  function newObj(){Q=(80+Math.floor(Math.random()*81))/10*1e-9;NZ=[1,0.975+Math.random()*0.05];ok={};
    RS_.forEach((r,i)=>{$('eR'+i).value=0;['ed','ee'].forEach(p=>{$(p+i).value='';fb0(p+i+'Fb')});eDraw(i)});['ER','EQ'].forEach(k=>{$('c'+k).value='';fb0('c'+k+'f')});sub();results()}
  function eDraw(i){const v=+$('eR'+i).value,to=RS_[i],r=Math.round((RMAX-(RMAX-to)*v/100)*10)/10,at=v>=100,e=String(EV(r,i));
    $('eO'+i).textContent='';
    $('eSt'+i).textContent=at?'✓ وصل المجس إلى المسافة المطلوبة، اقرأ المسار المدرج ثم مقياس المجال':'كلما اقترب المجس من الكرة زادت شدة المجال';
    $('eS'+i).innerHTML=efScene({r,e});$('eM'+i).innerHTML=mmZ(r);
    $('eZ'+i).innerHTML=zoom(scr(80,240,`${e} N/C`),'‏شاشة مقياس شدة المجال الكهربائي (مكبرة)‏')}
  function sub(){const e=EE();
    $('sbER').textContent=ok.e0&&ok.e1?['E₁ / E₂',E(`E₁ / E₂ = ${e[0]} / ${e[1]}`)].join('\n'):'E₁ / E₂';
    $('sbEQ').textContent=ok.e0?['q = E₁·r₁² / k',E(`q = ${e[0]} × 0.1² / (9 × 10⁹)`)].join('\n'):'q = E₁·r₁² / k'}
  function chart(){const e=EE();if(!(ok.e0&&ok.e1)){$('efC').innerHTML='';return}
    const pts=RS_.map((r,i)=>[1/(r/100)**2,e[i]]),xm=120,ym=Math.ceil(pts[0][1]/4000+0.25)*4000,X0=56,Yb=232,W=290,H=196,X=x=>X0+x/xm*W,Y=y=>Yb-y/ym*H;let s='';
    for(let x=0;x<=xm;x+=20)s+=`<line x1="${X(x)}" y1="${Yb}" x2="${X(x)}" y2="${Yb-H}" stroke="var(--line)"/><text x="${X(x)}" y="${Yb+16}" font-size="11" text-anchor="middle" fill="var(--ink)">${x}</text>`;
    for(let k=0;k<=4;k++){const y=ym/4*k;s+=`<line x1="${X0}" y1="${Y(y)}" x2="${X0+W}" y2="${Y(y)}" stroke="var(--line)"/><text x="${X0-6}" y="${Y(y)+4}" font-size="11" text-anchor="end" fill="var(--ink)">${fx(y,0)}</text>`}
    s+=`<line x1="${X0}" y1="${Yb}" x2="${X0+W+8}" y2="${Yb}" stroke="var(--ink)" stroke-width="1.6"/><line x1="${X0}" y1="${Yb}" x2="${X0}" y2="${Yb-H-8}" stroke="var(--ink)" stroke-width="1.6"/>`;
    s+=`<text x="${X0+W}" y="${Yb+34}" font-size="13" font-weight="700" text-anchor="end" fill="var(--ink)">1/r² (1/m²)</text><text x="${X0+4}" y="${Yb-H-12}" font-size="13" font-weight="700" fill="var(--ink)">E (N/C)</text>`;
    const sl=pts[0][1]/pts[0][0];s+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(xm)}" y2="${Y(sl*xm)}" stroke="#F7931E" stroke-width="3"/>`;
    pts.forEach(([x,y],i)=>{s+=`<circle cx="${X(x)}" cy="${Y(y)}" r="5.5" fill="#7E22CE" stroke="#fff" stroke-width="2"/><text x="${X(x)+8}" y="${Y(y)+16}" font-size="11" font-weight="700" fill="#6B21A8" direction="ltr">${RS_[i]} cm</text>`});
    $('efC').innerHTML=`<div class="stage"><svg viewBox="0 0 380 280" style="direction:ltr;display:block;width:100%;height:auto" aria-label="شدة المجال مقابل مقلوب مربع المسافة">${s}</svg></div><div class="vcap">النقطتان على خط مستقيم يمر بنقطة الأصل، أي أن E تتناسب طرديا مع 1/r²</div>`}
  function results(){const e=EE();
    RS_.forEach((r,i)=>$('er'+i).textContent=ok['e'+i]?E(e[i]+' N/C'):'—');
    $('er2').textContent=ok.cER?E(`${fx(e[0]/e[1],2)} ≈ 4`):'—';
    $('er3').textContent=ok.cEQ?E(fx(QC(),1)+' nC'):'—';
    chart();
    $('eNote').innerHTML=ok.cER&&ok.cEQ?'الاستنتاج: عند مضاعفة المسافة من <span dir="ltr">10 cm</span> إلى <span dir="ltr">20 cm</span> قلت شدة المجال إلى الربع تقريبا، فشدة المجال الكهربائي حول الشحنة النقطية تتناسب عكسيا مع مربع المسافة <span dir="ltr" style="white-space:nowrap">E = k·q / r²</span>، ومنه حسبنا شحنة الكرة.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  RS_.forEach((r,i)=>{$('eR'+i).oninput=()=>eDraw(i);
    $('ed'+i+'Ck').onclick=()=>{const f='ed'+i+'Fb';if(+$('eR'+i).value<100)return fb(f,false,`حرك مقياس المجال حتى يصل المجس إلى ${r} cm أولا.`);const v=num($('ed'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة المسار المدرج بالسنتيمتر.');
      if(Math.abs(v-r)<0.05){ok['d'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`r${'₁₂'[i]} = ${r.toFixed(1)} cm`))}else fb(f,false,'✗ اقرأ الرقم الكبير قبل الخط البرتقالي، ثم عد أقسام المليمتر الصغيرة حتى الخط.')};
    $('ee'+i+'Ck').onclick=()=>{const f='ee'+i+'Fb';if(+$('eR'+i).value<100)return fb(f,false,`حرك مقياس المجال حتى يصل المجس إلى ${r} cm أولا.`);const v=num($('ee'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة المقياس بوحدة N/C.');
      const val=EE()[i];if(Math.abs(v-val)<0.5){ok['e'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`E${'₁₂'[i]} = ${val} N/C`))}else fb(f,false,'✗ اكتب الرقم الظاهر على شاشة مقياس المجال كما هو.');sub();results()}});
  const chk=(id,need,needMsg,val,tol,okMsg,badMsg)=>{const f='c'+id+'f';if(!need())return fb(f,false,needMsg);const v=num($('c'+id).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بالأرقام.');
    if(Math.abs(v-val)/Math.abs(val)<=tol){ok['c'+id]=true;fb(f,true,okMsg())}else fb(f,false,badMsg());sub();results()};
  $('cERk').onclick=()=>chk('ER',()=>ok.e0&&ok.e1,'أكمل القراءتين (أ) و (ب) أولا.',EE()[0]/EE()[1],.02,()=>'✓ إجابة صحيحة:\n'+E(`E₁ / E₂ = ${EE()[0]} / ${EE()[1]} = ${fx(EE()[0]/EE()[1],2)}`)+'\n'+E(`(r₂ / r₁)² = (20 / 10)² = 4`)+'\nالقيمتان متساويتان تقريبا: عند مضاعفة المسافة يقل المجال إلى الربع.',()=>'✗ اقسم قراءة المقياس الأولى على الثانية:\n'+E(`E₁ / E₂ = ${EE()[0]} / ${EE()[1]}`));
  /* قبول الناتج بأي وحدة للشحنة (C أو mC أو µC أو pC) والتعرف عليها من مقداره، ثم تحويله إلى nC */
  {const inp=$('cEQ');const orig=()=>{const v=num(inp.value);if(isNaN(v)||!(ok.e0))return false;const U=[['C',1e-9,'الضرب في 10⁹'],['mC',1e-6,'الضرب في 10⁶'],['µC',1e-3,'الضرب في 1000'],['pC',1e3,'القسمة على 1000']].find(([u,f])=>Math.abs(v-QC()*f)/(QC()*f)<=.02);if(!U)return false;ok['cEQ']=true;fb('cEQf',true,'✓ إجابة صحيحة بوحدة '+U[0]+':\n'+E(`q = ${inp.value.trim()} ${U[0]}`)+'\nوبالتحويل إلى nC ('+U[2]+'):\n'+E(`q = ${fx(QC(),1)} nC`));sub();results();return true};
   $('cEQk').addEventListener('click',e=>{if(orig())e.stopImmediatePropagation()},true)}
  $('cEQk').onclick=()=>chk('EQ',()=>ok.e0,'أكمل القراءة (أ) أولا.',QC(),.02,()=>'✓ إجابة صحيحة:\n'+E(`q = ${EE()[0]} × 0.01 / (9 × 10⁹)`)+'\n'+E(`q = ${fx(QC(),1)} × 10⁻⁹ C = ${fx(QC(),1)} nC`),()=>'✗ اضرب E₁ في مربع المسافة بالمتر، ثم اقسم على k، ثم اضرب في 10⁹:\n'+E(`${EE()[0]} × 0.01 / (9 × 10⁹) = ${(EE()[0]*0.01/K).toExponential(3)} C`));
  $('nw').onclick=newObj;
  function fitL(){box.querySelectorAll('.law .ln > span, h4.sbh').forEach(e=>{if(!e.offsetWidth)return;e.style.fontSize='';if(e.dataset.pl==null)e.dataset.pl=/pre-line/.test(e.getAttribute('style')||'')?'1':'';const pre=e.dataset.pl==='1';e.style.whiteSpace=pre?'pre':'nowrap';e.style.display='block';e.style.overflow='hidden';
    let f=parseFloat(getComputedStyle(e).fontSize),k=0;while(e.scrollWidth>e.clientWidth+1&&f>9&&k++<80){f-=0.5;e.style.fontSize=f+'px'}});const hs=[...box.querySelectorAll('h4.sbh')].filter(e=>e.offsetWidth);if(hs.some(e=>e.style.fontSize)){const m=Math.min(...hs.map(e=>parseFloat(getComputedStyle(e).fontSize)));hs.forEach(e=>e.style.fontSize=m+'px')}}
  const qf=()=>requestAnimationFrame(fitL);addEventListener('resize',qf);new MutationObserver(qf).observe(box,{childList:true,subtree:true,characterData:true});
  calcInit(box);newObj();qf();
}

function pdScene(o){/* الرسم المعتمد (b.png) — o:{x (cm من القطب السالب), pd (عمق المجس), v (قراءة الفولتميتر), v0 (جهد المصدر), lab} */
  o=o||{};const B=330,S=(x,d,z)=>[x+d*0.6,B-z-d*0.5],F=n=>(+n).toFixed(1),P=(...a)=>a.map(p=>F(p[0])+','+F(p[1])).join(' ');
  const box=(x0,x1,d0,d1,z0,z1,top,front,side,st)=>{st=st||'#334155';return `<polygon points="${P(S(x0,d0,z0),S(x1,d0,z0),S(x1,d0,z1),S(x0,d0,z1))}" fill="${front}" stroke="${st}"/><polygon points="${P(S(x1,d0,z0),S(x1,d1,z0),S(x1,d1,z1),S(x1,d0,z1))}" fill="${side}" stroke="${st}"/><polygon points="${P(S(x0,d0,z1),S(x1,d0,z1),S(x1,d1,z1),S(x0,d1,z1))}" fill="${top}" stroke="${st}"/>`};
  const line=(a,b,c,w,ex)=>`<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="${c||'#334155'}" stroke-width="${w||1.2}" ${ex||''}/>`;
  const wire=(pts,c,w)=>`<polyline points="${P(...pts)}" fill="none" stroke="${c}" stroke-width="${w||2.8}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const curve=(pts,c,w)=>{let d=`M${F(pts[0][0])},${F(pts[0][1])}`;for(let i=1;i<pts.length-1;i+=2)d+=` Q${F(pts[i][0])},${F(pts[i][1])} ${F(pts[i+1][0])},${F(pts[i+1][1])}`;return `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w||2.8}" stroke-linecap="round"/>`};
  const lbl=(t,x,y,anc,col,sz)=>`<text x="${F(x)}" y="${F(y)}" text-anchor="${anc||'middle'}" font-size="${sz||15}" font-weight="700" fill="${col||'var(--ink)'}" style="paint-order:stroke;stroke:var(--panel);stroke-width:3.5px">${t}</text>`;
  const dot=(p,c,r)=>`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="${r||3.5}" fill="${c}" stroke="#1F2937" stroke-width="0.8"/>`;
  const XL=90,XR=290,x=o.x==null?5:o.x,PX=XL+x*20,PD=o.pd==null?55:o.pd;
  let g=`<defs><marker id="pdAr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#FDE68A"/></marker></defs>`;
  /* مصدر الجهد المستمر */
  const SX0=-150,SX1=-40,SD0=300,SD1=340;g+=box(SX0,SX1,SD0,SD1,0,50,'#CBD5E1','#475569','#334155');
  const pt=S(-125,SD0,32),pr=S(-65,SD0,32),pdp=S(-118,SD0,14);
  g+=`<rect x="${F(pdp[0])}" y="${F(pdp[1]-10)}" width="40" height="13" fill="#0F172A"/><text x="${F(pdp[0]+20)}" y="${F(pdp[1]+1)}" font-size="10" font-weight="700" fill="#22C55E" text-anchor="middle" direction="ltr">${o.v0||'10.0'} V</text>`;
  g+=`<text x="${F(pt[0])}" y="${F(pt[1]-8)}" font-size="12" font-weight="700" text-anchor="middle" fill="#fff">−</text><text x="${F(pr[0])}" y="${F(pr[1]-8)}" font-size="12" font-weight="700" text-anchor="middle" fill="#fff">+</text>`;
  const eL=S(XL,150,10.5),eR=S(XR,150,10.5);
  g+=wire([pt,S(-125,SD0,0),S(-125,255,0),S(40,255,0),S(XL,175,10)],'#2563EB')+wire([pr,S(-65,SD0,0),S(-65,275,0),S(XR,275,0),S(XR,175,10)],'#DC2626');
  /* اللوحة والورقة الموصلة */
  g+=box(40,340,0,170,0,10,'#E5E7EB','#D6B48A','#C49A6C');
  g+=`<polygon points="${P(S(55,12,10.2),S(325,12,10.2),S(325,158,10.2),S(55,158,10.2))}" fill="#52525B" stroke="#18181B"/>`;
  for(let gx=70;gx<320;gx+=20)for(let gd=25;gd<155;gd+=20){const p=S(gx,gd,10.3);g+=`<circle cx="${F(p[0])}" cy="${F(p[1])}" r="0.8" fill="#71717A"/>`}
  [130,170,210,250].forEach(ex=>{if(Math.abs(ex-PX)>1)g+=line(S(ex,22,10.4),S(ex,148,10.4),'#A1A1AA',0.9,'stroke-dasharray="4 3"')});
  g+=line(S(PX,22,10.4),S(PX,148,10.4),'#F7931E',1.6,'stroke-dasharray="5 3"');
  [[XL,'#2563EB'],[XR,'#DC2626']].forEach(([ex,c])=>{g+=`<polygon points="${P(S(ex-4,20,10.5),S(ex+4,20,10.5),S(ex+4,150,10.5),S(ex-4,150,10.5))}" fill="#E5E7EB" stroke="${c}" stroke-width="2.2"/>`});
  /* المسطرة المليمترية */
  g+=`<polygon points="${P(S(80,-14,10),S(310,-14,10),S(310,2,10),S(80,2,10))}" fill="#FEF3C7" stroke="#B45309"/><polygon points="${P(S(80,-14,10),S(310,-14,10),S(310,-14,6),S(80,-14,6))}" fill="#FCD34D" stroke="#B45309"/>`;
  for(let i=0;i<=100;i++){const X=XL+i*2,L=i%10===0?8:i%5===0?5:3;g+=line(S(X,2,10),S(X,2-L,10),'#78350F',i%10?0.6:1);
    if(i%20===0){const p=S(X,-11,10);g+=`<text x="${F(p[0])}" y="${F(p[1]+3)}" font-size="9" font-weight="700" text-anchor="middle" fill="#78350F">${i/10}</text>`}}
  g+=wire([S(XL,175,10),S(XL,170,10.5),eL],'#2563EB')+wire([S(XR,175,10),S(XR,170,10.5),eR],'#DC2626')+dot(pt,'#111827',4.5)+dot(pr,'#DC2626',4.5)+dot(eL,'#94A3B8')+dot(eR,'#94A3B8');
  /* جهاز الفولتميتر الرقمي */
  const VX=455;g+=box(VX,VX+75,0,42,0,80,'#E2E8F0','#F59E0B','#D97706');
  const v0=S(VX+8,0,48);g+=`<rect x="${F(v0[0])}" y="${F(v0[1]-23)}" width="59" height="23" fill="#0F172A" rx="2"/><text x="${F(v0[0]+29.5)}" y="${F(v0[1]-6)}" font-size="15" font-weight="700" fill="#22C55E" text-anchor="middle" font-family="monospace" direction="ltr">${o.v||'4.00'} V</text>`;
  const jc=S(VX+18,0,18),jv=S(VX+57,0,18);
  g+=`<text x="${F(jc[0])}" y="${F(jc[1]+13)}" font-size="9" font-weight="700" text-anchor="middle" fill="#111827">COM</text><text x="${F(jv[0])}" y="${F(jv[1]+13)}" font-size="9" font-weight="700" text-anchor="middle" fill="#111827">V</text>`;
  const eLf=S(XL,20,10.5);g+=wire([jc,S(VX+18,0,0),S(VX+18,-34,0),S(60,-34,0),S(60,-34,10),S(60,20,10),eLf],'#2563EB',2.6)+dot(jc,'#111827',4)+dot(eLf,'#94A3B8');
  /* المجس */
  const tip=S(PX,PD,10.5),dx=14,dy=-70,Ln=Math.hypot(dx,dy),ux=dx/Ln,uy=dy/Ln,nx=-uy,ny=ux,A=(t,w)=>[tip[0]+ux*t+nx*w,tip[1]+uy*t+ny*w];
  const seg=(t0,w0,t1,w1,f,st)=>`<polygon points="${P(A(t0,-w0),A(t1,-w1),A(t1,w1),A(t0,w0))}" fill="${f}" stroke="${st||'#1F2937'}" stroke-width="0.8" stroke-linejoin="round"/>`;
  g+=seg(0,0.5,18,1.6,'#E5E7EB','#475569')+seg(18,2.6,25,5.5,'#F7931E')+seg(25,9.5,29,9.5,'#C2410C')+seg(29,5.5,66,6,'#F7931E');
  for(let t=34;t<64;t+=6)g+=line(A(t,-5.5),A(t,5.5),'#C2410C',1);
  g+=seg(66,4.5,77,2.2,'#7C2D12');const top=A(77,0);g+=dot(tip,'#F7931E',2.2);
  g+=curve([top,[Math.max(300,top[0]+40),214],[330,252],[345,282],[400,292],[482,286],jv],'#DC2626',2.6)+dot(jv,'#DC2626',4);
  /* المسافة d */
  {const a=S(XL,26,10.6),b=S(PX,26,10.6);g+=`<line x1="${F(a[0])}" y1="${F(a[1])}" x2="${F(b[0])}" y2="${F(b[1])}" stroke="#FDE68A" stroke-width="1.6" marker-start="url(#pdAr)" marker-end="url(#pdAr)"/><text x="${F((a[0]+b[0])/2)}" y="${F((a[1]+b[1])/2-5)}" font-size="15" font-weight="700" fill="#FDE68A" text-anchor="middle" font-style="italic">d</text>`}
  let H=305;
  if(o.lab){let q=S((SX0+SX1)/2,SD1,50);g+=lbl('مصدر جهد مستمر',q[0],q[1]-10);
    q=S(VX+37,42,80);g+=lbl('جهاز الفولتميتر الرقمي',q[0]+6,q[1]-12);
    q=S(XL,150,10.5);g+=lbl('القطب السالب (−)',q[0]-12,q[1]-6,'end','#2563EB');
    q=S(XR,150,10.5);g+=lbl('القطب الموجب (+)',q[0]+50,q[1]-38,'end','#DC2626',14);
    g+=lbl('المجس',top[0],top[1]-8,'middle','#C2410C');
    q=S(PX,118,10.4);g+=lbl('خط تساوي جهد',q[0]+6,q[1]+4,'start','#C2410C',12);
    q=S(80,-14,6);g+=lbl('مسطرة مليمترية',q[0]-24,q[1]-2,'end','#92400E');
    q=S(40,75,5);g+=lbl('ورقة موصلة',q[0]-10,q[1]+4,'end')+line([q[0]-6,q[1]],S(62,75,10.3),'var(--ink)',1);
    const steps=['① مصدر الجهد المستمر يعطي 10 V بين القطبين، فينشأ بينهما مجال كهربائي منتظم.','② مسبار COM لجهاز الفولتميتر متصل بالقطب السالب (نقطة الصفر للجهد).','③ يضع المتدرب المجس عند نقطة، ويقرأ بعدها d عن القطب السالب على المسطرة المليمترية.','④ يقرأ الجهد V عند النقطة نفسها، ثم يكرر عند نقطة ثانية (كل قراءة خطوة مستقلة).','⑤ يحسب شدة المجال E = ΔV / d عند كل نقطة، ويتحقق أنها ثابتة.','⑥ يحرك المجس على الخط البرتقالي فتبقى القراءة ثابتة، وهذا خط تساوي جهد.'];
    const py=390;g+=`<rect x="-180" y="${py}" width="770" height="${30+steps.length*24}" rx="10" fill="#FFF7ED" stroke="#F7931E" stroke-width="1.5"/><text x="575" y="${py+22}" font-size="15" font-weight="800" text-anchor="start" direction="rtl" fill="#C2410C">خطوات التجربة</text>`;
    steps.forEach((t,i)=>{g+=`<text x="575" y="${py+48+i*24}" font-size="13.5" font-weight="600" text-anchor="start" fill="#0F172A" direction="rtl">${t}</text>`});H=py+30+steps.length*24+10-80}
  return `<svg viewBox="-190 80 790 ${H}" aria-label="ورقة موصلة عليها قطبان متوازيان موصلان بمصدر جهد مستمر، وجهاز الفولتميتر الرقمي ومجسه على مسافة d من القطب السالب، ومسطرة مليمترية">${g}</svg>`}

function pdLab(box){
  const DX=[3,7],D0=10;
  box.innerHTML=`
  <div class="intro"><small class="labKind">🧪 تجربة عملية تفاعلية</small><h3>1. اسم التجربة</h3><p class="labName">قياس فرق الجهد في مجال كهربائي منتظم</p></div>
  <div class="tags"><span class="tag">المسافة d: <i>المسطرة المليمترية</i> · cm</span><span class="tag">الجهد V: <i>جهاز الفولتميتر الرقمي</i> · V</span><span class="tag dv">شدة المجال E: <i>محسوبة</i> · N/C</span></div>
  <div class="intro goals"><h3>2. أهداف التجربة</h3><ol class="gl">
    <li>التعرف على الورقة الموصلة والقطبين المتوازيين ومصدر الجهد المستمر وجهاز الفولتميتر الرقمي.</li>
    <li>قياس الجهد عند نقطتين بين القطبين بجهاز الفولتميتر الرقمي، وقياس بعد كل نقطة عن القطب السالب بالمسطرة المليمترية.</li>
    <li>حساب شدة المجال الكهربائي من العلاقة <span dir="ltr">ΔV = E·d</span>، والتحقق من أنها ثابتة بين القطبين (مجال منتظم).</li>
    <li>تحديد خط تساوي جهد بتحريك المجس على خط مواز للقطبين.</li></ol></div>
  <div class="intro"><h3>3. الأدوات والأجهزة المستخدمة</h3>
    <div class="tool"><div class="stage">${pdScene({lab:true,x:5,pd:55,v:'4.00',v0:'10.0'})}</div><div class="vcap">الورقة الموصلة والقطبان ومصدر الجهد المستمر وجهاز الفولتميتر الرقمي: منظر ثلاثي الأبعاد</div>
    <p><b>ترتيب الأجهزة:</b> قطبان معدنيان متوازيان على ورقة موصلة، المسافة بينهما <span dir="ltr">10 cm</span>، وموصلان بمصدر جهد مستمر: القطب السالب بالسلك الأزرق والقطب الموجب بالسلك الأحمر. ومسبار <span dir="ltr">COM</span> لجهاز الفولتميتر الرقمي متصل بالقطب السالب، والمجس يحركه المتدرب على الورقة. والمسطرة المليمترية أمام اللوحة وصفرها عند القطب السالب.</p></div>
    <p><b>الورقة الموصلة:</b> ورقة سوداء مطلية بطبقة كربون موصلة ضعيفة، يمر فيها تيار صغير بين القطبين، فيتوزع الجهد عليها بانتظام.</p>
    <p><b>القطبان المتوازيان:</b> شريطان معدنيان مرسومان بحبر فضي موصل على الورقة، ويتولد بينهما مجال كهربائي منتظم يتجه من القطب الموجب إلى القطب السالب.</p>
    <p><b>مصدر الجهد المستمر <span dir="ltr">(DC Power Supply)</span>:</b> يعطي فرق جهد ثابتا بين القطبين، وتظهر قيمته على شاشته بالفولت.</p>
    <p><b>جهاز الفولتميتر الرقمي <span dir="ltr">(Digital Voltmeter)</span>:</b> يقيس فرق الجهد بين مسبار <span dir="ltr">COM</span> والمجس، ويعرضه بالفولت بدقة <span dir="ltr">0.01 V</span>. ولأن <span dir="ltr">COM</span> متصل بالقطب السالب فإن القراءة هي جهد النقطة التي يلمسها المجس.</p>
    <p><b>المجس:</b> إبرة معدنية بمقبض عازل، يلمس بها المتدرب النقطة المراد قياس جهدها.</p>
    <p><b>المسطرة المليمترية:</b> مقسمة كل <span dir="ltr">1 mm</span>، ويقرأ المؤشر البرتقالي عليها بعد طرف المجس <span dir="ltr">d</span> عن القطب السالب بدقة <span dir="ltr">0.1 cm</span>.</p></div>
  <h3 class="secH">4. القوانين المستخدمة</h3>
  <div class="ctl">
    <div class="law ftl"><div class="ln lw"><b>فرق الجهد في المجال المنتظم</b><span>ΔV = E·d</span></div>
      <div class="ln lw"><b>ومنه شدة المجال المنتظم</b><span>E = ΔV / d</span></div>
      <div class="ln lw"><b>فرق الجهد بين النقطتين</b><span>ΔV = V₂ − V₁</span></div>
      <div class="vfig">${(window.FIGS||{}).vUniform||''}</div>
      <div class="sym"><b>حيث:</b><ul>
      <li><span class="chip" dir="ltr">ΔV</span> فرق الجهد بين نقطتين، ووحدته <span dir="ltr">V</span></li>
      <li><span class="chip" dir="ltr">E</span> شدة المجال الكهربائي المنتظم، ووحدتها <span dir="ltr">N/C</span> (وتكافئ <span dir="ltr">V/m</span>)</li>
      <li><span class="chip" dir="ltr">d</span> المسافة باتجاه خطوط المجال، ووحدتها <span dir="ltr">m</span>، و <span dir="ltr">1 cm = 0.01 m</span></li>
      <li><span class="chip" dir="ltr">V₁</span> و <span class="chip" dir="ltr">V₂</span> قراءتا الفولتميتر عند النقطتين، ووحدتهما <span dir="ltr">V</span></li>
      </ul></div>
      <p class="slh">ℹ️ مسبار <span dir="ltr">COM</span> على القطب السالب، فجهد القطب السالب صفر، وقراءة الفولتميتر عند نقطة هي فرق الجهد بينها وبين القطب السالب.</p></div></div>
  <h3 class="secH">5. تنفيذ التجربة</h3>
  <div class="startBand">▶️ لنبدأ التجربة</div>
  <div class="btns" style="margin-bottom:12px"><button type="button" class="rs" id="nw">🔄 جهد جديد للمصدر</button></div>
  <div class="ctl"><h3>5.1 القياس</h3>
    ${DX.map((d,i)=>`<h4 class="sbh">${'أب'[i]}) قراءة الجهد عند المسافة <bdi dir="ltr">d${'₁₂'[i]} = ${d} cm</bdi></h4>
    <div class="stage"><div id="pS${i}"></div><svg id="pM${i}" viewBox="0 0 400 120"></svg><svg id="pZ${i}" viewBox="0 0 400 112"></svg><div class="hud"><span id="pSt${i}"></span></div></div>
    <div class="row"><label for="pR${i}">تحريك المجس</label><output id="pO${i}"></output><input id="pR${i}" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك المجس على الورقة حتى يقع مؤشره على التدريج <bdi dir="ltr">${d}.0 cm</bdi> في التكبير، ثم اقرأ المسافة والجهد.</p>
    <div class="ans"><label>قراءة المسطرة <bdi dir="ltr">d${'₁₂'[i]}</bdi></label><input id="pd${i}" inputmode="decimal" dir="ltr" placeholder="cm"><button type="button" class="go" id="pd${i}Ck">تحقق</button></div><div class="fb2" id="pd${i}Fb"></div>
    <div class="ans"><label>قراءة الفولتميتر <bdi dir="ltr">V${'₁₂'[i]}</bdi> عند <bdi dir="ltr" style="white-space:nowrap">d = ${d} cm</bdi></label><input id="pv${i}" inputmode="decimal" dir="ltr" placeholder="V"><button type="button" class="go" id="pv${i}Ck">تحقق</button></div><div class="fb2" id="pv${i}Fb"></div>`).join('')}
    <h4 class="sbh">ج) تحديد خط تساوي الجهد عند <bdi dir="ltr">d₂ = ${DX[1]} cm</bdi></h4>
    <div class="stage"><div id="pS2"></div><svg id="pZ2" viewBox="0 0 400 112"></svg><div class="hud"><span id="pSt2"></span></div></div>
    <div class="row"><label for="pR2">تحريك المجس على الخط البرتقالي</label><output id="pO2"></output><input id="pR2" type="range" min="0" max="100" step="1" value="0"></div>
    <p class="slh">👆 اسحب المؤشر البرتقالي لتحريك المجس على الخط البرتقالي الموازي للقطبين (المسافة ثابتة <bdi dir="ltr">${DX[1]} cm</bdi>) حتى نهايته، ثم اقرأ الفولتميتر.</p>
    <div class="ans"><label>قراءة الفولتميتر <bdi dir="ltr">V₃</bdi> عند النقطة الجديدة</label><input id="pv2" inputmode="decimal" dir="ltr" placeholder="V"><button type="button" class="go" id="pv2Ck">تحقق</button></div><div class="fb2" id="pv2Fb"></div>
  </div>
  <div class="ctl"><h3>5.2 الحسابات</h3>
    <p class="slh">ℹ️ حول المسافة من <bdi dir="ltr">cm</bdi> إلى <bdi dir="ltr">m</bdi> بالقسمة على 100.</p>
    <h4 class="sbh">أ) حساب شدة المجال عند النقطة الأولى</h4>
    ${hxCalcStep('P1','E₁ = V₁ / d₁','احسب E₁ بوحدة N/C','N/C')}
    <h4 class="sbh">ب) حساب شدة المجال عند النقطة الثانية</h4>
    ${hxCalcStep('P2','E₂ = V₂ / d₂','احسب E₂ بوحدة N/C','N/C')}
    <h4 class="sbh">ج) حساب فرق الجهد بين النقطتين</h4>
    ${hxCalcStep('PV','ΔV = V₂ − V₁','احسب ΔV بوحدة V','V')}
    <h4 class="sbh">د) حساب شدة المجال من فرق الجهد</h4>
    ${hxCalcStep('PE','E = ΔV / d','احسب E بوحدة N/C','N/C')}
  </div>
  <div class="ctl res"><h3>6. نتائج التجربة</h3>
    <div class="tw"><table class="rt"><thead><tr><th>الكمية</th><th>القيمة</th></tr></thead>
    <tbody><tr><td>الجهد <bdi dir="ltr">V₁</bdi> عند <bdi dir="ltr" style="white-space:nowrap">${DX[0]} cm</bdi></td><td id="pt0">—</td></tr>
    <tr><td>الجهد <bdi dir="ltr">V₂</bdi> عند <bdi dir="ltr" style="white-space:nowrap">${DX[1]} cm</bdi></td><td id="pt1">—</td></tr>
    <tr><td>الجهد <bdi dir="ltr">V₃</bdi> على خط تساوي الجهد</td><td id="pt2">—</td></tr>
    <tr><td>شدة المجال <bdi dir="ltr">E₁</bdi> و <bdi dir="ltr">E₂</bdi></td><td id="pt3">—</td></tr>
    <tr><td>فرق الجهد <bdi dir="ltr">ΔV</bdi> وشدة المجال <bdi dir="ltr">E</bdi></td><td id="pt4">—</td></tr></tbody></table></div>
    <p class="rn" id="pNote">تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.</p></div>`;
  const $=id=>box.querySelector('#'+id);
  const num=labNum;
  const fb=(id,ok,msg)=>{$(id).textContent=msg;$(id).className='fb2 '+(ok?'ok':'no')};
  const fb0=id=>{$(id).textContent='';$(id).className='fb2'};
  const fx=(x,n)=>String(+(+x).toFixed(n));
  const zoom=(lines,cap)=>`<rect x="20" y="4" width="360" height="86" rx="14" fill="#334155" stroke="#0F172A" stroke-width="2"/>`+lines+`<text x="200" y="106" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">${cap}</text>`;
  const scr=(x,w,txt)=>`<rect x="${x}" y="16" width="${w}" height="62" rx="8" fill="#0F172A" stroke="#14532D"/><text x="${x+w/2}" y="57" font-size="26" font-weight="800" text-anchor="middle" fill="#22C55E" direction="ltr" font-family="Consolas,monospace">${txt}</text>`;
  const mmZ=r=>{let s=`<rect x="10" y="4" width="380" height="94" rx="12" fill="#334155" stroke="#0F172A" stroke-width="2"/><rect x="24" y="14" width="352" height="70" rx="4" fill="#FEF3C7"/>`;const X=v=>200+(v-r)*160;
    for(let n=Math.ceil((r-1.2)*10);n<=Math.floor((r+1.2)*10);n++){const v=n/10,x=X(v);if(x<26||x>374||v<0||v>10)continue;const big=n%10===0,hf=n%5===0;s+=`<line x1="${x}" y1="14" x2="${x}" y2="${14+(big?30:hf?22:14)}" stroke="#78350F" stroke-width="${big?2:1.2}"/>`+(big?`<text x="${x}" y="66" font-size="16" font-weight="800" text-anchor="middle" fill="#78350F" direction="ltr">${Math.round(v)}</text>`:'')}
    return s+`<line x1="200" y1="10" x2="200" y2="48" stroke="#EA580C" stroke-width="2.5"/><line x1="200" y1="72" x2="200" y2="88" stroke="#EA580C" stroke-width="2.5"/><text x="32" y="80" font-size="12" font-weight="800" text-anchor="start" fill="#78350F" direction="ltr">cm</text><text x="200" y="114" font-size="12" font-weight="700" text-anchor="middle" fill="var(--muted)">‏تدريج المسطرة المليمترية عند مؤشر المجس (مكبر)‏</text>`};
  let V0=10,NZ=[1,1],ok={};
  const VA=(d,i)=>Math.round(V0*d/D0*(i==null?1:NZ[i])*100)/100,VV=()=>DX.map((d,i)=>VA(d,i));
  const E1=()=>VV()[0]/(DX[0]/100),E2=()=>VV()[1]/(DX[1]/100),DV=()=>Math.round((VV()[1]-VV()[0])*100)/100,EE=()=>DV()/((DX[1]-DX[0])/100);
  const PD0=55,PD1=22;
  function pDraw(i){const v=+$('pR'+i).value;let x,pd,at=v>=100,vv;
    if(i<2){const to=DX[i];x=Math.round((0.5+(to-0.5)*v/100)*10)/10;pd=PD0;vv=at?VA(to,i):VA(x)}
    else{x=DX[1];pd=PD0+(PD1-PD0)*v/100;vv=VA(DX[1],1)}
    const t=vv.toFixed(2);$('pO'+i).textContent='';
    $('pS'+i).innerHTML=pdScene({x,pd,v:t,v0:V0.toFixed(1)});
    if(i<2){$('pM'+i).innerHTML=mmZ(x);$('pSt'+i).textContent=at?'✓ وصل المجس إلى المسافة المطلوبة، اقرأ المسطرة ثم الفولتميتر':'كلما اقترب المجس من القطب الموجب زادت قراءة الجهد'}
    else $('pSt2').textContent=at?'✓ المجس في نقطة جديدة على الخط نفسه، اقرأ الفولتميتر':'لاحظ قراءة الفولتميتر أثناء تحريك المجس على الخط البرتقالي';
    $('pZ'+i).innerHTML=zoom(scr(90,220,`${t} V`),'‏شاشة جهاز الفولتميتر الرقمي (مكبرة)‏')}
  function newObj(){V0=(12+Math.floor(Math.random()*13))/2;NZ=[0.99+Math.random()*0.02,0.99+Math.random()*0.02];ok={};
    [0,1,2].forEach(i=>{$('pR'+i).value=0;pDraw(i)});['pd0','pd1','pv0','pv1','pv2'].forEach(p=>{$(p).value='';fb0(p+'Fb')});['P1','P2','PV','PE'].forEach(k=>{$('c'+k).value='';fb0('c'+k+'f')});sub();results()}
  function sub(){const v=VV();
    $('sbP1').textContent=ok.v0?['E₁ = V₁ / d₁',E(`E₁ = ${v[0].toFixed(2)} / ${fx(DX[0]/100,2)}`)].join('\n'):'E₁ = V₁ / d₁';
    $('sbP2').textContent=ok.v1?['E₂ = V₂ / d₂',E(`E₂ = ${v[1].toFixed(2)} / ${fx(DX[1]/100,2)}`)].join('\n'):'E₂ = V₂ / d₂';
    $('sbPV').textContent=ok.v0&&ok.v1?['ΔV = V₂ − V₁',E(`ΔV = ${v[1].toFixed(2)} − ${v[0].toFixed(2)}`)].join('\n'):'ΔV = V₂ − V₁';
    $('sbPE').textContent=ok.cPV?['E = ΔV / d',E(`E = ${DV().toFixed(2)} / ${fx((DX[1]-DX[0])/100,2)}`)].join('\n'):'E = ΔV / d'}
  function results(){const v=VV();
    $('pt0').textContent=ok.v0?E(v[0].toFixed(2)+' V'):'—';$('pt1').textContent=ok.v1?E(v[1].toFixed(2)+' V'):'—';
    $('pt2').textContent=ok.v2?E(v[1].toFixed(2)+' V = V₂'):'—';
    $('pt3').textContent=ok.cP1&&ok.cP2?E(`${fx(E1(),0)} N/C ≈ ${fx(E2(),0)} N/C`):'—';
    $('pt4').textContent=ok.cPV&&ok.cPE?E(`${DV().toFixed(2)} V · ${fx(EE(),0)} N/C`):'—';
    $('pNote').innerHTML=ok.cP1&&ok.cP2&&ok.cPE&&ok.v2?'الاستنتاج: شدة المجال الكهربائي متساوية تقريبا عند كل النقاط بين القطبين، فالمجال بينهما <b>مجال منتظم</b>، وفرق الجهد بين نقطتين يساوي شدة المجال مضروبة في المسافة بينهما <span dir="ltr" style="white-space:nowrap">ΔV = E·d</span>. والجهد ثابت على الخط الموازي للقطبين، فهو خط تساوي جهد عمودي على خطوط المجال.':'تظهر النتائج هنا بعد إكمال كل خطوة بنجاح.'}
  DX.forEach((d,i)=>{$('pR'+i).oninput=()=>pDraw(i);
    $('pd'+i+'Ck').onclick=()=>{const f='pd'+i+'Fb';if(+$('pR'+i).value<100)return fb(f,false,`حرك المجس حتى يصل إلى ${d} cm أولا.`);const v=num($('pd'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة المسطرة بالسنتيمتر.');
      if(Math.abs(v-d)<0.05){ok['d'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`d${'₁₂'[i]} = ${d.toFixed(1)} cm`))}else fb(f,false,'✗ اقرأ الرقم الكبير قبل الخط البرتقالي، ثم عد أقسام المليمتر الصغيرة حتى الخط.')};
    $('pv'+i+'Ck').onclick=()=>{const f='pv'+i+'Fb';if(+$('pR'+i).value<100)return fb(f,false,`حرك المجس حتى يصل إلى ${d} cm أولا.`);const v=num($('pv'+i).value);if(isNaN(v))return fb(f,false,'اكتب قراءة الفولتميتر بالفولت.');
      const val=VV()[i];if(Math.abs(v-val)<0.005){ok['v'+i]=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`V${'₁₂'[i]} = ${val.toFixed(2)} V`))}else fb(f,false,'✗ اكتب الرقم الظاهر على شاشة الفولتميتر كما هو.');sub();results()}});
  $('pR2').oninput=()=>pDraw(2);
  $('pv2Ck').onclick=()=>{const f='pv2Fb';if(!ok.v1)return fb(f,false,'أكمل القراءة (ب) أولا.');if(+$('pR2').value<100)return fb(f,false,'حرك المجس على الخط البرتقالي حتى نهايته أولا.');const v=num($('pv2').value);if(isNaN(v))return fb(f,false,'اكتب قراءة الفولتميتر بالفولت.');
    const val=VV()[1];if(Math.abs(v-val)<0.005){ok.v2=true;fb(f,true,'✓ قراءة صحيحة:\n'+E(`V₃ = ${val.toFixed(2)} V = V₂`)+'\nالجهد لم يتغير عند تحريك المجس على الخط الموازي للقطبين، فهذا خط تساوي جهد.')}else fb(f,false,'✗ اكتب الرقم الظاهر على شاشة الفولتميتر كما هو.');results()};
  const chk=(id,need,needMsg,val,tol,okMsg,badMsg)=>{const f='c'+id+'f';if(!need())return fb(f,false,needMsg);const v=num($('c'+id).value);if(isNaN(v))return fb(f,false,'اكتب الناتج بالأرقام.');
    if(Math.abs(v-val())/Math.abs(val())<=tol){ok['c'+id]=true;fb(f,true,okMsg())}else fb(f,false,badMsg());sub();results()};
  $('cP1k').onclick=()=>chk('P1',()=>ok.v0&&ok.d0,'أكمل القراءة (أ) أولا.',E1,.02,()=>'✓ إجابة صحيحة:\n'+E(`E₁ = ${VV()[0].toFixed(2)} / ${fx(DX[0]/100,2)} = ${fx(E1(),1)} N/C`),()=>'✗ حول d₁ إلى المتر ثم اقسم عليه قراءة الفولتميتر:\n'+E(`E₁ = ${VV()[0].toFixed(2)} / ${fx(DX[0]/100,2)}`));
  $('cP2k').onclick=()=>chk('P2',()=>ok.v1&&ok.d1,'أكمل القراءة (ب) أولا.',E2,.02,()=>'✓ إجابة صحيحة:\n'+E(`E₂ = ${VV()[1].toFixed(2)} / ${fx(DX[1]/100,2)} = ${fx(E2(),1)} N/C`)+'\n'+(Math.abs(E1()-E2())/E1()<.03?'شدة المجال عند النقطتين متساوية تقريبا، فالمجال منتظم.':''),()=>'✗ حول d₂ إلى المتر ثم اقسم عليه قراءة الفولتميتر:\n'+E(`E₂ = ${VV()[1].toFixed(2)} / ${fx(DX[1]/100,2)}`));
  $('cPVk').onclick=()=>chk('PV',()=>ok.v0&&ok.v1,'أكمل القراءتين (أ) و (ب) أولا.',DV,.01,()=>'✓ إجابة صحيحة:\n'+E(`ΔV = ${VV()[1].toFixed(2)} − ${VV()[0].toFixed(2)} = ${DV().toFixed(2)} V`),()=>'✗ اطرح القراءة الأولى من الثانية:\n'+E(`ΔV = ${VV()[1].toFixed(2)} − ${VV()[0].toFixed(2)}`));
  $('cPEk').onclick=()=>chk('PE',()=>ok.cPV,'احسب فرق الجهد (ج) أولا.',EE,.02,()=>'✓ إجابة صحيحة:\n'+E(`d = ${DX[1]} − ${DX[0]} = ${DX[1]-DX[0]} cm = ${fx((DX[1]-DX[0])/100,2)} m`)+'\n'+E(`E = ${DV().toFixed(2)} / ${fx((DX[1]-DX[0])/100,2)} = ${fx(EE(),1)} N/C`),()=>'✗ المسافة بين النقطتين d = d₂ − d₁ بالمتر، ثم اقسم عليها فرق الجهد:\n'+E(`E = ${DV().toFixed(2)} / ${fx((DX[1]-DX[0])/100,2)}`));
  $('nw').onclick=newObj;
  function fitL(){box.querySelectorAll('.law .ln > span, h4.sbh').forEach(e=>{if(!e.offsetWidth)return;e.style.fontSize='';if(e.dataset.pl==null)e.dataset.pl=/pre-line/.test(e.getAttribute('style')||'')?'1':'';const pre=e.dataset.pl==='1';e.style.whiteSpace=pre?'pre':'nowrap';e.style.display='block';e.style.overflow='hidden';
    let f=parseFloat(getComputedStyle(e).fontSize),k=0;while(e.scrollWidth>e.clientWidth+1&&f>9&&k++<80){f-=0.5;e.style.fontSize=f+'px'}});const hs=[...box.querySelectorAll('h4.sbh')].filter(e=>e.offsetWidth);if(hs.some(e=>e.style.fontSize)){const m=Math.min(...hs.map(e=>parseFloat(getComputedStyle(e).fontSize)));hs.forEach(e=>e.style.fontSize=m+'px')}}
  const qf=()=>requestAnimationFrame(fitL);addEventListener('resize',qf);new MutationObserver(qf).observe(box,{childList:true,subtree:true,characterData:true});
  calcInit(box);newObj();qf();
}

const LREF=[
 ['North Carolina State University. (n.d.). <i>Measurement: Lab 1, Physics Mechanics Laboratory Manual</i>. Advanced Instructional Systems (WebAssign).','https://www.webassign.net/question_assets/ncsucalcphysmechl3/lab_1/manual.html'],
 ['Palestine Technical University – Kadoorie. (2022). <i>Physics Lab 1 (105) Manual: Experiment 1 – Measurements and Uncertainties; Experiment 2 – Vectors</i>. Tulkarm, Palestine.','https://lms.ptuk.edu.ps/pluginfile.php/511897/mod_resource/content/3/physlab1-105-Manual%202022-khaled.pdf'],
 ["The Physics Classroom. (n.d.). <i>Speedometer Cubed Lab: Teacher's Guide</i>. Glenview, IL.",'https://www.physicsclassroom.com/lab/1dkin/K2tg.pdf'],
 ['University of Mississippi, Department of Physics and Astronomy. (n.d.). <i>Vectors: PHYS 221 Laboratory Manual</i>. Oxford, MS.','https://www.phy.olemiss.edu/lab/LabPDFs/221/LabManual/4_Vectors_221/TAP_Vectors_221.pdf'],
 ['Universidad de Sevilla, Departamento de Física Aplicada I. (n.d.). <i>Física I – Hoja de laboratorio S1: Vectores (Producto escalar)</i>. Sevilla, España.','https://departamento.us.es/dfisap1/F1/labo/S1/hoja-labS1F1.pdf'],
 ['University of North Carolina. (2011). <i>Motion in One Dimension: Lab 2, Physics Laboratory Manual</i>. Advanced Instructional Systems (WebAssign).','https://www.webassign.net/sample/unc/lab_2/manual.html'],
 ['York College of The City University of New York, Department of Earth and Physical Sciences. (n.d.). <i>1D Motion with Constant Acceleration: Physics I Laboratory Manual</i>. Jamaica, NY.','https://www.york.cuny.edu/earth-physical-sciences/physics-lab-manuals/physics-i/1d-motion-with-constant-acceleration/@@download/file'],
 ['Lehman College of The City University of New York. (n.d.). <i>Free Fall: PHY166 Laboratory Manual</i>. Bronx, NY.','https://lehman.edu/faculty/dgaranin/Introductory_Physics/PHY166-lab-freefall.pdf'],
 ['Western Washington University, Department of Physics &amp; Astronomy. (n.d.). <i>Freefall Time of a Steel Ball</i>. Bellingham, WA.','https://physics.wwu.edu/freefall-time-steel-ball'],
 ['University of Rochester, Department of Physics and Astronomy. (2020). <i>Experiment 2: Acceleration Due to Gravity, PHY 113/121 Laboratory Manual</i>. Rochester, NY.','https://www.pas.rochester.edu/~physlabs/manuals/Lab2_Manual_F20-R.pdf'],
 ['De Anza College. (n.d.). <i>Atwood\'s Machine: Physics Laboratory Handout</i>. Cupertino, CA.','https://autotech.deanza.edu/faculty/lunaeduardo/documents/LabAtwoodsMachine.pdf'],
 ['University of Mississippi, Department of Physics and Astronomy. (2016). <i>Friction: PHYS 223 Laboratory Manual</i>. Oxford, MS.','https://www.phy.olemiss.edu/lab/genlab/labmanual/2016Manual/223/Experiments/Friction.pdf'],
 ['Lebanon Valley College, Department of Physics. (n.d.). <i>Friction: PHY 111 Laboratory</i>. Annville, PA.','https://quantum.lvc.edu/walck/phy111/labs/friction.pdf'],
 ['Washington State University, Department of Physics and Astronomy. (2020). <i>Lab 8: Work and Energy, Physics 101 Laboratory Manual</i>. Pullman, WA.','https://s3.wp.wsu.edu/uploads/sites/892/2020/01/101-Lab-8.-Work-and-Energy.pdf'],
 ['West Virginia University, Department of Physics and Astronomy. (n.d.). <i>This Is Work: PHYS 201 Activity</i>. Morgantown, WV.','https://www.as.wvu.edu/phys/rotter/phys201/5_Energy/This_Is_Work.htm'],
 ['Mercer University, Department of Physics. (n.d.). <i>Conservation of Energy: Physics Lab VI, Mechanics Laboratory Manual</i>. Macon, GA.','https://physics.mercer.edu/labs/manuals/manualMECHlab/energyConservation/energyConservation.pdf'],
 ['Prairie View A&amp;M University, Department of Physics. (n.d.). <i>Experiment 6: Conservation of Mechanical Energy, Physics 2111 Laboratory Manual</i>. Prairie View, TX.','https://www.pvamu.edu/physics/wp-content/uploads/sites/55/phys-2111-lab-manual.pdf'],
 ['New York University, Department of Physics. (2016). <i>Conservation of Energy: General Physics I Laboratory Manual</i>. New York, NY.','https://physics.nyu.edu/~physlab/GenPhysI_PhysII/Intro%20I/Intro%20I/Conservation-Of-Energy-Physics-Majors-07-07-2016.pdf'],
 ['Union College, Department of Physics and Astronomy. (2006). <i>Lab #3: Temperature and Thermal Equilibrium, Physics 123 Laboratory</i>. Schenectady, NY.','https://minerva.union.edu/labrakes/temperatureandthermalequilibrium.pdf'],
 ['Ling, S. J., Sanny, J., &amp; Moebs, W. (2016). <i>University Physics Volume 2, Section 1.4: Heat Transfer, Specific Heat, and Calorimetry</i>. OpenStax. Houston, TX.','https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry'],
 ['Goshen College, Department of Physics. (n.d.). <i>Lab 5: Hot and Cold, Physics 215 Laboratory</i>. Goshen, IN.','https://people.goshen.edu/~paulmr/physix/215/labs/lab5-XC.php'],
 ['Kingsborough Community College (CUNY), Department of Physical Sciences. (n.d.). <i>Experiment 5: Electrical Equivalent of Heat</i> (adapted from PASCO, <i>Physics Labs with Computers</i>, Activity P47). Brooklyn, NY.','https://www.kbcc.cuny.edu/academicdepartments/physci/documents/phy_and_sci/Experiment5_1.pdf'],
 ['Ling, S. J., Sanny, J., &amp; Moebs, W. (2016). <i>University Physics Volume 2, Section 1.2: Thermometers and Temperature Scales</i>. OpenStax. Houston, TX.','https://openstax.org/books/university-physics-volume-2/pages/1-2-thermometers-and-temperature-scales'],
 ['University of Maryland, Department of Physics, Lecture Demonstration Facility. (n.d.). <i>K6-22: Energy Conversion – Immersion Heater</i>. College Park, MD.','https://lecdem.physics.umd.edu/k/k6/2320-k6-22.html'],
 ['Clemson University, Department of Physics and Astronomy. (n.d.). <i>Specific and Latent Heat: Physics 223 Laboratory</i>. Clemson, SC.','https://science.clemson.edu/physics/labs/labs/223/spheat/index.html'],
 ['Santa Monica College, Department of Physical Sciences. (n.d.). <i>Latent Heat: Physics Lab Manual</i>. Santa Monica, CA.','https://www.smc.edu/academics/academic-departments/physical-sciences/physics/lab-manual/Latent-Heat.php'],
 ['University of California, Los Angeles, Department of Physics and Astronomy. (n.d.). <i>Demo 20: Conductivity, Lecture Demonstration Manual</i>. Los Angeles, CA.','https://demoweb.physics.ucla.edu/content/20-conductivity'],
 ['The University of Iowa, Department of Physics and Astronomy. (n.d.). <i>4B40.30: Leslie\'s Cube, Lecture Demonstrations</i>. Iowa City, IA.','https://instructional-resources.physics.uiowa.edu/demos/4b4030-leslies-cube'],
 ['The University of Melbourne, School of Physics. (n.d.). <i>Heat Transfer: Lecture Demonstrations (Hc-4 The Convection Box)</i>. Melbourne, Australia.','https://physics.unimelb.edu.au/lecture-demonstrations/heat-and-thermodynamics/heat-transfer'],
 ['University of Central Arkansas, Department of Physics and Astronomy. (2022). <i>PHYS 1420 College Physics II, Lab Sim 07: Coulomb\'s Law</i>. Conway, AR.','https://faculty.uca.edu/njaustin/PHYS1420/Laboratory/07coloumbsLaw.pdf'],
 ['University of Rochester, Department of Physics and Astronomy. (2020). <i>Lab 6: Coulomb\'s Law, Physics Laboratory Manual</i>. Rochester, NY.','https://www.pas.rochester.edu/~physlabs/manuals/Lab6_Manual_F20-R.pdf'],
 ['PASCO Scientific. (n.d.). <i>Coulomb\'s Law Apparatus ES-9070</i>. Roseville, CA.','https://www.pasco.com/product/ES-9070'],
 ['The Ohio State University, Department of Physics. (n.d.). <i>Physics 1201 Laboratory, Experiment 1: Charges and Forces</i>. Columbus, OH.','https://www.asc.ohio-state.edu/physics/svccourses/phys1201/public_html/P1201_Lab_1.pdf'],
 ['PHYWE Systeme GmbH. (n.d.). <i>Coulomb Potential and Coulomb Field of Metal Spheres (P2420505), University Experiments</i>. Göttingen, Germany.','https://www.phywe.com/eksperimenty-i-nabory/universitet_25255'],
 ['PHYWE Systeme GmbH. (n.d.). <i>Laboratory Experiments Physics LEP 4.2.05: Coulomb Potential and Coulomb Field of Metal Spheres</i>. Hosted by Nikhef, Amsterdam.','https://www.nikhef.nl/~h73/kn1c/praktikum/phywe/LEP/Experim/4_2_05.pdf'],
 ['University of Minnesota, School of Physics and Astronomy. (n.d.). <i>Physics 1202 Laboratory IV: Electric Field and Potential</i>. Minneapolis, MN.','https://groups.spa.umn.edu/physed/Research/Lab%20Manuals/1202/lab%204%20Electric%20Fields.pdf'],
 ['University of Mississippi, Department of Physics and Astronomy. (n.d.). <i>Electric Field and Potentials: PHYS 224 Laboratory Manual</i>. Oxford, MS.','https://www.phy.olemiss.edu/lab/LabPDFs/224/LabManual/2_ElectricFieldAndPotentials_224/WS_E&amp;V_224.pdf'],
 ['Auburn University, Department of Physics. (n.d.). <i>Electric Fields Lab: PHYS 1500 Laboratory</i>. Auburn, AL.','https://php.auburn.edu/academic/cosam/departments/physics/intro-courses/ugrad-lab/physics1500/lab-files/Electric%20Fields%20Lab.pdf'],
 ['Texas Christian University, Department of Physics and Astronomy. (n.d.). <i>Lab 1: Electric Field Mapping, PHYS 10164</i>. Fort Worth, TX.','https://personal.tcu.edu/dingram/phys10164/lab1.pdf'],
 ['University of North Carolina at Charlotte. (n.d.). <i>Electric Fields and Potentials: Lab 1, Physics Laboratory Manual</i>. Advanced Instructional Systems (WebAssign).','https://www.webassign.net/question_assets/unccolphyseml1/lab_1/manual.html']
];
const LREFK={'3-4':[[36,'ورقة موصلة عليها قطبان متصلان بمصدر جهد مستمر، وقياس الجهد عند نقاط مختلفة بالفولتميتر الرقمي، ورسم خطوط تساوي الجهد وخطوط المجال.'],[37,'قياس الجهد بين قطبين متوازيين على ورقة موصلة، وحساب شدة المجال من تغير الجهد مع المسافة.'],[38,'رسم خريطة المجال الكهربائي: تحديد نقاط الجهد المتساوي بمجس الفولتميتر على ورقة موصلة.'],[39,'خطوط تساوي الجهد عمودية على خطوط المجال، وشدة المجال بين لوحين متوازيين E = ΔV / d.'],[35,'قياس فرق الجهد والمجال الكهربائي بين لوحين متوازيين ومقارنتهما.']],'3-3':[[31,'مسار مدرج تتحرك عليه الكرة الثانية لقياس المسافة بين مركزي الكرتين بالمليمتر (فكرة المسار المدرج).'],[33,'قياس شدة المجال الكهربائي حول كرات معدنية مشحونة بمقياس المجال الكهربائي عند مسافات مختلفة، والتحقق من أن المجال يتناسب عكسيا مع مربع المسافة.'],[34,'دليل التجربة: كرة معدنية على ساق عازلة ومقياس المجال الكهربائي ومسطرة مترية، وقياس E مقابل r.'],[35,'رسم خطوط المجال الكهربائي حول شحنة موجبة وشحنة سالبة وشحنتين مختلفتين.']],
 '3-1':[[32,'قياس القوة بين كرتين مشحونتين بميزان رقمي وتحويل قراءته بالجرام إلى قوة بالقانون F = m·g، وقياس المسافة بين مركزي الكرتين بمسطرة.'],[29,'كرة مشحونة على ميزان إلكتروني وكرة مشحونة معلقة فوقها، وقياس القوة عند مسافات مختلفة، ورسم القوة مقابل 1/r² للتحقق من قانون التربيع العكسي وحساب الشحنة.'],[30,'قياس قوة التنافر بين كرتين مشحونتين عند مسافات من 20 cm إلى 5 cm، وتحليل العلاقة بين القوة والمسافة والتحقق من قانون كولوم.'],[31,'جهاز قانون كولوم: كرتان معدنيتان موصلتان، والقوة بينهما تقاس عند مسافات مختلفة لإيجاد قانون التربيع العكسي.']],
 '2-1':[[21,'تسخين كتلة من الماء بمقاومة كهربائية وقياس الطاقة الكهربائية بالجول والطاقة الحرارية بالسعر، وإيجاد عدد الجولات في السعر الواحد.'],[19,'الحرارة طاقة تنتقل بسبب فرق درجة الحرارة، ووحدتاها الجول والسعر <span dir="ltr" style="white-space:nowrap">1 cal = 4.186 J</span>.']],
 '2-2':[[22,'نقطتا انصهار الجليد وغليان الماء في المقاييس الثلاثة، وقوانين التحويل بين السلسيوسي وكلفن والفهرنهايتي.'],[18,'قياس درجة حرارة الماء بالميزان الحراري الرقمي في المعمل.']],
 '2-3':[[21,'قياس كتلة الماء ودرجتي حرارته قبل التسخين وبعده بسخان كهربائي، وحساب الحرارة المكتسبة <span dir="ltr" style="white-space:nowrap">Q = m·c·ΔT</span> ومقارنتها بالطاقة الكهربائية.'],[23,'تسخين نحو <span dir="ltr">300 ml</span> من الماء بسخان غمر كهربائي وقياس درجتي حرارته قبل التسخين وبعده، ومقارنة التغير المقاس بالمحسوب من <span dir="ltr" style="white-space:nowrap">Q = m·c·ΔT</span>.']],
 '2-4':[[24,'إضافة جليد معلوم الكتلة إلى ماء دافئ في مسعر حراري، وحساب الحرارة الكامنة للانصهار من الحرارة المفقودة من الماء والحرارة اللازمة لتسخين ماء الجليد المنصهر.'],[25,'إيجاد الحرارة الكامنة لانصهار الجليد بطريقة الخلط في المسعر الحراري.']],
 '2-6':[[26,'قضبان من فلزات مختلفة متصلة بمصدر حرارة واحد، وكرات مثبتة بالشمع تسقط في أزمنة مختلفة حسب التوصيل الحراري لكل فلز.'],[27,'مكعب ليزلي مملوء بماء ساخن، وجه أسود ووجه لامع، وقياس الإشعاع الصادر من كل وجه.'],[28,'صندوق الحمل لعرض تيارات الحمل في الموائع.']],
 '2-5':[[20,'خلط كتلتين مقاستين من الماء الساخن والماء البارد في كوبين عازلين، وتوقع درجة حرارة الخليط بالمتوسط الموزون، ومقارنتها بدرجة الحرارة المقاسة.'],[18,'استخدام الميزان الحراري الرقمي وتسجيل درجة الحرارة مع الزمن حتى الاتزان الحراري بين الماء الساخن والماء البارد.']],
 '1-9':[[17,'إسقاط جسم من السكون من ارتفاع محدد فوق بوابة ضوئية مضبوطة على قياس السرعة، ومقارنة طاقة الوضع <span dir="ltr" style="white-space:nowrap">m·g·h</span> بطاقة الحركة <span dir="ltr" style="white-space:nowrap">½·m·v²</span>.'],[15,'مقارنة طاقة الوضع المفقودة من ثقل ينزل ارتفاعا مقاسا بالمسطرة المترية بطاقة الحركة المكتسبة، وقياس السرعة بالبوابة الضوئية.']],
 '1-8':[[15,'قياس كتلة الثقل بالميزان وارتفاعه عن الأرض بالمسطرة المترية، وحساب طاقة الوضع <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span>.'],[16,'تعريف طاقة الوضع <span dir="ltr" style="white-space:nowrap">PE = m·g·h</span>، وقياس الكتلة بالميزان والارتفاع بالمسطرة المترية.']],
 '1-7':[[13,'سحب عربة بميزان نابضي بسرعة ثابتة مسافة محددة، وحساب الشغل من تعريفه <span dir="ltr" style="white-space:nowrap">W = F·d·cos θ</span>.'],[14,'سحب قالب بميزان نابضي أفقيا بسرعة ثابتة مسافة <span dir="ltr">0.5 m</span>، وحساب الشغل بالجول حاصل ضرب القوة في المسافة.']],
 '1-5':[[11,'سحب قالب أفقيا بسرعة ثابتة بحساس قوة، فتكون القوة المقروءة أثناء الحركة هي قوة الاحتكاك الحركي <span dir="ltr" style="white-space:nowrap">fk = μk·N</span>.'],[12,'سحب قالب خشبي بسرعة ثابتة لقياس قوة الاحتكاك، وإيجاد القوة العمودية وقوة الاحتكاك من قانون نيوتن.']],
 '0-1':[[0,'قياس طول أسطوانة وقطرها بأداة القدمة ذات الورنية، ثم حساب حجمها.'],[1,'القياس بأداة القدمة ذات الورنية وأداة الميكرومتر، ثم حساب الحجم.']],
 '0-2':[[2,'قياس المسافة بالمسطرة المترية والزمن بساعة الإيقاف، ثم حساب السرعة <span dir="ltr">v = d / t</span>.']],
 '0-4':[[1,'إيجاد محصلة القوى على جهاز طاولة القوى ومقارنتها بقوة الاتزان.'],[3,'إيجاد المحصلة بالمركبات، وقوة الاتزان على جهاز طاولة القوى.']],
 '0-5':[[3,'تحليل القوة إلى مركبتين <span dir="ltr">Fx = F cos θ</span> و <span dir="ltr">Fy = F sin θ</span> على جهاز طاولة القوى.']],
 '0-6':[[4,'قياس مركبات متجهين والزاوية بينهما، ثم حساب الضرب القياسي بالطريقتين والمقارنة بينهما.']],
 '1-3':[[9,'جهاز آتوود بكتلتين تبدآن من السكون، وقياس ارتفاع الكتلة وزمن نزولها لحساب التسارع، ومقارنته بالقانون <span dir="ltr" style="white-space:nowrap">a = (m₁ − m₂)·g / (m₁ + m₂)</span>.'],[10,'حساب التسارع المقاس من الإزاحة والزمن، والتسارع من قانون نيوتن الثاني، والمقارنة بينهما.']],
 '1-2':[[7,'إفلات كرة من السكون وقياس زمن سقوطها، واستخدام العلاقة <span dir="ltr" style="white-space:nowrap">y = ½·g·t²</span> بين الإزاحة الرأسية والزمن.'],[8,'جهاز السقوط الحر ووسادة الاستقبال يشغلان المؤقت ويوقفانه تلقائيا، وحساب ارتفاع السقوط من العلاقة <span dir="ltr" style="white-space:nowrap">h = ½·g·t²</span>.']],
 '1-1':[[6,'الطريقة الأساسية: انطلاق العربة من السكون بين بوابتين ضوئيتين على مسار هوائي مائل، وحساب التسارع <span dir="ltr" style="white-space:nowrap">a = (Vf − Vi) / Δt</span>، ومقارنته عند تغيير الميل.'],[5,'علاقة الإزاحة بالزمن <span dir="ltr" style="white-space:nowrap">Δx = ½·a·Δt²</span> لعربة تبدأ من السكون، ومنها استنتجت السرعة النهائية <span dir="ltr" style="white-space:nowrap">Vf = 2Δx / Δt</span>.']]};
function refBox(k){const ix=LREFK[k];if(!ix)return '';
  return `<div class="intro lrefs"><h3>7. مراجع التجربة</h3><p class="rlead">بنيت هذه التجربة على تجارب منشورة في أدلة معامل الفيزياء بجامعات ومصادر تعليمية موثوقة، مع تكييفها لمحتوى الحقيبة التدريبية.</p><ol class="rl">${ix.map(([i,c],n)=>`<li><span class="en">[${n+1}] ${LREF[i][0]} <a href="${LREF[i][1]}" target="_blank" rel="noopener">${LREF[i][1]}</a></span><span class="ar">يطابق في هذه التجربة: ${c}</span></li>`).join('')}</ol></div>`}

window.LABS={'0-1':{t:'القياس بأداة القدمة ذات الورنية وأداة الميكرومتر',run:measureLab},'0-2':{t:'قياس سرعة جسم متحرك والتحويل بين وحداتها',run:speedLab2},'0-4':{t:'إيجاد محصلة متجهين باستخدام طاولة القوى',run:forceLab},'0-5':{t:'تحليل قوة إلى مركبتين باستخدام طاولة القوى',run:vecLab},'0-6':{t:'الضرب القياسي لمتجهين بمتجهات الوحدة على لوحة الإحداثيات',run:dotLab},'1-1':{t:'إيجاد تسارع عربة على المسار الهوائي المائل وأثر زيادة الميل على السرعة والتسارع',run:airLab},'1-2':{t:'حساب ارتفاع سقوط كرة باستخدام معادلة الحركة الثانية',run:ffLab},'1-3':{t:'التحقق من قانون نيوتن الثاني باستخدام جهاز آتوود',run:awLab},'1-5':{t:'حساب قوة الاحتكاك الحركي والتحقق منها بالميزان النابضي',run:frLab},'1-7':{t:'حساب الشغل المبذول على صندوق خشبي بقوة أفقية',run:wkLab2},'1-8':{t:'إيجاد طاقة الوضع لجسم وعلاقتها بالارتفاع',run:peLab},'1-9':{t:'التحقق من حفظ الطاقة الميكانيكية لجسم ساقط سقوطا حرا',run:ceLab},'2-1':{t:'قياس الطاقة الحرارية الناتجة من سخان كهربائي وتحويلها بين الجول والسعر',run:q1Lab},'2-2':{t:'قياس درجتي انصهار الجليد وغليان الماء والتحويل بين مقاييس درجة الحرارة',run:tsLab},'2-3':{t:'حساب كمية الحرارة اللازمة لتسخين الماء',run:shLab},'2-4':{t:'حساب الحرارة الكامنة لانصهار الجليد',run:lhLab},'2-5':{t:'التحقق من الاتزان الحراري بخلط ماء ساخن وماء بارد',run:eqLab},'2-6':{t:'مقارنة طرق انتقال الحرارة: التوصيل والحمل والإشعاع',run:trLab},'3-1':{t:'التحقق من قانون كولوم',run:clLab},'3-3':{t:'قياس شدة المجال الكهربائي حول شحنة نقطية',run:efLab},'3-4':{t:'قياس فرق الجهد في مجال كهربائي منتظم',run:pdLab}};

/* الدروس المدمجة في الوحدة الثالثة: تجربة واحدة لكل درس — الانصهار والغليان، والحرارة الكامنة لانصهار الجليد، والاتزان الحراري بخلط الماء */
(function(){const L=window.LABS;if(L['2-2'])L['2-1']=Object.assign({k:'2-2'},L['2-2']);if(L['2-4'])L['2-3']=Object.assign({k:'2-4'},L['2-4'])})();
/* workLab محفوظة لدرس الشغل لاحقا */
/* إصلاح اتجاه الأقواس: عزل الأقواس ذات المحتوى اللاتيني داخل النص العربي، وضبط نصوص الرسوم العربية التي فيها أقواس */
const BIDI_AR=/[؀-ۿ]/,BIDI_GRP=/\((?=[^()؀-ۿ⁦⁩]*[A-Za-z0-9])[^()؀-ۿ⁦⁩]*\)/g;
function bidiNode(n){const p=n.parentNode;if(!p||!BIDI_AR.test(n.data))return;if(p.closest&&p.closest('[dir="ltr"],input,textarea,script,style'))return;
  let d;if(p.closest&&p.closest('svg')){if(!/[\u0600-\u06FF]/.test(n.data)||!/[()A-Za-z0-9\u00b0\u2080-\u2089\u20d7]/.test(n.data)||n.data[0]==='\u202b')return;d='\u202b'+n.data.replace(/[\u200f\u2066\u2069]/g,'')+'\u202c'}
  else d=n.data.replace(BIDI_GRP,(m,o,s)=>(s[o-1]==='\u2066'?m:'\u2066'+m+'\u2069'));
  if(d!==n.data)n.data=d}
function bidiFix(root){const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const a=[];while(n=w.nextNode())a.push(n);a.forEach(bidiNode)}
function bidiWatch(root){bidiFix(root);if(typeof MutationObserver!=='function')return;new MutationObserver(ms=>{ms.forEach(m=>{if(m.type==='characterData')bidiNode(m.target);else m.addedNodes.forEach(x=>{if(x.nodeType===3)bidiNode(x);else if(x.nodeType===1)bidiFix(x)})})}).observe(root,{subtree:true,childList:true,characterData:true})}
window.renderLabCard=function(host,u,l){const L=window.LABS[u+'-'+l];if(!L)return false;css();
  const arr=Array.isArray(L)?L:[L],one=x=>{const c=document.createElement('div');c.className='card lab';c.innerHTML='<div class="labBody"></div>';x.run(c.querySelector('.labBody'));c.querySelector('.labBody').insertAdjacentHTML('beforeend',refBox(x.k||u+'-'+l));return c};
  if(arr.length<2){const c=one(arr[0]);host.appendChild(c);bidiWatch(c);return true}
  if(!document.getElementById('labPickCss')){const st=document.createElement('style');st.id='labPickCss';st.textContent='.labPick{background:var(--panel);border:1px solid var(--line);border-top:3px solid #F7931E;border-radius:12px;padding:12px;margin-bottom:12px}.labPick p{margin:0 0 8px;font-weight:700;color:var(--ink)}.labPick .lpb{display:grid;gap:8px}.labPick button{font:inherit;text-align:right;display:flex;gap:10px;align-items:center;width:100%;padding:10px 12px;border-radius:10px;border:1px solid #FFD2A6;background:#FFF7EF;color:#16163a;font-weight:700;cursor:pointer;line-height:1.5}.labPick button i{font-style:normal;flex:none;width:26px;height:26px;border-radius:50%;background:#fff;border:1.5px solid #F7931E;color:#F7931E;display:grid;place-items:center;font-size:14px}.labPick button[aria-pressed="true"]{background:#F7931E;color:#fff;border-color:#F7931E}.labPick button[aria-pressed="true"] i{background:#fff;color:#F7931E}';document.head.appendChild(st)}
  const pk=document.createElement('div');pk.className='labPick';pk.innerHTML='<p>🧪 في هذا الدرس تجربتان، اختر التجربة:</p><div class="lpb">'+arr.map((x,i)=>'<button type="button" aria-pressed="false" data-i="'+i+'"><i>'+(i+1)+'</i><span></span></button>').join('')+'</div>';
  pk.querySelectorAll('button span').forEach((sp,i)=>sp.textContent=arr[i].t);host.appendChild(pk);const box=document.createElement('div');host.appendChild(box);
  const show=i=>{pk.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.i===i)));box.innerHTML='';const c=one(arr[i]);box.appendChild(c);bidiWatch(c)};
  pk.querySelectorAll('button').forEach(b=>b.onclick=()=>show(+b.dataset.i));show(0);bidiFix(pk);return true};
})();
