const express = require('express');
const cors = require('cors')
const axios = require('axios');

let countriesCache = {}
let countriesHistoricalCasesCache = {}
let countriesHistoricalDeathsCache = {}
let statesCache = {}
let statesHistoricalCache = {}

let myVar = 10;

function scheduleReset() {
    // get current time
    let reset = new Date();
    // update the Hours, mins, secs to the 24th hour (which is when the next day starts)
    reset.setHours(24, 0, 0, 0);
    // calc amount of time until restart
    let t = reset.getTime() - Date.now();
    setTimeout(function() {
        // reset variable
        countriesCache = {}
        countriesHistoricalCasesCache = {}
        countriesHistoricalDeathsCache = {}
        statesCache = {}
        statesHistoricalCache = {}
        // schedule the next variable reset
        scheduleReset();
    }, t);
}

scheduleReset();

const app = express();

app.use(cors());

app.get('/countries', (req, res) => {
    if (countriesCache.data !== undefined){
        res.send(JSON.stringify(countriesCache.data))

    } else {
        axios.get('https://covid-api.mmediagroup.fr/v1/cases')

            .then(response => {
                countriesCache = response
                res.send(JSON.stringify(response.data))
            })
            .catch(err => {
                console.log('error', err)
            })
    }
    
});

app.get(`/countries/cases/`, (req, res) => {
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

app.get(`/countries/deaths/`, (req, res) => {
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

app.get(`/states`, (req, res) => {
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

app.get(`/states/specific`, (req, res) => {
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
