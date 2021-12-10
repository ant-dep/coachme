import React, { useState, useEffect } from "react";
import { config } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";
import moment from "moment";
import localization from "moment/locale/fr";
moment.updateLocale("fr", localization);

const Calendar = (props) => {
  const dispatch = useDispatch();
  const coach = useSelector(selectCoach);

  const [changeTime, setChangeTime] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  const onClickDelete = (id) => {};

  return <ul className="calendar-admin"></ul>;
};

export default Calendar;
