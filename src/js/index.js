Vue.config.productionTip = false;



// import dependencies
import "@babel/polyfill";
import Vue from "vue";
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import Notify from 'vue-notifyjs/dist/vue-notifyjs';
import VueProgressBar from 'vue-progressbar';
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faCoffee,
  faCog,
  faFile,
  faDungeon,
  faTimes,
  faSkull
} from '@fortawesome/free-solid-svg-icons';
import {
  faVuejs
} from '@fortawesome/free-brands-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';

import VueFire from "vuefire";
import Firebase from "firebase";




// create instance of vue "plugins"
library.add(
  faCoffee,
  faCog,
  faDungeon,
  faFile,
  faVuejs,
  faTimes,
  faSkull
);
Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    userdefined: "#ff00ff"
  }
});
Vue.use(Notify, {
  type: 'primary',
  timeout: 5000,
  horizontalAlign: 'right',
  verticalAlign: 'bottom'
});
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
});
Vue.use(VueFire);



// import files
import router from '../vue/router/Routes';
import store from "../vue/store/Store";
import App from '../vue/App.vue';
import '../vue/components/MyComponent.vue';




// Component registers
Vue.component('font-awesome-icon', FontAwesomeIcon);


const db = Firebase.initializeApp({
  apiKey: "AIzaSyC-eQj1sHH7xg6uJD7GBgZIMZFzlEV0B9c",
  authDomain: "dm-toolkit-cf79d.firebaseapp.com",
  databaseURL: "https://dm-toolkit-cf79d.firebaseio.com",
  projectId: "dm-toolkit-cf79d",
  storageBucket: "dm-toolkit-cf79d.appspot.com",
  messagingSenderId: "970352388036"
}).database();


// Firebase.auth().onAuthStateChanged(() => {
//   if (!app) {
    // create SPA instance
    let app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
//   }
// })