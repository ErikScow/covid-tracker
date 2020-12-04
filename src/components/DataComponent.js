import React from 'react'

const DataComponent = (props) => {
    return(
        <div className='container'>
            <div className='columns data'>
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