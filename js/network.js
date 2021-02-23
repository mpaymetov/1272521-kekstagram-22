const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }

      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then((pict) => {
      onSuccess(pict);
    })
    .catch(() => {
      onError('Не удалось выполнить загрузку данных.');
    })
}

const sendData = (url, formData, onSuccess, onError) => {
  fetch(url,{
    method: 'POST',
    body: formData,
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      } else {
        onError('Не удалось выполнить отправку формы. Попробуйте еще раз.');
      }

      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then(() => onSuccess())
    .catch(() => {
      onError('Не удалось выполнить отправку формы. Попробуйте еще раз.');
    })
}

export {getData, sendData};
