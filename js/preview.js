import {isEscEvent} from './utils.js';

const fileInput = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const modalCloseButton = document.querySelector('#upload-cancel');
const hideClass = 'hidden';

const onUploadModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const closeUploadModal = () => {
  imgUploadOverlay.classList.add(hideClass);
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.removeEventListener('click', closeUploadModal);

  fileInput.value = '';
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove(hideClass);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', closeUploadModal);
};

export {fileInput, openUploadModal};
