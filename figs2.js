/* رسوم توضيحية إضافية */
(function(){
const A=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`;
const defs=`<defs>${A('bh','var(--ink)')}${A('ba','var(--accent)')}${A('bb','var(--fig2)')}${A('bm','var(--muted)')}${A('bw','var(--warnc)')}</defs>`;
const svg=(vb,body,cap)=>`<figure class="fig"><svg viewBox="${vb}" role="img" aria-label="${cap}">${defs}${body}</svg><figcaption>${cap}</figcaption></figure>`;
const T=(x,y,s,o='')=>{if(/[؀-ۿ]/.test(s)&&!/text-anchor/.test(o))o+=' text-anchor="end"';return `<text x="${x}" y="${y}" ${o}>${s}</text>`};
const L=(x1,y1,x2,y2,c='var(--ink)',m='bh',w=2.5,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${m?`marker-end="url(#${m})"`:''} ${d?`stroke-dasharray="${d}"`:''}/>`;
const C='class="lb sm" text-anchor="middle"',CX='class="lb xs" text-anchor="middle"';
const F=window.FIGS=window.FIGS||{};
/* سلم البادئات */
F.prefix=svg('0 0 380 170',
  [['n','نانو','10⁻⁹'],['µ','ميكرو','10⁻⁶'],['m','مللي','10⁻³'],['—','الوحدة','1'],['k','كيلو','10³'],['M','ميجا','10⁶'],['G','جيجا','10⁹']].map(([s,n,v],i)=>{const x=30+i*53;
    return `<rect x="${x-22}" y="60" width="44" height="44" rx="8" fill="${i===3?'var(--accent)':'var(--soft)'}" stroke="var(--line)"/>`+T(x,88,s,`class="lb${i===3?' ch':''}" text-anchor="middle"`)+T(x,124,n,CX)+T(x,142,v,CX)}).join('')+
  L(60,40,320,40,'var(--fig2)','bb',2)+T(190,30,'نحو الأكبر: نقسم على 1000 لكل درجة','class="lb xs" text-anchor="middle"')+
  L(320,164,60,164,'var(--warnc)','bw',2)+T(190,160,'','')+
  `<text x="190" y="160" class="lb xs" text-anchor="middle" dy="-2"></text>`,
  'سلم بادئات الوحدات: كل درجة تساوي 1000 مرة'),
/* الكميات الأساسية */
F.siUnits=svg('0 0 380 200',
  [['الطول','m','متر'],['الكتلة','kg','كيلوجرام'],['الزمن','s','ثانية'],['التيار','A','أمبير'],['درجة الحرارة','K','كلفن'],['كمية المادة','mol','مول'],['شدة الإضاءة','cd','شمعة']].map(([q,s,n],i)=>{const col=i%4,row=Math.floor(i/4),x=10+col*92,y=10+row*95;
    return `<rect x="${x}" y="${y}" width="84" height="84" rx="10" fill="var(--soft)" stroke="var(--line)"/>`+T(x+42,y+40,s,'class="lb ac" text-anchor="middle" style="font-size:22px"')+T(x+42,y+62,q,CX)+T(x+42,y+77,n,'class="lb xs" text-anchor="middle" style="fill:var(--muted)"')}).join(''),
  'الكميات الأساسية السبع في النظام الدولي SI ووحداتها'),
/* أنواع الحركة */
F.motionTypes=svg('0 0 380 170',
  L(15,90,105,90,'var(--accent)','ba',3)+T(60,140,'بعد واحد',C)+
  `<path d="M140,120 Q190,10 240,120" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ba)"/>`+T(190,140,'بعدان (مقذوف)',C)+
  `<path d="M290,125 C260,115 260,100 300,95 C340,90 340,75 300,70 C260,65 260,50 300,45 C330,40 340,30 320,25" fill="none" stroke="var(--accent)" stroke-width="3" marker-end="url(#ba)"/><ellipse cx="300" cy="75" rx="32" ry="58" fill="none" stroke="var(--muted)" stroke-dasharray="4 4"/>`+T(305,160,'ثلاثة أبعاد',C),
  'الحركة في بعد واحد وبعدين وثلاثة أبعاد'),
/* نيوتن الثالث */
F.newton3=svg('0 0 360 220',
  `<path d="M180,20 L200,55 L200,140 L160,140 L160,55 Z" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/><path d="M160,120 L140,145 L160,140 Z M200,120 L220,145 L200,140 Z" fill="var(--fig2)"/>`+
  `<path d="M168,142 q12,30 24,0 z" fill="var(--warnc)" opacity=".85"/>`+
  L(180,165,180,212,'var(--warnc)','bw',3)+L(240,120,240,40,'var(--accent)','ba',3)+
  T(305,60,'رد الفعل',C)+T(305,80,'الغازات تدفع',CX)+T(305,96,'الصاروخ للأعلى',CX)+
  T(85,170,'الفعل',C)+T(85,190,'الصاروخ يدفع',CX)+T(85,206,'الغازات للأسفل',CX),
  'قانون نيوتن الثالث: قوتان متساويتان متعاكستان على جسمين مختلفين'),
/* منحنى السرعة والزمن */
F.vtGraph=svg('0 0 360 220',
  `<polygon points="60,150 300,50 300,190 60,190" fill="var(--accent)" opacity=".15"/>`+
  L(60,190,330,190,'var(--ink)','bh',1.5)+L(60,190,60,20,'var(--ink)','bh',1.5)+L(60,150,300,50,'var(--accent)',null,3)+
  L(300,50,300,190,'var(--muted)',null,1.2,'4 4')+T(316,206,'t (s)','class="lb sm"')+T(66,28,'v (m/s)','class="lb sm"')+T(30,154,'v<tspan baseline-shift="sub" font-size="10">i</tspan>','class="lb sm"')+T(306,52,'v<tspan baseline-shift="sub" font-size="10">f</tspan>','class="lb sm"')+
  T(180,165,'المساحة = الإزاحة x',C)+T(130,60,'الميل = التسارع a','class="lb sm ac" text-anchor="middle"'),
  'منحنى السرعة والزمن بتسارع ثابت: الميل هو التسارع، والمساحة تحته هي الإزاحة'),
/* الجزيئات */
F.molecules=svg('0 0 380 190',
  `<rect x="15" y="20" width="160" height="130" rx="10" fill="none" stroke="var(--fig2)" stroke-width="2"/><rect x="205" y="20" width="160" height="130" rx="10" fill="none" stroke="var(--warnc)" stroke-width="2"/>`+
  [[45,50],[95,45],[145,60],[60,100],[115,95],[150,120],[40,130]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="7" fill="var(--fig2)"/>`+L(x+8,y,x+18,y,'var(--fig2)','bb',1.5)).join('')+
  [[235,50],[290,40],[340,65],[250,105],[305,95],[345,125],[230,130]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="7" fill="var(--warnc)"/>`+L(x+8,y+(i%2?6:-6),x+34,y+(i%2?20:-18),'var(--warnc)','bw',1.5)).join('')+
  T(95,175,'بارد: حركة بطيئة',C)+T(285,175,'ساخن: حركة سريعة',C),
  'درجة الحرارة مقياس لمتوسط طاقة حركة الجزيئات'),
/* منحنى التسخين */
F.heatCurve=svg('0 0 360 220',
  L(50,190,335,190,'var(--ink)','bh',1.5)+L(50,190,50,15,'var(--ink)','bh',1.5)+
  `<polyline points="50,175 110,130 210,130 300,40" fill="none" stroke="var(--warnc)" stroke-width="3"/>`+
  L(50,130,110,130,'var(--muted)',null,1,'4 4')+T(44,134,'0°C','class="lb xs" text-anchor="end"')+
  T(118,172,'Q = mcΔT','class="lb xs" text-anchor="middle"')+T(160,122,'انصهار: Q = mH',C)+T(160,145,'(درجة الحرارة ثابتة)',CX)+T(270,105,'Q = mcΔT','class="lb xs" text-anchor="middle"')+
  T(80,190,'','')+T(80,205,'جليد',CX)+T(160,205,'جليد + ماء',CX)+T(260,205,'ماء',CX)+T(330,182,'Q','class="lb sm"')+T(58,22,'T','class="lb sm"'),
  'منحنى تسخين الجليد: درجة الحرارة ثابتة أثناء الانصهار'),
/* الاتزان الحراري */
F.mixing=svg('0 0 380 170',
  `<rect x="15" y="40" width="80" height="90" rx="8" fill="color-mix(in srgb,var(--warnc) 25%,transparent)" stroke="var(--warnc)" stroke-width="2"/>`+T(55,90,'80°C',C)+T(55,150,'ساخن',CX)+
  `<text x="120" y="92" class="lb" text-anchor="middle">+</text>`+
  `<rect x="145" y="40" width="80" height="90" rx="8" fill="color-mix(in srgb,var(--fig2) 22%,transparent)" stroke="var(--fig2)" stroke-width="2"/>`+T(185,90,'20°C',C)+T(185,150,'بارد',CX)+
  L(240,85,280,85,'var(--ink)','bh',2)+
  `<rect x="290" y="40" width="80" height="90" rx="8" fill="color-mix(in srgb,var(--accent) 22%,transparent)" stroke="var(--accent)" stroke-width="2"/>`+T(330,90,'50°C',C)+T(330,150,'اتزان',CX)+
  T(190,22,'الحرارة المفقودة = الحرارة المكتسبة',C),
  'الاتزان الحراري: كتلتان متساويتان من الماء تصلان إلى درجة متوسطة'),
/* الذرة */
F.atom=svg('0 -25 360 275',
  `<ellipse cx="180" cy="100" rx="140" ry="45" fill="none" stroke="var(--muted)"/><ellipse cx="180" cy="100" rx="140" ry="45" fill="none" stroke="var(--muted)" transform="rotate(60 180 100)"/><ellipse cx="180" cy="100" rx="140" ry="45" fill="none" stroke="var(--muted)" transform="rotate(-60 180 100)"/>`+
  `<circle cx="172" cy="96" r="10" fill="var(--warnc)"/><circle cx="188" cy="98" r="10" fill="var(--soft)" stroke="var(--ink)"/><circle cx="180" cy="110" r="10" fill="var(--warnc)"/>`+
  T(172,100,'+','class="lb ch" text-anchor="middle" style="font-size:12px"')+T(180,114,'+','class="lb ch" text-anchor="middle" style="font-size:12px"')+
  [[320,100],[110,160],[250,40]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="9" fill="var(--fig2)"/>`+T(x,y+5,'−','class="lb ch" text-anchor="middle" style="font-size:14px"')).join('')+
  T(320,150,'إلكترون (−)',CX)+T(180,244,'النواة في المركز: بروتونات (+) ونيوترونات',CX),
  'الذرة المتعادلة: عدد البروتونات الموجبة يساوي عدد الإلكترونات السالبة'),
/* الشحن بالدلك */
F.rubbing=svg('0 0 380 180',
  `<rect x="30" y="60" width="200" height="26" rx="13" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/>`+
  [50,80,110,140,170,200].map(x=>T(x,79,'−','class="lb" text-anchor="middle" style="fill:var(--fig2)"')).join('')+
  `<path d="M250,40 q30,-10 60,5 q20,30 0,60 q-30,15 -60,0 q-15,-35 0,-65z" fill="color-mix(in srgb,var(--warnc) 20%,transparent)" stroke="var(--warnc)" stroke-width="2"/>`+
  [[270,60],[295,55],[280,85],[300,95]].map(([x,y])=>T(x,y,'+','class="lb" text-anchor="middle" style="fill:var(--warnc)"')).join('')+
  L(250,120,200,120,'var(--fig2)','bb',2)+T(225,140,'انتقال الإلكترونات',CX)+
  T(130,40,'بلاستيك: يصبح سالبًا',C)+T(280,165,'صوف: يصبح موجبًا',C),
  'الشحن بالدلك: تنتقل الإلكترونات من الصوف إلى البلاستيك'),
/* التيار في سلك */
F.wire=svg('0 0 380 180',
  `<rect x="40" y="55" width="280" height="60" fill="color-mix(in srgb,var(--fig2) 10%,transparent)" stroke="var(--ink)" stroke-width="1.5"/><ellipse cx="320" cy="85" rx="15" ry="30" fill="color-mix(in srgb,var(--accent) 30%,transparent)" stroke="var(--accent)" stroke-width="2"/><ellipse cx="40" cy="85" rx="15" ry="30" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`+
  [[80,70],[130,95],[180,75],[230,100],[270,72],[110,105],[210,65]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="var(--fig2)"/>`+L(x-6,y,x-24,y,'var(--fig2)','bb',1.2)).join('')+
  L(120,140,250,140,'var(--warnc)','bw',3)+T(185,162,'اتجاه التيار الاصطلاحي I',C)+
  T(185,40,'الإلكترونات تنجرف عكس التيار بسرعة انجراف صغيرة جدًا',CX)+T(345,90,'A','class="lb ac"'),
  'التيار في سلك: كثافة التيار J = I/A، والإلكترونات تنجرف عكس اتجاه التيار'),
/* DC و AC */
F.acdc=svg('0 0 380 190',
  L(20,80,170,80,'var(--muted)','bm',1.2)+L(20,140,20,20,'var(--muted)','bm',1.2)+L(20,45,160,45,'var(--accent)',null,3)+T(95,170,'تيار مستمر DC',C)+T(95,35,'اتجاه واحد ثابت',CX)+
  L(210,80,365,80,'var(--muted)','bm',1.2)+L(210,140,210,20,'var(--muted)','bm',1.2)+
  `<path d="M210,80 C225,30 240,30 255,80 S285,130 300,80 S330,30 345,80" fill="none" stroke="var(--warnc)" stroke-width="3"/>`+T(285,170,'تيار متردد AC',C)+T(285,150,'يتغير اتجاهه دوريًا',CX),
  'التيار المستمر والتيار المتردد'),
/* عوامل المقاومة */
F.wireR=svg('0 0 380 170',
  `<rect x="20" y="40" width="300" height="12" rx="6" fill="var(--warnc)"/>`+T(170,30,'سلك طويل ورفيع ← مقاومة كبيرة',C)+
  `<rect x="20" y="105" width="120" height="34" rx="10" fill="var(--fig2)"/>`+T(120,160,'قصير وسميك ← مقاومة صغيرة',C)+
  T(290,125,'R = ρ·L / A','class="lb ac" text-anchor="middle" style="font-size:17px"'),
  'المقاومة تزداد بزيادة الطول وتقل بزيادة مساحة المقطع'),
/* الدائرة الكهربائية */
F.circuit=svg('0 0 380 230',
  `<g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M60,60 H160 M220,60 H320 V170 H60 V60"/><path d="M60,105 v0"/></g>`+
  `<line x1="50" y1="100" x2="70" y2="100" stroke="var(--ink)" stroke-width="3"/><line x1="54" y1="110" x2="66" y2="110" stroke="var(--ink)" stroke-width="5"/><rect x="45" y="96" width="30" height="20" fill="var(--panel)" opacity="0"/>`+
  `<circle cx="190" cy="60" r="18" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>`+T(190,66,'A','class="lb" text-anchor="middle"')+
  `<circle cx="320" cy="115" r="16" fill="color-mix(in srgb,var(--warnc) 25%,var(--panel))" stroke="var(--ink)" stroke-width="2"/><path d="M309,104 L331,126 M331,104 L309,126" stroke="var(--ink)" stroke-width="1.5"/>`+
  `<path d="M320,80 H360 V150 H320" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="0"/><circle cx="360" cy="115" r="14" fill="var(--panel)" stroke="var(--ink)" stroke-width="2"/>`+T(360,120,'V','class="lb" text-anchor="middle"')+
  `<rect x="44" y="92" width="32" height="28" fill="var(--paper)"/><line x1="48" y1="100" x2="72" y2="100" stroke="var(--ink)" stroke-width="3"/><line x1="53" y1="110" x2="67" y2="110" stroke="var(--ink)" stroke-width="5"/>`+
  T(30,100,'+','class="lb sm" text-anchor="middle"')+T(30,118,'−','class="lb sm" text-anchor="middle"')+
  L(120,180,250,180,'var(--accent)','ba',2)+T(185,200,'I',C)+
  T(190,30,'أميتر على التوالي',CX)+T(300,195,'فولتميتر على التوازي',CX)+T(110,140,'البطارية',CX)+T(290,115,'مصباح','class="lb xs" text-anchor="end"'),
  'دائرة بسيطة: الأميتر يوصل على التوالي والفولتميتر على التوازي')
;
const SET={'0-0':'siUnits','0-1':'siUnits','0-2':'prefix','0-3':'prefix','0-8':'prefix','1-0':'motionTypes','1-2':'vtGraph','1-4':'newton3','1-11':'vtGraph','2-0':'molecules','2-1':'molecules','2-3':'heatCurve','2-4':'heatCurve','2-5':'mixing','2-7':'mixing','3-0':'atom','3-1':'rubbing','3-9':'field','4-0':'circuit','4-1':'wire','4-2':'wire','4-3':'wire','4-4':'acdc','4-6':'wireR','4-7':'circuit'};
const E=window.EXTRA=window.EXTRA||{};
Object.entries(SET).forEach(([k,f])=>{E[k]=E[k]||{};E[k].fig=f});
})();
