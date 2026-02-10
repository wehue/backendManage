<template>
  <div class="table-box">
    <ProTable
      ref="proTable"
      title="用户列表"
      highlight-current-row
      :columns="columns"
      :request-api="getUserList"
      :row-class-name="tableRowClassName"
      :span-method="objectSpanMethod"
      :show-summary="true"
      :summary-method="getSummaries"
      @row-click="rowClick"
    >
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="proTable?.element?.toggleAllSelection">全选 / 全不选</el-button>
        <el-button type="primary" :icon="Pointer" plain @click="setCurrent">选中第五行</el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
          批量删除用户
        </el-button>
      </template>
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <template #operation="scope">
        <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
        <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
      </template>
      <template #append>
        <span style="color: var(--el-color-primary)">我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。</span>
      </template>
    </ProTable>
  </div>
</template>

<script setup lang="tsx" name="complexProTable">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import ProTable from "@/components/ProTable/index.vue";
import { CirclePlus, Pointer, Delete, Refresh } from "@element-plus/icons-vue";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ProTableInstance, ColumnProps, HeaderRenderScope } from "@/components/ProTable/interface";

const getUserStatus = async () => {
  return [
    { userStatus: 0, userLabel: "禁用" },
    { userStatus: 1, userLabel: "启用" }
  ];
};

const getUserGender = async () => {
  return [
    { genderValue: 0, genderLabel: "男" },
    { genderValue: 1, genderLabel: "女" }
  ];
};

const getUserList = async (params: any) => {
  const mockData = [
    {
      id: "1",
      username: "张三",
      gender: 0,
      age: 25,
      idCard: "110101199001011234",
      email: "zhangsan@example.com",
      address: "北京市朝阳区",
      status: 1,
      createTime: "2023-01-01 12:00:00"
    },
    {
      id: "2",
      username: "李四",
      gender: 1,
      age: 30,
      idCard: "110101199001011235",
      email: "lisi@example.com",
      address: "上海市浦东新区",
      status: 1,
      createTime: "2023-01-02 12:00:00"
    },
    {
      id: "3",
      username: "王五",
      gender: 0,
      age: 28,
      idCard: "110101199001011236",
      email: "wangwu@example.com",
      address: "广州市天河区",
      status: 0,
      createTime: "2023-01-03 12:00:00"
    },
    {
      id: "4",
      username: "赵六",
      gender: 1,
      age: 32,
      idCard: "110101199001011237",
      email: "zhaoliu@example.com",
      address: "深圳市南山区",
      status: 1,
      createTime: "2023-01-04 12:00:00"
    },
    {
      id: "5",
      username: "孙七",
      gender: 0,
      age: 27,
      idCard: "110101199001011238",
      email: "sunqi@example.com",
      address: "杭州市西湖区",
      status: 1,
      createTime: "2023-01-05 12:00:00"
    },
    {
      id: "6",
      username: "周八",
      gender: 1,
      age: 29,
      idCard: "110101199001011239",
      email: "zhouba@example.com",
      address: "成都市武侯区",
      status: 0,
      createTime: "2023-01-06 12:00:00"
    },
    {
      id: "7",
      username: "吴九",
      gender: 0,
      age: 31,
      idCard: "110101199001011240",
      email: "wujiu@example.com",
      address: "武汉市江汉区",
      status: 1,
      createTime: "2023-01-07 12:00:00"
    }
  ];
  
  return {
    code: 200,
    data: {
      list: mockData,
      total: mockData.length
    },
    msg: "success"
  };
};

const deleteUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "删除成功"
  };
};

const resetUserPassWord = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "重置密码成功"
  };
};

const proTable = ref<ProTableInstance>();

const headerRender = (scope: HeaderRenderScope<any>) => {
  return (
    <el-button type="primary" onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
      {scope.column.label}
    </el-button>
  );
};

const columns = reactive<any[]>([
  { type: "selection", width: 80 },
  { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "base",
    label: "基本信息",
    headerRender,
    _children: [
      { prop: "username", label: "用户姓名", width: 110 },
      { prop: "age", label: "年龄", width: 100 },
      {
        prop: "gender",
        label: "性别",
        width: 100,
        enum: getUserGender,
        fieldNames: { label: "genderLabel", value: "genderValue" }
      },
      {
        prop: "details",
        label: "详细资料",
        _children: [
          { prop: "idCard", label: "身份证号" },
          { prop: "email", label: "邮箱" },
          { prop: "address", label: "居住地址" }
        ]
      }
    ]
  },
  {
    prop: "status",
    label: "用户状态",
    tag: true,
    enum: getUserStatus,
    fieldNames: { label: "userLabel", value: "userStatus" }
  },
  { prop: "createTime", label: "创建时间", width: 200 },
  { prop: "operation", label: "操作", fixed: "right", width: 230 }
]);

const setCurrent = () => {
  proTable.value?.element?.setCurrentRow(proTable.value?.tableData[4]);
  proTable.value?.element?.toggleRowSelection(proTable.value?.tableData[4], true);
};

interface SummaryMethodProps {
  columns: TableColumnCtx[];
  data: any[];
}
const getSummaries = (param: SummaryMethodProps) => {
  const { columns } = param;
  const sums: string[] = [];
  columns.forEach((column, index) => {
    if (index === 0) return (sums[index] = "合计");
    else sums[index] = "N/A";
  });
  return sums;
};

interface SpanMethodProps {
  row: any;
  column: TableColumnCtx;
  rowIndex: number;
  columnIndex: number;
}
const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
  if (columnIndex === 3) {
    if (rowIndex % 2 === 0) return { rowspan: 2, colspan: 1 };
    else return { rowspan: 0, colspan: 0 };
  }
};

const tableRowClassName = ({ rowIndex }: { row: any; rowIndex: number }) => {
  if (rowIndex === 2) return "warning-row";
  if (rowIndex === 6) return "success-row";
  return "";
};

const rowClick = (row: any, column: TableColumnCtx) => {
  if (column.property == "radio" || column.property == "operation") return;
  console.log(row);
  ElMessage.success("当前行被点击了！");
};

const deleteAccount = async (params: any) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

const batchDelete = async (id: string[]) => {
  await useHandleData(deleteUser, { id }, "删除所选用户信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

const resetPass = async (params: any) => {
  await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
  proTable.value?.getTableList();
};
</script>

<style lang="scss">
.el-table .warning-row,
.el-table .warning-row .el-table-fixed-column--right,
.el-table .warning-row .el-table-fixed-column--left {
  background-color: var(--el-color-warning-light-9);
}
.el-table .success-row,
.el-table .success-row .el-table-fixed-column--right,
.el-table .success-row .el-table-fixed-column--left {
  background-color: var(--el-color-success-light-9);
}
</style>
