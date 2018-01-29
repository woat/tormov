import axios from 'axios'

const yts = axios.create({
  baseURL: 'https://yts.am/api/v2'
})

function search(id) {
  return yts.get(`/list_movies.json?query_term=${id}`)
}

function searchByGenre(genre) {
  return yts.get(`/list_movies.json?genre=${genre}`)
}

// optimization (?)
function* number() {
  let page = 0
  while (true) {
    yield ++page
  }
}

const page = number()

function list() {
  return yts.get(`/list_movies.json?limit=30&page=${page.next().value}`)
}

export default {
  search,
  searchByGenre,
  list
}
