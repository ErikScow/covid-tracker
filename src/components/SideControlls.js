import React, { useContext } from 'react'
import { Context } from '../contexts/context'


const SideControlls = () => {

    const { currentLocationType } = useContext(Context)
    const [locationType, setLocationType] = currentLocationType

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
        </div>
    )
}

export default SideControlls