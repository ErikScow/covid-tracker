import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../contexts/context'

import GraphComponent from './GraphComponent'

const GraphContainer = (props) => {
    const { graphDataStates, graphDataCountries } = useContext(Context)
    const [graphStatesStore, setGraphStatesStore] = graphDataStates
    const [graphCountriesStore, setGraphCountriesStore] = graphDataCountries

    const [currentGraphData, setCurrentGraphData] = useState({})

    useEffect(() => {
        if (props.locationType === 'country'){
            if(props.abbreviation in graphCountriesStore){
                setCurrentGraphData(graphCountriesStore[props.abbreviation])
            } else {
                axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/history?ab=${props.abbreviation}&status=Confirmed`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err)
                    })
                axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/history?ab=${props.abbreviation}&status=Deaths`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        } else if (props.locationType === 'state'){
            if(props.abbreviation in graphStatesStore){
                setCurrentGraphData(graphStatesStore[props.abbreviation])
            } else {
                axios.get(`https://api.covidtracking.com/v1/states/${props.abbreviation}/daily.json`)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    },[])

    return(
        <div className='graph-outer-container'>
            
            <GraphComponent/>
        </div>
    )
}

export default GraphContainer