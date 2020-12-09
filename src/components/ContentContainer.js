import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../contexts/context'

import {
    abbreviateNum,
    commafyNum,
  } from '../utils/numModifiers'

import SideControlls from './SideControlls'
import DataComponent from './DataComponent'

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
        console.log(filterStr)
        const filteredData = dataSet.filter(location => {
            return location.locationName.toLowerCase().includes(filterStr.toLowerCase())
        })
        console.log(filteredData)
        setSearched(filteredData)
    }, [filterStr])
    
    useEffect(() => {
        console.log('useeffect reached')
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
            console.log('state set')
        }
        if(sort[0] === 'high-low'){
            setSearched(searched.reverse())
        }
        
    },[sort])

    useEffect(() => {
        console.log(sort)
    },[sort])

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