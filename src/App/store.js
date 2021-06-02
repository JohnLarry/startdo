import {configureStore} from '@reduxjs/toolkit';
import todayReducer from "../features/daydo/todayDoSlice"
export const store = configureStore({
    reducer:{
        today : todayReducer,
    },
})