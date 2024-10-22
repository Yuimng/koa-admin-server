import Router from 'koa-router'

import departmentController from '../controller/department.controller'

import { verifyAuth } from '../middleware/auth.middleware'
import { verifySuper } from '../middleware/user.middleware'

const departmentRouter = new Router({ prefix: '/department' })

departmentRouter.post(
  '/listAll',
  verifyAuth,
  departmentController.allDepartmentList
)

departmentRouter.post(
  '/add',
  verifyAuth,
  verifySuper,
  departmentController.addDepartment
)

departmentRouter.post(
  '/update',
  verifyAuth,
  verifySuper,
  departmentController.updateDepartment
)

departmentRouter.post(
  '/delete',
  verifyAuth,
  verifySuper,
  departmentController.deleteDepartment
)

export default departmentRouter
