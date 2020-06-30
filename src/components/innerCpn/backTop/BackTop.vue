<template>
  <div class="backTop">
    <img src="~assets/images/common/top.png">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
}
</script>

<style lang="scss" scoped>
  .backTop {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 60px;
    right: 5px;
    z-index: 2;
    opacity: .9;
    transition: all .1s;
    &:active {
      transform: scale(.9);
    }

    img {
      width: 100%;
    }
  }
</style>