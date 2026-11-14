/* ==== v41clan ==== */

/* ===== CLANES v41 (parte 1): escudo, [TAG], lema, país, entrada, rangos, solicitudes, chat ===== */
const G41={sh:{clasico:'M10 8 H90 V50 C90 80 70 98 50 106 C30 98 10 80 10 50 Z',punta:'M50 4 L92 22 V56 C92 82 72 98 50 108 C28 98 8 82 8 56 V22 Z',redondo:'M50 8 A46 46 0 1 1 49.99 8 Z',bandera:'M12 8 H88 V92 L50 106 L12 92 Z',hexagono:'M50 4 L92 28 V82 L50 106 L8 82 V28 Z'},
pat:{liso:'Liso',franja:'Franja',diagonal:'Diagonal',mitad:'Mitad',cuartel:'Cuartel',tricolor:'Tricolor'},
cols:['#7c3aed','#2563eb','#0ea5a4','#16a34a','#eab308','#f97316','#dc2626','#db2777','#1f2937','#f5f5f4'],bord:['#ffc93c','#cbd5e1','#c27c48','#ffffff','#111111'],
emb:{oros:['🪙','Oros'],copas:['🏆','Copas'],espadas:['⚔️','Espadas'],bastos:['🪵','Bastos'],corona:['👑','Corona'],estrella:['⭐','Estrella'],guacamaya:['🦜','Guacamaya'],turpial:['🐦','Turpial'],tepuy:['⛰️','Tepuy'],arepa:['🫓','Arepa'],caraota:['🫘','Caraota'],sol:['☀️','Sol']},
ent:{abierto:'Abierto',solicitud:'Con solicitud',cerrado:'Cerrado'},rk:['Novato','Veterano','Co-líder','Líder'],rkc:['#a9c4b6','#6cb8ff','#d79bff','#ffc93c'],
pais:{VE:'Venezuela',CL:'Chile',CO:'Colombia',AR:'Argentina',PE:'Perú',EC:'Ecuador',PA:'Panamá',MX:'México',DO:'Rep. Dominicana',ES:'España',US:'EE. UU.',XX:'Todo el mundo'},
quick:['¡Epa! 👋','¿Quién juega?','Dame 5 min','¡Qué caída! 🔥','Misión lista ✅','Bendición 🙏','Gracias, pana'],COSTO:500,VET:7*864e5};
let G41SID=0;
const g41e=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function gShield(c,sz){c=c||{};const id='gsc'+(++G41SID),d=G41.sh[c.shape]||G41.sh.clasico,c1=c.c1||'#7c3aed',c2=c.c2||'#eab308';let f;
switch(c.pat){case 'franja':f=`<rect width="100" height="112" fill="${c1}"/><rect y="40" width="100" height="26" fill="${c2}"/>`;break;
case 'diagonal':f=`<rect width="100" height="112" fill="${c1}"/><polygon points="0,78 100,12 100,44 0,110" fill="${c2}"/>`;break;
case 'mitad':f=`<rect width="100" height="112" fill="${c1}"/><rect x="50" width="50" height="112" fill="${c2}"/>`;break;
case 'cuartel':f=`<rect width="100" height="112" fill="${c1}"/><rect x="50" width="50" height="56" fill="${c2}"/><rect y="56" width="50" height="56" fill="${c2}"/>`;break;
case 'tricolor':f=`<rect width="100" height="38" fill="#ffcc00"/><rect y="38" width="100" height="36" fill="#0033a0"/><rect y="74" width="100" height="38" fill="#cf142b"/>`;break;
default:f=`<rect width="100" height="112" fill="${c1}"/>`}
const e=(G41.emb[c.emb]||G41.emb.oros)[0];
return `<svg class="g41sh" viewBox="0 0 100 112" width="${sz}" height="${Math.round(sz*1.12)}" aria-hidden="true"><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><g clip-path="url(#${id})">${f}<rect width="100" height="44" fill="#fff" opacity=".13"/></g><path d="${d}" fill="none" stroke="${c.c3||'#ffc93c'}" stroke-width="5" stroke-linejoin="round"/><text x="50" y="${c.shape=='redondo'?68:64}" text-anchor="middle" font-size="40">${e}</text></svg>`}
function gEmbHTML(G,sz){return G&&G.sh?gShield(G.sh,sz):`<span class="g41em" style="font-size:${Math.round(sz*.72)}px">${(G&&G.emb)||'🛡️'}</span>`}
function gEffR(G,u){if(!G||!u)return 0;if(G.owner==u)return 3;const r=(G.rk||{})[u];if(r>=1)return Math.min(2,r);const j=(G.jd||{})[u];if(j==null)return 1;return Date.now()-j>=G41.VET?1:0}
function gMyR(){return GLD.g&&window.FBU?gEffR(GLD.g,FBU.uid):-1}
function gRkChip(r){return `<span class="g41rk" style="background:${G41.rkc[r]}">${G41.rk[r]}</span>`}
function gCtyTxt(c){return c&&c!='XX'?flag(c)+' '+(G41.pais[c]||c):'🌎 Todo el mundo'}
function gEntry(G){return G.entry||(G.open===false?'cerrado':'abierto')}
async function gFn(op,args,quiet){if(!window.FB||!FB.clan||!window.FBU){if(!quiet)toast('📶 Necesitas internet para esto');throw new Error('offline')}
 try{const r=(await FB.clan({op,...(args||{})})).data||{};if(typeof r.gold=='number'){store.gold=r.gold;try{if(window.WALLET)WALLET.gold=r.gold}catch(e){}save()}return r}
 catch(e){if(!quiet)toast('⚠️ '+String((e&&e.message)||'Error'));throw e}}

/* ---- crear / editar ---- */
function gDraftNew(){return {tag:'',name:'',lema:'',cty:(typeof myCty=='function'?myCty():'VE'),entry:'abierto',min:0,sh:{shape:'clasico',pat:'franja',c1:'#7c3aed',c2:'#eab308',c3:'#ffc93c',emb:'oros'}}}
function gDraftErr(D,edit){const e={};if(!edit){if(D.tag&&!/^[A-Z0-9]{2,5}$/.test(D.tag))e.tag='Solo letras A-Z y números, de 2 a 5.';if(D.name&&D.name.trim().length<3)e.name='Mínimo 3 letras.'}
 e.ok=edit||(/^[A-Z0-9]{2,5}$/.test(D.tag)&&D.name.trim().length>=3);return e}
function gPrevHTML(D){return `<div class="g41prev" id="g41prev">${gShield(D.sh,70)}<div style="flex:1;min-width:0"><div class="g41nm"><span class="g41tag">[${g41e(D.tag||'TAG')}]</span> ${g41e(D.name||'Nombre del clan')}</div><div class="sub">${g41e(D.lema||'Tu lema aquí')}</div><div class="sub">${gCtyTxt(D.cty)}</div></div></div>`}
function gPrevUpd(){const D=GLD.dr,edit=GLD.view=='edit',p=$('g41prev');if(p)p.outerHTML=gPrevHTML(D);const er=gDraftErr(D,edit);if($('g41eT'))$('g41eT').textContent=er.tag||'';if($('g41eN'))$('g41eN').textContent=er.name||'';if($('g41bc'))$('g41bc').disabled=!er.ok;if($('g41lc'))$('g41lc').textContent=D.lema.length+'/40'}
function gDr(k,v){GLD.dr[k]=v;gPrevUpd()}
function gDrSh(k,v){GLD.dr.sh[k]=v;showMenu('guild')}
function gFormHTML(bk){const edit=GLD.view=='edit',D=GLD.dr,sh=D.sh,er=gDraftErr(D,edit);
 const chips=(k,obj)=>`<div class="g41chips">${Object.keys(obj).map(x=>`<button class="${sh[k]==x?'on':''}" onclick="gDrSh('${k}','${x}')" aria-label="${k=='emb'?G41.emb[x][1]:x}">${k=='shape'?gShield({...sh,shape:x},28):k=='emb'?`<span style="font-size:24px">${G41.emb[x][0]}</span>`:G41.pat[x]}</button>`).join('')}</div>`;
 const sw=(k,arr)=>`<div class="g41chips">${arr.map(c=>`<button class="g41sw${sh[k]==c?' on':''}" style="background:${c}" onclick="gDrSh('${k}','${c}')" aria-label="Color"></button>`).join('')}</div>`;
 return bk+`<h2 class="sec">🛡️ ${edit?'Editar clan':'Crear clan'}</h2>${gPrevHTML(D)}
 <div class="box g41f"><b>Escudo</b><label>Forma</label>${chips('shape',G41.sh)}<label>Diseño</label>${chips('pat',G41.pat)}
 ${sh.pat=='tricolor'?'':`<label>Color principal</label>${sw('c1',G41.cols)}`}${sh.pat=='liso'||sh.pat=='tricolor'?'':`<label>Segundo color</label>${sw('c2',G41.cols)}`}
 <label>Borde</label>${sw('c3',G41.bord)}<label>Emblema</label>${chips('emb',G41.emb)}</div>
 <div class="box g41f"><b>Datos</b>
 <label for="g41t">TAG</label><input id="g41t" class="inp" maxlength="5" value="${g41e(D.tag)}" placeholder="Ej: CHAMO" ${edit?'disabled':''} autocomplete="off" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9]/g,'');gDr('tag',this.value)"><small class="sub">${edit?'El TAG no se puede cambiar.':'2 a 5 letras o números. Sale junto a tu nombre.'}</small><small class="g41err" id="g41eT">${er.tag||''}</small>
 <label for="g41n">Nombre</label><input id="g41n" class="inp" maxlength="20" value="${g41e(D.name)}" placeholder="Ej: Los Chamos" ${edit?'disabled':''} oninput="gDr('name',this.value)"><small class="g41err" id="g41eN">${er.name||''}</small>
 <label for="g41l">Lema <small class="sub" id="g41lc">${D.lema.length}/40</small></label><input id="g41l" class="inp" maxlength="40" value="${g41e(D.lema)}" placeholder="Ej: Caída y mesa limpia" oninput="gDr('lema',this.value)">
 <label for="g41p">País</label><select id="g41p" class="inp" onchange="gDr('cty',this.value)">${Object.keys(G41.pais).map(k=>`<option value="${k}" ${D.cty==k?'selected':''}>${gCtyTxt(k)}</option>`).join('')}</select>
 <label>Quién puede entrar</label><div class="seg">${Object.entries(G41.ent).map(([k,v])=>`<button class="${D.entry==k?'on':''}" onclick="GLD.dr.entry='${k}';showMenu('guild')">${v}</button>`).join('')}</div>
 <small class="sub">${D.entry=='abierto'?'Cualquiera entra al instante.':D.entry=='solicitud'?'El líder o un co-líder acepta cada solicitud.':'Nadie puede entrar ni pedir (solo con invitación).'}</small>
 <label for="g41m">Rango mínimo</label><select id="g41m" class="inp" onchange="GLD.dr.min=+this.value">${RANKS.map((n,i)=>`<option value="${i}" ${+D.min==i?'selected':''}>${i?RKI[i]+' '+n+' o más':'Sin mínimo'}</option>`).join('')}</select></div>
 ${edit?`<button class="mb" onclick="gSave()">💾 Guardar cambios</button>`:`<button class="mb g41gold" id="g41bc" onclick="gCreate()" ${er.ok?'':'disabled'}>🛡️ Crear clan · 🪙 ${G41.COSTO}</button><p class="sub" style="text-align:center">Tienes 🪙 ${(store.gold||0).toLocaleString('es')}</p>`}
 <button class="mb bk" onclick="GLD.view=null;showMenu('guild')">Cancelar</button>`}
async function gCreate(){const D=GLD.dr;if(!D||!gDraftErr(D).ok)return;if((store.gold||0)<G41.COSTO){toast('🪙 Te falta oro: crear un clan cuesta '+G41.COSTO);return}
 if(!confirm(`¿Crear [${D.tag}] ${D.name} por ${G41.COSTO} de oro?`))return;const b=$('g41bc');if(b)b.disabled=true;
 try{const r=await gFn('create',{name:D.name,tag:D.tag,lema:D.lema||'¡Vamos con todo!',cty:D.cty,entry:D.entry,min:D.min,sh:D.sh,mp:gMe()});store.guild=r.gid;NET.me&&(NET.me.guild=r.gid);save();GLD.view=null;GLD.dr=null;toast('🛡️ ¡Clan creado!');try{sfx.caida(3)}catch(e){}await gLoad();showMenu('guild')}catch(e){if(b)b.disabled=false}}
async function gSave(){const D=GLD.dr;try{await gFn('edit',{gid:GLD.id,lema:D.lema,cty:D.cty,entry:D.entry,min:D.min,sh:D.sh});GLD.view=null;toast('💾 Cambios guardados');showMenu('guild')}catch(e){}}
function gEdit(){const G=GLD.g;GLD.dr={tag:G.tag,name:G.name,lema:G.lema||G.desc||'',cty:G.cty||'XX',entry:gEntry(G),min:G.min||0,sh:{...(G.sh||gDraftNew().sh)}};GLD.view='edit';showMenu('guild');window.scrollTo(0,0)}

