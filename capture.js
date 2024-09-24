const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const switchBtn = document.getElementById('switchBtn');
let useFrontCamera = false;
let currentStream;

// Start the camera
function startCamera() {
  const constraints = {
    video: { facingMode: useFrontCamera ? 'user' : 'environment' }
  };
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
    });
}

// Stop the camera
function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
}

startCamera();

// Switch between front and back cameras
switchBtn.addEventListener('click', () => {
  stopCamera();
  useFrontCamera = !useFrontCamera;
  startCamera();
});

// Capture the image and redirect to display page
captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  sessionStorage.setItem('capturedImage', imageData);

  stopCamera(); // Stop the video stream
  window.location.href = 'display.html'; // Redirect to display page
});

// Open gallery page
document.getElementById('galleryBtn').addEventListener('click', () => {
  window.location.href = 'gallery.html';
});

// Exit button functionality (this only works on installed apps, not web pages)
document.getElementById('exitBtn').addEventListener('click', () => {
  window.close();
});
