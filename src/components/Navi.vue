<template>
  <div class="navi">
    <ul>
      <li @click="dropdown" class="navi__item navi__item--genres">Genres<i class="fas fa-chevron-down" data-fa-transform="down-2"></i></li>
      <ul class="navi__dropdown">
        <li @click="clearSelections" class="navi__item navi__item--cs">Clear Selections</li>  
        <div v-for="genre in genres">
          <input class="navi__checkbox" type="checkbox" :value="genre" :id="genre" v-model="filterGenres">
          <label :for="genre" @click="activeGenre" class="navi__item navi__item--label">{{ genre }}</label>  
          <!-- <li @click="activeGenre" v-for="genre in genres" class="navi__item">{{ genre }}</li> -->
        </div>
      </ul>
      <li @click="activeView" class="navi__item navi__item--active">New Releases</li>
      <li @click="activeView" class="navi__item">Trending</li>
      <li @click="activeView" class="navi__item">Coming Soon</li>
      <li @click="activeView" class="navi__item">Favorites</li>
      <li @click="activeView" class="navi__item">Watch Later</li>
    </ul>
  </div>
</template>

<script>
import h from '@/modules/helpers'

export default {
  name: 'Navi',
  data() {
    return {
      filterGenres: [],
      genres: [
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Music',
        'Musical',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Sport',
        'Superhero',
        'Thriller',
        'War',
        'Western'
      ]
    }
  },
  methods: {
    removeActives(e) {
      return [...e.target.parentNode.childNodes]
        .filter(node => node.nodeName !== '#text')
        .forEach(node => node.classList.remove('navi__item--active'))
    },
    active(e) {
      if (e.target.classList.contains('navi__item--active')) return e.target.classList.toggle('navi__item--active')
      this.removeActives(e)
      e.target.classList.toggle('navi__item--active')
    },
    setQuery(e) {
      const params = e.target.innerHTML
      this.$router.push({ query: { view: params } })
    },
    setGenre(params) {
      this.$router.push({ query: { genre: params } })
    },
    activeView(e) {
      this.active(e)
      this.setQuery(e)
    },
    activeGenre(e) {
      // This is needed for when you click the same genre
      this.active(e)
    },
    clearSelections(e) {
      this.filterGenres = []

      // Remove Actives
      ;[...e.target.parentNode.childNodes]
        .filter(node => node.nodeName === 'DIV')
        .map(node => node.childNodes[2])
        .forEach(node => node.classList.remove('navi__item--active'))
      
      // TODO Clear query
      this.$router.replace('/')
    },
    dropdown(e) {
      this.active(e)
      document.querySelector('.navi__dropdown').classList.toggle('navi__dropdown--active')
    }
  },
  watch: {
    filterGenres() {
      this.setGenre(this.filterGenres.join(' '))
    },
    '$route'({ query: { view, genre } }) {
      const vm = this;
      const views = {
        'New Releases'() {
          const payload = {
            headline: view,
            async cb(that, api) {
              that.resetList()
              const { data: { data: { movies } } } = await api.list()
              that.movieList = movies
            }
          }
          vm.$emit('view', payload)
        },
        'Trending'() {
          console.log('owo')
        },
        'Coming Soon'() {
          console.log('owo')
        },
        'Favorites'() {
          console.log('owo')
        },
        'Watch Later'() {
          console.log('owo')
        }
      }
      if (view) return views[view]()

      if (genre) {
        const payload = {
          genre,
          async cb(that, api) {
            that.loading = true;
            that.resetList()


            if (genre.split(' ').length > 1) {
              const genresList = genre.split(' ')
              const movies = await h.getMoviesByGenre(genresList, api, 'searchByGenre')
              that.movieList = movies
              return that.loading = false
            }

            const { data: { data: { movies } } } = await api.searchByGenre(genre)
            that.loading = false
            that.movieList = movies
          }
        }
        this.$emit('genre', payload)
      }
    }
  },
}
</script>

<style scoped>
.navi {
  background: rgb(var(--grey));
}

.navi__item:first-child {
  margin-top: 5rem;
}

.navi__item {
  list-style: none;
  padding: 1rem 3rem;
  transition: all .3s ease;
  text-align: start;
  font-weight: 400;
  color: rgb(var(--white));
  cursor: pointer;
}

.navi__item:hover {
  background-color: rgb(var(--white));
  color: rgb(var(--grey));
}

.navi__item--active {
  background-color: rgb(var(--white));
  color: rgb(var(--grey));
}

.navi__item--genres {
  display: flex;
  justify-content: space-between;
}

.navi__item--cs {
  margin-top: 0 !important;
}

.navi__item--cs:hover {
  background-color: rgb(var(--blue));
}

.fa-chevron-down {
  transition: all .2s;
}

.navi__item--active.navi__item--genres > .fa-chevron-down  {
  transform: rotate(-90deg);
}

.navi__dropdown {
  display: none;

  transform: translateX(-20rem);
  opacity: 0;
  transition: all 0.2s;
}

.navi__dropdown > div > input {
  display: none;
}

.navi__dropdown > div > label {
  display: block;
}

.navi__dropdown > div > * {
  margin-top: 0 !important;
  padding: 1rem 6rem;
}

.navi__dropdown > div > *:hover {
  color: rgb(var(--white));
  background-color: rgb(var(--pink));
}

.navi__dropdown > div > .navi__item--active {
  color: rgb(var(--white));
  background-color: rgb(var(--pink));
  position: relative;
}

.navi__dropdown > div > .navi__item--active:before {
  position: absolute;
  display: inline-block;
  top: 0;
  left: -5px;
  content: '';
  width: 1rem;
  height: 100%;
  color: rgb(var(--white));
  background-color: rgb(var(--blue));
}

.navi__dropdown--active {
  display: block;

  transform: translateX(0);
  opacity: 1;
}

/*

Add arrow later?

.navi__item:hover::after {
content: '\27a1';
text-align: right;
float: right;
}

.navi__item--active::after {
content: '\27a1';
text-align: right;
float: right;
}

 */
</style>
