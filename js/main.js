import {RECEIVE_DATA_URL} from './settings.js';
import {fileInput, openUploadModal} from './preview.js';
import {renderPictures} from './gallery.js';
import {getData} from './network.js';
import {setPhotosData} from './data.js';
import {setPhotoFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage, showDownloadErrorAlert} from './message.js';
import {showSortButtons} from './sort.js';

const onPhotoDataLoaded = (photoData) => {
  setPhotosData(photoData);
  renderPictures(photoData);
  showSortButtons();
}

getData(RECEIVE_DATA_URL, onPhotoDataLoaded, showDownloadErrorAlert);
fileInput.addEventListener('change', openUploadModal);

setPhotoFormSubmit(showSuccessMessage, showErrorMessage);
