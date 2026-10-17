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

/* الضرب القياسي بالإحداثيات القطبية: المتجهان A و B والزاوية بينهما فقط */
{const ox=60,oy=210,P=(r,a)=>[ox+r*Math.cos(a*Math.PI/180),oy-r*Math.sin(a*Math.PI/180)];
 const a1=20,a2=65,[ax,ay]=P(185,a2),[bx,by]=P(230,a1),r=70,[x1,y1]=P(r,a1),[x2,y2]=P(r,a2),[tx,ty]=P(r+20,(a1+a2)/2);
 F.dotPolar=svg('0 0 380 235',
  L(ox,oy,365,oy,'var(--muted)','bm',1.6)+L(ox,oy,ox,15,'var(--muted)','bm',1.6)+`<text x="368" y="${oy+5}" class="lb sm">x</text><text x="${ox}" y="11" class="lb sm" text-anchor="middle">y</text>`
  +`<path d="M${x1} ${y1} A${r} ${r} 0 0 0 ${x2} ${y2}" fill="none" stroke="var(--warnc)" stroke-width="3"/>`
  +L(ox,oy,bx,by,'var(--fig2)','bb',3.5)+L(ox,oy,ax,ay,'var(--accent)','ba',3.5)
  +`<text x="${ax+8}" y="${ay}" class="lb ac">A</text><text x="${bx+6}" y="${by+4}" class="lb" style="fill:var(--fig2)">B</text><text x="${tx}" y="${ty+6}" class="lb wr" text-anchor="middle">θ</text>`
  +`<circle cx="${ox}" cy="${oy}" r="4" fill="var(--ink)"/>`,
  'المتجهان A و B والزاوية θ بينهما')}
/* الضرب القياسي بالإحداثيات الديكارتية: المتجهان ومركباتهما ومتجها الوحدة */
{const ox=50,oy=225,k=42,X=v=>ox+v*k,Y=v=>oy-v*k;let g='';
 for(let i=0;i<=7;i++)g+=`<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(5)}" stroke="var(--line)" stroke-width="1"/>`;
 for(let i=0;i<=5;i++)g+=`<line x1="${X(0)}" y1="${Y(i)}" x2="${X(7)}" y2="${Y(i)}" stroke="var(--line)" stroke-width="1"/>`;
 for(let i=1;i<=6;i++)g+=`<text x="${X(i)}" y="${Y(0)+16}" class="lb xs" text-anchor="middle">${i}</text>`;
 for(let i=1;i<=4;i++)g+=`<text x="${X(0)-8}" y="${Y(i)+4}" class="lb xs" text-anchor="end">${i}</text>`;
 g+=L(X(0),Y(0),X(7.3),Y(0),'var(--muted)','bm',1.6)+L(X(0),Y(0),X(0),Y(5.2),'var(--muted)','bm',1.6)+`<text x="${X(7.3)+4}" y="${Y(0)+5}" class="lb sm">x</text><text x="${X(0)}" y="${Y(5.2)-6}" class="lb sm" text-anchor="middle">y</text>`;
 const A=[5,2],B=[2,4];
 g+=L(X(A[0]),Y(A[1]),X(A[0]),Y(0),'var(--accent)','',1.6,'5 4')+L(X(A[0]),Y(A[1]),X(0),Y(A[1]),'var(--accent)','',1.6,'5 4');
 g+=L(X(B[0]),Y(B[1]),X(B[0]),Y(0),'var(--fig2)','',1.6,'5 4')+L(X(B[0]),Y(B[1]),X(0),Y(B[1]),'var(--fig2)','',1.6,'5 4');
 g+=L(X(0),Y(0),X(A[0]),Y(A[1]),'var(--accent)','ba',3.5)+L(X(0),Y(0),X(B[0]),Y(B[1]),'var(--fig2)','bb',3.5);
 g+=L(X(0),Y(0),X(1),Y(0),'var(--warnc)','bw',2.6)+L(X(0),Y(0),X(0),Y(1),'var(--warnc)','bw',2.6);
 g+=`<text x="${X(.5)}" y="${Y(0)+32}" class="lb sm wr" text-anchor="middle">î</text><text x="${X(0)-22}" y="${Y(.5)+5}" class="lb sm wr" text-anchor="middle">ĵ</text>`;
 g+=`<text x="${X(A[0])+8}" y="${Y(A[1])-6}" class="lb ac">A = 5î + 2ĵ</text><text x="${X(B[0])+8}" y="${Y(B[1])-6}" class="lb" style="fill:var(--fig2)">B = 2î + 4ĵ</text>`;
 g+=`<text x="${X(A[0])}" y="${Y(0)+32}" class="lb xs ac" text-anchor="middle">Ax = 5</text><text x="${X(B[0])}" y="${Y(0)+32}" class="lb xs" style="fill:var(--fig2)" text-anchor="middle">Bx = 2</text>`;
 g+=`<text x="${X(0)-26}" y="${Y(A[1])+4}" class="lb xs ac" text-anchor="end">Ay = 2</text><text x="${X(0)-26}" y="${Y(B[1])+4}" class="lb xs" style="fill:var(--fig2)" text-anchor="end">By = 4</text>`;
 g+=`<circle cx="${X(0)}" cy="${Y(0)}" r="4" fill="var(--ink)"/>`;
 F.dotCart=svg('-40 0 420 275',g,'A·B = AxBx + AyBy = (5)(2) + (2)(4) = 18')}

