import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import Order from './Order'
import { Link } from "react-router-dom";

function App() {
  return (
    <div id="app">     
      <nav>
        <Link to="/">Home</Link>
        <Link to="/order">Order</Link>
      </nav>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order/>} />
        </Routes>
    </div>
  )
}

export default App