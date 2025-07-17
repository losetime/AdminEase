<template>
  <div class="user-wrapper">
    <CommonMangerPage>
      <template #search>
        <Search>
          <template #searchItems>
            <a-form layout="inline" :model="searchParams">
              <a-form-item label="设备型号编码">
                <a-input v-model:value="searchParams.model_code" placeholder="请输入" />
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
          rowKey="euip_id"
          :columns="equipmentColumns"
          :getTableList="apiGetEquipmentList"
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
              <a-button type="primary" size="small" danger @click="handleDel(record.model_code)">删除</a-button>
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <NewEquipment ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import NewEquipment from '@/components/dict/NewEquipment.vue'
import { apiGetEquipmentList, apiEquipmentStatus } from '@/service/api/dict'
import { equipmentColumns } from '@/columns/dict'
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
  model_code: '',
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    model_code: '',
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
const handleDel = (model_code: string) => {
  YmModal.delete(async () => {
    const { code } = await apiEquipmentStatus({ model_code, status: 3 })
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
  const { code } = await apiEquipmentStatus({ model_code: record.model_code, status: record.status === '启用' ? 2 : 1 })
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
