import Model from './Model';

export default class Wishlist extends Model {
	static col = new Mongo.Collection('wishlist', {
		transform: function(doc) {
			return new Wishlist(doc);
		}
	});

	//properties userId , productId

	removeProduct() {
		const item = this.constructor.col.findOne({userId: this.userId, productId: this.productId});
		this.constructor.col.remove(item._id);
	}
}