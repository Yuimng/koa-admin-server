import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import { corsHandler } from './cors'
import { errorHandler } from './error-handler'
import { router } from '../router'

// import synchonize from '../models/sync'
// synchonize()

const app = new Koa()

// ctx.body
app.use(bodyParser())

app.use(cors(corsHandler))

// errorHandler
app.on('error', errorHandler)

// 导入路由
app.use(router.routes())
app.use(router.allowedMethods())

export default app
