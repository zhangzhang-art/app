const { getPool } = require('../config/db.config');
const logger = require('../config/logger.config');

/**
 * 获取所有员工信息
 * 从数据库中查询并返回所有员工的基本信息，按创建时间降序排序
 */
async function getAllEmployees(req, res) {
    try {
        // 查询所有员工信息，不包含id字段
        const [rows] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel, created_at, updated_at FROM employees ORDER BY created_at DESC'
        );
        res.json({
            success: true,
            data: rows
        });
    } catch (err) {
        logger.error('获取员工列表失败:', err);
        res.status(500).json({
            success: false,
            message: '获取员工列表失败'
        });
    }
}

/**
 * 获取单个员工信息
 * 根据工号查询并返回指定员工的详细信息
 */
async function getEmployeeByNo(req, res) {
    try {
        const { emp_no } = req.params;  // 从请求参数中获取工号

        // 根据工号查询员工信息
        const [employee] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel, created_at, updated_at FROM employees WHERE emp_no = ?',
            [emp_no]
        );

        // 如果未找到员工，返回404错误
        if (employee.length === 0) {
            return res.status(404).json({
                success: false,
                message: '员工不存在'
            });
        }

        res.json({
            success: true,
            data: employee[0]
        });
    } catch (err) {
        logger.error('获取员工信息失败:', err);
        res.status(500).json({
            success: false,
            message: '获取员工信息失败'
        });
    }
}

/**
 * 添加新员工
 * 验证并添加新员工信息到数据库
 */
async function addEmployee(req, res) {
    try {
        // 从请求体中获取员工信息
        const { emp_name, emp_no, emp_de, emp_skill, emp_tel } = req.body;

        // 检查工号是否已存在
        const [existing] = await getPool().query(
            'SELECT COUNT(*) as count FROM employees WHERE emp_no = ?', 
            [emp_no]
        );
        
        if (existing[0].count > 0) {
            return res.status(400).json({
                success: false,
                message: '工号已存在'
            });
        }

        // 插入新员工记录
        await getPool().query(
            'INSERT INTO employees (emp_name, emp_no, emp_de, emp_skill, emp_tel) VALUES (?, ?, ?, ?, ?)',
            [emp_name, emp_no, emp_de, emp_skill, emp_tel]
        );

        // 查询新添加的员工信息
        const [newEmployee] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel, created_at, updated_at FROM employees WHERE emp_no = ?',
            [emp_no]
        );

        res.status(201).json({
            success: true,
            data: newEmployee[0]
        });
    } catch (err) {
        logger.error('添加员工失败:', err);
        res.status(500).json({
            success: false,
            message: '添加员工失败'
        });
    }
}

/**
 * 更新员工信息
 * 根据工号更新指定员工的信息
 */
async function updateEmployee(req, res) {
    try {
        const { emp_no } = req.params;  // 从路由参数获取工号
        const { emp_name, emp_de, emp_skill, emp_tel } = req.body;  // 从请求体获取更新信息

        // 检查员工是否存在
        const [existing] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel FROM employees WHERE emp_no = ?',
            [emp_no]
        );
        
        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: '员工不存在'
            });
        }

        // 更新员工信息
        await getPool().query(
            'UPDATE employees SET emp_name = ?, emp_de = ?, emp_skill = ?, emp_tel = ? WHERE emp_no = ?',
            [emp_name, emp_de, emp_skill, emp_tel, emp_no]
        );

        // 查询更新后的员工信息
        const [updated] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel, created_at, updated_at FROM employees WHERE emp_no = ?',
            [emp_no]
        );

        res.json({
            success: true,
            data: updated[0]
        });
    } catch (err) {
        logger.error('更新员工信息失败:', err);
        res.status(500).json({
            success: false,
            message: '更新员工信息失败'
        });
    }
}

/**
 * 删除员工
 * 根据工号删除指定员工的信息
 */
async function deleteEmployee(req, res) {
    try {
        const { emp_no } = req.params;  // 从路由参数获取工号

        // 查询要删除的员工信息
        const [employee] = await getPool().query(
            'SELECT emp_name, emp_no, emp_de, emp_skill, emp_tel, created_at, updated_at FROM employees WHERE emp_no = ?',
            [emp_no]
        );
        
        // 如果员工不存在，返回404错误
        if (employee.length === 0) {
            return res.status(404).json({
                success: false,
                message: '员工不存在'
            });
        }

        // 删除员工记录
        await getPool().query('DELETE FROM employees WHERE emp_no = ?', [emp_no]);

        res.json({
            success: true,
            message: '员工删除成功',
            data: employee[0]
        });
    } catch (err) {
        logger.error('删除员工失败:', err);
        res.status(500).json({
            success: false,
            message: '删除员工失败'
        });
    }
}

// 导出所有控制器函数
module.exports = {
    getAllEmployees,
    getEmployeeByNo,
    addEmployee,
    updateEmployee,
    deleteEmployee
}; 