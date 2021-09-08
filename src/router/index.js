import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../components/pokemon/pokemon'
import Card from '../components/pokemon/card'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pokemon',
    name: 'Pokemon',
    component: Pokemon
  },
  {
    path: '/card',
    name: 'Card',
    component: Card
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
