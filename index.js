//Основные переменные

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var updateInter
var windRLinter
//X, Y
const height = 128;
const width = 64;
//Лимит длины
const limit = 10;
//
var lastMouseX = 25;
var lastMouseY = 25;

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
      let fx = i * 5 + 10;
      let fy = j * 5 + 10;
      let av = Math.sqrt(Math.pow(fibers[i][j].x, 2) + Math.pow(fibers[i][j].y, 2))
      ctx.beginPath();
      ctx.strokeStyle = "rgb(" + Math.floor(255 - i * 2) + "," + Math.floor(255 - j * 2) + ", 255)";
      ctx.moveTo(fx, fy);
      ctx.lineTo((fx) + fibers[i][j].x, (fy) + fibers[i][j].y);
      ctx.stroke();
      // console.log(fx, fy + '\n' + fibers[i][j].x, (fy)+fibers[i][j].y);
    }
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
        vector.x = vector.x * 0.984
      } else {
        vector.x = vector.x * 0.984
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
        vector.y = vector.y * 0.984
      } else {
        vector.y = vector.y * 0.984
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
  var mousePos = getMousePos(canvas, evt);
  mousePos.x = Math.round(mousePos.x / 5);
  mousePos.y = Math.round(mousePos.y / 5);
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
}, false);

function current() {
  console.log('ss');
  for (var i = 1; i < height - 10; i++) {
    generateWind(i)
  }
}

function generateWind(x) {
  for (var i = 1; i < width - 10; i++) {
    wind[x][i].x = 1
    wind[x][i].y = 0
    wind[x][i].str = 1
  }
}

updateInter = setInterval(update, 10)
setTimeout(current, 10)
