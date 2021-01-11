import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/context'

import {
    abbreviateNum,
    commafyNum,
  } from '../utils/numModifiers'

import SideControlls from './SideControlls'
import DataComponent from './DataComponent'
import TipComponent from './TipComponent'

const ContentContainer = (props) => {
    

    const { countriesData, statesData, currentLocationType, filterString, sortMethod } = useContext(Context)
    const [countries, setCountries] = countriesData
    const [states, setStates] = statesData

    //modifiers for display data (controlled by SideControlls.js)
    const [locationType, setLocationType] = currentLocationType
    const [filterStr, setFilterStr] = filterString
    const [sort, setSort] = sortMethod

    //modified data to display
    const [dataSet, setDataSet] = useState(countries)
    const [searched, setSearched] = useState(dataSet)
    const [sorted, setSorted] = useState(dataSet)

    const [graphOpen, setGraphOpen] = useState(false)
    const [graphOwner, setGraphOwner] = useState('')

    useEffect(() => {
        setSearched(dataSet)
    }, [dataSet])
    

    useEffect(() => {
        if (locationType === 'countries'){
            setDataSet(countries)
        } else {
            setDataSet(states)
        }
    }, [locationType, countries, states])


    useEffect(() => {
        const filteredData = dataSet.filter(location => {
            return location.locationName.toLowerCase().includes(filterStr.toLowerCase())
        })
        setSearched(filteredData)
    }, [filterStr])
    
    useEffect(() => {
        if(sort[1] === 'alphabetical'){
            setSearched(searched.sort((a, b) => {
                return a.locationName.localeCompare(b.locationName)
            }))
        }
        if(sort[1] === 'cases'){
            setSearched(searched.sort((a, b) => {
                return a.totalCases - b.totalCases
            }))
        }
        if(sort[1] === 'deaths'){
            setSearched(searched.sort((a, b) => {
                return a.totalDeaths - b.totalDeaths
            }))
        }
        if(sort[1] === 'cases/mil'){
            setSearched(searched.sort((a, b) => {
                return a.casesPerMil - b.casesPerMil
            }))
        }
        if(sort[1] === 'deaths/mil'){
            setSearched(searched.sort((a, b) => {
                return a.deathsPerMil - b.deathsPerMil
            }))
        }
        if(sort[1] === 'deathRate'){
            setSearched(searched.sort((a, b) => {
                return a.deathRate - b.deathRate
            }))
        }
        if(sort[0] === 'high-low'){
            setSearched(searched.reverse())
        }
        
    },[sort])

    return(
        <div className='content-container'>
            <div className='supplementary-content'>
                <SideControlls/>
                <TipComponent/> 
            </div>
            
            <div className='outer-container labels'>
                <div className='items-container column-labels'>
                    <p className='name-item'>Location</p>
                    <div className='other-items'>
                        <p className='row-item'>Cases</p>
                        <p className='row-item'>Deaths</p>
                        <p className='row-item'>Cases/M</p>
                        <p className='row-item'>Deaths/M</p>
                        <p className='row-item'>Death%</p>
                    </div>
                </div>
            </div>
                
            
            {searched.map((location,index) => {
                if (graphOwner === location.locationName){
                    return <DataComponent 
                        key={location.locationName} 
                        locationName={location.locationName} 
                        locationType={location.locationType}
                        totalCases={commafyNum(location.totalCases)}
                        totalDeaths={commafyNum(location.totalDeaths)}
                        casesPerMil={abbreviateNum(location.casesPerMil)}
                        deathsPerMil={abbreviateNum(location.deathsPerMil)}
                        deathRate={location.deathRate}
                        abbreviation={location.abbreviation}
                        graphOpen={graphOpen}
                        setGraphOpen={setGraphOpen}
                        setGraphOwner={setGraphOwner}
                        />
                }
                return <DataComponent 
                key={location.locationName} 
                locationName={location.locationName} 
                locationType={location.locationType}
                totalCases={commafyNum(location.totalCases)}
                totalDeaths={commafyNum(location.totalDeaths)}
                casesPerMil={abbreviateNum(location.casesPerMil)}
                deathsPerMil={abbreviateNum(location.deathsPerMil)}
                deathRate={location.deathRate}
                abbreviation={location.abbreviation}
                graphOpen={false}
                setGraphOpen={setGraphOpen}
                setGraphOwner={setGraphOwner}
                />
                
            })}
        </div>
    )
}

export default ContentContainer