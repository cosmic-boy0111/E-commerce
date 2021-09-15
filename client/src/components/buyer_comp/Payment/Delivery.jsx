import React,{useState,useContext,useEffect} from 'react'
import DoneIcon from '@material-ui/icons/Done';
import {UserStates} from '../PaymentPage'
import Button from '@material-ui/core/Button';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import CircularIndeterminate from '../Progress';

const Delivery = () => {

    const {payDeliver,setPro,setEmail,setPayDeliver,setPayLogin,setPayOrder,setPayOption} = useContext(UserStates)
    const [col, setCol] = useState(true)

    const states = ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttaranchal", "Uttar Pradesh", "West Bengal"]
    const [state, setState] = useState('')

    const [userAddress, setUserAddress] = useState({
        name:'',
        phone:'',
        pincode:'',
        locality:'',
        address :'',
        city:'',
        state:'',
        landmark:'',
        aphone:'',
        addressType:''
    })

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(
        userAddress.address===''?false:true
    )



    const getUserData = async () => {
        setLoading(true)
        try {
          const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await res.json();

          setEmail(data.email)

          setUserAddress({
            name:data.name,
            phone:data.phone,
            pincode:data.Address.pincode,
            locality:data.Address.locality,
            address :data.Address.address,
            city:data.Address.city,
            state:data.Address.state,
            landmark:data.Address.landmark,
            aphone:data.Address.aphone,
            addressType:data.Address.addressType
        })

            setShow( data.Address.address===null?true:false)

            setLoading(false)
    
          if (res.status !== 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    



    useEffect(() => {
        
        getUserData();
        
    }, [])

    


    const inputHandler = (e) =>{
        // var s = e.target.value
        // let isnum = /^\d+$/.test(s)
        // console.log(isnum); 
        
        var name = e.target.name;
        var value = e.target.value;

        if(name==='pincode' && /^\d+$/.test(value)!==true && value!==''){
            return;
        }
        if(name==='aphone' && /^\d+$/.test(value)!==true && value!==''){
            return;
        }
        
        setUserAddress({
            ...userAddress,
            [name]:value
        })

    }


    const change = () =>{
        setPayDeliver(true) 
        setPayOrder(false)
        setPayLogin(false)
        setPayOption(false)
        setCol(true)
    }
    
    const next = async (e) =>{
        e.preventDefault();
        setPro(true)
        const {pincode,locality,address,city,state,landmark,aphone,addressType} = userAddress;

        const res = await fetch('/addAddress',{
            method:'POST',
            headers:{
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({
                pincode,locality,address,city,state,landmark,aphone,addressType
            })
        })

        const data = await res.json();

        if(res.status === 200){
            alert("address added");
        }else{
            alert('not added')
        }

        setPro(false)

        setPayLogin(false)
        
            setPayDeliver(false)

            setPayOrder(true)
        
        setPayOption(false)
        setCol(false)
        setShow(false)
    }

    const next2 = () =>{
        setPayLogin(false)
        
        if(!show){
            setPayDeliver(false)

            setPayOrder(true)
        }
        
        setPayOption(false)
        setCol(false)
    }

    return (
        <>
            <div className='pay_main'>
                
                
                <div className="pay_head" style={{
                            backgroundColor :col && payDeliver?'#2874f0':'white'
                        }}>
                    <div className='first_div'>
                        <span  style={{
                            color:col && payDeliver ?'white':'black'
                        }} >2</span>
                        <div className='second_div'>
                            <span style={{
                                color:col && payDeliver?'white':'black',
                            }}
                            className='header'>DELIVERY ADDRESS <span className='free' style={{
                                display:payDeliver || show ?'none':'inline'
                            }}> <DoneIcon fontSize='small'/> </span></span>
                            <span style={{
                                display:payDeliver || show ?'none':'inline'
                            }}
                            className='head_foot'
                            > <span className='bolder2'> {userAddress.name} </span> {userAddress.address},{userAddress.locality},{userAddress.city}-{userAddress.state} {userAddress.pincode}</span>
                        </div>
                    </div>
                    <div className="pay_btn" style={{
                        display:payDeliver || show?'none':'flex'
                    }}>
                        <Button variant="outlined" color="primary" onClick={change} >change</Button>
                    </div>
                </div>
                <div style={{
                    display:loading?'flex':'none',
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    padding:'1rem'

                }}>
                    <CircularIndeterminate />
                </div>

                <div style={{
                    display:loading?'none':'block'
                }}>

                <div className='pay_body' style={{
                    display:payDeliver?'block':'none'
                }}>
                    <div className='when_done' style={{
                        display:show?'none':'flex'
                    }}>
                        <div className='when_done_body'>
                            <div className='done_body_head'>
                                <span className='bolder2'>{userAddress.name}</span> <span className='bolder2'>{userAddress.phone}</span>
                            </div>
                            <span className='address'>
                                {userAddress.address},{userAddress.locality},{userAddress.city}-{userAddress.state} {userAddress.pincode}
                            </span>
                            <div className='deliver_here' onClick={next2}>
                                <button>Deliver Here</button>
                            </div>
                        </div>
                        <div className='edit' onClick={()=>setShow(true)}>
                            <span > Edit </span>
                        </div>
                    </div>

                    <div className='Enter_Address' style={{
                        display:show?'block':'none'
                    }}>
                        <div className='edit2'>
                            <p>Edit Address</p>
                        </div>
                        {/* <div className='location_btn'>
                            <button onClick={getLocation}> <GpsFixedIcon fontSize='small'/> Use my current location</button>
                        </div> */}
                        <form method="POST" className='address_form' onSubmit={next}>
                            <div className='input_container'>
                                <div className="input_field" >
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" id='name' required name='name' value={userAddress.name} />
                                </div>  
                                <div className="input_field">
                                    <label htmlFor="phone">Number:</label>
                                    <input type="text" id='phone' required name='phone' maxlength="10" minLength='10' value={userAddress.phone} />
                                </div>
                            </div>
                            <div className='input_container'>
                                <div className="input_field">
                                    <label htmlFor="pincode">Pincode:</label>
                                    <input type="text" id='pincode' required name='pincode' maxlength="6" minLength='6' value={userAddress.pincode} onChange={inputHandler}/>
                                </div>  
                                <div className="input_field">

                                    <label htmlFor="locality">Locality:</label>
                                    <input type="text" id='locality' required name='locality' value={userAddress.locality} onChange={inputHandler} />
                                </div>
                            </div>
                            <div className="text_container">
                                <label htmlFor="address">Address:</label>
                                <textarea required name="address" id="address" cols="" rows="3" value={userAddress.address} onChange={inputHandler}></textarea>
                            </div>
                            <div className='input_container'>
                                <div className="input_field" >
                                    <label htmlFor="city">City/District:</label>
                                    <input type="text" id='city' required name='city' value={userAddress.city} onChange={inputHandler}/>
                                </div>  
                                <div className="input_field">
                                    <label htmlFor="state">State:</label>
                                    <select name="state" id="state" required value={userAddress.state} onChange={inputHandler} >
                                        {
                                            state!==''? <option value={state} >{state}</option> : <option value disabled selected > {''} </option>
                                        }
                                        
                                        {
                                            states.map((e)=>{
                                                return <option value={e} >{e}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='input_container'>
                                <div className="input_field" >
                                    <label htmlFor="landmark">Landmark:</label>
                                    <input type="text" id='landmark' name='landmark' placeholder='optinal' value={userAddress.landmark} onChange={inputHandler}/>
                                </div>  
                                <div className="input_field">
                                    <label htmlFor="Aphone">Alternate_Phone:</label>
                                    <input type="text" id='aphone' name='aphone' placeholder='optinal' maxlength="10" minLength='10' value={userAddress.aphone} onChange={inputHandler}/>
                                </div>
                            </div>
                            <div className='input_container'>
                                <div className='radio-button'>
                                    <span> Address Type</span>
                                    <div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="addressType" id="inlineRadio1" value="Home"  required onChange={inputHandler}/>
                                        <label class="form-check-label" for="inlineRadio1">Home (All Day Delivery)</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="addressType" id="inlineRadio2" value="Work" required onChange={inputHandler}/>
                                        <label class="form-check-label" for="inlineRadio2">Work (Delivery between 10 AM - 5 PM)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="deliver_here">

                            <button type='submit' className='submit_add'>SAVE AND DELIVER HERE</button>
                            </div>
                        </form>

                        
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delivery
