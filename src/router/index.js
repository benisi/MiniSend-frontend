import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import MailList from "../views/Mail/List.vue";
import ViewMail from "../views/Mail/View.vue";
import RecipientMails from "../views/Mail/RecipientEmails.vue";

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
  },
  {
    path: "/mails",
    name: "Mail",
    component: MailList,
  },
  {
    path: "/mails/:id(\\d+)",
    name: "ViewMail",
    component: ViewMail,
  },
  {
    path: "/mails/:recipient",
    name: "RecipientMails",
    component: RecipientMails,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
