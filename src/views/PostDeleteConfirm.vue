<template>
  <div id="post-delete-confirm">
    <main class="container mt-5 p-5">
      <p class="h5 mb-5">Post Delete Confirm</p>
      <form v-on:submit.prevent="deletePost">
        <b-card :title="post.title" :sub-title="'author: ' + post.author" 
                class="my-4 mx-auto">
          <b-card-text>
            {{ post.body }}
          </b-card-text>
          <b-card-text>
            <small class="text-muted">{{ post.created_date }}</small>
          </b-card-text>
          <b-card-text>
            <small class="text-muted" v-if="post.updated_date">{{ post.updated_date }}</small>
          </b-card-text>
        </b-card>
        <p>Do you really want to delete this post ?</p>
        <button type="submit" class="btn btn-danger">Yes</button>
      </form>
    </main>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  props: ["id"],
  mounted() {
    api
      .get("/posts/" + this.id + "/")
      .then((response) => {
        this.post.title = response.data.title;
        this.post.body = response.data.body;
        this.post.author = response.data.author;
        this.post.created_date = response.data.created_date;
        this.post.updated_date = response.data.updated_date;
      }).catch((err) => {
          console.log(err);
      });
  },
  data() {
    return {
      post: {
        title: "",
        body: "",
        author: "",
        created_date: "",
        updated_date: "",
      }
    };
  },
  methods: {
    deletePost: function () {
      api
        .delete("/posts/" + this.id + "/")
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
}
</script>

<style>

</style>