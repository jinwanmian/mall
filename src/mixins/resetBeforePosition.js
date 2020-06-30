// 回到之前浏览的位置
const mixin = {
  data() {
    return {
      leavePosition: 0
    }
  },
  mounted() {
    // 监听从home发生的路由切换事件
    this.$router.beforeEach((to, from, next) => {
      if (from.name === this.$options.name.toLowerCase()) {
        this.leavePosition = this.$refs.main.scrollTop;
      }
      next();
    })
  },
  activated() {
    if (this.leavePosition === 0) return;

    // 没有使用滚动插件，所以直接操作DOM了
    this.$refs.main.scrollTo(0, this.leavePosition);
  }
};

export default mixin;
