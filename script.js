// Video and logos setup
const videoElement = document.getElementById('ar-video');
const toggleLoopButton = document.getElementById('toggle-loop');
const logoContainer = document.getElementById('logos');

// State variables
let isLooping = true; // Video loops by default

// Load content dynamically based on month
const months = [
  { name: "january", video: "assets/january-video.mp4", marker: "assets/marker-january.patt" },
  { name: "february", video: "assets/february-video.mp4", marker: "assets/marker-february.patt" },
  // Add all months here...
];

document.addEventListener('DOMContentLoaded', () => {
  const currentMonth = new Date().getMonth(); // 0-indexed
  const monthData = months[currentMonth];
  
  if (monthData) {
    setupMindAR(monthData.marker, monthData.video);
  } else {
    alert("Error: No data for this month!");
  }
});

// Toggle video looping
toggleLoopButton.addEventListener('click', () => {
  isLooping = !isLooping;
  videoElement.loop = isLooping;
  toggleLoopButton.textContent = `Loop: ${isLooping ? "ON" : "OFF"}`;
});

// MindAR setup
function setupMindAR(marker, videoSrc) {
  const mindAR = new MindAR.Player({
    container: document.getElementById('mindar-container'),
    imageTargetSrc: marker,
  });

  mindAR.on('targetFound', () => {
    videoElement.src = videoSrc;
    videoElement.play();
  });

  mindAR.start();
}
