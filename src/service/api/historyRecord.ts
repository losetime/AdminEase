import { $http } from '../http/index'

enum Api {
  getHistoryRecordList = '/history/list',
  addHistoryRecord = '/history/add',
}

// -------------------------------------- 铁塔地址编码 -----------------------------------------------

/**
 * @desc: 获取列表
 */
export function apiGetHistoryRecordList(params: any): Promise<any> {
  return $http.request({
    url: Api.getHistoryRecordList,
    method: 'POST',
    data: params,
  })
}

/**
 * @desc: 新增信息
 */
export function apiAddHistoryRecord(params: any): Promise<any> {
  return $http.uploadFiles({
    url: Api.addHistoryRecord,
    method: 'POST',
    data: params,
  })
}
