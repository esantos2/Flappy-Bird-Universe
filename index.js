//images
let charLinks = ["images/flappyBird.png", "images/Fish.png", "images/NyanCat.png",
                 "images/angryBird.png", "images/marioCape.png", "images/Bananya.png"];
let birdPic = new Image();
birdPic.src = "images/flappyBird.png"; // 51x36
let fishPic = new Image();
fishPic.src = "images/Fish.png"; // 40x40
let catPic = new Image();
catPic.src = "images/NyanCat.png"; // 65x40
let marioCapePic = new Image();
marioCapePic.src = "images/marioCape.png"; // 56x56
let angryBirdPic = new Image();
angryBirdPic.src = "images/angryBird.png";  // 50x46
let bananyaPic = new Image();
bananyaPic.src = "images/Bananya.png"; // 32x55
let topPipesPic = new Image();
topPipesPic.src = "images/pipesTop2.png"; // 52x480
let btmPipesPic = new Image();
btmPipesPic.src = "images/pipesBtm2.png"; // 52x480
let bgDay = new Image();
bgDay.src = "images/bgDay.png"; // 600x480
let fgDay = new Image();
fgDay.src = "images/fgDay.png"; // 480x60
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
        ctx.fillStyle = "black";
        ctx.font = "24px Verdana";
        ctx.fillText("CHOOSE YOUR", 147, 150);
        ctx.fillText("CHARACTER!", 161, 180);

        //add buttons for character selection
        let charSelection = document.createElement("div");
        charSelection.setAttribute("class", "charSelection");
        document.body.appendChild(charSelection);
        charLinks.forEach( (link, idx) => {
            let charImg = document.createElement("img");
            charImg.src = link;
            charButton.appendChild(buttonImg);
            charButton.setAttribute("class", "charButtons");
            charButton.setAttribute("id", `${idx}`);
            charButton.addEventListener("click", selectChar);
            charSelection.appendChild(charButton);
        });
        //character selected
        function selectChar(e){
            e.preventDefault();
            console.log("selected!");
            let idx = parseInt(e.target.id);
            console.log(e.target);
            setPlayer(characterImages[idx], characterDimensions[idx][0], characterDimensions[idx][1]);
            window.removeEventListener('submit',selectChar);
            document.body.removeChild(charSelection);
            startGame();
        }

        /* 
        //Draw characters on canvas, select via keyboard
        ctx.drawImage(birdPic, 130, 207, 51, 36);
        ctx.drawImage(fishPic, 217, 203, 40, 40);
        ctx.drawImage(catPic, 285, 205, 68, 40);
        ctx.drawImage(angryBirdPic, 126, 285, 45, 41);
        ctx.drawImage(marioCapePic, 212, 278, 49, 49);
        ctx.drawImage(bananyaPic, 300, 273, 32, 55);
        ctx.font = "20px Verdana";
        ctx.fillText("1          2          3", 150, 262);
        ctx.fillText("4          5          6", 150, 347);
        window.addEventListener('keypress',selectChar);
        function selectChar(e){
            let code = e.keyCode;
            if (code == 50){ // '2' key, select fish
                setPlayer(fishPic, 40, 40);
            } else if (code == 51){ // '3' key, select nyancat
                setPlayer(catPic, 65, 40);
            } else if (code == 52){ // '4' key, select angry bird
                setPlayer(angryBirdPic, 45, 41);
            } else if (code == 53){ // '5' key, select cape mario
                setPlayer(marioCapePic, 49, 49);
            } else if (code == 54){ // '6' key, select bananya
                setPlayer(bananyaPic, 32, 55);
            } else{ // default is flappy bird
                setPlayer(birdPic, 51, 36);
            }
            window.removeEventListener('keypress',selectChar);
            startGame();
        }
        */
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
        window.addEventListener('keypress',keyHandler);
        window.requestAnimationFrame(drawEntities);
    }

    function keyHandler(e){
        let code = e.keyCode;
        if(code == 32){ //space key, make bird fly/jump
            player.v = -4.6; //og: -2.7
        }
        if(code == 114){ // 'r' key, restart the game
            window.cancelAnimationFrame(update);
            startGame();
        }
        if(code == 99){ // 'c' key, select character
            window.cancelAnimationFrame(update);
            chooseCharScreen();
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
        ctx.clearRect(0,0, c.width, c.height);
        background();
        ctx.fillStyle = "FloralWhite";
        ctx.strokeStyle = "pink";
        ctx.fillRect(120, 120, 240, 240);
        ctx.strokeRect(120, 120, 240, 240);
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
        ctx.fillStyle = "#000";
        ctx.font = "20px Verdana";
        ctx.fillText("Score : "+score, 15, 20); //show score
        ctx.font = "14px Verdana";
        if (score > highScore){
            highScore = score;
            newScore = true;
        }
        ctx.fillText("[High score : "+highScore+"]", 15, 40); //show high score
        ctx.font = "18px Courier";
        ctx.fillText("FPS : " + fps.getFPS(), 380, 15); //show fps
        if (crash){
            window.cancelAnimationFrame(update);
            endGame();
        }else{
            update = window.requestAnimationFrame(drawEntities);
        }
    }

    function endGame(){ //display game over screen, score, prompt to restart
        drawBox();
        ctx.fillStyle = "#000000";
        ctx.font = "bold 30px Arial";
        ctx.fillText("GAME OVER", 150, 200);
        ctx.font = "20px Verdana";
        ctx.fillText("Score: " + score, 195, 250);
        ctx.font = "17px Verdana";
        if (newScore){ //show high score
            ctx.fillText("[NEW] High score : "+highScore, 150, 270);
        } else{
            ctx.fillText("High score : "+highScore, 177, 270);
        }
        ctx.font = "15px Verdana";
        ctx.fillText("(R) Restart", 195, 320);
        ctx.fillText("(C) Change character", 160, 340);
    }

})