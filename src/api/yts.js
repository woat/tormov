import axios from 'axios'

const yts = axios.create({
  baseURL: 'https://yts.am/api/v2'
})

function search(id) {
  return yts.get(`/list_movies.json?query_term=${id}`)
}

function list() {
  return yts.get('/list_movies.json')
}

export default {
  search,
  list
}
