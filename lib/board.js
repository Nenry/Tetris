function draw() {
  // if (!paused) {

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();




  //draws the background
  drawMatrix(arena, {
    x: 0,
    y: 0
  });
  //draw existing piece
  //draws the piece and players piece location
  drawMatrix(player.matrix, player.pos);

  for (let y = 1; y < 28; y++) {
    context.moveTo(0, y);
    context.lineTo(30, y);
    context.lineWidth = 0.01;
    context.strokeStyle = 'rgb(209, 200, 200)';
    context.stroke();
    context.moveTo(y, 0);
    context.lineTo(y, 30);
    context.lineWidth = 0.01;
    context.strokeStyle = 'rgb(209, 200, 200)';
    context.stroke();
  }
  if (paused) {
    context.fillStyle = 'rgb(78, 177, 216)';
    context.font = '1px serif';
    context.fillText('Press "P" to start', 3, 6);
  }
}


//Creates mapping dimensions of where the piece is
function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}



function arenaSweep() {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; --y) {
    for (let x = 0; x < arena[y].length; ++x) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);

    arena.unshift(row);
    ++y;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}



//when the piece collides with the bottom or the another piece
// const [m, o] === [piece, piece pos]
// if piece is present && arena exists && if another piece 
function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      // console.log(m[y][x]);
      // console.log(arena[y + o.y]);
      // console.log(arena[y + o.y][x + o.x]);
      if (m[y][x] !== 0 && //if actual piece exists, value will be 1 or 0
        (arena[y + o.y] && //if 
          arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}


//Creates mapping dimensions of where the piece is, creates board
function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}



// draws the background and tile piece
function draw() {
  // if (!paused) {

  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.beginPath();




  //draws the background
  drawMatrix(arena, {
    x: 0,
    y: 0
  });
  //draw existing piece
  //draws the piece and players piece location
  drawMatrix(player.matrix, player.pos);

  for (let y = 1; y < 28; y++) {
    context.moveTo(0, y);
    context.lineTo(30, y);
    context.lineWidth = 0.01;
    context.strokeStyle = 'rgb(209, 200, 200)';
    context.stroke();
    context.moveTo(y, 0);
    context.lineTo(y, 30);
    context.lineWidth = 0.01;
    context.strokeStyle = 'rgb(209, 200, 200)';
    context.stroke();
  }
  if (paused) {
    context.fillStyle = 'rgb(78, 177, 216)';
    context.font = '1px serif';
    context.fillText('Press "P" to start', 3, 6);
  }
}