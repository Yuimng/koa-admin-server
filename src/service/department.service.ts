import { departmentModel } from '../models'
import { buildTreeDepartment } from '../utils'

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
}

export default new DepartmentService()
