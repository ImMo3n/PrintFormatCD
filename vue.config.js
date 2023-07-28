module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://localhost:5000/tasks/',
          ws: true,
          changeOrigin: true,
          pathRewrite: { '^/api': '/' },
        }
      }
    },
    optimize:{
      drop_console: false
    },
  }