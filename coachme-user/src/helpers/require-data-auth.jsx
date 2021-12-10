import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { config } from "../config";
import { Navigate, useParams /*useNavigate*/ } from "react-router-dom";
import { connectUser } from "../actions/user/userAction";
//HOC de controle des data et de la sécurité

const RequireDataAuth = (props) => {
  const params = useParams();

  const Child = props.child;

  // gestion des state
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log(
      "%c ",
      "font-size: 1px; padding: 215px 385px; background-size: 770px 430px; background: no-repeat url(https://media.giphy.com/media/jQcSO7XkUhQV2kTVar/giphy.gif);"
    );

    console.log(
      "%c WESH ALORS!",
      "font-weight: bold; font-size: 50px;color: rgb(114, 176, 206); text-shadow: 3px 3px 0 rgb(11, 75, 41) , 6px 6px 0 rgb(98, 178, 47) , 9px 9px 0 rgb(68, 63, 63) , 12px 12px 0 rgb(5,148,68); margin-bottom: 12px; padding: 5%"
    );

    // on test si on est connecté via les information sur redux

    if (props.user.isLogged === false) {
      const token = window.localStorage.getItem("coachme-user-token");
      console.log(token);
      // si on est pas encore connecté on test le token
      if (token === null && props.auth) {
        setRedirect(true);
      } else {
        axios
          .get(config.api_url + "/api/v1/user/checkToken", {
            headers: { "x-access-token": token },
          })
          .then((response) => {
            console.log(response);
            if (response.data.status !== 200) {
              if (props.auth === true) {
                setRedirect(true);
              }
            } else {
              console.log("ola", response);
              let user = response.data.user;
              console.log(token);
              console.log(user);

              user.token = token;
              props.connectUser(user);
            }
          });
      }
    }
  }, [props]);

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return <Child {...props} params={params} />;
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

const mapDispatchToProps = {
  connectUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
