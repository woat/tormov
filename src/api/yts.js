import axios from 'axios'

const yts = axios.create({
  baseURL: 'https://yts.am/api/v2'
})

function* number() {
  let page = 0
  while (true) {
    yield ++page
  }
}

function search(id) {
  return yts.get(`/list_movies.json?query_term=${id}`)
}

function searchByGenre(genre, page) {
  return yts.get(`/list_movies.json?genre=${genre}&page=${page}`)
}


const listPage = number()

function list() {
  return yts.get(`/list_movies.json?limit=30&page=${listPage.next().value}`)
}

export default {
  search,
  searchByGenre,
  list
}
