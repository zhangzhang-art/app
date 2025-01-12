const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db.config');
const logger = require('./config/logger.config');
require('dotenv').config();

const app = express();

// 中间件配置
app.use(cors());                        // 启用跨域资源共享
app.use(express.json());                // 解析 JSON 请求体
app.use(express.urlencoded({ extended: true }));  // 解析 URL 编码的请求体

// 请求日志记录中间件
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);  // 记录请求方法和URL
    next();
});

//登录注册路由配置
app.use('/User',require('./routes/User.routes'));

// API 路由配置
app.use('/api', require('./routes/employee.routes'));

// 全局错误处理中间件
app.use((err, req, res, next) => {
    logger.error(err.stack);            // 记录错误堆栈
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDB();                  // 连接数据库
    console.log(`服务器运行在端口 ${PORT}`);
}); 