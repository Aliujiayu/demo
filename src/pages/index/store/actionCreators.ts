import * as actionType from "./actionType";
// import Taro from "@tarojs/taro";


// 获取state修改事件
export const stateChange = (name: string, value: any) => ({
  type: actionType.STATE_CHANGE,
  name,
  value,
});
