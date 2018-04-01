'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var TEXT_HEIGHT = 20;
var GAP_SIZE = 10;
var BAR_GAP_SIZE = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = CLOUD_HEIGHT - GAP_SIZE - 5 * TEXT_HEIGHT - 2 * GAP_SIZE;
var BAR_POSITION_Y = CLOUD_Y + CLOUD_HEIGHT - GAP_SIZE * 2 - TEXT_HEIGHT;
var TITLE_POSITION_X = CLOUD_X + GAP_SIZE * 2;
var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
var COLOR_WHITE = 'rgba(255, 255, 255, 1)';
var COLOR_BLACK = 'rgba(0, 0, 0, 1)';
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var generateBlueColor = function () {
  return 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
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
  renderCloud(ctx, CLOUD_X + GAP_SIZE, CLOUD_Y + GAP_SIZE, COLOR_SHADOW);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_WHITE);

  ctx.fillStyle = COLOR_BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TITLE_POSITION_X, GAP_SIZE + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', TITLE_POSITION_X, GAP_SIZE + TEXT_HEIGHT * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var colorBlue = generateBlueColor();
    var positionX = CLOUD_X + GAP_SIZE * 4 + (BAR_GAP_SIZE + BAR_WIDTH) * i;
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(players[i], positionX, CLOUD_Y + CLOUD_HEIGHT - GAP_SIZE - TEXT_HEIGHT);
    ctx.fillText(Math.floor(times[i]), positionX, BAR_POSITION_Y - barHeight - TEXT_HEIGHT);

    ctx.fillStyle = players[i] === 'Вы' ? COLOR_RED : colorBlue;
    ctx.fillRect(positionX, BAR_POSITION_Y - barHeight, BAR_WIDTH, barHeight);
  }
};
