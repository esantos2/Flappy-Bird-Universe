const CONSTANTS = {
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30,
    FLAP_SPEED: 12,
    GRAVITY: 0.4,
    TERMINAL_VELOCITY: 12
};

export default class Bird {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
        this.velocity = 0;
    }

    getBounds(){
        //returns an object with the current bounds of the bird
        return {
            left: this.x,
            right: this.x + CONSTANTS.BIRD_WIDTH,
            top: this.y,
            bottom: this.y + CONSTANTS.BIRD_HEIGHT
        };
    }

    drawBird(ctx){
        //receives canvas context, draws bird
        ctx.fillStyle = "gold";
        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    moveBird(){
        //updates bird velocity and position for each frame
        this.y += this.velocity;            //update vertical position
        this.velocity += CONSTANTS.GRAVITY  //update acceleration due to gravity

        //prevent bird from exceeding terminal velocity in positive and negative directions
        if (Math.abs(this.velocity) > CONSTANTS.TERMINAL_VELOCITY){
            if (this.velocity > 0){
                this.velocity = CONSTANTS.TERMINAL_VELOCITY;
            } else {
                this.velocity = -1 * CONSTANTS.TERMINAL_VELOCITY;
            }
        }
    }

    flap(){
        //adjusts velocity for bird to fly up
        this.velocity = -1 * CONSTANTS.FLAP_SPEED;
    }

    animate(ctx){
        //receives canvas context, animates bird movement and physics
        this.drawBird(ctx);
    }
}