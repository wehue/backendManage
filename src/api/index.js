import axios from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/components/Loading/fullScreen";
import { LOGIN_URL } from "@/config";
import { ElMessage } from "element-plus";
import { ResultEnum } from "@/enums/httpEnum";
import { useUserStore } from "@/stores/modules/user";
import router from "@/routers";

const config = {
  baseURL: import.meta.env.VITE_API_URL,
  timeout: ResultEnum.TIMEOUT,
  withCredentials: true
};

class RequestHttp {
  service;
  constructor(config) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config) => {
        const userStore = useUserStore();
        config.cancel ??= true;
        config.loading ??= true;
        config.loading && showFullScreenLoading();
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("x-access-token", userStore.token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response) => {
        const { data, config } = response;
        const userStore = useUserStore();
        config.loading && tryHideFullScreenLoading();
        if (data.code == ResultEnum.OVERDUE) {
          userStore.setToken("");
          router.replace(LOGIN_URL);
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        return data;
      },
      async (error) => {
        const { response } = error;
        tryHideFullScreenLoading();
        if (error.message.indexOf("timeout") !== -1) ElMessage.error("请求超时！请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1) ElMessage.error("网络错误！请您稍后重试");
        if (response) {
          if (response.status === 401) {
            userStore.setToken("");
            router.replace(LOGIN_URL);
          } else if (response.status === 403) {
            ElMessage.error("没有权限访问该资源");
          } else if (response.status === 404) {
            ElMessage.error("请求的资源不存在");
          } else if (response.status === 500) {
            ElMessage.error("服务器错误");
          } else {
            ElMessage.error(`请求失败，状态码：${response.status}`);
          }
        }
        if (!window.navigator.onLine) router.replace("/500");
        return Promise.reject(error);
      }
    );
  }

  get(url, params, _object = {}) {
    return this.service.get(url, { params, ..._object });
  }
  post(url, params, _object = {}) {
    return this.service.post(url, params, _object);
  }
  put(url, params, _object = {}) {
    return this.service.put(url, params, _object);
  }
  delete(url, params, _object = {}) {
    return this.service.delete(url, { params, ..._object });
  }
  download(url, params, _object = {}) {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHttp(config);
