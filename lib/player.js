//if player presses down, it make sure that the dropCounter goes back to zero so it doesnt double drop,
//basically reset back to 0
function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player); //updates board
    playerReset(); //gets new piece
    arenaSweep(); //checks to see if there are any rows that are filled up
    updateScore(); //updates score
  }
  dropCounter = 0;
}



function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

//resets the players current position to the top again and randomizes a new piece
// if the top arena and the player piece collide then reset to fill all with 0, meaning blank
// why doesnt it blank out on the sides or the top?
function playerReset() {
  const pieces = 'ILJOTSZ';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
    (player.matrix[0].length / 2 | 0);

  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore;
  }
}

// function is used when player asks to rotate via keyboard, dir will be -1 or 1 depending which way of rotation
// player.pos.x === current position of the piece via x direction
//player.matrix is the dimensions of the piece, and dir is the -1 or 1
// if it collides with the side walls then add the offset
// if the offset to account for left or right,
function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}



function rotate(matrix, dir) {
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; x++) {
      [
        matrix[x][y], matrix[y][x]
      ] = [
        matrix[y][x],
        matrix[x][y]
      ];
    }
  }
  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}


function updateScore() {
  document.getElementById('score').innerText = player.score;
}



//players initial starting spot, with the current static piece of T, which is matrix
const player = {
  pos: {
    x: 0,
    y: 0
  },
  matrix: null,
  score: 0
};



//Allows user to move the tile piece
document.addEventListener('keydown', event => {
      if (event.keyCode === 37) {
        playerMove(-1);

      } else if (event.keyCode === 39) {
        playerMove(1);
      } else if (event.keyCode === 40) {
        playerDrop();
      } else if (event.keyCode === 81) {
        playerRotate(-1);
      } else if (event.keyCode === 87) {
        playerRotate(1);
      }