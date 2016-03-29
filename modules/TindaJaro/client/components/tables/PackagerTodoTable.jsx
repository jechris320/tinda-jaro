import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import PackagerTodoRow from '../tableRows/PackagerTodoRow';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';

export default class PackagerTodoTable extends Component {
    static propTypes = {
        orders: PropTypes.array.isRequired
    }

    logout(event) {
        event.preventDefault();
        Meteor.logout( function(error) {
            if (!error) {
                $(location).attr("href","/");
            }
        });
    }

  render() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-9">
                <label><strong>Orders</strong></label>
            </div>
            <div className="col-xs-3">
                <a href="#" onClick={this.logout.bind(this)}>
                    <u>
                    <i className="glyphicon glyphicon-log-out"></i> Log Out
                    </u>
                </a>
            </div>
        </div>
        <div className="row">
        	<div className="col-md-12">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th>Status</th>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(order => <PackagerTodoRow key={order._id} order={order}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
  
};