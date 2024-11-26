// Hide Loader When Scene is Ready
document.querySelector("a-scene").addEventListener("loaded", () => {
  document.getElementById("loader").style.display = "none";
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
menuToggle.addEventListener("click", () => {
  if (menu.classList.contains("menu-hidden")) {
    menu.classList.remove("menu-hidden");
    menu.classList.add("menu-visible");
  } else {
    menu.classList.remove("menu-visible");
    menu.classList.add("menu-hidden");
  }
});

// Volume Control
const volumeControl = document.getElementById("volume");
volumeControl.addEventListener("input", (e) => {
  const videos = document.querySelectorAll("video");
  const volume = e.target.value / 100;
  videos.forEach((video) => {
    video.volume = volume;
  });
});

// Toggle Video Looping
const toggleLoopButton = document.getElementById("toggle-loop");
toggleLoopButton.addEventListener("click", () => {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.loop = !video.loop;
  });
  alert(`Video looping is now ${videos[0].loop ? "enabled" : "disabled"}`);
});

// Video and logos setup
const videoElement = document.getElementById("ar-video");
const logoContainer = document.getElementById("logos");

// State variables
let isLooping = true; // Video loops by default

// Load content dynamically based on the current month
const months = [
  { name: "january", video: "assets/january-video.mp4", marker: "assets/marker-january.patt" },
  { name: "february", video: "assets/february-video.mp4", marker: "assets/marker-february.patt" },
  { name: "march", video: "assets/march-video.mp4", marker: "assets/marker-march.patt" },
  { name: "april", video: "assets/april-video.mp4", marker: "assets/marker-april.patt" },
  { name: "may", video: "assets/may-video.mp4", marker: "assets/marker-may.patt" },
  { name: "june", video: "assets/june-video.mp4", marker: "assets/marker-june.patt" },
  { name: "july", video: "assets/july-video.mp4", marker: "assets/marker-july.patt" },
  { name: "august", video: "assets/august-video.mp4", marker: "assets/marker-august.patt" },
  { name: "september", video: "assets/september-video.mp4", marker: "assets/marker-september.patt" },
  { name: "october", video: "assets/october-video.mp4", marker: "assets/marker-october.patt" },
  { name: "november", video: "assets/november-video.mp4", marker: "assets/marker-november.patt" },
  { name: "december", video: "assets/december-video.mp4", marker: "assets/marker-december.patt" },
];

document.addEventListener("DOMContentLoaded", () => {
  const currentMonth = new Date().getMonth(); // 0-indexed: January = 0
  const monthData = months[currentMonth];

  if (monthData) {
    setupMindAR(monthData.marker, monthData.video);
  } else {
    alert("Error: No data available for the current month!");
  }
});

// MindAR setup for dynamic marker and video
function setupMindAR(marker, videoSrc) {
  const mindAR = new MindAR.Player({
    container: document.getElementById("mindar-container"),
    imageTargetSrc: marker,
  });

  mindAR.on("targetFound", () => {
    videoElement.src = videoSrc;
    videoElement.loop = isLooping;
    videoElement.play();
  });

  mindAR.start();
}

// Toggle video looping functionality
toggleLoopButton.addEventListener("click", () => {
  isLooping = !isLooping;
  videoElement.loop = isLooping;
  toggleLoopButton.textContent = `Loop: ${isLooping ? "ON" : "OFF"}`;
});
