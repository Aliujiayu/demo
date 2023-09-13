import { fromJS } from "immutable";
import * as actionType from "./actionType";

const defaultState = fromJS({
	swiperCurrent: 0,
	albumList: [{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},{
		"imgUrl": "https://hp-photo.cdn.bcebos.com/v1/hp-photo/20230529/8b171af8-279f-4ab9-acb9-df49818540dc.jpg?x-bce-process=image/crop,x_0,y_0,w_1124,h_1124/auto-orient,o_1/resize,p_26/",
	},]
});

export default (state: any = defaultState, action: any) => {
	switch (action.type) {
		case actionType.STATE_CHANGE:
			return state.set(action.name, fromJS(action.value));
		default:
			return state;
	}
	return state
}