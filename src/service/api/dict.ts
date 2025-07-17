import { $http } from '../http/index'

enum Api {
  getAddressList = '/dict/address/list',
  addAddress = '/dict/address/addone',
  addAddressUploadFile = '/dict/address/addbyfile',
  updateAddress = '/dict/address/updateAdress',
  addressStatus = '/dict/address/updateStatus',

  getEquipmentList = '/dict/equip/list',
  addEquipment = '/dict/equip/addone',
  addEquipmentUploadFile = '/dict/equip/addbyfile',
  updateEquipment = '/dict/equip/updateEquip',
  equipmentStatus = '/dict/equip/updateStatus',

  getRuleList = '/dict/rule/list',
  addRule = '/dict/rule/addone',
  updateRule = '/dict/rule/updateRule',
  ruleStatus = '/dict/rule/updateStatus',
}

// -------------------------------------- 铁塔地址编码 -----------------------------------------------

/**
 * @desc: 获取列表
 */
export function apiGetAddressList(params: any): Promise<any> {
  return $http.request({
    url: Api.getAddressList,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息
 */
export function apiAddAddress(params: any): Promise<any> {
  return $http.request({
    url: Api.addAddress,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息-上传文件
 */
export function apiAddAddressUploadFile(params: any): Promise<any> {
  return $http.uploadFiles({
    url: Api.addAddressUploadFile,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 更新信息
 */
export function apiUpdateAddress(params: any): Promise<any> {
  return $http.request({
    url: Api.updateAddress,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 状态
 */
export function apiAddressStatus(params: { address: string; status: number }): Promise<any> {
  return $http.request({
    url: Api.addressStatus,
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 设备信息 -----------------------------------------------

/**
 * @desc: 获取列表
 */
export function apiGetEquipmentList(params: any): Promise<any> {
  return $http.request({
    url: Api.getEquipmentList,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息
 */
export function apiAddEquipment(params: any): Promise<any> {
  return $http.request({
    url: Api.addEquipment,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息-表格上传
 */
export function apiAddEquipmentUploadFile(params: any): Promise<any> {
  return $http.uploadFiles({
    url: Api.addEquipmentUploadFile,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 更新信息
 */
export function apiUpdateEquipment(params: any): Promise<any> {
  return $http.request({
    url: Api.updateEquipment,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 状态
 */
export function apiEquipmentStatus(params: { address: string; status: number }): Promise<any> {
  return $http.request({
    url: Api.equipmentStatus,
    method: 'POST',
    data: params,
  })
}

// -------------------------------------- 规则信息 -----------------------------------------------

/**
 * @desc: 获取列表
 */
export function apiGetRuleList(params: any): Promise<any> {
  return $http.request({
    url: Api.getRuleList,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息
 */
export function apiAddRule(params: any): Promise<any> {
  return $http.request({
    url: Api.addRule,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 更新信息
 */
export function apiUpdateRule(params: any): Promise<any> {
  return $http.request({
    url: Api.updateRule,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 状态
 */
export function apiRuleStatus(params: { address: string; status: number }): Promise<any> {
  return $http.request({
    url: Api.ruleStatus,
    method: 'POST',
    data: params,
  })
}
