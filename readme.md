# 这是一个项目 还正在做
```
就是个Vue+axios  UI用的是Mint-UI以及mui 有一说一蛮水的
```
## 遇到的几个问题以及解决的办法

+ 获取新闻的数据
   + 新闻、微信的API是聚合数据的
  ```
  https://cloud.tencent.com/developer/article/1145601
  ```
   + 图片的是360的
  ```
  文章在：https://cloud.tencent.com/developer/article/1145601
  API是： http://wallpaper.apc.360.cn/index.php?%20c=WallPaper&a=getAppsByCategory&cid=
         图片分类参数&start=页数&count=数量&from=360chrome
  ```
---
+ ~~获取到的微信新闻不能用iframe打开~~
   + ~~虽然知道为啥（好像是微信自己设置了不允许非自己域名的网站通过iframe将此网页作为自己的子网页）但是还没解决~~
   + **解决的方案在后面**
---
+ 获取到的新闻、图片、微信公众号出现跨域问题
   + 跨域问题就是其他服务器不允许非自己域名下的网站请求数据
   + 解决方案：
   + 自己用的是vue 所以在webpack.config.js中设置http代理
  ```javascript
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
              }
              '/provinces':{
                   target:'http://apis.juhe.cn/',
                   changeOrigin:true,
                   pathRewrite:{
                       '^/provinces':'/'
                   }
               },
          },
  ```
   + 用Vue-cli建立的据说是创建一个index.js在里面设置代理，我也没试过不知道嗷。
---
+ 在登录界面判断用户自己是否输入了用户名与密码
   + 通过Vue的“路由守卫”在即将离开页面时判断是否输入了密码与用户名，若是没有的话则终止当前的路由
   ```javascript
    beforeRouteLeave(to, from, next) {
               if (to.path === "/member/users/" + this.username) {
                   if (!(this.Password.length)) {
                       MessageBox({
                           title: '错误',
                           message: '未填写密码！',
                           showCancelButton: false
                       });
                       console.log("mima");
                       next(false)
                   } else if (!(this.username.length)){
                       MessageBox({
                           title: '错误',
                           message: '未填写用户名!',
                           showCancelButton: false
                       })
                   }
                   else {
                       next()
                   }
               }
               else {
                   next()
               }
           }
       }
   ```
---
+ 在新闻列表中的mui中设置了slider但是初次打开不能实现拖动，必须要刷新一次才行
   + 得在那个组件的mounted的钩子函数初始化slider
---
+ 在进入详细的新闻页面时不能使用详细的新闻页面的url作为路由参数否则无法打开
   
   + 将新闻详细的uniquekey作为url参数传递
+ 追问：（兄弟路由之间传值）但是这样就获取不到新闻详情的url了，就算是用了一个组件来专门传递url但是还是会产生错位的问题，即：
   ```javascript
   第一次点击新闻--->获取不到url
   第二次点击新闻--->获取到了第一次新闻的url
   第三次点击新闻--->获取到了第二次新闻的url
   第四次点击新闻--->获取到了第三次新闻的url
   ……
   ```
   + 需要使用vue-bus,创建一个bus.js 
   ```javascript
  import Vue from 'vue'
  export default new Vue()
  ```
  + 在两个兄弟路由中分别设置
     + 发送方
     ```javascript
    changeurl(uurrll){
        Bus.$emit('val',uurrll)
    }
    ```
     + 接收方
     ```javascript
    //这些都是写在mounted中，在数据装载前就能发现url的值已经变化，能够及时获取url
    var vm = this;
    Bus.$on('val',(data)=>{
        console.log(data);
        this.varurl=data;
    });
     ```
---
+ 微信和新闻的页面获取与显示
  + 通过Ajax在http://cors-anywhere.herokuapp.com/这个神奇的API可以不受iframe的跨域限制获取到微信、新闻的H5内容（似乎就是破解了防盗链），然后通过v-html就直接渲染成为网页了。
  ```javascript
  getUrl(){
      let http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
      let realurl = http + '//cors-anywhere.herokuapp.com/' + this.varurl;
      this.$axios.get(realurl).then((response)=>{
          console.log(response)
          // let html = response.data;
          response.data = response.data.replace(/data-src/g, "src")
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')
              .replace(/https/g,'http');
          this.newsinfo = response.data
          let html_src = 'data:text/html;charset=utf-8,' + response.data;
          let iframe = document.getElementById('iFrame');
          console.log(html_src)
          iframe.src = html_src;
          // var iframe = document.createElement('iframe');
          // iframe.src=html_src;
          // document.body.appendChild(iframe);
          },(err)=>{console.log(err);});
   },
  ```
+ 又有追问：这样的话微信的图片是不能显示的，那咋办嘛
  +  在index.html下加上这么一句
  ```javascript
    <meta name="referrer" content="never">
  ```
---
+ 如何获取用户IP、省份、天气
  + 获取天气通过IP获取省份的API也是是聚合数据的
  + IP地址获取是通过搜狐的一个API实现的
    + 首先在index.html中引入脚本
    ```html
    <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
     ```
    + 然后在想要获取IP的组件中写方法
    ```javascript
    mounted() {
                this.welcome();
                this.ready();
                this.getprovince();
                this.switchflag()
            },
    methods:{
        ready(){
            var cip=returnCitySN["cip"];
            this.ip=cip;
            // console.log(this.ip);
        },
    }
    ```
  + 
---
##尚未解决的几个问题（TODO）
+ 这个项目截至到2019/12/18还只有页面，没有后台管理~~(虽然只是为了交WEB的期末作业而已诶嘿)~~
+ 莫得数据库那些什么用户名、密码都不能验证是否正确，只能眼睁睁的看着他们乱输入o(╥﹏╥)o
+ 那个新闻的api找的网站没有评论区获取不了评论，所以那个评论只是假数据(截至到2019/12/18能提交假数据上去了，与后台莫得一丢丢关系所以下次打开页面也就莫得了)
+ 防盗链问题的那个神秘链接是一个他人的代理，虽然在github上面也有那个项目，但是终究是别人的，总是有点不放心，还是得想办法自己搞一个
+ ~~没有钱~~