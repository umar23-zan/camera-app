window.onload = function() {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    document.getElementById('capturedImage').src = capturedImage;
  } else {
    alert('No image captured! Redirecting to capture page...');
    window.location.href = 'capture.html';
  }
};

// Save the image to localStorage but stay on the same page
document.getElementById('saveBtn').addEventListener('click', () => {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    let images = JSON.parse(localStorage.getItem('savedImages')) || [];
    images.push(capturedImage);
    localStorage.setItem('savedImages', JSON.stringify(images));
    alert('Image saved successfully!'); // Inform the user that the image is saved
  } else {
    alert('No image to save.');
  }
});

// Retake the image (redirect back to capture page without saving)
document.getElementById('retakeBtn').addEventListener('click', () => {
  sessionStorage.removeItem('capturedImage');
  window.location.href = 'capture.html';
});

// Open gallery page
document.getElementById('galleryBtn').addEventListener('click', () => {
  sessionStorage.setItem('previousPage', 'display'); // Set previous page as display
  window.location.href = 'gallery.html';
});

// Go back to the capture page
document.getElementById('goBackBtn').addEventListener('click', () => {
  sessionStorage.removeItem('capturedImage'); // Clean up session storage
  window.location.href = 'capture.html';
});
