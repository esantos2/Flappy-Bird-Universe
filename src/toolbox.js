import FrameCounter from "./tools/frame_counter";
import GameAudio from "./tools/game_audio";

export default class Toolbox{
    //contains functions for game tools, such as volume adjust/mute, fps counter, tutorial screen, and more info
    constructor(){
        const toolBoxContainer = document.querySelector(".toolbox");
        this.frameCounter = new FrameCounter(toolBoxContainer);
        this.audio = new GameAudio(toolBoxContainer);
    }

    _addTutorialButton(container){
        //receives container element, adds button that toggles tutorial modal

    }

    /*************************Tutorial screen *****************************/

    _createTutorialButton(){
        //creates and returns button to toggle tutorial modal

    }
}