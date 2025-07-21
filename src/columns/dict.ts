// 铁塔地址编码
export const addressEncodeColumns = [
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '铁塔地址编码',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '是否启用',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '添加时间',
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
  },
  {
    title: '最后一次操作时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 设备信息
export const equipmentColumns = [
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '设备型号编码',
    dataIndex: 'model_code',
    key: 'model_code',
  },
  {
    title: '额定功率(W)',
    key: 'rated_power',
    dataIndex: 'rated_power',
  },
  {
    title: '额定功率系数',
    key: 'rated_power_coefficient',
    dataIndex: 'rated_power_coefficient',
  },
  {
    title: '是否启用',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '添加时间',
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
  },
  {
    title: '最后一次操作时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 规则信息
export const rulesColumns = [
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '规则名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '是否启用',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: '添加时间',
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
  },
  {
    title: '最后一次操作时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]
