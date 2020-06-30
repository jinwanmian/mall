<template>
  <div id="profile">
    <nav-bar>
      <template #center>个人中心</template>
    </nav-bar>
    <main>
      <my-info />
    </main>
  </div>
</template>

<script>
import NavBar from 'NavBar';
import MyInfo from './cpns/MyInfo';
export default {
  name: 'Profile',
  components: {
    NavBar,
    MyInfo
  }
}
</script>

<style scoped>
  main {
    background-color: rgb(156, 156, 247);
    padding-bottom: 30px;
  }
  main::after {
    content: '该页相当于图片...没有可以点击的...';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: white;
  }
</style>