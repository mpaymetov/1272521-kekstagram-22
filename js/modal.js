import {isEscEvent} from './utils.js';
import {getPhotosData} from './data.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentsBlock = bigPictureBlock.querySelector('.social__comments');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const bigPictureCommentCountBlock = bigPictureBlock.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCancel = bigPictureBlock.querySelector('.big-picture__cancel');

let template = document.createElement('template');
const commentTemplateString = `
  <li class="social__comment">
    <img
      class="social__picture"
      src=""
      alt=""
      width="35" height="35">
    <p class="social__text"></p>
  </li>`;
template.innerHTML = commentTemplateString;
const templateComment = template.content.querySelector('.social__comment');

const renderComment = (comment) => {
  let element = templateComment.cloneNode(true);
  element.querySelector('.social__picture').src = comment.avatar;
  element.querySelector('.social__picture').alt = comment.name;
  element.querySelector('.social__text').innerText = comment.message;
  return element;
};

const renderComments = (commentsData) => {
  let fragment = document.createDocumentFragment();
  commentsData.forEach(comment => fragment.appendChild(renderComment(comment)));

  bigPictureCommentsBlock.innerHTML = '';
  bigPictureCommentsBlock.appendChild(fragment);
};

const closePictureModal = () => {
  bigPictureBlock.classList.add('hidden');
  body.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', closePictureModal);
  document.removeEventListener('keydown', onPictureModalEscPress)
};

const onPictureModalEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const renderPictureModalData = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureLikes.textContent = pictureData.likes;
  bigPictureCommentCount.textContent = pictureData.comments.size;
  bigPictureDescription.textContent = pictureData.description;
  renderComments(pictureData.comments);

  bigPictureCommentCountBlock.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
};

const openPictureModal = (evt) => {

  /* eslint-disable no-console */
  console.log(evt);
  const photosData = getPhotosData();
  const pictureData = photosData[0];

  renderPictureModalData(pictureData);

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closePictureModal);
  document.addEventListener('keydown', onPictureModalEscPress)
};

export {openPictureModal};
