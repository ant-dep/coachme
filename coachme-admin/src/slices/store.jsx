import { configureStore } from "@reduxjs/toolkit";
import coachReducer from "./coachSlice";
import lessonReducer from "./lessonSlice";

const store = configureStore({
  reducer: {
    coach: coachReducer,
    lesson: lessonReducer,
  },
});

export default store;
