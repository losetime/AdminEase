<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    :maskClosable="false"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol" labelAlign="left">
      <a-form-item label="规则名称" v-bind="validateInfos.name">
        <a-input v-model:value="detailInfo.name" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="正偏移量" v-bind="validateInfos.zheng_offset">
        <a-input-number v-model:value="detailInfo.zheng_offset" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="负偏移量" v-bind="validateInfos.fu_offset">
        <a-input-number :precision="0" v-model:value="detailInfo.fu_offset" placeholder="请输入" />
      </a-form-item>
      <a-divider orientation="left" orientation-margin="0px">标准文件</a-divider>
      <a-form-item label="额定铁塔地址编码列数" v-bind="validateInfos.standard_address_col">
        <a-input-number :precision="0" v-model:value="detailInfo.standard_address_col" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="额定功率列数" v-bind="validateInfos.standard_rated_power_col">
        <a-input-number :precision="0" v-model:value="detailInfo.standard_rated_power_col" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="设备型号列数" v-bind="validateInfos.standard_model_code_col">
        <a-input-number :precision="0" v-model:value="detailInfo.standard_model_code_col" placeholder="请输入" />
      </a-form-item>
      <a-divider orientation="left" orientation-margin="0px">对比文件</a-divider>
      <a-form-item label="实际使用铁塔地址编码列数" v-bind="validateInfos.contrast_address_col">
        <a-input-number :precision="0" v-model:value="detailInfo.contrast_address_col" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="实际使用电量(电费列数)" v-bind="validateInfos.contrast_electric_col">
        <a-input-number :precision="0" v-model:value="detailInfo.contrast_electric_col" placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { newRuleInfoRules } from '@/validator/dict'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiAddRule, apiUpdateRule } from '@/service/api/dict'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 8 }

const visible = ref<boolean>(false)

const title = ref<string>('新增')

const handleType = ref(actionTypeEnum.ADD)

const detailInfo = reactive({
  name: '',
  zheng_offset: '',
  fu_offset: '',
  standard_address_col: '',
  standard_rated_power_col: '',
  standard_model_code_col: '',
  contrast_address_col: '',
  contrast_electric_col: '',
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, newRuleInfoRules)

/**
 * @desc 初始化对话框
 */
const initModal = (type: number, initInfo: any) => {
  handleType.value = type
  if (type === actionTypeEnum.EDIT) {
    title.value = '编辑'
    Object.assign(detailInfo, initInfo)
  }
  visible.value = true
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    if (handleType.value === actionTypeEnum.ADD) {
      const { code } = await apiAddRule(detailInfo)
      if (code === 20001) {
        message.success('新增成功')
        props.handleRefresh()
      }
    } else {
      const { code } = await apiUpdateRule(detailInfo)
      if (code === 20001) {
        message.success('更新成功')
        props.getSourceData()
      }
    }
    handleCancel()
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
  title.value = '新增'
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.ant-input-number {
  width: 100%;
}
</style>
