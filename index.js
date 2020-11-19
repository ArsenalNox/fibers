//Основные переменные
var canvas = document.getElementById('canvas');
var optionMenu = document.getElementById('menu')
var ctx = canvas.getContext('2d');
var updateInter
var windRLinter

// X, Y
// const height = 140;
// const width = 70;
const height = 62;
const width = 32;
const limit = 20;
//Для волн
var curw = 0;
var curh = 0;
var color = 0;
var colorstate = 'asc';
var center = {
  x: Math.round(height/2),
  y: Math.round(width/2)
}
//Итераторы для волны от центра
var waveCount = 5;
var waveCurrent = 0;
var iterWinds = 0;

//Опции
var mouseDraw = false;
var lastMouseX = 25;
var lastMouseY = 25;
var stopWind = false;
var isAnimating = false;

var optionKeys = ['o', 'O', 'о', 'О', 'щ', 'Щ', 'j', 'J'];
var animations = ['wavesRL', 'circularWaves', 'randomWind'];
var currentAnimation = 0;
var mouseKeys = ['m', 'M'];
var optionVisible = false;

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


document.getElementById('span-width').innerText = width;
document.getElementById('span-height').innerText = height;


updateInter = setInterval(update, 5)
initiateAnimation()
window.addEventListener('keydown', keyHadle);
