Meteor.methods({
  
  checkLoggedIn: function(pathname) {
    const currentLocation = pathname;
    if (Meteor.userId()) {
      const user = Meteor.users.findOne({_id: Meteor.userId()});
      const accountType = user.profile.accountType;
      const buyerInterfacePaths = ["/products", "/wishlist", "/cart", "/orders"];
      const sellerInterfacePaths = ["/inventory", "/sales-report"];

      console.log(accountType);
      if (currentLocation == "/") {
        switch (accountType) {
          case 'Buyer':
            $(location).attr("href","products");
            break;
          case 'Seller':
            $(location).attr("href","inventory");
            break;
          case 'DeliveryPersonnel':
            $(location).attr("href","undelivered-orders");
            break;
          case 'Packager':
            $(location).attr("href","pending-orders");
            break;
          default:
            break;
        }
      } else if (_.contains(buyerInterfacePaths, currentLocation) && accountType != "Buyer") {
        switch (accountType) {
          case 'Seller':
            $(location).attr("href","inventory");
            break;
          case 'DeliveryPersonnel':
            $(location).attr("href","undelivered-orders");
            break;
          case 'Packager':
            $(location).attr("href","pending-orders");
            break;
          default:
            break;
        }
      } else if (_.contains(sellerInterfacePaths, currentLocation) && accountType != "Seller") {
        switch (accountType) {
          case 'Buyer':
            $(location).attr("href","products");
            break;
          case 'DeliveryPersonnel':
            $(location).attr("href","undelivered-orders");
            break;
          case 'Packager':
            $(location).attr("href","pending-orders");
            break;
          default:
            break;
        }
      }
    } else if (currentLocation != "pending-orders" && accountType != "Packager") {
      switch (accountType) {
          case 'Buyer':
            $(location).attr("href","products");
            break;
          case 'Seller':
            $(location).attr("href","inventory");
            break;
          case 'DeliveryPersonnel':
            $(location).attr("href","undelivered-orders");
            break;
          default:
            break;
        }
    } else if (currentLocation != "undelivered-orders" && accountType != "DeliveryPersonnel") {
      switch (accountType) {
          case 'Buyer':
            $(location).attr("href","products");
            break;
          case 'Seller':
            $(location).attr("href","inventory");
            break;
          case 'Packager':
            $(location).attr("href","pending-orders");
            break;
          default:
            break;
        }
    } else {
      if (pathname != "/") {
        $(location).attr("href","/");
      }
    }
  }

});
