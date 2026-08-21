/**
 * DPA Interior Design Consultants - Projects Filter & Lightbox
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectFilters();
  initLightbox();
});

/* --- Project Category Filter --- */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active state on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Simple Lightbox Viewer --- */
function initLightbox() {
  const zoomTriggers = document.querySelectorAll('[data-lightbox-src]');
  if (!zoomTriggers.length) return;

  // Create lightbox markup dynamically if it doesn't exist
  let lightbox = document.getElementById('dpaLightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'dpaLightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close image">&times;</button>
        <img src="" alt="DPA Interior Project View" class="lightbox-image">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Lightbox styling
    const style = document.createElement('style');
    style.textContent = `
      .lightbox-overlay {
        position: fixed;
        inset: 0;
        background: rgba(10, 11, 13, 0.94);
        backdrop-filter: blur(10px);
        z-index: 3000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      .lightbox-overlay.is-active {
        opacity: 1;
        visibility: visible;
      }
      .lightbox-content {
        position: relative;
        max-width: 1080px;
        width: 100%;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .lightbox-image {
        max-width: 100%;
        max-height: 75vh;
        object-fit: contain;
        border-radius: 4px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      }
      .lightbox-caption {
        margin-top: 16px;
        color: #F8F6F2;
        font-size: 1rem;
        font-family: 'Cormorant Garamond', Georgia, serif;
        letter-spacing: 0.05em;
        text-align: center;
      }
      .lightbox-close {
        position: absolute;
        top: -45px;
        right: 0;
        color: #FFFFFF;
        font-size: 2.2rem;
        cursor: pointer;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s ease;
      }
      .lightbox-close:hover { opacity: 1; color: #C5A880; }
    `;
    document.head.appendChild(style);
  }

  const lightboxImg = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
  };

  zoomTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const caption = trigger.getAttribute('data-lightbox-caption') || '';
      lightboxImg.src = src;
      lightboxCaption.textContent = caption;
      lightbox.classList.add('is-active');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
