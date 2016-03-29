import Product from 'TindaJaro/models/Product';
import CartItem from 'TindaJaro/models/CartItem';
import Wishlist from 'TindaJaro/models/Wishlist';
import Order from 'TindaJaro/models/Order';

Meteor.publish('inventory', function() {
	const user = Meteor.users.findOne({_id: this.userId});
    const email = user.emails[0].address;

    if (this.userId) {
	   return Product.col.find({soldBy: email});
    }
});

Meteor.publish('products', function() {
    if (this.userId) {
        return Product.col.find({});
    }
});

Meteor.publish('cartItems', function() {
    if (this.userId) {
        return CartItem.col.find({userId: this.userId});
    }
});

Meteor.publish('userOrders', function() {
    if (this.userId) {
        return Order.col.find({userId: this.userId});
    }
});

Meteor.publish('productPackageOrders', function(id) {
    if (this.userId) {
	   return Order.col.find({productId: id});
    }
});

Meteor.publish('orders', function(productIds) {
    if (this.userId) {
        return Order.col.find({}, {$in: {productId: productIds}});
    }
});

Meteor.publish('wishlist', function() {
    if (this.userId) {
	   return Wishlist.col.find({userId: this.userId});
    }
});

Meteor.publish('unpackagedOrders', function() {
    if (this.userId) {
        return Order.col.find({status: "Pending"});
    }
});

Meteor.publish('undeliveredOrders', function() {
    if (this.userId) {
        return Order.col.find({status: "Packaged"});
    }
});

