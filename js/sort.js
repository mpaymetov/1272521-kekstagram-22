/* global _:readonly */

import {RANDOM_SORT_PHOTO_COUNT, SORT_THROTTLE_TIME} from './settings.js';
import {getRandom} from './utils.js';
import {getPhotosData} from './data.js';
import {renderPictures} from './gallery.js';

const sortHideClass = 'img-filters--inactive';
const pictureSortBlock = document.querySelector('.img-filters');
const buttonDefaultSort = document.querySelector('#filter-default');
const buttonRandomSort = document.querySelector('#filter-random');
const buttonDiscussedSort = document.querySelector('#filter-discussed');
const filtersButtonActiveClass = 'img-filters__button--active';

const commentSort = (a, b) => {
  return a.comments.length < b.comments.length;
};

const shuffleSort = () => {
  return getRandom();
};

const sortBy = (data, sortFunction) => {
  let sortedData = data.slice();
  sortedData.sort(sortFunction);
  return sortedData;
};

const clearFilterButtonsActiveClass = () => {
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterButtons.forEach((button) => {
    if (button.classList.contains(filtersButtonActiveClass)) {
      button.classList.remove(filtersButtonActiveClass);
    }
  });
};

const onDefaultSortClick = () => {
  const photoData = getPhotosData();
  clearFilterButtonsActiveClass();
  buttonDefaultSort.classList.add(filtersButtonActiveClass);
  renderPictures(photoData);
};

const onRandomSortClick = () => {
  const photoData = getPhotosData();
  const randomSortedData = sortBy(photoData, shuffleSort);
  const slicedData = randomSortedData.slice(0, RANDOM_SORT_PHOTO_COUNT);
  clearFilterButtonsActiveClass();
  buttonRandomSort.classList.add(filtersButtonActiveClass);
  renderPictures(slicedData);
};

const onDiscussedSortClick = () => {
  const photoData = getPhotosData();
  const discussSortedData = sortBy(photoData, commentSort);
  clearFilterButtonsActiveClass();
  buttonDiscussedSort.classList.add(filtersButtonActiveClass);
  renderPictures(discussSortedData);
};

const throttleOnDefaultSortClick = _.throttle(onDefaultSortClick, SORT_THROTTLE_TIME);
const throttleOnRandomSortClick = _.throttle(onRandomSortClick, SORT_THROTTLE_TIME);
const throttleOnDiscussedSortClick = _.throttle(onDiscussedSortClick, SORT_THROTTLE_TIME);

const showSortButtons = () => {
  pictureSortBlock.classList.remove(sortHideClass);
  buttonDefaultSort.addEventListener('click', throttleOnDefaultSortClick);
  buttonRandomSort.addEventListener('click', throttleOnRandomSortClick);
  buttonDiscussedSort.addEventListener('click', throttleOnDiscussedSortClick);
};

export {showSortButtons};
