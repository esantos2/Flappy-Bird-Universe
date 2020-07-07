/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//images\r\nlet charLinks = [\"assets/images/flappyBird.png\", \"assets/images/Fish.png\", \"assets/images/NyanCat.png\",\r\n                 \"assets/images/angryBird.png\", \"assets/images/marioCape.png\", \"assets/images/Bananya.png\"];\r\nlet birdPic = new Image();\r\nbirdPic.src = \"assets/images/flappyBird.png\"; // 51x36\r\nlet fishPic = new Image();\r\nfishPic.src = \"assets/images/Fish.png\"; // 40x40\r\nlet catPic = new Image();\r\ncatPic.src = \"assets/images/NyanCat.png\"; // 65x40\r\nlet marioCapePic = new Image();\r\nmarioCapePic.src = \"assets/images/marioCape.png\"; // 56x56\r\nlet angryBirdPic = new Image();\r\nangryBirdPic.src = \"assets/images/angryBird.png\";  // 50x46\r\nlet bananyaPic = new Image();\r\nbananyaPic.src = \"assets/images/Bananya.png\"; // 32x55\r\nlet topPipesPic = new Image();\r\ntopPipesPic.src = \"assets/images/pipesTop2.png\"; // 52x480\r\nlet btmPipesPic = new Image();\r\nbtmPipesPic.src = \"assets/images/pipesBtm2.png\"; // 52x480\r\nlet bgDay = new Image();\r\nbgDay.src = \"assets/images/bgDay.png\"; // 600x480\r\nlet fgDay = new Image();\r\nfgDay.src = \"assets/images/fgDay.png\"; // 480x60\r\nlet characterImages = [birdPic, fishPic, catPic, angryBirdPic, marioCapePic, bananyaPic];\r\nlet characterDimensions = [[51,36], [40,40], [65,40], [50,46], [56,56], [32,55]];\r\n\r\n// Setup game graphic objects\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    let c = document.getElementById(\"canvas\");\r\n    let ctx = c.getContext('2d');\r\n    let player = {\"x\":50, \"y\":0, \"v\":0, \"pWidth\": 0, \"pHeight\": 0};\r\n    let charChoice;\r\n    let gapConst = 130;\r\n    let fgHeight = 40;\r\n    let score = highScore =  0;\r\n    let motionTrailLength = 30;\r\n    let opacity = 0;\r\n    let rainbowColors = [\"255,0,0\", \"255,153,0\", \"255,255,0\", \"0,255,0\", \"0,102,255\", \"153,0,255\"];\r\n    let pastPosition = [];\r\n    let pipeLocation = [];\r\n    let update;\r\n    let crash = false;\r\n    let newScore = false;\r\n    \r\n    //current score, hidden at start\r\n    let currentScore = document.createElement(\"div\");\r\n    currentScore.setAttribute(\"class\", \"no-score\");\r\n    document.body.appendChild(currentScore);\r\n\r\n    //toggle score display\r\n    const toggleScoreDisplay = () => {\r\n        if (currentScore.getAttribute(\"class\") === \"no-score\"){\r\n            currentScore.setAttribute(\"class\", \"show-score\");\r\n        } else{\r\n            currentScore.setAttribute(\"class\", \"no-score\");\r\n        }\r\n    }\r\n\r\n    //update score\r\n    const updateScore = () => {\r\n        currentScore.innerHTML = score;\r\n    }\r\n\r\n    //scrolling background\r\n    window.onload = function(){\r\n        const bgScroll = function (){\r\n            ctx.drawImage(bgDay, 0, 0);\r\n        }\r\n        bgScroll();\r\n    }\r\n\r\n    //listener for start button\r\n    let startButton = document.getElementById(\"startButton\");\r\n    startButton.addEventListener(\"click\", chooseCharScreen);\r\n\r\n    //fps counter\r\n    let fps = {\r\n        startTime : 0,\r\n        frameNumber : 0,\r\n        getFPS : function(){\r\n            this.frameNumber++;\r\n            let d = new Date().getTime();\r\n            currentTime = ( d - this.startTime ) / 1000;\r\n            result = Math.floor( ( this.frameNumber / currentTime ) );\r\n            if( currentTime > 1 ){\r\n                this.startTime = new Date().getTime();\r\n                this.frameNumber = 0;\r\n            }\r\n            return result;\r\n        }\r\n    };\r\n\r\n    function chooseCharScreen(){\r\n        //remove start button\r\n        let s = document.getElementById(\"startButton\");\r\n        s.style.display = \"none\";\r\n        background();\r\n        \r\n        //character selection, start game\r\n        drawBox();\r\n        let selectionTitle = document.createElement(\"h2\");\r\n        selectionTitle.setAttribute(\"class\", \"selectionTitle\");\r\n        selectionTitle.innerHTML = \"Choose your character!\";\r\n        document.body.appendChild(selectionTitle);\r\n\r\n        //add buttons for character selection\r\n        let charSelection = document.createElement(\"div\");\r\n        charSelection.setAttribute(\"class\", \"charSelection\");\r\n        document.body.appendChild(charSelection);\r\n        charLinks.forEach( (link, idx) => {\r\n            let charImg = document.createElement(\"img\");\r\n            charImg.src = link;\r\n            charImg.setAttribute(\"id\", `${idx}`);\r\n            charImg.addEventListener(\"click\", selectChar);\r\n            charSelection.appendChild(charImg);\r\n        });\r\n\r\n        //character selected\r\n        function selectChar(e){\r\n            e.preventDefault();\r\n            let idx = parseInt(e.target.id);\r\n            setPlayer(characterImages[idx], characterDimensions[idx][0], characterDimensions[idx][1]);\r\n            window.removeEventListener('submit',selectChar);\r\n            document.body.removeChild(charSelection);\r\n            document.body.removeChild(selectionTitle);\r\n            removeBox();\r\n            startGame();\r\n        }\r\n    }\r\n\r\n\r\n    function setPlayer(pic, w, h){\r\n        charChoice = pic;\r\n        player.pWidth = w;\r\n        player.pHeight = h;\r\n    }\r\n\r\n    function startGame(){ //initialize variables\r\n        player.x = 50;\r\n        player.y = player.v = score = 0;\r\n        crash = false;\r\n        newScore = false;\r\n        pipeLocation = [0];\r\n        pastPosition = [0];\r\n        spawnPipe();\r\n        toggleScoreDisplay();\r\n        window.addEventListener('keypress',keyHandler);\r\n        window.requestAnimationFrame(drawEntities);\r\n\r\n        let bgSound = document.createElement(\"audio\");\r\n        bgSound.src = \"rick_astley.mp3\";\r\n        bgSound.setAttribute(\"preload\", \"auto\");\r\n        bgSound.setAttribute(\"controls\", \"none\");\r\n        bgSound.style.display = \"none\";\r\n        document.body.appendChild(bgSound);\r\n        bgSound.play();\r\n    }\r\n\r\n    function keyHandler(e){\r\n        let code = e.keyCode;\r\n        if(code == 32){ //space key, make bird fly/jump\r\n            player.v = -4.6; //og: -2.7\r\n        }\r\n    }\r\n\r\n    function foreground(){\r\n        ctx.drawImage(fgDay, 0, c.height - fgHeight);\r\n    }\r\n\r\n    function background(){\r\n        ctx.drawImage(bgDay, 0, 0);\r\n    }\r\n\r\n    function gravity(){\r\n        player.v += 0.17; //og: 0.07\r\n        player.y = Math.min(c.height - 10, Math.max(0, player.y + player.v));\r\n    }\r\n\r\n    function spawnPipe(){\r\n        pipeLocation.push({ \"x\": c.width, \"y\": Math.floor(Math.random() * (c.height - fgHeight - 2 * gapConst) + 0.5*gapConst)})\r\n    }\r\n\r\n    function drawBox(){\r\n        let backBox = document.createElement(\"div\");\r\n        backBox.setAttribute(\"id\", \"backBox\");\r\n        document.body.appendChild(backBox);\r\n    }\r\n\r\n    function removeBox(){\r\n        let backBox = document.getElementById(\"backBox\");\r\n        document.body.removeChild(backBox);\r\n    }\r\n\r\n    function storeLastPosition(xPos, yPos){\r\n        pastPosition.push({\r\n            x: xPos, y: yPos\r\n        });\r\n        if (pastPosition.length > motionTrailLength){\r\n            pastPosition.shift();\r\n        }\r\n    }\r\n\r\n    function trailRainbow(){\r\n        let xPos = player.x;\r\n        for (let i = pastPosition.length - 1; i >=0 ; i--){ //draw trail length\r\n            let colorStream = 0;\r\n            opacity = (i + 1)/30;\r\n            //opacity = ((i + 1)/(pastPosition.length));\r\n            for (let j = 0; j < rainbowColors.length; j++){ //draw trail slice\r\n                ctx.beginPath();\r\n                ctx.fillStyle = \"rgba(\" + rainbowColors[j] + \",\"+ opacity + \")\";\r\n                ctx.fillRect(xPos + 15, pastPosition[i].y + colorStream, 3, 6);\r\n                ctx.fill();\r\n                colorStream += 6;\r\n            }\r\n            xPos -=3;\r\n        }\r\n    }\r\n\r\n    function trailJetpack(){\r\n        let yPos = player.y;\r\n        for (let i = 20; i >= 0; i--){\r\n            opacity = ((i + 1)/(40));\r\n            if (player.v <= 0){\r\n                ctx.beginPath();\r\n                ctx.fillStyle = \"rgba(255,102,153, \"+ opacity + \")\";\r\n                ctx.arc(player.x, yPos + (player.pHeight / 2), 7, 0, 2*Math.PI, true);\r\n                ctx.fill();\r\n            }\r\n            yPos += 3;\r\n        }\r\n    }\r\n\r\n    function drawPlayer(){\r\n        ctx.drawImage(charChoice, player.x, player.y, player.pWidth, player.pHeight);\r\n    }\r\n\r\n    function drawEntities(){\r\n        ctx.clearRect(0,0, c.width, c.height);\r\n        background();\r\n        for(let i = 0; i < pipeLocation.length; i++){ //draw pipes\r\n            pipeLocation[i].x -= 2; //move pipes left\r\n            ctx.drawImage(topPipesPic, pipeLocation[i].x, 0 - (topPipesPic.height - pipeLocation[i].y));\r\n            ctx.drawImage(btmPipesPic, pipeLocation[i].x, pipeLocation[i].y + gapConst);\r\n            if (pipeLocation[i].x == 260){ //og: 160\r\n                spawnPipe(); //spawn new pipe\r\n            }\r\n            //collision detection\r\n            if( (((player.x <= pipeLocation[i].x && player.x + player.pWidth >= pipeLocation[i].x) //hit left half\r\n                || (player.x >= pipeLocation[i].x && player.x + player.pWidth <= pipeLocation[i].x + topPipesPic.width) //hit inside \r\n                || (player.x <= pipeLocation[i].x + topPipesPic.width && player.x + player.pWidth >= pipeLocation[i].x + topPipesPic.width)) //hit right half\r\n                && (player.y <= pipeLocation[i].y || player.y + player.pHeight >= pipeLocation[i].y + gapConst))\r\n                || (player.y + player.pHeight >= c.height - fgHeight)){ //hit ground\r\n                crash = true;\r\n                break;\r\n            }\r\n            if (pipeLocation[i].x == player.x)\r\n                score++; //update score\r\n                updateScore();\r\n            }\r\n        foreground();\r\n        if (charChoice == catPic){\r\n            storeLastPosition(player.x, player.y);\r\n            trailRainbow();\r\n        }\r\n        if (charChoice == bananyaPic){\r\n            trailJetpack();\r\n        }\r\n        drawPlayer();\r\n        gravity();\r\n\r\n        //display score\r\n        if (score > highScore){\r\n            highScore = score;\r\n            newScore = true;\r\n        }\r\n\r\n        // ctx.fillText(\"FPS : \" + fps.getFPS(), 380, 15); //show fps\r\n\r\n        //update game frame\r\n        if (crash){\r\n            window.cancelAnimationFrame(update);\r\n            endGame();\r\n        }else{\r\n            update = window.requestAnimationFrame(drawEntities);\r\n        }\r\n    }\r\n\r\n    function endGame(){ //display game over screen, score, prompt to restart\r\n        //draw background\r\n        toggleScoreDisplay();\r\n        background();\r\n        drawBox();\r\n\r\n        //display text\r\n        let endText = document.createElement(\"div\");\r\n        endText.setAttribute(\"class\", \"selectionTitle endScreen\");\r\n        let endTitle = document.createElement(\"h2\");\r\n        endTitle.innerHTML = \"GAME OVER\";\r\n        let endScore = document.createElement(\"div\");\r\n        endScore.innerHTML = `Score: ${score}`;\r\n        let endHighScore = document.createElement(\"div\");\r\n        endHighScore.innerHTML = newScore ? `[NEW] Best: ${highScore}` : `Best: ${highScore}`;\r\n        document.body.appendChild(endText).appendChild(endTitle);\r\n        endText.appendChild(endScore);\r\n        endText.appendChild(endHighScore);\r\n\r\n        const restartGame = function(e){\r\n            window.cancelAnimationFrame(update);\r\n            removeBox();\r\n            document.body.removeChild(endText);\r\n            document.body.removeChild(endButtons);\r\n            e.target.id === \"start\" ? startGame() : chooseCharScreen();\r\n        }\r\n\r\n        //display restart options\r\n        let endButtons = document.createElement(\"div\");\r\n        endButtons.setAttribute(\"class\", \"endButtons\")\r\n        let restart = document.createElement(\"div\");\r\n        restart.setAttribute(\"class\", \"endButton\");\r\n        restart.setAttribute(\"id\", \"start\");\r\n        restart.addEventListener(\"click\", restartGame);\r\n        restart.innerHTML = \"Restart\";\r\n        let changeChar = document.createElement(\"div\");\r\n        changeChar.setAttribute(\"class\", \"endButton\");\r\n        changeChar.setAttribute(\"id\", \"charSelect\");\r\n        changeChar.addEventListener(\"click\", restartGame);\r\n        changeChar.innerHTML = \"Change character\";\r\n        document.body.appendChild(endButtons).appendChild(restart)\r\n        endButtons.appendChild(changeChar);\r\n    }\r\n\r\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });