import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import MailList from "../views/Mail/List.vue";
import ViewMail from "../views/Mail/View.vue";
import RecipientMails from "../views/Mail/RecipientEmails.vue";
import BatchList from "../views/Mail/BatchList.vue";
import BatchMail from "../views/Mail/BatchMail.vue";
import TokenList from "../views/Token/index.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: "Dashboard",
    },
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: "Dashboard",
    },
  },
  {
    path: "/mails",
    name: "Mail",
    component: MailList,
    meta: {
      requiresAuth: true,
      title: "Mail list",
    },
  },
  {
    path: "/mails/:id(\\d+)",
    name: "ViewMail",
    component: ViewMail,
    meta: {
      requiresAuth: true,
      title: "View Mail",
    },
  },
  {
    path: "/mails/:recipient",
    name: "RecipientMails",
    component: RecipientMails,
    meta: {
      requiresAuth: true,
      title: "Recipient Email",
    },
  },
  {
    path: "/batches",
    name: "Batch",
    component: BatchList,
    meta: {
      requiresAuth: true,
      title: "Batches",
    },
  },
  {
    path: "/batches/:batchId",
    name: "Batch",
    component: BatchMail,
    meta: {
      requiresAuth: true,
      title: "Single Batch",
    },
  },
  {
    path: "/token",
    name: "Token",
    component: TokenList,
    meta: {
      requiresAuth: true,
      title: "Token",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.auth.token) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
    next();
  } else if (
    (to.name === "Login" || to.name === "Register") &&
    store.state.auth.token
  ) {
    next({
      path: "/dashboard",
    });
  } else {
    next();
  }
});

export default router;
