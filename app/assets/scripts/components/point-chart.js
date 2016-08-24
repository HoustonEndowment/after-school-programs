import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'

import { } from '../actions'

const PointChart = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },

  componentDidMount: function () {
    var data = {
      datasets: [
        {
          data: [
            {
              x: 20,
              y: 30,
              r: 10
            }
          ],
          backgroundColor: '#FF6384',
          hoverBackgroundColor: '#FF6384'
        },
        {
          data: [
            {
              x: 40,
              y: 10,
              r: 10
            }
          ],
          backgroundColor: '#00ff00',
          hoverBackgroundColor: '#00ff00'
        }]
    }

    var options = {
      elements: {
        points: {
          borderWidth: 1,
          borderColor: 'rgb(0, 0, 0)'
        }
      },
      legend: {
        display: false
      }
    }

    const ctx = document.getElementById('chart')

    this.myBubbleChart = new Chart(ctx, {
      type: 'bubble',
      data: data,
      options: options
    })
  },

  componentWillReceiveProps: function (nextProps) {
    this.myBubbleChart.config.data.datasets[0].backgroundColor = 'yellow'
    this.myBubbleChart.update()
  },

  render: function () {
    return (
      <canvas id='chart' height='275'></canvas>
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
