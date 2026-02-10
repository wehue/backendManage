import { VNode, ComponentPublicInstance, Ref } from "vue";
import { BreakPoint, Responsive } from "@/components/Grid/interface";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ProTableProps } from "@/components/ProTable/index.vue";
import ProTable from "@/components/ProTable/index.vue";\n\nexport \n\nexport TypeProps = "index" | "selection" | "radio" | "expand" | "sort";\n\nexport SearchType =
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
  | "slider";\n\nexport SearchRenderScope = {
  searchParam;
  placeholder;
  clearable;
  options: EnumProps[];
  data: EnumProps[];
};\n\nexport SearchProps = {
  el?: SearchType; // 当前项搜索框的类�?
  label?; // 当前项搜索框�?label
  props?; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组�?
  key?; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  tooltip?; // 搜索提示
  order?; // 搜索项排序（从大到小�?
  span?; // 搜索项所占用的列数，默认�?1 �?
  offset?; // 搜索字段左侧偏移列数
  defaultValue? | number | boolean | any[] | Ref; // 搜索项默认�?
  render?: (scope: SearchRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法�?
} & Partial>;\n\nexport FieldNamesProps = {
  label;
  value;
  children?;
};\n\nexport RenderScope = {
  row: T;
  $index;
  column: TableColumnCtx;
  [key];
};\n\nexport HeaderRenderScope = {
  $index;
  column: TableColumnCtx;
  [key];
};\n\nexport interface ColumnProps
  extends Partial, "type" | "children" | "renderCell" | "renderHeader">> {
  type?: TypeProps; // 列类�?
  tag? | Ref; // 是否是标签展�?
  isShow? | Ref; // 是否显示在表格当�?
  isSetting? | Ref; // 是否�?ColSetting 中可配置
  search?: SearchProps | undefined; // 搜索项配�?
  enum?: EnumProps[] | Ref | ((params?) => Promise); // 枚举字典
  isFilterEnum? | Ref; // 当前单元格值是否根�?enum 格式化（示例：enum 只作为搜索项数据�?
  fieldNames?: FieldNamesProps; // 指定 label && value && children �?key �?
  headerRender?: (scope: HeaderRenderScope) => VNode; // 自定义表头内容渲染（tsx语法�?
  render?: (scope: RenderScope) => VNode | string; // 自定义单元格内容渲染（tsx语法�?
  _children?: ColumnProps[]; // 多级表头
}\n\nexport ProTableInstance = Omit, keyof ComponentPublicInstance | keyof ProTableProps>;

