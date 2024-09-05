# 根目录下index.html 是页面的入口文件，
|--client             前端文件  <br />
|  --js               存放js 的文件  <br />
|    --chat.js        处理websocket 连接server， socket信息处理, 挂载  <br />
|    --index.js       登录，username 的储存以及跳转  <br />
|  --chat.html        聊天页面ui 的简单实现   <br />
|  --index.html       登录入口ui 的简单实现（!废弃！ 因为又写了一个登录页面） <br /> 
|--server             后端文件  <br />
|  --node_modules  <br />
|  --index.js server  的启动文件  <br />
|  --package-lock.json   <br />
|  --package.json   <br />
|--static             放了一个登录页面的背景图（不展开叙述）  <br />
|--index.html         重写的登录页面  <br />
|--LICENSE            (MIT License 开源规则)  <br />
|--package.json  <br />
|--README.md  <br />
  
# /server/index.js 是服务器的入口文件 运行命令是 npm run dev