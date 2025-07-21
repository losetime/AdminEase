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
      <a-form-item label="禁用原因" v-bind="validateInfos.reason">
        <a-input v-model:value="detailInfo.reason" placeholder="请输入" />
      </a-form-item>
      <!--      <a-form-item label="停用时间" v-bind="validateInfos.stop_time">-->
      <!--        <a-date-picker-->
      <!--          v-model:value="detailInfo.stop_time"-->
      <!--          value-format="YYYY-MM-DD HH:mm:ss"-->
      <!--          show-time-->
      <!--          placeholder="请选择"-->
      <!--        />-->
      <!--      </a-form-item>-->
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { apiUserStatus } from '@/service/api/setting'

const props = defineProps<{
  getSourceData: Function
}>()

const labelCol = { span: 5 }

const visible = ref<boolean>(false)

const title = ref<string>('更改状态')

const detailInfo = reactive({
  reason: '',
})

const formRules = reactive({
  reason: [{ required: true, message: '禁用原因不能为空', trigger: 'change' }],
})

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, formRules)

/**
 * @desc 初始化对话框
 */
const initModal = (initInfo: any) => {
  detailInfo.username = initInfo.username
  detailInfo.status = initInfo.status === '启用' ? 2 : 1
  visible.value = true
}

/**
 * @desc 确认
 */
const handleConfirm = async () => {
  validate().then(async () => {
    const { code } = await apiUserStatus(detailInfo)
    if (code === 20001) {
      message.success('操作成功')
      props.getSourceData()
      handleCancel()
    }
  })
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  resetFields()
  title.value = '更改状态'
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
