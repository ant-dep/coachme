import React, { useState, useEffect } from "react";
import moment from "moment";
import Calendar from "../components/calendar";
import AddLesson from "../components/addLesson";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";
import {
  selectAllLessons,
  selectFuturLessons,
  selectOldLessons,
} from "../slices/lessonSlice";

const Admin = (props) => {
  const AllLessons = useSelector(selectAllLessons);
  const futurLessons = useSelector(selectFuturLessons);
  const oldLessons = useSelector(selectOldLessons);
  // gestion des state
  const [lessons, setLessons] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);

  useEffect(() => {
    console.log(AllLessons);
    //mise à jour des lecons
    setLessons(AllLessons);
  }, [AllLessons]);

  const onClickChangeLessons = (type) => {
    //condition switch qui va récupérer une des 3 propriété dans la state globale lesson
    switch (type) {
      case "all":
        setLessons(AllLessons);
        break;

      case "futur":
        setLessons(futurLessons);
        break;

      case "old":
        setLessons(oldLessons);
        break;

      default:
        setLessons(AllLessons);
        break;
    }
  };

  return (
    <div>
      <h2>Page Admin</h2>
      <div>
        <button
          onClick={(e) => {
            setIsPopUp(true);
          }}
        >
          Ajouter un cours
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            onClickChangeLessons("all");
          }}
        >
          Toutes
        </button>
        <button
          onClick={(e) => {
            onClickChangeLessons("futur");
          }}
        >
          à venir
        </button>
        <button
          onClick={(e) => {
            onClickChangeLessons("old");
          }}
        >
          passé
        </button>
      </div>
      {isPopUp && (
        <AddLesson
          onClose={(e) => {
            setIsPopUp(false);
          }}
        />
      )}
      {lessons.length > 0 && <Calendar lessons={lessons} />}
    </div>
  );
};

export default Admin;
