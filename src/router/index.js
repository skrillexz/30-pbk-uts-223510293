import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Albums from '../views/Albums.vue'
import AlbumPhotos from '../views/AlbumPhotos.vue'
import Posts from '../components/Posts.vue'
import Todos from '../components/Todos.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/albums',
    name: 'albums',
    component: Albums
  },
  {
    path: '/albums/:id',
    name: 'album-photos',
    component: AlbumPhotos
  },
  {
    path: '/posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/todos',
    name: 'todos',
    component: Todos
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
