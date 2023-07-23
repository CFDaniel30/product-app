import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import data from "./data"
import ProductList from "./ProductList"
import ProductDetail from "./ProductDetail"
import NotFound from "./NotFound"
import Nav from "./Nav"


import "../src/productApp.css" 

export default function App(){
    return (
      <Routes>
        <Route path="/" element={<ProductList/> } />
        <Route path="/productdetail/:id" element={<ProductDetail />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    )
}
