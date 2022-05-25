import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Home from "@/views/Home.vue";
import Register from "@/views/registration/Register.vue";
import Login from "@/views/registration/Login.vue";
import AuthorSetting from "@/views/SetAuthorInfo.vue";
import PostForm from "@/views/PostForm.vue";
import PostDeleteConfirm from "@/views/PostDeleteConfirm.vue";
import nonInterceptors from "../services/nonInterceptors";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/author-setting",
    component: AuthorSetting,
  },
  {
    path: "/post-form",
    component: PostForm,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/post-form/:id",
    component: PostForm,
    props: true,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/post-delete-confirm/:id",
    component: PostDeleteConfirm,
    props: true,
    meta: {
      requireAuth: true,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach(async (to, from, next) => {
  const isLoggedIn = store.state.auth.isLoggedIn;
  console.log("to.path=" , to.path);
  console.log("isLoggedIn=", isLoggedIn)
  if (isLoggedIn) {
    console.log("User is already logged in.");
    next();
  } else {
    console.log("User is not logged in.");
    if (await hasAccess()) {
      console.log("Try to renew user info.");
      await store
        .dispatch("auth/getMe")
        .then(() => {
          console.log("Succeeded to renew.");
          next();
        })
        .catch(() => {
          store.dispatch("auth/logout");
          router.replace("/");
        });
    } else {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        forceToLogin(to);
      } else {
        console.log("public area.");
        next();
      }
    }
  }
})

async function hasAccess() {
  const response = await nonInterceptors.get("/auth/has-access-token/");
  return response.data.has_access_token;
}

function forceToLogin(to) {
  console.log("force to login");
  router.replace({
    path: "/login",
    query: { next: to.fullpath }
  });
}

export default router;
