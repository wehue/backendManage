import { ref, computed } from "vue";

/**
 * @description 表格多选数据操作
 * @param {String} rowKey 当表格可以多选时，所指定的id
 * */
export const useSelection = (rowKey = "id") => {
  // 多选数据
  const selectionRef = ref([]);
  // 全选数据
  const selectAllRef = ref(false);
  // 半选数据
  const selectHalfRef = ref(false);

  /**
   * @description 多选数据ids
   * */
  const selectionIds = computed(() => {
    return selectionRef.value.map((item) => item[rowKey]);
  });

  /**
   * @description 多选数据改变
   * @param {Array} val 多选数据
   * @return void
   * */
  const handleSelectionChange = (val) => {
    selectionRef.value = val;
  };

  /**
   * @description 清空多选
   * @return void
   * */
  const clearSelection = () => {
    selectionRef.value = [];
  };

  /**
   * @description 全选
   * @param {Boolean} val 全选状态
   * @return void
   * */
  const handleSelectAll = (val) => {
    selectAllRef.value = val;
    selectHalfRef.value = false;
  };

  /**
   * @description 半选
   * @param {Boolean} val 半选状态
   * @return void
   * */
  const handleSelectHalf = (val) => {
    selectHalfRef.value = val;
  };

  return {
    selectionRef,
    selectAllRef,
    selectHalfRef,
    selectionIds,
    handleSelectionChange,
    clearSelection,
    handleSelectAll,
    handleSelectHalf
  };
};