import CartItem from 'TindaJaro/models/CartItem';

var Schema = {};
//cart properties = userId, productId, productQuantity, totalprice
Schema.CartItem = new SimpleSchema({
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
    productQuantity: {
      type: Number,
      decimal: true,
      label: "Product Quantity",
      min: 0
    },
    totalPrice: {
      type: Number,
      decimal: true,
      label: "Cart Item Total Price",
      min: 0
    },
    createdAt: {
      type: Date,
      label: "Date Added",
      optional: false
    }
});

CartItem.col.attachSchema(Schema.CartItem);
