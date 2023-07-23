import React, { useEffect, useState } from 'react'
import ProductDetail from './ProductDetail';
import "./MyCarousel.css"

export default function MyCarousel({images}) {
  const [activeIndex, setactiveIndex] = useState(0)

  const handleSlide = (direction)=>{
    if(direction ==="prev" && activeIndex > 0){
      setactiveIndex(activeIndex -1)
    }else if(direction ==="next" && activeIndex<images.length-1){
      setactiveIndex(activeIndex +1)
    }
  }
  
  return (
    <>
        <div className="col-md-5">
          <div className="contaner-fluid">
            <div className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {images.map((image, index) => (
                  <div key={image.id} className={`carousel-item ${index === activeIndex?"active":""}`}>
                    <img src={'https://storage.googleapis.com/luxe_media/wwwroot/' + image.url} className="img-fluid img-thumbnail w-100" style={{ height: "480px", objectFit:'contain'}} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" onClick={()=>handleSlide("prev")}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" onClick={()=>handleSlide("next")}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
              <div className="carousel-indicators">
                {images.map((image, index) => (
                    <img key={image.id} src={'https://storage.googleapis.com/luxe_media/wwwroot/' + image.url} className={`img-fluid img-thumbnail ${index === activeIndex?"active":""}`} style={{width:'50px',height:'50px',objectfit:'contain'}} data-bs-target='#carouselExampleControls' data-bs-slide-to='0' aria-current='true' onClick={()=>setactiveIndex(index)}/>
                ))}
            </div>
            </div>
          </div>
        </div>
    </>
  )
}
