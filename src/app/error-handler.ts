// import { logger } from './logger'
import { Context } from 'koa'
import { ERROR_TYPES } from '../constant'

export const errorHandler = (error: { message: string }, ctx: Context) => {
  let status: number, msg: string

  switch (error.message) {
    case ERROR_TYPES.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      msg = ERROR_TYPES.NAME_OR_PASSWORD_IS_REQUIRED
      break
    case ERROR_TYPES.USER_ALREADY_EXISTS:
      status = 409 // Conflict
      msg = ERROR_TYPES.USER_ALREADY_EXISTS
      break
    case ERROR_TYPES.USER_NOT_EXISTS:
      status = 400 // Wrong
      msg = ERROR_TYPES.USER_NOT_EXISTS
      break
    case ERROR_TYPES.PASSWORD_IS_INCORRECT:
      status = 400 // Wrong
      msg = ERROR_TYPES.PASSWORD_IS_INCORRECT
      break
    case ERROR_TYPES.UNAUTHORIZATION:
      status = 401 // Authorization
      msg = ERROR_TYPES.UNAUTHORIZATION
      break
    case ERROR_TYPES.UNPERMISSION:
      status = 401 // Permission
      msg = ERROR_TYPES.UNPERMISSION
      break
    case ERROR_TYPES.MENU_NOT_EXISTS:
      status = 400 // No menu
      msg = ERROR_TYPES.MENU_NOT_EXISTS
      break
    case ERROR_TYPES.ADMINISTRATION_CANNOT_BE_DELETED:
      status = 401
      msg = ERROR_TYPES.ADMINISTRATION_CANNOT_BE_DELETED
      break
    case ERROR_TYPES.ADMINISTRATION_CANNOT_BE_MODIFIED:
      status = 401
      msg = ERROR_TYPES.ADMINISTRATION_CANNOT_BE_MODIFIED
      break
    case ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_MODIFIED:
      status = 401
      msg = ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_MODIFIED
      break
    case ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_DELETED:
      status = 401
      msg = ERROR_TYPES.INITIAL_ROLE_CANNOT_BE_DELETED
      break
    case ERROR_TYPES.ROLE_ALREADY_EXISTS:
      status = 409
      msg = ERROR_TYPES.ROLE_ALREADY_EXISTS
      break
    case ERROR_TYPES.ROLE_NOT_EXISTS:
      status = 400
      msg = ERROR_TYPES.ROLE_NOT_EXISTS
      break
    case ERROR_TYPES.ROLE_HAS_ASSOCIATED_USERS:
      status = 400
      msg = ERROR_TYPES.ROLE_HAS_ASSOCIATED_USERS
      break
    case ERROR_TYPES.ADMINISTRATION_CANNOT_BE_SELECT:
      status = 401
      msg = ERROR_TYPES.ADMINISTRATION_CANNOT_BE_SELECT
      break
    default:
      status = 404
      msg = error.message // 默认返回的错误信息
  }
  ctx.body = {
    code: status || -1,
    data: null,
    msg: msg || '失败',
  }

  // 保证返回状态是 200, 这样前端不会抛出异常
  ctx.status = 200
}
