import {applyMiddleware, legacy_createStore,combineReducers} from "redux";
import { reducer as UserReducer} from "./User/reducer";
import {reducer as ScoreReducer} from "./LeaderBoard/reducer"
import thunk from "redux-thunk"

const rootReducer=combineReducers({ScoreReducer,UserReducer});

const store=legacy_createStore(rootReducer,applyMiddleware(thunk));


export {store};