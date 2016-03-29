import { Component } from 'react';
import { Router, Link } from 'react-router';
import ReactMixin from 'react-mixin';

import PageHeader from '../divs/PageHeader';
import Sidebar from '../Sidebar';
import SearchBar from '../SearchBar';

import ProductTable from '../tables/ProductTable';

import Product from 'TindaJaro/models/Product';

@ReactMixin.decorate(ReactMeteorData)
export default class ProductUI extends Component {

	getMeteorData() {
        Meteor.subscribe("products");

        const products = Product.col.find().fetch();

    	return {products};
  	}

  render() {
    Meteor.call("checkLoggedIn", window.location.pathname);
  	if (!Meteor.userId() || !this.data.products) {
        return false;
    }
    
    return (
    	<div className="container-fluid">
            <PageHeader/>
    		<div className="row">
    			<div className="col-xs-6 col-md-offset-3 col-xs-offset-3">
    				<SearchBar/>
    			</div>
    		</div>
    		<div className="row sidebarAndProductsContainer">
    			<div className="col-md-2 col-xs-3">
        			<Sidebar activeLink="products" type="buyer"/>
        		</div>
        		<div className="col-md-10 col-xs-9">
        			<ProductTable tableType="products" products={this.data.products} />
        		</div>
        	</div>
        </div>
    );
  }
  
};