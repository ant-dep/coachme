import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../config.js";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // on envoie le formulaire
  const onSubmitForm = () => {
    let datas = {
      email: email,
      password: password,
    };
    // envoie le formulaire vers l'api

    axios
      .post(config.api_url + "/api/v1/coach/login", datas)
      .then((response) => {
        console.log(response);
        if (response.data.status === 503) {
          setError("Email introuvable!");
        } else if (response.data.status === 401) {
          setError("Mauvais password!");
        } else {
          window.localStorage.setItem("coachme-token", response.data.token);
          setRedirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Se connecter</h2>
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

        <input type="submit" name="Enregister" />
      </form>
    </div>
  );
};

export default Login;
