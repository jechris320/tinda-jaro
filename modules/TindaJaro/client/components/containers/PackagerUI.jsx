import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import PackagerTodoTable from '../tables/PackagerTodoTable';

import Order from 'TindaJaro/models/Order';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class PackagerUI extends Component {

    getMeteorData() {
        Meteor.subscribe("unpackagedOrders");
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
                <div className="col-xs-6 col-xs-offset-3 col-sm-offset-3 col-md-offset-3 col-lg-offset-3">
                    <PackagerTodoTable orders={this.data.orders} />
                </div>
            </div>
        </div>
    );
  }
  
};