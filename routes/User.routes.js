const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const User = require('../controllers/User');

router.get('/login', [
    body('Username').notEmpty().withMessage('用户名不能为空'),
    body('Password').notEmpty().withMessage('密码不能为空')
], User.userLogin);

router.post('/signin', [
    body('Username').notEmpty().withMessage('用户名不能为空'),
    body('Password').notEmpty().withMessage('密码不能为空')
], User.signInuser);

module.exports = router;
                    