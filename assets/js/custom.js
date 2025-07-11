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

document.querySelectorAll('details').forEach(details => {
  const content = details.querySelector('.content');
  const inner = content.querySelector('.content-inner');
  // Initial collapsed state
  content.style.height = '0px';
  // Handle toggle
  details.addEventListener('toggle', () => {
    if (details.open) {
      // Set to specific pixel height for animation
      const height = inner.offsetHeight;
      content.style.height = height + 'px';
      // Allow transition to finish, then set height to auto
      content.addEventListener('transitionend', function setAutoHeight(e) {
        if (e.propertyName === 'height') {
          content.style.height = 'auto';
          content.removeEventListener('transitionend', setAutoHeight);
        }
      });
      details.classList.add('open');
    } else {
      // Collapse from current height
      content.style.height = content.offsetHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = '0px';
        details.classList.remove('open');
      });
    }
  });
});
