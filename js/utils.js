const getRandom = (min = 0, max = 1) => {
  if (min < 0) {
    return false;
  }
  if (max <= min) {
    return min;
  }
  return Math.round((max - min) * Math.random() + min);
};

const checkStringLength = (string = '', maxLength = 0) => {
  return string.length <= maxLength;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const getIntValue = (element) => {
  const valueString = element.value;
  return window.parseInt(valueString);
};

export {getRandom, checkStringLength, isEscEvent, isEnterEvent, getIntValue};
