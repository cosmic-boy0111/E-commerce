import React,{useEffect,useState,useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar';
import CircularIndeterminate from './Progress';
import Sidebar from './Sidebar';
import '../../static/css/Profile.css'
import Button from '@material-ui/core/Button';
import Taps from './Taps'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import logo from '../../static/images/undraw_Photos_re_pvh3.svg'
import {UserContext} from '../../App'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

const Profile = () => {

    const classes = useStyles();

    const {state,dispatch,setOpen} = useContext(UserContext)

    const history = useHistory();
    const [loading, setLoading] = useState('')
    const [userData, setUserData] = useState({})
    const [show, setShow] = useState(true)
    const [pic, setPic] = useState('')


    const getData = async () => {
        setLoading(true)
        try {

            const res = await fetch('/about', {
                method:'GET',
                headers:{
                    Accept:'application/json',
                    "Content-Type":"application/json"
                },
                credentials:'include'
            });

            const data = await res.json();
            setUserData(data);
            setPic(data.img);
            console.log(data);
            setLoading(false);
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }else{
                dispatch({type:'USER',payload:true})
            }
            
        } catch (error) {
            console.log(error);
            setOpen(true)
        }
    }



    useEffect(() => {

        getData();
        
    }, [])

    const add = async (img) => {
        try {
            // console.log(img);
            const res = await fetch('/addimg',{
                method:'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    img
                })
            })
            setPic(img);
            const data = await res.json()
            if(!data){
                alert('not send');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState === 2){
                setPic(reader.result)
                add(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
        // add();
    }


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
                    <div className="about_container">
                <form method="GET" className="about_data" style={{
                    backgroundColor:'white'
                }}>
                {/* <div className="about_data"> */}

                
                <div className="about_data1">
                        <form className='for_img'>

                        <img src={pic===''?logo:pic} alt="profile" className='profile_img'/>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageHandler}/>
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera fontSize='small'/>
                            </IconButton>
                        </label>
                        </form>
                    <div className='some_personal_info'>
                        <h5>{userData.name}</h5>
                        {/* <h6>{userData.work}</h6> */}
                        <p>Ranking : <span>1/10</span></p>
                        <div className='tap_div'>
                            <Taps setShow={setShow}/>
                        </div>
                    </div>
                </div>
                

                <div className='about_data2'>
                    <div className="info2" style={{display:show?'flex':'none'}}>
                        <div className='under_info'>
                            <label htmlFor="">User Id</label>
                            <p>{userData._id}</p>
                        </div>
                        <div className='under_info'>
                            <label htmlFor="">Name</label>
                            <p>{userData.name}</p>
                        </div>
                        <div className='under_info'>
                            <label htmlFor="">Email</label>
                            <p>{userData.email}</p>
                        </div>
                        <div className='under_info'>
                            <label htmlFor="">Phone</label>
                            <p>{userData.phone}</p>
                        </div>
                    </div>
                    <div className="info2" style={{display:show?'none':'flex'}}>
                        <div className='under_info'>
                            <label htmlFor="">Total Orders</label>
                            <p>0</p>
                        </div>
                        <div className='under_info'>
                            <label htmlFor="">Received Orders</label>
                            <p>0</p>
                        </div>
                        <div className='under_info'>
                            <label htmlFor="">Pending Orders</label>
                            <p>0</p>
                        </div>
                        
                        <div className='under_info'>
                            <label htmlFor="">Rejected Orders</label>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                </form>
            </div>

                </div>
            </section>
        </>
    )
}

export default Profile
