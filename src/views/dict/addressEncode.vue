<template>
  <div class="user-wrapper">
    <CommonMangerPage>
      <template #search>
        <Search>
          <template #searchItems>
            <a-form layout="inline" :model="searchParams">
              <a-form-item label="铁塔地址编码">
                <a-input v-model:value="searchParams.address" placeholder="请输入" />
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
          rowKey="address_id"
          :columns="addressEncodeColumns"
          :getTableList="apiGetAddressList"
          :row-selection="false"
          :params="searchParams"
          table-x="max-content"
          ref="tableInstance"
        >
          <template #action="{ record }">
            <a-space>
              <a-button type="primary" size="small" @click="handleEdit(record)">修改</a-button>
              <a-button type="primary" size="small" @click="handleAddressStatus(record)">
                {{ record.status === '启用' ? '禁用' : '启用' }}
              </a-button>
              <a-button type="primary" size="small" danger @click="handleDel(record.address)">删除</a-button>
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <NewAddressEncode ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import NewAddressEncode from '@/components/dict/NewAddressEncode.vue'
import { apiGetAddressList, apiAddressStatus } from '@/service/api/dict'
import { addressEncodeColumns } from '@/columns/dict'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'
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

// 搜索参数
const searchParams = reactive<any>({
  address: '',
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    address: '',
  })
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
    const { code } = await apiAddressStatus({ address, status: 3 })
    if (code === 20001) {
      message.success('删除成功')
      tableInstance.value.getSourceData()
    }
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
  detailInstance.value.initModal(actionTypeEnum.EDIT, record)
}

/**
 * @author: wwp
 * @createTime: 2025/7/16 20:33
 * @description: 用户状态
 * @param record
 * @return
 */
const handleAddressStatus = async (record: any) => {
  const { code } = await apiAddressStatus({ address: record.address, status: record.status === '启用' ? 2 : 1 })
  if (code === 20001) {
    message.success('操作成功')
    tableInstance.value.getSourceData()
  }
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
