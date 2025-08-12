document.addEventListener('DOMContentLoaded', function() {
  // Kontaktní formulář
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

  // Kategorizovaná galerie
  const categories = document.querySelectorAll('.category');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const currentPhoto = document.getElementById('current-photo');
  const totalPhotos = document.getElementById('total-photos');
  const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
  const closeBtn = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentCategory = '';
  let currentPhotos = [];
  let currentPhotoIndex = 0;

  // Data o fotografiích v jednotlivých kategoriích
  const categoryPhotos = {
    'cerpadlo': [
      'Foto/cerpadlo/cerpadlo.jpeg',
      'Foto/cerpadlo/cerpadlo1.jpeg'
    ],
    'podlahovka-deska': [
      'Foto/podlahovka deska/podlahovka.jpeg',
      'Foto/podlahovka deska/podlahovka1.jpeg',
      'Foto/podlahovka deska/podlahovka2.jpeg',
      'Foto/podlahovka deska/podlahovka3.jpeg',
      'Foto/podlahovka deska/podlahovka4.jpeg',
      'Foto/podlahovka deska/podlahovka5.jpeg',
      'Foto/podlahovka deska/podlahovka6.jpeg',
      'Foto/podlahovka deska/podlahovka7.jpeg',
      'Foto/podlahovka deska/podlahovka8.jpeg',
      'Foto/podlahovka deska/podlahovka9.jpeg',
      'Foto/podlahovka deska/podlahovka10.jpeg',
      'Foto/podlahovka deska/podlahovka11.jpeg',
      'Foto/podlahovka deska/podlahovka12.jpeg',
      'Foto/podlahovka deska/podlahovka13.jpeg',
      'Foto/podlahovka deska/podlahovka14.jpeg'
    ],
    'podlahovka-sucha': [
      'Foto/podlahovka sucha/podlahovka sucha.jpeg'
    ],
    'pripojka': [
      'Foto/pripojka/pripojka.jpeg',
      'Foto/pripojka/pripojka1.jpeg',
      'Foto/pripojka/pripojka2.jpeg',
      'Foto/pripojka/pripojka3.jpeg'
    ],
    'rozvody-vody': [
      'Foto/rozvody vody/rozvody.jpeg',
      'Foto/rozvody vody/rozvody1.jpeg',
      'Foto/rozvody vody/rozvody2.jpeg',
      'Foto/rozvody vody/rozvody3.jpeg',
      'Foto/rozvody vody/rozvody4.jpeg',
      'Foto/rozvody vody/rozvody5.jpeg',
      'Foto/rozvody vody/rozvody6.jpeg',
      'Foto/rozvody vody/rozvody7.jpeg',
      'Foto/rozvody vody/rozvody8.jpeg',
      'Foto/rozvody vody/rozvody9.jpeg',
      'Foto/rozvody vody/rozvody10.jpeg',
      'Foto/rozvody vody/rozvody11.jpeg',
      'Foto/rozvody vody/rozvody12.jpeg',
      'Foto/rozvody vody/rozvody13.jpeg',
      'Foto/rozvody vody/rozvody14.jpeg',
      'Foto/rozvody vody/rozvody15.jpeg'
    ],
    'stoupacky': [
      'Foto/stoupacky/stoupacky.jpeg',
      'Foto/stoupacky/stoupacky1.jpeg'
    ],
    'vybaveni': [
      'Foto/vybaveni/vybaveni.jpeg',
      'Foto/vybaveni/vybaveni1.jpeg',
      'Foto/vybaveni/vybaveni2.jpeg',
      'Foto/vybaveni/vybaveni3.jpeg'
    ]
  };

  // Otevření galerie kategorie
  categories.forEach(category => {
    category.addEventListener('click', function() {
      const categoryName = this.getAttribute('data-category');
      const categoryTitle = this.querySelector('h3').textContent;
      
      if (categoryPhotos[categoryName] && categoryPhotos[categoryName].length > 0) {
        openLightbox(categoryName, categoryTitle);
      }
    });
  });

  // Otevření lightboxu
  function openLightbox(category, title) {
    currentCategory = category;
    currentPhotos = categoryPhotos[category];
    currentPhotoIndex = 0;
    
    lightboxTitle.textContent = title;
    totalPhotos.textContent = currentPhotos.length;
    
    showCurrentPhoto();
    createThumbnails();
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  // Zobrazení aktuální fotky
  function showCurrentPhoto() {
    if (currentPhotos.length > 0) {
      lightboxImage.src = currentPhotos[currentPhotoIndex];
      currentPhoto.textContent = currentPhotoIndex + 1;
      updateThumbnailActive();
    }
  }

  // Vytvoření náhledů
  function createThumbnails() {
    lightboxThumbnails.innerHTML = '';
    
    currentPhotos.forEach((photo, index) => {
      const thumb = document.createElement('img');
      thumb.src = photo;
      thumb.alt = `Náhled ${index + 1}`;
      thumb.addEventListener('click', () => {
        currentPhotoIndex = index;
        showCurrentPhoto();
      });
      lightboxThumbnails.appendChild(thumb);
    });
    
    updateThumbnailActive();
  }

  // Aktualizace aktivního náhledu
  function updateThumbnailActive() {
    const thumbs = lightboxThumbnails.querySelectorAll('img');
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentPhotoIndex);
    });
  }

  // Navigace
  function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    showCurrentPhoto();
  }

  function prevPhoto() {
    currentPhotoIndex = currentPhotoIndex === 0 ? currentPhotos.length - 1 : currentPhotoIndex - 1;
    showCurrentPhoto();
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', prevPhoto);
  nextBtn.addEventListener('click', nextPhoto);

  // Zavření lightboxu
  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Zavření kliknutím mimo lightbox
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Klávesové zkratky
  document.addEventListener('keydown', function(e) {
    if (lightbox.style.display === 'block') {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevPhoto();
          break;
        case 'ArrowRight':
          nextPhoto();
          break;
      }
    }
  });
}); 