(()=>{
const board=document.querySelector('.pinboard');let top=30;
board.querySelectorAll('.board-item').forEach(item=>{
 let drag=null,blockClick=false;
 const place=(x,y)=>{const s=getComputedStyle(item),w=parseFloat(s.getPropertyValue('--w')),h=parseFloat(s.getPropertyValue('--h'));item.style.setProperty('--x',Math.max(3,Math.min(97-w,x)));item.style.setProperty('--y',Math.max(3,Math.min(97-h,y)));};
 item.addEventListener('pointerdown',e=>{if(e.button!==0)return;const s=getComputedStyle(item);drag={id:e.pointerId,px:e.clientX,py:e.clientY,x:parseFloat(s.getPropertyValue('--x')),y:parseFloat(s.getPropertyValue('--y')),moved:false};item.setPointerCapture(e.pointerId);item.style.zIndex=++top;});
 item.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.px,dy=e.clientY-drag.py;if(Math.hypot(dx,dy)>5){drag.moved=true;item.classList.add('dragging');}if(drag.moved){const r=board.getBoundingClientRect();place(drag.x+dx/r.width*100,drag.y+dy/r.height*100);}});
 const end=e=>{if(!drag||drag.id!==e.pointerId)return;blockClick=drag.moved;drag=null;item.classList.remove('dragging');if(item.hasPointerCapture(e.pointerId))item.releasePointerCapture(e.pointerId);if(blockClick)setTimeout(()=>blockClick=false,0);};
 item.addEventListener('pointerup',end);item.addEventListener('pointercancel',end);item.addEventListener('lostpointercapture',()=>{drag=null;item.classList.remove('dragging');});
 item.addEventListener('click',e=>{if(blockClick){e.preventDefault();e.stopImmediatePropagation();}},true);
 item.addEventListener('keydown',e=>{const directions={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},d=directions[e.key];if(!d)return;e.preventDefault();const s=getComputedStyle(item),step=e.shiftKey?4:1;place(parseFloat(s.getPropertyValue('--x'))+d[0]*step,parseFloat(s.getPropertyValue('--y'))+d[1]*step);});
});
const coffee=board.querySelector('.coffee-item');let steamTimer;
coffee.addEventListener('click',()=>{coffee.classList.add('steaming');clearTimeout(steamTimer);steamTimer=setTimeout(()=>coffee.classList.remove('steaming'),6500);});
})();
