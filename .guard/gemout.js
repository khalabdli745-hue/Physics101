// gemout: يمرر كل جمل الصوت (gqall.json) وأمثلة voicegold على GEMPREP من نسخة محددة، ويكتب الناتج JSON
// الاستعمال: node gemout.js <جذر النسخة> <ملف الجمل> <ملف الناتج>
const fs = require('fs');
const [root, sentFile, outFile] = process.argv.slice(2);
const w = { localStorage: { getItem: () => null, setItem: () => {} }, addEventListener: () => {}, location: { search: '' },
  document: { addEventListener: () => {}, querySelector: () => null } };
let P = null;
try {
  const fn = new Function('window', 'document', 'localStorage', 'navigator', 'setTimeout', 'setInterval', 'fetch',
    fs.readFileSync(root + '/gemrep.js', 'utf8'));
  fn(w, w.document, w.localStorage, { userAgent: '' }, () => {}, () => {}, () => Promise.reject());
  P = w.GEMPREP;
} catch (e) { }
const S = JSON.parse(fs.readFileSync(sentFile, 'utf8'));
const out = {};
for (const t of S) { try { out[t] = P ? P(t) : '__NO_GEMPREP__'; } catch (e) { out[t] = '__ERR__ ' + String(e).slice(0, 80); } }
fs.writeFileSync(outFile, JSON.stringify({ ok: !!P, out }));
console.log((P ? 'ok ' : 'NO GEMPREP ') + Object.keys(out).length);
