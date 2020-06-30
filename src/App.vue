<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <tabbar />
  </div>
</template>

<script>
import Tabbar from 'components/innerCpn/tabbar/Tabbar';
export default {
  name: 'App',
  components: {
    Tabbar
  }
}
</script>

<style lang="scss">
  @import './assets/css/base.scss';

  main {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    font-size: 16px;
  }
</style>
