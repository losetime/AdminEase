/**
 * 系统设置表单验证规则
 */
import { reactive } from 'vue'
import { normValidator } from './common'
import { notSpacingReg, phoneReg, emailReg, passwordReg } from '../enums/regExpEnum'

// ---------------------------------- 用户管理 ------------------------------------------

export const userDetailRules = reactive({
  nickname: [
    { required: true, message: '用户昵称不能为空', trigger: 'change' },
    { max: 10, message: '最多10个字符', trigger: 'change' },
  ],
  username: [
    { required: true, message: '登录账号不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) =>
        normValidator(
          rule,
          value,
          /^[a-zA-Z0-9]{1,20}$/,
          '登录账号只能为数字或者字母，可以纯数字或者纯字母，也可组合，最多20个字符',
        ),
      trigger: 'change',
    },
  ],
  password: [
    { required: true, message: '登录密码不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) =>
        normValidator(
          rule,
          value,
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
          '必须包含数字和字母的组合，最少6个字符，最多20个字符',
        ),
      trigger: 'change',
    },
  ],
  rule_id: [{ required: true, message: '请选择规则', trigger: 'change' }],
})

export const passwordRules = reactive({
  password: [
    { required: true, message: '用户新密码不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) =>
        normValidator(
          rule,
          value,
          passwordReg,
          '密码需要包含大小写字母、数字以及特殊字符三种及以上类型，且不能包含空格，长度为8-30位',
        ),
      trigger: 'change',
    },
  ],
})

// ---------------------------------- 角色管理 ------------------------------------------

export const roleDetailRules = reactive({
  roleName: [
    { required: true, message: '角色名称不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  roleKey: [
    { required: true, message: '权限名称不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  roleSort: [{ required: true, type: 'number', message: '角色顺序不能为空', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})

// ---------------------------------- 菜单管理 ------------------------------------------

export const menuDetailRules = reactive({
  parentId: [{ required: true, type: 'number', message: '上级菜单不能为空', trigger: 'change' }],
  menuType: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
  menuName: [
    { required: true, message: '菜单名称不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  orderNum: [{ required: true, type: 'number', message: '显示排序不能为空', trigger: 'change' }],
  visible: [{ required: true, message: '请选择显示状态', trigger: 'change' }],
  isFrame: [{ required: true, message: '请选择是否外链', trigger: 'change' }],
  path: [
    { required: true, message: '路由地址不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  routerName: [
    { required: true, message: '路由名称不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  level: [{ required: true, type: 'number', message: '路由等级不能为空', trigger: 'change' }],
  component: [
    { required: true, message: '组件路径不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  status: [{ required: true, message: '请选择菜单状态', trigger: 'change' }],
  isCache: [{ required: true, message: '请选择是否缓存', trigger: 'change' }],
})

// ---------------------------------- 部门管理 ------------------------------------------

export const deptDetailRules = reactive({
  parentId: [{ required: true, type: 'array', message: '请选择上级部门', trigger: 'change' }],
  deptName: [
    { required: true, message: '部门名称不能为空', trigger: 'change' },
    {
      validator: (rule: any, value: string) => normValidator(rule, value, notSpacingReg, '输入内容不能包含空格'),
      trigger: 'change',
    },
  ],
  orderNum: [{ required: true, type: 'number', message: '排序不能为空', trigger: 'change' }],
})

// ---------------------------------- 个人中心 ------------------------------------------

export const userCenterRules = reactive({
  oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'change' },
    {
      validator: (rule: any, value: string) =>
        normValidator(
          rule,
          value,
          passwordReg,
          '密码需要包含大小写字母、数字以及特殊字符三种及以上类型，且不能包含空格，长度为8-30位',
        ),
      trigger: 'change',
    },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'change' },
    {
      validator: (rule: any, value: string) =>
        normValidator(
          rule,
          value,
          passwordReg,
          '密码需要包含大小写字母、数字以及特殊字符三种及以上类型，且不能包含空格，长度为8-30位',
        ),
      trigger: 'change',
    },
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'change' }],
})
