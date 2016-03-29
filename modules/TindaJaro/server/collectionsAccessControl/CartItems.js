import CartItem from 'TindaJaro/models/CartItem';

CartItem.col.allow({
  insert: function (userId, doc) {
    return (userId && isBuyer(userId));
  },
  update: function (userId, doc, fields, modifier) {
    return (userId && isBuyer(userId) && isOwner(userId, doc));
  },
  remove: function (userId, doc) {
    return (userId && isBuyer(userId) && isOwner(userId, doc));
  }
});

function isBuyer(userId) {
  const user = Meteor.users.findOne(userId);

  return user.profile.accountType == "Buyer" ? true : false;
}

function isOwner(userId, doc) {
  return userId == doc.userId ? true : false;
}

