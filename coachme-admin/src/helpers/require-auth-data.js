import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { setAllLessons, selectAllLessons } from "../slices/lessonSlice";
import { selectCoach, setCoach } from "../slices/coachSlice";
//HOC de controle des data et de la sécurité

const RequireDataAuth = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const coach = useSelector(selectCoach);
  const lessons = useSelector(selectAllLessons);

  const Child = props.child;

  // gestion des state
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("coachme-token");

    //si la state (redux) des lessons est un tableau vide, est que le coach est connecté
    if (lessons.length === 0 && coach.isLogged) {
      //appel de l'action de redux pour charger les lessons du coach
      dispatch(setAllLessons(coach.infos.id));
    }

    if (token === null && props.auth) {
      setRedirect(true);
    } else {
      if (coach.isLogged === false) {
        axios
          .get(config.api_url + "/api/v1/coach/checkToken", {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            console.log("RequireAuth useEffect", res);
            //si la requète ajax est ok
            if (res.data.status !== 200) {
              if (props.auth) {
                window.localStorage.removeItem("coachme-token");
                setRedirect(true);
              }
            }
            //sinon
            else {
              let coach = res.data.coach[0];
              coach.token = token;
              console.log("coach", coach);
              //on va connecter l'utilisateur
              dispatch(setCoach(coach));
            }
          });
      }
    }
  }, [lessons, coach]);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return <Child {...props} params={params} />;
};

export default RequireDataAuth;
