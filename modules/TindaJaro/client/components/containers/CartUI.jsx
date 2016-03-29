import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';
import CartTable from '../tables/CartTable';

import CartItem from 'TindaJaro/models/CartItem';
import Product from 'TindaJaro/models/Product';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class CartUI extends Component {

    getMeteorData() {
        Meteor.subscribe("cartItems");
        Meteor.subscribe("products");
        const cartItems = CartItem.col.find().fetch();
        console.log(cartItems);
        let totalPrice = 0;
        cartItems.map(function(cartItem) {
            const product = Product.col.findOne({_id: cartItem.productId});
            totalPrice = totalPrice + product.price * cartItem.productQuantity;
        });

        $("#totalPrice").html("Total Price:  Php " + parseFloat(totalPrice).toFixed(2));

        return {cartItems};
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.cartItems) {
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
                    <Sidebar activeLink="cart" type="buyer"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <CartTable cartItems={this.data.cartItems}/>
                </div>
            </div>
        </div>
    );
  }
  
};