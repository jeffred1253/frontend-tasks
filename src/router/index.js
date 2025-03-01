import { createRouter, createWebHistory } from "vue-router";
import AuthenticationView from '../views/AuthenticationView.vue';
import TasksTable from "../views/TasksTableView.vue";
import TasksForm from "../views/TasksFormsView.vue";
import DashboardView from "../views/DashboardView.vue";

const routes = [
  { path: "/", name: "Dashboard", component: DashboardView, meta: {requiresAuth: true} },
  { path: "/login", name: "Login", component: AuthenticationView },
  { path: "/register", name: "Register", component: AuthenticationView, props: {isRegistration: true} },
  { path: "/myTasks", name: "Tasks", component: TasksTable, meta: {requiresAuth: true} },
  { path: "/newTask", name: "NewTask", component: TasksForm, meta: {requiresAuth: true} },
  { path: "/updateTask/:taskId", name: "UpdateTask", component: TasksForm, props: (route) => ({ taskId: route.params.taskId }), meta: {requiresAuth: true} }
  //{ path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
      next({ name: 'Login' });
  } else {
      next();
  }
});

export default router;