import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import CartItemRow from '../tableRows/CartItemRow';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';
import Order from 'TindaJaro/models/Order';

export default class CartTable extends Component {
    static propTypes = {
        cartItems: PropTypes.array.isRequired
    }

    handleCheckout(event) {
        event.preventDefault();
        const userId = Meteor.userId();
        const user = Meteor.users.findOne(Meteor.userId());


         if (confirm("Press \"ok\" to buy all the product on your cart" +
                "\nProducts will be delivered in your home address")) {
            this.props.cartItems.map(function(cartItem) {
                let order = new Order();
                let item = new CartItem();
                order.userId = userId;
                order.address = user.profile.homeAddress;
                order.customerName = user.profile.fullName;
                order.productId = cartItem.productId;
                order.productQuantity = parseFloat(cartItem.productQuantity);
                order.totalPrice = parseFloat(cartItem.totalPrice);
                order.createdAt = new Date();
                order.save();
                item._id = cartItem._id;
                item.removeProduct();
            });
         }
    }

    componentDidMount() {
        let totalPrice = 0;
        this.props.cartItems.map(function(cartItem) {
            let product = Product.col.findOne({_id: cartItem.productId});
            totalPrice = totalPrice + product.price * cartItem.productQuantity;
        });

        $("#totalPrice").html("Total Price:  Php " + parseFloat(totalPrice).toFixed(2));
    }

  render() {
    return (
    <div className="container-fluid divBorder">
        <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-3">
                <h4><strong>Cart</strong></h4>
                <h5>
                    <small>
                        Click Product to View Details
                    </small>
                </h5>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-3 col-md-offset-6 col-sm-offset-6 col-xs-offset-6">
                <button className="form-control btn btn-proceedCheckout" onClick={this.handleCheckout.bind(this)}>
                Proceed to Checkout
                </button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cartItems.map(cartItem => <CartItemRow key={cartItem._id} cartItem={cartItem} />)}
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th id="totalPrice"></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
  
};