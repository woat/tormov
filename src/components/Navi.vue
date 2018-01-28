<template>
  <div class="navi">
    <ul>
      <li class="navi__item">New Releases</li>
      <li class="navi__item">Trending</li>
      <li class="navi__item">Coming Soon</li>
      <li class="navi__item">Favourites</li>
      <li class="navi__item">Watch Later</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navi'
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
}

.navi__item:hover {
  background-color: rgb(var(--white));
  color: rgb(var(--grey));
}

.navi__item:hover::after {
  content: '\27a1';
  margin-bottom: 4rem;
  text-align: right;
  float: right;
}
</style>
