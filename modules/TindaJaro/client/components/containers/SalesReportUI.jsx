import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProfileDiv from '../divs/ProfileDiv';
import SalesReportTable from '../tables/SalesReportTable';
import SalesSummaryTable from '../tables/SalesSummaryTable';
import MonthlySalesTable from '../tables/MonthlySalesTable';

import Product from 'TindaJaro/models/Product';
import Order from 'TindaJaro/models/Order';

@ReactMixin.decorate(ReactMeteorData)
export default class SalesReportUI extends Component {

     getMeteorData() {
        Meteor.subscribe("inventory");
        const products = Product.col.find().fetch();
        let productIds = [];

        products.map(product => productIds.push(product._id));
        
        Meteor.subscribe("orders", productIds);
        let orders = [];

        products.map(function(product) {
            const packageOrders = Order.col.find({productId: product._id, status: "Delivered"});

            if (packageOrders) {
                packageOrders.map(packageOrder => orders.push(packageOrder));
            }
        })

        return {
            products,
            orders
        };
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.products  || !this.data.orders) {
        return false;
    }
    
    return (
        <div className="container-fluid">
            <PageHeader/>
            <div className="row">
                <div className="col-xs-6 col-md-offset-3 col-xs-offset-3">
                </div>
            </div>
            <div className="row sidebarAndProductsContainer">
                <div className="col-md-2 col-xs-2">
                    <Sidebar activeLink="salesReport" type="seller"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-5 divBorder">
                        <div className="row">
                            <div className="col-xs-12">
                                <h4>
                                    <strong>
                                    Sales Report
                                    </strong>
                                </h4>
                                <h5>
                                    <small>
                                        Click Product to View/Update Details
                                    </small>
                                </h5>
                            </div>
                        </div>
                        <div className="row">
                            <SalesReportTable products={this.data.products} orders={this.data.orders}/>
                        </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-7 divBorder">
                        <div className="row">
                            <div className="col-xs-12">
                                <h4>
                                    <strong>
                                    Sales Summary
                                    </strong>
                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <MonthlySalesTable orders={this.data.orders}/>
                            </div>
                            <div className="col-xs-6">
                                <SalesSummaryTable orders={this.data.orders}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
};