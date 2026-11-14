import { makeExampleBoard, exampleImage } from './example.mjs';
import { pointInImage, studentJoinURL } from './core.mjs';
import { createJoinQR } from './join-qr.mjs';
const $=id=>document.getElementById(id);
const exampleMode=new URLSearchParams(location.search).get('example')==='1';
const example=exampleMode?makeExampleBoard():null;
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const kindClass=kind=>String(kind).toLowerCase();
const storage={get(key,fallback){try{return JSON.parse(localStorage.getItem((exampleMode?'example-':'')+key))??fallback}catch{return fallback}},set(key,value){try{localStorage.setItem((exampleMode?'example-':'')+key,JSON.stringify(value));return true}catch{notice('This browser cannot save your board key or draft. Keep the teacher link before leaving.',true);return false}}};
let presetImage=null;
let room='',teacherKey='',board=null,point=null,selected=null,pendingId=null,pollTimer=null,polling=false,noticeTimer=null,projection=false,lastRender='',leaving=false;
let authorKey=storage.get('painting-notes-author-key','');
if(!authorKey){authorKey=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');storage.set('painting-notes-author-key',authorKey)}
$('author').value=storage.get('painting-notes-name','');
function notice(message,error=false){$('status').textContent=message;$('status').classList.toggle('error',error);clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>{$('status').textContent=''},error?12000:5000)}
async function api(action,data={},method='POST'){
  if(example)return example.request(action,data);
  const url=new URL('/api/painting-notes',location.origin);
  const headers={'x-board-key':teacherKey,'x-author-key':authorKey};
  const options={method,headers,signal:AbortSignal.timeout(16000)};
  if(method==='GET'){url.searchParams.set('action',action);url.searchParams.set('room',room);for(const[k,v]of Object.entries(data))url.searchParams.set(k,String(v))}
  else{headers['Content-Type']='application/json';options.body=JSON.stringify({action,code:room,...data})}
  const response=await fetch(url,options);
  let result;try{result=await response.json()}catch{throw Error('The board could not connect. Please try again.')}
  if(!response.ok)throw Error(result.error||'The board could not save that change.');
  return result;
}
function draftKey(){return 'painting-notes-draft-'+room}
function persistDraft(){if(!room)return;storage.set(draftKey(),{text:$('note-text').value,kind:new FormData($('note-form')).get('kind'),point,pendingId});storage.set('painting-notes-name',$('author').value)}
function updateDraft(){const text=$('note-text').value;$('count').textContent=`${text.length}/500`;$('position-status').textContent=point?'Detail selected.':'Select a detail in the painting.';$('draft-pin').hidden=!point;if(point){$('draft-pin').style.setProperty('--x',point.x);$('draft-pin').style.setProperty('--y',point.y)}$('send-note').disabled=!!board?.paused;}
function setPoint(value){point=value;pendingId=null;persistDraft();updateDraft();if(innerWidth<800)$('note-form').scrollIntoView({behavior:'smooth',block:'start'});$('note-text').focus({preventScroll:true})}
function visibleNotes(){return (board?.notes||[]).filter(()=>!board.hidden).filter(n=>!projection||!n.hidden)}
function noteHTML(note,index){const kind=kindClass(note.kind);return `<article class="note ${kind} ${note.hidden?'hidden-note':''} ${selected===note.id?'selected':''}" id="note-${escape(note.id)}"><div class="note-top"><button class="note-title" data-select="${escape(note.id)}">${note.number||index+1} · ${escape(note.kind)}</button>${note.hidden?'<span>Hidden</span>':''}</div><p>${escape(note.text)}</p><span class="note-author">${escape(note.author)}</span>${board.teacher?`<div class="note-actions"><button data-select="${escape(note.id)}">Discuss</button><button data-moderate="${escape(note.id)}">${note.hidden?'Show note':'Hide note'}</button></div>`:''}</article>`}
function render(){
  $('projector-join').hidden=!projection||exampleMode;
  if(!exampleMode&&$('join-qr').dataset.room!==room){const qr=createJoinQR(room);$('join-qr').innerHTML=qr.svg;$('join-qr').dataset.room=room;$('join-qr').dataset.joinUrl=qr.url;$('qr-room-code').textContent=room.slice(0,5)+' '+room.slice(5);}
  $('board-title').textContent=board.title;$('painting').alt=board.title;$('code-display').textContent=room.slice(0,5)+' '+room.slice(5);
  $('teacher-tools').hidden=!board.teacher;$('pause').textContent=board.paused?'Resume notes':'Pause notes';$('hide-all').textContent=board.hidden?'Show on screens':'Hide on screens';$('pause-banner').hidden=!board.paused;$('hidden-banner').hidden=!board.hidden;
  $('instruction').textContent=projection?'Read the notes together.':'Tap a detail in the painting to add a note.';
  const all=visibleNotes();const filter=$('note-filter').value;
  const filtered=all.filter(n=>filter==='all'||n.kind===filter);
  $('note-count').textContent=String(all.length);
  const signature=JSON.stringify([all,filter,selected,projection,board.teacher]);
  if(signature!==lastRender){
    lastRender=signature;
    $('notes').innerHTML=filtered.map(n=>noteHTML(n,(board.notes||[]).findIndex(x=>x.id===n.id))).join('')||`<p class="empty">${board.hidden?'Notes are hidden for now.':filter!=='all'?'There are no notes of this type yet.':'The first note starts the conversation. Tap a detail and add yours.'}</p>`;
    $('pins').innerHTML=filtered.filter(n=>!n.hidden).map(n=>`<button class="pin ${kindClass(n.kind)} ${selected===n.id?'selected':''}" data-select="${escape(n.id)}" style="--x:${n.x};--y:${n.y}" aria-label="Note ${n.number||(board.notes||[]).findIndex(x=>x.id===n.id)+1}, ${escape(n.author)}: ${escape(n.text.slice(0,80))}">${n.number||(board.notes||[]).findIndex(x=>x.id===n.id)+1}</button>`).join('');
  }
  const focused=all.find(n=>n.id===selected&&!n.hidden);
  $('focus-note').hidden=!focused;
  if(focused){$('focus-note').className='focus-note '+kindClass(focused.kind);$('focus-note').innerHTML=`<strong>${escape(focused.kind)} · ${escape(focused.author)}</strong><p>${escape(focused.text)}</p><button id="close-focus">Close note</button>`}
  updateDraft();
}
function schedule(){clearTimeout(pollTimer);if(exampleMode)return;if(room&&!leaving)pollTimer=setTimeout(refresh,document.hidden?15000:projection?2000:4000)}
async function refresh(force=false){
  if(polling||!room)return;polling=true;
  try{const next=await api('read',force?{}:{version:board?.version||0},'GET');if(!next.unchanged){if(!board||next.focus!==board.focus)selected=next.focus;board=next;render()}$('connection').textContent=exampleMode?'Example · changes stay in this tab':'Connected · live notes';$('connection').classList.remove('offline')}
  catch(error){$('connection').textContent='Reconnecting · draft kept';$('connection').classList.add('offline');if(force)throw error}
  finally{polling=false;schedule()}
}
async function openBoard(code,key=''){
  const previous={room,teacherKey};room=code;teacherKey=key;board=null;selected=null;lastRender='';leaving=false;
  try{
    await refresh(true);$('welcome').hidden=true;$('board-view').hidden=false;$('leave').hidden=false;
    $('painting').src=exampleMode?exampleImage:`/api/painting-notes?action=image&room=${encodeURIComponent(room)}`;
    const draft=storage.get(draftKey(),{});$('note-text').value=draft.text||'';point=draft.point||null;pendingId=draft.pendingId||null;
    for(const input of document.querySelectorAll('input[name=kind]'))input.checked=input.value===(draft.kind||'Observation');
    history.replaceState(null,'',exampleMode?'/apps/painting-notes/?example=1':`/apps/painting-notes/?room=${room}`);
    if(board.teacher&&!exampleMode){const saved=storage.get('painting-notes-teachers',{});saved[room]={key:teacherKey,title:board.title};storage.set('painting-notes-teachers',saved)}
    render();
  }catch(error){room=previous.room;teacherKey=previous.teacherKey;clearTimeout(pollTimer);throw error}
}
async function busy(button,work){const original=button.textContent;button.disabled=true;button.textContent='Please wait…';try{await work()}catch(error){notice(error.message||'Please try again.',true)}finally{if(button.textContent==='Please wait…')button.textContent=original;button.disabled=false;if(board)updateDraft()}}
$('join-form').addEventListener('submit',event=>{event.preventDefault();const code=$('room-code').value.toUpperCase().replace(/[^A-Z2-9]/g,'');const saved=storage.get('painting-notes-teachers',{});busy(event.submitter,()=>openBoard(code,saved[code]?.key||''))});
$('image-file').addEventListener('change',()=>{const file=$('image-file').files[0];if(file){presetImage=null;$('image-file').required=true;if($('upload-preview').src.startsWith('blob:'))URL.revokeObjectURL($('upload-preview').src);$('upload-preview').src=URL.createObjectURL(file);$('upload-preview').hidden=false}});
$('use-milkmaid').addEventListener('click',event=>busy(event.currentTarget,async()=>{const response=await fetch('/apps/painting-notes/art/vermeer-the-milkmaid.jpg');if(!response.ok)throw Error('The Milkmaid image could not load. Please try again.');presetImage=new File([await response.blob()],'vermeer-the-milkmaid.jpg',{type:'image/jpeg'});$('image-file').value='';$('image-file').required=false;$('title').value='Johannes Vermeer, The Milkmaid';if($('upload-preview').src.startsWith('blob:'))URL.revokeObjectURL($('upload-preview').src);$('upload-preview').src=URL.createObjectURL(presetImage);$('upload-preview').hidden=false;notice('The Milkmaid is selected. Choose Create board when you are ready.')}));
async function compress(file){if(!file||!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Choose a JPG, PNG or WebP image.');if(file.size>35000000)throw Error('Choose an image smaller than 35 MB.');const bitmap=await createImageBitmap(file);let scale=Math.min(1,2000/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();let image=canvas.toDataURL('image/jpeg',.86);if(image.length>1400000)image=canvas.toDataURL('image/jpeg',.63);if(image.length>1500000)throw Error('This image is too detailed to upload. Try a smaller copy.');return image}
$('create-form').addEventListener('submit',event=>{event.preventDefault();busy(event.submitter,async()=>{const image=await compress($('image-file').files[0]||presetImage);teacherKey=crypto.randomUUID().replaceAll('-','')+crypto.randomUUID().replaceAll('-','');const result=await api('create',{title:$('title').value,image});const key=teacherKey;const saved=storage.get('painting-notes-teachers',{});saved[result.code]={key,title:$('title').value};storage.set('painting-notes-teachers',saved);await openBoard(result.code,key);notice('Board ready. Copy the student link to invite the class.')})});
$('painting').addEventListener('click',event=>{if(!projection)setPoint(pointInImage(event.clientX,event.clientY,$('painting').getBoundingClientRect()))});
$('painting').addEventListener('keydown',event=>{if(!projection&&(event.key==='Enter'||event.key===' ')){event.preventDefault();setPoint({x:.5,y:.5})}});
$('general-note').addEventListener('click',()=>setPoint({x:.5,y:.5}));
$('note-form').addEventListener('input',()=>{pendingId=null;persistDraft();updateDraft()});
$('note-form').addEventListener('submit',event=>{event.preventDefault();if(!point){notice('Tap a detail in the painting first.',true);$('painting').focus();return}busy(event.submitter,async()=>{pendingId ||= crypto.randomUUID().replaceAll('-','');persistDraft();const note={id:pendingId,text:$('note-text').value,author:$('author').value,kind:new FormData($('note-form')).get('kind'),...point};await api('note',{note});$('note-text').value='';point=null;pendingId=null;persistDraft();updateDraft();await refresh(true);notice('Your note is on the board.')})});
$('painting').addEventListener('error',()=>{$('image-error').hidden=false});$('painting').addEventListener('load',()=>{$('image-error').hidden=true});$('reload-image').addEventListener('click',()=>{$('painting').src=exampleMode?exampleImage:`/api/painting-notes?action=image&room=${room}&retry=${Date.now()}`});
async function copy(value,message){try{await navigator.clipboard.writeText(value);notice(message)}catch{window.prompt('Copy this link:',value)}}
$('share').addEventListener('click',()=>copy(studentJoinURL(room),'Student link copied.'));
$('private-link').addEventListener('click',()=>copy(`${studentJoinURL(room)}#teacher=${teacherKey}`,'Private teacher link copied. Keep this link for yourself.'));
$('pause').addEventListener('click',event=>busy(event.currentTarget,async()=>{await api('settings',{paused:!board.paused});await refresh(true)}));
$('hide-all').addEventListener('click',event=>busy(event.currentTarget,async()=>{await api('settings',{hidden:!board.hidden});await refresh(true)}));
function setProjection(value){projection=value;document.body.classList.toggle('projection',value);$('exit-project').hidden=!value;if(value)$('note-filter').value='all';render();schedule()}
$('project').addEventListener('click',async()=>{setProjection(true);try{await document.documentElement.requestFullscreen()}catch{}});
$('exit-project').addEventListener('click',()=>{setProjection(false);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{})});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&projection)setProjection(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&projection)setProjection(false)});
document.addEventListener('click',async event=>{const target=event.target.closest('[data-select],[data-moderate],#close-focus');if(!target)return;if(target.id==='close-focus'){selected=null;render();if(board.teacher)try{await api('focus',{id:null});await refresh(true)}catch(error){notice(error.message,true)}return}if(target.dataset.moderate){await busy(target,async()=>{const note=board.notes.find(n=>n.id===target.dataset.moderate);await api('moderate',{id:note.id,hidden:!note.hidden});await refresh(true)});return}selected=target.dataset.select;render();if(board.teacher){try{await api('focus',{id:selected});await refresh(true)}catch(error){notice(error.message,true)}}else document.getElementById('note-'+selected)?.scrollIntoView({behavior:'smooth',block:'nearest'})});
$('note-filter').addEventListener('change',render);
$('save').addEventListener('click',()=>$('export-dialog').showModal());
function download(filename,data,type){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000)}
async function savedData(){const response=await fetch(exampleMode?exampleImage:`/api/painting-notes?action=image&room=${room}`);if(!response.ok)throw Error('The image could not be saved. Try again.');const blob=await response.blob();const image=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob)});return {title:board.title,code:room,savedAt:new Date().toISOString(),image,notes:board.notes.map(({mine,...note})=>note)}}
$('export-json').addEventListener('click',event=>busy(event.currentTarget,async()=>{download(`painting-notes-${room}.json`,JSON.stringify(await savedData(),null,2),'application/json');notice('Data backup downloaded.')}));
$('export-html').addEventListener('click',event=>busy(event.currentTarget,async()=>{const data=await savedData();const pins=data.notes.filter(n=>!n.hidden).map(n=>`<span class="pin" style="left:${n.x*100}%;top:${n.y*100}%">${n.number||data.notes.indexOf(n)+1}</span>`).join('');const notes=data.notes.map((n,i)=>`<article><strong>${n.number||i+1}. ${escape(n.kind)} · ${escape(n.author)}${n.hidden?' (hidden during class)':''}</strong><p>${escape(n.text)}</p></article>`).join('');download(`painting-notes-${room}.html`,`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(data.title)} · Painting Notes</title><style>body{font:18px/1.5 system-ui,sans-serif;max-width:1100px;margin:auto;padding:32px;background:#f9f7f2;color:#211d16}h1{line-height:1.2}.image{position:relative;line-height:0;display:inline-block;max-width:100%}img{display:block;max-width:100%;height:auto}.pin{position:absolute;transform:translate(-50%,-50%);background:#f6df91;color:#211d16;border:2px solid #211d16;border-radius:50%;width:28px;height:28px;line-height:28px;text-align:center;font-size:15px;font-weight:bold}.notes{columns:2;column-gap:24px;margin-top:32px}article{break-inside:avoid;background:#f6df91;padding:20px;margin:0 0 20px}p{white-space:pre-wrap;overflow-wrap:anywhere}@media(max-width:600px){.notes{columns:1}body{padding:20px}}@media print{article{print-color-adjust:exact}}</style><h1>${escape(data.title)}</h1><p>Class board · ${escape(data.savedAt.slice(0,10))}</p><div class="image"><img alt="${escape(data.title)}" src="${data.image}">${pins}</div><div class="notes">${notes}</div></html>`,'text/html');notice('Offline board downloaded.')}));
$('print').addEventListener('click',()=>{$('export-dialog').close();window.print()});
$('delete-board').addEventListener('click',event=>busy(event.currentTarget,async()=>{const confirm=window.prompt(`This permanently deletes the painting and every note from shared storage. Save a copy first. Type ${room} to delete.`);if(confirm!==room)return;await api('delete',{confirm});const saved=storage.get('painting-notes-teachers',{});delete saved[room];storage.set('painting-notes-teachers',saved);location.href='/apps/painting-notes/'}));
$('leave').addEventListener('click',()=>{persistDraft();leaving=true;clearTimeout(pollTimer);location.href='/apps/painting-notes/'});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&room)refresh()});
window.addEventListener('online',()=>{if(room)refresh()});
const recent=storage.get('painting-notes-teachers',{});if(Object.keys(recent).length){$('recent').hidden=false;for(const[code,item]of Object.entries(recent).reverse().slice(0,12)){const button=document.createElement('button');button.textContent=item.title||code;button.addEventListener('click',()=>busy(button,()=>openBoard(code,item.key)));$('recent-list').append(button)}}
const params=new URL(location.href).searchParams;const initial=(params.get('room')||'').toUpperCase().replace(/[^A-Z2-9]/g,'');const fragment=new URLSearchParams(location.hash.slice(1));const initialKey=fragment.get('teacher')||recent[initial]?.key||'';
if(exampleMode){
  $('example-banner').hidden=false;
  $('author').value='You (example)';
  for(const id of ['share','private-link','delete-board'])$(id).hidden=true;
  document.querySelector('.room').hidden=true;
  openBoard('EXAMPLE234').catch(error=>notice(error.message,true));
}else if(initial){$('room-code').value=initial;history.replaceState(null,'',`/apps/painting-notes/?room=${initial}`);openBoard(initial,initialKey).catch(error=>notice(error.message,true))}
