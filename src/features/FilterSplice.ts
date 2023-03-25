import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface filter {
    dientich: string;
    tinh: string;
    mx: string;
    m: string;
}

const filterSplice = createSlice({
    name: 'filter',
    initialState: {
        dientich: '',
        tinh: '',
        mx: '',
        m: ''
    },
    reducers: {
        setFilter(state, action: PayloadAction<filter>) {
            state.dientich=action.payload.dientich
            state.tinh=action.payload.tinh
            state.mx=action.payload.mx
            state.m=action.payload.m
        },
       
    },
});
//action
export const filterAcction = filterSplice.actions;



// reducer
export const filterReducer = filterSplice.reducer;
