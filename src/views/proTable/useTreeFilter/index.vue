<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      title="部门列表(单选)"
      :request-api="getUserDepartment"
      :default-value="initParam.departmentId"
      @change="changeTreeFilter"
    />
    <div class="table-box">
      <ProTable
        ref="proTable"
        :columns="columns"
        :request-api="getUserList"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <!-- 表格 header 按钮 -->
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
          <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
          <el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
          <el-button type="primary" plain @click="toDetail">To 平级详情页面</el-button>
        </template>
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Refresh" @click="resetPass(scope.row)">重置密码</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <UserDrawer ref="drawerRef" />
    </div>
  </div>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";

import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, Upload, View, Refresh } from "@element-plus/icons-vue";

const router = useRouter();

// 跳转详情页
const toDetail = () => {
  router.push(`/proTable/useTreeFilter/detail/123456?params=detail-page`);
};

// ProTable 实例
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ departmentId: "1" });

// 树形筛选切换
const changeTreeFilter = (val: string) => {
  ElMessage.success("请注意查看请求参数变化 🤔");
  proTable.value!.pageable.pageNum = 1;
  initParam.departmentId = val;
};

// 模拟获取部门数据
const getUserDepartment = async () => {
  return [
    {
      id: "1",
      name: "技术部",
      children: [
        {
          id: "11",
          name: "前端开发"
        },
        {
          id: "12",
          name: "后端开发"
        },
        {
          id: "13",
          name: "测试"
        }
      ]
    },
    {
      id: "2",
      name: "产品部",
      children: [
        {
          id: "21",
          name: "产品规划"
        },
        {
          id: "22",
          name: "用户研究"
        }
      ]
    },
    {
      id: "3",
      name: "设计部",
      children: [
        {
          id: "31",
          name: "UI设计"
        },
        {
          id: "32",
          name: "交互设计"
        }
      ]
    }
  ];
};

// 模拟获取用户状态
const getUserStatus = async () => {
  return [
    { userStatus: 0, userLabel: "禁用" },
    { userStatus: 1, userLabel: "启用" }
  ];
};

// 模拟获取用户性别
const getUserGender = async () => {
  return [
    { genderValue: 0, genderLabel: "男" },
    { genderValue: 1, genderLabel: "女" }
  ];
};

// 模拟获取用户列表
const getUserList = async (params: any) => {
  const { pageNum = 1, pageSize = 10, departmentId } = params;
  
  // 模拟数据
  const mockData = [
    {
      id: "1",
      username: "张三",
      gender: 0,
      idCard: "110101199001011234",
      email: "zhangsan@example.com",
      address: "北京市朝阳区",
      status: 1,
      departmentId: "1",
      createTime: "2023-01-01 12:00:00"
    },
    {
      id: "2",
      username: "李四",
      gender: 1,
      idCard: "110101199001011235",
      email: "lisi@example.com",
      address: "上海市浦东新区",
      status: 1,
      departmentId: "1",
      createTime: "2023-01-02 12:00:00"
    },
    {
      id: "3",
      username: "王五",
      gender: 0,
      idCard: "110101199001011236",
      email: "wangwu@example.com",
      address: "广州市天河区",
      status: 0,
      departmentId: "2",
      createTime: "2023-01-03 12:00:00"
    },
    {
      id: "4",
      username: "赵六",
      gender: 1,
      idCard: "110101199001011237",
      email: "zhaoliu@example.com",
      address: "深圳市南山区",
      status: 1,
      departmentId: "3",
      createTime: "2023-01-04 12:00:00"
    },
    {
      id: "5",
      username: "孙七",
      gender: 0,
      idCard: "110101199001011238",
      email: "sunqi@example.com",
      address: "杭州市西湖区",
      status: 1,
      departmentId: "1",
      createTime: "2023-01-05 12:00:00"
    }
  ];
  
  // 根据部门ID过滤
  let filteredData = mockData;
  if (departmentId) {
    filteredData = mockData.filter(item => item.departmentId === departmentId);
  }
  
  // 分页
  const start = (pageNum - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = filteredData.slice(start, end);
  
  return {
    code: 200,
    data: {
      list: paginatedData,
      total: filteredData.length,
      pageNum,
      pageSize
    },
    msg: "success"
  };
};

// 模拟删除用户
const deleteUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "删除成功"
  };
};

// 模拟编辑用户
const editUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "编辑成功"
  };
};

// 模拟新增用户
const addUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "新增成功"
  };
};

// 模拟重置用户密码
const resetUserPassWord = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "重置密码成功"
  };
};

// 模拟导出用户信息
const exportUserInfo = async (params: any) => {
  return {
    code: 200,
    data: "mock_export_data",
    msg: "导出成功"
  };
};

// 模拟批量添加用户
const BatchAddUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "批量添加成功"
  };
};

// 表格配置项
const columns = reactive<any[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "username", label: "用户姓名", width: 120, search: { el: "input" } },
  {
    prop: "gender",
    label: "性别",
    width: 120,
    sortable: true,
    enum: getUserGender,
    search: { el: "select" },
    fieldNames: { label: "genderLabel", value: "genderValue" }
  },
  { prop: "idCard", label: "身份证号" },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    width: 120,
    sortable: true,
    tag: true,
    enum: getUserStatus,
    search: { el: "select" },
    fieldNames: { label: "userLabel", value: "userStatus" }
  },
  { prop: "createTime", label: "创建时间", width: 180 },
  { prop: "operation", label: "操作", width: 330, fixed: "right" }
]);

// 删除用户信息
const deleteAccount = async (params: any) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

// 重置用户密码
const resetPass = async (params: any) => {
  await useHandleData(resetUserPassWord, { id: params.id }, `重置【${params.username}】用户密码`);
  proTable.value?.getTableList();
};

// 导出用户列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出用户数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportUserInfo, "用户列表", proTable.value?.searchParam)
  );
};



// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: any = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
