//images
let charLinks = ["assets/images/flappyBird.png", "assets/images/Fish.png", "assets/images/NyanCat.png",
                 "assets/images/angryBird.png", "assets/images/marioCape.png", "assets/images/Bananya.png"];
let birdPic = new Image();
birdPic.src = "assets/images/flappyBird.png"; // 51x36
let fishPic = new Image();
fishPic.src = "assets/images/Fish.png"; // 40x40
let catPic = new Image();
catPic.src = "assets/images/NyanCat.png"; // 65x40
let marioCapePic = new Image();
marioCapePic.src = "assets/images/marioCape.png"; // 56x56
let angryBirdPic = new Image();
angryBirdPic.src = "assets/images/angryBird.png";  // 50x46
let bananyaPic = new Image();
bananyaPic.src = "assets/images/Bananya.png"; // 32x55
let topPipesPic = new Image();
topPipesPic.src = "assets/images/pipesTop2.png"; // 52x480
let btmPipesPic = new Image();
btmPipesPic.src = "assets/images/pipesBtm2.png"; // 52x480
let bgDay = new Image();
bgDay.src = "assets/images/bgDay.png"; // 600x480
let fgDay = new Image();
fgDay.src = "assets/images/fgDay.png"; // 480x60
let characterImages = [birdPic, fishPic, catPic, angryBirdPic, marioCapePic, bananyaPic];
let characterDimensions = [[51,36], [40,40], [65,40], [50,46], [56,56], [32,55]];

