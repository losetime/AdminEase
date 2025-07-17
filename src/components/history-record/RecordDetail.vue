<template>
  <a-modal
    v-model:open="visible"
    :title="title"
    :destroyOnClose="true"
    :afterClose="handleCancel"
    :maskClosable="false"
    @ok="handleConfirm"
    width="800px"
  >
    <div class="detail-table-wrap">
      <ym-table
        rowKey="id"
        :columns="historyRecordDetailColumns"
        :getTableList="getTableData"
        :row-selection="false"
        table-x="max-content"
        ref="tableInstance"
        :pagination="false"
      >
        <template #all_electric="{ record }">
          <span :style="{ color: record.all_electric_color }">{{ record.all_electric }}</span>
        </template>
        <template #offset="{ record }">
          <span :style="{ color: record.offset_color }">{{ record.offset }}</span>
        </template>
      </ym-table>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { historyRecordDetailColumns } from '@/columns/history-record'
import YmTable from '@/components/common/YmTable.vue'

const visible = ref<boolean>(false)

const title = ref<string>('详情')

const tableData = ref([])

/**
 * @desc 初始化对话框
 */
const initModal = (initInfo: any) => {
  tableData.value = initInfo.map((item, index) => ({ ...item, id: index + 1 }))
  visible.value = true
}

const getTableData = () => {
  return Promise.resolve({
    code: 20001,
    data: tableData.value,
  })
}

/**
 * @desc 确认
 */
const handleConfirm = async () => {
  handleCancel()
}

/**
 * @desc 关闭
 */
const handleCancel = () => {
  title.value = '详情'
  visible.value = false
}

defineExpose({
  initModal,
})
</script>

<style lang="less" scoped>
.detail-table-wrap {
  height: 300px;
}
</style>
