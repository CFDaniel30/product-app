import React from "react"
import {Link} from "react-router-dom"

export default function Products({items}){
  
    return (
      <>
        <div className="container row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-start align-items-center m-auto row-gap-3" style={{maxwidth: '1600px'}}>
          {
            items.map((item) => (
              <div key = {item.prodId} 
                className="col d-flex flex-column align-items-center position-relative">
                <img src= {'https://storage.googleapis.com/luxe_media/wwwroot/' + item.productMedia[0].url} alt={item.name} width={200} height={150} className="img-hover"/>
                <Link className="link stretched-link" to={`./ProductDetail/${item.prodId}`}><h6>{item.title}</h6></Link>
                <h6>{"$"+item.price}</h6>
              </div>
             ))
          }
            </div>
      </>
      )
}