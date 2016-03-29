import { Component } from 'react';
import { Router, Link } from 'react-router';

export default class RegisterForm extends Component {

    validatePassword() {
      const green = "#66cc66";
      const red = "#ff6666";
      const pass1 = $("#regPassword").val();
      const pass2 = $("#confirmPassword").val();

      if (pass1 && pass2) {
        if (pass1 == pass2) {
          $("#confirmPassword").css("background-color", "white");
          $("#regPassword").css("background-color", "white");
            $("#confirmMessage").css("color", green);
            $("#confirmMessage").html("Password Match");
            $("#confirmLength").html("");
        } else {
            $("#regPassword").css("background-color", red);
            $("#confirmPassword").css("background-color", red);
            $("#confirmMessage").css("color", red);
            $("#confirmMessage").html("Password Do Not Match");
        }
        if (pass1.length <= 5 || pass2.length <= 5) {
          $("#regPassword").css("background-color", red);
          $("#confirmPassword").css("background-color", red);
          $("#confirmLength").html("At least 6 characters");
          $("#confirmLength").css("color", red);
        } else {
          $("#confirmLength").html("");
        }
      } else {
        if ($("#confirmMessage").html()) {
                if (pass1) {
                $("#confirmPassword").css("background-color", red);
                }
                if (pass2) {
                    $("#regPassword").css("background-color", red);
                }
        $("#confirmMessage").css("color", red);
        $("#confirmMessage").html("Password Do Not Match");
        }
      }
  }

  validateKey(event) {
    var regex = new RegExp("^[0-9]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
       event.preventDefault();
       return false;
    }
  }

  validatePhoneNumber() {
        const phoneNumber = $("#phoneNumber").val();
        const pattern = new RegExp(/^09[0-9]+$/);
        if (pattern.test(phoneNumber) && phoneNumber.length == 11) {
            $("#confirmMessage2").html("");
            $("#phoneNumber").css("background-color", "white");
        } else {
            $("#confirmMessage2").css("color", "#ff6666");
            $("#confirmMessage2").html("At least 11 digits! Sample: 09---------");
            $("#phoneNumber").css("background-color", "#ff6666");
        }
  }

  validateEmail() {
    const pattern = new RegExp(/^(\w|\d)+@{1}[a-z]+.com$/);
    const email = $("#regEmail").val();
    if (pattern.test(email)) {
      $("#regEmail").css("background-color", "white");
      $("#confirmEmail").html("");
    } else {
      $("#regEmail").css("background-color", "#ff6666");
      $("#confirmEmail").html("Invalid Email");
      $("#confirmEmail").css("color", "#ff6666");
    }
  }

    handleRegister(event) {
    event.preventDefault();

    const pattern = new RegExp(/white;$/);
    const color1 = $("#regEmail").attr("style");
    const color2 = $("#regPassword").attr("style");
    const color3 = $("#confirmPassword").attr("style");
    const color4 = $("#phoneNumber").attr("style");
    const email = $("#regEmail").val();
    const password = $("#regPassword").val();
    const fullName = $("#fullName").val();
    const homeAddress = $("#homeAddress").val();
    const phoneNumber = $("#phoneNumber").val();

   if (pattern.test(color1) && pattern.test(color2) && pattern.test(color3) && pattern.test(color4)) {
    console.log("true");
    $("#confirmSubmit").html("");
    $("#accountType").css("background-color", "white");

    if ($("#accountType").val() === "Buyer") {
      console.log("buyer");
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          fullName: fullName,
          homeAddress: homeAddress,
          phoneNumber: phoneNumber,
          accountType: "Buyer"
        }
      }, function(err) { 
        if (!err) {
          Meteor.logout({});
          $(location).attr("href","registered");
        } else {
          alert(err);
        }
        });

    }

    if($("#accountType").val() === "Seller"){
      console.log("Seller");
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          fullName: fullName,
          homeAddress: homeAddress,
          phoneNumber: phoneNumber,
          accountType: "Seller"
        }
      }, function(err) { 
        if (!err) {
          Meteor.logout({});
          $(location).attr("href","registered");
        } else {
          alert(err);
        }
        });
    }

    if ($("#accountType").val() === "RegisterAs") {
      $("#confirmSubmit").html("Select Account Type To Continue");
      $("#confirmSubmit").css("color", "#ff6666");
      $("#accountType").css("background-color", "#ff6666");
    }
  } else {
      $("#confirmSubmit").html("Invalid Input");
      $("#confirmSubmit").css("color", "#ff6666");
  }
  }

  render() {
    const hide = {
      display: 'none'
    }
    return (
                <form id="register-form" className="register-form" 
                      onSubmit={this.handleRegister.bind(this)} style={hide}>
                  <div className="form-group">
                    <span id="confirmSubmit" className="confirmSubmit"></span>
                    <input type="text" name="fullName" id="fullName" tabIndex="1" className="form-control" 
                            placeholder="Full Name" required/>
                  </div>
                  <div className="form-group">
                    <input type="text" name="homeAddress" id="homeAddress" tabIndex="1" className="form-control" 
                            placeholder="Home Address" required/>
                  </div>
                  <div className="form-group">
                    <input type="email" onBlur={this.validateEmail} name="regEmail" id="regEmail" tabIndex="1" 
                            className="form-control" placeholder="Email Address" required/>
                    <span id="confirmEmail" className="confirmEmail"></span>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <input type="password" name="regPassword" id="regPassword" minLength="6" maxLength="16" tabIndex="2" 
                                className="form-control" placeholder="Password" ref="password" 
                                onChange={this.validatePassword} required/>
                        <span id="confirmMessage" className="confirmMessage"></span>
                      </div>
                      <div className="col-sm-6">
                        <input type="password" name="confirmPassword" id="confirmPassword" minLength="6" maxLength="16" 
                                tabIndex="2" className="form-control" placeholder="Confirm Password" 
                                ref="confirmPassword" onChange={this.validatePassword} required/>
                        <span id="confirmLength" className="confirmLength"></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6">
                        <input type="text" name="phoneNumber" id="phoneNumber" tabIndex="1" className="form-control" 
                                placeholder="Phone Number" onChange={this.validatePhoneNumber} 
                                onKeyPress={this.validateKey.bind(this)} required/>
                        <span id="confirmMessage2" className="confirmMessage2"></span>
                      </div>
                      <div className="col-sm-6">
                        <select className="form-control" name="accountType" id="accountType">
                          <option value="RegisterAs" selected>--Account Type--</option>
                          <option value="Buyer">--Buyer--</option>
                          <option value="Seller">--Seller--</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                        <input type="submit" name="register-submit" id="register-submit" tabIndex="4" 
                                className="form-control btn btn-register" value="Register Now" />
                  </div>
                  <div className="form-group">
                      <input type="reset" name="reset" id="reset" tabIndex="4" className="form-control btn btn-reset" 
                              value="Reset" onClick={this.handleReset} />
                  </div>
                </form>
    );
  }
  
};