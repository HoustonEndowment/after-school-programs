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
          <h1 className='zipcode-title'>Supply and demand for 700819</h1>
          <dl className='dl-horizontal'>
            <dt className='med-income data-number'>$23,901</dt>
            <dd className='data-description'>Median Income</dd>
          </dl>
          <dl className='summary-stat'>
            <dt className='fam-below-poverty data-number'>452,192</dt>
            <dd className='data-description'>Families Below Poverty</dd>
          </dl>
          <dl className='summary-stat'>
            <dt className='school-aged-children data-number'>12,192</dt>
            <dd className='data-description'>Total School Aged Children</dd>
          </dl>
          <dl className='summary-stat'>
            <dt className='dropout-factories data-number'>5</dt>
            <dd className='data-description'>Dropout Factories</dd>
          </dl>
          <dl className='summary-stat'>
            <dt className='feeder-schools data-number'>5</dt>
            <dd className='data-description'>Feeder Schools</dd>
          </dl>
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
    )
  }
})

function mapStateToProps (state) {
  return {
    selected: state.selected
  }
}

export default connect(mapStateToProps)(MainFigure)
