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
      <a-form-item label="设备信息表格" v-bind="validateInfos.fileList">
        <a-upload v-model:file-list="detailInfo.fileList" :before-upload="() => false">
          <a-button>
            <upload-outlined />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="设备型号编码" v-bind="validateInfos.model_code">
        <a-input v-model:value="detailInfo.model_code" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="额定功率(W)" v-bind="validateInfos.rated_power">
        <a-input-number v-model:value="detailInfo.rated_power" :precision="0" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="额定功率系数" v-bind="validateInfos.rated_power_coefficient">
        <a-input-number v-model:value="detailInfo.rated_power_coefficient" :precision="4" placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { newEquipmentRules } from '@/validator/dict'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiAddEquipment, apiUpdateEquipment, apiAddEquipmentUploadFile } from '@/service/api/dict'
import { UploadOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 5 }

const visible = ref<boolean>(false)

const title = ref<string>('新增')

const handleType = ref(actionTypeEnum.ADD)

const detailInfo = reactive({
  model_code: '',
  rated_power: '',
  rated_power_coefficient: '',
  fileList: [],
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, newEquipmentRules)

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
const handleConfirm = async () => {
  if (detailInfo.fileList.length > 0) {
    const { code } = await apiAddEquipmentUploadFile({
      file: detailInfo.fileList[0].originFileObj,
    })
    if (code === 20001) {
      message.success('新增成功')
      props.handleRefresh()
      handleCancel()
    }
  } else {
    validate().then(async () => {
      if (handleType.value === actionTypeEnum.ADD) {
        const { code } = await apiAddEquipment(detailInfo)
        if (code === 20001) {
          message.success('新增成功')
          props.handleRefresh()
        }
      } else {
        const { code } = await apiUpdateEquipment(detailInfo)
        if (code === 20001) {
          message.success('更新成功')
          props.getSourceData()
        }
      }
      handleCancel()
    })
  }
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
