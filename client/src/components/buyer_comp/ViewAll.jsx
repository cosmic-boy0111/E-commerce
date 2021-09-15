import React,{useEffect,useState,useContext} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Card3 from './Card3'
import CircularIndeterminate from './Progress'
import { useParams } from 'react-router-dom'

const ViewAll = () => {

    const { path,text } = useParams();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState('')



    const GetData = async () =>{
        setLoading(true)
        try {
            const res = await fetch(`/${path}`, {
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
                        <h5>{text}</h5>
                    </div>
                    <div className="before_page">

                    {
                        data.map(e => {
                            return <Card3 obj={e}/>
                        })
                    }
                    
                    </div>
                </div>

            </section>
        </>
    )
}

export default ViewAll
