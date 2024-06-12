import Router from 'koa-router'

import authRouter from './auth.router'
import userRouter from './user.router'
import roleRouter from './role.router'
// import menuRouter from './menu.router'

// 路由
export const router = new Router()

router.use(authRouter.routes())
router.use(userRouter.routes())
router.use(roleRouter.routes())
// router.use(menuRouter.routes())
