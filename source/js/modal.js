import {COMMENTS_TO_SHOW_COUNT} from './settings.js';
import {isEscEvent} from './utils.js';
import {getPhotosData} from './data.js';

const bigPictureBlock = document.querySelector('.big-picture');
const bigPictureImage = bigPictureBlock.querySelector('.big-picture__img img');
const bigPictureLikes = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentShowCount = bigPictureBlock.querySelector('.comments-show-count');
const bigPictureCommentsBlock = bigPictureBlock.querySelector('.social__comments');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const bigPictureCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const body = document.querySelector('body');
const bigPictureCancel = bigPictureBlock.querySelector('.big-picture__cancel');

let photoCommentsData = {};
let photoShowStep = 1;

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
  bigPictureCommentsBlock.appendChild(fragment);
};

const onCommentShowMore = () => {
  const photoShowFrom = photoShowStep * COMMENTS_TO_SHOW_COUNT;
  photoShowStep++;
  const photoShowTo = photoShowStep * COMMENTS_TO_SHOW_COUNT;

  bigPictureCommentShowCount.textContent = photoShowTo;

  const commentDataBlock = photoCommentsData.slice(photoShowFrom, photoShowTo);
  renderComments(commentDataBlock);

  if (photoShowTo >= photoCommentsData.length) {
    bigPictureCommentShowCount.textContent = photoCommentsData.length;
    bigPictureCommentsLoader.removeEventListener('click', onCommentShowMore);
    if (!bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  }
};

const showComments = () => {
  const commentsCount = photoCommentsData.length;
  bigPictureCommentCount.textContent = commentsCount;
  bigPictureCommentsBlock.innerHTML = '';

  photoShowStep = 0;
  onCommentShowMore();

  if (commentsCount <= COMMENTS_TO_SHOW_COUNT) {
    if (!bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
  } else {
    bigPictureCommentsLoader.addEventListener('click', onCommentShowMore);
    if (bigPictureCommentsLoader.classList.contains('hidden')) {
      bigPictureCommentsLoader.classList.remove('hidden');
    }
  }
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
  bigPictureDescription.textContent = pictureData.description;
  photoCommentsData = pictureData.comments;
  showComments();
};

const getPhotoId = (evt) => {
  const target = evt.currentTarget;
  if (target.dataset.photoId !== undefined) {
    return target.dataset.photoId;
  }
};

const getPhotoDataById = (photoId) => {
  const photosData = getPhotosData();
  return photosData.find((element) => {
    return element.id == photoId;
  });
};

const openPictureModal = (evt) => {
  const photoId = getPhotoId(evt);
  const pictureData = getPhotoDataById(photoId);
  renderPictureModalData(pictureData);

  bigPictureBlock.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', closePictureModal);
  document.addEventListener('keydown', onPictureModalEscPress);
};

export {openPictureModal};
