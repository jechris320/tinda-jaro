import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';

export default class ModalUpdateProduct extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired
    }


    updateProduct(event) {
        event.preventDefault();
        const user = Meteor.users.findOne({_id: Meteor.userId()});
        const price = $("#productPrice").val();
        const minOrder = $("#minOrder").val();
        const quantity = $("#productQuantity").val();
        const id = this.props.product._id;
        const oldProduct = Product.col.findOne({_id: id});
        let product = new Product();
        
        if (price) {
            if (price != oldProduct.price) {
                product.oldPrice = oldProduct.price;
            }

            product.price = parseFloat(price);
        }

        if (minOrder) {
            product.minOrder = parseFloat(minOrder);
        }

        if (quantity) {
            product.quantity = parseFloat(quantity);
        }

        product._id = id;
        product.save();

        $("#updateProductModal").modal("hide");
        this.resetModalForm();
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

    resetModalForm() {
       $("#productPrice").val("");
       $("#minOrder").val("");
       $("#productQuantity").val("");
    }
    
  render() {

    return (
        <div>


        {/*Update Product Modal*/}
        <div className="modal updateProductModal fade" id="updateProductModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Product Details</h4>
                  <h4><small>Empty Fields will be set to Default</small></h4>
                </div>
                <div className="modal-body">
                  <form className="stock-form" id="stock-form" onClick={this.handleFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input type="text" id="productPrice" className="form-control productPrice"
                                placeholder="Product Price Per Quantity Php" 
                                onKeyPress={this.validatePrice.bind(this)}
                                onBlur={this.cleanField.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="minOrder" className="form-control minOrder"
                                placeholder="Minimum Order Php" 
                                onKeyPress={this.validateMinOrder.bind(this)}
                                onBlur={this.cleanField.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" id="productQuantity" className="form-control productQuantity"
                                placeholder="Available Quantity" 
                                onKeyPress={this.validateQuantity.bind(this)}
                                onBlur={this.cleanField.bind(this)}/>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                 <button type="button" className="btn btn-primary" onClick={this.updateProduct.bind(this)}>
                    Update Product
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