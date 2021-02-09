import {getRandom} from './utils.js';

const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATARS_COUNT = 6;
const COMMENTS_MIN = 5;
const COMMENTS_MAX = 10;

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

const createPhotoDataArray = (photosCount) => {
  const photos = [];
  for (let i = 1; i <= photosCount; i++) {
    photos.push(createPhotoData(i));
  }
  return photos;
};

export {createPhotoDataArray};
