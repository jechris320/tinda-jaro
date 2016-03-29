export default class Model {
	constructor(doc = {}) {
		_(this).extend(doc);
	}

	save() {
		var model = this.constructor.col;
		var id = this._id;

		if(id == null) {
			id = model.insert(this.doc, function(error, result) {
				console.log("---Model Insert Log---");
				console.log(error);
				console.log(result);
				console.log("------");
			});
		} else {
			model.update(id, {$set:this.doc}, function(error, result) {
				console.log("---Model Update Log---");
				console.log(error);
				console.log(result);
				console.log("------");
			});
		}
	}

	get doc() {
		const notNeeded = ['_id'];

		for(let key in this) {
			if (_(this[key]).isFunction()) {
				notNeeded.push(key);
			}

			return _(this).omit(notNeeded);
		}
	}
}