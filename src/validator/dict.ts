/**
 * 字典管理表单验证规则
 */
import { reactive } from 'vue'

// ---------------------------------- 铁塔地址编码 ------------------------------------------

export const newAddressEncodeRules = reactive({
  address: [{ required: true, message: '铁塔地址编码不能为空', trigger: 'change' }],
})

// ---------------------------------- 设备信息 ------------------------------------------

export const newEquipmentRules = reactive({
  model_code: [{ required: true, message: '设备型号编码不能为空', trigger: 'change' }],
  rated_power: [
    { required: true, message: '额定功率不能为空', trigger: 'change' },
    { type: 'number', max: 9999, message: '额定功率只能输入正整数，最大9999', trigger: 'change' },
  ],
  rated_power_coefficient: [
    { required: true, message: '额定功率系数不能为空', trigger: 'change' },
    { type: 'number', min: 0.0001, max: 100, message: '系数0-100，不能为0，最多4位小数', trigger: 'change' },
  ],
})

// ---------------------------------- 规则信息 ------------------------------------------

export const newRuleInfoRules = reactive({
  name: [
    { required: true, message: '规则名称不能为空', trigger: 'change' },
    { max: 20, message: '最多20个字符', trigger: 'change' },
  ],
  zheng_offset: [
    { required: true, message: '正偏移量不能为空', trigger: 'change' },
    { type: 'number', min: 0, max: 100, message: '正偏移量范围为0-100，包括0', trigger: 'change' },
  ],
  fu_offset: [
    { required: true, message: '负偏移量不能为空', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '负偏移量范围为0-100，不包括0', trigger: 'change' },
  ],
  standard_address_col: [
    { required: true, message: '额定铁塔地址编码列数不能为空', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '范围在1-100, 必须为整数', trigger: 'change' },
  ],
  standard_rated_power_col: [
    { required: true, message: '额定功率列数不能为空', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '范围在1-100, 必须为整数', trigger: 'change' },
  ],
  standard_model_code_col: [
    { required: true, message: '设备型号列数', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '范围在1-100, 必须为整数', trigger: 'change' },
  ],
  contrast_address_col: [
    { required: true, message: '实际使用铁塔地址编码列数不能为空', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '范围在1-100, 必须为整数', trigger: 'change' },
  ],
  contrast_electric_col: [
    { required: true, message: '实际使用电量不能为空', trigger: 'change' },
    { type: 'number', min: 1, max: 100, message: '范围在1-100, 必须为整数', trigger: 'change' },
  ],
})