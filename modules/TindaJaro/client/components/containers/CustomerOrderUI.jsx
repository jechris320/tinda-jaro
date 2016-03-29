import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import CustomerOrderTable from '../tables/CustomerOrderTable';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class CustomerOrderUI extends Component {

    getMeteorData() {
        Meteor.subscribe("userOrders");
        Meteor.subscribe("products");
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
                <div className="col-xs-6 col-md-offset-3 col-xs-offset-3">
                    <SearchBar/>
                </div>
            </div>
            <div className="row sidebarAndProductsContainer">
                <div className="col-md-2 col-xs-2">
                    <Sidebar activeLink="orders" type="buyer"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <CustomerOrderTable orders={this.data.orders}/>
                </div>
            </div>
        </div>
    );
  }
  
};