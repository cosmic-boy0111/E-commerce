import React,{useState} from 'react'
import DoneIcon from '@material-ui/icons/Done';

const Temp = () => {

    const [payLogin, setPayLogin] = useState(true)

    const change = () =>{
        setPayLogin(true) 
    }

    const next = () =>{
        setPayLogin(false)
    }

    return (
        <>
            <div className='pay_main'>
                <div className="pay_head" >
                    <div className='first_div'>
                        <span>1</span>
                        <div className='second_div'>
                            <span>header <span className='free'> <DoneIcon fontSize='small'/> </span></span>
                            <span style={{
                                display:payLogin?'none':'inline'
                            }}>+91 8080314051</span>
                        </div>
                    </div>
                    <div className="pay_btn" style={{
                        display:payLogin?'none':'flex'
                    }}>
                        <button onClick={change} >change</button>
                    </div>
                </div>
                <div className='pay_body' style={{
                    display:payLogin?'block':'none'
                }}>
                    hello world
                    <button onClick={next} >next</button>
                </div>
            </div>
        </>
    )
}

export default Temp
