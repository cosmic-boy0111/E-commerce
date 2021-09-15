import React,{useState,useContext,useEffect} from 'react'
import DoneIcon from '@material-ui/icons/Done';
import {UserStates} from '../PaymentPage'
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import NotificationsIcon from '@material-ui/icons/Notifications';
import StarRateIcon from '@material-ui/icons/StarRate';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../../App';
import Button from '@material-ui/core/Button';

const Login = () => {

    const {payLogin,setPayLogin,setPayDeliver,setPayOrder,setPayOption} = useContext(UserStates)
    const [col, setCol] = useState(false)
    const history = useHistory()
    const [data, setData] = useState([])

    const { dispatch } = useContext(UserContext)

    const change = () =>{
        setPayLogin(true) 
        setPayDeliver(false)
        setPayOrder(false)
        setPayOption(false)
        setCol(true)
    }

    const next = () =>{
        setPayLogin(false)
        setPayDeliver(true)
        setPayOrder(false)
        setPayOption(false)
        setCol(false)
    }

    const logoutMe = async () => {
        try {
            const res = await fetch('/logout',{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            dispatch({type:'USER',payload:false})
            const Data = await res.json();
            setData(Data);
            history.push('/buyer')
            
        } catch (error) {
            console.log(error);
        }
    }


    
    const getUserData = async () => {
        try {
          const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const Data = await res.json();
          setData(Data)
          
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    



    useEffect(() => {
        
        getUserData();
        
    }, [])



    return (
        <>
            <div className='pay_main'>
                <div className="pay_head" style={{
                            backgroundColor :col &&payLogin?'#2874f0':'white'
                        }}>
                    <div className='first_div'>
                        <span style={{
                            color:col&&payLogin?'white':'black'
                        }} >1</span>
                        <div className='second_div'>
                            <span style={{
                                color:col&&payLogin?'white':'black',
                            }}
                            className='header'
                             >login <span className='free' style={{
                                display:payLogin?'none':'inline'
                            }}> <DoneIcon fontSize='small'/> </span></span>
                            <span style={{
                                display:payLogin?'none':'inline'
                            }}
                            className='head_foot'
                            >+91 {data.phone}</span>
                        </div>
                    </div>
                    <div className="pay_btn" style={{
                        display:payLogin?'none':'flex'
                    }}>
                        <Button variant="outlined" color="primary" onClick={change} >change</Button>
                    </div>
                </div>
                <div className='pay_body' style={{
                    display:payLogin?'block':'none'
                }}>
                    {/* hello world */}
                    {/* <button onClick={next} >next</button> */}

                    <div className='login_container' style={{
                        backgroundColor:'white'
                    }}>
                        <div className='login_first'>
                            <span><span className='phone_name'>Phone</span> +91 {data.phone}</span>
                            <span className='pay_out' onClick={logoutMe}>Logout & Sign in to another account</span>
                            <button  className='checkout' onClick={next}>continue checkout</button>
                        </div>
                        <div className="login_second">
                            <div className='adv'>
                                <p className='phone_name'>Advantages of our secure login</p>
                                <p> <LocalShippingIcon fontSize='small' className='icon_col'/> Easy Track Orders, Hassle Free Returns</p>
                                <p> <NotificationsIcon fontSize='small' className='icon_col'/>Get Relevant Alerts and Recommendation</p>
                                <p> <StarRateIcon fontSize='small' className='icon_col'/>Wishlist, Reviews, Ratings and more </p>
                            </div>
                        </div>
                    </div>
                    <div className='info'>
                        <span>Please note that upon clicking "Logout" you will lose all items in cart and will be redirected to home page</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
