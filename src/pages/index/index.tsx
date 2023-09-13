import { useEffect, forwardRef } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from '@tarojs/components';
import { Icon, Ellipsis } from '@nutui/nutui-react-taro';
// import { Ellipsis } from '@antmjs/vantui';
// import ExpandableText from '../expandable-text';

import './index.scss';

import htTeacher from '../../assets/images/ht-teacher.png';
import { actionCreators } from './store';


const Comment = forwardRef((props: any, ref) => {

  let {
    commentData,
    reply,
    albumCommentDelete,
    getReplyList,
    // stateChange,
    a
  } = props;

  useEffect(() => {
    a();
  }, [])
  return (
    <View ref={ref} className='comment'>
      {commentData.length > 0 &&
        <>
          {commentData.map((val, index) => {
            return (<>
              {val &&
                <View key={index}>
                  <View className='header'>
                    <Image src={val.userIcon ? val.userIcon : ''} mode='widthFix' />
                    {val.userType == 1 && <Image src={htTeacher} />}
                    <Text>{val.userNickname}</Text>
                  </View>
                  <View className='shrink'>
                    <View className='content'>
                      <Text className='textClamp'>{val.commentContent.replace(/\\n/g, '\n')}</Text>
                    </View>
                    <View className='operation'>
                      <Text>{val.createTime}</Text>
                      <View>
                        {val.canModify !== 1 && <View onClick={() => { reply(1, val) }}>
                          <Icon name='edit'></Icon>
                          <Text>修改</Text>
                        </View>}
                        {val.canReply == 1 && <View onClick={() => { reply(0, val) }}>
                          <Icon name='message'></Icon>
                          <Text>回复</Text>
                        </View>}
                        {val.canDelete == 1 && <View onClick={() => { albumCommentDelete(commentData, val, index); }}>
                          <Icon name='del'></Icon>
                          <Text>删除</Text>
                        </View>}
                      </View>
                    </View>
                    {val.replyList.list.length > 0 &&
                      <View className='item'>
                        {val.replyList.list.map((v, i) => {
                          return (<>

                            {v && <View key={i}>
                              <View className='header'>
                                <Image src={v.userIcon ? v.userIcon : ''} mode='widthFix' />
                                {v.userType == 1 && <Image src={htTeacher} />}
                                <Text>{v.userNickname}</Text>
                              </View>
                              <View className='shrink'>
                                {v.replyTarget && <View className='replyTarget'>
                                  {/* {v.replyTarget.replace(/\\n/g, '\n')} */}
                                  <Ellipsis content={v.replyTarget.replace(/\\n/g, '\n')} direction='end' rows={2} expandText='展开' collapseText='收起' />
                                  {/* <Ellipsis rows={2}>{v.replyTarget.replace(/\\n/g, '\n')}</Ellipsis> */}
                                  {/* {v.replyTarget && <ExpandableText
                                    longText={v.replyTarget.replace(/\\n/g, '\n')}
                                    line={2}
                                    lineHeight='34'
                                    expand-icon={false}
                                    expandText='展开'
                                    foldText='收起'
                                  />} */}
                                </View>}
                                <View className='content'>
                                  {/* {v.commentContent.replace(/\\n/g, '\n')} */}
                                  <Ellipsis content={v.commentContent.replace(/\\n/g, '\n')} direction='end' rows={2} expandText='展开' collapseText='收起' />
                                  {/* <Ellipsis rows={2}>{v.commentContent.replace(/\\n/g, '\n')}</Ellipsis> */}
                                  {/* {v.commentContent && <ExpandableText
                                    longText={v.commentContent.replace(/\\n/g, '\n')}
                                    line={2}
                                    expand-icon={false}
                                    lineHeight='34'
                                    expandText='展开'
                                    foldText='收起'
                                  />} */}
                                </View>
                                <View className='operation'>
                                  <Text>{v.createTime}</Text>
                                  <View>
                                    {v.canModify !== 1 && <View onClick={() => { reply(1, v) }}>
                                      <Icon name='edit'></Icon>
                                      <Text>修改</Text>
                                    </View>}
                                    {/* {v.canReply == 1 && <View onClick={() => { 
                                      stateChange('commenFocus', true);
                                      stateChange('commentPlaceholder', v.userNickname);
                                      reply(0, v);
                                    }}>
                                      <Icon name='message'></Icon>
                                      <Text>回复</Text>
                                    </View>} */}
                                    {v.canDelete == 1 && <View onClick={() => { albumCommentDelete(commentData, v, index, i) }}>
                                      <Icon name='del'></Icon>
                                      <Text>删除</Text>
                                    </View>}
                                  </View>
                                </View>
                              </View>
                            </View>}
                          </>)
                        })}
                      </View>}
                  </View>
                  {val.replyList.hasNextPage && <View className='hasNextPage' onClick={() => { getReplyList(commentData, val, index) }}>
                    更多回复
                  </View>}
                </View>}
            </>)
          })}
        </>
      }
    </View>
  )
})

