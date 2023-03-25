import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import creatSAGA from 'redux-saga';

import { filterReducer } from '../features/FilterSplice';


export const store = configureStore({
    reducer: {
        Filter: filterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
