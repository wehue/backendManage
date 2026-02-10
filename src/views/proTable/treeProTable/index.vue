<template>
  <div class="main-box">
    <TreeFilter
      label="name"
      title="部门列表(单选)"
      :data="treeFilterData"
      :default-value="initParam.departmentId"
      @change="changeTreeFilter"
    />
    <div class="table-box">
      <ProTable
        ref="proTable"
        row-key="id"
        :indent="20"
        :columns="columns"
        :request-api="getUserTreeList"
        :request-auto="false"
        :init-param="initParam"
        :search-col="{ xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }"
      >
        <template #tableHeader>
          <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
        </template>
        <template #operation="scope">
          <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)">查看</el-button>
          <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)">编辑</el-button>
          <el-button type="primary" link :icon="Delete" @click="deleteAccount(scope.row)">删除</el-button>
        </template>
      </ProTable>
      <UserDrawer ref="drawerRef" />
    </div>
  </div>
</template>

<script setup lang="tsx" name="treeProTable">
import { onMounted, reactive, ref } from "vue";
import { genderType } from "@/utils/dict";
import { useHandleData } from "@/hooks/useHandleData";
import { ElMessage, ElNotification } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import TreeFilter from "@/components/TreeFilter/index.vue";

import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { CirclePlus, Delete, EditPen, View } from "@element-plus/icons-vue";
import { ColumnProps, ProTableInstance } from "@/components/ProTable/interface";

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

const getUserStatus = async () => {
  return [
    { userStatus: 0, userLabel: "禁用" },
    { userStatus: 1, userLabel: "启用" }
  ];
};

const getUserTreeList = async (params: any) => {
  const { departmentId } = params;
  
  const mockData = [
    {
      id: "1",
      username: "张三",
      gender: 0,
      idCard: "110101199001011234",
      email: "zhangsan@example.com",
      address: "北京市朝阳区",
      status: 1,
      departmentId: "11",
      createTime: "2023-01-01 12:00:00",
      children: [
        {
          id: "11",
          username: "张三子1",
          gender: 0,
          idCard: "110101199001011235",
          email: "zhangsan1@example.com",
          address: "北京市朝阳区",
          status: 1,
          departmentId: "11",
          createTime: "2023-01-01 12:00:00"
        },
        {
          id: "12",
          username: "张三子2",
          gender: 1,
          idCard: "110101199001011236",
          email: "zhangsan2@example.com",
          address: "北京市朝阳区",
          status: 1,
          departmentId: "11",
          createTime: "2023-01-01 12:00:00"
        }
      ]
    },
    {
      id: "2",
      username: "李四",
      gender: 1,
      idCard: "110101199001011237",
      email: "lisi@example.com",
      address: "上海市浦东新区",
      status: 1,
      departmentId: "12",
      createTime: "2023-01-02 12:00:00"
    },
    {
      id: "3",
      username: "王五",
      gender: 0,
      idCard: "110101199001011238",
      email: "wangwu@example.com",
      address: "广州市天河区",
      status: 0,
      departmentId: "13",
      createTime: "2023-01-03 12:00:00"
    }
  ];
  
  let filteredData = mockData;
  if (departmentId) {
    filteredData = mockData.filter(item => item.departmentId === departmentId);
  }
  
  return {
    code: 200,
    data: {
      list: filteredData,
      total: filteredData.length
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

const editUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "编辑成功"
  };
};

const addUser = async (params: any) => {
  return {
    code: 200,
    data: null,
    msg: "新增成功"
  };
};

onMounted(() => {
  getTreeFilter();
  ElNotification({
    title: "温馨提示",
    message: "该页面 ProTable 数据不会自动请求，需等待 treeFilter 数据请求完成之后，才会触发表格请求。",
    type: "info",
    duration: 10000
  });
  setTimeout(() => {
    ElNotification({
      title: "温馨提示",
      message: "该页面 ProTable 性别搜索框为远程数据搜索，详情可查看代码。",
      type: "info",
      duration: 10000
    });
  }, 0);
});

const proTable = ref<ProTableInstance>();
const initParam = reactive({ departmentId: "" });
const treeFilterData = ref<any>([]);
const getTreeFilter = async () => {
  const data = await getUserDepartment();
  treeFilterData.value = data;
  initParam.departmentId = treeFilterData.value[1].id;
};

const changeTreeFilter = (val: string) => {
  ElMessage.success("请注意查看请求参数变化 🤔");
  proTable.value!.pageable.pageNum = 1;
  initParam.departmentId = val;
};

const loading = ref(false);
const filterGenderEnum = ref<typeof genderType>([]);
const remoteMethod = (query: string) => {
  filterGenderEnum.value = [];
  if (!query) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    filterGenderEnum.value = genderType.filter(item => item.label.includes(query));
  }, 500);
};

const columns = reactive<any[]>([
  { type: "index", label: "#", width: 80 },
  { prop: "username", label: "用户姓名" },
  {
    prop: "gender",
    label: "性别",
    sortable: true,
    isFilterEnum: false,
    enum: filterGenderEnum,
    search: {
      el: "select",
      props: { placeholder: "请输入性别查询", filterable: true, remote: true, reserveKeyword: true, loading, remoteMethod }
    },
    render: scope => <>{scope.row.gender === 1 ? "男" : "女"}</>
  },
  { prop: "idCard", label: "身份证号" },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    sortable: true,
    tag: true,
    enum: getUserStatus,
    search: { el: "tree-select" },
    fieldNames: { label: "userLabel", value: "userStatus" }
  },
  { prop: "createTime", label: "创建时间", width: 180 },
  { prop: "operation", label: "操作", width: 300, fixed: "right" }
]);

const deleteAccount = async (params: any) => {
  await useHandleData(deleteUser, { id: [params.id] }, `删除【${params.username}】用户`);
  proTable.value?.getTableList();
};

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
