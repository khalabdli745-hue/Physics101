function myFunction() {
  
}
/**
 * منصة فيزياء ١٠١ — خادم البيانات (Google Apps Script)
 * يحفظ: الشعب، المتدربين، الدخول، أوقات الاستخدام، نتائج الاختبارات والتمارين.
 * البيانات تُحفظ في جدول Google Sheets داخل حساب المدرب فقط.
 * لا تعدّل هذا الملف؛ انسخه كاملًا كما هو.
 */
const VERSION = 41; /* 4 نوفمبر: إجابات المساعد محددة مسبقا داخل المنصة، وحذف الاتصال بالخدمات الخارجية للإجابة (40: نطاق الاختبارين) */
const TOKEN_DAYS = 30;

function doGet() {
  return out_({ ok: true, app: 'physics101', version: VERSION, teacherReady: !!prop_('TPW'), teacherUser: !!prop_('TUSER'), ai: false, tts: !!prop_('TTSKEY') });
}

function doPost(e) {
  let req = {};
  try { req = JSON.parse(e.postData.contents || '{}'); } catch (err) { return out_({ ok: false, error: 'bad_json' }); }
  RC_ = {}; SHC_ = {};
  try {
    const fn = ACTIONS[req.a];
    if (!fn) return out_({ ok: false, error: 'unknown_action' });
    return out_(fn(req));
  } catch (err) {
    return out_({ ok: false, error: String(err && err.message || err) });
  }
}

/* ---------------- أدوات ---------------- */
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
/* ===== أمان الدخول ===== */
/* إرسال رمز للمدرب على إيميل صاحب الحساب في Google (نفس حساب Apps Script) */
function mailOwner_(subject, code, note) {
  const to = Session.getEffectiveUser().getEmail(); if (!to) return false;
  MailApp.sendEmail({ to: to, subject: subject, htmlBody: '<div dir="rtl" style="font-family:Tahoma,Arial;font-size:16px;line-height:1.8">' +
    '<p>منصة الفيزياء العامة 101 التدريبية — لوحة المدرب</p><p>' + note + '</p><p style="font-size:28px;font-weight:bold;letter-spacing:4px;direction:ltr;text-align:right">' + code + '</p>' +
    '<p style="color:#666">إذا لم تطلب هذا الرمز فتجاهل الرسالة، ولا تعطه لأحد.</p></div>' });
  return to.replace(/^(.).*(@.*)$/, '$1***$2');
}
/* كلمة مرور قوية: 12 خانة على الأقل، حرف كبير وصغير ورقم ورمز، بلا مسافات، ولا تحتوي الرقم أو اسم المستخدم */
function strongPw_(pw, id) {
  pw = String(pw || ''); id = String(id || '').toLowerCase();
  return pw.length >= 12 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9\s]/.test(pw) && !/\s/.test(pw) && !(id && pw.toLowerCase().indexOf(id) >= 0);
}
/* القفل بعد 5 محاولات خاطئة: 5 دقائق أول مرة، ثم 15 دقيقة إذا تكرر (خلال 6 ساعات) */
function lockGet_(id) { try { return JSON.parse(CacheService.getScriptCache().get('lf:' + id) || '{}'); } catch (e) { return {}; } }
function lockSet_(id, o) { CacheService.getScriptCache().put('lf:' + id, JSON.stringify(o), 21600); }
function lockedErr_(id) { const o = lockGet_(id); if (o.until && o.until > Date.now()) return { ok: false, error: 'locked', min: Math.ceil((o.until - Date.now()) / 60000) }; return null; }
function failPw_(id) {
  const o = lockGet_(id); o.n = (o.n || 0) + 1;
  if (o.n >= 5) { o.locks = (o.locks || 0) + 1; o.n = 0; o.until = Date.now() + (o.locks > 1 ? 15 : 5) * 60000; lockSet_(id, o); return { ok: false, error: 'locked', min: o.locks > 1 ? 15 : 5 }; }
  lockSet_(id, o); return { ok: false, error: 'wrong_password', left: o.n >= 3 ? 5 - o.n : null };
}
function passPw_(id) { const o = lockGet_(id); if (o.n || o.until) { o.n = 0; o.until = 0; lockSet_(id, o); } }
/* رمز التسجيل لكل شعبة (بالاسم): يعمل لمن لم يسجل بعد فقط، في شعبته في المنصة أو في الاختبارات */
function regAll_() { try { return JSON.parse(prop_('REGCODES') || '{}'); } catch (e) { return {}; } }
function regOk_(id, code) {
  code = String(code || '').replace(/\D/g, ''); if (code.length !== 6) return false;
  const all = regAll_(), names = [], st = findStudent_(id), ex = exStudent_(id);
  if (st) names.push(sectionName_(st.sectionId)); if (ex) names.push(exSecName_(ex.sectionId));
  return names.some(function (n) { const c = all[String(n)]; return c && c.code === code && c.until > Date.now(); });
}
function props_() { return PropertiesService.getScriptProperties(); }
function prop_(k) { return props_().getProperty(k); }
function secret_() {
  let s = prop_('SECRET');
  if (!s) { s = Utilities.getUuid() + Utilities.getUuid(); props_().setProperty('SECRET', s); }
  return s;
}
function hash_(salt, pw) {
  const b = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + '|' + pw, Utilities.Charset.UTF_8);
  return Utilities.base64Encode(b);
}
function sign_(payload) {
  const b = Utilities.computeHmacSha256Signature(payload, secret_());
  return Utilities.base64EncodeWebSafe(b).replace(/=+$/, '');
}
function makeToken_(role, id) {
  const exp = Date.now() + TOKEN_DAYS * 864e5;
  const p = role + '|' + id + '|' + exp;
  return Utilities.base64EncodeWebSafe(p, Utilities.Charset.UTF_8).replace(/=+$/, '') + '.' + sign_(p);
}
function readToken_(tok, role) {
  if (!tok || tok.indexOf('.') < 0) throw new Error('auth');
  const parts = tok.split('.');
  let p = parts[0]; while (p.length % 4) p += '=';
  const payload = Utilities.newBlob(Utilities.base64DecodeWebSafe(p)).getDataAsString('UTF-8');
  if (sign_(payload) !== parts[1]) throw new Error('auth');
  const f = payload.split('|');
  if (f[0] !== role || +f[2] < Date.now()) throw new Error('auth');
  return f[1];
}
function now_() { return new Date(); }
function lock_(fn) {
  const l = LockService.getScriptLock();
  /* محاولة الانتظار ثلاث مرات (حتى 30 ثانية) قبل رسالة «مهلة التأمين» */
  for (let k = 0; ; k++) { try { l.waitLock(10000); break; } catch (e) { if (k >= 2) throw e; Utilities.sleep(300); } }
  RC_ = {};
  try { return fn(); } finally { l.releaseLock(); }
}
/* كتابة خانات محددة فقط في صف واحد دون انتظار الطابور (لا تمس بقية الصف) */
function cells_(k, row, obj) {
  const sh = sh_(k), cols = SHEETS[k];
  Object.keys(obj).forEach(function (c) { const j = cols.indexOf(c); if (j >= 0) sh.getRange(row, j + 1).setValue(obj[c]); });
}

/* ---------------- الجدول ---------------- */
const SHEETS = {
  Sections: ['id', 'name', 'createdAt'],
  Students: ['id', 'name', 'sectionId', 'pwHash', 'salt', 'createdAt', 'firstLogin', 'lastLogin', 'loginCount', 'totalSec', 'lastSeen'],
  Logins: ['time', 'studentId', 'sectionId', 'device'],
  Results: ['time', 'studentId', 'sectionId', 'kind', 'lessonKey', 'lessonTitle', 'score', 'max', 'percent', 'detail'],
  Questions: ['time', 'studentId', 'sectionId', 'lessonKey', 'lessonTitle', 'question', 'answer', 'model'],
  TeachLog: ['id', 'date', 'lessonKey', 'sectionId', 'hours', 'method', 'notes', 'createdAt'],
  Ratings: ['time', 'studentId', 'sectionId', 'stage', 'lessonKey', 'lessonTitle', 'stars', 'level', 'tags', 'note'],
  Surveys: ['time', 'studentId', 'sectionId', 'answers', 'avg', 'best', 'improve'],
  Exams: ['time', 'studentId', 'sectionId', 'examId', 'startedAt', 'submittedAt', 'paper', 'answers', 'score', 'max', 'right', 'device'],
  ExamSections: ['id', 'name', 'createdAt'],
  ExamStudents: ['id', 'name', 'sectionId', 'pwHash', 'salt', 'createdAt', 'lastLogin', 'work'],
  Consents: ['time', 'studentId', 'name', 'section', 'source', 'device']
};
const AR_NAMES = { Sections: 'الشعب', Students: 'المتدربون', Logins: 'سجل الدخول', Results: 'النتائج', Questions: 'أسئلة المساعد', TeachLog: 'تقرير إنجاز المدرب', Ratings: 'تقييم الدروس', Surveys: 'استبانة الرضا', Exams: 'الاختبارات التجريبية', ExamSections: 'شعب الاختبارات', ExamStudents: 'متدربو الاختبارات', Consents: 'موافقات الخصوصية' };
const OLD_NAMES_ = { Exams: 'الاختبارات الفصلية' };
function ss_() {
  let id = prop_('SSID'), ss = null;
  if (id) { try { ss = SpreadsheetApp.openById(id); } catch (e) { ss = null; } }
  if (!ss) {
    ss = SpreadsheetApp.create('منصة فيزياء ١٠١ — بيانات المتدربين');
    props_().setProperty('SSID', ss.getId());
    Object.keys(SHEETS).forEach(function (k, i) {
      const sh = i === 0 ? ss.getSheets()[0].setName(AR_NAMES[k]) : ss.insertSheet(AR_NAMES[k]);
      sh.getRange(1, 1, 1, SHEETS[k].length).setValues([SHEETS[k]]).setFontWeight('bold');
      sh.setFrozenRows(1);
      sh.setRightToLeft(true);
    });
  }
  return ss;
}
/* تسريع: تقرأ كل ورقة مرة واحدة في الطلب، وأي كتابة عليها (عبر sh_) تلغي القراءة المحفوظة */
let RC_ = {}, SHC_ = {};
function sh_(k) { delete RC_[k]; return sh0_(k); }
function sh0_(k) {
  if (SHC_[k]) return SHC_[k];
  const ss = ss_();
  let sh = ss.getSheetByName(AR_NAMES[k]);
  /* 3 نوفمبر: إذا وجدت الورقة باسمها القديم تعاد تسميتها بنتائجها، ولا تنشأ ورقة فارغة */
  if (!sh && OLD_NAMES_[k]) { const o = ss.getSheetByName(OLD_NAMES_[k]); if (o) { o.setName(AR_NAMES[k]); sh = o; } }
  if (!sh) {
    sh = ss.insertSheet(AR_NAMES[k]);
    sh.getRange(1, 1, 1, SHEETS[k].length).setValues([SHEETS[k]]).setFontWeight('bold');
    sh.setFrozenRows(1); sh.setRightToLeft(true);
  }
  return (SHC_[k] = sh);
}
function rows_(k) {
  if (!RC_[k]) { const sh = sh0_(k), n = sh.getLastRow();
    RC_[k] = { vals: n < 2 ? [] : sh.getRange(2, 1, n - 1, SHEETS[k].length).getValues(), tz: sh.getParent().getSpreadsheetTimeZone() }; }
  const cols = SHEETS[k], vals = RC_[k].vals, tz = RC_[k].tz;
  return vals.map(function (r, i) { const o = { _row: i + 2 }; cols.forEach(function (c, j) { o[c] = c === 'lessonKey' ? lkRead_(r[j], tz) : r[j]; }); return o; });
}
/* رمز الدرس مثل 1-3 يحوّله Google Sheets إلى تاريخ (3 يناير)؛ نعيده رمزًا عند القراءة، ونحفظه نصًّا عند الكتابة */
function lkRead_(v, tz) { return v instanceof Date ? Utilities.formatDate(v, tz, 'M-d') : v; }
function lkWrite_(c, v) { return c === 'lessonKey' && /^\d+-\d+/.test(String(v)) ? "'" + v : v; }
function append_(k, obj) { sh_(k).appendRow(SHEETS[k].map(function (c) { return obj[c] === undefined ? '' : lkWrite_(c, obj[c]); })); }
function update_(k, row, obj) {
  const sh = sh_(k), cols = SHEETS[k];
  const cur = sh.getRange(row, 1, 1, cols.length).getValues()[0], tz = sh.getParent().getSpreadsheetTimeZone();
  cols.forEach(function (c, j) { cur[j] = lkWrite_(c, obj[c] !== undefined ? obj[c] : (c === 'lessonKey' ? lkRead_(cur[j], tz) : cur[j])); });
  sh.getRange(row, 1, 1, cols.length).setValues([cur]);
}
function findStudent_(id) {
  id = String(id).trim();
  const list = rows_('Students');
  for (let i = 0; i < list.length; i++) if (String(list[i].id).trim() === id) return list[i];
  return null;
}
function sectionName_(sid) {
  const s = rows_('Sections').filter(function (x) { return String(x.id) === String(sid); })[0];
  return s ? s.name : '';
}
function cleanId_(v) { const s = String(v == null ? '' : v).replace(/[٠-٩]/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).trim(); return /^demo$/i.test(s) ? 'DEMO' : s; }

/* ---------------- الإجراءات ---------------- */
/* ---------------- الصوت الطبيعي (Microsoft Azure Speech — الخطة المجانية F0) ---------------- */
const TTS_VOICES = { 'ar-SA-HamedNeural': 'm', 'ar-SA-ZariyahNeural': 'f', 'ar-AE-HamdanNeural': 'm', 'ar-AE-FatimaNeural': 'f', 'en-US-AndrewMultilingualNeural': 'mm', 'en-US-AvaMultilingualNeural': 'fm', 'en-US-BrianMultilingualNeural': 'mm', 'en-US-EmmaMultilingualNeural': 'fm' };
const TTS_EN = { m: 'en-US-GuyNeural', f: 'en-US-JennyNeural' };
const TTS_MONTH_CAP = 480000;  // الخطة المجانية F0: 500 ألف حرف شهريا، والحد أقل منها بقليل للأمان
const TTS_USER_HOUR = 600;      // مقاطع جديدة لكل مستخدم في الساعة (شرح الدرس على السبورة يحتاج مقاطع كثيرة)
function xml_(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); }
function ttsFolder_() {
  const id = prop_('TTSDIR');
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  const f = DriveApp.createFolder('منصة فيزياء ١٠١ — ملفات الصوت');
  props_().setProperty('TTSDIR', f.getId());
  return f;
}
function ttsMonth_() {
  const m = Utilities.formatDate(new Date(), 'UTC', 'yyyy-MM');
  const v = String(prop_('TTSUSE') || '').split('|');
  return { month: m, used: v[0] === m ? (+v[1] || 0) : 0 };
}
function ttsAddUse_(n) { const u = ttsMonth_(); props_().setProperty('TTSUSE', u.month + '|' + (u.used + n)); }
function ttsCall_(key, region, ssml) {
  return UrlFetchApp.fetch('https://' + region + '.tts.speech.microsoft.com/cognitiveservices/v1', {
    method: 'post', contentType: 'application/ssml+xml; charset=utf-8', muteHttpExceptions: true,
    headers: { 'Ocp-Apim-Subscription-Key': key, 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'physics101' },
    payload: Utilities.newBlob(ssml, 'application/ssml+xml', 'a.xml').getBytes()
  });
}

