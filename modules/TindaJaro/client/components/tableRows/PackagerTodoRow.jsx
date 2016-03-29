import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';
import Order from 'TindaJaro/models/Order';

export default class PackagerTodoRow extends Component {
    static propTypes = {
        order: PropTypes.object.isRequired
    }

    product() {
        return Product.col.findOne({_id: this.props.order.productId});
    }

    updateStatus(event) {
        event.preventDefault();

        if ($("#orderStatus").val() == "Packaged") {
            let order = new Order();
            order._id = this.props.order._id;
            order.status = "Packaged";
            order.save();
        }
    }

  render() {
    return (
        	<tr>
                <td>
                    <select name="orderStatus" id="orderStatus" className="form-control" 
                                defaultValue="Select" onChange={this.updateStatus.bind(this)}>
                        <option value="Select">Select</option>
                        <option value="Packaged">Packaged</option>
                    </select>
                </td>
                <td>
                    {this.props.order._id}
                </td>
                <td>
                    {this.product().name}
                </td>
                <td>
                    {this.props.order.productQuantity}
                </td>
            </tr>
    );
  }
  
};