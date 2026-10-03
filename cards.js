const fan=document.querySelector('.hero-fan');
if(fan&&!reduceMotion){fan.classList.add('fan-pending');const revealFan=()=>{if(scrollY>24&&fan.getBoundingClientRect().top<innerHeight*.93){fan.classList.remove('fan-pending');fan.classList.add('fan-visible');removeEventListener('scroll',revealFan);}};addEventListener('scroll',revealFan,{passive:true});revealFan();}
document.querySelectorAll('.game-card').forEach(card=>{
 if(reduceMotion)return;
 card.addEventListener('pointermove',e=>{const b=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-b.left)/b.width-.5)*22+'px');card.style.setProperty('--my',((e.clientY-b.top)/b.height-.5)*16+'px');},{passive:true});
 card.addEventListener('pointerleave',()=>{card.style.setProperty('--mx','0px');card.style.setProperty('--my','0px');});
});
const folder=document.querySelector('.case-folder'),panel=document.querySelector('#case-panel');
folder.addEventListener('click',()=>{panel.showModal();document.body.classList.add('modal-open');document.body.classList.remove('cursor-ready');panel.querySelector('.close-panel').focus();});
panel.querySelector('.close-panel').addEventListener('click',()=>panel.close());
panel.addEventListener('click',e=>{const b=panel.getBoundingClientRect();if(e.target===panel&&(e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom))panel.close();});
panel.addEventListener('close',()=>{document.body.classList.remove('modal-open');folder.focus({preventScroll:true});});
