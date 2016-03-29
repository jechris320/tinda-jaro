import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Order from 'TindaJaro/models/Order';
import Product from 'TindaJaro/models/Product';

export default class StockItemSalesReport extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        orders: PropTypes.array.isRequired
    }

    unpaidOrderCount() {
        let count = 0;

        this.props.orders.map(function(order) {
            if (order.status != "Delivered") {
                count += 1;
            }
        });

        return count;
    }

    paidOrderCount() {
        let count = 0;

        this.props.orders.map(function(order) {
            if (order.status == "Delivered") {
                count += 1;
            }
        });

        return count;
    }

    totalPaidOrder() {
        let price = 0;

        this.props.orders.map(function(order) {
            if (order.status == "Delivered") {
                price = parseFloat(price) + parseFloat(order.totalPrice);
            }
        });

        return price;
    }

    totalUnpaidOrder() {
        let price = 0;

        this.props.orders.map(function(order) {
            if (order.status != "Delivered") {
                price = parseFloat(price) + parseFloat(order.totalPrice);
            }
        });

        return price;
    }

    showForm() {
        let showForm = false;

        if (this.paidOrderCount() == 0 && this.unpaidOrderCount() == 0) {
            showForm = false;
        } else if (this.paidOrderCount() != 0 && this.unpaidOrderCount() == 0) {
            showForm = false;
        } else {
            showForm = true;
        }

        return showForm;
    }

    packageOrderStatus() {
        let status = "";
        const totalCount = parseFloat(this.paidOrderCount()) + parseFloat(this.unpaidOrderCount());
        
        if (this.paidOrderCount() == 0 && this.unpaidOrderCount() == 0) {
            status = "";
        } else if (this.paidOrderCount() != 0 && this.unpaidOrderCount() == 0) {
            status = "All Package Order Delivered";
        } else {
            status = this.paidOrderCount() + " out of " + totalCount + " Packaged Order Delivered";
        }

        return status;
    }

  render() {
    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12">
                <h4><strong>Product Sales Report</strong></h4>
            </div>
        </div>
        <div className="row divBorder">
            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-6">
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-xs-6 col-sm-6 col-md-6 col-lg-7 control-label">
                        Total Order:
                    </label>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-5">
                        <label className="control-label">
                            {this.props.orders.length}
                        </label>
                    </div>
                </div>
                <div className="form-group" style={this.showForm() == true ? show : hide} id="form-unpaidPackageOrder">
                    <label className="col-xs-6 col-sm-6 col-md-6 col-lg-7 control-label" 
                            id="label-unpaidPackageOrder">
                        Unpaid Order({this.unpaidOrderCount()}):
                    </label>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-5">
                        <label className="control-label" id="label-unpaidPackageOrderValue">
                            Php {parseFloat(this.totalUnpaidOrder()).toFixed(2)}
                        </label>
                    </div>
                </div>
                <div className="form-group" style={this.showForm() == true ? show : hide} id="form-paidPackageOrder">
                    <label className="col-xs-6 col-sm-6 col-md-6 col-lg-7 control-label"
                            id="label-paidPackageOrder">
                            Paid Order({this.paidOrderCount()}):
                    </label>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-5">
                        <label className="control-label" id="label-paidPackageOrderValue">
                            Php {parseFloat(this.totalPaidOrder()).toFixed(2)}
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-xs-6 col-sm-6 col-md-6 col-lg-7 control-label">
                        Total Earned:
                    </label>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-5">
                        <label className="control-label" id="label-totalEarned">
                        Php {parseFloat(this.totalPaidOrder()).toFixed(2)}
                        </label>
                    </div>
                </div>
            </form>    
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-6">
                <div  className="row">
                    <div className="col-xs-12">
                        <label className="control-label"
                                id="label-packageOrdersStatus">
                                {this.packageOrderStatus()}
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <hr/>
            </div>
        </div>
    </div>
    );
  }
  
};