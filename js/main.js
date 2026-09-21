/**
 * Swami Vibekananda College of Education - Main UI & Global Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initUrlNormalizer();
  initNavigation();
  initNoticeTicker();
  initModals();
  initCounters();
  initContactForm();
  highlightActiveNav();
});

/* URL Normalizer for Clean URLs (e.g. /home instead of /index.html) */
function initUrlNormalizer() {
  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    const path = window.location.pathname;
    if (path.endsWith('/index.html') || path === '/' || path === '') {
      window.history.replaceState(null, '', '/home');
    }
  }
}

/* Mobile Navigation Toggle */
function initNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      }
    });
  }
}

/* Highlight Active Navigation Link based on current URL */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isHomeLink = href === 'index.html' || href === 'home' || href === '/home' || href === '/';
    const isCurrentHome = currentPath === 'index.html' || currentPath === 'home' || currentPath === '';
    
    if ((isHomeLink && isCurrentHome) || href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* Notice Ticker Populator */
function initNoticeTicker() {
  const tickerContainer = document.getElementById('ticker-items-container');
  if (tickerContainer && window.SVCE_DATA && window.SVCE_DATA.notices) {
    const noticesHtml = window.SVCE_DATA.notices.map(notice => `
      <span class="ticker-item-span">
        <i class="fa-solid fa-bell"></i>
        <strong>[${notice.badge}]</strong> ${notice.title} (${notice.date})
      </span>
    `).join('');
    
    tickerContainer.innerHTML = noticesHtml + noticesHtml; // duplicate for seamless infinite loop
  }
}

/* Modal Gazette Viewer Logic */
function initModals() {
  const modalOverlay = document.getElementById('doc-modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay) return;

  window.openDocModal = function(type) {
    if (!window.SVCE_DATA) return;
    const { disclosures } = window.SVCE_DATA;
    let title = "";
    let contentHtml = "";

    if (type === 'deled-ncte') {
      const doc = disclosures.ncteDeledOrder;
      const pdfUrl = "assets/pdf/NCTE ORDER COPY  D.EL.ED.pdf";
      title = "NCTE Recognition Order - D.El.Ed Course (ERCAPP77)";
      contentHtml = `
        <div style="border-bottom: 2px solid #E2E8F0; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <p style="font-size: 0.85rem; color: #64748B; text-transform: uppercase; font-weight: 700;">${doc.gazetteNotif}</p>
          <h4 style="color: #0A1E3F; font-size: 1.25rem; font-weight: 800; margin: 0.5rem 0;">Order No: ${doc.orderNo}</h4>
          <p style="font-size: 0.9rem; color: #D9822B; font-weight: 600;">Date of Notification: ${doc.date}</p>
        </div>
        <div style="background: #F8FAFD; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;">
          <p><strong>Institution:</strong> Swami Vibekananda College of Education</p>
          <p><strong>Approved Intake:</strong> ${doc.intake} Students</p>
          <p><strong>Effective Session:</strong> ${doc.session}</p>
          <p><strong>Governing Regulations:</strong> ${doc.regulations}</p>
        </div>
        <h5 style="font-size: 1rem; font-weight: 700; color: #0A1E3F; margin-bottom: 0.75rem;">Key Regulatory Provisions & Mandatory Clauses:</h5>
        <ul style="list-style: disc; padding-left: 1.5rem; font-size: 0.9rem; line-height: 1.7; color: #334155; margin-bottom: 1.5rem;">
          ${doc.clauses.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="${pdfUrl}" target="_blank" class="btn-primary" style="font-size: 0.85rem;"><i class="fa-solid fa-file-pdf"></i> View Signed Original PDF</a>
          <a href="${pdfUrl}" download class="btn-secondary" style="font-size: 0.85rem;"><i class="fa-solid fa-download"></i> Download PDF</a>
        </div>
      `;
    } else if (type === 'bed-ncte') {
      const doc = disclosures.ncteBedOrder;
      const pdfUrl = "assets/pdf/B.ED . RECOGNISED COPY.pdf";
      title = "NCTE Recognition Order - B.Ed Course (ERCAPP3967)";
      contentHtml = `
        <div style="border-bottom: 2px solid #E2E8F0; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <p style="font-size: 0.85rem; color: #64748B; text-transform: uppercase; font-weight: 700;">${doc.gazetteNotif}</p>
          <h4 style="color: #0A1E3F; font-size: 1.25rem; font-weight: 800; margin: 0.5rem 0;">Order No: ${doc.orderNo}</h4>
          <p style="font-size: 0.9rem; color: #D9822B; font-weight: 600;">Date: ${doc.date}</p>
        </div>
        <div style="background: #F8FAFD; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;">
          <p><strong>Institution:</strong> Swami Vibekananda College of Education (Under Sahid Khudiram Memorial Trust)</p>
          <p><strong>Approved Intake:</strong> ${doc.intake}</p>
          <p><strong>Academic Commencement:</strong> ${doc.session}</p>
        </div>
        <h5 style="font-size: 1rem; font-weight: 700; color: #0A1E3F; margin-bottom: 0.75rem;">Regulatory Compliance:</h5>
        <ul style="list-style: disc; padding-left: 1.5rem; font-size: 0.9rem; line-height: 1.7; color: #334155; margin-bottom: 1.5rem;">
          ${doc.clauses.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="${pdfUrl}" target="_blank" class="btn-primary" style="font-size: 0.85rem;"><i class="fa-solid fa-file-pdf"></i> View Signed Original PDF</a>
          <a href="${pdfUrl}" download class="btn-secondary" style="font-size: 0.85rem;"><i class="fa-solid fa-download"></i> Download PDF</a>
        </div>
      `;
    } else if (type === 'wbbpe') {
      const doc = disclosures.wbbpeOrder;
      const pdfUrl = "assets/pdf/D.EL.ED AFFILIATION COPY.pdf";
      title = "West Bengal Board of Primary Education (WBBPE) Affiliation Renewal";
      contentHtml = `
        <div style="border-bottom: 2px solid #E2E8F0; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <p style="font-size: 0.85rem; color: #64748B; text-transform: uppercase; font-weight: 700;">${doc.body}</p>
          <h4 style="color: #0A1E3F; font-size: 1.25rem; font-weight: 800; margin: 0.5rem 0;">Memo No: ${doc.memoNo}</h4>
          <p style="font-size: 0.9rem; color: #D9822B; font-weight: 600;">Issue Date: ${doc.date}</p>
        </div>
        <div style="background: #F8FAFD; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.9rem;">
          <p><strong>Institution:</strong> SWAMI VIBEKANANDA COLLEGE OF EDUCATION, PASCHIM MEDINIPUR</p>
          <p><strong>Intake Capacity:</strong> ${doc.intake}</p>
          <p><strong>Renewal Period:</strong> ${doc.renewalSessions}</p>
        </div>
        <h5 style="font-size: 1rem; font-weight: 700; color: #0A1E3F; margin-bottom: 0.75rem;">Affiliation Conditions:</h5>
        <ul style="list-style: disc; padding-left: 1.5rem; font-size: 0.9rem; line-height: 1.7; color: #334155; margin-bottom: 1.5rem;">
          ${doc.clauses.map(c => `<li>${c}</li>`).join('')}
        </ul>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <a href="${pdfUrl}" target="_blank" class="btn-primary" style="font-size: 0.85rem;"><i class="fa-solid fa-file-pdf"></i> View Signed Original PDF</a>
          <a href="${pdfUrl}" download class="btn-secondary" style="font-size: 0.85rem;"><i class="fa-solid fa-download"></i> Download PDF</a>
        </div>
      `;
    }

    if (modalTitle && modalContent) {
      modalTitle.innerText = title;
      modalContent.innerHTML = contentHtml;
      modalOverlay.classList.add('open');
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

/* Statistics Counter Animation */
function initCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target') || '0', 10);
        let count = 0;
        const speed = 2000 / target;
        const timer = setInterval(() => {
          count += 1;
          entry.target.innerText = count + (entry.target.getAttribute('data-suffix') || '');
          if (count >= target) {
            clearInterval(timer);
            entry.target.innerText = target + (entry.target.getAttribute('data-suffix') || '');
          }
        }, Math.max(speed, 20));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Interactive Contact & Inquiry Form */
function initContactForm() {
  const contactForm = document.getElementById('svce-inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message/inquiry has been received by the Swami Vibekananda College of Education Administrative Office. We will get back to you shortly.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
}
