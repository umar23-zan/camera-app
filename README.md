# Camera App
## 1. Project Overview
This web app allows users to capture live images from their device’s camera, display the captured image for review, and optionally save it to a gallery. The app is designed with a mobile-friendly interface but works well on desktop devices too. The app also includes buttons for camera switching, a gallery view, and an exit option.

## 2. Key Features
Image Capture: Users can capture images using their device's camera.
Image Review: Captured images are displayed on a review page where users can either save them to a gallery or retake them.
Gallery View: Saved images are displayed in a gallery, where users can view their captured images.
Camera Switching: Users can switch between the front and rear cameras.
Exit Button: The exit button is functional only in Progressive Web Apps (PWA) or installed web apps, allowing the user to exit the app. In a regular browser, it will prompt the user to close the tab manually.

## 3. Technologies Used
HTML5: For structuring the web pages.
CSS3: For responsive layout and styling.
JavaScript (ES6): For handling camera access, image capture, and navigation between pages.
MediaDevices API: Provides access to the device's camera for capturing live images.
Session Storage & Local Storage: Used to temporarily hold captured images before saving them to the gallery and storing them for later retrieval.

## 4. App Flow and Behavior
4.1 Capture Page (capture.html)
This page provides the interface to capture a live image using the device’s camera.

Flow:
The user can capture an image using the Capture Button.
The app temporarily saves the image to sessionStorage and redirects the user to the Display Page for review.
The user can also switch between the front and rear cameras using the Switch Camera button.
The Gallery Button redirects to the Gallery Page, displaying previously saved images.
Exit Button:
Behavior in Web App: If the app is running as a PWA or an installed web app, the Exit Button allows the user to close the app using the window.close() method.
Browser Limitation: In a regular browser, the Exit Button will not close the tab because of browser security policies. A manual close prompt can be displayed instead.
Key HTML Elements:
```
<button id="captureBtn">Capture</button>
<button id="switchBtn">Switch Camera</button>
<button id="galleryBtn">Gallery</button>
<button id="exitBtn">Exit</button>
```
JavaScript for Camera Capture:
```
// Capture the image and redirect to display page
captureBtn.addEventListener('click', () => {
  // Capture image from the video stream
  const imageData = canvas.toDataURL('image/png');
  sessionStorage.setItem('capturedImage', imageData);
  window.location.href = 'display.html'; // Redirect to display page
});

// Exit the app or show a message for manual tab closure
exitBtn.addEventListener('click', () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    window.close(); // Only works in PWA or installed app
  } else {
    alert('Please close the tab manually.');
  }
});
```
4.2 Display Page (display.html)
The Display Page allows the user to review the captured image. The user can choose to Save the image to the gallery or Retake it.

Flow:
The captured image is shown to the user for review.
The user can Save the image to localStorage (the gallery) or retake the image (returning to the Capture Page).
The Gallery Button opens the gallery view.
The Go Back Button takes the user back to the Capture Page without saving the image.
```
<img id="capturedImage" alt="Captured Image">
<button id="saveBtn">Save</button>
<button id="retakeBtn">Retake</button>
<button id="galleryBtn">Gallery</button>
<button id="goBackBtn">Go Back</button>
```
JavaScript for Image Review:
```
// Save the image to localStorage but stay on the same page
saveBtn.addEventListener('click', () => {
  const capturedImage = sessionStorage.getItem('capturedImage');
  if (capturedImage) {
    let images = JSON.parse(localStorage.getItem('savedImages')) || [];
    images.push(capturedImage);
    localStorage.setItem('savedImages', JSON.stringify(images));
    alert('Image saved successfully!');
  }
});

// Retake the image and go back to capture page
retakeBtn.addEventListener('click', () => {
  sessionStorage.removeItem('capturedImage');
  window.location.href = 'capture.html';
});
```
4.3 Gallery Page (gallery.html)
This page displays all saved images from localStorage.

Flow:
All saved images are loaded from localStorage and displayed.
The Go Back Button allows the user to return to either the Capture Page or Display Page, depending on where they navigated from.
Key HTML Elements:
```
<div id="gallery"></div>
<button id="goBackBtn">Go Back</button>
```
JavaScript for Gallery Page:
```
// Load saved images from localStorage
window.onload = function() {
  const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
  const galleryContainer = document.getElementById('gallery');

  if (savedImages.length === 0) {
    galleryContainer.innerHTML = '<p>No images saved.</p>';
  } else {
    savedImages.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      galleryContainer.appendChild(img);
    });
  }
};

// Go back to the previous page (capture or display)
goBackBtn.addEventListener('click', () => {
  const previousPage = sessionStorage.getItem('previousPage');
  window.location.href = previousPage === 'display' ? 'display.html' : 'capture.html';
});
```
## 5. Exit Button Behavior
In PWA or Installed App:
The Exit Button works in a PWA or installed app context using the following code:
```
if (window.matchMedia('(display-mode: standalone)').matches) {
  window.close(); // Works in PWA or installed apps
}
```
In Regular Web Browsers:
In regular web browsers, due to security restrictions, the Exit Button cannot close the window. Instead, the app prompts the user to close the tab manually:
```
alert('Please close the tab manually.');
```
## 6. Technological Limitations and Workarounds
Browser Restrictions on Closing Windows:
In a regular web environment, calling window.close() is restricted unless the window or tab was opened via JavaScript (like a pop-up). Therefore, the Exit Button behaves differently based on the environment:
Installed App: The button closes the app.
Browser: The user is prompted to close the tab manually.
Progressive Web App (PWA) Context:
When the app is installed as a PWA, it behaves more like a native app, and the window.close() function is allowed to work.
