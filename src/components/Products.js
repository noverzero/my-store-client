import React, { Component } from 'react'

class Products extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(products => {
        console.log(products)
        this.setState({
          products: products
        })
      })
      .catch(error => {
        // eslint-disable-next-line
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Products List!</h1>
        </header>
      </div>
    )
  }
  
}

export default Products