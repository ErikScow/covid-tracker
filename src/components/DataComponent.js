import React, { useState } from 'react'
import GraphContainer from './GraphContainer'

const DataComponent = (props) => {
    
    const [graphOpen, setGraphOpen] = useState(false)

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
        <div className='container'>
            <div onClick={toggleGraph} className='columns data'>
                <p className='name-row'>{props.locationName}</p>
                <div className='other-rows'>
                    <p className='row-item'>{props.totalCases}</p>
                    <p className='row-item'>{props.totalDeaths}</p>
                    <p className='row-item'>{props.casesPerMil}</p>
                    <p className='row-item'>{props.deathsPerMil}</p>
                    <p className='row-item'>{props.deathRate}%</p>
                </div>
                
            </div>
            <GraphContainer 
                abbreviation={props.abbreviation} 
                locationType={props.locationType}
                locationName={props.locationName}
            />
        </div>
        )
    }

    return(
        <div className='container'>
            <div onClick={toggleGraph} className='columns data'>
                <p className='name-row'>{props.locationName}</p>
                <div className='other-rows'>
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