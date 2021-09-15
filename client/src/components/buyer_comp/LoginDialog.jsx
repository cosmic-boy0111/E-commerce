import React,{useContext,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserContext } from '../../App'
import logo from '../../static/images/undraw_unlock_24mb (1).svg'
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EmailIcon from "@material-ui/icons/Email";
import { NavLink } from 'react-router-dom'
import '../../static/css/Register.css'
import '../../static/css/Login.css'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import Slide from '@material-ui/core/Slide';
import LinearIndeterminate from './Progress2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog() {
  
    const {open,setOpen,setOpen2} = useContext(UserContext);
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
  
  
    const loginUser = async (e) =>{
      e.preventDefault();
      setLoading(true)
      try {
        
      
      const res = await fetch('/signin',{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              email,password
          })
  
      })
  
      const data = res.json();
  
      if(res.status === 400 || !data){
          window.alert('invalid credentials');
          console.log('invalid credentials');
          setEmail('')
          setPassword('')
          setLoading(false)
      }else{
          dispatch({type:'USER',payload:true})
          setLoading(false)
          window.alert('user sign in successfully');
          console.log('user sign in successfully');
          setEmail('')
          setPassword('')
          // history.push('/')
          // history.goBack();
          setOpen(false)
      }
    } catch (error) {
        console.log(error);
    }
  
    }
  
  const GoToRegister = () =>{
    setOpen(false);
    // history.push('/signup')
    setOpen2(true)
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <IconButton aria-label="delete" className='cancel' onClick={()=>setOpen(false)}>
                <ClearRoundedIcon fontSize='large'/>
              </IconButton>
            <div className="dialog_container">
              <div style={{
                visibility:loading?'visible':'hidden',
                position:'absolute',
                width:'100%'
              }}>
                <LinearIndeterminate />
              </div>
              <div className="first_dialog_container">
                <div className='div1'>
                  <h2>Login</h2>
                  <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <div className="div2">
                  <img src={logo} alt="" />
                </div>
              </div>
              <div className="second_dialog_container">
              <div className="signup_form_container" style={{
                width:'100%',
              }}>
                <form className="form_container" method="POST" onSubmit={loginUser}>
                  <div className="form_field" style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="email" class="form-label">
                      
                      <EmailIcon />
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      autoComplete="off"
                      name='email'
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form_field " style={{
                    marginBottom:'2rem'
                  }}>
                    <label for="password" class="form-label">
                      
                      <LockOpenIcon />
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      autoComplete="off"
                      name='password'
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                    />
                  </div>
                  <div style={{fontSize:'13px',fontWeight:'bold',marginBottom:'1rem'}}>By continuing, you agree to Flipkart's <span className='blue'> Terms of Use</span> and <span className='blue'> Privacy Policy</span>.</div>
                  <button className='login_btn' type="submit">
                      Login
                  </button>
                </form>
                  
                <div onClick={GoToRegister} className="already-register blue">
                  New to Flipkart? Create an account
                </div>
              </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
