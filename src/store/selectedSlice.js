import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedSong:{},
}

export const selectedSongSlice = createSlice({
  name: 'Selected Song Slice',
  initialState,
  reducers: {
    songUpdate: (state=initialState, action) => {
      console.log(action);
      return {
        ...state,
        selectedSong: action.payload
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { songUpdate } = selectedSongSlice.actions

export default selectedSongSlice.reducer