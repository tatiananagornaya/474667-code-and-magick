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
var barWidth = TEXT_WIDTH;
var textX = CLOUD_X * 1.5;
var textY = CLOUD_Y * 4;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderCongrats = function (ctx, text, x, y) {
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.font = '16 px PT Mono';
  ctx.fillText(text, x, y);
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

var renderText = function (ctx, names) {
  renderCongrats(ctx, 'Ура вы победили!', textX, textY);
  renderCongrats(ctx, 'Список результатов:', textX, textY * 1.5);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y);
  }
};

var renderFigures = function (ctx, times) {
  var maxTime = getMaxValue(times);

  ctx.fillStyle = 'rgb(0, 0, 0)';
  for (var i = 0; i < times.length; i++) {
    ctx.fillText(Math.round(times[i]), (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y - (times[i] * BAR_HEIGHT / maxTime) - GAP * 2 );
  }
};

var getRandomColor = function () {
  return Math.floor(Math.random() * 255);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');
  renderText(ctx, names);
  renderFigures(ctx, times);

  var maxTime = getMaxValue(times);
  var color = getRandomColor();

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' :
      names[names.length - 1] ? 'rgb(0, 0, 255)' :
       'rgb(' + '0, ' + color + ', ' + color + ')';
    ctx.fillRect((CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_Y - (times[i] * BAR_HEIGHT / maxTime), barWidth, times[i] * BAR_HEIGHT / maxTime);
  }
};
