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
  const lightboxImageContainer = document.getElementById('lightbox-image-container');

  // Kontrola, zda jsou všechny elementy nalezeny
  if (!lightbox || !lightboxImage || !lightboxTitle || !currentPhoto || !totalPhotos || !lightboxThumbnails || !closeBtn || !prevBtn || !nextBtn || !lightboxImageContainer) {
    console.error('Některé lightbox elementy nebyly nalezeny:', {
      lightbox: !!lightbox,
      lightboxImage: !!lightboxImage,
      lightboxTitle: !!lightboxTitle,
      currentPhoto: !!currentPhoto,
      totalPhotos: !!totalPhotos,
      lightboxThumbnails: !!lightboxThumbnails,
      closeBtn: !!closeBtn,
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      lightboxImageContainer: !!lightboxImageContainer
    });
    return;
  }

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
      'Foto/podlahovka sucha/podlahovka sucha.jpeg',
      'Foto/podlahovka sucha/podlahovka sucha video.mp4'
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

  // Funkce pro zjištění typu média
  function getMediaType(filePath) {
    const extension = filePath.split('.').pop().toLowerCase();
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
      return 'video';
    }
    return 'image';
  }

  // Otevření galerie kategorie
  categories.forEach(category => {
    category.addEventListener('click', function() {
      console.log('Kliknuto na kategorii:', this.getAttribute('data-category'));
      const categoryName = this.getAttribute('data-category');
      const categoryTitle = this.querySelector('h3').textContent;
      
      if (categoryPhotos[categoryName] && categoryPhotos[categoryName].length > 0) {
        console.log('Otevírám lightbox pro:', categoryName, 's', categoryPhotos[categoryName].length, 'fotkami');
        openLightbox(categoryName, categoryTitle);
      } else {
        console.error('Kategorie nenalezena nebo nemá fotky:', categoryName);
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

  // Zobrazení aktuální fotky nebo videa
  function showCurrentPhoto() {
    if (currentPhotos.length > 0) {
      const currentMedia = currentPhotos[currentPhotoIndex];
      const mediaType = getMediaType(currentMedia);
      
      // Skryjeme předchozí obsah
      lightboxImage.style.display = 'none';
      
      // Vytvoříme nebo zobrazíme video element
      let videoElement = lightboxImageContainer.querySelector('video');
      if (mediaType === 'video') {
        if (!videoElement) {
          videoElement = document.createElement('video');
          videoElement.controls = true;
          videoElement.autoplay = false;
          videoElement.className = 'video-container';
          lightboxImageContainer.appendChild(videoElement);
        }
        videoElement.src = currentMedia;
        videoElement.style.display = 'block';
        lightboxImage.style.display = 'none';
        
        // Přidáme indikátor typu média
        addMediaTypeIndicator('Video');
      } else {
        if (videoElement) {
          videoElement.style.display = 'none';
        }
        lightboxImage.src = currentMedia;
        lightboxImage.style.display = 'block';
        
        // Přidáme indikátor typu média
        addMediaTypeIndicator('Fotografie');
      }
      
      currentPhoto.textContent = currentPhotoIndex + 1;
      updateThumbnailActive();
    }
  }

  // Přidání indikátoru typu média
  function addMediaTypeIndicator(type) {
    // Odstraníme předchozí indikátor
    const existingIndicator = lightboxImageContainer.querySelector('.media-type-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }
    
    const indicator = document.createElement('div');
    indicator.className = 'media-type-indicator';
    indicator.textContent = type;
    lightboxImageContainer.appendChild(indicator);
  }

  // Vytvoření náhledů s rozlišením typu média
  function createThumbnails() {
    lightboxThumbnails.innerHTML = '';
    
    currentPhotos.forEach((media, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'thumbnail-container';
      
      const mediaType = getMediaType(media);
      
      if (mediaType === 'video') {
        // Náhled pro video
        const videoThumb = document.createElement('video');
        videoThumb.src = media;
        videoThumb.className = 'video-thumbnail';
        videoThumb.muted = true;
        videoThumb.preload = 'metadata';
        
        const videoIcon = document.createElement('div');
        videoIcon.className = 'video-thumb-icon';
        videoIcon.innerHTML = '🎥';
        
        thumb.appendChild(videoThumb);
        thumb.appendChild(videoIcon);
      } else {
        // Náhled pro fotku
        const imgThumb = document.createElement('img');
        imgThumb.src = media;
        imgThumb.alt = `Náhled ${index + 1}`;
        imgThumb.className = 'image-thumbnail';
        thumb.appendChild(imgThumb);
      }
      
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
    const thumbs = lightboxThumbnails.querySelectorAll('.thumbnail-container');
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