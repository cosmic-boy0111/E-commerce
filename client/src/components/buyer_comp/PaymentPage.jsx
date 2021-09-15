import React,{createContext,useContext,useState,useEffect} from 'react'
import Navbar from './Navbar'
import '../../static/css/Cart.css'
import '../../static/css/PaymentPage.css'
import { UserContext } from '../../App'
import {useHistory} from 'react-router-dom'
import Temp from './temp'
import Delivery from './Payment/Delivery'
import Login from './Payment/Login'
import Order from './Payment/Order'
import PayOption from './Payment/PayOptions'
import LinearIndeterminate from './Progress2'

export const UserStates = createContext();






const PaymentPage = () => {


    const {cartList,savedLater,orderSummary} = useContext(UserContext);
    const history = useHistory()
    const [total, setTotal] = useState(()=>{
        let sum = 0;
        cartList.forEach(e => {
            sum+=e.prize*e.qnt;
        });
        return sum;
    })

    const [payLogin, setPayLogin] = useState(false)
    const [payDeliver, setPayDeliver] = useState(true)
    const [payOrder, setPayOrder] = useState(false)
    const [payOption, setPayOption] = useState(false)
    const [email, setEmail] = useState('')
    const [pro, setPro] = useState(false)


    return (
        <>


            <Navbar />
            <section className='home_body'>

                <div className="second" style={{
                    marginTop:'3rem',
                    marginLeft:'0',
                }}>

                    <div className="cart_main" >
                    <div style={{
                        visibility:pro?'visible':'hidden',
                        margin:'.5rem 1rem'
                    }}>
                        <LinearIndeterminate />
                    </div>

                    <div className='cart_body'>
                        <div className="cart_list" style={{
                            boxShadow:'none',
                            backgroundColor: 'transparent',
                            // margin:'0 4rem'
                        }}>
                            <div className="list" id="list">
                                <UserStates.Provider value={{
                                    payLogin,
                                    payDeliver,
                                    setPayLogin,
                                    setPayDeliver,
                                    payOrder,
                                    setPayOrder,
                                    payOption,
                                    setPayOption,
                                    setPro,
                                    setTotal,
                                    total,
                                    email, 
                                    setEmail,

                                }}>
                                    
                                    <Login />
                                    <Delivery />
                                    <Order />
                                    <PayOption />
                                </UserStates.Provider>
                            </div>

                        </div>

                        <div className="list_details">
                            <div className='list_head'>
                                <h5>PRICE DETAILS</h5>
                            </div>
                            <div className='order_details'>
                                <div className='detail'>
                                    <span>{`Price (${orderSummary.length} items)`}</span> <span>{`₹ ${total}`}</span>
                                </div>
                               
                                <div className='detail'>
                                    <span>Delivery Charges</span> <span className='free'>FREE</span>
                                </div>
                                <hr />
                                <div className='detail more'>
                                    <span>Total Amount</span> <span >{`₹ ${total}`}</span>
                                </div>
                                <hr />
                                <div className='detail free'>
                                    <span className='free'>Your Total Saving On This Order ₹ 0</span> 
                                </div>
                            </div>
                        </div>
                    </div>

                    </div>
                </div>

            </section>
        </>
    )
}

export default PaymentPage
