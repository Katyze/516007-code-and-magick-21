'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const TITLE_X = 120;
const TITLE_Y = 30;
const FONT_GAP = 20;
const SHADOW_GAP = 10;
const BAR_GAP = 50;
const BAR_WIDTH = 40;
const BAR_HEIGHT_MAX = 150;
const BAR_X = 130;
const BAR_Y = 240;
const NAME_Y = 250;


let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

let getBarHeight = function (time, maxTime) {
  let barHeight = BAR_HEIGHT_MAX * time / maxTime;
  return barHeight;
};

let getRandomValue = function (min, max) {
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
};

let getBlueSaturation = function () {
  let randomSaturation = 'hsl(242, ' + getRandomValue(50, 100) + '%, 50%)';
  return randomSaturation;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TITLE_X, TITLE_Y);
  ctx.fillText('Список результатов:', TITLE_X, TITLE_Y + FONT_GAP);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let time = times[i].toFixed();

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], BAR_X + (BAR_WIDTH + BAR_GAP) * i, NAME_Y);
    ctx.fillText(time, BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y - getBarHeight(time, maxTime) - FONT_GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getBlueSaturation();
    }

    ctx.fillRect(BAR_X + (BAR_WIDTH + BAR_GAP) * i, BAR_Y, BAR_WIDTH, -getBarHeight(time, maxTime));
  }
};
