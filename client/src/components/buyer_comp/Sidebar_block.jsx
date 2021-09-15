import React from 'react'
import {NavLink} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';


const Sidebar_block = ({dir,logo,logo_name}) => {

    if(dir==='/'){
        return <div id={logo_name} className='under' onClick={()=>alert('currently not available')} style={{
            cursor:'pointer'
        }}>{logo_name} {logo}</div>
    }

    return (
        <NavLink to={dir} id={logo_name} className='under'> {logo_name} {logo} </NavLink>
    )
}

export default Sidebar_block
