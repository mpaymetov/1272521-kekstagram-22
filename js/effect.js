import {
  CONTROL_MAX_VALUE,
  CONTROL_MIN_VALUE,
  CONTROL_STEP,
  CONTROL_DEFAULT_VALUE,
  EFFECT_CLASS_START
} from './settings.js';
import {getIntValue} from './utils.js';

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmallerButton = document.querySelector('.scale__control--smaller');
const scaleControlBiggerButton = document.querySelector('.scale__control--bigger');

const uploadForm = document.querySelector('.img-upload__form');
const effectLevelBar = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const hideClass = 'hidden';
let imageEffect = 'none';
let imageScaleStyle = '';
let imageEffectStyle = '';

const EffectSliderSettings = {
  'CHROME': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'SEPIA': {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  'MARVIN': {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  'PHOBOS': {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  'HEAT': {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
}
const ImageEffectStyles = {
  'CHROME': 'grayscale',
  'SEPIA': 'sepia',
  'MARVIN': 'invert',
  'PHOBOS': 'blur',
  'HEAT': 'brightness',
};

const updateStyles = (element, style) => {
  element.style = style;
};

const setPreviewScale = (element, percent) => {
  const scaleValue = percent / 100;
  scaleControlValue.value = percent + '%';
  imageScaleStyle = `transform: scale(${scaleValue});`;
  updateStyles(element, imageScaleStyle + imageEffectStyle);
};

const setPreviewDefaultScale = () => {
  setPreviewScale(imagePreview, CONTROL_DEFAULT_VALUE);
};

const scaleUp = () => {
  let number = getIntValue(scaleControlValue);
  if ((number + CONTROL_STEP) <= CONTROL_MAX_VALUE) {
    number += CONTROL_STEP;
    setPreviewScale(imagePreview, number);
  }
};

const scaleDown = () => {
  let number = getIntValue(scaleControlValue);
  if ((number - CONTROL_STEP) >= CONTROL_MIN_VALUE) {
    number -= CONTROL_STEP;
    setPreviewScale(imagePreview, number);
  }
};

const clearEffect = () => {
  removeEffectClasses();
  effectLevelBar.classList.add(hideClass);
  imageEffectStyle = '';
  updateStyles(imagePreview, imageScaleStyle + imageEffectStyle);
};

const setOriginalEffect = () => {
  const originalEffectButton = document.querySelector('#effect-none');
  originalEffectButton.checked = true;
  clearEffect();
};

const getEffectList = () => {
  let effectsList = [];
  const effectButtons = document.querySelectorAll('.effects__radio');
  effectButtons.forEach(button => effectsList.push(button.value))
  return effectsList;
};

const removeEffectClasses = () => {
  const effectsList = getEffectList();
  effectsList.forEach((effect) => {
    const effectClassName = EFFECT_CLASS_START + effect;
    if (imagePreview.classList.contains(effectClassName)) {
      imagePreview.classList.remove(effectClassName);
    }
  });
};

const onEffectsChange = (evt) => {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    removeEffectClasses();
    imageEffect = evt.target.value;
    if (imageEffect !== 'none') {
      const effectClass = EFFECT_CLASS_START + imageEffect;
      updateEffectSlider(imageEffect);
      imagePreview.classList.add(effectClass);
      if (effectLevelBar.classList.contains(hideClass)) {
        effectLevelBar.classList.remove(hideClass);
      }
    } else {
      clearEffect();
    }
  }
};

const setImageEffectStyle = () => {
  let effectValueName = '';
  if (imageEffect === 'marvin') {
    effectValueName = '%';
  } else if (imageEffect === 'phobos') {
    effectValueName = 'px';
  }
  imageEffectStyle = `filter: ${ImageEffectStyles[imageEffect.toUpperCase()]}(${effectLevelValue.value}${effectValueName});`;
  updateStyles(imagePreview, imageScaleStyle + imageEffectStyle);
};

const createEffectSlider = () => {
  /*global noUiSlider*/
  /*eslint no-undef: "error"*/
  noUiSlider.create(effectLevelBar, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectLevelBar.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    setImageEffectStyle();
  });
};

const updateEffectSlider = (imageEffect) => {
  effectLevelBar.noUiSlider.updateOptions(EffectSliderSettings[imageEffect.toUpperCase()]);
};

const closeEffectSlider = () => {
  effectLevelBar.noUiSlider.destroy();
};

export {
  scaleControlSmallerButton,
  scaleControlBiggerButton,
  uploadForm,
  scaleDown,
  scaleUp,
  setPreviewDefaultScale,
  setOriginalEffect,
  onEffectsChange,
  clearEffect,
  createEffectSlider,
  closeEffectSlider
};
