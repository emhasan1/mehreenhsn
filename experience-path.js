(()=>{
 const section=document.querySelector('#experience'),track=section.querySelector('.career-track'),scroller=section.querySelector('.career-scroll'),face=section.querySelector('.career-traveler');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 section.querySelectorAll('.path-stop').forEach(stop=>{
  const button=stop.querySelector('.company-toggle'),detail=stop.querySelector('.company-detail');let pinned=false;
  const show=open=>{stop.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open));detail.inert=!open};
  stop.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')show(true)});
  stop.addEventListener('pointerleave',()=>{if(!pinned&&!stop.contains(document.activeElement))show(false)});
  button.addEventListener('focus',()=>show(true));
  stop.addEventListener('focusout',e=>{if(!pinned&&!stop.contains(e.relatedTarget))show(false)});
  button.addEventListener('click',()=>{pinned=!pinned;show(pinned)});
  stop.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=false;show(false)}});
 });
 let started=false,following=true;
 ['pointerdown','wheel','keydown','touchstart'].forEach(type=>scroller.addEventListener(type,()=>following=false,{passive:true}));
 function travel(){if(started)return;started=true;if(reduced){face.classList.add('has-arrived');return}
  face.classList.add('is-moving');let start;
  function step(now){if(!start)start=now;const t=Math.min((now-start)/5500,1),e=t*t*(3-2*t),pos=8.333+83.334*e;face.style.left=pos+'%';
   if(following&&scroller.scrollWidth>scroller.clientWidth)scroller.scrollLeft=Math.max(0,track.clientWidth*pos/100-scroller.clientWidth/2);
   if(t<1)requestAnimationFrame(step);else{face.classList.remove('is-moving');face.classList.add('has-arrived');face.setAttribute('aria-label','A happy face at Global Money Express')}
  }requestAnimationFrame(step);
 }
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){travel();observer.disconnect()}},{threshold:.3});observer.observe(track)}else travel();
})();
