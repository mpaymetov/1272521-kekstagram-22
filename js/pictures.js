const pictureContainer = document.querySelector('.pictures');
const pictureTemplateBlock = document.querySelector('#picture');
const pictureTemplate = pictureTemplateBlock.content.querySelector('a.picture');

const renderPicture = (photoData) => {
  let element = pictureTemplate.cloneNode(true);
  element.querySelector('.picture__img').src = photoData.url;
  element.querySelector('.picture__comments').innerText = photoData.comments.length;
  element.querySelector('.picture__likes').innerText = photoData.likes;
  return element;
};

const renderPictures = (photoArray) => {
  let fragment = document.createDocumentFragment();
  photoArray.forEach(element => fragment.appendChild(renderPicture(element)))
  pictureContainer.appendChild(fragment);
};

export {renderPictures};
