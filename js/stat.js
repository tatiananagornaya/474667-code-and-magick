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

var renderCongrats = function (ctx, text, x, y) {
  ctx.fillStyle = 'black';
  ctx.font = '16 px PT Mono';
  ctx.fillText(text, x, y);
};

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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
  renderCongrats(ctx, 'Ура вы победили!', textX, textY);
  renderCongrats(ctx, 'Список результатов:', textX, textY * 1.5);

  var maxTime = getMaxValue(times);
  var yourResultIndex = names.indexOf('Вы');

  for (var i = 0; i < names.length; i++) {
    if (i === yourResultIndex) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y);
      ctx.fillRect((CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_Y - (times[i] * BAR_HEIGHT / maxTime), barWidth, times[i] * BAR_HEIGHT / maxTime);

  } else {
      ctx.fillStyle = 'blue';
      ctx.fillText(names[i], (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y);
      ctx.fillRect((CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_Y - (times[i] * BAR_HEIGHT / maxTime), barWidth, times[i] * BAR_HEIGHT / maxTime);
    }
  };

  for (var i = 0; i < times.length; i++){
    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), (CLOUD_X + FONT_GAP) + TEXT_WIDTH * i + FONT_GAP * i, BAR_NAME_Y - (times[i] * BAR_HEIGHT / maxTime) - GAP * 2 );
  }
};
