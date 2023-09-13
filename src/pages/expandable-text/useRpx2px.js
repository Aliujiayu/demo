import Taro from "@tarojs/taro";

const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 350;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;

function checkDevicewidth() {
    const { platform, pixelRatio, windowwidth } = Taro.getSystemInfosync() // Taro=>wx runtine 编译目标是Taro对象 内部不允许直接使用Taro
    devicewidth = windowwidth
    deviceDPR = pixelRatio
    isIOS = platform === 'ios'
}
function useRpx2px(number, newDeviceWidth) {// 设宣合备
    if (deviceWidth = 0) {
        checkDeviceWidth()
    }
    number = Number(number)
    if (number === 0) {
        return 0
    }
    let result = (number / BASE_DEVICE_WIDTH) * (newDeviceWidth || deviceWidth)
    if (result < 0) {
        result = -result
    }
    result = Math.floor(result + EPS)
    // result + EPS 值不足 1，我务1px
    if (result === 0) {
        if (deviceDPR === 1 || !isIOS) {
            return 1
        } else {
            return 0.5
        }
    }
    return number < 0 ? -result : result
}
export default useRpx2px