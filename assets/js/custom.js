// cv display function
function openCVModal() {
  const modal = document.getElementById('cvModal');
  const container = document.getElementById('cvIframeContainer');
  if (!container.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.src = 'Career.pdf';
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = 'none';
    container.appendChild(iframe);
  }
  modal.style.display = 'block';
}
function closeCVModal() {
  const modal = document.getElementById('cvModal');
  modal.style.display = 'none';
  const container = document.getElementById('cvIframeContainer');
  container.innerHTML = '';
}
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
