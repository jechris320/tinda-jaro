import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class CartItemRow extends Component {
    static propTypes = {
        cartItem: PropTypes.object.isRequired
    }

    product() {
        return Product.col.findOne({_id: this.props.cartItem.productId});
    }

    productQuantity() {
        const product = this.product();

        return product.quantityUnit == "unit" ? this.props.cartItem.productQuantity + " units"
                : parseFloat(this.props.cartItem.productQuantity).toFixed(2) + " kg";
    }

    removeCartItem(event) {
        event.preventDefault();

        if (confirm("Press \"ok\" to remove product from cart")) {
            let product = new Product();
            product._id = this.product()._id;
            product.quantity = parseFloat(this.product().quantity) + parseFloat(this.props.cartItem.productQuantity);
            product.save();
            let cartItem = new CartItem();
            cartItem._id = this.props.cartItem._id;
            cartItem.removeProduct();
        }
    }

  render() {
    return (
        	<tr>
                <td>
                <button className="btn-remove form-control btn" id="btn-remove" 
                        onClick={this.removeCartItem.bind(this)}>
                        Remove
                </button>
                </td>
                <td>
                    <u>
                        <Link 
                            to={`/product/${this.product().name.replace(/\s+/g, '-')}/${this.product()._id}`}>
                            {this.product().name}
                        </Link>
                    </u>
                </td>
                <td>
                Php {parseFloat(this.product().price).toFixed(2)}/{this.product().quantityUnit}
                </td>
                <td>
                    {this.productQuantity()}
                </td>
                <td>
                Php {parseFloat(this.props.cartItem.totalPrice).toFixed(2)}
                </td>
            </tr>
    );
  }
  
};