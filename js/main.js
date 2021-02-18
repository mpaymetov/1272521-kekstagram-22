import {checkStringLenght} from './utils.js';
import {createPhotosData} from './data.js';
import {renderPictures, onPictureClick, onPictureEnterPress} from './gallery.js';
import {fileInput, openUploadModal} from './preview.js';

import {PHOTOS_COUNT} from './settings.js';

const maxStrLen = 5;
const isStringLessMaxLen = checkStringLenght('Hello', maxStrLen);
createPhotosData(PHOTOS_COUNT);
renderPictures();

const pictures = document.querySelectorAll('a.picture');
pictures.forEach(element => element.addEventListener('click', onPictureClick));
pictures.forEach(element => element.addEventListener('keydown', onPictureEnterPress));

fileInput.addEventListener('change', openUploadModal);

/* eslint-disable no-console */
console.log(isStringLessMaxLen);
