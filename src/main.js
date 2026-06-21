import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import 'notyf/notyf.min.css';

import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'

import {createPinia} from 'pinia';

import HomePage from './pages/HomePage.vue';
import PostsPage from './pages/PostsPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LoginPage from './pages/LoginPage.vue';
import LogoutPage from './pages/LogoutPage.vue';
import ErrorPage from './pages/ErrorPage.vue';
import ViewPost from './pages/ViewPost.vue';
import AddPost from "./pages/AddPost.vue";

import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({

	history: createWebHistory(),

	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomePage
		},
		{
			path: '/posts',
			name: 'Posts',
			component: PostsPage
		},
		{
			path: '/register',
			name: 'Register',
			component: RegisterPage
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginPage
		},
		{
			path: '/logout',
			name: 'Logout',
			component: LogoutPage
		},
        {
            path: '/posts/:id',
            component: ViewPost
        },
        {
          path: "/addPost",
          name: "AddPost",
          component: AddPost,
        },
        {
            path: '/:catchAll(.*)',
            component: ErrorPage
        }   
	]
})

const app = createApp(App);

app.use(createPinia());

app.use(router);
app.mount('#app');