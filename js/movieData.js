import apiKey from "./config.js";

class Options {
    constructor(method) {
        this.method = method
    }

    getOptions() {
        return {
            method: this.method,
            headers: {
                accept: 'application/json',
                Authorization: apiKey
            }
        };
    }
}

async function fetchData(link) {
    const options = new Options("GET").getOptions()
    try {
        const response = await fetch(link, options)
        if (!response.ok) throw new Error("HTTP ERROR: " + response.status)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}


async function getPopularFilms() {
    const data = await fetchData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
    return data.results
}

async function getReviewsOfFilmById(movieId) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`)
    return data.results
}

async function getDetailsOfFilmById(movieId) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
    return data
}

async function getImagesOfFilmById(movieId) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/images`)

    const images = {
        logoUrl: data.logos[0].file_path,
        postersUrls: data.posters.slice(0, 10).map(poster => poster.file_path),
        backdropsUrls: data.backdrops.slice(0, 10).map(backdrop => backdrop.file_path)
    }


    return images
}

async function getSimilarFilmsById(movieId) {
    const data = await fetchData(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`)
    return data.results
}

export default {
    getPopularFilms,
    getReviewsOfFilmById,
    getDetailsOfFilmById,
    getImagesOfFilmById,
    getSimilarFilmsById
}