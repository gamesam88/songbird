import birdsData from "./birdsData.js";
import Game from "./game.js"
import createAbout from './about.js'

let main = document.querySelector('.main__wrapper')


function newGame() {
    const game = new Game(birdsData)
    game.createGameArea(main)
    game.appointState()

    main.addEventListener('stopSong', () => {
        game.__audio.currentTime = 0
        game.__audio.pause()
    })

    main.addEventListener('StartPage', () => {
        game.__audio.currentTime = 0
        game.__audio.pause()
        aboutGame()
    })
}

function aboutGame() {
    createAbout(main)
    let newGameBtn = document.querySelector('.main-greeting__btn')
    newGameBtn.addEventListener('click', newGame)
}


main.addEventListener('retryGame', newGame)

aboutGame()








