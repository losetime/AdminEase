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
      <a-form-item label="用户昵称" v-bind="validateInfos.nickname">
        <a-input v-model:value="detailInfo.nickname" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="登录账号" v-bind="validateInfos.username">
        <a-input
          v-model:value="detailInfo.username"
          placeholder="请输入"
          :disabled="handleType === actionTypeEnum.EDIT"
        />
      </a-form-item>
      <a-form-item label="登录密码" v-bind="validateInfos.password">
        <a-input v-model:value="detailInfo.password" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="选择规则" v-bind="validateInfos.rule_id">
        <a-select v-model:value="detailInfo.rule_id" placeholder="请选择">
          <a-select-option :value="item.rule_id" v-for="item in ruleList" :key="item.rule_id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Form, message } from 'ant-design-vue'
import { userDetailRules } from '@/validator/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { apiAddUser, apiUpdateUser } from '@/service/api/setting'
import { apiGetRuleList } from '@/service/api/dict'

const props = defineProps<{
  handleRefresh: Function
  getSourceData: Function
}>()

const labelCol = { span: 4 }

const visible = ref<boolean>(false)

const title = ref<string>('新增用户')

const handleType = ref(actionTypeEnum.ADD)

const detailInfo = reactive({
  nickname: '',
  username: '',
  password: '',
  rule_id: null,
})

const userId = ref<number>(-1)

const useForm = Form.useForm

const { validate, validateInfos, resetFields } = useForm(detailInfo, userDetailRules)

/**
 * @desc 初始化对话框
 */
const initModal = (type: number, initInfo: any) => {
  handleType.value = type
  getRuleList()
  if (type === actionTypeEnum.EDIT) {
    title.value = '编辑用户'
    userId.value = initInfo.userId as number
    Object.assign(detailInfo, initInfo)
  }
  visible.value = true
}

/**
 * @author: wwp
 * @createTime: 2025/7/17 19:07
 * @description: 获取规则列表
 * @return
 */
const ruleList = ref<any[]>([])
const getRuleList = async () => {
  const { code, data } = await apiGetRuleList({ current: 1, size: 20 })
  if (code === 20001) {
    ruleList.value = data
  }
}

/**
 * @desc 确认
 */
const handleConfirm = () => {
  validate().then(async () => {
    if (handleType.value === actionTypeEnum.ADD) {
      const { code } = await apiAddUser(detailInfo)
      if (code === 20001) {
        message.success('新增成功')
        props.handleRefresh()
      }
    } else {
      const { code } = await apiUpdateUser(detailInfo)
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
  userId.value = -1
  title.value = '新增用户'
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped></style>
