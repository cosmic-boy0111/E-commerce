import React from 'react'
import Slider from './Slider'
import { useHistory } from 'react-router-dom'

const SliderContainer = ({data,text}) => {

    const history = useHistory();

    return (
        <>
            <div className='home_container'>
                            <div className="slider_container">
                                <div className='slider_head'>
                                    <div className='header_text'>
                                        <h5>{text}</h5>
                                    </div>
                                    <button onClick={()=>history.push(`/viewall/${'dealOfTheDay'}/${text}`)}>VIEW ALL</button>
                                </div>
                                <Slider data={data}/>
                            </div>
                    </div>
        </>
    )
}

export default SliderContainer
