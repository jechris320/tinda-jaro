import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class SalesReportRow extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        orders: PropTypes.array.isRequired
    }

    quantity() {
        let quantity = 0;
        const productId = this.props.product._id;

        if (this.props.orders) {
            this.props.orders.map(function(order) {

                if (productId == order.productId) {
                    quantity = parseFloat(quantity) + parseFloat(order.productQuantity);
                }
            });
        }

        return quantity;
    }

    amount() {
        let amount = 0;
        const productId = this.props.product._id;

        if (this.props.orders) {
            this.props.orders.map(function(order) {

                if (productId == order.productId) {
                    amount = parseFloat(amount) + parseFloat(order.totalPrice);
                }
            });
        }

        return amount;
    }

  render() {
    return (
        	<tr>
                <td>
                    <u>
                        <Link to={`/${this.props.product.name.replace(/\s+/g, '-')}/${this.props.product._id}`}>
                            {this.props.product.name}
                        </Link>
                    </u>
                </td>
                <td className="text-right">
                {parseFloat(this.quantity()).toFixed(2)}
                </td>
                <td className="text-right">
                Php {parseFloat(this.amount()).toFixed(2)}
                </td>
            </tr>
    );
  }
  
};