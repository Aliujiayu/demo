// import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './index.scss'
import { Button, DatePicker } from '@nutui/nutui-react-taro';
import { connect } from "react-redux";
import { actionCreators } from "./store";


const index = (props: any) => {
  let {
    mobile,
		stateChange,
		datePickerShow,
		newDate
	} = props;
  return (
    <View className='index'>
        <Button type="primary" className='btn' onClick={()=>{
          stateChange("datePickerShow", true)
        }}>{newDate?newDate:"点我"}</Button>
        <DatePicker
			title="选择生日"
			visible={datePickerShow}
			isShowChinese
			modelValue={newDate ? new Date(newDate) : new Date()}
			maxDate={new Date()}
			onCloseDatePicker={() => stateChange("datePickerShow", false)}
			onConfirmDatePicker={(values) => { stateChange("newDate", values.join("/")) }}
		/>
      </View>
  )
}

const mapStateToProps = (state: any) => {
	const getName = (name: string) => {
		return state.getIn(["index", name])
	}
	return {
		newDate: getName("newDate"), // 日期
        datePickerShow: getName("datePickerShow"), // 日期选择
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		stateChange(name: string, value: any) {
			// state改变事件
			dispatch(actionCreators.stateChange(name, value));
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(index)