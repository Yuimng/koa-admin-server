import { Op } from 'sequelize'
import { roleModel } from '../models'
import { RolePageParams, RoleParams } from '../types'

class RoleService {
  async getRoleByName(name: string) {
    try {
      const result = await roleModel.findOne({
        where: {
          role: name,
        },
      })
      if (result) {
        return result.dataValues
      } else {
        return null
      }
    } catch (error) {
      return new Error(error)
    }
  }
  async getRoleList(params: RolePageParams) {
    try {
      const whereConditions: any = {
        role: {
          [Op.like]: '%' + params.role + '%',
        },
      }
      if (params.isSuper === 0 || params.isSuper === 1) {
        whereConditions.isSuper = params.isSuper
      }
      const { count, rows } = await roleModel.findAndCountAll({
        where: whereConditions,
        attributes: {
          exclude: ['updatedAt'],
        },
        offset: params.pageSize * (params.pageNo - 1),
        limit: params.pageSize,
      })
      return {
        count,
        rows,
      }
    } catch (error) {
      return new Error(error)
    }
  }

  async addNewRole(params: RoleParams) {
    try {
      await roleModel.create({
        role: params.role,
        roleName: params.roleName,
        isSuper: params.isSuper,
        remark: params.remark,
      })
      return 'ok'
    } catch (error) {
      return new Error(error)
    }
  }
}

export default new RoleService()
