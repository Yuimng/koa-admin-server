export interface LoginParams {
  username: string
  password: string
  expires7d: boolean
}

export interface UserParams {
  username: string
  password: string
  deptCode: string
  roleId: number
  name: string
  email: string
  phone: string
  remark: string
}

export interface UpdateUserParams {
  id: number
  username: string
  deptCode: string
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
  deptCode: string
}

export interface RolePageParams extends PageParams {
  role: string
  isSuper: number
}

export interface Menu {
  id: number
  name: string
  path: string
  component?: string
  parentId: number
  sort: number
  meta: MetaProps
  createdAt: string
  children?: Menu[]
}

export interface MetaProps {
  icon: string
  title: string
  isLink: boolean
  isEnable: boolean
  isAffix: boolean
  isKeepAlive: boolean
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

export interface DepartmentList {
  name: string
  code: string
  parentCode: string
  sort: number
  isEnable: number
  createdAt: string
  children?: DepartmentList[]
}
