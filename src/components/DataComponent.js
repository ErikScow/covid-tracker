import React from 'react'

const DataComponent = (props) => {
    return(
        <p>{props.locationName}: {props.totalCases}</p>
    )
}

export default DataComponent