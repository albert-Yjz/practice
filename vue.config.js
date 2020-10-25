/*这个是配置文件路劲的*/
/*cli3的配置文件被隐藏在了node_modules中，一般不要在里面去配置，写在外面，打包时会自动整合进去*/
module.exports={
  configureWebpack: {
    resolve: {
      alias: {
        /*@表示的是src的绝对目录*/
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
/*像router和store 是通过this.$router引用，所以不需要配置文件路劲*/