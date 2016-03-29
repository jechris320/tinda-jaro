import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProfileDiv from '../divs/ProfileDiv';

export default class ProfileUI extends Component {

  render() {
    if (!Meteor.user()) {
      return $(location).attr("href","/");
    }

    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }
    
    return (
        <div className="container-fluid">
            <PageHeader/>
            <div className="row">
                <div className="col-xs-6 col-md-offset-3 col-xs-offset-3">
                    <SearchBar style = {Meteor.users.findOne({_id: Meteor.userId()}).profile.accountType == "Buyer" ? show : hide}/>
                </div>
            </div>
            <div className="row sidebarAndProductsContainer">
                <div className="col-md-2 col-xs-2">
                    <Sidebar activeLink="profile" 
                            type={Meteor.users.findOne({_id: Meteor.userId()}).profile.accountType == "Buyer" ? "buyer" : "seller"}/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <ProfileDiv/>
                </div>
            </div>
        </div>
    );
  }
  
};