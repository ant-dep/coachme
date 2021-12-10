import React, { useState, useEffect } from "react";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { selectAllLessons, setAllLessons } from "../../slices/lessonSlice";
import { selectCoach } from "../../slices/coachSlice";
import { useParams } from "react-router";

//exemple de hook
const EditLesson = (props) => {
  const dispatch = useDispatch();
  const lessons = useSelector(selectAllLessons);
  const coach = useSelector(selectCoach);

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [msg, setMsg] = useState(null);

  const id = useParams().id;

  useEffect(() => {
    //récup la lesson par son id avec findIndex
    let lessonIndex = lessons.findIndex(
      (lesson) => parseInt(lesson.id) === parseInt(id)
    );

    //met à jour la state start et end
    if (lessonIndex !== -1) {
      setStart(new Date(lessons[lessonIndex].start));
      setEnd(new Date(lessons[lessonIndex].end));
    }
  }, [lessons]);

  const submitEdit = () => {
    //on fait notre objet data
    let data = {
      start: moment(start).add(2, "hours"),
      end: moment(end).add(2, "hours"),
    };
    //on envoi une requète ajax de mise à jour du rdv
    axios
      .put(config.api_url + "/api/v1/lesson/updateAll/" + id, data, {
        headers: { "x-access-token": coach.infos.token },
      })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setMsg("La Modification a bien été effectuée");
          dispatch(setAllLessons(coach.infos.id));
        }
      });
  };

  return (
    <div>
      <Link to="/">Retour admin</Link>
      <h2>Editez un cours</h2>
      <div>
        <p>Modification de début</p>
        <DateTimePicker
          onChange={(date) => {
            setStart(date);
          }}
          value={start}
          locale="fr"
        />
      </div>
      <div>
        <p>Modification de la fin</p>
        <DateTimePicker
          onChange={(date) => {
            setEnd(date);
          }}
          value={end}
          locale="fr"
        />
      </div>
      <button
        onClick={(e) => {
          submitEdit();
        }}
      >
        EDITEZ !
      </button>
      {msg !== null && <p>{msg}</p>}
    </div>
  );
};
export default EditLesson;
