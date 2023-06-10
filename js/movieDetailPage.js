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
        createdString += element.name + "|"
    });
    createdString = createdString.slice(0, -1);

    return createdString
}

/* SLIDER AND SUBELEMENTS GENERATION */
function generateSliderCaption(details) {

    const productionCompanies = generateStringFromArray(details.production_companies)

    let html = `
    <div class="carousel-caption d-none d-md-block">
    <h5>${details.original_title}</h5>
    <div class="stars">
        <i class="fa-sharp fa-solid fa-star fa-2xl" style="color: #e1f00a;"></i>
        <i class="fa-sharp fa-solid fa-star fa-2xl" style="color: #e1f00a;"></i>
        <i class="fa-sharp fa-solid fa-star fa-2xl" style="color: #e1f00a;"></i>
        <i class="fa-sharp fa-solid fa-star fa-2xl" style="color: #e1f00a;"></i>
        <i class="fa-sharp fa-solid fa-star fa-2xl fa-star-half-stroke"
            style="color: #e1f00a;"></i>
    </div>
    <p>${details.original_language}</p>
    <p>${productionCompanies}</p>
    <p>${details.release_date}</p>
    <p>${details.runtime} min</p> 
    </div>
    `

    return html
}

async function generateSlider(movieData) {
    const caption = await generateSliderCaption(movieData.details)
    console.log(movieData.images)
    let images = await movieData.images.postersUrls.splice(0, 5)
    let html = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
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



async function createMovieDetails(movieData) {
    // get starts

    // generate slider 
    const slider = await generateSlider(movieData)
    // create slider on dom element with id movie-slider
    let movieSlider = document.getElementById("movie-slider")
    movieSlider.innerHTML = slider

    // generate details



}

function createComponentsForMovieDetailsPage(movieData) {
    createMovieDetails(movieData)
}


async function getIdFromUrl() {
    console.log(window)
    const url = new URL(window.location.href)
    console.log(url)
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