if(matchMedia('(pointer:fine)').matches&&!reduceMotion){
 const cursor=document.querySelector('.custom-cursor');let raf=0,x=-80,y=-80,cx=-80,cy=-80,last=0;
 function follow(now){const dt=Math.min(now-last||16,40);last=now;const ease=1-Math.exp(-dt/32);cx+=(x-cx)*ease;cy+=(y-cy)*ease;cursor.style.transform=`translate3d(${cx-7}px,${cy-4}px,0)`;if(Math.abs(cx-x)+Math.abs(cy-y)>.08)raf=requestAnimationFrame(follow);else raf=0;}
 addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;if(!document.body.classList.contains('cursor-ready')){cx=e.clientX;cy=e.clientY;}document.body.classList.add('cursor-ready');x=e.clientX;y=e.clientY;cursor.classList.toggle('active',!!e.target.closest('a,button,.game-card,summary'));const host=document.querySelector('dialog[open]')||document.body;if(cursor.parentElement!==host)host.append(cursor);if(!raf){last=performance.now();raf=requestAnimationFrame(follow);}},{passive:true});
 addEventListener('pointerdown',()=>cursor.classList.add('pressed'),{passive:true});addEventListener('pointerup',()=>cursor.classList.remove('pressed'),{passive:true});
 addEventListener('blur',()=>document.body.classList.remove('cursor-ready'));document.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-ready'));panel.addEventListener('close',()=>document.body.append(cursor));
}
