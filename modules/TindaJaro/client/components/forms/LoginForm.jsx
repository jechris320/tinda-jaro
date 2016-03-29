import { Component } from 'react';
import { Router, Link } from 'react-router';

export default class LoginForm extends Component {

    handleLogin(event) {
        event.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        Meteor.loginWithPassword(email, password, function(err) { 
        if (!err) {
          const user = Meteor.users.findOne({'emails.address': email});
          const accountType = user.profile.accountType;
          console.log("login success");

          switch (accountType) {
            case 'Buyer':
              $(location).attr("href","products");
              break;
            case 'Seller':
              $(location).attr("href","inventory");
              break;
            case 'Packager':
              $(location).attr("href","pending-orders");
              break;
            case 'DeliveryPersonnel':
              $(location).attr("href","undelivered-orders");
              break;
            default:
              $(location).attr("href","/");
              break;
          }

          $("#confirmMessage").html("");
        } else {
          console.log("error login");
          $("#confirmMessage").html("Login Failed");
          $("#confirmMessage").css("color", "red");
        }
        });
    }

  render() {
    return (
                <form id="login-form" onSubmit={this.handleLogin.bind(this)}>
                  <div className="form-group">
                    <span id="confirmMessage" className="confirmMessage"></span>
                    <input type="email" name="email" id="email" tabIndex="1" className="form-control" 
                            placeholder="Email"  required/>
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" minLength="6" maxLength="16" id="password" 
                            tabIndex="2" className="form-control" placeholder="Password" required/>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-6 col-sm-offset-3">
                        <input type="submit" name="login-submit" id="login-submit" tabIndex="4" 
                                className="form-control btn btn-login" value="Log In"/>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                    </div>
                  </div>
                </form>
    );
  }
  
};