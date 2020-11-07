// * DOM elements 
const startButton = document.getElementById('btn-start'),
    mate = document.getElementById('btnManate'),
    pink = document.getElementById('btnPink'),
    opal = document.getElementById('btnOpal'),
    thistle = document.getElementById('btnThistle'),
    total_levels = 1

// * Game class 
class Game{

    constructor(){
        this.initializer()
        this.generateSequence()
        this.nextLevel()
        this.initializer = this.initializer.bind(this)
    }

    // ! Functions
    initializer(){
        this.selectColor = this.selectColor.bind(this)
        this.nextLevel = this.nextLevel.bind(this)
        this.toggleBtnDisabled()
        this.level = 1
        this.score = 0
        this.colors = {
            mate,
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

    nextLevel(){
        this.illuminateSequence()
        this.addListeners()
        this.sequenceReference = 0
    }

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
                return 'mate'
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
            case 'mate':
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
        this.colors.mate.addEventListener('click', this.selectColor)
        this.colors.opal.addEventListener('click', this.selectColor)
        this.colors.pink.addEventListener('click', this.selectColor)
        this.colors.thistle.addEventListener('click', this.selectColor)
    }

    // For inactive onclick events over the cards 
    removeListeners(){
        this.colors.mate.removeEventListener('click', this.selectColor)
        this.colors.opal.removeEventListener('click', this.selectColor)
        this.colors.pink.removeEventListener('click', this.selectColor)
        this.colors.thistle.removeEventListener('click', this.selectColor)
    }

    selectColor(ev){
        let colorName = ev.target.dataset.color 
        let colorNumber = this.fromColorToNumber(colorName)

        this.illuminateColor(colorName)

        if(colorNumber === this.sequence[this.sequenceReference]){
            this.sequenceReference ++

            if(this.sequenceReference === this.level){
                this.level++
                
                
                if(this.level === (total_levels + 1)){
                    this.removeListeners
                    this.youWin()
                } else {
                    // pass level 
                    setTimeout(() => this.nextLevel(), 2000 )
                }
            }

        } else {
            // you lose 
            this.youLose()
        }
    }


    youWin(){
        swal('Fantastic!','You win!','success')
        .then(this.initializer)
    }

    youLose(){
        swal('Oooh no!','You lose!','error')
        .then(() => {
            this.removeListeners()
            this.initializer()
        })
    }

    toggleBtnDisabled(){
        if(startButton.hasAttribute('disabled')){
            startButton.removeAttribute('disabled')
        } else {
            startButton.setAttribute('disabled', true)
        }
    }

} // Finish class



















startButton.addEventListener('click',startGame)

// * Game function
function startGame(){
    window.newGame = new Game()
}   