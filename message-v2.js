(()=>{
 const panel=document.querySelector('.message-panel'),launcher=document.querySelector('.message-launcher');
 const form=panel.querySelector('form'),send=form.querySelector('.message-send'),status=form.querySelector('.message-status');
 let busy=false;
 // Public Web3Forms routing key, never a private credential.
 const accessKey='63eef5cd-f4c4-4b07-9a77-af99a47e9e4a';
 function close(focus=true){panel.hidden=true;launcher.setAttribute('aria-expanded','false');if(focus)launcher.focus()}
 launcher.addEventListener('click',()=>{if(!panel.hidden)return close();panel.hidden=false;launcher.setAttribute('aria-expanded','true');form.elements.name.focus()});
 panel.querySelector('.message-close').addEventListener('click',()=>close());
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)close()});
 document.addEventListener('pointerdown',e=>{if(!panel.hidden&&!panel.contains(e.target)&&!launcher.contains(e.target))close(false)});
 // Discard legacy browser drafts without reading or transmitting them.
 try{localStorage.removeItem('mehreen-message-drafts')}catch{}
 panel.querySelector('.message-mail').href='mailto:mehreenhsnn@gmail.com';
 form.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');if(!busy)status.textContent=''});
 form.addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;
  for(const field of [form.elements.name,form.elements.email,form.elements.message]){field.value=field.value.trim();field.setCustomValidity(field.value?'':'Please complete this field.')}
  if(!form.reportValidity())return;
  if(form.elements.botcheck.checked)return;
  if(!accessKey){status.textContent='Messaging is being connected. Please use Or open mail for now.';return}
  busy=true;send.disabled=true;form.setAttribute('aria-busy','true');send.firstChild.textContent='Sending… ';status.textContent='';
  const fields=[form.elements.name,form.elements.email,form.elements.message];
  const payload={access_key:accessKey,name:fields[0].value,email:fields[1].value,message:fields[2].value,subject:'New portfolio message',from_name:'Mehreen portfolio',botcheck:false};
  fields.forEach(f=>f.readOnly=true);
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{
   const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},credentials:'omit',referrerPolicy:'no-referrer',body:JSON.stringify(payload),signal:controller.signal});
   const result=await response.json();
   if(!response.ok||result.success!==true)throw new Error('Submission failed');
   form.reset();status.textContent='Message sent. Thanks for saying hello!';
  }catch(error){status.textContent=error.name==='AbortError'?'The request timed out, so delivery could not be confirmed. Please wait before retrying, or open mail.':'Your message could not be sent. Please try again or open mail.'}
  finally{clearTimeout(timeout);busy=false;send.disabled=false;form.removeAttribute('aria-busy');send.firstChild.textContent='Send ';fields.forEach(f=>f.readOnly=false)}
 });
})();
