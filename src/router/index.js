import { createRouter, createWebHistory } from "vue-router";/*
import AuthenticationView from './views/AuthenticationView.vue';
import TasksView from "./views/TasksFormsView.vue";
import DashboardView from "./components/Dashboard.vue";
*/
const routes = [
  { path: "/", name: "Dashboard", component: DashboardView },
  { path: "/login", name: "Login", component: AuthenticationView },
  { path: "/register/:isRegistration", name: "Register", component: AuthenticationView, props: true },
  { path: "/myTasks", name: "Tasks", component: TasksView, meta: {requiresAuth: true} },
  //{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !`${localStorage.getItem("token")}`) {
        next({name: 'Login'})
    } else {
        next()
    }
})

export default router;