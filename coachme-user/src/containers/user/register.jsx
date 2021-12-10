import React, { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { Navigate } from "react-router-dom";

const Register = (props) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  // on envoie le formulaire
  const onSubmitForm = () => {
    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      address: address,
      city: city,
      zip: zip,
    };
    // envoie le formulaire vers l'api
    axios.post(config.api_url + "/api/v1/user/save", datas).then((response) => {
      setRedirect(true);
    });
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
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
            setFirstname(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Votre Nom"
          onChange={(e) => {
            setLastname(e.currentTarget.value);
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

        <input type="submit" name="Enregister" />
      </form>
    </div>
  );
};

export default Register;
