import {isEscEvent, showAlert} from './utils.js';
import {DOWNLOAD_ERROR_MESSAGE} from './settings.js';

const successMessageTemplateBlock = document.querySelector('#success');
const successMessageTemplate = successMessageTemplateBlock.content.querySelector('.success');
const errorMessageTemplateBlock = document.querySelector('#error');
const errorMessageTemplate = errorMessageTemplateBlock.content.querySelector('.error');
const main = document.querySelector('main');

const onSuccessMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
};

const onSuccessMessageOverlayClick = (evt) => {
  const successMessage = document.querySelector('.success');
  if (evt.target === successMessage) {
    closeSuccessMessage();
  }
};

const closeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');
  successMessage.remove();
}

const showSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  main.appendChild(successMessage);
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', closeSuccessMessage);
  successMessage.addEventListener('click', onSuccessMessageOverlayClick);
  document.addEventListener('keydown', onSuccessMessageEscPress);
}

const onErrorMessageEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
};

const onErrorMessageOverlayClick = (evt) => {
  const errorMessage = document.querySelector('.error');
  if (evt.target === errorMessage) {
    closeErrorMessage();
  }
};

const closeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
}

const showErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  main.appendChild(errorMessage);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', closeErrorMessage);
  errorMessage.addEventListener('click', onErrorMessageOverlayClick);
  document.addEventListener('keydown', onErrorMessageEscPress);
}

const showDownloadErrorAlert = () => {
  showAlert(DOWNLOAD_ERROR_MESSAGE);
};

export {showSuccessMessage, showErrorMessage, showDownloadErrorAlert};
