/**
 * منصة فيزياء ١٠١ — خادم البيانات (Google Apps Script)
 * يحفظ: الشعب، المتدربين، الدخول، أوقات الاستخدام، نتائج الاختبارات والتمارين.
 * البيانات تُحفظ في جدول Google Sheets داخل حساب المدرب فقط.
 * لا تعدّل هذا الملف؛ انسخه كاملًا كما هو.
 */
const VERSION = 2;
const TOKEN_DAYS = 30;

function doGet() {
  return out_({ ok: true, app: 'physics101', version: VERSION, teacherReady: !!prop_('TPW'), teacherUser: !!prop_('TUSER'), ai: !!prop_('AIKEY'), tts: !!prop_('TTSKEY') });
}

function doPost(e) {
  let req = {};
  try { req = JSON.parse(e.postData.contents || '{}'); } catch (err) { return out_({ ok: false, error: 'bad_json' }); }
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
  l.waitLock(20000);
  try { return fn(); } finally { l.releaseLock(); }
}

/* ---------------- الجدول ---------------- */
const SHEETS = {
  Sections: ['id', 'name', 'createdAt'],
  Students: ['id', 'name', 'sectionId', 'pwHash', 'salt', 'createdAt', 'firstLogin', 'lastLogin', 'loginCount', 'totalSec', 'lastSeen'],
  Logins: ['time', 'studentId', 'sectionId', 'device'],
  Results: ['time', 'studentId', 'sectionId', 'kind', 'lessonKey', 'lessonTitle', 'score', 'max', 'percent', 'detail'],
  Questions: ['time', 'studentId', 'sectionId', 'lessonKey', 'lessonTitle', 'question', 'answer', 'model']
};
const AI_MODELS = [
  { id: 'openai/gpt-oss-120b', extra: { reasoning_effort: 'low', include_reasoning: false } },
  { id: 'qwen/qwen3.8-27b', extra: { reasoning_effort: 'none', reasoning_format: 'hidden' } },
  { id: 'openai/gpt-oss-20b', extra: { reasoning_effort: 'low', include_reasoning: false } }
];
const AI_LIMIT = 15;      // أسئلة لكل متدرب كل ٦ ساعات
const AR_NAMES = { Sections: 'الشعب', Students: 'المتدربون', Logins: 'سجل الدخول', Results: 'النتائج', Questions: 'أسئلة المساعد' };
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
function sh_(k) {
  const ss = ss_();
  let sh = ss.getSheetByName(AR_NAMES[k]);
  if (!sh) {
    sh = ss.insertSheet(AR_NAMES[k]);
    sh.getRange(1, 1, 1, SHEETS[k].length).setValues([SHEETS[k]]).setFontWeight('bold');
    sh.setFrozenRows(1); sh.setRightToLeft(true);
  }
  return sh;
}
function rows_(k) {
  const sh = sh_(k), n = sh.getLastRow();
  if (n < 2) return [];
  const cols = SHEETS[k], vals = sh.getRange(2, 1, n - 1, cols.length).getValues();
  return vals.map(function (r, i) { const o = { _row: i + 2 }; cols.forEach(function (c, j) { o[c] = r[j]; }); return o; });
}
function append_(k, obj) { sh_(k).appendRow(SHEETS[k].map(function (c) { return obj[c] === undefined ? '' : obj[c]; })); }
function update_(k, row, obj) {
  const sh = sh_(k), cols = SHEETS[k];
  const cur = sh.getRange(row, 1, 1, cols.length).getValues()[0];
  cols.forEach(function (c, j) { if (obj[c] !== undefined) cur[j] = obj[c]; });
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
const TTS_VOICES = { 'ar-SA-HamedNeural': 'm', 'ar-SA-ZariyahNeural': 'f', 'ar-AE-HamdanNeural': 'm', 'ar-AE-FatimaNeural': 'f' };
const TTS_EN = { m: 'en-US-GuyNeural', f: 'en-US-JennyNeural' };
const TTS_MONTH_CAP = 480000;   // أقل من الحد المجاني الشهري (٥٠٠ ألف حرف)
const TTS_USER_HOUR = 80;       // مقاطع جديدة لكل مستخدم في الساعة
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

const ACTIONS = {
  /* ===== المتدرب ===== */
  login: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'not_found' };
    if (!st.pwHash) return { ok: true, firstTime: true, name: st.name };
    if (hash_(st.salt, pw) !== st.pwHash) return { ok: false, error: 'wrong_password' };
    return lock_(function () { return recordLogin_(st, r.device); });
  },
  setpw: function (r) {
    const id = cleanId_(r.id), pw = String(r.pw || '');
    if (pw.length < 4) return { ok: false, error: 'short_password' };
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
  me: function (r) {
    const id = readToken_(r.token, 's');
    const st = findStudent_(id);
    if (!st) return { ok: false, error: 'auth' };
    const best = {}, done = [];
    rows_('Results').forEach(function (x) {
      if (String(x.studentId) !== String(id)) return;
      if (x.kind === 'done') { done.push(x.lessonKey); return; }
      const k = x.kind + ':' + x.lessonKey;
      if (best[k] == null || +x.percent > best[k]) best[k] = +x.percent;
    });
    return { ok: true, name: st.name, section: sectionName_(st.sectionId), best: best, done: done };
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

  /* ===== المدرب ===== */
  tsetup: function (r) {
    const pw = String(r.pw || ''), user = String(r.user || '').trim().toLowerCase();
    if (user.length < 3) return { ok: false, error: 'short_user' };
    if (/^demo$/.test(user) || /^\d+$/.test(user)) return { ok: false, error: 'bad_user' };
    if (pw.length < 6) return { ok: false, error: 'short_password' };
    return lock_(function () {
      if (prop_('TPW')) return { ok: false, error: 'already_set' };
      const salt = Utilities.getUuid();
      props_().setProperties({ TPW: hash_(salt, pw), TSALT: salt, TUSER: user });
      ss_();
      return { ok: true, token: makeToken_('t', 'teacher') };
    });
  },
  tlogin: function (r) {
    if (!prop_('TPW')) return { ok: false, error: 'not_setup' };
    const user = String(r.user || '').trim().toLowerCase();
    if (prop_('TUSER') && user !== prop_('TUSER')) return { ok: false, error: 'wrong_user' };
    if (hash_(prop_('TSALT'), String(r.pw || '')) !== prop_('TPW')) return { ok: false, error: 'wrong_password' };
    return { ok: true, token: makeToken_('t', 'teacher') };
  },
  tpw: function (r) {
    readToken_(r.token, 't');
    if (r.user != null && String(r.user).trim()) {
      const u = String(r.user).trim().toLowerCase();
      if (u.length < 3 || u === 'demo' || /^\d+$/.test(u)) return { ok: false, error: 'bad_user' };
      props_().setProperty('TUSER', u);
      if (!r.pw) return { ok: true };
    }
    const pw = String(r.pw || '');
    if (pw.length < 6) return { ok: false, error: 'short_password' };
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
        if (pw.length < 4) return { ok: false, error: 'short_password' };
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
      if (!inSec(x) || x.kind === 'done') return;
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

  /* ===== المساعد الذكي ===== */
  ask: function (r) {
    let who = '', sec = '';
    try { who = readToken_(r.token, 's'); } catch (e) { readToken_(r.token, 't'); who = 'TEACHER'; }
    const key = prop_('AIKEY');
    if (!key) return { ok: false, error: 'ai_off' };
    if (who !== 'TEACHER') {
      const st = findStudent_(who); if (!st) return { ok: false, error: 'auth' }; sec = st.sectionId;
      const c = CacheService.getScriptCache(), ck = 'ask_' + who, n = +(c.get(ck) || 0);
      if (n >= AI_LIMIT) return { ok: false, error: 'limit' };
      c.put(ck, String(n + 1), 21600);
    }
    const q = String(r.q || '').trim().slice(0, 1500);
    if (!q) return { ok: false, error: 'empty' };
    const ctx = String(r.context || '').slice(0, 4000);
    const sys = 'أنت مساعد تعليمي لمقرر «فيزياء ١٠١» لمتدربي الدبلوم في المؤسسة العامة للتدريب التقني والمهني. ' +
      'المتدرب يدرس الآن درس «' + String(r.lessonTitle || '').slice(0, 120) + '».\n' +
      'قواعد إلزامية:\n- أجب بالعربية الفصحى المبسطة وبإيجاز ووضوح، بمستوى طالب دبلوم.\n' +
      '- اكتب كل معادلة أو رمز بين علامتي ` مثل `F = m·a` باستخدام رموز يونيكود (· × ÷ ² ³ √ θ Δ μ → ≈). لا تستخدم LaTeX إطلاقًا ولا جداول.\n' +
      '- في حل المسائل اتبع دائمًا هذه الخطوات بعناوين واضحة: ### المعطيات، ### المطلوب، ### القانون، ### التعويض، ### الناتج (مع الوحدة).\n' +
      '- حوّل الوحدات إلى النظام الدولي قبل التعويض.\n- إذا كان السؤال خارج الفيزياء فاعتذر بلطف وأعد المتدرب إلى الدرس.\n' +
      '- لا تحل الاختبارات نيابة عن المتدرب إن طلب إجابة سؤال اختيار مباشرة؛ اشرح الفكرة ودعه يختار.\n\nملخص الدرس للاستناد إليه:\n' + ctx;
    const msgs = [{ role: 'system', content: sys }];
    (Array.isArray(r.history) ? r.history.slice(-6) : []).forEach(function (m) {
      if (m && (m.role === 'user' || m.role === 'assistant')) msgs.push({ role: m.role, content: String(m.content || '').slice(0, 2000) });
    });
    msgs.push({ role: 'user', content: q });
    let answer = '', used = '', lastErr = '';
    for (let i = 0; i < AI_MODELS.length && !answer; i++) {
      const m = AI_MODELS[i];
      for (let withExtra = 1; withExtra >= 0 && !answer; withExtra--) {
        const body = { model: m.id, messages: msgs, temperature: 0.3, max_completion_tokens: 1200 };
        if (withExtra) Object.keys(m.extra).forEach(function (k) { body[k] = m.extra[k]; });
        const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'post', contentType: 'application/json', muteHttpExceptions: true,
          headers: { Authorization: 'Bearer ' + key }, payload: JSON.stringify(body)
        });
        const code = res.getResponseCode();
        if (code === 200) {
          try { answer = String(JSON.parse(res.getContentText()).choices[0].message.content || '').replace(/<think>[\s\S]*?<\/think>/g, '').trim(); used = m.id; } catch (e) { lastErr = 'parse'; }
        } else {
          lastErr = 'http_' + code;
          if (code === 401) return { ok: false, error: 'ai_key' };
          if (code !== 400) break;
        }
      }
    }
    if (!answer) return { ok: false, error: lastErr.indexOf('429') >= 0 ? 'ai_busy' : 'ai_error', detail: lastErr };
    try { lock_(function () { append_('Questions', { time: now_(), studentId: who, sectionId: sec, lessonKey: String(r.lessonKey || '').slice(0, 10), lessonTitle: String(r.lessonTitle || '').slice(0, 120), question: q.slice(0, 1000), answer: answer.slice(0, 3000), model: used }); }); } catch (e) {}
    return { ok: true, answer: answer };
  },
  tkey: function (r) {
    readToken_(r.token, 't');
    const k = String(r.key || '').trim();
    if (!k) { props_().deleteProperty('AIKEY'); return { ok: true, ai: false }; }
    if (!/^gsk_[A-Za-z0-9]{20,}$/.test(k)) return { ok: false, error: 'bad_key' };
    const res = UrlFetchApp.fetch('https://api.groq.com/openai/v1/models', { headers: { Authorization: 'Bearer ' + k }, muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return { ok: false, error: 'ai_key' };
    props_().setProperty('AIKEY', k);
    return { ok: true, ai: true };
  },
  tts: function (r) {
    let who = '';
    try { who = readToken_(r.token, 's'); } catch (e) { readToken_(r.token, 't'); who = 'TEACHER'; }
    const key = prop_('TTSKEY'), region = prop_('TTSREGION') || 'uaenorth';
    if (!key) return { ok: false, error: 'tts_off' };
    const voice = TTS_VOICES[r.voice] ? String(r.voice) : 'ar-SA-HamedNeural';
    const rate = Math.max(-30, Math.min(30, Math.round(+r.rate || 0)));
    const segs = [], src = Array.isArray(r.segs) ? r.segs.slice(0, 40) : [];
    let chars = 0;
    src.forEach(function (x) {
      if (!x) return;
      const t = String(x.t || '').replace(/\s+/g, ' ').trim().slice(0, 1800);
      if (!t || chars + t.length > 2000) return;
      chars += t.length; segs.push({ l: x.l === 'en' ? 'en' : 'ar', t: t });
    });
    if (!segs.length) return { ok: false, error: 'empty' };
    const sig = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, voice + '|' + rate + '|' + JSON.stringify(segs), Utilities.Charset.UTF_8)
      .map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
    const name = 'a_' + sig + '.mp3';
    const folder = ttsFolder_();
    const it = folder.getFilesByName(name);
    if (it.hasNext()) return { ok: true, audio: Utilities.base64Encode(it.next().getBlob().getBytes()), cached: true };
    const c = CacheService.getScriptCache(), ck = 'tts_' + who, n = +(c.get(ck) || 0);
    if (who !== 'TEACHER' && n >= TTS_USER_HOUR) return { ok: false, error: 'tts_limit' };
    if (ttsMonth_().used + chars > TTS_MONTH_CAP) return { ok: false, error: 'tts_quota' };
    const en = TTS_EN[TTS_VOICES[voice]], pr = (rate >= 0 ? '+' : '') + rate + '%';
    const ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ar-SA">' + segs.map(function (x) {
      return '<voice name="' + (x.l === 'en' ? en : voice) + '"><prosody rate="' + pr + '">' + xml_(x.t) + '</prosody></voice>';
    }).join('') + '</speak>';
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
  tquestions: function (r) {
    readToken_(r.token, 't');
    const sid = r.sectionId ? String(r.sectionId) : '';
    const list = rows_('Questions').filter(function (x) { return !sid || String(x.sectionId) === sid; }).slice(-300).reverse().map(function (x) {
      return { time: new Date(x.time).toISOString(), studentId: String(x.studentId), lessonKey: x.lessonKey, lessonTitle: x.lessonTitle, question: x.question, answer: x.answer };
    });
    return { ok: true, questions: list, ai: !!prop_('AIKEY') };
  },

  tdata: function (r) {
    readToken_(r.token, 't');
    const sections = rows_('Sections').map(function (s) { return { id: String(s.id), name: s.name }; });
    const stats = {};
    rows_('Results').forEach(function (x) {
      const id = String(x.studentId);
      const s = stats[id] || (stats[id] = { quiz: {}, prob: {}, done: {}, attempts: 0 });
      if (x.kind === 'done') { s.done[x.lessonKey] = 1; return; }
      s.attempts++;
      const bucket = x.kind === 'quiz' ? s.quiz : s.prob;
      if (bucket[x.lessonKey] == null || +x.percent > bucket[x.lessonKey]) bucket[x.lessonKey] = +x.percent;
    });
    const students = rows_('Students').map(function (st) {
      const s = stats[String(st.id)] || { quiz: {}, prob: {}, done: {}, attempts: 0 };
      return {
        id: String(st.id), name: st.name, sectionId: String(st.sectionId), hasPw: !!st.pwHash,
        firstLogin: st.firstLogin ? new Date(st.firstLogin).toISOString() : '',
        lastLogin: st.lastLogin ? new Date(st.lastLogin).toISOString() : '',
        lastSeen: st.lastSeen ? new Date(st.lastSeen).toISOString() : '',
        loginCount: +st.loginCount || 0, totalSec: +st.totalSec || 0,
        quiz: s.quiz, prob: s.prob, done: Object.keys(s.done), attempts: s.attempts
      };
    });
    return { ok: true, sections: sections, students: students, sheetUrl: ss_().getUrl(), ai: !!prop_('AIKEY') };
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
    const list = rows_('Results').filter(function (x) { return x.kind !== 'done' && (!sid || String(x.sectionId) === sid); }).map(function (x) {
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
      if (r.op === 'resetpw') { update_('Students', st._row, { pwHash: '', salt: '' }); return { ok: true }; }
      if (r.op === 'delete') { sh_('Students').deleteRow(st._row); return { ok: true }; }
      return { ok: false, error: 'bad_op' };
    });
  }
};

function recordLogin_(st, device) {
  const t = now_();
  update_('Students', st._row, { lastLogin: t, firstLogin: st.firstLogin || t, loginCount: (+st.loginCount || 0) + 1, lastSeen: t });
  append_('Logins', { time: t, studentId: st.id, sectionId: st.sectionId, device: String(device || '').slice(0, 80) });
  return { ok: true, token: makeToken_('s', String(st.id)), name: st.name, section: sectionName_(st.sectionId) };
}

/** شغّل هذه الدالة مرة واحدة من المحرر لمنح الصلاحيات وإنشاء جدول البيانات */
function setup() {
  const ss = ss_();
  DriveApp.getRootFolder(); // صلاحية حفظ ملفات الصوت في Google Drive
  Logger.log('تم إنشاء جدول البيانات: ' + ss.getUrl());
}
