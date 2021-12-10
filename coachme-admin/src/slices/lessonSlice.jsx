import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

const initialState = {
  allLessons: [],
  futurLessons: [],
  oldLessons: [],
};

export const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setAllLessons: (state, action) => {
      let coachId = action.payload.coachId;
      axios
        .get(`/api/v1/lesson/all/${coachId}`)
        .then((res) => {
          state.allLessons = res.data.results;
          state.futurLessons = state.allLessons.filter(
            (lessons) => moment(lessons.start) > moment()
          );
          state.oldLessons = state.allLessons.filter(
            (lessons) => moment(lessons.start) < moment()
          );
        })
        .catch((err) => err);
    },
  },
});

export const { setAllLessons, setFuturLessons, setOldLessons } =
  lessonSlice.actions;

// selectors
export const selectAllLessons = (state) => state.lesson.allLessons;
export const selectFuturLessons = (state) => state.lesson.futurLessons;
export const selectOldLessons = (state) => state.lesson.oldLessons;
//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default lessonSlice.reducer;
