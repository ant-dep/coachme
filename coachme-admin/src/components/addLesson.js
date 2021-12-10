import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import { config } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";

const AddLesson = (props) => {
  const dispatch = useDispatch();
  const coach = useSelector(selectCoach);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onClickSaveLesson = () => {};

  return <div className="modal-lesson"></div>;
};

export default AddLesson;
