import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Context } from '../contexts/context'


const SideControlls = () => {

    const { currentLocationType, clipBoard, filterString, sortMethod } = useContext(Context)
    const [locationType, setLocationType] = currentLocationType
    const [filterStr, setFilterStr] = filterString
    const [sort, setSort] = sortMethod

    const [clipBoardData, setClipBoardData] = clipBoard

    const [sortOrder, setSortOrder] = useState('low-high')
    const [sortBy, setSortBy] = useState('alphabetical')

    const [clipBoardDisplay, setClipBoardDisplay] = useState({
        cases:[{locationName: '', x: new Date(), y:0}],
        deaths: [{locationName: '', x: new Date(), y:0}]
      })

    const selectLocationType = (e) => {
        setLocationType(e.target.value)
        setFilterStr('')
    }

    const setFilterString = (e) => {
        setFilterStr(e.target.value)
    }

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }

    const changeSortOrder = (e) => {
        setSortOrder(e.target.value)
    }

    useEffect(() => {
        setSort([sortOrder, sortBy])
    }, [...sort, sortBy, sortOrder])

    useEffect(() => {
        setClipBoardDisplay(clipBoardData)
    },[clipBoardData])

    return(
        <div className="side-controlls">
            <input 
                type="text"
                placeholder="Search"
                value={filterStr}
                onChange={setFilterString}
            />
            <p>Location Type</p>
            <select onChange={selectLocationType}> 
                <option value='countries'>Countries</option>
                <option value='states'>States</option>
            </select>
            <p>Sort By</p>
            <select onChange={changeSortBy}>
                <option value='alphabetical'>Alphabetical</option>
                <option value='cases'>Cases</option>
                <option value='deaths'>Deaths</option>
                <option value='cases/mil'>Cases/Mil</option>
                <option value='deaths/mil'>Deaths/Mil</option>
                <option value='deathRate'>Death Rate</option>
            </select>
            <p>Sort Order</p>
            <select onChange={changeSortOrder}>
                <option value='low-high'>Low to High</option>
                <option value='high-low'>High to Low</option>
            </select>
        
            <p>Clipboard: <span className='clipboard'>{clipBoardDisplay.cases[0].locationName}</span></p>
            
        </div>
    )
}

export default SideControlls