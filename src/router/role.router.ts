import Router from 'koa-router'

import roleController from '../controller/role.controller'

import { verifyAuth } from '../middleware/auth.middleware'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.post('/list', verifyAuth, roleController.getRoleList)

// roleRouter.post('/add', verifyAuth, roleController.addRole)

// roleRouter.post('/update', verifyAuth, roleController.updateRole)

// roleRouter.post('/delete', verifyAuth, roleController.deleteRole)

export default roleRouter
