<template>
  <div class="loading" :style="getSize"></div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    size: {
      type: [Number, String],
      default: 30
    }
  },
  computed: {
    getSize() {
      return `width: ${ this.size }px; height: ${ this.size }px;`;
    }
  }
}
</script>

<style lang="scss" scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: {
      image: url('./imgs/loading.gif');
      size: contain;      
    }
  }
</style>