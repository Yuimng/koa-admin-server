import Router from 'koa-router'

import departmentController from '../controller/department.controller'

import { verifyAuth } from '../middleware/auth.middleware'

const departmentRouter = new Router({ prefix: '/department' })

departmentRouter.post(
  '/listAll',
  verifyAuth,
  departmentController.allDepartmentList
)

// departmentRouter.post('/add', verifyAuth, verifySuper, departmentController.adddepartment)

// departmentRouter.post('/update', verifyAuth, verifySuper, departmentController.updatedepartment)

// departmentRouter.post('/delete', verifyAuth, verifySuper, departmentController.deletedepartment)

export default departmentRouter
