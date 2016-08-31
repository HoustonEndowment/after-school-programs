import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import PointChart from './point-chart'
import MainFigure from './main-figure'

const SideBar = React.createClass({
  propTypes: {
    selected: React.PropTypes.string,
    mapData: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },
  render: function () {
    const selected = this.props.selected
    if (selected.length) {
      return (
        <section className='sidebar'>
          <MainFigure
            selected={this.props.selected}
            mapData={this.props.mapData}
          />
        </section>
      )
    }
    return (
      <section className='sidebar'>
        <PointChart />
      </section>
    )
  }
})

function mapStateToProps (state) {
  return {
    selected: state.selected
  }
}

export default connect(mapStateToProps)(SideBar)
