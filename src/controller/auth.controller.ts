import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'
import { LoginParams } from '../types'

class AuthController {
  async login(ctx: Context) {
    const { id, userName } = ctx.user
    const { expires7d } = ctx.request.body as LoginParams
    // token 有效期
    const expires = expires7d ? '7d' : '24h'

    const token = jwt.sign({ id, userName }, PRIVATE_KEY, {
      expiresIn: expires,
      algorithm: 'RS256',
    })

    ctx.body = {
      code: 200,
      data: { id, user_name: userName, token },
      msg: '登录成功',
    }
  }

  async success(ctx: Context) {
    const user = ctx.user
    ctx.body = {
      code: 200,
      data: user,
      msg: '授权成功',
    }
  }
}

export default new AuthController()
