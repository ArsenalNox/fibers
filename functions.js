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
      let fx = i * 7 + 20;
      let fy = j * 7 + 100;
      // let av = Math.sqrt(Math.pow(fibers[i][j].x, 2) + Math.pow(fibers[i][j].y, 2))
      ctx.beginPath();
      ctx.strokeStyle = "rgb(" + Math.floor(fx / 2) + "," + Math.floor(fy / 2) + "," + color + ")";
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
        vector.x = +(vector.x * 0.98).toFixed(2)
      } else {
        vector.x = +(vector.x * 0.98).toFixed(2)
      }
    }
  } else if (!(change.str == 0)) {
    vector.x += +(change.x * change.str).toFixed(2)
  }
  if ((change.y == 0) || (change.str == 0)) {
    //Если Y находится в пределах округления
    if ((vector.y < 0.2) && (vector.y > -0.2)) {
      vector.y = 0;
    } else {
      //Если Y положительный - вычесть, если положительный - прибавить
      if (vector.y > 0) {
        vector.y = +(vector.y * 0.98).toFixed(2)
      } else {
        vector.y = +(vector.y * 0.98).toFixed(2)
      }
    }
  } else if (!(change.str == 0)) {
    vector.y += +(change.y * change.str).toFixed(2)
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
    mousePos.x = Math.round(mousePos.x / 16);
    mousePos.y = Math.round(mousePos.y / 16);
    if (((mousePos.x > 0) && (mousePos.x < height - 3)) && ((mousePos.y > 0) && (mousePos.y < width - 3))) {
      //c
      wind[mousePos.x][mousePos.y].str = 1;
      wind[mousePos.x][mousePos.y].y = (mousePos.y + 2) - lastMouseY;
      wind[mousePos.x][mousePos.y].x = (mousePos.x + 2) - lastMouseX;
      //r
      wind[mousePos.x + 1][mousePos.y].str = 2;
      wind[mousePos.x + 1][mousePos.y].y = mousePos.y - lastMouseY;
      wind[mousePos.x + 1][mousePos.y].x = mousePos.x - lastMouseX;
      //l
      wind[mousePos.x - 1][mousePos.y].str = 2;
      wind[mousePos.x - 1][mousePos.y].y = mousePos.y - lastMouseY;
      wind[mousePos.x - 1][mousePos.y].x = mousePos.x - lastMouseX;
      //u
      wind[mousePos.x][mousePos.y + 1].str = 2;
      wind[mousePos.x][mousePos.y + 1].y = mousePos.y - lastMouseY;
      wind[mousePos.x][mousePos.y + 1].x = mousePos.x - lastMouseX;
      //d
      wind[mousePos.x][mousePos.y - 1].str = 2;
      wind[mousePos.x][mousePos.y - 1].y = mousePos.y - lastMouseY;
      wind[mousePos.x][mousePos.y - 1].x = mousePos.x - lastMouseX;
    } else {}
    lastMouseX = mousePos.x;
    lastMouseY = mousePos.y;
  }
}, false);

function currentR() {
  isAnimating = true
  if (curh < height) {
    if (curw < width) {
      wind[curh][curw].x = -2;
      wind[curh][curw].str = 2;
      wind[curh][curw].y = -6;
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
      wind[curh][curw].x = 2;
      wind[curh][curw].str = 2;
      wind[curh][curw].y = 6;
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
      currentR()
      break;
    case 'circularWaves':
      setInterval(cricularWave, 600)
      break;
    case 'randomWind':

      break;
  }
}

function cricularWave() {
  if (waveCurrent < waveCount) {
    for (var i = iterWinds*5; i < iterWinds*5+10; i++) {
      for (var j =  iterWinds*5; j < iterWinds*5+ 10; j++) {
        wind[i][j].x = -(center.x - i);
        wind[i][j].y = -(center.y - j);
        wind[i][j].str = 1;
      }
    }
    waveCurrent++
    iterWinds++
    setTimeout(cricularWave, 1000);
  } else {
    console.log('Wave completed');
  }


}
