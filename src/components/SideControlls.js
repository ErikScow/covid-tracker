import React, { useContext } from 'react'
import { Context } from '../contexts/context'


const SideControlls = () => {

    const { currentLocationType, clipBoard} = useContext(Context)
    const [locationType, setLocationType] = currentLocationType
    const [clipBoardData, setClipBoardData] = clipBoard

    const toggleLocationType = () => {
        if (locationType === 'countries'){
            setLocationType('states')
        } else {
            setLocationType('countries')
        }
    }

    return(
        <div className="side-controlls">
            <button onClick={toggleLocationType}>Location Type</button>
            <p>Clipboard: <span className='clipboard'>{clipBoardData.cases[0].locationName}</span></p>
        </div>
    )
}

export default SideControlls