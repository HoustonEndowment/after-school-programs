import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'

import { chartOptions } from '../constants'

import { updateHovered, updateSelected } from '../actions'

const PointChart = React.createClass({
  propTypes: {
    mapData: React.PropTypes.object,
    hovered: React.PropTypes.string,
    selected: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },

  componentDidMount: function () {
    this.metrics = this.props.mapData.features.map((feat) => feat.properties)

    let highestSlots = 0
    let highestStudents = 0

    const chartData = { datasets:
      this.metrics.map((metrics) => {
        const totalSlots = metrics.total_slots
        const totalStudents = metrics.total_students

        if (totalSlots > highestSlots) highestSlots = totalSlots
        if (totalStudents > highestStudents) highestStudents = totalStudents

        return {
          label: metrics.zip_code,
          data: [{x: totalSlots, y: totalStudents, r: 5}],
          hoverRadius: 0,
          backgroundColor: 'rgba(222,122,0,0.7)',
          hoverBackgroundColor: 'rgba(222,122,0,0.7)'
        }
      })
    }

    chartOptions.hover.onHover = this._onChartHover
    chartOptions.onClick = this._onChartClick
    chartOptions.scales.xAxes[0].ticks.max = Math.ceil(highestSlots / 500) * 500
    chartOptions.scales.yAxes[0].ticks.max = Math.ceil(highestStudents / 500) * 500

    this.chart = new Chart(document.getElementById('chart'), {
      type: 'bubble',
      data: chartData,
      options: chartOptions
    })
  },

  componentWillReceiveProps: function (nextProps) {
    const zipCode = nextProps.hovered
    if (zipCode.length) {
      this._highlightChart(zipCode)
    } else {
      this._unhighlightChart()
    }
  },

  _highlightChart: function (zipCode) {
    this.chart.config.data.datasets.forEach((element) => {
      if (element.label === zipCode) {
        element.data[0].r = 9
      } else {
        element.data[0].r = 5
      }
      this.chart.update()
    })
  },

  _unhighlightChart: function () {
    this.chart.config.data.datasets.forEach((element) => {
      element.data[0].r = 5
      this.chart.update()
    })
  },

  _onChartHover: function (context) {
    if (context.length) {
      const hoveredZip = this.metrics[context[0]._datasetIndex].zip_code
      this.chart.update()
      this.props.dispatch(updateHovered(hoveredZip))
    } else {
      this.props.dispatch(updateHovered(''))
    }
  },

  _onChartClick: function (event) {
    const context = this.chart.getElementAtEvent(event)
    if (context[0]) {
      const selectedZip = this.metrics[context[0]._datasetIndex].zip_code
      this.props.dispatch(updateSelected(selectedZip))
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
        <h1 className='zipcode-title-chart'>Supply and Demand By Zipcode</h1>
        <div id='chart-container'>
          <canvas id='chart' height='600px'></canvas>
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    mapData: state.mapData,
    hovered: state.hovered,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(PointChart)
