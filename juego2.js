/* ==== v58js ==== */

/* ===== v58: Modo Batalla «Pronto» ===== */
const B58P=[
 ['Ronda',[['filo','Filo','Cada ronda del combo hace +1 de daño.'],['asronda','As de ronda','Si completas tu ronda de 1 y capturas: mesa limpia y te llevas todas las cartas.'],['corona','Corona','Tu ronda de rey vale el doble.']]],
 ['Patrulla',[['reloj','Reloj','El rival tiene 5 s para cantar; si no canta, se le quema.'],['barrido','Barrido','Daño completo al rival elegido y 2 al otro.'],['emboscada','Emboscada','El próximo rival que cante en esa mano recibe 3 de daño.']]],
 ['Vigía',[['vigilante','Vigilante','Ves 1 carta del rival.'],['centinela','Centinela','Las caídas que te hagan en esa mano no valen.'],['alarma','Alarma','Si la carta que vas a tirar le da caída al rival, te avisa antes.']]],
 ['Registro',[['escudo','Escudo','Anula el siguiente poder del rival.'],['inventario','Inventario','Ves la mano completa de un rival.'],['sello','Sello','Tu próximo canto no se puede anular.'],['contraataque','Contraataque','El próximo que te haga daño recibe 3.'],['caidadoble','Caída doble','Tus caídas en esa mano valen el doble.']]],
 ['Casa chica',[['caidafuerte','Caída fuerte','Tu próxima caída vale el doble.'],['refugio','Refugio','Te curas 5.'],['vecinos','Vecinos','3 de daño a los rivales de tu izquierda y de tu derecha.']]],
 ['Casa grande',[['fortaleza','Fortaleza','No recibes daño hasta tu próximo turno.'],['mansion','Mansión','Tu vida máxima sube a 60.'],['sincaidas','Sin caídas','Las caídas del rival en esa mano no valen.']]],
 ['Flor',[['candado','Candado','El siguiente canto del rival elegido no vale.'],['perfume','Perfume','Te curas 8.'],['espinas','Espinas','Quien te haga caída recibe 3.']]],
 ['Flor patrulla',[['tormenta','Tormenta','4 de daño a todos los rivales.'],['estampida','Estampida','5 de daño y el rival pierde su combo.'],['limpieza','Limpieza','Tus mesas limpias en esa mano valen el doble.']]],
 ['Flor registro',[['revivir','Revivir','Tu compañero vuelve con 15 de vida.'],['doble','Doble','Tu siguiente canto vale el doble.'],['renacer','Renacer','Si llegas a 0, vuelves con 20 (1 vez).']]],
 ['Trivilín',[['triple','Triple','Tu próxima caída vale el triple.'],['cero','Cero','Las caídas y mesas limpias de los rivales en esa mano no valen.'],['reymesa','Rey de la mesa','Tu próxima mesa limpia te cura lo mismo que daña.']]]
];
const B58I=id=>`pw6/${id}.webp?v=58`;
function b58Modal(html){let d=document.getElementById('b58m');if(!d){d=document.createElement('div');d.id='b58m';d.onclick=e=>{if(e.target==d)d.remove()};document.body.appendChild(d)}d.innerHTML=`<div class="gbox">${html}</div>`;return d}
function b58Close(){const d=document.getElementById('b58m');if(d)d.remove()}

/* 1 · Crear mesa: Modo de juego */
function b58Soon(){b58Modal(`<div class="b58icrow"><img src="${B58I('barrido')}" alt=""><img src="${B58I('escudo')}" alt=""><img src="${B58I('tormenta')}" alt=""></div><div class="b58ti">⚔️ Modo Batalla</div><p class="sub">¡Pronto! La misma Caída de siempre, pero tus puntos le quitan vida al rival y tus cantos llevan poderes.</p><button class="mb bk" onclick="b58Close()">Entendido</button>`)}
{const _o=onlineHTML;onlineHTML=function(bk){let h=_o(bk);try{const k='<h3 class="st">➕ Crear mesa</h3><div class="box">';if(h.includes(k)&&!NET._tr)h=h.replace(k,k+`<div class="b58mode"><b>🎮 Modo de juego</b><div class="seg"><button class="on">🃏 Tradicional</button><button class="b58soon" onclick="b58Soon()">⚔️ Batalla<span class="b58pr">PRONTO</span></button></div></div>`)}catch(e){}return h}}

/* 2 · Aventura: Pronto nuevas recompensas + vitrina de poderes */
function b58Vit(){return `<div class="box b58nx"><div class="b58h">🎁 Pronto: nuevas recompensas</div><p>Vuelve a vencer a los <b>jefes</b> de la Aventura para ganar <b>poderes</b>, aunque ya tengas sus ⭐.</p><p>Los poderes solo se usan en mesas en modo <b>⚔️ Batalla</b>.</p></div>`
 +`<div class="b58v"><b>✨ Vitrina de poderes <span class="b58pr">PRONTO</span><small class="b58sw">Desliza ›</small></b><div class="b58s">`+B58P.map(([g,L])=>L.map(([id,n])=>`<button class="b58p" onclick="b58Pow('${id}')"><i>🔒</i><img src="${B58I(id)}" alt="" loading="lazy" decoding="async"><small>${n}</small><em>${g}</em></button>`).join('')).join('')+`</div></div>`}
