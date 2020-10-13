import React, { Component } from "react";
import { push } from "react-router-redirect";
import { connect } from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    this.props.setCurrentUser({});
    push("/");
  };

  render() {
    const { isAuthenticated ,user } = this.props.auth;

    return (
      <div>
        {!isAuthenticated ? (
          <div>
            <Link to="/">Sign Up or Login! </Link>
          </div>
        ) : (
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
              <div className="landing-copy col s12 center-align">
                <h4>
                  <b>Hey there,</b> {user.name.split(" ")[0]}
                  <p className="flow-text grey-text text-darken-1">
                    You are logged into a full-stack{" "}
                    <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
                  </p>
                </h4>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (newValue) => {
      dispatch({ type: "SET_CURRENT_USER", payload: newValue });
    },
  };
};
const mapStateToProps = (state) => ({
  auth: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
