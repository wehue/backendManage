import { defineStore } from "pinia";
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from "@/utils";
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: () => ({
    authButtonList: {},
    authMenuList: [],
    routeName: ""
  }),
  getters: {
    authButtonListGet: (state) => state.authButtonList,
    authMenuListGet: (state) => state.authMenuList,
    flatMenuListGet: (state) => getFlatMenuList(state.authMenuList),
    showMenuListGet: (state) => getShowMenuList(state.authMenuList),
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    async getAuthButtonList() {
      this.authButtonList = authButtonList.data;
    },
    async getAuthMenuList() {
      this.authMenuList = authMenuList.data;
    },
    async setRouteName(name) {
      this.routeName = name;
    }
  }
});
