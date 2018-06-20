//if any of the coordinates have a 0 then that means it is not completely filled then let it keep looping via outer
//outer allows to continue to the next row instead of continuing the x
// y is the row, length of splice, splice will immediately remove that one then fill it with 0
//adds empty row on top of the arena
// 'const row' line will not be reached unless all of on row is reached
// while the for loop is still going on, the rowCount continues, each consecutive row gets an compounded multiplier

const canvas = document.getElementById('tetris-canvas');
const context = canvas.getContext('2d');
context.scale(20, 20);


class Board {
  constructor(player) {
    this.arena = [this.createArenaMatrix(12, 20)],
      this.dropCounter = 0,
      this.dropInterval = 1000,
      this.lastTime = 0,
      this.player = player,
      this.canvas = canvas;
  }

  arenaSweep() {
    let rowCount = 1;
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }
      const row = this.arena.splice(y, 1)[0].fill(0);

      this.arena.unshift(row);
      ++y;

      this.player.score += rowCount * 10;
      rowCount *= 2;
    }
  }



  //when the piece collides with the bottom or the another piece
  // const [m, o] === [piece, piece pos]
  // if piece is present && arena exists && if another piece 
  collide(arena, player) {
    const [m, o] = [this.player.piece.matrix, this.player.piece.pos];
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
            arena[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  //Creates the whole convas as a grid system
  createArenaMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }



  //takes in the value from the tile piece which is 1 and displays on the arena map, updates the 'board' relative to where the piece is
  merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.piece.pos.y][x + player.piece.pos.x] = value;
        }
      });
    });
  }

  draw() {


    context.scale(20, 20);

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.drawMatrix(this.arena, {
      x: 0,
      y: 0
    });
    this.drawMatrix(this.player.piece.matrix, this.player.piece.pos);
  }

  // context.fillRect(x, y, width, height);

  //Creates the actual piece
  drawMatrix(matrix, offset) {

    const colors = [
      null, 'red', 'blue', 'violet', 'green', 'purple', 'orange', 'pink'
    ];
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }



  //constantly update the screen, requestanimationFrame will keep redrawing, built in function
  update(time = 0) {
    const deltaTime = this.lastTime;
    // console.log(this.lastTime);
    this.lastTime = time;
    this.dropCounter += this.deltaTime;

    if (this.dropCounter > this.dropInterval) {
      this.player.playerDrop();
    }
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }
}
export default Board;



//create arena/grid system as big as the canvas size, it is 12 and 20 because we scaled it
// by 20, so it is actually 240 X 400
// const arena = createMatrix(12, 20);


// initiate update 
// checks delta time 
// if dropcounter to 1000 then dropInterval 
//   playerDrop() => 
//   ( 
//     drops the piece by 1,
//   if it hits bottom or hits another piece,
//   then pull the piece back, update the board => 
//   playerReset(), which randomizes a new piece and returns the offset back to the top
//   )

// then draw() => (
//   draws the arena, and initial position, 
// )


// 1.playerReset() 
// - Randomizes a piece if arena touches the top the restarts
// 2. updateScore() 
// - Renders code on the screen 
// 3. update() 
// - gets the time difference 
// - if the dropcounter > dropInterval aka 1000 ms then playerDrop() is ran
// - playerDrop() will move the piece down, if it does collide then moves it back up one
// - within in PlayerDrop() merge() updates the board
// - playerReset() gives the player a new piece and reset position 
// - arenaSweep() will check if there are any rows filled up 
// - updateScore()
// - draw() 
// - within draw() does drawMatrix(arena, {x: 0, y: 0}) redraws the arena(which may have fixed pieces)
// - within draw() does drawMatrix(new piece, piece pos) draws the moving piece