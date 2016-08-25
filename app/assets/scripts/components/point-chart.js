import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'

import { } from '../actions'

const PointChart = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },

  componentDidMount: function () {
    const chartOptions = {
      hover: {
        onHover: this.onChartHover
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Supply and Demand by Zipcode',
        fontSize: 16,
        padding: 40,
        fullWidth: true
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            max: 50,
            fontColor: 'rgb(175,175,0175)'
          },
          gridLines: {
            color: 'rgb(151, 151, 151)',
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 35,
            fontColor: 'rgb(175,175,0175)'
          },
          gridLines: {
            color: 'rgb(151, 151, 151)',
            display: false
          }
        }]
      }
    }

    const chartData = {
      datasets: [
        {
          data: [
            {
              x: 21,
              y: 7,
              r: 10
            }
          ],
          hoverRadius: 4,
          borderColor: 'rgb(151, 151, 151)',
          backgroundColor: 'rgb(216, 216, 216)',
          hoverBackgroundColor: 'rgb(151, 191, 238)'
        },
        {
          data: [
            {
              x: 15,
              y: 14,
              r: 10
            }
          ],
          hoverRadius: 4,
          borderColor: 'rgb(151, 151, 151)',
          backgroundColor: 'rgb(216, 216, 216)',
          hoverBackgroundColor: 'rgb(151, 191, 238)'
        },
        {
          data: [
            {
              x: 40,
              y: 24,
              r: 10
            }
          ],
          hoverRadius: 4,
          borderColor: 'rgb(151, 151, 151)',
          backgroundColor: 'rgb(216, 216, 216)',
          hoverBackgroundColor: 'rgb(151, 191, 238)'
        }]
    }

    this.chart = new Chart(document.getElementById('chart'), {
      type: 'bubble',
      data: chartData,
      options: chartOptions
    })
  },

  componentWillReceiveProps: function (nextProps) {
    this.chart.config.data.datasets[0].backgroundColor = 'rgb(151, 191, 238)'
    this.chart.update()
  },

  onChartHover: function (context) {
    if (context.length) {
      console.log('Hovering over chart item #' + context[0]._datasetIndex)
    }
  },

  render: function () {
    return (
      <div id='main-chart-container'>
        <div className='chart-students-label'>
          Students
        </div>
        <div className='chart-slots-label'>
          Available Slots in Programs
        </div>
        <div id='chart-container'>
          <canvas id='chart'></canvas>
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    hovered: state.hovered,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(PointChart)
