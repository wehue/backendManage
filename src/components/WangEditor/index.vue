<template>
  <div :class="['editor-box', self_disabled ? 'editor-disabled' : '']">
    <Toolbar v-if="!hideToolBar" class="editor-toolbar" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml"
      class="editor-content"
      :style="{ height }"
      :mode="mode"
      :default-config="editorConfig"
      @on-created="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts" name="WangEditor">
import { nextTick, computed, inject, shallowRef, onBeforeUnmount } from "vue";
import { IToolbarConfig, IEditorConfig } from "@wangeditor/editor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import { formContextKey, formItemContextKey } from "element-plus";

const editorRef = shallowRef();

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

interface RichEditorProps {
  value: string;
  toolbarConfig?: Partial<IToolbarConfig>;
  editorConfig?: Partial<IEditorConfig>;
  height?: string;
  mode?: "default" | "simple";
  hideToolBar?: boolean;
  disabled?: boolean;
}
const props = withDefaults(defineProps<RichEditorProps>(), {
  toolbarConfig: () => {
    return {
      excludeKeys: []
    };
  },
  editorConfig: () => {
    return {
      placeholder: "请输入内容...",
      MENU_CONF: {}
    };
  },
  height: "500px",
  mode: "default",
  hideToolBar: false,
  disabled: false
});

const formContext = inject(formContextKey, void 0);
const formItemContext = inject(formItemContextKey, void 0);
const self_disabled = computed(() => {
  return props.disabled || formContext?.disabled;
});

if (self_disabled.value) nextTick(() => editorRef.value.disable());

const emit = defineEmits<{
  "update:value": [value: string];
  "check-validate": [];
}>();

const valueHtml = computed({
  get() {
    return props.value;
  },
  set(val: string) {
    if (editorRef.value.isEmpty()) val = "";
    emit("update:value", val);
  }
});

const uploadImg = async (formData: FormData) => {
  return {
    code: 200,
    data: { fileUrl: "https://via.placeholder.com/300" },
    msg: "上传成功"
  };
};

const uploadVideo = async (formData: FormData) => {
  return {
    code: 200,
    data: { fileUrl: "https://via.placeholder.com/400" },
    msg: "上传成功"
  };
};

type InsertFnTypeImg = (url: string, alt?: string, href?: string) => void;
props.editorConfig.MENU_CONF!["uploadImage"] = {
  async customUpload(file: File, insertFn: InsertFnTypeImg) {
    if (!uploadImgValidate(file)) return;
    let formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await uploadImg(formData);
      insertFn(data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadImgValidate = (file: File): boolean => {
  console.log(file);
  return true;
};

type InsertFnTypeVideo = (url: string, poster?: string) => void;
props.editorConfig.MENU_CONF!["uploadVideo"] = {
  async customUpload(file: File, insertFn: InsertFnTypeVideo) {
    if (!uploadVideoValidate(file)) return;
    let formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await uploadVideo(formData);
      insertFn(data.fileUrl);
    } catch (error) {
      console.log(error);
    }
  }
};

const uploadVideoValidate = (file: File): boolean => {
  console.log(file);
  return true;
};

const handleBlur = () => {
  formItemContext?.prop && formItemContext?.validateField([formItemContext.prop as string]);
};

onBeforeUnmount(() => {
  if (!editorRef.value) return;
  editorRef.value.destroy();
});

defineExpose({
  editor: editorRef
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
