"""Screenshot harness for the usage guide: local site + mocked Apps Script API."""
import json, time
from playwright.sync_api import sync_playwright

BASE = 'http://localhost:8765/'
API = 'https://mock.p101.test/api'
STUDENT = {'id': '442100123', 'name': 'خالد الحربي', 'token': 'tok-s', 'section': '42603'}
DEMO = {'id': 'demo', 'name': 'الحساب التجريبي', 'token': 'tok-d', 'demo': 1}

def mock_reply(o, state):
    a = o.get('a')
    if a == 'me':
        return {'ok': True, 'done': state.get('done', []), 'best': state.get('best', {}), 'wkw': state.get('wkw', [0, 0, 0, 0]),
                'name': state.get('name', STUDENT['name'])}
    if a in ('hb', 'result', 'rate', 'survey', 'examsave'):
        return {'ok': True}
    if a == 'durget':
        return {'ok': True, 'map': {}}
    if a == 'exams':
        return {'ok': True, 'exams': state.get('exams', [])}
    if a == 'ask':
        if o.get('mode') == 'hint':
            lv = int(o.get('level') or 1)
            H = {1: 'راجع وحدة الشحنة؛ القيم في السؤال بالميكروكولوم.',
                 2: 'حول كل شحنة إلى الكولوم بضربها في 10⁻⁶، ثم اختر القيم كما في السؤال.',
                 3: 'لأن الشحنات معطاة بالميكروكولوم، فتحول إلى الكولوم قبل التعويض.'}
            return {'ok': True, 'answer': state.get('hint%d' % lv, H.get(lv, H[1]))}
        r = {'ok': True, 'answer': state.get('answer', 'القوة تتناسب طرديا مع حاصل ضرب الشحنتين.\nوتتناسب عكسيا مع مربع المسافة بينهما.\nفإذا قربنا الشحنتين زادت القوة.')}
        if o.get('mode') == 'board':
            st = state.setdefault('_free', [0])
            if not o.get('preset'): st[0] += 1
            r.update(left=max(0, 2 - st[0]), limit=2)
        return r
    if a in ('tts', 'gtts'):
        return {'ok': False, 'error': 'tts_off'}
    if a == 'login':
        return state.get('login', {'ok': False, 'error': 'pw'})
    return {'ok': True}

def open_ctx(p, w=390, h=844, dsf=900/390, local=None, state=None, dark=False, mobile=None, touch=None):
    b = p.chromium.launch()
    c = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dsf,
                      color_scheme='dark' if dark else 'light', is_mobile=(w < 600) if mobile is None else mobile, has_touch=(w < 600) if touch is None else touch)
    st = state or {}
    def handle(route):
        try:
            o = json.loads(route.request.post_data or '{}')
        except Exception:
            o = {}
        route.fulfill(status=200, content_type='application/json',
                      headers={'Access-Control-Allow-Origin': '*'}, body=json.dumps(mock_reply(o, st)))
    c.route(API + '*', handle)
    import os, mimetypes, urllib.parse
    ROOT = os.environ.get('SITE_ROOT', '/home/claude/ghrepo')
    def local_file(r):
        u = urllib.parse.urlparse(r.request.url); path = urllib.parse.unquote(u.path.lstrip('/')) or 'index.html'
        f = os.path.join(ROOT, path)
        if os.path.isfile(f):
            r.fulfill(status=200, path=f, content_type=(mimetypes.guess_type(f)[0] or 'application/octet-stream'))
        else:
            r.fulfill(status=404, body='not found')
    def router(r):
        url = r.request.url
        if url.startswith(API): return r.fallback()
        if url.startswith('http://localhost:8792/'): return local_file(r)
        if url.startswith(('http://localhost', 'data:')): return r.continue_()
        return r.abort()
    c.route('**/*', router)
    if local:
        js = ''.join('localStorage.setItem(%s,%s);' % (json.dumps(k), json.dumps(v if isinstance(v, str) else json.dumps(v))) for k, v in local.items())
        js = js.replace('"__DAY__"', 'new Date().toDateString()+"|"+%s' % json.dumps(STUDENT['id']))
        c.add_init_script('try{if(!sessionStorage.getItem("__init")){%s sessionStorage.setItem("__init","1")}}catch(e){}' % js)
    c.add_init_script("try{localStorage.setItem('p101-privok','1')}catch(e){}")
    c.add_init_script("document.addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='.ttsWarn,.ttsTip{display:none!important}';document.head.appendChild(s)})")
    return b, c

def student_local(extra=None, demo=False):
    a = DEMO if demo else STUDENT
    d = {'p101-auth': a, 'p101-welc|' + a['id']: '1', 'p101-pendday': '__DAY__',
         'p101-inst-once': '1', 'p101-lastv|' + a['id']: str(int(time.time() * 1000))}
    if extra: d.update(extra)
    return d
