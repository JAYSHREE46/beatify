import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loginDetails: {},
  isLogin: false,
  time: null,
  showModal: false,
}

export const loginSlice = createSlice({
  name: 'Login Slice',
  initialState,
  reducers: {
    loginUpdate: (state=initialState, action) => {
      return {
        ...state,
        isLogin: true,
        loginDetails: action.payload,
        time: (Date.now() + 55*60*1000)
      }
    },
    loginCancel: (state = initialState, action)=>{
      return {
        ...state, 
        isLogin: false,
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginUpdate, loginCancel } = loginSlice.actions

export default loginSlice.reducer