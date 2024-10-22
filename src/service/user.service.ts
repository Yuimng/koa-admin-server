import { Op, Transaction } from 'sequelize'
import sequelizeBase from '../config/mysql'
import { departmentModel, roleModel, userModel, userRoleModel } from '../models'
import { UserPageParams, UpdateUserParams, UserParams } from '../types'

class UserService {
  async getUserByName(name: string) {
    try {
      const result = await userModel.findOne({
        where: {
          username: name,
        },
      })
      return result ? result.dataValues : null
    } catch (error) {
      console.log(error)
    }
  }

  async getUserInfoById(id: number) {
    try {
      const user = await userModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: roleModel, // 引入并关联 Role 模型
            attributes: ['id', 'role', 'roleName', 'isSuper'],
          },
        ],
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
        },
      })

      return user
        ? {
            ...user.dataValues,
            roleId: user.dataValues.sys_roles[0].id,
            role: user.dataValues.sys_roles[0].role,
            roleName: user.dataValues.sys_roles[0].roleName,
            isSuper: user.dataValues.sys_roles[0].isSuper,
            sys_roles: undefined, // 去除 sys_roles 属性
          }
        : null
    } catch (error) {
      console.log(error)
    }
  }

  async getUserList(params: UserPageParams) {
    try {
      // 根据params.deptCode 获取该部门及其以下所有部门code
      const deptCodes = await getDeptCodes(params.deptCode)
      const { count, rows } = await userModel.findAndCountAll({
        where: {
          username: {
            [Op.like]: '%' + params.username + '%',
          },
          deptCode: {
            [Op.in]: deptCodes,
          },
        },
        include: [
          {
            model: roleModel, // 引入并关联 Role 模型
            attributes: ['id', 'role', 'roleName'],
          },
        ],
        attributes: {
          exclude: ['password', 'updatedAt', 'deletedAt'],
        },
        offset: params.pageSize * (params.pageNo - 1),
        limit: params.pageSize,
      })
      const formatRows = rows.map((user) => {
        const userAny = user as any
        return {
          ...userAny.toJSON(),
          roleId: userAny.sys_roles[0].id,
          role: userAny.sys_roles[0].role,
          roleName: userAny.sys_roles[0].roleName,
          sys_roles: undefined, // 去除 sys_roles 属性
        }
      })
      return {
        count,
        rows: formatRows,
      }
    } catch (error) {
      console.log(error)
    }
  }

  async addNewUser(user: UserParams) {
    try {
      await sequelizeBase.transaction(async (t: any) => {
        const newUser = await userModel.create(
          {
            username: user.username,
            password: user.password,
            deptCode: user.deptCode || '100',
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            remark: user.remark || '',
          },
          { transaction: t }
        )
        await userRoleModel.create(
          {
            userId: newUser.dataValues.id,
            roleId: user.roleId,
          },
          { transaction: t }
        )
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async updateUser(user: UpdateUserParams) {
    try {
      await sequelizeBase.transaction(async (t: any) => {
        await userModel.update(
          {
            username: user.username,
            name: user.name,
            deptCode: user.deptCode,
            email: user.email,
            phone: user.phone,
            remark: user.remark,
          },
          { where: { id: user.id } }
        )
        const userRole = await userRoleModel.findOne({
          where: { userId: user.id },
        })
        if (userRole) {
          await userRoleModel.update(
            { roleId: user.roleId },
            { where: { userId: user.id } }
          )
        } else {
          await userRoleModel.create({
            userId: user.id,
            roleId: user.roleId,
          })
        }
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async deleteUser(id: number) {
    try {
      await sequelizeBase.transaction(async (t: Transaction) => {
        // 软删除
        await userModel.destroy({
          where: { id },
          force: true,
          transaction: t,
        })
        await userRoleModel.destroy({
          where: { userId: id },
          force: true,
          transaction: t,
        })
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }
}

export default new UserService()

/**
 * 获取部门及其子部门的所有部门code
 * @param deptCode 部门code
 * @returns 所有部门code
 */
async function getDeptCodes(deptCode: string): Promise<string[]> {
  const allDeptCodes: string[] = []

  async function getSubDeptCodes(code: string) {
    const subDepts = await departmentModel.findAll({
      attributes: ['code'],
      where: {
        parentCode: code,
      },
    })

    for (const subDept of subDepts) {
      allDeptCodes.push((subDept as any).code)
      await getSubDeptCodes((subDept as any).code)
    }
  }

  allDeptCodes.push(deptCode)
  await getSubDeptCodes(deptCode)

  return allDeptCodes
}
