import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Context } from '../contexts/context'
import Select from 'react-select'


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
        setLocationType(e.value)
        setFilterStr('')
    }

    const setFilterString = (e) => {
        setFilterStr(e.target.value)
    }

    const changeSortBy = (e) => {
        setSortBy(e.value)
    }

    const changeSortOrder = (e) => {
        setSortOrder(e.value)
    }

    useEffect(() => {
        setSort([sortOrder, sortBy])
    }, [...sort, sortBy, sortOrder])

    useEffect(() => {
        setClipBoardDisplay(clipBoardData)
    },[clipBoardData])

    //react select component options arrays
    const locationOptions = [
        { value: 'countries' , label: 'Countries' },
        { value: 'states' , label: 'States' }
    ]

    const sortByOptions = [
        { value: 'alphabetical', label: 'Alphabetical' },
        { value: 'cases', label: 'Cases' },
        { value: 'deaths', label: 'Deaths'},
        { value: 'cases/mil', label: 'Cases/Mil'},
        { value: 'deaths/mil', label: 'Deaths/Mil'},
        { value: 'deathRate', label: 'Death Rate'}
    ]

    const sortOrderOptions = [
        { value: 'low-high', label: 'Low to High'},
        { value: 'high-low', label: 'High to Low'}
    ]

    return(
        <div className="side-controlls">
            <input 
                type="text"
                placeholder="Search"
                value={filterStr}
                onChange={setFilterString}
            />
            <p>Location Type</p>
            <Select 
                className='select'
                onChange={selectLocationType} 
                options={locationOptions}
                defaultValue={ {value:'countries', label: 'Countries'} }
                isSearchable={false}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                      primary25: '#daedee',
                      primary: '#40a0a0',
                      primary50: '#daedee'
                    },
                  })}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: '30px',
                        height: '30px',
                        boxShadow: state.isFocused ? null : null,
                      }),
                  
                      valueContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                        padding: '0 6px'
                      }),
                  
                      input: (provided, state) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                      }),
                  
                }}
            /> 
            <p>Sort By</p>
            <Select 
                className='select'
                onChange={changeSortBy}
                options={sortByOptions}
                defaultValue={{ value:'alphabetical', label: 'Alphabetical'}}
                isSearchable={false}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                      primary25: '#daedee',
                      primary: '#40a0a0',
                      primary50: '#daedee'
                    },
                  })}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: '30px',
                        height: '30px',
                        boxShadow: state.isFocused ? null : null,
                      }),
                  
                      valueContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                        padding: '0 6px'
                      }),
                  
                      input: (provided, state) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                      }),
                  
                }}
            />
            <p>Sort Order</p>
            <Select 
                className='select'
                onChange={changeSortOrder}
                options={sortOrderOptions}
                defaultValue = {{ value: 'low-high', label: 'Low to High'}}
                isSearchable={false}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                      primary25: '#daedee',
                      primary: '#40a0a0',
                      primary50: '#daedee'
                    },
                  })}
                styles={{
                    control: (provided, state) => ({
                        ...provided,
                        minHeight: '30px',
                        height: '30px',
                        boxShadow: state.isFocused ? null : null,
                      }),
                  
                      valueContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                        padding: '0 6px'
                      }),
                  
                      input: (provided, state) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        height: '30px',
                      }),
                  
                }}
            />
        
            <p className='clipboard-indicator'>Saved: <span className='clipboard'>{clipBoardDisplay.cases[0].locationName}</span></p>
            <p className='clipboard-indicator mobile'>Saved: <span className='clipboard'>{clipBoardDisplay.cases[0].locationName}</span></p>
        </div>
    )
}

export default SideControlls