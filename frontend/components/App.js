import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import Form from './Form'



function App() {
  return (
    <div id="app">     
      <nav>
        <a aria-current="page" className="active" href="/">Home</a>
        <a className="" href="/Form">Order</a>
      </nav>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/Form" element={<Form/>} />
        </Routes>
    </div>
  )
}

export default App
