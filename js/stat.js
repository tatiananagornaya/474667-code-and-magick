'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_HEIGHT = 150;
var TEXT_WIDTH = 40;
var FONT_GAP = 50;
var BAR_NAME_Y = 265;
var BAR_Y = 250;
var TEXT_X = 150;
var TEXT_Y = 40;
var barWidth = TEXT_WIDTH;
var text = ['Ура вы победили!', 'Список результатов:'];
var j = 0;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

 var getMaxValue = function(times) {
   var maxValue = times[0];
   for (var i = 0; i < times.length; i++) {
     if (times[i] > maxValue) {
       maxValue = times[i];
     }
   }
   return maxValue;
 };

var renderText = function (ctx, names, times, x, y) {
  var maxTime = getMaxValue(times);
  ctx.fillText(text, x, y);
};

var getRandomColor = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  var maxTime = getMaxValue(times);

  for (j = 0; j < names.length; j++) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[j], (CLOUD_X + FONT_GAP) + TEXT_WIDTH * j + FONT_GAP * j, BAR_NAME_Y);
    ctx.fillText(Math.round(times[j]), (CLOUD_X + FONT_GAP) + TEXT_WIDTH * j + FONT_GAP * j, BAR_NAME_Y - (times[j] * BAR_HEIGHT / maxTime) - GAP * 2 );

    ctx.font = '16px PT Mono';
    ctx.fillText(text[0], TEXT_X, TEXT_Y);
    ctx.fillText(text[1], TEXT_X, TEXT_Y * 1.5);
    renderText(ctx, names, times);
  }

  var color = getRandomColor();

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' :
      'hsla(240, 100%, 50%, .' + (color * i + 5) + ')';
    ctx.fillRect((CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_Y - (times[i] * BAR_HEIGHT / maxTime), barWidth, times[i] * BAR_HEIGHT / maxTime);
  }
};
