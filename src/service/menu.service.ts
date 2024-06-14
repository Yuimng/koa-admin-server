import { Op } from 'sequelize'
import { menuModel, roleMenuModel, roleModel } from '../models'
import { formatMenus } from '../utils'
import { MenuParams, UpdateMenuParams } from '../types'

class MenuService {
  async getMenuListByRoleId(
    roleId: number,
    search: { title: string; isEnable: number }
  ) {
    try {
      const whereConditions: any = {
        title: {
          [Op.like]: `%${search.title || ''}%`,
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
      return res ? res.dataValues : null
    } catch (error) {
      console.log(error)
    }
  }

  async getMenuById(id: number) {
    try {
      const res = await menuModel.findOne({
        where: {
          id,
        },
      })
      return res ? res.dataValues : null
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

  async updateMenu(menu: UpdateMenuParams) {
    try {
      const { id, ...rest } = menu
      await menuModel.update(
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

  async deleteMenu(id: number) {
    // 软删除已开启
    try {
      await menuModel.destroy({
        where: {
          id,
        },
      })
      // 删除角色菜单关联
      await roleMenuModel.destroy({
        where: {
          menuId: id,
        },
      })
      return 'ok'
    } catch (error) {
      console.log(error)
    }
  }
}

export default new MenuService()
