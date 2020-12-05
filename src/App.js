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

  const [graphDataStates, setGraphDataStates] = useState([])
  const [graphDataCountries, setGraphDataCountries] = useState([])
  const [clipBoard, setClipBoard] = useState({})

  const [currentLocationType, setCurrentLocationType] = useState('countries')

  useEffect(() => {

    axios.get(`https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/cases`)
      .then(res => {
        const data = res.data
        const formattedData = []
        console.log(res)
        for(const country in data){
          if (country.length > 20 || country === "Global" || !data[country].All.abbreviation || !data[country].All.population){
            continue
          }
          formattedData.push(
            {
              locationName: country,
              locationType: 'country',
              totalCases: commafyNum(data[country].All.confirmed),
              totalDeaths: commafyNum(data[country].All.deaths),
              population: data[country].All.population,
              casesPerMil: abbreviateNum((data[country].All.confirmed / data[country].All.population) * 1000000),
              deathsPerMil: abbreviateNum((data[country].All.deaths / data[country].All.population) * 1000000),
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
    
    axios.get('https://api.covidtracking.com/v1/states/current.json')
      .then(res => {
        const data = res.data
        const statePopulationHash = {
          'AL': 4903185,
          'AK': 731545,
          'AS': 55312,
          'AZ': 7278717,
          'AR': 3017804,
          'CA': 39512223,
          'CO': 5758736,
          'CT': 3565287,
          'DE': 973764,
          'DC': 705749,
          'FM': 104929,
          'FL': 21477737,
          'GA': 10617423,
          'GU': 167294,
          'HI': 1415872,
          'ID': 1787065,
          'IL': 12671821,
          'IN': 6732219,
          'IA': 3155070,
          'KS': 2913314,
          'KY': 4467673,
          'LA': 4648794,
          'ME': 1344212,
          'MH': 58791,
          'MD': 6045680,
          'MA': 6892503,
          'MI': 9986857,
          'MN': 5639632,
          'MS': 2976149,
          'MO': 6137428,
          'MT': 1068778,
          'NE': 1934408,
          'NV': 3080156,
          'NH': 1359711,
          'NJ': 8882190,
          'NM': 2096829,
          'NY': 19453561,
          'NC': 10488084,
          'ND': 762062,
          'MP': 51994,
          'OH': 11689100,
          'OK': 3956971,
          'OR': 4217737,
          'PW': 18008,
          'PA': 12801989,
          'PR': 3193694,
          'RI': 1059361,
          'SC': 5148714,
          'SD': 884659,
          'TN': 6829174,
          'TX': 28995881,
          'UT': 3205958,
          'VT': 623989,
          'VI': 104578,
          'VA': 8535519,
          'WA': 7614893,
          'WV': 1792147,
          'WI': 5822434,
          'WY': 578759
          }
        const formattedData = []
        console.log(res)
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
              totalCases: commafyNum(data[i].positive),
              totalDeaths: commafyNum(data[i].death),
              population: statePopulation,
              casesPerMil: abbreviateNum((data[i].positive/statePopulation)*1000000),
              deathsPerMil: abbreviateNum((data[i].death/statePopulation)*1000000),
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
