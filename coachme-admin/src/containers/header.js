import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCoach } from "../slices/coachSlice";

//Gestion de la naivgation
function Header() {
  const coach = useSelector(selectCoach);

  return (
    <div className="header-nav">
      <nav>
        <div className="list">
          {coach.isLogged === false && (
            <Link to="/register">S'enregistrer</Link>
          )}
          {coach.isLogged === false && <Link to="/login">Se connecter</Link>}
          {coach.isLogged && <Link to="/">Admin</Link>}
          {coach.isLogged && <Link to="/profil">{coach.infos.firstName}</Link>}
          {coach.isLogged && <Link to="/logout">Se déconnecter</Link>}
        </div>
      </nav>
    </div>
  );
}

export default Header;
