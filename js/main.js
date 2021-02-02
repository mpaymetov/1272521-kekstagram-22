'use strict';

const PHOTOS_COUNT = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATARS_COUNT = 6;

const NAMES = ['Иван', 'Николай', 'Михаил', 'Алексей', 'Владимир', 'Сергей', 'Артем'];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let commentId = 0;

const getRandom = (min = 0, max = 1) => {
  if (min < 0) {
    return false;
  }
  if (max <= min) {
    return min;
  }
  return Math.round((max - min) * Math.random() + min);
};

const checkStringLenght = (string = '', maxLenght = 0) => {
  return string.length <= maxLenght;
};

const getRandomArray = (array) => {
  return array[getRandom(0, array.length - 1)];
};

const createRandomComment = () => {
  const randomAvatarNumber = getRandom(1, AVATARS_COUNT);
  const commentAvatar = `img/avatar-${randomAvatarNumber}.svg`;
  const commentMessage = getRandomArray(MESSAGES);
  const commentName = getRandomArray(NAMES);
  return {
    id: commentId++,
    avatar: commentAvatar,
    message: commentMessage,
    name: commentName,
  };
};

const createComments = () => {
  const comments = [];
  do {
    const comment = createRandomComment();
    comments.push(comment);
  } while (getRandom());
  return comments;
};

const createPhotoData = (number) => {
  const url = `photos/${number}.jpg`;
  const description = `Фотография № ${number}`;
  const likes = getRandom(LIKES_MIN, LIKES_MAX);
  const comments = createComments();
  return {
    id: number,
    url: url,
    description: description,
    likes: likes,
    comments: comments,
  };
};

const createPhotoDataArray = (photosCount) => {
  let photos = [];
  for (let i = 1; i <= photosCount; i++) {
    const photoDescription = createPhotoData(i);
    photos.push(photoDescription);
  }
  return photos;
};

const maxStrLen = 5;
const isStringLessMaxLen = checkStringLenght('Hello', maxStrLen);
const photoArr = createPhotoDataArray(PHOTOS_COUNT);

/* eslint-disable no-console */
console.log(isStringLessMaxLen);
console.log(photoArr);
