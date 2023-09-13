import { forwardRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from '@tarojs/components';
import { Swiper, SwiperItem } from '@nutui/nutui-react-taro';
import './index.scss';
import { actionCreators } from './store';

const Aaa = forwardRef((props: any, ref) => {
  let {
    stateChange,
    swiperCurrent,
    albumList,
  } = props;

  useEffect(() => {
  }, [])

  return (
    <View ref={ref} className='aaa'>
      <View>{swiperCurrent + 1}/{albumList.length}</View>
      <Swiper
        loop={!false}
        initPage={swiperCurrent}
        onChange={(e) => {
          stateChange('swiperCurrent', e);
        }}
        className='swiper-view'
      >
        {albumList.map((val, index) => {
          return (
            <SwiperItem className='swiper-item' key={index}>
              <img
                src={val.imgUrl}
              />
            </SwiperItem>
          )
        })}
      </Swiper>
    </View>
  )
})

const mapStateToProps = (state: any) => {
  const getName = (name: string) => {
    return state.getIn(['aaa', name])
  }
  return {
    albumList: getName('albumList').toJS(),
    swiperCurrent: getName('swiperCurrent')
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    stateChange(name: string, value: any) {
      // state改变事件
      dispatch(actionCreators.stateChange(name, value));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Aaa);