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
      <a-form-item label="地址编码表格" v-bind="validateInfos.fileList">
        <a-upload v-model:file-list="detailInfo.fileList" :before-upload="() => false">
          <a-button>
            <upload-outlined />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="铁塔地址编码" v-bind="validateInfos.address">
        <a-input v-model:value="detailInfo.address" placeholder="请输入" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { newAddressEncodeRules } from '@/validator/dict'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiAddAddress, apiAddAddressUploadFile, apiUpdateAddress } from '@/service/api/dict'
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
  address: '',
  fileList: [],
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, newAddressEncodeRules)

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
    const { code } = await apiAddAddressUploadFile({
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
        const { code } = await apiAddAddress(detailInfo)
        if (code === 20001) {
          message.success('新增成功')
          props.handleRefresh()
        }
      } else {
        const { code } = await apiUpdateAddress(detailInfo)
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

<style lang="less" scoped></style>
