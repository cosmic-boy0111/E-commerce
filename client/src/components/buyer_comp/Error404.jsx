import React from 'react'
import '../../static/css/Error404.css'
import { useHistory } from 'react-router-dom'

const Error404 = () => {
    const history = useHistory()
    return (
        <>
            <div className="error_header">
                <img src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png' alt="" />
            </div>
            <div className="error_body">
                <div className="error_body_container">
                    <img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/error-500_f9bbb4.png" alt="" />
                    <h5>Unfortunately the page you are looking for has been moved or deleted</h5>
                    <button onClick={()=>history.push('/')} >go to homepage</button>
                </div>
            </div>
        </>
    )
}

export default Error404
