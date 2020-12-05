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
            
            {displayData.map((location,index) => {
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