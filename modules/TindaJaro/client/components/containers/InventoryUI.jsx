import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProfileDiv from '../divs/ProfileDiv';
import ProductTable from '../tables/ProductTable';

import Product from 'TindaJaro/models/Product';

@ReactMixin.decorate(ReactMeteorData)
export default class InventoryUI extends Component {

    getMeteorData() {
        Meteor.subscribe("inventory");

        const products = Product.col.find().fetch();

        return {products};
    }

    /*test(event) {
        event.preventDefault();

        const test = Product.col.find({},{_id: 1}).fetch();
        let ids = [];

        test.map(a => ids.push(a._id));
        console.log(ids);
    }*/

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.products) {
        return false;
    }

    const show = {
        display: 'block'
    }
    const hide = {
        display: 'none'
    }
    
    return (
        <div className="container-fluid">{/*<button onClick={this.test.bind(this)}>test</button>*/}
            <PageHeader/>
            <div className="row">
                <div className="col-xs-6 col-md-offset-3 col-xs-offset-3">
                </div>
            </div>
            <div className="row sidebarAndProductsContainer">
                <div className="col-md-2 col-xs-2">
                    <Sidebar activeLink="inventory" type="seller"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <ProductTable tableType="inventory" products={this.data.products} />
                </div>
            </div>
        </div>
    );
  }
  
};