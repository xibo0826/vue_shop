module.exports = {
    configureWebpack: {
        resolve:{											// 配置别名
            alias:{
                "assets": "@/assets",
                "lang": "@/lang",
                "components": "@/components",
                "views": "@/views"
            }
        }	
    },
}