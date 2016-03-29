import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProductTable from '../tables/ProductTable';

import Product from 'TindaJaro/models/Product';
import Wishlist from 'TindaJaro/models/Wishlist';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class WishlistUI extends Component {

    getMeteorData() {
        Meteor.subscribe("wishlist");
        Meteor.subscribe("products");
        const wishlist = Wishlist.col.find().fetch();
        let products = [];

        if (wishlist) {
            wishlist.map(function(wishlist) {
                products.push(Product.col.findOne({_id: wishlist.productId}));
            });
        }

        return {products};
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.products) {
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
                    <Sidebar activeLink="wishlist" type="buyer"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <ProductTable tableType="wishlist" products={this.data.products}/>
                </div>
            </div>
        </div>
    );
  }
  
};