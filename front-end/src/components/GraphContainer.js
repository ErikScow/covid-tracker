import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Context } from '../contexts/context'

import { convertStateName } from '../utils/stringModifiers'

import GraphComponent from './GraphComponent'

const GraphContainer = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const { graphDataStates, graphDataCountries, clipBoard } = useContext(Context)
    const [graphStatesStore, setGraphStatesStore] = graphDataStates
    const [graphCountriesStore, setGraphCountriesStore] = graphDataCountries
    const [clipBoardData, setClipBoardData] = clipBoard

    const [clipBoardButton, setClipBoardButton] = useState('Compare')
    const [clipBoardStatus, setClipBoardStatus] = useState(false)

    const [currentGraphData, setCurrentGraphData] = useState({
        cases:[{locationName: '', x: new Date(), y:0}],
        deaths: [{locationName: '', x: new Date(), y:0}]
    })

    const [countryCasesData, setCountryCasesData] = useState([{locationName: '', x: new Date(), y:0}])
    const [countryDeathsData, setCountryDeathsData] = useState([{locationName: '', x: new Date(), y:0}])

    const [graphDataType, setGraphDataType] = useState('cases')

    useEffect(() => {
        if (props.locationType === 'country'){
            if(props.abbreviation in graphCountriesStore){
                setCurrentGraphData(graphCountriesStore[props.abbreviation])
            } else {
                axios.get(`http://localhost:5000/proxy/countries/cases/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const caseData = res.data.All.dates
                        const formattedDataCases = []
                        for(const date in caseData){
                            if(parseInt(date.slice(8))%3===0){
                                formattedDataCases.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: caseData[date]
                                })
                            }
                            
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
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.error(err)
                    })
                axios.get(`http://localhost:5000/proxy/countries/deaths/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const deathsData = res.data.All.dates
                        const formattedDataDeaths = []
                        for(const date in deathsData){
                            if (parseInt(date.slice(8))%3===0){
                                formattedDataDeaths.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: deathsData[date]
                                }) 
                            }
                            
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
                axios.get(`http://localhost:5000/proxy/states/specific/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const data = res.data
                        const formattedDataCases = []
                        const formattedDataDeaths = []
                        for( let i=0; i<data.length;i++){
                            const dateString = data[i].date.toString()
                            if (parseInt(dateString.slice(6))%3===0){
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
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            }
        }
    },[])

    useLayoutEffect(() => {
        setCurrentGraphData({
            cases:countryCasesData,
            deaths:countryDeathsData
        })
    }, [countryCasesData, countryDeathsData])

    const toggleClipBoard = () => {
        if(clipBoardStatus){
            setClipBoardStatus(false)
            setClipBoardButton('Compare')
        } else {
            setClipBoardStatus(true)
            setClipBoardButton('Back')
        }
    }

    const saveToClipBoard = () => {
        setClipBoardData(currentGraphData)
    }

    const changeDataType = (e) => {
        setGraphDataType(e.value)
    }

    //options array for select component
    const dataTypeOptions = [
        { value: 'cases', label: 'Cases' },
        { value: 'deaths', label: 'Deaths' }
    ]

    if(isLoading){
        return(
            <div className='loader'></div>
        )
    }

    if(graphDataType === 'cases'){
        if(!clipBoardStatus){
            return(
                <div className='graph-outer-container'>
                    <div className='top-row'>
                    <Select 
                        className='select'
                        options={dataTypeOptions}
                        onChange={changeDataType}
                        defaultValue={{ value: 'cases', label:'Cases' }}
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
                        <div className='button-container'>
                            <button onClick={saveToClipBoard}>Save</button>
                            <button onClick={toggleClipBoard}>{clipBoardButton}</button>
                        </div>
                    </div>
                    <GraphComponent data={{currentSet: currentGraphData.cases}}/>
                </div>
            )
        }

        return(
            <div className='graph-outer-container'>
                <div className='top-row'>
                <Select 
                        className='select'
                        options={dataTypeOptions}
                        onChange={changeDataType}
                        defaultValue={{ value: 'cases', label:'Cases' }}
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
                    <div className='button-container'>
                        <button onClick={toggleClipBoard}>{clipBoardButton}</button>
                    </div>
                </div>
                <GraphComponent data={{currentSet: currentGraphData.cases, comparisonSet: clipBoardData.cases}}/>
            </div>
        )
    } else if(graphDataType === 'deaths'){
        if(!clipBoardStatus){
            return(
                <div className='graph-outer-container'>
                    <div className='top-row'>
                    <Select 
                        className='select'
                        options={dataTypeOptions}
                        onChange={changeDataType}
                        defaultValue={{ value: 'cases', label:'Cases' }}
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
                        <div className='button-container'>
                            <button onClick={saveToClipBoard}>Save</button>
                            <button onClick={toggleClipBoard}>{clipBoardButton}</button>
                        </div>
                    </div>
                    
                    <GraphComponent data={{currentSet: currentGraphData.deaths}}/>
                </div>
            )
        }

        return(
            <div className='graph-outer-container'>
                <div className='top-row'>
                    <Select 
                        className='select'
                        options={dataTypeOptions}
                        onChange={changeDataType}
                        defaultValue={{ value: 'cases', label:'Cases' }}
                        isSearchable={false}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                            ...theme.colors,
                              primary25: '#daedee',
                              primary: '#40a0a0',
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
                    <div className='button-container'>
                        <button onClick={toggleClipBoard}>{clipBoardButton}</button>
                    </div>
                </div>
                
                <GraphComponent data={{currentSet: currentGraphData.deaths, comparisonSet: clipBoardData.deaths}}/>
            </div>
        )
    }

    
}

export default GraphContainer