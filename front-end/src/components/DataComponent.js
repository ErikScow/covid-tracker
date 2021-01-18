import React, { useState } from 'react'
import GraphContainer from './GraphContainer'

const DataComponent = (props) => {
    
    const toggleGraph = () => {
        if(props.graphOpen){
            props.setGraphOpen(false)
        } else {
            props.setGraphOpen(true)
            props.setGraphOwner(props.locationName)
        }
    }

    if(props.graphOpen){
        return (
        <div className='outer-container'>
            <div onClick={toggleGraph} className='items-container data'>
                <p className='name-item'>{props.locationName}</p>
                <div className='other-items'>
                    <p className='row-item'>{props.totalCases}</p>
                    <p className='row-item'>{props.totalDeaths}</p>
                    <p className='row-item'>{props.casesPerMil}</p>
                    <p className='row-item'>{props.deathsPerMil}</p>
                    <p className='row-item'>{props.deathRate}%</p>
                </div>
            </div>        
                
                <GraphContainer 
                    graphOwner={props.graphOwner}
                    abbreviation={props.abbreviation} 
                    locationType={props.locationType}
                    locationName={props.locationName}
                    totalCases={props.totalCases}
                    totalDeaths={props.totalDeaths}
                    casesPerMil={props.casesPerMil}
                    deathsPerMil={props.deathsPerMil}
                    deathRate={props.deathRate}
                />
            
        </div>
        
        )
    }

    return(
    <div className='outer-container'>
        <div onClick={toggleGraph} className='items-container data'>
            <p className='name-item'>{props.locationName}</p>
            <div className='other-items'>
                <p className='row-item'>{props.totalCases}</p>
                <p className='row-item'>{props.totalDeaths}</p>
                <p className='row-item'>{props.casesPerMil}</p>
                <p className='row-item'>{props.deathsPerMil}</p>
                <p className='row-item'>{props.deathRate}%</p>
            </div>
        </div>  
    </div>
    )
}

export default DataComponent