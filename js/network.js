const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
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
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then(() => onSuccess())
    .catch(() => {
      onError();
    })
}

export {getData, sendData};
