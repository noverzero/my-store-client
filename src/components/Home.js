import React from 'react'

import Loader from './Loader'

const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome Home!</h1>
        <Loader />
      </header>
    </div>
  )
}

export default Home