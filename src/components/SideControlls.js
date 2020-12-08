import React, { useContext } from 'react'
import { Context } from '../contexts/context'


const SideControlls = () => {

    const { currentLocationType, clipBoard, filterString } = useContext(Context)
    const [locationType, setLocationType] = currentLocationType
    const [filterStr, setFilterStr] = filterString

    const [clipBoardData, setClipBoardData] = clipBoard

    const toggleLocationType = () => {
        if (locationType === 'countries'){
            setLocationType('states')
        } else {
            setLocationType('countries')
        }
        setFilterStr('')
    }

    const setFilterString = (e) => {
        setFilterStr(e.target.value)
    }

    return(
        <div className="side-controlls">
            <input 
                type="text"
                placeholder="Search"
                value={filterStr}
                onChange={setFilterString}
            />
            <button onClick={toggleLocationType}>Location Type</button>
            <p>Clipboard: <span className='clipboard'>{clipBoardData.cases[0].locationName}</span></p>
            
        </div>
    )
}

export default SideControlls