/* الضرب الاتجاهي: A×B عمودي على مستوى المتجهين (من الحقيبة) */
{const ox=150,oy=185;
 F.crossPlane=svg('0 0 380 295',
  `<path d="M40 225 L120 120 L350 150 L270 260 Z" fill="var(--soft)" stroke="var(--muted)" stroke-width="1.5"/>`
  +L(ox,oy,ox,282,'var(--muted)','bm',2,'6 5')+`<text x="${ox+10}" y="276" class="lb sm" style="fill:var(--muted)">B×A</text>`
  +`<path d="M${ox+40} ${oy-5} A40 40 0 0 1 ${ox+38} ${oy+14}" fill="none" stroke="var(--warnc)" stroke-width="2.5"/><text x="${ox+50}" y="${oy+8}" class="lb sm wr">θ</text>`
  +L(ox,oy,ox+130,oy-22,'var(--fig2)','bb',3.5)+L(ox,oy,ox+120,oy+40,'var(--accent)','ba',3.5)
  +L(ox,oy,ox,25,'var(--warnc)','bw',3.5)
  +`<text x="${ox+136}" y="${oy-26}" class="lb" style="fill:var(--fig2)">B</text><text x="${ox+126}" y="${oy+52}" class="lb ac">A</text><text x="${ox+12}" y="36" class="lb wr">A×B</text>`
  +`<circle cx="${ox}" cy="${oy}" r="4" fill="var(--ink)"/>`,
  'A×B عمودي على مستوى المتجهين A و B')}
})();
/* المجال المنتظم وغير المنتظم، والجهد فيهما (درسا 3-3 و 3-4) */
(function(){
const A=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`;
const defs=`<defs>${A('uh','var(--ink)')}${A('ua','var(--accent)')}${A('ub','var(--fig2)')}${A('um','var(--muted)')}</defs>`;
const svg=(vb,body,cap)=>`<figure class="fig"><svg viewBox="${vb}" role="img" aria-label="${cap}">${defs}${body}</svg><figcaption>${cap}</figcaption></figure>`;
const T=(x,y,s,o='')=>{if(/[؀-ۿ]/.test(s)&&!/text-anchor/.test(o))o+=' text-anchor="end"';return `<text x="${x}" y="${y}" ${o}>${s}</text>`};
const L=(x1,y1,x2,y2,c='var(--ink)',m='uh',w=2.5,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${m?`marker-end="url(#${m})"`:''} ${d?`stroke-dasharray="${d}"`:''}/>`;
const D=(x1,y1,x2,y2,c='var(--ink)')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="1.6" marker-start="url(#uh)" marker-end="url(#uh)"/>`;
const C='class="lb sm" text-anchor="middle"';
const F=window.FIGS=window.FIGS||{};
const XL=120,XR=260,Y0=50,Y1=190;
/* مكثف متوازي اللوحين موصل بمصدر جهد مستمر */
const cap=(field)=>
  `<rect x="${XL-8}" y="${Y0}" width="8" height="${Y1-Y0}" fill="#DC2626" rx="2"/><rect x="${XR}" y="${Y0}" width="8" height="${Y1-Y0}" fill="#2563EB" rx="2"/>`
  +[68,94,146,172].map(y=>`<text x="${XL-20}" y="${y+5}" ${C} style="fill:#DC2626">+</text><text x="${XR+20}" y="${y+5}" ${C} style="fill:#2563EB">−</text>`).join('')
  +`<path d="M${XL-8},120 L${XL-40},120 L${XL-40},232 L183,232" fill="none" stroke="var(--ink)" stroke-width="1.8"/><path d="M${XR+8},120 L${XR+40},120 L${XR+40},232 L197,232" fill="none" stroke="var(--ink)" stroke-width="1.8"/><circle cx="${XL-8}" cy="120" r="2.5" fill="var(--ink)"/><circle cx="${XR+8}" cy="120" r="2.5" fill="var(--ink)"/>`
  +`<line x1="185" y1="220" x2="185" y2="244" stroke="var(--ink)" stroke-width="2.5"/><line x1="195" y1="226" x2="195" y2="238" stroke="var(--ink)" stroke-width="5"/>`
  +`<text x="176" y="226" ${C} style="fill:#DC2626">+</text><text x="205" y="226" ${C} style="fill:#2563EB">−</text>`
  +T(190,262,'V','class="lb" text-anchor="middle"')+T(300,262,'مصدر جهد مستمر','class="lb xs" text-anchor="middle"')
  +T(XL-10,40,'اللوح الموجب','class="lb xs" text-anchor="middle" style="fill:#DC2626"')+T(XR+10,40,'اللوح السالب','class="lb xs" text-anchor="middle" style="fill:#2563EB"')
  +field;
const lines=(c,m,w)=>[70,100,130,160].map(y=>L(XL+4,y,XR-6,y,c,m,w)).join('');
F.efUniform=svg('40 20 360 255',
  cap(lines('var(--accent)','ua',2.5)
   +`<rect x="176" y="106" width="28" height="18" fill="var(--panel)"/>`+T(190,120,'E','class="lb ac" text-anchor="middle"')
   +D(XL,205,XR,205)+`<rect x="181" y="196" width="18" height="16" fill="var(--panel)"/>`+T(190,209,'d',C)
   +T(XR+50,95,'E = V / d','class="lb ac" text-anchor="start"')),
  'المجال المنتظم بين لوحين متوازيين موصلين بمصدر جهد: خطوط مستقيمة متوازية متساوية التباعد');
F.vUniform=svg('40 20 360 255',
  cap(lines('var(--accent)','ua',1.6)
   +[160,220].map(x=>L(x,58,x,182,'var(--fig2)',null,2,'6 4')).join('')
   +`<circle cx="160" cy="115" r="5" fill="var(--ink)"/><circle cx="220" cy="115" r="5" fill="var(--ink)"/>`
   +`<rect x="140" y="80" width="40" height="17" fill="var(--panel)"/><rect x="200" y="80" width="40" height="17" fill="var(--panel)"/>`
   +T(160,93,'V<tspan dy="4" font-size="10">a</tspan>',C)+T(220,93,'V<tspan dy="4" font-size="10">b</tspan>',C)
   +D(160,145,220,145)+`<rect x="181" y="135" width="18" height="16" fill="var(--panel)"/>`+T(190,148,'d',C)
   +T(XR+50,95,'ΔV = E·d','class="lb ac" text-anchor="start"')+`<rect x="176" y="166" width="28" height="18" fill="var(--panel)"/>`+T(190,180,'E','class="lb ac" text-anchor="middle"')
   +T(362,140,'خطوط تساوي','class="lb xs" text-anchor="middle" style="fill:var(--fig2)"')+T(362,156,'الجهد','class="lb xs" text-anchor="middle" style="fill:var(--fig2)"')+L(342,168,382,168,'var(--fig2)',null,2,'6 4')),
  'فرق الجهد بين النقطتين a و b في المجال المنتظم يساوي E·d، وخطوط تساوي الجهد عمودية على خطوط المجال');
/* شحنة نقطية */
const cx=110,cy=130;
const rays=(r0,r1,c,m,w)=>Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return L(cx+r0*Math.cos(a),cy+r0*Math.sin(a),cx+r1*Math.cos(a),cy+r1*Math.sin(a),c,m,w)}).join('');
const q=`<circle cx="${cx}" cy="${cy}" r="15" fill="#DC2626"/><text x="${cx}" y="${cy+6}" class="lb ch" text-anchor="middle">+</text><text x="${cx-24}" y="${cy-20}" ${C}>q</text>`;
F.efPoint=svg('0 30 380 210',
  rays(20,78,'var(--accent)','ua',2)+q
  +`<circle cx="270" cy="${cy}" r="5" fill="var(--ink)"/>`+L(275,cy,335,cy,'var(--accent)','ua',3.5)
  +T(305,cy-12,'E','class="lb ac" text-anchor="middle"')+T(270,cy-12,'P',C)
  +D(cx,cy+40,270,cy+40)+T(190,cy+58,'r',C)+L(270,cy+8,270,cy+46,'var(--muted)',null,1,'3 3')
  +T(265,62,'E = k·q / r²','class="lb ac" text-anchor="middle"'),
  'المجال غير المنتظم حول شحنة نقطية: خطوط شعاعية تتباعد ويضعف المجال كلما زادت r');
F.vPoint=svg('0 30 380 210',
  rays(20,100,'var(--accent)',null,1)+[40,65,95].map(r=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--fig2)" stroke-width="2" stroke-dasharray="6 4"/>`).join('')+q
  +`<circle cx="${cx+95}" cy="${cy}" r="5" fill="var(--ink)"/>`+T(cx+108,cy-10,'V',C)
  +D(cx,cy+40,cx+95,cy+40)+`<rect x="${cx+40}" y="${cy+29}" width="16" height="17" fill="var(--panel)"/>`+T(cx+48,cy+43,'r',C)
  +T(300,80,'V = k·q / r','class="lb ac" text-anchor="middle"')
  +T(300,112,'خطوط تساوي الجهد','class="lb xs" text-anchor="middle" style="fill:var(--fig2)"')+L(280,124,320,124,'var(--fig2)',null,2,'6 4'),
  'الجهد حول شحنة نقطية: خطوط تساوي الجهد دوائر حول الشحنة، ويقل الجهد كلما زادت r');
})();
