import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import ModalUpdateProduct from '../modals/ModalUpdateProduct';

import Product from 'TindaJaro/models/Product';

export default class StockItemDetailsDiv extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired
    }

    productQuantity() {
        return this.props.product.quantityUnit == "unit" ? this.props.product.quantity + " units"
                : parseFloat(this.props.product.quantity).toFixed(2) + " kg";
    }

  render() {
    return (
    <div className="container-fluid">

        <ModalUpdateProduct product={this.props.product}/>

        <div className="row">
            <div className="col-xs-12">
                <h2 className="productName" id="productName">{this.props.product.name}</h2>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <hr/>
            </div>
        </div>
        <form className="form-horizontal">
            <div className="form-group">
            <label className="col-xs-5 col-sm-5 control-label">Category:</label>
                <div className="col-sm-6 col-xs-7">
                    <label className="control-label categoryLabel" id="categoryLabel">{this.props.product.category}</label>
                </div>
            </div>
            <div className="form-group">
            <label className="col-xs-5 col-sm-5 control-label">Price:</label>
                <div className="col-sm-7 col-xs-7">
                    <label className="control-label productPriceLabel" id="productPriceLabel">
                        Php {parseFloat(this.props.product.price).toFixed(2)}/{this.props.product.quantityUnit}
                    </label>
                </div>
            </div>
            <div className="form-group">
            <label className="col-xs-5 col-sm-5 control-label">Min Order:</label>
                <div className="col-sm-7 col-xs-7">
                    <label className="control-label minOrderLabel" id="minOrderLabel">
                        Php {parseFloat(this.props.product.minOrder).toFixed(2)}
                    </label>
                </div>
            </div>
            <div className="form-group">
            <label className="col-xs-5 col-sm-5 control-label">Quantity:</label>
                <div className="col-sm-6 col-xs-7">
                    <label className="control-label availableQuantityLabel" id="availableQuantityLabel">
                        {parseFloat(this.props.product.quantity) == 0 ? "Out of Stock"
                            : this.productQuantity()}
                    </label>
                </div>
            </div>
        </form>
        <div className="row">
            <div className="col-xs-12">
                <button className="form-control btn btn-edit"
                        data-toggle="modal" data-target="#updateProductModal">
                    Edit
                </button>
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