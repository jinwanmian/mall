import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from 'views/home/Home';
import Category from 'views/category/Category';
import ShopCart from 'views/shopcart/ShopCart';
import Profile from 'views/profile/Profile';
import Detail from 'views/detail/Detail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail,
    props: true
  }
];

const router = new VueRouter({
  routes
})

export default router;