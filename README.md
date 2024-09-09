# 这个项目是为了熟悉一对一聊天的实现， 未进行精雕细琢（页面简陋）
1. 需要进入server文件夹执行 npm run dev, 启动websocket 服务器，
2. 浏览器打开两个index.html(登录页面)， 由于页面中写死两个用户（admin00 , sslvpn45）, 所以分别使用这两个用户进行登录， 互发信息， 可以看到页面一来一回的聊天
# 根目录下index.html 是页面的入口文件，直接浏览器运行
```
|--client             前端文件  
|  --js               存放js 的文件  
|    --chat.js        处理websocket 连接server， socket信息处理, 挂载  
|    --index.js       登录，username 的储存以及跳转  
|  --chat.html        聊天页面ui 的简单实现   
|  --index.html       登录入口ui 的简单实现（!废弃！ 因为又写了一个登录页面）  
|--server             后端文件  
|  --node_modules  
|  --index.js server  的启动文件  
|  --package-lock.json   
|  --package.json   
|--static             放了一个登录页面的背景图（不展开叙述）  
|--index.html         重写的登录页面  
|--LICENSE            (MIT License 开源规则)  
|--package.json  
|--README.md  
```
  
# /server/index.js 是服务器的入口文件 运行命令是 npm run dev

# 实现的功能
1. 基础的websocket 连接。 前端使用原生的websocket 实现， 后端使用库 ws 实现
2. 心跳机制。保证服务器异常断开，重启等，client会定时向server发送信息, 得到回复， 则是保持连接， 否则主动断开。
3. 聊天功能实现。 每次连接都会生成一个新的ws 实例，存储在数组中，这样， 我们就有了一份用户数组， 然后每次发过来的信息都会带有聊天对象的id,  遍历用户数组，找到对应id 的ws 实例，使用发送信息， 对应id 的user就会收到信息

# 未实现的功能
1. 聊天室。 就是存储每个连接的ws 实例， 遍历发送信息（广播）
2. 页面修饰。 聊天页面没有进行精细的打磨，美化

# 待续......
