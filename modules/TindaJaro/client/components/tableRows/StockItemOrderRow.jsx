import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class StockItemOrderRow extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        order: PropTypes.object.isRequired
    }

    product() {
        return Product.col.findOne({_id: this.props.order.productId});
    }

  render() {
    return (
        	<tr>
                <td>
                    {this.props.count}
                </td>
                <td>
                    Php {parseFloat(this.props.order.totalPrice).toFixed(2)}
                </td>
                <td>
                    {parseFloat(this.props.order.productQuantity).toFixed(2)} {this.product().quantityUnit}
                </td>
                <td>
                {this.props.order.status}
                </td>
            </tr>
    );
  }
  
};