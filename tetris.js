  const canvas = document.getElementById('tetris-canvas');
  const context = canvas.getContext('2d');
  const nextCanvas = document.getElementById('tetris-next-canvas');
  const nextContext = nextCanvas.getContext('2d');

  context.scale(30, 30);
  nextContext.scale(30, 30);

  let gameOver = false;
  //if any of the coordinates have a 0 then that means it is not completely filled then let it keep looping via outer
  //outer allows to continue to the next row instead of continuing the x
  // y is the row, length of splice, splice will immediately remove that one then fill it with 0
  //adds empty row on top of the arena
  // 'const row' line will not be reached unless all of on row is reached
  // while the for loop is still going on, the rowCount continues, each consecutive row gets an compounded multiplier

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


  //Piece shape


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
          (arena[y + o.y] && //if exists on the actual arena
            arena[y + o.y][x + o.x]) !== 0) { //if theres another existing piece

          return true;
        }
      }
    }
    return false;
  }

  //Creates mapping dimensions of where the piece is
  function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }


  //creates pieces and fills in whatever it 1
  function createPiece(type) {
    if (type === 'T') {
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ];
    } else if (type === 'O') {
      return [
        [2, 2],
        [2, 2],

      ];
    } else if (type === 'L') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
    } else if (type === 'J') {
      return [
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
    } else if (type === 'I') {
      return [
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
        [0, 5, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0]
      ];
    } else if (type === 'Z') {
      return [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0]
      ];
    }
  }

  // draws the background and tile piece
  function draw() {
    // if (!paused) {

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();


    context.font = '1.25px Orbitron, sans-serif';



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

    if (gameOver) {
      context.fillStyle = 'rgba(167, 167, 167, 0.5)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'red';
      context.strokeStyle = 'black';
      context.font = '1.25px Orbitron, sans-serif';
      context.fillText('GAME OVER', 1.6, 6);
      context.font = '0.8px Orbitron, sans-serif';
      context.fillText('PRESS R TO RESTART', 0.6, 8.75);
    } else if (paused) {
      context.fillStyle = 'rgba(167, 167, 167, 0.6)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = '1px Orbitron, sans-serif';
      context.fillStyle = 'rgb(67, 225, 236)';
      context.strokeStyle = 'black';
      context.fillText('Press P to start', 1.8, 5.9);
    }
  }
  // drawNextMatrix(player.matrix, player.pos);
  // } else {
  //   // console.log('this');
  //   // context.font = '48px serif';
  //   // context.fillStyle = 'black';
  //   // context.fillText('Hello world', 50, 100);
  //   context.fillStyle = 'black';
  //   context.fillRect(0, 0, canvas.width, canvas.height);
  // }

  // context.fillRect(x, y, width, height);

  //Creates the actual piece
  function drawMatrix(matrix, offset) {

    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.fillStyle = colors[value];
          context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  function drawNextMatrix(matrix, offset) {
    nextContext.fillStyle = 'black';
    nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          nextContext.fillStyle = colors[value];
          nextContext.fillRect(x + 1, y + 0.75, 1, 1);
        }
      });
    });
  }
  const pieces = 'ILJOTSZ';
  var nextPieceMatrix = '';



  function nextPiece() {
    nextPieceMatrix = createPiece(pieces[pieces.length * Math.random() | 0]).slice(0);
    return nextPieceMatrix;
    // player.pos.y = 0;
    // player.pos.x = (arena[0].length / 2 | 0) -
    //   (player.matrix[0].length / 2 | 0);
  }


  // function drawNextMatrix(matrix, offset) {
  //   nextContext.fillStyle = 'orange';
  //   nextContext.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
  // }

  //takes in the value from the tile piece which is 1 and displays on the arena map, updates the 'board' relative to where the piece is
  function merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }


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
  // function playerReset() {
  //   const pieces = 'ILJOTSZ';
  //   player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  //   player.pos.y = 0;
  //   player.pos.x = (arena[0].length / 2 | 0) -
  //     (player.matrix[0].length / 2 | 0);

  //   if (collide(arena, player)) {
  //     resetArena(arena, player);
  //     // arena.forEach(row => row.fill(0));
  //     // player.score = 0;
  //     // updateScore;
  //   }
  // }
  function playerReset() {

    player.matrix = nextPieceMatrix.slice(0);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
      (player.matrix[0].length / 2 | 0);
    nextPiece();
    drawNextMatrix(nextPieceMatrix);
    if (collide(arena, player)) { //if the playerReset and then collide immediately reset must mean it collided on top
      gameOver = true;
      paused = true;
      update();
      // resetArena(arena, player);
      // draw();
      // arena.forEach(row => row.fill(0));
      // player.score = 0;
      // updateScore;
    }
  }

  function resetArena(arena, player) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore;
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

  let dropCounter = 0;
  let dropInterval = 1000;
  let lastTime = 0;

  //constantly update the screen, requestanimationFrame will keep redrawing, built in function
  //requestAnimationFrame will automatically input a timestamp
  var paused = false;


  function update(time = 0) {
    const deltaTime = time - lastTime;
    if (!paused) {
      lastTime = time;
      dropCounter += deltaTime;

      if (dropCounter > dropInterval) {
        playerDrop();
      }
      draw(); //draws the arena and the piece
      var id = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(id);
      // context.font = '48px serif';
      // context.fillText("Press P to Start", 50, 100);
      draw();
    }

  }





  function updateScore() {
    document.getElementById('score').innerText = `Score: ${player.score}`;
  }

  //pieces color
  const colors = [
    null, 'rgb(226, 36, 147)', 'rgb(102, 201, 226)', 'violet', 'rgb(72, 201, 72)', 'purple', 'rgb(247, 120, 17)', 'rgb(228, 23, 217)'
  ];
  //create arena/grid system as big as the canvas size, it is 12 and 20 because we scaled it
  // by 20, so it is actually 240 X 400
  const arena = createMatrix(12, 20);



  //players initial starting spot, with the current static piece of T, which is matrix
  const player = {
    pos: {
      x: 0,
      y: 0
    },
    matrix: null,
    score: 0
  };


  function fastDrop() {
    let tempPlayer = player;
    while (!collide(arena, tempPlayer)) {
      tempPlayer.pos.y++;
    }
    tempPlayer.pos.y--;
    draw();
    merge(arena, player); //updates board
    playerReset(); //gets new piece
    arenaSweep(); //checks to see if there are any rows that are filled up
    updateScore();
    return tempPlayer.pos.y;

  }


  //Allows user to move the tile piece
  document.addEventListener('keydown', event => {
    // console.log(event);
    if (event.keyCode === 37 && !paused) {
      playerMove(-1);

    } else if (event.keyCode === 39 && !paused) {
      playerMove(1);
    } else if (event.keyCode === 40 && !paused) {
      playerDrop();
    } else if (event.keyCode === 38 && !paused) {
      playerRotate(1);
    } else if (event.keyCode === 80 && !gameOver) {
      paused = !paused;
      update();
    } else if (event.keyCode === 82) {
      paused = false;
      gameOver = false;
      update();
      resetArena(arena, player);
      updateScore();
      playerReset();
    } else if (event.keyCode === 32 && !paused) {
      fastDrop();


    }
  });


  //playerReset generates a random piece, if the a collision appears on top of the area then everything gets resetted
  nextPiece();
  playerReset();
  updateScore();



  update();

  // update draws the board and draws the pieces
  //initiate update, will cause internal loop of requestAnimationFrame(update);




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