import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class DeliveryPersonnelTodoRow extends Component {
    static propTypes = {
        order: PropTypes.object.isRequired
    }

    updateStatus(event) {
        event.preventDefault();
        const orderStatus = $("#orderStatus").val();
        let order = new Order();

        switch (orderStatus) {
            case 'Delivered':
                order._id = this.props.order._id;
                order.status = "Delivered";
                order.save();
                break;
            case 'Rejected':
                order._id = this.props.order._id;
                order.status = "Rejected";
                order.save();
                break;
            default:
                break;
        }

    }

  render() {
    return (
        	<tr>
                <td>
                    <select name="orderStatus" id="orderStatus" className="form-control" 
                                defaultValue="Select" onChange={this.updateStatus.bind(this)}>
                        <option value="Select">Select</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </td>
                <td>
                    {this.props.order._id}
                </td>
                <td>
                    {this.props.order.customerName}
                </td>
                <td>
                    {this.props.order.address}
                </td>
            </tr>
    );
  }
  
};