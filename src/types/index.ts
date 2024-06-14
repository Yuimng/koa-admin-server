export interface LoginParams {
  username: string
  password: string
  expires7d: boolean
}

export interface UserParams {
  username: string
  password: string
  roleId: number
  name: string
  email: string
  phone: string
  remark: string
}

export interface UpdateUserParams {
  id: number
  username: string
  roleId: number
  name: string
  email: string
  phone: string
  remark: string
}

export interface RoleParams {
  role: string
  roleName: string
  isSuper: number
  remark: string
  menus: number[]
}

export interface UpdateRoleParams extends RoleParams {
  id: number
}

export interface PageParams {
  pageNo: number
  pageSize: number
}

export interface UserPageParams extends PageParams {
  username: string
}

export interface RolePageParams extends PageParams {
  role: string
  isSuper: number
}

export interface MenuBase {
  id: number
  name: string
  path: string
  component?: string
  parentId: number
  sort: number
  meta: {
    icon: string
    title: string
    isLink: string
    isEnable: number
    isAffix: number
    isKeepAlive: number
  }
  createdAt: string
}

export interface Menu extends MenuBase {
  children?: Menu[]
}

export interface MenuParams {
  name: string
  path: string
  parentId: number
  sort: number
  icon: string
  title: string
  isLink: string
  isEnable: number
  isAffix: number
  isKeepAlive: number
}

export interface UpdateMenuParams extends MenuParams {
  id: number
}
