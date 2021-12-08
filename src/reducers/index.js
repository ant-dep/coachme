import { combineReducers } from "redux";
import CoachReducer from './coachReducer';
import LessonReducer from './lessonReducer';

const rootReducer = combineReducers({
    coach: CoachReducer,
    lessons: LessonReducer
});

export default rootReducer;