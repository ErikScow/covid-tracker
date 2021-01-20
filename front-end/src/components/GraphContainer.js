import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import { Context } from '../contexts/context'

import { convertStateName } from '../utils/stringModifiers'
import { statePopulationHash } from '../utils/data'

import GraphComponent from './GraphComponent'
import GraphComponentSmall from './GraphComponentSmall'
import GraphComponentLarge from './GraphComponentLarge'

const GraphContainer = (props) => {
    const [isLoading, setIsLoading] = useState(true)

    const { graphDataStates, graphDataCountries, clipBoard, clipBoardDaily } = useContext(Context)
    const [graphStatesStore, setGraphStatesStore] = graphDataStates
    const [graphCountriesStore, setGraphCountriesStore] = graphDataCountries
    const [clipBoardData, setClipBoardData] = clipBoard
    const [clipBoardDay, setClipBoardDay] = clipBoardDaily

    const [clipBoardButton, setClipBoardButton] = useState('Compare')
    const [clipBoardStatus, setClipBoardStatus] = useState(false)

    const [currentGraphData, setCurrentGraphData] = useState({
        'cases':[{locationName: '', x: new Date(), y:0}],
        'deaths': [{locationName: '', x: new Date(), y:0}],
        'casesPerMil': [{locationName: '', x: new Date(), y:0}],
        'deathsPerMil': [{locationName: '', x: new Date(), y:0}],
    })

    const [countryCasesData, setCountryCasesData] = useState([{locationName: '', x: new Date(), y:0}])
    const [countryDeathsData, setCountryDeathsData] = useState([{locationName: '', x: new Date(), y:0}])
    const [countryCasesPerMilData, setCountryCasesPerMilData] = useState([{locationName: '', x: new Date(), y:0}])
    const [countryDeathsPerMilData, setCountryDeathsPerMilData] = useState([{locationName: '', x: new Date(), y:0}])

    const [graphDataType, setGraphDataType] = useState('cases')

    useEffect(() => {
        if (props.locationType === 'country'){
            if(props.abbreviation in graphCountriesStore){
                setCurrentGraphData(graphCountriesStore[props.abbreviation])
                setIsLoading(false)
            } else {
                axios.get(`https://covid.erikscow.com/proxy/countries/cases/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const caseData = res.data.All.dates
                        const formattedDataCases = []
                        const formattedDataCasesPerMil = []
                        for(const date in caseData){
                            if(parseInt(date.slice(8))%3===0){
                                formattedDataCases.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: caseData[date]
                                })
                                formattedDataCasesPerMil.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: Math.floor((caseData[date]/res.data.All.population) * 1000000),
                                })
                            }
                            
                        }
                        setCountryCasesData(formattedDataCases)
                        setCountryCasesPerMilData(formattedDataCasesPerMil)
                        let countryData
                        if (props.abbreviation in graphCountriesStore){
                            let newGraphCountriesStore = graphCountriesStore
                            let item = newGraphCountriesStore[props.abbreviation]
                            item['cases'] = formattedDataCases
                            item['casesPerMil'] = formattedDataCasesPerMil
                            newGraphCountriesStore = {...newGraphCountriesStore, item}
                            setGraphCountriesStore(newGraphCountriesStore)
                        } else {
                            countryData = {'cases': formattedDataCases, 'casesPerMil': formattedDataCasesPerMil}
                            let newGraphCountriesStore = graphCountriesStore
                            newGraphCountriesStore[props.abbreviation] = countryData
                            setGraphCountriesStore(newGraphCountriesStore)
                        }
                        setIsLoading(false)
                    })
                    .catch(err => {
                        console.error(err)
                    })
                axios.get(`https://covid.erikscow.com/proxy/countries/deaths/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const deathsData = res.data.All.dates
                        const formattedDataDeaths = []
                        const formattedDataDeathsPerMil = []
                        for(const date in deathsData){
                            if (parseInt(date.slice(8))%3===0){
                                formattedDataDeaths.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: deathsData[date]
                                }) 
                                formattedDataDeathsPerMil.push({
                                    locationName: props.locationName,
                                    x: new Date(parseInt(date.slice(0,4)), parseInt(date.slice(5,7))-1, parseInt(date.slice(8))),
                                    y: Math.floor((deathsData[date]/res.data.All.population) * 1000000),
                                })
                            }
                            
                        }
                        setCountryDeathsData(formattedDataDeaths)
                        setCountryDeathsPerMilData(formattedDataDeathsPerMil)
                        let countryData
                        if (props.abbreviation in graphCountriesStore){
                            let newGraphCountriesStore = graphCountriesStore
                            let item = newGraphCountriesStore[props.abbreviation]
                            item['deaths'] = formattedDataDeaths
                            item['deathsPerMil'] = formattedDataDeathsPerMil
                            newGraphCountriesStore = {...newGraphCountriesStore, item}
                            setGraphCountriesStore(newGraphCountriesStore)
                        } else {
                            countryData = {'deaths': formattedDataDeaths, 'deathsPerMil': formattedDataDeathsPerMil}
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
                setIsLoading(false)
            } else {
                axios.get(`https://covid.erikscow.com/proxy/states/specific/?abbrev=${props.abbreviation}`)
                    .then(res => {
                        const data = res.data
                        const formattedDataCases = []
                        const formattedDataDeaths = []
                        const formattedDataCasesPerMil = []
                        const formattedDataDeathsPerMil = []
                        for( let i=0; i<data.length;i++){
                            const dateString = data[i].date.toString()
                            let statePopulation = statePopulationHash[`${data[i].state}`]
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
                                formattedDataCasesPerMil.push({
                                    locationName: convertStateName(data[i].state),
                                    x: new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(4,6))-1, parseInt(dateString.slice(6))),
                                    y: Math.floor((data[i].positive/statePopulation)*1000000)
                                })
                                formattedDataDeathsPerMil.push({
                                    locationName: convertStateName(data[i].state),
                                    x: new Date(parseInt(dateString.slice(0,4)), parseInt(dateString.slice(4,6))-1, parseInt(dateString.slice(6))),
                                    y: Math.floor((data[i].death/statePopulation)*1000000)
                                })
                            }
                            
                        }
                        setCurrentGraphData({
                            'cases': formattedDataCases,
                            'deaths': formattedDataDeaths,
                            'casesPerMil': formattedDataCasesPerMil,
                            'deathsPerMil': formattedDataDeathsPerMil,
                        })
                        let newGraphStatesStore = graphStatesStore
                        newGraphStatesStore[props.abbreviation] = {
                            'cases': formattedDataCases,
                            'deaths': formattedDataDeaths,
                            'casesPerMil': formattedDataCasesPerMil,
                            'deathsPerMil': formattedDataDeathsPerMil,
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
            'cases':countryCasesData,
            'deaths':countryDeathsData,
            'casesPerMil':countryCasesPerMilData,
            'deathsPerMil':countryDeathsPerMilData
        })
    }, [countryCasesData, countryDeathsData, countryCasesPerMilData, countryDeathsPerMilData])

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
        setClipBoardDay({
            locationName: props.locationName,
            totalCases: props.totalCases,
            totalDeaths: props.totalDeaths,
            casesPerMil: props.casesPerMil,
            deathsPerMil: props.deathsPerMil,
            deathRate: props.deathRate,
        })
    }

    const unsaveToClipBoard = () => {
        setClipBoardData({
            'cases':[{locationName: '', x: new Date(), y:0}],
            'deaths': [{locationName: '', x: new Date(), y:0}],
            'casesPerMil': [{locationName: '', x: new Date(), y:0}],
            'deathsPerMil': [{locationName: '', x: new Date(), y:0}],
            'deathRate': [{locationName: '', x: new Date(), y:0}],
          })
    }
 
    const changeDataType = (e) => {
        setGraphDataType(e.value)
    }

    //options array for select component
    const dataTypeOptions = [
        { value: 'cases', label: 'Cases' },
        { value: 'deaths', label: 'Deaths' },
        { value: 'casesPerMil', label: 'Cases/Mil' },
        { value: 'deathsPerMil', label: 'Deaths/Mil' }
    ]

    if(isLoading){
        return(
            <div className='loader'></div>
        )
    } 
    if (props.graphOwner === clipBoardData.cases[0].locationName){
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
                        
                        <button onClick={unsaveToClipBoard}>Unsave</button>
                        <p className='graph-saved-indicator'>Saved!</p>
                    </div>
                </div>
                <GraphComponent data={{currentSet: currentGraphData[graphDataType]}}/>
                <GraphComponentSmall data={{currentSet: currentGraphData[graphDataType]}}/>
                <GraphComponentLarge data={{currentSet: currentGraphData[graphDataType]}}/>
            </div>
        )
    } else if(clipBoardData.cases[0].locationName === '') {
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
                    </div>
                </div>
                <GraphComponent data={{currentSet: currentGraphData[graphDataType]}}/>
                <GraphComponentSmall data={{currentSet: currentGraphData[graphDataType]}}/>
                <GraphComponentLarge data={{currentSet: currentGraphData[graphDataType]}}/>
            </div>
        )
    } else if(!clipBoardStatus){
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
                    <GraphComponent data={{currentSet: currentGraphData[graphDataType]}}/>
                    <GraphComponentSmall data={{currentSet: currentGraphData[graphDataType]}}/>
                    <GraphComponentLarge data={{currentSet: currentGraphData[graphDataType]}}/>
                </div>
            )
        }

        return(
            <div className='graph-outer-container'>
                <div className='items-container comparison-row'>
                    <p className='name-item'>{clipBoardDay.locationName}</p>
                    <div className='other-items'>
                        <p className='row-item'>{clipBoardDay.totalCases}</p>
                        <p className='row-item'>{clipBoardDay.totalDeaths}</p>
                        <p className='row-item'>{clipBoardDay.casesPerMil}</p>
                        <p className='row-item'>{clipBoardDay.deathsPerMil}</p>
                        <p className='row-item'>{clipBoardDay.deathRate}%</p>
                    </div>
                    
                </div>
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
                <GraphComponent data={{currentSet: currentGraphData[graphDataType], comparisonSet: clipBoardData[graphDataType]}}/>
                <GraphComponentSmall data={{currentSet: currentGraphData[graphDataType], comparisonSet: clipBoardData[graphDataType]}}/>
                <GraphComponentLarge data={{currentSet: currentGraphData[graphDataType], comparisonSet: clipBoardData[graphDataType]}}/>
            </div>
        )
    

    
}

export default GraphContainer