//由于webpack是基于node构建的所以webpack的配置文件中任何合法的node代码都是支持的
var path = require('path')
const webpack = require('webpack')
//当以命令行形式运行webpack-dev-server，工具发现我们并没有提供要打包文件的入口和出口文件
//,此时他会检查西南股根目录中的配置文件
var html = require('html-webpack-plugin')
//在内存中根据指定的模板页面生成一份内存中的首页，同时把打包好的bundle注入到页面底部
var VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    entry: path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist/bundle.js'),
        filename: "bundle.js"
    },
    plugins: [//所有webpack的配置节点
        new html({
            template:path.join(__dirname,'./src/index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        open: true,
        port: 3000,
        contentBase: 'src',
        hot:true,
        proxy: {
            '/api': {
                target: 'http://v.juhe.cn/', // 目标服务器地址
                changeOrigin: true, // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/iimmgg': {
                target: 'http://wallpaper.apc.360.cn/', // 目标服务器地址
                changeOrigin: true, // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!
                pathRewrite: {
                    '^/iimmgg': '/'
                }
            },
            // '/hhttmmll' : {
            //     target: 'http://cors-anywhere.herokuapp.com/', // 目标服务器地址
            //     changeOrigin: true, // 是否修改来源, 为true时会让目标服务器以为是webpack-dev-server发出的请求!
            //     pathRewrite: {
            //         '^/hhttmmll': '/'
            //     }
            // }
        },
    },
    module: { //配置所有第三方loader模块的
        rules: [ //
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {test:/\.(ttf)|(eot)|(svg)|(otf)|(woff)|(woff2)$/,use:'url-loader'},
            {test:/\.(jpg)|(png)|(gif)|(bmp)|(jpeg)$/,use:'url-loader?limit=841679&name=[hash:8]-[name].[ext]'},
        //    处理图片路径的loader limit>图片大小---->base64   name=[hash:8]-[name].[ext]保持页面的文件名与扩展名和文件本身的一致,在文件名前面生成一个8位的哈希值
            {test:/\.js$/,use:'babel-loader', exclude: /node_modules/},
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    resolve: {
        alias:{
            // 'vue$':'vue/dist/vue.js'
        }
    },
    // proxyTable: {
    //     '/api': {
    //         // target:'http://jsonplaceholder.typicode.com',
    //         target: 'http://localhost:9080',
    //         changeOrigin: true,
    //
    //         pathRewrite: {
    //             '/api': ''
    //         }
    //     }
    // },
}