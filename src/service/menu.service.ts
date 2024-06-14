import { Op } from 'sequelize'
import { menuModel, roleMenuModel, roleModel } from '../models'
import { formatMenus } from '../utils'
import { MenuParams } from '../types'

class MenuService {
  async getMenuListByRoleId(
    roleId: number,
    search: { name: string; isEnable: number }
  ) {
    try {
      const whereConditions: any = {
        // 名称是title
        title: {
          [Op.like]: `%${search.name || ''}%`,
        },
      }
      if (search.isEnable === 0 || search.isEnable === 1) {
        whereConditions.isSuper = search.isEnable
      }

      const roleWithMenus = await roleModel.findOne({
        where: {
          id: roleId,
        },
        include: [
          {
            model: menuModel,
            attributes: {
              exclude: ['updatedAt', 'deletedAt'],
            },
            where: whereConditions,
          },
        ],
      })
      if (roleWithMenus != null) {
        const { sys_menus } = roleWithMenus as any
        return sys_menus ? formatMenus(sys_menus) : []
      } else {
        return []
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAllMenuList() {
    try {
      const menus = await menuModel.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
      })
      return formatMenus(menus)
    } catch (error) {
      console.log(error)
    }
  }

  async getMenuByName(name: string) {
    try {
      const res = await menuModel.findOne({
        where: {
          name,
        },
      })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  async addMenu(menu: MenuParams, roleId: number) {
    try {
      const newMenu = await menuModel.create({
        ...menu,
      })
      const res = await roleMenuModel.create({
        roleId,
        menuId: newMenu.dataValues.id,
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MenuService()
