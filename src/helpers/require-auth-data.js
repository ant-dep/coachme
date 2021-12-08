import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import {config} from '../config';
import {Navigate} from 'react-router-dom';
import {connectCoach} from '../actions/coach/coachAction';
import {loadCoachLessons} from '../actions/lesson/lessonAction';
//HOC de controle des data et de la sécurité


const RequireDataAuth = (props)=>{
    const params = useParams()
  
  	const Child = props.child


	// gestion des state
    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        
    },[])
    
    if(redirect) {
		return <Navigate to="/login"/>
	}
	return (<Child {...props} params={params}/>)
}

const mapStateToProps = (store) => {
  return {
  	coach: store.coach,
  	sport: store.lessons
  }
}

const mapDispatchToProps = {
	connectCoach,
	loadCoachLessons
}

return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);

