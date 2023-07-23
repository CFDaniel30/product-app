import { useEffect, useState } from "react"
import { useLocation, useParams } from 'react-router-dom';
import MyCarousel from "./MyCarousel";
import data from "./data"


export default function ProductDetail() {
  const [items, setItems] = useState([])
  const { id } = useParams();
  const [item, setItem] = useState({
    title:"",
    description:"",
    images:[],
});

useEffect(()=> {
 const item = data.find((i)=> i.prodId === Number(id))
 setItem({
  title: item.title,
  description: item.description,
  images:item.productMedia,
 }); },[id])

 console.log(item)
  return (
    <>
      <div className="row justify-content-evenly align-items-center m-auto p-5" style={{ maxWidth: '1600px' }}>
       <MyCarousel images={item.images}/>
       <div className="col-md-5 d-flex flex-column justity-content-between align-items-center text-center" >
        <h3>{item.title}</h3>
        <h5>{item.description}</h5>
        </div>
       </div>
    </>
  );
}

