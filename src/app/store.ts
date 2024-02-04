import { configureStore } from '@reduxjs/toolkit'
import columnReducer from '../features/column/columnSlice'
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        column: columnReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
