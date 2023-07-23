import { useEffect, useState } from "react"
import Products from "./Products"
import Pagination from "./Pagination"
import Nav from "./Nav"
import data from "./data"
import {useSearchParams } from "react-router-dom"

export default function ProductList(){
  const [rawdata, setRawData] = useState(data.filter((item) => item.productMedia.length !== 0))
  const [searchParam, setSearchParam] = useSearchParams()
  const [items, setItems] = useState([])
  const [currentPage, setCurrentPage] = useState()
  const [postPerPage, setPostPerPage] = useState(16)
  //const [sortOption, setSortOpttion] = useState("")

  const category = searchParam.get("category") || ""
  const priceRange = searchParam.get("priceRange") || ""
  const sort = searchParam.get("sort") || ""
  const page = parseInt(searchParam.get("page")) || 1


  const filterItems = (rawdata) => {
    const filtedItems = rawdata.filter((item)=>{
      if(category && item.category && item.category.categoryName !== category){
        return false
      }
      if(priceRange === "1" && item.price>100){
        return false
      }
      else if(priceRange === "2" && (item.price < 101 || item.price > 300 )){
        return false
      }   
      else if(priceRange === "3" && item.price<=300){
        return false
      }
      return true
    })

    if (sort === "priceLowtoHigh") {
      filtedItems.sort((a, b) => a.price - b.price)
    } else if (sort === "priceHightoLow") {
      filtedItems.sort((a, b) => b.price - a.price)
    } else if (sort === "nameAZ") {
      filtedItems.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        }
      })
    } else if (sort === "nameZA") {
      filtedItems.sort((a, b) => {
        if (a.title && b.title) {
          return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        }
      })
    }

    return filtedItems
  }


  useEffect(() => {
    const filteredItems = filterItems(rawdata);
    setCurrentPage(page)
    setItems(filteredItems)
  }, [category,priceRange,page, sort])

  const indexOfLastItem = currentPage * postPerPage
  const indexOfFirstItem = indexOfLastItem - postPerPage
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    searchParam.set("page", pageNumber)
    setSearchParam(searchParam)}

  const previous = () => {
    //setCurrentPage(currentPage -1)
    searchParam.set("page", currentPage-1)
    setSearchParam(searchParam)
    setCurrentPage(parseInt(searchParam.get("page")))
  }

  const next = () => {
    //setCurrentPage(currentPage+1)
    searchParam.set("page", currentPage+1)
    setSearchParam(searchParam)
    setCurrentPage(parseInt(searchParam.get("page")))
  }

  return (
    <>
      <Nav items={rawdata}/>
      <Products items={currentItems}/>
      <Pagination currentPage={currentPage} itemPerPage={postPerPage} totalItems={items.length} paginate={paginate} previous={previous} next={next} />
    </>
  )
}