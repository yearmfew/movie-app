import movieData from "./movieData.js";
// import movieDetailPage from "./movieDetailPage.js"


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
}




function openDetailPage(movieId) {
    // TODO Open new page..
    // bunu burda acik acik yapalim. Ayti metod kullnma. 
    // movieDetailPage.openDetailPage(movieId)
    location.href = `../movieDetails.html?movieId=${movieId}`


}


function addEventListenerForCard() {

    const filmCards = document.querySelectorAll(".filmCard")
    filmCards.forEach(filmCard => {
        console.log(filmCard)
        filmCard.addEventListener("click", () => { openDetailPage(filmCard.id) })
    })
}



async function startPage() {

    await createPopularMovies()
    addEventListenerForCard()

}

startPage()

