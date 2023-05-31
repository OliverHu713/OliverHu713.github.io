
const descriptionColumn = document.getElementById('description-column');
const toggleButton = document.getElementById('toggle-button');

toggleButton.addEventListener('click', toggleColumn);

function toggleColumn() {
  descriptionColumn.classList.toggle('hidden');
}

let isDragging = false;
let startX;
let startY;

descriptionColumn.addEventListener('mousedown', startDrag);
descriptionColumn.addEventListener('mousemove', drag);
descriptionColumn.addEventListener('mouseup', stopDrag);
descriptionColumn.addEventListener('mouseleave', stopDrag);

function startDrag(event) {
  event.preventDefault(); 

  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
}

function drag(event) {
  if (isDragging) {
    const offsetX = event.clientX - startX;
    const offsetY = event.clientY - startY;
    startX = event.clientX;
    startY = event.clientY;
    descriptionColumn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
}

function stopDrag() {
  isDragging = false;
}

const cokeImage = document.getElementById('coke-image');
const clickCount = document.getElementById('click-count');
const feeling = document.getElementById('feeling');
const rankingList = document.getElementById('ranking-list');

let count = 0;

cokeImage.addEventListener('click', () => {

  cokeImage.classList.add('scale-effect');

  
  setTimeout(() => {
    cokeImage.classList.remove('scale-effect');
  }, 300);

 
  const clickSound = new Audio('coke.wav');
  clickSound.play();

  count++;
  clickCount.textContent = count;

  if (count === 1) {
    feeling.textContent = 'curious';
  } else if (count === 5) {
    feeling.textContent = 'excited';
  } else if (count === 10) {
    feeling.textContent = 'energetic';
  }

  if (count > 0) {
    const rankingItem = document.createElement('li');
    rankingItem.textContent = `Ranking ${count}: Feeling ${feeling.textContent}`;
    rankingList.appendChild(rankingItem);
  }
});

const backgroundMusic = new Audio('music.wav');
const volumeRange = document.getElementById('volume-range');

volumeRange.addEventListener('input', () => {
  const volume = volumeRange.value;
  backgroundMusic.volume = volume;
});

document.addEventListener('DOMContentLoaded', () => {
  backgroundMusic.play();
});


