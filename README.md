# uni-app脚手架说明

### 开发时需留意的地方，
查看:confif>config.js，请求函数中，如果有下面的局域网地址，要替换为正确的本地地址，且模拟器需要设置为能访问局域网，否则就要支持端口转发
```javascript
// #ifdef APP
url: 'http://192.168.199.119:5280' + url,
// #endif
```

### 编译为生产环境时需要修改的地方
编辑:confif>config.js，将接口域名修改为服务器地址，修改应用名称
编辑manifest.json 修改应用名和图标，修改小程序appid和，修改微信开发者appid

### 编译为APP生产环境时注意
编辑:confif>config.js,将请求函数中的:
```javascript
// #ifndef APP
url: apiUrl + url,
// #endif
// #ifdef APP
url: 'http://192.168.199.119:5280' + url,
// #endif
```
因为生产环境直接使用服务器api了，所以统一替换为:
```javascript
url: apiUrl + url,
```
**如果apk真机模拟为雷电模拟器可将网络设置为桥接，并设置dhcp(和本机在同一网段就行)**

## 目录结构
```
├── common				封装方法文件夹
│   ├── base.js			常用基础方法
│   ├── request.js		请求封装
│   └── user.js			用户模块/存储捅操作
├── config				配置文件
│   └── config.js       配置文件
├── pages				页面文件
│   ├── index           导航目录
│   │   ├── sub-page    导航分页目录
│   │   │   └── ....    导航分页acc是个人中心
│   │   └── index.js    导航主页
├── user                用户目录
│   └── ....            注册，登录，修改密码页   
├── static              静态文件目录
├── uni_modules         插件目录，目前里面只有uv-ui
├── App.vue             应用入口文件
├── index.html          html基础模板
├── main.js             入口文件
├── manifest.json       应用配置文件
├── pages.json          页面路由文件
└── uni.scss            scss变量预置  
```

