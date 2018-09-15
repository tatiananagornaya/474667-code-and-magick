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

var renderText = function (ctx, names, times) {
  var text = ['Ура вы победили!', 'Список результатов:'];
  var maxTime = getMaxValue(times);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16 px PT Mono';
  for (var j = 0; j < text.length; j++) {
    ctx.fillText(text[j], TEXT_X, 20 * j + TEXT_Y );
  }

  ctx.fillStyle = 'rgb(0, 0, 0)';
  for (var i = 0; i < times.length; i++) {
    ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y);
    ctx.fillText(Math.round(times[i]), (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y - (times[i] * BAR_HEIGHT / maxTime) - GAP * 2 );
  }
};

var getRandomColor = function () {
  return Math.floor(Math.random() * 100);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  renderText(ctx, names, times);

  var maxTime = getMaxValue(times);
  var color = getRandomColor();

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' :
      'hsla(240, 100%, 50%, .' + (color * i + 5) + ')';
    ctx.fillRect((CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_Y - (times[i] * BAR_HEIGHT / maxTime), barWidth, times[i] * BAR_HEIGHT / maxTime);
  }
};
