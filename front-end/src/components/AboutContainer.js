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
                    For states, any data regarding population is calculated using population data from 2019 census. For countries, any data regarding population is calculated using population data provided by the API. This includes Cases/M (cases per million), Deaths/M (deaths per million). These two categories may be more useful than raw data to compare locations' ability to contain the virus, simply becuase it takes into account population.
                </p>
                <h3>Death Percentage</h3>
                <p>
                    The Death% represents the amount of deaths as a percentage of the amount of cases. It is <span>not</span> representative of the number of deaths as a percentage of population. This metric may be useful to compare locations' ability at tending to COVID patients.
                </p>
                <h2>About this Project</h2>
                <h3>Purpose</h3>
                <p>
                    This application was developed by me, Erik Scow. I decided to work on this project because I wanted a covid appliction that was capable of simply and easily comparing data between different entities. Eventually I decided to do this in a graph, which allows a user to compare any entity's historical data with another's.
                </p>
                <h3>Technologies Used</h3>
                <p>
                    This app was built using React. React Context API was used for state management. VictoryJS was used for graphs. React-Select was used for styled select elements. The afore mentioned third party API's were used as a data source. 
                </p>
                <h3>Challenges</h3>
                <p>
                    The biggest challenges of this project were finding API's that provided the historical data I was looking for, and learning to use VictoryJS. From both of these tasks I learned how to approach development challenges in new ways, ranging from solving complex bugs that few if anyone before me has had to deal with, to communicating with the developers of the API to attempt to solve issues.
                </p>
                <h2>Future Improvements</h2>
                <h3>More Locations</h3>
                <p>
                    Eventually, I would like to add the ability to see more location types, such as US counties, provinces/states for other countries, and other territories. To do so I would need to find new API's for those location types that support historical data on cases and deaths. If you know of such API's please contact me.
                </p>
                <h3>Better Graph Interface</h3>
                <p>
                    The interface on the graph isn't bad, in my humble opinion, but I do think it could be better in terms of it's design and presentation. I am not a designer, and hence I don't know how I can improve this further. If you have any insights or ideas, please contact me.
                </p>
            </div>
            
        </div>
        
    )
}

export default AboutContainer