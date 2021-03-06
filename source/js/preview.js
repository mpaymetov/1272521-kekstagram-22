import {UPLOAD_FILE_TYPES} from './settings.js';
import {isEscEvent} from './utils.js';
import {
  uploadForm,
  descriptionInput,
  hashtagsInput,
  onDescriptionInput,
  onHashtagInput,
  setPhotoFormSubmit,
  unsetPhotoFormSubmit
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
const imagePreview = document.querySelector('.img-upload__preview img');

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
  hashtagsInput.setCustomValidity('');
  hashtagsInput.reportValidity();
  descriptionInput.value = '';
  descriptionInput.setCustomValidity('');
  descriptionInput.reportValidity();
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
  unsetPhotoFormSubmit();
};

const showPhotoPreview = () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = UPLOAD_FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imagePreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const openUploadModal = () => {
  showPhotoPreview();
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
  setPhotoFormSubmit();
};

export {fileInput, openUploadModal, closeUploadModal};
