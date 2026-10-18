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
/* رموز المكثف في الدوائر الكهربائية وأنواع المكثفات (درس 3-5) */
(function(){
const F=window.FIGS=window.FIGS||{};
const svg=(vb,body,cap)=>`<figure class="fig"><svg viewBox="${vb}" role="img" aria-label="${cap}">${body}</svg><figcaption>${cap}</figcaption></figure>`;
const T=(x,y,s,o='')=>`<text x="${x}" y="${y}" text-anchor="middle" ${o}>${s}</text>`;
const W='stroke="var(--ink)" stroke-width="3" stroke-linecap="round"';
/* الرموز */
const sym1=(x,y)=>`<line x1="${x-60}" y1="${y}" x2="${x-8}" y2="${y}" ${W}/><line x1="${x+8}" y1="${y}" x2="${x+60}" y2="${y}" ${W}/><line x1="${x-8}" y1="${y-24}" x2="${x-8}" y2="${y+24}" ${W} stroke-width="5"/><line x1="${x+8}" y1="${y-24}" x2="${x+8}" y2="${y+24}" ${W} stroke-width="5"/>`;
const sym2=(x,y)=>`<line x1="${x-60}" y1="${y}" x2="${x-8}" y2="${y}" ${W}/><line x1="${x+12}" y1="${y}" x2="${x+60}" y2="${y}" ${W}/><line x1="${x-8}" y1="${y-24}" x2="${x-8}" y2="${y+24}" ${W} stroke-width="5"/><path d="M${x+18},${y-24} Q${x+6},${y} ${x+18},${y+24}" fill="none" ${W} stroke-width="4"/>`
  +`<circle cx="${x-26}" cy="${y-30}" r="10" fill="#DC2626"/><text x="${x-26}" y="${y-24.5}" font-size="17" font-weight="900" fill="#fff" text-anchor="middle">+</text><circle cx="${x+30}" cy="${y-30}" r="10" fill="#2563EB"/><text x="${x+30}" y="${y-24.5}" font-size="17" font-weight="900" fill="#fff" text-anchor="middle">−</text>`;
const sym3=(x,y)=>sym1(x,y)+`<line x1="${x-30}" y1="${y+30}" x2="${x+30}" y2="${y-30}" stroke="#F7931E" stroke-width="3" marker-end="url(#csA)"/>`;
F.capSymbols=svg('0 0 420 190',
 `<defs><marker id="csA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#F7931E"/></marker></defs>`
 +sym1(75,70)+sym2(210,70)+sym3(345,70)
 +T(75,135,'مكثف ثابت','class="lb sm"')+T(75,155,'(غير قطبي)','class="lb xs"')
 +T(210,135,'مكثف إلكتروليتي','class="lb sm"')+T(210,155,'(قطبي: موجب + وسالب −)','class="lb xs"')
 +T(345,135,'مكثف متغير','class="lb sm"')+T(345,155,'(تتغير سعته)','class="lb xs"'),
 'رموز المكثف في الدوائر الكهربائية');
/* الأنواع */
const pm=(x,y,t)=>{const c=t=='+'?'#DC2626':'#2563EB',dx=0;y+=12;return `<circle cx="${x+dx}" cy="${y-4}" r="8" fill="${c}"/><text x="${x+dx}" y="${y+1}" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">${t}</text>`};
const leg=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9CA3AF" stroke-width="2.6" stroke-linecap="round"/>`;
const elec=(x,y)=>leg(x-9,y+38,x-9,y+62)+leg(x+9,y+38,x+9,y+70)+pm(x+9,y+70,'+')+pm(x-9,y+62,'−')
 +`<rect x="${x-22}" y="${y-40}" width="44" height="80" rx="6" fill="#1D4ED8" stroke="#0F172A"/><rect x="${x-18}" y="${y-36}" width="10" height="72" fill="#E5E7EB"/><ellipse cx="${x}" cy="${y-40}" rx="22" ry="7" fill="#94A3B8" stroke="#0F172A"/><path d="M${x-10},${y-40} L${x+10},${y-40} M${x},${y-46} L${x},${y-34}" stroke="#475569" stroke-width="1.5"/>`
 +`<text x="${x-13}" y="${y-14}" font-size="12" font-weight="900" fill="#0F172A" text-anchor="middle">−</text><text x="${x-13}" y="${y+14}" font-size="12" font-weight="900" fill="#0F172A" text-anchor="middle">−</text><text x="${x+6}" y="${y+4}" font-size="8" font-weight="800" fill="#fff" text-anchor="middle" direction="ltr">100µF</text>`;
const cer=(x,y)=>leg(x-8,y+18,x-10,y+70)+leg(x+8,y+18,x+10,y+70)+`<ellipse cx="${x}" cy="${y}" rx="26" ry="24" fill="#F59E0B" stroke="#92400E" stroke-width="1.5"/><ellipse cx="${x-6}" cy="${y-6}" rx="10" ry="7" fill="#FCD34D" opacity=".7"/><text x="${x}" y="${y+5}" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle" direction="ltr">104</text>`;
const film=(x,y)=>leg(x-10,y+22,x-10,y+70)+leg(x+10,y+22,x+10,y+70)+`<rect x="${x-26}" y="${y-28}" width="52" height="50" rx="6" fill="#DC2626" stroke="#7F1D1D"/><rect x="${x-22}" y="${y-24}" width="12" height="42" rx="3" fill="#F87171" opacity=".6"/><text x="${x}" y="${y+2}" font-size="10" font-weight="800" fill="#fff" text-anchor="middle" direction="ltr">0.47µF</text>`;
const tant=(x,y)=>leg(x-9,y+18,x-9,y+70)+leg(x+9,y+18,x+9,y+62)+pm(x-9,y+70,'+')+pm(x+9,y+62,'−')+`<path d="M${x-16},${y+18} Q${x-20},${y-24} ${x},${y-26} Q${x+20},${y-24} ${x+16},${y+18} Z" fill="#EAB308" stroke="#713F12"/><text x="${x-6}" y="${y-6}" font-size="12" font-weight="900" fill="#713F12" text-anchor="middle">+</text><text x="${x+2}" y="${y+10}" font-size="9" font-weight="800" fill="#713F12" text-anchor="middle" direction="ltr">10µF</text>`;
const vari=(x,y)=>leg(x-14,y+26,x-14,y+70)+leg(x+14,y+26,x+14,y+70)+`<rect x="${x-30}" y="${y-6}" width="60" height="32" rx="4" fill="#E5E7EB" stroke="#475569"/>`
 +[0,1,2,3].map(k=>`<path d="M${x-24+k*4},${y-4} A26 26 0 0 1 ${x+24-k*4},${y-4}" fill="none" stroke="#94A3B8" stroke-width="2"/>`).join('')
 +`<rect x="${x-4}" y="${y-36}" width="8" height="30" fill="#334155"/><circle cx="${x}" cy="${y-38}" r="9" fill="#1F2937"/><line x1="${x}" y1="${y-38}" x2="${x+6}" y2="${y-44}" stroke="#F7931E" stroke-width="2"/>`;
const supc=(x,y)=>leg(x-10,y+30,x-10,y+62)+leg(x+10,y+30,x+10,y+70)+pm(x+10,y+70,'+')+pm(x-10,y+62,'−')+`<rect x="${x-30}" y="${y-30}" width="60" height="60" rx="10" fill="#111827" stroke="#0F172A"/><rect x="${x-30}" y="${y-30}" width="14" height="60" rx="6" fill="#4B5563"/><text x="${x-23}" y="${y+5}" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">−</text><text x="${x+6}" y="${y-2}" font-size="11" font-weight="800" fill="#FDE68A" text-anchor="middle" direction="ltr">1F</text><text x="${x+6}" y="${y+14}" font-size="9" font-weight="700" fill="#FDE68A" text-anchor="middle" direction="ltr">5.5V</text>`;
const cell=(fn,x,y,a,b)=>fn(x,y)+T(x,y+104,a,'class="lb sm"')+T(x,y+122,b,'class="lb xs"');
F.capTypes=svg('0 0 480 400',
 cell(elec,80,60,'إلكتروليتي','سعة كبيرة · قطبي')+cell(cer,240,60,'سيراميكي','سعة صغيرة · غير قطبي')+cell(film,400,60,'بلاستيكي (فيلم)','دقيق وثابت · غير قطبي')
 +cell(tant,80,240,'تنتالوم','صغير الحجم · قطبي')+cell(vari,240,240,'متغير','تتغير سعته بالمقبض')+cell(supc,400,240,'فائق السعة','سعة كبيرة جدا · قطبي'),
 'أنواع المكثفات الشائعة');
})();
/* المكثف ذو اللوحين المتوازيين: رسم ثلاثي الأبعاد موصل بمصدر جهد من جانبيه (درس 3-5) */
(function(){
const F=window.FIGS=window.FIGS||{};
const S=(x,d,z)=>[x+d*0.55,250-z-d*0.45],f=n=>n.toFixed(1),P=(...a)=>a.map(p=>f(p[0])+','+f(p[1])).join(' ');
const plate=(x,fill,st)=>`<polygon points="${P(S(x,0,60),S(x,90,60),S(x,90,190),S(x,0,190))}" fill="${fill}" stroke="${st}" stroke-width="1.5"/><polygon points="${P(S(x,0,190),S(x+6,0,190),S(x+6,90,190),S(x,90,190))}" fill="#E2E8F0" stroke="${st}"/><polygon points="${P(S(x,0,60),S(x+6,0,60),S(x+6,0,190),S(x,0,190))}" fill="#94A3B8" stroke="${st}"/>`;
const XL=150,XR=250,ZM=125,DM=45;
const T=(x,y,t,o)=>`<text x="${f(x)}" y="${f(y)}" ${o}>${t}</text>`;
let g=`<defs><linearGradient id="pp3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1F5F9"/><stop offset="1" stop-color="#94A3B8"/></linearGradient><marker id="pp3a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="var(--accent)"/></marker><marker id="pp3d" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#C2410C"/></marker></defs>`;
/* السلكان من جانبي اللوحين إلى مصدر الجهد */
const wL=S(XL,DM,ZM),wR=S(XR+6,DM,ZM);
g+=`<path d="M${f(wL[0])},${f(wL[1])} L${f(wL[0]-70)},${f(wL[1])} L${f(wL[0]-70)},300 L193,300" fill="none" stroke="#DC2626" stroke-width="2.4"/>`;
g+=plate(XL,'#FCA5A5','#B91C1C');
g+=`<polygon points="${P(S(XL+8,4,64),S(XR-2,4,64),S(XR-2,4,186),S(XL+8,4,186))}" fill="#BAE6FD" opacity=".35"/>`;
[80,115,150,175].forEach(z=>[20,50,80].forEach(d=>{const a=S(XL+8,d,z),b=S(XR-4,d,z);g+=`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="var(--accent)" stroke-width="1.6" marker-end="url(#pp3a)"/>`}));
g+=plate(XR,'url(#pp3)','#1D4ED8');
/* المساحة A مظللة على اللوح السالب */
g+=`<polygon points="${P(S(XR+6,8,68),S(XR+6,82,68),S(XR+6,82,182),S(XR+6,8,182))}" fill="none" stroke="#1D4ED8" stroke-width="1.4" stroke-dasharray="5 3"/>`;
[[XL,'+','#B91C1C',-1],[XR+6,'−','#1D4ED8',3]].forEach(([x,t,c,o])=>[80,120,160].forEach(z=>[25,65].forEach(d=>{const p=S(x,d,z);g+=T(p[0]+o,p[1]+4,t,`font-size="14" font-weight="900" fill="${c}" text-anchor="middle"`)})));
g+=`<path d="M${f(wR[0])},${f(wR[1])} L${f(wR[0]+60)},${f(wR[1])} L${f(wR[0]+60)},300 L213,300" fill="none" stroke="#2563EB" stroke-width="2.4"/>`;
g+=`<circle cx="${f(wL[0])}" cy="${f(wL[1])}" r="3.5" fill="#DC2626"/><circle cx="${f(wR[0])}" cy="${f(wR[1])}" r="3.5" fill="#2563EB"/>`;
/* مصدر الجهد */
g+=`<line x1="195" y1="286" x2="195" y2="314" stroke="var(--ink)" stroke-width="2.6"/><line x1="207" y1="292" x2="207" y2="308" stroke="var(--ink)" stroke-width="6"/>`+T(186,288,'+','class="lb" text-anchor="middle" style="fill:#DC2626"')+T(217,288,'−','class="lb" text-anchor="middle" style="fill:#2563EB"')+T(201,334,'V','class="lb" text-anchor="middle"')+T(201,352,'مصدر جهد مستمر','class="lb xs" text-anchor="middle"');
/* d */
{const a=S(XL+6,90,204),b=S(XR,90,204);g+=`<line x1="${f(S(XL+6,90,190)[0])}" y1="${f(S(XL+6,90,190)[1])}" x2="${f(a[0])}" y2="${f(a[1]-4)}" stroke="#C2410C" stroke-dasharray="3 2"/><line x1="${f(S(XR,90,190)[0])}" y1="${f(S(XR,90,190)[1])}" x2="${f(b[0])}" y2="${f(b[1]-4)}" stroke="#C2410C" stroke-dasharray="3 2"/><line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="#C2410C" stroke-width="1.8" marker-start="url(#pp3d)" marker-end="url(#pp3d)"/>`+T((a[0]+b[0])/2,a[1]-8,'d','class="lb" text-anchor="middle" style="fill:#C2410C"')}
/* الأسماء */
{const p=S(XR+6,82,140);g+=T(p[0]+10,p[1]+4,'A مساحة اللوح','class="lb xs" text-anchor="start" style="fill:#1D4ED8"')}
{const p=S(XL,0,190);g+=T(p[0]-8,p[1]+14,'اللوح الموجب +q','class="lb xs" text-anchor="end" style="fill:#B91C1C"')}
{const p=S(XR+6,0,60);g+=T(p[0]+70,p[1]+14,'اللوح السالب −q','class="lb xs" text-anchor="start" style="fill:#1D4ED8"')+`<line x1="${f(p[0]+68)}" y1="${f(p[1]+10)}" x2="${f(p[0]+4)}" y2="${f(p[1]-6)}" stroke="#1D4ED8"/>`}
{const p=S(XL,0,190);g+=T(p[0]-8,p[1]-6,'وسط عازل: هواء','class="lb xs" text-anchor="end" style="fill:#0369A1"')}
{const a=S(XL+10,-30,60),b=S(XR-4,-30,60);g+=`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="var(--accent)" stroke-width="4" marker-end="url(#pp3a)"/>`+T((a[0]+b[0])/2,a[1]-8,'E','class="lb" text-anchor="middle" style="fill:var(--accent);font-size:20px;font-weight:800" direction="ltr"')+T((a[0]+b[0])/2,a[1]+18,'خطوط المجال، واتجاهه','class="lb xs" text-anchor="middle" style="fill:var(--accent)"')+T((a[0]+b[0])/2,a[1]+34,'من الموجب إلى السالب','class="lb xs" text-anchor="middle" style="fill:var(--accent)"')}
g+=T(wL[0]-74,wL[1]-8,'سلك توصيل','class="lb xs" text-anchor="end"');
g+=T(445,230,'C = ε₀·A / d','class="lb ac" text-anchor="end" direction="ltr"')+T(445,254,'C = q / V','class="lb ac" text-anchor="end" direction="ltr"');
F.cap3D=`<figure class="fig"><svg viewBox="-10 -50 460 415" role="img" aria-label="مكثف ذو لوحين متوازيين ثلاثي الأبعاد موصل بمصدر جهد">${g}</svg><figcaption>المكثف ذو اللوحين المتوازيين موصل بمصدر جهد مستمر من جانبيه: اللوح الموجب يحمل +q والسالب −q، ومساحة كل لوح A، والمسافة بينهما d، وبينهما وسط عازل ومجال كهربائي منتظم E</figcaption></figure>`;
})();
/* رموز المقاومة في الدوائر الكهربائية وأنواع المقاومات ثلاثية الأبعاد (درس 4-5) */
(function(){
const F=window.FIGS=window.FIGS||{};
const svg=(vb,body,cap)=>`<figure class="fig"><svg viewBox="${vb}" role="img" aria-label="${cap}">${body}</svg><figcaption>${cap}</figcaption></figure>`;
const T=(x,y,s,o='')=>`<text x="${x}" y="${y}" text-anchor="middle" ${o}>${s}</text>`;
const W='stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"';
const wires=(x,y,h)=>`<line x1="${x-62}" y1="${y}" x2="${x-h}" y2="${y}" ${W}/><line x1="${x+h}" y1="${y}" x2="${x+62}" y2="${y}" ${W}/>`;
const zig=(x,y)=>wires(x,y,30)+`<polyline points="${x-30},${y} ${x-25},${y-12} ${x-15},${y+12} ${x-5},${y-12} ${x+5},${y+12} ${x+15},${y-12} ${x+25},${y+12} ${x+30},${y}" ${W}/>`;
const box=(x,y)=>wires(x,y,30)+`<rect x="${x-30}" y="${y-12}" width="60" height="24" rx="2" ${W}/>`;
const arrowM=`<defs><marker id="rsA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#F7931E"/></marker></defs>`;
const vr=(x,y)=>zig(x,y)+`<line x1="${x-28}" y1="${y+26}" x2="${x+28}" y2="${y-26}" stroke="#F7931E" stroke-width="3" marker-end="url(#rsA)"/>`;
const pot=(x,y)=>zig(x,y)+`<line x1="${x}" y1="${y+42}" x2="${x}" y2="${y+16}" stroke="#F7931E" stroke-width="3" marker-end="url(#rsA)"/>`;
const ldr=(x,y)=>zig(x,y)+[-14,4].map(d=>`<line x1="${x+d-14}" y1="${y-44}" x2="${x+d}" y2="${y-20}" stroke="#F7931E" stroke-width="2.6" marker-end="url(#rsA)"/>`).join('');
const thm=(x,y)=>box(x,y)+`<polyline points="${x-30},${y+22} ${x-18},${y+22} ${x+22},${y-22}" stroke="#F7931E" stroke-width="2.6" fill="none"/><text x="${x+28}" y="${y-22}" font-size="13" font-weight="800" fill="#F7931E" direction="ltr">t°</text>`;
const cellS=(fn,x,y,a,b)=>fn(x,y)+T(x,y+60,a,'class="lb sm"')+T(x,y+79,b,'class="lb xs"');
F.resSymbols=svg('0 0 480 300',arrowM
 +cellS(zig,80,60,'مقاومة ثابتة','الرمز المتعرج')+cellS(box,240,60,'مقاومة ثابتة','الرمز الدولي (مستطيل)')+cellS(vr,400,60,'مقاومة متغيرة','(ريوستات) سهم مائل')
 +cellS(pot,80,200,'مجزئ الجهد','(بوتنشيوميتر) ثلاثة أطراف')+cellS(ldr,240,200,'مقاومة ضوئية','تقل مقاومتها بالضوء')+cellS(thm,400,200,'مقاومة حرارية','تتغير مقاومتها بالحرارة'),
 'رموز المقاومة في الدوائر الكهربائية');
/* الأنواع ثلاثية الأبعاد */
const C=['#111827','#7C2D12','#DC2626','#EA580C','#EAB308','#16A34A','#2563EB','#7C3AED','#6B7280','#F9FAFB'],G='#D4AF37';
const leg=(x1,y1,x2,y2)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#9CA3AF" stroke-width="3" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E5E7EB" stroke-width="1.2" stroke-linecap="round"/>`;
const grad=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".45" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const defs=`<defs>${grad('rtC','#FDE7C3','#E8C48E','#A87B3E')}${grad('rtM','#BFDBFE','#60A5FA','#1E40AF')}${grad('rtW','#FFFFFF','#E5E7EB','#9CA3AF')}${grad('rtP','#94A3B8','#475569','#1E293B')}${grad('rtB','#FDE68A','#F59E0B','#92400E')}${grad('rtK','#4B5563','#1F2937','#030712')}${grad('rtG','#86EFAC','#22C55E','#14532D')}<radialGradient id="rtL" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FEF3C7"/><stop offset=".6" stop-color="#F59E0B"/><stop offset="1" stop-color="#78350F"/></radialGradient></defs>`;
/* أسطوانة ممددة بحلقات (كربونية أو معدنية) */
const cyl=(x,y,fill,bands)=>leg(x-62,y,x-38,y)+leg(x+38,y,x+62,y)+leg(x-62,y,x-62,y+40)+leg(x+62,y,x+62,y+40)
 +`<rect x="${x-40}" y="${y-13}" width="80" height="26" rx="13" fill="url(#${fill})" stroke="#334155"/>`
 +bands.map((c,i)=>`<rect x="${x-26+i*11+(i===bands.length-1?10:0)}" y="${y-13}" width="6" height="26" fill="${c}" opacity=".95"/>`).join('')
 +`<rect x="${x-34}" y="${y-9}" width="68" height="5" rx="2.5" fill="#fff" opacity=".35"/>`;
const carbon=(x,y)=>cyl(x,y,'rtC',[C[1],C[0],C[2],G]);
const metal=(x,y)=>cyl(x,y,'rtM',[C[1],C[0],C[0],C[1],C[1]]);
const wound=(x,y)=>leg(x-62,y+4,x-46,y+4)+leg(x+46,y+4,x+62,y+4)+leg(x-62,y+4,x-62,y+40)+leg(x+62,y+4,x+62,y+40)
 +`<polygon points="${x-46},${y-10} ${x+38},${y-10} ${x+48},${y-20} ${x-36},${y-20}" fill="#F3F4F6" stroke="#475569"/><polygon points="${x+38},${y-10} ${x+48},${y-20} ${x+48},${y+8} ${x+38},${y+18}" fill="#D1D5DB" stroke="#475569"/><rect x="${x-46}" y="${y-10}" width="84" height="28" fill="url(#rtW)" stroke="#475569"/>`
 +`<text x="${x-4}" y="${y+9}" font-size="11" font-weight="800" fill="#334155" text-anchor="middle" direction="ltr">5W 10Ω</text>`;
const pot3=(x,y)=>[-14,0,14].map(d=>leg(x+d,y+16,x+d,y+44)).join('')
 +`<rect x="${x-26}" y="${y-6}" width="52" height="22" rx="4" fill="url(#rtG)" stroke="#14532D"/><ellipse cx="${x}" cy="${y-6}" rx="26" ry="9" fill="#4ADE80" stroke="#14532D"/>`
 +`<rect x="${x-7}" y="${y-36}" width="14" height="30" fill="url(#rtP)"/><ellipse cx="${x}" cy="${y-36}" rx="7" ry="3" fill="#CBD5E1" stroke="#334155"/><line x1="${x}" y1="${y-34}" x2="${x}" y2="${y-24}" stroke="#F7931E" stroke-width="2"/>`;
const trim=(x,y)=>[-12,0,12].map(d=>leg(x+d,y+16,x+d,y+44)).join('')
 +`<polygon points="${x-22},${y-6} ${x+14},${y-6} ${x+22},${y-14} ${x-14},${y-14}" fill="#60A5FA" stroke="#1E3A8A"/><polygon points="${x+14},${y-6} ${x+22},${y-14} ${x+22},${y+8} ${x+14},${y+16}" fill="#1D4ED8" stroke="#1E3A8A"/><rect x="${x-22}" y="${y-6}" width="36" height="22" fill="#3B82F6" stroke="#1E3A8A"/>`
 +`<ellipse cx="${x}" cy="${y-10}" rx="8" ry="3.4" fill="#F9FAFB" stroke="#334155"/><line x1="${x-5}" y1="${y-10}" x2="${x+5}" y2="${y-10}" stroke="#F7931E" stroke-width="2"/>`;
const ldr3=(x,y)=>leg(x-8,y+14,x-8,y+46)+leg(x+8,y+14,x+8,y+46)
 +`<ellipse cx="${x}" cy="${y+6}" rx="24" ry="9" fill="#78350F"/><ellipse cx="${x}" cy="${y}" rx="24" ry="9" fill="url(#rtL)" stroke="#78350F"/>`
 +`<path d="M${x-16},${y-2} h8 v4 h8 v-4 h8 v4 h8" fill="none" stroke="#7C2D12" stroke-width="1.6"/>`
 +[-10,8].map(d=>`<line x1="${x+d-12}" y1="${y-36}" x2="${x+d}" y2="${y-14}" stroke="#F7931E" stroke-width="2.4"/><polygon points="${x+d},${y-12} ${x+d-6},${y-18} ${x+d+1},${y-20}" fill="#F7931E"/>`).join('');
const thm3=(x,y)=>leg(x-6,y+10,x-8,y+46)+leg(x+6,y+10,x+8,y+46)
 +`<ellipse cx="${x}" cy="${y-4}" rx="15" ry="17" fill="url(#rtB)" stroke="#78350F"/><ellipse cx="${x-5}" cy="${y-10}" rx="5" ry="6" fill="#FEF3C7" opacity=".6"/><text x="${x}" y="${y+1}" font-size="9" font-weight="800" fill="#78350F" text-anchor="middle" direction="ltr">NTC</text>`;
const smd=(x,y)=>`<polygon points="${x-30},${y+6} ${x+22},${y+6} ${x+32},${y-4} ${x-20},${y-4}" fill="#374151" stroke="#111827"/><polygon points="${x+22},${y+6} ${x+32},${y-4} ${x+32},${y+8} ${x+22},${y+18}" fill="#111827"/><rect x="${x-30}" y="${y+6}" width="52" height="12" fill="url(#rtK)" stroke="#111827"/>`
 +`<rect x="${x-30}" y="${y+5}" width="10" height="14" fill="#D1D5DB" stroke="#6B7280"/><rect x="${x+12}" y="${y+5}" width="10" height="14" fill="#D1D5DB" stroke="#6B7280"/><text x="${x+1}" y="${y+4}" font-size="9" font-weight="800" fill="#F9FAFB" text-anchor="middle" direction="ltr">103</text>`;
const cell=(fn,x,y,a,b)=>fn(x,y)+T(x,y+72,a,'class="lb sm"')+T(x,y+90,b,'class="lb xs"');
F.resTypes=svg('0 0 480 490',defs
 +cell(carbon,80,50,'كربونية','رخيصة · قيمتها بالألوان')+cell(metal,240,50,'غشاء معدني','دقيقة · 5 حلقات')+cell(wound,400,50,'سلكية','تتحمل قدرة كبيرة')
 +cell(pot3,80,210,'مجزئ جهد','(بوتنشيوميتر) بمقبض')+cell(trim,240,210,'متغيرة للضبط','(تريمر) بمفك')+cell(ldr3,400,210,'ضوئية LDR','تقل مقاومتها بالضوء')
 +cell(thm3,160,380,'حرارية (ثرمستور)','تتغير مقاومتها بالحرارة')+cell(smd,320,385,'سطحية SMD','صغيرة جدا · تلحم على اللوحة'),
 'أنواع المقاومات الشائعة');
})();
