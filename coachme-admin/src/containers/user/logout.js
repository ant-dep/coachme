import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogout } from "../../slices/coachSlice";
//exemple de hook
const Logout = (props) => {
  const dispatch = useDispatch();

  // se déclenche au changement de props
  useEffect(() => {
    window.localStorage.removeItem("coachme-token");
    dispatch(setLogout());
  }, []);

  return <Navigate to="/login" />;
};

export default Logout;
