import SONGS from './media.js';

const APP = {
    player: null,
    audio: null,
    btnPlay: null,
    btnPause: null,
    btnStop: null,
    currentTrack: 0,
    init: () => {
        (APP.player = document.getElementById('player')),
        (APP.audio = document.getElementById('audio')),
        (APP.btnPlay = document.getElementById('btnPlay')),
        (APP.btnPause = document.getElementById('btnPause')),
        (APP.btnStop = document.getElementById('btnStop')),
        APP.addListeners();
        APP.playList();
        APP.currentSong();
    },
    addListeners: () => {
        APP.btnPlay.addEventListener('click', APP.playTrack);
        APP.btnPause.addEventListener('click', APP.pauseTrack);
        APP.btnStop.addEventListener('click', APP.stopTrack);
    },
    playTrack: (ev) => {
        // alert("hi");
        if (!APP.audio.paused) return;                                  
        APP.audio.src = SONGS[APP.currentTrack].src;
        APP.audio.play();
        document.getElementById('btnPlay').classList.add('hidden');
        document.getElementById('btnPause').classList.remove('hidden');
        // APP.startAnimations();
    },
    pauseTrack: () => {
        // alert("hi");
        if (!APP.audio.played) return;
        APP.audio.src = SONGS[APP.currentTrack].src;
        APP.audio.pause();
        document.getElementById('btnPlay').classList.remove('hidden');
        document.getElementById('btnPause').classList.add('hidden');
    },
    stopTrack: (ev) => {
        // alert("hi");
        APP.audio.pause();
        APP.audio.currentTime = 0;
        document.getElementById('btnPlay').classList.remove('hidden');
        document.getElementById('btnPause').classList.add('hidden');
        // APP.stopAnimations();
    },
    playList: () => {
    const ulTag = document.querySelector("ul");
    for (let i = 0; i < SONGS.length; i++) {
    let liTag = `<li li-index="${i + 1}" class="songs">
                <img src="${SONGS[i].img}" alt="${SONGS[i].title}">
                <div class="names">
                    <p class="songName">${SONGS[i].title}</p>
                    <p class="artistName">${SONGS[i].artist}</p>
                </div>
                <span id="${SONGS[i].title}" class="audio-duration">00:00</span>
                
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag); 
    //console.log("hello");
    };
    },
    currentSong: () => {
        const divTag = document.querySelector(".currentSong");
            let songTag = `<img src="${SONGS[APP.currentTrack].img}" alt="${SONGS[APP.currentTrack].title}">
                            <h2> ${SONGS[APP.currentTrack].title} </h2>
                            <div id="audio-animation">
                                <audio id="audio" src="${SONGS[APP.currentTrack].src}"></audio>
                            </div>`;
        divTag.insertAdjacentHTML("beforeend", songTag);
    },
};
APP.init();