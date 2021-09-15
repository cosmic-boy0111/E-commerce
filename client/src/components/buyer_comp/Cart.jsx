import React,{useContext,useState,useEffect} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../../static/css/Cart.css'
import { UserContext } from '../../App'
import CartProduct from './CartProduct'
import logo from '../../static/images/undraw_No_data_re_kwbl.svg'
import {useHistory} from 'react-router-dom'

const Cart = () => {

    const {cartList,savedLater,setOrderSummary} = useContext(UserContext);
    const history = useHistory()
    const [total, setTotal] = useState(()=>{
        let sum = 0;
        cartList.forEach(e => {
            sum+=e.prize*e.qnt;
        });
        return sum;
    })

    const placeOrder = () =>{
        setOrderSummary(cartList);
        localStorage.setItem('orderSummary',JSON.stringify(cartList));
        history.push('/payment')
    }
    
    return (
        <>
            <Navbar />
            <section className='home_body'>
                <Sidebar />

                <div className="second" >

                    <div className='empty_cart' style={{
                        display:cartList.length===0?'flex':'none'
                    }}>
                        <div className="empty_container">
                            <img src={logo} alt="" />
                            <h5>Your cart is empty!</h5>
                            <h6>Add items to it now.</h6>
                            <div className="back">
                                <button onClick={()=>history.push('/')} >Shop Now</button>
                            </div>
                        </div>
                    </div>

                    <div className="cart_main">

                    <div className='cart_body' style={{
                        display:cartList.length===0?'none':'flex'
                    }}>
                        <div className="cart_list">
                            <div className='my_cart'>
                                {`My Cart (${cartList.length})`}
                            </div>
                            <div className="list" id="list" style={{
                                height:cartList.length<2?'14rem':'27rem'
                            }}>
                                {
                                    cartList.map((e)=> {
                                        return <CartProduct obj={e} bool={true} setTotal={setTotal}/>
                                    })
                                }
                                
                            </div>

                            <div className="foot">
                                <div className="button_div">
                                <button onClick={placeOrder} >place order</button>

                                </div>
                            </div>

                        </div>

                        <div className="list_details">
                            <div className='list_head'>
                                <h5>PRICE DETAILS</h5>
                            </div>
                            <div className='order_details'>
                                <div className='detail'>
                                    <span>{`Price (${cartList.length} items)`}</span> <span>{`₹ ${total}`}</span>
                                </div>
                                <div className='detail'>
                                    <span>Discount</span> <span className='free'>-₹ 0</span>
                                </div>
                                <div className='detail'>
                                    <span>Delivery Charges</span> <span className='free'>FREE</span>
                                </div>
                                <hr />
                                <div className='detail more'>
                                    <span>Total Amount</span> <span >{`₹ ${total}`}</span>
                                </div>
                                <hr />
                                <div className='detail free' style={{
                                    color:'green '
                                }}>
                                    <span className="free"> You will save ₹ 0 on this order</span> 
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='cart_body' style={{
                        display:savedLater.length===0?'none':'flex'
                    }}>
                        <div className="cart_list">
                            <div className='my_cart'>
                                {`Saved For Later (${savedLater.length})`}
                            </div>
                            <div className="list" id="list" style={{
                                height:'100%'
                            }}>
                                {
                                    savedLater.map((e)=> {
                                        return <CartProduct obj={e} bool={false} setTotal={setTotal}/>
                                    })
                                }
                                
                            </div>

                        </div>

                    </div>

                    </div>
                </div>

            </section>
        </>
    )
}

export default Cart
