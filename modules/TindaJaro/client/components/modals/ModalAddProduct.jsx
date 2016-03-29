import { Component } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';

export default class ModalAddProduct extends Component {

        addProduct(event) {
        event.preventDefault();
        
        let confirmMessage = "";
        const user = Meteor.users.findOne({_id: Meteor.userId()});
        const email = user.emails[0].address;
        const name = $("#productName").val();
        const category = $("#foodCategory").val();
        const price = $("#productPrice").val();
        const minOrder = $("#minOrder").val();
        const quantity = $("#productQuantity").val();
        const unit = $("#quantityUnit").val();

        if (name && price && minOrder && quantity 
                && category != "SelectProductCategory"
                && unit != "SelectQuantityUnit") {
            let product = new Product();
            product.name = name;
            product.category = category;
            product.price = parseFloat(price);
            product.minOrder = parseFloat(minOrder);
            product.quantity = parseFloat(quantity);
            product.quantityUnit = unit;
            product.soldBy = email;
            product.createdAt = new Date();
            product.save();

            confirmMessage = "Product Added";
        } else {
            confirmMessage = "Failed to Add Product";
        }

        $("#addNewStockModal").modal("hide");
        this.resetModalForm();
        alert(confirmMessage);
    }

    handleFormSubmit(event) {
        event.preventDefault();
    }

    validatePrice(event) {
        let regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
        let val = $("#productPrice").val();

        this.regexText(event, regex, val);
    }


    validateQuantity(event) {
        let val = $("#productQuantity").val();
        let regex;

        switch ($("#quantityUnit").val()) {
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


    validateMinOrder(event) {
        let regex = new RegExp("(^[0-9]+$|^[0-9]+[.]$|^[0-9]+[.][0-9]+$)");
        let val = $("#minOrder").val();

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
        const price = $("#productPrice").val();
        const minOrder = $("#minOrder").val();
        const quantity = $("#productQuantity").val();

        if (price) {
            if (regex.test(price)) {
                $("#productPrice").val(price.replace(/\./,""));
            }
        }

        if (minOrder) {
            if (regex.test(minOrder)) {
                $("#minOrder").val(minOrder.replace(/\./,""));
            }
        }

        if (quantity) {
            if (regex.test(quantity)) {
                $("#productQuantity").val(quantity.replace(/\./,""));
            }
        }
    }

    checkQuantityUnit(event) {
        event.preventDefault();

        if ($("#quantityUnit").val() == "SelectQuantityUnit") {
            $("#productQuantity").css("display","none");
        } else {
            $("#productQuantity").css("display","block");
        }
    }

    resetModalForm() {
       $("#productName").val("");
       $("#foodCategory").val("SelectProductCategory");
       $("#productPrice").val("");
       $("#minOrder").val("");
       $("#quantityUnit").val("SelectQuantityUnit");
       $("#productQuantity").val("");
       $("#productQuantity").css("display","none");
    }
    
  render() {
    const hide = {
        display: 'none'
    }

    return (
    <div>


        {/*Add Product Modal*/}
        <div className="modal addNewStockModal fade" id="addNewStockModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Product Details</h4>
                </div>
                <div className="modal-body">
                  <form className="stock-form" id="stock-form" onClick={this.handleFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" id="productName" className="form-control productName"
                                placeholder="Product Name"/>
                    </div>
                    <div className="form-group">
                        <select name="foodCategory" id="foodCategory" className="form-control" 
                                defaultValue="SelectProductCategory">
                            <option value="SelectProductCategory">Select Product Category</option>
                            <option value="Meat">Meat</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Grain">Grain</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Vegetable">Vegetable</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="number" id="productPrice" className="form-control productPrice"
                                placeholder="Product Price Per Quantity Php" 
                                onKeyPress={this.validatePrice.bind(this)}
                                onBlur={this.cleanField.bind(this)}
                                min="0"/>
                    </div>
                    <div className="form-group">
                        <input type="number" id="minOrder" className="form-control minOrder"
                                placeholder="Minimum Order Php" 
                                onKeyPress={this.validateMinOrder.bind(this)}
                                onBlur={this.cleanField.bind(this)}
                                min="0"/>
                    </div>
                    <div className="form-group">
                        <select name="quantityUnit" id="quantityUnit" className="form-control" 
                                defaultValue="SelectQuantityUnit" onChange={this.checkQuantityUnit.bind(this)}>
                            <option value="SelectQuantityUnit">Select Quantity Unit</option>
                            <option value="unit">unit</option>
                            <option value="kg">kg</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="number" id="productQuantity" className="form-control productQuantity"
                                placeholder="Available Quantity" 
                                onKeyPress={this.validateQuantity.bind(this)}
                                onBlur={this.cleanField.bind(this)}
                                style={hide} min="0"/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                 <button type="button" className="btn btn-primary" onClick={this.addProduct.bind(this)}>
                    Add Product
                </button>
                <button type="button" className="btn btn-default" data-dismiss="modal">
                    Cancel
                </button>
                </div>
              </div>
            </div>
        </div>


    </div>
    );
  }
  
};