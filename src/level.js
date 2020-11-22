export default class Level {
    constructor(dimensions){
        this.dimensions = dimensions;

    }

    drawBackground(ctx){
        //receives canvas context, draws background
        ctx.fillStyle = "PALETURQUOISE";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    animate(ctx){
        //receives canvas context, draws structures in the level
        this.drawBackground(ctx);
    }
}