import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import PointChart from './point-chart'
import Legend from './legend'

const Sidebar = React.createClass({
  propTypes: {
    selected: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },
  render: function () {
    return (
      <section className='sidebar'>
        <Legend />
        <PointChart data={this.props.selected}/>
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
