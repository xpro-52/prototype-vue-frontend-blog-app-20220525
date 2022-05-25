<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">Blog</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#" v-on:click="moveHome">Home</b-nav-item>
        <b-nav-item href="#" v-if="isLoggedIn" v-on:click="clickLogout">Logout</b-nav-item>
        <b-nav-item href="#" v-if="!isLoggedIn" v-on:click="clickRegister">Register</b-nav-item>
        <b-nav-item href="#" v-if="!isLoggedIn" v-on:click="clickLogin">Login</b-nav-item>
        <b-nav-text>User: {{ email }}</b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  mounted() {
    // if (this.$store.auth.user)
  },
  computed: {
    email: function() {
      return this.$store.state.auth.email || "Anonymous account";
    },
    isLoggedIn: function() {
      return this.$store.state.auth.isLoggedIn;
    }
  },
  methods: {
    moveHome: function() {
      this.$router.replace("/");
    },
    clickLogout: function() {
      this.$store.dispatch("auth/logout");
      this.$store.dispatch("message/setInfoMessage", {
        message: "logged out"
      });
      this.$router.replace("/");
    },
    clickRegister: function() {
      this.$router.replace("/register");
    },
    clickLogin: function() {
      // this.$store.dispatch("message/clearMessages");
      this.$router.replace("/login");
    }
  }
}
</script>

<style>

</style>