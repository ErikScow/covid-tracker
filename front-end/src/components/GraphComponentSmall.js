import React, { useState } from 'react'
import * as V from 'victory'
import { abbreviateNum, commafyNum as commafy } from '../utils/numModifiers'

const VictoryVoronoiCursorContainer = V.createContainer('voronoi', 'cursor')

const Graph = ({data}) => { 

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
        <div className='chart-container small'>
        <V.VictoryChart 
          width={800}
          height={420}
          padding={{left:100, bottom:60, right: 5}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<VictoryVoronoiCursorContainer
            cursorDimension = "x"
            voronoiDimension = "x"
            activateData={false}
            style={{
              touchAction: 'auto'
            }}
            cursorComponent={<V.LineSegment style={{stroke: '#ccc'}}/>}
          />}
          
        >

        <V.VictoryAxis
          tickCount={6}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 25,
              padding: 3,
            },
            grid: {
              stroke: 0,
              strokeDasharray: 0
            }
          }}
          tickFormat={date => date.toLocaleString('en-us', { month:'short' })}
        />

        <V.VictoryAxis
          dependentAxis
          tickCount={6}
          style={{
            ticks:{
              size: 15
            },
            tickLabels:{
              fontSize: 25, 
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
            x={150}
            y={0}
            flyoutStyle={{
              stroke: 'none',
              strokeWidth: '2',
              fill: 'white',
              fillOpacity: '0.7'
            }}
            flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
            style={[{
              textAnchor: 'start',
              fontSize: 25,
              fill: '#445a64'
            },{
              textAnchor: 'start',
              fontSize: 25,
              fill: '#40a0a0'
            }]}
            orientation='right'
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
            interpolation='linear'
          />
        </V.VictoryGroup>
        
      </V.VictoryChart>
      </div>
    )
    }

    return(
        <div className='chart-container small'>
        <V.VictoryChart 
          width={800}
          height={420}
          padding={{left:100, bottom:60, right: 5}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<VictoryVoronoiCursorContainer
            cursorDimension = "x"
            voronoiDimension = "x"
            activateData={false}
            style={{
              touchAction: 'auto'
            }}
            cursorComponent={<V.LineSegment style={{stroke: '#ccc'}}/>}
          />}
          
        >

        
        
        <V.VictoryGroup
          data={data.currentSet}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
            x={150}
            y={0}
            flyoutStyle={{
              stroke: 'none',
              strokeWidth: '2',
              fill: 'white',
              fillOpacity: '0.7'
            }}
            flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
            style={[{
              textAnchor: 'start',
              fontSize: 25,
              fill: '#445a64'
            },{
              textAnchor: 'start',
              fontSize: 25,
              fill: '#40a0a0'
            }]}
            orientation='right'
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
            interpolation='linear'
          />
        </V.VictoryGroup>

        <V.VictoryGroup
          data={data.comparisonSet}
          labels={({ datum }) => `${datum.locationName}: ${commafy(datum.y)}`}
          labelComponent={
            <V.VictoryTooltip
              x={150}
              y={70}
              flyoutStyle={{
                stroke:'none',
                strokeWidth: '2',
                fill: 'none',
                fillOpacity: '0.7'
              }}
              flyoutPadding={{top:5, bottom:5, left:5, right: 5}}
              style={{
                textAnchor: 'start',
                fontSize: 25,
                fill: '#ff6384'
              }}
              orientation='right'
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
            interpolation='linear'
          />
        </V.VictoryGroup>

        <V.VictoryAxis
          tickCount={6}
          style={{
            ticks:{
              size: 15
            },
            tickLabels:{
              fontSize: 25,
              padding: 3,
            },
            grid: {
              stroke:0,
              strokeDasharray:0
            }
          }}
          tickFormat={date => date.toLocaleString('en-us', { month:'short' })}
        />

        <V.VictoryAxis
          dependentAxis
          tickCount={6}
          style={{
            ticks:{
              size: 10
            },
            tickLabels:{
              fontSize: 25, 
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