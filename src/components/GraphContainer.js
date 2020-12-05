import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../contexts/context'

import { convertStateName } from '../utils/stringModifiers'

import GraphComponent from './GraphComponent'

const GraphContainer = (props) => {
    const { graphDataStates, graphDataCountries, clipBoard } = useContext(Context)
    const [graphStatesStore, setGraphStatesStore] = graphDataStates
    const [graphCountriesStore, setGraphCountriesStore] = graphDataCountries
    const [clipBoardData, setClipBoardData] = clipBoard

    const [clipBoardButton, setClipBoardButton] = useState('Compare Clipboard')
    const [clipBoardStatus, setClipBoardStatus] = useState(false)

    const [currentGraphData, setCurrentGraphData] = useState({
        cases:[{locationName: '', x: new Date(), y:0}],
        deaths: [{locationName: '', x: new Date(), y:0}]
    })

    const [countryCasesData, setCountryCasesData] = useState([])
    const [countryDeathsData, setCountryDeathsData] = useState([])

    useEffect(() => {
        if (props.locationType === 'country'){
            if(props.abbreviation in graphCountriesStore){
                setCurrentGraphData(graphCountriesStore[props.abbreviation])
            } else {
                axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/history?ab=${props.abbreviation}&status=Confirmed`)
                    .then(res => {
                        const caseData = res.data.All.dates
                        console.log(res)
                        const formattedDataCases = []
                        for(const date in caseData){
                            formattedDataCases.push({
                                locationName: props.locationName,
                                x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                y: caseData[date]
                            })
                        }
                        setCountryCasesData(formattedDataCases)
                        let countryData
                        if (props.abbreviation in graphCountriesStore){
                            let newGraphCountriesStore = graphCountriesStore
                            let item = newGraphCountriesStore[props.abbreviation]
                            item.cases = formattedDataCases
                            newGraphCountriesStore = {...newGraphCountriesStore, item}
                            setGraphCountriesStore(newGraphCountriesStore)
                        } else {
                            countryData = {cases: formattedDataCases}
                            let newGraphCountriesStore = graphCountriesStore
                            newGraphCountriesStore[props.abbreviation] = countryData
                            setGraphCountriesStore(newGraphCountriesStore)
                        }
                    })
                    .catch(err => {
                        console.error(err)
                    })
                axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/history?ab=${props.abbreviation}&status=Deaths`)
                    .then(res => {
                        const deathsData = res.data.All.dates
                        console.log(res)
                        const formattedDataDeaths = []
                        for(const date in deathsData){
                            formattedDataDeaths.push({
                                locationName: props.locationName,
                                x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                y: deathsData[date]
                            })
                        }
                        setCountryDeathsData(formattedDataDeaths)
                        let countryData
                        if (props.abbreviation in graphCountriesStore){
                            let newGraphCountriesStore = graphCountriesStore
                            let item = newGraphCountriesStore[props.abbreviation]
                            item.deaths = formattedDataDeaths
                            newGraphCountriesStore = {...newGraphCountriesStore, item}
                            setGraphCountriesStore(newGraphCountriesStore)
                        } else {
                            countryData = {deaths: formattedDataDeaths}
                            let newGraphCountriesStore = graphCountriesStore
                            newGraphCountriesStore[props.abbreviation] = countryData
                            setGraphCountriesStore(newGraphCountriesStore)
                        }
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
                        const data = res.data
                        const formattedDataCases = []
                        const formattedDataDeaths = []
                        for( let i=0; i<data.length;i++){
                            const dateString = data[i].date.toString()
                            formattedDataCases.push({
                                locationName: convertStateName(data[i].state),
                                x: new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(4,6))-1, parseInt(dateString.slice(6))),
                                y: data[i].positive
                            })
                            formattedDataDeaths.push({
                                locationName: convertStateName(data[i].state),
                                x: new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(4,6))-1, parseInt(dateString.slice(6))),
                                y: data[i].death
                            })
                        }
                        setCurrentGraphData({
                            cases: formattedDataCases,
                            deaths: formattedDataDeaths
                        })
                        let newGraphStatesStore = graphStatesStore
                        newGraphStatesStore[props.abbreviation] = {
                            cases: formattedDataCases,
                            deaths: formattedDataDeaths
                        }
                        setGraphStatesStore(newGraphStatesStore)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    },[])

    useEffect(() => {
        setCurrentGraphData({
            cases:countryCasesData,
            deaths:countryDeathsData
        })
    }, [countryCasesData, countryDeathsData])

    const toggleClipBoard = () => {
        if(clipBoardStatus){
            setClipBoardStatus(false)
            setClipBoardButton('Compare Clipboard')
        } else {
            setClipBoardStatus(true)
            setClipBoardButton('Hide Clipboard')
        }
    }

    const saveToClipBoard = () => {
        setClipBoardData(currentGraphData)
    }

    if(!clipBoardStatus){
        return(
            <div className='graph-outer-container'>
                <button onClick={saveToClipBoard}>Save To Clipboard</button>
                <button onClick={toggleClipBoard}>{clipBoardButton}</button>
                <GraphComponent data={{currentSet: currentGraphData.cases}}/>
            </div>
        )
    }

    return(
        <div className='graph-outer-container'>
            <button onClick={toggleClipBoard}>{clipBoardButton}</button>
            <GraphComponent data={{currentSet: currentGraphData.cases, comparisonSet: clipBoardData.cases}}/>
        </div>
    )
}

export default GraphContainer