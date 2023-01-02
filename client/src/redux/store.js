import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import searchSlice from './searchSlice';

//	redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  search: searchSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //	The function below will be used to retrieve entries from eachvalue. this must be false for this app because I need `Object.entries`, which only available with false (default)
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
