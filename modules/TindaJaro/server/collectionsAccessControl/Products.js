import Product from 'TindaJaro/models/Product';

Product.col.allow({
  insert: function (userId, doc) {
    return (userId && isSeller(userId));
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && isUpdateAllowed(userId, doc, fields));
  },
  remove: function (userId, doc) {
    return false;
  }
});

function isSeller(userId) {
  const user = Meteor.users.findOne(userId);

  return user.profile.accountType == "Seller" ? true : false;
}

function isUpdateAllowed(userId, doc, fields) {
  const user = Meteor.users.findOne(userId);
  const email = user.emails[0].address;
  let isAllowed = true;
  
  switch (user.profile.accountType) {
    case 'Seller':
      if (doc.soldBy != email) {
        isAllowed = false;
      } else {
        fields.map(function(field) {
          if (!(_.contains(["price", "minOrder", "quantity", "oldPrice"], field))) {
            isAllowed = false;
          }
        });
      }
      break;
    case 'Buyer':
      fields.map(function(field) {
        if (field != "quantity") {
          isAllowed = false;
        }
      });
      break;
    default:
      isAllowed = false;
      break;
  }

  return isAllowed;
}
