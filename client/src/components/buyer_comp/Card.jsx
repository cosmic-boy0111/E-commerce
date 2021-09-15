import React from 'react'
import '../../static/css/Card.css'
import { useHistory } from 'react-router-dom'
const Card = ({obj}) => {

    const history = useHistory();

    return (
        <>
            <div className="card_main">
                <div className='card_body' onClick={()=>history.push(`/${obj.path}`)} style={{
                    cursor:'pointer',
                }}         
                >
                    <div className='img_body'>
                        <div className="img_container">
                            <div className="card_img">
                                <img src={obj.img} alt="" style={{width:'100%'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="card_details">
                        <span className='p_name'> {obj.name}</span>
                        <span className='free' >₹ {obj.prize}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
