import { Menu } from '../types'
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
