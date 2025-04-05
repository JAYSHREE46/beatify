import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import artistReducer from './artistSlice'
import selectedReducer from './selectedSlice'
import favSongReducer from './favSlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'spotifyDetails',
  storage,
};

const reducers = combineReducers({ 
    login: loginReducer,
    artist: artistReducer,
    song: selectedReducer,
    favSong: favSongReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
});

