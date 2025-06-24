import {configureStore} from '@reduxjs/toolkit'
import userDataSliceReducer from '../store/userDataSlice'

export const store = configureStore({
    reducer: {
        user: userDataSliceReducer,
    }
        
})