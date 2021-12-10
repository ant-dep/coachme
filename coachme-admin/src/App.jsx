import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuthData from "./helpers/require-auth-data";
import Header from "./containers/header";
import Register from "./containers/user/register";
import Login from "./containers/user/login";
import Logout from "./containers/user/logout";
import Admin from "./containers/admin";
import Profil from "./containers/profil";
import EditLesson from "./containers/lesson/editLesson";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route
          exact
          path="/"
          element={<RequireAuthData child={Admin} auth={true} />}
        />
        <Route
          exact
          path="/profil"
          element={<RequireAuthData child={Profil} auth={true} />}
        />
        <Route
          exact
          path="/admin/editLesson/:id"
          element={<RequireAuthData child={EditLesson} auth={true} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
