import { Component, PropTypes } from 'react';
import { Router, Link } from 'react-router';

export default class Sidebar extends Component {
    static propTypes = {
        activeLink: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }

    componentDidMount() {
        switch (this.props.activeLink) {
            case 'products':
                $("#productsLink").addClass("active");
                break;
            case 'profile':
                $("#profileLink").addClass("active");
                break;
            case 'cart':
                $("#cartLink").addClass("active");
                break;
            case 'wishlist':
                $("#wishlistLink").addClass("active");
                break;
            /*case 'followedVendors':
                $("#followedVendorsLink").addClass("active");
                break;*/
            case 'orders':
                $("#ordersLink").addClass("active");
                break;
            case 'inventory':
                $("#inventoryLink").addClass("active");
                break;
            /*case 'watchlist':
                $("#watchlistLink").addClass("active");
                break;*/
            case 'salesReport':
                $("#salesReportLink").addClass("active");
                break;
            default:
                break;
        }
    }

    logout(event) {
        event.preventDefault();
        Meteor.logout( function(error) {
            if (!error) {
                $(location).attr("href","/");
            }
        });
    }

    products(event) {
        event.preventDefault();
        $(location).attr("href","/products");
    }

    profile(event) {
        event.preventDefault();
        $(location).attr("href","/profile");
    }

    cart(event) {
        event.preventDefault();
        $(location).attr("href","/cart");
    }

    wishlist(event) {
        event.preventDefault();
        $(location).attr("href","/wishlist");
    }

    /*followedVendors(event) {
        event.preventDefault();
        $(location).attr("href","/followed-vendors");
    }*/

    orders(event) {
        event.preventDefault();
        $(location).attr("href","/orders");
    }

    inventory(event) {
        event.preventDefault();
        $(location).attr("href","/inventory");
    }

    /*watchlist(event) {
        event.preventDefault();
        $(location).attr("href","/watchlist");
    }*/

    salesReport(event) {
        event.preventDefault();
        $(location).attr("href","/sales-report");
    }

  render() {
    const hide = {
        display: 'none'
    }
    const show = {
        display: 'block'
    }

    return (
        	<nav className="nav-sidebar">
                <ul className="nav">
                    <li id="productsLink">
                        <a href="#" onClick={this.products.bind(this)} 
                            style={this.props.type == "buyer" ? show : hide}>
                            Products
                        </a>
                    </li>
                    <li id="inventoryLink">
                        <a href="#" onClick={this.inventory.bind(this)} 
                            style={this.props.type == "seller" ? show : hide}>
                            Inventory
                        </a>
                    </li>
                    <li id="profileLink">
                        <a href="#" onClick={this.profile.bind(this)}>
                            Profile
                        </a>
                    </li>
                    {/*<li id="watchlistLink">
                        <a href="#" onClick={this.watchlist.bind(this)} 
                            style={this.props.type == "seller" ? show : hide}>
                            Watchlist
                        </a>
                    </li>*/}
                    <li id="salesReportLink">
                        <a href="#" onClick={this.salesReport.bind(this)} 
                            style={this.props.type == "seller" ? show : hide}>
                            Sales Report
                        </a>
                    </li>
                    <li id="cartLink">
                        <a href="#" onClick={this.cart.bind(this)}
                            style={this.props.type == "buyer" ? show : hide}>
                            Cart
                        </a>
                    </li>
                    <li id="wishlistLink">
                        <a href="#" onClick={this.wishlist.bind(this)}
                            style={this.props.type == "buyer" ? show : hide}>
                            Wishlist
                        </a>
                    </li>
                    <li id="ordersLink">
                        <a href="#" onClick={this.orders.bind(this)}
                            style={this.props.type == "buyer" ? show : hide}>
                            Orders
                        </a>
                    </li>
                    {/*<li id="followedVendorsLink">
                        <a href="#" onClick={this.followedVendors.bind(this)}
                            style={this.props.type == "buyer" ? show : hide}>
                            Followed Vendors
                        </a>
                    </li>*/}
                    <li className="nav-divider"></li>
                    <li>
                        <a href="#" onClick={this.logout.bind(this)}>
                            <i className="glyphicon glyphicon-log-out"></i> Log Out
                        </a>
                    </li>
                </ul>
            </nav>
    );
  }
  
};