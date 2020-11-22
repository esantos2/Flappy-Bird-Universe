const CONSTANTS = {
    GAP_HEIGHT: 150,
    PIPE_WIDTH: 50,
    PIPE_SPACING: 220,
    EDGE_BUFFER: 50,
    PIPE_SPEED: 2
};

export default class Level {
    constructor(dimensions){
        this.dimensions = dimensions;
        const initialSpawn = this.dimensions.width + (60 * PIPE_SPEED);
        this.pipes = [
            this.getRandomPipe(initialSpawn),
            this.getRandomPipe(initialSpawn + CONSTANTS.PIPE_SPACING),
            this.getRandomPipe(initialSpawn + 2 * CONSTANTS.PIPE_SPACING)
        ];
    }

    getRandomPipe(x){
        //receives starting x coord, returns new pipe object
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const pipe = {
            topPipe: {
                left: x,
                right: x + CONSTANTS.PIPE_WIDTH,
                top: 0,
                bottom: gapTop
            },
            btmPipe: {
                left: x,
                right: x + CONSTANTS.PIPE_WIDTH,
                top: gapTop + CONSTANTS.GAP_HEIGHT,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return pipe;
    }

    movePipes(){
        //moves pipes across screen
        this.pipes.forEach ( pipe => {
            pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
            pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
            pipe.btmPipe.left -= CONSTANTS.PIPE_SPEED;
            pipe.btmPipe.right -= CONSTANTS.PIPE_SPEED;
        });

        //remove from array when offscreen and add new pipe w/ new gap
        if (this.pipes[0].topPipe.right <= 0){
            this.pipes.shift();
            const nextX = this.pipes[1].topPipe.left + CONSTANTS.PIPE_SPACING;
            this.pipes.push(this.getRandomPipe(nextX));
        }
    }

    drawPipes(ctx){
        //receives cavnas context, draws pipes onto canvas
        this.pipes.forEach( pipe => {
            ctx.fillStyle = "green";
            ctx.fillRect( //draw top pipe
                pipe.topPipe.left, 
                pipe.topPipe.top, 
                CONSTANTS.PIPE_WIDTH, 
                pipe.topPipe.bottom - pipe.topPipe.top
            );
            ctx.fillRect(//draw bottom pipe
                pipe.bottomPipe.left, 
                pipe.bottomPipe.top, 
                CONSTANTS.PIPE_WIDTH, 
                pipe.bottomPipe.bottom - pipe.bottomPipe.top
            );
        })
    }

    drawBackground(ctx){
        //receives canvas context, draws background
        ctx.fillStyle = "PALETURQUOISE";
        ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    }

    animate(ctx){
        //receives canvas context, draws structures in the level
        this.drawBackground(ctx);

        //update and draw pipes
        this.movePipes();
        this.drawPipes(ctx);
    }
}