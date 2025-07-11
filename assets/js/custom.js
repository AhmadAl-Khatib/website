// Open CV modal and load iframe preview
function openCVModal() {
  const modal = document.getElementById('cvModal');
  const container = document.getElementById('cvIframeContainer');
  // Prevent adding multiple iframes
  if (!container.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    // Use Google Docs Viewer for better mobile compatibility
    iframe.src = 'https://docs.google.com/gview?embedded=true&url=https://yourdomain.com/path/to/Career.pdf';

    iframe.style.width = '100%';
    iframe.style.height = '80vh';
    iframe.style.border = 'none';
    iframe.setAttribute('loading', 'lazy');
    container.appendChild(iframe);
  }
  modal.style.display = 'flex';           // show modal (flex for centering)
  document.body.style.overflow = 'hidden'; // prevent background scroll
  modal.focus();
}
// Close CV modal and cleanup
function closeCVModal() {
  const modal = document.getElementById('cvModal');
  const container = document.getElementById('cvIframeContainer');

  modal.style.display = 'none';
  document.body.style.overflow = '';      // restore background scroll
  container.innerHTML = '';                // remove iframe to reload fresh next time
}
// Close modal if clicked outside modal content
window.addEventListener('click', function (event) {
  const modal = document.getElementById('cvModal');
  if (event.target === modal) {
    closeCVModal();
  }
});
// Optional: close modal on Escape key press
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('cvModal');
    if (modal.style.display === 'flex') {
      closeCVModal();
    }
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


