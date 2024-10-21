import { Context } from 'koa'

import departmentService from '../service/department.service'

class DepartmentController {
  async allDepartmentList(ctx: Context) {
    const list = await departmentService.getAllDepartmentList()
    ctx.body = {
      code: 200,
      data: list,
      msg: '获取部门列表成功',
    }
  }
}

export default new DepartmentController()
