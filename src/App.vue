<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --white: 246,246,246;
  --grey: 85,98,112;
  --blue: 78,205,196;
  --green: 199,244,100;
  --pink: 255,107,107;
  --red: 196,77,88;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Muli', Helvetica, Arial, sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
}


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
