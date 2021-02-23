import {RECEIVE_DATA_URL} from './settings.js';
import {fileInput, openUploadModal, closeUploadModal} from './preview.js';
import {renderPictures, onPictureClick, onPictureEnterPress} from './gallery.js';
import {getData} from './network.js';
import {setPhotosData} from './data.js';
import {setPhotoFormSubmit} from './form.js';
import {showAlert} from './utils.js';

const onPhotoDataLoaded = (photoData) => {
  setPhotosData(photoData);
  renderPictures(photoData);

  const pictures = document.querySelectorAll('a.picture');
  pictures.forEach(element => element.addEventListener('click', onPictureClick));
  pictures.forEach(element => element.addEventListener('keydown', onPictureEnterPress));
}

getData(RECEIVE_DATA_URL, onPhotoDataLoaded, showAlert);

fileInput.addEventListener('change', openUploadModal);
setPhotoFormSubmit(closeUploadModal);
