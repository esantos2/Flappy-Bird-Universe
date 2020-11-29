const CONSTANTS = {
    FPS_CORNER: {
        x: 380,
        y: 15
    }
};

export default class Toolbox{
    //contains functions for game tools, such as volume adjust/mute, fps counter, tutorial screen, and more info
    constructor(){
        this.addToolsToGame();
        this.startTime = 0;
        this.frameNumber = 0;
        this.showFPS = false;
        this.showAudio = false;
        this.showTutorial = false;
    }

    addToolsToGame(){
        //adds toolbox to document body
        const container = document.getElementsByClassName("toolbox");
        this._addFpsButton(container);
        this._addVolumeButton(container);
        this._addTutorialButton(container);
    }

    _addFpsButton(container){
        //receives container element, adds button to add FPS counter onto canvas
        const newButton = this._createFpsButton();
        container.appendChild(newButton);
    }

    _addVolumeButton(container){
        //receives container element, adds button to adjust and/or mute game volume

    }

    _addTutorialButton(container){
        //receives container element, adds button that toggles tutorial modal

    }

    drawToolsToCanvas(ctx){
        //receives the canvas context, invoked in Game class to draw tool options and draw toggled tools to canvas
        if (this.showFPS) this.drawFPS(ctx);    //draws fps counter to canvas
    }

    /***************************FPS counter *******************************/

    getFPS(){
        //calculates and returns frames per second
        this.frameNumber++;
        const d = new Date().getTime();
        currentTime = (d - this.startTime) / 1000;
        const result = Math.floor(this.frameNumber / currentTime);
        if (currentTime > 1){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }

    drawFPS(ctx){
        //receives canvas context, prints current frames per second
        ctx.fillText("FPS : " + fps.getFPS(), CONSTANTS.FPS_CORNER.x, CONSTANTS.FPS_CORNER.y);
    }

    _createFpsButton(){
        //creates and returns button to toggle fps counter
        const newButton = document.createElement("button");
        newButton.addEventListener("click", (e) => {
            e.preventDefault();
            this.showFPS = !this.showFPS;
        });
    }

    /******************************Audio **********************************/

    _createAudioButton(){
        //creates and return button to toggle audio controls
            //toggle mute on click, hover reveals volume slider
        let findAudio = document.querySelector("audio");
        if (findAudio) document.body.removeChild(findAudio);
        let bgAudio = document.createElement("audio");
        bgAudio.autoplay = true;
        bgAudio.loop = true;
        bgAudio.controls = true;
        bgAudio.volume = 0.3;
    
        let bgSource = document.createElement("source");
        bgSource.src = "assets/audio/rick_astley.mp3";
        bgSource.type = "audio/mp3";
        
        bgAudio.appendChild(bgSource);
        document.body.appendChild(bgAudio);
    }

    /*************************Tutorial screen *****************************/

    _createTutorialButton(){
        //creates and returns button to toggle tutorial modal

    }
}