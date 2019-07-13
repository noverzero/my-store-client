import React, { Component } from 'react'

import Card from '../Card'
import Loader from '../Loader'

class ProductDetail extends Component {
  state = {
    product: {},
    isLoaded: false
  }

  componentDidMount() {
    // Fetch data for ONE product
    const id = this.props.match.params.id
    
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data.product,
          isLoaded: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  initiateStripeCheckout = async () => {
    const stripe = window.Stripe('pk_test_U97OqImzWdzzRotfPzXt3Req00UQtQ1rnD')
    const { product } = this.state

    const lineItem = {
      name: product.name,
      description: product.description,
      images: [product.img_url],
      amount: product.price,
      currency: 'usd',
      quantity: 1
    }

    try {
      // Initiate checkout session to get session id
      const response = await fetch('http://localhost:4000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(lineItem)
      })

      const data = await response.json()
      const sessionId = data.session.id

      // Redirect to checkout
      const result = await stripe.redirectToCheckout({ sessionId })

    } catch (error) {
      console.log('STRIPE ERROR', error)
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to Product Detail</h2>
        {this.state.isLoaded ?
          <Card>
            <h2>{this.state.product.name}</h2>
            <img src={this.state.product.img_url} alt="product" />
            <p>{this.state.product.description}</p>
            <h3>Price: ${this.state.product.price / 100}.00</h3>
            <button onClick={this.initiateStripeCheckout}>Purchase</button>
          </Card>
          : <Loader />
        }
        
      </div>
    )
  }
}

export default ProductDetail