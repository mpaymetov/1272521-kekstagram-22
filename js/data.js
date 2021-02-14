import {getRandom} from './utils.js';
import {LIKES_MIN, LIKES_MAX, AVATARS_COUNT, COMMENTS_MIN, COMMENTS_MAX, NAMES, MESSAGES} from './settings.js';

let commentId = 0;
let photosData = {};

const getRandomArray = (array) => {
  return array[getRandom(0, array.length - 1)];
};

const createRandomComment = () => {
  const randomAvatarNumber = getRandom(1, AVATARS_COUNT);
  const avatar = `img/avatar-${randomAvatarNumber}.svg`;
  const message = getRandomArray(MESSAGES);
  const name = getRandomArray(NAMES);
  return {
    id: commentId++,
    avatar,
    message,
    name,
  };
};

const createComments = () => {
  const comments = [];
  const commentsCount = getRandom(COMMENTS_MIN, COMMENTS_MAX);
  for (let i = 0; i < commentsCount; i++) {
    const comment = createRandomComment();
    comments.push(comment);
  }
  return comments;
};

const createPhotoData = (number) => {
  const url = `photos/${number}.jpg`;
  const description = `Фотография № ${number}`;
  const likes = getRandom(LIKES_MIN, LIKES_MAX);
  const comments = createComments();
  return {
    id: number,
    url,
    description,
    likes,
    comments,
  };
};

const createPhotosData = (photosCount) => {
  const photos = [];
  for (let i = 1; i <= photosCount; i++) {
    photos.push(createPhotoData(i));
  }
  photosData = photos;
};

const getPhotosData = () => {
  return photosData;
};

export {createPhotosData, getPhotosData};
