import {openPictureModal} from './modal.js';
import {isEnterEvent} from './utils.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a.picture');

const renderPicture = (photoData) => {
  let element = pictureTemplate.cloneNode(true);
  element.dataset.photoId = photoData.id;
  element.querySelector('.picture__img').src = photoData.url;
  element.querySelector('.picture__comments').innerText = photoData.comments.length;
  element.querySelector('.picture__likes').innerText = photoData.likes;
  return element;
};

const clearPictures = () => {
  const pictures = pictureContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const setPicturesViewed = () => {
  const pictures = document.querySelectorAll('a.picture');
  pictures.forEach(element => element.addEventListener('click', onPictureClick));
  pictures.forEach(element => element.addEventListener('keydown', onPictureEnterPress));
};

const renderPictures = (photosData) => {
  let fragment = document.createDocumentFragment();
  photosData.forEach(element => fragment.appendChild(renderPicture(element)));
  clearPictures();
  pictureContainer.appendChild(fragment);
  setPicturesViewed();
};

const onPictureClick = (evt) => {
  evt.preventDefault();
  openPictureModal(evt);
};

const onPictureEnterPress = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
    openPictureModal(evt);
  }
};

export {renderPictures};
