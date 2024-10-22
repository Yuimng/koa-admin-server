import { DeptParams, UpdateDeptParams } from 'src/types'
import { departmentModel, userModel } from '../models'
import { buildTreeDepartment } from '../utils'
import { Op } from 'sequelize'

class DepartmentService {
  async getAllDepartmentList() {
    try {
      const departments = await departmentModel.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [['sort', 'ASC']],
      })
      return buildTreeDepartment(departments)
    } catch (error) {
      console.log(error)
    }
  }

  async getDeptById(id: number) {
    try {
      const res = await departmentModel.findOne({
        where: {
          id,
        },
      })
      return res ? res.dataValues : null
    } catch (error) {
      console.log(error)
    }
  }

  async addDept(dept: DeptParams) {
    try {
      await departmentModel.create({
        ...dept,
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async updateDept(dept: UpdateDeptParams) {
    try {
      const { id, ...rest } = dept
      await departmentModel.update(
        {
          ...rest,
        },
        {
          where: {
            id,
          },
        }
      )
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }

  async deleteDept(id: number) {
    // 软删除已开启
    try {
      const user = await userModel.findOne({
        where: {
          deptId: id,
        },
      })
      // 存在关联用户
      if (user) {
        return false
      } else {
        await departmentModel.destroy({
          where: {
            id,
          },
        })
        return true
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new DepartmentService()
