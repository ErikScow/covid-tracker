import React, { useState, useEffect } from 'react'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'

import { Context } from './contexts/context'

import {
  abbreviateNum,
  commafyNum,
  removePlus
} from './utils/numModifiers'
import {
  convertStateName
} from './utils/stringModifiers'

import Nav from './components/Nav'
import ContentContainer from './components/ContentContainer'
import AboutContainer from './components/AboutContainer'

function App() {

  const [continentsData, setContinentsData] = useState([])
  const [countriesData, setCountriesData] = useState([])
  const [statesData, setStatesData] = useState([])

  const [graphData, setGraphData] = useState([])
  const [clipBoard, setClipBoard] = useState([])

  const [currentLocationType, setCurrentLocationType] = useState('countries')

  useEffect(() => {

    axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/cases`)
      .then(res => {
        const data = res.data
        const formattedData = []
        console.log(res)
        for(const country in data){
          formattedData.push(
            {
              locationName: data[country].All.country,
              totalCases: commafyNum(data[country].All.confirmed),
              totalDeaths: commafyNum(data[country].All.deaths),
              population: data[country].All.population,
              casesPerMil: 
            }
          )
        }
        for( let i=0; i<data.length; i++ ){
          const willNotBeSaved = (data[i].country === 'All' || data[i].country === 'Diamond-Princess-' || data[i].country === 'North-America' || data[i].country === 'Europe' || data[i].country === 'South-America' || data[i].country === 'Africa' || data[i].country === 'Asia')
          if(willNotBeSaved){
            continue
          }
          formattedData.push(
            {
              locationName: data[i].country,
              totalCases: commafyNum(data[i].cases.total),
              totalDeaths: commafyNum(data[i].deaths.total),
              newCases: removePlus(data[i].cases.new),
              newDeaths: removePlus(data[i].deaths.new)
            }
          )
        }
        setCountriesData(formattedData)
      })
      .catch(err => {
        console.error(err)
      })
    
    axios.get('https://api.covidtracking.com/v1/states/current.json')
      .then(res => {
        const data = res.data
        const formattedData = []
        console.log(res)
        for( let i=0; i<data.length; i++ ){
          const willNotBeSaved = (data[i].state === 'GU' || data[i].state === 'PR' || data[i].state === 'MP' || data[i].state === 'AS' || data[i].state === 'DC' || data[i].state === 'VI')
          if(willNotBeSaved){
            continue
          }
          formattedData.push(
            {
              locationName: convertStateName(data[i].state),
              totalCases: commafyNum(data[i].positive),
              totalDeaths: commafyNum(data[i].death),
              newCases: commafyNum(data[i].positiveIncrease),
              newDeaths: commafyNum(data[i].deathIncrease)

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
        graphData: [graphData, setGraphData],
        clipBoard: [clipBoard, setClipBoard],
        currentLocationType: [currentLocationType, setCurrentLocationType],
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
