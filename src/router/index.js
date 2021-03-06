import { createRouter, createWebHistory } from "vue-router";

import TeacherDetail from "../views/teacher/TeacherDetail.vue";
import TeacherList from "../views/teacher/TeacherList.vue";
import TeacherRegistration from "../views/teacher/TeacherRegistration.vue";
import ContactTeacher from "../views/requests/ContactTeacher.vue";
import RequestsReceived from "../views/requests/RequestsReceived.vue";
import UserAuth from '../views/auth/UserAuth.vue';
import NotFound from "../views/NotFound.vue";
import store from '../store/index.js';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "home", path: "/", redirect: '/teachers' },
    { name: "teacher", path: "/teachers", component: TeacherList },
    {
      path: "/teachers/:id",
      component: TeacherDetail,
      props: true,
      children: [
        { path: "contact", component: ContactTeacher }, // /coaches/c1/contact
      ],
    },
    { path: "/register", component: TeacherRegistration, meta: { requiresAuth: true }},
    { path: "/requests", component: RequestsReceived, meta: { requiresAuth: true }},
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/teachers');
  } else {
    next();
  }
});

export default router;
