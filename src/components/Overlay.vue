<template>
  <div class="overlay" :class="{ open: active }">
    <div class="overlay__card">
      <div class="movie__info">
        <a class="movie__close" @click="close">&times;</a>
        <h1 class="movie__title"> {{ movie.title }} <span class="movie__year">({{ movie.year }})</span></h1>
        <p class="movie__genres"> {{ movie.genres }} </p>
        <h3 class="movie__runtime"> {{ movie.runtime }}</h3>
        <p class="movie__plot"> {{ movie.plot }} </p>
        <p class="movie__director"> Director: <span class="movie__link">{{ movie.director }}</span></p>
        <p class="movie__actors"> Actors: <span class="movie__link">{{ movie.actors }} </span></p>
        <ul class="movie__ratings">
          <li v-for="rating in movie.ratings">
            {{ rating.Source }}: <span class="movie__link">{{ rating.Value }}</span>
          </li>
        </ul>
        <div class="movie__buttons">
          <a v-if="movie.torrenturl" :href="movie.torrenturl">
            <button class="btn btn--blue">
              Download (YIFY)
            </button>
          </a>
          <a v-if="movie.yt":href="movie.yt">
            <button class="btn btn--blue">Watch Trailer</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  props: ['movie', 'active'],
  data() {
    return {
    }
  },
  watch: {
    movie() {
    }
  },
  methods: {
    close() {
      this.$emit('active', false)
    }
  },
}
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.5);
  display: none;
  z-index: 1000; 
  height: calc(100vh - 5rem);
  width: calc(100vw - 25rem);
  position: fixed;
  display: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: 
  ". .    ."
  ". card ."
  ". .    .";
  justify-content: center;
  align-items: center;
}

.overlay.open {
  display: grid;
  align-items: center;
  justify-items: center;
}

.overlay__card {
  padding: 2rem;
  border-radius: 3px;
  grid-area: card;
  height: auto;
  width: 70rem;
  background: rgba(var(--grey), .97);
  color: rgb(var(--white));
}

.movie__info {
  display: grid;
  position: relative;
  justify-items: start;
  grid-gap: 1rem;
}

.movie__year {
  font-size: 2rem;
}

.movie__title {
  padding-right: 1rem;
}

.movie__genres {
  color: rgb(var(--blue));
}

.movie__runtime {
}

.movie__actors {
}

.movie__director {
}

.movie__plot {
  font-weight: 200;
}

.movie__ratings {
}

.movie__link {
  color: rgb(var(--blue));
}

.movie__buttons {
  display: flex;
}

.movie__buttons > *:not(:first-child) {
  margin-left: 1rem;
}

.btn {
  font-size: 1.5rem;
  padding: 1rem 2.5rem;
}

.movie__close {
  position: absolute;
  top: -1.5rem;
  right: 0;
  color: rgb(var(--blue));
  font-size: 4rem;
  transition: all 0.3s;
}

.movie__close:hover {
  color: rgb(var(--red));
  cursor: pointer;
}

h1, h2 {
  font-weight: normal;
  font-size: 2.5rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0;
}
a {
  color: rgb(var(--blue));
}
</style>
