//all character names
const FLAPPY_BIRD = "flappyBird";
const MARIO_FISH = "marioFish";
const NYAN_CAT = "nyanCat";
const ANGRY_BIRD = "angryBird";
const MARIO_CAPE = "marioCape";
const BANANYA_CAT = "bananyaCat";

//all character image info
const allCharInfo = {
    [FLAPPY_BIRD]: {
        link: "assets/images/flappyBird.png",     // 51x36
        width: 51,
        height: 36,
        callback: null
    },
    [MARIO_FISH]: {
        link: "assets/images/Fish.png",           // 40x40
        width: 40,
        height: 40,
        callback: null
    },
    [NYAN_CAT]: {
        link: "assets/images/NyanCat.png",        // 65x40
        width: 65,
        height: 40,
        callback: null
    },
    [ANGRY_BIRD]: {
        link: "assets/images/angryBird.png",      // 50x46
        width: 50,
        height: 46,
        callback: null
    },
    [MARIO_CAPE]: {
        link: "assets/images/marioCape.png",      // 56x56
        width: 56,
        height: 56,
        callback: null
    },
    [BANANYA_CAT]: {
        link: "assets/images/Bananya.png",        // 32x55
        width: 32,
        height: 55,
        callback: null
    }
}

const _getCharImage = imgSource => {
    //creates and returns an image element
    const pic = new Image();
    pic.src = imgSource;
    return pic;
}

//create array of image elements w/ event listeners
export const createCharacterMenu = (charSelectionBox, callback) => {
    const characterNames = Object.keys(allCharInfo);
    characterNames.forEach( (name, idx) => {
        const charImage = _getCharImage(allCharInfo[name].link);
        charImage.setAttribute("id", `${name}`);
        charImage.addEventListener("click", callback);
        charSelectionBox.appendChild(charImage);
    });
}

//retrieve individual character details and return as an object
export const getCharDetails = name => {
    return allCharInfo[name];
}