/* ---- unirse / salir ---- */
async function gJoin(gid,inv){try{const r=await gFn('join',{gid,mp:gMe(),inv:!!inv});if(r.req){store.gPend=gid;save();toast('📨 Solicitud enviada. Te avisamos cuando te acepten');showMenu('guild');return}
 store.gPend=null;store.guild=gid;NET.me&&(NET.me.guild=gid);save();toast('🛡️ ¡Entraste al clan!');await gLoad();showMenu('guild')}catch(e){}}
async function gAcceptInv(I){try{if(GLD.g&&GLD.g.id!=I.gid)await gLeave(true);await gJoin(I.gid,true);await gDropInv(I)}catch(e){}}
async function gCancelReq(){const gid=store.gPend;store.gPend=null;save();try{await gFn('cancelReq',{gid},true)}catch(e){}showMenu('guild')}
async function gPendCheck(){const gid=store.gPend;if(!gid||!FBU||GLD._pc)return;GLD._pc=1;const {F,db}=FB;try{const u=await F.getDoc(F.doc(db,'users',FBU.uid));const g=u.exists()&&u.data().guild;
 if(g==gid){store.gPend=null;store.guild=g;NET.me&&(NET.me.guild=g);save();toast('✅ ¡Te aceptaron en el clan!');try{sfx.caida(3)}catch(e){}await gLoad();if(curView=='guild')showMenu('guild');return}
 const q=await F.getDoc(F.doc(db,'guilds',gid,'reqs',FBU.uid));if(!q.exists()){store.gPend=null;save();toast('Esta vez no te aceptaron en ese clan');if(curView=='guild')showMenu('guild')}}catch(e){}finally{setTimeout(()=>GLD._pc=0,20000)}}
async function gLeave(silent){const G=GLD.g;if(!G)return;const me=FBU.uid,rest=(G.members||[]).filter(u=>u!=me);
 if(!silent){let t='¿Seguro que quieres salir del clan?';if(!rest.length)t='Eres el único miembro: el clan se cierra y el TAG queda libre. ¿Salir?';else if(G.owner==me)t='Eres el líder. El liderazgo pasa al miembro de más rango y más antiguo. ¿Salir?';if(!confirm(t))return}
 try{await gFn('leave',{gid:G.id},silent)}catch(e){if(!silent)return}
 gStop();GLD.g=null;GLD.id=null;store.guild=null;NET.me&&(NET.me.guild=null);save();if(!silent){GLD.tab='chat';showMenu('guild')}}

/* ---- miembros y rangos ---- */
function gMemSheet(u){const G=GLD.g,m=(G.mp||{})[u]||{},a=gMyR(),t=gEffR(G,u),nm=g41e(m.name||'Jugador');const p={};
 if(u!=FBU.uid){if(a==3){if(t<2)p.up=1;if(t>0)p.down=1;p.kick=1;p.lead=1}else if(a==2){if(t==0)p.up=1;if(t<2)p.kick=1}}
 const d=document.createElement('div');d.id='gmod';d.onclick=e=>{if(e.target==d)d.remove()};
 d.innerHTML=`<div class="gbox g41sheet"><div style="display:flex;gap:10px;align-items:center">${avatarHTML(48,m.av||'oro',m.fr||'none')}<div style="flex:1;min-width:0"><b style="font-size:19px">${nm}</b><br>${gRkChip(t)}</div><button class="sm" onclick="$('gmod').remove()">✕</button></div>
 <button class="mb bk" onclick="$('gmod').remove();gProfile('${u}')">👤 Ver perfil</button>
 ${p.up?`<button class="mb" onclick="gDo('up','${u}')">⬆️ Ascender a ${G41.rk[t+1]}</button>`:''}${p.down?`<button class="mb bk" onclick="gDo('down','${u}')">⬇️ Bajar a ${G41.rk[t-1]}</button>`:''}
 ${p.lead?`<button class="mb g41gold" onclick="gDo('lead','${u}')">👑 Pasarle el liderazgo</button>`:''}${p.kick?`<button class="mb g41bad" onclick="gDo('kick','${u}')">🚫 Expulsar del clan</button>`:''}</div>`;document.body.appendChild(d)}
async function gDo(op,u){const G=GLD.g,nm=String(((G.mp||{})[u]||{}).name||'este jugador');
 if(op=='kick'&&!confirm(`¿Expulsar a ${nm}? No podrá volver a pedir entrar por 24 horas.`))return;
 if(op=='lead'&&!confirm(`¿Pasarle el liderazgo a ${nm}? Tú quedas como Co-líder.`))return;
 try{$('gmod')&&$('gmod').remove()}catch(e){}try{await gFn(op,{gid:GLD.id,u});toast(op=='up'?'⬆️ Ascendido':op=='down'?'⬇️ Rango bajado':op=='kick'?'🚫 Expulsado':'👑 Liderazgo entregado')}catch(e){}}
async function gReq(u,yes){try{await gFn(yes?'accept':'reject',{gid:GLD.id,u});toast(yes?'✅ Ya está en el clan':'Solicitud rechazada')}catch(e){}}
function gExtras(){const G=GLD.g;if(!G||!window.FBU)return;const {F,db}=FB;
 if(gMyR()>=2){if(!GLD.unR||GLD.unRid!=G.id){try{GLD.unR&&GLD.unR()}catch(e){}GLD.unRid=G.id;GLD.unR=F.onSnapshot(F.collection(db,'guilds',G.id,'reqs'),sn=>{GLD.reqs=(sn.docs||[]).map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.t-b.t);if(curView=='guild'&&GLD.view==null&&$('app').style.display!='block'&&!document.activeElement?.id?.startsWith('gmsg'))showMenu('guild')},()=>{})}}
 else{try{GLD.unR&&GLD.unR()}catch(e){}GLD.unR=null;GLD.reqs=[];if(GLD.tab=='req')GLD.tab='chat'}
 const o=G.owner,t=((G.mp||{})[o]||{}).t;if(!GLD._ck&&o!=FBU.uid&&t&&Date.now()-t>14*864e5&&(G.members||[]).length>1){GLD._ck=1;gFn('check',{gid:G.id},true).catch(()=>{})}}
const _gStop41=gStop;gStop=function(){try{GLD.unR&&GLD.unR()}catch(e){}GLD.unR=null;GLD.reqs=[];GLD._ck=0;return _gStop41.apply(this,arguments)};
const _clc41=clanLvCheck;clanLvCheck=function(){try{gExtras()}catch(e){}return _clc41.apply(this,arguments)};

/* ---- chat ---- */
async function gSend(extra){const inp=$('gmsg');const txt=extra?'':((inp&&inp.value)||'').trim().slice(0,120);if(!txt&&!extra)return;
 if(!(extra&&extra.room)){if(Date.now()-(GLD.lastS||0)<2000){toast('Espera un momento para enviar otro');return}GLD.lastS=Date.now()}
 const {F,db}=FB;try{await F.addDoc(F.collection(db,'guilds',GLD.id,'chat'),{uid:FBU.uid,name:store.name||'Jugador',av:myPub().av,fr:myPub().fr,ns:store.nameStyle||'none',...(txt?{text:clean?clean(txt):txt}:{}),...(extra||{}),t:Date.now()});if(inp&&!extra)inp.value=''}catch(e){toast('No se pudo enviar: '+(e.code||e.message))}}
function gQuick(t){gSend({text:clean?clean(t):t})}
async function gDelMsg(id){try{await FB.F.deleteDoc(FB.F.doc(FB.db,'guilds',GLD.id,'chat',id));toast('🗑 Mensaje borrado')}catch(e){toast('No se pudo borrar')}}
const _gMsg41=gMsgHTML;gMsgHTML=function(m){let h=_gMsg41(m);const G=GLD.g;if(!G||m.sys)return h;const a=gMyR(),r=gEffR(G,m.uid),inC=(G.members||[]).includes(m.uid);
 const del=(m.uid==FBU.uid||(a>=2&&(!inC||r<a)))?`<button class="g41del" onclick="gDelMsg('${m.id}')" aria-label="Borrar">🗑</button>`:'';
 return h.replace('<i class="gtm">',(inC?gRkChip(r)+' ':'')+'<i class="gtm">').replace(/<\/i><\/small>/,'</i>'+del+'</small>')};

/* ---- buscar ---- */
async function gBrowse(){const {F,db}=FB;try{const q=await F.getDocs(F.query(F.collection(db,'guilds'),F.orderBy('createdAt','desc'),F.limit(40)));GLD.list=q.docs.map(d=>({id:d.id,...d.data()}));if(curView=='guild')showMenu('guild')}catch(e){GLD.list=GLD.list||[];toast('Error: '+(e.code||e.message))}}
function gFilter(){const q=(($('g41q')||{}).value||'').trim().toUpperCase(),c=($('g41fc')||{}).value||'';GLD.fq=q;GLD.fc=c;let n=0;document.querySelectorAll('.g41card').forEach(el=>{const ok=(!q||el.dataset.k.includes(q))&&(!c||el.dataset.c==c);el.style.display=ok?'':'none';if(ok)n++});const z=$('g41none');if(z)z.style.display=n?'none':''}
function gJoinBtn(g){const n=(g.members||[]).length,e=gEntry(g),my=rkBest().r;
 if(store.gPend==g.id)return `<button class="sm off" onclick="gCancelReq()">⏳ Esperando… ✕</button>`;
 if(n>=30)return `<button class="sm off" disabled>Lleno</button>`;if(e=='cerrado')return `<button class="sm off" disabled>Cerrado</button>`;
 if((g.min||0)>my)return `<button class="sm off" disabled>${RKI[g.min]} ${RANKS[g.min]}</button>`;
 return e=='solicitud'?`<button class="sm g41gold" onclick="gJoin('${g.id}')">Pedir</button>`:`<button class="sm" onclick="gJoin('${g.id}')">Unirme</button>`}
function gCardHTML(g){const n=(g.members||[]).length,e=gEntry(g);return `<div class="g41card" data-k="${g41e(String(g.tag||'')+' '+String(g.name||'').toUpperCase())}" data-c="${g.cty||''}">${gEmbHTML(g,44)}<div style="flex:1;min-width:0"><b class="g41one"><span class="g41tag">[${g41e(g.tag)}]</span> ${g41e(g.name)}</b><small class="sub g41one">${g.lema?'«'+g41e(g.lema)+'»':(g.desc?g41e(g.desc):'')}</small><small class="sub">${gCtyTxt(g.cty)} · ⭐ ${clanLvl(g)} · 👥 ${n}/30 · ${G41.ent[e]}${g.min?' · '+RKI[g.min]+' '+RANKS[g.min]+'+':''}</small></div>${gJoinBtn(g)}</div>`}

