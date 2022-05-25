<template>
  <div id="post-from">
    <main class="container mt-5 p-5">
      <p class="h5 mb-5">Post Form</p>
      <form v-on:submit.prevent="submitPostForm">
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="postInputTitle" class="form-label">Title</label>
            <input type="text" class="form-control" id="postInputTitle" v-model="form.post.title" required>
          </div>
        </div>
        <div class="row justify-content-center form-group">
          <div class="col-sm-5">
            <label for="postInputBody" class="form-label">Body</label>
            <textarea name="body" id="postInputBody" 
                      cols="30" rows="10" class="form-control" 
                      v-model="form.post.body"></textarea>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  props: ["id"],
  mounted() {
    if (this.id) {
      api
        .get("/posts/" + this.id + "/")
        .then((response) => {
          this.form.post.title = response.data.title;
          this.form.post.body = response.data.body;
          this.form.post.author = response.data.author;
        }).catch((err) => {
            console.log(err);
        });
    }
  },
  data() {
    return {
      form: {
        post: {
          title: "",
          body: "",
          author: "",
        }
      }
    };
  },
  methods: {
    submitPostForm: function() {
      if (this.id) {
        api
          .put("/posts/" + this.id + "/", {
            id: this.id,
            title: this.form.post.title,
            body: this.form.post.body
          })
          .then(() => {
            this.$router.replace("/");
          }).catch((error) => {
            console.log(error);
          });
          return;
      }
      api
        .post("/posts/", {
          title: this.form.post.title,
          body: this.form.post.body
        })
        .then(() => {
          this.$router.replace("/");
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style>

</style>