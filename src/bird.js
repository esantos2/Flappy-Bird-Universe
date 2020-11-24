const CONSTANTS = {
    FLAP_SPEED: 8,
    GRAVITY: 0.4,
    TERMINAL_VELOCITY: 12
};

export default class Bird {
    constructor(dimensions, charDetails){
        this.dimensions = dimensions;
        this.width = charDetails.width;
        this.height = charDetails.height;
        this.x = this.dimensions.width / 3;
        this.y = 0;
        this.velocity = 0;
    }

    getBounds(){
        //returns an object with the current bounds of the bird
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }

    drawBird(ctx){
        //receives canvas context, draws bird
        ctx.fillStyle = "gold";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(charChoice, player.x, player.y, player.pWidth, player.pHeight);
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
        this.moveBird();
        this.drawBird(ctx);
    }
}