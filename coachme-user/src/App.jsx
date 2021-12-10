import React from "react";
import "./App.css";
import RequireAuth from "./helpers/require-data-auth";
import Home from "./containers/home";
import Header from "./containers/header";
import Detail from "./containers/detail";
import Register from "./containers/user/register";
import Login from "./containers/user/login";
import Logout from "./containers/user/logout";
import Profil from "./containers/profil";
import Search from "./containers/search";
import Basket from "./containers/basket";
import Payment from "./containers/payment";
import Success from "./containers/success";
import { Routes, Route, Navigate } from "react-router-dom";

// router avc un HOC RequireDataAuth
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={<RequireAuth child={Home} auth={true} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
            path="/profil"
            element={<RequireAuth child={Profil} auth={true} />}
          />
          <Route
            exact
            path="/search"
            element={<RequireAuth child={Search} auth={true} />}
          />
          <Route
            exact
            path="/basket"
            element={<RequireAuth child={Basket} auth={true} />}
          />
          <Route
            exact
            path="/success"
            element={<RequireAuth child={Success} auth={true} />}
          />
          <Route
            exact
            path="/payment"
            element={<RequireAuth child={Payment} auth={true} />}
          />
          <Route
            exact
            path="/detail/:id"
            element={<RequireAuth child={Detail} auth={true} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
