//Основные переменные
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var updateInter

//Лимит длины
const limit = 10;

//Создаю матрицу фибер
var fibers = [];
for (let i = 0; i < 19; i++) {
  fibers[i] = [];
  for (let j = 0; j < 19; j++) {
    fibers[i][j] = {
      "x": 0,
      "y": 0
    }
  }
}
console.log(fibers.length, fibers[0].lenght);

var vector = {
  'x': 0,
  'y': 0,
  increnemt: function() {
    this.x += 1;
    this.y += 1;
  }
};

function update() {
  //Высчитывание векторов фиберов
  for (var i = 0; i < fibers.length; i++) {
    for (var j = 0; j < fibers[0].length; j++) {
      if ((Math.round(Math.random())) == 1) {
        fibers[i][j].x += vector.x;
        fibers[i][j].y += vector.y;

      } else {
        fibers[i][j].x += -vector.x;
        fibers[i][j].y += -vector.y;
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
      let fx = i * 15 + 10;
      let fy = j * 15 + 10;
      ctx.beginPath();
      ctx.strokeStyle = "rgb(255," + Math.floor(255 - 20 * j) + "," + Math.floor(255 - 20 * i) + ")";
      ctx.moveTo(fx, fy);
      ctx.lineTo((fx) + fibers[i][j].x, (fy) + fibers[i][j].y);
      ctx.stroke();
      // console.log(fx, fy + '\n' + fibers[i][j].x, (fy)+fibers[i][j].y);
    }
  }
}

updateInter = setInterval(update, 1000)
