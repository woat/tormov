<template>
  <div class="movie" v-if="display">
    <div class="movie__card">
      <img class="movie__poster" :src="movie.poster" />
      <div class="movie__sub">
        <h3>{{ movie.title }}</h3>
        <h4>{{ movie.genres }}</h4>
      </div>

      <div class="movie__info" v-if=false>
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
</template>

<script>
import yts from '@/api/yts'
const imdb = require('imdb-api')

export default {
  name: 'Movie',
  props: ['search'],
  data () {
    return {
      movie: {},
      torrenturl: '',
      display: true
    }
  },
  methods: {
    async searchMovie() {
      try {
        await imdb.get(this.search, {apiKey: '3dea6a74', timeout: 30000})
          .then(data => {
            this.movie = data
          })
        const torrent = await yts.search(this.movie.imdbid)
        this.torrenturl = torrent.data.data.movies[0].torrents[0].url
      } catch(err) {
        this.display = false
        console.log(err)
      }
    }
  },
  created() {
    this.searchMovie()
  }
}
</script>

<style scoped>
.movie {
}

.movie__card {
  display: grid;
}

.movie__info {
  display: grid;
  padding: 0 3rem;
}

.movie__poster {
  min-width: 22rem;
  max-height: 30rem;
  box-shadow: 0 1rem 3rem rgba(var(--grey), .6);
  transition: all 0.3s;
}

.movie__poster:hover {
}

.movie__sub {
  display: grid;
  justify-items: start;
  margin-top: 2rem;
}

.movie__sub > h3 {
  width: 22rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
