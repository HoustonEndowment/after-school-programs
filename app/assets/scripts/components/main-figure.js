'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import BarChart from './main-figure-bar-chart'
import BarChartHorizontal from './main-figure-bar-chart-horizontal'

const MainFigure = React.createClass({
  render: function () {
    return (
      <div className='main-figure'>
        <div className='main-figure-interior'>
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

            <hr className='section'/>
            <div className='grade-breakdown'>
              <h2 className='panel-subhead'>All Grade Levels</h2>
              <dl className='summary-stat'>
                <dt className='total-programs data-number'>5</dt>
                <dd className='data-description'> After-school programs</dd>
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

          <hr className='inner'/>

          <h2 className='panel-subhead'>Grades K-5</h2>
           <div className='barchart-total-horizontal'>
            <BarChartHorizontal
                students={45}
                studentPercent={90}
                slots={70}
                slotPercent={45}
                zipCode={'20001'}
              />
            </div>
          <hr className='inner'/>

          <h2 className='panel-subhead'>Grades 6-8</h2>
           <div className='barchart-total-horizontal'>
            <BarChartHorizontal
                students={45}
                studentPercent={90}
                slots={70}
                slotPercent={45}
                zipCode={'20001'}
              />
            </div>

          <hr className='inner'/>

          <h2 className='panel-subhead'>Grades 9-12</h2>
           <div className='barchart-total-horizontal'>
            <BarChartHorizontal
                students={45}
                studentPercent={90}
                slots={70}
                slotPercent={45}
                zipCode={'20001'}
              />
            </div>

          <hr className='inner'/>

          <h2 className='panel-subhead'>Grades K-12</h2>
           <div className='barchart-total-horizontal'>
            <BarChartHorizontal
                students={45}
                studentPercent={90}
                slots={70}
                slotPercent={45}
                zipCode={'20001'}
              />
            </div>
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
