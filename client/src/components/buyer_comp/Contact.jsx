import React, { useEffect, useState, useContext } from "react";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import Button from "@material-ui/core/Button";
// import {UserContext} from '../App'
import '../../static/css/Contact.css'
import Navbar from './Navbar'
import {useHistory} from 'react-router-dom'
import Sidebar from "./Sidebar";
import CircularIndeterminate from "./Progress";
import {UserContext} from '../../App'
import LinearIndeterminate from "./Progress2";

const Contact = () => {
  const {state,dispatch,setOpen} = useContext(UserContext)


  const history =   useHistory();
  const [loading,setLoading] = useState('')
  const [pro, setPro] = useState(false)

  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')

  const [city, setCity] = useState('')
  const [subDivision, setSubDivision] = useState('')


  const [userData, setUserData] = useState({
    name:'',
    email:'',
    phone:'',
    message:'',
  });

  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  const userContact = async () => {
    setLoading(true)
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }

      const res2 = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`);
    const Location = await res2.json();

      setCity(Location.city)
      setSubDivision(Location.principalSubdivision)
      
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();


      setUserData({...userData, name:data.name,email:data.email,phone:data.phone});
      setLoading(false)
      // console.log(data);
      dispatch({type:'USER',payload:true})

      if (res.status !== 200) {
        setOpen(true)
        history.push('/')
        setLoading(false)
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      setOpen(true)
      setLoading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);


  const handleInputs = (e) =>{
    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData,[name]:value})

  }

  const contactForm = async(e) =>{
    e.preventDefault();
    setPro(true);
    const {name, email, phone, message} = userData;

    const res = await fetch('/contact',{
      method:'POST',
      headers:{
        "Content-Type" : 'application/json'
      },
      body: JSON.stringify({
        name,email,phone,message
      })
    })

    const data = await res.json();

    if(!data){
      console.log("message not send");
    }else{
      setPro(false)
      alert('message send')
      setUserData({...userData,message:''});
    }



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

                <div style={{
                  visibility:pro?'visible':'hidden'
                }}>
                    <LinearIndeterminate />
                </div>
                    



      <div className="contact_info">
        <div className="contact_info_items">
          <PhoneAndroidIcon className="contact_info_img" color="primary" />
          <div className="contact_info_context">
            <div className="contact_info_title">Phone</div>
            <div className="contact_info_text">{userData.phone}</div>
          </div>
        </div>
        <div className="contact_info_items">
          <EmailOutlinedIcon className="contact_info_img" color="primary" />
          <div className="contact_info_context">
            <div className="contact_info_title">Email</div>
            <div className="contact_info_text">{userData.email}</div>
          </div>
        </div>
        <div className="contact_info_items">
          <BusinessOutlinedIcon className="contact_info_img" color="primary" />
          <div className="contact_info_context">
            <div className="contact_info_title">Address</div>
            <div className="contact_info_text">{city}, {subDivision}</div>
          </div>
        </div>
      </div>
      {/* contact us form */}
      <div className="contact_main_container">
        <div className="contact_container">
          <h2 className="contact_header">Get in Touch</h2>
          <form className="contact_form" method='POST'>
            <div className="entry_fields">
              <div className="form_field2">
                <input
                  type="text"
                  id="name"
                  value={userData.name}
                  name="name"
                  onChange={handleInputs}
                  placeholder="Your Name"
                  required
                  className="fw-bold"
                />
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  name="email"
                  onChange={handleInputs}
                  placeholder="Your Email"
                  required
                  className="fw-bold"
                />
                <input
                  type="phone"
                  id="phone"
                  value={userData.phone}
                  name="phone"
                  onChange={handleInputs}
                  placeholder="Your Phone Number"
                  required
                  className="fw-bold"
                />
              </div>
            </div>
            <div className="text_area_div">
              <textarea
                id="message"
                rows="5"
                value={userData.message}
                name="message"
                onChange={handleInputs}
                placeholder="message"
                required
                className="fw-bold"
                style={{
                  color:'rgb(7, 204, 204)'
                }}
              ></textarea>
            </div>
            <div className="contact_submit_button">
              <Button type="submit" variant="contained" color="primary" onClick={contactForm}>
                Send message
              </Button>
            </div>
          </form>
        </div>
      </div>
                </div>

            </section>
    </>
  );
};

export default Contact;
