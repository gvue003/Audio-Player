// DOM Elements
const speedSelect = document.getElementById("speed");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");
const barColorInput = document.getElementById("bar-color");
const musicFileInput = document.getElementById("music-file");
const timelineBars = document.querySelector(".timeline-bars");
const timestampSlider = document.getElementById("timestamp-slider");

// Event Listeners
timestampSlider.addEventListener("input", handleTimestampSlider);
timelineBars.addEventListener("click", handleTimelineClick);
musicFileInput.addEventListener("change", handleMusicFileChange);
speedSelect.addEventListener("change", handleSpeedChange);
barColorInput.addEventListener("input", handleBarColorChange);

// Audio Time Update Listener
audio.addEventListener("timeupdate", updateAudioTime);

// Initial Setup
updatePlayButtonState();
createTimelineBars();
updateVisualizer();

// Functions

function handleTimestampSlider(e) {
  const selectedTime = parseFloat(timestampSlider.value);
  audio.currentTime = selectedTime;
}

function handleTimelineClick(e) {
  const clickPosition = e.clientX - timelineBars.getBoundingClientRect().left;
  const timelineWidth = timelineBars.clientWidth;
  const percentClicked = clickPosition / timelineWidth;
  const jumpTime = percentClicked * audio.duration;
  audio.currentTime = jumpTime;
}

function handleMusicFileChange(e) {
  const selectedFile = musicFileInput.files[0];
  if (selectedFile) {
    const objectURL = URL.createObjectURL(selectedFile);
    audio.src = objectURL;
    audio.play();
  }
}

function handleSpeedChange(e) {
  const selectedSpeed = parseFloat(speedSelect.value);
  audio.playbackRate = selectedSpeed;
}

function handleBarColorChange(e) {
  const selectedColor = barColorInput.value;
  for (const element of elements) {
    element.style.background = selectedColor;
  }
}

function updateAudioTime() {
  const currentTime = audio.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const totalDuration = audio.duration;
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalSeconds = Math.floor(totalDuration % 60);
  totalDurationDisplay.textContent = `${totalMinutes}:${totalSeconds < 10 ? "0" : ""}${totalSeconds}`;
}

function createTimelineBars() {
  const numberOfBars = 10; // Adjust the number of bars as needed
  for (let i = 0; i < numberOfBars; i++) {
    const bar = document.createElement("div");
    bar.classList.add("timeline-bar");
    bar.style.left = `${(i / (numberOfBars - 1)) * 100}%`;
    timelineBars.appendChild(bar);
  }
}

function updateVisualizer() {
  requestAnimationFrame(updateVisualizer);
  analyser.getByteFrequencyData(dataArray);
  const maxBarHeight = visualizer.clientHeight;
  const barWidth = visualizer.clientWidth / bufferLength;

  for (let i = 0; i < bufferLength; i++) {
    let barHeight = (dataArray[i] / 255) * maxBarHeight;
    elements[i].style.height = `${barHeight}px`;
    elements[i].style.width = `${barWidth}px`;
  }
}
updateVisualizer();