/* ---- pantalla ---- */
function guildHTML(bk){if(!fbOk()||!window.FBU)return bk+`<h2 class="sec">🛡️ Clanes</h2><div class="box">Para entrar a un clan necesitas estar en línea.</div><button class="mb" onclick="showMenu('online')">🌐 Entrar en línea</button>`;
if(!GLD.g&&((NET.me&&NET.me.guild)||store.guild)){if(!GLD.loading){GLD.loading=1;setTimeout(()=>gLoad().then(()=>{GLD.loading=0;if(curView=='guild')showMenu('guild')}),30)}return bk+`<h2 class="sec">🛡️ Clan</h2><div class="box" style="text-align:center">⏳ Cargando tu clan…</div>`}
const G=GLD.g;
if(GLD.view=='edit'&&G&&GLD.dr)return gFormHTML(bk);
if(!G){if(GLD.view=='crear'){GLD.dr=GLD.dr||gDraftNew();return gFormHTML(bk)}
 if(store.gPend)setTimeout(gPendCheck,50);if(!GLD.list&&!GLD.lload){GLD.lload=1;setTimeout(gBrowse,30)}
 const L=GLD.list;
 return bk+`<h2 class="sec">🛡️ Clanes</h2><div class="box g41hero">${gShield({shape:'clasico',pat:'liso',c1:'#352359',c3:'#6b4fa8',emb:'copas'},76)}<b style="font-size:20px">Aún no tienes clan</b><p class="sub">Juega con tus panas, conversen, compartan mesas y suban de nivel juntos.</p>
 <div class="g41two"><button class="mb g41gold" onclick="GLD.view='crear';showMenu('guild');window.scrollTo(0,0)">🛡️ Crear clan<br><small>🪙 ${G41.COSTO}</small></button><button class="mb" onclick="$('g41q')&&$('g41q').focus()">🔍 Buscar clan<br><small>${L?L.length:'…'} clanes</small></button></div></div>
 ${store.gPend?`<div class="box" style="text-align:center">⏳ Pediste entrar a un clan. Te avisamos cuando te acepten.<br><button class="sm off" style="margin-top:6px" onclick="gCancelReq()">Cancelar solicitud</button></div>`:''}
 <div class="box"><b style="font-size:18px">Unirme con TAG</b><div style="display:flex;gap:6px;margin-top:6px"><input id="gtag" placeholder="Ej: CHAMO" maxlength="6" class="inp" style="flex:1;text-transform:uppercase"><button class="sm" onclick="gJoinTag()">Buscar</button></div></div>
 <div class="box"><div style="display:flex;justify-content:space-between;align-items:center;gap:6px"><b style="font-size:18px">Clanes para unirse</b><button class="sm off" onclick="gBrowse()">🔄</button></div>
 <div style="display:flex;gap:6px;margin:8px 0"><input id="g41q" class="inp" style="flex:1;min-width:0" placeholder="Nombre o TAG" value="${g41e(GLD.fq||'')}" oninput="gFilter()"><select id="g41fc" class="inp" style="width:auto" onchange="gFilter()"><option value="">🌎 Todos</option>${Object.keys(G41.pais).filter(k=>k!='XX').map(k=>`<option value="${k}" ${GLD.fc==k?'selected':''}>${flag(k)} ${G41.pais[k]}</option>`).join('')}</select></div>
 <div class="g41list">${L?L.map(gCardHTML).join(''):'<p class="sub">⏳ Buscando clanes…</p>'}</div><p class="sub" id="g41none" style="display:${L&&!L.length?'':'none'}">No hay clanes con ese nombre. ¡Crea el tuyo!</p></div>`+(L&&(GLD.fq||GLD.fc)?(setTimeout(gFilter,0),''):'')}
const M=G.members||[],MP=G.mp||{},a=gMyR(),R=GLD.reqs||[];if(GLD.tab=='req'&&a<2)GLD.tab='chat';
const E=['😂','👏','🔥','😡','🤥 ¡Mentiroso!'].concat(itemList('emo').filter(it=>owns('emo',it)).map(it=>it.id)).concat(itemList('stk').filter(it=>owns('stk',it)).map(it=>'stk:'+it.id)).filter((v,k,a)=>a.indexOf(v)==k);
const head=`<div class="ghead">${gEmbHTML(G,62)}<div style="flex:1;min-width:0"><b style="font-size:21px"><span class="g41tag">[${g41e(G.tag)}]</span> ${g41e(G.name)}</b>${(G.lema||G.desc)?`<br><small class="sub">«${g41e(G.lema||G.desc)}»</small>`:''}<br><small class="sub">${gCtyTxt(G.cty)} · ⭐ Nivel ${clanLvl(G)} · 👥 ${M.length}/30 · ${G41.ent[gEntry(G)]}</small><br><small>Tú: ${gRkChip(Math.max(0,a))}</small>${c43Head(G)}</div></div>
<div class="seg" style="margin:8px 0"><button class="${GLD.tab=='chat'?'on':''}" onclick="GLD.tab='chat';showMenu('guild')">💬 Chat</button><button class="${GLD.tab=='mem'?'on':''}" onclick="GLD.tab='mem';showMenu('guild')">👥 Miembros</button>${a>=2?`<button class="${GLD.tab=='req'?'on':''}" onclick="GLD.tab='req';showMenu('guild')" style="position:relative">📨 Entrar${R.length?`<i class="g41bd">${R.length}</i>`:''}</button>`:''}<button class="${GLD.tab=='war'?'on':''}" onclick="GLD.tab='war';showMenu('guild')">⚔️</button><button class="${GLD.tab=='aj'?'on':''}" onclick="GLD.tab='aj';showMenu('guild')">⚙️</button></div>${c43Tabs()}`;
let body='';
if(GLD.tab=='mesa')body=c45Mesa();else if(GLD.tab=='tro')body=c45Tro();else if(GLD.tab=='pase')body=c45Pase();else if(GLD.tab=='mis')body=c43Mis();else if(GLD.tab=='cof')body=c43Cof();else if(GLD.tab=='don')body=c43Don();else if(GLD.tab=='lv')body=c43LvHTML();else if(GLD.tab=='war')body=warHTML();
else if(GLD.tab=='chat')body=`<div id="gchat" class="gchat">${GLD.msgs.map(gMsgHTML).join('')||'<p class="sub">Aún no hay mensajes. ¡Saluda a tu clan!</p>'}</div><div class="g41quick">${G41.quick.map(q=>`<button onclick="gQuick('${q.replace(/'/g,'')}')">${q}</button>`).join('')}</div><div class="gemr">${E.map(e=>`<button data-e="${e.replace(/"/g,'&quot;')}" onclick="gSend({emo:this.dataset.e})">${e.startsWith('stk:')?stkSVG(e.slice(4)):isMsg(e)?`<span class="rxs-m${msgCls(e)}" style="background:${MSGS[e]}">${e}</span>`:e.split(' ')[0]}</button>`).join('')}</div><div class="gin"><input id="gmsg" placeholder="Escribe a tu clan…" maxlength="120" onkeydown="if(event.key=='Enter')gSend()"><button class="sm" onclick="gSend()">Enviar</button></div><button class="mb" onclick="gShareTable()">📣 Compartir mi mesa con el clan</button><div class="box ginvbox"><b>➕ Invitar al clan</b><p class="sub">Manda el enlace por WhatsApp: al tocarlo se abre el juego y les aparece la invitación.</p><div class="ginvbtns"><button class="sm wa" onclick="gWhats()">🟢 WhatsApp</button><button class="sm" onclick="gCopyLink()">📋 Copiar enlace</button><button class="sm off" onclick="gShareLink()">📤 Compartir</button></div>${(NET.friends||[]).filter(f=>!M.includes(f.uid)).length?`<p class="sub" style="margin-top:8px">Tus amigos:</p>${(NET.friends||[]).filter(f=>!M.includes(f.uid)).map(f=>`<div class="wrow"><span>${String(f.name||'Amigo').replace(/</g,'')}</span><button class="sm" onclick="gInvite('${f.uid}','${String(f.name||'').replace(/'/g,'')}');this.disabled=true;this.textContent='✓'">Invitar</button></div>`).join('')}`:''}</div>`;
else if(GLD.tab=='mem'){const jd=G.jd||{};body=`<div class="gmem">${M.slice().sort((x,y)=>gEffR(G,y)-gEffR(G,x)||(jd[x]||0)-(jd[y]||0)).map(u=>{const m=MP[u]||{},r=gEffR(G,u);const ex=r==0&&jd[u]?`Veterano en ${Math.max(1,Math.ceil((jd[u]+G41.VET-Date.now())/864e5))} d`:'⭐ Nivel '+(m.lv||1);
 const can=u!=FBU.uid&&(a==3||(a==2&&r<2));return `<div class="gmr g41mr"><span onclick="gProfile('${u}')">${avatarHTML(42,m.av||'oro',m.fr||'none')}</span><div style="flex:1;min-width:0;text-align:left" onclick="gProfile('${u}')"><b>${nameHTML(String(m.name||'Jugador').replace(/</g,''),m.ns)}</b> ${gRkChip(r)}<br><small class="sub">${ex} · <span style="color:${RKC[m.rks||0]}">${rkTxt({r:m.rks||0,l:m.rkl||0})}</span></small><br><small class="gact">${u==FBU.uid?'🟢 tú':agoT(m.t)}</small></div>${can?`<button class="sm off g41more" onclick="gMemSheet('${u}')" aria-label="Opciones">⋯</button>`:''}</div>`}).join('')}</div>
 <details class="box g41rules"><summary><b>Qué puede hacer cada rango</b></summary><table><tr><td>${gRkChip(0)}</td><td>Al entrar. Chatea y juega.</td></tr><tr><td>${gRkChip(1)}</td><td>A los 7 días, o lo asciende un co-líder o el líder.</td></tr><tr><td>${gRkChip(2)}</td><td>Lo nombra el líder (máx. 3). Acepta solicitudes, asciende novatos, expulsa novatos y veteranos, borra mensajes.</td></tr><tr><td>${gRkChip(3)}</td><td>Todo: sube y baja rangos, expulsa, edita el clan y pasa el liderazgo. Si no entra en 14 días, pasa al co-líder más antiguo.</td></tr></table></details>`}
else if(GLD.tab=='req')body=R.length?R.map(q=>`<div class="box g41mr">${avatarHTML(42,q.av||'oro',q.fr||'none')}<div style="flex:1;min-width:0"><b>${g41e(q.name)}</b><br><small class="sub">⭐ Nivel ${q.lv||1} · ${RKI[q.rk||0]} ${RANKS[q.rk||0]} · ${agoT(q.t).replace('activo ','')}</small></div><button class="sm off" onclick="gReq('${q.id}',false)">No</button><button class="sm" onclick="gReq('${q.id}',true)">Aceptar</button></div>`).join(''):'<div class="box sub">No hay solicitudes. Cuando alguien pida entrar, aparece aquí.</div>';
else body=`<div class="box g41f">${a==3?`<button class="mb" onclick="gEdit()">✏️ Editar escudo, lema y entrada</button>`:'<p class="sub">Solo el líder puede editar el clan.</p>'}<p class="sub">TAG <b>[${g41e(G.tag)}]</b> · ${G41.ent[gEntry(G)]}${G.min?' · '+RKI[G.min]+' '+RANKS[G.min]+' o más':''}</p><button class="mb bk" onclick="gLeave()">🚪 Salir del clan</button></div>`;
return bk+head+body}


;
/* ==== v42js ==== */

/* ===== v42: red de seguridad — cualquier caja que quede transparente sobre el fondo de pantalla
   (en el menú o en una ventana) pasa a sólida, mezclando su color con el morado de la tarjeta. ===== */
(function(){
 const BASE=[43,26,92];
 const A=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return [0,0,0,1];const v=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [v[0],v[1],v[2],v.length>3?v[3]:1]};
 const mix=c=>{const [r,g,b,a]=A(c);const k=Math.max(a,0);return `rgb(${Math.round(r*k+BASE[0]*(1-k))}, ${Math.round(g*k+BASE[1]*(1-k))}, ${Math.round(b*k+BASE[2]*(1-k))})`};
 const opaque=el=>{const cs=getComputedStyle(el);if(A(cs.backgroundColor)[3]>=0.9)return true;const bi=cs.backgroundImage;if(bi&&bi!='none'){if(bi.includes('url('))return true;const L=bi.match(/rgba?\([^)]+\)/g)||[];if(L.length&&L.every(c=>A(c)[3]>=0.9))return true}return false};
 const SK='#board,svg,.c,#tabbar,.board,.tprev,.av,.frm,canvas,.no42,img,video';
 const opq=cs=>{if(A(cs.backgroundColor)[3]>=0.9)return true;const bi=cs.backgroundImage;if(bi&&bi!='none'){if(bi.includes('url('))return true;const L=bi.match(/rgba?\([^)]+\)/g)||[];if(L.length&&L.every(c=>A(c)[3]>=0.9))return true}return false};
 function walk(el,W,H){if(el.matches&&el.matches(SK))return;const cs=getComputedStyle(el);if(cs.display=='none')return;
  const op=+cs.opacity;if(op>0.2&&op<0.92&&cs.animationName=='none'&&!el.dataset.o42){const R=el.getBoundingClientRect();if(R.width>=40&&R.height>=18){el.dataset.o42=1;el.style.setProperty('opacity','1','important');el.style.setProperty('filter','saturate(.5) brightness(.75)','important')}}
  if(opq(cs))return;
  const bg=cs.backgroundColor,a=A(bg)[3],bi=cs.backgroundImage;let ch=a>0.01&&a<0.9;
  if(!ch&&bi&&bi!='none'&&!bi.includes('url(')){const L=bi.match(/rgba?\([^)]+\)/g)||[];if(L.some(c=>A(c)[3]<0.9))ch=true}
  if(ch){const R=el.getBoundingClientRect();const big=R.width>=W*.95&&R.height>=H*.85;
   if(!big&&R.width>=40&&R.height>=18){el.dataset.s42=1;
    if(a>0.01&&a<0.9)el.style.setProperty('background-color',mix(bg),'important');
    if(bi&&bi!='none'&&!bi.includes('url('))el.style.setProperty('background-image',bi.replace(/rgba?\([^)]+\)/g,c=>A(c)[3]<0.9?mix(c):c),'important');
    return}}
  for(const k of el.children)walk(k,W,H)}
 function fix(root){if(!root||!root.children)return;walk(root,innerWidth,innerHeight)}
 window.fix42=fix;
 let T=0;const run=()=>{clearTimeout(T);T=setTimeout(()=>{try{fix(document.getElementById('menu'));document.querySelectorAll('body>*:not(#app):not(#menu):not(#tabbar):not(script):not(style):not(#bgl)').forEach(fix)}catch(e){}},60)};
 try{const _sm=showMenu;showMenu=function(...a){const r=_sm.apply(this,a);run();return r}}catch(e){}
 new MutationObserver(ms=>{const g=(document.getElementById('app')||{}).style;const ig=g&&g.display=='block';for(const m of ms){if(m.target===document.body&&m.addedNodes.length){if(!ig){run();return}m.addedNodes.forEach(n=>{if(n.nodeType==1)setTimeout(()=>{try{if(n.isConnected)fix(n)}catch(e){}},60)})}}}).observe(document.body,{childList:true});
 const mm=document.getElementById('menu');if(mm)new MutationObserver(run).observe(mm,{childList:true});
 setTimeout(run,800);
})();

;
/* ==== v43clan ==== */

