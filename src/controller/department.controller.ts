import { Context } from 'koa'

import departmentService from '../service/department.service'
import { DeptParams, FlatDept, UpdateDeptParams } from '../types'
import Joi from 'joi'
import { ERROR_TYPES } from '../constant'
import { convertRawArray, getDescendants } from '../utils'

class DepartmentController {
  async allDepartmentList(ctx: Context) {
    const list = await departmentService.getAllDepartmentList()
    ctx.body = {
      code: 200,
      data: list,
      msg: '获取部门列表成功',
    }
  }

  async addDepartment(ctx: Context) {
    const deptParam = ctx.request.body as DeptParams
    const schema = Joi.object({
      name: Joi.string().required(),
      parentId: Joi.number().required(),
      sort: Joi.number().empty(1),
      isEnable: Joi.number().valid(0, 1).empty(0),
    })
    try {
      await schema.validateAsync(deptParam)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const result = await departmentService.addDept(deptParam)

    ctx.body = {
      code: 200,
      data: result,
      msg: '添加部门成功',
    }
  }

  async updateDepartment(ctx: Context) {
    const deptParam = ctx.request.body as UpdateDeptParams
    const schema = Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      parentId: Joi.number().required(),
      sort: Joi.number().empty(1),
      isEnable: Joi.number().valid(0, 1).empty(0),
    })
    try {
      await schema.validateAsync(deptParam)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const flatDepts = await departmentService.getAllFlatDepts()
    const rewDepts = convertRawArray<FlatDept>(flatDepts)

    const nowAllowIds = getDescendants(rewDepts, deptParam.id).map(
      (item) => item.id
    )

    if ([deptParam.id, ...nowAllowIds].includes(deptParam.parentId)) {
      const error = new Error('上级部门不能本身和子节点')
      return ctx.app.emit('error', error, ctx)
    }

    const result = await departmentService.updateDept(deptParam)
    ctx.body = {
      code: 200,
      data: result,
      msg: '更新部门成功',
    }
  }

  async deleteDepartment(ctx: Context) {
    const body = ctx.request.body as { id: number }

    const schema = Joi.object({
      id: Joi.number().required(),
    })
    try {
      await schema.validateAsync(body)
    } catch (error) {
      return ctx.app.emit('error', error, ctx)
    }

    const dept = await departmentService.getDeptById(body.id)
    if (!dept) {
      const error = new Error(ERROR_TYPES.DEPT_NOT_EXISTS)
      return ctx.app.emit('error', error, ctx)
    }

    const result = await departmentService.deleteDept(body.id)
    if (!result) {
      const error = new Error(ERROR_TYPES.DEPT_HAS_ASSOCIATED_USERS)
      return ctx.app.emit('error', error, ctx)
    }
    ctx.body = {
      code: 200,
      data: result ? 'ok' : 'fail',
      msg: '删除部门成功',
    }
  }
}

export default new DepartmentController()
