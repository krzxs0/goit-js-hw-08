import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let timeoutId;

function saveCurrentTimeToLocalStorage(seconds) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
}

function handleTimeUpdate(event) {
  const seconds = event.seconds;
  saveCurrentTimeToLocalStorage(seconds);
}

function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      func(...args);
      lastCall = now;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastCall = now;
      }, delay);
    }
  };
}

