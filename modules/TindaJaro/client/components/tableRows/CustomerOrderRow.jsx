import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class CustomerOrderRow extends Component {
    static propTypes = {
        order: PropTypes.object.isRequired
    }

    product() {
        return Product.col.findOne({_id: this.props.order.productId});
    }

    productQuantity() {
        return this.product().quantityUnit == "unit" ? this.props.order.productQuantity + " units"
                : parseFloat(this.props.order.productQuantity).toFixed(2) + " kg";
    }
   
  render() {
    return (
        	<tr>
                <td>
                    <u>
                        <Link 
                            to={`/product/${this.product().name.replace(/\s+/g, '-')}/${this.product()._id}`}>
                            {this.product().name}
                        </Link>
                    </u>
                </td>
                <td>
                {this.productQuantity()}
                </td>
                <td>
                Php {parseFloat(this.props.order.totalPrice).toFixed(2)}
                </td>
                <td>
                {this.props.order.status}
                </td>
            </tr>
    );
  }
  
};