import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { User } from "../types/api";

export const USER_SLICE_KEY = "user";
const userSlice = createSlice({
  name: USER_SLICE_KEY,
  initialState: { user: null as User | null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

const persistConfig = {
  key: USER_SLICE_KEY,
  version: 1,
  storage: storage,
  whitelist: ["user"],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, userSlice.reducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persister = persistStore(store);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export const dispatchSetUser = (user: User) => {
  return store.dispatch(userSlice.actions.setUser(user));
};
export const dispatchClearUser = () =>
  store.dispatch(userSlice.actions.clearUser());
export const getUser = (): User => {
  return store.getState().user;
};
