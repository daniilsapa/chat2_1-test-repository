import Vue from 'vue';
import axios from 'axios'
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//GLOBAL COMPONENTS
import WWHeader from './components/global/WWHeader.vue';
import Notification from './components/global/Notification.vue';
import AddresseList from './components/global/AddresseeList/AddresseeList.vue';

import { routes } from "./router/routes.js"
import { store } from "./store/store"

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.use(require('vue-prevent-parent-scroll'));

const router = new VueRouter({
    routes
});

axios.interceptors.request
    .use(
        (config) => {
            config.headers.authorization = `${JSON.parse(localStorage.getItem('data')).token}`;
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );

Vue.component('ww-header', WWHeader);
Vue.component('ww-notification', Notification);
Vue.component('addressee-list', AddresseList);

Vue.filter('timestamp', value => {

    const messageDate = new Date(value),
          currentDate = new Date(Date.now());

    const sameDay = messageDate.getFullYear() === currentDate.getFullYear() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getDay() === currentDate.getDay();

    if(sameDay){
        return `${messageDate.getHours()} : ${messageDate.getMinutes()}`;
    }
    else{
        return `${messageDate.getMonth()}/${messageDate.getDay()}/${messageDate.getFullYear()} at ${messageDate.getHours()} : ${messageDate.getMinutes()}`
    }

});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});




