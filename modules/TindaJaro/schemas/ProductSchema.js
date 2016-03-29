import Product from 'TindaJaro/models/Product';

var Schema = {};
//properties : name,category,price, minOrder, quantity, quantityUnit(kg,unit), soldBy
Schema.Product = new SimpleSchema({
    name:  {
      type: String,
      label: "Product Name",
      optional: false
    },
    category: {
      type: String,
      label: "Product Category",
      allowedValues: ["Meat", "Seafood", "Dairy", "Grain", "Fruit", "Vegetable"],
      optional: false
    },
    oldPrice: {
      type: Number,
      decimal: true,
      label: "Product Old Price",
      defaultValue: 0,
      optional: true
    },
    price: {
      type: Number,
      decimal: true,
      label: "Product Price",
      min: 0
    },
    minOrder: {
      type: Number,
      decimal: true,
      label: "Product Minimum Order",
      optional: false
    },
    quantity: {
      type: Number,
      decimal: true,
      label: "Product Quantity",
      min: 0
    },
    quantityUnit: {
      type: String,
      label: "Product Unit of Quantity",
      allowedValues: ["kg", "unit"],
      optional: false
    },
    soldBy: {
      type: String,
      label: "Email of Vendor",
      regEx: SimpleSchema.RegEx.Email,
      optional: false
    },
    createdAt: {
      type: Date,
      label: "Date Ordered",
      optional: false
    }
});

Product.col.attachSchema(Schema.Product);
