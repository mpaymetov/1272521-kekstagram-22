'use strict';

const getRandom = (min = 0, max = 1) => {
  if (min < 0) {
    return false;
  }
  if (max <= min) {
    return min;
  }
  return Math.round((max - min) * Math.random() + min);
};

const checkStringLenght = (string = '', maxLenght = 0) => {
  return string.length <= maxLenght;
};

const randomNumber = getRandom();
const maxStrLen = 5;
const isStringLessMaxLen = checkStringLenght('Hello', maxStrLen);
/* eslint-disable no-console */
console.log(randomNumber);
console.log(isStringLessMaxLen);
