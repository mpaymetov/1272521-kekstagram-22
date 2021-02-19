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

export {getRandom, checkStringLenght, isEscEvent, isEnterEvent, getIntValue};
