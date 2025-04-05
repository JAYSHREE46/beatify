import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  artistDetails: [],
}

export const artistSlice = createSlice({
  name: 'Login Slice',
  initialState,
  reducers: {
    artistUpdate: (state=initialState, action) => {
      console.log(action);
      return {
        ...state,
        artistDetails: action.payload.artists
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { artistUpdate } = artistSlice.actions

export default artistSlice.reducer