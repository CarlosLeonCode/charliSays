// * DOM elements 
const startButton = document.getElementById('btn-start'),
    manate = document.getElementById('btnManate'),
    pink = document.getElementById('btnPink'),
    opal = document.getElementById('btnOpal'),
    thistle = document.getElementById('btnThistle'),
    total_levels = 10,
    score = document.getElementById('score'),
    level = document.getElementById('level'),
    gameZone = document.getElementById('gameZone')

// * Game class 
class Game{

    constructor(){
        this.initializer = this.initializer.bind(this)
        this.initializer()
        this.generateSequence()
        // Delay for start game 
        setTimeout(this.nextLevel, 1000)
    }

    // ! Functions
    initializer(){
        this.selectColor = this.selectColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)        
        this.toggleBtnDisabled()
        this.level = 1
        this.score = 0
        this.colors = {
            manate,
            pink,
            opal,
            thistle
        }
    }

    // Sequence of cards 
    generateSequence(){
        // 0 to 3 sequence 
        this.sequence = new Array(total_levels).fill(0).map( number => Math.floor(Math.random() * 4) )
    }

    // For pass of level 
    nextLevel(){
        this.illuminateSequence()
        this.addListeners()
        this.sequenceReference = 0
        this.score = this.level == 1 ? 0 : this.level * 100
        this.setGameDetails()
    }

    // For illuminate level sequence 
    illuminateSequence(){
        for(let i = 0; i < this.level; i++){
            // Get color 
            let color = this.fromNumberToColor(this.sequence[i])
            // Illuminate color 
            setTimeout(() => this.illuminateColor(color), 1000 * i )   
        }
        
    }

    // Convertor from number to color
    fromNumberToColor(number){
        switch(number){
            case 0:
                return 'manate'
            case 1:
                return 'pink'
            case 2:
                return 'opal'
            case 3:
                return 'thistle'
        }
    }

    // Convertor from color to number
    fromColorToNumber(color){
        switch(color){
            case 'manate':
                return 0
            case 'pink':
                return 1
            case 'opal':
                return 2
            case 'thistle':
                return 3
        }
    }

    // Illuminate a specific color 
    illuminateColor(color){
        this.colors[color].classList.add('illuminate-card')
        setTimeout(() => this.turnOffColor(color), 350) 
    }

    // Quit illuminate after illuminate it
    turnOffColor(color){
        this.colors[color].classList.remove('illuminate-card')
    }

    // For active onclick events over the cards 
    addListeners(){
        this.colors.manate.addEventListener('click', this.selectColor)
        this.colors.opal.addEventListener('click', this.selectColor)
        this.colors.pink.addEventListener('click', this.selectColor)
        this.colors.thistle.addEventListener('click', this.selectColor)
    }

    // For inactive onclick events over the cards 
    removeListeners(){
        this.colors.manate.removeEventListener('click', this.selectColor)
        this.colors.opal.removeEventListener('click', this.selectColor)
        this.colors.pink.removeEventListener('click', this.selectColor)
        this.colors.thistle.removeEventListener('click', this.selectColor)
    }

    // Select color whe user onclick
    selectColor(ev){
        let colorName = ev.target.dataset.color 
        let colorNumber = this.fromColorToNumber(colorName)
        this.illuminateColor(colorName)
        // --
        if(colorNumber === this.sequence[this.sequenceReference]){
            this.sequenceReference ++
            // If it's the card 
            if(this.sequenceReference === this.level){
                this.level++
                
                // * If was the last level 
                if(this.level === (total_levels + 1)){
                    this.youWin()
                } else {
                // * pass level 
                    setTimeout(() => this.nextLevel(), 2000 )
                }
            }
        } else {
            // you lose 
            this.youLose()
        }
    }

    // Whe user win 
    youWin(){
        swal('Fantastic!','You win!','success')
        .then(() => {
            this.removeListeners()
            this.toggleBtnDisabled()
            this.resetGameDetails()
            gameZone.classList.add('block')
        })
    }

    // When user lose 
    youLose(){
        swal('Oooh no!','You lose!','error')
        .then(() => {
            this.removeListeners()
            this.toggleBtnDisabled()
            this.resetGameDetails()
            gameZone.classList.add('block')
        })
    }

    // Active and inactive start bottom 
    toggleBtnDisabled(){
        if(startButton.hasAttribute('disabled')){
            startButton.removeAttribute('disabled')
        } else {
            startButton.setAttribute('disabled', true)
        }
    }

    setGameDetails(){
        score.textContent = this.score
        level.textContent = this.level
    }

    resetGameDetails(){
        score.textContent = 0
        level.textContent = 0
    }

} // Finish class

// For start game  
startButton.addEventListener('click',startGame)

// * Game function
function startGame(){
    gameZone.classList.remove('block')
    window.newGame = new Game()
}   