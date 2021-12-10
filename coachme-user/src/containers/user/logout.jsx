import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/user/userAction";
import { Navigate } from "react-router-dom";

//page de déconnexion
const Logout = (props) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem("coachme-user-token");
    props.logoutUser();
    setRedirect(true);
  }, []);

  return <Navigate to="/login" />;
};

const mapStateToProps = (store) => {
  return {
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
