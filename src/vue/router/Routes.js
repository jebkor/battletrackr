import Router from 'vue-router';
import NProgress from 'nprogress';

// Import the .vue files, the router views.
import Home from '../views/Home.vue';

// Initialize and setup the routes
const Routes = new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: Home,
		}
		// {
		//   path: '/',
		//   redirect: '/login'
		// }, {
		//   path: '/login',
		//   name: 'login',
		//   component: Login
		// }, {
		//   path: '/sign-up',
		//   name: 'signUp',
		//   component: SignUp
		// }, {
		//   path: '/home',
		//   name: 'home',
		//   component: Home,
		//   meta: {
		//     requiresAuth: true
		//   }
		// }
	]
});


// Add the nprogress loader to route change
Routes.beforeResolve((to, from, next) => {
	if (to.name) {
		NProgress.start();
	}
	next();
});

Routes.afterEach((to, from) => {
	NProgress.done();
});


// if firebase
// Routes.beforeEach((to, from, next) => {
// 	const currentUser = Firebase.auth().currentUser;
// 	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

// 	if (requiresAuth && !currentUser) next('login');
// 	else if (!requiresAuth && currentUser) next('home');
// 	else next();
// });


// Export the router for consumption in index.ts file
export default Routes;