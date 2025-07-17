import { ref } from 'vue'
import { IncidentTypeOptions, OperateLogAbnormalOptions, BusinessTypeOptions } from '@/enums/settingEnum'
import { handleCustomRenderColumn } from '@/utils/base'

// -------------------------------------- 系统设置 -----------------------------------------------

// 用户管理
export const userColumns = (): any => {
  return [
    { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
    {
      title: '用户ID',
      key: 'user_id',
      dataIndex: 'user_id',
      resizable: true,
      width: 140,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '用户昵称',
      key: 'nickname',
      dataIndex: 'nickname',
      resizable: true,
      width: 120,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '登录账号',
      key: 'username',
      dataIndex: 'username',
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '密码',
      key: 'password',
      dataIndex: 'password',
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '停用原因',
      key: 'reason',
      dataIndex: 'reason',
      resizable: true,
      width: 100,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '注册时间',
      key: 'gmtCreate',
      dataIndex: 'gmtCreate',
      resizable: true,
      width: 160,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '停用时间',
      key: 'stop_time',
      dataIndex: 'stop_time',
      resizable: true,
      width: 160,
      ellipsis: true,
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 200,
    },
  ]
}

// 角色管理
export const roleColumns = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    key: 'roleId',
  },
  {
    title: '角色名称',
    key: 'roleName',
    dataIndex: 'roleName',
  },
  {
    title: '权限字符',
    key: 'roleKey',
    dataIndex: 'roleKey',
  },
  {
    title: '显示顺序',
    key: 'roleSort',
    dataIndex: 'roleSort',
  },
  {
    title: '状态',
    key: 'slotOne',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 菜单管理
export const menuColumns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName',
  },
  {
    title: '图标',
    key: 'icon',
    dataIndex: 'icon',
    width: 180,
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
    width: 80,
  },
  {
    title: '权限标识',
    key: 'perms',
    dataIndex: 'perms',
    width: 100,
  },
  {
    title: '组件路径',
    key: 'component',
    dataIndex: 'component',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 部门管理
export const deptColumns = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
  },
  {
    title: '排序',
    key: 'orderNum',
    dataIndex: 'orderNum',
  },
  {
    title: '状态',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
]

// 操作日志
export const operateLogColumn = ref([
  {
    title: '操作人',
    key: 'operName',
    dataIndex: 'operName',
    resizable: true,
    width: 120,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '事件类型',
    key: 'logEventType',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(IncidentTypeOptions, record.logEventType),
    resizable: true,
    width: 120,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作菜单',
    key: 'title',
    dataIndex: 'title',
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '请求方法',
    key: 'requestMethod',
    dataIndex: 'requestMethod',
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '业务类型',
    key: 'businessType',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(BusinessTypeOptions, record.businessType),
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '是否异常',
    key: 'status',
    customRender: ({ record }: { record: any }) => handleCustomRenderColumn(OperateLogAbnormalOptions, record.status),
    resizable: true,
    width: 200,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作时间',
    key: 'operTime',
    dataIndex: 'operTime',
    resizable: true,
    width: 160,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作IP',
    key: 'operIp',
    dataIndex: 'operIp',
    resizable: true,
    width: 160,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 100,
  },
])

// 限制访问时间
export const accessControlTimeColumn = ref([
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '限制访问时间',
    key: 'accessControlTime',
    customRender: ({ record }: { record: any }) => record.startTime + ' - ' + record.endTime,
    resizable: true,
    width: 600,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    resizable: true,
    width: 400,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
])

// 限制访问IP
export const accessControlIPColumn = ref([
  { title: '序号', key: 'serialNumber', width: 60, align: 'center' },
  {
    title: '限制访问IP',
    key: 'ip',
    dataIndex: 'ip',
    resizable: true,
    width: 600,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    resizable: true,
    width: 400,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
  },
])
