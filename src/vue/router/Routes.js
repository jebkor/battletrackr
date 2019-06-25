import Router from 'vue-router';
// import NProgress from 'nprogress';


// Import the .vue files, the router views.
import Encounters from '../pages/Encounters.vue'
import Monsters from '../pages/Monsters.vue'
import LoginForm from '../pages/LoginForm.vue'
import SignupForm from '../pages/SignupForm.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import ResetPassword from '../pages/ResetPassword.vue'
import ConfirmEmail from '../pages/ConfirmEmail.vue'

// Support routes
import Faq from '../pages/support/Faq.vue'


// Initialize and setup the routes
const Routes = new Router({
  routes: [{
    path: '/',
    name: 'home-login',
    component: LoginForm,
  }, {
    path: '/login',
    name: 'login',
    component: LoginForm,
  }, {
    path: '/signup',
    name: 'signup',
    component: SignupForm,
  }, {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
  }, {
    path: '/reset-password/:resetToken',
    name: 'reset-password',
    component: ResetPassword,
  }, {
    path: '/confirm-email/:confirmToken',
    name: 'confirm-email',
    component: ConfirmEmail,
  }, {
    path: '/user/:id/encounters',
    name: 'encounters',
    component: Encounters,
  }, {
    path: '/user/:id/encounters/:encounterId',
    name: 'encounter',
    component: Monsters,
  }, {
    path: '/faq',
    name: 'faq',
    component: Faq,
  },
  ],
})


// Add the nprogress loader to route change
// Routes.beforeResolve((to, from, next) => {
// 	if (to.name) {
// 		NProgress.start();
// 	}
// 	next();
// });

// Routes.afterEach((to, from) => {
// 	NProgress.done();
// });


// Export the router
export default Routes
