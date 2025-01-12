const { getPool } = require('../config/db.config');

/*
    登录用户
*/

async function userLogin(req,res) {
    
    const {Username,Password} = req.body;
    
    const [exist] = await getPool().query(
        'SELECT Password,COUNT(*) AS count FROM users WHERE Username = ?', [Username]
    )

    if(exist[0].count === 0){
        return res.json({
            success: false,
            message: '用户不存在'
        })
    }

    if(exist[0].Password !== Password){
        return res.json({
            success: false,
            message: '密码错误'
        })
    }

    res.json({
        success: true,
        message: '登录成功'
    })
}

/*
    注册新用户
*/

async function signInuser(req,res) {
    
    const {Username,Password} = req.body;

    const [exist] = await getPool().query(
        'SELECT COUNT(*) AS count FROM users WHERE Username = ?', [Username]
    );

    if(exist[0].count > 0){
        return res.json({
            success: false,
            message: '用户已存在'
        })
    }

    await getPool().query(
        'INSERT INTO Users (Username,Password) VALUE(?,?)', [Username,Password]
    );

    res.json({
        success: true,
        message: '用户注册成功'
    })
}

module.exports = {
    userLogin,
    signInuser
};