import React, { useState, useEffect } from 'react'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import axios from 'axios'

import { Context } from './contexts/context'

function App() {

  const [continentsData, setContinentsData] = useState({})
  const [countriesData, setCountriesData] = useState({})
  const [statesData, setStatesData] = useState({})

  const [graphData, setGraphData] = useState({})
  const [clipBoard, setClipBoard] = useState({})

  useEffect(() => {
    axios.get('https://cors-anywhere.herokuapp.com/https://covid-api.mmediagroup.fr/v1/cases')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.error(err)
      })
    axios.get('https://api.covidtracking.com/v1/states/current.json')
      .then(res => {
        console.log(res)
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
      }}>
        <div className="App">
        
        </div>
      </Context.Provider>
    </Router>
    
  );
}

export default App;
