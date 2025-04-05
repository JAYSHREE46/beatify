import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  favSong: [],
}

export const favSlice = createSlice({
  name: 'Favorite Song',
  initialState,
  reducers: {
    favSongUpdate: (state=initialState, action) => {
      return {
        ...state,
        favSong: [...state.favSong, action.payload]
      }
    },
    favSongRemove: (state=initialState, action)=>{
      return {
        ...state, 
        favSong: action.payload
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { favSongUpdate,favSongRemove } = favSlice.actions

export default favSlice.reducer