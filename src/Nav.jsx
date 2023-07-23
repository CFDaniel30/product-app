import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Nav({items}){
  const [categories, setCategoryies] = useState(items[0].prodType.productCategory)
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState("")
  const [pricRange, setPriceRange] = useState("")
  const [sort, setSort] = useState("")

  useEffect(() => {
    const newActiveCategory = searchParams.get("category") || ""
    setActiveCategory(newActiveCategory)

    const newPriceRange = searchParams.get("priceRange") || ""
    setPriceRange(newPriceRange)

    const newSort = searchParams.get("sort") || ""
    setSort(newSort)
  }, [searchParams])

  function handleFilterChange(key,value){
    if(value==="" && searchParams.has(key)){
        searchParams.delete(key)     
      }else if(value!=="" && isValid(key,value)){
        searchParams.set(key, value)
      }
      searchParams.set("page", 1)
      searchParams.sort();
      setSearchParams(searchParams.toString())
    }

  function handleReset(){
    searchParams.delete("category")
    searchParams.delete("priceRange")
    searchParams.delete("sort")
    searchParams.delete("page")
    setSearchParams(searchParams.toString())
  }

    function isValid(key,value){
      switch(key){
        case "category":
          return categories.some(category=> category.categoryName ===value)
        case "priceRange":
          return value==="1"||value==="2"||value==="3"
        case "sort":
          return value==="priceLowtoHigh"||value==="priceHightoLow" || value==="nameAZ" || value==="nameZA"
        default:
          return true
      }
    }

  return (
    <>
      <div className="container d-flex flex-row justify-content-center align-items-center p-5">
        <form className="container d-flex flex-row align-items-end justify-content-center" method="Get" id="myForm">
            <div className="container d-flex flex-column justify-content-between align-items-start">
              <label>Category : </label>
              <select className="form-select" id="category" value={activeCategory} onChange={(event) =>handleFilterChange("category", event.target.value)}>
                <option value="">All Categories</option> 
                {categories.map((category)=>(
                  <option key={category.categoryId
                  } value={category.categoryName}>{category.categoryName}</option>
                ))
              }
              </select>
            </div>
            <div className="container d-flex flex-column justify-content-between align-items-start">
              <label>Price range : </label>
              <select className="form-select" id="price" value={pricRange} onChange={(event)=>handleFilterChange("priceRange", event.target.value)}>
                <option value="">All</option>
                <option value="1">$0-$100</option>
                <option value="2">$101-$300</option>
                <option value="3">$301+</option>
              </select>
            </div>
            <div className="container d-flex flex-column justify-content-between align-items-start">
            <label>Sort by :  </label>
            <select className="form-select" id="sort" value={sort} onChange={(event)=>handleFilterChange("sort", event.target.value)}>
              <option value="">Feature</option>
              <option value="priceLowtoHigh">Price, Low to high</option>
              <option value="priceHightoLow">Price, High to low</option>
              <option value="nameAZ">Alphabet, A to Z</option>
              <option value="nameZA">Alphabet, Z to A</option>
            </select>
          </div>
            <div className="container">
              <button type="button" className="btn btn-primary" onClick={(event)=>handleReset()}>Reset</button>
            </div>
        </form>
      </div>
    </>
  )
}