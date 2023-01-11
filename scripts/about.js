const createAboutSection = (elem) => {
    elem.innerHTML = ''

    let greetingText = 'In this game you need to listen to the birds singing and guess what kind of bird it is.'

    elem.insertAdjacentHTML("afterbegin", `

    <div class="greeting__content">
    
        <div class="greeting">
        <div class="header__logo">
        <div class="logo__text">
            <h1>SongBird</h1>
        </div>
        <div class="logo__image">
            <img src="./assets/logo.png" alt="bird">
        </div>
    </div>
            <h2 class="greeting__text">Hello! Lets play!</h2>
            <p class="greeting__text">${greetingText}</p>
            <button class="main-greeting__btn">Play game</button>
        </div>        
    </div>

    `)

}

export default createAboutSection
