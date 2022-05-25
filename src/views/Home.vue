<template>
  <div class="home">
    <main class="container mt-5">
      <p class="h5 mb-5">Home</p>
      <button v-on:click="movePostForm(id=null)"
              class="btn btn-outline-primary"
              v-if="isLoggedIn">create</button>
      <div id="post-detail">
        <b-card :title="clickedPost.title" :sub-title="'author: ' + clickedPost.author" 
               class="my-4 mx-auto" v-if="isClickView">
          <b-card-text>
            {{ clickedPost.body }}
          </b-card-text>
          <b-card-text>
            <small class="text-muted">{{ clickedPost.created_date }}</small>
          </b-card-text>
        </b-card>
      </div>
      <div class="row">
        <div v-for="post in post_list" :key="post.id" class="col-4">
          <b-card :title="post.title" :sub-title="'author: ' + post.author" 
                  class="my-4 mx-auto" style="max-width: 30rem; " v-if="post.id != clickedPost.id">
            <b-card-text>
              {{ post.body }}
            </b-card-text>
            <b-card-text>
              <small class="text-muted">{{ post.created_date }}</small>
            </b-card-text>
            <button v-on:click="getPostDetail(post.id)" class="btn btn-outline-primary m-2">view</button>
            <button v-on:click="movePostForm(post.id)" class="btn btn-outline-secondary m-2"
                    v-if="author === post.author">edit</button>
            <button v-on:click="movePostDeleteConfirm(post.id)" class="btn btn-outline-danger m-2"
                    v-if="author === post.author">delete</button>
          </b-card>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import api from "@/services/api";


export default {
  name: "Home",
  computed: {
    isLoggedIn: function() {
      return this.$store.state.auth.isLoggedIn;
    },
  },
  data() {
    return {
      post_list: null,
      isClickView: false,
      clickedPost: {
        id: null
      },
      author: null,
    };
  },
  created() {
    this.fetchData()
  },
  mounted() {
    
    if (this.isLoggedIn) {
      api
        .get("/author_from_user/")
        .then(response => {
          this.author = response.data.author;
        });
    }
  },
  watch: {
    $route: "fetchData"
  },  
  methods: {
    fetchData() {
      console.log("fetch data");
      api
        .get("/posts/")
        .then(response => {
          // this.$store.dispatch("message/clearMessages");
          this.post_list = response.data
        });
    },
    getPostDetail: function(id) {
      this.isClickView = true;
      api
        .get("/posts/" + id + "/")
        .then(response => {
          this.clickedPost = response.data;
        });
    },
    movePostForm: function(id) {
      if (id) {
        this.$router.replace("/post-form/" + id);
        return;
      }
      this.$router.replace("/post-form/");
    },
    movePostDeleteConfirm: function(id) {
      this.$router.replace("/post-delete-confirm/" + id);
    }
  }
};
</script>
<style scoped>
div {
  /* background-color: black; */
}
</style>
