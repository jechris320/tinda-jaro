import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Wishlist from 'TindaJaro/models/Wishlist';
import Product from 'TindaJaro/models/Product';

export default class ProductRow extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        tableType: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }

    handleRemoveFromWishlist(event) {
        event.preventDefault();

        if (confirm("Press \"ok\" to remove product from wishlist")) {
            let wishlist = new Wishlist();
            wishlist.userId = Meteor.userId();
            wishlist.productId = this.props.product._id;
            wishlist.removeProduct();
        }
    }

    updateProduct(event) {
        event.preventDefault();

        return false;
        let confirmMessage = "";
        const id = this.props.product._id;
        let product = new Product();
        const price = $("#newProductPrice").val();
        const minOrder = $("#newMinOrder").val();
        const quantity = $("#newProductQuantity").val();
        const unit = $("#newQuantityUnit").val();

            console.log(id);
            console.log(price);
            console.log(minOrder);
            console.log(quantity);
            console.log(unit);

        if (price && minOrder && quantity 
            && unit != "SelectQuantityUnit") {
        product._id = id;
        product.price = parseFloat(price);
        product.minOrder = parseFloat(minOrder);
        product.quantity = parseFloat(quantity);
        product.quantityUnit = unit;
            
        product.save();
            
        confirmMessage = "Product Updated";
        } else {
            confirmMessage = "Failed to Update Product";
        }

        this.resetUpdateFields();
        alert(confirmMessage);
    }

    productQuantity() {
        return this.props.product.quantityUnit == "unit" ? this.props.product.quantity + " units"
                : parseFloat(this.props.product.quantity).toFixed(2) + " kg";
    }

    validateNewMinOrder(event) {
        let regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
        let val = $("#newMinOrder").val();

        this.regexText(event, regex, val);
    }

    validateNewPrice(event) {
        let regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
        let val = $("#newProductPrice").val();

        this.regexText(event, regex, val);
    }

    validateNewQuantity(event) {
        let val = $("#newProductQuantity").val();
        let regex;

        switch (this.props.product.quantityUnit) {
            case 'unit':
                regex = new RegExp("^[0-9]+$");
                break;
            case 'kg':
                regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
                break;
            default:
                regex = new RegExp("^[0-9]+$");
                break;
            }

        this.regexText(event, regex, val);
    }

    regexText(event, reg, val) {
        let key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        let input = val + key;

        if (!reg.test(input)) {
           event.preventDefault();
           return false;
        }
    }

    cleanField(event) {
        event.preventDefault();
        const regex = new RegExp("^[0-9]+\.$");
        const newPrice = $("#newProductPrice").val();
        const newMinOrder = $("#newMinOrder").val();
        const newQuantity = $("#newProductQuantity").val();

        if (newPrice) {
            if (regex.test(newPrice)) {
                $("#newProductPrice").val(newPrice.replace(/\./,""));
            }
        }

        if (newQuantity) {
            if (regex.test(newQuantity)) {
                $("#newProductQuantity").val(newQuantity.replace(/\./,""));
            }
        }

        if (newMinOrder) {
            if (regex.test(newMinOrder)) {
                $("#newMinOrder").val(newMinOrder.replace(/\./,""));
            }
        }
    }

    checkQuantityUnit(event) {
        event.preventDefault();

        if ($("#newQuantityUnit").val() == "SelectQuantityUnit") {
            $("#newProductQuantity").css("display","none");
        } else {
            $("#newProductQuantity").css("display","block");
        }

    }

  render() {
    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }

    return (
        	<tr>
                <td>
                    <button className="btn-remove form-control btn" id="btn-remove" 
                            onClick={this.handleRemoveFromWishlist.bind(this)} 
                            style={this.props.tableType == "wishlist" ? show : hide}>
                        Remove
                    </button>
                    {this.props.tableType != "wishlist" ? this.props.count : ""}
                </td>
                <td>
                    <u>
                        <Link to={this.props.tableType == "inventory" 
                            ?`/${this.props.product.name.replace(/\s+/g, '-')}/${this.props.product._id}`
                            :`/product/${this.props.product.name.replace(/\s+/g, '-')}/${this.props.product._id}`}>
                            {this.props.product.name}
                        </Link>
                    </u>
                </td>
                <td>{this.props.product.category}</td>
                <td>
                        Php {parseFloat(this.props.product.price).toFixed(2)}/{this.props.product.quantityUnit}
                    <input type="text" id="newProductPrice" className="newProductPrice"
                            placeholder="New Price" style={hide}
                            onKeyPress={this.validateNewPrice.bind(this)}
                            onBlur={this.cleanField.bind(this)}/> 
                </td>
                <td>
                    Php {parseFloat(this.props.product.minOrder).toFixed(2)}
                    <input type="text" id="newMinOrder" className="newMinOrder"
                            placeholder="New Min Order" style={hide}
                            onKeyPress={this.validateNewMinOrder.bind(this)}
                            onBlur={this.cleanField.bind(this)}/> 
                </td>
                <td>
                    {parseFloat(this.productQuantity()) == 0 ? "Out of Stock"
                                : this.productQuantity()}
                    <input type="text" id="newProductQuantity" className="newProductQuantity"
                            placeholder="New Quantity" style={hide}
                            onKeyPress={this.validateNewQuantity.bind(this)}
                            onBlur={this.cleanField.bind(this)}/>
                </td>
            </tr>
    );
  }
  
};