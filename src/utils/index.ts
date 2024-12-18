import { Model } from 'sequelize'
import { Menu, DepartmentList } from '../types'
import bcrypt from 'bcrypt'

/**
 * @description: 密码加密
 * @param {string} password
 * @return {*}
 */
export const PasswordToHash = (password: string) => {
  const saltRounds = 10
  const hashedPassword = bcrypt.hashSync(password, saltRounds)
  return hashedPassword
}

/**
 * @description: 格式化菜单
 * @param {any[]} menus
 * @return {*}
 */
export const formatMenus = (menus: any[]) => {
  const menuList: Menu[] = []
  menus.forEach((menu) => {
    menuList.push({
      id: menu.id,
      name: menu.name,
      path: menu.path,
      component: menu.path + '/index',
      parentId: menu.parentId,
      sort: menu.sort,
      meta: {
        // 以下数据转为meta对象的值
        title: menu.title,
        icon: menu.icon,
        isEnable: menu.isEnable === 1 ? true : false,
        isLink: menu.isLink === 1 ? true : false,
        isAffix: menu.isAffix === 1 ? true : false,
        isKeepAlive: menu.isKeepAlive === 1 ? true : false,
      },
      createdAt: menu.createdAt,
    })
  })
  // 排序
  menuList.sort((a, b) => a.sort - b.sort)
  // 将排序好的所有菜单根据 parentId 转为树形菜单
  return buildTreeMenu(menuList)
}
/**
 * 构建树形菜单
 * @param menus Menu[] 平铺菜单
 * @returns Menu[] 树形菜单
 */
function buildTreeMenu(menus: Menu[]): Menu[] {
  const menuMap: { [id: number]: Menu } = {} // 使用索引签名定义对象类型
  const roots: Menu[] = [] // 根节点数组类型明确为Menu[]
  // 预处理：将所有菜单项放入map中，便于查找
  menus.forEach((menu) => {
    menu.children = [] // 初始化children属性，即使没有子菜单也是个空数组
    menuMap[menu.id] = menu
  })
  // 遍历菜单，构建树结构
  menus.forEach((menu) => {
    if (menu.parentId !== 0) {
      // 查找父级菜单，有则将当前菜单放入父级菜单的children中
      const parent = menuMap[menu.parentId]
      if (parent) {
        parent.children.push(menu)
      } else {
        // 找不到父级菜单，说明有孤立菜单，将其放入根节点数组中（搜索的时候可能出现）
        roots.push(menu)
      }
    } else {
      // parentId为0，说明是根节点
      roots.push(menu)
    }
  })
  return roots // 返回根节点数组，即构建好的树形菜单
}

/**
 * 构建树形部门列表
 * @param
 * @returns
 */
export const buildTreeDepartment = (departments: any[]): DepartmentList[] => {
  const map: { [key: string]: DepartmentList } = {}
  const tree: DepartmentList[] = []

  // 创建一个映射，以便快速查找每个部门   数据库数据结构 .dataValues
  departments.forEach((department) => {
    map[department.id] = { ...department.dataValues, children: [] }
  })

  // 构建树结构
  departments.forEach((department) => {
    if (department.parentId === 0) {
      // 如果 parentId === 0，则该部门是根节点
      tree.push(map[department.id])
    } else {
      // 否则，将该部门添加到其父部门的 children 数组中
      const parent = map[department.parentId]
      if (parent) {
        parent.children.push(map[department.id])
      }
    }
  })

  return tree
}

/**
 * 获取指定节点的所有子孙节点
 * @param {Array} nodes 节点数组
 * @param {number} id 指定节点 ID
 * @returns {Array} 所有子孙节点
 */

interface Node {
  id: number
  parentId: number
}

/**
 * 将 将数据库查询findAll的 数组中的 dataValues 转换为对象数组
 * @param {Model<any, any>[]}
 * @return {T[]}
 */
export function convertRawArray<T>(modelFindAll: Model<any, any>[]): T[] {
  return modelFindAll.map((item) => item.dataValues)
}

export function getDescendants<T extends Node>(nodes: T[], id: number): T[] {
  // 获取该节点的所有子节点
  const childNodes = nodes.filter((n) => n.parentId === id)
  // 如果没有子节点，则返回空数组
  if (childNodes.length === 0) {
    return []
  }
  // 递归地获取每个子节点的子孙节点，并将它们拼接到当前数组中
  return childNodes.concat(
    childNodes.map((node) => getDescendants(nodes, node.id)).flat()
  )
}
