'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var MAX_BAR_HEIGHT = 150;
var TEXT_WIDTH = 40;
var FONT_GAP = 50;
var BAR_NAME_Y = 265;
var BAR_Y = 250;
var TEXT_X = 150;
var TEXT_Y = 40;
var barWidth = TEXT_WIDTH;
var text = ['Ура вы победили!', 'Список результатов:'];

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

var renderText = function (ctx, text, x, y) {
  ctx.fillText(text, x, y);
};

var getRandomColor = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  var maxTime = getMaxValue(times);
  var color = getRandomColor();

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16px PT Mono';
  for (var j = 0; j < text.length; j++) {
    renderText(ctx, text[j], TEXT_X, 20 * j + TEXT_Y );
  }

  for (var i = 0; i < names.length; i++) {
    var coordinate = (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i;
    var barHeight = times[i] * MAX_BAR_HEIGHT / maxTime;

    ctx.fillStyle = 'rgb(0, 0, 0)';
    renderText(ctx, names[i], coordinate, BAR_NAME_Y);
    renderText(ctx, Math.round(times[i]), coordinate, BAR_NAME_Y - barHeight - GAP * 2);
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' :
      'hsla(240, 100%, 50%, .' + (color * i + 5) + ')';
    ctx.fillRect(coordinate, BAR_Y - barHeight, barWidth, barHeight);
  }
};
