const CONSTANTS = {
    INITIAL_VOLUME: 0.05,
    FPS_CORNER: {
        x: 10,
        y: 20
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
        const container = document.querySelector(".toolbox");
        this._addFpsButton(container);
        this._addVolumeButton(container);
        this._addTutorialButton(container);
    }

    _addFpsButton(container){
        //receives container element, adds button to add FPS counter onto canvas
        const newButton = this._createFpsButton();
        container.appendChild(newButton);
        this.toggleSelectedStatus(newButton);
    }

    _addVolumeButton(container){
        //receives container element, adds button to adjust and/or mute game volume
        const audioElement = this._createAudioElement();
        const muteButton = this._createMuteButton();
        const volSlider = this._createVolumeSlider();
        container.appendChild(audioElement);
        container.appendChild(muteButton);
        container.appendChild(volSlider);
        // this.toggleSelectedStatus(audioElement);
    }

    _addTutorialButton(container){
        //receives container element, adds button that toggles tutorial modal

    }

    toggleSelectedStatus(element){
        //receives element, toggles css class to indicate button is activated/deactivated
        element.id = (element.id && element.id !== "button-on") ? "button-on" : "button-off";
    }

    /***************************FPS counter *******************************/

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

    _createFpsButton(){
        //creates and returns button to toggle fps counter
        const newButton = document.createElement("button");
        newButton.innerHTML = "FPS"
        newButton.addEventListener("click", this._handleFpsClick());
        return newButton;
    }

    _handleFpsClick(){
        return (e) => {
            e.preventDefault();
            const fpsButton = e.target;
            this.showFPS = !this.showFPS;
            //change styling to indicate button is selected
            this.toggleSelectedStatus(fpsButton);
        }
    }

    /******************************Audio **********************************/

    _createAudioElement(){
        //creates and return button to toggle audio controls

        //create audio element
        const audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "audio");

        //add default audio
        const defaultAudioSource = "assets/audio/rick_astley.mp3";
        this._addAudioSource(audioElement, defaultAudioSource);        
        
        //set default audio properties        
        audioElement.autoplay = true;
        audioElement.loop = true;
        audioElement.volume = CONSTANTS.INITIAL_VOLUME;
        this.audioElement = audioElement;

        return audioElement;
    }

    _addAudioSource(bgAudio, sourcePath){
        //receives audio element and a url path string, sets string as the audio element source
        const bgSource = document.createElement("source");
        bgSource.src = sourcePath;
        bgSource.type = "audio/mp3";
        bgAudio.appendChild(bgSource);
    }

    _createMuteButton(){
        //creates mute button for audio element
        const muteButton = document.createElement("button");
        
        //create default button icon
        muteButton.innerHTML = "OFF";
        // muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';

        //add event listeners for mute and volume controls
        muteButton.addEventListener("click", this.toggleMute(muteButton));
        muteButton.addEventListener("mouseover", this.toggleVolumeSlider());
        muteButton.addEventListener("mouseout", this.toggleVolumeSlider());

        return muteButton;
    }

    _createVolumeSlider(){
        //create volume slider
        const sliderSettings = {
            class: "vol-slider",
            type: "range",
            min: 0,
            max: 0.1,
            step: 0.001,
            value: CONSTANTS.INITIAL_VOLUME,
        };
        const volSlider = document.createElement("input");
        
        //apply default slider settings
        Object.keys(sliderSettings).forEach( attribute => {
            volSlider.setAttribute(attribute, sliderSettings[attribute]);
        })

        //add event listener to change volume
        volSlider.addEventListener("change", this.setVolume(volSlider.value));

        return volSlider;
    }

    toggleVolumeSlider(){
        //toggles volume slider visibility
        return () => {
            const volSlider = document.querySelector(".vol-slider");
            if (volSlider.id !== "slide-in"){
                volSlider.setAttribute("id", "slide-in");
            } else {
                volSlider.setAttribute("id", "slide-out")
            }
        }
    }

    toggleMute(muteButton){
        //toggles audio muted status
        return (e) => {
            e.preventDefault();
            if (this.audioElement.muted){
                this.audioElement.muted = false;
                muteButton.innerHTML = "ON"
            } else {
                this.audioElement.muted = true;
                muteButton.innerHTML = "OFF"
            }

        }
    }

    setVolume(val){
        //sets audio volume to the selected range value
        return (e) => {
            e.preventDefault();
            const chosenVal = e.target.value;
            this.audioElement.volume = chosenVal;
            console.log("New volume: ", this.audioElement.volume)
        }
    }

    /*************************Tutorial screen *****************************/

    _createTutorialButton(){
        //creates and returns button to toggle tutorial modal

    }
}