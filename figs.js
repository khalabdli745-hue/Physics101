/* رسوم توضيحية أصلية (SVG) — الألوان من متغيرات CSS لتعمل في الوضعين الفاتح والداكن */
(function(){
const A=(id,c)=>`<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${c}"/></marker>`;
const defs=`<defs>${A('ah','var(--ink)')}${A('aa','var(--accent)')}${A('ab','var(--fig2)')}${A('am','var(--muted)')}</defs>`;
const svg=(vb,body,cap)=>`<figure class="fig"><svg viewBox="${vb}" role="img" aria-label="${cap}">${defs}${body}</svg><figcaption>${cap}</figcaption></figure>`;
const T=(x,y,s,o='')=>{if(/[\u0600-\u06FF]/.test(s)&&!/text-anchor/.test(o))o+=' text-anchor="end"';return `<text x="${x}" y="${y}" ${o}>${s}</text>`};
const L=(x1,y1,x2,y2,c='var(--ink)',m='ah',w=2.5,d='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${m?`marker-end="url(#${m})"`:''} ${d?`stroke-dasharray="${d}"`:''}/>`;
window.FIGS={
vecAdd:svg('0 0 360 200',
 L(40,170,190,170,'var(--fig2)','ab')+L(40,170,110,60,'var(--fig2)','ab')+
 L(190,170,260,60,'var(--muted)',null,1.5,'5 4')+L(110,60,260,60,'var(--muted)',null,1.5,'5 4')+
 L(40,170,256,64,'var(--accent)','aa',3)+
 `<path d="M70,170 A30,30 0 0 0 56,145" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`+
 T(118,190,'A','class="lb"')+T(58,110,'B','class="lb"')+T(160,105,'C = A + B','class="lb ac"')+T(74,160,'θ','class="lb sm"'),
 'جمع متجهين «ذيل على ذيل»: المحصلة C قطر متوازي الأضلاع'),
vecComp:svg('0 0 360 210',
 L(40,180,330,180,'var(--muted)','am',1.5)+L(40,180,40,20,'var(--muted)','am',1.5)+
 L(40,180,240,60,'var(--accent)','aa',3)+L(40,180,240,180,'var(--fig2)','ab',2.5)+L(240,180,240,60,'var(--fig2)','ab',2.5)+
 `<path d="M85,180 A45,45 0 0 0 79,157" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`+
 T(130,108,'A','class="lb ac"')+T(110,200,'Ax = A·cos θ','class="lb sm"')+T(248,125,'Ay = A·sin θ','class="lb sm"')+T(92,172,'θ','class="lb sm"')+T(322,198,'x','class="lb sm"')+T(28,26,'y','class="lb sm"'),
 'تحليل المتجه A إلى مركبتين سينية وصادية'),
unitVec:svg('0 0 300 210',
 L(150,140,270,140,'var(--muted)','am',1.2)+L(150,140,150,20,'var(--muted)','am',1.2)+L(150,140,70,200,'var(--muted)','am',1.2)+
 L(150,140,205,140,'var(--accent)','aa',3)+L(150,140,150,85,'var(--accent)','aa',3)+L(150,140,112,170,'var(--accent)','aa',3)+
 T(196,160,'î','class="lb ac"')+T(158,94,'ĵ','class="lb ac"')+T(96,170,'k̂','class="lb ac"')+T(272,146,'x','class="lb sm"')+T(156,24,'y','class="lb sm"')+T(60,204,'z','class="lb sm"')+
 T(150,22,'','')+T(212,40,'î × ĵ = k̂','class="lb sm"')+T(212,62,'î · î = 1','class="lb sm"'),
 'متجهات الوحدة على المحاور الثلاثة (مقدار كل منها = 1)'),
disp:svg('0 0 380 170',
 L(330,60,60,60,'var(--fig2)','ab',2.5)+L(60,90,140,90,'var(--fig2)','ab',2.5)+L(330,130,145,130,'var(--accent)','aa',3)+
 `<circle cx="330" cy="60" r="5" fill="var(--ink)"/><circle cx="330" cy="130" r="5" fill="var(--ink)"/><circle cx="145" cy="130" r="5" fill="var(--ink)"/>`+
 T(338,64,'A','class="lb sm"')+T(48,64,'B','class="lb sm"')+T(150,94,'C','class="lb sm"')+
 T(195,52,'6 كم غربًا','class="lb sm" text-anchor="middle"')+T(100,110,'2 كم شرقًا','class="lb sm" text-anchor="middle"')+
 T(238,155,'الإزاحة = 4 كم غربًا','class="lb sm ac" text-anchor="middle"')+T(190,24,'المسافة = 6 + 2 = 8 كم','class="lb sm" text-anchor="middle"'),
 'المسافة طول المسار كله، والإزاحة من البداية إلى النهاية مباشرة'),
fbd:svg('0 0 360 220',
 `<line x1="20" y1="160" x2="340" y2="160" stroke="var(--muted)" stroke-width="2"/>`+
 `<rect x="130" y="100" width="100" height="60" rx="4" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/>`+
 L(230,130,320,130,'var(--accent)','aa',3)+L(130,130,60,130,'var(--warnc)','aa',3)+L(180,100,180,30,'var(--fig2)','ab',2.5)+L(180,160,180,210,'var(--fig2)','ab',2.5)+
 T(300,120,'F','class="lb ac"')+T(70,120,'f = μN','class="lb sm wr"')+T(188,44,'N','class="lb"')+T(188,206,'W = mg','class="lb sm"')+T(330,190,'اتجاه الحركة ←','class="lb sm"'),
 'مخطط القوى: القوة المؤثرة F، والاحتكاك f عكسها، والوزن W، ورد الفعل العمودي N'),
workAngle:svg('0 0 360 200',
 `<line x1="20" y1="160" x2="340" y2="160" stroke="var(--muted)" stroke-width="2"/>`+
 `<rect x="90" y="110" width="80" height="50" rx="4" fill="var(--soft)" stroke="var(--ink)" stroke-width="2"/>`+
 L(170,135,280,55,'var(--accent)','aa',3)+L(170,135,280,135,'var(--fig2)','ab',2,'6 4')+L(280,135,280,55,'var(--muted)',null,1.5,'4 4')+
 `<path d="M215,135 A45,45 0 0 0 206,109" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`+
 T(238,80,'F','class="lb ac"')+T(196,128,'θ','class="lb sm"')+T(196,154,'F·cos θ','class="lb sm"')+L(90,185,250,185,'var(--ink)','ah',1.5)+T(170,180,'x','class="lb sm" text-anchor="middle"'),
 'الشغل W = F·x·cos θ: المركبة الموازية للحركة فقط تبذل شغلًا'),
energyDrop:svg('0 0 360 230',
 `<line x1="20" y1="210" x2="200" y2="210" stroke="var(--muted)" stroke-width="2"/>`+L(110,40,110,190,'var(--muted)','am',1.2,'5 4')+
 `<circle cx="110" cy="30" r="12" fill="var(--accent)"/><circle cx="110" cy="115" r="12" fill="var(--accent)" opacity=".55"/><circle cx="110" cy="196" r="12" fill="var(--accent)" opacity=".3"/>`+
 T(30,34,'h','class="lb sm"')+
 `<g transform="translate(225,20)"><text x="0" y="0" class="lb sm">الأعلى</text><rect x="0" y="8" width="100" height="12" fill="var(--fig2)"/><text x="0" y="78" class="lb sm">المنتصف</text><rect x="0" y="86" width="50" height="12" fill="var(--fig2)"/><rect x="50" y="86" width="50" height="12" fill="var(--accent)"/><text x="0" y="158" class="lb sm">الأرض</text><rect x="0" y="166" width="100" height="12" fill="var(--accent)"/><text x="0" y="200" class="lb sm">PE</text><rect x="22" y="192" width="10" height="10" fill="var(--fig2)"/><text x="45" y="200" class="lb sm">KE</text><rect x="68" y="192" width="10" height="10" fill="var(--accent)"/></g>`,
 'حفظ الطاقة أثناء السقوط: طاقة الوضع PE تتحول إلى طاقة حركية KE ومجموعهما ثابت'),
thermo:svg('0 0 360 230',
 [['المئوي',60,'100°C','0°C'],['الكلفن',180,'373 K','273 K'],['فهرنهايت',300,'212°F','32°F']].map(([n,x,hi,lo])=>
 `<rect x="${x-9}" y="30" width="18" height="150" rx="9" fill="none" stroke="var(--ink)" stroke-width="2"/><circle cx="${x}" cy="190" r="15" fill="var(--warnc)"/><rect x="${x-4}" y="110" width="8" height="75" fill="var(--warnc)"/>`+
 `<line x1="${x-16}" y1="50" x2="${x+16}" y2="50" stroke="var(--accent)" stroke-width="2"/><line x1="${x-16}" y1="160" x2="${x+16}" y2="160" stroke="var(--fig2)" stroke-width="2"/>`+
 T(x,22,hi,'class="lb sm" text-anchor="middle"')+T(x+20,165,lo,'class="lb sm"')+T(x,224,n,'class="lb sm" text-anchor="middle"')).join('')+
 T(4,54,'غليان','class="lb sm ac" text-anchor="start"')+T(4,164,'تجمد','class="lb sm" text-anchor="start"'),
 'نقطتا تجمد الماء وغليانه على المقاييس الثلاثة'),
heat3:svg('0 0 380 200',
 `<g><rect x="20" y="80" width="100" height="14" fill="var(--soft)" stroke="var(--ink)"/><path d="M10,110 q10,-15 0,-30 q10,15 20,0 q-5,20 -20,30" fill="var(--warnc)"/>`+L(30,70,110,70,'var(--warnc)','aa',2)+T(70,140,'التوصيل','class="lb sm" text-anchor="middle"')+T(70,160,'خلال المادة','class="lb xs" text-anchor="middle"')+`</g>`+
 `<g><rect x="145" y="40" width="90" height="80" rx="4" fill="none" stroke="var(--ink)" stroke-width="2"/><path d="M175,110 C160,90 160,60 175,50" fill="none" stroke="var(--warnc)" stroke-width="2.5" marker-end="url(#aa)"/><path d="M205,50 C220,60 220,90 205,110" fill="none" stroke="var(--fig2)" stroke-width="2.5" marker-end="url(#ab)"/><path d="M180,135 q10,-15 0,-25 q12,10 20,0 q-4,18 -20,25" fill="var(--warnc)"/>`+T(190,160,'الحمل','class="lb sm" text-anchor="middle"')+T(190,180,'تيارات في المائع','class="lb xs" text-anchor="middle"')+`</g>`+
 `<g><circle cx="290" cy="70" r="20" fill="var(--warnc)"/>${[0,1,2].map(i=>`<path d="M${318},${55+i*15} q8,-6 16,0 q8,6 16,0 q8,-6 16,0" fill="none" stroke="var(--warnc)" stroke-width="2"/>`).join('')}`+T(320,140,'الإشعاع','class="lb sm" text-anchor="middle"')+T(320,160,'موجات بلا وسط','class="lb xs" text-anchor="middle"')+`</g>`,
 'طرق انتقال الحرارة الثلاث'),
coulomb:svg('0 0 360 150',
 `<circle cx="110" cy="70" r="22" fill="var(--warnc)"/><circle cx="250" cy="70" r="22" fill="var(--fig2)"/>`+T(110,78,'+','class="lb ch" text-anchor="middle"')+T(250,78,'+','class="lb ch" text-anchor="middle"')+
 L(88,70,30,70,'var(--accent)','aa',3)+L(272,70,330,70,'var(--accent)','aa',3)+L(110,115,250,115,'var(--ink)','ah',1.5)+L(250,115,110,115,'var(--ink)','ah',1.5)+
 T(180,108,'r','class="lb sm" text-anchor="middle"')+T(40,58,'F','class="lb ac"')+T(312,58,'F','class="lb ac"')+T(110,40,'q₁','class="lb sm" text-anchor="middle"')+T(250,40,'q₂','class="lb sm" text-anchor="middle"')+T(180,142,'F = k·q₁·q₂ / r²','class="lb sm" text-anchor="middle"'),
 'قانون كولوم: شحنتان متشابهتان تتنافران بقوتين متساويتين متعاكستين'),
field:svg('0 0 380 200',
 `<circle cx="100" cy="100" r="16" fill="var(--warnc)"/>`+T(100,107,'+','class="lb ch" text-anchor="middle"')+
 [0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return L(100+20*Math.cos(r),100+20*Math.sin(r),100+70*Math.cos(r),100+70*Math.sin(r),'var(--accent)','aa',2)}).join('')+
 `<circle cx="280" cy="100" r="16" fill="var(--fig2)"/>`+T(280,106,'−','class="lb ch" text-anchor="middle"')+
 [0,45,90,135,180,225,270,315].map(a=>{const r=a*Math.PI/180;return L(280+75*Math.cos(r),100+75*Math.sin(r),280+24*Math.cos(r),100+24*Math.sin(r),'var(--accent)','aa',2)}).join('')+
 T(100,196,'تخرج من الموجبة','class="lb xs" text-anchor="middle"')+T(280,196,'تدخل في السالبة','class="lb xs" text-anchor="middle"'),
 'خطوط المجال الكهربائي حول شحنة موجبة وأخرى سالبة'),
cap:svg('0 0 360 200',
 `<rect x="110" y="30" width="10" height="140" fill="var(--warnc)"/><rect x="240" y="30" width="10" height="140" fill="var(--fig2)"/>`+
 [50,80,110,140].map(y=>L(124,y,234,y,'var(--accent)','aa',2)).join('')+
 [40,70,100,130,160].map(y=>T(96,y+5,'+','class="lb sm"')+T(256,y+5,'−','class="lb sm"')).join('')+
 L(120,186,240,186,'var(--ink)','ah',1.5)+L(240,186,120,186,'var(--ink)','ah',1.5)+T(180,182,'d','class="lb sm" text-anchor="middle"')+
 T(180,24,'E منتظم','class="lb sm ac" text-anchor="middle"')+T(300,100,'C = ε₀A/d','class="lb sm"')+T(300,122,'V = E·d','class="lb sm"'),
 'المكثف ذو اللوحين المتوازيين: المجال بين اللوحين منتظم'),
capSP:svg('0 0 380 190',
 `<g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M20,60 H70 M70,40 V80 M80,40 V80 M80,60 H140 M140,40 V80 M150,40 V80 M150,60 H180"/>`+
 `<path d="M210,40 H240 V20 H290 M240,40 V60 H290 M290,10 V30 M300,10 V30 M290,50 V70 M300,50 V70 M300,20 H340 V60 H300 M340,40 H370"/></g>`+
 T(75,105,'C₁','class="lb sm" text-anchor="middle"')+T(145,105,'C₂','class="lb sm" text-anchor="middle"')+T(100,135,'توالي: الشحنة واحدة','class="lb xs" text-anchor="middle"')+T(100,160,'1/C = 1/C₁ + 1/C₂','class="lb sm" text-anchor="middle"')+
 T(318,24,'C₁','class="lb xs"')+T(318,68,'C₂','class="lb xs"')+T(290,135,'توازي: الجهد واحد','class="lb xs" text-anchor="middle"')+T(290,160,'C = C₁ + C₂','class="lb sm" text-anchor="middle"'),
 'توصيل المكثفات على التوالي وعلى التوازي'),
ohm:svg('0 0 340 220',
 L(50,190,320,190,'var(--ink)','ah',1.5)+L(50,190,50,20,'var(--ink)','ah',1.5)+L(50,190,290,40,'var(--accent)',null,3)+
 L(170,115,250,115,'var(--muted)',null,1.2,'4 4')+L(250,115,250,65,'var(--muted)',null,1.2,'4 4')+
 T(306,210,'I (A)','class="lb sm"')+T(56,30,'V (V)','class="lb sm"')+T(256,96,'ΔV','class="lb xs"')+T(200,132,'ΔI','class="lb xs"')+T(150,60,'الميل = R','class="lb sm ac"'),
 'قانون أوم: العلاقة بين الجهد والتيار خط مستقيم ميله المقاومة'),
resSP:svg('0 0 380 200',
 `<g fill="none" stroke="var(--ink)" stroke-width="2"><path d="M15,60 H40 l6,-10 l10,20 l10,-20 l10,20 l10,-20 l6,10 H120 l6,-10 l10,20 l10,-20 l10,20 l10,-20 l6,10 H190"/>`+
 `<path d="M210,60 H235 V30 H260 l6,-10 l10,20 l10,-20 l10,20 l10,-20 l6,10 H340 V90 H312 l-6,10 l-10,-20 l-10,20 l-10,-20 l-10,20 l-6,-10 H235 V60 M340,60 H370"/></g>`+
 T(68,95,'R₁','class="lb sm" text-anchor="middle"')+T(148,95,'R₂','class="lb sm" text-anchor="middle"')+T(100,135,'توالي: التيار واحد','class="lb xs" text-anchor="middle"')+T(100,160,'R = R₁ + R₂','class="lb sm" text-anchor="middle"')+
 T(286,15,'R₁','class="lb xs" text-anchor="middle"')+T(286,118,'R₂','class="lb xs" text-anchor="middle"')+T(290,145,'توازي: الجهد واحد','class="lb xs" text-anchor="middle"')+T(290,170,'R = R₁R₂ / (R₁ + R₂)','class="lb sm" text-anchor="middle"'),
 'توصيل المقاومات على التوالي وعلى التوازي')
};
})();
