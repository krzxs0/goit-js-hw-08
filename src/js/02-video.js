import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function saveCurrentTimeToLocalStorage(seconds) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
}

function handleTimeUpdate(event) {
  const seconds = event.seconds;
  saveCurrentTimeToLocalStorage(seconds);
}

player.on('timeupdate', throttle(handleTimeUpdate, 1000));

const storedTime = localStorage.getItem('videoplayer-current-time');
if (storedTime) {
  const currentTime = JSON.parse(storedTime);
  player.setCurrentTime(currentTime)
    .then(function (seconds) {
      console.log(`Значение времени из localStorage: ${seconds}`);
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log('Указано некорректное время в setCurrentTime, установлено время 0');
          break;

        default:
          console.log('Ошибка с другими причинами');
          break;
      }
    });
}

