import Bird from "./bird";
import Level from "./level";
import * as CHAR_INFO from "./character_info";

export default class Game {
    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.dimensions = {
            width: canvas.width,
            height: canvas.height
        };
        this.level = null;
        this.bird = null;
        this.running = false;
        this.score = 0;
        this.addEvents();
        this.restart();
        this.toggleTitleScreen();
    }

    _toggleVisibility(element){
        //receives reference to element, toggles visibility
        element.id = (element.id !== "show") ? "show" : "no-show";
    }

    _showMenu(menuElement, titleElement){
        //receives menu and title elements, toggles background and menu visibility
        this._toggleVisibility(menuElement);
        this._toggleVisibility(titleElement);
        this._toggleVisibility(document.querySelector(".backBox"));
    }

    toggleTitleScreen(){
        //runs title screen animation, starting game goes to character selection screen
        this._toggleVisibility(document.querySelector(".startButton")); //show start button
        
        //run pipe animation until start button clicked
    }

    toggleCharacterSelectionScreen(){
        //presents character selection, initializes bird object and calls startGame
        const charSelection = document.querySelector(".charSelection");
        const menuTitle = document.querySelector(".menuTitle");
        menuTitle.innerHTML = "Choose your character!";
        this._showMenu(charSelection, menuTitle);
    }

    toggleEndGameScreen(){
        //presents end game screen and options to try again or choose character

        //called when gameOver
        //presents score, high score, options
            //Restart
                //call start game w/ current bird details --> getBirdAttributes()
            //change character
                //call toggleCharacterSelectionScreen()
    }

    handleStartButton(){
        return (e) => {
            e.preventDefault();
            this._toggleVisibility(document.querySelector(".startButton"));
            this.toggleCharacterSelectionScreen();
        }
    }

    handleSelection(){
        return (e) => {
            e.preventDefault();
            const name = parseInt(e.target.id);
            //retrieve selected char details
            const charSelection = document.querySelector(".charSelection");
            const menuTitle = document.querySelector(".menuTitle");
            this._showMenu(charSelection, menuTitle);
            this.play();
        }
    }

    startGame(){
        //starts game by setting running status and calling restart

        //initializes bird, level, running, score
            //basically the current restart()
    }

    click(){
        //clicking makes bird fly up, or starts the game if not running
        if (!this.running) this.play();
        this.bird.flap();
    }

    addEvents(){
        //click on canvas makes bird fly
        this.ctx.canvas.addEventListener("mousedown", () => this.click());  //mousedown calls click()

        //start button leads to character selection screen
        const startButton = document.querySelector(".startButton");
        startButton.addEventListener("click", this.handleStartButton());

        //load characters to character selection menu
        const charSelection = document.querySelector(".charSelection");
        CHAR_INFO.createCharacterMenu(charSelection, this.handleSelection());
    }

    drawScore() {
        //draws the score at the top of the canvas
        const currentScore = document.querySelector(".show-score");
        currentScore.innerHTML = this.score;
    }

    restart(){
        //reset the level, bird, running status, then call animate
        this.level = new Level(this.dimensions);
        this.bird = new Bird(this.dimensions);
        this.score = 0;
        this.running = false;
        this.animate();
    }

    play(){
        //begin playing game, set running status and start animation
        this.running = true;
        this.animate();
    }

    gameOver(){
        //returns true if bird collides with pipe
        return this.level.collidesWith(this.bird.getBounds());
    }

    animate(){
        //creates images on canvas while the game is running
        this.level.animate(this.ctx);
        if (this.running) this.bird.animate(this.ctx);

        //check for collisions, end game if bird hits pipe
        if (this.gameOver()){
            this.restart();
        }

        //update and draw score
        this.level.updateScore(this.bird.getBounds(), () => this.score++ );
        this.drawScore();

        if (this.running) requestAnimationFrame(() => this.animate());
    }

}