import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/context'


const SideControlls = () => {

    const { currentLocationType, clipBoard, filterString, sortMethod } = useContext(Context)
    const [locationType, setLocationType] = currentLocationType
    const [filterStr, setFilterStr] = filterString
    const [sort, setSort] = sortMethod

    const [clipBoardData, setClipBoardData] = clipBoard

    const [sortOrder, setSortOrder] = useState('low-high')
    const [sortBy, setSortBy] = useState('alphabetical')

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

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }

    const changeSortOrder = (e) => {
        setSortOrder(e.target.value)
    }

    useEffect(() => {
        setSort([sortOrder, sortBy])
    }, [...sort, sortBy, sortOrder])

    return(
        <div className="side-controlls">
            <input 
                type="text"
                placeholder="Search"
                value={filterStr}
                onChange={setFilterString}
            />
            <button onClick={toggleLocationType}>Location Type</button>
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
        
            <p>Clipboard: <span className='clipboard'>{clipBoardData.cases[0].locationName}</span></p>
            
        </div>
    )
}

export default SideControlls