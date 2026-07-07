import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './authSlice'
import postSliceReducer from './postSlice'

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        post: postSliceReducer
    }
})
