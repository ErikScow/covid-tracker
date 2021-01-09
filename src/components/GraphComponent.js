import React, { useState } from 'react'
import * as V from 'victory'
import { abbreviateNum, commafyNum as commafy } from '../utils/numModifiers'

const Graph = ({data}) => { 
    console.log(data)

    const [orientationOne, setOrientationOne] = useState('top')
    const [orientationTwo, setOrientationTwo] = useState('bottom')

    const determineOrientation = (points, props) => {
      if (points.length ===2){
        if (points[0].y > points[1].y){
        setOrientationOne('top')
        setOrientationTwo('bottom')
        } else {
          setOrientationOne('bottom')
          setOrientationTwo('top')
        }
      }
      
    }

    if (!data.comparisonSet){
      return(
        <div className='chart-container'>
        <V.VictoryChart 
          width={800}
          height={350}
          padding={{left:62, bottom:60, right: 5}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<V.VictoryVoronoiContainer
            voronoiDimension = "x"
            activateData={false}
          />}
          
        >

        <V.VictoryAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15,
              padding: 3,
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickLabelComponent={<V.VictoryLabel
            angle={-45}
            transform= 'translate(-20 15)'
          />}
        />

        <V.VictoryAxis
          dependentAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15, 
              padding: 3
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickFormat={abbreviateNum}
        />
         
        <V.VictoryGroup
          data={data.currentSet}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
            flyoutStyle={{
              stroke:'#4bc0c0',
              strokeWidth: '2',
              fill: 'black',
              fillOpacity: '0.7'
            }}
            flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
            style={{
              textAnchor: 'start',
              fontSize: 15,
              fill: 'lightgrey'
            }}
            orientation={'bottom'}
            pointerLength={0}
            constrainToVisibleArea
            />
          }
          style={{
            data:{ fill: '#40a0a0'}
          }}
        >
          <V.VictoryLine
            style={{
              data:{ strokeWidth: 3 }
            }}
            interpolation='natural'
          />
        </V.VictoryGroup>
        
      </V.VictoryChart>
      </div>
    )
    }

    return(
        <div className='chart-container'>
        <V.VictoryChart 
          width={800}
          height={350}
          padding={{left:62, bottom:60, right: 5}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<V.VictoryVoronoiContainer
            onActivated={determineOrientation}
            voronoiDimension = "x"
            activateData={false}
          />}
          
        >

        
        
        <V.VictoryGroup
          data={data.currentSet}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
            flyoutStyle={{
              stroke: '#4bc0c0',
              strokeWidth: '2',
              fill: 'black',
              fillOpacity: '0.7'
            }}
            flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
            style={{
              textAnchor: 'start',
              fontSize: 15,
              fill: 'lightgrey'
            }}
            orientation={orientationOne}
            pointerLength={0}
            constrainToVisibleArea
            />
          }
          style={{
            data:{ fill: '#40a0a0'}
          }}
        >
          <V.VictoryLine
            style={{
              data:{ strokeWidth: 3 }
            }}
            interpolation='natural'
          />
        </V.VictoryGroup>

        <V.VictoryGroup
          data={data.comparisonSet}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
              flyoutStyle={{
                stroke:'#ff6384',
                strokeWidth: '2',
                fill: 'black',
                fillOpacity: '0.7'
              }}
              flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
              style={{
                textAnchor: 'start',
                fontSize: 15,
                fill: 'lightgrey'
              }}
              orientation={orientationTwo}
              pointerLength={0}
              constrainToVisibleArea
            />
          }
          style={{
            data:{ fill: '#ff6384'}
          }}
        >
          <V.VictoryLine
            style={{
              data:{ strokeWidth: 3 }
            }}
            interpolation='natural'
          />
        </V.VictoryGroup>

        <V.VictoryAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15,
              padding: 3,
            },
            grid: {
              stroke:0,
              strokeDasharray:0
            }
          }}
          tickLabelComponent={<V.VictoryLabel
            angle={-45}
            transform= 'translate(-20 15)'
          />}
        />

        <V.VictoryAxis
          dependentAxis
          tickCount={8}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 15, 
              padding: 3
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickFormat={abbreviateNum}
        />
        
      </V.VictoryChart>
      </div>
    )
}

export default Graph