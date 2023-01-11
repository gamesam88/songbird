import Player from "./player.js"

class Game {
    __score = 0
    __stageNum = 0
    __curSong
    __isPlay = false
    __rightAnswer = false
    __audio = new Audio()

    constructor(birds) {
        this.__birds = birds
    }

    increaseScore() {
        let arr = document.querySelectorAll('.uncorrect')
        let res = 5 - arr.length
        this.__score += res
    }

    getStage() {
        return this.__birds[this.__stageNum]
    }

    increaseStageNum() {
        if (this.__stageNum < 5) {
            this.__stageNum += 1
        }
    }

    appointState() {
        let arr = document.querySelectorAll('.game__stage')
        arr.forEach(elem => {
            if (elem.value == this.__stageNum) {
                elem.classList.add('game__stage__active')
            } else {
                elem.classList.remove('game__stage__active')
            }
        })
    }

    gameOver() {
        let root = document.querySelector('.main__wrapper')
        let resultText = `Вы прошли викторину и набрали ${this.__score} из 30 возможных баллов`
        root.innerHTML = ''
        root.insertAdjacentHTML("afterbegin", `
        <div class="game-over">
        <div class="game-over__container">
        <h2 class="game-over__gratitude">Поздравляем!</h2>
        <p class="game-over__result">${resultText}</p>
        <span class="game-over__line"></span>
        <button class="game-over__btn">Сыграть ещё раз</button>
        </div> 
        </div>
        `)
        let retryGameBtn = document.querySelector('.game-over__btn')
        retryGameBtn.addEventListener('click', () => {
            let event = new Event("retryGame");
            root.dispatchEvent(event)
        })
    }

    playAudio() {
        let playButtonIcon = document.querySelector('.player__btn__icon')
        let timeLine = document.querySelector('.seek')
        let timeMin = document.querySelector(".sound-time-min")
        let timeMax = document.querySelector(".sound-time-max")

        if (!this.__isPlay) {
            this.__isPlay = true
            this.__audio.currentTime = timeLine.value
            this.__audio.play()

            playButtonIcon.classList.remove('icon-play')
            playButtonIcon.classList.add('icon-pause')

        } else {
            this.__isPlay = false
            this.__audio.pause()
            this.__audio.currentTime = timeLine.value

            playButtonIcon.classList.remove('icon-pause')
            playButtonIcon.classList.add('icon-play')
        }

        this.__audio.addEventListener('ended', () => {
            this.__isPlay = false
            this.__audio.currentTime = 0

            playButtonIcon.classList.remove('icon-pause')
            playButtonIcon.classList.add('icon-play')
        })

        this.__audio.ontimeupdate = () => {
            timeLine.max = this.__audio.duration
            timeLine.value = this.__audio.currentTime

            timeMax.innerHTML = this.getTimeCodeFromNum(this.__audio.duration)
            timeMin.innerHTML = this.getTimeCodeFromNum(this.__audio.currentTime)

        }

        timeLine.addEventListener('input', () => {
            this.__audio.currentTime = timeLine.value
            timeLine.value = this.__audio.currentTime
        })

    }

    nextStage() {
        let main = document.querySelector('.main__wrapper')
        this.increaseStageNum()
        this.createGameArea(main)
        this.appointState()
        this.__rightAnswer = false
    }

    playSound(soundName) {
        let sound = new Audio()

        if (soundName === 'ok') {
            sound.src = './assets/sounds/correct.mp3'
        } else if (soundName === 'no') {
            sound.src = './assets/sounds/uncorrect.mp3'
        } else if (soundName === 'final') {
            sound.src = './assets/sounds/final.mp3'
        }
        sound.addEventListener('canplaythrough', () => {
            sound.play()
        })
    }

