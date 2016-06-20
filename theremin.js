var audioContext = new AudioContext(),
    oscillator, gainNode, theremin;
var arrowRight, arrowLeft, arrowDown, arrowUp;

(function() {
  theremin = document.querySelector('.Theremin');
  arrowRight = document.querySelector('.arrow-right');
  arrowLeft = document.querySelector('.arrow-left');
  arrowDown = document.querySelector('.arrow-down');
  arrowUp = document.querySelector('.arrow-up');
})();

document.addEventListener('mouseup', function() {
  if (oscillator) {
    oscillator.stop(audioContext.currentTime);
    oscillator.disconnect();
    gainNode.disconnect();
  }
  theremin.classList.remove('fade');
  manageArrows(false);
});

document.addEventListener('mousedown', function(event) {
  oscillator = audioContext.createOscillator();
  gainNode = audioContext.createGain();

  oscillator.connect(audioContext.destination);
  oscillator.connect(gainNode);

  gainNode.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  setSoundProperties(event);
  theremin.classList.add('fade');
  manageArrows(true);
});

document.addEventListener('mousemove', function(event) {
  setSoundProperties(event);
});

function setSoundProperties(event) {
  if (oscillator) oscillator.frequency.value = calculateFrequency(event);
  if (gainNode) gainNode.gain.value = calculateVolume(event);
}

function calculateFrequency(event) {
  // Humar ear: 20Hz-20kHz
  var minFrequency = 300,
      maxFrequency = 2000;

  return ((event.clientX / window.innerWidth) * maxFrequency + minFrequency);
}

function calculateVolume(event) {
  return ((event.clientY / window.innerHeight) * 100);
}

function manageArrows(toFade) {
  if (toFade) {
    arrowRight.classList.add('fadeRight');
    arrowLeft.classList.add('fadeLeft');
    arrowUp.classList.add('fadeUp');
    arrowDown.classList.add('fadeDown');
  } else {
    arrowRight.classList.remove('fadeRight');
    arrowLeft.classList.remove('fadeLeft');
    arrowUp.classList.remove('fadeUp');
    arrowDown.classList.remove('fadeDown');
  }
}