function b58Pow(id){let G='',P=null;B58P.forEach(([g,L])=>L.forEach(x=>{if(x[0]==id){G=g;P=x}}));if(!P)return;
 const once=['Casa chica','Casa grande','Flor patrulla','Flor registro','Trivilín'].includes(G);
 b58Modal(`<div class="b58ic"><img src="${B58I(id)}" alt=""></div><div class="b58ti">${P[1]}</div><p class="sub">Poder de <b>${G}</b> · ${once?'1 vez por partida':'1 vez por mano'}</p><div class="b58tx">${P[2]}<br><br>🔓 Se gana venciendo otra vez a un jefe de la Aventura.<br>⚔️ Solo en mesas en modo Batalla.<br>🃏 Se activa al cantar <b>${G.toLowerCase()}</b> de verdad.</div><button class="mb bk" onclick="b58Close()">Cerrar</button>`)}
{const _a=advHTML;advHTML=function(bk){let h=_a(bk);try{const k='<p class="sb">',i=h.indexOf(k),j=i<0?-1:h.indexOf('</p>',i);if(j>0)h=h.slice(0,j+4)+b58Vit()+h.slice(j+4);else h+=b58Vit()}catch(e){}return h}}

/* 3 · Aprender: tutorial del Modo Batalla */
const B58T=[
 ['⚔️ Modo Batalla','burst',`Es la <b>misma Caída</b>: mismas cartas, mesa, cantos y reglas.<br>Lo que cambia: <b>tus puntos le quitan vida</b> al rival. Gana el último que queda en pie.`],
 ['❤️ Vida','',`<div class="b58bars"><div class="b58bar"><span>Tú</span><div><i style="width:100%"></i></div>50</div><div class="b58bar"><span>Rival 1</span><div><i style="width:64%"></i></div>32</div><div class="b58bar low"><span>Rival 2</span><div><i style="width:16%"></i></div>8</div></div>Cada jugador empieza con <b>50 de vida</b>. Arriba de la mesa ves las barras de todos.<br>Si nadie cae, a los <b>10 minutos</b> gana quien tenga más vida.`],
 ['💥 Daño','',`Todo lo que sumaría puntos ahora hace daño:<ul style="margin:6px 0 0 18px;padding:0"><li><b>Caída</b>: sus puntos, al que tiró la carta.</li><li><b>Mesa limpia</b>: 4.</li><li><b>Canto</b>: lo que vale el canto que gana la mano.</li></ul>`],
 ['🔥 Combos','',`Si cantas el <b>mismo canto seguido</b>, pega más fuerte:<ul style="margin:6px 0 0 18px;padding:0"><li>2.º seguido: <b>+1</b> de daño.</li><li>3.º seguido: <b>el doble</b>.</li></ul>Si cantas otro canto, el combo se corta.`],
 ['🎯 ¿A quién le pegas?','',`<div class="b58bars"><div class="b58bar"><span>Rival 1</span><div><i style="width:64%"></i></div>32</div><div class="b58bar tg low"><span>🎯 Rival 2</span><div><i style="width:16%"></i></div>8</div></div><b>Toca la barra</b> de un rival para que tu daño vaya a él.<br>Si no eliges, va al que tenga <b>menos vida</b>. En parejas, pónganse de acuerdo.`],
 ['✨ Poderes','pw',`Antes de jugar pones <b>1 poder en hasta 3 cantos</b>.<br>El poder se activa <b>solo si cantas de verdad</b> (con mentira no).<br>Ronda, patrulla, vigía, registro y flor: 1 vez por mano. Casas, flor patrulla, flor registro y trivilín: 1 vez por partida.<br>Se ganan venciendo otra vez a los <b>jefes</b> de la Aventura.`]
];
function b58Tut(n){n=Math.max(0,Math.min(B58T.length-1,n|0));const [t,ic,tx]=B58T[n],last=n==B58T.length-1;
 const top=ic=='pw'?`<div class="b58icrow"><img src="${B58I('corona')}" alt=""><img src="${B58I('escudo')}" alt=""><img src="${B58I('perfume')}" alt=""></div>`:ic?`<div class="b58ic">${I(ic)}</div>`:'';
 b58Modal(`${top}<div class="b58ti">${t}</div><div class="b58tx">${tx}</div><div class="b58dots">${B58T.map((_,k)=>`<i class="${k==n?'on':''}"></i>`).join('')}</div><div class="b58nav">${n?`<button class="mb bk" onclick="b58Tut(${n-1})">‹ Atrás</button>`:`<button class="mb bk" onclick="b58Close()">Cerrar</button>`}${last?`<button class="mb" onclick="b58Close();try{store.b58tut=1;save()}catch(e){}toast('⚔️ ¡Pronto podrás jugarlo!')">¡Listo!</button>`:`<button class="mb" onclick="b58Tut(${n+1})">Siguiente ›</button>`}</div><p class="sub" style="margin:8px 0 0">${n+1} de ${B58T.length} · <span class="b58pr">PRONTO</span></p>`)}


;
/* ==== v60fg6 ==== */

/* ===== v60: figuras con su pinta a la vista (FLUX, servidor\pn5) ===== */
(function(){const V='?v=60';
 try{FIGI['12_1']='fg6/k12_1.webp'+V}catch(e){}            /* clásico: rey de copas con su copa */
 try{['10_0','11_0','12_0','11_3'].forEach(k=>CF5.f[k]='fg6/f'+k+'.webp'+V)}catch(e){}  /* cartoon: oros al lado, caballo con basto */
})();

;
/* ==== v61js ==== */

/* ===== v61: enlaces a Privacidad y Borrar cuenta en Ajustes (lo pide AdSense / Play) ===== */
{const _s=settingsHTML;settingsHTML=function(){let h=_s.apply(this,arguments);try{h+='<div class="box" style="text-align:center;font-size:14px"><a href="privacidad.html" target="_blank" rel="noopener" style="color:#ffd84a;font-weight:800">📄 Política de privacidad</a> · <a href="borrar-cuenta.html" target="_blank" rel="noopener" style="color:#ffd84a;font-weight:800">🗑️ Borrar mi cuenta</a></div>'}catch(e){}return h}}
