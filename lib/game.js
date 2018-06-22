  const canvas = document.getElementById('tetris-canvas');
  const context = canvas.getContext('2d');
  const nextCanvas = document.getElementById('tetris-next-canvas');
  const nextContext = nextCanvas.getContext('2d');

  context.scale(30, 30);
  nextContext.scale(30, 30);