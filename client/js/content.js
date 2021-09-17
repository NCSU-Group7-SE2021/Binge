var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

var textbox = document.getElementsByClassName("episode")
for (var i = 0, l = textbox.length; i<l; i++){
    console.log(textbox[i])
    var imdbRatings = document.createElement('div')
    imdbRatings.innerHTML = "IMDB Ratings : 5.0"
    imdbRatings.style.width = '100%';
    imdbRatings.style.height = '100%';
    imdbRatings.style.border = '1px solid red';
    imdbRatings.style.float = 'left';

    var rottenTomatoRatings = document.createElement('div')
    rottenTomatoRatings.innerHTML = "Rotten Tomato Ratings : 4.0"
    rottenTomatoRatings.style.width = '100%';
    rottenTomatoRatings.style.height = '100%';
    rottenTomatoRatings.style.border = '1px solid red';
    rottenTomatoRatings.style.float = 'left';


    textbox[i].appendChild(rottenTomatoRatings)
    textbox[i].appendChild(imdbRatings)
}