const getDocumentationFromApi = () => new Promise((resolve, reject) => {
  const docsUrl = "https://developer.spotify.com/documentation/web-api/reference-beta/v0.json";
  const localStorageKey = "docsContent";
  
  const localStorageEntry = localStorage.getItem(localStorageKey);
  if (localStorageEntry) {
    return resolve(JSON.parse(localStorageEntry));
  }
  
  fetch(docsUrl).then(res => res.json()).then(res => res.reference).then(reference => {
    localStorage.setItem(localStorageKey, JSON.stringify(reference));
    resolve(reference);
  }).catch(reject);
});

export {
  getDocumentationFromApi
};