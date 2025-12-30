document.addEventListener('DOMContentLoaded', ()=>{
  const open = document.getElementById('openForm');
  const modal = document.getElementById('modal');
  const close = document.getElementById('closeModal');
  const form = document.getElementById('loanForm');
  const status = document.getElementById('status');

  open.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','false'); status.textContent=''; });
  close.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); });
  modal.addEventListener('click', (e)=>{ if(e.target===modal) modal.setAttribute('aria-hidden','true'); });

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    status.textContent='Envoi en cours...';
    const amount = document.getElementById('amount').value;
    const email = document.getElementById('email').value;

    try{
      const res = await fetch('/send', {
        method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,email})
      });
      const data = await res.json();
      if(res.ok){
        status.textContent = 'Demande envoyée — nous vous contacterons par e-mail.';
        form.reset();
      } else {
        status.textContent = data?.error || 'Erreur lors de l\'envoi.';
      }
    }catch(err){
      status.textContent = 'Impossible de joindre le serveur.';
    }
  });
});