import {openPictureModal} from './modal.js';
import {isEnterEvent} from './utils.js';
import {getPhotosData} from './data.js';

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

const renderPictures = () => {
  const photosData = getPhotosData();
  let fragment = document.createDocumentFragment();
  photosData.forEach(element => fragment.appendChild(renderPicture(element)));
  pictureContainer.appendChild(fragment);
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

export {renderPictures, onPictureClick, onPictureEnterPress};
