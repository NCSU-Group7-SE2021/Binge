/**
 * Fetched OMDB API key from local storage
 * @returns OMDB API Key
 */
const getApiKeyFromStorage = async () => {
  return new Promise((resolve) => {
    api_key = null;
    chrome.storage.sync.get(
      LOCAL_STORAGE_API_KEY,
      (result) => (api_key = result ? result[LOCAL_STORAGE_API_KEY] : "631772a5")
    );
    resolve(api_key);
  });
};

/**
 * Fetched IMDB API key from local storage
 * @returns IMDB API Key
 */
const getImdbApiKeyFromStorage = async () => {
  return new Promise((resolve) => {
    api_key = null;
    chrome.storage.sync.get(
      LOCAL_STORAGE_IMDB_API_KEY,
      (result) => (api_key = result ? result[LOCAL_STORAGE_IMDB_API_KEY] : "k_0afyx7ti")
    );
    resolve(api_key);
  });
};

module.exports = { getApiKeyFromStorage, getImdbApiKeyFromStorage };
