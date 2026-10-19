(() => {
  'use strict';
  const stage=document.getElementById('phone-stage');
  const cards=[...stage.querySelectorAll('[data-phone]')];
  const controls=[...document.querySelectorAll('[data-focus]')];
  const frames=Object.fromEntries(cards.map(card=>[card.dataset.phone,card.querySelector('iframe')]));
  let active='dark';
  function focusPhone(theme){
    if(theme!=='dark'&&theme!=='light')return;
    active=theme;
    cards.forEach(card=>{
      const front=card.dataset.phone===active;
      card.classList.toggle('is-front',front);
      card.classList.toggle('is-back',!front);
      card.setAttribute('aria-label',card.dataset.phone+' phone, '+(front?'interactive in front':'tap to bring to front'));
    });
    controls.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.focus===active)));
  }
  function swap(){focusPhone(active==='dark'?'light':'dark');}
  cards.forEach(card=>card.addEventListener('click',()=>{
    if(card.dataset.phone!==active)focusPhone(card.dataset.phone);
  }));
  controls.forEach(button=>button.addEventListener('click',()=>focusPhone(button.dataset.focus)));
  let start=null;
  stage.addEventListener('pointerdown',e=>{
    if(e.target.closest('iframe'))return;
    start={x:e.clientX,y:e.clientY};
  });
  stage.addEventListener('pointerup',e=>{
    if(!start)return;
    const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;
    if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.3)swap();
  });
  stage.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();swap();}
  });
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin||event.data?.type!=='swift-gesture')return;
    if(event.source!==frames[active]?.contentWindow)return;
    swap();
  });
  document.getElementById('restart').addEventListener('click',()=>{
    for(const [theme,frame] of Object.entries(frames)){
      frame.src='./experience.html?handset=1&theme='+theme+'&restart='+Date.now();
    }
    focusPhone('dark');
  });
  focusPhone('dark');
})();