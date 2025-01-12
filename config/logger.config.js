const winston = require('winston');

// 创建日志记录器
const logger = winston.createLogger({
    level: 'info',                      // 默认日志级别
    format: winston.format.combine(      // 日志格式配置
        winston.format.timestamp(),      // 添加时间戳
        winston.format.json()            // JSON格式输出
    ),
    transports: [                       // 日志输出配置
        // 错误日志文件配置
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
        }),
        // 综合日志文件配置
        new winston.transports.File({ 
            filename: 'logs/combined.log' 
        })
    ]
});

// 非生产环境下添加控制台输出
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger; 