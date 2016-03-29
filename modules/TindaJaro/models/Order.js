import Model from './Model';

export default class Order extends Model {
	static col = new Mongo.Collection('orders', {
		transform: function(doc) {
			return new Order(doc);
		}
	});

	//properties: userId , productId, productQuantity,totalPrice and status(pending,packaged,delivered)
	// customerName, address
}

