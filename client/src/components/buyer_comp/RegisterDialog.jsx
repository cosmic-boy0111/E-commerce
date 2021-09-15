import React,{useContext,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { UserContext } from '../../App'
import logo from '../../static/images/undraw_press_play_bx2d.svg'
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import EmailIcon from "@material-ui/icons/Email";
import { NavLink } from 'react-router-dom'
import '../../static/css/Register.css'
import '../../static/css/Login.css'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import Slide from '@material-ui/core/Slide';
import LinearIndeterminate from './Progress2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterDialog() {
  
    const {open2,setOpen2,setOpen} = useContext(UserContext);

    const history = useHistory();

    const [loading, setLoading] = useState(false)
  
    const [user, setUser] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    });
  
    let name, value;
  
    const handleInputs = (e) => {
      name = e.target.name;
      value = e.target.value;
      if(name==='phone' && /^\d+$/.test(value)!==true && value!==''){
        return;
      }
      setUser({ ...user, [name]: value });
    };
  
    const PostData = async (e) =>{
      e.preventDefault();
      if(user.password !== user.cpassword){
        alert('passwords not match')
        setUser({
          ...user,
          password:'',
          cpassword:''
        })
        return;
      }
      setLoading(true);
      const {name,email,phone,password,cpassword} = user;
      const res = await fetch('/register',{
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name,email,phone,password,cpassword
        })
      })
  
      const data = await res.json();
      if(res.status === 422 || !data){
        window.alert('INVALID REGISTRATION');
        console.log('registration failed');
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
        setLoading(false)
      }else{
        setLoading(false)
        window.alert(' REGISTRATION complete');
        console.log('registration complete');
        setUser({
          name: "",
          email: "",
          phone: "",
          password: "",
          cpassword: "",
        });
        // history.push('/login');
        setOpen2(false)
        setOpen(true)
      }
    }
  
  const gotoLog = () =>{
    setOpen2(false);
    setOpen(true)
  }

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <IconButton aria-label="delete" className='cancel' onClick={()=>setOpen2(false)}>
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
                  <h2>Looks like you're new here!</h2>
                  <p>Sign up with your Email to get started</p>
                </div>
                <div className="div2">
                  <img src={logo} alt="" />
                </div>
              </div>
              <div className="second_dialog_container">
              <div className="signup_form_container" style={{
                width:'100%',
              }}>
                <form method="POST" className="form_container" autocomplete="off">
                  <div className="form_field">
                    <label for="name" class="form-label">
                      <PersonIcon />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name='name'
                      onChange={handleInputs}
                      value={user.name}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form_field">
                    <label for="email" class="form-label">
                      <EmailIcon />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name='email'
                      onChange={handleInputs}
                      value={user.email}
                      placeholder="Your Email"
                      required
                  
                    />
                  </div>
                  <div className="form_field ">
                    <label for="phone" class="form-label">
                      <PhoneIphoneIcon />
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name='phone'
                      onChange={handleInputs}
                      value={user.phone}
                      maxlength="10" minLength='10'
                      placeholder="Mobile Number"
                      required
                    />
                  </div>
                  
                  <div className="form_field ">
                    <label for="password" class="form-label">
                      <LockOpenIcon />
                    </label>
                    <input
                      type="password"
                      id="password"
                      name='password'
                      onChange={handleInputs}
                      value={user.password}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <div className="form_field ">
                    <label for="cpassword" class="form-label">
                      <LockIcon />
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      name='cpassword'
                      onChange={handleInputs}
                      value={user.cpassword}
                      placeholder="Confirm your Password"
                      required
                    />
                  </div>
                  {/* <Button type='submit' variant="contained" color="primary" onClick={PostData}>
                    Register
                  </Button> */}
                  <button className='login_btn' type="submit" onClick={PostData}>
                      Login
                  </button>
                </form>
                <button className='gotoLog' type="submit" onClick={gotoLog}>
                      Existing User? Log in
                  </button>
              </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
