import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import rootReducer from "../reducers/RootReducer";

// Configure Redux Persist
const persistConfig = {
  key: "root", // The key to use for storing data
  storage, // Choose between localStorage or sessionStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// for middle ware check https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);