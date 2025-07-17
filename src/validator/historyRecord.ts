/**
 * 历史记录表单验证规则
 */
import { reactive } from 'vue'

// ---------------------------------- 铁塔地址编码 ------------------------------------------

export const newHistoryRecordRules = reactive({
  biaozhunfile: [{ required: true, type: 'array', message: '标准文件不能为空', trigger: 'change' }],
  duibifile: [{ required: true, type: 'array', message: '对比文件不能为空', trigger: 'change' }],
})
