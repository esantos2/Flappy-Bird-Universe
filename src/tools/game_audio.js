const CONSTANTS = {
    VOL_SLIDER_SETTINGS: {
        class: "vol-slider",
        type: "range",
        min: 0,
        max: 0.1,
        step: 0.001,
        value: 0.05
    },
    DEFAULT_AUDIO_SRC: "assets/audio/rick_astley.mp3"
};

export default class GameAudio {
    constructor(container){
        this.toolbox = container;               //parent container element for all tools
        this.button = this.addVolumeControls(); //create and add audio element and button to toolbox
        this.showSlider = false;                //tracks visibility
    }

    addVolumeControls(){
        //adds button to adjust and/or mute game volume
        const audioElement = this._createAudioElement();
        const muteButton = this._createMuteButton();
        this.toolbox.appendChild(audioElement);
        this.toolbox.appendChild(muteButton);
    }

    _createAudioElement(){
        //creates and return button to toggle audio controls

        //create audio element
        const audioElement = document.createElement("audio");
        audioElement.setAttribute("id", "audio");

        //add default audio
        const defaultAudioSource = CONSTANTS.DEFAULT_AUDIO_SRC;
        this._addAudioSource(audioElement, defaultAudioSource);        
        
        //set default audio properties        
        audioElement.autoplay = true;
        audioElement.loop = true;
        audioElement.volume = CONSTANTS.VOL_SLIDER_SETTINGS.value;
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
        
        //create container for button and slider
        const container = document.createElement("div");
        container.setAttribute("class", "audio-controls");

        //create button
        const muteButton = document.createElement("button");
        muteButton.setAttribute("id", "mute-button");
        
        //create default button icon
        muteButton.innerHTML = "OFF";

        //add event listeners for mute and volume controls
        muteButton.addEventListener("click", this.toggleMute(muteButton));
        container.addEventListener("mouseover", this.toggleVolumeSlider());
        container.addEventListener("mouseout", this.toggleVolumeSlider());

        //add volume slider to mute button element
        const volSlider = this._createVolumeSlider();
        
        //add button and slider to container
        container.appendChild(muteButton);
        container.appendChild(volSlider);

        return container;
    }

    _createVolumeSlider(){
        //create volume slider
        const volSlider = document.createElement("input");
        
        //apply default slider settings
        Object.keys(CONSTANTS.VOL_SLIDER_SETTINGS).forEach( attribute => {
            volSlider.setAttribute(attribute, CONSTANTS.VOL_SLIDER_SETTINGS[attribute]);
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
                volSlider.removeAttribute("id", "slide-in");
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
        }
    }

    startMusic(){
        //unmutes audio and updates mute button text
        document.getElementById("audio").play();
        document.getElementById("mute-button").innerHTML = "ON";
    }
}