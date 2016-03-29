import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import StockItemOrderRow from '../tableRows/StockItemOrderRow';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';

export default class StockItemOrderTable extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        orders: PropTypes.array.isRequired
    }

  render() {
    let count = 0;

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12">
                <h4><strong>Product Package Order</strong></h4>
            </div>
        </div>
        <div className="row">
        	<div className="col-md-12">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th>#</th>
                            <th>Total Price</th>
                            <th>Total Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(order => <StockItemOrderRow key={order._id} count={count += 1} order={order}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
  
};