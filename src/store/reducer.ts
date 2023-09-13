import { combineReducers } from "redux-immutable";
import { reducer as indexReducer } from "../pages/index/store";
import { reducer as aaaReducer } from "../pages/aaa/store";
const reducer = combineReducers({
  index: indexReducer,
  aaa: aaaReducer
})

export default reducer