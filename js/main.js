import {createPhotosData} from './data.js';
import {renderPictures, onPictureClick, onPictureEnterPress} from './gallery.js';
import {fileInput, openUploadModal} from './preview.js';
import {PHOTOS_COUNT} from './settings.js';

createPhotosData(PHOTOS_COUNT);
renderPictures();

const pictures = document.querySelectorAll('a.picture');
pictures.forEach(element => element.addEventListener('click', onPictureClick));
pictures.forEach(element => element.addEventListener('keydown', onPictureEnterPress));

fileInput.addEventListener('change', openUploadModal);
