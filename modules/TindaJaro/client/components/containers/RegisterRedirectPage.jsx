import { Component } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';

export default class RegisterRedirectPage extends Component {

	redirectToLoginPage() {
		const redirectToLoginPage = setTimeout(function(){
            $(location).attr("href","/");
          }, 5000);
		redirectToLoginPage;
	}

  render() { 
  	

    return (
        <div>
          <PageHeader/>
        	{this.redirectToLoginPage()}
        	<p className="text-center">Successfully Registered!</p>
        	<p className="text-center">You will be redirected to Login Page in 5 seconds or <a href="/">Click Here!</a></p>

        </div>
    );
  }
  
};