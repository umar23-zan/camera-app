window.onload = function() {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    document.getElementById('capturedImage').src = capturedImage;
  } else {
    alert('No image captured! Redirecting to capture page...');
    window.location.href = 'capture.html';
  }
};


document.getElementById('saveBtn').addEventListener('click', () => {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    let images = JSON.parse(localStorage.getItem('savedImages')) || [];
    images.push(capturedImage);
    localStorage.setItem('savedImages', JSON.stringify(images));
    alert('Image saved successfully!'); 
  } else {
    alert('No image to save.');
  }
});


document.getElementById('retakeBtn').addEventListener('click', () => {
  sessionStorage.removeItem('capturedImage');
  window.location.href = 'capture.html';
});


document.getElementById('galleryBtn').addEventListener('click', () => {
  sessionStorage.setItem('previousPage', 'display'); 
  window.location.href = 'gallery.html';
});


document.getElementById('goBackBtn').addEventListener('click', () => {
  sessionStorage.removeItem('capturedImage'); 
  window.location.href = 'capture.html';
});
