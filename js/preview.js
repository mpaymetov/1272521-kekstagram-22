import {isEscEvent} from './utils.js';
import {
  scaleControlBiggerButton,
  scaleControlSmallerButton,
  uploadForm,
  setPreviewDefaultScale,
  scaleDown,
  scaleUp,
  onEffectsChange,
  clearEffect,
  createEffectSlider,
  closeEffectSlider
} from './effect.js';

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

  scaleControlSmallerButton.removeEventListener('click', scaleDown);
  scaleControlBiggerButton.removeEventListener('click', scaleUp);
  uploadForm.removeEventListener('change', onEffectsChange);
  closeEffectSlider();
  fileInput.value = '';
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove(hideClass);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', closeUploadModal);

  scaleControlSmallerButton.addEventListener('click', scaleDown);
  scaleControlBiggerButton.addEventListener('click', scaleUp);
  uploadForm.addEventListener('change', onEffectsChange);
  setPreviewDefaultScale();
  clearEffect();
  createEffectSlider();
};

export {fileInput, openUploadModal};