/* ===== CLANES v43 (parte 2): misiones, Cofre del Clan, donar repetidos, niveles 1-10, +5 % de oro ===== */
const C43={XPN:[0,50,150,300,500,800,1200,1700,2300,3000],
PERKS:[['+5 % de oro en tus partidas','🪙'],['El cofre puede dar el marco «Clan Madera»','🖼️'],['Pedir 2 cosas a la vez','🤝'],['Cofre del clan +100 de oro','🎁'],['El cofre puede dar el marco «Clan Plata»','🖼️'],['Misión diaria da 250 de oro','🎯'],['Cofre del clan +200 de oro','🎁'],['El cofre puede dar «Clan Oro» y «Clan Rubí»','🖼️'],['Donar da el doble de oro','🤝'],['El cofre puede dar «Clan Leyenda» · escudo dorado','👑']],
CAN:{ronda:['Ronda','🔁',150,'rondas'],vigia:['Vigía','👀',40,'vigías'],patrulla:['Patrulla','🚓',40,'patrullas'],registro:['Registro','📋',25,'registros'],flor:['Flor','🌸',20,'flores'],casas:['Casas','🏠',8,'casas'],florpat:['Flor patrulla','💐',5,'flores patrulla'],florreg:['Flor registro','🌺',3,'flores registro']},
WEEKS:[['ronda','vigia','flor','casas'],['ronda','patrulla','registro','florpat'],['vigia','patrulla','flor','florreg']],
FR:[['clan_madera','Clan Madera',2],['clan_plata','Clan Plata',5],['clan_oro','Clan Oro',8],['clan_rubi','Clan Rubí',8],['clan_leyenda','Clan Leyenda',10]],
DON_MAX:10,cur:{}};
try{C43.FR.forEach(f=>{FR5.add(f[0]);FRAI.add(f[0]);if(!FR.some(x=>x[0]==f[0]))FR.push([f[0],f[1],'x'])})}catch(e){}
function c43Lv(x){let l=1;for(let i=0;i<10;i++)if((x||0)>=C43.XPN[i])l=i+1;return l}
clanLvl=function(G){return c43Lv((G&&G.xp)||0)};
const c43Day=t=>new Date(t||Date.now()).toLocaleDateString('en-CA',{timeZone:'America/Santiago'});
function c43Week(t){const d=new Date(c43Day(t)+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return d.toISOString().slice(0,10)}
const c43Set=wk=>C43.WEEKS[Math.floor((Date.parse(wk+'T12:00:00Z')-Date.parse('2026-01-05T12:00:00Z'))/(7*864e5))%3];
function c43Cm(G){const c=JSON.parse(JSON.stringify((G&&G.cm)||{})),d=c43Day(),w=c43Week();if(c.d!=d){c.d=d;c.dn=0;c.dby={};c.dx=false}if(c.w!=w){c.w=w;c.ws=c43Set(w);c.wp={};c.wmy={};c.wx={}}c.ws=c.ws||c43Set(w);return c}
const c43Goal=G=>Math.max(10,Math.min(40,2*((G&&G.members)||[]).length));
const c43DayGold=l=>l>=6?250:200, c43ChestGold=l=>300+50*l+(l>=7?200:l>=4?100:0);
const _gEmb43=gEmbHTML;gEmbHTML=function(G,sz){if(G&&G.sh&&clanLvl(G)>=10)G={...G,sh:{...G.sh,c3:'#ffd84a'}};return _gEmb43(G,sz)};

/* ---- contar cantos y avisar al servidor al terminar cada partida ---- */
function c43Key(n){n=String(n||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
 return n=='ronda'?'ronda':n=='vigia'?'vigia':n=='patrulla'?'patrulla':n=='registro'?'registro':n=='flor'?'flor':n.startsWith('casa')?'casas':n=='flor patrulla'?'florpat':n=='flor registro'?'florreg':null}
function c43Canto(name){const k=c43Key(name);if(k)C43.cur[k]=(C43.cur[k]||0)+1}
const _econ43=econ;econ=async function(op,args){if(op=='mStart')C43.cur={};const r=await _econ43.apply(this,arguments);if(op=='mEnd'&&args&&args.mid)c43Prog(args.mid);return r};
function c43Prog(mid){const gid=store.guild||(NET.me&&NET.me.guild);const cn=C43.cur;C43.cur={};if(!gid||!window.FB||!FB.clan)return;
 setTimeout(()=>{gFn('prog',{gid,mid,cantos:cn},true).then(r=>{if(r.bonus)toast('🛡️ +'+r.bonus+' 🪙 por tu clan (5 %)');(r.notes||[]).forEach((n,i)=>setTimeout(()=>toast(n),2600*(i+1)))}).catch(()=>{})},1200)}

/* ---- pedidos de donación en vivo ---- */
const _gEx43=gExtras;gExtras=function(){_gEx43.apply(this,arguments);const G=GLD.g;if(!G||!window.FBU)return;
 if(!GLD.unD||GLD.unDid!=G.id){try{GLD.unD&&GLD.unD()}catch(e){}GLD.unDid=G.id;const {F,db}=FB;GLD.unD=F.onSnapshot(F.collection(db,'guilds',G.id,'dons'),sn=>{GLD.dons=(sn.docs||[]).map(d=>({id:d.id,...d.data()})).sort((a,b)=>a.t-b.t);if(curView=='guild'&&GLD.tab=='don'&&GLD.view==null&&$('app').style.display!='block')showMenu('guild')},()=>{})}};
const _gStop43=gStop;gStop=function(){try{GLD.unD&&GLD.unD()}catch(e){}GLD.unD=null;GLD.dons=[];return _gStop43.apply(this,arguments)};

/* ---- piezas de pantalla ---- */
function c43Head(G){const x=G.xp||0,l=clanLvl(G),nx=C43.XPN[l],p=nx?Math.round((x-C43.XPN[l-1])/(nx-C43.XPN[l-1])*100):100;
 return `<div class="c43hd"><span class="c43perk">🪙 +5 % de oro</span><small class="sub">${nx?`${x.toLocaleString('es')} / ${nx.toLocaleString('es')} XP`:'Nivel máximo'}</small></div><div class="c43bar"><i style="width:${p}%"></i></div>`}
function c43Badges(G){const c=c43Cm(G),me=FBU.uid,l=clanLvl(G);const day=c.dn>=c43Goal(G)&&(c.dby[me]||0)>0&&store.c43day!=c.d;
 const wk=c.ws.every(k=>c.wx[k])&&Object.values(c.wmy[me]||{}).some(v=>v>0)&&store.c43wk!=c.w;
 const don=(GLD.dons||[]).filter(d=>d.uid!=me&&d.got<d.need&&(store.emoLv||{})[d.e]>=2).length;return {day,wk,don}}
function c43Tabs(){const G=GLD.g;if(!G)return '';const b=c43Badges(G),t=GLD.tab;const B=x=>x?`<i class="g41bd">${x===true?'!':x}</i>`:'';
 return `<div class="seg c43seg" style="margin:0 0 8px"><button class="${t=='mis'?'on':''}" onclick="GLD.tab='mis';showMenu('guild')" style="position:relative">🎯 Misiones${B(b.day)}</button><button class="${t=='cof'?'on':''}" onclick="GLD.tab='cof';showMenu('guild')" style="position:relative">🎁 Cofre${B(b.wk)}</button><button class="${t=='don'?'on':''}" onclick="GLD.tab='don';showMenu('guild')" style="position:relative">🤝 Donar${B(b.don)}</button><button class="${t=='lv'?'on':''}" onclick="GLD.tab='lv';showMenu('guild')">⭐ Nivel</button></div>`}
function c43Mis(){const G=GLD.g,c=c43Cm(G),me=FBU.uid,goal=c43Goal(G),l=clanLvl(G),mine=c.dby[me]||0,ok=c.dn>=goal,MP=G.mp||{};
 const top=Object.entries(c.dby).sort((a,b)=>b[1]-a[1]).slice(0,5);const dg=c43DayGold(l);
 let h=`<div class="box c43box"><div class="c43row"><b class="c43t">Misión diaria</b><span class="c43pill">se reinicia 00:00</span></div>
 <div class="c43mis"><div class="c43row"><span class="c43ic">🃏</span><div style="flex:1;min-width:0"><b>Jueguen ${goal} partidas entre todos</b><br><small class="sub">Tú: ${mine} · 2 por miembro (mín. 10, máx. 40)</small></div><b class="c43num">${Math.min(c.dn,goal)}/${goal}</b></div><div class="c43bar${ok?' ok':''}"><i style="width:${Math.min(100,Math.round(c.dn/goal*100))}%"></i></div></div>
 ${top.length?`<div class="c43top">${top.map(([u,v])=>`<div><span>${u==me?'<b>Tú</b>':g41e((MP[u]||{}).name||'Ex miembro')}</span><b>${v} 🃏</b></div>`).join('')}</div>`:''}
 ${store.c43day==c.d?`<p class="c43ok">✅ Cobraste la misión de hoy</p>`:ok?(mine?`<button class="mb g41gold" onclick="c43Claim(this)">Cobrar ${dg} 🪙</button>`:'<p class="sub">Se completó, pero necesitas jugar 1 partida hoy para cobrar.</p>'):`<p class="sub">Premio: ${dg} de oro para cada uno que jugó al menos 1 partida · +10 XP al clan</p>`}</div>
 <div class="box c43box"><div class="c43row"><b class="c43t">Semanales de cantos</b><span class="c43pill">lunes 00:00</span></div>`;
 for(const k of c.ws){const C=C43.CAN[k],v=c.wp[k]||0,dn=c.wx[k];h+=`<div class="c43mis"><div class="c43row"><span class="c43ic">${C[1]}</span><div style="flex:1;min-width:0"><b>Canten ${C[2]} ${C[3]}</b><br><small class="sub">Tú: ${((c.wmy[me]||{})[k])||0}${dn?' · <span class="c43ok">+15 XP ✔</span>':''}</small></div><b class="c43num">${Math.min(v,C[2])}/${C[2]}</b></div><div class="c43bar${dn?' ok':''}"><i style="width:${Math.min(100,Math.round(v/C[2]*100))}%"></i></div></div>`}
 return h+`<p class="sub">Las 4 completas abren el <b>Cofre del Clan</b>. Cuentan los cantos que tú ganas en cualquier partida.</p></div>`}
function c43Cof(){const G=GLD.g,c=c43Cm(G),me=FBU.uid,l=clanLvl(G),ok=c.ws.every(k=>c.wx[k]),aport=Object.values(c.wmy[me]||{}).some(v=>v>0),op=store.c43wk==c.w;
 let h=`<div class="box c43box c43chest${ok?'':' lk'}"><div class="c43big" id="c43ic">${op?'📭':'🎁'}</div><b class="c43t">Cofre del Clan</b><div class="c43chk">${c.ws.map(k=>`<div class="${c.wx[k]?'ok':''}">${C43.CAN[k][1]}<br>${c.wx[k]?'✔':Math.min(c.wp[k]||0,C43.CAN[k][2])+'/'+C43.CAN[k][2]}</div>`).join('')}</div>
 ${op?'<p class="c43ok">Ya lo abriste esta semana. El próximo, el lunes.</p>':!ok?'<p class="sub">Completen las 4 misiones semanales para abrirlo.</p>':!aport?'<p class="sub">Se abrió, pero necesitas aportar al menos 1 canto esta semana.</p>':`<button class="mb g41gold" onclick="c43Chest(this)">Abrir cofre</button>`}
 <p class="sub">Trae <b>${c43ChestGold(l)}</b> de oro · 1 de cada 4 trae un <b>marco de clan</b> · si ya lo tienes, +150 de oro</p></div>
 <div class="box c43box"><b class="c43t">Marcos de clan</b><div class="c43fr">${C43.FR.map(f=>{const has=(store.owned||[]).includes(f[0]);return `<div class="${has?'':'lk'}"><img src="fr5/${f[0]}.webp?v=43" alt="" loading="lazy"><span>${f[1].replace('Clan ','')}</span><small class="sub">${has?'✔ tuyo':l>=f[2]?'en el cofre':'Nv. '+f[2]}</small></div>`}).join('')}</div><p class="sub">Solo salen los del nivel de tu clan o menos. Se ponen en Personalizar › Marcos.</p></div>`;
 return h}
function c43Don(){const G=GLD.g,me=FBU.uid,l=clanLvl(G),g=20*(l>=9?2:1),LV=store.emoLv||{},D=(GLD.dons||[]).filter(d=>d.got<d.need);const today=c43Day(),dn=(store.c43don&&store.c43don.d==today)?store.c43don.n:0;
 const others=D.filter(d=>d.uid!=me),mine=D.filter(d=>d.uid==me);const W=(typeof WALLET!='undefined'&&WALLET&&WALLET.ownedEmo)||(store.ownedEmo||[]).filter(e=>(store.emoLv||{})[e]);
 const em=e=>`<span class="c43em">${g41e(e)}</span>`;
 let h=`<div class="box c43box"><div class="c43row"><b class="c43t">Pedidos del clan</b><span class="c43pill">${dn}/${C43.DON_MAX} hoy</span></div>`;
 h+=others.length?others.map(d=>{const lv=LV[d.e]||0,can=lv>=2&&dn<C43.DON_MAX;return `<div class="c43req">${em(d.e)}<div style="flex:1;min-width:0"><b>${g41e(d.name)}</b><br><small class="sub">pide · ${d.got}/${d.need}</small><div class="c43bar"><i style="width:${d.got/d.need*100}%"></i></div></div><div style="text-align:center"><button class="sm${can?'':' off'}" ${can?`onclick="c43Give('${d.id}',this)"`:'disabled'}>Donar</button><br><small class="sub">${lv>=2?'tienes repetido':lv==1?'solo 1':'no lo tienes'}</small></div></div>`}).join(''):'<p class="sub">No hay pedidos ahora.</p>';
 h+=`<p class="sub">Solo se donan <b>repetidos</b> (emojis de nivel 2 o 3; bajan 1 nivel). Donar: +${g} de oro y +2 XP al clan. Máx. ${C43.DON_MAX} al día.</p></div>`;
 const can=W.filter(e=>(LV[e]||1)<3&&!mine.some(d=>d.e==e));
 h+=`<div class="box c43box"><b class="c43t">Tu pedido</b>${mine.map(d=>`<div class="c43req">${em(d.e)}<div style="flex:1;min-width:0"><b>Pediste</b><br><small class="sub">${d.got}/${d.need} recibidos</small><div class="c43bar"><i style="width:${d.got/d.need*100}%"></i></div></div><button class="sm off" onclick="c43Cancel('${d.id}')">✕</button></div>`).join('')}
 ${can.length?`<div class="c43row"><select id="c43e" class="inp" style="flex:1;min-width:0">${can.map(e=>`<option value="${g41e(e)}">${g41e(e)} · nivel ${LV[e]||1}</option>`).join('')}</select><button class="sm" onclick="c43Ask(this)">Pedir</button></div>`:'<p class="sub">Para pedir, necesitas un emoji de cofre que no esté al nivel 3.</p>'}
 <p class="sub">Pides 3 copias de un emoji que ya tienes y sube de nivel. 1 pedido cada 8 horas${l>=3?' (2 a la vez por el nivel del clan)':''}.</p></div>`;
 const rep=W.filter(e=>(LV[e]||0)>=2);h+=`<div class="box c43box"><b class="c43t">Tus repetidos</b>${rep.length?`<div class="c43inv">${rep.map(e=>`<div>${em(e)}<small>nivel ${LV[e]}</small></div>`).join('')}</div>`:'<p class="sub">Aún no tienes repetidos. Salen en los cofres.</p>'}</div>`;
 return h}
function c43LvHTML(){const G=GLD.g,l=clanLvl(G);return `<div class="box c43box"><b class="c43t">Niveles del clan</b><p class="sub">XP: cada victoria de un miembro +1 · misión diaria +10 · cada semanal +15 · cada donación +2. Al subir de nivel, 200 de oro para cada miembro.</p>
 ${C43.PERKS.map((p,i)=>`<div class="c43lv${i+1<=l?' got':''}${i+1==l?' cur':''}"><b class="c43n">${i+1}</b><div style="flex:1;min-width:0"><b>${p[1]} ${p[0]}</b><br><small class="sub">${C43.XPN[i].toLocaleString('es')} XP${i+1<=l?' · ✔ desbloqueado':''}</small></div></div>`).join('')}</div>`}

/* ---- acciones ---- */
async function c43Claim(b){const G=GLD.g;if(b)b.disabled=true;try{const r=await gFn('claimDay',{gid:G.id},true);store.c43day=c43Day();save();try{sfx.caida(3)}catch(e){}toast('🎯 +'+r.got+' de oro');showMenu('guild')}catch(e){const m=String(e.message||'');if(/Ya cobraste/.test(m)){store.c43day=c43Day();save();showMenu('guild')}toast('⚠️ '+m);if(b)b.disabled=false}}
async function c43Chest(b){const G=GLD.g;if(b)b.disabled=true;const ic=$('c43ic');if(ic)ic.classList.add('c43shake');
 try{const r=await gFn('chest',{gid:G.id},true);store.c43wk=c43Week();if(r.frame&&!r.dup){store.owned=Array.from(new Set([...(store.owned||[]),r.frame]));try{if(WALLET&&WALLET.owned)WALLET.owned.push(r.frame)}catch(e){}}save();
  const f=r.frame&&C43.FR.find(x=>x[0]==r.frame);setTimeout(()=>{try{sfx.caida(3)}catch(e){}flash(`<div style="font-size:54px">🎉</div><div style="font-size:30px;color:#ffd84a">+${r.got.toLocaleString('es')} 🪙</div>${f?`<div style="display:flex;flex-direction:column;align-items:center"><img src="fr5/${f[0]}.webp?v=43" style="width:120px;height:120px" alt=""><b style="font-size:20px">Marco «${f[1]}»${r.dup?' (repetido, +150 de oro)':''}</b></div>`:'<div style="font-size:18px">Esta vez sin marco. ¡La próxima semana!</div>'}`,3);showMenu('guild')},600)}
 catch(e){const m=String(e.message||'');if(/Ya abriste/.test(m)){store.c43wk=c43Week();save();showMenu('guild')}toast('⚠️ '+m);if(b)b.disabled=false}}
async function c43Give(did,b){const G=GLD.g,d=(GLD.dons||[]).find(x=>x.id==did);if(b)b.disabled=true;try{const r=await gFn('give',{gid:G.id,did},true);if(d){store.emoLv=store.emoLv||{};store.emoLv[d.e]=r.emoLv;try{if(WALLET&&WALLET.emoLv)WALLET.emoLv[d.e]=r.emoLv}catch(e){}}
 store.c43don={d:c43Day(),n:C43.DON_MAX-(r.left??C43.DON_MAX)};save();toast('🤝 Donaste: +'+r.got+' 🪙 +2 XP al clan');showMenu('guild')}catch(e){toast('⚠️ '+String(e.message||''));if(b)b.disabled=false}}
async function c43Ask(b){const e=($('c43e')||{}).value;if(!e)return;if(b)b.disabled=true;try{await gFn('ask',{gid:GLD.g.id,e},true);toast('📨 Pedido enviado al clan')}catch(x){toast('⚠️ '+String(x.message||''));if(b)b.disabled=false}}
async function c43Cancel(did){try{await gFn('cancelAsk',{gid:GLD.g.id,did},true)}catch(e){}}


;
/* ==== v45clan ==== */

/* ===== CLANES v45 (parte 3): mesa del clan, trofeos, pase → 400 de oro, guerra etapa 1 ===== */
const C45={TELAS:[['verde','Verde clásico','#1f7a46','#0f4a2a',1],['morado','Morado','#5b2ca0','#2e1460',1],['azul','Azul','#1d5fa8','#0c2f5c',3],['vino','Vino','#8a1c3a','#4a0a1d',3],['noche','Noche','#26303f','#0d1219',6],['tricolor','Tricolor','#0033a0','#cf142b',9]],
BORDES:[['madera','Madera','#8a5a2b','#4a2c10',1],['plata','Plata','#c3cad8','#5d667a',4],['oro','Oro','#ffd84a','#8a5a00',7]],
TRO:[['guerras','⚔️','Guerras ganadas',[1,5,20]],['racha','🔥','Racha de guerras',[2,3,5]],['cofres','🎁','Cofres del clan',[1,10,30]],['diarias','🎯','Misiones diarias',[7,30,100]],['nivel','⭐','Nivel del clan',[3,6,10]],['donar','🤝','Donaciones',[50,250,1000]],['flores','🌸','Flores cantadas',[100,500,2000]],['victorias','🏆','Victorias del clan',[100,1000,5000]],['miembros','👥','Miembros a la vez',[10,20,30]],['pases','💳','Pases comprados',[1,5,15]]],
TIER:[['Bronce','#d08a4a'],['Plata','#dfe5f0'],['Oro','#ffd84a']],
CAN:[['ronda','Ronda','🔁',150],['vigia','Vigía','👀',40],['patrulla','Patrulla','🚓',40],['registro','Registro','📋',25],['flor','Flor','🌸',20],['casas','Casas','🏠',8],['florpat','Flor patrulla','💐',5],['florreg','Flor registro','🌺',3]],
RK:['Novato','Veterano','Co-líder'],w:{},wal:null,walT:0};
let WAR45=null;
function c45Phase(){return ((new Date(c43Day()+'T12:00:00Z').getUTCDay()+6)%7)<=4?'ins':'bat'}
function c45Prev(wk){const d=new Date(wk+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-7);return d.toISOString().slice(0,10)}
function c45Tier(G,k){const t=((G&&G.tt)||{})[k];return t==null?-1:t}
function c45Felt(m){const T=C45.TELAS.find(t=>t[0]==(m&&m.tela))||C45.TELAS[0];return T[0]=='tricolor'?'linear-gradient(#ffcc00 0 33%,#0033a0 33% 66%,#cf142b 66%)':`radial-gradient(circle at 50% 45%,${T[2]},${T[3]})`}
function c45Bord(m){return (C45.BORDES.find(b=>b[0]==(m&&m.borde))||C45.BORDES[0])}
function c45Pins(G){const P=(G&&G.pin)||[];if(!P.length)return '';return `<span class="c45pins">${P.map(k=>{const T=C45.TRO.find(t=>t[0]==k);if(!T)return '';const ti=c45Tier(G,k);return `<span class="c45tier" style="background:${ti>=0?C45.TIER[ti][1]:'#5b4a85'}">${T[1]} ${ti>=0?C45.TIER[ti][0]:'—'}</span>`}).join('')}</span>`}

/* ---- mesa del clan en la partida ---- */
function c45Cache(){const G=GLD.g;if(!G)return;const c={mesa:G.mesa||{tela:'verde',borde:'madera'},sh:G.sh||null,tag:G.tag};if(JSON.stringify(store.c45m)!=JSON.stringify(c)){store.c45m=c;save()}}
function c45TableBg(){const c=store.c45m;if(!c)return null;let sv='';try{if(c.sh)sv=gShield(c.sh,200).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" opacity=".42" ')}catch(e){}
 const img=sv?`url("data:image/svg+xml;utf8,${encodeURIComponent(sv)}") center/34% no-repeat, `:'';return {bg:img+c45Felt(c.mesa),bd:c45Bord(c.mesa)[3]}}
const _apT45=applyTable;applyTable=function(){_apT45.apply(this,arguments);try{const b=$('board');if(!b)return;const on=(store.guild||(NET.me&&NET.me.guild))&&store.c45m&&(WAR45||store.c45mesa!==false)&&!(typeof lvOn=='function'&&lvOn()&&!WAR45);const T=on&&c45TableBg();
 if(T){b.dataset.t='clan';b.style.background=T.bg;b.style.borderColor=T.bd}else{b.style.background='';b.style.borderColor=''}}catch(e){}};

/* ---- cantos con candado en la guerra ---- */
function c45Pts(p,name,n){if(!WAR45)return n;const k=c43Key(name);if(!k)return n;const can=p==0?WAR45.myCan:WAR45.foeCan;if(can&&can[k]===false){try{msg('🔒 '+name+' está bloqueado en esta guerra: no suma')}catch(e){}return 0}return n}

/* ---- guerra: datos ---- */
async function c45WarLoad(){const G=GLD.g;if(!G||!window.FB||!FB.F)return;const {F,db}=FB,wk=c43Week(),pw=c45Prev(wk);try{
 const [a,b]=await Promise.all([F.getDoc(F.doc(db,'wars2',wk+'_'+G.id)),F.getDoc(F.doc(db,'wars2',pw+'_'+G.id))]);const W={wk,cur:a.exists()?a.data():null,prev:b.exists()?b.data():null};
 if(W.cur&&W.cur.foe&&!W.cur.ghost){const f=await F.getDoc(F.doc(db,'wars2',wk+'_'+W.cur.foe));W.foe=f.exists()?f.data():null}
 if(W.prev&&W.prev.foe&&!W.prev.ghost){const f=await F.getDoc(F.doc(db,'wars2',pw+'_'+W.prev.foe));W.pfoe=f.exists()?f.data():null}
 GLD.c45w=W;if(curView=='guild'&&GLD.tab=='war'&&GLD.view==null&&$('app').style.display!='block')showMenu('guild')}catch(e){}}
function c45Res(D,F){const fp=D.ghost?Math.round((D.n||5)*3*.45):(F?F.pts||0:0),fc=D.ghost?(D.n||5)*6:(F?F.cai||0:0),p=D.pts||0,c=D.cai||0;return {res:p>fp||(p==fp&&c>fc)?'win':p==fp&&c==fc?'tie':'lose',fp,fc}}
function c45MyCos(){return {av:store.avatar,fr:store.frame,ns:store.nameStyle,deck:store.face,back:store.back,table:store.table,fxc:store.fxc,fxk:store.fxk}}
async function c45Ins(b){if(b)b.disabled=true;try{await gFn('warIns',{gid:GLD.g.id,cos:c45MyCos()});toast('⚔️ ¡Te inscribiste en la guerra!')}catch(e){}c45WarLoad()}
async function c45Out(){try{await gFn('warOut',{gid:GLD.g.id})}catch(e){}c45WarLoad()}
async function c45Min(v){try{await gFn('warMin',{gid:GLD.g.id,min:+v});toast('Ahora se inscriben desde '+C45.RK[+v])}catch(e){}}
async function c45Claim(b){if(b)b.disabled=true;try{const r=await gFn('warClaim',{gid:GLD.g.id},true);if(r.gotGems){store.gems=(store.gems||0)+r.gotGems;save()}
 if(r.got){try{sfx.caida(3)}catch(e){}flash(`<div style="font-size:50px">${r.res=='win'?'🏆':'⚔️'}</div><div style="font-size:26px;color:#ffd84a">+${r.got} 🪙${r.gotGems?' +'+r.gotGems+' 💎':''}</div>`,2.4)}else toast('No jugaste batallas: sin premio esta vez');store.c45wc=c45Prev(c43Week());save()}catch(e){toast('⚠️ '+String(e.message||''))}c45WarLoad()}

/* ---- guerra: jugar una batalla (IA Experto con cosméticos del rival) ---- */
function c45Okc(list,id){return list.some(x=>x[0]==id)}
async function c45Fight(b){const G=GLD.g;if(b)b.disabled=true;
 try{if(WAR45&&WAR45.opt){try{Object.assign(opt,JSON.parse(WAR45.opt))}catch(e){}}WAR45=null;
  const r=await gFn('warStart',{gid:G.id},true);const m=await econ('mStart',{kind:'ai',entry:0,n:2,multi:false});
  WAR45={gid:G.id,bid:r.bid,mid:m.mid,foe:r.foe,cos:r.cos||{},myCan:r.myCan,foeCan:r.foeCan,cai0:stSnap().caidas,opt:JSON.stringify(opt)};
  MID=m.mid;window._keepMID=1;Object.assign(opt,{players:2,team:'parejas',mode:'normal',meta:24,dif:'dificil',entry:0,casa:true,flor:true,noCheat:false,triv:false});
  RN=[null,'⚔️ '+String(r.foe||'Rival').slice(0,16)];window._keepRN=1;startGame(0);genAIC();try{applyTable()}catch(e){}
  setTimeout(()=>flash(`<div style="font-size:40px">⚔️ Batalla ${r.n}/3</div><div style="font-size:19px">IA Experto con los cosméticos de ${String(r.foe||'').replace(/</g,'')}</div>`,2.4),400)}
 catch(e){toast('⚠️ '+String(e.message||''));if(b)b.disabled=false}}
const _genAIC45=genAIC;genAIC=function(){_genAIC45.apply(this,arguments);try{if(WAR45&&AIC[1]){const c=WAR45.cos||{},A=AIC[1];const avl=[...AVP,...AVS];
 if(c45Okc(avl,c.av))A.av=c.av;if(c45Okc(FR,c.fr))A.fr=c.fr;if(c45Okc(NS,c.ns))A.ns=c.ns;if(c45Okc(DECKS,c.deck))A.deck=c.deck;if(c45Okc(BKS,c.back))A.back=c.back;if(c45Okc(TBL,c.table))A.table=c.table;if(c45Okc(FXC,c.fxc))A.fxc=c.fxc;if(c45Okc(FXK,c.fxk))A.fxk=c.fxk}}catch(e){}};
const _econ45=econ;econ=async function(op,args){const r=await _econ45.apply(this,arguments);if(op=='mEnd'&&WAR45&&args&&args.mid==WAR45.mid)c45WarEnd();return r};
function c45WarEnd(){const W=WAR45;WAR45=null;if(!W)return;try{Object.assign(opt,JSON.parse(W.opt))}catch(e){}const cai=Math.max(0,stSnap().caidas-W.cai0);
 setTimeout(()=>gFn('warEnd',{gid:W.gid,bid:W.bid,mid:W.mid,cai},true).then(r=>{toast(r.win?'⚔️ ¡Victoria! +1 punto para tu clan':'⚔️ Derrota. ¡La próxima es tuya!');c45WarLoad()}).catch(e=>toast('⚠️ '+String(e.message||''))),900)}

/* ---- regalos del pase ---- */
async function c45WalLoad(force){if(!window.FB||!FB.F||!window.FBU)return;if(!force&&Date.now()-C45.walT<60000)return;C45.walT=Date.now();try{const s=await FB.F.getDoc(FB.F.doc(FB.db,'wallets',FBU.uid));C45.wal=(s.exists()&&s.data().cl)||{};if(curView=='guild'&&GLD.view==null&&$('app').style.display!='block')showMenu('guild')}catch(e){}}
function c45GiftOk(){const c=C45.wal||{};return (c.gifts||[]).length&&c.giftDay!=c43Day()}
async function c45Gift(b){if(b)b.disabled=true;try{const r=await gFn('gift',{gid:GLD.g.id},true);try{sfx.caida(3)}catch(e){}toast('💳 +'+r.got+' de oro (regalo de '+r.who+')')}catch(e){toast('⚠️ '+String(e.message||''))}c45WalLoad(true)}
function c45PaseCheck(){try{const P=(typeof WALLET!='undefined'&&WALLET&&WALLET.pass)||null;if(!P||!P.prem||!GLD.g||store.c45pase==P.sid||C45.paseT)return;C45.paseT=1;
 gFn('pase',{gid:GLD.g.id},true).then(r=>{store.c45pase=P.sid;save();if(!r.already&&r.n)toast('💳 Tu pase regaló 400 de oro a '+r.n+' compañeros')}).catch(()=>{}).finally(()=>{C45.paseT=0})}catch(e){}}
const _gEx45=gExtras;gExtras=function(){_gEx45.apply(this,arguments);if(!GLD.g)return;c45Cache();c45WalLoad();c45PaseCheck();if(!GLD.c45w||GLD.c45w.gid!=GLD.g.id||Date.now()-(GLD.c45wT||0)>60000){GLD.c45wT=Date.now();c45WarLoad().then(()=>{if(GLD.c45w)GLD.c45w.gid=GLD.g.id})}};

/* ---- pantallas ---- */
const _c43Head45=c43Head;c43Head=function(G){let h=_c43Head45(G)+(c45Pins(G)?`<div style="margin-top:4px">${c45Pins(G)}</div>`:'');
 if(c45GiftOk()){const g=(C45.wal.gifts||[])[0];h+=`<div class="c45gift"><span>💳</span><div style="flex:1;min-width:0"><b>${g41e(g.who)} compró el Pase</b><br><small>+400 de oro para ti</small></div><button class="sm g41gold" onclick="c45Gift(this)">Cobrar</button></div>`}return h};
const _c43Tabs45=c43Tabs;c43Tabs=function(){const t=GLD.tab;return _c43Tabs45()+`<div class="seg c43seg" style="margin:0 0 8px"><button class="${t=='mesa'?'on':''}" onclick="GLD.tab='mesa';showMenu('guild')">🃏 Mesa</button><button class="${t=='tro'?'on':''}" onclick="GLD.tab='tro';showMenu('guild')">🏆 Trofeos</button><button class="${t=='pase'?'on':''}" onclick="GLD.tab='pase';showMenu('guild')" style="position:relative">💳 Pase${c45GiftOk()?'<i class="g41bd">!</i>':''}</button></div>`};
const _gCard45=gCardHTML;gCardHTML=function(g){const h=_gCard45(g),p=c45Pins(g);if(!p)return h;const i=h.lastIndexOf('</div><button');return i<0?h:h.slice(0,i)+p+h.slice(i)};
function c45TableHTML(G,m){const c={mesa:m||G.mesa||{tela:'verde',borde:'madera'}};return `<div class="c45table" style="background:linear-gradient(${c45Bord(c.mesa)[2]},${c45Bord(c.mesa)[3]})"><div class="c45felt" style="background:${c45Felt(c.mesa)}">${G.sh?gShield(G.sh,86).replace('<svg ','<svg style="opacity:.6" '):`<span style="font-size:56px;opacity:.6">${G.emb||'🛡️'}</span>`}<b class="c45tg">[${g41e(G.tag)}]</b>${G.lema?`<small class="c45lm">«${g41e(G.lema)}»</small>`:''}</div></div>`}
function c45Mesa(){const G=GLD.g,l=clanLvl(G),lead=gMyR()==3,m=G.mesa||{tela:'verde',borde:'madera'};
 return `<div class="box c43box"><div class="c43row"><b class="c43t">Mesa del clan</b><span class="c43pill">${lead?'tú eliges':'la elige el líder'}</span></div>${c45TableHTML(G)}
 <p class="sub">Así se ve en la partida: el escudo al centro y el [TAG] del clan.</p><b>Tela</b><div class="c45opts">${C45.TELAS.map(t=>`<button class="${m.tela==t[0]?'on':''}" ${l<t[4]||!lead?'disabled':''} onclick="c45SetMesa('${t[0]}',null)"><i style="background:${t[0]=='tricolor'?'linear-gradient(#ffcc00 0 33%,#0033a0 33% 66%,#cf142b 66%)':`linear-gradient(${t[2]},${t[3]})`}"></i>${t[1]}${l<t[4]?' · Nv. '+t[4]:''}</button>`).join('')}</div>
 <b>Borde</b><div class="c45opts">${C45.BORDES.map(b=>`<button class="${m.borde==b[0]?'on':''}" ${l<b[4]||!lead?'disabled':''} onclick="c45SetMesa(null,'${b[0]}')"><i style="background:linear-gradient(${b[2]},${b[3]})"></i>${b[1]}${l<b[4]?' · Nv. '+b[4]:''}</button>`).join('')}</div>
 <button class="c45sw" onclick="store.c45mesa=store.c45mesa===false;save();showMenu('guild')"><span class="c45tgl${store.c45mesa!==false?' on':''}"></span><span style="flex:1;text-align:left"><b>Usar la mesa del clan en mis partidas</b><br><small class="sub">En la guerra sale siempre.</small></span></button>
 <p class="sub">Telas y bordes nuevos se abren al subir de nivel el clan.</p></div>`}
async function c45SetMesa(t,b){const G=GLD.g,m=G.mesa||{tela:'verde',borde:'madera'};try{await gFn('mesa',{gid:G.id,tela:t||m.tela,borde:b||m.borde});toast('🃏 Mesa del clan cambiada')}catch(e){}}
function c45Tro(){const G=GLD.g,lead=gMyR()==3,st=G.st||{},P=G.pin||[];let n=0;C45.TRO.forEach(t=>{n+=c45Tier(G,t[0])+1});
 const val=k=>k=='racha'?(st.rmax||0):k=='nivel'?clanLvl(G):k=='miembros'?Math.max(st.miembros||0,(G.members||[]).length):(st[k]||0);
 return `<div class="box c43box"><div class="c43row"><b class="c43t">Vitrina</b><span class="c43pill">${n}/${C45.TRO.length*3}</span></div>
 <div class="c45shelf">${P.length?P.map(k=>{const T=C45.TRO.find(t=>t[0]==k),ti=c45Tier(G,k);return T?`<div><span class="t">${T[1]}</span>${T[2]}<span class="c45tier" style="background:${ti>=0?C45.TIER[ti][1]:'#5b4a85'}">${ti>=0?C45.TIER[ti][0]:'Sin trofeo'}</span></div>`:''}).join(''):'<div style="grid-column:1/-1">Vitrina vacía</div>'}</div>
 <p class="sub">${lead?'Toca 📌 para elegir los 3 de la vitrina.':'El líder elige los 3 de la vitrina.'} Salen en la tarjeta del clan cuando otros los buscan.</p></div>
 <div class="box c43box"><b class="c43t">Sala de trofeos</b>${C45.TRO.map(t=>{const v=val(t[0]),ti=c45Tier(G,t[0]),nx=t[3][ti+1],pin=P.includes(t[0]);
  return `<div class="c45tro${ti<0?' c45lk':''}"><span class="t">${t[1]}</span><div style="flex:1;min-width:0"><b>${t[2]}</b>${ti>=0?` <span class="c45tier" style="background:${C45.TIER[ti][1]}">${C45.TIER[ti][0]}</span>`:''}<br><small class="sub">${v.toLocaleString('es')}${nx?' / '+nx.toLocaleString('es')+' para '+C45.TIER[ti+1][0]:' · ¡máximo!'}</small>${nx?`<div class="c43bar"><i style="width:${Math.min(100,v/nx*100)}%"></i></div>`:''}</div>${lead?`<button class="c45pin${pin?' on':''}" onclick="c45Pin('${t[0]}')" aria-label="Vitrina">📌</button>`:''}</div>`}).join('')}
 <p class="sub">Cada trofeo nuevo (bronce, plata u oro) da +25 XP al clan.</p></div>`}
async function c45Pin(k){const G=GLD.g;let P=(G.pin||[]).slice();const i=P.indexOf(k);if(i>=0)P.splice(i,1);else{if(P.length>=3)P.shift();P.push(k)}try{await gFn('pin',{gid:G.id,keys:P})}catch(e){}}
function c45Pase(){const c=C45.wal||{},q=c.gifts||[],H=c.giftH||[];
 return `<div class="box c43box"><b class="c43t">💳 Pase del clan</b><div class="c43mis"><b>Cuando alguien del clan compra el Pase de temporada, los demás reciben 400 de oro.</b><br><small class="sub">· Solo si llevas 3 días o más en el clan.<br>· 1 regalo al día: si llegan más, quedan en espera.<br>· El que compra no recibe, pero sale en el chat y suma al trofeo 💳.</small></div>
 ${q.length?`<div class="c45gift"><span>🎁</span><div style="flex:1;min-width:0"><b>Regalos en espera: ${q.length}</b><br><small>${q.map(g=>g41e(g.who)).join(', ')}</small></div>${c.giftDay==c43Day()?'<span class="c43pill">mañana</span>':'<button class="sm g41gold" onclick="c45Gift(this)">Cobrar 400</button>'}</div>`:'<p class="sub">No tienes regalos en espera.</p>'}
 <button class="mb" onclick="showMenu('pase')">💳 Ver el Pase de temporada</button></div>
 ${H.length?`<div class="box c43box"><b class="c43t">Cobrados</b>${H.map(g=>`<div class="c43row"><span>🎁</span><span style="flex:1">${g41e(g.who)}</span><small class="sub">${fmtT(g.t)}</small></div>`).join('')}</div>`:''}`}
function c45War(){const G=GLD.g,W=GLD.c45w,me=FBU.uid,ph=c45Phase(),lead=gMyR()==3,a=gMyR(),wmin=G.wmin||0;
 if(!W)return '<div class="box" style="text-align:center">⏳ Cargando la guerra…</div>';
 const D=W.cur,ins=(D&&D.ins)||{},I=ins[me],L=Object.entries(ins);let h='';
 // resultado de la semana pasada
 const P=W.prev;if(P&&P.foe&&P.ins&&P.ins[me]&&((P.ins[me].b||[]).length||P.ins[me].p)&&!P.ins[me].cl&&store.c45wc!=c45Prev(W.wk)){const R=c45Res(P,W.pfoe);
  h+=`<div class="box c43box c45res"><div style="font-size:44px">${R.res=='win'?'🏆':R.res=='tie'?'🤝':'😤'}</div><b class="c43t">${R.res=='win'?'¡Tu clan ganó la guerra!':R.res=='tie'?'Empate en la guerra':'Ganó '+g41e(P.foeName||'el rival')}</b><small class="sub">${P.pts||0} – ${R.fp} puntos · caídas ${P.cai||0} – ${R.fc}</small><button class="mb g41gold" onclick="c45Claim(this)">Cobrar premio</button></div>`}
 h+=`<div class="box c43box"><div class="c43row"><b class="c43t">Guerra de clanes</b><span class="c43pill">etapa 1 · vs IA</span></div><div class="c45phase">${[['Inscripción','lun–vie'],['Batallas','sáb–dom'],['Resultado','lunes']].map((p,i)=>`<div class="${(ph=='ins'&&i==0)||(ph=='bat'&&i==1)?'on':''}">${p[0]}<br>${p[1]}</div>`).join('')}</div>`;
 if(ph=='ins'){h+=`<div class="c43mis"><div class="c43row"><span class="c43ic">📝</span><div style="flex:1;min-width:0"><b>Inscritos: ${L.length}/10</b><br><small class="sub">Mínimo 5 para pelear · desde ${C45.RK[wmin]} · gratis</small></div>${I?`<button class="sm off" onclick="c45Out()">Salir</button>`:a>=wmin?`<button class="sm g41gold" ${L.length>=10?'disabled':''} onclick="c45Ins(this)">Inscribirme</button>`:'<span class="c43pill">rango bajo</span>'}</div>${L.length<5?`<p class="c45warn">Faltan ${5-L.length} para que el clan pelee este fin de semana.</p>`:''}</div>
  ${lead?`<div class="c43row"><b style="flex:1">Desde qué rango se inscriben</b><select class="inp" style="width:auto" onchange="c45Min(this.value)">${[0,1,2].map(r=>`<option value="${r}" ${wmin==r?'selected':''}>${C45.RK[r]}</option>`).join('')}</select></div>`:''}
  ${L.map(([u,x])=>`<div class="c43row c45mem">${avatarHTML(30,((x.cos||{}).av)||'oro','none')}<b style="flex:1">${g41e(x.name)}${u==me?' (tú)':''}</b>${gRkChip(gEffR(G,u))}</div>`).join('')}`}
 else if(!D||(D.n||0)<5)h+=`<p class="sub">Tu clan no pelea este fin de semana (se necesitan 5 inscritos de lunes a viernes).</p>`;
 else{const F=W.foe,fp=D.ghost?'?':(F?F.pts||0:0),fc=D.ghost?'?':(F?F.cai||0:0);
  if(!D.foe){h+=`<p class="sub">⏳ Buscando rival…</p>`;if(!GLD._c45pair){GLD._c45pair=1;gFn('warPair',{gid:G.id},true).catch(()=>{}).finally(()=>{GLD._c45pair=0;c45WarLoad()})}}
  else{h+=`<div class="c45vs"><div>${gEmbHTML(G,42)}<small><b>[${g41e(G.tag)}]</b></small></div><div><div class="c45score">${D.pts||0} – ${fp}</div><small class="sub">puntos · caídas ${D.cai||0}–${fc}</small></div><div>${D.foeSh?gShield(D.foeSh,42):'<span style="font-size:34px">👻</span>'}<small><b>[${g41e(D.foeTag||'')}]</b></small></div></div><p class="sub" style="text-align:center">Rival: <b>${g41e(D.foeName||'')}</b></p>`;
   if(I){const b=I.b||[],n=b.length+(I.p?1:0);h+=`<div class="c43mis"><div class="c43row"><span class="c43ic">⚔️</span><div style="flex:1"><b>Tus batallas</b><br><small class="sub">3 contra la IA Experto con cosméticos del rival · victoria = 1 punto</small></div><div class="c45dots">${[0,1,2].map(i=>`<i class="${b[i]==null?'':b[i].w?'w':'l'}"></i>`).join('')}</div></div>${b.length<3?`<button class="mb g41gold" onclick="c45Fight(this)">Jugar batalla ${Math.min(3,b.length+1)}/3</button>${I.p?'<p class="sub">Una batalla quedó sin terminar: si empiezas otra, esa cuenta como derrota.</p>':''}`:'<p class="c43ok">✅ Jugaste tus 3 batallas. ¡Gracias por aportar!</p>'}</div>`}
   else h+=`<p class="sub">No te inscribiste esta vez. Mira cómo va tu clan.</p>`;
   h+=L.map(([u,x])=>{const b=x.b||[];return `<div class="c43row c45mem">${avatarHTML(28,((x.cos||{}).av)||'oro','none')}<span style="flex:1">${g41e(x.name)}</span><div class="c45dots">${[0,1,2].map(i=>`<i class="${b[i]==null?'':b[i].w?'w':'l'}"></i>`).join('')}</div></div>`}).join('')}}
 h+=`</div>`;
 const wa=(G.cm&&G.cm.w==c43Week()&&G.cm.wa)||{};h+=`<div class="box c43box"><div class="c43row"><b class="c43t">Cantos para la guerra</b><span class="c43pill">esta semana</span></div><div class="c45cg">${C45.CAN.map(k=>{const v=wa[k[0]]||0,ok=v>=k[3];return `<div class="${ok?'ok':''}"><b>${ok?k[2]:'🔒'}</b>${k[1]}<br>${ok?'✔':Math.min(v,k[3])+'/'+k[3]}</div>`}).join('')}</div>
 <p class="sub">Se abren cantando en cualquier partida durante la semana (cuentan los 8). Canto con 🔒 no suma en la guerra. La IA rival solo suma con los cantos que abrió su clan.</p>
 <p class="sub">Premios: ganador +50 XP y 300 🪙 + 10 💎 por jugador; perdedor +15 XP y 100 🪙. Empate en puntos → gana quien hizo más caídas.</p></div>`;
 return h}
warHTML=function(){try{return c45War()}catch(e){return '<div class="box">⚠️ '+String(e.message||e)+'</div>'}};


;
/* ==== v46leave ==== */

/* v46 · Partidas de 4 en línea: si alguien se va, la IA toma su puesto al instante y la partida sigue */
(function(){
const V={pt:{},un:null,room:null,tick:Date.now(),at:{},t0:Date.now()};window.V46=V;
const base=p=>String(RN&&RN[p]||'Jugador').replace(/ 🤖$/,'');
function badge(){if(LV.mode!='host'||!LV.REM||!RN)return;let ch=0;for(const p in LV.REM){if(!RN[p])continue;const b=base(p),w=LV.away&&LV.away[p]==1?b+' 🤖':b;if(w!==RN[p]){RN[p]=w;ch=1}}if(ch){try{render()}catch(e){}try{lvPushSoon()}catch(e){}}}
window.v46Gone=function(p,why){if(LV.mode!='host'||!LV.REM||!LV.REM[p]||over||N!=4)return;LV.away=LV.away||{};LV.miss=LV.miss||{};if(LV.away[p]==1)return;
 LV.away[p]=1;LV.miss[p]=2;V.at[p]=Date.now();const n0=base(p);
 msg('🤖 '+n0+' se fue: la IA toma su puesto');toast('🤖 '+n0+' se fue · la IA juega por él');try{bubble(p,'🤖 IA',3000)}catch(e){}badge();
 if(LV.need&&LV.need.seat==p&&LV.openR){const r=LV.openR;LV.openR=null;LV.need=null;r(Math.random()<.5?1:4)}
 if(turn==p&&!busy&&!over){clearTimeout(LV.wait);lvRemoteTurn(p)}
 try{lvPushSoon()}catch(e){}};
function back(p){if(!LV.away||LV.away[p]!=1||!V.at[p])return;LV.away[p]=0;LV.miss[p]=0;delete V.at[p];const n0=base(p);msg('👋 '+n0+' volvió a la partida');toast('👋 '+n0+' volvió a la partida');badge()}
function unsub(){try{V.un&&V.un()}catch(e){}V.un=null;V.room=null}
function sub(){unsub();if(LV.mode!='host'||!RT.on()||!LV.room)return;V.room=LV.room;V.pt={};V.t0=Date.now();
 V.un=FB.D.onValue(RT.ref(LV.room+'/ping'),sn=>{if(LV.mode!='host')return;const v=sn.val()||{},now=Date.now();
  for(const p in (LV.REM||{})){const u=LV.REM[p],x=v[u],o=V.pt[u];
   if(x==null){if(o&&o.v!=null){V.pt[u]={v:null,at:now};v46Gone(+p,'ping0')}continue}
   if(!o||o.v!==x){V.pt[u]={v:x,at:now};if(V.at[p]&&now-V.at[p]>4000)back(p)}}},e=>{console.warn('v46 ping',e&&e.message);V.un=null})}
setInterval(()=>{try{const now=Date.now(),gap=now-V.tick;V.tick=now;
 if(LV.mode!='host'){if(V.un)unsub();return}
 if(V.room!==LV.room||!V.un)sub();
 if(gap>5000){for(const u in V.pt)V.pt[u].at=now;V.t0=Math.max(V.t0,now-20000);return}
 LV.away=LV.away||{};for(const p in V.at)if(LV.away[p]!=1)delete V.at[p];
 if(N==4&&!over&&LV.REM)for(const p in LV.REM){if(LV.away[p]==1)continue;const u=LV.REM[p],o=V.pt[u];
  if(o&&o.v!=null&&now-o.at>16000)v46Gone(+p,'ping');else if(!o&&now-V.t0>25000)v46Gone(+p,'noping')}
 badge()}catch(e){console.warn('v46',e)}},2000);
/* nueva partida (o revancha): todos empiezan como personas */
const _sh=lvStartHost;lvStartHost=function(r){const x=_sh.apply(this,arguments);try{LV.away={};LV.miss={};V.at={};V.t0=Date.now();if(V.room!==LV.room)sub()}catch(e){}return x};
const _rh=lvRestoreHost;lvRestoreHost=function(){const x=_rh.apply(this,arguments);try{V.at={};sub()}catch(e){}return x};
/* invitado: si se cae la conexión o cierra la app, se borra su ping (el anfitrión lo ve al instante) */
const _sg=lvStartGuest;lvStartGuest=function(r){const x=_sg.apply(this,arguments);try{if(RT.on()&&FBU){FB.D.onDisconnect(RT.ref(r.id+'/ping/'+FBU.uid)).remove().catch(()=>{});lvPing()}}catch(e){}return x};
/* invitado: si sale con el botón, avisa «me fui» */
const _ol=onlLeave;onlLeave=async function(){try{const r=NET.room;if(r&&r.state=='playing'&&FBU&&r.host!=FBU.uid&&RT.on()&&!over&&(r.size||0)==4){const s=(r.seats||r.players||[]).indexOf(FBU.uid);if(s>0){FB.D.push(RT.ref(r.id+'/moves'),{by:FBU.uid,seat:s,t:'bye',t0:Date.now()}).catch(()=>{});FB.D.remove(RT.ref(r.id+'/ping/'+FBU.uid)).catch(()=>{})}}}catch(e){}return _ol.apply(this,arguments)};
})();

;
/* ==== v47js ==== */

/* v47: si la mesa queda sin alto para sus cartas (Safari chico, en línea), compactar al rival y volver a medir */
(function(){if(typeof gameFit!='function')return;const G=gameFit;const room=()=>{const m=document.querySelector('#seats .mid');return m?m.clientHeight:999};
if(typeof fitTable=='function'){const F=fitTable;fitTable=function(){const r=F.apply(this,arguments);try{const m=document.querySelector('#seats .mid'),els=[...document.querySelectorAll('#tb .c')];if(m&&els.length){const mh=m.clientHeight,rows=Math.max(1,new Set(els.map(e=>Math.round(e.getBoundingClientRect().top))).size),h0=els[0].getBoundingClientRect().height,av=Math.floor((mh-4-(rows-1)*6)/rows);if(h0>av&&av>=22){const w=Math.round(av/1.47);els.forEach(e=>{e.style.setProperty('width',w+'px','important');e.style.setProperty('height',av+'px','important')})}}}catch(e){}return r}}
gameFit=function(){const b=document.body;b.classList.remove('gtop');const r=G.apply(this,arguments);try{if($('app').style.display=='block'&&N==2&&room()<64){b.classList.add('gtop');try{G.apply(this,arguments)}catch(e){}b.classList.add('gtop')}fitTable()}catch(e){}return r}})();

;
/* ==== v48av ==== */

/* ===== v48: personajes de la Aventura con avatar nuevo (av6/) ===== */
(function(){const L=['p_doctor','p_viejo','p_negro','p_gigi','p_nene','p_richi','p_richo','p_tox1','p_tox2','p_tox3','p_moreno','p_okeyner'];
 L.forEach(k=>{try{AVAI.add(k);AVIMG[k]='av6/'+k+'.webp?v=48'}catch(e){}})})();

;
/* ==== v49emo ==== */

/* ===== v49: emojis y mensajes con dibujo FLUX (em7/) ===== */
const E7={"😂": "em00", "👏": "em01", "😡": "em02", "🐸": "em03", "🎃": "em04", "👻": "em05", "🦇": "em06", "🕷️": "em07", "🧛": "em08", "🧟": "em09", "😎": "em10", "🤯": "em11", "🥶": "em12", "🙏": "em13", "💀": "em14", "🤝": "em15", "😴": "em16", "🎉": "em17", "🍀": "em18", "🫡": "em19", "👀": "em20", "🤡": "em21", "😱": "em22", "🥳": "em23", "🤑": "em24", "😈": "em25", "🔥 ¡Caída!": "ms00", "🤥 ¡Mentiroso!": "ms01", "✌️ ¡2 brincos!": "ms02", "👑 ¡Rey de la mesa!": "ms03", "😏 ¡Te la canté!": "ms04", "🤫 ¡Shhh!": "ms05", "🎯 ¡Caída segura!": "ms06", "🙌 ¡Mesa limpia!": "ms07", "ERES BURDA E 🐀": "ms08", "BULDA E PASAO 😮‍💨": "ms09", "¡BUUU! 👻": "ms10", "¿DULCE O TRUCO? 🎃": "ms11", "TE VOY A CHUPAR LA SANGRE 🧛": "ms12", "CÁLLATE 🐸": "ms13", "PÍCALE UNA 🍰": "ms14", "HAJAJAJAJAJJAJAA 🤣🤣🤣": "ms15", "¡QUÉ CHÉVERE! 😎": "ms16", "¡ESO NO SE HACE, VALE! 😤": "ms17", "PA' LA CASA 🏠": "ms18", "¡ME QUEMÉ! 🥵": "ms19", "GRACIAS PAPITO 🥰": "ms20", "NO PIENSES MUCHO, NADA VA A CAMBIAR 🤣🤣": "ms21", "🧪 ¡Pionero de Caída!": "ms22", "¡TENÉIS RAZÓN!!": "ms24", "EPA CHAMO 👋🏾": "ms28", "QUÉ LADILLA 😒": "ms29", "ARRÓPATE 🛌": "ms30", "ESO ES PA' HOY 🔥": "ms31", "¡QUÉ NIVEL! 💯": "ms32"};
(function(){
 const src=t=>'em7/'+E7[t]+'.webp?v=49';
 const cap=t=>t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]/gu,'').trim();
 window.e7img=(t,z)=>E7[t]?`<img class="e7i" src="${src(t)}" width="${z}" height="${z}" alt="" draggable="false" decoding="async">`:'';
 window.e7cap=t=>{const c=cap(t);return c?`<small class="e7c">${c}</small>`:''};
 const _rE=renderEm;renderEm=function(){const r=_rE.apply(this,arguments);try{document.querySelectorAll('#em button[data-e]').forEach(b=>{const t=b.dataset.e;if(!E7[t])return;b.innerHTML=e7img(t,34);b.classList.add('e7b');b.title=cap(t)||t})}catch(e){}return r};
 const _em=emote;emote=function(p,t){const r=_em.apply(this,arguments);try{if(E7[t]){const B=document.querySelectorAll('body>.bub.emf');const e=B[B.length-1];if(e&&e.textContent==t){e.innerHTML=e7img(t,72)+e7cap(t);e.classList.add('e7f');e.style.background='';const q=emPos(p,e.offsetWidth||90,e.offsetHeight||90);e.style.left=q.x+'px';e.style.top=q.y+'px'}}}catch(x){}return r};
 const _ph=prevHTML;prevHTML=function(t,id){if(t=='emo'&&E7[id])return `<span class="emp e7p lv${emoLv(id)}">${e7img(id,60)}${e7cap(id)}</span>`;return _ph.apply(this,arguments)};
 try{renderEm()}catch(e){}
})();

;
/* ==== v51js ==== */

/* v51: avatares de personajes solo en sus mesas (y no se venden: AVP 'v') · El Llano -> Elorza */
(function(){try{const S=(id,ci,av)=>{const a=ADVS.find(x=>x.id==id);if(a&&a.cos[ci])a.cos[ci].av=av};
const L=ADVS.find(x=>x.id=='llano');if(L)L.pl='Elorza';
S('guanare',0,'p_llanero');S('eltocuyo',0,'p_gaitero');S('caricuao',1,'p_moreno');
S('santiago',0,'p_futbolista');S('santiago',1,'p_dj');S('guayaquil',1,'p_cyber');S('miami',0,'p_cyber');S('doral',1,'p_valquiria');
}catch(e){console.warn('v51',e)}})();

;
/* ==== v52js ==== */

/* ===== v52 · rendimiento: medidor liviano, modo Rendimiento automático, reporte y IA en segundo plano ===== */
(function(){
const inGame=()=>{const a=document.getElementById('app');return !!a&&a.style.display=='block'};
/* fondo quieto en la partida */
setInterval(()=>{try{document.body.classList.toggle('g52',inGame())}catch(e){}},500);

/* --- medidor: 2 s de cuadros cada 15 s en la partida (antes contaba cuadros todo el tiempo) --- */
const PF=window.PF52={s:[],lt:0,boot:0,ai:[]};
try{new PerformanceObserver(l=>{for(const e of l.getEntries())if(e.duration>=100)PF.lt++}).observe({type:'longtask'})}catch(e){}
try{const t0=performance.now(),w=()=>{const m=document.getElementById('menu');if(m&&m.offsetParent){PF.boot=Math.round(performance.now());return}if(performance.now()-t0<30000)setTimeout(w,100)};w()}catch(e){}
function sample(ms){return new Promise(res=>{let n=0,t0=0,last=0,mx=0;const f=t=>{if(!t0){t0=last=t;requestAnimationFrame(f);return}n++;mx=Math.max(mx,t-last);last=t;if(t-t0<ms&&!document.hidden)requestAnimationFrame(f);else res({fps:n*1000/Math.max(1,t-t0),mx:Math.round(mx)})};requestAnimationFrame(f)})}
let run=0;
setInterval(async()=>{if(run||document.hidden||!inGame())return;run=1;try{const lt0=PF.lt;const r=await sample(2000);if(document.hidden||!inGame())return;r.lt=PF.lt-lt0;r.fps=Math.round(r.fps);PF.s.push(r);if(PF.s.length>12)PF.s.shift();decide();report()}catch(e){}finally{run=0}},15000);

/* --- modo Rendimiento automático --- */
function decide(){try{if(store.perf&&store.perf!='auto')return;if(perfLow())return;const L=PF.s.slice(-3);if(L.length<2)return;const bad=L.filter(x=>x.fps<40||x.mx>250||x.lt>=2).length;
 if(bad>=2){store.perfAuto='low';PERF.decided=true;save();perfApply();toast('⚡ Activamos el modo rendimiento para que el juego vaya más fluido')}}catch(e){}}
/* teléfono muy justo (≤2 GB de RAM o ≤2 núcleos): empieza en Rendimiento */
try{if((!store.perf||store.perf=='auto')&&store.perfAuto==null){const dm=navigator.deviceMemory||8,hc=navigator.hardwareConcurrency||8;if(dm<=2||hc<=2){store.perfAuto='low';save();perfApply()}}}catch(e){}

/* --- reporte (1 vez por versión y teléfono, solo números): llega a «bugs» con cat Rendimiento --- */
function report(){try{if(store.pf52v==GAME_VER||PF.s.length<4||!window.FBU||!fbOk())return;store.pf52v=GAME_VER;save();
 const F=PF.s.map(x=>x.fps).sort((a,b)=>a-b),med=F[Math.floor(F.length/2)],ai=PF.ai.slice().sort((a,b)=>a-b);
 const txt='⚡ fps '+med+' (mín '+F[0]+') · tirón máx '+Math.max(...PF.s.map(x=>x.mx))+' ms · tareas largas '+PF.s.reduce((a,x)=>a+x.lt,0)+' · arranque '+PF.boot+' ms · IA '+(ai.length?ai[Math.floor(ai.length/2)]+' ms':'-')+(AIW.ok()?' (en 2.º plano)':' (sin worker)')+' · RAM '+(navigator.deviceMemory||'?')+' GB · núcleos '+(navigator.hardwareConcurrency||'?')+' · '+(perfLow()?'modo rendimiento':'modo normal')+' · '+N+' jug';
 const r={uid:FBU.uid,name:store.name||'Jugador',cat:'Rendimiento',text:txt.slice(0,800),t:Date.now(),...(typeof bugInfo=='function'?bugInfo():{})};
 FB.F.addDoc(FB.F.collection(FB.db,'bugs'),r).catch(()=>{})}catch(e){}}
window.pf52Send=()=>{store.pf52v=null;report()};

/* --- IA en segundo plano (Web Worker). Hoy elige la carta que más se lleva; ahí irá la IA Experto. --- */
const SRC=`const ORD=${JSON.stringify(ORD)};
function capSize(T,n){if(!T.includes(n))return 0;let k=ORD.indexOf(n)+1,s=2;while(k<10&&T.includes(ORD[k])){s++;k++}return s}
const OPS={best(s){let id=null,bs=0;for(const c of s.h){const z=capSize(s.t,c.n);if(z>bs){bs=z;id=c.id}}return {id,s:bs}}};
onmessage=e=>{const {k,op,s}=e.data;let r=null;try{r=OPS[op](s)}catch(x){r=null}postMessage({k,r})}`;
const AIW=window.AIW=(function(){let w=null,k=0;const q=new Map();
 function get(){if(w===false)return null;if(w)return w;try{w=new Worker(URL.createObjectURL(new Blob([SRC],{type:'text/javascript'})));w.onmessage=e=>{const f=q.get(e.data.k);if(f){q.delete(e.data.k);f(e.data.r)}};w.onerror=()=>{w=false;q.forEach(f=>f(undefined));q.clear()}}catch(e){w=false}return w||null}
 return {ok:()=>!!get(),run(op,s,ms){return new Promise(res=>{const W=get();if(!W)return res(undefined);const id=++k,t0=performance.now();const to=setTimeout(()=>{if(q.has(id)){q.delete(id);res(undefined)}},ms||300);q.set(id,r=>{clearTimeout(to);PF.ai.push(Math.round(performance.now()-t0));if(PF.ai.length>40)PF.ai.shift();res(r)});W.postMessage({k:id,op,s})})}}})();
const key=h=>h.map(c=>c.id).join(',')+'|'+(table||[]).map(c=>c.id).join(',');
if(typeof botPlay2=='function'){const B2=botPlay2;botPlay2=function(bp){if(over||!hands[bp]||!hands[bp].length||!AIW.ok())return B2.apply(this,arguments);const h=hands[bp],k0=key(h),a=arguments,me=this;
 AIW.run('best',{t:(table||[]).map(c=>c.n),h:h.map(c=>({id:c.id,n:c.n}))}).then(r=>{if(over)return;if(key(hands[bp]||[])!==k0){if(turn===bp&&hands[bp]&&hands[bp].length)B2.apply(me,a);return}window._aiB=r?{k:k0,id:r.id,s:r.s}:null;B2.apply(me,a)})}}
})();

;
/* ==== v53js ==== */

/* ===== v53 · guardado en el teléfono: el sw.js nuevo guarda todo y el juego abre sin esperar internet ===== */
(function(){if(!('serviceWorker' in navigator)||!/^http/.test(location.protocol))return;
const SW=window.SW53={have:0,total:0,ver:''};
navigator.serviceWorker.addEventListener('message',e=>{const d=e.data||{};
 if(d.t=='fill'){SW.have=d.done;SW.total=d.total;if(d.fin&&d.total&&d.done>=d.total*0.95&&!store.sw53ok){store.sw53ok=1;save();try{toast('📦 Caída quedó guardado en el teléfono: ya abre sin internet')}catch(x){}}}
 if(d.t=='info'){SW.have=d.have;SW.total=d.total;SW.ver=d.ver}
 if(d.t=='sw'){SW.ver=d.ver;try{setTimeout(updCheck,1500)}catch(x){}}});
const ask=()=>{try{const c=navigator.connection;if(c&&c.saveData)return;navigator.serviceWorker.ready.then(r=>{if(r.active)r.active.postMessage({t:'fill'})}).catch(()=>{})}catch(e){}};
window.sw53Info=()=>navigator.serviceWorker.ready.then(r=>r.active&&r.active.postMessage({t:'info'}));
if(document.readyState=='complete')setTimeout(ask,8000);else window.addEventListener('load',()=>setTimeout(ask,8000));
setInterval(()=>{if(!document.hidden&&navigator.onLine!==false)ask()},10*60*1000);
})();
