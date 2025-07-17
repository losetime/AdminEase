<template>
  <div class="user-wrapper">
    <CommonMangerPage>
      <template #search>
        <Search>
          <template #searchItems>
            <a-form layout="inline" :model="searchParams">
              <a-form-item label="用户昵称">
                <a-input v-model:value="searchParams.nickname" placeholder="请输入" />
              </a-form-item>
              <a-form-item label="用户账号">
                <a-input v-model:value="searchParams.username" placeholder="请输入" />
              </a-form-item>
              <a-form-item label="分析时间">
                <a-range-picker v-model:value="analyseTime" show-time valueFormat="YYYY-MM-DD HH:mm:ss" />
              </a-form-item>
              <a-form-item>
                <a-space>
                  <a-button type="primary" @click="handleReacquire(1)">查询</a-button>
                  <a-button @click="handleResetSearch">重置</a-button>
                </a-space>
              </a-form-item>
            </a-form>
          </template>
        </Search>
      </template>
      <template #handle>
        <a-space>
          <a-button type="primary" @click="handleAdd">新增</a-button>
        </a-space>
      </template>
      <template #table>
        <ym-table
          rowKey="gmtCreate"
          :columns="historyRecordColumns"
          :getTableList="apiGetHistoryRecordList"
          :row-selection="false"
          :params="searchParams"
          table-x="max-content"
          ref="tableInstance"
        >
          <template #action="{ record }">
            <a-space>
              <a-button type="primary" size="small" @click="handleEdit(record)">查看</a-button>
              <a-button type="primary" size="small" @click="handleDownload(record)">下载</a-button>
              <!--              <a-button type="link" size="small" danger @click="handleDel(record.address)">删除</a-button>-->
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <NewRecord ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
    <RecordDetail ref="recordDetailInstance" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watchEffect } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import NewRecord from '@/components/history-record/NewRecord.vue'
import RecordDetail from "@/components/history-record/RecordDetail.vue"
import { apiGetHistoryRecordList } from '@/service/api/historyRecord'
import { historyRecordColumns } from '@/columns/history-record'
import { actionTypeEnum } from '@/enums/commonEnum'
// import { message } from 'ant-design-vue'
import { YmModal } from '@/utils/antd'
import CommonMangerPage from '@/components/common/CommonMangerPage.vue'
import Search from '@/components/common/Search.vue'

onMounted(async () => {})

/**
 ********************************* 表格逻辑 ******************************************
 */

// 表格实例
const tableInstance = ref()

// 用户详情实例
const detailInstance = ref()
const recordDetailInstance = ref()

// 搜索参数
const searchParams = reactive<any>({
  nickname: '',
  username: '',
  startTime: '',
  endTime: '',
})

const analyseTime = ref<string[]>([])

watchEffect(() => {
  if (analyseTime.value.length > 0) {
    searchParams.startTime = analyseTime.value[0]
    searchParams.endTime = analyseTime.value[1]
  } else {
    searchParams.startTime = ''
    searchParams.endTime = ''
  }
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    nickname: '',
    username: '',
    startTime: '',
    endTime: '',
  })
  analyseTime.value = []
  handleReacquire(1)
}

/**
 * @desc 列表刷新
 */
const handleRefresh = () => {
  tableInstance.value.handleRefresh()
}

/**
 * @desc 重新获取当前页列表
 */
const getSourceData = () => {
  tableInstance.value.getSourceData()
}

/**
 * @desc 列表删除
 */
const handleDel = (address: string) => {
  YmModal.delete(async () => {
    // const { code } = await apiAddressStatus({ address, status: 3 })
    // if (code === 20001) {
    //   message.success('删除成功')
    //   tableInstance.value.getSourceData()
    // }
  })
}

/**
 * @desc 新增
 */
const handleAdd = () => {
  detailInstance.value.initModal(actionTypeEnum.ADD)
}

/**
 * @desc 编辑
 */
const handleEdit = (record: any) => {
  recordDetailInstance.value.initModal(record.result_json)
}

/**
 * @author: wwp
 * @createTime: 2025/7/16 20:33
 * @description: 下载
 * @param record
 * @return
 */
const handleDownload = async (record: any) => {
  window.open(record.resultfile, '_blank')
}
</script>

<style lang="less" scoped>
.user-wrapper {
  width: 100%;
  height: 100%;

  .handle-wrap {
    padding: 32px 32px 0 32px;
    background-color: #ffffff;
    margin-top: 14px;
  }
  .custom-table-wrap {
    height: calc(100% - 228px);
    padding: 32px;
    background-color: #ffffff;
    position: relative;
  }
}
</style>
