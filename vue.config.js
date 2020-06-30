module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // @在默认配置中已配置了，指向src
        'assets': '@/assets', 
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        // 常用组件
        'NavBar': 'components/common/navbar/NavBar'
      }
    }
  }
}