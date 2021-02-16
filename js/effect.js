import {CONTROL_MAX_VALUE, CONTROL_MIN_VALUE, CONTROL_STEP, CONTROL_DEFAULT_VALUE} from './settings.js';
import {getIntValue} from './utils.js';

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');

const setPreviewScale = (element, percent) => {
  const scaleValue = percent / 100;
  scaleControlValue.value = percent + '%';
  element.style = `transform: scale(${scaleValue})`;
};

const setPreviewDefaultScale = () => {
  setPreviewScale(imagePreview, CONTROL_DEFAULT_VALUE);
};

const valueUp = () => {
  let number = getIntValue(scaleControlValue);
  if ((number + CONTROL_STEP) <= CONTROL_MAX_VALUE) {
    number += CONTROL_STEP;
    setPreviewScale(imagePreview, number);
  }
};

const valueDown = () => {
  let number = getIntValue(scaleControlValue);
  if ((number - CONTROL_STEP) >= CONTROL_MIN_VALUE) {
    number -= CONTROL_STEP;
    setPreviewScale(imagePreview, number);
  }
};

export {scaleControlSmallerButton, scaleControlBiggerButton, valueDown, valueUp, setPreviewDefaultScale};
