/**
 * Aura Luxe Salon & Studio — Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggleBtn && navLinks) {
    mobileToggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     2. SERVICES CATEGORY TABS
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        const cardCat = card.getAttribute('data-cat');
        if (cardCat === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     3. SERVICE SELECTION PRE-FILL & SMOOTH SCROLL
     ========================================================================== */
  const bookingServiceSelect = document.getElementById('bookingServiceSelect');

  document.querySelectorAll('.btn-select-service').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-name');
      if (serviceName && bookingServiceSelect) {
        for (let opt of bookingServiceSelect.options) {
          if (opt.value.toLowerCase().includes(serviceName.toLowerCase())) {
            opt.selected = true;
            break;
          }
        }
      }
    });
  });

  /* ==========================================================================
     4. INTERACTIVE CALENDAR GENERATOR
     ========================================================================== */
  const calendarDaysGrid = document.getElementById('calendarDaysGrid');
  const currentMonthYear = document.getElementById('currentMonthYear');
  const selectedDateInput = document.getElementById('selectedDateInput');
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');

  let currentDate = new Date(); // Current date

  function renderCalendar(dateObj) {
    if (!calendarDaysGrid || !currentMonthYear) return;

    calendarDaysGrid.innerHTML = '';

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    currentMonthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Blank cells for alignment
    for (let i = 0; i < firstDayIndex; i++) {
      const blank = document.createElement('span');
      calendarDaysGrid.appendChild(blank);
    }

    // Day buttons
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayBtn = document.createElement('button');
      dayBtn.type = 'button';
      dayBtn.className = 'cal-day-btn';
      dayBtn.textContent = day;

      const thisDate = new Date(year, month, day);

      // Disable past dates
      if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        dayBtn.classList.add('disabled');
        dayBtn.disabled = true;
      } else {
        // Auto-select today or first valid day
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          dayBtn.classList.add('active');
          if (selectedDateInput) {
            selectedDateInput.value = `${monthNames[month]} ${day}, ${year}`;
          }
        }

        dayBtn.addEventListener('click', () => {
          document.querySelectorAll('.cal-day-btn').forEach(d => d.classList.remove('active'));
          dayBtn.classList.add('active');
          if (selectedDateInput) {
            selectedDateInput.value = `${monthNames[month]} ${day}, ${year}`;
          }
        });
      }

      calendarDaysGrid.appendChild(dayBtn);
    }
  }

  renderCalendar(currentDate);

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  }

  /* ==========================================================================
     5. TIME SLOTS PICKER
     ========================================================================== */
  const timeSlotsGrid = document.getElementById('timeSlotsGrid');
  const selectedTimeInput = document.getElementById('selectedTimeInput');

  if (timeSlotsGrid) {
    timeSlotsGrid.querySelectorAll('.slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        timeSlotsGrid.querySelectorAll('.slot-btn').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        if (selectedTimeInput) {
          selectedTimeInput.value = btn.getAttribute('data-time');
        }
      });
    });
  }

  /* ==========================================================================
     6. BOOKING FORM SUBMISSION & CONFIRMATION MODAL
     ========================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  const confirmationModal = document.getElementById('confirmationModal');
  const modalSummary = document.getElementById('modalSummary');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const doneModalBtn = document.getElementById('doneModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = document.getElementById('bookingServiceSelect').value;
      const date = selectedDateInput ? selectedDateInput.value : 'August 21, 2026';
      const time = selectedTimeInput ? selectedTimeInput.value : '02:00 PM';
      const name = document.getElementById('guestName').value;
      const phone = document.getElementById('guestPhone').value;
      const email = document.getElementById('guestEmail').value;
      const notes = document.getElementById('guestNotes').value || 'None';

      const refCode = 'AURA-L-' + Math.floor(10000 + Math.random() * 90000);

      if (modalSummary && confirmationModal) {
        modalSummary.innerHTML = `
          <div class="modal-row">
            <span class="modal-label">Reference ID:</span>
            <span class="modal-val" style="color:var(--gold-primary); font-family:monospace;">${refCode}</span>
          </div>
          <div class="modal-row">
            <span class="modal-label">Guest Name:</span>
            <span class="modal-val">${name}</span>
          </div>
          <div class="modal-row">
            <span class="modal-label">Reserved Ritual:</span>
            <span class="modal-val">${service}</span>
          </div>
          <div class="modal-row">
            <span class="modal-label">Date & Time:</span>
            <span class="modal-val">${date} @ ${time}</span>
          </div>
          <div class="modal-row">
            <span class="modal-label">Contact Phone:</span>
            <span class="modal-val">${phone}</span>
          </div>
          <div class="modal-row">
            <span class="modal-label">Sanctuary Location:</span>
            <span class="modal-val">720 Mercer St, Soho, NY</span>
          </div>
        `;

        confirmationModal.classList.add('active');
      }

      bookingForm.reset();
    });
  }

  function hideModal() {
    if (confirmationModal) confirmationModal.classList.remove('active');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (doneModalBtn) doneModalBtn.addEventListener('click', hideModal);

});
