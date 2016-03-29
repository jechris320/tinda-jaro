import Order from 'TindaJaro/models/Order';

var Schema = {};
  //properties: userId , productId, productQuantity,totalPrice and status(pending,packaged,delivered)
Schema.Order = new SimpleSchema({
  userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      label: "User ID",
      optional: false
    },
  customerName: {
    type: String,
    label: "Customer Name",
    optional: false
  },
  address: {
    type: String,
    label: "Address",
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
    label: "Order Total Price",
    min: 0
  },
  status: {
    type: String,
    label: "Order Status",
    allowedValues: ["Pending", "Packaged", "Delivered"],
    defaultValue: "Pending",
    optional: false
  },
  createdAt: {
    type: Date,
    label: "Date Ordered",
    optional: false
  }
});

Order.col.attachSchema(Schema.Order);
