if(!reduceMotion&&matchMedia('(pointer:fine)').matches){
 document.querySelectorAll('.project-art,.case-cover').forEach(surface=>{
  let raf=0,px=0,py=0;
  surface.addEventListener('pointermove',e=>{const b=surface.getBoundingClientRect();px=((e.clientX-b.left)/b.width-.5)*7;py=-((e.clientY-b.top)/b.height-.5)*7;if(!raf)raf=requestAnimationFrame(()=>{surface.style.setProperty('--rx',py+'deg');surface.style.setProperty('--ry',px+'deg');raf=0;});},{passive:true});
  surface.addEventListener('pointerleave',()=>{if(raf)cancelAnimationFrame(raf);raf=0;surface.style.setProperty('--rx','0deg');surface.style.setProperty('--ry','0deg');});
 });
 const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,translate:'0 45px'},{opacity:1,translate:'0 0'}],{duration:900,easing:'cubic-bezier(.22,1,.36,1)'});sectionObserver.unobserve(entry.target);}}),{threshold:.3});sectionObserver.observe(folder);
}
