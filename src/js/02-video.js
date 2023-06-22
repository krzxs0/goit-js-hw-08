import Player from '@vimeo/player';
const lodash = require('lodash');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', lodash.throttle((e) => {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(e.seconds));
}, 1000));

if (localStorage.getItem('videoplayer-current-time') !== undefined) {
   player.setCurrentTime(JSON.parse(localStorage.getItem('videoplayer-current-time')))
}