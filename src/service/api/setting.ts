import { $http } from '../http/index'

enum Api {
  getUserList = '/account/list',
  addUser = '/account/register',
  updateUser = '/account/update',
  userStatus = '/account/status',
}

// -------------------------------------- 用户管理 -----------------------------------------------

/**
 * @desc: 获取用户列表
 */
export function apiGetUserList(params: any): Promise<any> {
  return $http.request({
    url: Api.getUserList,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增用户信息
 */
export function apiAddUser(params: any): Promise<any> {
  return $http.request({
    url: Api.addUser,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 更新用户信息
 */
export function apiUpdateUser(params: any): Promise<any> {
  return $http.request({
    url: Api.updateUser,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 用户状态
 */
export function apiUserStatus(params: { username: string; status: number }): Promise<any> {
  return $http.request({
    url: Api.userStatus,
    method: 'POST',
    data: params,
  })
}