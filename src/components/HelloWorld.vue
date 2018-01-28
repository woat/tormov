<template>
  <div class="hello">
    <div>
      <input type="text" v-model='search' />
      <button @click="searchMovie">search</button><br>
    </div>
    <div class="movie">
      <div class="movie__card">
        <img class="movie__poster" :src="movie.poster" />
        <div class="movie__info">
          <h1 class="movie__title"> {{ movie.title }}</h1>
          <p class="movie__genres"> {{ movie.genres }} </p>
          <h3 class="movie__runtime"> {{ movie.runtime }}</h3>
          <p class="movie__actors"> {{ movie.actors }} </p>
          <p class="movie__plot"> {{ movie.plot }} </p>
          <p class="movie__director"> {{ movie.director }} </p>
          <ul class="movie__ratings">
            <li v-for="rating in movie.ratings">
              {{ rating.Source }}: {{ rating.Value }}
            </li>
          </ul>
          <a class="movie__link" v-if="torrenturl" :href="torrenturl">torrent</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import yts from '@/api/yts'
const imdb = require('imdb-api')

export default {
  name: 'HelloWorld',
  data () {
    return {
      movie: {},
      torrenturl: '',
      search: ''
    }
  },
  methods: {
    truncatePlot(plot) {
      return plot.split('.')[0]
    },
    async searchMovie() {
      try {
        await imdb.get(this.search, { apiKey: '3dea6a74', timeout: 30000 })
          .then(data => {
            this.movie = data
            this.movie.plot = this.truncateDesc(data.plot)
            console.log(this.movie.plot)
          })
        console.log(this.movie)
        const torrent = await yts.search(this.movie.imdbid)
        console.log(torrent)
        //const url = 'https://yts.am/api/v2/'
        //const torrent = await fetch(`${url}list_movies.json?query_term=${this.movie.imdbid}`)
        //  .then(data => data.json())
        this.torrenturl = torrent.data.data.movies[0].torrents[0].url
      } catch(err) {
        console.log(err)
      }
    }
  },
  created() {
    this.search = 'limitless'
    this.searchMovie()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie {
  padding: 0 50rem;
}

.movie__card {
  border: 1px solid dodgerblue;
  display: grid;
  grid-template-columns: repeat(auto-fill, 1fr);
  grid-template-areas: 
  "poster info"
}

.movie__info {
  display: grid;
  grid-area: info;
  padding: 0 10rem;
}

.movie__poster {
  grid-area: poster;
  width: auto;
  height: auto;
  align-self: center;
}

.movie__title {
}

.movie__genres {
}

.movie__runtime {
}

.movie__actors {
}

.movie__director {
}

.movie__plot {
}

.movie__ratings {
}

.movie__link {
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
