/**
 * AURA Atelier & Luxury Grooming Lounge - Interactive Application Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. OPERATING HOURS & LIVE STATUS CALCULATION ENGINE
     ========================================================================== */
  
  // Weekly Schedule Configuration (Hour ranges in 24h format)
  const scheduleConfig = {
    0: { dayName: 'Sunday', open: 10, close: 18, formatted: '10:00 AM – 6:00 PM' },
    1: { dayName: 'Monday', open: 9, close: 20, formatted: '9:00 AM – 8:00 PM' },
    2: { dayName: 'Tuesday', open: 9, close: 20, formatted: '9:00 AM – 8:00 PM' },
    3: { dayName: 'Wednesday', open: 9, close: 21, formatted: '9:00 AM – 9:00 PM' },
    4: { dayName: 'Thursday', open: 9, close: 21, formatted: '9:00 AM – 9:00 PM' },
    5: { dayName: 'Friday', open: 8.5, close: 21.5, formatted: '8:30 AM – 9:30 PM' },
    6: { dayName: 'Saturday', open: 8, close: 20, formatted: '8:00 AM – 8:00 PM' }
  };

  function updateSalonStatus() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours() + (now.getMinutes() / 60);

    const todayConfig = scheduleConfig[currentDay];
    const isOpen = currentHour >= todayConfig.open && currentHour < todayConfig.close;

    // Highlight current day in schedule table
    document.querySelectorAll('.schedule-row').forEach(row => {
      const rowDay = parseInt(row.getAttribute('data-day'));
      if (rowDay === currentDay) {
        row.classList.add('active-today');
      } else {
        row.classList.remove('active-today');
      }
    });

    // Update Top Announcement Bar
    const livePulse = document.getElementById('livePulse');
    const liveStatusText = document.getElementById('liveStatusText');
    const liveHoursHint = document.getElementById('liveHoursHint');

    // Update Hero Badge
    const heroStatusBadge = document.getElementById('heroStatusBadge');
    const heroStatusText = document.getElementById('heroStatusText');
    const heroTodayHours = document.getElementById('heroTodayHours');

    // Update Live Card
    const liveCardBadge = document.getElementById('liveCardBadge');
    const liveCardStatus = document.getElementById('liveCardStatus');
    const liveCardDesc = document.getElementById('liveCardDesc');

    // Update Footer & Mobile Bar
    const footerStatusText = document.getElementById('footerStatusText');
    const footerHoursText = document.getElementById('footerHoursText');
    const mobileBarStatus = document.getElementById('mobileBarStatus');

    if (heroTodayHours) heroTodayHours.textContent = todayConfig.formatted;
    if (footerHoursText) footerHoursText.textContent = `${todayConfig.dayName}: ${todayConfig.formatted}`;

    if (isOpen) {
      // OPEN State
      if (livePulse) livePulse.className = 'pulse-dot';
      if (liveStatusText) liveStatusText.textContent = 'OPEN NOW';
      if (liveHoursHint) liveHoursHint.textContent = `(Closes today at ${formatCloseTime(todayConfig.close)})`;

      if (heroStatusBadge) heroStatusBadge.className = 'hours-card-badge';
      if (heroStatusText) heroStatusText.textContent = 'OPEN TODAY';

      if (liveCardBadge) liveCardBadge.className = 'live-card-badge';
      if (liveCardStatus) liveCardStatus.textContent = 'WE ARE OPEN NOW';
      if (liveCardDesc) liveCardDesc.textContent = `Our master barbers are currently available until ${formatCloseTime(todayConfig.close)}. Walk-ins welcomed or reserve online.`;

      if (footerStatusText) footerStatusText.textContent = 'OPEN NOW';
      if (mobileBarStatus) mobileBarStatus.innerHTML = `<i class="fa-solid fa-circle text-success" style="color:#10B981"></i> Open Now • Closes ${formatCloseTime(todayConfig.close)}`;

    } else {
      // CLOSED State
      const nextDayNum = (currentDay + 1) % 7;
      const nextDayConfig = scheduleConfig[nextDayNum];

      if (livePulse) livePulse.className = 'pulse-dot closed';
      if (liveStatusText) liveStatusText.textContent = 'CLOSED NOW';
      if (liveHoursHint) liveHoursHint.textContent = `(Opens ${nextDayConfig.dayName} at ${formatCloseTime(nextDayConfig.open)})`;

      if (heroStatusBadge) heroStatusBadge.className = 'hours-card-badge closed';
      if (heroStatusText) heroStatusText.textContent = 'CLOSED NOW';

      if (liveCardBadge) liveCardBadge.className = 'live-card-badge closed';
      if (liveCardStatus) liveCardStatus.textContent = 'SALON IS CLOSED';
      if (liveCardDesc) liveCardDesc.textContent = `We are currently closed for the day. Online booking remains active 24/7 for upcoming seats.`;

      if (footerStatusText) footerStatusText.textContent = 'CLOSED NOW';
      if (mobileBarStatus) mobileBarStatus.innerHTML = `<i class="fa-solid fa-circle text-danger" style="color:#EF4444"></i> Closed • Opens ${nextDayConfig.dayName} ${formatCloseTime(nextDayConfig.open)}`;
    }
  }

  function formatCloseTime(decimalHour) {
    const hours = Math.floor(decimalHour);
    const mins = (decimalHour % 1) * 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    const displayMins = mins === 0 ? '00' : mins;
    return `${displayHour}:${displayMins} ${period}`;
  }

  // Live Clock Ticker
  function updateLiveClock() {
    const now = new Date();
    const clockEl = document.getElementById('currentTimeClock');
    const dayEl = document.getElementById('currentDayDisplay');

    if (clockEl) {
      clockEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    }
    if (dayEl) {
      dayEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }
  }

  updateSalonStatus();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  setInterval(updateSalonStatus, 60000);

  /* ==========================================================================
     2. NAVIGATION & MOBILE DRAWER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. HAIRCUTS CATEGORY FILTER
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const styleCards = document.querySelectorAll('.style-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      styleCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     4. HAIRCUT QUICK DETAIL MODAL
     ========================================================================== */
  const styleDetailModal = document.getElementById('styleDetailModal');
  const styleDetailContent = document.getElementById('styleDetailContent');
  const closeStyleModalBtn = document.getElementById('closeStyleModalBtn');

  const styleDetailsMap = {
    'fade-1': {
      title: 'The Executive Mid Skin Fade',
      category: 'Fades & Tapers',
      price: '$55',
      image: 'assets/haircut_fade.jpg',
      description: 'A flawless gradient fade starting from bare skin at the mid-ear level, seamlessly blending into dense top texture. Includes razor lineup & hot towel.',
      faceTypes: 'Oval, Square, Heart',
      hairTypes: 'Straight, Wavy, Thick, Coarse',
      products: 'Matte Clay, Sea Salt Spray',
      maintenance: 'Touchup every 2-3 weeks'
    },
    'crop-1': {
      title: 'French Textured Crop & Drop Fade',
      category: 'Textured Crops',
      price: '$60',
      image: 'assets/haircut_crop.jpg',
      description: 'Heavy forward directional texturing with blunt cut fringe and a subtle drop fade curve around the nape. Low maintenance, high impact modern style.',
      faceTypes: 'Round, Diamond, Oval',
      hairTypes: 'Wavy, Straight, Thin to Medium',
      products: 'Styling Powder, Matte Paste',
      maintenance: 'Touchup every 3 weeks'
    },
    'pomp-1': {
      title: 'The Royal Modern Pompadour',
      category: 'Classic Gentlemen',
      price: '$65',
      image: 'assets/haircut_pompadour.jpg',
      description: 'Sophisticated high-volume pompadour styled with precision blow-dry structure and medium-shine water-based luxury pomade.',
      faceTypes: 'Square, Oval, Triangular',
      hairTypes: 'Straight, Medium-Thick',
      products: 'High Shine Pomade, Grooming Tonic',
      maintenance: 'Touchup every 3-4 weeks'
    },
    'taper-1': {
      title: 'Executive Low Taper & Flow',
      category: 'Low Taper',
      price: '$50',
      image: 'assets/haircut_taper.jpg',
      description: 'Subtle temple and neck tapers that maintain full natural side length while preserving clean executive boundaries.',
      faceTypes: 'All Face Shapes',
      hairTypes: 'All Hair Densities',
      products: 'Light Conditioning Cream',
      maintenance: 'Touchup every 3 weeks'
    }
  };

  document.querySelectorAll('.quick-detail-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const styleId = btn.getAttribute('data-style');
      const data = styleDetailsMap[styleId];

      if (data && styleDetailContent && styleDetailModal) {
        styleDetailContent.innerHTML = `
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; align-items:center;">
            <img src="${data.image}" alt="${data.title}" style="border-radius:12px; width:100%; aspect-ratio:4/5; object-fit:cover;">
            <div>
              <span style="color:var(--gold-primary); font-size:0.8rem; font-weight:700; text-transform:uppercase;">${data.category}</span>
              <h3 style="font-size:1.6rem; margin:0.3rem 0;">${data.title}</h3>
              <div style="font-family:var(--font-serif); font-size:1.5rem; font-weight:700; color:#fff; margin-bottom:1rem;">${data.price}</div>
              <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1.2rem;">${data.description}</p>
              
              <ul style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.85rem; color:#E5E7EB; margin-bottom:1.5rem;">
                <li><strong style="color:var(--gold-primary);">Face Shapes:</strong> ${data.faceTypes}</li>
                <li><strong style="color:var(--gold-primary);">Hair Types:</strong> ${data.hairTypes}</li>
                <li><strong style="color:var(--gold-primary);">Styling Products:</strong> ${data.products}</li>
                <li><strong style="color:var(--gold-primary);">Maintenance:</strong> ${data.maintenance}</li>
              </ul>
              <a href="#booking" class="btn btn-gold w-100 btn-select-style-modal" data-service="${data.title}">Book This Haircut</a>
            </div>
          </div>
        `;
        styleDetailModal.classList.add('active');

        const modalBookBtn = styleDetailContent.querySelector('.btn-select-style-modal');
        if (modalBookBtn) {
          modalBookBtn.addEventListener('click', () => {
            styleDetailModal.classList.remove('active');
            selectBookingService(data.title);
          });
        }
      }
    });
  });

  if (closeStyleModalBtn && styleDetailModal) {
    closeStyleModalBtn.addEventListener('click', () => {
      styleDetailModal.classList.remove('active');
    });
  }

  /* ==========================================================================
     5. SERVICE SELECTION PRE-FILL LOGIC
     ========================================================================== */
  function selectBookingService(serviceName) {
    const bookingServiceSelect = document.getElementById('bookingService');
    if (bookingServiceSelect) {
      for (let option of bookingServiceSelect.options) {
        if (option.value.toLowerCase().includes(serviceName.toLowerCase())) {
          option.selected = true;
          break;
        }
      }
    }
  }

  document.querySelectorAll('.btn-select-style, .btn-select-service').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const service = btn.getAttribute('data-service');
      if (service) {
        selectBookingService(service);
      }
    });
  });

  /* ==========================================================================
     6. BOOKING FORM & CONFIRMATION MODAL
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const bookingDateInput = document.getElementById('bookingDate');
  const timeSlotsContainer = document.getElementById('timeSlotsContainer');
  const selectedTimeInput = document.getElementById('selectedTime');
  const confirmationModal = document.getElementById('confirmationModal');
  const confirmationSummary = document.getElementById('confirmationSummary');
  const closeModalBtn = document.getElementById('closeModalBtn');

  // Set min date to today
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.min = today;
    bookingDateInput.value = today;
  }

  // Time Slot Picker
  if (timeSlotsContainer) {
    timeSlotsContainer.querySelectorAll('.time-slot-btn').forEach(slot => {
      slot.addEventListener('click', () => {
        timeSlotsContainer.querySelectorAll('.time-slot-btn').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        if (selectedTimeInput) {
          selectedTimeInput.value = slot.getAttribute('data-time');
        }
      });
    });
  }

  // Form Submit
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = document.getElementById('bookingService').value;
      const barber = document.querySelector('input[name="barber"]:checked')?.value || 'Master Barber';
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('selectedTime').value;
      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;
      const email = document.getElementById('clientEmail').value;
      const notes = document.getElementById('bookingNotes').value || 'None';

      const bookingRef = 'AURA-' + Math.floor(10000 + Math.random() * 90000);

      // Render Confirmation Card
      if (confirmationSummary && confirmationModal) {
        confirmationSummary.innerHTML = `
          <div class="summary-row">
            <span class="summary-label">Reference ID:</span>
            <span class="summary-val" style="color:var(--gold-primary); font-family:monospace;">${bookingRef}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Guest Name:</span>
            <span class="summary-val">${name}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Reserved Service:</span>
            <span class="summary-val">${service}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Specialist Barber:</span>
            <span class="summary-val">${barber}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Date & Time:</span>
            <span class="summary-val">${date} @ ${time}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Contact Phone:</span>
            <span class="summary-val">${phone}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Complimentary Drink:</span>
            <span class="summary-val">Single Malt / Espresso Bar</span>
          </div>
        `;

        confirmationModal.classList.add('active');
      }

      bookingForm.reset();
      if (bookingDateInput) {
        bookingDateInput.value = new Date().toISOString().split('T')[0];
      }
    });
  }

  if (closeModalBtn && confirmationModal) {
    closeModalBtn.addEventListener('click', () => {
      confirmationModal.classList.remove('active');
    });
  }

  /* ==========================================================================
     7. REVIEWS & TESTIMONIAL SUBMISSION SYSTEM
     ========================================================================== */
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const reviewForm = document.getElementById('reviewForm');
  const starPicker = document.getElementById('starPicker');
  const reviewRatingInput = document.getElementById('reviewRatingInput');
  const reviewsGrid = document.getElementById('reviewsGrid');

  if (openReviewModalBtn && reviewModal) {
    openReviewModalBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });
  }

  if (closeReviewModalBtn && reviewModal) {
    closeReviewModalBtn.addEventListener('click', () => {
      reviewModal.classList.remove('active');
    });
  }

  // Star Rating Selector
  if (starPicker && reviewRatingInput) {
    const stars = starPicker.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.getAttribute('data-rating'));
        reviewRatingInput.value = rating;

        stars.forEach((s, idx) => {
          if (idx < rating) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  }

  // Submit Review Form
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const rating = parseInt(reviewRatingInput.value);
      const author = document.getElementById('reviewAuthor').value;
      const service = document.getElementById('reviewService').value;
      const comments = document.getElementById('reviewComments').value;

      const initials = author.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'CL';
      const starsHtml = '<i class="fa-solid fa-star"></i>'.repeat(rating);

      const reviewCard = document.createElement('div');
      reviewCard.className = 'review-card';
      reviewCard.innerHTML = `
        <div class="review-header">
          <div class="reviewer-info">
            <div class="reviewer-avatar">${initials}</div>
            <div>
              <h4 class="reviewer-name">${author}</h4>
              <span class="review-date">Just Now • Verified Client</span>
            </div>
          </div>
          <div class="review-stars">
            ${starsHtml}
          </div>
        </div>
        <p class="review-text">"${comments}"</p>
        <div class="review-service-tag"><i class="fa-solid fa-scissors"></i> Service: ${service}</div>
      `;

      if (reviewsGrid) {
        reviewsGrid.prepend(reviewCard);
      }

      reviewForm.reset();
      if (reviewModal) reviewModal.classList.remove('active');

      alert('Thank you! Your verified review has been published.');
    });
  }

});
