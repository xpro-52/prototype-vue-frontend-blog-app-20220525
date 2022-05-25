<template>
  <div id="register">
    <main class="container mt-5 p-5">
      <p class="h5 mb-5">Register</p>
      <form v-on:submit.prevent="submitRegisterForm">
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="registerInputEmail" class="form-label">Email</label>
            <input type="email" class="form-control"
                   id="registerInputEmail" v-model="form.email" required>
          </div>
        </div>
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="registerInputPassword" class="form-label">Password</label>
            <input type="password" class="form-control"
                   id="registerInputPassword" v-model="form.password" required>
          </div>
        </div>
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="registerInputRetypePassword" class="form-label">Retype Password</label>
            <input type="password" class="form-control"
                   id="registerInputRetypePassword" v-model="form.re_password" required>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>
  </div>
</template>

<script>
import api from '../../services/api';


export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        re_password: "",
      }
    };
  },
  methods: {
    submitRegisterForm: function () {
      api
        .post("/auth/users/", {
          email: this.form.email,
          password: this.form.password,
          re_password: this.form.re_password
        })
        .then(() => {
          this.$router.replace("/login");
        });
    }
  }
}
</script>

<style>

</style>