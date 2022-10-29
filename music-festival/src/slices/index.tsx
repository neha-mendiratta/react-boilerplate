import { combineReducers } from 'redux';
import musicReducer from "./music";


export type RootState = ReturnType<typeof rootReducer>;

const appReducer = combineReducers({
  music: musicReducer,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