const mapStateToProps = (state: any) => {
  const getName = (name: string) => {
    return state.getIn(['index', name])
  }
  console.log(getName);
  return {
    commentData: getName('commentData').toJS(),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    a() {
      let list = { "pageNum": 1, "pageSize": 10, "size": 10, "startRow": 1, "endRow": 10, "total": 14, "pages": 2, "list": [{ "id": 5, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "Click send to get a response", "userIpLocation": null, "createTime": "2023-02-23 19:07", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 10, "startRow": 1, "endRow": 10, "total": 13, "pages": 2, "list": [{ "id": 35, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:42", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": null }, { "id": 36, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:42", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 37, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "1213213131121321313112132131311213213131121321313112132131311213213131121321313112132131311213213131", "userIpLocation": null, "createTime": "2023-02-24 17:42", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 38, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "asassxsxasxnhsausuasuxahsjxgbasgbxyasxbashjxbhasb‘xsahjbxhjsa", "userIpLocation": null, "createTime": "2023-02-24 17:43", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 47, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "asassxsxasxnhsau\nsuasuxa\nhsjxgbasgbxyasxbashjxbhasb‘xsahjbxhjsa", "userIpLocation": null, "createTime": "2023-02-28 17:38", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 48, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "现场那是科技创新把卡技术性能铯看见你想看见阿森纳\n虚拟机卡是保修卡上班\n虚拟机啊可是你想看撒娇你想看见铯", "userIpLocation": null, "createTime": "2023-02-28 17:38", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 50, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "2132131\n21335", "userIpLocation": null, "createTime": "2023-02-28 21:17", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: 简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复" }, { "id": 51, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "2132131\n21335", "userIpLocation": null, "createTime": "2023-02-28 21:18", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": null }, { "id": 52, "userId": 530, "userType": 2, "userNickname": "微信用户(176****6548)", "userIcon": null, "commentContent": "这是\\n一个新增\\n的评论\\n", "userIpLocation": null, "createTime": "2023-02-28 21:21", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": null }, { "id": 56, "userId": 530, "userType": 2, "userNickname": "微信用户(176****6548)", "userIcon": null, "commentContent": "铭记\\n一致性", "userIpLocation": null, "createTime": "2023-02-28 22:09", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": "@XT15098040: asassxsxasxnhsau\nsuasuxa\nhsjxgbasgbxyasxbashjxbhasb‘xsahjbxhjsa" }], "prePage": 0, "nextPage": 2, "isFirstPage": true, "isLastPage": false, "hasPreviousPage": false, "hasNextPage": true, "navigatePages": 8, "navigatepageNums": [1, 2], "navigateFirstPage": 1, "navigateLastPage": 2, "firstPage": 1, "lastPage": 2 } }, { "id": 6, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "课评内容", "userIpLocation": null, "createTime": "2023-02-23 19:08", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 1, "startRow": 1, "endRow": 1, "total": 1, "pages": 1, "list": [{ "id": 55, "userId": 530, "userType": 2, "userNickname": "微信用户(176****6548)", "userIcon": null, "commentContent": "想啊是潇洒", "userIpLocation": null, "createTime": "2023-02-28 21:51", "canModify": 0, "canReply": 1, "canDelete": 1, "replyTarget": null }], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [1], "navigateFirstPage": 1, "navigateLastPage": 1, "firstPage": 1, "lastPage": 1 } }, { "id": 25, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-23 19:27", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 26, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-23 19:27", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 27, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-23 19:27", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 28, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:36", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 29, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:36", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 31, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:36", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 33, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:41", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }, { "id": 34, "userId": 137202, "userType": 1, "userNickname": "XT15098040", "userIcon": "http://hp-face.bj.bcebos.com/v1/hp-face/202204/585bd63cd63945b7bc5cf06628710fa0.jpg?authorization=bce-auth-v1%2Fd00d7060ff414bf7936dfc0cf1b1cf3c%2F2022-04-19T03%3A36%3A55Z%2F-1%2F%2F9c292f1a8291264020bb34801535579a9a07c429d2f8d07b1268e9e84af1455a", "commentContent": "简单的回复简单的回复简单的回回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复简单的回复", "userIpLocation": null, "createTime": "2023-02-24 17:41", "canModify": 0, "canReply": 1, "canDelete": 1, "replyList": { "pageNum": 1, "pageSize": 10, "size": 0, "startRow": 0, "endRow": 0, "total": 0, "pages": 0, "list": [], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [], "navigateFirstPage": 0, "navigateLastPage": 0, "firstPage": 0, "lastPage": 0 } }], "prePage": 0, "nextPage": 2, "isFirstPage": true, "isLastPage": false, "hasPreviousPage": false, "hasNextPage": true, "navigatePages": 8, "navigatepageNums": [1, 2], "navigateFirstPage": 1, "navigateLastPage": 2, "firstPage": 1, "lastPage": 2 }

      const setB = (value) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(value);
          }, 3000);
        });
      };

      setB(list).then((res: any) => {
        console.log(res);
        dispatch(actionCreators.stateChange('commentData', res.list));
      }).catch((error) => {
        console.error(error);
      });
    },
    // getReplyList(commentData, val, index) {
    //   // 更多回复
    //   let newCommentData = Object.assign(commentData, {});
    //   let obj = {
    //     parentCommentId: val.id,
    //     pageNum: ++val.replyList.pageNum,
    //     pageSize: val.replyList.pageSize
    //   }
    //   dispatch(actionCreators.getReplyList(obj)).then((res) => {
    //     newCommentData.list[index].replyList.hasNextPage = res.hasNextPage;
    //     newCommentData.list[index].replyList.pageNum = res.pageNum;
    //     res.list.forEach((v) => {
    //       newCommentData.list[index].replyList.list.push(v);
    //     })
    //     dispatch(actionCreators.stateChange('commentData', newCommentData));
    //   })
    // },
    // albumCommentDelete(commentData, val, index, i) {
    //   // 删除评论
    //   let newCommentData = Object.assign(commentData, {});
    //   Taro.showModal({
    //     title: '提示',
    //     confirmColor: '#fa2c19',
    //     content: '确认删除该评论吗？',
    //     success: (res) => {
    //       if (res.confirm) {
    //         let obj = {
    //           commentId: val.id
    //         }
    //         dispatch(actionCreators.albumCommentDelete(obj)).then(() => {
    //           if (i != undefined) {
    //             newCommentData.list[index].replyList.list[i] = null;
    //           } else {
    //             newCommentData.list[index] = null;
    //           }
    //           dispatch(actionCreators.stateChange('commentData', newCommentData));
    //           Taro.showToast({
    //             title: '删除成功',
    //             icon: 'none',
    //             duration: 1000
    //           });
    //         })
    //       }
    //     }
    //   })
    // },
    // stateChange(name: string, value: any) {
    //   // state改变事件
    //   dispatch(actionCreators.stateChange(name, value));
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);