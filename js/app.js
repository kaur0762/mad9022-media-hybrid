import SONGS from './media.js';

const APP = {
    init: () => {
        APP.playList();
    },
    playList: () => {
        const ulTag = document.querySelector("ul");
    for (let i = 0; i < SONGS.length; i++) {
    let liTag = `<li li-index="${i + 1}" class="songs">
                <img src="${SONGS[i].img}">
                <div class="names">
                    <p class="songName">${SONGS[i].title}</p>
                    <p class="artistName">${SONGS[i].artist}</p>
                </div>
                <span id="${SONGS[i].title}" class="audio-duration">00:00</span>
                <audio class="${SONGS[i].title}" src="${SONGS[i].src}"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); 
    console.log("hello");
    }
    },
};
APP.init();