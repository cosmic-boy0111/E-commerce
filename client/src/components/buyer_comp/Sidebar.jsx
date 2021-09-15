import React from 'react'
import Sidebar_block from './Sidebar_block'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import KitchenRoundedIcon from '@material-ui/icons/KitchenRounded';
import WatchRoundedIcon from '@material-ui/icons/WatchRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import SmartphoneRoundedIcon from '@material-ui/icons/SmartphoneRounded';
import HeadsetRoundedIcon from '@material-ui/icons/HeadsetRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import '../../static/css/sidebar.css'

const Sidebar = () => {
    return (
        <>
                <div id="mySidenav" className="side_bar">
                    {/* <Sidebar_block dir='/buyer' logo={<HomeRoundedIcon/>}  logo_name='Home'/> */}
                    <Sidebar_block dir='/mobiles' logo={<SmartphoneRoundedIcon/>}  logo_name='Mobiles'/>
                    <Sidebar_block dir='/electronics' logo={<HeadsetRoundedIcon/>}  logo_name='Electronic'/>
                    <Sidebar_block dir='/appliances' logo={<KitchenRoundedIcon/>}  logo_name='Appliance'/>
                    <Sidebar_block dir='/men' logo={<PersonRoundedIcon/>}  logo_name='Men'/>
                    <Sidebar_block dir='/women' logo={<FaceRoundedIcon/>}  logo_name='Women'/>
                    <Sidebar_block dir='/' logo={<MoreHorizIcon/>}  logo_name='More'/>


                </div>
        </>
    )
}

export default Sidebar
