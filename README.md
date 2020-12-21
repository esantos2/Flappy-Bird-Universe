# Flappy Bird Universe
Browser implementation of the classic Flappy Bird mobile game, with additional characters and features.

<a href="https://esantos2.github.io/Flappy-Bird-Universe/" target="_blank">Live Demo</a>

## Technologies
* HTML5 / CSS3 / JS

## Features

### Character selection
* Choose from a selection of characters with unique physics attributes.
<p align="center">
  <img max-width="600px" height="auto" src="assets\gifs\char_select2.gif">
</p>

### Score tracking
* Score counter tracks your current and previous high score.
<p align="center">
  <img max-width="600px" height="auto" src="assets\gifs\demo_play2.gif">
</p>

### Obstacle generation
* Pipes are generated with consistent spacing between each other horizontally and veritcally, with the gaps appearing at random heights. This was
  created by saving the most recent pipes into an array and deleting ones that the player has passed. Locations are updated and 
  pipes are redrawn with every animation frame, allowing the obstacles to approach smoothly and consistently.

```javascript
    getRandomPipe(x){
        //receives starting x coord, returns new pipe object
        const heightRange = this.dimensions.height - (2 * CONSTANTS.EDGE_BUFFER) - CONSTANTS.GAP_HEIGHT;
        const gapTop = (Math.random() * heightRange) + CONSTANTS.EDGE_BUFFER;
        const pipe = {
            topPipe: {
                left: x,
                right: x + CONSTANTS.PIPE_WIDTH,
                top: 0,
                bottom: gapTop
            },
            bottomPipe: {
                left: x,
                right: x + CONSTANTS.PIPE_WIDTH,
                top: gapTop + CONSTANTS.GAP_HEIGHT,
                bottom: this.dimensions.height
            },
            passed: false
        };
        return pipe;
    }
```

### Collision detection
* Collision detection was implemented with respect to each character's unique hitbox. Dimensions were checked against both the upper and lower pipes.

```javascript
    collidesWith(birdBounds){
        //returns true if bird collides with any pipe, false otherwise
        let hitDetection = false;
        this.pipes.forEach( pipeSet => {
            const topHit = this._overlap(pipeSet.topPipe, birdBounds);
            const bottomHit = this._overlap(pipeSet.bottomPipe, birdBounds);
            if (topHit || bottomHit) hitDetection = true; 
        });

        //if bird hits foreground, return true
        const groundLevel = this.dimensions.height - CONSTANTS.FOREGROUND_HEIGHT;
        if (birdBounds.bottom >= groundLevel) hitDetection = true;

        return hitDetection;
    }

    _overlap(box1, box2){
        //returns true if box1 overlaps with box2, false otherwise
        if (box1.left > box2.right || box1.right < box2.left) return false; //no overlap in x direction
        if (box1.top > box2.bottom || box1.bottom < box2.top) return false; //no overlap in y direction
        return true;
    }
```

## Coming soon

- Unique background and physics for each character
- Background music and effects
- Mobile friendly