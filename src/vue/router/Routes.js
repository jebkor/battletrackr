import Router from 'vue-router';
import NProgress from 'nprogress';



// Import the .vue files, the router views.
import Home from '../views/Home.vue'
import Encounters from '../views/Encounters.vue'
import Monsters from '../views/Monsters.vue'
import LoginForm from '../views/LoginForm.vue'
import SignupForm from '../views/SignupForm.vue'
import User from '../views/User.vue'



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
		component: SignupForm
	}, {
		path: '/user/:id/encounters',
		name: 'encounters',
		component: Encounters
	}, {
		path: '/user/:id/encounters/:encounterId',
		name: 'encounter',
		component: Monsters
	}]
});


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
export default Routes;