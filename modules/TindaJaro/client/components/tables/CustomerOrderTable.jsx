import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import CustomerOrderRow from '../tableRows/CustomerOrderRow';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';

export default class CustomerOrderTable extends Component {
    static propTypes = {
        orders: PropTypes.array.isRequired
    }

  render() {

    return (
    <div className="container-fluid divBorder">
        <div className="row">
            <div className="col-md-3 col-xs-3">
                <h4 id="tableTitle"><strong>Orders</strong></h4>
            </div>
        </div>
        <div className="row">
        	<div className="col-md-12">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th>Product Name</th>
                            <th>Total Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(order => <CustomerOrderRow key={order._id} order={order} />)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
  
};