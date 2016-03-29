import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import ProductRow from '../tableRows/ProductRow';
import ModalAddProduct from '../modals/ModalAddProduct';

import Product from 'TindaJaro/models/Product';

export default class ProductTable extends Component {
  static propTypes = {
    tableType: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired
  }

  componentDidMount() {
      switch(this.props.tableType) {
        case 'products':
          $("#tableTitle").html("Products");
          break;
        case 'wishlist':
          $("#tableTitle").html("Wishlist");
          break;
        case 'inventory':
          $("#tableTitle").html("Inventory");
          $("#productCategory").css("display","none");
          $("#sortBy").css("display","none");
          $("#btn-addStock").css("display","block");
          break;
        default:
          break;
      }
  }

  render() {
    const hide = {
      display: 'none'
    }
    const show = {
      display: 'block'
    }
    let count = 0;

    return (
    <div className="container-fluid divBorder">

        <ModalAddProduct/>

        <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                <h4 id="tableTitle"><strong></strong></h4>
                <h5 style={this.props.tableType == "inventory" ? show : hide}>
                    <small>
                    Click Product to View/Update Details
                    </small>
                </h5>
                <h5 style={this.props.tableType != "inventory" ? show : hide}>
                    <small>
                    Click Product to View Details
                    </small>
                </h5>
            </div>
            <div className="col-xs-3 col-xs-offset-3 col-sm-3 col-sm-offset-3 col-md-3 col-md-offset-3 col-lg-3 col-lg-offset-4">
                <select name="productCategory" id="productCategory" className="form-control" 
                        defaultValue="SelectProductCategory" style={hide}>
                  <option value="SelectProductCategory">Select Product Category</option>
                  <option value="Meat">View Meat Products</option>
                  <option value="Seafood">View Seafood Products</option>
                  <option value="Dairy">View Dairy Products</option>
                  <option value="Grain">View Grain Products</option>
                  <option value="Fruit">View Fruit Products</option>
                  <option value="Vegetable">View Vegetable Products</option>
                </select>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2">
                <select name="sortBy" id="sortBy" className="form-control" 
                        defaultValue="SortBy" style={hide}>
                  <option value="SortBy">Sort By</option>
                  <option value="LowestPrice">Lowest Price</option>
                  <option value="HighestPrice">Highest Price</option>
                </select>
                <button className="form-control btn btn-addStock" 
                        style={this.props.tableType == "inventory" ? show : hide} 
                        id="btn-addStock" data-toggle="modal" 
                        data-target="#addNewStockModal">
                Add Stock
                </button>
            </div>
        </div>
        <div className="row">
        	<div className="col-md-12">
                <table className="table table-bordered table-hover">
                    <thead>  
                        <tr>
                            <th>{this.props.tableType != "wishlist" ? "#" : ""}</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Min Order</th>
                            <th>Available Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.products.map(product => <ProductRow key={product._id} 
                          tableType={this.props.tableType} product={product} 
                          count={count += 1}/>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
  }
  
};