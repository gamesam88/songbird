class Player {
    __audio = new Audio()
    __isPlay = false
    constructor() {
    }

    stopSound() {
        this.__audio.pause()
        this.__audio.currentTime = 0
        this.__isPlay = false
    }

    getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(
            seconds % 60
        ).padStart(2, 0)}`;
    }


    createBirdAboutExample(obj) {
        this.__isPlay = false
        this.__audio.pause()
        this.__audio.currentTime = 0

        let birdExample = document.querySelector('.main-section__example')
        birdExample.innerHTML = ''
        birdExample.insertAdjacentHTML("afterbegin", `
        <div class="bird-example__wrapper">
        <div class="bird-example__container">
            <div class="bird-example__content">
                <div class="bird-example__image">
                    <img src="${obj.image}" alt="bird"></img>
                </div>

                <div class="bird-example__info">

                    <h4 class="bird-example__name">${obj.name}</h4> 
                    <span class="bird-example__species">${obj.species}</span> 
                    
                    <div class="bird__player">
                        <button class="player__btn">
                            <div class="player__btn__icon icon-play player__btn__test"></div>
                        </button>
                        <div class=" seekbar">
                            <input type="range" class="seek seek__test" value="0" max="">
                        </div>
                        <div class="volume-container">
                            <div class="volume-button">
                                <div class="volume icon-volume"></div>
                            </div>
                            <div class="volume-slider volume-slider-example">
                                <div class="volume-percentage volume-percentage-example"></div>
                            </div>
                        </div>

                    </div>
                    <div class="time-watcher">
                        <span class="music-time-min">0:00</span>
                        <span class="music-time-max">0:00</span>
                    </div>
                </div>
            </div>
            <div class="bird-example__description">${obj.description}</div>
        </div>
        </div>
        `)

        const timeLine = document.querySelector('.seek__test')
        const playBtn = document.querySelector('.player__btn__test')
        const timeMin = document.querySelector(".music-time-min")
        const timeMax = document.querySelector(".music-time-max")

        const volumeSlider = document.querySelector(".volume-slider-example");
        volumeSlider.addEventListener('click', e => {
            const sliderHeigth = window.getComputedStyle(volumeSlider).height;
            const newVolume = e.offsetY / parseInt(sliderHeigth);
            this.__audio.volume = newVolume;
            document.querySelector(".volume-percentage-example").style.height = newVolume * 100 + '%';
        }, false)

        playBtn.addEventListener('click', () => {
            this.playAudio(obj.audio)
        })

        timeLine.addEventListener('input', () => {
            this.__audio.currentTime = timeLine.value
            timeLine.value = this.__audio.currentTime
        })

        this.__audio.addEventListener('ended', () => {
            this.__isPlay = false
            this.__audio.currentTime = 0

            playBtn.classList.remove('icon-pause')
            playBtn.classList.add('icon-play')
        })

        this.__audio.ontimeupdate = () => {
            timeLine.max = this.__audio.duration
            timeLine.value = this.__audio.currentTime

            timeMax.innerHTML = this.__audio.duration ? this.getTimeCodeFromNum(this.__audio.duration) : "0:00"
            timeMin.innerHTML = this.__audio.currentTime ? this.getTimeCodeFromNum(this.__audio.currentTime) : "0:00"
        }

    }

    playAudio(path) {
        this.__audio.src = path
        let playBtn = document.querySelector('.player__btn__test')
        let timeLine = document.querySelector('.seek__test')


        try {
            if (!this.__isPlay) {
                this.__isPlay = true
                this.__audio.currentTime = timeLine.value
                this.__audio.play()

                playBtn.classList.remove('icon-play')
                playBtn.classList.add('icon-pause')

            } else {
                this.__isPlay = false
                this.__audio.pause()
                this.__audio.currentTime = timeLine.value

                playBtn.classList.remove('icon-pause')
                playBtn.classList.add('icon-play')
            }

        } catch (error) {
            console.log(error)
        }
    }
}


export default Player