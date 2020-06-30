<template>
  <div class="check-box" :class="{ checked: isChecked }" :style="getSize" @click="$emit('check-box-click')"></div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    },
    size: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    getSize() {
      const sizeStr = this.size + 'px';
      return {
        width: sizeStr,
        height: sizeStr
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .check-box {
    margin: 0 5px;
    border-radius: 50%;
    background: {
      image: url('./imgs/check_box.png');
      size: contain;
    }
    &.checked {
      background-image: url(./imgs/check_box_checked.png);
    }
  }
</style>