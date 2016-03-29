import { Component, PropTypes } from 'react';
import CartItem from 'TindaJaro/models/CartItem';
import Product from 'TindaJaro/models/Product';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  /*test(event) {
    event.preventDefault();
    const a = ["a", "b", "c"];
    const b = ["a", "b", "c"];

    if (_.contains(a,b)) {
      console.log("Awesome");
    } else {
      console.log(false);
    }

    b.map(test => test == "c" ? console.log(true) : console.log(false));

    const test = new Order();
    test.test();

    Product.col.insert({
      name: "orange",
      category: "Fruit",
      price: 20,
      minOrder: 50,
      quantity: 100,
      quantityUnit: "unit",
      soldBy: "duterte@yahoo.com",
      createdAt: new Date()
    }, function(error, result) {
      console.log("----");
      console.log(error);
      console.log("---");
      console.log(result);
    });

    $(location).attr("href",`/product/fish/dXw2jZtLjXrtZ7e7A`);

  }*/

  render() {
    return (
      <div className="container-fluid">
        {/*<button onClick={this.test.bind(this)}>test</button>*/}
        {this.props.children}
      </div>
    );
  }
}
