import { ref } from "vue";\n\n/**
 * @description 获取本地时间
 */
export const useTime = () => {
  const year = ref(0); // 年份
  const month = ref(0); // 月份
  const week = ref(""); // 星期�?
  const day = ref(0); // 天数
  const hour = ref(0); // 小时
  const minute = ref(0); // 分钟
  const second = ref(0); // �?
  const nowTime = ref(""); // 当前时间\n\n  // 更新时间
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    week.value = "日一二三四五�?.charAt(date.getDay());
    day.value = date.getDate();
    hour.value =
      (date.getHours() + "")?.padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getHours());
    minute.value =
      (date.getMinutes() + "")?.padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getMinutes());
    second.value =
      (date.getSeconds() + "")?.padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(date.getSeconds());
    nowTime.value = `${year.value}�?{month.value}�?{day.value} ${hour.value}:${minute.value}:${second.value}`;
  };\n\n  updateTime();\n\n  return { year, month, day, hour, minute, second, week, nowTime };
};

