const getApiKeyFromStorage = async () => {
    return new Promise((resolve) => {
            api_key = null
            chrome.storage.sync.get(LOCAL_STORAGE_API_KEY, (result) =>
                api_key = result ? result[LOCAL_STORAGE_API_KEY] : '631772a5'
            );
            resolve(api_key)
        });
};

const getImdbApiKeyFromStorage = async () => {
    return new Promise((resolve) => {
        api_key = null
        chrome.storage.sync.get(LOCAL_STORAGE_IMDB_API_KEY, (result) =>
            api_key = result ? result[LOCAL_STORAGE_IMDB_API_KEY] : 'k_ke3annug'
        );
        resolve(api_key)
    });
};

module.exports = {getApiKeyFromStorage, getImdbApiKeyFromStorage}
