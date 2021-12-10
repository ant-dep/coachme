import React, { useState, useEffect } from "react";
import { config } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import { addToBasket, removeToBasket } from "../actions/basket/basketAction";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import moment from "moment";
import localization from "moment/locale/fr";
moment.updateLocale("fr", localization);

const Detail = (props) => {
  const id = props.params.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sport, setSport] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [lessons, setLessons] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    //on va recupérer les infos d'un coach dans le backend
    axios
      .get(config.api_url + "/api/v1/coach/one/" + id)
      .then((response) => {
        //on va mettre à jour les states
        setFirstName(response.data.result.firstName);
        setLastName(response.data.result.lastName);
        setSport(response.data.result.sport);
        setDescription(response.data.result.description);
        setImgUrl(response.data.result.imageUrl);

        //on va récupérer toutes les lessons de ce coach dans le backend
        axios
          .get(config.api_url + "/api/v1/lesson/all/" + id)
          .then((res) => {
            console.log(res.data.result);
            setLessons(res.data.result);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Page détail</h2>
      <CloudinaryContext cloudName={config.cloudName}>
        <div>
          <Image publicId={imgUrl}>
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
        </div>
      </CloudinaryContext>
      <h3>
        {firstName} {lastName}
      </h3>
      <p>Sport : {sport} </p>
      <p>Description : {description} </p>
      {msg !== null && <p>{msg}</p>}

      {lessons.length > 0 && (
        <ul className="calendar-user">
          {lessons.map((lesson) => {
            let price = moment(lesson.end) - moment(lesson.start);
            price = (price / 3600000) * parseFloat(lesson.tjm);
            let isInBasket = false;
            if (
              props.cart.basket.findIndex(
                (basket) => lesson.id === basket.id
              ) !== -1
            ) {
              isInBasket = true;
            }
            if (lesson.status === "free" && moment(lesson.start) > moment()) {
              return (
                <li key={lesson.id}>
                  <h3>Cours de {lesson.sport}</h3>
                  <p>{moment(lesson.start).format("L")}</p>
                  <p>
                    début : {moment(lesson.start).format("LT")} / fin :{" "}
                    {moment(lesson.end).format("LT")}
                  </p>
                  <p> Prix de cette scéance : {price} €</p>
                  {!isInBasket && (
                    <button
                      onClick={(e) => {
                        let error = props.addToBasket(
                          props.cart.basket,
                          lesson,
                          price
                        );
                        console.log(error);
                        if (error) {
                          setMsg(error);
                        }
                      }}
                    >
                      Réserver ce cours
                    </button>
                  )}
                  {isInBasket && (
                    <button
                      className="red-button"
                      onClick={(e) => {
                        console.log("click");
                        props.removeToBasket(props.cart.basket, lesson);
                      }}
                    >
                      Retirer ce cours
                    </button>
                  )}
                </li>
              );
            }
          })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  addToBasket,
  removeToBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
