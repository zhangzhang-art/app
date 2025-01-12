const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const employeeController = require('../controllers/employee.controller');
const validateRequest = require('../middleware/validate-request');

// 获取所有员工信息路由
router.get('/get-employees', employeeController.getAllEmployees);

// 获取单个员工信息路由
router.get('/get-employee/:emp_no', [
    param('emp_no').trim().notEmpty().withMessage('工号不能为空'),  // 验证工号参数
    validateRequest
], employeeController.getEmployeeByNo);

// 添加新员工路由
router.post('/add-employee', [
    // 验证请求体中的各个字段
    body('emp_name').notEmpty().withMessage('员工姓名不能为空'),
    body('emp_no').notEmpty().withMessage('工号不能为空'),
    body('emp_de').notEmpty().withMessage('部门不能为空'),
    body('emp_skill').notEmpty().withMessage('职位不能为空'),
    body('emp_tel').notEmpty().withMessage('联系方式不能为空')
        .matches(/^1[3-9]\d{9}$/).withMessage('请输入有效的手机号码'),
    validateRequest
], employeeController.addEmployee);

// 更新员工信息路由
router.post('/update-employee/:emp_no', [
    // 验证路由参数和请求体
    param('emp_no').trim().notEmpty().withMessage('工号不能为空'),
    body('emp_name').notEmpty().withMessage('员工姓名不能为空'),
    body('emp_de').notEmpty().withMessage('部门不能为空'),
    body('emp_skill').notEmpty().withMessage('职位不能为空'),
    body('emp_tel').notEmpty().withMessage('联系方式不能为空')
        .matches(/^1[3-9]\d{9}$/).withMessage('请输入有效的手机号码'),
    validateRequest
], employeeController.updateEmployee);

// 删除员工路由
router.post('/del-employee/:emp_no', validateRequest, employeeController.deleteEmployee);

module.exports = router; 