// Setup game graphic objects
document.addEventListener("DOMContentLoaded", () => {
    let c = document.getElementById("canvas");
    let ctx = c.getContext('2d');
    let player = {"x":50, "y":0, "v":0, "pWidth": 0, "pHeight": 0};
    let charChoice;
    let gapConst = 120;
    let fgHeight = 40;
    let score = highScore =  0;
    let motionTrailLength = 30;
    let opacity = 0;
    let rainbowColors = ["255,0,0", "255,153,0", "255,255,0", "0,255,0", "0,102,255", "153,0,255"];
    let pastPosition = [];
    let pipeLocation = [];
    let update;
    let crash = false;
    let newScore = false;
    // c.style.display = "none"; //Makes Game Map invisible
    
    //current score, hidden at start
    let currentScore = document.createElement("div");
    currentScore.setAttribute("class", "no-score");
    document.body.appendChild(currentScore);

    //toggle score display
    const toggleScoreDisplay = () => {
        if (currentScore.getAttribute("class") === "no-score"){
            currentScore.setAttribute("class", "show-score");
        } else{
            currentScore.setAttribute("class", "no-score");
        }
    }

    //update score
    const updateScore = () => {
        currentScore.innerHTML = score;
    }

    //scrolling background
    window.onload = function(){
        let scrollSpeed = 10;
        const bgScroll = function (){
            ctx.drawImage(bgDay, 0, 0);
        }
        bgScroll();
    }

    //listener for start button
    let startButton = document.getElementById("startButton");
    startButton.addEventListener("click", chooseCharScreen);

    //fps counter
    let fps = {
        startTime : 0,
        frameNumber : 0,
        getFPS : function(){
            this.frameNumber++;
            let d = new Date().getTime();
            currentTime = ( d - this.startTime ) / 1000;
            result = Math.floor( ( this.frameNumber / currentTime ) );
            if( currentTime > 1 ){
                this.startTime = new Date().getTime();
                this.frameNumber = 0;
            }
            return result;
        }
    };

    function chooseCharScreen(){
        //remove start button
        let s = document.getElementById("startButton");
        s.style.display = "none";
        background();
        
        //character selection, start game
        drawBox();
        let selectionTitle = document.createElement("h2");
        selectionTitle.setAttribute("class", "selectionTitle");
        selectionTitle.innerHTML = "Choose your character!";
        document.body.appendChild(selectionTitle);

        //add buttons for character selection
        let charSelection = document.createElement("div");
        charSelection.setAttribute("class", "charSelection");
        document.body.appendChild(charSelection);
        charLinks.forEach( (link, idx) => {
            let charImg = document.createElement("img");
            charImg.src = link;
            charImg.setAttribute("id", `${idx}`);
            charImg.addEventListener("click", selectChar);
            charSelection.appendChild(charImg);
        });

        //character selected
        function selectChar(e){
            e.preventDefault();
            let idx = parseInt(e.target.id);
            setPlayer(characterImages[idx], characterDimensions[idx][0], characterDimensions[idx][1]);
            window.removeEventListener('submit',selectChar);
            document.body.removeChild(charSelection);
            document.body.removeChild(selectionTitle);
            removeBox();
            startGame();
        }
    }


    function setPlayer(pic, w, h){
        charChoice = pic;
        player.pWidth = w;
        player.pHeight = h;
    }

    function startGame(){ //initialize variables
        player.x = 50;
        player.y = player.v = score = 0;
        crash = false;
        newScore = false;
        pipeLocation = [0];
        pastPosition = [0];
        spawnPipe();
        toggleScoreDisplay();
        window.addEventListener('keypress',keyHandler);
        window.requestAnimationFrame(drawEntities);
    }

    function keyHandler(e){
        let code = e.keyCode;
        if(code == 32){ //space key, make bird fly/jump
            player.v = -4.6; //og: -2.7
        }
    }

    function foreground(){
        ctx.drawImage(fgDay, 0, c.height - fgHeight);
    }

    function background(){
        ctx.drawImage(bgDay, 0, 0);
    }

    function gravity(){
        player.v += 0.17; //og: 0.07
        player.y = Math.min(c.height - 10, Math.max(0, player.y + player.v));
    }

    function spawnPipe(){
        pipeLocation.push({ "x": c.width, "y": Math.floor(Math.random() * (c.height - fgHeight - 2 * gapConst) + 0.5*gapConst)})
    }

    function drawBox(){
        let backBox = document.createElement("div");
        backBox.setAttribute("id", "backBox");
        document.body.appendChild(backBox);
    }

    function removeBox(){
        let backBox = document.getElementById("backBox");
        document.body.removeChild(backBox);
    }

    function storeLastPosition(xPos, yPos){
        pastPosition.push({
            x: xPos, y: yPos
        });
        if (pastPosition.length > motionTrailLength){
            pastPosition.shift();
        }
    }

    function trailRainbow(){
        let xPos = player.x;
        for (let i = pastPosition.length - 1; i >=0 ; i--){ //draw trail length
            let colorStream = 0;
            opacity = (i + 1)/30;
            //opacity = ((i + 1)/(pastPosition.length));
            for (let j = 0; j < rainbowColors.length; j++){ //draw trail slice
                ctx.beginPath();
                ctx.fillStyle = "rgba(" + rainbowColors[j] + ","+ opacity + ")";
                ctx.fillRect(xPos + 15, pastPosition[i].y + colorStream, 3, 6);
                ctx.fill();
                colorStream += 6;
            }
            xPos -=3;
        }
    }

    function trailJetpack(){
        let yPos = player.y;
        for (let i = 20; i >= 0; i--){
            opacity = ((i + 1)/(40));
            if (player.v <= 0){
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,102,153, "+ opacity + ")";
                ctx.arc(player.x, yPos + (player.pHeight / 2), 7, 0, 2*Math.PI, true);
                ctx.fill();
            }
            yPos += 3;
        }
    }

    function drawPlayer(){
        ctx.drawImage(charChoice, player.x, player.y, player.pWidth, player.pHeight);
    }

    function drawEntities(){
        ctx.clearRect(0,0, c.width, c.height);
        background();
        for(let i = 0; i < pipeLocation.length; i++){ //draw pipes
            pipeLocation[i].x -= 2; //move pipes left
            ctx.drawImage(topPipesPic, pipeLocation[i].x, 0 - (topPipesPic.height - pipeLocation[i].y));
            ctx.drawImage(btmPipesPic, pipeLocation[i].x, pipeLocation[i].y + gapConst);
            if (pipeLocation[i].x == 260){ //og: 160
                spawnPipe(); //spawn new pipe
            }
            //collision detection
            if( (((player.x <= pipeLocation[i].x && player.x + player.pWidth >= pipeLocation[i].x) //hit left half
                || (player.x >= pipeLocation[i].x && player.x + player.pWidth <= pipeLocation[i].x + topPipesPic.width) //hit inside 
                || (player.x <= pipeLocation[i].x + topPipesPic.width && player.x + player.pWidth >= pipeLocation[i].x + topPipesPic.width)) //hit right half
                && (player.y <= pipeLocation[i].y || player.y + player.pHeight >= pipeLocation[i].y + gapConst))
                || (player.y + player.pHeight >= c.height - fgHeight)){ //hit ground
                crash = true;
                break;
            }
            if (pipeLocation[i].x == player.x)
                score++; //update score
                updateScore();
            }
        foreground();
        if (charChoice == catPic){
            storeLastPosition(player.x, player.y);
            trailRainbow();
        }
        if (charChoice == bananyaPic){
            trailJetpack();
        }
        drawPlayer();
        gravity();

        //display score
        if (score > highScore){
            highScore = score;
            newScore = true;
        }

        // ctx.fillText("FPS : " + fps.getFPS(), 380, 15); //show fps

        //update game frame
        if (crash){
            window.cancelAnimationFrame(update);
            endGame();
        }else{
            update = window.requestAnimationFrame(drawEntities);
        }
    }

    function endGame(){ //display game over screen, score, prompt to restart
        //draw background
        toggleScoreDisplay();
        background();
        drawBox();

        //display text
        let endText = document.createElement("div");
        endText.setAttribute("class", "selectionTitle endScreen");
        let endTitle = document.createElement("h2");
        endTitle.innerHTML = "GAME OVER";
        let endScore = document.createElement("div");
        endScore.innerHTML = `Score: ${score}`;
        let endHighScore = document.createElement("div");
        endHighScore.innerHTML = newScore ? `[NEW] Best: ${highScore}` : `Best: ${highScore}`;
        document.body.appendChild(endText).appendChild(endTitle);
        endText.appendChild(endScore);
        endText.appendChild(endHighScore);

        const restartGame = function(e){
            window.cancelAnimationFrame(update);
            removeBox();
            document.body.removeChild(endText);
            document.body.removeChild(endButtons);
            e.target.id === "start" ? startGame() : chooseCharScreen();
        }

        //display restart options
        let endButtons = document.createElement("div");
        endButtons.setAttribute("class", "endButtons")
        let restart = document.createElement("div");
        restart.setAttribute("class", "endButton");
        restart.setAttribute("id", "start");
        restart.addEventListener("click", restartGame);
        restart.innerHTML = "Restart";
        let changeChar = document.createElement("div");
        changeChar.setAttribute("class", "endButton");
        changeChar.setAttribute("id", "charSelect");
        changeChar.addEventListener("click", restartGame);
        changeChar.innerHTML = "Change character";
        document.body.appendChild(endButtons).appendChild(restart)
        endButtons.appendChild(changeChar);
    }

})