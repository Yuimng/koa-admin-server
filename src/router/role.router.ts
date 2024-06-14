import Router from 'koa-router'

import roleController from '../controller/role.controller'

import { verifyAuth } from '../middleware/auth.middleware'

import { verifyRole } from '../middleware/role.middleware'

const roleRouter = new Router({ prefix: '/role' })

roleRouter.post('/list', verifyAuth, roleController.getRoleList)

roleRouter.post('/listAll', verifyAuth, roleController.getRoleAllList)

roleRouter.post('/add', verifyAuth, verifyRole, roleController.addRole)

roleRouter.post('/update', verifyAuth, roleController.updateRole)

roleRouter.post('/delete', verifyAuth, roleController.deleteRole)

roleRouter.post('/useMenus', verifyAuth, roleController.getUseMenus)

export default roleRouter
