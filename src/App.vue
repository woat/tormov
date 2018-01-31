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
  --grey: 25, 28, 31;
  --blue: 99, 181, 236;
  --darkblue: 60, 111, 146;
  --green: 199, 244, 100;
  --pink: 255, 66, 79;
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