/* اسم ملف الصوت المحفوظ لمقطع ما (نفس التطبيع المستخدم عند التوليد) */
/* صمت قصير في آخر كل مقطع حتى لا يقطع الجوال آخر كلمة */
const TTS_TAIL = '<break time="250ms"/>';
function ttsName_(voice, rate, segsIn) {
  const segs = [], src = Array.isArray(segsIn) ? segsIn.slice(0, 40) : [];
  let chars = 0;
  src.forEach(function (x) {
    if (!x) return;
    const t = String(x.t || '').replace(/\s+/g, ' ').trim().slice(0, 1800);
    if (!t || chars + t.length > 2000) return;
    chars += t.length;
    const l = x.l === 'en' ? 'en' : 'ar', last = segs[segs.length - 1];
    if (last && last.l === l) last.t += ' ' + t; else segs.push({ l: l, t: t });
  });
  if (!segs.length) return null;
  const sig = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, 'v2|' + voice + '|' + rate + '|' + JSON.stringify(segs), Utilities.Charset.UTF_8)
    .map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
  return { name: 'a_' + sig + '.mp3', chars: chars, segs: segs };
}
const ACTIONS = {
  /* ===== المتدرب ===== */
  login: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: exStudent_(id) ? 'exam_only' : 'not_found' };
    adoptExPw_(st);
    if (!st.pwHash) return { ok: true, firstTime: true, name: st.name };
    const L = lockedErr_(id); if (L) return L;
    if (hash_(st.salt, pw) !== st.pwHash) return failPw_(id);
    passPw_(id);
    if (id !== 'DEMO' && !strongPw_(pw, id)) return { ok: true, needChange: true, name: st.name }; /* الحساب التجريبي للمنصة فقط: كلمة مرور سهلة */
    return lock_(function () { return recordLogin_(st, r.device); });
  },
  /* تغيير كلمة مرور ضعيفة عند الدخول: كلمة المرور الحالية ثم الجديدة القوية */
  chpw: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || ''), nw = String(r.newpw || '');
    const st = findStudent_(id); if (!st || !st.pwHash) return { ok: false, error: 'not_found' };
    const L = lockedErr_(id); if (L) return L;
    if (hash_(st.salt, pw) !== st.pwHash) return failPw_(id);
    if (!strongPw_(nw, id)) return { ok: false, error: 'weak_password' };
    const salt = Utilities.getUuid();
    return lock_(function () { update_('Students', st._row, { pwHash: hash_(salt, nw), salt: salt }); st.pwHash = 'x'; passPw_(id); return recordLogin_(st, r.device); });
  },
  setpw: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    if (!strongPw_(pw, id)) return { ok: false, error: 'weak_password' };
    if (id === 'DEMO' || !regOk_(id, r.code)) return { ok: false, error: 'bad_code' };
    return lock_(function () {
      const st = findStudent_(id);
      if (!st) return { ok: false, error: 'not_found' };
      if (st.pwHash) return { ok: false, error: 'already_set' };
      const salt = Utilities.getUuid();
      update_('Students', st._row, { pwHash: hash_(salt, pw), salt: salt });
      st.pwHash = 'x';
      return recordLogin_(st, r.device);
    });
  },
  /* 3 نوفمبر: تسجيل موافقة المتدرب على سياسة الخصوصية (من المنصة أو الاختبارات)، مرة واحدة لكل رقم تدريبي */
  privok: function (r) {
    let id = '', src = 'المنصة';
    try { id = readToken_(r.token, 's'); } catch (e) { id = readToken_(r.token, 'e'); src = 'الاختبارات'; }
    id = String(id).trim();
    if (!id || id === 'DEMO' || id === String(EXAM_TRIAL_ID)) return { ok: true };
    return lock_(function () {
      if (privMap_()[id]) return { ok: true, already: true };
      const st = findStudent_(id), ex = exStudent_(id);
      append_('Consents', { time: now_(), studentId: id, name: st ? st.name : ex ? ex.name : '', section: st ? sectionName_(st.sectionId) : ex ? exSecName_(ex.sectionId) : '', source: src, device: String(r.device || '').slice(0, 40) });
      return { ok: true };
    });
  },
  me: function (r) {
    const id = readToken_(r.token, 's');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'auth' };
    const best = {}, done = [];
    rows_('Results').forEach(function (x) {
      if (String(x.studentId) !== String(id)) return;
      if (x.kind === 'done') { done.push(x.lessonKey); return; }
      if (x.kind === 'board') return;
      const k = x.kind + ':' + x.lessonKey;
      if (best[k] == null || +x.percent > best[k]) best[k] = +x.percent;
    });
    return { ok: true, name: st.name, section: sectionName_(st.sectionId), best: best, done: done, wkw: wkw_(), voice: { on: false } };
  },
  hb: function (r) {
    const id = readToken_(r.token, 's');
    const sec = Math.max(0, Math.min(180, Math.round(+r.sec || 0)));
    if (!sec) return { ok: true };
    return lock_(function () {
      const st = findStudent_(id);
      if (!st) return { ok: false, error: 'auth' };
      update_('Students', st._row, { totalSec: (+st.totalSec || 0) + sec, lastSeen: now_() });
      return { ok: true };
    });
  },
  result: function (r) {
    const id = readToken_(r.token, 's');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'auth' };
    const max = +r.max || 0, score = +r.score || 0;
    return lock_(function () {
      append_('Results', {
        time: now_(), studentId: id, sectionId: st.sectionId, kind: String(r.kind || '').slice(0, 20),
        lessonKey: String(r.lessonKey || '').slice(0, 10), lessonTitle: String(r.lessonTitle || '').slice(0, 120),
        score: score, max: max, percent: max ? Math.round(score / max * 100) : 0,
        detail: JSON.stringify(r.detail || '').slice(0, 4000)
      });
      return { ok: true };
    });
  },

  rate: function (r) {
    const id = readToken_(r.token, 's');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'auth' };
    const stage = ['board', 'ex', 'quiz'].indexOf(String(r.stage)) >= 0 ? String(r.stage) : '';
    const stars = Math.round(+r.stars || 0);
    if (!stage || stars < 1 || stars > 5) return { ok: false, error: 'bad' };
    const lk = String(r.lessonKey || '').slice(0, 10);
    const row = {
      time: now_(), studentId: id, sectionId: st.sectionId, stage: stage, lessonKey: lk,
      lessonTitle: String(r.lessonTitle || '').slice(0, 120), stars: stars,
      level: String(r.level || '').slice(0, 20), tags: (Array.isArray(r.tags) ? r.tags : []).map(String).join('، ').slice(0, 300),
      note: String(r.note || '').slice(0, 500)
    };
    return lock_(function () {
      const old = rows_('Ratings').filter(function (x) { return String(x.studentId) === String(id) && x.stage === stage && String(x.lessonKey) === lk; })[0];
      if (old) update_('Ratings', old._row, row); else append_('Ratings', row);
      return { ok: true };
    });
  },
  survey: function (r) {
    const id = readToken_(r.token, 's');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'auth' };
    const a = (Array.isArray(r.answers) ? r.answers : []).slice(0, 40).map(function (v) { v = Math.round(+v || 0); return v >= 1 && v <= 5 ? v : 0; });
    const got = a.filter(function (v) { return v; });
    if (!got.length) return { ok: false, error: 'bad' };
    const row = { time: now_(), studentId: id, sectionId: st.sectionId, answers: a.join(','), avg: Math.round(got.reduce(function (s, v) { return s + v; }, 0) / got.length / 5 * 100),
      best: String(r.best || '').slice(0, 500), improve: String(r.improve || '').slice(0, 500) };
    return lock_(function () {
      const old = rows_('Surveys').filter(function (x) { return String(x.studentId) === String(id); })[0];
      if (old) update_('Surveys', old._row, row); else append_('Surveys', row);
      return { ok: true };
    });
  },
  tratings: function (r) {
    readToken_(r.token, 't');
    const sid = r.sectionId ? String(r.sectionId) : '';
    const names = {};
    rows_('Students').forEach(function (s) { names[String(s.id)] = s.name; });
    const list = rows_('Ratings').filter(function (x) { return String(x.studentId) !== 'DEMO' && (!sid || String(x.sectionId) === sid); }).map(function (x) {
      return { time: new Date(x.time).toISOString(), studentId: String(x.studentId), name: names[String(x.studentId)] || '', sectionId: String(x.sectionId),
        stage: x.stage, lessonKey: String(x.lessonKey), lessonTitle: x.lessonTitle, stars: +x.stars || 0, level: x.level, tags: x.tags, note: x.note };
    });
    const surveys = rows_('Surveys').filter(function (x) { return String(x.studentId) !== 'DEMO' && (!sid || String(x.sectionId) === sid); }).map(function (x) {
      return { time: new Date(x.time).toISOString(), studentId: String(x.studentId), name: names[String(x.studentId)] || '', sectionId: String(x.sectionId),
        answers: String(x.answers).split(',').map(Number), avg: +x.avg || 0, best: x.best, improve: x.improve };
    });
    return { ok: true, ratings: list, surveys: surveys };
  },

  /* ===== المدرب ===== */
  tsetup: function (r) {
    const pw = String(r.pw || ''), user = String(r.user || '').trim().toLowerCase();
    if (user.length < 6) return { ok: false, error: 'short_user' };
    if (/^demo$/.test(user) || /^\d+$/.test(user)) return { ok: false, error: 'bad_user' };
    if (!strongPw_(pw, user)) return { ok: false, error: 'weak_password' };
    /* إنشاء حساب المدرب يحتاج رمز الإعداد من دالة resetAllPasswords في المحرر */
    const L = lockedErr_('TS'); if (L) return L;
    let ts = {}; try { ts = JSON.parse(prop_('TSETUP') || '{}'); } catch (e) {}
    if (!ts.code || ts.until < Date.now() || String(r.code || '').replace(/\D/g, '') !== ts.code) { const f = failPw_('TS'); return f.error === 'locked' ? f : { ok: false, error: 'bad_setup_code' }; }
    return lock_(function () {
      if (prop_('TPW')) return { ok: false, error: 'already_set' };
      props_().deleteProperty('TSETUP');
      const salt = Utilities.getUuid();
      props_().setProperties({ TPW: hash_(salt, pw), TSALT: salt, TUSER: user });
      ss_();
      return { ok: true, token: makeToken_('t', 'teacher') };
    });
  },
  tlogin: function (r) {
    if (!prop_('TPW')) return { ok: false, error: 'not_setup' };
    const user = String(r.user || '').trim().toLowerCase();
    const L = lockedErr_('T'); if (L) return L;
    if (prop_('TUSER') && user !== prop_('TUSER')) return failPw_('T');
    if (hash_(prop_('TSALT'), String(r.pw || '')) !== prop_('TPW')) return failPw_('T');
    passPw_('T');
    if (!strongPw_(r.pw, user) || user.length < 6) return { ok: true, needChange: true, weakUser: user.length < 6 };
    return { ok: true, token: makeToken_('t', 'teacher') };
  },
  /* نسي المدرب اسم المستخدم أو كلمة المرور: رمز يرسل إلى إيميل صاحب الحساب (مرة كل 10 دقائق، يعمل 30 دقيقة) */
  tforgot: function (r) {
    const c = CacheService.getScriptCache(); if (c.get('tforgot')) return { ok: false, error: 'wait' };
    c.put('tforgot', '1', 600);
    const code = String(10000000 + Math.floor(Math.random() * 90000000));
    props_().setProperty('TRESET', JSON.stringify({ code: code, until: Date.now() + 30 * 60000 }));
    let to = ''; try { to = mailOwner_('رمز استعادة حساب المدرب', code, 'طلبت استعادة حساب لوحة المدرب. اكتب هذا الرمز ثم اختر اسم مستخدم وكلمة مرور جديدين. يعمل 30 دقيقة، مرة واحدة:'); } catch (e) { return { ok: false, error: 'mail' }; }
    return { ok: true, to: to };
  },
  treset: function (r) {
    const L = lockedErr_('TR'); if (L) return L;
    let t = {}; try { t = JSON.parse(prop_('TRESET') || '{}'); } catch (e) {}
    if (!t.code || t.until < Date.now() || String(r.code || '').replace(/\D/g, '') !== t.code) { const f = failPw_('TR'); return f.error === 'locked' ? f : { ok: false, error: 'bad_setup_code' }; }
    const nu = String(r.newuser || '').trim().toLowerCase(), nw = String(r.newpw || '');
    if (nu.length < 6) return { ok: false, error: 'short_user' };
    if (/^demo$/.test(nu) || /^\d+$/.test(nu)) return { ok: false, error: 'bad_user' };
    if (!strongPw_(nw, nu)) return { ok: false, error: 'weak_password' };
    const salt = Utilities.getUuid();
    props_().setProperties({ TPW: hash_(salt, nw), TSALT: salt, TUSER: nu }); props_().deleteProperty('TRESET'); passPw_('T'); passPw_('TR');
    return { ok: true, token: makeToken_('t', 'teacher') };
  },
  /* تحديث حساب المدرب الضعيف عند الدخول (الاسم القديم وكلمة المرور القديمة، ثم الجديدة) */
  tchpw: function (r) {
    if (!prop_('TPW')) return { ok: false, error: 'not_setup' };
    const user = String(r.user || '').trim().toLowerCase();
    const L = lockedErr_('T'); if (L) return L;
    if ((prop_('TUSER') && user !== prop_('TUSER')) || hash_(prop_('TSALT'), String(r.pw || '')) !== prop_('TPW')) return failPw_('T');
    const nu = String(r.newuser || user).trim().toLowerCase(), nw = String(r.newpw || '');
    if (nu.length < 6) return { ok: false, error: 'short_user' };
    if (/^demo$/.test(nu) || /^\d+$/.test(nu)) return { ok: false, error: 'bad_user' };
    if (!strongPw_(nw, nu)) return { ok: false, error: 'weak_password' };
    const salt = Utilities.getUuid();
    props_().setProperties({ TPW: hash_(salt, nw), TSALT: salt, TUSER: nu }); passPw_('T');
    return { ok: true, token: makeToken_('t', 'teacher') };
  },
  /* رمز التسجيل للشعب، والحسابات المقفلة وفك القفل */
  tregcode: function (r) {
    readToken_(r.token, 't');
    const all = regAll_(), now = Date.now();
    if (r.op === 'open' && r.name) { const min = Math.max(10, Math.min(1440, Math.round(+r.min || 60)));
      all[String(r.name)] = { code: String(100000 + Math.floor(Math.random() * 900000)), until: now + min * 60000 }; }
    if (r.op === 'stop' && r.name) delete all[String(r.name)];
    if (r.op === 'unlock' && r.id) CacheService.getScriptCache().remove('lf:' + cleanId_(r.id));
    Object.keys(all).forEach(function (k) { if (all[k].until < now) delete all[k]; });
    if (r.op) props_().setProperty('REGCODES', JSON.stringify(all));
    const ids = rows_('Students').map(function (x) { return String(x.id); }).concat(rows_('ExamStudents').map(function (x) { return String(x.id); }));
    ids.push('T');
    const got = CacheService.getScriptCache().getAll(ids.map(function (i) { return 'lf:' + i; })), locked = [];
    Object.keys(got).forEach(function (k) { try { const o = JSON.parse(got[k]); if (o.until > now) locked.push({ id: k.slice(3), min: Math.ceil((o.until - now) / 60000) }); } catch (e) {} });
    const nm = {}; rows_('Sections').forEach(function (x) { nm[String(x.name)] = 1; }); rows_('ExamSections').forEach(function (x) { nm[String(x.name)] = 1; });
    const names = Object.keys(nm).filter(function (n) { return n && n !== 'تجريبي' && n !== 'شعبة تجريبية'; }).sort();
    const nmOf = {}; rows_('Students').forEach(function (x) { nmOf[String(x.id)] = x.name; }); rows_('ExamStudents').forEach(function (x) { nmOf[String(x.id)] = nmOf[String(x.id)] || x.name; });
    locked.forEach(function (l) { l.name = l.id === 'T' ? 'حساب المدرب' : (nmOf[l.id] || ''); });
    return { ok: true, codes: all, locked: locked, names: names, now: now };
  },
  tpw: function (r) {
    readToken_(r.token, 't');
    if (r.user != null && String(r.user).trim()) {
      const u = String(r.user).trim().toLowerCase();
      if (u.length < 6 || u === 'demo' || /^\d+$/.test(u)) return { ok: false, error: 'bad_user' };
      props_().setProperty('TUSER', u);
      if (!r.pw) return { ok: true };
    }
    const pw = String(r.pw || '');
    if (!strongPw_(pw, prop_('TUSER') || '')) return { ok: false, error: 'weak_password' };
    const salt = Utilities.getUuid();
    props_().setProperties({ TPW: hash_(salt, pw), TSALT: salt });
    return { ok: true };
  },
  tdemo: function (r) {
    readToken_(r.token, 't');
    const DEMO_ID = 'DEMO', DEMO_SEC = 'شعبة تجريبية';
    return lock_(function () {
      let sec = rows_('Sections').filter(function (s) { return s.name === DEMO_SEC; })[0];
      let sid = sec ? String(sec.id) : '';
      if (!sid) { sid = 'SDEMO'; append_('Sections', { id: sid, name: DEMO_SEC, createdAt: now_() }); }
      let st = findStudent_(DEMO_ID);
      if (!st) { append_('Students', { id: DEMO_ID, name: 'متدرب تجريبي (المدرب)', sectionId: sid, createdAt: now_(), loginCount: 0, totalSec: 0 }); st = findStudent_(DEMO_ID); }
      if (r.op === 'setpw') {
        const pw = String(r.pw || '');
        if (pw.length < 4 || /\s/.test(pw)) return { ok: false, error: 'short_password' }; /* الحساب التجريبي للمنصة فقط: كلمة مرور سهلة */
        const salt = Utilities.getUuid();
        update_('Students', st._row, { pwHash: hash_(salt, pw), salt: salt });
        return { ok: true };
      }
      if (r.op === 'info') return { ok: true, hasPw: !!st.pwHash };
      if (r.op === 'reset') {
        const sh = sh_('Results'), rs = rows_('Results');
        for (let i = rs.length - 1; i >= 0; i--) if (String(rs[i].studentId) === DEMO_ID) sh.deleteRow(rs[i]._row);
        const lg = sh_('Logins'), ls = rows_('Logins');
        for (let i = ls.length - 1; i >= 0; i--) if (String(ls[i].studentId) === DEMO_ID) lg.deleteRow(ls[i]._row);
        update_('Students', st._row, { loginCount: 0, totalSec: 0, firstLogin: '', lastLogin: '', lastSeen: '' });
        return { ok: true };
      }
      const res = recordLogin_(st, 'معاينة المدرب');
      res.id = DEMO_ID;
      return res;
    });
  },

  tstats: function (r) {
    readToken_(r.token, 't');
    const sid = r.sectionId ? String(r.sectionId) : '';
    const inSec = function (x) { return String(x.studentId) !== 'DEMO' && (!sid || String(x.sectionId) === sid); };
    const lessons = {}, questions = {}, perStudent = {};
    rows_('Results').forEach(function (x) {
      if (!inSec(x) || x.kind === 'done' || x.kind === 'board' || x.kind === 'bq') return;
      const lk = String(x.lessonKey).split('.')[0], sk = String(x.studentId) + '|' + x.kind + '|' + x.lessonKey;
      const L = lessons[lk] || (lessons[lk] = { quizAttempts: 0, probAttempts: 0, quizStudents: {}, probStudents: {} });
      const pc = +x.percent || 0;
      if (x.kind === 'quiz') { L.quizAttempts++; L.quizStudents[x.studentId] = 1; }
      else { L.probAttempts++; L.probStudents[x.studentId] = 1; }
      const ps = perStudent[sk] || (perStudent[sk] = { lk: lk, kind: x.kind, first: pc, best: pc });
      if (pc > ps.best) ps.best = pc;
      if (x.kind === 'quiz') {
        let det = []; try { det = JSON.parse(x.detail); if (typeof det === 'string') det = JSON.parse(det); } catch (e) { det = []; }
        if (Array.isArray(det)) det.forEach(function (d) {
          if (!d || !d.q) return;
          const qk = lk + '|' + d.q;
          const Q = questions[qk] || (questions[qk] = { lessonKey: lk, q: d.q, total: 0, correct: 0, wrong: {} });
          Q.total++; if (d.ok) Q.correct++; else if (d.chosen) Q.wrong[d.chosen] = (Q.wrong[d.chosen] || 0) + 1;
        });
      }
    });
    Object.keys(perStudent).forEach(function (k) {
      const ps = perStudent[k], L = lessons[ps.lk];
      const key = ps.kind === 'quiz' ? 'quiz' : 'prob';
      (L[key + 'First'] = L[key + 'First'] || []).push(ps.first);
      (L[key + 'Best'] = L[key + 'Best'] || []).push(ps.best);
    });
    const mean = function (a) { return a && a.length ? Math.round(a.reduce(function (s, v) { return s + v; }, 0) / a.length) : null; };
    const outL = {};
    Object.keys(lessons).forEach(function (k) {
      const L = lessons[k];
      outL[k] = { quizAttempts: L.quizAttempts, probAttempts: L.probAttempts, quizStudents: Object.keys(L.quizStudents).length, probStudents: Object.keys(L.probStudents).length,
        quizFirst: mean(L.quizFirst), quizBest: mean(L.quizBest), probFirst: mean(L.probFirst), probBest: mean(L.probBest) };
    });
    const qs = Object.keys(questions).map(function (k) {
      const Q = questions[k]; let top = '', n = 0;
      Object.keys(Q.wrong).forEach(function (w) { if (Q.wrong[w] > n) { n = Q.wrong[w]; top = w; } });
      return { lessonKey: Q.lessonKey, q: Q.q, total: Q.total, correct: Q.correct, pct: Math.round(Q.correct / Q.total * 100), commonWrong: top, commonWrongN: n };
    }).sort(function (a, b) { return a.pct - b.pct || b.total - a.total; });
    const days = {}, since = Date.now() - 30 * 864e5;
    rows_('Logins').forEach(function (x) {
      if (!inSec(x)) return;
      const t = new Date(x.time); if (t.getTime() < since) return;
      const d = Utilities.formatDate(t, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      days[d] = (days[d] || 0) + 1;
    });
    return { ok: true, lessons: outL, questions: qs.slice(0, 200), loginsByDay: days };
  },

  /* مدة شرح الدرس على السبورة: تُحسب من أحجام ملفات الصوت المحفوظة في Drive (بلا Azure)، والمقاطع غير المحفوظة تُقدَّر بسرعة الكلام المقاسة */
  durcalc: function (r) {
    try { readToken_(r.token, 's'); } catch (e) { readToken_(r.token, 't'); }
    const key = String(r.key || '').slice(0, 10), fp = String(r.fp || '').slice(0, 40);
    if (!/^\d-\d{1,2}$/.test(key) || !fp) return { ok: false, error: 'bad' };
    const voice = TTS_VOICES[r.voice] ? String(r.voice) : 'ar-SA-HamedNeural';
    const rate = Math.max(-30, Math.min(30, Math.round(+r.rate || 0)));
    const chunks = Array.isArray(r.chunks) ? r.chunks.slice(0, 500) : [];
    const folder = ttsFolder_();
    let sec = 0, found = 0, total = 0, fChars = 0, mChars = 0;
    chunks.forEach(function (c) {
      const nm = ttsName_(voice, rate, c); if (!nm) return; total++;
      const it = folder.getFilesByName(nm.name);
      if (it.hasNext()) { const b = it.next().getSize(); sec += b * 8 / 48000; found++; fChars += nm.chars; }
      else mChars += nm.chars;
    });
    let ratio = +(prop_('DURRATIO') || 0) || 0.075;
    if (found && fChars > 200) { ratio = sec / fChars; const old = +(prop_('DURRATIO') || 0); props_().setProperty('DURRATIO', String(old ? old * 0.7 + ratio * 0.3 : ratio)); }
    sec += mChars * ratio;
    const e = { fp: fp, sec: Math.round(sec), says: Math.max(0, Math.min(2000, +r.says || 0)), chunks: total, found: found, t: Date.now() };
    props_().setProperty('DUR|' + key + '|' + voice, JSON.stringify(e));
    return { ok: true, e: e };
  },
  durget: function (r) {
    const all = props_().getProperties(), d = {};
    Object.keys(all).forEach(function (k) { if (k.indexOf('DUR|') === 0) { try { d[k.slice(4)] = JSON.parse(all[k]); } catch (e) {} } });
    return { ok: true, d: d };
  },
  tts: function (r) {
    let who = '';
    try { who = readToken_(r.token, 's'); } catch (e) { readToken_(r.token, 't'); who = 'TEACHER'; }
    const key = prop_('TTSKEY'), region = prop_('TTSREGION') || 'uaenorth';
    if (!key) return { ok: false, error: 'tts_off' };
    const voice = TTS_VOICES[r.voice] ? String(r.voice) : 'ar-SA-HamedNeural';
    const rate = Math.max(-30, Math.min(30, Math.round(+r.rate || 0)));
    const nm = ttsName_(voice, rate, r.segs);
    if (!nm) return { ok: false, error: 'empty' };
    const segs = nm.segs, chars = nm.chars, name = nm.name;
    const folder = ttsFolder_();
    const it = folder.getFilesByName(name);
    if (it.hasNext()) return { ok: true, audio: Utilities.base64Encode(it.next().getBlob().getBytes()), cached: true };
    const c = CacheService.getScriptCache(), ck = 'tts_' + who, n = +(c.get(ck) || 0);
    if (who !== 'TEACHER' && who !== 'DEMO' && n >= TTS_USER_HOUR) return { ok: false, error: 'tts_limit' };
    if (ttsMonth_().used + chars > TTS_MONTH_CAP) return { ok: false, error: 'tts_quota' };
    const en = TTS_EN[TTS_VOICES[voice]], pr = (rate >= 0 ? '+' : '') + rate + '%';
    const multi = /Multilingual/.test(voice);
    const ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="ar-SA">' + (multi
      ? '<voice name="' + voice + '">' + segs.map(function (x) {
          return '<lang xml:lang="' + (x.l === 'en' ? 'en-US' : 'ar-SA') + '"><prosody rate="' + pr + '">' + xml_(x.t) + '</prosody></lang>';
        }).join(' ') + TTS_TAIL + '</voice>'
      : segs.map(function (x, i) {
          return '<voice name="' + (x.l === 'en' ? en : voice) + '"><prosody rate="' + pr + '">' + xml_(x.t) + '</prosody>' + (i === segs.length - 1 ? TTS_TAIL : '') + '</voice>';
        }).join('')) + '</speak>';
    const res = ttsCall_(key, region, ssml), code = res.getResponseCode();
    if (code !== 200) return { ok: false, error: code === 401 ? 'tts_key' : code === 429 ? 'tts_busy' : code === 403 ? 'tts_quota' : 'tts_error', detail: code };
    c.put(ck, String(n + 1), 3600);
    ttsAddUse_(chars);
    const blob = res.getBlob().setName(name).setContentType('audio/mpeg');
    try { folder.createFile(blob); } catch (e) {}
    return { ok: true, audio: Utilities.base64Encode(blob.getBytes()), cached: false };
  },
  tttskey: function (r) {
    readToken_(r.token, 't');
    const k = String(r.key || '').trim(), region = String(r.region || 'uaenorth').trim().toLowerCase();
    if (!k) { props_().deleteProperty('TTSKEY'); return { ok: true, tts: false }; }
    if (!/^[A-Za-z0-9]{20,100}$/.test(k)) return { ok: false, error: 'tts_bad_key' };
    if (!/^[a-z0-9]{3,30}$/.test(region)) return { ok: false, error: 'tts_region' };
    const res = UrlFetchApp.fetch('https://' + region + '.tts.speech.microsoft.com/cognitiveservices/voices/list', { headers: { 'Ocp-Apim-Subscription-Key': k }, muteHttpExceptions: true });
    const code = res.getResponseCode();
    if (code !== 200) return { ok: false, error: code === 401 ? 'tts_key' : 'tts_region', detail: code };
    ttsFolder_();
    props_().setProperties({ TTSKEY: k, TTSREGION: region });
    return { ok: true, tts: true };
  },
  ttsinfo: function (r) {
    readToken_(r.token, 't');
    const u = ttsMonth_();
    return { ok: true, tts: !!prop_('TTSKEY'), region: prop_('TTSREGION') || '', used: u.used, cap: TTS_MONTH_CAP };
  },
  tlog: function (r) {
    readToken_(r.token, 't');
    const op = String(r.op || 'list');
    if (op === 'profile') {
      const p = r.profile || {}, o = {};
      ['name', 'college', 'dept', 'course', 'term', 'head'].forEach(function (k) { o[k] = String(p[k] || '').slice(0, 120); });
      props_().setProperty('TPROFILE', JSON.stringify(o));
      return { ok: true, profile: o };
    }
    if (op === 'add') {
      const e = r.entry || {};
      const lk = String(e.lessonKey || '').slice(0, 10), d = String(e.date || '').slice(0, 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d) || !lk) return { ok: false, error: 'bad_entry' };
      const id = 'L' + Date.now().toString(36) + Math.floor(Math.random() * 1e3);
      return lock_(function () {
        append_('TeachLog', { id: id, date: d, lessonKey: lk, sectionId: String(e.sectionId || ''), hours: Math.max(0, Math.min(12, +e.hours || 0)), method: String(e.method || '').slice(0, 60), notes: String(e.notes || '').slice(0, 500), createdAt: now_() });
        return { ok: true, id: id };
      });
    }
    if (op === 'delete') {
      return lock_(function () {
        const x = rows_('TeachLog').filter(function (y) { return String(y.id) === String(r.id); })[0];
        if (!x) return { ok: false, error: 'not_found' };
        sh_('TeachLog').deleteRow(x._row); return { ok: true };
      });
    }
    const fmt = function (v) { return v instanceof Date ? Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd') : String(v); };
    const log = rows_('TeachLog').map(function (x) { return { id: String(x.id), date: fmt(x.date), lessonKey: String(x.lessonKey), sectionId: String(x.sectionId), hours: +x.hours || 0, method: String(x.method || ''), notes: String(x.notes || '') }; });
    const real = function (x) { return String(x.studentId) !== 'DEMO' && String(x.studentId) !== 'TEACHER'; };
    let prof = {}; try { prof = JSON.parse(prop_('TPROFILE') || '{}'); } catch (e) {}
    return { ok: true, log: log, profile: prof, totals: {
      results: rows_('Results').filter(real).length, logins: rows_('Logins').filter(real).length,
      questions: rows_('Questions').filter(real).length, tts: ttsMonth_().used } };
  },
  tquestions: function (r) {
    readToken_(r.token, 't');
    const sid = r.sectionId ? String(r.sectionId) : '';
    const list = rows_('Questions').filter(function (x) { return !sid || String(x.sectionId) === sid; }).slice(-300).reverse().map(function (x) {
      return { time: new Date(x.time).toISOString(), studentId: String(x.studentId), lessonKey: x.lessonKey, lessonTitle: x.lessonTitle, question: x.question, answer: x.answer };
    });
    return { ok: true, questions: list, ai: false };
  },

  /* توزيع درجة الوحدة (4) للأعمال الفصلية: [اختبر نفسك، الأمثلة والتمارين التفاعلية، التجارب العملية التفاعلية، أسئلة المشاركة]، واحد لكل الأجهزة */
  twkw: function (r) {
    readToken_(r.token, 't');
    const w = (r.wkw || []).map(Number);
    while (w.length === 3) w.push(0);
    if (w.length !== 4 || w.some(function (x) { return !(x >= 0 && x <= 4); })) return { ok: false, error: 'bad_wkw' };
    if (Math.round(w.reduce(function (a, x) { return a + x; }, 0) * 100) / 100 !== 4) return { ok: false, error: 'bad_wkw' };
    props_().setProperty('WKW', JSON.stringify(w));
    return { ok: true, wkw: w };
  },
  tdata: function (r) {
    readToken_(r.token, 't');
    const sections = rows_('Sections').map(function (s) { return { id: String(s.id), name: s.name }; });
    const stats = {};
    rows_('Results').forEach(function (x) {
      const id = String(x.studentId);
      const s = stats[id] || (stats[id] = { quiz: {}, prob: {}, lab: {}, board: {}, bq: {}, done: {}, attempts: 0 });
      if (x.kind === 'done') { s.done[x.lessonKey] = 1; return; }
      if (x.kind === 'lab') { if (s.lab[x.lessonKey] == null || +x.percent > s.lab[x.lessonKey]) s.lab[x.lessonKey] = +x.percent; return; }
      if (x.kind === 'board') { if (s.board[x.lessonKey] == null || +x.percent > s.board[x.lessonKey]) s.board[x.lessonKey] = +x.percent; return; }
      if (x.kind === 'bq') { if (s.bq[x.lessonKey] == null || +x.percent > s.bq[x.lessonKey]) s.bq[x.lessonKey] = +x.percent; return; }
      s.attempts++;
      const bucket = x.kind === 'quiz' ? s.quiz : s.prob;
      if (bucket[x.lessonKey] == null || +x.percent > bucket[x.lessonKey]) bucket[x.lessonKey] = +x.percent;
    });
    const pm = privMap_();
    const students = rows_('Students').map(function (st) {
      const s = stats[String(st.id)] || { quiz: {}, prob: {}, lab: {}, board: {}, bq: {}, done: {}, attempts: 0 };
      return {
        id: String(st.id), name: st.name, sectionId: String(st.sectionId), hasPw: !!st.pwHash,
        firstLogin: st.firstLogin ? new Date(st.firstLogin).toISOString() : '',
        lastLogin: st.lastLogin ? new Date(st.lastLogin).toISOString() : '',
        lastSeen: st.lastSeen ? new Date(st.lastSeen).toISOString() : '',
        loginCount: +st.loginCount || 0, totalSec: +st.totalSec || 0,
        quiz: s.quiz, prob: s.prob, lab: s.lab || {}, board: s.board, bq: s.bq, done: Object.keys(s.done), attempts: s.attempts, priv: pm[String(st.id).trim()] || ''
      };
    });
    return { ok: true, sections: sections, students: students, sheetUrl: ss_().getUrl(), ai: false, wkw: wkw_() };
  },
  tstudent: function (r) {
    readToken_(r.token, 't');
    const id = cleanId_(r.id);
    const results = rows_('Results').filter(function (x) { return String(x.studentId) === id; }).map(function (x) {
      return { time: new Date(x.time).toISOString(), kind: x.kind, lessonKey: x.lessonKey, lessonTitle: x.lessonTitle, score: x.score, max: x.max, percent: x.percent, detail: x.detail };
    });
    const logins = rows_('Logins').filter(function (x) { return String(x.studentId) === id; }).map(function (x) { return { time: new Date(x.time).toISOString(), device: x.device }; });
    return { ok: true, results: results, logins: logins };
  },
  tresults: function (r) {
    readToken_(r.token, 't');
    const sid = r.sectionId ? String(r.sectionId) : '';
    const list = rows_('Results').filter(function (x) { return x.kind !== 'done' && x.kind !== 'board' && x.kind !== 'bq' && (!sid || String(x.sectionId) === sid); }).map(function (x) {
      return { time: new Date(x.time).toISOString(), studentId: String(x.studentId), sectionId: String(x.sectionId), kind: x.kind, lessonKey: x.lessonKey, lessonTitle: x.lessonTitle, score: x.score, max: x.max, percent: x.percent };
    });
    return { ok: true, results: list };
  },
  tsection: function (r) {
    readToken_(r.token, 't');
    return lock_(function () {
      const name = String(r.name || '').trim();
      if (r.op === 'add') {
        if (!name) return { ok: false, error: 'name_required' };
        const id = 'S' + Date.now().toString(36);
        append_('Sections', { id: id, name: name, createdAt: now_() });
        return { ok: true, id: id };
      }
      const s = rows_('Sections').filter(function (x) { return String(x.id) === String(r.id); })[0];
      if (!s) return { ok: false, error: 'not_found' };
      if (r.op === 'rename') { update_('Sections', s._row, { name: name }); return { ok: true }; }
      if (r.op === 'delete') {
        const used = rows_('Students').some(function (st) { return String(st.sectionId) === String(r.id); });
        if (used) return { ok: false, error: 'section_not_empty' };
        sh_('Sections').deleteRow(s._row); return { ok: true };
      }
      return { ok: false, error: 'bad_op' };
    });
  },
  tstudents: function (r) {
    readToken_(r.token, 't');
    if (r.op === 'resetpw') { const s0 = findStudent_(r.id); if (!s0) return { ok: false, error: 'not_found' }; cells_('Students', s0._row, { pwHash: '', salt: '' }); const x0 = exStudent_(String(s0.id)); if (x0) cells_('ExamStudents', x0._row, { pwHash: '', salt: '' }); return { ok: true }; }
    return lock_(function () {
      if (r.op === 'import') {
        const secs = rows_('Sections'), byName = {};
        secs.forEach(function (s) { byName[String(s.name).trim()] = String(s.id); });
        const existing = {}; rows_('Students').forEach(function (s) { existing[String(s.id).trim()] = s; });
        let added = 0, updated = 0, skipped = 0;
        const newRows = [];
        (r.rows || []).forEach(function (row) {
          const id = cleanId_(row.id), name = String(row.name || '').trim(), sec = String(row.section || r.defaultSection || '').trim();
          if (!id || !name) { skipped++; return; }
          let sid = '';
          if (sec) {
            if (byName[sec]) sid = byName[sec];
            else if (secs.some(function (s) { return String(s.id) === sec; })) sid = sec;
            else { sid = 'S' + Date.now().toString(36) + Math.floor(Math.random() * 1e4); append_('Sections', { id: sid, name: sec, createdAt: now_() }); byName[sec] = sid; }
          }
          if (existing[id]) { update_('Students', existing[id]._row, { name: name, sectionId: sid || existing[id].sectionId }); updated++; }
          else { newRows.push(SHEETS.Students.map(function (c) { return ({ id: id, name: name, sectionId: sid, createdAt: now_(), loginCount: 0, totalSec: 0 })[c] || (c === 'loginCount' || c === 'totalSec' ? 0 : ''); })); existing[id] = { _row: -1 }; added++; }
        });
        if (newRows.length) { const sh = sh_('Students'); sh.getRange(sh.getLastRow() + 1, 1, newRows.length, SHEETS.Students.length).setNumberFormat('@').setValues(newRows); }
        return { ok: true, added: added, updated: updated, skipped: skipped };
      }
      const st = findStudent_(r.id);
      if (!st) return { ok: false, error: 'not_found' };
      if (r.op === 'update') { update_('Students', st._row, { name: r.name != null ? String(r.name) : undefined, sectionId: r.sectionId != null ? String(r.sectionId) : undefined }); return { ok: true }; }
      if (r.op === 'resetpw') { update_('Students', st._row, { pwHash: '', salt: '' }); const x0 = exStudent_(String(st.id)); if (x0) update_('ExamStudents', x0._row, { pwHash: '', salt: '' }); return { ok: true }; }
      if (r.op === 'delete') { sh_('Students').deleteRow(st._row); return { ok: true }; }
      return { ok: false, error: 'bad_op' };
    });
  }
};

/* ---------------- الاختبارات الفصلية ---------------- */
/* الأسئلة من أمثلة الحقيبة التدريبية ومسائلها، والأرقام تتغير لكل متدرب، وترتيب الخيارات الأربعة عشوائي.
   التصحيح في الخادم فقط، ولا تصل الدرجة ولا الإجابة الصحيحة إلى المتدرب؛ تظهر للمدرب في لوحته */
const EXAM_DEF = {
  E1: { t: 'الاختبار التجريبي 1', max: 20, min: 60, cover: 'من بداية المقرر حتى ورقة العمل (١) في الوحدة الثانية', items: [{ pool: 'Q', n: 2 }, { pool: 'V', n: 2 }, { pool: 'M', n: 2 }, { pool: 'N', n: 3 }, { pool: 'F', n: 1 }, { num: 'R' }, { num: 'P' }, { num: 'M' }, { num: 'N' }, { num: 'F' }] },
  /* الثاني: 10 نظرية + 5 حسابية = 20 (الحرارة نظري فقط من ملف المدرب، والحسابية بلا تكرار) */
  /* الثاني والنهائي جاهزان مثل الأول: لا يظهران للمتدربين إلا عندما يفتحهما المدرب (soon: true يعيد الاختبار مؤجلا) */
  E2: { t: 'الاختبار التجريبي 2', max: 20, min: 60, cover: 'من درس «الشغل» حتى ورقة العمل في الوحدة الرابعة', items: [{ pool: 'W', n: 3 }, { pool: 'H', n: 3 }, { pool: 'E', n: 2 }, { pool: 'K', n: 2 }, { num: 'W' }, { num: 'E' }, { num: 'K' }, { num: ['W', 'E', 'K'] }, { num: ['W', 'E', 'K'] }] },
  /* النهائي: 20 نظرية + 10 حسابية = 40، كامل المقرر */
  E3: { t: 'الاختبار التجريبي النهائي', max: 40, min: 90, cover: 'كامل المقرر', items: [{ pool: 'Q', n: 2 }, { pool: 'V', n: 1 }, { pool: 'M', n: 1 }, { pool: 'N', n: 2 }, { pool: 'F', n: 1 }, { pool: 'W', n: 2 }, { pool: 'H', n: 3 }, { pool: 'E', n: 2 }, { pool: 'K', n: 2 }, { pool: 'C', n: 4 },
    { num: 'R' }, { num: ['M', 'N'] }, { num: 'F' }, { num: 'W' }, { num: ['W', 'E'] }, { num: 'E' }, { num: 'K' }, { num: 'C' }, { num: 'C' }, { num: ['P', 'M', 'N', 'W', 'E', 'K'] }] }
};
/* الاختبار التعريفي: اختبار قصير للجميع (المدرب والمتدربين) للتعرف على طريقة الاختبار: 3 أسئلة نظرية ومسألة حسابية واحدة = 5 درجات،
   20 دقيقة، من بنك الفصلي الأول، ولا يدخل في الدرجات. الرقم 1000 متدرب تجريبي للمدرب */
