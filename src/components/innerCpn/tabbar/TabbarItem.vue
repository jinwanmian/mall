<template>
  <div :class="['tabbar-item', { active: isActive }]" @click="itemClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props: {
    path: {
      type: String,
      required: true
    }
  },
  methods: {
    itemClick() {
      if (this.$route.path === this.path) return;
      
      this.$router.push(this.path);
    }
  },
  computed: {
    isActive() {
      return this.$route.path === this.path;
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
    position: relative;
    &.active::after {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      right: 0;
      height: 1px;
      background-color: #f8f8f8;
      box-shadow: 0px 0px 3px rgb(0, 247, 255);
    }

    img {
      height: 32px;
    }
    .text {
      font-size: 12px;
      font-weight: bold;
    }
  }
</style>