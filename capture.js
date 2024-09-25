const video = document.getElementById('video');
const captureBtn = document.getElementById('captureBtn');
const switchBtn = document.getElementById('switchBtn');
let useFrontCamera = false;
let currentStream;


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


function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }
}

startCamera();


switchBtn.addEventListener('click', () => {
  stopCamera();
  useFrontCamera = !useFrontCamera;
  startCamera();
});


captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = canvas.toDataURL('image/png');
  sessionStorage.setItem('capturedImage', imageData);

  stopCamera(); 
  window.location.href = 'display.html'; 
});


document.getElementById('galleryBtn').addEventListener('click', () => {
  window.location.href = 'gallery.html';
});

document.getElementById('exitBtn').addEventListener('click', () => {
  window.close();
});
