import * as UTILITY from "./utility";

const CONSTANTS = {
    NAME: "FPS",
    FPS_CORNER: {
        x: 10,
        y: 20
    }
};

export default class FrameCounter {
    constructor(container){
        this.toolbox = container;               //parent container element for all tools
        this.button = this.addFpsButton();      //create and add fps button to toolbox
        this.showFPS = false;                   //tracks visibility
        this.startTime = 0;
        this.frameNumber = 0;
    }

    addFpsButton(){
        //creates button to toggle frame counter, adds button to the toolbox element, then returns button
        const newButton = this._createFpsButton();
        this.toolbox.appendChild(newButton);
        return newButton;
    }

    _createFpsButton(){
        //creates and returns button to toggle fps counter
        const newButton = document.createElement("button");
        newButton.innerHTML = CONSTANTS.NAME;
        newButton.addEventListener("click", this.handleFpsClick());
        UTILITY.toggleSelectedStatus(newButton);        //add initial styling
        return newButton;
    }

    handleFpsClick(){
        //when fps button is clicked, fps counter is drawn to upper left corner of canvas
        return (e) => {
            e.preventDefault();
            const fpsButton = e.target;
            this.showFPS = !this.showFPS;
            
            //change styling to indicate button is selected
            UTILITY.toggleSelectedStatus(fpsButton);
        }
    }
    
    getFPS(){
        //calculates and returns frames per second
        this.frameNumber++;
        const d = new Date().getTime();
        const currentTime = (d - this.startTime) / 1000;
        const result = Math.floor(this.frameNumber / currentTime);
        if (currentTime > 1){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
        }
        return result;
    }

    drawFPS(ctx){
        //receives canvas context, prints current frames per second
        ctx.font = "18px Helvetica";
        ctx.fillStyle = "black";
        ctx.fillText("FPS : " + this.getFPS(), CONSTANTS.FPS_CORNER.x, CONSTANTS.FPS_CORNER.y);
    }

}