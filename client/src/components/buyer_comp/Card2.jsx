import React,{useContext,useState} from 'react'
import '../../static/css/Card2.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { 
    UserContext
} from '../../App'
import {
    useHistory
} from 'react-router-dom'
import { IconButton } from '@material-ui/core';

const Card2 = ({obj}) => {

    const history = useHistory();


    const { state,setLikeList,likeList,setMyObj,setOpen } = useContext(UserContext);

    const [col, setCol] = useState(()=>{
        var bool = true;
        likeList.forEach(e=>{
            if(e._id===obj._id){
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
                    if(e._id===obj._id || e.name===obj.name){
                        bool = false;
                        newArr = pre.filter(e=> e._id!==obj._id)
                    }
                });
                setCol(!bool);

                localStorage.setItem('likeList',bool?JSON.stringify([obj,...pre]):JSON.stringify(newArr));
                return bool?[obj,...pre]:newArr;
            })
        }else{
            // history.push('/login')
            setOpen(true)
            alert('kindly login')
        }
    }

    const passToCart = () => {
        setMyObj(obj);
        localStorage.setItem('obj',JSON.stringify(obj))
        history.push('/addtocart')
    }

    
    return (
        <>
            <div className="card2_main">
                <div className="card2_body" style={{
                    cursor:'pointer',
                }}
                
                >
                    <div className="card2_first">
                        <div className='card2_img'>
                            <div className="img_body" onClick={passToCart}>
                                <img src={obj.img} alt="" />
                            </div>
                                <div className="icon" style={{
                                    cursor:'pointer',
                                }}
                                
                                >
                                    <IconButton aria-label="delete" onClick={like} style={{
                                        color:col?'rgb(194, 194, 194)':'#f48fb1'
                                        }}>
                                            <FavoriteIcon fontSize='small'/>
                                            
                                            </IconButton>
                                </div>
                        </div>
                        <div className="card2_img_info" onClick={passToCart}>
                            <h6>{obj.name}</h6>
                            <span className='rating'>13,270 Ratings & 725 Reviews</span>
                            <div className="more_info_img">
                                <span><span className='dot'>•</span> 2 GB RAM | 32 GB ROM | Expandable Upto 256 GB</span>
                                <span><span className='dot'>•</span> 16.51 cm (6.5 inch) HD+ Display</span>
                                <span><span className='dot'>•</span> 8MP Rear Camera | 5MP Front Camera</span>
                                <span><span className='dot'>•</span> 5000 mAh Battery</span>
                                <span><span className='dot'>•</span> Octa-core Processor</span>
                                <span><span className='dot'>•</span> 1 Year Warranty for Mobile and 6 Months for Accessories</span>
                            </div>
                        </div>
                    </div>  
                    <div className='card2_second' onClick={passToCart}>
                        <h3>₹ {obj.prize} <span><img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" /></span></h3>
                        <span>Up ₹ 6750 off on Exchange</span>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Card2
