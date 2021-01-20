import React from 'react'

const AboutContainer = () => {
    return(
        <div>
            <div className='about'>
                <h2>About this Data</h2>
                <h3>Cases and Deaths</h3>
                <p>
                    Some of the data shown in this application is sourced from various API's, while some is calculated from the sourced data. As of 1/10/2021, data regarding cases, deaths, and population for countries is sourced from this API: <span><a href="https://github.com/M-Media-Group/Covid-19-API">https://github.com/M-Media-Group/Covid-19-API</a></span>, and data regarding cases and deaths for states is sourced from this API: <span><a href='https://covidtracking.com/data/api'>https://covidtracking.com/data/api</a></span>
                </p>
                <h3>Cases/M and Deaths/M</h3>
                <p>
                    For states, any data regarding population is calculated using population data from 2019 census. For countries, any data regarding population is calculated using population data provided by the API. Categories using population data include Cases/M (cases per million), Deaths/M (deaths per million). These two categories may be more useful than raw data to compare locations' ability to contain the virus, simply becuase it takes into account population.
                </p>
                <h3>Death Percentage</h3>
                <p>
                    The Death% represents the amount of deaths as a percentage of the amount of cases. It is <span>not</span> representative of the number of deaths as a percentage of population. This metric may be useful to compare locations' ability at tending to COVID patients.
                </p>
                <h2>About this Project</h2>
                <h3>Purpose</h3>
                <p>
                    The inspiration for this project came when I was unable to find an application to simply and easily compare data between two locations. I decided that I wanted to view historical data with the ability to compare aspects like cases, as well as being able to compare aspects factoring in population size of a location with categories like cases per million. While there are many applications displaying covid data, this one is particularly unique in its ability to compare data so effectively.
                </p>
                <h3>Technologies Used</h3>
                <h4>
                    Front End</h4>
                    <p>The front end of this project is pretty straight forward. It retrieves data and displays it using React, while a few other libraries are used for neat presentation.</p>
                    <ul>
                        <li>React</li>
                        <li>SCSS</li>
                        <li>Victory JS (chart library)</li>
                        <li>react-relect (pre styled select components)</li>
                    </ul>
                
                <h4>
                    Back End</h4>
                    <p>The back end of this project is here primarily as a proxy server to deal with CORS errors when retrieving data from the third party API's. It also caches data as request are made, serving cached data when available rather than make another request to the data API. The cache is reset once a day using node-schedule.</p>
                    <ul>
                        <li>Node</li>
                        <li>Express</li>
                        <li>node-schedule</li>
                    </ul>
                
                <h3>Challenges</h3>
                <h4>API Issues</h4>
                <p>
                    Before this project, I knew how to use a data API to retrieve and use data, but during the course of this project I gained a much deeper understanding of the topic and some of the best practices involved. The first issue I ran across was a CORS issue from one of the API's, not allowing me to call data from the front end. I communicated with the API developer on what I should do about this, and eventually settled on adding a simple back end to the project that would serve as a proxy to all my requests. As per the API developer's request I also implemented caching on the proxy server to prevent too many requests to their API.
                </p>
                <h4>Learning New Tech</h4>
                <p>
                    One of the challenges that I learned the most from was adapting to new technologies and libraries used in the project. I decided to use a charting library called Victory JS, which ended up being more difficult to implement than I was expecting. I learned the value of reading documentation closesly to truly understand a library. I also expanded my bug solving skills by dealing with issues that few if anyone before me has had to face, ranging from unexplanable crashes with no error messages to poor graph performance.
                </p>
                <h2>Future Improvements</h2>
                <h3>More Locations</h3>
                <p>
                    The biggest improvement I want to make is adding more locations, such as US counties and provinces/states/territories of other countries. The biggest challenge for implementing this is finding reliable API's that provide such data.
                </p>
                <h3>Better Interface</h3>
                <p>
                    My role is a web developer, not a designer, so I am unfortunately not trained in web design techniques and best practices. While I have certainly done my best to make this application look and feel professional, one of my biggest areas of improvement for this project and as a developer is in design.
                </p>
            </div>
            
        </div>
        
    )
}

export default AboutContainer