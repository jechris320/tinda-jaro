import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

export default class SalesSummaryTable extends Component {
	static propTypes = {
		orders: PropTypes.array.isRequired
	}

	totalAmount() {
		let totalAmount = 0;

		this.props.orders.map(order => totalAmount = parseFloat(totalAmount) + parseFloat(order.totalPrice));

		return totalAmount;
	}

	totalCustomers() {
		let uniqueCustomerCount = 0;
		let customerIds = [];

		this.props.orders.map(function(order) {
			if (customerIds != 0) {
				customerIds.map(function(customerId) {
					if (order.userId != customerIds) {
						customerIds.push(order.userId);
						uniqueCustomerCount += 1;
					}
				});
			} else {
				customerIds.push(order.userId);
				uniqueCustomerCount += 1;
			}
		});

		return uniqueCustomerCount;
	}

	totalProducts() {
		let totalProducts = 0;

		this.props.orders.map(function(order) {
			totalProducts = parseFloat(totalProducts) + parseFloat(order.productQuantity);
		});

		return totalProducts;
	}

  render() {
    return (
    	<div className="table-responsive container-fluid">
				<table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th></th>
                            <th className="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        	<th>Amount:</th>
                        	<td className="text-right">Php {parseFloat(this.totalAmount()).toFixed(2)}</td>
                        </tr>
                        <tr>
                        	<th>Customer:</th>
                        	<td className="text-right">{this.totalCustomers()}</td>
                        </tr>
                        <tr>
                        	<th>Orders:</th>
                        	<td className="text-right">{this.props.orders.length}</td>
                        </tr>
                        <tr>
                        	<th>Products:</th>
                        	<td className="text-right">{parseFloat(this.totalProducts()).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
        </div>
    );
  }
  
};