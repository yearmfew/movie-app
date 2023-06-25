//Modal Database request 

async function fetchPopularFilms() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTIxOTY3M2RjY2IwYjJhMjdiYjg4MmFhMmQ1MzQ2MSIsInN1YiI6IjY0ODM5YTNmYmYzMWYyNTA1NGI1M2MxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ykXiwy9JJ6iL1YYFB0subyNpNj8byiRMs1oc5jyupxI'
        }
    };

    const result = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)

    return result.json()
}




// View

async function fillTestDiv() {
    const result = await fetchPopularFilms()

    const films = result.results


    const test = document.getElementById("test")

    let html = '<div class="test">'

    films.forEach(film => {

        html += `<div>${film.original_title}</div>`
    });

    html += "</div>"
    test.innerHTML = html
}


function main() {

    fillTestDiv()
}

main()