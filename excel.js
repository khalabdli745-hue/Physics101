/* قارئ وكاتب Excel مبسّط (xlsx و csv) بدون مكتبات خارجية — للوحة المدرب */
(function(){
  const enc=new TextEncoder(),dec=new TextDecoder('utf-8');
  /* ---------- CRC32 + ZIP (تخزين بدون ضغط) ---------- */
  const CRC=(()=>{const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t})();
  const crc32=b=>{let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CRC[(c^b[i])&255]^(c>>>8);return(c^0xFFFFFFFF)>>>0};
  function zip(files){
    const parts=[],central=[];let off=0;
    const u16=v=>[v&255,(v>>8)&255],u32=v=>[v&255,(v>>8)&255,(v>>16)&255,(v>>>24)&255];
    files.forEach(([name,str])=>{const nb=enc.encode(name),db=enc.encode(str),c=crc32(db);
      const lh=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(c),...u32(db.length),...u32(db.length),...u16(nb.length),...u16(0)]);
      parts.push(lh,nb,db);
      central.push(new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(c),...u32(db.length),...u32(db.length),...u16(nb.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off)]),nb);
      off+=lh.length+nb.length+db.length});
    const cs=central.reduce((a,b)=>a+b.length,0);
    const end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(cs),...u32(off),...u16(0)]);
    return new Blob([...parts,...central,end],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  }
  const x=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,'');
  const col=i=>{let s='';i++;while(i){const m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
  function sheetXml(rows,widths){
    const cols=widths?'<cols>'+widths.map((w,i)=>`<col min="${i+1}" max="${i+1}" width="${w}" customWidth="1"/>`).join('')+'</cols>':'';
    const body=rows.map((r,ri)=>`<row r="${ri+1}">`+r.map((v,ci)=>{const ref=col(ci)+(ri+1),st=ri===0?' s="1"':'';
      if(v===null||v===undefined||v==='')return '';
      if(typeof v==='number'&&isFinite(v))return `<c r="${ref}"${st}><v>${v}</v></c>`;
      return `<c r="${ref}" t="inlineStr"${st}><is><t xml:space="preserve">${x(v)}</t></is></c>`}).join('')+'</row>').join('');
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView rightToLeft="1" workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>${cols}<sheetData>${body}</sheetData></worksheet>`;
  }
  function write(sheets,filename){
    const n=sheets.length,files=[];
    files.push(['[Content_Types].xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((_,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join('')}</Types>`]);
    files.push(['_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>']);
    files.push(['xl/workbook.xml',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${sheets.map((s,i)=>`<sheet name="${x(String(s[0]).replace(/[\\\/?*\[\]:]/g,' ').slice(0,31))}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join('')}</sheets></workbook>`]);
    files.push(['xl/_rels/workbook.xml.rels',`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((_,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join('')}<Relationship Id="rId${n+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`]);
    files.push(['xl/styles.xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="2"><font><sz val="11"/><name val="Arial"/></font><font><b/><sz val="11"/><name val="Arial"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFE0F2EF"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="2"><xf/><xf fontId="1" fillId="2" applyFont="1" applyFill="1"/></cellXfs></styleSheet>']);
    sheets.forEach((s,i)=>files.push([`xl/worksheets/sheet${i+1}.xml`,sheetXml(s[1],s[2])]));
    const blob=zip(files);
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
  }
  /* ---------- القراءة ---------- */
  async function inflate(data){
    if(typeof DecompressionStream==='undefined')throw new Error('no_inflate');
    const s=new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(s).arrayBuffer());
  }
  async function unzip(buf){
    const b=new Uint8Array(buf),v=new DataView(buf);let e=-1;
    for(let i=b.length-22;i>=Math.max(0,b.length-66000);i--)if(v.getUint32(i,true)===0x06054b50){e=i;break}
    if(e<0)throw new Error('not_zip');
    const cnt=v.getUint16(e+10,true);let p=v.getUint32(e+16,true);const out={};
    for(let k=0;k<cnt;k++){
      const method=v.getUint16(p+10,true),csize=v.getUint32(p+20,true),nlen=v.getUint16(p+28,true),xlen=v.getUint16(p+30,true),clen=v.getUint16(p+32,true),loff=v.getUint32(p+42,true);
      const name=dec.decode(b.subarray(p+46,p+46+nlen));
      out[name]={method,csize,loff};p+=46+nlen+xlen+clen}
    return async name=>{const f=out[name];if(!f)return null;const ln=v.getUint16(f.loff+26,true),lx=v.getUint16(f.loff+28,true);
      const data=b.subarray(f.loff+30+ln+lx,f.loff+30+ln+lx+f.csize);return dec.decode(f.method===8?await inflate(data):data)};
  }
  const xmlDoc=s=>new DOMParser().parseFromString(s,'application/xml');
  const byTag=(n,t)=>[...n.getElementsByTagNameNS('*',t)];
  const colIdx=ref=>{const m=/^[A-Z]+/.exec(ref||'');if(!m)return -1;let n=0;for(const ch of m[0])n=n*26+(ch.charCodeAt(0)-64);return n-1};
  async function readXlsx(buf){
    const get=await unzip(buf);
    const wb=xmlDoc(await get('xl/workbook.xml'));const first=byTag(wb,'sheet')[0];
    const rid=first&&(first.getAttribute('r:id')||first.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id'));
    let target='worksheets/sheet1.xml';
    const rels=await get('xl/_rels/workbook.xml.rels');
    if(rels&&rid){const r=byTag(xmlDoc(rels),'Relationship').find(r=>r.getAttribute('Id')===rid);if(r)target=r.getAttribute('Target')}
    target=target.replace(/^\/?xl\//,'').replace(/^\//,'');
    const ss=[];const sst=await get('xl/sharedStrings.xml');
    if(sst)byTag(xmlDoc(sst),'si').forEach(si=>ss.push(byTag(si,'t').map(t=>t.textContent).join('')));
    const sh=xmlDoc(await get('xl/'+target));const rows=[];
    byTag(sh,'row').forEach(r=>{const ri=(+r.getAttribute('r')||rows.length+1)-1;const row=rows[ri]=rows[ri]||[];let ci=0;
      byTag(r,'c').forEach(c=>{const idx=colIdx(c.getAttribute('r'));if(idx>=0)ci=idx;const t=c.getAttribute('t');const vEl=byTag(c,'v')[0];let val='';
        if(t==='s')val=ss[+(vEl&&vEl.textContent)]||'';else if(t==='inlineStr')val=byTag(c,'t').map(x=>x.textContent).join('');else val=vEl?vEl.textContent:'';
        if(t!=='s'&&t!=='inlineStr'&&t!=='str'&&/^-?\d+(\.\d+)?(E[+-]?\d+)?$/i.test(val)){const n=+val;if(Number.isInteger(n)&&Math.abs(n)<1e15)val=String(n)}
        row[ci]=val;ci++})});
    return [...rows].map(r=>r||[]);
  }
  function readCsv(text){
    text=text.replace(/^﻿/,'');const first=text.split(/\r?\n/)[0]||'';const d=(first.match(/;/g)||[]).length>(first.match(/,/g)||[]).length?';':(first.includes('\t')?'\t':',');
    const rows=[];let row=[],cur='',q=false;
    for(let i=0;i<text.length;i++){const ch=text[i];
      if(q){if(ch==='"'){if(text[i+1]==='"'){cur+='"';i++}else q=false}else cur+=ch}
      else if(ch==='"')q=true;else if(ch===d){row.push(cur);cur=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cur);rows.push(row);row=[];cur=''}else cur+=ch}
    if(cur||row.length){row.push(cur);rows.push(row)}
    return rows;
  }
  async function read(file){
    const name=(file.name||'').toLowerCase();const buf=await file.arrayBuffer();
    const head=new Uint8Array(buf.slice(0,4));
    if(head[0]===0x50&&head[1]===0x4B)return readXlsx(buf);
    if(head[0]===0xD0&&head[1]===0xCF)throw new Error('old_xls');
    let txt=new TextDecoder('utf-8').decode(buf);if(txt.includes('�'))txt=new TextDecoder('windows-1256').decode(buf);
    return readCsv(txt);
  }
  window.EXCEL={write,read};
})();
