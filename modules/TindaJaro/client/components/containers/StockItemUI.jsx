import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProfileDiv from '../divs/ProfileDiv';
import StockItemDetailsDiv from '../divs/StockItemDetailsDiv';
import StockItemOrderTable from '../tables/StockItemOrderTable';
import StockItemSalesReport from '../divs/StockItemSalesReport';

import Product from 'TindaJaro/models/Product';
import Order from 'TindaJaro/models/Order';

@ReactMixin.decorate(ReactMeteorData)
export default class StockItemUI extends Component {

    getMeteorData() {
        Meteor.subscribe("inventory");
        const product = Product.col.findOne({_id: this.props.params.productId});
        Meteor.subscribe("productPackageOrders",product._id);
        let orders = Order.col.find().fetch();

        return {
            product,
            orders
        };
    }

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
    if (!Meteor.userId() || !this.data.orders || !this.data.product) {
        return false;
    }
    const hide = {
        display: 'none'
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
                    <Sidebar activeLink="inventory" type="seller"/>
                </div>
                <div className="col-md-10 col-xs-10">
                    <div className="row">
                        <div className="col-xs-4 col-md-4 col-sm-4 col-lg-3 divBorder">
                            <StockItemDetailsDiv product={this.data.product}/>
                        </div>
                        <div className="col-xs-8 col-md-8 col-sm-8 col-lg-9 divBorder">
                            <div className="row">
                                <div className="col-xs-12">
                                    <StockItemOrderTable orders={this.data.orders} product={this.data.product}/>
                                </div> 
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <StockItemSalesReport orders={this.data.orders} product={this.data.product}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
  
};