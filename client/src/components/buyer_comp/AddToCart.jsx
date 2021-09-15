import React,{useContext,useState,useEffect} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../../static/css/AddToCart.css'
import { UserContext } from '../../App'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Slider2 from './Slider2'
import LinearIndeterminate from './Progress2'

const AddToCart = () => {
    // title,path,name,img,prize,qnt
    const history = useHistory();
    const [loading, setLoading] = useState(false)

    const { myobj,state,cartList,setOrderSummary, setCartList, setLikeList,likeList,setMyObj,setOpen } = useContext(UserContext)

    const [col, setCol] = useState(()=>{
        var bool = true;
        likeList.forEach(e=>{
            if(e._id===myobj._id){
                bool = false;
            }
        })
        return bool;
    })

    const like = () =>{
        if(state){
            console.log('like me');
            setLikeList((pre)=>{
                var bool = true;
                var newArr =  []
                pre.forEach(e => {
                    if(e._id===myobj._id || e.name===myobj.name){
                        bool = false;
                        newArr = pre.filter(e=> e._id!==myobj._id)
                    }
                });

                setCol(!bool);

                localStorage.setItem('likeList',bool?JSON.stringify([myobj,...pre]):JSON.stringify(newArr));
                return bool?[myobj,...pre]:newArr;
            })
        }else{
            history.push('/login')
            alert('kindly login')
        }
    }



    const [data, setData] = useState([])



    const GetData = async () =>{
        setLoading(true)
        try {
            const res = await fetch(`/${myobj.path}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
            });

        const Data = await res.json();
        
        var newData = Data.filter(e=>{
            return e._id!==myobj._id;
        })
        
        setData(newData);
        console.log(Data);
        setLoading(false)
        // dispatch({type:'USER',payload:true})
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
    },[myobj])


    const add = () =>{
        if(state){
            let add = true;
            cartList.forEach(element => {
                if(element._id===myobj._id){
                    add = false;
                }
            });
            if(add){
                setCartList((pre)=>{
                    let list = [myobj,...pre];
                    localStorage.setItem('cartList',JSON.stringify(list))
                    return list
                })


            }
            history.push('/cart')
        } else{
            // history.push('/login')
            setOpen(true)
        }
    }


    const placeOrder = () =>{
        if(state){

            setOrderSummary([myobj]);
            localStorage.setItem('orderSummary',JSON.stringify([myobj]));
            history.push('/payment')
        }else{
            setOpen(true)
        }
    }



    return (
        <>
            <Navbar />
            <section className='home_body'>
                <Sidebar />

                <div className="second">
                    <div className='more_about'>
                        <div className='big_img_container'>
                            <div className="big_img_container2">
                                <div className='extra_div'>
                                    <div className="big_img_container3">
                                        <img src={myobj.img} alt="" />
                                        <div className="icon2"  >
                                            <IconButton aria-label="delete" onClick={like} style={{
                                        color:col?'rgb(194, 194, 194)':'#f48fb1'
                                        }}>
                                            <FavoriteIcon fontSize='small'/>
                                            
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="big_img_btn">
                                <button className='big__btn' style={{
                                    backgroundColor:'#ff9f00'
                                }}
                                onClick={add}
                                > <ShoppingCartIcon fontSize='small' /> Go To Cart</button> <button className='big__btn' style={{
                                    backgroundColor:'#fb641b'
                                }}
                                onClick={placeOrder}
                                > <FlashOnIcon fontSize='small'/> Buy Now</button>
                            </div>
                        </div>

                        <div className='big_img_info'>
                            <h5 className='big_img_name'>{myobj.name}</h5>                                
                            <p className='rating'>10,193 Ratings & 857 Reviews <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" /></p>
                            <h4>₹  {myobj.prize}</h4>
                            <p className='bold'>Available Offers</p>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><LocalOfferIcon fontSize='small'/></span> <span className='bold' >Bank Offer</span> 5% Unlimited Cashback on Flipkart Axis Bank Credit Card <span className='tc'>T&C</span></span>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><LocalOfferIcon fontSize='small'/></span> <span className='bold' >Bank Offer</span> 20% off on 1st txn with Amex Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and Mobikwik <span className='tc'>T&C</span></span>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><LocalOfferIcon fontSize='small'/></span> <span className='bold' >Special Offer</span> Extra ₹12901 off(price inclusive of discount) <span className='tc'>T&C</span></span>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><LocalOfferIcon fontSize='small'/></span> <span className='bold' >Partner Offer</span> GST Invoice Available! Save up to 28% for business purchases <span className='tc'>T&C</span></span>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><EventAvailableIcon fontSize='small'/></span> <span className='bold' >EMI</span> starting from ₹2,461/month <span className='tc'>T&C</span></span>
                            <span className='offer'> <span className='free' style={{marginRight:'.7rem'}}><LocalOfferIcon fontSize='small'/></span> <span className='bold' >Bank Offer</span> 10% off on ICICI Bank Credit Card EMI, up to ₹1250. On orders of ₹5000 and above <span className='tc'>T&C</span></span>
                        </div>
                    </div>

                    <div style={{
                    visibility:loading?'visible':'hidden'
                    }}>
                    <LinearIndeterminate />
                    </div>
                    <div className='home_container' style={{
                    display:loading?'none':'flex',

                    }}>
                            <div className="slider_container">
                                <div className='slider_head'>
                                    <div className='header_text'>
                                        <h5>Similar Products</h5>
                                    </div>
                                </div>
                                <Slider2 data={data}/>
                            </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default AddToCart
