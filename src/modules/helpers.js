function generatePromises(list, api, method ) {
  return list.map(e => api[method](e) )
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

async function getMoviesByGenre(genres, api, method) {
  const promises = generatePromises(genres, api, method)
  const data = await Promise.all(promises)
  const moviesArray = data.map(e => e.data.data.movies)
  const dirtyMovies = flattenMovies(moviesArray)
  const cleanMovies = filterMovies(dirtyMovies, genres)
  return cleanMovies
}

// const payload = {
//   genre,
//   async cb(that, api) {
//     that.loading = true;
//     that.resetList()

//     if (genre.split(' ').length > 1) {
//       const genresList = genre.split(' ')
//       h.getMoviesbyGenre(that, moviesList, genreList, api, searchByGenre )
//       return that.loading = false
//     }

//     const { data: { data: { movies } } } = await api.searchByGenre(genre)
//     that.loading = false
//     that.movieList = movies
//   }
// }

module.exports = {
  getMoviesByGenre
}
