module.exports={
    //关闭esLint语法检查
    lintOnSave:false,
    // 配置代理
    devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/dev-api': { // 匹配所有以 '/dev-api'开头的请求路径
			target: 'http://182.92.128.115', // 代理目标的基础路径
			// target: 'http://47.93.148.192',
			changeOrigin: true, // 支持跨域
			pathRewrite: { // 重写路径: 去掉路径中开头的'/dev-api'
			  '^/dev-api': ''
			}
		  },
		}
	}
}