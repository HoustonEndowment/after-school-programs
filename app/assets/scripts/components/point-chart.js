import React from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js'

import { chartOptions } from '../constants'

import { updateHovered } from '../actions'

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
        const totalSlots = metrics.slots_gradeKto5 +
              metrics.slots_grade6to8 +
              metrics.slots_grade9to12 +
              metrics.slots_gradeKto12
        const totalStudents = metrics.students_gradeKto5 +
              metrics.students_grade6to8 +
              metrics.students_grade9to12 +
              metrics.students_gradeKto12

        if (totalSlots > highestSlots) highestSlots = totalSlots
        if (totalStudents > highestStudents) highestStudents = totalStudents

        return {
          label: metrics.zip_code,
          data: [{x: totalSlots, y: totalStudents, r: 10}],
          hoverRadius: 4,
          borderColor: 'rgb(151, 151, 151)',
          backgroundColor: 'rgb(216, 216, 216)',
          hoverBackgroundColor: 'rgb(151, 191, 238)'
        }
      })
    }

    chartOptions.hover.onHover = this.onChartHover
    chartOptions.scales.xAxes[0].ticks.max = Math.ceil(highestSlots / 500) * 500
    chartOptions.scales.yAxes[0].ticks.max = Math.ceil(highestStudents / 500) * 500

    this.chart = new Chart(document.getElementById('chart'), {
      type: 'bubble',
      data: chartData,
      options: chartOptions
    })
  },

  componentWillReceiveProps: function (nextProps) {

  },

  onChartHover: function (context) {
    if (context.length) {
      const hoveredZip = this.metrics[context[0]._datasetIndex].zip_code
      this.props.dispatch(updateHovered(hoveredZip))
    } else {
      this.props.dispatch(updateHovered(''))
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
    mapData: state.mapData,
    hovered: state.hovered,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(PointChart)
