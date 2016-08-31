import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import PointChart from './point-chart'
import MainFigure from './main-figure'

const Sidebar = React.createClass({
  propTypes: {
    selected: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },
  render: function () {
    return (
      <section className='sidebar'>
        {/* <PointChart /> */}
        <MainFigure />
      </section>
    )
  }
})

function mapStateToProps (state) {
  return {
    selected: state.selected
  }
}

export default connect(mapStateToProps)(Sidebar)
