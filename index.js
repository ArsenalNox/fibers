//Основные переменные
var canvas = document.getElementById('canvas');
var optionMenu = document.getElementById('menu');
var decayInput = document.getElementById('decay-input')
var ctx = canvas.getContext('2d');
var updateInter
var windRLinter

// X, Y
// const height = 140;
// const width = 70;
const height = 64;
const width = 64;
const limit = 20;
var offsetX = 30;
var offsetY = 100;
var incx = 2;
var incy = 6;
//Для волн
var curw = 0;
var curh = 0;
var color = 0;
var colorstate = 'asc';
var center = {
  x: Math.round(height / 2),
  y: Math.round(width / 2)
}

//Итераторы для волны от центра
var waveCount = Math.round(height/6);
var waveCurrent = 0;
var iterWinds = 0;

//Опции
//Мышь
var mouseDraw = false;
var lastMouseX = 25;
var lastMouseY = 25;
//Анимации
var stopAnimation = false;
var isAnimating = false;
var decayRate = 0.95;
//Горячие клавиши
var optionKeys = ['o', 'O', 'о', 'О', 'щ', 'Щ', 'j', 'J'];
var animations = ['wavesRL', 'circularWaves', 'blocksToSide'];
var mouseKeys = ['m', 'M'];
var optionVisible = false;
var currentAnimation = Math.round(Math.random() * 2);
var curcleInter;
//Для круговых волн
var epsilon = 4;
var r = 2;
var iterationsCirlce = 0;

//Создание матрицы фибер
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
//Создание матрицы ветра
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

function updateMenu() {
  document.getElementById('span-width').innerText = width;
  document.getElementById('span-height').innerText = height;
  document.getElementById('decay-input').value = decayRate;
  document.getElementById('mouse-control').innerText = mouseDraw
}
updateMenu()
updateInter = setInterval(update, 10)
initiateAnimation()
window.addEventListener('keydown', keyHadle);
