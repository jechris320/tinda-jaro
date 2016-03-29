import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';
import ProductDetails from '../divs/ProductDetails';

import Product from 'TindaJaro/models/Product';
import Wishlist from 'TindaJaro/models/Wishlist';

import ReactMixin from 'react-mixin';

@ReactMixin.decorate(ReactMeteorData)
export default class ProductDetailsUI extends Component {

    getMeteorData() {
        Meteor.subscribe("products");
        Meteor.subscribe("wishlist");
        Meteor.subscribe("cartItems");
        const productId = (this.props.params.productId);
        const product = Product.col.findOne(productId);
        console.log(productId);
        if (parseFloat(product.quantity) === 0) {
            $("#checkoutDiv").css("display","none");
            $("#outOfStockDiv").css("display","block");
        } else {
            $("#checkoutDiv").css("display","block");
            $("#outOfStockDiv").css("display","none");
        }

        if (Wishlist.col.findOne({productId: productId})) {
            $("#btn-wishlist").css("display","none");
            $("#btn-removeWishlist").css("display","block");
            $("#label-wishlist").css("display","block");
        } else {
            $("#btn-wishlist").css("display","block");
            $("#btn-removeWishlist").css("display","none");
            $("#label-wishlist").css("display","none");
        }

        return {product};
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.product) {
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
                    <Sidebar activeLink="products" type="buyer"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <ProductDetails product={this.data.product} />
                </div>
            </div>
        </div>
    );
  }
  
};