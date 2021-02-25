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
    .catch((e) => {
      onError(e);
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
    .catch((e) => {
      onError(e);
    })
}

export {getData, sendData};
