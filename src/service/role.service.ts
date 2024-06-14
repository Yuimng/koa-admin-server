import { Op } from 'sequelize'
import { roleMenuModel, roleModel, userRoleModel } from '../models'
import { RolePageParams, RoleParams, UpdateRoleParams } from '../types'
import sequelizeBase from '../config/mysql'

class RoleService {
  async getRoleById(id: number) {
    try {
      const result = await roleModel.findOne({
        where: {
          id: id,
        },
      })
      return result ? result.dataValues : null
    } catch (error) {
      console.log(error)
    }
  }
  async getRoleByName(name: string) {
    try {
      const result = await roleModel.findOne({
        where: {
          role: name,
        },
      })
      return result ? result.dataValues : null
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }

  async addNewRole(params: RoleParams) {
    try {
      await sequelizeBase.transaction(async (t: any) => {
        const newRole = await roleModel.create({
          role: params.role,
          roleName: params.roleName,
          isSuper: params.isSuper,
          remark: params.remark,
        })
        const arr = params.menus.map((menuId: number) => {
          return {
            roleId: (newRole as any).id,
            menuId: menuId,
          }
        })
        await roleMenuModel.bulkCreate(arr, { transaction: t })
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async updateRole(params: UpdateRoleParams) {
    try {
      await sequelizeBase.transaction(async (t: any) => {
        const { id, role, roleName, isSuper, remark, menus } = params
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
        // 先清除
        await roleMenuModel.destroy({
          where: {
            roleId: id,
          },
          force: true,
          transaction: t,
        })
        const arr = menus.map((menuId: number) => {
          return {
            roleId: id,
            menuId: menuId,
          }
        })
        await roleMenuModel.bulkCreate(arr, { transaction: t })
      })
      return 'ok'
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
      console.log(error)
    }
  }
}

export default new RoleService()
