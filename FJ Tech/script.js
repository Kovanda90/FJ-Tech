document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const msg = document.getElementById('form-message');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      msg.textContent = 'Děkujeme za zprávu! Ozveme se vám co nejdříve.';
      msg.style.display = 'block';
      form.reset();
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    });
  }
}); 