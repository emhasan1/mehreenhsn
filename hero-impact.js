(()=>{
 const strip=document.querySelector('.impact-strip');
 if(!strip||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
 strip.classList.add('impact-animate');
 const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();strip.classList.add('is-visible');
  const counts=[...strip.querySelectorAll('[data-count]')];const start=performance.now();
  function frame(now){const t=Math.min((now-start)/1500,1),ease=1-Math.pow(1-t,3);counts.forEach(el=>el.textContent=Math.round(Number(el.dataset.count)*ease));if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);
 },{threshold:.25});observer.observe(strip);
})();
