import movieData from "./movieData.js";


async function createPopularMovies() {
    const films = await movieData.getPopularFilms()
    const popularMoviesDiv = document.getElementById("popularMovies")

    let html = `<div class="cards">`

    films.forEach(film => {
        let filmHTML = `
            <div class="card filmCard" id=${film.id}>
                <img src="http://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${film.title}</h5>
                    <p class="card-text">${film.overview}</p>
                </div>
            </div>
        `
        html += filmHTML

    });

    html += "</div>"

    popularMoviesDiv.innerHTML = html
    addEventListenerForCard(films)

}


async function getReviewsOfFilm(id) {
    const reviews = await movieData.getReviewsOfFilmById(id)
    return reviews
}

async function getDetailsOfFilm(id) {

}

function openDetailPage(id) {
    // TODO Open new page..
    getReviewsOfFilm(id)
    getDetailsOfFilm(id)
}


function addEventListenerForCard(films) {
    // TODO add reviews to movie... 
    // add a detailed info about movie
    // more pics or so 

    const filmCards = document.querySelectorAll(".filmCard")

    filmCards.forEach(filmCard => {
        filmCard.addEventListener("click", () => { openDetailPage(filmCard.id) })
    })


}






createPopularMovies()