# Techtris
[Live Link](https://nenry.github.io/Tetris/)


## Background and Overview
Tetris is a tile matching game with randomly generated tile sizes. Players are given one tile at a time and they must keep stacking the tiles. If the tiles stack as high as the arena size then it is game over. If a row is completely filled with tiles then that row will clear. Scores will be given for clearing rows and score multplier if multiple rows are cleared. 

## Architecture and Technologies
* JavaScript was used for this game. By using no libraries, it optimizes performance and minimized game latency.
* HTML5 Canvas was used DOM manipulating and visual graphics. It works cohesively and is included within JavaScript.


![](https://github.com/Nenry/Tetris/blob/master/screenshots/gameplay.png?raw=true "")



## Product Design
Tetris was designed over a short period. Designed to be functional and visually appealing.

## Key Features
### Fast drop with spacebar
   * This feature allows the player to drop the tile piece directly to the bottom instead of constantly pressing down or waiting for it to drop
   * While utilizing the collide function, it temporarily tests for collision on the y axis. If it collides then it sets the next position there.


```javascript
  function fastDrop() {
    let tempPlayer = player;
    while (!collide(arena, tempPlayer)) {
      tempPlayer.pos.y++;
    }

    tempPlayer.pos.y--;
    draw();
    merge(arena, player); 
    playerReset(); 
    arenaSweep(); 
    updateScore();
    return tempPlayer.pos.y;

  }
```
### Row clearing capabilities
* This is a function that checks row that are completely filled from top down. This allows the player score to have bonuses if multiple rows are set to be cleared at one time.

### Randomize Pieces
* While using just JavaScript, the next piece is already generated to minimize gameplay delays and additionally allows user to set their next strategy.




## Future Implementations

### Bonus:
* Hold piece for swapping next and current piece
* Ghost Piece to allow the user to see where a fast drop would land
* Add background music
* Add row clearing music
* Add row clearing visuals
