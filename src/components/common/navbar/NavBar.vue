<template>
  <div class="nav-bar">
    <div class="n-left">
      <slot name="left"></slot>
    </div>
    <div class="n-center">
      <slot name="center"></slot>
    </div>
    <div class="n-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
  .nav-bar {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(255, 193, 100);
    box-shadow: 0 1px 2px rgb(255, 166, 0);
    display: flex; 
    z-index: 1;

    .n-center {
      flex: 1;
      font-weight: bold;
      text-shadow: 0px 0px 3px rgb(172, 172, 172);
      overflow: hidden;
    }
    .n-left, .n-right {
      width: 50px;
    }
  }
</style>