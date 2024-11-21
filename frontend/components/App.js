import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import Order from './Form'
import { Link } from "react-router-dom";
// typing this here just to get it to register my new commit
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