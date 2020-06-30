import Toast from './Toast';

export default {
  install(Vue, options) {
    const ToastConstruct = Vue.extend(Toast);
    const toast = new ToastConstruct().$mount();
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
  }
}