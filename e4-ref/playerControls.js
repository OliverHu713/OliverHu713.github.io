
let videoElement = document.getElementById("videoElement");
let playButton = document.getElementById("playButton");

let progressBar = document.getElementById("progressBar");


videoElement.removeAttribute("controls");

document.getElementById("controlsWrapper").style.display = "flex";


videoElement.addEventListener('loadedmetadata', () => {
  progressBar.setAttribute('max', videoElement.duration);
});


videoElement.addEventListener("playing", () => {
  
  if (!progressBar.getAttribute('max')){
    progressBar.setAttribute('max', videoElement.duration);
  }
});


videoElement.addEventListener("waiting", () => {
  progressBar.classList.add("timeline-loading");
});
videoElement.addEventListener("canplay", () => {
  progressBar.classList.remove("timeline-loading");
});


videoElement.addEventListener("ended", () => {
  playButton.style.backgroundImage = "url('./icons/play.svg')";
});

let muteButton = document.getElementById("muteButton");

function toggleMute() {
  if (videoElement.muted) {
    videoElement.muted = false;
    muteButton.classList.remove("muted");
  } else {
    videoElement.muted = true;
    muteButton.classList.add("muted");
  }
}


muteButton.addEventListener('click', toggleMute);



function playPause(){
 
  if (videoElement.paused || videoElement.ended) {
    
    videoElement.play();
    
    playButton.style.backgroundImage = "url('./icons/pause.svg')";
  } else {
    
    videoElement.pause();
    
    playButton.style.backgroundImage = "url('./icons/play.svg')";
  }
}


playButton.addEventListener('click', playPause);


videoElement.addEventListener('click', playPause);




videoElement.addEventListener('timeupdate', () => {
 
  progressBar.value = videoElement.currentTime;
});


function scrubToTime(e){
 
  let x = e.clientX - (progressBar.getBoundingClientRect().left + window.scrollX);
  videoElement.currentTime = clampZeroOne(x / progressBar.offsetWidth) * videoElement.duration;
}



progressBar.addEventListener('mousedown', scrubToTime);
progressBar.addEventListener('mousedown', (e) => {
  
  window.addEventListener('mousemove', scrubToTime);
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', scrubToTime);
  });
});






function clampZeroOne(input){
  return Math.min(Math.max(input, 0), 1);
}

function logEvent(e){
  console.log(e);
}

