function update() {
  //Высчитывание векторов фиберов
  for (var i = 0; i < fibers.length; i++) {
    for (var j = 0; j < fibers[0].length; j++) {
      ChangeVector(fibers[i][j], wind[i][j]);
      if (!(wind[i][j].x == 0)) {
        wind[i][j].x -= 0.25;
      }
      if (!(wind[i][j].y == 0)) {
        wind[i][j].y -= 0.25;
      }
      if (!(wind[i][j].str == 0)) {
        wind[i][j].str -= 0.25;
      }
    }
  }

  //Отрисовка фиберов
  ctx.beginPath();
  ctx.fillStyle = "#222222";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.stroke();
  for (let i = 0; i < fibers.length; i++) {
    for (let j = 0; j < fibers[0].length; j++) {
      let fx = i * 4 + offsetX;
      let fy = j * 4 + offsetY;
      let av = Math.sqrt(Math.pow(fibers[i][j].x, 2) + Math.pow(fibers[i][j].y, 2))
      ctx.beginPath();
      ctx.strokeStyle = "rgb(" + Math.floor(255 - color) + "," + Math.floor(av * 4) + "," + color + ")";
      ctx.moveTo(fx, fy);
      ctx.lineTo((fx) + fibers[i][j].x, (fy) + fibers[i][j].y);
      ctx.stroke();
      // console.log(fx, fy + '\n' + fibers[i][j].x, (fy)+fibers[i][j].y);
    }
  }

  switch (colorstate) {
    case 'asc':
      if (color > 255) {
        colorstate = 'desc'
      } else {
        color++
      }
      break;
    case 'desc':
      if (color < 1) {
        colorstate = 'asc'
      } else {
        color--
      }
      break;
  }
}

function ChangeVector(vector, change) {
  //Если нет ветра
  if ((change.x == 0) || (change.str == 0)) {
    //Если X находится в пределах округления
    if ((vector.x < 0.5) && (vector.x > -0.5)) {
      vector.x = 0;
    } else {
      //Если X положительный - вычесть, если положительный - прибавить
      if (vector.x > 0) {
        vector.x = +(vector.x * decayRate).toFixed(3)
      } else {
        vector.x = +(vector.x * decayRate).toFixed(3)
      }
    }
  } else if (!(change.str == 0)) {
    vector.x += +(change.x * change.str).toFixed(3)
  }
  if ((change.y == 0) || (change.str == 0)) {
    //Если Y находится в пределах округления
    if ((vector.y < 0.2) && (vector.y > -0.2)) {
      vector.y = 0;
    } else {
      //Если Y положительный - вычесть, если положительный - прибавить
      if (vector.y > 0) {
        vector.y = +(vector.y * decayRate).toFixed(3)
      } else {
        vector.y = +(vector.y * decayRate).toFixed(3)
      }
    }
  } else if (!(change.str == 0)) {
    vector.y += +(change.y * change.str).toFixed(3)
  }
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function(evt) {
  if (mouseDraw) {
    var mousePos = getMousePos(canvas, evt);
    mousePos.x = Math.round((mousePos.x + offsetX) / 10);
    mousePos.y = Math.round((mousePos.y + offsetY) / 10);
    if (((mousePos.x > 0) && (mousePos.x < height - 3)) && ((mousePos.y > 0) && (mousePos.y < width - 3))) {
      center.x = mousePos.x;
      center.y = mousePos.y;
    } else {}
    lastMouseX = mousePos.x;
    lastMouseY = mousePos.y;
  }
}, false);

function currentR() {
  isAnimating = true
  if (curh < height) {
    if (curw < width) {
      // wind[curh][curw].x = -2;
      // wind[curh][curw].y = -6;
      wind[curh][curw].x = -(center.x - curh) / 10;
      wind[curh][curw].y = -(center.y - curw) / 10;
      wind[curh][curw].str = 2;
      curw++
      currentR()
    } else {
      curw = 0;
      curh++;
      setTimeout(currentR, 24)
    }
  } else {
    curw = width - 1;
    curh = height - 1;
    if (!stopWind) {
      setTimeout(currentL, 500)
    } else {
      isAnimating = false
    }
  }
}

function currentL() {
  isAnimating = true
  if (curh > -1) {
    if (curw > -1) {
      // wind[curh][curw].x = 2;
      // wind[curh][curw].y = 6;
      wind[curh][curw].x = -(center.x - curh) / 10;
      wind[curh][curw].y = -(center.y - curw) / 10;
      wind[curh][curw].str = 2;
      curw--;
      currentL()
    } else {
      curw = width - 1;
      curh--;
      setTimeout(currentL, 24)
    }
  } else {
    curw = 1;
    curh = 1;
    if (!stopWind) {
      setTimeout(currentR, 500)
    } else {
      isAnimating = false
    }
  }
}

function keyHadle(e) {
  if (optionKeys.includes(e.key)) {
    console.log('Option');
    Options()
  } else if (mouseKeys.includes(e.key)) {
    if (mouseDraw) {
      mouseDraw = false;
    } else {
      mouseDraw = true;
    }
  }
  updateMenu()
}

function Options() {
  switch (optionVisible) {
    case false:
      optionVisible = true
      optionMenu.style.display = 'grid';
      break;
    case true:
      optionVisible = false
      optionMenu.style.display = 'none';
      break;

  }
}

function initiateAnimation() {
  switch (animations[currentAnimation]) {
    case 'wavesRL':
      if (!isAnimating) {
        isAnimating = true
        currentR()
      }
      break;
    case 'circularWaves':
      if (!isAnimating) {
        isAnimating = true
        setInterval(drawCircle, 10)
      }
      break;
    case 'blocksToSide':
      if (!isAnimating) {
        isAnimating = true
        setTimeout(cricularWave, 1000)
      }
      break;
  }
}

function cricularWave() {
  if (waveCurrent < waveCount) {
    for (var i = iterWinds * 5; i < iterWinds * 5 + 5; i++) {
      for (var j = 0; j < 30; j++) {
        wind[i][j].x = -(center.x - i);
        wind[i][j].y = -(center.y - j);
        wind[i][j].str = 1;
      }
    }
    waveCurrent++
    iterWinds++
    setTimeout(cricularWave, 50);
  } else {
    waveCurrent = 0;
    iterWinds = 0;

    setTimeout(cricularWave, 100);
  }
}

function changeDecay() {
  decayRate = decayInput.value
  console.log('Changing decay rate to ' + decayInput.value);
}

function drawCircle() {
  console.log('Drawing');
  if (iterationsCirlce < 40) {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (Math.abs(Math.pow((i - center.x), 2) + Math.pow((j - center.y), 2) - Math.pow(r, 2)) < Math.pow(epsilon, 2)) {
          wind[i][j].x = -(center.x - i) / 5;
          wind[i][j].y = -(center.y - j) / 5;
          wind[i][j].str = 1;
        }
      }
    }
    iterationsCirlce++
    r++
    epsilon += 0.2
  } else {
    r = 5;
    epsilon = 3;
    iterationsCirlce = 0;
  }

}
