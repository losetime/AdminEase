import { reactive, onMounted } from 'vue'
import { formatParams } from '@/utils/base'

/**
 * @desc 表格逻辑
 * @param getTableData
 * @param tableParams
 * @param isImmediately 是否立即执行
 */
const useTable = (getTableData: Function, tableParams?: Object, isImmediately?: boolean) => {
  const tableData = reactive({
    result: [],
    total: 0,
    loading: false,
  })

  const reqParams = reactive({
    currentPage: 1,
    pageSize: 20,
  })

  const onChangeSize = (size: number) => {
    reqParams.pageSize = size
  }

  const handleRefresh = () => {
    reqParams.currentPage = 1
    getSourceData()
  }

  const getSourceData = () => {
    tableData.loading = true
    const tempParams = formatParams({ ...tableParams })
    const params = Object.keys(tempParams).length > 0 ? { ...reqParams, ...tempParams } : reqParams
    getTableData(params).then((res: any) => {
      tableData.loading = false
      if (res.code === 20001) {
        if (Array.isArray(res.data)) {
          tableData.result = res.data
          tableData.total = res.data.length
        } else {
          if (res.data.content.length <= 0 && reqParams.currentPage > 1) {
            reqParams.currentPage -= 1
            getSourceData()
          } else {
            tableData.result = res.data.content
            tableData.total = res.data.totalElements
          }
        }
      }
    })
  }

  /**
   * @desc 重新请求
   */
  const handleReacquire = (page?: number) => {
    if (typeof page === 'number') {
      reqParams.currentPage = page
    }
    getSourceData()
  }

  onMounted(() => {
    if (isImmediately) {
      getSourceData()
    }
  })

  return {
    tableData,
    reqParams,
    handleRefresh,
    getSourceData,
    onChangeSize,
    handleReacquire,
  }
}

export default useTable
