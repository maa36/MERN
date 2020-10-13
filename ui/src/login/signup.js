import React, { Component } from "react";
import "./signup.css";
import axios from "axios";
import { push } from "react-router-redirect";
import {connect} from 'react-redux'

import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      firstName: "",
      email: "",
      password: "",
      phone: "",
      showResults : false,
      emailLogin : "",
      passwordLogin : ""
    };
  }
  componentDidMount() {
  
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
    push("/Dashboard");
    }
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });

  };

  addData = (e) => {
    this.setState({
        showResults : true,
      
      firstName: "",
      email: "",
      password: "",
      phone: "",
    })
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/register", {
        name: this.state.firstName,
      

        password: this.state.password,
        phone: this.state.phone,
        email: this.state.email,
      })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  ConfirmeCompte =  (event) => {
    var self=this;
     event.preventDefault();
    
    axios
      .post(
        "http://localhost:5000/api/signin" 
         ,
        {email :   self.state.emailLogin ,
        password : self.state.passwordLogin }
      )
      
      .then(function(response) {
        
        if (response.data._id) {
          // const result = response.data;
          const { token } = response.data;
          localStorage.setItem("jwtToken", token);
          setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
            self.props.addUser(decoded)
           
            push(        
              "/Dashboard" 
              
          );         
        }  else if (response.data.error === "invalid password" ) {
          console.log(response.data);

          alert("verifier votre mot de passe");
        
          self.props.errorUser(response.data)

        }
        else {
          console.log(response.data);

          alert("verifier votre mail");
        

          self.props.errorUser(response.data)

        }
      })
      .catch(function(error) {
        console.log(error);

      });
  };

  render() {
    return (
        <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Geeks Data</h3>
                        <p>Nous sommes  une société pionnière en matière de consulting et big data ! </p>
                        
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Inscription</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Connexion</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 className="register-heading">Créer un compte</h3>
                                <form onSubmit={this.addData}>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="firstName" onChange={this.handleInput} placeholder="Prénom *" value={this.state.firstName} />
                                        </div>
                                       
                                        <div className="form-group">
                                            <input type="password" className="form-control" onChange={this.handleInput} placeholder="Mot de passe *" name="password" value={this.state.password} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="Email *" name="email" onChange={this.handleInput} value={this.state.email} />
                                        </div>
                                        <div className="form-group">
                                            <input type="text"    className="form-control" placeholder="Téléphone *" name="phone" onChange={this.handleInput} value={this.state.phone} />
                                        </div>
                                        <input type="submit" className="btnRegister"  value="Valider"/>
                                    </div>
                                </div>
                                </form>
                            </div>
                            <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h3  className="register-heading">Se connecter</h3>
                                <div className="row register-form ">
                                    <div className="col-md-6">  
                                        <div className="form-group">
                                            <input type="email" className="form-control"  onChange={this.handleInput}
                name="emailLogin" placeholder="Email *" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" onChange={this.handleInput}
                name="passwordLogin" placeholder="Mot de passe *" />
                                        </div>                                    
                                        <input type="submit" className="btnRegister"  onClick= {this.ConfirmeCompte
            } value="Connecter"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
      

    );
  }
}


const mapDispatchToProps = dispatch => {
    return {
      addUser: newValue => {
    
  
        dispatch({ type: "SET_CURRENT_USER", payload: newValue });
       
      },
   
    };
  };
  const mapStateToProps = state => ({
    auth: state
  });
   const signup= connect(mapStateToProps,mapDispatchToProps)(Signup)
  export default signup;

