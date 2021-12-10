import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { sports } from "../helpers/sport";
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { selectCoach, setCoach } from "../slices/coachSlice";

const Profil = (props) => {
  const dispatch = useDispatch();
  const coach = useSelector(selectCoach);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [sport, setSport] = useState("");
  const [tjm, setTjm] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setFirstName(coach.infos.firstName);
    setLastName(coach.infos.lastName);
    setDescription(coach.infos.description);
    setAddress(coach.infos.address);
    setZip(coach.infos.zip);
    setCity(coach.infos.city);
    setSport(coach.infos.sport);
    setTjm(coach.infos.tjm);
  }, [props]);

  //fonction callback de cloudinary déclenché lors de l'envoi un fichier
  const checkUploadResult = (resultEvent) => {
    //si l'envoi est réussit
    if (resultEvent.event === "success") {
      console.log("RESULT", resultEvent);

      console.log("checkup info", resultEvent.info);
      //on stock l'id de la photo et celui du coach dans un objet
      let data = {
        imageUrl: resultEvent.info.public_id,
        id: coach.infos.id,
      };
      //on envoi l'objet vers le back pour modifier le nom de l'image dans la bdd
      axios
        .post(config.api_url + "/api/v1/coach/updateImg", data, {
          headers: { "x-access-token": coach.infos.token },
        })
        .then((response) => {
          if (response.data.status === 200) {
            setMsg("Votre profil a bien été édité");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //fonction d'affichage de notre interface de chargement d'images/videos de cloudinary
  const showWidget = () => {
    //paramètrage de l'interface
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: config.cloudName, //nom de mon cloud
        uploadPreset: "coachme", //dossier ou l'on veut envoyer
        maxImageWidth: 800, //on peut paramètrer la taille max de l'image
        cropping: false, //recadrage
      },
      (error, result) => {
        if (error) {
          console.log("Error", error);
        }
        console.log("before checkup", result);
        checkUploadResult(result); //appel de notre callback
      }
    );
    //ouverture de notre interface
    widget.open();
  };

  const onSubmitForm = () => {
    axios
      .get(
        "https://nominatim.openstreetmap.org/search?q=" +
          address +
          " " +
          zip +
          " " +
          city +
          "&format=geocodejson"
      )
      .then((res, err) => {
        if (res.data.features.length === 0) {
          setMsg("Votre adresse est mauvaise !");
        } else {
          let lat = res.data.features[0].geometry.coordinates[1];
          let lng = res.data.features[0].geometry.coordinates[0];
          console.log(lat);
          console.log(lng);

          let datas = {
            firstName: firstName,
            lastName: lastName,
            description: description,
            sport: sport,
            address: address,
            city: city,
            zip: zip,
            lat: lat,
            lng: lng,
            tjm: tjm,
          };

          //envoie le formulaire vers l'api
          axios
            .put(
              config.api_url + "/api/v1/coach/update/" + coach.infos.id,
              datas,
              { headers: { "x-access-token": coach.infos.token } }
            )
            .then((response) => {
              console.log(response);
              if (response.data.status === 200) {
                setMsg("Votre profil a bien été édité");
                axios
                  .get(config.api_url + "/api/v1/coach/one/" + coach.infos.id)
                  .then((response) => {
                    console.log("axios a marché amigo!", response);
                    dispatch(setCoach(response.data.result));
                  })
                  .catch((err) => console.log("echec rafraichissement", err));
              }
            })
            .catch((err) => console.log(err));
        }
      });
  };

  return (
    <div>
      <h2>Profil</h2>
      {msg !== null && <p>{msg}</p>}
      <br />
      {/*FORMULAIRE DE SES MORTS*/}
      <form
        className="c-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <CloudinaryContext cloudName={config.cloudName}>
          <div>
            <Image publicId={coach.infos.imageUrl} id="profilImg">
              <Transformation quality="auto" fetchFormat="auto" />
            </Image>
          </div>
        </CloudinaryContext>
        <button
          onClick={(e) => {
            e.preventDefault();
            showWidget();
          }}
        >
          Upload Photo
        </button>
        <input
          type="text"
          placeholder="Votre Prénom"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Nom"
          value={lastName}
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <textarea
          type="decription"
          placeholder="Décrivez vous !"
          value={description}
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Votre Adresse"
          value={address}
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Code postal"
          value={zip}
          onChange={(e) => {
            setZip(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Ville"
          value={city}
          onChange={(e) => {
            setCity(e.currentTarget.value);
          }}
        />
        <select
          onChange={(e) => {
            setSport(e.currentTarget.value);
          }}
        >
          {sports.map((sport, index) => {
            if (sport === coach.infos.sport) {
              return (
                <option selected key={index} value={sport}>
                  {sport}
                </option>
              );
            } else {
              return (
                <option key={index} value={sport}>
                  {sport}
                </option>
              );
            }
          })}
        </select>
        <input
          type="text"
          placeholder="Votre Tarif Horaire"
          value={tjm}
          onChange={(e) => {
            setTjm(e.currentTarget.value);
          }}
        />

        <input type="submit" name="Enregister" />
      </form>
    </div>
  );
};

export default Profil;
