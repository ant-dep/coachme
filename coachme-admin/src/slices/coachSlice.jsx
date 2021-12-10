import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infos: {},
  isLogged: false,
};

export const coachSlice = createSlice({
  name: "coach",
  initialState,
  reducers: {
    setCoach: (state, action) => {
      state.infos = action.payload; // update the state with the action commin in named "payload"
      state.isLogged = true;
    },
    setLogout: (state) => {
      state.infos = {};
      state.isLogged = false;
    },
  },
});

export const { setCoach, setLogout } = coachSlice.actions;

// selectors
export const selectCoach = (state) => state.coach;

//*  createSlice will return an object that looks like:
// {
//     name : string,
//     reducer : ReducerFunction,
//     actions : Record<string, ActionCreator>,
//     caseReducers: Record<string, CaseReducer>
// }
//
// *//
export default coachSlice.reducer;
