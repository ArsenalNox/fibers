//Основные переменные
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var updateInter
var windRLinter

// X, Y
// const height = 140;
// const width = 70;
const height = 40;
const width = 40;
//Лимит длины
const limit = 10;

//
var lastMouseX = 25;
var lastMouseY = 25;
var curw = 0;
var curh = 0;
var color = 0;
var colorstate = 'asc';

//Опции
var mouseDraw = false;


//Создаю матрицу фибер
var fibers = [];
for (let i = 0; i < height; i++) {
  fibers[i] = [];
  for (let j = 0; j < width; j++) {
    fibers[i][j] = {
      "x": 0,
      "y": 0
    }
  }
}

var wind = [];
for (let i = 0; i < height; i++) {
  wind[i] = [];
  for (let j = 0; j < width; j++) {
    wind[i][j] = {
      "x": 0,
      "y": 0,
      "str": 0
    }
  }
}

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
      let fy = j * 7 + 20;
      let av = Math.sqrt(Math.pow(fibers[i][j].x, 2) + Math.pow(fibers[i][j].y, 2))
      ctx.beginPath();
      ctx.strokeStyle = "rgb(" + Math.floor(av * 5) + "," + Math.floor(av * 15) + "," + color + ")";
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
        vector.x = vector.x * 0.95
      } else {
        vector.x = vector.x * 0.95
      }
    }
  } else if (!(change.str == 0)) {
    vector.x += change.x * change.str
  }
  if ((change.y == 0) || (change.str == 0)) {
    //Если Y находится в пределах округления
    if ((vector.y < 0.2) && (vector.y > -0.2)) {
      vector.y = 0;
    } else {
      //Если Y положительный - вычесть, если положительный - прибавить
      if (vector.y > 0) {
        vector.y = vector.y * 0.95
      } else {
        vector.y = vector.y * 0.95
      }
    }
  } else if (!(change.str == 0)) {
    vector.y += change.y * change.str
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
  if(mouseDraw){
  var mousePos = getMousePos(canvas, evt);
  mousePos.x = Math.round(mousePos.x/14);
  mousePos.y = Math.round(mousePos.y/14);
  if (((mousePos.x > 0) && (mousePos.x < height - 3)) && ((mousePos.y > 0) && (mousePos.y < width - 3))) {
    //c
    wind[mousePos.x][mousePos.y].str = 1;
    wind[mousePos.x][mousePos.y].y = mousePos.y - lastMouseY;
    wind[mousePos.x][mousePos.y].x = mousePos.x - lastMouseX;
    //r
    wind[mousePos.x + 1][mousePos.y].str = 1;
    wind[mousePos.x + 1][mousePos.y].y = mousePos.y - lastMouseY;
    wind[mousePos.x + 1][mousePos.y].x = mousePos.x - lastMouseX;
    //l
    wind[mousePos.x - 1][mousePos.y].str = 1;
    wind[mousePos.x - 1][mousePos.y].y = mousePos.y - lastMouseY;
    wind[mousePos.x - 1][mousePos.y].x = mousePos.x - lastMouseX;
    //u
    wind[mousePos.x][mousePos.y + 1].str = 1;
    wind[mousePos.x][mousePos.y + 1].y = mousePos.y - lastMouseY;
    wind[mousePos.x][mousePos.y + 1].x = mousePos.x - lastMouseX;
    //d
    wind[mousePos.x][mousePos.y - 1].str = 1;
    wind[mousePos.x][mousePos.y - 1].y = mousePos.y - lastMouseY;
    wind[mousePos.x][mousePos.y - 1].x = mousePos.x - lastMouseX;
  } else {}
  lastMouseX = mousePos.x;
  lastMouseY = mousePos.y;
}
}, false);

function currentR() {
  if (curh < height) {
    if (curw < width) {
      wind[curh][curw].x = 10;
      wind[curh][curw].str = 1;
      wind[curh][curw].y = -6;
      curw++
      currentR()
    } else {
      curw = 0;
      curh++;
      setTimeout(currentR, 10)
    }
  } else {
    curw = width - 1;
    curh = height - 1;
    currentL()
  }
  //Проход по каждому
  // if(curw<height){
  //   if(curh<width){
  //     wind[curw][curh].x = 10;
  //     wind[curw][curh].str = 1;
  //     wind[curw][curh].y = 2;
  //     curh++
  //     setTimeout(current,10)
  //   }else {
  //     curh=0;
  //     curw++;
  //     setTimeout(current,10)
  //   }
  // }
}

function currentL() {
  if (curh > -1) {
    if (curw > -1) {
      wind[curh][curw].x = -10;
      wind[curh][curw].str = 1;
      wind[curh][curw].y = -6;
      curw--;
      currentL()
    } else {
      curw = width - 1;
      curh--;
      setTimeout(currentL, 10)
    }
  } else {
    curw = 1;
    curh = 1;
    currentR()
  }
}

updateInter = setInterval(update, 10)
setTimeout(currentR, 10)
