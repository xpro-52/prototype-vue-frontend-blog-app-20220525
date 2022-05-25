<template>
  <div id="login">
    <main class="container mt-5 p-5">
      <p class="h5 mb-5">Login</p>
      <form v-on:submit.prevent="submitLogin">
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="loginInputUsername" class="form-label">Email</label>
            <input type="email" class="form-control" 
                   id="loginInputEmail" v-model="form.email" required>
          </div>
        </div>
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="loginInputPassword" class="form-label">Password</label>
            <input type="password" class="form-control" 
                   id="loginInputPassword" v-model="form.password" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>
  </div>
</template>

<script>
import api from '../../services/api';

async function get_author_from_user() { 
  const response = await api.get("/author_from_user/");
  return response.data.author;
}

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      }
    };
  },
  methods: {
    submitLogin: function(){
      this.$store
        .dispatch("auth/login", {
          email: this.form.email,
          password: this.form.password
        })
        .then(async () => {
          console.log("Login succeeded.");
          this.$store.dispatch("message/setInfoMessage", {
            message: "logged in."
          });
          if (!await get_author_from_user()) {
            this.$router.replace("/author-setting");
            return;
          }
          const next = this.$route.query.next || "/";
          this.$router.replace(next);
        });
    }
  }
};
</script>

<style>

</style>