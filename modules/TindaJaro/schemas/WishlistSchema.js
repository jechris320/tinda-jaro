import Wishlist from 'TindaJaro/models/Wishlist';

var Schema = {};
//properties userId , productId
Schema.Wishlist = new SimpleSchema({
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: "User ID",
      optional: false
    },
    productId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: "Product ID",
      optional: false
    },
    createdAt: {
      type: Date,
      label: "Date Ordered",
      optional: false
    }
});

Wishlist.col.attachSchema(Schema.Wishlist);
