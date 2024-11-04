import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home'
import Form from './Form'

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          {/* <a class="active" href="/W_S7_Challenge">Home</a>
          <a class="" href="/W_S7_Challenge/order" aria-current="page">Order</a> */}
          <Link to="/">Home</Link>&nbsp;
          <Link to="Form">Form</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
