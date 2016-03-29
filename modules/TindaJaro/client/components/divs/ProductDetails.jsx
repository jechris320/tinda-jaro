import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import CartItem from 'TindaJaro/models/CartItem';
import Product from 'TindaJaro/models/Product';
import Wishlist from 'TindaJaro/models/Wishlist';

export default class ProductDetails extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired
    }

    componentDidMount() {
        if (parseFloat(this.props.product.quantity) === 0) {
            $("#checkoutDiv").css("display","none");
            $("#outOfStockDiv").css("display","block");
        } else {
            $("#checkoutDiv").css("display","block");
            $("#outOfStockDiv").css("display","none");
        }

        const productId = (this.props.product._id);

        if (Wishlist.col.findOne({userId: Meteor.userId(), productId: productId})) {
            $("#btn-wishlist").css("display","none");
            $("#btn-removeWishlist").css("display","block");
            $("#label-wishlist").css("display","block");
        } else {
            $("#btn-wishlist").css("display","block");
            $("#btn-removeWishlist").css("display","none");
            $("#label-wishlist").css("display","none");
        }
    }

    validateKey(event) {
        let regex;

        switch (this.props.product.quantityUnit) {
            case 'unit':
                regex = new RegExp("^[0-9]+$");
                break;
            case 'kg':
                regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
                break;
            default:
                regex = new RegExp("^[0-9]+$");
                break;
        }

        let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        let val = $("#quantityField").val();
        let quantity = val + key;

        if (!regex.test(quantity)) {
           event.preventDefault();
           return false;
        }
    }

    computeTotalPrice(event) {
        event.preventDefault();
        const quantity = $("#quantityField").val();
        const minOrder = this.props.product.minOrder;
        const pricePerUnit = this.props.product.price;
        const totalPrice =quantity * pricePerUnit;
        $("#totalPriceField").html("Php "+totalPrice.toFixed(2));
    }

    cleanQuantityField(event) {
        event.preventDefault();
        const regex = new RegExp("^[0-9]+\.$");
        const quantity = $("#quantityField").val();

        if (regex.test(quantity)) {
            $("#quantityField").val(quantity.replace(/\./,""));
        }
    }

    handleAddToCart(event) {
        event.preventDefault();
        const productQuantity = $("#quantityField").val();
        const productId = this.props.product._id;
        const minOrder = parseFloat(this.props.product.minOrder);
        const totalPrice = parseFloat($("#totalPriceField").html().replace(/Php\s/,""));
        const existingCartItem = CartItem.col.findOne({userId: Meteor.userId(), productId: productId});
        let cartItem = new CartItem();
        let oldProduct = new Product();
        let newProduct = new Product();

        cartItem.userId = Meteor.userId();
        cartItem.productId = productId;
        oldProduct = Product.col.findOne(cartItem.productId);

        if (parseFloat(productQuantity) > parseFloat(oldProduct.quantity)) {
            alert("Not enough stock");
            return false;
        }

        if (parseFloat(totalPrice) < parseFloat(minOrder)) {
            alert("Minimum Order not Reached");
            return false;
        }
        
        if (productQuantity) {
            oldProduct.quantity = parseFloat(oldProduct.quantity - productQuantity);
            cartItem.productQuantity = parseFloat(productQuantity);
            cartItem.totalPrice = parseFloat((parseFloat(oldProduct.price)) * (parseFloat(productQuantity)));

            if (existingCartItem) {
                console.log("cartItems updated")
                cartItem._id = existingCartItem._id;
                cartItem.productQuantity = parseFloat(parseFloat(cartItem.productQuantity) 
                                + parseFloat(existingCartItem.productQuantity));
                cartItem.totalPrice = parseFloat(parseFloat(cartItem.totalPrice)
                                + parseFloat(existingCartItem.totalPrice));
            } 

            cartItem.createdAt = new Date();
            newProduct._id = oldProduct._id;
            newProduct.quantity = oldProduct.quantity;
            newProduct.save();
            cartItem.save();
            alert("Product Added to Cart");
        } else {
            alert("Invalid Quantity Specified");
        }
        
    }

    handleAddToWishlist(event) {
        event.preventDefault();

        let wishlist = new Wishlist();
        wishlist.userId = Meteor.userId();
        wishlist.productId = (this.props.product._id);
        wishlist.createdAt = new Date();

        wishlist.save();
        $("#btn-wishlist").css("display","none");
        $("#label-wishlist").css("display","block");
        $("#btn-removeWishlist").css("display","block");
    }

    handleRemoveFromWishlist(event) {
        event.preventDefault();

        let wishlist = new Wishlist();
        wishlist.userId = Meteor.userId();
        wishlist.productId = (this.props.product._id);
        wishlist.removeProduct();
        $("#btn-wishlist").css("display","block");
        $("#btn-removeWishlist").css("display","none");
        $("#label-wishlist").css("display","none");
    }

    productQuantity() {
        return this.props.product.quantityUnit == "unit" ? this.props.product.quantity + " units"
                : parseFloat(this.props.product.quantity).toFixed(2) + " kg";
    }

    checkProductOldPrice() {
        const oldPrice = this.props.product.oldPrice;
        const price = this.props.product.price;
        let formStyle = {};

        if (price < oldPrice) {
            formStyle = {
                display: 'block'
            }
            //const discount = (1 - price / oldPrice) * 100;
            //const discountPrice = oldPrice - price;

            //$("#label-oldPrice").html("Php " + oldPrice);
            //$("#label-priceOff").html("Php " + parseFloat(discountPrice).toFixed(2) 
            //            + " (" + discount.toFixed(2) + "% off)");
        } else {
            formStyle = {
                display: 'none'
            }
        }

        return formStyle;
    }

    discountPrice() {
        const oldPrice = this.props.product.oldPrice;
        const price = this.props.product.price;
        const discount = (1 - price / oldPrice) * 100;
        const discountPrice = oldPrice - price;

        return "Php " + parseFloat(discountPrice).toFixed(2) 
                    + " (" + discount.toFixed(2) + "% off)";
    }

  render() {
    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-xs-7 divBorder">
                    <div className="row">
                        <div className="col-xs-12">
                            <h2 className="productName" id="productName">{this.props.product.name}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-5 col-sm-6 col-md-4 col-lg-4">
                            <button className="btn-wishlist form-control btn" id="btn-wishlist" 
                                onClick={this.handleAddToWishlist.bind(this)}>
                            Add to Wishlist
                            </button>
                            <label style={hide} id="label-wishlist"><small>Product is on the wishlist</small></label>
                            <button className="btn-wishlist form-control btn" id="btn-removeWishlist" 
                                    onClick={this.handleRemoveFromWishlist.bind(this)} style={hide}>
                            Remove from Wishlist
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr/>
                        </div>
                    </div>
                    <form className="form-horizontal">
                        <div className="form-group" style={this.checkProductOldPrice()} id="div-oldPrice">
                            <label className="col-xs-3 col-sm-3 control-label">
                                <small>
                                Was:
                                </small>
                            </label>
                            <div className="col-sm-5 col-xs-5">
                                <label className="control-label discountLabel">
                                    <small>
                                        <s>
                                        Php {parseFloat(this.props.product.oldPrice).toFixed(2)}
                                        </s>
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-3 col-sm-3 control-label">Price:</label>
                            <div className="col-sm-5 col-xs-5">
                                <label className="control-label productPriceLabel" id="productPriceLabel">
                    Php {parseFloat(this.props.product.price).toFixed(2)} per {this.props.product.quantityUnit}
                                </label>
                            </div>
                        </div>
                        <div className="form-group" style={this.checkProductOldPrice()} id="div-priceOff">
                            <label className="col-xs-3 col-sm-3 control-label">
                                <small>
                                You save Php:
                                </small>
                            </label>
                            <div className="col-sm-5 col-xs-5">
                                <label className="control-label discountLabel">
                                    <small>
                                    {this.discountPrice()}
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-3 col-sm-3 control-label">Available Quantity:</label>
                            <div className="col-sm-5 col-xs-5">
                                <label className="control-label availableQuantityLabel" id="availableQuantityLabel">
                                    {parseFloat(this.productQuantity()) == 0 ? "Out of Stock"
                                        : this.productQuantity()}
                                </label>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-xs-12">
                            <br/><br/><br/><br/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-xs-5 divBorder">
                    <div className="row">
                        <div className="col-xs-3 col-xs-offset-2">
                            <h5>Quantity:</h5>
                        </div>
                        <div className="col-xs-5">
                            <input type="text" maxLength="7" name="quantityField" id="quantityField" 
                                    className="form-control" onKeyPress={this.validateKey.bind(this)}
                                    onChange={this.computeTotalPrice.bind(this)} 
                                    onBlur={this.cleanQuantityField.bind(this)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <h5>Min Order:</h5>
                        </div>
                        <div className="col-xs-7 col-md-7">
                            <strong><p className="form-control-static minOrderField" id="minOrderField">
                                Php {this.props.product.minOrder}
                            </p></strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <h5>Total Price:</h5>
                        </div>
                        <div className="col-xs-7 col-md-7">
                            <strong><p className="form-control-static totalPriceField" id="totalPriceField">
                                Php 0
                            </p></strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-3">
                            <h5>Sold By:</h5>
                        </div>
                        <div className="col-xs-9">
                            <strong>
                                <p className="form-control-static soldByField" id="soldByField">
                                    {this.props.product.soldBy}
                                </p>
                            </strong>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 checkoutDiv" id="checkoutDiv">
                            <input type="button" name="addToCartButton" id="addToCartButton" 
                                    className="form-control btn btn-cart" value="Add to Cart"
                                    onClick={this.handleAddToCart.bind(this)} />
                            <hr/>
                        </div>
                        <div className="col-xs-12 outOfStockDiv" id="outOfStockDiv" style={hide}>
                            <label className="form-control text-center outOfStockLabel">Out of Stock</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>	
    );
  }
  
};