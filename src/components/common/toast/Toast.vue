<template>
  <transition name="t-toast">
    <div class="toast" v-show="isShow">
      {{ message }}
    </div>
  </transition>
</template>

<script>
let toastTimer = null;
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(msg = 'default', duration = 1500) {
      clearTimeout(toastTimer);
      this.message = msg;
      this.isShow = true;
      toastTimer = setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 70vw;
  max-height: 70vh;
  padding: 2.4vw;
  border-radius: 3px;
  font-size: 14px;
  text-align: justify;
  word-wrap: break-word;
  color: #2b2b2b;
  background-color: #ddd;
}
.t-toast-enter-active {
  transition: opacity .1s;
}
.t-toast-leave-active {
  transition: opacity .5s;
}
.t-toast-enter, .t-toast-leave-to  {
  opacity: 0;
}
</style>