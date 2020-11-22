import Bird from "./bird";
import Level from "./level";


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
        this.addEvents();
        this.restart();
    }

    click(){
        //clicking makes bird fly up, or starts the game if not running
        if (!this.running) this.play();
        this.bird.flap();
    }

    addEvents(){
        //add events to canvas
        this.ctx.canvas.addEventListener("mousedown", () => this.click());  //mousedown calls click()
    }

    restart(){
        //reset the level, bird, running status, then call animate
        this.level = new Level(this.dimensions);
        this.bird = new Bird(this.dimensions);
        this.running = false;
        this.animate();
    }

    play(){
        //begin playing game, set running status and start animation
        this.running = true;
        this.animate();
    }

    animate(){
        //creates images on canvas while the game is running
        this.level.animate(this.ctx);
        this.bird.animate(this.ctx);
        if (this.running) requestAnimationFrame(() => this.animate());
    }

}