import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class ProfileDiv extends Component {

    getMeteorData() {
        let user;

        if (Meteor.userId()) {
            user = Accounts.users.findOne(Meteor.userId());
            $("#phoneNumberHeading").html(user.profile.phoneNumber);
        }

        return {user};
    }

    componentDidMount() {
        $("#fullNameHeading").html(this.data.user.profile.fullName);
        $("#fullName").html(this.data.user.profile.fullName);
        $("#homeAddress").html(this.data.user.profile.homeAddress);
        $("#email").html(this.data.user.emails[0].address);
        $("#phoneNumberHeading").html(this.data.user.profile.phoneNumber);
    }

    handleChangePassword(event) {
        event.preventDefault();
        $("#passwordRow").css("display","none");
        $("#oldPasswordRow").css("display","block");
        $("#newPasswordRow").css("display","block");
        $("#confirmPasswordRow").css("display","block");
        $("#saveNewPasswordBtnRow").css("display","block");
    }

    handleSaveNewPassword(event) {
        event.preventDefault();

        const newPassword = $("#newPassword").val();
        const confirmPassword = $("#confirmPassword").val();
        const oldPassword = $("#oldPassword").val();
        
        if (newPassword && confirmPassword 
                && $("#newPassword").css("background-color") == "rgb(255, 255, 255)") {
            Accounts.changePassword(oldPassword, newPassword, function(error) {
                if (error) {
                    alert("Old Password Incorrect!")
                } else {
                    alert("Password successfully changed!");
                }
            });
        } else {
            alert("Error saving changes!");
        }

        $("#oldPasswordRow").css("display","none");
        $("#passwordRow").css("display","block");
        $("#newPasswordRow").css("display","none");
        $("#confirmPasswordRow").css("display","none");
        $("#saveNewPasswordBtnRow").css("display","none");
        $("#newPassword").val("");
        $("#oldPassword").val("");
        $("#confirmPassword").val("");
        $("#confirmPassword").css("background-color", "white");
        $("#newPassword").css("background-color", "white");


    }

    handleSaveNewPhoneNumber(event) {
        event.preventDefault();

        const phoneNumber = $("#newPhoneNumber").val();
        
        if (phoneNumber && $("#newPhoneNumber").css("background-color") == "rgb(255, 255, 255)") {
            Accounts.users.update({_id: Meteor.userId()}, {$set: {"profile.phoneNumber": phoneNumber}});
            alert("Phone Number successfully changed!");
        } else {
            alert("Error saving changes!");
        }
        $("#phoneNumberRow").css("display","block");
        $("#newPhoneNumberRow").css("display","none");
        $("#saveNewPhoneNumberBtnRow").css("display","none");
        $("#newPhoneNumber").val("");
        $("#newPhoneNumber").css("background-color", "white");
    }

    handleEditPhoneNumber(event) {
        event.preventDefault();
        $("#phoneNumberRow").css("display","none");
        $("#newPhoneNumberRow").css("display","block");
        $("#saveNewPhoneNumberBtnRow").css("display","block");
    }

    validatePhoneNumber() {
        const phoneNumber = $("#newPhoneNumber").val();
        const pattern = new RegExp(/^09[0-9]+$/);
        if (pattern.test(phoneNumber) && phoneNumber.length == 11) {
            $("#newPhoneNumber").css("background-color", "white");
        } else {
            $("#newPhoneNumber").css("background-color", "#ff6666");
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

    validatePassword() {
      const green = "#66cc66";
      const red = "#ff6666";
      const pass1 = $("#newPassword").val();
      const pass2 = $("#confirmPassword").val();

      if (pass1 && pass2) {
        if (pass1 == pass2) {
          $("#confirmPassword").css("background-color", "white");
          $("#newPassword").css("background-color", "white");
          $("#confirmMessage").html("");
        } else {
            $("#newPassword").css("background-color", red);
            $("#confirmPassword").css("background-color", red);
            $("#confirmMessage").css("color", red);
            $("#confirmMessage").html("Password Do Not Match");
        }
        if (pass1.length <= 5 || pass2.length <= 5) {
          $("#newPassword").css("background-color", red);
          $("#confirmPassword").css("background-color", red);
        }
      } else {
        if ($("#confirmMessage").html()) {
                if (pass1) {
                $("#confirmPassword").css("background-color", red);
                }
                if (pass2) {
                    $("#newPassword").css("background-color", red);
                }
        $("#confirmMessage").css("color", red);
        $("#confirmMessage").html("Password Do Not Match");
        }
      }
  }

  render() {
    if (!Meteor.user()) {
      return $(location).attr("href","/");
    }

    const hide = {
        display: 'none'
    }

    return (
        <div className="container-fluid divBorder"><button style={hide}>ok</button>
            <div className="row">
                <div className="col-xs-12">
                    <h2 id="fullNameHeading"></h2>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-3 col-sm-2">
                    <h4>Full Name:</h4>
                </div>
                <div className="col-xs-9 col-sm-8">
                    <h4 id="fullName"></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-3 col-sm-2">
                    <h4>Email:</h4>
                </div>
                <div className="col-xs-9 col-sm-8">
                    <h4 id="email"></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-3 col-sm-2">
                    <h4>Address:</h4>
                </div>
                <div className="col-xs-9 col-sm-8">
                    <h4 id="homeAddress"></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-3 col-sm-2">
                    <h4>Phone #:</h4>
                </div>
                <div className="col-xs-9 col-sm-10">
                    <div className="row" id="phoneNumberRow">
                        <div className="col-sm-3 col-xs-3 col-md-2">
                            <h4 id="phoneNumberHeading"></h4>
                        </div>
                        <div className="col-sm-5 col-xs-4 col-md-4 col-lg-3">
                            <input type="button" value="Change Phone Number" 
                                className="form-control btn-editPhoneNumber"
                                onClick={this.handleEditPhoneNumber.bind(this)}/>
                        </div>
                    </div>
                    <div className="row"  id="newPhoneNumberRow" style={hide}>
                        <div className="col-sm-3 col-xs-4">
                            <input type="text" id="newPhoneNumber" className="form-control"
                                onChange={this.validatePhoneNumber} onKeyPress={this.validateKey.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" id="saveNewPhoneNumberBtnRow" style={hide}>
                <div className="col-sm-2 col-xs-2 col-sm-offset-2 col-xs-offset-3">
                    <input type="button" value="Save" className="form-control btn-saveNewPassword"
                       onClick={this.handleSaveNewPhoneNumber.bind(this)} 
                       id="btn-saveNewPhoneNumber"/><br/>
                </div>
            </div>
            <div className="row" id="oldPasswordRow" style={hide}>
                <div className="col-xs-3 col-sm-2">
                    <h4>Old Password:</h4>
                </div>
                <div className="col-xs-9 col-sm-10">
                    <div className="row">
                        <div className="col-sm-3 col-xs-4">
                            <input type="password" id="oldPassword" className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-3 col-sm-2">
                    <h4>Password:</h4>
                </div>
                <div className="col-xs-9 col-sm-10">
                    <div className="row" id="passwordRow">
                        <div className="col-sm-3 col-xs-3 col-md-2">
                            <h4 id="passwordHeading">**********</h4>
                        </div>
                        <div className="col-sm-5 col-xs-4 col-md-4 col-lg-3">
                            <input type="button" value="Change Password" 
                                className="form-control btn-changePassword"
                                onClick={this.handleChangePassword.bind(this)}/>
                        </div>
                    </div>
                    <div className="row"  id="newPasswordRow" style={hide}>
                        <div className="col-sm-3 col-xs-4">
                            <input type="password" id="newPassword" className="form-control"
                                    onChange={this.validatePassword}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" id="confirmPasswordRow" style={hide}>
                <div className="col-xs-3 col-sm-2">
                    <h4>Re-Password:</h4>
                </div>
                <div className="col-xs-9 col-sm-10">
                    <div className="row">
                        <div className="col-sm-3 col-xs-4">
                            <input type="password" id="confirmPassword" className="form-control"
                                    onChange={this.validatePassword}/>
                        </div>
                        <div className="col-sm-4 col-xs-4">
                            <span id="confirmMessage" className="confirmMessage"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" id="saveNewPasswordBtnRow" style={hide}>
                <div className="col-sm-2 col-xs-2 col-sm-offset-2 col-xs-offset-3">
                    <input type="button" value="Save" className="form-control btn-saveNewPassword"
                       onClick={this.handleSaveNewPassword.bind(this)} 
                       id="btn-saveNewPassword"/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <hr/>
                </div>
            </div>
        </div>
    );
  }
  
};