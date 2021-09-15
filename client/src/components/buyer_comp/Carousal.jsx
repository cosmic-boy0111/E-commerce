import React,{useEffect,useState} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../static/css/Carousal.css'
import { NavLink } from 'react-router-dom'

const Carousal = () => {

    const [data, setData] = useState([])

    const getData = async () =>{
        try {
            const res = await fetch('/homeBanner',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })

            const rData = await res.json();
            setData(rData)
            console.log(rData);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner" style={{
                height:'230px',
            }}>
                

                {
                    data.map((e,index)=>{
                        if(index===0){
                            return <div class="carousel-item active" data-bs-interval="2000">
                                <NavLink to={`/${e.path}`}> <img src={e.img} class="d-block w-100 " alt="img1"  style={{height:'230px'}} />  </NavLink>
                                 
                            </div>
                        }else{
                            return <div class="carousel-item">
                                <NavLink to={`/${e.path}`}><img src={e.img} class="d-block w-100 " alt="img1"  style={{height:'230px'}} />  </NavLink>
                            </div>
                        }
                    })
                }

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true" ></span>
                <span class="visually-hidden" data-bs-slide="prev" >Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
            </div>



            


        </>
    )
}

export default Carousal
