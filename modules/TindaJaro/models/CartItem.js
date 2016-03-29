import Model from './Model';

export default class CartItem extends Model {
	static col = new Mongo.Collection('cartItems', {
		transform: function(doc) {
			return new CartItem(doc);
		}
	});

	//cart properties = userId, productId, productQuantity, createdAt

	removeProduct() {
		this.constructor.col.remove({_id: this._id});
	}

}
