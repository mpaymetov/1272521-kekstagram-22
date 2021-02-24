import {isEscEvent} from './utils.js';
import {
  uploadForm,
  descriptionInput,
  hashtagsInput,
  onDescriptionInput,
  onHashtagInput
} from './form.js';
import {
  scaleControlBiggerButton,
  scaleControlSmallerButton,
  setPreviewDefaultScale,
  scaleDown,
  scaleUp,
  onEffectsChange,
  setOriginalEffect,
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
    const isHashtagsInputNotFocus = hashtagsInput !== document.activeElement;
    const isDescriptionInputNotFocus = descriptionInput !== document.activeElement;
    evt.preventDefault();
    if (isHashtagsInputNotFocus && isDescriptionInputNotFocus) {
      closeUploadModal();
    }
  }
};

const clearForm = () => {
  setOriginalEffect();
  setPreviewDefaultScale();
  fileInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
}

const closeUploadModal = () => {
  imgUploadOverlay.classList.add(hideClass);
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.removeEventListener('click', closeUploadModal);

  scaleControlSmallerButton.removeEventListener('click', scaleDown);
  scaleControlBiggerButton.removeEventListener('click', scaleUp);
  uploadForm.removeEventListener('change', onEffectsChange);

  hashtagsInput.removeEventListener('input', onHashtagInput);
  descriptionInput.removeEventListener('input', onDescriptionInput);

  closeEffectSlider();
  clearForm();
};

const openUploadModal = () => {
  imgUploadOverlay.classList.remove(hideClass);
  body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadModalEscPress);
  modalCloseButton.addEventListener('click', closeUploadModal);

  scaleControlSmallerButton.addEventListener('click', scaleDown);
  scaleControlBiggerButton.addEventListener('click', scaleUp);
  uploadForm.addEventListener('change', onEffectsChange);

  hashtagsInput.addEventListener('input', onHashtagInput);
  descriptionInput.addEventListener('input', onDescriptionInput);

  createEffectSlider();
  setPreviewDefaultScale();
  setOriginalEffect();
};

export {fileInput, openUploadModal, closeUploadModal};
