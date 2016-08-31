'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

import BarChart from './main-figure-bar-chart'

const MainFigure = React.createClass({
  _getHighestValue: (zipProps) => {
    let values = [zipProps.students_gradeKto5, zipProps.students_grade6to8,
                  zipProps.students_grade9to12, zipProps.slots_gradeKto5,
                  zipProps.slots_grade6to8, zipProps.slots_grade9to12]
    return Math.max.apply(null, values.map((value) => parseInt(value)))
  },

  render: function () {
    const zipCode = this.props.selected
    const zipProps = this.props.mapData.features.find((feature) => {
      return feature.properties.zip_code === zipCode
    }).properties
    console.log(zipProps)
    const highVal = this._getHighestValue(zipProps)
    const studentsKTo5 = zipProps.students_gradeKto5
    const slotsKTo5 = zipProps.slots_gradeKto5
    console.log
    return (
      <div className='main-figure'>
        <div className='main-figure-interior'>
        <div className='main-figure-top'>
          <div className='back-link'>
            <a href='#'>Back to All Areas</a>
          </div>
            <h1 className='zipcode-title'>
              Supply and demand for {zipProps.zip_code}
            </h1>
            <dl className='dl-horizontal'>
              <dt className='med-income data-number'>$??,???</dt>
              <dd className='data-description'>Median Income</dd>
            </dl>
            <dl className='summary-stat'>
              <dt className='fam-below-poverty data-number'>
                {zipProps['families_below_poverty (percentage)']}%
              </dt>
              <dd className='data-description'>Families Below Poverty</dd>
            </dl>
            <dl className='summary-stat'>
              <dt className='school-aged-children data-number'>
                {zipProps.schoolage_children.toLocaleString()}
              </dt>
              <dd className='data-description'>Total School Aged Children</dd>
            </dl>
            <dl className='summary-stat'>
              <dt className='dropout-factories data-number'>
                {zipProps.dropout_factories}
              </dt>
              <dd className='data-description'>Dropout Factories</dd>
            </dl>
            <dl className='summary-stat'>
              <dt className='feeder-schools data-number'>
                {zipProps.feeder_schools}
              </dt>
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
            <div className='barchart-kto5'>
              <BarChart
                students={studentsKTo5}
                studentPercent={studentsKTo5 / highVal * 100}
                slots={slotsKTo5}
                slotPercent={slotsKTo5 / highVal * 100}
                zipCode={zipCode}
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
    selected: state.selected,
    mapData: state.mapData
  }
}

export default connect(mapStateToProps)(MainFigure)
