import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user/userAction";
//import {Navigate} from "react-router-dom";

//Gestion de la naivgation
class Header extends React.Component {
  render() {
    return (
      <div className="header-nav">
        <nav>
          <div className="list1">
            <Link to="/">Accueil</Link>
            <Link to="/search">Cours</Link>
            {this.props.user.isLogged && <Link to="/profil">Profil</Link>}
            <Link to="/basket">
              Panier{" "}
              {this.props.cart.basket.length > 0 && (
                <span className="span-basket">
                  {this.props.cart.basket.length}
                </span>
              )}
            </Link>
            {this.props.user.isLogged === false && (
              <Link to="/register">S'enregister</Link>
            )}
            {this.props.user.isLogged === false && (
              <Link to="/login">Se connecter</Link>
            )}
            {this.props.user.isLogged && (
              <Link to="/logout">Se déconnecter</Link>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    cart: store.basket,
    user: store.user,
  };
};
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
