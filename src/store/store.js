import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from './AuthSlice'
import postSliceReducer from './PostSlice'

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        post: postSliceReducer
    }
})
