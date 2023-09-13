import { fromJS } from "immutable";
import * as actionType from "./actionType";

const defaultState = fromJS({
	newDate: "",
	datePickerShow: false,
	commentData: {
		list: []
	}
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