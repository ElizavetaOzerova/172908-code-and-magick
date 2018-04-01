'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - TEXT_HEIGHT - GAP - TEXT_HEIGHT - TEXT_HEIGHT - TEXT_HEIGHT - GAP;
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_WHITE = 'rgba(255, 255, 255, 1)';
var COLOR_BLACK = 'rgba(0, 0, 0, 1)';
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);

  ctx.fillStyle = COLOR_BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP + GAP, GAP + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + GAP, GAP + TEXT_HEIGHT + TEXT_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var colorBlue = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';

    ctx.fillText(players[i], CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT);
    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP - ((BAR_HEIGHT * times[i]) / maxTime) - TEXT_HEIGHT);

    ctx.fillStyle = players[i] === 'Вы' ? COLOR_RED : colorBlue;

    ctx.fillRect(CLOUD_X + GAP * 4 + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP, BAR_WIDTH, -(BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillStyle = COLOR_BLACK;
  }
};

