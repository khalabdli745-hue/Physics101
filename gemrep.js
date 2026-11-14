/* gemrep.js — المدرب 14 نوفمبر 23:48: معاينة صوت Gemini (Iapetus عبر Replicate، code.gs 60 action rtts) داخل الدروس للمدرب فقط.
   تعمل فقط إذا فعّلها المدرب من صفحة gemtest.html (p101-grep=1) وكان داخلا بحساب المدرب (لا متدرب ولا حساب التجربة).
   النص: الجملة الأصلية قبل تعديلات نطق Azure، بلا تشكيل، ثم قاموس الرموز والأعداد والوحدات (قواعد المدرب 14 نوفمبر)، ثم تصحيحات الكلمات GFIX.
   أي فشل يرجع لصوت حامد كما هو. المتدربون لا يتأثرون. */
(function(){
'use strict';
var D=/[ً-ْٰ]/g;
/* ---------- الأعداد ---------- */
var ONES=['صفر','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة','أحد عشر','اثنا عشر','ثلاثة عشر','أربعة عشر','خمسة عشر','ستة عشر','سبعة عشر','ثمانية عشر','تسعة عشر'];
var TENS={20:'عشرون',30:'ثلاثون',40:'أربعون',50:'خمسون',60:'ستون',70:'سبعون',80:'ثمانون',90:'تسعون'};
var HUN={1:'مئة',2:'مئتان',3:'ثلاث مئة',4:'أربع مئة',5:'خمس مئة',6:'ست مئة',7:'سبع مئة',8:'ثماني مئة',9:'تسع مئة'};
function n99(n){if(n<20)return ONES[n];var t=Math.floor(n/10)*10,o=n%10;return o?ONES[o]+' و'+TENS[t]:TENS[t]}
function n999(n){var h=Math.floor(n/100),r=n%100,p=[];if(h)p.push(HUN[h]);if(r)p.push(n99(r));return p.length?p.join(' و'):'صفر'}
function num(n){n=parseInt(n,10);if(n<1000)return n999(n);var th=Math.floor(n/1000),r=n%1000;var T=th===1?'ألف':th===2?'ألفان':(n999(th)+(th>=3&&th<=10?' آلاف':' ألف'));return T+(r?' و'+n999(r):'')}
function numtxt(s){s=String(s).replace('٫','.');if(s.indexOf('.')>=0){var a=s.split('.'),b=a[1],bs=b.replace(/^0+/,''),z=b.length-bs.length;var zs=[];for(var i=0;i<z;i++)zs.push('صفر');return num(a[0])+' فاصلة '+zs.join(' ')+(z&&bs?' ':'')+(bs?num(bs):'')}return num(s)}
/* ---------- العدد مع المعدود ---------- */
var AU={'متر':['متر','أمتار','مترا','متران',0],'سنتيمتر':['سنتيمتر','سنتيمترات','سنتيمترا','سنتيمتران',0],'كيلومتر':['كيلومتر','كيلومترات','كيلومترا','كيلومتران',0],'مليمتر':['مليمتر','مليمترات','مليمترا','مليمتران',0],'كيلوجرام':['كيلوجرام','كيلوجرامات','كيلوجراما','كيلوجرامان',0],'جرام':['جرام','جرامات','جراما','جرامان',0],'مليجرام':['مليجرام','مليجرامات','مليجراما','مليجرامان',0],'ثانية':['ثانية','ثوان','ثانية','ثانيتان',1],'ساعة':['ساعة','ساعات','ساعة','ساعتان',1],'أمبير':['أمبير','أمبيرات','أمبيرا','أمبيران',0],'لتر':['لتر','لترات','لترا','لتران',0],'واط':['واط','واطات','واطا','واطان',0],'كلفن':['كلفن','كلفن','كلفن','كلفن',0],'نيوتن':['نيوتن','نيوتن','نيوتن','نيوتن',0],'جول':['جول','جول','جول','جول',0],'مول':['مول','مولات','مولا','مولان',0],'كانديلا':['كانديلا','كانديلا','كانديلا','كانديلا',1],'أوم':['أوم','أوم','أوم','أوم',0]};
var ADJ={'مربع':['مربع','مربعة','مربعا','مربعان'],'مكعب':['مكعب','مكعبة','مكعبا','مكعبان']};
var M1=['','واحد','اثنان','ثلاثة','أربعة','خمسة','ستة','سبعة','ثمانية','تسعة','عشرة'],F1=['','واحدة','اثنتان','ثلاث','أربع','خمس','ست','سبع','ثماني','تسع','عشر'];
var TN={2:'عشرون',3:'ثلاثون',4:'أربعون',5:'خمسون',6:'ستون',7:'سبعون',8:'ثمانون',9:'تسعون'};
function cnt(n,fem){if(n<=10)return n>=3?(fem?F1:M1)[n]:null;if(n===11)return fem?'إحدى عشرة':'أحد عشر';if(n===12)return fem?'اثنتا عشرة':'اثنا عشر';if(n<20)return (fem?F1:M1)[n-10]+(fem?' عشرة':' عشر');var t=Math.floor(n/10),o=n%10;if(!o)return TN[t];var oo=o===1?(fem?'إحدى':'واحد'):o===2?(fem?'اثنتان':'اثنان'):(fem?F1:M1)[o];return oo+' و'+TN[t]}
function big(n){var th=Math.floor(n/1000),r=n%1000,h=Math.floor(r/100),r2=r%100,p=[];if(th)p.push(th===1?'ألف':th===2?'ألفان':(th<=10?M1[th]+' آلاف':th+' ألف'));if(h)p.push(HUN[h]);return [p,r2]}
function sayN(n,unit,adj){var U=AU[unit],s=U[0],pl=U[1],acc=U[2],du=U[3],fem=U[4],A=ADJ[adj||''];
  if(n===0)return 'صفر '+s+(A?' '+A[0]:'');if(n===1)return s+(A?' '+A[0]:'')+' '+(fem?'واحدة':'واحد');if(n===2)return du+(A?' '+A[3]:'');
  var p=[],r=n;if(n>=100){var b=big(n);p=b[0];r=b[1]}
  if(r===0){p=p.slice(0,-1).concat([p[p.length-1].replace('مئتان','مئتا').replace('ألفان','ألفا')]);return p.join(' و')+' '+s+(A?' '+A[0]:'')}
  if(r===1&&p.length)return p.join(' و')+' '+s+(A?' '+A[0]:'')+' و'+(fem?'واحدة':'واحد');
  if(r===2&&p.length)return p.concat([fem?'اثنتان':'اثنان']).join(' و')+' '+acc+(A?' '+A[2]:'');
  var w=cnt(r,fem),noun=r<=10?pl+(A?' '+A[1]:''):acc+(A?' '+A[2]:'');return p.concat([w]).join(' و')+' '+noun}
/* ---------- الرموز والوحدات ---------- */
var SUP={'⁻':'-','⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9'};
var UNIT={m:'متر',cm:'سنتيمتر',km:'كيلومتر',mm:'مليمتر',kg:'كيلوجرام',g:'جرام',mg:'مليجرام',s:'ثانية',h:'ساعة',A:'أمبير',K:'كلفن',cd:'كانديلا',mol:'مول',N:'نيوتن',J:'جول',L:'لتر',W:'واط',V:'فولت',C:'كولوم',Pa:'باسكال',psi:'بي إس آي',bar:'بار','Ω':'أوم','kΩ':'كيلو أوم','MΩ':'ميجا أوم','μF':'ميكروفاراد',nF:'نانوفاراد',pF:'بيكوفاراد','μC':'ميكروكولوم',nC:'نانوكولوم',mA:'ملي أمبير',mV:'ملي فولت',kV:'كيلو فولت'};/* أوم15: المدرب 15 نوفمبر (أ): Ω «أوم» بلا جمع */
var POW={'2':'مربع','3':'مكعب'};
var LET={a:'إيه',b:'بي',c:'سي',d:'دي',e:'إي',f:'إف',g:'جي',h:'إتش',i:'آي',j:'جيه',k:'كيه',l:'إل',m:'إم',n:'إن',o:'أو',p:'بي',q:'كيو',r:'آر',s:'إس',t:'تي',u:'يو',v:'في',w:'دبليو',x:'إكس',y:'واي',z:'زد','ρ':'رو','θ':'ثيتا','Δ':'دلتا','μ':'ميو','ω':'أوميجا','π':'باي','λ':'لامدا','ε':'إبسلون'};
function has(o,k){return Object.prototype.hasOwnProperty.call(o,k)}
function unit1(u){var m=/^([A-Za-zΩμ]+)(\^?-?\d)?$/.exec(u);if(!m||!has(UNIT,m[1]))return null;var w=UNIT[m[1]],p=(m[2]||'').replace(/^\^/,'');if(has(POW,p))w+=' '+POW[p];else if(p)w+=' أس '+(p.charAt(0)==='-'?'سالب '+num(p.slice(1)):num(p));return w}
function unit(u){var i=u.indexOf('/'),nu=i<0?u:u.slice(0,i),den=i<0?'':u.slice(i+1);var parts=nu.split('·').map(unit1);if(parts.indexOf(null)>=0)return null;var out=parts.join(' ');if(den){var d=unit1(den);if(d===null)return null;out+=' لكل '+d.replace(' مربع',' تربيع')}return out}
function sym(v){v=v.replace(/\(([a-z]+)\)/g,' $1');return v.split('').filter(function(c){return c.trim()}).map(function(c){var l=c.toLowerCase();return has(LET,l)?LET[l]:(has(LET,c)?LET[c]:c)}).join(' ')}
var ORD=['','أولا','ثانيا','ثالثا','رابعا','خامسا','سادسا','سابعا','ثامنا','تاسعا','عاشرا'];
var OBLT={'اثنان':'اثنين','اثنتان':'اثنتين','اثنا':'اثني','اثنتا':'اثنتي','مئتان':'مئتين','ألفان':'ألفين','مئتا':'مئتي','ألفا':'ألفي','ومئتا':'ومئتي','ومئتان':'ومئتين'};
function obl(x){return x.split(' ').map(function(w){if(has(OBLT,w))return OBLT[w];if(/^و?(عشر|ثلاث|أربع|خمس|ست|سبع|ثمان|تسع)ون$/.test(w))return w.slice(0,-2)+'ين';if(/^[؀-ۿ]+ان$/.test(w)&&w!=='أمتار'&&w!=='ثوان'&&w.charAt(0)!=='أ')return w.slice(0,-2)+'ين';return w}).join(' ')}
var AR='؀-ۿ';
function convert(t){
  t=t.replace(/(^|[^A-Za-z\d])([A-Za-zρθΔμΩπλε])\s*=\s*([^=،.:;؛·]+(?:=[^=،.:;؛·]+)+)/g,function(m0,pre,X,rest){if(/\d $/.test(pre))return m0;var parts=rest.split('=').map(function(p){return p.trim()});return pre+X+' = '+parts[0]+parts.slice(1).map(function(p){return '، إذن '+X+' = '+p}).join('')});
  t=t.replace(/^(\d+)\.\s+/,function(m,n){n=+n;return n<=10?ORD[n]+'، ':''});
  t=t.replace(/[•✓→*]/g,'');
  t=t.replace(new RegExp('^\\s*\\d[^'+AR+']*=[^'+AR+']*(?=['+AR+'])'),'');
  t=t.replace(/\s·\s/g,'، ');
  t=t.replace(/(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,function(m){return '^'+m.split('').map(function(c){return SUP[c]}).join('')});
  t=t.replace(/\bSI\b/g,'إس آي');
  var U='(?:[A-Za-zΩμ]+(?:\\^-?\\d)?)(?:·[A-Za-zΩμ]+(?:\\^-?\\d)?)*(?:/[A-Za-zΩμ]+(?:\\^-?\\d)?)?';
  t=t.replace(/\b10\^(-?)(\d+)/g,function(m,neg,p){return 'عشرة أس '+(neg?'سالب ':'')+num(p)});
  function nu(m0,n,u){var w=unit(u);if(!w)return m0;
    if(n.indexOf('.')<0&&u.indexOf('·')<0){var i=u.indexOf('/'),head=i<0?u:u.slice(0,i),den=i<0?'':u.slice(i+1);var mm=/^([A-Za-zΩμ]+)(?:\^(\d))?$/.exec(head);
      if(mm&&has(UNIT,mm[1])&&has(AU,UNIT[mm[1]])){var adj=mm[2]==='2'?'مربع':mm[2]==='3'?'مكعب':'';var out=sayN(parseInt(n,10),UNIT[mm[1]],adj);if(den)out+=' لكل '+unit1(den).replace(' مربع',' تربيع');return out}}
    return numtxt(n)+' '+w}
  t=t.replace(new RegExp('(^|[^'+AR+'])((?:ال)?(?!هذا)['+AR+']{2,}[^هن\\s]ا)\\s+(?=\\d)','g'),'$1$2 مقداره ');
  var OBL=/^(?:في|إلى|من|على|عن|لمدة|بمقدار|تحويل|تقطع|تعبئة|بعد|قبل|حول)$/;
  var t0=t;
  t=t.replace(new RegExp('(\\d+(?:\\.\\d+)?)\\s?('+U+')(?![A-Za-z\\d])','g'),function(m0,n,u,off){var out=nu(m0,n,u);var before=t0.slice(0,off).replace(/\s+$/,'');var pre=before?before.split(' ').pop():'';if(out!==m0&&OBL.test(pre||'-'))out=obl(out);return out});
  var t2=t;
  t=t.replace(new RegExp('(^|[^A-Za-z])('+U+')(?![A-Za-z\\d])','g'),function(m0,lead,u,off){var w=unit(u);if(!w)return m0;
    if(u.indexOf('/')>=0||u.indexOf('·')>=0||(u.length>1&&!has(LET,u)))return lead+w;
    var st=off+lead.length,pre=t2.slice(0,st).replace(/\s+$/,''),post=t2.slice(st+u.length).replace(/^\s+/,'');
    if(post.charAt(0)==='='&&/^=\s*[A-Za-z]+(\^-?\d)?[·\/]/.test(post))return lead+w;
    if(post.charAt(0)==='=')return m0;
    if(pre&&new RegExp('['+AR+'،:]$').test(pre))return lead+w;
    return m0});
  t=t.replace(/(^|[^A-Za-z])([A-Za-zρθΔμΩπλε])(?![A-Za-z])/g,function(m0,l,c){return l+sym(c)});
  t=t.replace(new RegExp('([\\w'+AR+')])\\s*/\\s*(?=[\\w'+AR+'(])','g'),'$1 / ');
  t=t.replace(/\s\/\s/g,' ÷ ');
  t=t.split('÷').join(' مقسومة على ').split('×').join(' ضرب ').split('=').join(' يساوي ').split('·').join(' ضرب ');
  t=t.replace(/(\d+(?:\.\d+)?)/g,function(m){return numtxt(m)});
  t=t.split('١').join('واحد');
  var NW='(?:و?(?:اثنان|اثنتان|اثنا|اثنتا|مئتان|ألفان|مئتا|ألفا|(?:عشر|ثلاث|أربع|خمس|ست|سبع|ثمان|تسع)ون))';
  var NWr=new RegExp('^'+NW+'$');
  t=t.replace(new RegExp('(يساوي|تساوي|ضرب|على|صفحة)\\s+((?:\\S+\\s+){0,4}?'+NW+')(?=[\\s،.]|$)','g'),function(m0,a,b){return a+' '+b.split(' ').map(function(w){return NWr.test(w)?obl(w):w}).join(' ')});
  t=t.replace(/\s+/g,' ');
  t=t.replace(/بال(\S+) \1 يساوي/g,'بال$1، وال$1 يساوي');
  t=t.replace(/بال(\S+) \1/g,'بال$1');
  return t.replace(/\s+/g,' ').trim()}
/* تصحيحات نطق الكلمات التي يسمعها المدرب (كل الدروس) */
var GFIX=[['ذكر وحدات','ذِكْرُ وحدات'],['الجاوسي','الجَاوْسِيّ']];
function prep(t){t=String(t||'').replace(D,'').replace(/‖/g,' ').replace(/`/g,'').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();if(!t)return '';
  t=t.replace(/ ÷ /g,' / ').replace(/÷/g,'/');try{t=convert(t)}catch(e){}
  GFIX.forEach(function(f){t=t.split(f[0]).join(f[1])});return t}
window.GEMPREP=prep;
/* ---------- التشغيل ---------- */
function teacherTok(){try{if(typeof AUTH!=='undefined'&&AUTH&&!AUTH.demo)return '';var T=(typeof TAUTH!=='undefined')?TAUTH:null;if(!T)return '';return T.token||(typeof T==='string'?T:'')}catch(e){return ''}}
function on(){try{return localStorage.getItem('p101-grep')==='1'&&!!teacherTok()&&typeof API!=='undefined'&&!!API}catch(e){return false}}
window.GREPON=on;
if(typeof TTS==='undefined'||!TTS)return;
var O={play:TTS.play,playAr:TTS.playAr,playRaw:TTS.playRaw,prefetch:TTS.prefetch,prefetchAr:TTS.prefetchAr,stop:TTS.stop,busy:TTS.busy,pause:TTS.pause,resume:TTS.resume};
var CACHE={},PEND={},A=null,playing=false,paused=false,gen=0,btn=null,btnH='';
/* unlock61: Safari على الآيفون يمنع تشغيل الصوت بعد انتظار التوليد إن لم يفتح المشغل بلمسة؛ نفتحه مرة عند أول لمسة */
var SIL='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=',UNL=false;
function unlock(){if(UNL)return;try{if(!A){A=new Audio();A.preload='auto'}if(playing)return;A.src=SIL;var p=A.play();UNL=true;if(p&&p.then)p.then(function(){try{if(!playing)A.pause()}catch(e){}}).catch(function(){UNL=false})}catch(e){}}
['touchend','click','keydown'].forEach(function(ev){document.addEventListener(ev,unlock,true)});
function fetchUrl(text){if(CACHE[text])return Promise.resolve(CACHE[text]);if(PEND[text])return PEND[text];
  var P=fetch(API,{method:'POST',body:JSON.stringify({a:'rtts',token:teacherTok(),text:text}),redirect:'follow'}).then(function(r){return r.json()}).then(function(x){
    if(!x||!x.ok||!x.audio)throw x||{};var b=atob(x.audio),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);
    var url=URL.createObjectURL(new Blob([u],{type:x.mime||'audio/wav'}));CACHE[text]=url;delete PEND[text];return url}).catch(function(e){delete PEND[text];throw e});
  PEND[text]=P;return P}
function rst(){if(btn){try{btn.innerHTML=btnH;btn.classList.remove('on')}catch(e){}}btn=null}
function myStop(){gen++;playing=false;paused=false;if(A){A.onended=A.onerror=null;try{A.pause()}catch(e){}}rst()}
function gplay(text,b,fallback){var same=b&&btn===b;O.stop();myStop();if(same)return;
  var t=prep(text);if(!t)return fallback();
  var g=gen;playing=true;if(b){btn=b;btnH=b.innerHTML;try{b.classList.add('on');b.innerHTML='⏳ تجهيز الصوت…'}catch(e){}}
  fetchUrl(t).then(function(url){if(g!==gen)return;if(!A){A=new Audio();A.preload='auto'}
    if(b)try{b.innerHTML='■ إيقاف'}catch(e){}
    A.onended=function(){setTimeout(function(){if(g===gen){playing=false;rst()}},300)};
    A.onerror=function(){if(g===gen){playing=false;rst()}};
    A.src=url;var p=A.play();if(p&&p.catch)p.catch(function(er){if(g===gen){playing=false;rst();badge('تعذر التشغيل: '+((er&&er.name)||'audio'));UNL=false;/* إن منع المتصفح التشغيل لا تبقى الخطوة بلا صوت فتسرع اليد: يقولها حامد */try{fallback()}catch(_){}}});
  }).catch(function(e){if(g!==gen)return;playing=false;rst();var why=(e&&e.error)||'net';try{console.warn('gemrep',why)}catch(_){}badge('حامد ← '+why);fallback()})}
/* diag61: علامة صغيرة للمدرب فقط عند التحول لحامد وسببه */function badge(m){try{var e=document.getElementById('grepdg');if(!e){e=document.createElement('div');e.id='grepdg';e.style.cssText='position:fixed;left:8px;bottom:8px;z-index:2147483646;max-width:70vw;background:#7f1d1d;color:#fff;font:700 12px/1.4 system-ui,sans-serif;padding:6px 10px;border-radius:8px;opacity:.92;pointer-events:none;direction:rtl';document.body.appendChild(e)}e.textContent=m;clearTimeout(e._t);e._t=setTimeout(function(){e.remove()},8000)}catch(_){}}
TTS.play=function(text,b,raw){if(!on()||raw)return O.play.apply(TTS,arguments);var a=arguments;return gplay(text,b||document.createElement('button'),function(){O.play.apply(TTS,a)})};
TTS.playAr=function(text,b){if(!on())return O.playAr.apply(TTS,arguments);var a=arguments;return gplay(text,b||document.createElement('button'),function(){O.playAr.apply(TTS,a)})};
/* سطور قراءة الجداول تجهزها السبورة مسبقا لكنها لا تنطق (يقول المدرب عبارة الجدول بدلها)، فلا نولدها حتى لا تهدر الرصيد */var NOPF=/^(هذا جدول|نقرأ جدول)|رمزه|رمزها/;
TTS.prefetch=function(t){if(!on())return O.prefetch.apply(TTS,arguments);try{var x=prep(t);if(x&&!NOPF.test(x))fetchUrl(x).catch(function(){})}catch(e){}};
TTS.prefetchAr=function(t){if(!on())return O.prefetchAr.apply(TTS,arguments);try{var x=prep(t);if(x)fetchUrl(x).catch(function(){})}catch(e){}};
TTS.stop=function(){myStop();return O.stop.apply(TTS,arguments)};
TTS.busy=function(){return playing||O.busy.apply(TTS,arguments)};
TTS.pause=function(){if(playing&&A&&!paused){if(!A.paused&&A.currentTime>0){A.pause();paused=true;return true}return false}return O.pause.apply(TTS,arguments)};
TTS.resume=function(){if(playing&&A&&paused){paused=false;var p=A.play();if(p&&p.catch)p.catch(function(){});return true}return O.resume.apply(TTS,arguments)};
if(on()){try{TTS.has=function(){return true}}catch(e){}}
})();
