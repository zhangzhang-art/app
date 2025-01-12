const { validationResult } = require('express-validator');

// 请求验证中间件
function validateRequest(req, res, next) {
    // 输出调试信息
    console.log('Validating request params:', req.params);
    console.log('Validation rules:', req._validationContexts);
    
    // 获取验证结果
    const errors = validationResult(req);
    // 如果存在验证错误
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();  // 验证通过，继续处理请求
}

module.exports = validateRequest; 