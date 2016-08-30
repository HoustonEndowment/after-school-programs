'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import Top from './main-figure-top'

const MainFigure = React.createClass({
  render: function () {
    return (
      <div className='main-figure'>
        <div className='main-figure-interior'>
          <Top />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {
    selected: state.selected
  }
}

export default connect(mapStateToProps)(MainFigure)
