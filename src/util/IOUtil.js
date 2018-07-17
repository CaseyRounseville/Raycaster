export const readFileFromNetwork = (url) => {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  return xhr.responseText;
};