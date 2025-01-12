const mysql = require('mysql2/promise');
require('dotenv').config();

// 数据库连接配置
const dbConfig = {
    host: process.env.DB_SERVER,        // 数据库服务器地址
    user: process.env.DB_USER,          // 数据库用户名
    password: process.env.DB_PASSWORD,   // 数据库密码
    database: process.env.DB_DATABASE,   // 数据库名称
    waitForConnections: true,           // 是否等待连接
    connectionLimit: 10,                // 最大连接数
    queueLimit: 0                       // 队列限制（0表示无限制）
};

// 数据库连接池
let pool;

// 连接数据库的异步函数
async function connectDB() {
    try {
        pool = mysql.createPool(dbConfig);  // 创建连接池
        await pool.getConnection();         // 测试连接
        console.log('数据库连接成功');
    } catch (err) {
        console.error('数据库连接失败:', err);
        process.exit(1);                    // 连接失败时退出程序
    }
}

// 导出连接函数和连接池获取方法
module.exports = {
    connectDB,
    getPool: () => pool
}; 