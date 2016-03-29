import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';

export default class MonthlySalesRow extends Component {
    static propTypes = {
        monthlySales: PropTypes.object.isRequired
    }

    date() {
        return parseFloat(this.props.monthlySales.date.getMonth()) + 1;
    }

  render() {
    return (
        	<tr>
                <td className="text-center">
                {this.date() < 10 ? "0" + this.date() : this.date()}
                /{this.props.monthlySales.date.getFullYear()}
                </td>
                <td className="text-right">
                Php {parseFloat(this.props.monthlySales.amount).toFixed(2)}
                </td>
            </tr>
    );
  }
  
};