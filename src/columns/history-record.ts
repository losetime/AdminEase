// 历史记录
export const historyRecordColumns = [
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '用户ID',
    dataIndex: 'user_id',
    key: 'user_id',
  },
  {
    title: '用户昵称',
    key: 'nickname',
    dataIndex: 'nickname',
  },
  {
    title: '用户账号',
    key: 'username',
    dataIndex: 'username',
  },
  {
    title: '分析时间',
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 历史记录详情
export const historyRecordDetailColumns = [
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '铁塔地址编码',
    dataIndex: 'address',
    key: 'address',
    width: 160,
  },
  {
    title: '设备总额定功率',
    key: 'rated_power',
    dataIndex: 'rated_power',
  },
  {
    title: '额定电量(电费)',
    key: 'rated_electric',
    dataIndex: 'rated_electric',
  },
  {
    title: '总使用电量(电费)',
    key: 'all_electric',
    dataIndex: 'all_electric',
  },
  {
    title: '偏移量',
    key: 'offset',
    dataIndex: 'offset',
  },
]
