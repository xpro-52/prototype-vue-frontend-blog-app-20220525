<template>
  <div id="app">
    <Navbar/>
    <Message/>
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Message from "@/components/Message.vue";

export default {
  components: {
    Navbar,
    Message
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: #2c3e50; */

}

/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
