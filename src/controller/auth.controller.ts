import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config'
import { LoginParams } from '../types'

class AuthController {
  async login(ctx: Context) {
    const { id, username } = ctx.user
    const { expires7d } = ctx.request.body as LoginParams
    // token 有效期
    const expires = expires7d ? '7d' : '24h'

    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: expires,
      algorithm: 'RS256',
    })

    ctx.body = {
      code: 200,
      data: { id, username, token, expires: getTimestamps(expires === '7d') },
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

// 秒级时间戳
function getTimestamps(expires7d: boolean) {
  const now = Date.now()
  if (expires7d) {
    return Math.floor((now + 7 * 24 * 60 * 60 * 1000) / 1000)
  } else {
    return Math.floor((now + 24 * 60 * 60 * 1000) / 1000)
  }
}

export default new AuthController()
