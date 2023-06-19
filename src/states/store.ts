import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/states/slices/authSlice";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error("Error loading state from localStorage:", error);

    return undefined;
  }
};

const preloadedState = loadStateFromLocalStorage();

// Save state to localStorage
const saveStateToLocalStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

export const store = configureStore({
  reducer: { authReducer },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  console.log(state);

  saveStateToLocalStorage(state);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
