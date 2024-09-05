# 根目录下index.html 是页面的入口文件，
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