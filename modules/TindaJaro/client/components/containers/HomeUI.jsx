import { Component } from 'react';
import { Router } from 'react-router'

import PageHeader from '../divs/PageHeader';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';

export default class HomeUI extends Component {

  showLoginTab(event) {
      this.handleReset();
      $("#login-form").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $("#register-form-link").removeClass("active");
      $("#login-form-link").addClass("active");
      event.preventDefault();
  }

  showRegisterTab(event) {
    $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $("#login-form-link").removeClass("active");
      $("#register-form-link").addClass("active");
      event.preventDefault();
  }

  handleReset() {
        $("#regEmail").val("");
        $("#regPassword").val("");
        $("#fullName").val("");
        $("#homeAddress").val("");
        $("#phoneNumber").val("");
        $("#confirmPassword").val("");
        $("#accountType").val("RegisterAs");
        $("#confirmPassword").css("background-color", "white");
        $("#regPassword").css("background-color", "white");
        $("#confirmMessage").html("");
        $("#confirmLength").html("");
        $("#confirmMessage2").html("");
        $("#phoneNumber").css("background-color", "white");
        $("#regEmail").css("background-color", "white");
        $("#confirmEmail").html("");
        $("#confirmSubmit").html("");
        $("#accountType").css("background-color", "white");
  }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);

    if (Meteor.userId()) {
      return false;
    }
    const show = {
      display: 'block'
    };

    const hide = {
      display: 'none'
    };

    return (
      <div className="container">
      <PageHeader/>
      <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-login">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-6">
                <a href="#" className="active" id="login-form-link" onClick={this.showLoginTab.bind(this)}>Login</a>
              </div>
              <div className="col-xs-6">
                <a href="#" id="register-form-link" onClick={this.showRegisterTab.bind(this)}>Register</a>
              </div>
            </div>
            <hr/>
          </div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-12">
                <LoginForm/>
                <RegisterForm/>
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
