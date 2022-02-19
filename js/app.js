import SONGS from './media.js';

const APP = {
    player: null,
    audio: null,
    btnPlay: null,
    btnStop: null,
    btnPrev: null,
    btnNext: null,
    songName: null,
    songArtist: null,
    songImg: null,
    mainAudio: null,
    ulTag: null,
    allLiTag: null,
    currentTrack: 0,
    songIndex : Math.floor((Math.random() * SONGS.length) + 1),
    isSongPaused : true,
    init: () => {
        APP.player = document.getElementById('player');
        APP.audio = document.getElementById('audio');
        APP.btnPlay = document.getElementById('btnPlay');
        APP.btnStop = document.getElementById('btnStop');
        APP.btnPrev = document.getElementById('btnPrevious');
        APP.btnNext = document.getElementById('btnNext');
        APP.songName = document.querySelector(".song-details .name");
        APP.songArtist = document.querySelector(".song-details .artist");
        APP.songImg = document.querySelector(".img-area img");
        APP.mainAudio = document.querySelector("#main-audio");
        APP.ulTag = document.querySelector("ul");
        APP.allLiTag = APP.ulTag.getElementsByClassName("songs");
        APP.addListeners();
        APP.playList();
        // APP.currentSong();
        APP.loadSong();
    },
    addListeners: () => {
        APP.btnPlay.addEventListener('click', APP.playTrack);
        APP.btnStop.addEventListener('click', APP.stopTrack);
        APP.btnPrev.addEventListener('click', APP.prevButton);
        APP.btnNext.addEventListener('click', APP.nextButton);
        APP.ulTag.addEventListener('click', APP.currentSong);
        // APP.allLiTag.addEventListener('click', APP.currentSong);
    },
    playMusic: (ev) => {
        // alert("hi");
        APP.player.classList.add("paused");
        APP.btnPlay.querySelector("span").innerText = "pause";
        APP.audio.play();
        // APP.startAnimations();
    },
    playTrack: () =>{
        const isSongPlay = APP.player.classList.contains("paused");
        isSongPlay ? APP.pauseMusic() : APP.playMusic();
        APP.currentSong();
    },
    pauseMusic: () => {
        // alert("hi");
        APP.player.classList.remove("paused");
        APP.btnPlay.querySelector("span").innerText = "play_arrow";
        APP.mainAudio.pause();
    },
    stopTrack: (ev) => {
        // alert("hi");
        // APP.mainAudio.pause();
        APP.pauseMusic();
        APP.mainAudio.currentTime = 0;
        // APP.stopAnimations();
    },
    prevButton: () => {
        alert("hi");
        APP.stopTrack();
        APP.currentTrack = APP.prevTrack();
        APP.loadSong();
        APP.currentSong();
        APP.playTrack();
    },
    prevTrack: () => {
        let len = SONGS.length;
        APP.currentTrack-- ;
        if (APP.currentTrack < len) {
            APP.currentTrack = 0;
        }
    },
    nextButton: () => {
        // alert("hi");
        APP.stopTrack();
        APP.currentTrack = APP.nextTrack();
        APP.loadSong();
        APP.currentSong();
        APP.playTrack();
    },
    nextTrack: () => {
        let len = SONGS.length;
        APP.currentTrack++ ;
        if (APP.currentTrack >= len) {
            APP.currentTrack = 0;
        }
    },
    playList: () => {
        // const ulTag = document.querySelector("ul");
        for (let i = 0; i < SONGS.length; i++){
            let liTag = document.createElement("li");
            liTag.setAttribute('data-index', i);
            liTag.classList.add("songs");

            if(i === APP.currentTrack){
                liTag.classList.add("active");
            }

            liTag.innerHTML = `
                        <img src="./media/${SONGS[i].img}.jpg" alt="${SONGS[i].title}">
                        <div class="names">
                            <p class="songName">${SONGS[i].title}</p>
                            <p class="artistName">${SONGS[i].artist}</p>
                        </div>
                        <span id="${SONGS[i].title}" class="audio-duration">00:00</span>
                        `;
            APP.ulTag.append(liTag);
            
        }
    },
    loadSong: () => {
        APP.songName.innerText = SONGS[APP.currentTrack].title;

        APP.songArtist.innerText = SONGS[APP.currentTrack].artist;
        
        APP.songImg.src = `media/${SONGS[APP.currentTrack].img}.jpg`;

        APP.mainAudio.src = `media/${SONGS[APP.currentTrack].src}.mp3`;
    },
    currentSong: () => {
        for (let i = 0; i < APP.allLiTag.length; i++) {
            let audioTag = APP.allLiTag[i].querySelector(".audio-duration");

            if(APP.allLiTag[i].classList.contains("active")){
                APP.allLiTag[i].classList.remove("active");
                let adDuration = audioTag.getAttribute("t-duration");
                audioTag.innerText = adDuration;
            }

            if(APP.allLiTag[i].getAttribute("data-index") == APP.songIndex){
            APP.allLiTag[i].classList.add("active");
            audioTag.innerText = "Playing";
            }

            // APP.allLiTag[i].setAttribute("onclick", "clicked(this)");
            if(APP.allLiTag[i].clicked == true){
                clicked(i);
            }
        }
    },
    clicked: (element)=> {
        let getLiIndex = element.getAttribute("data-index");
        APP.currentTrack = getLiIndex;
        APP.loadSong(APP.currentTrack);
        APP.playTrack();
        APP.currentSong();
    }
};
APP.init();