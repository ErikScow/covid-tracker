import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/context'

import SideControlls from './SideControlls'
import DataComponent from './DataComponent'

const ContentContainer = (props) => {
    

    const { countriesData, statesData, currentLocationType, filterString } = useContext(Context)
    const [countries, setCountries] = countriesData
    const [states, setStates] = statesData

    //modifiers for display data (controlled by SideControlls.js)
    const [locationType, setLocationType] = currentLocationType
    const [filterStr, setFilterStr] = filterString

    //modified data to display
    const [dataSet, setDataSet] = useState(countries)
    const [searched, setSearched] = useState(dataSet)

    useEffect(() => {
        setSearched(dataSet)
    }, [dataSet])
    

    useEffect(() => {
        if (locationType === 'countries'){
            setDataSet(countries)
        } else {
            setDataSet(states)
        }
    }, [locationType, countries, states])


    useEffect(() => {
        console.log(filterStr)
        const filteredData = dataSet.filter(location => {
            return location.locationName.toLowerCase().includes(filterStr.toLowerCase())
        })
        console.log(filteredData)
        setSearched(filteredData)
    }, [filterStr])
    

    return(
        <div className='content-container'>
            <SideControlls/>
            <div className='container'>
                <div className='columns'>
                    <p className='name-row'>Location</p>
                    <div className='other-rows'>
                        <p className='row-item'>Cases</p>
                        <p className='row-item'>Deaths</p>
                        <p className='row-item'>Cases/Mil</p>
                        <p className='row-item'>Deaths/Mil</p>
                        <p className='row-item'>Death Rate</p>
                    </div>
                   
                </div>
            </div>
            
            {searched.map((location,index) => {
                return <DataComponent 
                        key={location.locationName} 
                        locationName={location.locationName} 
                        locationType={location.locationType}
                        totalCases={location.totalCases}
                        totalDeaths={location.totalDeaths}
                        casesPerMil={location.casesPerMil}
                        deathsPerMil={location.deathsPerMil}
                        deathRate={location.deathRate}
                        abbreviation={location.abbreviation}

                        />
            })}
        </div>
    )
}

export default ContentContainer