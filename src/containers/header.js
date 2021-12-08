import React from 'react';
import {Link} from 'react-router-dom';
//import logo from '../assets/logo/logo-beer.jpg'
import {connect} from "react-redux";
//import {logoutUser} from "../actions/user/userAction";
import {Redirect} from "react-router-dom";


//Gestion de la naivgation
class Header extends React.Component {
	
	render(){
		
		return (
			<div className="header-nav">
				<nav>
				
					
					<div className="list">
						{this.props.coach.isLogged === false && <Link to="/register">S'enregistrer</Link>} 
						{this.props.coach.isLogged === false &&  <Link to="/login">Se connecter</Link> }
						{this.props.coach.isLogged && <Link to="/">Admin</Link> }
						{this.props.coach.isLogged && <Link to="/profil">{this.props.coach.infos.firstName}</Link> }
						{this.props.coach.isLogged && <Link to="/logout">Se déconnecter</Link> }
				
					</div>
				</nav>
	

			</div>
		)
	}

}

const mapStateToProps = (store) => {
  return {
  	coach: store.coach
  }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);