    getImageFeth(pathToImg, elementToAppend) {
        const img = new Image()
        let link = pathToImg
        img.src = link
        try {
            img.onload = () => {
                if (elementToAppend) {
                    elementToAppend.innerHTML = ''
                    elementToAppend.append(img)
                }
            }
        } catch (error) {
            console.log(error)
        }
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


    createGameArea(elem) {
        function random(num) {
            let n = Math.floor(Math.random() * num)
            return n
        }

        function shuffleArray(array) {
            let existNums = []
            let result = []
            while (result.length < array.length) {
                let ranNum = random(array.length)
                if (!existNums.includes(ranNum)) {
                    result.push(array[ranNum])
                    existNums.push(ranNum)
                }
            }
            return result
        }

        let curStageBirds = shuffleArray(this.__birds[this.__stageNum])
        let unknownBird = curStageBirds[random(this.__birds[this.__stageNum].length)]

        this.__audio.currentTime = 0
        this.__audio.pause()
        this.__isPlay = false
        this.__curSong = unknownBird.audio
        this.__audio.src = this.__curSong

        elem.innerHTML = ''
        elem.insertAdjacentHTML("afterbegin", `
        <div class="game">
        <div class="game__container">

            <section class="header">
            <div class="header__wrapper">
                <div class="header__logo">
                    <div class="logo__text">
                        <h1>SongBird</h1>
                    </div>
                    <div class="logo__image">
                        <img src="./assets/logo.png" alt="bird">
                    </div>
                </div>
                <div class="bird__score"></div>
                </div>
                <ul class="game__stages">
                    <li class="game__stage game__stage__active" value='0'>Разминка</li>
                    <li class="game__stage" value='1'>Воробьиные</li>
                    <li class="game__stage" value='2'>Лесные птицы</li>
                    <li class="game__stage" value='3'>Певчие птицы</li>
                    <li class="game__stage" value='4'>Хищные птицы</li>
                    <li class="game__stage" value='5'>Морские птицы</li>
                </ul>
            </section>


            <div class="game__bird">
                <div class="bird__container">
                    <div class="bird__image"></div>
                    <div class="bird__content">
                    <div class="bird__info">
                    <h3 class="bird__name">******</h3> 
                    </div>
                        
                        <div class="bird__player">
                            <button class="player__btn">
                                <div class="player__btn__icon icon-play"></div>
                            </button>
                            <div class="seekbar">
                                <input type="range" class="seek" value="0" max="">
                            </div>
                            <div class="volume-container">
                            <div class="volume-button">
                                <div class="volume icon-volume"></div>
                            </div>
                            <div class="volume-slider volume-slider-unknown">
                                <div class="volume-percentage volume-percentage-unknown"></div>
                            </div>
                            </div>
                        </div>
                        <div class="time-watcher">
                            <span class="sound-time-min">0:00</span>
                            <span class="sound-time-max">0:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="game__main-section">
                <div class="main-section__options">
                <ul class="options__list">
                    <li class="options__item" value = ${curStageBirds[0].id}>${curStageBirds[0].name}</li>
                    <li class="options__item" value = ${curStageBirds[1].id}>${curStageBirds[1].name}</li>
                    <li class="options__item" value = ${curStageBirds[2].id}>${curStageBirds[2].name}</li>
                    <li class="options__item" value = ${curStageBirds[3].id}>${curStageBirds[3].name}</li>
                    <li class="options__item" value = ${curStageBirds[4].id}>${curStageBirds[4].name}</li>
                    <li class="options__item" value = ${curStageBirds[5].id}>${curStageBirds[5].name}</li>
                </ul>
                </div>
                <div class="main-section__example">
                Послушайте плеер. Выберите птицу из списка
                </div>
            </div>
            <button class="game__btn__next-level">Next level</button>
        </div>
    </div>
        `)

        const volumeSlider = document.querySelector(".volume-slider-unknown");
        volumeSlider.addEventListener('click', e => {
            const sliderHeigth = window.getComputedStyle(volumeSlider).height;
            const newVolume = e.offsetY / parseInt(sliderHeigth);
            this.__audio.volume = newVolume;
            document.querySelector(".volume-percentage-unknown").style.height = newVolume * 100 + '%';
        }, false)

        let logo = document.querySelector('.header__logo')
        logo.addEventListener('click', () => {
            let root = document.querySelector('.main__wrapper')
            let event = new Event("StartPage");
            root.dispatchEvent(event);
        })

        let player = new Player()

        let unknownImg = document.querySelector('.bird__image')
        let unknownImgPath = "./assets/unknown-bird.jpg"
        this.getImageFeth(unknownImgPath, unknownImg)


        let nextLevelBtn = document.querySelector('.game__btn__next-level')
        nextLevelBtn.addEventListener('click', () => {
            if (this.__rightAnswer && this.__stageNum < 5) {
                player.stopSound()
                this.nextStage()
            }
            if (this.__rightAnswer && this.__stageNum === 5) {
                player.stopSound()
                this.__audio.pause()
                this.gameOver()
                this.playSound('final')
            }
        })

        let optionsItems = document.querySelectorAll('.options__item')
        optionsItems.forEach((elem, id) => {
            elem.addEventListener('click', () => {

                if (elem.value == unknownBird.id && !this.__rightAnswer) {
                    player.stopSound()
                    if (!this.__audio.paused) {
                        this.playAudio()
                    }

                    let unknownName = document.querySelector('.bird__name')
                    unknownName.innerHTML = `${unknownBird.name}`

                    this.getImageFeth(unknownBird.image, unknownImg)
                    this.increaseScore()
                    this.playSound('ok')
                    elem.classList.add('correct')

                    nextLevelBtn.classList.add('next-level-available')

                    this.__rightAnswer = true

                } else {
                    if (!this.__rightAnswer) {
                        if (!elem.classList.contains('uncorrect')) {
                        }
                        this.playSound('no')
                        elem.classList.add('uncorrect')
                    }
                }

                player.createBirdAboutExample(curStageBirds[id])

            })
        })

        let score = document.querySelector('.bird__score')
        score.innerHTML = `Score: ${this.__score}`

        let playButton = document.querySelector('.player__btn')
        playButton.addEventListener('click', () => {
            this.playAudio()
        })
    }
}
export default Game

