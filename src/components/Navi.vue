<template>
  <div class="navi">
    <ul>
      <li @click="active" class="navi__item navi__item--active">New Releases</li>
      <li @click="active" class="navi__item">Trending</li>
      <li @click="active" class="navi__item">Coming Soon</li>
      <li @click="active" class="navi__item">Favourites</li>
      <li @click="active" class="navi__item">Watch Later</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navi',
  methods: {
    removeActives(e) {
      return [...e.target.parentNode.childNodes]
        .filter(node => node.nodeName !== '#text')
        .forEach(node => node.classList.remove('navi__item--active'))
    },
    active(e) {
      this.removeActives(e)
      e.target.classList.toggle('navi__item--active')
      const params = e.target.innerHTML
      this.$router.push({ query: { view: params } })
    }
  }
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
