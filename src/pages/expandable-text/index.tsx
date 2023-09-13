import { FC, useState, useEffect, useRef, } from 'react'
import Taro from "@tarojs/taro";
import { Text, View } from "@tarojs/components";

import useRpx2px from "./useRpx2px";
import "./index.scss";

export function getRect(selector: any) {
	return new Promise((resolve) => {
		Taro.createSelectorQuery()
			.select(selector)
			.boundingClientRect()
			.exec((rect: any = []) => {
				return resolve(rect[0]);
			});
	});
}

export interface expandableTextTypes {
	line: string | number, // 展示多少行
	lineHeight: string | number, // 行高
	longText: string, // 文案
	useExpandSlot?: Boolean, // 自定义展开、收起布局
	expandText: string, // 自定义展开文字
	foldText: string, // 自定义收起文字
}
const ExpandableText: FC<expandableTextTypes> = (props: any) => {
	let { line, lineHeight, longText, useExpandSlot, expandText, foldText } = props;
	console.log();
	const textRef = useRef();

	const [collapse, setCollapse] = useState(true); // 是否处于文本收缩状态，默认是
	const [textHeight, setTextHeight] = useState(0); // 全量所占文本高度


	const lines = () => {
		let ll = 0
		if (textHeight > 0 && lineHeight > 0) {
			const actual: any = useRpx2px(lineHeight)
			console.log(actual);
			ll = Math.ceil(textHeight / actual)
		}
		console.log(ll);
		return ll
	}

	useEffect(() => {
		setTimeout(() => {
			getRect(`.jj-content`).then((res: any) => {
				setTextHeight(res.height)
			})
		}, 100)
	}, [textHeight])


	return (
		<View className='jj-expandable-text'>
			<View className={!collapse ? 'text expandable' : 'text'} style={{
				'lineHeight': lineHeight + 'rpx',
				'maxHeight': collapse ? (lineHeight * line) + 'rpx' : '1000px'
			}}
			>
				{lines()}
				{lines() > line &&
					<View onClick={() => { setCollapse(!collapse); }} className={(!collapse || line > 1) ? 'clearboth btn' : 'btn'} style={{ height: lineHeight + 'rpx' }}>
						{
							useExpandSlot ?
								<>
									{collapse ?
										<slot name='expand-icon'></slot> :
										<slot name='fold-icon'></slot>}
								</> :
								<Text className='opt-hint'>{collapse ? expandText : foldText}</Text>
						}
					</View>
				}
				<Text ref={textRef} id='jj-content' className='jj-content'>
					{longText ? longText : ''}
				</Text>
			</View>
		</View>
	);
}

export default ExpandableText;