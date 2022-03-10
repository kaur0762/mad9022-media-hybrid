import SONGS from "./media.js";

const APP = {
    player: null,
    list: null,
    audio: null,
    btnPlay: null,
    btnStop: null,
    btnPrev: null,
    btnNext: null,
    currentTrack:0,
    init: () => {
        APP.player = document.getElementById('player');
        APP.list = document.getElementById('playlist-area');
        APP.audio = document.getElementById('main-audio');
        APP.btnPlay = document.getElementById('btnPlay');
        APP.btnStop = document.getElementById('btnStop');
        APP.btnPrev = document.getElementById('btnPrevious');
        APP.btnNext = document.getElementById('btnNext');
        APP.addEventListener();
        APP.playList();
        APP.loadSong(APP.currentTrack);
    },
    addEventListener: () => {
        APP.btnPlay.addEventListener('click', APP.playTrack);
        APP.btnStop.addEventListener('click', APP.stopTrack);
        APP.btnPrev.addEventListener('click', APP.prevTrack);
        APP.btnNext.addEventListener('click', APP.nextTrack);
        APP.list.addEventListener('click', APP.currentSong);
    },
    playList: () => {
        // console.log('playlist added');
        for (let i = 0; i < SONGS.length; i++){
        let liTag = document.createElement("li");
        liTag.setAttribute('data-index', i);
        liTag.classList.add("songs");

        liTag.innerHTML = `
                        <img src="./media/${SONGS[i].img}.jpg" alt="${SONGS[i].title}">
                        <div class="names">
                            <p class="songName">${SONGS[i].title}</p>
                            <p class="artistName">${SONGS[i].artist}</p>
                        </div>
                        <time id="${SONGS[i].title}" class="audio-duration">00:00</time>
                        `;
        document.querySelector("#playlist-area ul").append(liTag);
        }
    },
    loadSong: (indexNumb) =>{
        console.log(APP.currentTrack);

        document.querySelector(".song-details .name").innerText = SONGS[indexNumb].title;

        document.querySelector(".song-details .artist").innerText = SONGS[indexNumb ].artist;
        
        document.querySelector(".img-area img").src = `media/${SONGS[indexNumb].img}.jpg`;

        document.querySelector("#main-audio").src = `media/${SONGS[indexNumb].src}.mp3`;
    },
    playMusic: (ev) => {
        // console.log('song played');
        APP.player.classList.add("paused");
        APP.btnPlay.querySelector("span").innerText = "pause";
        APP.audio.play();
    },
    pauseMusic: () => {
        // console.log('song paused');
        APP.player.classList.remove("paused");
        APP.btnPlay.querySelector("span").innerText = "play_arrow";
        APP.audio.pause();
    },
    playTrack: () =>{
        const isSongPlay = APP.player.classList.contains("paused");
        isSongPlay ? APP.pauseMusic(): APP.playMusic();
        // APP.currentSong();
    },
    stopTrack: (ev) => {
        // console.log('song stopped');
        APP.pauseMusic();
        APP.audio.currentTime = 0;
    },
    prevTrack: () => {
        APP.stopTrack();
        APP.currentTrack--;
        APP.currentTrack < 1 ? APP.currentTrack = SONGS.length : APP.currentTrack = APP.currentTrack ;
        APP.loadSong(APP.currentTrack);
    },
    nextTrack: () => {
        APP.stopTrack();
        APP.currentTrack++;
        APP.currentTrack > SONGS.length ? APP.currentTrack = 0 : APP.currentTrack = APP.currentTrack ;
        APP.loadSong(APP.currentTrack);
    },
    currentSong: (ev) =>{
        let clickedElement = ev.target;
        let listItem = clickedElement.closest('.songs');
        APP.currentTrack = parseInt(listItem.getAttribute('data-index') ); 
        APP.loadSong(APP.currentTrack);
    },
};
APP.init();