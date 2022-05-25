<template>
  <div id="author-setting">
    <main class="container mt-5 p-5">
      <p class="h5 mb-5">Author Setting Form</p>
      <form v-on:submit.prevent="submitAuthorInfo">
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="authorInputName" class="form-label">name</label>
            <input type="text" class="form-control" id="authorInputName" v-model="form.author.name" required>
          </div>
        </div>
        <b-form-group label-cols="3" label="Date of birth">
          <b-form-input v-model="form.author.dob"
                      placeholder="2000-01-01"></b-form-input>
        </b-form-group>
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="authorInputText" class="form-label">Text</label>
            <textarea name="body" id="authorInputText" 
                      cols="30" rows="10" class="form-control" 
                      v-model="form.author.text"></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      form: {
        author: {
          name: "",
          dob: "",
          text: "",
        }
      }
    };
  },
  methods: {
    submitAuthorInfo: function() {
      api
        .post("/authors/", {
          name: this.form.author.name,
          dob: this.form.author.dob,
          text: this.form.author.text
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  }
}
</script>

<style>

</style>