// Code Started

console.clear()
let searchItem = document.getElementById('searchItem');
let searchBtn = document.getElementById('searchBtn');
let playPause = document.getElementById('playPause');
let cardParent = document.getElementById('cardParent');
let searchResTitle = document.getElementById('searchResTitle');
let loading = document.getElementById('loading');
let player;
const { Player } = window.Shikwasa

const startPlayer = (title, artist, cover, src) => {
    const player = new Player({
        container: () => document.querySelector('.controller'),
        audio: {
            title,
            artist,
            cover,
            src,
        },
    })
    return player
}
const handlePlayPause = (event) => {
    let playPauseClass = document.getElementsByClassName('playPause');
    for (let i = 0; i < playPauseClass.length; i++) {
        if (event.target != playPauseClass[i]) {
            playPauseClass[i].src = '/images/play.png';
        }
    }
    let title = event.target.getAttribute('title').split("-").join(" ");
    let artist = event.target.getAttribute('artist').split("-").join(" ");
    let cover = event.target.getAttribute('cover');
    let src = event.target.getAttribute('song');
    if (event.target.src.includes('play')) {
        event.target.src = '/images/pause.png';
        player = startPlayer(title, artist, cover, src);
        player.play()
    } else {
        event.target.src = '/images/play.png';
        player.toggle()
    }
}

searchBtn.addEventListener('click', async () => {
    searchResTitle.classList.add("hidden")
    cardParent.innerHTML = '';
    loading.classList.remove('hidden');
    let searchValue = searchItem.value;
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchValue}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a844465ebemsh4143ea18a2f85bep166d67jsn39383646b75c',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        searchResTitle.classList.remove('hidden');
        loading.classList.add('hidden');
        showResult(result);
    } catch (error) {
        console.error(error);
    }
})

const showResult = (data) => {
    cardParent.innerHTML = '';
    data.data.forEach(element => {
        let card = `
        <div class="pt-6">
        <div class="flow-root bg-light rounded-lg px-4 pb-8">
            <div class="-mt-6 card">
                <div class="flex items-center justify-center">
                    <span class="p-3 rounded-md shadow-lg">
                        <img src=${element.album.cover}
                            width="140" height="140" alt="" />
                    </span>
                </div>
                <div class="text-center p-5 justify-center items-center">
                    <h3 class="mt-2 text-lg text-center font-medium text-primary tracking-tight">
                        ${element.artist.name}
                    </h3>
                    <span class="mt-2 mb-4 max-w-xs text-sm text-secondary block">
                        ${element.title_short}
                    </span>
                    <img id="playPause" class="playPause" onclick='handlePlayPause(event)' title=${element.title.split(" ").join("-")} artist=${element.artist.name.split(" ").join("-")} cover=${element.album.cover}  song=${element.preview} class="mt-5 text-sm playPause text-active" src="/images/play.png" />
                </div>
            </div>
        </div>
    </div>
        `
        cardParent.innerHTML += card;
    });
}

crawler('Cat videos', function (results) {
    console.dir(results); //Outputs an array filled with cat videos.
});