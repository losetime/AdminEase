<template>
  <div class="user-wrapper">
    <CommonMangerPage>
      <template #search>
        <Search>
          <template #searchItems>
            <a-form :model="searchParams">
              <a-form-item label="用户昵称">
                <a-input v-model:value="searchParams.nickname" placeholder="请输入" />
              </a-form-item>
              <a-form-item label="用户账号">
                <a-input v-model:value="searchParams.username" placeholder="请输入" />
              </a-form-item>
              <a-form-item label="用户状态">
                <a-select
                  v-model:value="searchParams.status"
                  placeholder="请选择"
                  allowClear
                  :options="AccountStatus"
                />
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
          rowKey="user_id"
          :columns="userColumns()"
          :getTableList="apiGetUserList"
          :row-selection="false"
          :params="searchParams"
          table-x="max-content"
          ref="tableInstance"
        >
          <template #action="{ record }">
            <a-space v-if="record.username !== 'admin'">
              <a-button type="primary" size="small" @click="handleEdit(record)">修改</a-button>
              <a-button type="primary" size="small" @click="handleUserStatus(record)">
                {{ record.status === '启用' ? '禁用' : '启用' }}
              </a-button>
              <a-button type="primary" size="small" danger @click="handleDel(record.username)">删除</a-button>
            </a-space>
          </template>
        </ym-table>
      </template>
    </CommonMangerPage>
    <user-detail ref="detailInstance" :getSourceData="getSourceData" :handleRefresh="handleRefresh" />
    <modify-password ref="passwordInstance" />
    <ForbiddenUser ref="forbiddenUserInstance" :getSourceData="getSourceData" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import YmTable from '@/components/common/YmTable.vue'
import UserDetail from '@/components/setting/UserDetail.vue'
import ModifyPassword from '@/components/setting/ModifyPassword.vue'
import ForbiddenUser from '@/components/setting/ForbiddenUser.vue'
import { apiGetUserList, apiUserStatus } from '@/service/api/setting'
import { userColumns } from '@/columns/setting'
import { actionTypeEnum } from '@/enums/commonEnum'
import { message } from 'ant-design-vue'
import { YmModal } from '@/utils/antd'
import { AccountStatus } from '@/enums/settingEnum'
import CommonMangerPage from '@/components/common/CommonMangerPage.vue'
import Search from '@/components/common/Search.vue'

// 表格实例
const tableInstance = ref()

// 用户详情实例
const detailInstance = ref()

// 搜索参数
const searchParams = reactive<any>({
  nickname: '',
  username: '',
  status: null,
})

// 重新获取列表
const handleReacquire = (page?: number) => {
  tableInstance.value.handleReacquire(page)
}

const handleResetSearch = () => {
  Object.assign(searchParams, {
    nickname: '',
    username: '',
    status: null,
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
const handleDel = (username: string) => {
  YmModal.delete(async () => {
    const { code } = await apiUserStatus({ username, status: 3 })
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

const forbiddenUserInstance = ref()

/**
 * @author: wwp
 * @createTime: 2025/7/16 20:33
 * @description: 用户状态
 * @param record
 * @return
 */
const handleUserStatus = async (record: any) => {
  if (record.status === '禁用') {
    const { code } = await apiUserStatus({
      username: record.username,
      status: record.status === '启用' ? 2 : 1,
    })
    if (code === 20001) {
      message.success('操作成功')
      handleReacquire()
    }
  } else {
    forbiddenUserInstance.value.initModal(record)
  }
}
</script>

<style lang="less" scoped>
.user-wrapper {
  width: 100%;
  height: 100%;
  .search-wrapper {
    ::v-deep(.ant-form) {
      .ant-form-item-label {
        min-width: 100px;
      }
    }
  }

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
