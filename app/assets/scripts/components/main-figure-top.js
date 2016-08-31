'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import BarChart from './main-figure-bar-chart'

const MainFigure = React.createClass({
  render: function () {
    return (
      <div className='main-figure-top'>
        <div className='back-link'>
          <a href='#'>Back to All Areas</a>
        </div>
        <div className='zipcode'>129410</div>
        <div className='med-income'>
          <span className='small-text'>Median Income:</span>
          <span className='bold-text'>$23,901</span>
        </div>
        <div className='fam-below-poverty'>
          <span className='small-text'>Families Below Poverty:</span>
          <span className='bold-text'>452,192</span>
        </div>
        <div className='school-aged-children'>
          <span className='small-text'>Total School Aged Children:</span>
          <span className='bold-text'>12,192</span>
        </div>
        <div className='dropout-factories'>
          <span className='small-text'>Dropout Factories:</span>
          <span className='bold-text'>5</span>
        </div>
        <div className='feeder-schools'>
          <span className='small-text'>Feeder Schools:</span>
          <span className='bold-text'>5</span>
        </div>
        <div className='after-school-programs'>
          <span className='title'>After School Programs</span>
          <div className='program-count'>
            <span className='bold-text'>34</span>
            <span className='small-text'>programs</span>
          </div>
          <div className='barchart-total'>
            <BarChart
              students={45}
              studentPercent={90}
              slots={70}
              slotPercent={45}
              zipCode={'20001'}
            />
          </div>
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
