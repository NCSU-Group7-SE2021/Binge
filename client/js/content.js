const RATINGS = 'ratings';

function getTitleFromCard(elem) {
    const title = elem.firstElementChild.innerText;
    return title || '';
}

const getRatings = async (title) => {
    const ratingsInLocalStorage = getRatingsFromLocalStorage(title);

    if (ratingsInLocalStorage) {
        return ratingsInLocalStorage;
    }

    const titleRatings = await fetchRatings(title);
    storeRatingsInLocalStorage(title, titleRatings);
    return titleRatings;
};

function storeRatingsInLocalStorage(title, ratings) {
    if (title && ratings) {
        let ratingsInStorage = JSON.parse(localStorage.getItem(RATINGS));
        if (!ratingsInStorage) {
            ratingsInStorage = {};
        }
        ratingsInStorage[title] = ratings;
        localStorage.setItem(RATINGS, JSON.stringify(ratingsInStorage));
    }
}

function getRatingsFromLocalStorage(title) {
    const ratingsInLocalStorage = JSON.parse(localStorage.getItem(RATINGS));
    const titleRatings = ratingsInLocalStorage && ratingsInLocalStorage[title];
    return titleRatings;
}

const getRatingDivElement = (title, rating) => {
    const div = document.createElement('div');
    div.innerHTML = `${title} rating: ${rating}`;
    return div;
};

const getInnerHTML = (imdbRating, rottenTomatoRating) => {
    const innerHTML = `
    <div>
    <p>
    <span style = "box-sizing: border-box;
    display: inline-block;
    background-color: #E50914;
    color: #ffffff;
    border-radius: 3rem;
    text-align: center;
    font-size: 120%;
    font-weight: 400;
    padding: 0.05rem 0.8rem 0.1rem;
    line-height: inherit;
    float: left">
    IMDB - ${imdbRating} </span>
    
    <span style = "box-sizing: border-box;
    background-color: #E50914;
    color: #ffffff;
    border-radius: 3rem;
    text-align: center;
    font-size: 120%;
    font-weight: 400;
    padding: 0.05rem 0.8rem 0.1rem;
    float: right;
    line-height: inherit;"> RT - ${rottenTomatoRating} </span>
    </p>
    `;

    return innerHTML;
};

const addRatingsToTile = async (movieTileElement) => {
    const videoTitle = getTitleFromCard(movieTileElement);
    const tileParent = document.querySelector(
        '.previewModal--metadatAndControls-container'
    );
    const ratings = await getRatings(videoTitle);

    if (!movieTileElement.hasAttribute('ratings')) {
        movieTileElement.insertAdjacentHTML(
            'afterend',
            getInnerHTML(ratings.imdbRating, ratings.rottenTomato)
        );
        movieTileElement.setAttribute('ratings', ratings);
    }

    if (tileParent) {
        tileParent.appendChild(getRatingDivElement('IMDB', ratings.imdbRating));
        tileParent.appendChild(getRatingDivElement('Rotten Tomato', ratings.rottenTomato)
        );
    }
};

const induceDelay = (elem, callback) => {
    elem.onmouseover = () => {
        setTimeout(() => callback(elem), 500);
    };
};

const observeChangesInDom = async () => {
    const netflixAllTitles = document.querySelectorAll('[id^="title-"]');
    getTitleAndDateFromModal()
    for (title of netflixAllTitles) {
        const elem = title.firstChild;
        induceDelay(elem, addRatingsToTile);
    }
    setTimeout(observeChangesInDom, 500);
};

observeChangesInDom();
