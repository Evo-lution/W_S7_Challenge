import React from 'react'
import Home from './Home'
import Form from './Form'

function App() {
  return (
    <div id="app">
      <nav>
        <a class="active" href="/W_S7_Challenge">Home</a>
        <a class="" href="/W_S7_Challenge/order" aria-current="page">Order</a>
      </nav>
      
      <Home />
      <Form />
    </div>
  )
}

export default App
