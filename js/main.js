import {checkStringLenght} from './utils.js';
import {createPhotoDataArray} from './data.js';

const PHOTOS_COUNT = 25;

const maxStrLen = 5;
const isStringLessMaxLen = checkStringLenght('Hello', maxStrLen);
const photoArr = createPhotoDataArray(PHOTOS_COUNT);

/* eslint-disable no-console */
console.log(isStringLessMaxLen);
console.log(photoArr);
