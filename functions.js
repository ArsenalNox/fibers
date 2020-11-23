// TODO: Переключение анимаций
// TODO: Переключение режимов мыши
// TODO: Больше опций в меню
// TODO: Больше анимаций:
// TODO: 1.Анимация случайного ветра
// TODO: 2.Анимация кругового ветра

function update() {
  //Обновляет поле
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
      if ((fibers[i][j].x == 0) && (fibers[i][j].y == 0)) {
        continue;
      }
      let fx = i * 6 + offsetX;
      let fy = j * 6 + offsetY;
      let av = Math.sqrt(Math.pow(fibers[i][j].x, 2) + Math.pow(fibers[i][j].y, 2))
      ctx.beginPath();
      ctx.strokeStyle = "rgb(" + Math.floor(255 - color) + ",255," + color + ")";
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
  //Изменяет вектор
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
  //Получает позицию мыши
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function(evt) {
  //Рисование мышью
  if (mouseDraw) {
    var mousePos = getMousePos(canvas, evt);
    mousePos.x = Math.round((mousePos.x + offsetX) / 10);
    mousePos.y = Math.round((mousePos.y + offsetY) / 10);
    if (((mousePos.x > 0) && (mousePos.x < height - 3)) && ((mousePos.y > 0) && (mousePos.y < width - 3))) {
      //c
      wind[mousePos.x][mousePos.y].str = 1;
      wind[mousePos.x][mousePos.y].y = -(center.y - mousePos.y);
      wind[mousePos.x][mousePos.y].x = -(center.x - mousePos.x);
      //r
      wind[mousePos.x + 1][mousePos.y].str = 1;
      wind[mousePos.x + 1][mousePos.y].y = -(center.y - mousePos.y);
      wind[mousePos.x + 1][mousePos.y].x = -(center.x - mousePos.x);
      //l
      wind[mousePos.x - 1][mousePos.y].str = 1;
      wind[mousePos.x - 1][mousePos.y].y = -(center.y - mousePos.y);
      wind[mousePos.x - 1][mousePos.y].x = -(center.x - mousePos.x);
      //u
      wind[mousePos.x][mousePos.y + 1].str = 1;
      wind[mousePos.x][mousePos.y + 1].y = -(center.y - mousePos.y);
      wind[mousePos.x][mousePos.y + 1].x = -(center.x - mousePos.x);
      //d
      wind[mousePos.x][mousePos.y - 1].str = 1;
      wind[mousePos.x][mousePos.y - 1].y = -(center.y - mousePos.y);
      wind[mousePos.x][mousePos.y - 1].x = -(center.x - mousePos.x);
    } else {}
    lastMouseX = mousePos.x;
    lastMouseY = mousePos.y;
  }
}, false);

function currentR() {
  //Волна вправо
  isAnimating = true
  if (curh < height) {
    if (curw < width) {
      wind[curh][curw].x = incx;
      wind[curh][curw].y = incy;
      // wind[curh][curw].x = -(center.x - curh) / 10;
      // wind[curh][curw].y = -(center.y - curw) / 10;
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
    if (!stopAnimation) {
      setTimeout(currentL, 500)
    } else {
      stopAnimation = false
      initiateAnimation()
    }
  }
}

function currentL() {
  //Волна влево
  isAnimating = true
  if (curh > -1) {
    if (curw > -1) {
      wind[curh][curw].x = -incx;
      wind[curh][curw].y = -incy;
      // wind[curh][curw].x = -(center.x - curh) / 10;
      // wind[curh][curw].y = -(center.y - curw) / 10;
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
    if (!stopAnimation) {
      setTimeout(currentR, 500)
    } else {
      stopAnimation = false
      initiateAnimation()
    }
  }
}

function keyHadle(e) {
  //Обрабатывает нажатие клафиш
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
  //Контролирует отображение меню
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
  //Инициирует анимации
  switch (animations[currentAnimation]) {
    case 'wavesRL':
      isAnimating = true
      currentR()
      break;
    case 'circularWaves':
      isAnimating = true
      curcleInter = setInterval(drawCircle, 10)
      break;
    case 'blocksToSide':
      isAnimating = true
      setTimeout(cricularWave, 1000)
      break;
    case 'randomWind':
      isAnimating = true
      setTimeout(randomWind)
      break;
  }
}

function cricularWave() {
  //Пускает блочную волну справа, вектора показывают в центр
  if (waveCurrent < waveCount) {
    for (var i = iterWinds * 5; i < iterWinds * 5 + 5; i++) {
      for (var j = 0; j < width; j++) {
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
    if (!stopAnimation) {
      setTimeout(cricularWave, 100);
    } else {
      initiateAnimation()
      stopAnimation = false
    }
  }
}

function changeDecay() {
  //Меняет коэффицент затухания
  decayRate = decayInput.value
  console.log('Changing decay rate to ' + decayInput.value);
}

function drawCircle() {
  //Пускает круговую волну из центра
  if (iterationsCirlce < 40) {
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (Math.abs(Math.pow((i - center.x), 2) + Math.pow((j - center.y), 2) - Math.pow(r, 2)) < Math.pow(epsilon, 2)) {
          // wind[i][j].x = -(center.x - i) / 5;
          // wind[i][j].y = -(center.y - j) / 5;
          wind[i][j].x = incx;
          wind[i][j].y = incy;
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
  if (stopAnimation) {
    clearInterval(curcleInter)
    initiateAnimation()
    stopAnimation = false
  }
}

function changeAnimation(arg) {
  //Меняет анимации
  switch (arg) {
    case 'set':
      currentAnimation = document.getElementById('as').value;
      stopAnimation = true;
      // initiateAnimation()
      break;
    case '-':
      currentAnimation = document.getElementById('as').value;
      initiateAnimation()
      break;
  }
}

function randomWind(){
  
}
