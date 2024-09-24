window.onload = function() {
  const galleryContainer = document.getElementById('gallery');
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

  if (savedImages.length === 0) {
    galleryContainer.innerHTML = '<p>No images saved.</p>';
  } else {
    savedImages.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      img.style.width = '100%';
      img.style.marginBottom = '20px';
      galleryContainer.appendChild(img);
    });
  }

  // Go back to previous page (capture or display page)
  document.getElementById('goBackBtn').addEventListener('click', () => {
    const previousPage = sessionStorage.getItem('previousPage');
    if (previousPage === 'display') {
      window.location.href = 'display.html';
    } else {
      window.location.href = 'capture.html';
    }
  });
};
