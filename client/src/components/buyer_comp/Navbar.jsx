import React,{useContext,useEffect,useState} from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import '../../static/css/Navbar.css'
// import logo from '../../static/images/mainlogo-removebg-preview.png'
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import AlertDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import Search from './Search';

const Navbar = () => {

    const logo = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png'
    
    const {state,dispatch,cartList,setCartList,setLikeList,setSavedLater,setOpen,setOpen2} = useContext(UserContext)
    const history = useHistory();

    const logoutMe = async () => {
        try {
            const res = await fetch('/logout',{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            // dispatch({type:'USER',payload:false})
            const data = await res.json();
            console.log(data);
            history.push('/')
            // setOpen(true)
            setCartList([])
            setSavedLater([])
            setLikeList([])
            localStorage.setItem('cartList',JSON.stringify([]))
            localStorage.setItem('savedLater',JSON.stringify([]))
            localStorage.setItem('likeList',JSON.stringify([]))
            
        } catch (error) {
            console.log(error);
        }
    }

    const FindForSet = async () =>{
        try {
            const Ures = await fetch("/getdata", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
      
            if(Ures.status === 200) {
                dispatch({type:'USER',payload:true})
            }
          } catch (error) {
              console.log(error);
          }
        
    }

    useEffect(() => {
        FindForSet();
    }, [])

    const CheckForCart = () =>{
        if(state){
            history.push('/cart');
        }else{
            alert('kindly login');
            // history.push('/login')
            setOpen(true)
        }
    }


    return (
        <>
            <AlertDialog />
            <RegisterDialog />
            <div className='ext'>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="logo_search">

                    
                    <NavLink className="navbar-brand " to="/">
                        <img src={logo} alt="" className="nav_logo"/>
                    </NavLink>
                    <Search />
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-2 fw-bold" style={{
                            display:state?'inline':'none'
                        }}>
                        <NavLink className="nav-link" to='/about'>Profile</NavLink>
                        </li>
                        
                        <li className="nav-item mx-2 fw-bold" style={{
                            display:state?'inline':'none'
                        }}>
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        
                        <li className="nav-item mx-2 fw-bold"  style={{
                            display: state ? 'none' : 'inline',
                            cursor:'pointer'
                        }}
                        onClick={()=>setOpen(true)}
                        >
                        <div className="nav-link" >Login</div>
                        </li>
                        
                        
                        <li className="nav-item mx-2 fw-bold" style={{
                            display: state ? 'none' : 'inline',
                            cursor:'pointer'
                        }}
                        onClick={()=>setOpen2(true)}
                        >
                        <div className="nav-link" >Registration</div>
                        </li>
                        <li className="nav-item mx-2 fw-bold" style={{
                            display: state ? 'inline' : 'none'
                        }} onClick={()=> dispatch({type:'USER',payload:false})}>
                            <div color="secondary" onClick={logoutMe} className="nav-link" style={{
                                cursor:'pointer'
                            }} > Logout </div>
                        </li>
                        <li className="nav-item mx-2 fw-bold" onClick={CheckForCart}>
                            <div color="secondary" className="nav-link" style={{
                                cursor:'pointer',
                                display:'flex',
                                alignItems:'center'
                            }} > <span className="cart_logo" > <span className='cart_size' style={{
                                display:cartList.length===0?'none':'inline'
                            }}>{cartList.length}</span> <ShoppingCartRoundedIcon fontSize='small'/></span> Cart </div>
                        </li>

                        {/* <li className="nav-item mx-2 fw-bold">
                            <NavLink className="nav-link" to="/cart"> <ShoppingCartRoundedIcon fontSize='small'/> Cart</NavLink>
                        </li> */}
                        
                    </ul>
                    </div>
                </div>
            </nav>
            </div>
        </>
    )
}

export default Navbar
