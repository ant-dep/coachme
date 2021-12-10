import React, { useState } from "react";
import axios from "axios";
import { config } from "../../config.js";
import { Navigate } from "react-router-dom";
import { sports } from "../../helpers/sport";

const Register = (props) => {
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [sport, setSport] = useState("");
  const [tjm, setTjm] = useState("");

  // on envoie le formulaire
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
          setError("Addresse introuvable!");
        } else {
          // localisation pour l'appli mobile
          let lat = res.data.features[0].geometry.coordinates[1];
          let lng = res.data.features[0].geometry.coordinates[0];
          console.log(lat);
          console.log(lng);

          let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
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
            .post(config.api_url + "/api/v1/coach/save", datas)
            .then((response) => {
              console.log(response);
              if (response.data.status === 200) {
                setRedirect(true);
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h2>S'enregistrer</h2>
      {error !== null && <p className="error">{error}</p>}
      <form
        className="c-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <input
          type="text"
          placeholder="Votre Prénom"
          onChange={(e) => {
            setFirstName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Nom"
          onChange={(e) => {
            setLastName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Mail"
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <input
          type="password"
          placeholder="Votre Mot de passe"
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        />
        <textarea
          type="decription"
          placeholder="Décrivez vous !"
          onChange={(e) => {
            console.log(e.currentTarget.value);
            setDescription(e.currentTarget.value);
          }}
        ></textarea>
        <input
          type="text"
          placeholder="Votre Adresse"
          onChange={(e) => {
            setAddress(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Code postal"
          onChange={(e) => {
            setZip(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Ville"
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
            return (
              <option key={index} value={sport}>
                {sport}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Votre Tarif Horaire"
          onChange={(e) => {
            setTjm(e.currentTarget.value);
          }}
        />

        <input type="submit" name="Enregister" />
      </form>
    </div>
  );
};

export default Register;
