const CONSTANTS = {
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
}

export default class Bird {
    constructor(dimensions){
        this.dimensions = dimensions;
        this.x = this.dimensions.width / 3;
        this.y = this.dimensions.height / 2;
        this.velocity = 0;
    }

    drawBird(ctx){
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate(ctx){
        this.drawBird(ctx);
    }
}