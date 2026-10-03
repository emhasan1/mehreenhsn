const car=document.querySelector('.car-control');
const lane=document.querySelector('.drive-lane');
const tiles=[...document.querySelectorAll('.tool-tile')];
let driving=false;
car.addEventListener('click',async()=>{
 if(driving)return;driving=true;car.setAttribute('aria-disabled','true');
 const distance=innerWidth-car.getBoundingClientRect().left+car.offsetWidth+200;
 if(reduceMotion){car.querySelector('.car-hint').firstChild.textContent='Vroom! ';await new Promise(r=>setTimeout(r,700));car.querySelector('.car-hint').firstChild.textContent='Click on it ';}
 else{
  car.classList.add('driving');
  const ride=car.animate([{transform:'translateX(0) rotate(0)'},{transform:`translateX(${distance*.08}px) rotate(-2deg)`,offset:.2},{transform:`translateX(${distance}px) rotate(0)`}],{duration:2350,easing:'cubic-bezier(.55,.02,.78,.65)',fill:'forwards'});
  const gusts=tiles.map((tile,i)=>{const saved='tool-float 5s ease-in-out infinite';const timer=setTimeout(()=>{tile.style.animation='none';const gust=tile.animate([{transform:'translate(0,0) rotate(0)'},{transform:`translate(${55+i*9}px,${-28-i*7}px) rotate(${15+i*5}deg)`,offset:.32},{transform:'translate(-9px,4px) rotate(-5deg)',offset:.72},{transform:'translate(0,0) rotate(0)'}],{duration:1350,easing:'cubic-bezier(.2,.65,.3,1)'});gust.finished.then(()=>tile.style.animation=saved);},500+i*145);return timer;});
  await ride.finished;car.classList.remove('driving');
  const returnRide=car.animate([{transform:'translateX(-420px)',opacity:0},{transform:'translateX(0)',opacity:1}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});ride.cancel();await returnRide.finished;returnRide.cancel();
 }
 driving=false;car.removeAttribute('aria-disabled');
});
if(matchMedia('(pointer:fine)').matches&&!reduceMotion){
 const cursor=document.querySelector('.custom-cursor'),ring=document.querySelector('.cursor-ring');let x=-80,y=-80,rx=-80,ry=-80,raf=0;
 function follow(){rx+=(x-rx)*.2;ry+=(y-ry)*.2;cursor.style.transform=`translate(${x-3}px,${y-3}px)`;ring.style.transform=`translate(${rx-ring.offsetWidth/2}px,${ry-ring.offsetHeight/2}px)`;if(Math.abs(rx-x)+Math.abs(ry-y)>.2)raf=requestAnimationFrame(follow);else raf=0;}
 addEventListener('pointermove',e=>{document.body.classList.add('cursor-ready');x=e.clientX;y=e.clientY;const active=!!e.target.closest('a,button,.tool-tile');cursor.classList.toggle('active',active);ring.classList.toggle('active',active);if(!raf)raf=requestAnimationFrame(follow);},{passive:true});
 document.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-ready'));
}

