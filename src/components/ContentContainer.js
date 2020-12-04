import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/context'

import SideControlls from './SideControlls'
import DataComponent from './DataComponent'

const ContentContainer = (props) => {
    

    const { countriesData, statesData, currentLocationType } = useContext(Context)
    const [countriesDisplay, setCountriesDisplay] = countriesData
    const [statesDisplay, setStatesDisplay] = statesData
    const [locationType, setLocationType] = currentLocationType

    const [displayData, setDisplayData] = useState(countriesDisplay)

    useEffect(() => {
        if (locationType === 'countries'){
            setDisplayData(countriesDisplay)
        } else {
            setDisplayData(statesDisplay)
        }
    }, [locationType, countriesDisplay, statesDisplay])

    

    return(
        <div className='content-container'>
            <SideControlls/>
            {displayData.map((country,index) => {
                return <DataComponent 
                        key={index} 
                        locationName={country.locationName} 
                        totalCases={country.totalCases}
                        />
            })}
        </div>
    )
}

export default ContentContainer