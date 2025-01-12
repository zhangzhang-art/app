# app
员工管理系统小程序后端
nodejs+express+mysql

实现用户注册登录

实现员工信息的增删改查

# 项目结构
app/
├─config/              //配置文件目录  
│  ├─db.config.js           //数据库配置  
│  └─logger.config.js      //日志配置  
├─controllers/            //控制器目录  
|  ├─User.js              //登录注册控制器   
│  └─employee.controller.js           //员工信息控制器  
├─middleware/             //中间件目录  
│  └─vaildate-request.js          //错误信息验证局部中间件  
├─routes/                 //路由目录  
│  ├─User.routes.js           //登陆注册路由  
│  └─employee.routes.js           //员工信息路由  
├─logs/       //日志文件目录  
├─.env        //环境变量配置  
└─app.js             //应用入口  

# 说明
采用异步函数编写接口的处理函数,提升运行效率

使用Winston进行日志管理,将每次的请求信息以json格式存放在日志文件目录中

使用dotenv进行环境变量管理,记录了数据库配置信息