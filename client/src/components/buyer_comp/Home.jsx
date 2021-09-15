import React,{useEffect,useState,useContext} from 'react'
import Navbar from './Navbar'
import '../../static/css/Navbar.css'
import Sidebar from './Sidebar'
import '../../static/css/Home.css'
import Carousal from './Carousal'
import Slider from './Slider'
import Card from './Card'
import Card2 from './Card2'
import CircularIndeterminate from './Progress'
import {UserContext} from '../../App'
import SliderContainer from './SliderContainer'
import { useHistory } from 'react-router-dom'


const Home = () => {

    const history = useHistory()

    const text = 'hello';

    const [deal, setDeal] = useState([])
    const [Sdeal, setSdeal] = useState('')

    const [loading,setLoading] = useState('')

    const GetData = async () =>{
        setLoading(true)
        try {
            const res = await fetch("/dealOfTheDay", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);

            setDeal(data);
            setSdeal(JSON.stringify(data));

        setLoading(false);
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetData();
    },[])

    return (
        <>
            <Navbar />
            
            <section className='home_body'>
                <Sidebar />

                <div className="middle" style={{
                    display:loading?'flex':'none',

                }}>
                    <CircularIndeterminate />
                </div>

                <div className="second" style={{
                    display:loading?'none':'block',
                }}>

                    <Carousal />

                    <div className='home_container'>
                        <div className='before_slider_container'>
                            <div className="slider_container">
                                <div className='slider_head'>
                                    <div className='header_text'>
                                        <h5>Deal Of The Day</h5>
                                    </div>
                                    <button onClick={()=>history.push(`/viewall/${'dealOfTheDay'}/${'Deal Of The Day'}`)} >VIEW ALL</button>
                                </div>
                                <Slider data={deal}/>
                            </div>
                        </div>
                        <div className='add_container'>
                            <img src={'https://rukminim1.flixcart.com/flap/464/708/image/a33323ee3a5b0bc5.jpg?q=70'} alt="" />
                        </div>
                    </div>

                    <SliderContainer data={deal} text={'Suggestions For You'}/>
                    <SliderContainer data={deal} text={'Top Products'}/>

                </div>

            </section>
        </>
    )
}

export default Home
