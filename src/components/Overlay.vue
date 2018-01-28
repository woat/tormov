<template>
  <div class="overlay open">
    <div class="overlay__card">
      Elit dicta nihil quos iusto ullam cumque, impedit? Rerum nam corrupti accusantium corrupti explicabo accusantium Qui exercitationem numquam autem debitis voluptas. Debitis natus explicabo possimus corporis quis Ipsum perspiciatis corporis:w
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
</template>

<script>
export default {
  name: 'Overlay',
  data() {
    return {
      movie: []
    }
  }
}
</script>

<style scoped>
.overlay {
  background: rgba(0, 0, 0, 0.7);
  display: none;
  z-index: 100; 
  height: 100vh;
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: 
  ". . ."
  ". card ."
  ". . .";
  justify-content: center;
  align-items: center;
}

.overlay.open {
  display: grid;
  align-items: center;
  justify-items: center;
}

.overlay__card {
  grid-area: card;
  height: 50rem;
  width: 50rem;
  background: white;
}
</style>