const EXAM_TRIAL_ID = '1000';
EXAM_DEF.ET = { trial: true, t: 'الاختبار التعريفي', max: 5, min: 20, cover: 'للتعرف على طريقة الاختبار فقط، ولا يدخل في النتائج', items: [{ pool: 'Q', n: 1 }, { pool: 'V', n: 1 }, { pool: 'N', n: 1 }, { num: ['R', 'P', 'M', 'N', 'F'] }] };
function ri_(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function pick_(a) { return a[Math.floor(Math.random() * a.length)]; }
function nf_(x) { const r = Math.round(x * 100) / 100; return String(Object.is(r, -0) ? 0 : r).replace('-', '−'); }
function cosd_(d) { return Math.cos(d * Math.PI / 180); }
function sind_(d) { return Math.sin(d * Math.PI / 180); }
function un_(u) { return function (x) { return '`' + nf_(x) + (u ? ' ' + u : '') + '`'; }; }
function fixed_(q, o) { return function () { return { q: q, o: o }; }; }
/* بنك الأسئلة النظرية من الحقيبة التدريبية (حتى صفحة 51) على نمط اختبار المدرب السابق.
   كل سؤال: [نص السؤال، [الإجابة الصحيحة، ثلاثة خيارات خاطئة]]. يسحب لكل متدرب أسئلة مختلفة من كل مجموعة، وتعرض الخيارات بترتيب عشوائي */
const EXAM_POOL = {
  /* الكميات الفيزيائية والوحدات والتحويل والتحقق من القوانين */
  Q: [
    ['الكميات التي تعرف بذاتها ولا تعرف بدلالة الكميات الفيزيائية الأخرى هي الكميات الفيزيائية:', ['الأساسية', 'المشتقة', 'المتجهة', 'القياسية']],
    ['الكميات التي تعرف بدلالة الكميات الأساسية هي الكميات:', ['المشتقة', 'الأساسية', 'القياسية فقط', 'لا شيء مما ذكر']],
    ['........ ليست من الكميات المشتقة:', ['الكتلة', 'المساحة', 'الحجم', 'الكثافة']],
    ['........ ليست من الكميات الأساسية:', ['السرعة', 'الطول', 'الزمن', 'الكتلة']],
    ['........ من الكميات الأساسية:', ['شدة التيار', 'القوة', 'الشغل', 'الضغط']],
    ['........ من الكميات المشتقة:', ['التسارع', 'الطول', 'الزمن', 'درجة الحرارة']],
    ['وحدة قياس الكتلة في النظام الدولي SI هي:', ['الكيلوجرام `kg`', 'الجرام `g`', 'النيوتن `N`', 'الجول `J`']],
    ['وحدة قياس الزمن في النظام الدولي SI هي:', ['الثانية `s`', 'الدقيقة', 'الساعة `h`', 'المتر `m`']],
    ['وحدة قياس الطول في النظام الدولي SI هي:', ['المتر `m`', 'السنتيمتر `cm`', 'الكيلومتر `km`', 'الكيلوجرام `kg`']],
    ['وحدة قياس شدة التيار الكهربائي في النظام الدولي SI هي:', ['الأمبير `A`', 'الكلفن `K`', 'المول `mol`', 'الشمعة `cd`']],
    ['وحدة قياس درجة الحرارة في النظام الدولي SI هي:', ['الكلفن `K`', 'الأمبير `A`', 'المول `mol`', 'الجول `J`']],
    ['وحدة قياس شدة الإضاءة في النظام الدولي SI هي:', ['الشمعة `cd`', 'المول `mol`', 'الكلفن `K`', 'الأمبير `A`']],
    ['وحدة قياس كمية المادة في النظام الدولي SI هي:', ['المول `mol`', 'الكيلوجرام `kg`', 'الشمعة `cd`', 'الكلفن `K`']],
    ['وحدة قياس القوة النيوتن `N` تساوي:', ['`kg·m/s²`', '`kg·m²/s²`', '`kg·m/s`', '`m/s²`']],
    ['وحدة قياس الشغل والطاقة الجول `J` تساوي:', ['`kg·m²/s²`', '`kg·m/s²`', '`kg·m/s`', '`N/m`']],
    ['وحدة قياس المساحة هي:', ['`m²`', '`m³`', '`m`', '`m/s`']],
    ['وحدة قياس الحجم هي:', ['`m³`', '`m²`', '`m`', '`kg`']],
    ['عند التحويل من وحدة كبيرة إلى وحدة صغيرة:', ['نضرب في معامل التحويل', 'نقسم على معامل التحويل', 'نجمع معامل التحويل', 'لا يتغير العدد']],
    ['عند التحويل من وحدة صغيرة إلى وحدة كبيرة:', ['نقسم على معامل التحويل', 'نضرب في معامل التحويل', 'نطرح معامل التحويل', 'لا يتغير العدد']],
    ['للتحويل من `km/h` إلى `m/s`:', ['نقسم على `3.6`', 'نضرب في `3.6`', 'نقسم على `60`', 'نضرب في `1000`']],
    ['للتحويل من `m/s` إلى `km/h`:', ['نضرب في `3.6`', 'نقسم على `3.6`', 'نضرب في `60`', 'نقسم على `1000`']],
    ['الساعة الواحدة `1 h` تساوي:', ['`3600 s`', '`60 s`', '`1000 s`', '`360 s`']],
    ['الكيلومتر الواحد `1 km` يساوي:', ['`1000 m`', '`100 m`', '`10 m`', '`3600 m`']],
    ['المتر الواحد `1 m` يساوي:', ['`100 cm`', '`10 cm`', '`1000 cm`', '`3.6 cm`']],
    ['الكيلوجرام الواحد `1 kg` يساوي:', ['`1000 g`', '`100 g`', '`10 g`', '`3600 g`']],
    ['يكون القانون صحيحا من حيث الوحدات إذا:', ['تساوت وحدتا طرفيه', 'اختلفت وحدتا طرفيه', 'احتوى على عملية جمع', 'لا شيء مما ذكر']],
    ['عند الجمع أو الطرح في القانون يجب أن تكون وحدات الحدود:', ['متساوية', 'مختلفة', 'أساسية فقط', 'مشتقة فقط']],
    ['القانون الصحيح من حيث الوحدات هو:', ['`Vf = Vi + a·t`', '`Vf = Vi + x·t`', '`v = x·t`', '`F = m / a`']],
    ['القانون الخاطئ من حيث الوحدات هو:', ['`v = x·t`', '`F = m·a`', '`W = F·x`', '`Vf = Vi + a·t`']],
    ['تعتبر كمية فيزيائية أساسية:', ['الزمن', 'التسارع', 'الشغل', 'الزخم']]
  ],
  /* الكميات القياسية والمتجهة وجمع المتجهات وتحليلها وضربها */
  V: [
    ['الكميات التي تحدد بالمقدار فقط هي الكميات:', ['القياسية', 'الرياضية', 'المتجهة', 'لا شيء مما ذكر']],
    ['الكمية المتجهة هي الكمية التي تحدد بـ:', ['المقدار والاتجاه', 'المقدار فقط', 'الاتجاه فقط', 'الوحدة فقط']],
    ['أي مما يلي كمية متجهة؟', ['الإزاحة', 'الكتلة', 'الزمن', 'المسافة']],
    ['من الكميات المتجهة:', ['القوة', 'درجة الحرارة', 'الكتلة', 'الزمن']],
    ['أي مما يلي كمية قياسية؟', ['الكتلة', 'القوة', 'التسارع', 'الإزاحة']],
    ['من الكميات القياسية:', ['درجة الحرارة', 'السرعة', 'القوة', 'الإزاحة']],
    ['يمكن تحليل المتجه إلى:', ['مركبتين X و Y', 'متجه قوة', 'مركبة واحدة فقط', 'متجه مواز']],
    ['المركبة السينية لمتجه `A` يصنع زاوية `θ` مع المحور السيني الموجب هي:', ['`Ax = A·cosθ`', '`Ax = A·sinθ`', '`Ax = A·tanθ`', '`Ax = A / cosθ`']],
    ['المركبة الصادية لمتجه `A` يصنع زاوية `θ` مع المحور السيني الموجب هي:', ['`Ay = A·sinθ`', '`Ay = A·cosθ`', '`Ay = A·tanθ`', '`Ay = A / sinθ`']],
    ['مقدار المتجه `A` من مركبتيه هو:', ['`A = √(Ax² + Ay²)`', '`A = Ax + Ay`', '`A = Ax·Ay`', '`A = Ax − Ay`']],
    ['إذا كانت الزاوية بين متجهين `0°` فإن محصلتهما:', ['`C = A + B`', '`C = |A − B|`', '`C = √(A² + B²)`', '`C = 0`']],
    ['إذا كانت الزاوية بين متجهين `90°` فإن محصلتهما:', ['`C = √(A² + B²)`', '`C = A + B`', '`C = |A − B|`', '`C = A·B`']],
    ['إذا كانت الزاوية بين متجهين `180°` فإن محصلتهما:', ['`C = |A − B|`', '`C = A + B`', '`C = √(A² + B²)`', '`C = A·B`']],
    ['في قانون جيب التمام إذا كانت الزاوية بين المتجهين أصغر من `90°` نستخدم الإشارة:', ['الموجبة', 'السالبة', 'لا نستخدم إشارة', 'لا شيء مما ذكر']],
    ['في قانون جيب التمام إذا كانت الزاوية بين المتجهين أكبر من `90°` نستخدم الإشارة:', ['السالبة', 'الموجبة', 'لا نستخدم إشارة', 'لا شيء مما ذكر']],
    ['ناتج الضرب القياسي لمتجهين كمية:', ['قياسية', 'متجهة', 'أساسية', 'لا شيء مما ذكر']],
    ['ناتج الضرب الاتجاهي لمتجهين كمية:', ['متجهة', 'قياسية', 'أساسية', 'لا شيء مما ذكر']],
    ['الضرب القياسي لمتجهين ممثلين بالإحداثيات القطبية:', ['`A·B = |A||B|·cosθ`', '`A·B = |A||B|·sinθ`', '`A·B = |A| + |B|`', '`A·B = |A| / |B|`']],
    ['مقدار الضرب الاتجاهي لمتجهين ممثلين بالإحداثيات القطبية:', ['`|A × B| = |A||B|·sinθ`', '`|A × B| = |A||B|·cosθ`', '`|A × B| = |A| + |B|`', '`|A × B| = |A| / |B|`']],
    ['تحدد بالمقدار فقط هي الكميات:', ['القياسية', 'المتجهة', 'الرياضية', 'لا شيء مما ذكر']],
    ['تحدد بالمقدار والاتجاه هي الكميات:', ['المتجهة', 'القياسية', 'الرياضية', 'لا شيء مما ذكر']]
  ],
  /* المسافة والإزاحة والسرعة والتسارع ومعادلات الحركة */
  M: [
    ['الفرق بين نقطة البداية ونقطة النهاية هو مفهوم:', ['الإزاحة', 'المسافة', 'المتجه', 'القوة']],
    ['وصف للطول بين نقطتين ويعتبر كمية قياسية هو مفهوم:', ['المسافة', 'الإزاحة', 'السرعة', 'التسارع']],
    ['المسافة كمية:', ['قياسية', 'متجهة', 'أساسية فقط', 'لا شيء مما ذكر']],
    ['الإزاحة كمية:', ['متجهة', 'قياسية', 'أساسية فقط', 'لا شيء مما ذكر']],
    ['النسبة بين إزاحة الجسم المتحرك والزمن هي:', ['السرعة المتوسطة', 'التسارع', 'المسافة', 'القوة']],
    ['التغير في السرعة بالنسبة للزمن هو:', ['التسارع', 'السرعة', 'الإزاحة', 'القوة']],
    ['وحدة قياس السرعة هي:', ['`m/s`', '`m/s²`', '`m`', '`N`']],
    ['وحدة قياس التسارع هي:', ['`m/s²`', '`m/s`', '`m`', '`N`']],
    ['يصبح التسارع موجبا عندما:', ['تزداد سرعة الجسم', 'يتوقف الجسم', 'تقل سرعة الجسم', 'لا شيء مما ذكر']],
    ['في مسائل معادلات الحركة إذا تباطأ الجسم في حركته فهذا يعني أن:', ['التسارع سالب', 'التسارع موجب', 'السرعة الابتدائية = صفر', 'السرعة النهائية = صفر']],
    ['إذا بدأ الجسم حركته من السكون فإن:', ['السرعة الابتدائية = صفر', 'السرعة النهائية = صفر', 'التسارع سالب', 'التسارع = صفر']],
    ['إذا توقف الجسم فإن:', ['السرعة النهائية = صفر', 'السرعة الابتدائية = صفر', 'التسارع موجب', 'الإزاحة = صفر']],
    ['معادلة السرعة النهائية لجسم يتحرك بتسارع ثابت:', ['`Vf = Vi + a·t`', '`Vf = Vi − x·t`', '`Vf = a / t`', '`Vf = Vi·t`']],
    ['معادلة الإزاحة لجسم يتحرك بتسارع ثابت:', ['`x = Vi·t + ½·a·t²`', '`x = Vi + a·t`', '`x = a·t`', '`x = Vf / t`']],
    ['السرعة المتوسطة لجسم يتحرك بتسارع ثابت:', ['`v̄ = (Vf + Vi) / 2`', '`v̄ = (Vf − Vi) / 2`', '`v̄ = Vf·Vi`', '`v̄ = (Vf + Vi)·t`']],
    ['معادلة الحركة التي لا تحتوي على الزمن:', ['`Vf² = Vi² + 2·a·x`', '`Vf = Vi + a·t`', '`x = Vi·t + ½·a·t²`', '`x = v̄·t`']],
    ['قانون التسارع:', ['`a = (Vf − Vi) / t`', '`a = (Vf + Vi) / t`', '`a = Vf·t`', '`a = x / t`']],
    ['قانون السرعة المتوسطة:', ['`v = x / t`', '`v = x·t`', '`v = t / x`', '`v = a·x`']]
  ],
  /* القوة وقوانين نيوتن والوزن */
  N: [
    ['قوة جذب الأرض للجسم تعني:', ['الوزن', 'الكتلة', 'الاحتكاك', 'قوة رد الفعل']],
    ['قيمة وزن الجسم ........ الكتلة على سطح الأرض:', ['أكبر من', 'أصغر من', 'مساوية لـ', 'لا علاقة بينهما']],
    ['يبقى الجسم في حالة سكون ما لم تؤثر عليه قوة خارجية هو مفهوم:', ['قانون نيوتن الأول', 'قانون نيوتن الثاني', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['لكل فعل رد فعل مساو له في المقدار ومعاكس له في الاتجاه هو مفهوم:', ['قانون نيوتن الثالث', 'قانون نيوتن الأول', 'قانون نيوتن الثاني', 'لا شيء مما ذكر']],
    ['القوة المؤثرة على جسم تكسبه تسارعا يتناسب طرديا مع القوة وعكسيا مع كتلة الجسم هو مفهوم:', ['قانون نيوتن الثاني', 'قانون نيوتن الأول', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['ميل الجسم إلى المحافظة على حالته الحركية هو:', ['القصور الذاتي', 'التسارع', 'الاحتكاك', 'الوزن']],
    ['دفع أو سحب على الجسم هو مفهوم:', ['القوة', 'التسارع', 'السرعة', 'الإزاحة']],
    ['القوة كمية:', ['متجهة', 'قياسية', 'أساسية', 'لا شيء مما ذكر']],
    ['وحدة قياس القوة هي:', ['النيوتن `N`', 'الجول `J`', 'الكيلوجرام `kg`', '`m/s²`']],
    ['اندفاع راكب السيارة للأمام عند توقفها المفاجئ تفسره:', ['قانون نيوتن الأول', 'قانون نيوتن الثاني', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['حركة الأرض والكواكب والنجوم باستمرار دون أن تتوقف مثال على:', ['قانون نيوتن الأول', 'قانون نيوتن الثاني', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['المجداف يدفع الماء للخلف فيندفع القارب للأمام، وهذا تطبيق على:', ['قانون نيوتن الثالث', 'قانون نيوتن الأول', 'قانون نيوتن الثاني', 'لا شيء مما ذكر']],
    ['غازات الصاروخ تندفع للأسفل فيندفع الصاروخ للأعلى، وهذا تطبيق على:', ['قانون نيوتن الثالث', 'قانون نيوتن الأول', 'قانون نيوتن الثاني', 'لا شيء مما ذكر']],
    ['ارتداد البندقية للخلف عند انطلاق الرصاصة للأمام تطبيق على:', ['قانون نيوتن الثالث', 'قانون نيوتن الأول', 'قانون نيوتن الثاني', 'لا شيء مما ذكر']],
    ['دفع عربة تسوق فارغة وأخرى ممتلئة بالقوة نفسها، فتتسارع الممتلئة أقل، وهذا تطبيق على:', ['قانون نيوتن الثاني', 'قانون نيوتن الأول', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['عند ثبات القوة المؤثرة إذا زادت كتلة الجسم فإن تسارعه:', ['يقل', 'يزداد', 'لا يتغير', 'يصبح صفرا']],
    ['عند ثبات الكتلة إذا زادت القوة المؤثرة على الجسم فإن تسارعه:', ['يزداد', 'يقل', 'لا يتغير', 'يصبح صفرا']],
    ['كلما زادت كتلة الجسم فإن قصوره الذاتي:', ['يزداد', 'يقل', 'لا يتغير', 'ينعدم']],
    ['قوتا الفعل ورد الفعل تؤثران على:', ['جسمين مختلفين', 'الجسم نفسه', 'سطح أفقي فقط', 'لا شيء مما ذكر']],
    ['قانون نيوتن الثاني هو:', ['`F = m·a`', '`F = m / a`', '`F = a / m`', '`F = m + a`']],
    ['قانون الوزن هو:', ['`W = m·g`', '`W = m / g`', '`W = g / m`', '`W = m + g`']],
    ['الكتلة كمية ........ والوزن كمية ........:', ['قياسية / متجهة', 'متجهة / قياسية', 'متجهة / متجهة', 'قياسية / قياسية']],
    ['ممانعة الجسم لتغيير حالته من السكون إلى الحركة أو العكس هو مفهوم:', ['القصور الذاتي', 'الشغل', 'الاحتكاك', 'لا شيء مما ذكر']],
    ['القانون الذي يربط القوة بالكتلة والتسارع هو:', ['قانون نيوتن الثاني', 'قانون نيوتن الأول', 'قانون نيوتن الثالث', 'لا شيء مما ذكر']],
    ['مقدار جذب الأرض للجسم هو تعريف:', ['الوزن', 'الكتلة', 'التسارع', 'السرعة الآنية']]
  ],
  /* الاحتكاك */
  F: [
    ['القوة المعيقة للحركة والتي تحدث بين سطحين هي قوة:', ['الاحتكاك', 'نيوتن', 'رد الفعل', 'لا شيء مما ذكر']],
    ['اتجاه قوة الاحتكاك دائما يكون:', ['عكس اتجاه الحركة', 'عمودي على الجسم', 'نفس اتجاه الحركة', 'ليس لها اتجاه محدد']],
    ['قوة الاحتكاك التي تؤثر على الجسم قبل أن يبدأ الحركة هي قوة الاحتكاك:', ['الساكن', 'الحركي', 'رد الفعل', 'لا شيء مما ذكر']],
    ['قوة الاحتكاك التي تؤثر على الجسم أثناء حركته هي قوة الاحتكاك:', ['الحركي', 'الساكن', 'رد الفعل', 'لا شيء مما ذكر']],
    ['معامل الاحتكاك الحركي `μk`:', ['ليس له وحدة', 'وحدته `N`', 'وحدته `kg`', 'وحدته `m/s²`']],
    ['قانون قوة الاحتكاك الحركي:', ['`fk = μk·N`', '`fk = N / μk`', '`fk = μk / N`', '`fk = μk + N`']],
    ['على سطح أفقي تكون القوة العمودية `N`:', ['مساوية للوزن', 'أكبر من الوزن', 'صفرا', 'مساوية لقوة الاحتكاك']],
    ['يتحرك الجسم إذا كانت القوة المؤثرة عليه:', ['أكبر من قوة الاحتكاك', 'أقل من قوة الاحتكاك', 'مساوية للصفر', 'لا شيء مما ذكر']],
    ['لا يتحرك الجسم إذا كانت القوة المؤثرة عليه:', ['أقل من قوة الاحتكاك', 'أكبر من قوة الاحتكاك', 'أكبر من وزنه', 'لا شيء مما ذكر']]
  ]
};
/* بنك الأسئلة النظرية: الاختبار الفصلي الثاني (صفحة 52 الى 113) والنهائي (كامل المقرر) */
Object.assign(EXAM_POOL, {
  /* الشغل والطاقة وحفظ الطاقة */
  W: [
    ['ما تبذله أو تؤثر به قوة على جسم لتحركه مسافة على نفس خط عمل القوة هو:', ['الشغل', 'الطاقة', 'التسارع', 'الإزاحة']],
    ['قانون الشغل إذا كانت القوة تميل بزاوية `θ` على خط عمل المسافة:', ['`W = F·x·cos θ`', '`W = F·x·sin θ`', '`W = F / x`', '`W = m·g`']],
    ['إذا كانت القوة في اتجاه المسافة فإن الشغل:', ['`W = F·x`', '`W = F / x`', '`W = x / F`', '`W = F + x`']],
    ['الشغل كمية:', ['قياسية', 'متجهة', 'أساسية', 'لا شيء مما ذكر']],
    ['وحدة قياس الشغل هي:', ['الجول `J`', 'النيوتن `N`', 'الكلفن `K`', 'الكيلوجرام `kg`']],
    ['الجول `J` يساوي:', ['`N·m`', '`N/m`', '`N·s`', '`m/N`']],
    ['الشغل الذي تقوم به قوة مقدارها `1 N` عندما تزيح جسما مسافة `1 m` في اتجاه القوة هو:', ['الجول', 'النيوتن', 'الكيلوجرام', 'المتر']],
    ['إذا لم يتحرك الجسم (`x = 0`) فإن الشغل:', ['يساوي صفرا', 'يكون موجبا', 'يكون سالبا', 'يساوي القوة']],
    ['إذا كانت القوة عمودية على اتجاه الحركة (`θ = 90°`) فإن الشغل:', ['يساوي صفرا', 'يكون أكبر ما يمكن', 'يكون سالبا', 'يساوي `F·x`']],
    ['إذا كانت القوة عكس اتجاه الحركة (`θ = 180°`) مثل الاحتكاك فإن الشغل:', ['سالب', 'موجب', 'صفر', 'لا يمكن حسابه']],
    ['رجل بذل قوة كبيرة على جسم ولم يستطع تحريكه، فإن الشغل المبذول:', ['صفر', 'موجب', 'سالب', 'يساوي القوة']],
    ['الشغل ينعدم بانعدام:', ['الحركة', 'الكتلة', 'الوزن', 'الزمن']],
    ['القدرة على بذل شغل تعرف بـ:', ['الطاقة', 'القوة', 'الإزاحة', 'التسارع']],
    ['تقاس الطاقة بنفس وحدة قياس:', ['الشغل', 'القوة', 'الكتلة', 'التسارع']],
    ['تنقسم الطاقة الميكانيكية إلى:', ['الطاقة الحركية وطاقة الوضع', 'الطاقة الحرارية والطاقة الكهربائية', 'الطاقة النووية والطاقة الشمسية', 'الطاقة الكيميائية والطاقة الحرارية']],
    ['........ من أنواع الطاقة الميكانيكية:', ['الطاقة الحركية', 'الطاقة الكهربائية', 'الطاقة النووية', 'الطاقة الكيميائية']],
    ['الطاقة التي يحصل عليها الجسم بسبب حركته هي:', ['الطاقة الحركية', 'طاقة الوضع', 'الطاقة الحرارية', 'الطاقة النووية']],
    ['الطاقة التي يحصل عليها الجسم بسبب وضعه (ارتفاعه عن سطح الأرض) هي:', ['طاقة الوضع', 'الطاقة الحركية', 'الطاقة الكهربائية', 'الطاقة الشمسية']],
    ['قانون الطاقة الحركية:', ['`K·E = mv²/2`', '`K·E = m·g·h`', '`K·E = mv/2`', '`K·E = 2·m·v²`']],
    ['قانون طاقة الوضع:', ['`PE = m·g·h`', '`PE = mv²/2`', '`PE = m·g / h`', '`PE = m·h`']],
    ['إذا تضاعفت سرعة جسم فإن طاقته الحركية:', ['تتضاعف أربع مرات', 'تتضاعف مرتين', 'تبقى كما هي', 'تقل إلى النصف']],
    ['مقدار تسارع الجاذبية الأرضية `g` في قانون طاقة الوضع:', ['`9.8 m/s²`', '`9.8 m/s`', '`98 m/s²`', '`0.98 m/s²`']],
    ['في أي نظام معزول الطاقة لا تفنى ولا تستحدث من العدم ولكن يمكن تحويلها من صورة إلى أخرى، هذا نص:', ['مبدأ حفظ الطاقة', 'قانون نيوتن الأول', 'قانون الشغل', 'مبدأ القصور الذاتي']],
    ['النظام الذي لا تدخله طاقة ولا تخرج منه طاقة هو النظام:', ['المعزول', 'المفتوح', 'المتحرك', 'المتسارع']],
    ['الطاقة الميكانيكية هي:', ['مجموع الطاقة الحركية وطاقة الوضع', 'الفرق بين الطاقة الحركية وطاقة الوضع', 'حاصل ضرب الطاقة الحركية في طاقة الوضع', 'الطاقة الحركية فقط']],
    ['قانون الطاقة الميكانيكية:', ['`ME = KE + PE`', '`ME = KE − PE`', '`ME = KE·PE`', '`ME = PE / KE`']],
    ['في النظام المعزول تكون الطاقة الميكانيكية:', ['ثابتة', 'متزايدة', 'متناقصة', 'صفرا']],
    ['في النظام المعزول مجموع التغير في الطاقة الحركية والتغير في طاقة الوضع:', ['يساوي صفرا', 'يساوي الطاقة الحركية', 'يساوي طاقة الوضع', 'يكون سالبا دائما']],
    ['الصيغة التي تعبر عن حفظ الطاقة الميكانيكية في النظام المعزول:', ['`KEf + PEf = KEi + PEi`', '`KEf − PEf = KEi + PEi`', '`KEf + KEi = PEf + PEi`', '`KEf = PEi − KEi`']],
    ['عند سقوط جسم من مكان مرتفع فإن طاقة وضعه أثناء السقوط:', ['تقل', 'تزداد', 'تبقى ثابتة', 'تتضاعف']],
    ['عند سقوط جسم من مكان مرتفع تتحول طاقة وضعه إلى:', ['طاقة حركية', 'طاقة نووية', 'طاقة كيميائية', 'طاقة كهربائية']],
    ['.............. هو ما تبذله أو تؤثر به قوة على جسم لتحركه مسافة على خط عمل القوة:', ['الشغل', 'الاحتكاك', 'الجهد', 'القوة']],
    ['الشغل الذي تقوم به قوة مقدارها 1 نيوتن عندما تزيح جسما مسافة 1 متر في اتجاه القوة يعرف بأنه:', ['الجول', 'الطاقة الكامنة', 'الطاقة الحركية', 'القوة']],
    ['الطاقة التي يحصل عليها الجسم نتيجة وضعه تحت تأثير الجاذبية الأرضية تسمى:', ['الطاقة الكامنة', 'الطاقة الحركية', 'الطاقة الكهربائية', 'الطاقة النووية']],
    ['قانون .............. ينص على أنه في أي نظام معزول ومغلق فإن الطاقة لا تفنى ولا تستحدث من العدم ولكن يمكن تحويلها من صورة إلى أخرى:', ['حفظ الطاقة', 'حفظ القدرة', 'حفظ الجهد', 'حفظ المقاومة']],
    ['.............. هي عبارة عن إنجاز شغل ما:', ['الطاقة', 'القوة', 'السرعة', 'الشحنة']],
    ['وحدة قياس الطاقة في النظام الدولي هي:', ['الجول', 'النيوتن', 'الكولوم', 'الواط']],
    ['الطاقة لا تفنى ولا تستحدث من العدم بل تتحول من شكل إلى آخر، هذا مفهوم:', ['حفظ الطاقة', 'حفظ القوة', 'حفظ الحركة', 'حفظ الشغل']]
  ],
  /* الفيزياء الحرارية */
  /* وحدة الحرارة: أسئلة نظرية فقط من ملف المدرب، بدون قوانين ولا مسائل */
  H: [
    ['الحرارة (كمية الحرارة) تعتبر شكلا من أشكال:', ['الطاقة', 'القوة', 'الكتلة', 'السرعة']],
    ['الحرارة هي عبارة عن:', ['الطاقة الحركية الكلية الموجودة في جزيئات المادة', 'متوسط طاقة حركة جزيئات المادة', 'كتلة جزيئات المادة', 'عدد جزيئات المادة']],
    ['وحدة قياس كمية الحرارة في النظام الدولي هي:', ['الجول', 'الكلفن', 'الواط', 'النيوتن']],
    ['من وحدات قياس كمية الحرارة أيضا:', ['السعر `Calorie`', 'الكلفن', 'الفهرنهايت', 'الباسكال']],
    ['........ ليست من مصادر الطاقة الحرارية:', ['الجاذبية', 'الشمس', 'الاحتكاك', 'الكهرباء']],
    ['........ من مصادر الطاقة الحرارية:', ['التفاعلات الكيميائية', 'الجاذبية', 'الكتلة', 'الضغط الجوي']],
    ['من مصادر الطاقة الحرارية:', ['الشمس والأرض والطاقة النووية', 'الكتلة والوزن', 'السرعة والتسارع', 'الضغط والحجم']],
    ['درجة الحرارة هي مقياس لـ:', ['متوسط طاقة حركة جزيئات المادة', 'الطاقة الحركية الكلية لجزيئات المادة', 'كمية الحرارة في الجسم', 'كتلة جزيئات المادة']],
    ['الفرق بين الحرارة ودرجة الحرارة أن الحرارة هي الطاقة الحركية الكلية لجزيئات المادة، بينما درجة الحرارة:', ['مقياس لمتوسط طاقة حركة جزيئاتها', 'الطاقة الكلية للجسم', 'كمية الحرارة اللازمة لصهره', 'وحدة لقياس الطاقة']],
    ['درجة تجمد الماء في المقياس المئوي:', ['صفر', '32', '273', '100']],
    ['درجة غليان الماء في المقياس المئوي:', ['100', '212', '373', '180']],
    ['درجة تجمد الماء في مقياس الكلفن (المطلق):', ['273', 'صفر', '32', '373']],
    ['درجة غليان الماء في مقياس الكلفن (المطلق):', ['373', '273', '212', '100']],
    ['درجة تجمد الماء في مقياس الفهرنهايت:', ['32', 'صفر', '273', '212']],
    ['درجة غليان الماء في مقياس الفهرنهايت:', ['212', '100', '373', '180']],
    ['عدد أقسام المقياس المئوي بين درجتي التجمد والغليان:', ['100', '180', '212', '273']],
    ['عدد أقسام مقياس الفهرنهايت بين درجتي التجمد والغليان:', ['180', '100', '212', '32']],
    ['عدد أقسام مقياس الكلفن (المطلق) بين درجتي التجمد والغليان:', ['100', '180', '273', '373']],
    ['المقياس الذي يسمى المقياس المطلق هو مقياس:', ['الكلفن', 'المئوي', 'الفهرنهايت', 'لا شيء مما ذكر']],
    ['المقياس الذي تكون فيه درجة التجمد 32 ودرجة الغليان 212 هو:', ['الفهرنهايت', 'المئوي', 'الكلفن', 'المطلق']],
    ['المقياس الذي تكون فيه درجة التجمد 273 ودرجة الغليان 373 هو:', ['الكلفن', 'المئوي', 'الفهرنهايت', 'لا شيء مما ذكر']],
    ['المقياسان المتساويان في عدد الأقسام هما:', ['المئوي والكلفن', 'المئوي والفهرنهايت', 'الكلفن والفهرنهايت', 'لا يوجد مقياسان متساويان']],
    ['كمية الحرارة اللازمة لرفع درجة حرارة كيلوجرام واحد من المادة درجة مئوية واحدة هي:', ['الحرارة النوعية', 'السعة الحرارية', 'الحرارة الكامنة للانصهار', 'الاتزان الحراري']],
    ['كمية الحرارة اللازمة لرفع درجة حرارة الجسم كله درجة مئوية واحدة هي:', ['السعة الحرارية', 'الحرارة النوعية', 'الحرارة الكامنة للانصهار', 'درجة الحرارة']],
    ['كمية الطاقة اللازمة لتحول واحد كيلوجرام من المادة الصلبة إلى الحالة السائلة عند درجة الانصهار هي:', ['الحرارة الكامنة للانصهار', 'الحرارة النوعية', 'السعة الحرارية', 'الاتزان الحراري']],
    ['الحرارة النوعية تتعلق بـ:', ['كيلوجرام واحد من المادة', 'الجسم كله', 'جزيء واحد من المادة', 'تحول المادة من الحالة الصلبة إلى السائلة']],
    ['السعة الحرارية تتعلق بـ:', ['الجسم كله', 'كيلوجرام واحد من المادة', 'جزيء واحد من المادة', 'درجة الانصهار فقط']],
    ['تحدث الحرارة الكامنة للانصهار عند تحول المادة من الحالة:', ['الصلبة إلى السائلة', 'السائلة إلى الغازية', 'الغازية إلى السائلة', 'السائلة إلى الصلبة']],
    ['تمتص الحرارة الكامنة للانصهار عند درجة:', ['الانصهار', 'الغليان', 'التجمد للماء فقط', 'صفر كلفن']],
    ['وصول جسمين في درجتي حرارة مختلفتين لدرجة حرارة واحدة عند اتصالهما هو:', ['الاتزان الحراري', 'التوصيل الحراري', 'الحمل الحراري', 'الإشعاع الحراري']],
    ['في الاتزان الحراري تكون كمية الحرارة المفقودة:', ['مساوية لكمية الحرارة المكتسبة', 'أكبر من كمية الحرارة المكتسبة', 'أقل من كمية الحرارة المكتسبة', 'صفرا دائما']],
    ['في الاتزان الحراري مجموع كمية الحرارة المكتسبة وكمية الحرارة المفقودة يساوي:', ['صفر', 'واحد', 'ضعف الحرارة المكتسبة', 'درجة حرارة الاتزان']],
    ['عند الاتزان الحراري يصبح الجسمان:', ['في درجة حرارة واحدة', 'في درجتي حرارة مختلفتين', 'بنفس الكتلة', 'بنفس الحرارة النوعية']],
    ['طرق انتقال الحرارة هي:', ['التوصيل والحمل والإشعاع', 'التوصيل والتبخر والانصهار', 'الحمل والتجمد والإشعاع', 'الانصهار والغليان والتكثف']],
    ['انتقال الحرارة من الجسم الساخن إلى الجسم البارد نتيجة التلامس هو:', ['التوصيل الحراري', 'الحمل الحراري', 'الإشعاع الحراري', 'الاتزان الحراري']],
    ['الطريقة التي تنتقل بها الحرارة في المواد السائلة والمواد الغازية هي:', ['الحمل الحراري', 'التوصيل الحراري', 'الإشعاع الحراري', 'الاتزان الحراري']],
    ['في الحمل الحراري يسخن السائل أو الغاز فيتمدد و:', ['تقل كثافته فيرتفع إلى أعلى', 'تزيد كثافته فيهبط إلى أسفل', 'تقل كثافته فيهبط إلى أسفل', 'تبقى كثافته ثابتة']],
    ['في الحمل الحراري يحل محل المائع الساخن الذي يرتفع:', ['مائع بارد يسخن بدوره ويرتفع', 'مائع ساخن آخر', 'جسم صلب', 'فراغ']],
    ['تسخين الماء مثال على انتقال الحرارة بـ:', ['الحمل الحراري', 'التوصيل الحراري', 'الإشعاع الحراري', 'الاتزان الحراري']],
    ['انتقال الطاقة في الهواء والفراغ كموجات كهرومغناطيسية هو:', ['الإشعاع الحراري', 'الحمل الحراري', 'التوصيل الحراري', 'الاتزان الحراري']],
    ['تصل حرارة الشمس إلى الأرض بطريقة:', ['الإشعاع الحراري', 'الحمل الحراري', 'التوصيل الحراري', 'الاتزان الحراري']],
    ['تنتقل الحرارة بالإشعاع الحراري على شكل:', ['موجات كهرومغناطيسية', 'تيارات من السائل', 'تلامس بين الأجسام', 'جزيئات متحركة في المادة الصلبة']],
    ['الطريقة الوحيدة التي تنتقل بها الحرارة في الفراغ هي:', ['الإشعاع الحراري', 'التوصيل الحراري', 'الحمل الحراري', 'الاتزان الحراري']],
    ['تحتاج طريقة التوصيل الحراري إلى:', ['تلامس الجسمين', 'وجود فراغ', 'موجات كهرومغناطيسية', 'مادة سائلة أو غازية فقط']],
    ['تنتقل الحرارة دائما بالتوصيل الحراري:', ['من الجسم الساخن إلى الجسم البارد', 'من الجسم البارد إلى الجسم الساخن', 'بين جسمين في نفس درجة الحرارة', 'في الفراغ فقط']]
  ],
  /* الكهرباء الساكنة: الشحنات وقانون كولوم والمجال والجهد */
  E: [
    ['تصبح المادة موجبة الشحنة عندما:', ['تفقد إلكترونات', 'تكتسب إلكترونات', 'تفقد بروتونات', 'تكتسب نيوترونات']],
    ['تصبح المادة سالبة الشحنة عندما:', ['تكتسب إلكترونات', 'تفقد إلكترونات', 'تكتسب بروتونات', 'تفقد نيوترونات']],
    ['المادة في حالتها الطبيعية متعادلة كهربائيا لأن:', ['عدد البروتونات يساوي عدد الإلكترونات', 'عدد النيوترونات يساوي عدد الإلكترونات', 'ليس فيها إلكترونات', 'عدد البروتونات أكبر من عدد الإلكترونات']],
    ['الشحنات المتشابهة:', ['تتنافر', 'تتجاذب', 'لا تتأثر', 'تتلاشى']],
    ['الشحنات المختلفة:', ['تتجاذب', 'تتنافر', 'لا تتأثر', 'تتلاشى']],
    ['المواد التي إلكتروناتها حرة الحركة هي المواد:', ['الموصلة', 'العازلة', 'شبه الموصلة', 'المتعادلة']],
    ['........ من المواد العازلة:', ['الزجاج', 'النحاس', 'الحديد', 'الألمنيوم']],
    ['........ من المواد الموصلة:', ['النحاس', 'الخشب', 'البلاستيك', 'الزجاج']],
    ['........ من المواد شبه الموصلة:', ['السيليكون', 'الحديد', 'الزجاج', 'الخشب']],
    ['عند دلك البلاستيك بالصوف يصبح البلاستيك:', ['سالب الشحنة', 'موجب الشحنة', 'متعادلا', 'موصلا']],
    ['الشحن بالدلك يعني انتقال ........ من مادة إلى أخرى:', ['الإلكترونات', 'البروتونات', 'النيوترونات', 'الأنوية']],
    ['شحن جسم متعادل دون ملامسته بتقريب جسم مشحون منه هو الشحن بـ:', ['الحث (التأثير)', 'الدلك', 'اللمس (التوصيل)', 'التسخين']],
    ['موصل مشحون يلامس موصلا متعادلا فيتقاسمان الشحنة، هذا هو الشحن بـ:', ['اللمس (التوصيل)', 'الحث (التأثير)', 'الدلك', 'التسخين']],
    ['وحدة قياس الشحنة الكهربائية:', ['الكولوم `C`', 'الفولت `V`', 'الفاراد `F`', 'الجول `J`']],
    ['قانون كولوم للقوة الكهربائية بين شحنتين نقطيتين:', ['`F = k·q₁·q₂ / r²`', '`F = k·q₁·q₂ / r`', '`F = k·q₁·q₂·r²`', '`F = q₁·q₂ / (k·r)`']],
    ['تتناسب القوة الكهربائية بين شحنتين نقطيتين طرديا مع:', ['حاصل ضرب الشحنتين', 'مربع المسافة بينهما', 'المسافة بينهما', 'الفرق بين الشحنتين']],
    ['تتناسب القوة الكهربائية بين شحنتين نقطيتين عكسيا مع:', ['مربع المسافة بينهما', 'المسافة بينهما', 'حاصل ضرب الشحنتين', 'مجموع الشحنتين']],
    ['قيمة ثابت كولوم `k`:', ['`9 × 10⁹ N·m²/C²`', '`9 × 10⁻⁹ N·m²/C²`', '`8.85 × 10⁻¹² N·m²/C²`', '`1.6 × 10⁻¹⁹ N·m²/C²`']],
    ['عند مضاعفة المسافة بين شحنتين نقطيتين فإن القوة الكهربائية بينهما:', ['تقل إلى الربع', 'تقل إلى النصف', 'تتضاعف', 'تزداد أربع مرات']],
    ['الميكروكولوم `µC` يساوي:', ['`10⁻⁶ C`', '`10⁻⁹ C`', '`10⁻³ C`', '`10⁻¹² C`']],
    ['النانوكولوم `nC` يساوي:', ['`10⁻⁹ C`', '`10⁻⁶ C`', '`10⁻³ C`', '`10⁻¹² C`']],
    ['المنطقة المحيطة بالشحنة الكهربائية التي يظهر فيها تأثيرها هي:', ['المجال الكهربائي', 'الجهد الكهربائي', 'السعة الكهربائية', 'التيار الكهربائي']],
    ['القوة الكهربائية المؤثرة على شحنة اختبار موجبة هي:', ['شدة المجال الكهربائي', 'الجهد الكهربائي', 'فرق الجهد', 'السعة الكهربائية']],
    ['وحدة قياس شدة المجال الكهربائي:', ['`N/C`', '`J/C`', '`C/V`', '`N·m`']],
    ['قانون شدة المجال الكهربائي بدلالة القوة المؤثرة على شحنة الاختبار:', ['`E = F / q₀`', '`E = F·q₀`', '`E = q₀ / F`', '`E = F / r²`']],
    ['شدة المجال الكهربائي الناشئ عن شحنة نقطية:', ['`E = k·q / r²`', '`E = k·q / r`', '`E = k·q·r²`', '`E = V·d`']],
    ['خطوط المجال الكهربائي تخرج دائما من الشحنة ........ وتدخل إلى الشحنة ........:', ['الموجبة / السالبة', 'السالبة / الموجبة', 'الموجبة / الموجبة', 'السالبة / السالبة']],
    ['........ ليست من خصائص خطوط المجال الكهربائي:', ['تتقاطع مع بعضها البعض', 'تخرج من الشحنة الموجبة', 'تدخل إلى الشحنة السالبة', 'تتقارب في المجالات القوية']],
    ['تكون خطوط المجال الكهربائي متقاربة عندما يكون المجال:', ['قويا', 'ضعيفا', 'منعدما', 'متغير الاتجاه']],
    ['المجال الكهربائي الثابت الشدة والاتجاه عند جميع النقاط هو المجال:', ['المنتظم', 'غير المنتظم', 'الناشئ عن شحنة نقطية', 'المتغير']],
    ['المجال الكهربائي الناشئ عن الشحنات النقطية مجال:', ['غير منتظم', 'منتظم', 'ثابت الشدة والاتجاه', 'منعدم']],
    ['ينشأ المجال الكهربائي المنتظم:', ['بين لوحين معدنيين متوازيين موصلين بمصدر جهد مستمر', 'حول شحنة نقطية موجبة', 'حول شحنة نقطية سالبة', 'بين شحنتين نقطيتين متشابهتين']],
    ['قانون شدة المجال الكهربائي المنتظم بين لوحين:', ['`E = V / d`', '`E = V·d`', '`E = d / V`', '`E = k·q / r`']],
    ['طاقة الوضع التي تمتلكها وحدة الشحنة هي:', ['الجهد الكهربائي', 'شدة المجال الكهربائي', 'السعة الكهربائية', 'القوة الكهربائية']],
    ['وحدة قياس الجهد الكهربائي الفولت `V` وتساوي:', ['`J/C`', '`N/C`', '`C/J`', '`C/V`']],
    ['الشغل المبذول في نقل شحنة اختبار بين نقطتين مقسوما على شحنة الاختبار هو:', ['فرق الجهد', 'شدة المجال', 'السعة الكهربائية', 'القوة الكهربائية']],
    ['الجهد الكهربائي الناشئ عن شحنة نقطية:', ['`V = k·q / r`', '`V = k·q / r²`', '`V = k·q·r`', '`V = E / d`']],
    ['فرق الجهد بين نقطتين في مجال كهربائي منتظم:', ['`ΔV = E·d`', '`ΔV = E / d`', '`ΔV = k·q / r²`', '`ΔV = F·q`']],
    ['في المجال المنتظم يقل الجهد الكهربائي كلما تحركنا:', ['باتجاه خطوط المجال', 'عكس اتجاه خطوط المجال', 'نحو اللوح الموجب', 'على خط تساوي الجهد']],
    ['خطوط تساوي الجهد حول شحنة نقطية تكون:', ['دوائر حول الشحنة', 'خطوطا مستقيمة متوازية', 'خطوطا شعاعية تخرج من الشحنة', 'خطوطا متقاطعة']],
    ['وحدة شدة المجال `N/C` تكافئ:', ['`V/m`', '`V·m`', '`J/m`', '`C/m`']],
    ['العلاقة بين الشحنات الكهربائية والقوة الكهربائية في قانون كولوم هي علاقة:', ['طردية', 'عكسية', 'تفاعلية', 'لا شيء مما ذكر']],
    ['العلاقة بين القوة الكهربائية ومربع المسافة بين الشحنات الكهربائية في قانون كولوم علاقة:', ['عكسية', 'طردية', 'زمانية', 'لا شيء مما ذكر']],
    ['تشحن المادة بالكهرباء عندما:', ['تفقد الذرات إلكترونات أو تكتسبها', 'تفقد الذرات إلكترونات فقط', 'تكتسب الذرات إلكترونات فقط', 'لا شيء مما ذكر']],
    ['القوة المؤثرة على وحدة الشحنات الكهربائية الموجودة عند نقطة تعرف بـ:', ['المجال الكهربائي', 'قانون كولوم', 'الجهد الكهربائي', 'الشغل']],
    ['خطوط المجال الكهربائي تكون منتشرة إلى الخارج في الشحنات:', ['الموجبة', 'السالبة', 'الموجبة والسالبة', 'لا شيء مما ذكر']],
    ['اتجاه خطوط المجال الكهربائي في الشحنة الموجبة:', ['إلى خارج الشحنة', 'إلى داخل الشحنة', 'متوازية', 'بعيدة']]
  ],
  /* السعة الكهربائية والمكثفات */
  K: [
    ['النسبة الثابتة بين شحنة المكثف وفرق الجهد بين لوحيه هي:', ['السعة الكهربائية', 'المقاومة الكهربائية', 'شدة المجال', 'الطاقة المختزنة']],
    ['قانون السعة الكهربائية:', ['`C = q / V`', '`C = q·V`', '`C = V / q`', '`C = q / V²`']],
    ['وحدة قياس السعة الكهربائية:', ['الفاراد `F`', 'الكولوم `C`', 'الفولت `V`', 'الأوم `Ω`']],
    ['الفاراد `F` يساوي:', ['`C/V`', '`V/C`', '`C·V`', '`J/C`']],
    ['المكثف ذو اللوحين المتوازيين عبارة عن:', ['لوحين موصلين متوازيين بينهما وسط عازل', 'لوحين عازلين بينهما وسط موصل', 'سلك موصل ملفوف حول قلب حديدي', 'لوح موصل واحد مشحون']],
    ['قانون سعة المكثف ذي اللوحين المتوازيين والوسط بينهما هواء:', ['`C = ε₀·A / d`', '`C = ε₀·d / A`', '`C = A / (ε₀·d)`', '`C = ε₀·A·d`']],
    ['قيمة سماحية الفراغ `ε₀`:', ['`8.85 × 10⁻¹² F/m`', '`9 × 10⁹ F/m`', '`8.85 × 10⁻⁹ F/m`', '`1.6 × 10⁻¹⁹ F/m`']],
    ['السماحية النسبية `εᵣ` (ثابت العزل):', ['ليس لها وحدة', 'وحدتها `F/m`', 'وحدتها `F`', 'وحدتها `C/V`']],
    ['السماحية النسبية للفراغ والهواء تساوي تقريبا:', ['`1`', '`0`', '`8.85`', '`9 × 10⁹`']],
    ['عند زيادة المسافة بين لوحي المكثف فإن سعته:', ['تقل', 'تزداد', 'لا تتغير', 'تتضاعف']],
    ['عند زيادة مساحة لوحي المكثف فإن سعته:', ['تزداد', 'تقل', 'لا تتغير', 'تنعدم']],
    ['........ ليس من العوامل المؤثرة على سعة المكثف:', ['فرق الجهد بين اللوحين', 'مساحة اللوحين', 'المسافة بين اللوحين', 'نوع الوسط العازل']],
    ['تتناسب الشحنة على المكثف مع فرق الجهد بين لوحيه تناسبا:', ['طرديا', 'عكسيا', 'عكسيا مع المربع', 'لا يوجد تناسب']],
    ['........ من فوائد المكثفات:', ['تخزين الطاقة الكهربائية', 'قياس شدة التيار', 'زيادة مقاومة الدائرة', 'قياس درجة الحرارة']],
    ['المكثف الذي يستخدم في ضبط الموجات في أجهزة الراديو:', ['المكثف المتغير', 'المكثف الإلكتروليتي', 'المكثف فائق السعة', 'مكثف التنتالوم']],
    ['المكثف الذي له قطبية وسعته كبيرة ويستخدم في دوائر تنعيم الجهد في مصادر القدرة:', ['المكثف الإلكتروليتي', 'المكثف السيراميكي', 'المكثف البلاستيكي', 'المكثف المتغير']],
    ['المكثف السيراميكي:', ['ليس له قطبية وسعته صغيرة', 'له قطبية وسعته كبيرة جدا', 'تتغير سعته بتدوير مقبض', 'يستخدم لتخزين الطاقة في السيارات الكهربائية']],
    ['في توصيل المكثفات على التوالي تكون ........ متساوية على جميع المكثفات:', ['الشحنة', 'فرق الجهد', 'السعة', 'الطاقة']],
    ['في توصيل المكثفات على التوازي يكون ........ متساويا على جميع المكثفات:', ['فرق الجهد', 'الشحنة', 'السعة', 'لا شيء مما ذكر']],
    ['السعة المكافئة لمكثفات موصولة على التوازي:', ['`C = C₁ + C₂ + C₃`', '`1/C = 1/C₁ + 1/C₂ + 1/C₃`', '`C = C₁·C₂·C₃`', '`C = C₁ − C₂ − C₃`']],
    ['السعة المكافئة لمكثفات موصولة على التوالي:', ['`1/C = 1/C₁ + 1/C₂ + 1/C₃`', '`C = C₁ + C₂ + C₃`', '`C = C₁·C₂·C₃`', '`1/C = C₁ + C₂ + C₃`']],
    ['السعة المكافئة لمكثفين فقط موصولين على التوالي:', ['`C = C₁·C₂ / (C₁ + C₂)`', '`C = (C₁ + C₂) / (C₁·C₂)`', '`C = C₁ + C₂`', '`C = C₁·C₂`']],
    ['في التوصيل على التوالي تكون السعة المكافئة:', ['أصغر من أصغر سعة', 'أكبر من أكبر سعة', 'مساوية لأكبر سعة', 'مساوية لمجموع السعات']],
    ['في التوصيل على التوازي تكون السعة المكافئة:', ['أكبر من أكبر سعة', 'أصغر من أصغر سعة', 'مساوية لأصغر سعة', 'مساوية لمقلوب مجموع السعات']],
    ['فرق الجهد الكلي لمكثفات موصولة على التوالي:', ['`V = V₁ + V₂ + V₃`', '`V = V₁ = V₂ = V₃`', '`1/V = 1/V₁ + 1/V₂ + 1/V₃`', '`V = V₁·V₂·V₃`']],
    ['في توصيل مكثفين على التوالي يأخذ المكثف ذو السعة الأصغر:', ['الجهد الأكبر', 'الجهد الأصغر', 'الشحنة الأكبر', 'الشحنة الأصغر']],
    ['التوصيل المركب هو:', ['خليط من التوصيل على التوازي وعلى التوالي', 'التوصيل على التوازي فقط', 'التوصيل على التوالي فقط', 'توصيل مكثف واحد بالمصدر']],
    ['الطاقة المختزنة في المكثف بدلالة السعة والجهد:', ['`E = ½·C·V²`', '`E = C·V²`', '`E = ½·C²·V`', '`E = ½·C·V`']],
    ['الطاقة المختزنة في المكثف بدلالة الشحنة والجهد:', ['`E = ½·q·V`', '`E = q·V²`', '`E = ½·q²·V`', '`E = q / (2·V)`']],
    ['وحدة قياس الطاقة المختزنة في المكثف:', ['الجول `J`', 'الفاراد `F`', 'الكولوم `C`', 'الفولت `V`']],
    ['البيكوفاراد `pF` يساوي:', ['`10⁻¹² F`', '`10⁻⁹ F`', '`10⁻⁶ F`', '`10⁻³ F`']],
    ['عند توصيل المكثفات على التوازي نلاحظ أن فرق الجهد:', ['ثابت', 'يتجزأ على المكثفات', 'يساوي صفر', 'لا شيء مما ذكر']],
    ['عند توصيل المكثفات على التوالي نلاحظ أن فرق الجهد:', ['يتجزأ على كل مكثف', 'ثابت على كل مكثف', 'يساوي صفر', 'لا شيء مما ذكر']],
    ['عند توصيل المكثفات على التوالي فإن مقدار الشحنة الكهربائية لجميع المكثفات:', ['ثابتة', 'تساوي صفر', 'متغيرة', 'لا شيء مما ذكر']],
    ['كمية الشحنة الكهربائية اللازمة لتغيير جهد المكثف بمقدار 1 فولت تعرف بأنها:', ['السعة الكهربائية', 'القدرة الكهربائية', 'الجهد الكهربائي', 'التيار الكهربائي']]
  ],
  /* التيار الكهربائي والمقاومة */
  C: [
    ['سيل من الشحنات يتحرك بانتظام في اتجاه معين هو:', ['التيار الكهربائي', 'فرق الجهد', 'المقاومة', 'المجال الكهربائي']],
    ['كمية الشحنة الكهربائية التي تعبر مقطع الموصل في وحدة الزمن هي:', ['شدة التيار الكهربائي', 'كثافة التيار', 'سرعة الانجراف', 'القدرة الكهربائية']],
    ['قانون شدة التيار الكهربائي:', ['`I = q / t`', '`I = q·t`', '`I = t / q`', '`I = q / A`']],
    ['وحدة قياس شدة التيار الأمبير `A` وتساوي:', ['`C/s`', '`C·s`', '`J/C`', '`V·A`']],
    ['الأمبير هو شدة التيار الناتج عن عبور شحنة `1 C` مقطع الموصل في:', ['الثانية الواحدة', 'الدقيقة الواحدة', 'الساعة الواحدة', 'عشر ثوان']],
    ['مقدار شحنة الإلكترون `e`:', ['`1.6 × 10⁻¹⁹ C`', '`9 × 10⁹ C`', '`1.6 × 10¹⁹ C`', '`8.85 × 10⁻¹² C`']],
    ['العلاقة بين الشحنة وعدد الإلكترونات:', ['`q = n·e`', '`q = n / e`', '`q = e / n`', '`q = n + e`']],
    ['الاتجاه الاصطلاحي للتيار هو اتجاه حركة:', ['الشحنات الموجبة', 'الإلكترونات', 'النيوترونات', 'الشحنات السالبة']],
    ['الاتجاه الحقيقي للتيار داخل الدائرة الكهربائية:', ['من السالب إلى الموجب', 'من الموجب إلى السالب', 'من الموجب إلى الموجب', 'من السالب إلى السالب']],
    ['الشحنة التي تشكل التيار الكهربائي المار عبر الموصل هي:', ['الإلكترونات', 'البروتونات', 'النيوترونات', 'الأنوية']],
    ['شدة التيار المار عبر وحدة المساحات من مقطع الموصل هي:', ['كثافة التيار', 'شدة التيار', 'سرعة الانجراف', 'المقاومة النوعية']],
    ['قانون كثافة التيار:', ['`J = I / A`', '`J = I·A`', '`J = A / I`', '`J = q / t`']],
    ['وحدة قياس كثافة التيار:', ['`A/m²`', '`A·m²`', '`A/m`', '`C/m²`']],
    ['كثافة التيار كمية:', ['متجهة في اتجاه التيار', 'قياسية ليس لها اتجاه', 'متجهة عكس اتجاه التيار', 'ليس لها وحدة']],
    ['المليمتر المربع `1 mm²` يساوي:', ['`10⁻⁶ m²`', '`10⁻³ m²`', '`10⁻⁴ m²`', '`10⁻² m²`']],
    ['السرعة المتوسطة لحركة الإلكترونات بتأثير المجال الكهربائي داخل الموصل هي:', ['سرعة الانجراف', 'سرعة الضوء', 'كثافة التيار', 'شدة التيار']],
    ['قانون سرعة الانجراف:', ['`v_d = J / (n·e)`', '`v_d = n·e / J`', '`v_d = J·n·e`', '`v_d = I / t`']],
    ['سرعة الانجراف صغيرة جدا بسبب:', ['التصادمات المتكررة مع ذرات الموصل', 'قلة عدد الإلكترونات الحرة', 'كبر شحنة الإلكترون', 'انعدام المجال داخل الموصل']],
    ['التيار الذي يسري دائما في اتجاه واحد هو التيار:', ['المستمر `DC`', 'المتردد `AC`', 'المتغير', 'المركب']],
    ['التيار الذي يتغير اتجاهه دوريا مع الزمن هو التيار:', ['المتردد `AC`', 'المستمر `DC`', 'الاصطلاحي', 'الثابت']],
    ['........ مصدر للتيار المستمر:', ['البطارية', 'كهرباء المنازل', 'مقبس الحائط', 'شبكة الكهرباء العامة']],
    ['تردد التيار المتردد في كهرباء المنازل في السعودية:', ['`60 Hz`', '`50 Hz`', '`220 Hz`', '`120 Hz`']],
    ['يستخدم التيار المتردد في الشبكات لأنه:', ['يسهل رفع جهده وخفضه بالمحولات', 'لا يتغير اتجاهه أبدا', 'لا يحتاج إلى أسلاك', 'لا يسبب أي فقد في الطاقة']],
    ['ممانعة الموصل لمرور التيار الكهربائي فيه هي:', ['المقاومة', 'الموصلية', 'كثافة التيار', 'القدرة']],
    ['وحدة قياس المقاومة الأوم `Ω` وتساوي:', ['`V/A`', '`A/V`', '`V·A`', '`J/s`']],
    ['قانون أوم: تتناسب شدة التيار المار في موصل فلزي تناسبا طرديا مع ........ عند ثبوت درجة حرارته:', ['فرق الجهد بين طرفيه', 'مقاومته', 'طوله', 'مساحة مقطعه']],
    ['الصيغة الرياضية لقانون أوم:', ['`V = I·R`', '`V = I / R`', '`V = R / I`', '`V = I²·R`']],
    ['ميل الخط المستقيم في منحنى (`V` مقابل `I`) لموصل يحقق قانون أوم يساوي:', ['المقاومة', 'شدة التيار', 'القدرة', 'الموصلية']],
    ['قانون مقاومة موصل بدلالة أبعاده:', ['`R = ρ·L / A`', '`R = ρ·A / L`', '`R = L / (ρ·A)`', '`R = ρ·L·A`']],
    ['تقل مقاومة الموصل بزيادة:', ['مساحة مقطعه', 'طوله', 'درجة حرارته', 'مقاومته النوعية']],
    ['تزداد مقاومة الموصل بزيادة:', ['طوله', 'مساحة مقطعه', 'موصليته', 'عدد الإلكترونات الحرة فيه']],
    ['وحدة قياس المقاومة النوعية:', ['`Ω·m`', '`Ω/m`', '`Ω`', '`(Ω·m)⁻¹`']],
    ['المقاومة النوعية هي مقدار مقاومة جزء من المادة:', ['طوله `1 m` ومساحة مقطعه `1 m²`', 'طوله `1 cm` ومساحة مقطعه `1 cm²`', 'طوله `1 m` ومساحة مقطعه `1 mm²`', 'كتلته `1 kg` وطوله `1 m`']],
    ['الموصلية `σ` تساوي:', ['`1/ρ`', '`ρ·L`', '`ρ / A`', '`R·A`']],
    ['عند ارتفاع درجة حرارة موصل فإن مقاومته:', ['تزداد', 'تقل', 'لا تتغير', 'تنعدم']],
    ['قانون أثر درجة الحرارة على مقاومة موصل:', ['`R = R₀·(1 + α·(T − T₀))`', '`R = R₀·(1 − α·(T − T₀))`', '`R = R₀ + α`', '`R = R₀·α·T`']],
    ['وحدة قياس المعامل الحراري للمقاومة `α`:', ['`°C⁻¹`', '`Ω·m`', '`Ω/°C`', '`J/kg·°C`']],
    ['الطاقة الكهربائية المستهلكة في وحدة الزمن هي:', ['القدرة الكهربائية', 'الشغل', 'المقاومة', 'شدة التيار']],
    ['وحدة قياس القدرة الكهربائية الواط `W` وتساوي:', ['`J/s`', '`J·s`', '`C/s`', '`V/A`']],
    ['........ ليست من صيغ القدرة الكهربائية:', ['`P = I·R`', '`P = I·V`', '`P = I²·R`', '`P = V² / R`']],
    ['في توصيل المقاومات على التوالي يكون ........ واحدا في كل المقاومات:', ['التيار', 'الجهد', 'القدرة', 'لا شيء مما ذكر']],
    ['في توصيل المقاومات على التوازي يكون ........ واحدا على كل المقاومات:', ['الجهد', 'التيار', 'القدرة', 'لا شيء مما ذكر']],
    ['المقاومة المكافئة لمقاومات موصولة على التوالي:', ['`R = R₁ + R₂ + R₃`', '`1/R = 1/R₁ + 1/R₂ + 1/R₃`', '`R = R₁·R₂·R₃`', '`R = R₁ − R₂ − R₃`']],
    ['المقاومة المكافئة لمقاومتين فقط موصولتين على التوازي:', ['`R = R₁·R₂ / (R₁ + R₂)`', '`R = R₁ + R₂`', '`R = (R₁ + R₂) / (R₁·R₂)`', '`R = R₁·R₂`']],
    ['في التوصيل على التوازي تكون المقاومة المكافئة:', ['أصغر من أصغر مقاومة', 'أكبر من أكبر مقاومة', 'مساوية لمجموع المقاومات', 'مساوية لأكبر مقاومة']],
    ['في التوصيل على التوالي تكون المقاومة المكافئة:', ['أكبر من أكبر مقاومة', 'أصغر من أصغر مقاومة', 'مساوية لأصغر مقاومة', 'مساوية لمقلوب مجموع المقاومات']],
    ['توصل المقاومات على التوالي بهدف:', ['تجزئة الجهد', 'الحفاظ على الجهد', 'زيادة التيار', 'تقليل المقاومة الكلية']],
    ['توصل أجهزة المنزل على التوازي لكي:', ['تعمل كلها على الجهد نفسه ولا تتأثر بإطفاء أحدها', 'يتجزأ الجهد عليها', 'يمر فيها جميعا التيار نفسه', 'تزداد المقاومة الكلية للدائرة']],
    ['عند احتراق أحد المصابيح الموصولة على التوالي فإن بقية المصابيح:', ['تنطفئ', 'لا يتأثر سطوعها', 'يزداد سطوعها', 'يتضاعف تيارها']],
    ['التوصيل المركب للمقاومات هو:', ['خليط من التوصيل على التوالي والتوازي', 'التوصيل على التوازي فقط', 'التوصيل على التوالي فقط', 'توصيل مقاومة واحدة بالمصدر']],
    ['كمية الشحنات التي تعبر موصلا خلال فترة زمنية هو مفهوم:', ['التيار الكهربائي', 'القدرة الكهربائية', 'المقاومة الكهربائية', 'الجهد الكهربائي']],
    ['ممانعة مرور التيار في الموصل هي:', ['المقاومة الكهربائية', 'القدرة الكهربائية', 'الجهد الكهربائي', 'التيار الكهربائي']],
    ['العلاقة بين التيار الكهربائي وفرق الجهد الكهربائي حسب قانون أوم هي علاقة:', ['طردية', 'عكسية', 'تفاعلية', 'لا شيء مما ذكر']],
    ['القانون الذي يدرس العلاقة بين الجهد والتيار والمقاومة هو قانون:', ['أوم', 'كولوم', 'نيوتن', 'لا شيء مما ذكر']],
    ['يتوزع التيار الكهربائي عند توصيل المقاومات على:', ['التوازي', 'التوالي', 'الترتيب', 'لا شيء مما ذكر']],
    ['وحدة قياس شدة التيار الكهربائي هي:', ['الأمبير', 'الفاراد', 'الفولت', 'الكولوم']]
  ]
});
/* الاختبار جاهز إذا كان في كل بنك أسئلة تكفي العدد المطلوب منه */
function examReady_(d) { return !d.soon && d.items.length > 0 && d.items.every(function (x) { return x.pool ? (EXAM_POOL[x.pool] || []).length >= x.n : [].concat(x.num).every(function (k) { return (NUM_POOL[k] || []).length > 0; }); }); }
function examCount_(d) { return d.items.reduce(function (t, x) { return t + (x.pool ? x.n : 1); }, 0); }
/* الاختبار الفصلي الأول: 10 أسئلة نظرية (درجة لكل سؤال) و5 مسائل حسابية (درجتان لكل مسألة، نصف درجة لكل خطوة) = 20 درجة.
   الأسئلة على نمط الاختبار السابق للمدرب، من أمثلة الحقيبة التدريبية وتمارينها ومسائلها.
   الخيار الأول هو الصحيح، وتعرض الخيارات بترتيب عشوائي لكل متدرب، والمسائل الحسابية (c: 1) بأرقام مختلفة لكل متدرب */
/* بنك المسائل الحسابية: كل مسألة من أمثلة الحقيبة التدريبية وتمارينها ومسائلها (حتى صفحة 51) بأرقامها الأصلية في b،
   ولا تتغير أرقامها إلا عند إضافتها إلى اختبار المتدرب: تولد أرقام جديدة لكل متدرب لحظة بدء الاختبار.
   الخطوات: المعطيات، المطلوب، القانون (الخيار الأول هو الصحيح في كل خطوة)، ثم النتيجة رقما يكتبه المتدرب */
function nm_(q, g, r, l, v, u) { return { q: q, s: [g, r, l, { v: v, u: u || '' }] }; }
function vg_(A, B, t) { return ['`A = ' + A + '` ، `B = ' + B + '` ، `θ = ' + t + '°`', '`A = ' + A + '` ، `B = ' + t + '` ، `θ = ' + B + '°`', '`A = ' + (A + B) + '` ، `θ = ' + t + '°`', '`A = ' + A + '` ، `B = ' + B + '` ، `θ = ' + (t < 90 ? 90 - t : 180 - t) + '°`']; }
function cv_(x, y) { return nf_(x) + 'î ' + (y < 0 ? '− ' + nf_(-y) : '+ ' + nf_(y)) + 'ĵ'; }
function nz_(a, b) { let v = 0; while (!v) v = ri_(a, b); return v; }
/* مسألة المحصلة بقانون جيب التمام بدون رسم: الإشارة موجبة إذا كانت الزاوية أصغر من 90° وسالبة إذا كانت أكبر من 90° (ملحوظة الحقيبة التدريبية) */
function resQ_(A, B, t) {
  const plus = t < 90, P = '`C = √(A² + B² + 2AB·cosθ)`', M = '`C = √(A² + B² − 2AB·cosθ)`';
  return nm_('باستخدام قانون جيب التمام أوجد محصلة المتجهين `A = ' + A + '` و `B = ' + B + '` إذا كانت الزاوية بينهما `θ = ' + t + '°`.', vg_(A, B, t),
    ['مقدار المحصلة `C`', 'الزاوية بين المتجهين `θ`', 'المركبة السينية `Ax`', 'حاصل الضرب القياسي `A·B`'],
    [plus ? P : M, plus ? M : P, '`C = A + B`', '`C = AB·cosθ`'], Math.sqrt(A * A + B * B + (plus ? 2 : -2) * A * B * cosd_(t)));
}
const NUM_POOL = {
  /* محصلة متجهين: الزاوية تعطى بدون رسم، ونوع الإشارة حسب ملحوظة الحقيبة التدريبية (صفحة 19):
     الزاوية أصغر من 90° ← الإشارة الموجبة، والزاوية أكبر من 90° ← الإشارة السالبة */
  R: [
    { b: 'مثال ١ صفحة 19: A = 4 و B = 6 والزاوية 60°', f: function () { return resQ_(ri_(2, 12), ri_(2, 12), pick_([30, 45, 60])); } },
    { b: 'مثال ٢ صفحة 19: A = 6 و B = 9 والزاوية 120°', f: function () { return resQ_(ri_(2, 12), ri_(2, 12), pick_([120, 135, 150])); } },
    { b: 'ورقة عمل (٢) سؤال ٣ صفحة 24: A = 2 و B = 3 والزاوية 60°', f: function () { return resQ_(ri_(2, 9), ri_(2, 9), pick_([30, 45, 60, 120, 135, 150])); } }
  ],
  /* الضرب القياسي والاتجاهي */
  P: [
    { b: 'مثال ٣ صفحة 23: A = 10 و B = 5 والزاوية 60° (الضرب القياسي)', f: function () { const A = ri_(2, 12), B = ri_(2, 12), t = pick_([30, 60]);
      return nm_('إذا كان المقدار العددي للمتجه `A = ' + A + '` وللمتجه `B = ' + B + '` والزاوية بينهما `' + t + '°`، أوجد حاصل الضرب القياسي.', vg_(A, B, t),
        ['حاصل الضرب القياسي `A·B`', 'حاصل الضرب الاتجاهي `|A × B|`', 'مقدار المحصلة `C`', 'الزاوية بين المتجهين `θ`'],
        ['`A·B = |A||B|·cosθ`', '`A·B = |A||B|·sinθ`', '`A·B = |A| + |B|`', '`A·B = |A| / |B|`'], A * B * cosd_(t)); } },
    { b: 'مثال ٣ صفحة 23: A = 10 و B = 5 والزاوية 60° (الضرب الاتجاهي)', f: function () { const A = ri_(2, 12), B = ri_(2, 12), t = pick_([30, 60]);
      return nm_('إذا كان المقدار العددي للمتجه `A = ' + A + '` وللمتجه `B = ' + B + '` والزاوية بينهما `' + t + '°`، أوجد مقدار حاصل الضرب الاتجاهي.', vg_(A, B, t),
        ['مقدار حاصل الضرب الاتجاهي `|A × B|`', 'حاصل الضرب القياسي `A·B`', 'مقدار المحصلة `C`', 'الزاوية بين المتجهين `θ`'],
        ['`|A × B| = |A||B|·sinθ`', '`|A × B| = |A||B|·cosθ`', '`|A × B| = |A| + |B|`', '`|A × B| = |A| / |B|`'], A * B * sind_(t)); } },
    { b: 'ورقة عمل (٢) سؤال ٧ صفحة 26: A = 8 و B = 6 والزاوية 30°', f: function () { const A = ri_(2, 12), B = ri_(2, 12), t = pick_([30, 60]), dot = Math.random() < 0.5;
      return nm_('إذا كان `A = ' + A + '` و `B = ' + B + '` والزاوية بينهما `' + t + '°`، أوجد ' + (dot ? 'حاصل الضرب القياسي.' : 'مقدار حاصل الضرب الاتجاهي.'), vg_(A, B, t),
        dot ? ['حاصل الضرب القياسي `A·B`', 'حاصل الضرب الاتجاهي `|A × B|`', 'مقدار المحصلة `C`', 'مركبتا المتجه `Ax` و `Ay`'] : ['مقدار حاصل الضرب الاتجاهي `|A × B|`', 'حاصل الضرب القياسي `A·B`', 'مقدار المحصلة `C`', 'مركبتا المتجه `Ax` و `Ay`'],
        dot ? ['`A·B = |A||B|·cosθ`', '`A·B = |A||B|·sinθ`', '`A·B = |A| + |B|`', '`A·B = |A|·cosθ`'] : ['`|A × B| = |A||B|·sinθ`', '`|A × B| = |A||B|·cosθ`', '`|A × B| = |A| + |B|`', '`|A × B| = |A|·sinθ`'], A * B * (dot ? cosd_(t) : sind_(t))); } },
  ],
  /* السرعة والتسارع ومعادلات الحركة */
  M: [
    { b: 'مثال ١ صفحة 36: مسافة 120 m في زمن 10 s', f: function () { const t = ri_(2, 20), v = ri_(2, 30), x = v * t;
      return nm_('سيارة قطعت مسافة مقدارها `' + x + ' m` في زمن مقداره `' + t + ' s`، أوجد السرعة المتوسطة للسيارة.',
        ['`x = ' + x + ' m` ، `t = ' + t + ' s`', '`x = ' + t + ' m` ، `t = ' + x + ' s`', '`v = ' + x + ' m/s` ، `t = ' + t + ' s`', '`x = ' + x + ' m` ، `a = ' + t + ' m/s²`'],
        ['السرعة المتوسطة `v`', 'التسارع `a`', 'الزمن `t`', 'الإزاحة `x`'], ['`v = x / t`', '`v = x·t`', '`v = t / x`', '`v = x + t`'], v, 'm/s'); } },
    { b: 'مثال ٢ صفحة 36: تغيرت السرعة من 20 m/s إلى 80 m/s خلال 3 s', f: function () { const vi = ri_(5, 40), a = ri_(2, 20), t = ri_(2, 10), vf = vi + a * t;
      return nm_('سيارة تغيرت سرعتها من `' + vi + ' m/s` إلى `' + vf + ' m/s` خلال زمن مقداره `' + t + ' s`، أوجد التسارع للسيارة.',
        ['`Vi = ' + vi + ' m/s` ، `Vf = ' + vf + ' m/s` ، `t = ' + t + ' s`', '`Vi = ' + vf + ' m/s` ، `Vf = ' + vi + ' m/s` ، `t = ' + t + ' s`', '`Vi = 0` ، `Vf = ' + vf + ' m/s` ، `t = ' + t + ' s`', '`Vi = ' + vi + ' m/s` ، `Vf = ' + vf + ' m/s` ، `x = ' + t + ' m`'],
        ['التسارع `a`', 'السرعة المتوسطة `v`', 'الإزاحة `x`', 'الزمن `t`'], ['`a = (Vf − Vi) / t`', '`a = (Vf + Vi) / t`', '`a = Vf·t`', '`a = (Vf − Vi)·t`'], a, 'm/s²'); } },
    { b: 'مثال ٢ صفحة 38: من 13 m/s إلى 26 m/s في 10 s (المسافة)', f: function () { const vi = ri_(2, 20), vf = vi + ri_(2, 30), t = ri_(2, 15);
      return nm_('سيارة تحركت بسرعة مقدارها `' + vi + ' m/s` وبتسارع منتظم حتى وصلت سرعتها إلى `' + vf + ' m/s` في زمن مقداره `' + t + ' s`، أوجد المسافة التي قطعتها السيارة.',
        ['`Vi = ' + vi + ' m/s` ، `Vf = ' + vf + ' m/s` ، `t = ' + t + ' s`', '`Vi = ' + vf + ' m/s` ، `Vf = ' + vi + ' m/s` ، `t = ' + t + ' s`', '`Vi = 0` ، `Vf = ' + vf + ' m/s` ، `t = ' + t + ' s`', '`Vi = ' + vi + ' m/s` ، `Vf = ' + vf + ' m/s` ، `x = ' + t + ' m`'],
        ['المسافة `x`', 'التسارع `a`', 'الزمن `t`', 'السرعة النهائية `Vf`'], ['`x = ((Vi + Vf) / 2)·t`', '`x = (Vf − Vi)·t`', '`x = (Vi + Vf)·t`', '`x = Vf / t`'], (vi + vf) / 2 * t, 'm'); } },
    { b: 'مثال ٣ صفحة 38: من السكون قطعت 110 m في 5 s (التسارع)', f: function () { const a = ri_(2, 12), t = ri_(2, 10), x = a * t * t / 2;
      return nm_('سيارة تحركت من السكون وبتسارع منتظم وقطعت مسافة مقدارها `' + nf_(x) + ' m` في زمن مقداره `' + t + ' s`، أوجد التسارع للسيارة.',
        ['`Vi = 0` ، `x = ' + nf_(x) + ' m` ، `t = ' + t + ' s`', '`Vf = 0` ، `x = ' + nf_(x) + ' m` ، `t = ' + t + ' s`', '`Vi = 0` ، `x = ' + t + ' m` ، `t = ' + nf_(x) + ' s`', '`Vi = ' + nf_(x) + ' m/s` ، `t = ' + t + ' s`'],
        ['التسارع `a`', 'السرعة النهائية `Vf`', 'المسافة `x`', 'الزمن `t`'], ['`x = Vi·t + ½·a·t²`', '`Vf = Vi + a·t`', '`x = ((Vi + Vf) / 2)·t`', '`Vf² = Vi² + 2·a·x`'], a, 'm/s²'); } },
    { b: 'مثال ٤ صفحة 38: من السكون بتسارع 4 m/s² بعد مسافة 20 m (السرعة)', f: function () { const a = pick_([2, 4, 5, 8, 10]), x = pick_([5, 10, 20, 40, 45, 80]);
      return nm_('سيارة بدأت من السكون وبتسارع مقداره `' + a + ' m/s²`، ما السرعة للسيارة بعد أن قطعت مسافة مقدارها `' + x + ' m`؟',
        ['`Vi = 0` ، `a = ' + a + ' m/s²` ، `x = ' + x + ' m`', '`Vi = 0` ، `a = ' + x + ' m/s²` ، `x = ' + a + ' m`', '`Vf = 0` ، `a = ' + a + ' m/s²` ، `x = ' + x + ' m`', '`Vi = 0` ، `a = ' + a + ' m/s²` ، `t = ' + x + ' s`'],
        ['السرعة النهائية `Vf`', 'التسارع `a`', 'الزمن `t`', 'المسافة `x`'], ['`Vf² = Vi² + 2·a·x`', '`Vf = Vi + a·t`', '`x = Vi·t + ½·a·t²`', '`Vf = a·x`'], Math.sqrt(2 * a * x), 'm/s'); } },
    { b: 'ورقة عمل (١) سؤال ٦ صفحة 48: من السكون بتسارع 10 m/s² بعد 3 s', f: function () { const a = ri_(2, 12), t = ri_(2, 10);
      return nm_('بدأ جسم حركته من السكون بتسارع مقداره `' + a + ' m/s²`، أوجد سرعة الجسم بعد مرور زمن مقداره `' + t + ' s` من بدء حركته.',
        ['`Vi = 0` ، `a = ' + a + ' m/s²` ، `t = ' + t + ' s`', '`Vi = ' + a + ' m/s` ، `a = 0` ، `t = ' + t + ' s`', '`Vi = 0` ، `a = ' + t + ' m/s²` ، `t = ' + a + ' s`', '`Vi = 0` ، `a = ' + a + ' m/s²` ، `x = ' + t + ' m`'],
        ['السرعة النهائية `Vf`', 'التسارع `a`', 'المسافة `x`', 'الزمن `t`'], ['`Vf = Vi + a·t`', '`Vf = Vi − a·t`', '`Vf = a / t`', '`Vf = Vi + a / t`'], a * t, 'm/s'); } }
  ],
  /* القوة وقوانين نيوتن والوزن */
  N: [
    { b: 'مثال ١ صفحة 40: جسم كتلته 5 kg يتسارع 17 m/s² (القوة)', f: function () { const m = ri_(2, 50), a = ri_(2, 20);
      return nm_('أوجد القوة المؤثرة على جسم كتلته `' + m + ' kg` إذ يتسارع بمعدل مقداره `' + a + ' m/s²`.',
        ['`m = ' + m + ' kg` ، `a = ' + a + ' m/s²`', '`m = ' + a + ' kg` ، `a = ' + m + ' m/s²`', '`m = ' + m + ' kg` ، `v = ' + a + ' m/s`', '`W = ' + m + ' N` ، `a = ' + a + ' m/s²`'],
        ['القوة `F`', 'التسارع `a`', 'الكتلة `m`', 'الوزن `W`'], ['`F = m·a`', '`F = m / a`', '`F = a / m`', '`F = m + a`'], m * a, 'N'); } },
    { b: 'مثال ٢ صفحة 40: قوة 30000 N وكتلة 1000 kg (التسارع)', f: function () { const m = ri_(2, 20) * 100, a = ri_(2, 15), F = m * a;
      return nm_('سيارة أثرت عليها قوة مقدارها `' + F + ' N` وكتلتها `' + m + ' kg`، أوجد التسارع للسيارة.',
        ['`F = ' + F + ' N` ، `m = ' + m + ' kg`', '`F = ' + m + ' N` ، `m = ' + F + ' kg`', '`W = ' + F + ' N` ، `m = ' + m + ' kg`', '`F = ' + F + ' N` ، `a = ' + m + ' m/s²`'],
        ['التسارع `a`', 'القوة `F`', 'الكتلة `m`', 'الوزن `W`'], ['`a = F / m`', '`a = F·m`', '`a = m / F`', '`a = F − m`'], a, 'm/s²'); } },
    { b: 'مثال ١ صفحة 42: جسم كتلته 100 kg (الوزن)', f: function () { const m = ri_(5, 150);
      return nm_('جسم كتلته `' + m + ' kg`، ما وزنه على سطح الأرض؟ (تسارع الجاذبية الأرضية `g = 9.8 m/s²`)',
        ['`m = ' + m + ' kg` ، `g = 9.8 m/s²`', '`W = ' + m + ' N` ، `g = 9.8 m/s²`', '`m = 9.8 kg` ، `g = ' + m + ' m/s²`', '`m = ' + m + ' kg` ، `a = 0`'],
        ['الوزن `W`', 'الكتلة `m`', 'تسارع الجاذبية `g`', 'القوة العمودية `N`'], ['`W = m·g`', '`W = m / g`', '`W = g / m`', '`W = m + g`'], m * 9.8, 'N'); } },
    { b: 'ورقة عمل (١) سؤال ٥ صفحة 50: قوة 50 N وتسارع 2 m/s² (الكتلة)', f: function () { const m = ri_(2, 40), a = ri_(2, 12), F = m * a;
      return nm_('أثرت قوة مقدارها `' + F + ' N` على جسم فتسارع بمعدل مقداره `' + a + ' m/s²`، أوجد كتلة الجسم.',
        ['`F = ' + F + ' N` ، `a = ' + a + ' m/s²`', '`F = ' + a + ' N` ، `a = ' + F + ' m/s²`', '`W = ' + F + ' N` ، `a = ' + a + ' m/s²`', '`F = ' + F + ' N` ، `m = ' + a + ' kg`'],
        ['الكتلة `m`', 'القوة `F`', 'التسارع `a`', 'الوزن `W`'], ['`m = F / a`', '`m = F·a`', '`m = a / F`', '`m = F − a`'], m, 'kg'); } }
  ],
  /* الاحتكاك */
  F: [
    { b: 'مثال ١ صفحة 45: صندوق وزنه 40 N ومعامل الاحتكاك 0.2 (قوة الاحتكاك)', f: function () { const u = pick_([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), W = ri_(2, 20) * 10;
      return nm_('صندوق وزنه `' + W + ' N` ومعامل الاحتكاك بين الصندوق والطاولة `' + u + '`، ما قيمة قوة الاحتكاك بين الصندوق والطاولة؟',
        ['`W = N = ' + W + ' N` ، `μk = ' + u + '`', '`W = N = ' + u + ' N` ، `μk = ' + W + '`', '`m = ' + W + ' kg` ، `μk = ' + u + '`', '`fk = ' + W + ' N` ، `μk = ' + u + '`'],
        ['قوة الاحتكاك الحركي `fk`', 'معامل الاحتكاك `μk`', 'القوة العمودية `N`', 'الكتلة `m`'], ['`fk = μk·N`', '`fk = N / μk`', '`fk = μk / N`', '`fk = μk + N`'], u * W, 'N'); } },
    { b: 'مثال ٢ صفحة 45: القوة العمودية 30 N وقوة الاحتكاك 3 N (معامل الاحتكاك)', f: function () { const u = pick_([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), N = ri_(2, 20) * 10, f = Math.round(u * N * 100) / 100;
      return nm_('ما معامل الاحتكاك الحركي إذا علمت أن القوة العمودية `' + N + ' N` وقوة الاحتكاك الحركي `' + f + ' N`؟',
        ['`N = ' + N + ' N` ، `fk = ' + f + ' N`', '`N = ' + f + ' N` ، `fk = ' + N + ' N`', '`W = ' + N + ' N` ، `m = ' + f + ' kg`', '`N = ' + N + ' N` ، `F = ' + f + ' N`'],
        ['معامل الاحتكاك الحركي `μk`', 'قوة الاحتكاك الحركي `fk`', 'القوة العمودية `N`', 'الوزن `W`'], ['`μk = fk / N`', '`μk = N / fk`', '`μk = fk·N`', '`μk = fk − N`'], f / N); } },
    { b: 'ورقة عمل (١) سؤال ٧ صفحة 50: صندوق وزنه 20 N ومعامل الاحتكاك 0.1', f: function () { const u = pick_([0.1, 0.15, 0.2, 0.3, 0.35]), W = ri_(2, 30) * 5;
      return nm_('جسم وزنه `' + W + ' N` موضوع على سطح أفقي، ومعامل الاحتكاك الحركي بينه وبين السطح `' + u + '`، أوجد قوة الاحتكاك الحركي.',
        ['`W = N = ' + W + ' N` ، `μk = ' + u + '`', '`W = N = ' + u + ' N` ، `μk = ' + W + '`', '`m = ' + W + ' kg` ، `μk = ' + u + '`', '`fk = ' + W + ' N` ، `μk = ' + u + '`'],
        ['قوة الاحتكاك الحركي `fk`', 'معامل الاحتكاك `μk`', 'القوة العمودية `N`', 'الكتلة `m`'], ['`fk = μk·N`', '`fk = N / μk`', '`fk = μk / N`', '`fk = μk + N`'], u * W, 'N'); } }
  ]
};
/* التحويل بين الوحدات (صفحة 12 و13): محفوظ في البنك ولا يدخل أي اختبار حاليا بطلب المدرب (التحويل يأتي نظريا فقط) */
function cvQ_(q, gv, rq, laws, v, u) { return nm_(q, gv, rq, laws, v, u); }
NUM_POOL.U = [
  { b: 'مثال ١ صفحة 12: حول 500 cm إلى m', f: function () { const L = ri_(12, 98) * 10;
    return cvQ_('حول الطول `' + L + ' cm` إلى المتر `m`.', ['`L = ' + L + ' cm`', '`L = ' + L + ' m`', '`L = ' + L + ' km`', '`L = ' + L + ' mm`'],
      ['الطول بالمتر `L(m)`', 'الطول بالسنتيمتر `L(cm)`', 'الطول بالكيلومتر `L(km)`', 'الكتلة بالجرام `m(g)`'],
      ['`L(m) = L(cm) ÷ 100`', '`L(m) = L(cm) × 100`', '`L(m) = L(cm) ÷ 1000`', '`L(m) = L(cm) × 1000`'], L / 100, 'm'); } },
  { b: 'على نمط مثال ١ صفحة 12: حول 3 m إلى cm', f: function () { const L = pick_([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9]);
    return cvQ_('حول الطول `' + L + ' m` إلى السنتيمتر `cm`.', ['`L = ' + L + ' m`', '`L = ' + L + ' cm`', '`L = ' + L + ' km`', '`L = ' + L + ' mm`'],
      ['الطول بالسنتيمتر `L(cm)`', 'الطول بالمتر `L(m)`', 'الطول بالكيلومتر `L(km)`', 'الكتلة بالجرام `m(g)`'],
      ['`L(cm) = L(m) × 100`', '`L(cm) = L(m) ÷ 100`', '`L(cm) = L(m) × 1000`', '`L(cm) = L(m) ÷ 1000`'], L * 100, 'cm'); } },
  { b: 'مثال ٢ صفحة 13: حول 2 kg إلى g', f: function () { const m = pick_([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 7, 8, 9]);
    return cvQ_('حول الكتلة `' + m + ' kg` إلى الجرام `g`.', ['`m = ' + m + ' kg`', '`m = ' + m + ' g`', '`m = ' + m + ' mg`', '`L = ' + m + ' m`'],
      ['الكتلة بالجرام `m(g)`', 'الكتلة بالكيلوجرام `m(kg)`', 'الطول بالمتر `L(m)`', 'الوزن `W`'],
      ['`m(g) = m(kg) × 1000`', '`m(g) = m(kg) ÷ 1000`', '`m(g) = m(kg) × 100`', '`m(g) = m(kg) ÷ 100`'], m * 1000, 'g'); } },
  { b: 'على نمط مثال ٢ صفحة 13: حول 250 g إلى kg', f: function () { const m = ri_(5, 95) * 10;
    return cvQ_('حول الكتلة `' + m + ' g` إلى الكيلوجرام `kg`.', ['`m = ' + m + ' g`', '`m = ' + m + ' kg`', '`m = ' + m + ' mg`', '`L = ' + m + ' m`'],
      ['الكتلة بالكيلوجرام `m(kg)`', 'الكتلة بالجرام `m(g)`', 'الطول بالمتر `L(m)`', 'الوزن `W`'],
      ['`m(kg) = m(g) ÷ 1000`', '`m(kg) = m(g) × 1000`', '`m(kg) = m(g) ÷ 100`', '`m(kg) = m(g) × 100`'], m / 1000, 'kg'); } },
  { b: 'مثال ٣ صفحة 13: حول 20 km/h إلى m/s', f: function () { const v = pick_([18, 20, 36, 45, 54, 60, 72, 90, 100, 108, 120]);
    return cvQ_('حول السرعة `' + v + ' km/h` إلى `m/s`.', ['`v = ' + v + ' km/h`', '`v = ' + v + ' m/s`', '`x = ' + v + ' km`', '`t = ' + v + ' h`'],
      ['السرعة بوحدة `m/s`', 'السرعة بوحدة `km/h`', 'الزمن بالثانية `t(s)`', 'المسافة بالمتر `x(m)`'],
      ['`v(m/s) = v(km/h) × 1000 ÷ 3600`', '`v(m/s) = v(km/h) × 3600 ÷ 1000`', '`v(m/s) = v(km/h) × 1000`', '`v(m/s) = v(km/h) ÷ 3600`'], v / 3.6, 'm/s'); } },
  { b: 'على نمط مثال ٣ صفحة 13: حول 5 m/s إلى km/h', f: function () { const v = ri_(2, 40);
    return cvQ_('حول السرعة `' + v + ' m/s` إلى `km/h`.', ['`v = ' + v + ' m/s`', '`v = ' + v + ' km/h`', '`x = ' + v + ' m`', '`t = ' + v + ' s`'],
      ['السرعة بوحدة `km/h`', 'السرعة بوحدة `m/s`', 'الزمن بالساعة `t(h)`', 'المسافة بالكيلومتر `x(km)`'],
      ['`v(km/h) = v(m/s) × 3600 ÷ 1000`', '`v(km/h) = v(m/s) × 1000 ÷ 3600`', '`v(km/h) = v(m/s) × 3600`', '`v(km/h) = v(m/s) ÷ 1000`'], v * 3.6, 'km/h'); } }
];
/* مسائل إضافية على القوانين الرئيسية، على نمط أمثلة الحقيبة التدريبية وتمارينها (الأرقام في b للنمط الأصلي، وتتغير داخل الاختبار فقط) */
const SYM_ = { x: 'المسافة `x`', t: 'الزمن `t`', v: 'السرعة المتوسطة `v`', a: 'التسارع `a`', Vi: 'السرعة الابتدائية `Vi`', Vf: 'السرعة النهائية `Vf`',
  F: 'القوة `F`', m: 'الكتلة `m`', W: 'الوزن `W`', N: 'القوة العمودية `N`', fk: 'قوة الاحتكاك الحركي `fk`', mu: 'معامل الاحتكاك الحركي `μk`',
  dot: 'حاصل الضرب القياسي `A·B`', cross: 'مقدار حاصل الضرب الاتجاهي `|A × B|`', th: 'الزاوية بين المتجهين `θ`', mag: 'مقدار المتجه `|A|`', C: 'مقدار المحصلة `C`' };
const UN_ = { 'θ': '°', A: '', B: '', x: 'm', t: 's', v: 'm/s', a: 'm/s²', Vi: 'm/s', Vf: 'm/s', F: 'N', m: 'kg', W: 'N', N: 'N', fk: 'N', mu: '', g: 'm/s²' };
const NM_ = { mu: 'μk' };
function gtx_(k, v) { const u = UN_[k] == null ? '' : UN_[k]; return '`' + (NM_[k] || k) + ' = ' + nf_(v) + (u ? ' ' + u : '') + '`'; }
/* G_: يبني المسألة من المعطيات (أزواج [رمز، قيمة])، والمطلوب ورموز مطلوبة خاطئة، والقانون الصحيح وثلاثة خاطئة، والناتج */
function G_(q, giv, req, reqW, laws, v, u) {
  const line = function (L) { return L.map(function (p) { return gtx_(p[0], p[1]); }).join(' ، '); };
  const g0 = line(giv);
  const g1 = line(giv.length > 1 ? [[giv[0][0], giv[1][1]], [giv[1][0], giv[0][1]]].concat(giv.slice(2)) : [[giv[0][0], giv[0][1] * 10]]);
  const g2 = line(giv.slice(0, -1).concat([[req, giv[giv.length - 1][1]]]));
  const nzI = giv.findIndex(function (p) { return p[1] !== 0 && ['θ', 'g', 'k', 'e', 'ε0'].indexOf(p[0]) < 0; });
  const g3 = line(giv.map(function (p, i) { return i === nzI ? [p[0], p[1] * 10] : p; }));
  return { q: q, s: [[g0, g1, g2, g3], [SYM_[req]].concat(reqW.map(function (k) { return SYM_[k]; })), laws, { v: v, u: u == null ? (UN_[req] || '') : u }] };
}
const NUM_MORE = {
  P: [
    { b: 'على نمط ص22: الزاوية بين متجهين من الضرب القياسي (|A| = 4 و |B| = 6 و A·B = 12)', f: function () { const A = ri_(2, 12), B = ri_(2, 12), t = pick_([30, 45, 60]), d = Math.round(A * B * cosd_(t) * 100) / 100;
      return { q: 'متجهان مقداراهما `|A| = ' + A + '` و `|B| = ' + B + '`، وحاصل ضربهما القياسي `A·B = ' + d + '`. أوجد الزاوية `θ` بينهما بالدرجات.', s: [
        ['`|A| = ' + A + '` ، `|B| = ' + B + '` ، `A·B = ' + d + '`', '`|A| = ' + B + '` ، `|B| = ' + d + '` ، `A·B = ' + A + '`', '`|A| = ' + A + '` ، `|B| = ' + B + '` ، `θ = ' + d + '°`', '`|A| = ' + A + '` ، `A·B = ' + d + '`'],
        [SYM_.th, SYM_.dot, SYM_.cross, SYM_.mag], ['`cosθ = A·B / (|A||B|)`', '`sinθ = A·B / (|A||B|)`', '`cosθ = |A||B| / A·B`', '`θ = A·B·|A||B|`'], { v: Math.acos(d / (A * B)) * 180 / Math.PI, u: '°' }] }; } },
    { b: 'على نمط ص23: الضرب القياسي لمتجهين متساويين (|A| = |B|)', f: function () { const A = ri_(2, 15), t = pick_([30, 45, 60]);
      return G_('متجهان قيمة كل منهما `' + A + '` وبينهما زاوية مقدارها `' + t + '°`، أوجد حاصل ضربهما القياسي.', [['θ', t], ['A', A], ['B', A]], 'dot', ['cross', 'C', 'th'],
        ['`A·B = |A||B|·cosθ`', '`A·B = |A||B|·sinθ`', '`A·B = |A| + |B|`', '`A·B = |A|²`'], A * A * cosd_(t), ''); } },
    { b: 'على نمط ص23: الضرب الاتجاهي لمتجهين متساويين (|A| = |B|)', f: function () { const A = ri_(2, 15), t = pick_([30, 45, 60]);
      return G_('متجهان قيمة كل منهما `' + A + '` وبينهما زاوية مقدارها `' + t + '°`، أوجد مقدار حاصل ضربهما الاتجاهي.', [['θ', t], ['A', A], ['B', A]], 'cross', ['dot', 'C', 'th'],
        ['`|A × B| = |A||B|·sinθ`', '`|A × B| = |A||B|·cosθ`', '`|A × B| = |A| + |B|`', '`|A × B| = |A|²`'], A * A * sind_(t), ''); } }
  ],
  M: [
    { b: 'على نمط ص36: سرعة متوسطة وزمن (المسافة)', f: function () { const v = ri_(2, 30), t = ri_(2, 20);
      return G_('سيارة تتحرك بسرعة متوسطة مقدارها `' + v + ' m/s` لمدة `' + t + ' s`، أوجد المسافة التي قطعتها.', [['v', v], ['t', t]], 'x', ['a', 'Vf', 't'],
        ['`x = v·t`', '`x = v / t`', '`x = t / v`', '`x = v + t`'], v * t); } },
    { b: 'على نمط ص36: مسافة وسرعة متوسطة (الزمن)', f: function () { const v = ri_(2, 30), t = ri_(2, 20), x = v * t;
      return G_('سيارة قطعت مسافة مقدارها `' + x + ' m` بسرعة متوسطة مقدارها `' + v + ' m/s`، أوجد الزمن الذي استغرقته.', [['x', x], ['v', v]], 't', ['a', 'Vf', 'x'],
        ['`t = x / v`', '`t = x·v`', '`t = v / x`', '`t = x − v`'], t); } },
    { b: 'على نمط ص37: السرعة النهائية بعد زمن (Vi ≠ 0)', f: function () { const vi = ri_(2, 20), a = ri_(2, 10), t = ri_(2, 10);
      return G_('جسم يتحرك بسرعة ابتدائية `' + vi + ' m/s` وبتسارع منتظم `' + a + ' m/s²`، أوجد سرعته بعد `' + t + ' s`.', [['Vi', vi], ['a', a], ['t', t]], 'Vf', ['x', 'v', 'Vi'],
        ['`Vf = Vi + a·t`', '`Vf = Vi − a·t`', '`Vf = a·t − Vi`', '`Vf = Vi + a / t`'], vi + a * t); } },
    { b: 'على نمط ص37: الزمن اللازم لتغير السرعة', f: function () { const vi = ri_(2, 20), a = ri_(2, 10), t = ri_(2, 12), vf = vi + a * t;
      return G_('سيارة زادت سرعتها من `' + vi + ' m/s` إلى `' + vf + ' m/s` بتسارع منتظم `' + a + ' m/s²`، أوجد الزمن اللازم لذلك.', [['Vi', vi], ['Vf', vf], ['a', a]], 't', ['x', 'v', 'Vf'],
        ['`t = (Vf − Vi) / a`', '`t = (Vf + Vi) / a`', '`t = a / (Vf − Vi)`', '`t = (Vf − Vi)·a`'], t); } },
    { b: 'مثال ١ صفحة 37: سيارة سرعتها 5 m/s توقفت بعد 20 m (الزمن)', f: function () { const vi = pick_([4, 5, 6, 8, 10, 12, 15, 20]), x = pick_([10, 20, 25, 30, 40, 50]);
      return G_('سيارة سرعتها `' + vi + ' m/s` ثم توقفت بعد أن قطعت مسافة مقدارها `' + x + ' m`، أوجد الزمن اللازم لتوقفها.', [['Vi', vi], ['Vf', 0], ['x', x]], 't', ['a', 'v', 'Vi'],
        ['`x = ((Vi + Vf) / 2)·t`', '`x = Vi·t`', '`x = (Vf − Vi)·t`', '`Vf = Vi·t`'], 2 * x / vi); } },
    { b: 'مثال ١ صفحة 37: سيارة سرعتها 5 m/s توقفت بعد 20 m (التسارع)', f: function () { const vi = pick_([4, 5, 6, 8, 10, 12, 15, 20]), x = pick_([10, 20, 25, 30, 40, 50]);
      return G_('سيارة سرعتها `' + vi + ' m/s` ثم توقفت بعد أن قطعت مسافة مقدارها `' + x + ' m`، أوجد تسارع السيارة (اكتب الإشارة).', [['Vi', vi], ['Vf', 0], ['x', x]], 'a', ['t', 'v', 'Vi'],
        ['`Vf² = Vi² + 2·a·x`', '`Vf = Vi + a·t`', '`x = Vi·t`', '`a = x / Vi`'], -vi * vi / (2 * x)); } },
    { b: 'على نمط ص38: الإزاحة بالمعادلة الثانية (Vi و a و t)', f: function () { const vi = ri_(0, 15), a = ri_(2, 8), t = ri_(2, 10);
      return G_('جسم يتحرك بسرعة ابتدائية `' + vi + ' m/s` وبتسارع منتظم `' + a + ' m/s²`، أوجد المسافة التي يقطعها خلال `' + t + ' s`.', [['Vi', vi], ['a', a], ['t', t]], 'x', ['Vf', 'v', 't'],
        ['`x = Vi·t + ½·a·t²`', '`x = Vi·t + a·t²`', '`x = Vi + a·t`', '`x = ½·a·t`'], vi * t + a * t * t / 2); } },
    { b: 'على نمط ص38: المسافة من السكون بتسارع وزمن', f: function () { const a = ri_(2, 12), t = ri_(2, 10);
      return G_('بدأت سيارة الحركة من السكون بتسارع منتظم `' + a + ' m/s²`، أوجد المسافة التي تقطعها خلال `' + t + ' s`.', [['Vi', 0], ['a', a], ['t', t]], 'x', ['Vf', 'v', 'a'],
        ['`x = Vi·t + ½·a·t²`', '`x = a·t`', '`x = ½·a·t`', '`x = Vi + a·t²`'], a * t * t / 2); } },
    { b: 'على نمط ص38: السرعة النهائية بالمعادلة الثالثة (Vi ≠ 0)', f: function () { const vi = ri_(2, 15), a = ri_(2, 8), x = ri_(2, 20) * 5;
      return G_('جسم يتحرك بسرعة `' + vi + ' m/s` وتسارع منتظم `' + a + ' m/s²`، أوجد سرعته بعد أن يقطع مسافة `' + x + ' m`.', [['Vi', vi], ['a', a], ['x', x]], 'Vf', ['t', 'v', 'Vi'],
        ['`Vf² = Vi² + 2·a·x`', '`Vf = Vi + a·x`', '`Vf² = Vi² + a·x`', '`Vf = Vi + 2·a·x`'], Math.sqrt(vi * vi + 2 * a * x)); } },
    { b: 'على نمط ص38: المسافة اللازمة لتغير السرعة', f: function () { const vi = ri_(2, 15), vf = vi + ri_(2, 20), a = ri_(2, 8);
      return G_('سيارة زادت سرعتها من `' + vi + ' m/s` إلى `' + vf + ' m/s` بتسارع منتظم `' + a + ' m/s²`، أوجد المسافة التي قطعتها.', [['Vi', vi], ['Vf', vf], ['a', a]], 'x', ['t', 'v', 'a'],
        ['`Vf² = Vi² + 2·a·x`', '`Vf = Vi + a·t`', '`x = Vf·t`', '`x = (Vf − Vi) / a`'], (vf * vf - vi * vi) / (2 * a)); } },
    { b: 'ورقة عمل (١) سؤال ٤ صفحة 47: سيارة سرعتها 10 m/s توقفت بعد 30 m (الزمن)', f: function () { const vi = pick_([6, 8, 10, 12, 16, 20]), x = pick_([12, 24, 30, 36, 48, 60]);
      return G_('سيارة سرعتها `' + vi + ' m/s` ثم توقفت بعد أن قطعت مسافة مقدارها `' + x + ' m`، أوجد الزمن.', [['Vi', vi], ['Vf', 0], ['x', x]], 't', ['a', 'v', 'Vi'],
        ['`x = ((Vi + Vf) / 2)·t`', '`x = Vi·t`', '`x = (Vf − Vi)·t`', '`Vf = Vi·t`'], 2 * x / vi); } }
  ],
  N: [
    { b: 'مثال ٣ صفحة 41: قوة 50 N على صندوق 10 kg (السرعة بعد 3 s)', f: function () { const m = ri_(2, 20), a = ri_(2, 10), F = m * a, t = ri_(2, 8);
      return G_('قوة ثابتة مقدارها `' + F + ' N` تؤثر على صندوق ساكن كتلته `' + m + ' kg`، أوجد سرعة الصندوق بعد زمن مقداره `' + t + ' s`.', [['F', F], ['m', m], ['t', t]], 'Vf', ['a', 'x', 'W'],
        ['`a = F / m` ثم `Vf = Vi + a·t`', '`a = F·m` ثم `Vf = a·t`', '`Vf = F·t`', '`Vf = F / (m·t)`'], a * t); } },
    { b: 'مثال ٤ صفحة 41: صندوق 20 kg يسحب بقوة 80 N لمدة 4 s (المسافة)', f: function () { const m = ri_(2, 20), a = ri_(2, 8), F = m * a, t = ri_(2, 8);
      return G_('صندوق كتلته `' + m + ' kg` موضوع على سطح أملس سحب بقوة مقدارها `' + F + ' N` لمدة `' + t + ' s` من السكون، أوجد المسافة التي يقطعها.', [['m', m], ['F', F], ['t', t]], 'x', ['a', 'Vf', 'W'],
        ['`a = F / m` ثم `x = Vi·t + ½·a·t²`', '`a = F·m` ثم `x = a·t`', '`x = F·t`', '`x = F / m`'], a * t * t / 2); } },
    { b: 'على نمط ص42: الكتلة من الوزن', f: function () { const m = ri_(2, 120);
      return G_('جسم وزنه على سطح الأرض `' + nf_(m * 9.8) + ' N`، أوجد كتلته. (تسارع الجاذبية الأرضية `g = 9.8 m/s²`)', [['W', m * 9.8], ['g', 9.8]], 'm', ['W', 'F', 'a'],
        ['`m = W / g`', '`m = W·g`', '`m = g / W`', '`m = W − g`'], m); } },
    { b: 'ورقة عمل (١) سؤال ٣ صفحة 49: كتلة 3 kg وتسارع 10 m/s² (القوة)', f: function () { const m = ri_(2, 30), a = ri_(2, 15);
      return G_('ما القوة المؤثرة على جسم كتلته `' + m + ' kg` إذا كان يتسارع بمعدل مقداره `' + a + ' m/s²`؟', [['m', m], ['a', a]], 'F', ['W', 'a', 'm'],
        ['`F = m·a`', '`F = m / a`', '`F = a / m`', '`F = m + a`'], m * a); } },
    { b: 'ورقة عمل (١) سؤال ٤ صفحة 49: كتلة 2000 kg وقوة 30000 N (التسارع)', f: function () { const m = ri_(5, 30) * 100, a = ri_(2, 15), F = m * a;
      return G_('سيارة كتلتها `' + m + ' kg` تؤثر عليها قوة مقدارها `' + F + ' N`، أوجد التسارع للسيارة.', [['m', m], ['F', F]], 'a', ['F', 'W', 'm'],
        ['`a = F / m`', '`a = F·m`', '`a = m / F`', '`a = F − m`'], a); } },
    { b: 'ورقة عمل (١) سؤال ٦ صفحة 50: جسم كتلته 120 kg (الوزن)', f: function () { const m = ri_(5, 200);
      return G_('جسم كتلته `' + m + ' kg`، أوجد الوزن للجسم على الأرض. (`g = 9.8 m/s²`)', [['m', m], ['g', 9.8]], 'W', ['m', 'F', 'a'],
        ['`W = m·g`', '`W = m / g`', '`W = g / m`', '`W = m + g`'], m * 9.8); } }
  ],
  F: [
    { b: 'ورقة عمل (١) سؤال ٨ صفحة 51: القوة العمودية 20 N وقوة الاحتكاك 2 N (المعامل)', f: function () { const u = pick_([0.1, 0.2, 0.25, 0.3, 0.4, 0.5]), N = ri_(2, 30) * 5, f = Math.round(u * N * 100) / 100;
      return G_('ما معامل الاحتكاك الحركي إذا علمت أن القوة العمودية `' + N + ' N` وقوة الاحتكاك الحركي `' + f + ' N`؟', [['N', N], ['fk', f]], 'mu', ['fk', 'N', 'W'],
        ['`μk = fk / N`', '`μk = N / fk`', '`μk = fk·N`', '`μk = fk − N`'], f / N, ''); } },
    { b: 'على نمط ص45: القوة العمودية من قوة الاحتكاك ومعامل الاحتكاك', f: function () { const u = pick_([0.1, 0.2, 0.25, 0.4, 0.5]), N = ri_(2, 30) * 10, f = Math.round(u * N * 100) / 100;
      return G_('جسم يتحرك على سطح أفقي، قوة الاحتكاك الحركي عليه `' + f + ' N` ومعامل الاحتكاك الحركي `' + u + '`، أوجد القوة العمودية.', [['fk', f], ['mu', u]], 'N', ['fk', 'mu', 'm'],
        ['`N = fk / μk`', '`N = fk·μk`', '`N = μk / fk`', '`N = fk + μk`'], N); } },
    { b: 'مثال ٣ صفحة 45: صندوق كتلته 5 kg ومعامل الاحتكاك 0.4 (قوة الاحتكاك)', f: function () { const m = ri_(2, 30), u = pick_([0.1, 0.2, 0.3, 0.4, 0.5]);
      return G_('صندوق كتلته `' + m + ' kg` موضوع على طاولة أفقية، ومعامل الاحتكاك `' + u + '`، أوجد قوة الاحتكاك. (`g = 9.8 m/s²`)', [['m', m], ['mu', u], ['g', 9.8]], 'fk', ['mu', 'W', 'a'],
        ['`fk = μk·m·g`', '`fk = μk·m`', '`fk = m·g / μk`', '`fk = μk + m·g`'], u * m * 9.8); } },
    { b: 'ورقة عمل (١) سؤال ٩ صفحة 51: صندوق 2 kg ومعامل 0.2 (قوة الاحتكاك)', f: function () { const m = ri_(2, 20), u = pick_([0.1, 0.2, 0.3, 0.4]);
      return G_('صندوق كتلته `' + m + ' kg` وضع على سطح أفقي، ومعامل الاحتكاك `' + u + '`، أوجد قوة الاحتكاك. (`g = 9.8 m/s²`)', [['m', m], ['mu', u], ['g', 9.8]], 'fk', ['mu', 'W', 'a'],
        ['`fk = μk·m·g`', '`fk = μk·m`', '`fk = m·g / μk`', '`fk = μk + m·g`'], u * m * 9.8); } }
  ]
};
Object.keys(NUM_MORE).forEach(function (k) { NUM_POOL[k] = NUM_POOL[k].concat(NUM_MORE[k]); });
/* مكثفات أو مقاومات متماثلة (2 أو 3 أو 4) على التوالي أو التوازي: السعة أو المقاومة المكافئة */
function idn3_(kind) {
  const n = pick_([2, 3, 3, 4]), cap = kind[0] === 'c', ser = kind[1] === 's';
  const x = cap ? pick_([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30]) : pick_([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60]);
  const u = cap ? 'µF' : 'Ω', S = cap ? 'C' : 'R', sub = ['₁', '₂', '₃', '₄'];
  const word = cap ? { 2: 'مكثفان', 3: 'ثلاثة مكثفات', 4: 'أربعة مكثفات' }[n] : { 2: 'مقاومتان', 3: 'ثلاث مقاومات', 4: 'أربع مقاومات' }[n];
  const how = ser ? 'على التوالي' : 'على التوازي', each = (cap ? 'سعة' : 'قيمة') + (n === 2 ? ' كل منهما' : ' كل منها'), joined = n === 2 ? (cap ? 'وصلا' : 'وصلتا') : 'وصلت';
  const names = sub.slice(0, n).map(function (z) { return S + z; });
  const eq = function (v, k) { return '`' + names.slice(0, k || n).join(' = ') + ' = ' + nf_(v) + ' ' + u + '`'; };
  const sumL = '`' + S + ' = ' + names.join(' + ') + '`', invL = '`1/' + S + ' = ' + names.map(function (z) { return '1/' + z; }).join(' + ') + '`';
  const prodL = '`' + S + ' = ' + names.join('·') + '`', badL = '`1/' + S + ' = ' + names.join(' + ') + '`';
  const capSer = cap ? ser : !ser;   /* المكثفات على التوالي مثل المقاومات على التوازي */
  const v = capSer ? x / n : x * n;
  return nm_(word + ' ' + each + ' `' + nf_(x) + ' ' + u + '` ' + joined + ' ' + how + '، أوجد ' + (cap ? 'السعة المكافئة' : 'المقاومة المكافئة') + '. (اكتب الناتج بوحدة `' + u + '`)',
    [eq(x), eq(x * 10), eq(x, n - 1), eq(x * 2)],
    cap ? ['السعة المكافئة `C`', 'الشحنة الكلية `q`', 'فرق الجهد `V`', 'الطاقة المختزنة `E`'] : ['المقاومة المكافئة `R`', 'شدة التيار `I`', 'فرق الجهد `V`', 'القدرة `P`'],
    capSer ? [invL, sumL, prodL, badL] : [sumL, invL, prodL, badL], v, u);
}

/* بنك المسائل الحسابية: الاختبار الفصلي الثاني والنهائي (بدون الفيزياء الحرارية) */
Object.assign(SYM_, {
  Wk: 'الشغل `W`', KE: 'الطاقة الحركية `KE`', PE: 'طاقة الوضع `PE`', ME: 'الطاقة الميكانيكية `ME`', h: 'الارتفاع `h`', vs: 'السرعة `v`',
  q: 'الشحنة `q`', q1: 'الشحنة الأولى `q₁`', q2: 'الشحنة الثانية `q₂`', q3: 'الشحنة الثالثة `q₃`', r: 'المسافة `r`', r12: 'المسافة `r₁₂`', r23: 'المسافة `r₂₃`',
  k: 'ثابت كولوم `k`', Fe: 'القوة الكهربائية `F`', E: 'شدة المجال الكهربائي `E`', V: 'فرق الجهد `V`', Vp: 'الجهد الكهربائي `V`', V1: 'فرق جهد المكثف الأول `V₁`', d: 'المسافة `d`',
  Cap: 'السعة الكهربائية `C`', C1: 'سعة المكثف الأول `C₁`', C2: 'سعة المكثف الثاني `C₂`', C3: 'سعة المكثف الثالث `C₃`', Ec: 'الطاقة المختزنة `E`', 'ε0': 'سماحية الفراغ `ε₀`',
  Ar: 'مساحة المقطع `A`', I: 'شدة التيار `I`', J: 'كثافة التيار `J`', n: 'عدد الإلكترونات الحرة لوحدة الحجم `n`', e: 'شحنة الإلكترون `e`', vd: 'سرعة الانجراف `v_d`',
  R: 'المقاومة `R`', R1: 'المقاومة الأولى `R₁`', R2: 'المقاومة الثانية `R₂`', R3: 'المقاومة الثالثة `R₃`', R0: 'المقاومة عند درجة الحرارة الابتدائية `R₀`', rho: 'المقاومة النوعية `ρ`',
  L: 'طول السلك `L`', alpha: 'المعامل الحراري للمقاومة `α`', T: 'درجة الحرارة النهائية `T`', T0: 'درجة الحرارة الابتدائية `T₀`', P: 'القدرة الكهربائية `P`'
});
Object.assign(UN_, {
  Wk: 'J', KE: 'J', PE: 'J', ME: 'J', h: 'm', vs: 'm/s', q: 'C', q1: 'C', q2: 'C', q3: 'C', r: 'm', r12: 'm', r23: 'm', k: 'N·m²/C²', Fe: 'N', E: 'N/C', V: 'V', Vp: 'V', V1: 'V', d: 'm',
  Cap: 'F', C1: 'F', C2: 'F', C3: 'F', Ec: 'J', 'ε0': 'F/m', Ar: 'm²', I: 'A', J: 'A/m²', n: 'electron/m³', e: 'C', vd: 'm/s',
  R: 'Ω', R1: 'Ω', R2: 'Ω', R3: 'Ω', R0: 'Ω', rho: 'Ω·m', L: 'm', alpha: '°C⁻¹', T: '°C', T0: '°C', P: 'W'
});
Object.assign(NM_, {
  Wk: 'W', vs: 'v', q1: 'q₁', q2: 'q₂', q3: 'q₃', r12: 'r₁₂', r23: 'r₂₃', Fe: 'F', Vp: 'V', V1: 'V₁', Cap: 'C', C1: 'C₁', C2: 'C₂', C3: 'C₃', Ec: 'E', 'ε0': 'ε₀',
  Ar: 'A', vd: 'v_d', R1: 'R₁', R2: 'R₂', R3: 'R₃', R0: 'R₀', rho: 'ρ', alpha: 'α', T0: 'T₀'
});
/* عرض الأعداد الصغيرة جدا والكبيرة جدا بالصيغة العلمية (مثل 2 × 10⁻⁶) كما في الحقيبة التدريبية، والباقي كما هو */
function sup3_(e) { const D = '⁰¹²³⁴⁵⁶⁷⁸⁹'; return String(e).split('').map(function (c) { return c === '-' ? '⁻' : D.charAt(+c); }).join(''); }
function sf3_(x) {
  if (x === 0) return '0';
  const s = x < 0 ? '−' : '', a = Math.abs(x);
  if (a >= 1e5 || a < 0.01) { let e = Math.floor(Math.log10(a)), m = +(a / Math.pow(10, e)).toPrecision(4); if (m >= 10) { m = +(m / 10).toPrecision(4); e++; } return s + m + ' × 10' + sup3_(e); }
  return s + String(+a.toPrecision(6));
}
function tx3_(x, u) { return '`' + sf3_(x) + (u ? (u === '°' ? '' : ' ') + u : '') + '`'; }
function gt3_(k, v, u) { if (u == null) u = UN_[k] == null ? '' : UN_[k]; return '`' + (NM_[k] || k) + ' = ' + sf3_(v) + (u ? (u === '°' ? '' : ' ') + u : '') + '`'; }
/* G3_: مثل G_ تماما (نفس الخيارات المضللة للمعطيات)، مع الصيغة العلمية ووحدة خاصة اختيارية لكل معطى [رمز، قيمة، وحدة] */
function G3_(q, giv, req, reqW, laws, v, u) {
  const uu = function (p) { return p.length > 2 ? p[2] : null; };
  const line = function (L) { return L.map(function (p) { return gt3_(p[0], p[1], uu(p)); }).join(' ، '); };
  const g0 = line(giv);
  const g1 = line([[giv[0][0], giv[1][1], uu(giv[0])], [giv[1][0], giv[0][1], uu(giv[1])]].concat(giv.slice(2)));
  const g2 = line(giv.slice(0, -1).concat([[req, giv[giv.length - 1][1], u != null ? u : (UN_[req] || '')]]));
  const nzI = giv.findIndex(function (p) { return p[1] !== 0 && ['θ', 'g', 'k', 'e', 'ε0'].indexOf(p[0]) < 0; });
  const g3 = line(giv.map(function (p, i) { return i === nzI ? [p[0], p[1] * 10, uu(p)] : p; }));
  return { q: q, s: [[g0, g1, g2, g3], [SYM_[req]].concat(reqW.map(function (k) { return SYM_[k]; })), laws, { v: v, u: u == null ? (UN_[req] || '') : u }] };
}
function dif3_(f) { let x; do { x = f(); } while (x[0] === x[1]); return x; }
Object.assign(NUM_POOL, {
  /* الشغل والطاقة الحركية وطاقة الوضع وحفظ الطاقة (صفحات 52 إلى 67) */
  W: [
    { b: 'مثال 1 صفحة 53: قوة 50 N أزاحت جسما مسافة 200 m في اتجاهها (الشغل)', f: function () { const p = dif3_(function () { return [ri_(2, 30) * 5, ri_(2, 50) * 2]; }), F = p[0], x = p[1];
      return G3_('قوة مقدارها ' + tx3_(F, 'N') + ' أثرت على جسم فأزاحته مسافة مقدارها ' + tx3_(x, 'm') + ' في اتجاهها، أوجد الشغل المبذول.', [['F', F], ['x', x], ['θ', 0]], 'Wk', ['KE', 'PE', 'F'],
        ['`W = F·x·cosθ`', '`W = F·x·sinθ`', '`W = F / x`', '`W = ½·F·x²`'], F * x); } },
    { b: 'مثال 2 صفحة 53: صندوق سحب بقوة 100 N بزاوية 60° مع الأفقي وتحرك مسافة 8 m (الشغل)', f: function () { const p = dif3_(function () { return [ri_(2, 20) * 10, ri_(2, 20)]; }), F = p[0], x = p[1], t = pick_([30, 45, 60]);
      return G3_('صندوق سحب بقوة مقدارها ' + tx3_(F, 'N') + ' تصنع زاوية ' + tx3_(t, '°') + ' مع الأفقي، فتحرك على سطح أفقي مسافة مقدارها ' + tx3_(x, 'm') + '، أوجد الشغل المبذول على الصندوق.', [['F', F], ['x', x], ['θ', t]], 'Wk', ['KE', 'F', 'PE'],
        ['`W = F·x·cosθ`', '`W = F·x·sinθ`', '`W = F·x / cosθ`', '`W = F·x·tanθ`'], F * x * cosd_(t)); } },
    { b: 'مثال 3 صفحة 53: جسم كتلته 0.2 kg تحرك مسافة 0.8 m بتسارع 2 m/s² (الشغل)', f: function () { const p = dif3_(function () { return [ri_(2, 20), ri_(2, 10)]; }), m = p[0], a = p[1], x = ri_(2, 20);
      return G3_('جسم كتلته ' + tx3_(m, 'kg') + ' تحرك مسافة مقدارها ' + tx3_(x, 'm') + ' بتسارع مقداره ' + tx3_(a, 'm/s²') + ' في اتجاه القوة، احسب الشغل المبذول.', [['m', m], ['a', a], ['x', x]], 'Wk', ['F', 'KE', 'a'],
        ['`F = m·a` ثم `W = F·x`', '`F = m / a` ثم `W = F·x`', '`W = m·a / x`', '`W = ½·m·a·x²`'], m * a * x); } },
    { b: 'ورقة عمل (2) سؤال 2 صفحة 58: قوة 30 N أزاحت جسما مسافة 100 m (على نمطه: القوة من الشغل والمسافة)', f: function () { const F = ri_(2, 30) * 5, x = ri_(2, 40) * 5, W = F * x;
      return G3_('بذلت قوة شغلا مقداره ' + tx3_(W, 'J') + ' لتحريك جسم مسافة مقدارها ' + tx3_(x, 'm') + ' في اتجاهها، أوجد مقدار القوة.', [['Wk', W], ['x', x]], 'F', ['Wk', 'KE', 'm'],
        ['`F = W / x`', '`F = W·x`', '`F = x / W`', '`F = W − x`'], F); } },
    { b: 'مثال 1 صفحة 55: جسم كتلته 45 kg يتحرك بسرعة 13 m/s (الطاقة الحركية)', f: function () { const p = dif3_(function () { return [ri_(2, 80), ri_(2, 30)]; }), m = p[0], v = p[1];
      return G3_('ما الطاقة الحركية لجسم كتلته ' + tx3_(m, 'kg') + ' يتحرك بسرعة مقدارها ' + tx3_(v, 'm/s') + '؟', [['m', m], ['vs', v]], 'KE', ['PE', 'ME', 'Wk'],
        ['`KE = ½·m·v²`', '`KE = m·v²`', '`KE = ½·m·v`', '`KE = m·g·h`'], m * v * v / 2); } },
    { b: 'مثال 2 صفحة 55: كرة سرعتها 3 m/s وطاقتها الحركية 18 J (الكتلة)', f: function () { const p = dif3_(function () { const m = ri_(1, 20), v = ri_(2, 12); return [v, m * v * v / 2, m]; }), v = p[0], K = p[1], m = p[2];
      return G3_('كرة تتحرك بسرعة مقدارها ' + tx3_(v, 'm/s') + ' وطاقتها الحركية ' + tx3_(K, 'J') + '، أوجد كتلتها.', [['vs', v], ['KE', K]], 'm', ['KE', 'PE', 'vs'],
        ['`m = 2·KE / v²`', '`m = KE / v²`', '`m = 2·KE / v`', '`m = KE·v² / 2`'], m); } },
    { b: 'مثال 3 صفحة 56: جسم كتلته 5 kg على حافة ارتفاعها 3 m (طاقة الوضع)', f: function () { const p = dif3_(function () { return [ri_(1, 50), ri_(1, 30)]; }), m = p[0], h = p[1];
      return G3_('ما طاقة الوضع لجسم كتلته ' + tx3_(m, 'kg') + ' وضع على حافة ارتفاعها ' + tx3_(h, 'm') + '؟ (`g = 9.8 m/s²`)', [['m', m], ['h', h], ['g', 9.8]], 'PE', ['KE', 'Wk', 'ME'],
        ['`PE = m·g·h`', '`PE = ½·m·g·h`', '`PE = m·h / g`', '`PE = ½·m·h²`'], m * 9.8 * h); } },
    { b: 'تمارين الوحدة اختر الإجابة 20 صفحة 62: جسم كتلته 15 kg على ارتفاع 3 m (على نمطه: الارتفاع من طاقة الوضع)', f: function () { const m = ri_(2, 40), h = ri_(1, 30), PE = Math.round(m * 9.8 * h * 100) / 100;
      return G3_('جسم كتلته ' + tx3_(m, 'kg') + ' وطاقة وضعه ' + tx3_(PE, 'J') + '، على أي ارتفاع يوجد؟ (`g = 9.8 m/s²`)', [['PE', PE], ['m', m], ['g', 9.8]], 'h', ['PE', 'm', 'vs'],
        ['`h = PE / (m·g)`', '`h = PE·m·g`', '`h = m·g / PE`', '`h = PE / m`'], PE / (m * 9.8)); } },
    { b: 'ورقة عمل (2) سؤال 6 صفحة 59: طاقة حركية 10 J وطاقة وضع 30 J (الطاقة الميكانيكية)', f: function () { const p = dif3_(function () { return [ri_(2, 100), ri_(2, 100)]; }), K = p[0], U = p[1];
      return G3_('إذا كانت الطاقة الحركية لجسم يسقط ' + tx3_(K, 'J') + ' وطاقة الوضع له ' + tx3_(U, 'J') + '، ما الطاقة الميكانيكية لهذا الجسم؟', [['KE', K], ['PE', U]], 'ME', ['KE', 'PE', 'Wk'],
        ['`ME = KE + PE`', '`ME = KE − PE`', '`ME = KE·PE`', '`ME = PE / KE`'], K + U); } },
    { b: 'مثال 2 صفحة 57: قط كتلته 1 kg يركض بسرعة 6 m/s (أعلى ارتفاع يقفز إليه)', f: function () { const p = dif3_(function () { return [ri_(1, 10), ri_(2, 15)]; }), m = p[0], v = p[1];
      return G3_('قط كتلته ' + tx3_(m, 'kg') + ' يركض بسرعة مقدارها ' + tx3_(v, 'm/s') + '، أوجد أعلى ارتفاع يستطيع أن يقفز إليه. (`g = 9.8 m/s²`)', [['m', m], ['vs', v], ['g', 9.8]], 'h', ['vs', 'KE', 'PE'],
        ['`½·m·v² = m·g·h` ومنه `h = v² / (2·g)`', '`h = v / (2·g)`', '`h = 2·g·v²`', '`h = m·v² / g`'], v * v / (2 * 9.8)); } },
    { b: 'على نمط مثال 2 صفحة 57 (حفظ الطاقة، قط كتلته 1 kg وسرعته 6 m/s): سرعة جسم عند الأرض بعد سقوطه من ارتفاع', f: function () { const p = dif3_(function () { return [ri_(1, 20), ri_(1, 45)]; }), m = p[0], h = p[1];
      return G3_('سقط جسم كتلته ' + tx3_(m, 'kg') + ' من السكون من ارتفاع ' + tx3_(h, 'm') + '، أوجد سرعته لحظة وصوله إلى الأرض بإهمال مقاومة الهواء. (`g = 9.8 m/s²`)', [['m', m], ['h', h], ['g', 9.8]], 'vs', ['h', 'KE', 'PE'],
        ['`m·g·h = ½·m·v²` ومنه `v = √(2·g·h)`', '`v = 2·g·h`', '`v = √(g·h)`', '`v = √(2·h / g)`'], Math.sqrt(2 * 9.8 * h)); } },
    { b: 'تمارين الوحدة اختر الإجابة 19 صفحة 62: جسم كتلته 8 kg سرعته 5 m/s (على نمطه: السرعة من الطاقة الحركية)', f: function () { const p = dif3_(function () { const m = ri_(1, 40), v = ri_(2, 20); return [m, m * v * v / 2, v]; }), m = p[0], K = p[1];
      return G3_('جسم كتلته ' + tx3_(m, 'kg') + ' وطاقته الحركية ' + tx3_(K, 'J') + '، أوجد سرعته.', [['m', m], ['KE', K]], 'vs', ['KE', 'm', 'h'],
        ['`v = √(2·KE / m)`', '`v = 2·KE / m`', '`v = √(KE / m)`', '`v = √(2·m / KE)`'], p[2]); } }
  ],
  /* قانون كولوم والمجال والجهد (صفحات 91 إلى 96، وورقة العمل صفحات 104 إلى 106) */
  E: [
    { b: 'مثال 1 صفحة 92: شحنتان 2 × 10⁻⁶ C و 3 × 10⁻⁶ C والمسافة بينهما 1.5 m (القوة)', f: function () { const p = dif3_(function () { return [ri_(2, 9), ri_(2, 9)]; }), a = p[0] * 1e-6, b = p[1] * 1e-6, r = pick_([0.1, 0.2, 0.3, 0.5, 0.6]);
      return G3_('شحنتان ' + tx3_(a, 'C') + ' و ' + tx3_(b, 'C') + ' والمسافة بينهما ' + tx3_(r, 'm') + '، أوجد القوة الكهربائية بينهما. (`k = 9 × 10⁹ N·m²/C²`)', [['q1', a], ['q2', b], ['r', r], ['k', 9e9]], 'Fe', ['E', 'Vp', 'q1'],
        ['`F = k·q₁·q₂ / r²`', '`F = k·q₁·q₂ / r`', '`F = q₁·q₂ / (k·r²)`', '`F = k·(q₁ + q₂) / r²`'], 9e9 * a * b / (r * r)); } },
    { b: 'مثال 1 صفحة 95: شدة المجال على بعد 0.3 m من شحنة 5 × 10⁻⁹ C', f: function () { const q = ri_(1, 9) * 1e-9, r = pick_([0.1, 0.2, 0.3, 0.4, 0.5, 0.6]);
      return G3_('أوجد شدة المجال الكهربائي على بعد ' + tx3_(r, 'm') + ' من شحنة نقطية ' + tx3_(q, 'C') + '. (`k = 9 × 10⁹ N·m²/C²`)', [['q', q], ['r', r], ['k', 9e9]], 'E', ['Fe', 'Vp', 'q'],
        ['`E = k·q / r²`', '`E = k·q / r`', '`E = k·q·r²`', '`E = q / (k·r²)`'], 9e9 * q / (r * r)); } },
    { b: 'ورقة عمل سؤال 6 صفحة 105: شدة المجال على بعد 0.25 m من شحنة 3 × 10⁻⁹ C', f: function () { const q = ri_(1, 9) * 1e-6, r = ri_(1, 5);
      return G3_('أوجد شدة المجال الكهربائي عند نقطة تبعد ' + tx3_(r, 'm') + ' عن شحنة نقطية مقدارها ' + tx3_(q, 'C') + '. (`k = 9 × 10⁹ N·m²/C²`)', [['q', q], ['r', r], ['k', 9e9]], 'E', ['Fe', 'q', 'Vp'],
        ['`E = k·q / r²`', '`E = k·q / r`', '`E = F·q`', '`E = k·q² / r²`'], 9e9 * q / (r * r)); } },
    { b: 'مثال 2 صفحة 95: شحنة 2 × 10⁻⁹ C تأثرت بقوة 4 × 10⁻⁶ N (المجال)', f: function () { const q = pick_([1, 2, 4, 5, 8]) * 1e-9, E = ri_(1, 20) * 250, F = E * q;
      return G3_('شحنة كهربائية ' + tx3_(q, 'C') + ' وضعت عند نقطة في مجال كهربائي فتأثرت بقوة ' + tx3_(F, 'N') + '، ما مقدار المجال الكهربائي في تلك النقطة؟', [['Fe', F], ['q', q]], 'E', ['Fe', 'q', 'Vp'],
        ['`E = F / q`', '`E = F·q`', '`E = q / F`', '`E = F / q²`'], E); } },
    { b: 'ورقة عمل سؤال 5 صفحة 105: شحنة 4 × 10⁻⁶ C تأثرت بقوة 8 × 10⁻³ N (المجال)', f: function () { const q = ri_(1, 9) * 1e-6, E = ri_(1, 20) * 500, F = E * q;
      return G3_('شحنة مقدارها ' + tx3_(q, 'C') + ' وضعت في مجال كهربائي فتأثرت بقوة ' + tx3_(F, 'N') + '، ما مقدار المجال الكهربائي؟', [['Fe', F], ['q', q]], 'E', ['Fe', 'Vp', 'q'],
        ['`E = F / q`', '`E = F·q`', '`E = q / F`', '`E = k·F / q`'], E); } },
    { b: 'مثال 1 صفحة 96: مجال منتظم 10000 N/C والمسافة بين النقطتين 0.01 m (فرق الجهد)', f: function () { const E = ri_(1, 20) * 1000, d = ri_(1, 9) / 100;
      return G3_('أوجد فرق الجهد بين نقطتين في مجال كهربائي منتظم شدته ' + tx3_(E, 'N/C') + ' والمسافة الفاصلة بينهما ' + tx3_(d, 'm') + '.', [['E', E], ['d', d]], 'V', ['E', 'Fe', 'q'],
        ['`V = E·d`', '`V = E / d`', '`V = d / E`', '`V = E·d²`'], E * d); } },
    { b: 'ورقة عمل سؤال 7 صفحة 106: مجال منتظم 1000 N/C والمسافة 0.02 m (على نمطه: المجال من فرق الجهد)', f: function () { const E = ri_(1, 30) * 500, d = pick_([0.01, 0.02, 0.04, 0.05, 0.1]), V = Math.round(E * d * 100) / 100;
      return G3_('فرق الجهد بين نقطتين في مجال كهربائي منتظم ' + tx3_(V, 'V') + ' والمسافة بينهما ' + tx3_(d, 'm') + '، أوجد شدة المجال الكهربائي.', [['V', V], ['d', d]], 'E', ['V', 'Fe', 'd'],
        ['`V = E·d` ومنه `E = V / d`', '`E = V·d`', '`E = d / V`', '`E = V / d²`'], E); } },
    { b: 'مثال 2 صفحة 96: الجهد على بعد 0.1 m من شحنة نقطية 2 × 10⁻⁶ C', f: function () { const q = ri_(1, 9) * 1e-6, r = ri_(1, 6);
      return G3_('أوجد الجهد الكهربائي على بعد ' + tx3_(r, 'm') + ' من شحنة نقطية ' + tx3_(q, 'C') + '. (`k = 9 × 10⁹ N·m²/C²`)', [['q', q], ['r', r], ['k', 9e9]], 'Vp', ['E', 'Fe', 'q'],
        ['`V = k·q / r`', '`V = k·q / r²`', '`V = k·q·r`', '`V = q / (k·r)`'], 9e9 * q / r); } },
    { b: 'ورقة عمل سؤال 8 صفحة 106: الجهد على بعد 0.2 m من شحنة نقطية 4 × 10⁻⁶ C', f: function () { const q = ri_(1, 9) * 1e-9, r = pick_([0.05, 0.1, 0.15, 0.2, 0.3]);
      return G3_('أوجد الجهد الكهربائي عند نقطة تبعد ' + tx3_(r, 'm') + ' عن شحنة نقطية ' + tx3_(q, 'C') + '. (`k = 9 × 10⁹ N·m²/C²`)', [['q', q], ['r', r], ['k', 9e9]], 'Vp', ['E', 'q', 'Fe'],
        ['`V = k·q / r`', '`V = k·q / r²`', '`V = k / (q·r)`', '`V = k·q² / r`'], 9e9 * q / r); } }
  ],
  /* السعة والمكثفات وتوصيلها والطاقة المختزنة (صفحات 97 إلى 115) */
  K: [
    { b: 'مثال 1 صفحة 98: مكثف شحنته 4.5 × 10⁻⁴ C وفرق الجهد بين لوحيه 150 V (السعة)', f: function () { const C = ri_(2, 20), V = ri_(2, 30) * 10, q = C * V;
      return G3_('أوجد السعة الكهربائية لمكثف يحمل شحنة ' + tx3_(q, 'µC') + ' وفرق الجهد بين لوحيه ' + tx3_(V, 'V') + '. (اكتب الناتج بوحدة `µF`)', [['q', q, 'µC'], ['V', V]], 'Cap', ['q', 'V', 'Ec'],
        ['`C = q / V`', '`C = q·V`', '`C = V / q`', '`C = ½·q·V`'], C, 'µF'); } },
    { b: 'مثال 2 صفحة 98: مكثف سعته 27 × 10⁻⁶ F وفرق الجهد 45 V (الشحنة)', f: function () { const p = dif3_(function () { return [ri_(2, 50), ri_(2, 24) * 5]; }), C = p[0], V = p[1];
      return G3_('مكثف سعته ' + tx3_(C, 'µF') + ' وفرق الجهد بين لوحيه ' + tx3_(V, 'V') + '، أوجد الشحنة المختزنة فيه. (اكتب الناتج بوحدة `µC`)', [['Cap', C, 'µF'], ['V', V]], 'q', ['Cap', 'V', 'Ec'],
        ['`q = C·V`', '`q = C / V`', '`q = V / C`', '`q = ½·C·V²`'], C * V, 'µC'); } },
    { b: 'مثال 3 صفحة 99: مكثف متوازي اللوحين المسافة بين لوحيه 5 × 10⁻³ m ومساحة كل لوح 2 m² (السعة)', f: function () { const A = pick_([0.5, 1, 1.5, 2, 2.5, 3, 4]), d = ri_(1, 9) * 1e-3;
      return G3_('مكثف متوازي اللوحين، المسافة بين لوحيه ' + tx3_(d, 'm') + ' ومساحة كل من لوحيه ' + tx3_(A, 'm²') + '، أوجد سعته بوحدة البيكوفاراد `pF` (`1 pF = 10⁻¹² F`). (`ε₀ = 8.85 × 10⁻¹² F/m`)', [['Ar', A], ['d', d], ['ε0', 8.85e-12]], 'Cap', ['q', 'd', 'E'],
        ['`C = ε₀·A / d`', '`C = ε₀·d / A`', '`C = A / (ε₀·d)`', '`C = ε₀·A·d`'], 8.85 * A / (d * 1000) * 1000, 'pF'); } },
    /* توصيل المكثفات على نمط اختبارات المدرب السابقة: مكثفات متماثلة على التوالي أو التوازي */
    { b: 'الاختبار الفصلي الثاني السابق سؤال 10: ثلاث مكثفات سعة كل منها 10 F وصلت على التوالي (السعة المكافئة)', f: function () { return idn3_('cs'); } },
    { b: 'على نمط الاختبار الفصلي الثاني السابق سؤال 10: مكثفات متماثلة وصلت على التوازي (السعة المكافئة)', f: function () { return idn3_('cp'); } },
    { b: 'مثال 1 صفحة 103: مكثف سعته 2 × 10⁻⁶ F وصل بفرق جهد 12 V (الطاقة المختزنة)', f: function () { const p = dif3_(function () { return [ri_(1, 50), ri_(1, 30) * 2]; }), C = p[0], V = p[1];
      return G3_('مكثف سعته ' + tx3_(C, 'µF') + ' وصل قطباه مع مصدر فرق جهد ' + tx3_(V, 'V') + '، ما الطاقة المختزنة في المكثف؟ (اكتب الناتج بوحدة `µJ`)', [['Cap', C, 'µF'], ['V', V]], 'Ec', ['q', 'Cap', 'V'],
        ['`E = ½·C·V²`', '`E = C·V²`', '`E = ½·C·V`', '`E = ½·C²·V`'], C * V * V / 2, 'µJ'); } },
    { b: 'مثال 2 صفحة 103: مكثف شحنته 2.4 C وصل بفرق جهد 200 V (الطاقة المختزنة)', f: function () { const q = pick_([0.2, 0.4, 0.5, 0.8, 1.2, 1.5, 2, 2.4, 3]), V = ri_(1, 50) * 10;
      return G3_('مكثف يحمل شحنة مقدارها ' + tx3_(q, 'C') + ' وصل قطباه مع مصدر فرق جهد ' + tx3_(V, 'V') + '، ما الطاقة المختزنة في المكثف؟', [['q', q], ['V', V]], 'Ec', ['Cap', 'q', 'V'],
        ['`E = ½·q·V`', '`E = q·V`', '`E = ½·q·V²`', '`E = q / (2·V)`'], q * V / 2); } },
    { b: 'ورقة عمل سؤال 11 صفحة 107: مكثف متوازي اللوحين d = 1 × 10⁻³ m و C = 6 × 10⁻⁶ F وشحنته 6 × 10⁻⁶ C (المجال داخله)', f: function () { const C = ri_(1, 10), V = ri_(2, 20), d = ri_(1, 5) * 1e-3;
      return G3_('مكثف متوازي اللوحين سعته ' + tx3_(C, 'µF') + ' وشحنته ' + tx3_(C * V, 'µC') + ' والمسافة بين لوحيه ' + tx3_(d, 'm') + '، أوجد شدة المجال الكهربائي بين لوحيه.', [['q', C * V, 'µC'], ['Cap', C, 'µF'], ['d', d]], 'E', ['V', 'q', 'Cap'],
        ['`V = q / C` ثم `E = V / d`', '`V = q·C` ثم `E = V / d`', '`V = q / C` ثم `E = V·d`', '`E = q / (C·d²)`'], V / d, 'V/m'); } }
  ],
  /* التيار وكثافته وسرعة الانجراف والمقاومة والقدرة وتوصيل المقاومات (صفحات 117 إلى 136) */
  C: [
    { b: 'مثال صفحة 118: شحنة 10 C تمر في سلك لمدة 60 s (التيار)', f: function () { const p = dif3_(function () { return [ri_(10, 120), ri_(2, 60)]; });
      return G3_('شحنة مقدارها ' + tx3_(p[0], 'C') + ' تمر في سلك وذلك لمدة ' + tx3_(p[1], 's') + '، أوجد شدة التيار الكهربائي.', [['q', p[0]], ['t', p[1]]], 'I', ['q', 'J', 't'],
        ['`I = q / t`', '`I = q·t`', '`I = t / q`', '`I = q / t²`'], p[0] / p[1]); } },
    { b: 'مثال 1 صفحة 119: موصل مساحة مقطعه 0.785 × 10⁻⁶ m² ويحمل تيارا 1 A (كثافة التيار)', f: function () { const I = pick_([0.5, 1, 1.5, 2, 2.5, 3]), A = pick_([1, 2, 2.5, 4, 5]) * 1e-5;
      return G3_('موصل مساحة مقطعه ' + tx3_(A, 'm²') + ' ويحمل تيارا مقداره ' + tx3_(I, 'A') + '، أوجد كثافة التيار.', [['I', I], ['Ar', A]], 'J', ['I', 'vd', 'Ar'],
        ['`J = I / A`', '`J = I·A`', '`J = A / I`', '`J = I / A²`'], I / A); } },
    { b: 'مثال 1 صفحة 120: سلك فضة مساحة مقطعه 0.785 mm² ويحمل تيارا 1 A و n = 5.8 × 10²⁸ electron/m³ (سرعة الانجراف)', f: function () { let I, A, n, v;
      do { I = ri_(2, 20); A = pick_([0.5, 0.785, 1, 2]) * 1e-6; n = pick_([5.8e28, 8.5e28]); v = I / (A * n * 1.6e-19) * 1000; } while (v < 0.1);
      return G3_('موصل مساحة مقطعه ' + tx3_(A, 'm²') + ' ويحمل تيارا ' + tx3_(I, 'A') + '، وعدد الإلكترونات الحرة لوحدة الحجم ' + tx3_(n, 'electron/m³') + '. احسب سرعة الانجراف بوحدة `mm/s` (`1 m/s = 1000 mm/s`). (`e = 1.6 × 10⁻¹⁹ C`)', [['I', I], ['Ar', A], ['n', n], ['e', 1.6e-19]], 'vd', ['J', 'I', 'n'],
        ['`J = I / A` ثم `v_d = J / (n·e)`', '`J = I / A` ثم `v_d = J·n·e`', '`v_d = I·A / (n·e)`', '`v_d = n·e / J`'], v, 'mm/s'); } },
    { b: 'مثال 1 صفحة 124: سخان فرق الجهد بين طرفيه 120 V والتيار 8 A (المقاومة)', f: function () { const R = ri_(2, 60), I = ri_(1, 15);
      return G3_('فرق الجهد بين طرفي سخان كهربائي ' + tx3_(R * I, 'V') + ' وشدة التيار المار فيه ' + tx3_(I, 'A') + '، احسب مقاومة السخان.', [['V', R * I], ['I', I]], 'R', ['I', 'V', 'P'],
        ['`V = I·R`', '`V = I / R`', '`V = R / I`', '`V = I + R`'], R); } },
    { b: 'مثال 2 صفحة 124: مقاومة 10 Ω وفرق الجهد بين طرفيها 220 V (التيار)', f: function () { const p = dif3_(function () { return [ri_(2, 50), ri_(2, 24) * 10]; });
      return G3_('أوجد شدة التيار المار في مقاومة ' + tx3_(p[0], 'Ω') + ' إذا كان فرق الجهد بين طرفيها ' + tx3_(p[1], 'V') + '.', [['R', p[0]], ['V', p[1]]], 'I', ['R', 'V', 'P'],
        ['`V = I·R`', '`V = I / R`', '`V = R / I`', '`V = I + R`'], p[1] / p[0]); } },
    { b: 'مثال 3 صفحة 124: سلك نحاس L = 1 m و A = 1.96 × 10⁻⁵ m² و ρ = 1.77 × 10⁻⁸ Ω·m (المقاومة)', f: function () { let rho, L, A, R;
      do { rho = pick_([1.59e-8, 1.77e-8, 2.82e-8, 5.6e-8]); L = ri_(1, 50) * 10; A = pick_([1, 2, 2.5, 4, 5]) * 1e-6; R = rho * L / A; } while (R < 0.1);
      return G3_('سلك طوله ' + tx3_(L, 'm') + ' ومساحة مقطعه ' + tx3_(A, 'm²') + ' والمقاومة النوعية لمادته ' + tx3_(rho, 'Ω·m') + '، أوجد مقاومته.', [['rho', rho], ['L', L], ['Ar', A]], 'R', ['rho', 'L', 'I'],
        ['`R = ρ·L / A`', '`R = ρ·A / L`', '`R = L / (ρ·A)`', '`R = ρ·L·A`'], R); } },
    { b: 'مثال 4 صفحة 124: مقاومة سلك نحاس 18 Ω عند 20 °C، ما مقاومته عند 60 °C إذا كان α = 3.9 × 10⁻³ °C⁻¹', f: function () { const R0 = ri_(5, 60), al = pick_([3.9e-3, 4e-3, 4.5e-3, 6.5e-3]), T = ri_(4, 20) * 10;
      return G3_('مقاومة سلك عند ' + tx3_(20, '°C') + ' تساوي ' + tx3_(R0, 'Ω')+ '، فما مقاومته عند ' + tx3_(T, '°C') + ' علما بأن المعامل الحراري لمادته ' + tx3_(al, '°C⁻¹') + '؟', [['R0', R0], ['alpha', al], ['T0', 20], ['T', T]], 'R', ['R0', 'alpha', 'rho'],
        ['`R = R₀·(1 + α·(T − T₀))`', '`R = R₀·α·(T − T₀)`', '`R = R₀ + α·(T − T₀)`', '`R = R₀·(1 − α·(T − T₀))`'], R0 * (1 + al * (T - 20))); } },
    { b: 'مثال 1 صفحة 125: مصباح مقاومته 20 Ω يعمل على فرق جهد 10 V (القدرة)', f: function () { const p = dif3_(function () { return [ri_(2, 50), ri_(2, 24) * 5]; });
      return G3_('مصباح كهربائي مقاومته ' + tx3_(p[0], 'Ω') + ' ويعمل على فرق جهد ' + tx3_(p[1], 'V') + '، احسب قدرته الكهربائية.', [['R', p[0]], ['V', p[1]]], 'P', ['I', 'R', 'V'],
        ['`I = V / R` ثم `P = I·V`', '`I = V·R` ثم `P = I·V`', '`P = V / R`', '`P = I·R`'], p[1] * p[1] / p[0]); } },
    { b: 'على نمط مثال 1 صفحة 125 (مصباح 20 Ω على 10 V): القدرة من التيار والمقاومة', f: function () { const p = dif3_(function () { return [pick_([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), ri_(2, 60)]; });
      return G3_('يمر تيار شدته ' + tx3_(p[0], 'A') + ' في مقاومة ' + tx3_(p[1], 'Ω') + '، احسب القدرة الكهربائية المستهلكة فيها.', [['I', p[0]], ['R', p[1]]], 'P', ['V', 'I', 'R'],
        ['`P = I²·R`', '`P = I·R`', '`P = I·R²`', '`P = R / I²`'], p[0] * p[0] * p[1]); } },
    { b: 'ورقة عمل سؤال 7 صفحة 130: مصباح قدرته 60 W يعمل على جهد 127 V (شدة التيار)', f: function () { const P = pick_([40, 60, 75, 100, 500, 1000, 1100, 1500, 2000]), V = pick_([110, 120, 127, 220, 230]);
      return G3_('جهاز قدرته ' + tx3_(P, 'W') + ' يعمل على فرق جهد ' + tx3_(V, 'V') + '، احسب شدة التيار المار فيه.', [['P', P], ['V', V]], 'I', ['R', 'P', 'V'],
        ['`P = I·V`', '`P = I / V`', '`P = V / I`', '`P = I²·V`'], P / V); } },
    /* توصيل المقاومات على نمط اختبارات المدرب السابقة: مقاومات متماثلة على التوالي أو التوازي */
    { b: 'الاختبار النهائي السابق سؤال 14: ثلاث مقاومات قيمة كل منها 10 Ω وصلت على التوالي (المقاومة المكافئة)', f: function () { return idn3_('rs'); } },
    { b: 'الاختبار النهائي السابق سؤال 40: ثلاث مقاومات قيمة كل منها 12 Ω وصلت على التوازي (المقاومة المكافئة)', f: function () { return idn3_('rp'); } }
  ]
});
function shuf_(o) { const ord = [0, 1, 2, 3]; for (let i = 3; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)), t = ord[i]; ord[i] = ord[j]; ord[j] = t; } return { o: ord.map(function (i) { return o[i]; }), c: ord.indexOf(0) }; }
function uniq4_(o) { return o.filter(function (x, i) { return o.indexOf(x) === i; }).length === 4; }
function examMake_(eid) {
  const out = [];
  EXAM_DEF[eid].items.forEach(function (it) {
    if (it.pool) {   // أسئلة نظرية مسحوبة عشوائيا من البنك دون تكرار
      const P = EXAM_POOL[it.pool].slice();
      for (let i = P.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)), t = P[i]; P[i] = P[j]; P[j] = t; }
      P.slice(0, it.n).forEach(function (x) { const y = shuf_(x[1]); out.push({ k: it.pool, q: x[0], n: 0, w: 1, o: y.o, c: y.c }); });
      return;
    }
    /* مسألة حسابية من البنك، وأرقامها تولد للمتدرب الآن فقط */
    const key = Array.isArray(it.num) ? pick_(it.num) : it.num, used = out.map(function (q) { return q.b; });
    const C = NUM_POOL[key].filter(function (x) { return used.indexOf(x.b) < 0; }), T = pick_(C.length ? C : NUM_POOL[key]); let g, n = 0;
    do { g = T.f(); n++; } while (n < 50 && !g.s.slice(0, 3).every(uniq4_));
    out.push({ k: key, b: T.b, q: g.q, n: 1, w: 2, st: g.s.slice(0, 3).map(shuf_).concat([{ v: Math.round(g.s[3].v * 1e8) / 1e8, u: g.s[3].u }]) });
  });
  return out;
}
/* جهاز واحد: يسجل جهاز المتدرب عند بداية الاختبار، ولا يقبل الحل أو الإرسال من جهاز آخر إلا إذا سمح المدرب */
function examDevOk_(row, dev) { return !row.device || String(row.device) === String(dev || ''); }
function examCode_() { return String(ri_(1000, 9999)); }
/* رمز دخول لكل شعبة من شعب الاختبارات (و'_' لمن لا شعبة له)، يولد للشعب الجديدة تلقائيا. يعيد true إذا تغير شيء */
function examCodes_(ck) { ck.codes = ck.codes || {}; let ch = false; const ids = rows_('ExamSections').map(function (x) { return String(x.id); }).concat(['_']);
  ids.forEach(function (id) { if (!ck.codes[id]) { ck.codes[id] = examCode_(); ch = true; } }); return ch; }
function examCfg_() {
  let c = {}; try { c = JSON.parse(prop_('EXAMCFG') || '{}'); } catch (e) { c = {}; }
  Object.keys(EXAM_DEF).forEach(function (k) { c[k] = c[k] || {}; if (c[k].min == null) c[k].min = EXAM_DEF[k].min; c[k].open = !!c[k].open; });
  return c;
}
function examFind_(sid, eid) { const L = rows_('Exams'); for (let i = 0; i < L.length; i++) if (String(L[i].studentId) === String(sid) && L[i].examId === eid) return L[i]; return null; }
function examLeft_(row, min) { return Math.round((new Date(row.startedAt).getTime() + min * 60000 - Date.now()) / 1000); }
/* موعد الاختبار لكل شعبة (بداية ونهاية بالتاريخ والوقت): لا يبدأ أحد قبل البداية، وينتهي وقت الجميع عند النهاية */
function examWin_(c, sid) { const w = ((c || {}).win || {})[String(sid || '') || '_']; if (!w || !w.from || !w.to) return null;
  const f = new Date(w.from).getTime(), t = new Date(w.to).getTime(); return isNaN(f) || isNaN(t) ? null : { from: f, to: t }; }
/* مدة الاختبار لكل شعبة (smin): إن لم تحدد للشعبة تؤخذ المدة العامة للاختبار */
function examMin_(c, sid) { const m = +(((c || {}).smin || {})[String(sid || '') || '_']); return m > 0 ? m : ((c || {}).min || 30); }
function examLeftW_(row, c) { let l = examLeft_(row, examMin_(c, row.sectionId)); const w = examWin_(c, row.sectionId); if (w) l = Math.min(l, Math.round((w.to - Date.now()) / 1000)); return l; }
/* من انتهى وقته ولم يسلّم: تصحح إجاباته المحفوظة تلقائيا */
function examAutoFinish_(cfg) {
  const due = function (x) { return !x.submittedAt && EXAM_DEF[x.examId] && x.paper && examLeftW_(x, cfg[x.examId]) < -120; };
  if (!rows_('Exams').some(due)) return;
  lock_(function () { rows_('Exams').forEach(function (x) { if (!due(x)) return; const pp = JSON.parse(x.paper); examGrade_(x, examClean_(JSON.parse(x.answers || '[]'), pp.length, pp)); }); });
}
function examGrade_(row, answers) {
  const paper = JSON.parse(row.paper), def = EXAM_DEF[row.examId];
  let right = 0, pts = 0; paper.forEach(function (q, i) {
    if (q.st) { const a = answers[i] || []; let ok = 0; q.st.forEach(function (st, j) { if (st.v != null ? examNum_(a[j], st.v) : a[j] === st.c) ok++; }); pts += ok * q.w / q.st.length; if (ok === q.st.length) right++; }
    else if (answers[i] === q.c) { right++; pts += q.w || def.max / paper.length; }
  });
  const score = Math.round(pts * 100) / 100;
  update_('Exams', row._row, { answers: JSON.stringify(answers), submittedAt: now_(), score: score, max: def.max, right: right });
  return { score: score, max: def.max, right: right, n: paper.length };
}
/* النتيجة يكتبها المتدرب رقما بأي صيغة: كاملة، أو مقربة أو مقطوعة لأي عدد من المنازل العشرية (8.7177، 8.718، 8.71، 8.72، 8.7)،
   أو بفرق بسيط من تقريب وسط الحل (0.01 أو 1% أيهما أكبر). الرقم الصحيح يقبل بالتقريب فقط (9 للناتج 8.72، لا 8) */
function examT2_(v) { return Math.trunc(v * 100 + (v < 0 ? -1e-6 : 1e-6)) / 100; }
function examNum_(a, v) { if (a == null || a === '' || !isFinite(+a)) return false; a = +a; if (Math.abs(a - v) <= Math.max(0.0100001, Math.abs(v) * 0.01)) return true; if (a === 0 && v !== 0) return false; for (var d = 0; d <= 6; d++) { var m = Math.pow(10, d), r = Math.round(v * m) / m, t = Math.trunc(v * m + (v < 0 ? -1e-9 : 1e-9)) / m; if ((r !== 0 && Math.abs(a - r) < 1e-9) || (d > 0 && t !== 0 && Math.abs(a - t) < 1e-9)) return true; } return false; }function examV_(v) { return v === 0 || v === 1 || v === 2 || v === 3 ? v : null; }
/* إجابة السؤال النظري رقم الخيار، وإجابة المسألة قائمة بخطواتها الأربع بالترتيب: لا تحسب خطوة بعد خطوة لم يجب عنها */
function examClean_(a, n, paper) { a = Array.isArray(a) ? a : []; const o = []; for (let i = 0; i < n; i++) { const v = a[i];
  if (paper && paper[i] && paper[i].st) { const x = Array.isArray(v) ? v : [], y = []; for (let j = 0; j < paper[i].st.length; j++) { const z = paper[i].st[j].v != null ? (isFinite(+x[j]) && String(x[j]).trim() !== '' && x[j] !== null ? +x[j] : null) : examV_(x[j]); if (z == null) break; y.push(z); } o.push(y); }
  else o.push(examV_(v)); } return o; }
/* ---------- كشف الاختبارات وشعبها (مستقل عن شعب المنصة) ----------
   متدرب مسجل في المنصة يدخل بكلمة مرور المنصة، ومتدرب من خارج المنصة يختار كلمة مرور خاصة بالاختبارات في أول دخول */
function exStudent_(id) { id = String(id).trim(); const L = rows_('ExamStudents'); for (let i = 0; i < L.length; i++) if (String(L[i].id).trim() === id) return L[i]; return null; }
function exSecName_(sid) { const s = rows_('ExamSections').filter(function (x) { return String(x.id) === String(sid); })[0]; return s ? s.name : ''; }
function exSecByName_(name, cache) { name = String(name || '').trim(); if (!name) return ''; if (cache[name]) return cache[name];
  const f = rows_('ExamSections').filter(function (x) { return String(x.name).trim() === name; })[0]; if (f) return (cache[name] = String(f.id));
  const id = 'X' + Date.now().toString(36) + Math.floor(Math.random() * 1e4); append_('ExamSections', { id: id, name: name, createdAt: now_() }); return (cache[name] = id); }
/* 3 نوفمبر: موافقات الخصوصية: أول موافقة لكل رقم تدريبي */
function privMap_() { const m = {}; rows_('Consents').forEach(function (x) { const id = String(x.studentId).trim(); if (id && !m[id] && x.time) m[id] = new Date(x.time).toISOString(); }); return m; }
function examRoster_() {
  const pm = privMap_();
  const plat = {}; rows_('Students').forEach(function (x) { plat[String(x.id).trim()] = !!x.pwHash; });
  return { ok: true, sections: rows_('ExamSections').map(function (x) { return { id: String(x.id), name: String(x.name) }; }),
    students: rows_('ExamStudents').map(function (x) { const id = String(x.id).trim(); return { id: id, name: String(x.name), sectionId: String(x.sectionId), platform: id in plat, hasPw: id in plat ? plat[id] : !!x.pwHash, work: x.work === '' || x.work == null ? null : +x.work, lastLogin: x.lastLogin ? new Date(x.lastLogin).toISOString() : '', priv: pm[id] || '' }; }) };
}
/* متدرب اختبارات أضيف لاحقا إلى المنصة: تنقل كلمة مروره من كشف الاختبارات إلى المنصة، فيدخل القسمين بنفس الرقم وكلمة المرور */
function adoptExPw_(st) {
  if (!st || st.pwHash) return;
  const ex = exStudent_(String(st.id)); if (!ex || !ex.pwHash) return;
  lock_(function () { update_('Students', st._row, { pwHash: ex.pwHash, salt: ex.salt }); });
  st.pwHash = ex.pwHash; st.salt = ex.salt;
}
function exOk_(ex) { cells_('ExamStudents', ex._row, { lastLogin: now_() }); return { ok: true, token: makeToken_('e', String(ex.id)), name: ex.name, section: exSecName_(ex.sectionId) }; }
/* متدربو المنصة يضافون تلقائيا إلى كشف الاختبارات بشعبهم (إلا من حذفه المدرب من الكشف) */
function exDeleted_() { try { return JSON.parse(prop_('EXDEL') || '[]'); } catch (e) { return []; } }
function exSetDeleted_(a) { props_().setProperty('EXDEL', JSON.stringify(a.slice(-2000))); }
function exSyncNeeded_() { const del = exDeleted_(), have = {}; rows_('ExamStudents').forEach(function (x) { have[String(x.id).trim()] = 1; });
  return rows_('Students').some(function (x) { const id = String(x.id).trim(); return id && id !== 'DEMO' && !have[id] && del.indexOf(id) < 0; }); }
function exSyncPlatform_(onlyId) {
  const del = exDeleted_(), have = {}; rows_('ExamStudents').forEach(function (x) { have[String(x.id).trim()] = 1; });
  const secs = {}; rows_('Sections').forEach(function (x) { secs[String(x.id)] = x.name; });
  const cache = {}, nw = [];
  rows_('Students').forEach(function (x) { const id = String(x.id).trim();
    if (!id || id === 'DEMO' || have[id] || del.indexOf(id) >= 0 || (onlyId && id !== onlyId)) return;
    nw.push(SHEETS.ExamStudents.map(function (c) { return ({ id: id, name: x.name, sectionId: exSecByName_(secs[String(x.sectionId)] || '', cache), createdAt: now_() })[c] || ''; })); have[id] = 1; });
  if (nw.length) { const sh = sh_('ExamStudents'); sh.getRange(sh.getLastRow() + 1, 1, nw.length, SHEETS.ExamStudents.length).setNumberFormat('@').setValues(nw); }
  return nw.length;
}
const EXAM_ACTIONS = {
  /* ===== دخول الاختبارات ===== */
  exlogin: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    if (id === EXAM_TRIAL_ID) return { ok: false, error: 'not_in_exam' };
    let ex = exStudent_(id);
    if (!ex && findStudent_(id)) { lock_(function () { exSyncPlatform_(id); }); ex = exStudent_(id); }
    if (!ex) return { ok: false, error: 'not_in_exam' };
    const st = findStudent_(id);
    if (st) adoptExPw_(st);
    if (st && !st.pwHash) return { ok: true, firstTime: true, platform: true, name: ex.name };
    if (!st && !ex.pwHash) return { ok: true, firstTime: true, name: ex.name };
    const L = lockedErr_(id); if (L) return L;
    const h = st ? st : ex;
    if (hash_(h.salt, pw) !== h.pwHash) return failPw_(id);
    passPw_(id);
    if (!strongPw_(pw, id)) return { ok: true, needChange: true, name: ex.name };
    return exOk_(ex);
  },
  exsetpw: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    if (id === EXAM_TRIAL_ID) return { ok: false, error: 'not_in_exam' };
    if (!strongPw_(pw, id)) return { ok: false, error: 'weak_password' };
    const ex = exStudent_(id); if (!ex) return { ok: false, error: 'not_in_exam' };
    if (!regOk_(id, r.code)) return { ok: false, error: 'bad_code' };
    const st = findStudent_(id), salt = Utilities.getUuid();
    if (st) { if (st.pwHash) return { ok: false, error: 'already_set' }; cells_('Students', st._row, { pwHash: hash_(salt, pw), salt: salt }); }
    else { if (ex.pwHash) return { ok: false, error: 'already_set' }; cells_('ExamStudents', ex._row, { pwHash: hash_(salt, pw), salt: salt }); }
    return exOk_(ex);
  },
  /* تغيير كلمة مرور ضعيفة عند دخول الاختبارات */
  exchpw: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || ''), nw = String(r.newpw || '');
    if (id === EXAM_TRIAL_ID) return { ok: false, error: 'not_in_exam' };
    const ex = exStudent_(id); if (!ex) return { ok: false, error: 'not_in_exam' };
    const st = findStudent_(id), h = st && st.pwHash ? st : ex; if (!h.pwHash) return { ok: false, error: 'not_found' };
    const L = lockedErr_(id); if (L) return L;
    if (hash_(h.salt, pw) !== h.pwHash) return failPw_(id);
    if (!strongPw_(nw, id)) return { ok: false, error: 'weak_password' };
    const salt = Utilities.getUuid(), v = { pwHash: hash_(salt, nw), salt: salt };
    lock_(function () { if (st) update_('Students', st._row, v); cells_('ExamStudents', ex._row, v); });
    passPw_(id); return exOk_(ex);
  },
  /* تجربة المدرب للاختبار التجريبي: يدخل باسم مستخدم وكلمة مرور لوحة المدرب (رمز المدرب) */
  texme: function (r) {
    readToken_(r.token, 't');
    return lock_(function () {
      let ex = exStudent_(EXAM_TRIAL_ID);
      if (!ex) { append_('ExamStudents', { id: EXAM_TRIAL_ID, name: 'متدرب تجريبي (المدرب)', sectionId: exSecByName_('تجريبي', {}), createdAt: now_() }); ex = exStudent_(EXAM_TRIAL_ID); }
      if (!ex) return { ok: false, error: 'not_found' };
      const o = exOk_(ex); o.id = EXAM_TRIAL_ID; return o;
    });
  },
  /* ===== المدرب: شعب الاختبارات وكشفها ===== */
  texroster: function (r) {
    readToken_(r.token, 't');
    if (r.op === 'resetpw') { const e0 = exStudent_(cleanId_(r.id)); if (!e0) return { ok: false, error: 'not_found' }; const s0 = findStudent_(e0.id);
      if (s0) cells_('Students', s0._row, { pwHash: '', salt: '' }); cells_('ExamStudents', e0._row, { pwHash: '', salt: '' }); return { ok: true }; }
    const res = lock_(function () {
      const op = r.op;
      if (op === 'secadd') { const n = String(r.name || '').trim(); if (!n) return { ok: false, error: 'name_required' }; exSecByName_(n, {}); return { ok: true }; }
      if (op === 'secren' || op === 'secdel') { const sc = rows_('ExamSections').filter(function (x) { return String(x.id) === String(r.id); })[0]; if (!sc) return { ok: false, error: 'not_found' };
        if (op === 'secren') { update_('ExamSections', sc._row, { name: String(r.name || '').trim() || sc.name }); return { ok: true }; }
        if (rows_('ExamStudents').some(function (x) { return String(x.sectionId) === String(sc.id); })) return { ok: false, error: 'section_not_empty' };
        sh_('ExamSections').deleteRow(sc._row); return { ok: true }; }
      if (op === 'import' || op === 'fromplatform') {
        let rows = r.rows || [];
        if (op === 'fromplatform') { const want = r.sectionIds || null, secs = {}; rows_('Sections').forEach(function (x) { secs[String(x.id)] = x.name; });
          rows = rows_('Students').filter(function (x) { return String(x.id) !== 'DEMO' && (!want || want.indexOf(String(x.sectionId)) >= 0); }).map(function (x) { return { id: String(x.id), name: x.name, section: secs[String(x.sectionId)] || '' }; }); }
        const cache = {}, have = {}; rows_('ExamStudents').forEach(function (x) { have[String(x.id).trim()] = x; });
        let added = 0, updated = 0; const nw = [];
        { const d = exDeleted_(), ids = rows.map(function (x) { return cleanId_(x.id); }); const d2 = d.filter(function (x) { return ids.indexOf(x) < 0; }); if (d2.length !== d.length) exSetDeleted_(d2); }
        rows.forEach(function (x) { const id = cleanId_(x.id), name = String(x.name || '').trim(); if (!id || !name) return; const sid = exSecByName_(x.section, cache);
          if (have[id]) { update_('ExamStudents', have[id]._row, { name: name, sectionId: sid || have[id].sectionId }); updated++; }
          else { nw.push(SHEETS.ExamStudents.map(function (c) { return ({ id: id, name: name, sectionId: sid, createdAt: now_() })[c] || ''; })); have[id] = { _row: -1 }; added++; } });
        if (nw.length) { const sh = sh_('ExamStudents'); sh.getRange(sh.getLastRow() + 1, 1, nw.length, SHEETS.ExamStudents.length).setNumberFormat('@').setValues(nw); }
        return { ok: true, added: added, updated: updated };
      }
      const ex = exStudent_(cleanId_(r.id)); if (!ex) return { ok: false, error: 'not_found' };
      if (op === 'work') { const v = r.value === '' || r.value == null ? '' : Math.max(0, Math.min(20, +r.value)); if (v !== '' && !isFinite(v)) return { ok: false, error: 'bad_value' }; update_('ExamStudents', ex._row, { work: v }); return { ok: true }; }
      if (op === 'move') { update_('ExamStudents', ex._row, { sectionId: String(r.sectionId || '') }); return { ok: true }; }
      if (op === 'resetpw') { const st = findStudent_(ex.id); if (st) update_('Students', st._row, { pwHash: '', salt: '' }); update_('ExamStudents', ex._row, { pwHash: '', salt: '' }); return { ok: true }; }
      if (op === 'delete') { sh_('ExamStudents').deleteRow(ex._row); if (findStudent_(ex.id)) { const d = exDeleted_(); if (d.indexOf(String(ex.id).trim()) < 0) d.push(String(ex.id).trim()); exSetDeleted_(d); } return { ok: true }; }
      return { ok: false, error: 'bad_op' };
    });
    if (!res.ok) return res;
    return examRoster_();
  },
  exams: function (r) {
    const id = readToken_(r.token, 'e'), cfg = examCfg_();
    const mine = rows_('Exams').filter(function (x) { return String(x.studentId) === String(id); }), me = exStudent_(id);
    const list = Object.keys(EXAM_DEF).map(function (k) {
      const d = EXAM_DEF[k], row = mine.filter(function (x) { return x.examId === k; })[0], o = { id: k, t: d.t, max: d.max, min: examMin_(cfg[k], me ? me.sectionId : ''), cover: d.cover, n: examCount_(d), open: cfg[k].open && examReady_(d) };
      if (row && row.submittedAt) o.status = 'done';
      else if (row) { o.status = 'started'; o.left = examLeftW_(row, cfg[k]); }
      const w = examWin_(cfg[k], me ? me.sectionId : ''); if (w) { o.from = new Date(w.from).toISOString(); o.to = new Date(w.to).toISOString(); if (!row) o.phase = Date.now() < w.from ? 'before' : Date.now() > w.to ? 'after' : 'now'; }
      else o.status = 'none';
      return o;
    }).filter(function (o) { return o.open || o.status === 'done'; });
    return { ok: true, list: list };
  },
  examstart: function (r) {
    const id = readToken_(r.token, 'e'), eid = String(r.id || ''), d = EXAM_DEF[eid], cfg = examCfg_();
    if (!d) return { ok: false, error: 'bad_exam' };
    return lock_(function () {
      const st = exStudent_(id); if (!st) return { ok: false, error: 'auth' };
      let row = examFind_(id, eid);
      if (row && row.submittedAt) return { ok: true, status: 'done' };
      if (!row) {
        if (!cfg[eid].open || !examReady_(d)) return { ok: false, error: 'exam_closed' };
        const w = examWin_(cfg[eid], st.sectionId);
        if (w && Date.now() < w.from) return { ok: false, error: 'not_yet', from: new Date(w.from).toISOString() };
        if (w && Date.now() > w.to) return { ok: false, error: 'exam_ended' };
        /* بداية الاختبار برمز الدخول فقط، والعودة بعد انقطاع لا تحتاج الرمز */
        const want = (cfg[eid].codes || {})[String(st.sectionId || '') || '_'];
        if (want && String(r.code || '').replace(/[^0-9٠-٩]/g, '').replace(/[٠-٩]/g, function (x) { return '٠١٢٣٤٥٦٧٨٩'.indexOf(x); }) !== String(want)) return { ok: false, error: 'bad_code' };
        append_('Exams', { time: now_(), studentId: id, sectionId: st.sectionId, examId: eid, startedAt: now_(), paper: JSON.stringify(examMake_(eid)), answers: '[]', device: String(r.dev || '').slice(0, 60) });
        row = examFind_(id, eid);
      }
      if (!examDevOk_(row, r.dev)) return { ok: false, error: 'other_device' };
      if (!row.device && r.dev) update_('Exams', row._row, { device: String(r.dev).slice(0, 60) });
      const left = examLeftW_(row, cfg[eid]), paper = JSON.parse(row.paper);
      if (left <= -60) { examGrade_(row, examClean_(JSON.parse(row.answers || '[]'), paper.length, paper)); return { ok: true, status: 'done' }; }
      return { ok: true, status: 'started', t: d.t, max: d.max, left: Math.max(0, left), answers: examClean_(JSON.parse(row.answers || '[]'), paper.length, paper),
        qs: paper.map(function (q) { return q.st ? { q: q.q, n: 1, w: q.w, st: q.st.map(function (x) { return x.v != null ? { u: x.u } : x.o; }) } : { q: q.q, o: q.o, n: 0, w: q.w }; }) };
    });
  },
  examsave: function (r) {
    const id = readToken_(r.token, 'e'), eid = String(r.id || ''), cfg = examCfg_();
    /* الحفظ التلقائي لا ينتظر الطابور: يكتب خانة إجابات المتدرب فقط، ولا يكتب إذا لم تتغير */
    const row = examFind_(id, eid); if (!row || row.submittedAt) return { ok: false, error: 'not_started' };
    if (!examDevOk_(row, r.dev)) return { ok: false, error: 'other_device' };
    if (examLeftW_(row, cfg[eid]) < -60) return { ok: false, error: 'time_up' };
    const pp = JSON.parse(row.paper), js = JSON.stringify(examClean_(r.answers, pp.length, pp));
    if (js === String(row.answers || '')) return { ok: true };
    const sh = sh_('Exams'), C = SHEETS.Exams, chk = sh.getRange(row._row, 1, 1, C.length).getValues()[0];
    if (String(chk[C.indexOf('studentId')]).trim() !== String(id).trim() || chk[C.indexOf('examId')] !== eid || chk[C.indexOf('submittedAt')]) return { ok: false, error: 'not_started' };
    sh.getRange(row._row, C.indexOf('answers') + 1).setValue(js);
    return { ok: true };
  },
  examsubmit: function (r) {
    const id = readToken_(r.token, 'e'), eid = String(r.id || ''), cfg = examCfg_();
    return lock_(function () {
      const row = examFind_(id, eid); if (!row) return { ok: false, error: 'not_started' };
      if (row.submittedAt) return { ok: true };
      if (!examDevOk_(row, r.dev)) return { ok: false, error: 'other_device' };
      const pp = JSON.parse(row.paper), n = pp.length, late = examLeftW_(row, cfg[eid]) < -90;
      const g = examGrade_(row, late ? examClean_(JSON.parse(row.answers || '[]'), n, pp) : examClean_(r.answers, n, pp));
      return { ok: true };
    });
  },
  /* ===== المدرب ===== */
  texams: function (r) {
    readToken_(r.token, 't');
    if (exSyncNeeded_()) lock_(function () { exSyncPlatform_(); });
    if (r.op === 'set') {
      const c = examCfg_(), k = String(r.id || ''); if (!EXAM_DEF[k]) return { ok: false, error: 'bad_exam' };
      if (r.open != null) { if (r.open && !examReady_(EXAM_DEF[k])) return { ok: false, error: 'exam_empty' }; c[k].open = !!r.open; if (r.open) { if (EXAM_DEF[k].trial) lock_(function () { if (!exStudent_(EXAM_TRIAL_ID)) append_('ExamStudents', { id: EXAM_TRIAL_ID, name: 'متدرب تجريبي (المدرب)', sectionId: exSecByName_('تجريبي', {}), createdAt: now_() }); }); examCodes_(c[k]); } }
      /* رمز دخول جديد من 4 أرقام يعلنه المدرب للمتدربين قبل بداية الاختبار */
      if (r.newcode) { examCodes_(c[k]); if (r.sectionId) c[k].codes[String(r.sectionId)] = examCode_(); else Object.keys(c[k].codes).forEach(function (x) { c[k].codes[x] = examCode_(); }); }
      if (r.win) { const sid = String(r.win.sectionId || '_'); c[k].win = c[k].win || {};
        if (r.win.from && r.win.to) { const f = new Date(r.win.from).getTime(), t = new Date(r.win.to).getTime(); if (isNaN(f) || isNaN(t) || t <= f) return { ok: false, error: 'bad_window' }; c[k].win[sid] = { from: new Date(f).toISOString(), to: new Date(t).toISOString() }; }
        else delete c[k].win[sid]; }
      if (r.min != null) c[k].min = Math.max(5, Math.min(180, Math.round(+r.min) || EXAM_DEF[k].min));
      /* مدة شعبة واحدة: smin رقم = مدة خاصة بها، وفارغ = ترجع للمدة العامة. لا تؤثر على الشعب الأخرى */
      if (r.smin !== undefined && r.sectionId != null) { const sid = String(r.sectionId || '_'); c[k].smin = c[k].smin || {};
        if (r.smin === '' || r.smin === null) delete c[k].smin[sid]; else c[k].smin[sid] = Math.max(5, Math.min(180, Math.round(+r.smin) || c[k].min)); }
      props_().setProperty('EXAMCFG', JSON.stringify(c));
    }
    if (r.op === 'freedev') {
      const res = lock_(function () { const row = examFind_(String(r.studentId || ''), String(r.id || '')); if (!row) return false; update_('Exams', row._row, { device: '' }); return true; });
      if (!res) return { ok: false, error: 'not_found' };
    }
    if (r.op === 'reset') {
      /* تجربة المدرب: تحذف محاولته إن وجدت فيدخل بنموذج جديد */
      const trial = String(r.studentId || '') === EXAM_TRIAL_ID;
      const res = lock_(function () { const row = examFind_(String(r.studentId || ''), String(r.id || '')); if (row) sh_('Exams').deleteRow(row._row);
        return !!row || trial; });
      if (!res) return { ok: false, error: 'not_found' };
    }
    const cfg = examCfg_();
    examAutoFinish_(cfg);
    if (Object.keys(cfg).some(function (k) { return cfg[k].open && examCodes_(cfg[k]); })) props_().setProperty('EXAMCFG', JSON.stringify(cfg));
    const rows = rows_('Exams').map(function (x) {
      return { dev: !!x.device && !x.submittedAt, studentId: String(x.studentId), sectionId: String(x.sectionId), examId: x.examId, startedAt: x.startedAt ? new Date(x.startedAt).toISOString() : '', submittedAt: x.submittedAt ? new Date(x.submittedAt).toISOString() : '', score: x.score === '' ? null : +x.score, max: +x.max || EXAM_DEF[x.examId] && EXAM_DEF[x.examId].max, right: x.right === '' ? null : +x.right };
    });
    const exams = Object.keys(EXAM_DEF).map(function (k) { const d = EXAM_DEF[k]; return { id: k, t: d.t, max: d.max, cover: d.cover, n: examCount_(d), ready: examReady_(d), soon: !!d.soon, trial: !!d.trial, open: cfg[k].open, min: cfg[k].min, smin: cfg[k].smin || {}, win: cfg[k].win || {}, codes: cfg[k].open ? (cfg[k].codes || {}) : {} }; });
    const ro = examRoster_();
    return { ok: true, exams: exams, rows: rows, sections: ro.sections, students: ro.students };
  },
  /* أوراق المتدربين للمدرب: ورقة كل متدرب كما ولدت له لحظة البدء، مع إجاباته (للاطلاع فقط، دون قفل) */
  tpapers: function (r) {
    readToken_(r.token, 't');
    const eid = String(r.id || ''); if (!EXAM_DEF[eid]) return { ok: false, error: 'bad_exam' };
    const one = r.studentId ? String(r.studentId).trim() : '';
    const rows = rows_('Exams').filter(function (x) { return x.examId === eid && (!one || String(x.studentId).trim() === one); }).map(function (x) {
      let p = [], a = []; try { p = JSON.parse(x.paper || '[]'); } catch (e) {} try { a = JSON.parse(x.answers || '[]'); } catch (e) {}
      return { studentId: String(x.studentId).trim(), sectionId: String(x.sectionId), startedAt: x.startedAt ? new Date(x.startedAt).toISOString() : '', submittedAt: x.submittedAt ? new Date(x.submittedAt).toISOString() : '', score: x.score === '' ? null : +x.score, max: +x.max || EXAM_DEF[eid].max, paper: p, answers: a };
    });
    return { ok: true, id: eid, t: EXAM_DEF[eid].t, max: EXAM_DEF[eid].max, rows: rows };
  },
  /* بنك الأسئلة للاطلاع فقط: الأسئلة النظرية كما هي، ومثال مولد الآن من كل نموذج مسألة حسابية */
  tbank: function (r) {
    readToken_(r.token, 't');
    const L = { Q: 'الكميات الفيزيائية والوحدات والتحويل', U: 'التحويل بين الوحدات', V: 'الكميات القياسية والمتجهة', R: 'محصلة متجهين', P: 'الضرب القياسي والاتجاهي', M: 'الحركة: المسافة والإزاحة والسرعة والتسارع', N: 'القوة وقوانين نيوتن والوزن', F: 'الاحتكاك', W: 'الشغل والطاقة', H: 'الحرارة', E: 'الكهرباء الساكنة', K: 'السعة الكهربائية والمكثفات', C: 'التيار الكهربائي والمقاومة' };
    const uses = { q: {}, n: {} };
    Object.keys(EXAM_DEF).forEach(function (k) { const d = EXAM_DEF[k], t = d.t + (d.soon ? ' (مؤجل)' : '');
      d.items.forEach(function (it) { const m = it.pool ? uses.q : uses.n; [].concat(it.pool || it.num).forEach(function (p) { m[p] = m[p] || []; if (m[p].indexOf(t) < 0) m[p].push(t); }); }); });
    const theory = Object.keys(EXAM_POOL).map(function (k) { return { k: k, t: L[k] || k, uses: uses.q[k] || [], qs: EXAM_POOL[k].map(function (x) { return { q: x[0], c: x[1][0], o: x[1].slice(1) }; }) }; });
    const num = Object.keys(NUM_POOL).map(function (k) { return { k: k, t: L[k] || k, uses: uses.n[k] || [], items: NUM_POOL[k].map(function (T) { let g = null; try { g = T.f(); } catch (e) { }
      return g ? { b: T.b, q: g.q, st: g.s.slice(0, 3).map(function (a) { return a[0]; }), v: Math.round(g.s[3].v * 1e4) / 1e4, u: g.s[3].u } : { b: T.b, err: true }; }) }; });
    return { ok: true, theory: theory, num: num };
  }
};
Object.keys(EXAM_ACTIONS).forEach(function (k) { ACTIONS[k] = EXAM_ACTIONS[k]; });

function recordLogin_(st, device) {
  const t = now_();
  update_('Students', st._row, { lastLogin: t, firstLogin: st.firstLogin || t, loginCount: (+st.loginCount || 0) + 1, lastSeen: t });
  append_('Logins', { time: t, studentId: st.id, sectionId: st.sectionId, device: String(device || '').slice(0, 80) });
  return { ok: true, token: makeToken_('s', String(st.id)), name: st.name, section: sectionName_(st.sectionId) };
}

/** شغّل هذه الدالة مرة واحدة من المحرر عند تفعيل نظام الأمان الجديد:
 *  تحذف كلمات مرور المدرب والمتدربين جميعا (المنصة والاختبارات والحساب التجريبي)، وتخرج كل من كان داخلا،
 *  وتكتب في «سجل التنفيذ» رمز إعداد حساب المدرب (8 أرقام، يعمل 48 ساعة، مرة واحدة). */
function resetAllPasswords() {
  lock_(function () {
    ['Students', 'ExamStudents'].forEach(function (k) {
      const sh = sh_(k), head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0], n = sh.getLastRow() - 1;
      ['pwHash', 'salt'].forEach(function (c) { const j = head.indexOf(c); if (j >= 0 && n > 0) sh.getRange(2, j + 1, n, 1).clearContent(); });
    });
  });
  ['TPW', 'TSALT', 'TUSER', 'REGCODES'].forEach(function (k) { props_().deleteProperty(k); });
  props_().setProperty('SECRET', Utilities.getUuid() + Utilities.getUuid());
  const code = String(10000000 + Math.floor(Math.random() * 90000000));
  props_().setProperty('TSETUP', JSON.stringify({ code: code, until: Date.now() + 48 * 3600000 }));
  let sent = ''; try { sent = mailOwner_('رمز إعداد حساب المدرب', code, 'تم حذف كل كلمات المرور. افتح لوحة المدرب، واكتب هذا الرمز، ثم اختر اسم مستخدم جديدا وكلمة مرور قوية. يعمل 48 ساعة، مرة واحدة:'); } catch (e) {}
  Logger.log('تم حذف كل كلمات المرور. ' + (sent ? 'أرسل رمز إعداد حساب المدرب إلى إيميلك ' + sent + '. ' : '') + 'الرمز (يعمل 48 ساعة، مرة واحدة): ' + code);
}
/** إذا انتهت مدة رمز إعداد المدرب قبل استخدامه: شغّل هذه الدالة لرمز جديد (لا تحذف شيئا) */
function newTeacherSetupCode() {
  if (prop_('TPW')) { Logger.log('حساب المدرب موجود، لا يلزم رمز إعداد.'); return; }
  const code = String(10000000 + Math.floor(Math.random() * 90000000));
  props_().setProperty('TSETUP', JSON.stringify({ code: code, until: Date.now() + 48 * 3600000 }));
  try { mailOwner_('رمز إعداد حساب المدرب', code, 'رمز إعداد حساب المدرب، يعمل 48 ساعة، مرة واحدة:'); } catch (e) {}
  Logger.log('رمز إعداد حساب المدرب (يعمل 48 ساعة، مرة واحدة، وأرسل إلى إيميلك): ' + code);
}
/** شغّل هذه الدالة مرة واحدة من المحرر لمنح الصلاحيات وإنشاء جدول البيانات */
function wkw_() {
  let w = [1, 2, 1, 0]; try { w = JSON.parse(prop_('WKW') || '[1,2,1,0]'); } catch (e) {}
  if (!Array.isArray(w)) w = [1, 2, 1, 0];
  while (w.length < 4) w.push(0);
  return w;
}

function setup() {
  const ss = ss_();
  DriveApp.getRootFolder(); // صلاحية حفظ ملفات الصوت في Google Drive
  Logger.log('تم إنشاء جدول البيانات: ' + ss.getUrl());
}
/* المدرب 2 نوفمبر: «نسيت كلمة المرور؟» — يغيرها المتدرب برقمه التدريبي ورمز تسجيل شعبته */
(function () {
  if (typeof ACTIONS === 'undefined' || ACTIONS.forgotpw) return;
  ACTIONS.forgotpw = function (r) {
    const id = cleanId_(r && r.id), pw = String((r && r.pw) || '');
    if (!strongPw_(pw, id)) return { ok: false, error: 'weak_password' };
    if (!id || id === 'DEMO' || !regOk_(id, r.code)) return { ok: false, error: 'bad_code' };
    return lock_(function () {
      const st = findStudent_(id);
      if (!st) return { ok: false, error: 'not_found' };
      const salt = Utilities.getUuid();
      update_('Students', st._row, { pwHash: hash_(salt, pw), salt: salt });
      st.pwHash = 'x';
      return recordLogin_(st, r.device);
    });
  };
})();

/* المدرب 2 نوفمبر: «نسيت كلمة المرور؟» في دخول الاختبارات */
(function () {
  if (typeof ACTIONS === 'undefined' || ACTIONS.exforgotpw) return;
  ACTIONS.exforgotpw = function (r) {
    const id = cleanId_(r && r.id), pw = String((r && r.pw) || '');
    if (!id || id === EXAM_TRIAL_ID) return { ok: false, error: 'not_in_exam' };
    if (!strongPw_(pw, id)) return { ok: false, error: 'weak_password' };
    const ex = exStudent_(id); if (!ex) return { ok: false, error: 'not_in_exam' };
    if (!regOk_(id, r.code)) return { ok: false, error: 'bad_code' };
    const st = findStudent_(id), salt = Utilities.getUuid();
    if (st) cells_('Students', st._row, { pwHash: hash_(salt, pw), salt: salt });
    else cells_('ExamStudents', ex._row, { pwHash: hash_(salt, pw), salt: salt });
    return exOk_(ex);
  };
})();
