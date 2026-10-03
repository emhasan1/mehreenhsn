const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav=document.querySelector('.nav');
const orbit=document.querySelector('.creative-orbit');
let scheduled=false;
function updateScroll(){nav.classList.toggle('scrolled',scrollY>90);if(!reduceMotion)orbit.style.setProperty('--scroll',Math.min(scrollY*.12,85)+'px');scheduled=false;}
addEventListener('scroll',()=>{if(!scheduled){requestAnimationFrame(updateScroll);scheduled=true;}},{passive:true});updateScroll();
if(!reduceMotion&&'IntersectionObserver' in window){document.documentElement.classList.add('motion');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
document.querySelector('#year').textContent=new Date().getFullYear();
