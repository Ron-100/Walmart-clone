import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status : false,
    dataUser: null
}

const userDataSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action) {
            state.status = true
            state.dataUser = action.payload.dataUser;
        },
        clearInfo(state) {
            state.status = false
            state.dataUser = null;
        },
    }
})

export const { setUserInfo, clearInfo } = userDataSlice.actions;
export default userDataSlice.reducer;
