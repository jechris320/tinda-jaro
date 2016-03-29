import { Component } from 'react';
import { Router, Link } from 'react-router';

import Product from 'TindaJaro/models/Product';

export default class SearchBar extends Component {

   /* componentDidMount() {
        $("#input-search").keydown(function(event) {
            if (event.keyCode === 13 ) {
                console.log("---");
            }
        })
    }

    searchProduct(event) {
        event.preventDefault();
        const products = Product.col.find().fetch();
        console.log("test");
    }*/

  render() {
    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }
    return (
        	<div className="input-group stylish-input-group" style={hide}>
                    <input type="text" className="form-control" placeholder="Search" id="input-search"/>
                    <span className="input-group-addon">
                        <button type="submit">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>  
                    </span>
            </div>
    );
  }
  
};