// ✅ CV modal open function
function openCVModal() {
  const modal = document.getElementById('cvModal');
  const container = document.getElementById('cvIframeContainer');

  // Prevent duplicate iframe on repeated open
  if (!container.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.src = 'Career.pdf'; // Or full path like '/assets/Career.pdf'
    iframe.style.width = '100%';
    iframe.style.height = '80vh'; // Match CSS modal content height
    iframe.style.border = 'none';
    iframe.setAttribute('loading', 'lazy'); // improve performance
    container.appendChild(iframe);
  }

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

// ✅ Close modal and clean up
function closeCVModal() {
  const modal = document.getElementById('cvModal');
  const container = document.getElementById('cvIframeContainer');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // restore background scroll
  container.innerHTML = ''; // optional: remove iframe for fresh reload
}

// ✅ Close modal on outside click
window.addEventListener('click', function (event) {
  const modal = document.getElementById('cvModal');
  if (event.target === modal) {
    closeCVModal();
  }
});


// Get today's date
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const day = today.getDate(); // 1–31
    const monthName = today.toLocaleString('default', { month: 'long' }); // e.g. "June"
    const year = today.getFullYear(); // e.g. 2025
    // Fill elements by ID
    const dayEl = document.getElementById('day-num');
    const monthEl = document.getElementById('month-name');
    const yearEl = document.getElementById('year');
    if (dayEl) dayEl.innerText = day;
    if (monthEl) monthEl.innerText = monthName;
    if (yearEl) yearEl.innerText = year;
});


