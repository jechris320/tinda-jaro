import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import DeliveryPersonnelTodoTable from '../tables/DeliveryPersonnelTodoTable';

import Order from 'TindaJaro/models/Order';
import Wishlist from 'TindaJaro/models/Wishlist';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class DeliveryPersonnelUI extends Component {

    getMeteorData() {
        Meteor.subscribe("undeliveredOrders");
        const orders = Order.col.find().fetch();

        return {orders};
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.orders) {
        return false;
    }
    
    return (
        <div className="container-fluid">
            <PageHeader/>
            <div className="row">
                <div className="col-xs-6 col-xs-offset-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                    <DeliveryPersonnelTodoTable orders={this.data.orders}/>
                </div>
            </div>
        </div>
    );
  }
  
};