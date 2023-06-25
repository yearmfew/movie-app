import movieData from "./movieData.js"


async function getReviewsOfFilm(movieId) {
    const reviews = await movieData.getReviewsOfFilmById(movieId)
    return reviews
}

async function getDetailsOfFilm(movieId) {
    const details = await movieData.getDetailsOfFilmById(movieId)
    return details
}
async function getImagesOfFilm(movieId) {
    const images = await movieData.getImagesOfFilmById(movieId)
    return images
}

async function getSimilarFilms(movieId) {
    const similarFilms = await movieData.getSimilarFilmsById(movieId)
    return similarFilms
}

async function getMovieData(movieId) {
    const reviews = await getReviewsOfFilm(movieId)
    const details = await getDetailsOfFilm(movieId)
    const images = await getImagesOfFilm(movieId)

    const movieData = {
        reviews,
        details,
        images
    }
    return movieData
}



function generateStringFromArray(myArray) {
    let createdString = ""
    myArray.forEach(element => {
        createdString += " " + element.name + " |"
    });
    createdString = createdString.slice(0, -1);

    return createdString
}

/* SLIDER AND SUBELEMENTS GENERATION */
function generateSliderCaption(details) {

    let html = `
    <div class="carousel-caption d-none d-md-block">
        <h5>${details.original_title}</h5>
        <p>${details.release_date}</p>
    </div>
    `

    return html
}

async function generateSlider(movieData) {
    const caption = await generateSliderCaption(movieData.details)
    let images = await movieData.images.postersUrls.splice(0, 5)
    let html = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
    `
    // generate items
    let i = 0
    await images.forEach(async (image) => {

        let slideHtml = `<div class="carousel-item ${i == 0 ? "active" : ""}">`
        i++
        let imageHtml = await generateSlideImages(image)

        slideHtml += imageHtml + caption + "</div>"
        html += slideHtml
    })
    html += `
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
`
    return html

}
async function generateSlideImages(imagePath) {
    let html = `<img class="d-block w-100" src="http://image.tmdb.org/t/p/w500${imagePath}" alt="First slide">
    `
    return html
}
/* SLIDER AND SUBELEMENTS GENERATION */

async function generateMovieDetails(details) {
    let html = `<div class="movie-details-body">
    <h3 class="movie-title">${details.original_title}</h3>
    <div class="movie-info">
        <div><strong>Production Companies: </strong> ${generateStringFromArray(details.production_companies)}</div>
        <div><strong>Release Date: </strong> ${details.release_date}</div>
        <div><strong>Time: </strong> ${details.runtime}</div>
        <div><strong>Genres: </strong> ${generateStringFromArray(details.genres)}</div>
    </div>
    <p class="movie-overview">${details.overview}</p>
    </div>
    `

    return html;
}

async function generateReviews(reviews) {
    let html = ""
    reviews.forEach(review => {

        let reviewHtml = `
        <li class="list-group-item">
            <div class="avatar-box">
                <span class="avatar">
                    <img 
                        src="http://image.tmdb.org/t/p/w500${review.author_details.avatar_path}" 
                        onerror="this.src = 'https://placekeanu.com/300/300'"
                        alt="profil-picture"
                    >
                </span>
                <span class="avatar-name">${review.author}</span>
            </div>
                <span class="comment">${review.content}</span>
        </li>
    `
        html += reviewHtml
    });

    return html
}

async function createMovieDetails(movieData) {
    // TODO: create starts

    // generate slider 
    const slider = await generateSlider(movieData)
    // create slider on dom element with id movie-slider
    let movieSlider = document.getElementById("movie-slider")
    movieSlider.innerHTML = slider

    // generate details
    let movieDetailsHtml = await generateMovieDetails(movieData.details)
    const movieDetail = document.getElementById("movie-details-body")
    movieDetail.innerHTML = movieDetailsHtml


}

async function createReviews(movieData) {
    const reviews = document.querySelector("#reviews #list-group")
    const reviewsHtml = await generateReviews(movieData.reviews)
    reviews.innerHTML = reviewsHtml
}

async function generateSimilarFilms(movieData) {
    const films = await getSimilarFilms(movieData.details.id)
    const similarFilms = document.querySelector("#similar-movies .film-cards")
    let html = `
    <div class="text-right">
    <a class="btn btn-primary mb-3 mr-1" href="#carouselExampleIndicators2" role="button" data-slide="prev">
        Previous
    </a>
    <a class="btn btn-primary mb-3 " href="#carouselExampleIndicators2" role="button" data-slide="next">
        Next
    </a>
    </div>
    <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">

    `
    let i = 0
    films.forEach(film => {
        let filmHtml = `
        ${i % 5 == 0 ? `<div class="carousel-item ${i == 0 ? 'active' : ''}"><div class="row">` : ''}

        <div class="card">
            <img src="http://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${film.original_title}</h5>
            </div>
        </div>
        ${i % 5 == 4 ? '</div></div>' : ''}
        

        `
        html += filmHtml
        i++
    })

    html += "</div></div>"
    similarFilms.innerHTML = html

}

async function createSimilarFilms(movieData) {
    generateSimilarFilms(movieData)
}

function createComponentsForMovieDetailsPage(movieData) {
    createMovieDetails(movieData)
    createReviews(movieData)
    createSimilarFilms(movieData)
}


async function getIdFromUrl() {
    const url = new URL(window.location.href)
    const movieId = url.searchParams.get("movieId")
    return movieId
}

async function startPage() {
    const movieId = await getIdFromUrl()
    const movieData = await getMovieData(movieId)
    createComponentsForMovieDetailsPage(movieData)
}

startPage()


// export default { openDetailPage }