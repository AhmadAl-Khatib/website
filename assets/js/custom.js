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
  content.style.height = '0px';
  details.addEventListener('toggle', () => {
    const inner = content.querySelector('.content-inner');
    if (details.open) {
      const height = inner.offsetHeight;
      content.style.height = height + 'px';
      details.classList.add('open');
    } else {
      content.style.height = content.offsetHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = '0px';
        details.classList.remove('open');
      });
    }
  });
  content.addEventListener('transitionend', () => {
    if (details.open) {
      content.style.height = 'auto';
    }
  });
});
