import React, { Component } from 'react';
import makeRequest from './Utils/MakeRequest';
import './App.css';

class App extends Component {
  constructor() {
    super();
		this.state = {
			products: []
		};
		this.removeProduct = this.removeProduct.bind(this);
  }

  componentDidMount() {
    makeRequest('/api/v1/products').then((json) => {
			this.setState({products: json.products});
    });
  }

	removeProduct(id) {
		this.setState({
			products: this.state.products.filter(product => product.id !== id)
		});
	}

  render() {
		console.log(this.state);
		const { products } = this.state;
    return (
      <div className="App">
				<Products items={products} onRemove={this.removeProduct}/>
      </div>
    );
  }
}

export default App;

class Products extends Component {
	render() {
		return (
			<ul className="products">
				{this.props.items.map((product) => (
					<Product key={product.id} product={product} onRemove={this.props.onRemove}/>
				))}
			</ul>
		)
	}
}

class Product extends Component {
	render() {
		const product = this.props.product;
		return (
			<li key={product.id} className="product"><button className="remove" onClick={this.props.onRemove.bind(this, product.id)}>x</button><span className="product-name">{product.name}</span><span className="product-price">{product.price}</span></li>
		)
	}
}
