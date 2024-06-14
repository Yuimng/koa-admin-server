import Router from 'koa-router'

import menuController from '../controller/menu.controller'

import { verifyAuth } from '../middleware/auth.middleware'
import { verifySuper } from '../middleware/user.middleware'

const menuRouter = new Router({ prefix: '/menu' })

menuRouter.post('/list', verifyAuth, menuController.menuListByRole)

menuRouter.post('/listAll', verifyAuth, menuController.allMenuList)

menuRouter.post('/add', verifyAuth, verifySuper, menuController.addMenu)

menuRouter.post('/update', verifyAuth, verifySuper, menuController.updateMenu)

export default menuRouter
