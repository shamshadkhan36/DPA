/**
 * DPA Interior Design Consultants - Main JavaScript
 * High-Conversion Interactions, Modal, WhatsApp Bridge & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollAnimations();
  initConsultationModal();
  initLeadForms();
  initSmoothScroll();
});

/* --- 1. Sticky Header Blur on Scroll --- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/* --- 2. Mobile Menu Drawer --- */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const navLinks = document.querySelectorAll('.mobile-nav-list a');

  if (!toggleBtn || !drawer || !overlay) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    toggleBtn.classList.add('is-active');
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    toggleBtn.classList.remove('is-active');
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --- 3. Scroll Reveal Animations --- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --- 4. Universal Consultation Modal --- */
function initConsultationModal() {
  const modal = document.getElementById('consultationModal');
  if (!modal) return;

  const openButtons = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeButton = modal.querySelector('.modal-close-btn');

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  window.openConsultationModal = openModal;
  window.closeConsultationModal = closeModal;
}

/* --- 5. High-Conversion Lead Forms with WhatsApp Bridge --- */
function initLeadForms() {
  const forms = document.querySelectorAll('.dpa-lead-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        const group = input.closest('.form-group');
        if (!input.value.trim()) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      });

      // Validate Phone (at least 10 digits)
      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && phoneInput.value.trim()) {
        const cleanPhone = phoneInput.value.replace(/\D/g, '');
        const group = phoneInput.closest('.form-group');
        if (cleanPhone.length < 10) {
          isValid = false;
          if (group) group.classList.add('has-error');
        }
      }

      if (!isValid) return;

      // Extract Form Data
      const name = form.querySelector('[name="name"]')?.value || 'Client';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || 'Not provided';
      const projectType = form.querySelector('[name="project_type"]')?.value || 'Interior Project';
      const location = form.querySelector('[name="location"]')?.value || 'Mumbai / Thane / Vasai / Virar';
      const budget = form.querySelector('[name="budget"]')?.value || 'To be discussed';
      const message = form.querySelector('[name="message"]')?.value || 'Interested in consultation';

      // Build WhatsApp Message Payload
      const waText = encodeURIComponent(
        `*New Website Consultation Request*\n\n` +
        `• *Name:* ${name}\n` +
        `• *Phone:* ${phone}\n` +
        `• *Project Type:* ${projectType}\n` +
        `• *Location:* ${location}\n` +
        `• *Budget:* ${budget}\n` +
        `• *Details:* ${message}\n\n` +
        `_Sent via DPA Interior Design Consultants Website_`
      );

      const waUrl = `https://wa.me/919820386875?text=${waText}`;

      // Show Success Box in UI
      const formCard = form.closest('.lead-form-card') || form.parentElement;
      const successBox = formCard.querySelector('.form-success-box');

      if (successBox) {
        form.style.display = 'none';
        successBox.classList.add('is-active');

        const waLinkInSuccess = successBox.querySelector('.btn-wa-confirm');
        if (waLinkInSuccess) {
          waLinkInSuccess.href = waUrl;
        }
      }

      // Automatically open WhatsApp after small delay
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 700);
    });
  });
}

/* --- 6. Smooth Scroll Helper --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length <= 1) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
