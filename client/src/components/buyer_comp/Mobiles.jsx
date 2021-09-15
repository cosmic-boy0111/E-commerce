import React,{useEffect,useState,useContext} from 'react'
import Navbar from './Navbar'
import '../../static/css/Navbar.css'
import Sidebar from './Sidebar'
import '../../static/css/Home.css'
import Card2 from './Card2'
import '../../static/css/Mobiles.css'
import CircularIndeterminate from './Progress'

const Mobiles = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')



    const GetData = async () =>{
        setLoading(true)
        try {
            const res = await fetch("/mobiles", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            });

        const Data = await res.json();
        

        
        setData(Data);
        console.log(Data);
        
        // dispatch({type:'USER',payload:true})
            setLoading(false)
          if (res.status !== 200 ) {
            const error = new Error(res.error);
            throw error;
          }
          

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetData();
    }, [])


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
                    display:loading?'none':'block'
                }}>
                    <div className="mobile_header">
                        <h5>Mobiles</h5>
                    </div>
                    {
                        data.map(e=>{
                            return <Card2 obj={e}/>
                        })
                    }
                </div>

            </section>
        </>
    )
}

export default Mobiles
