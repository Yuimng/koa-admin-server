import { Op } from 'sequelize'
import { roleModel, userRoleModel } from '../models'
import { RolePageParams, RoleParams, UpdateRoleParams } from '../types'

class RoleService {
  async getRoleById(id: number) {
    try {
      const result = await roleModel.findOne({
        where: {
          id: id,
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

  async getRoleAllList() {
    try {
      const result = await roleModel.findAll({
        attributes: {
          exclude: ['updatedAt'],
        },
      })
      return result
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

  async updateRole(params: UpdateRoleParams) {
    try {
      const { id, role, roleName, isSuper, remark } = params
      await roleModel.update(
        {
          role,
          roleName,
          isSuper,
          remark,
        },
        {
          where: {
            id,
          },
        }
      )
      return 'ok'
    } catch (error) {
      return new Error(error)
    }
  }

  async deleteRole(id: number) {
    try {
      await roleModel.destroy({
        where: {
          id,
        },
      })
      return 'ok'
    } catch (error) {
      return new Error(error)
    }
  }

  async getUserByRoleId(roleId: number) {
    try {
      const userIds = await userRoleModel.findAll({
        attributes: ['userId'],
        where: {
          roleId: roleId,
        },
      })
      return userIds
    } catch (error) {
      return new Error(error)
    }
  }
}

export default new RoleService()
