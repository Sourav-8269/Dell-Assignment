import {applyMiddleware, legacy_createStore,combineReducers} from "redux";
import { reducer as UserReducer} from "./User/reducer";
import {reducer as ProductReducer} from "./Product/reducer"
import thunk from "redux-thunk"

const rootReducer=combineReducers({ProductReducer,UserReducer});

const store=legacy_createStore(rootReducer,applyMiddleware(thunk));


export {store};