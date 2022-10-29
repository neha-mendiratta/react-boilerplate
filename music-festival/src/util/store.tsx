import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from '../slices';


const store = configureStore({
    reducer: rootReducer,
    middleware:getDefaultMiddleware(),
})
  export type AppDispatch = typeof store.dispatch;
  export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>;

  

  
// useSelector with type definitions attached to it
export function useSelector<TSelected = unknown>(
    selector: (state: RootState) => TSelected
  ): TSelected {
    return useReduxSelector(selector);
  }
  
  // useDispatch with type definitions attached to it
  export const useDispatch = () => useReduxDispatch<AppDispatch>();
  
  export default store;

