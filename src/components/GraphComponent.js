import React from 'react'
import * as V from 'victory'
import { abbreviateNum } from '../utils/numModifiers'

const VictoryZoomVoronoiContainer = V.createContainer('zoom', 'voronoi')

const Graph = (props) => {

    const [orientationOne, setOrientationOne] = useState('top')
    const [orientationTwo, setOrientationTwo] = useState('bottom')

    return(
        <div className='chart-container'>
        <V.VictoryChart 
          width={800}
          height={350}
          padding={{left:50, bottom:60, right: 50}}
          theme={V.VictoryTheme.material}
          scale={{ x: 'time'}}
          minDomain={{y:0}}
          containerComponent={<VictoryZoomVoronoiContainer
            onActivated={(points, props) => {
              if (points[0].y > points[2].y){
                setOrientationOne('top')
                setOrientationTwo('bottom')
              } else {
                setOrientationOne('bottom')
                setOrientationTwo('top')
              }
            }}
            voronoiDimension = 'x'
            minimumZoom={{x:1000000000,y:200}}
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
              strokeDasharray: 0
            }
          }}
          tickFormat={abbreviateNum}
        />
        
        <V.VictoryGroup
          data={data.set1}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${datum.y}`}
          labelComponent={
            <V.VictoryTooltip
            flyoutStyle={{
              stroke:'4bc0c0',
                strokeWidth: '2',
              fill: 'black',
              fillOpacity: '0.7'
            }}
            style={{
              textAnchor: 'left',
              fontSize: 12,
              fill: 'lightgrey'
            }}
            orientation={orientationOne}
            pointerLength={0}
            constrainToVisibleArea
            />
          }
          style={{
            data:{ fill: '#4bc0c0'}
          }}
        >
          <V.VictoryLine
            style={{
              data:{ strokeWidth: 3 }
            }}
            interpolation='natural'
          />
          <V.VictoryScatter/>
        </V.VictoryGroup>

        <V.VictoryGroup
          data={data.set2}
          labels={({ datum }) => `${datum.x.getMonth() + 1}/${datum.x.getDate()}/${datum.x.getFullYear()}\n${datum.locationName}: ${datum.y}`}
          labelComponent={
            <V.VictoryTooltip
              flyoutStyle={{
                stroke:'ff6384',
                strokeWidth: '2',
                fill: 'black',
                fillOpacity: '0.7'
              }}
              style={{
                textAnchor: 'left',
                fontSize: 12,
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
          <V.VictoryScatter/>
        </V.VictoryGroup>
        
      </V.VictoryChart>
      </div>
    )
}

export default Graph