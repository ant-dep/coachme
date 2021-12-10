import React, { useState } from "react";
import axios from "axios";
import { config } from "../../config";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  const onSubmitForm = () => {
    let datas = {
      email: email,
      password: password,
    };

    // envoie le formulaire vers l'api
    axios
      .post(config.api_url + "/api/v1/user/login", datas)
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          // si tout se passe bien enregistrement du token dans
          // le localstorage
          window.localStorage.setItem(
            "coachme-user-token",
            response.data.token
          );
          setRedirect(true);
        }
      })
      .catch((err) => console.log(err));
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
