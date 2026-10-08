// Caída: funciona sin internet y se actualiza solo cuando hay conexión
const CACHE='caida-v30';
const FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const url=new URL(r.url);
  // Servidores en línea (Firebase, Google): nunca guardar, siempre directo a internet
  if(/googleapis\.com|firebaseapp\.com|firebaseio\.com|google\.com|gstatic\.com\/firebasejs\/.*\/(?!firebase-(app|auth|firestore)\.js)/.test(url.href)&&!/fonts\.googleapis|fonts\.gstatic/.test(url.href))return;
  // Página del juego: primero internet (para recibir versiones nuevas), si no hay, la guardada
  if(r.mode==='navigate'||url.pathname.endsWith('index.html')){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put('./index.html',cp));return res}).catch(()=>caches.match('./index.html')));return}
  // Resto (íconos, letras, librerías): primero lo guardado
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp))}return res}).catch(()=>m)));
});
