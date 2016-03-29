import Model from './Model';

export default class Product extends Model {
	static col = new Mongo.Collection('products', {
		transform: function(doc) {
			return new Product(doc);
		}
	});

	//properties : name,category,price, minOrder, quantity, quantityUnit(kg,unit), soldBy
}

