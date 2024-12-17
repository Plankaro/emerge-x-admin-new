import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "@/store/api/auth";
import { UserApi } from "./api/user";
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { BlogApi } from "./api/blogs";
import { NewsApi } from "./api/news";
import { ContactApi } from "./api/conatct";
import { DemoRequestApi } from "./api/demorequest";


// const persistConfig = {
//   key: "userPackage",
//   storage: storage,
// };

const TWO_DAY = 24 * 2 * 60 * 60 * 1000;

// const persistedSidebarReducer = persistReducer(persistConfig, SideBarSlice);

// Create the store instance directly
export const store = configureStore({
  reducer: {
    // sidebar: persistedSidebarReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [NewsApi.reducerPath]: NewsApi.reducer,
    [ContactApi.reducerPath]: ContactApi.reducer,
    [DemoRequestApi.reducerPath]: DemoRequestApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(AuthApi.middleware,
      UserApi.middleware,
      BlogApi.middleware,
      NewsApi.middleware,
      ContactApi.middleware,
      DemoRequestApi.middleware,
    ),
});

// Create the persistor with the `store` instance
export const persistor = persistStore(store);

// Purge persisted data after TWO_DAY milliseconds
setTimeout(() => {
  persistor.purge();
}, TWO_DAY);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

