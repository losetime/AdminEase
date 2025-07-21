<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :maskClosable="false"
    :afterClose="handleCancel"
    :confirmLoading="loading"
    @ok="handleConfirm"
    width="600px"
  >
    <a-form :label-col="labelCol" labelAlign="left">
      <a-form-item label="标准文件" v-bind="validateInfos.biaozhunfile">
        <a-upload v-model:file-list="detailInfo.biaozhunfile" accept=".xlsx, .xls" :before-upload="() => false">
          <a-button>
            <upload-outlined />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="对比文件" v-bind="validateInfos.duibifile">
        <a-upload v-model:file-list="detailInfo.duibifile" accept=".xlsx, .xls" :before-upload="() => false">
          <a-button>
            <upload-outlined />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { newHistoryRecordRules } from '@/validator/historyRecord'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiAddHistoryRecord } from '@/service/api/historyRecord'
import { UploadOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 5 }

const visible = ref<boolean>(false)

const title = ref<string>('新增数据校验')

const loading = ref<boolean>(false)

const handleType = ref(actionTypeEnum.ADD)

const detailInfo = reactive({
  biaozhunfile: [],
  duibifile: [],
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, newHistoryRecordRules)

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
  validate().then(async () => {
    try {
      loading.value = true
      const { code } = await apiAddHistoryRecord({
        biaozhunfile: detailInfo.biaozhunfile[0].originFileObj,
        duibifile: detailInfo.duibifile[0].originFileObj,
      })
      loading.value = false
      if (code === 20001) {
        message.success('新增成功')
        props.handleRefresh()
        handleCancel()
      }
    } catch (e) {
      loading.value = false
    }
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
  title.value = '新增数据校验'
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped></style>
