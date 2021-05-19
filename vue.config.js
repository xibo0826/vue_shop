module.exports = {
    configureWebpack: {
        resolve:{											// 配置别名
            alias:{
                "assets": "@/assets",
                "lang": "@/lang",
                "plugins": "@/plugins",
                "components": "@/components",
                "views": "@/views"
            }
        }	
    },
}