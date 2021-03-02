import {checkStringLength} from './utils.js';
import {HASHTAGS_DELIMITER, HASHTAGS_MAX_COUNT, DESCRIPTION_MAX_LENGTH, SEND_DATA_URL} from './settings.js';
import {sendData} from './network.js';
import {closeUploadModal} from './preview.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const isAllArrStrElemUniq = (arr) => {
  const arrLowerCase = arr.map((element) => {
    return element.toLowerCase();
  });
  const unique = new Set(arrLowerCase);
  return arr.length === unique.size;
};

const isHashtag = (word) => {
  const hashtagRegex = /^#[A-Za-z0-9]{1,19}$/;
  return hashtagRegex.test(word);
};

const onHashtagInput = (evt) => {
  const hashtags = evt.target.value.split(HASHTAGS_DELIMITER);
  const hashtagArr = hashtags.filter((elem) => {
    return Boolean(elem.length);
  });
  const hashtagCount = hashtagArr.length;
  const hashtagCountError = hashtagCount > HASHTAGS_MAX_COUNT;
  const hashtagError = hashtagCount && !hashtagArr.every(isHashtag);
  const hashtagUniqError = !isAllArrStrElemUniq(hashtagArr);

  if (hashtagCountError) {
    evt.target.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else if (hashtagError) {
    evt.target.setCustomValidity('неверный хештег');
  } else if (hashtagUniqError) {
    evt.target.setCustomValidity('хэш-тег не может быть использован дважды');
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
};

const onDescriptionInput = (evt) => {
  if (!checkStringLength(evt.target.value, DESCRIPTION_MAX_LENGTH)) {
    evt.target.setCustomValidity(`комментарий не может быть больше ${DESCRIPTION_MAX_LENGTH} символов`);
  } else {
    evt.target.setCustomValidity('');
  }
  evt.target.reportValidity();
};

const setPhotoFormSubmit = (onSuccess, onError) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(SEND_DATA_URL, formData, onSuccess, onError);
    closeUploadModal();
  })
}

export {
  uploadForm,
  hashtagsInput,
  descriptionInput,
  onHashtagInput,
  onDescriptionInput,
  setPhotoFormSubmit
};
