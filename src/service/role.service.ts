import { Op } from 'sequelize'
import { roleModel } from '../models'
import { RolePageParams } from '../types'

class RoleService {
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
}

export default new RoleService()
