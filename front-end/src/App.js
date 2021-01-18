import React, { useState, useEffect } from 'react'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'

import { Context } from './contexts/context'

import { convertStateName } from './utils/stringModifiers'
import { statePopulationHash } from './utils/data'

import Nav from './components/Nav'
import ContentContainer from './components/ContentContainer'
import AboutContainer from './components/AboutContainer'

function App() {

  const [continentsData, setContinentsData] = useState([])
  const [countriesData, setCountriesData] = useState([])
  const [statesData, setStatesData] = useState([])

  const [graphDataStates, setGraphDataStates] = useState([])
  const [graphDataCountries, setGraphDataCountries] = useState([])
  const [clipBoard, setClipBoard] = useState({
    'cases':[{locationName: '', x: new Date(), y:0}],
    'deaths': [{locationName: '', x: new Date(), y:0}],
    'casesPerMil': [{locationName: '', x: new Date(), y:0}],
    'deathsPerMil': [{locationName: '', x: new Date(), y:0}],
    'deathRate': [{locationName: '', x: new Date(), y:0}],
  })
  const [clipBoardDaily, setClipBoardDaily] = useState({
    locationName: '',
    totalCases: '',
    totalDeaths: '',
    casesPerMil: '',
    deathsPerMil: '',
    deathRate: '',
  })

  const [currentLocationType, setCurrentLocationType] = useState('countries')
  const [filterString, setFilterString] = useState('')
  const [sortMethod, setSortMethod] = useState(['low-high','alphabetical'])

  useEffect(() => {

    axios.get(`https://covid.erikscow.com/proxy/countries`)
      .then(res => {
        const data = res.data
        const formattedData = []
        for(const country in data){
          if (country.length > 20 || country === "Global" || !data[country].All.abbreviation || !data[country].All.population){
            continue
          }
          
          let nameString = country
          if (country === 'US'){
            nameString = 'United States'
          }
          formattedData.push(
            {
              locationName: nameString,
              locationType: 'country',
              totalCases: data[country].All.confirmed,
              totalDeaths: data[country].All.deaths,
              population: data[country].All.population,
              casesPerMil: (data[country].All.confirmed / data[country].All.population) * 1000000,
              deathsPerMil: (data[country].All.deaths / data[country].All.population) * 1000000,
              deathRate: ((data[country].All.deaths/data[country].All.confirmed)*100).toFixed(2),
              abbreviation: data[country].All.abbreviation
            }
          )
        }
        setCountriesData(formattedData)
      })
      .catch(err => {
        console.error(err)
      })
    
    axios.get('https://covid.erikscow.com/proxy/states')
      .then(res => {
        const data = res.data
        const formattedData = []
        for( let i=0; i<data.length; i++ ){
          const willNotBeSaved = (data[i].state === 'GU' || data[i].state === 'PR' || data[i].state === 'MP' || data[i].state === 'AS' || data[i].state === 'DC' || data[i].state === 'VI')
          if(willNotBeSaved){
            continue
          }
          let statePopulation = statePopulationHash[`${data[i].state}`]
          formattedData.push(
            {
              locationName: convertStateName(data[i].state),
              locationType: 'state',
              totalCases: data[i].positive,
              totalDeaths: data[i].death,
              population: statePopulation,
              casesPerMil: (data[i].positive/statePopulation)*1000000,
              deathsPerMil: (data[i].death/statePopulation)*1000000,
              deathRate:((data[i].death/data[i].positive)*100).toFixed(2),
              abbreviation: data[i].state.toLowerCase()
            }
          )
        }
        setStatesData(formattedData)
      })
      .catch(err => {
        console.error(err)
      })
      
  },[])

  

  return (
    <Router>
      <Context.Provider value={{
        continentsData: [continentsData, setContinentsData],
        countriesData: [countriesData, setCountriesData],
        statesData: [statesData, setStatesData],
        graphDataStates: [graphDataStates, setGraphDataStates],
        graphDataCountries: [graphDataCountries, setGraphDataCountries],
        clipBoard: [clipBoard, setClipBoard],
        clipBoardDaily: [clipBoardDaily, setClipBoardDaily],
        currentLocationType: [currentLocationType, setCurrentLocationType],
        filterString: [filterString, setFilterString],
        sortMethod: [sortMethod, setSortMethod],
      }}>
        <div className="App">
          <Nav/>
          <Switch>
            <Route exact path='/' component={ContentContainer}/>
            <Route path='/about' component={AboutContainer}/>
          </Switch>
          
        </div>
      </Context.Provider>
    </Router>
    
  );
}

export default App;
