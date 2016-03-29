import Order from 'TindaJaro/models/Order';

Order.col.allow({
  insert: function (userId, doc) {
    return (userId && isBuyer(userId));
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && (isPackager(userId) || isDeliveryPersonnel(userId)) 
            && isUpdateAllowed(fields));
  },
  remove: function (userId, doc) {
    return false;
  }
});

function isBuyer(userId) {
  const user = Meteor.users.findOne(userId);

  return user.profile.accountType == "Buyer" ? true : false;
}

function isPackager(userId) {
  const user = Meteor.users.findOne(userId);

  return user.profile.accountType == "Packager" ? true : false;
}

function isDeliveryPersonnel(userId) {
  const user = Meteor.users.findOne(userId);

  return user.profile.accountType == "DeliveryPersonnel" ? true : false;
}

function isUpdateAllowed(fields) {
  let isAllowed = true;

  fields.map(function(field) {
    if (field != "status") {
      isAllowed = false;
    }
  });

  return isAllowed;
}
