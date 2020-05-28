# Flappy Bird Universe
Browser implementation of the classic Flappy Bird mobile game, with additional characters and features.

<a href="https://arctive.github.io/Flappy-Bird-Universe/" target="_blank">Live Demo</a>

## Technologies
* HTML5 / CSS3 / JS

## Features
* Choose from a selection of characters with unique physics attributes.
<p align="center">
  <img max-width="600px" height="auto" src="assets\gifs\char_select2.gif">
</p>

* Pipe obstacles generate at random heights over time.
* Score counter tracks your current and previous high score.
<p align="center">
  <img max-width="600px" height="auto" src="assets\gifs\demo_play2.gif">
</p>


## Challenges

* Pipes are generated with consistent spacing between each other horizontally and veritcally, with the gaps appearing at random heights. This was
  created by saving the most recent pipes into an array and deleting ones that the player has passed. Locations are updated and 
  pipes are redrawn with every animation frame, allowing the obstacles to approach smoothly and consistently.

```
  pipeLocation[i].x -= 2; //move pipes left
  ctx.drawImage(topPipesPic, pipeLocation[i].x, 0 - (topPipesPic.height - pipeLocation[i].y));
  ctx.drawImage(btmPipesPic, pipeLocation[i].x, pipeLocation[i].y + gapConst);
  if (pipeLocation[i].x == 260){ 
      spawnPipe(); //spawn new pipe
  }
```

* Collision detection was implemented with respect to each character's unique hitbox. Dimensions were checked against both the upper and lower pipes.

```
  if( (((player.x <= pipeLocation[i].x && player.x + player.pWidth >= pipeLocation[i].x) //hit left half
      || (player.x >= pipeLocation[i].x && player.x + player.pWidth <= pipeLocation[i].x + topPipesPic.width) //hit inside 
      || (player.x <= pipeLocation[i].x + topPipesPic.width && player.x + player.pWidth >= pipeLocation[i].x + topPipesPic.width)) //hit right half
      && (player.y <= pipeLocation[i].y || player.y + player.pHeight >= pipeLocation[i].y + gapConst))
      || (player.y + player.pHeight >= c.height - fgHeight)){ //hit ground
      crash = true;
      break;
  }
```

## Coming soon

- Unique background and physics for each character
- Background music and effects
- Mobile friendly
