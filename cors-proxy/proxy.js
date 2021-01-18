const express = require('express');
const cors = require('cors')
const axios = require('axios');
const schedule = require('node-schedule')

let countriesCache = {}
let countriesHistoricalCasesCache = {}
let countriesHistoricalDeathsCache = {}
let statesCache = {}
let statesHistoricalCache = {}

const globalResetJob = schedule.scheduleJob('30 0 * * *', () => {
    countriesCache = {}
    countriesHistoricalCasesCache = {}
    countriesHistoricalDeathsCache = {}
    statesCache = {}
    statesHistoricalCache = {}
  })

globalResetJob();

const app = express();

app.use(cors());

app.get('/proxy/countries', (req, res) => {
    if (countriesCache.data !== undefined){
        console.log('sending cache')
        res.send(JSON.stringify(countriesCache.data))

    } else {
        axios.get('https://covid-api.mmediagroup.fr/v1/cases')

            .then(response => {
                console.log('fetching')
                countriesCache = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                console.log('error', err)
            })
    }
    
});

app.get(`/proxy/countries/cases/`, (req, res) => {
    if (req.query.abbrev in countriesHistoricalCasesCache){
        res.send(JSON.stringify(countriesHistoricalCasesCache[req.query.abbrev].data))
    } else {
        axios.get(`https://covid-api.mmediagroup.fr/v1/history?ab=${req.query.abbrev}&status=Confirmed`)
            .then(response => {
                countriesHistoricalCasesCache[req.query.abbrev] = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                res.json({ error: err })
            }) 
    }
})

app.get(`/proxy/countries/deaths/`, (req, res) => {
    if (req.query.abbrev in countriesHistoricalDeathsCache){

        res.send(JSON.stringify(countriesHistoricalDeathsCache[req.query.abbrev].data))
    } else {
        axios.get(`https://covid-api.mmediagroup.fr/v1/history?ab=${req.query.abbrev}&status=Deaths`)
            .then(response => {
                countriesHistoricalDeathsCache[req.query.abbrev] = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                res.json({ error: err })
            })
    }
})

app.get(`/proxy/states`, (req, res) => {
    if (statesCache.data !== undefined){
        res.send(JSON.stringify(statesCache.data))
    } else {
        axios.get(`https://api.covidtracking.com/v1/states/current.json`)
            .then(response => {
                statesCache = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                res.json({ error: err })
            })
    } 
})

app.get(`/proxy/states/specific`, (req, res) => {
    if (req.query.abbrev in statesHistoricalCache){
        res.send(JSON.stringify(statesHistoricalCache[req.query.abbrev].data))
    } else {
        axios.get(`https://api.covidtracking.com/v1/states/${req.query.abbrev}/daily.json`)
            .then(response => {
                statesHistoricalCache[req.query.abbrev] = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                res.json({ error: err })
            })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
