# Flappy Bird Universe
Browser implementation of the classic Flappy Bird mobile game, with additional characters and features.

[Live Demo](https://arctive.github.io/Flappy-Bird-Universe/)

## Technologies
* HTML5 / CSS3 / JS

## Features
* Choose from a selection of characters with unique physics attributes.
<p align="center">
  <img max-width="600px" height="auto" src="">
</p>

* Pipe obstacles generate at random heights over time.
<p align="center">
  <img max-width="600px" height="auto" src="">
</p>

* Score counter tracks your current and previous high score.
<p align="center">
  <img max-width="600px" height="auto" src="">
</p>


## Challenges

* Collision detection

```

    for (let i = startIdx; i <= endIdx; i++) {

        if (bases.includes(this.mainSeq[i])){ //filter missing data points

            baseCounts[this.mainSeq[i]]++;

            ctx.fillStyle = baseColor[this.mainSeq[i]];

        } else {

            ctx.fillStyle = "#171717";

        }

        ctx.fillRect(this.rectWidth * (i - startIdx), 0, this.rectWidth, canvas.height);

    }

```

* Random pipe generation

```

    row.position.y = i*2; //position of row height

    row.rotation.y = 30*i * Math.PI/180; //angle for spiral

```

## Coming soon

- Unique background and physics for each character
- Background music and effects
- Touch integration
