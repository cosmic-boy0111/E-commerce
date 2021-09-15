import React,{useContext,useState} from 'react'
import '../../static/css/Card3.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    UserContext
} from '../../App'
import {
    useHistory
} from 'react-router-dom'
import { IconButton } from '@material-ui/core';


const Card3 = ({obj}) => {

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


            <div className='card2' style={{
                cursor:'pointer'
            }}>
                <div className="card2_container">
                    <div className='card2_img_container'>
                        <div className="card2_img_container2">
                            <div>
                                <div className="card2_img_container3">
                                    <img src={obj.img} alt="" onClick={passToCart}/>
                                    <div className="icon">
                                        <IconButton aria-label="delete" onClick={like} style={{
                                        color:col?'rgb(194, 194, 194)':'#f48fb1'
                                        }}>
                                            <FavoriteIcon fontSize='small'/>
                                            
                                            </IconButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card2_details' onClick={passToCart}> 
                        <span className='size-13' style={{textAlign:'center'}}>{obj.name}</span>
                        <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" />
                        <h6>₹ {obj.prize}</h6>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Card3
