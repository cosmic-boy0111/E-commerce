import React,{useState,useContext} from 'react'
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Button from '@material-ui/core/Button';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import { UserContext } from '../../App'
import { jssPreset } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import { UserStates } from './PaymentPage'


const CartProduct2 = ({obj}) => {

    const history = useHistory();
    const { orderSummary , setOrderSummary } = useContext(UserContext)
    const { setTotal } = useContext(UserStates)

    var date = new Date();
    date.setDate(date.getDate() + 4);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dec = () => {
        if(obj.qnt>1){
            // setQnt(obj.qnt-1);
            setOrderSummary((pre)=>{
                let newList = [];
                pre.forEach(element => {
                    if(element._id===obj._id){
                        element.qnt = obj.qnt-1;
                        
                        newList.push(element);
                    }else{
                        newList.push(element);
                    }
                });
                localStorage.setItem('orderSummary',JSON.stringify(newList));
                let sum = 0;
                newList.forEach(e => {
                    sum+=e.prize*e.qnt;
                });
                setTotal(sum);
                
                return newList
            })
        }
    }
    const inc = () => {
            // setQnt(obj.qnt+1);
            setOrderSummary((pre)=>{
                let newList = [];
                pre.forEach(element => {
                    if(element._id===obj._id){
                        element.qnt = obj.qnt+1;
                        newList.push(element);
                    }else{
                        newList.push(element);
                    }
                });
                localStorage.setItem('orderSummary',JSON.stringify(newList));
                let sum = 0;
                newList.forEach(e => {
                    sum+=e.prize*e.qnt;
                });
                setTotal(sum);
                
                return newList
            })
        
    }

    const remove = () =>{
        setOrderSummary((pre)=>{
            let newList = pre.filter(e => e._id!==obj._id );
            // let newList = []
            localStorage.setItem('orderSummary',JSON.stringify(newList));
            let sum = 0;
                newList.forEach(e => {
                    sum+=e.prize*e.qnt;
                });
                setTotal(sum);
            
            return newList;
        })
        if(orderSummary.length===0){
            console.log('i am empty');
        }
    }
 

    return (
        <>
            <div className="product_body">
                <div className='about_product'>

                    <div className='product_img'>
                        <div className='img_container'>
                            <img src={obj.img} alt="" />

                        </div>
                        <div className='qnt'>
                             <span className='count1'>

                             <IconButton  size="small" onClick={dec}>
                                <RemoveRoundedIcon fontSize="small" />
                            </IconButton>
                             </span> 
                            <span className='count' >{obj.qnt}</span>
                            <span className='count1'>

                            <IconButton size='small' onClick={inc}>
                                <AddRoundedIcon fontSize="small" />
                            </IconButton>
                            </span>

                        </div>
                    </div>             
                    <div className="product_info_main">
                        <div className="product_info">
                            <h6>{obj.name}</h6>
                            <p className='rating'>Seller: Currently Unknown <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" /></p>

                            <h5>₹ {obj.prize*obj.qnt}</h5>
                        </div>
                        <div className="product_btn">
                            <Button color="primary" onClick={remove}>remove</Button>
                        </div>
                    </div>
                </div>
                <div className="delivery_info">
                    <p> <span className="time"> Delivery by {days[date.getDay()]} {month[date.getMonth()]} {date.getDate()} |</span> <span className='time free' >Free</span> </p>
                </div>
            </div>
        </>
    )
}

export default CartProduct2
