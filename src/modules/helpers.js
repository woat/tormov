function generatePromises(list, api, method, page) {
  return list.map(e => api[method](e, page))
}

function flattenMovies(list) {
  const flat = []
  // list = [[...], [...], [...]]
  list.forEach(listItem => {
    // listItem = [...]
    listItem.forEach(item => {
      // check for duplicates before pushing
      if (!flat.some(duplicate => duplicate.id === item.id)) {
        flat.push(item)
      }
    })
  })
  return flat
}

function filterMovies(list, genresList) {
  return list.filter(e => {
    let count = 0
    return e.genres.some(genre => {
      genresList.forEach(filtered => {
        if (filtered === genre) count += 1
      })
      return count === genresList.length
    })
  })
}

// put the api call into movies
async function getAtLeast(num, movies) {
  while (movies.length < num) {
    const more = await api()
    more.forEach(movie => movies.push(movie))
  }
}

async function getMoviesByGenre(genres, api, method, page) {
  const promises = generatePromises(genres, api, method, page)
  const data = await Promise.all(promises)
  const moviesArray = data.map(e => e.data.data.movies)
  const dirtyMovies = flattenMovies(moviesArray)
  const cleanMovies = filterMovies(dirtyMovies, genres)
  return cleanMovies
}

function* number() {
  let page = 0
  while (true) {
    yield ++page
  }
}

module.exports = {
  number,
  getMoviesByGenre,
  getAtLeast
}
