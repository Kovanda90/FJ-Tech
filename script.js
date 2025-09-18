document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM načten, inicializuji galerie...');
  
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

  // Hlavní kategorie galerie
  const mainCategory = document.querySelector('.main-category');
  const subCategories = document.getElementById('sub-categories');
  const categories = document.querySelectorAll('.category');
  console.log('Nalezeno hlavních kategorií:', mainCategory ? 1 : 0);
  console.log('Nalezeno podkategorií:', categories.length);
  
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

  console.log('Lightbox elementy:', {
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

  let currentCategory = '';
  let currentPhotos = [];
  let currentPhotoIndex = 0;

  // Data o fotografiích v jednotlivých kategoriích
  const categoryPhotos = {
    'cerpadlo': [
      'Foto/Osazení čerpadla do vrtaných studní v rodinných domech/cerpadlo.jpeg',
      'Foto/Osazení čerpadla do vrtaných studní v rodinných domech/cerpadlo1.jpeg'
    ],
    'podlahovka-deska': [
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka1.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka2.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka3.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka4.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka5.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka6.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka7.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka8.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka9.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka10.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka11.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka12.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka13.jpeg',
      'Foto/Montáž podlahového vytápění s pokládkou systémové desky v rodinném domě/podlahovka14.jpeg'
    ],
    'podlahovka-sucha': [
      'Foto/Montáž podlahového vytápení v původních vestavbách - suchá instalace bez betonu/podlahovka sucha.jpeg',
      'Foto/Montáž podlahového vytápení v původních vestavbách - suchá instalace bez betonu/podlahovka sucha video.mp4'
    ],
    'pripojka': [
      'Foto/Kanalizační a vodovodní přípojka k rodinnému domu/pripojka.jpeg',
      'Foto/Kanalizační a vodovodní přípojka k rodinnému domu/pripojka1.jpeg',
      'Foto/Kanalizační a vodovodní přípojka k rodinnému domu/pripojka2.jpeg',
      'Foto/Kanalizační a vodovodní přípojka k rodinnému domu/pripojka3.jpeg'
    ],
    'rozvody-vody': [
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody1.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody2.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody3.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody4.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody5.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody6.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody7.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody8.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody9.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody10.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody11.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody12.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody13.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody14.jpeg',
      'Foto/Hrubé rozvody vody a kanalizace v rodinném domě/rozvody15.jpeg'
    ],
    'stoupacky': [
      'Foto/Změna pozice stoupacího potrubí topení v panelákovém domě/stoupacky.jpeg',
      'Foto/Změna pozice stoupacího potrubí topení v panelákovém domě/stoupacky1.jpeg'
    ],
    'vybaveni': [
      'Foto/Vybavení malometrážních bytů/vybaveni.jpeg',
      'Foto/Vybavení malometrážních bytů/vybaveni1.jpeg',
      'Foto/Vybavení malometrážních bytů/vybaveni2.jpeg',
      'Foto/Vybavení malometrážních bytů/vybaveni3.jpeg'
    ]
  };

  console.log('Kategorie s fotkami:', Object.keys(categoryPhotos));

  // Funkce pro zjištění typu média
  function getMediaType(filePath) {
    const extension = filePath.split('.').pop().toLowerCase();
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
      return 'video';
    }
    return 'image';
  }

  // Event listener pro hlavní kategorii
  if (mainCategory) {
    mainCategory.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Klik na hlavní kategorii');
      
      if (subCategories.style.display === 'none' || subCategories.style.display === '') {
        subCategories.style.display = 'grid';
        mainCategory.style.background = '#e3eafc';
        mainCategory.querySelector('h3').textContent = 'Fotogalerie (rozbaleno)';
      } else {
        subCategories.style.display = 'none';
        mainCategory.style.background = '#f8f9fa';
        mainCategory.querySelector('h3').textContent = 'Fotogalerie';
      }
    });
  }

  // Otevření galerie kategorie
  categories.forEach((category, index) => {
    const categoryName = category.getAttribute('data-category');
    console.log(`Kategorie ${index}:`, categoryName, category);
    
    category.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('KLIKNUTO na kategorii:', this.getAttribute('data-category'));
      console.log('Element:', this);
      
      const categoryName = this.getAttribute('data-category');
      const categoryTitle = this.querySelector('h3').textContent;
      
      console.log('Název kategorie:', categoryTitle);
      console.log('Fotky v kategorii:', categoryPhotos[categoryName]);
      
      if (categoryPhotos[categoryName] && categoryPhotos[categoryName].length > 0) {
        console.log('Otevírám lightbox pro:', categoryName, 's', categoryPhotos[categoryName].length, 'fotkami');
        openLightbox(categoryName, categoryTitle);
      } else {
        console.error('Kategorie nenalezena nebo nemá fotky:', categoryName);
      }
    });
    
    // Přidám také pointer cursor pro lepší UX
    category.style.cursor = 'pointer';
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

  // Lightbox pro profilovou fotku
  const profilePhoto = document.querySelector('.profile-photo');
  if (profilePhoto) {
    profilePhoto.addEventListener('click', function() {
      console.log('Klik na profilovou fotku');
      
      // Vytvoříme dočasný lightbox pro profilovou fotku
      const profileLightbox = document.createElement('div');
      profileLightbox.className = 'profile-lightbox';
      profileLightbox.innerHTML = `
        <div class="profile-lightbox-content">
          <span class="close-profile-lightbox">&times;</span>
          <img src="${profilePhoto.src}" alt="Profilová fotka Jakub Foukal - zvětšená" class="profile-lightbox-image">
        </div>
      `;
      
      document.body.appendChild(profileLightbox);
      
      // Zavření lightboxu
      const closeBtn = profileLightbox.querySelector('.close-profile-lightbox');
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(profileLightbox);
      });
      
      // Zavření kliknutím mimo obrázek
      profileLightbox.addEventListener('click', function(e) {
        if (e.target === profileLightbox) {
          document.body.removeChild(profileLightbox);
        }
      });
      
      // Zavření klávesou ESC
      const handleEscape = function(e) {
        if (e.key === 'Escape') {
          document.body.removeChild(profileLightbox);
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    });
  }
}); 