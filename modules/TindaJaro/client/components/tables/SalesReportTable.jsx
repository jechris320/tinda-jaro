import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import SalesReportRow from '../tableRows/SalesReportRow';

import Product from 'TindaJaro/models/Product';
import Order from 'TindaJaro/models/Order';

export default class SalesReportTable extends Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        orders: PropTypes.array.isRequired
    }

    totalQuantity() {
        let totalQuantity = 0;

        if (this.props.orders) {
            this.props.orders.map(function(order) {

                if (order.status == "Delivered") {
                    totalQuantity = parseFloat(totalQuantity) + parseFloat(order.productQuantity);
                }
            });
        }

        return totalQuantity;
    }

    totalAmount() {
        let totalAmount = 0;

        if (this.props.orders) {
            this.props.orders.map(function(order) {

                if (order.status == "Delivered") {
                    totalAmount = parseFloat(totalAmount) + parseFloat(order.totalPrice);
                }
            });
        }

        return totalAmount;
    }

  render() {
    return (
    <div className="container-fluid">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th>Product Name</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products.map(product => 
                            <SalesReportRow key={product._id} product={product} orders={this.props.orders}/>)}
                        <tr>
                            <th>Total:</th>
                            <th className="text-right">{parseFloat(this.totalQuantity()).toFixed(2)}</th>
                            <th className="text-right">Php {parseFloat(this.totalAmount()).toFixed(2)}</th>
                        </tr>
                    </tbody>
                </table>
    </div>
    );
  }
  
};