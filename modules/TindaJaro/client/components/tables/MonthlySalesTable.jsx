import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import MonthlySalesRow from '../tableRows/MonthlySalesRow';

import Product from 'TindaJaro/models/Product';
import Order from 'TindaJaro/models/Order';

export default class MonthlySalesTable extends Component {
    static propTypes = {
        orders: PropTypes.array.isRequired
    }

    totalSales() {
        let totalSales = [];
        let id = 0;

        this.props.orders.map(function(order) {
            let monthlySales = {};

            if (totalSales.length != 0) {
                //console.log(true);
                totalSales.map(function(sales) {
                    if (sales.date.getFullYear() == order.createdAt.getFullYear()
                        && sales.date.getMonth() == order.createdAt.getMonth()) {
                        const index = totalSales.indexOf(sales);

                        monthlySales.date = sales.date;
                        monthlySales.amount = (parseFloat(sales.amount) + parseFloat(order.totalPrice)).toFixed(2);

                        totalSales.splice(index, 1);
                    } else {
                        monthlySales.date = order.createdAt;
                        monthlySales.amount = order.totalPrice;
                    }
                });
            } else {
                //console.log(false);
                monthlySales.date = order.createdAt;
                monthlySales.amount = order.totalPrice;
            }

            id += 1;

            monthlySales.id = id;
            totalSales.push(monthlySales);

        });

        let sortedTotalSales = [];
        let dates = [];

        totalSales.map(function(sales) {
            dates.push(sales.date);
        });

        dates.sort(function(a, b){return b-a});

        dates.map(function(date) {
            totalSales.map(function(sales) {
                if (date == sales.date) {
                    const monthlySales = {date: date, amount: sales.amount};
                    sortedTotalSales.push(monthlySales);
                }
            });
        });

        return sortedTotalSales;
    }

  render() {
    return (
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th className="text-center">MM/YYYY</th>
                            <th className="text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.totalSales().map(monthlySales => <MonthlySalesRow key={monthlySales.id} monthlySales={monthlySales}/>)}
                    </tbody>
                </table>
    );
  }
  
};