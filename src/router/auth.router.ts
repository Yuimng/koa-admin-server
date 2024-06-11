import Router from 'koa-router'

import authController from '../controller/auth.controller'

import { verifyAuth, verifyLogin } from '../middleware/auth.middleware'

const authRouter = new Router()

// 用户登录
authRouter.post('/login', verifyLogin, authController.login)

// 授权测试
authRouter.get('/test', verifyAuth, authController.success)

export default authRouter
