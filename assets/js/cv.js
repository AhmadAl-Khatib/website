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
