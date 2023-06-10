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
        if (!response.ok) throw new Error("HTTP ERROR " + response.status)
        const data = await response.json()
        return data.results
    } catch (error) {
        console.error(error)
    }
}


async function getPopularFilms() {
    let data = await fetchData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1")
    return data
}

async function getReviewsOfFilmById(id) {
    let data = await fetchData(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`)
    return data
}

async function getDetailsOfFilmById(id) {

}


export default {
    getPopularFilms: getPopularFilms,
    getReviewsOfFilmById: getReviewsOfFilmById
}