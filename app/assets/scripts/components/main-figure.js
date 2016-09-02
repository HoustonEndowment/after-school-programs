'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { totalStudents, totalSlots } from '../utils'
import { updateSelected } from '../actions'

import BarChart from './main-figure-bar-chart'
import BarChartHorizontal from './main-figure-bar-chart-horizontal'

const MainFigure = React.createClass({
  propTypes: {
    selected: React.PropTypes.string,
    mapData: React.PropTypes.object,
    dispatch: React.PropTypes.func
  },
  _getHighestValue: (zipProps) => {
    let values = [zipProps.students_gradeKto5, zipProps.students_grade6to8,
                  zipProps.students_grade9to12, zipProps.students_gradeKto12,
                  zipProps.slots_gradeKto5, zipProps.slots_grade6to8,
                  zipProps.slots_grade9to12, zipProps.slots_gradeKto12]
    return Math.max.apply(null, values.map((value) => parseInt(value)))
  },

  _deselectZip: function () {
    this.props.dispatch(updateSelected(''))
  },

  render: function () {
    const zipCode = this.props.selected
    const zipProps = this.props.mapData.features.find((feature) => {
      return feature.properties.zip_code === zipCode
    }).properties
    const highVal = this._getHighestValue(zipProps)
    const studentsTotal = totalStudents(zipProps)
    const slotsTotal = totalSlots(zipProps)
    const studentsKTo5 = zipProps.students_gradeKto5
    const slotsKTo5 = zipProps.slots_gradeKto5
    const students6To8 = zipProps.students_grade6to8
    const slots6To8 = zipProps.slots_grade6to8
    const students9To12 = zipProps.students_grade9to12
    const slots9To12 = zipProps.slots_grade9to12
    const studentsKTo12 = zipProps.students_gradeKto12
    const slotsKTo12 = zipProps.slots_gradeKto12
    const highValTotal = Math.max(studentsTotal, slotsTotal)

    let totalStudentPercent = studentsTotal / highValTotal * 100
    let totalSlotPercent = studentsTotal / highValTotal * 100
    totalStudentPercent = (isNaN(totalStudentPercent)) ? 0 : totalStudentPercent
    totalSlotPercent = (isNaN(totalSlotPercent)) ? 0 : totalSlotPercent

    this.props.mapData.features.forEach((f) => {
      const zipProps = f.properties
      const zip = zipProps.zip_code
      const studentsTotal = totalStudents(zipProps)
      const slotsTotal = totalSlots(zipProps)
      const highVal = this._getHighestValue(zipProps)
      let totalStudentPercent = studentsTotal / highValTotal * 100
      let totalSlotPercent = studentsTotal / highValTotal * 100
      totalStudentPercent = (isNaN(totalStudentPercent)) ? 0 : totalStudentPercent
      totalSlotPercent = (isNaN(totalSlotPercent)) ? 0 : totalSlotPercent

      console.log(`ZIP Code: ${zip}: ${studentsTotal/slotsTotal*100}`)




    })

    const mainFigureCharts = (zipCode !== '77373')
      ? (
        <div>
          <hr className='inner'/>
          <h2 className='panel-subhead'>Grades K-5</h2>
          <div className='barchart-total-horizontal'>
          <BarChartHorizontal
            students={studentsKTo5}
            studentPercent={studentsKTo5 / highVal * 100}
            slots={slotsKTo5}
            slotPercent={slotsKTo5 / highVal * 100}
            zipCode={zipCode}
            />
          </div>
          <hr className='inner'/>
          <h2 className='panel-subhead'>Grades 6-8</h2>
          <div className='barchart-total-horizontal'>
          <BarChartHorizontal
            students={students6To8}
            studentPercent={students6To8 / highVal * 100}
            slots={slots6To8}
            slotPercent={slots6To8 / highVal * 100}
            zipCode={zipCode}
            />
          </div>
          <hr className='inner'/>
          <h2 className='panel-subhead'>Grades 9-12</h2>
          <div className='barchart-total-horizontal'>
          <BarChartHorizontal
            students={students9To12}
            studentPercent={students9To12 / highVal * 100}
            slots={slots9To12}
            slotPercent={slots9To12 / highVal * 100}
            zipCode={zipCode}
            />
          </div>
          <hr className='inner'/>
          <h2 className='panel-subhead'>Grades K-12</h2>
          <div className='barchart-total-horizontal'>
          <BarChartHorizontal
            students={studentsKTo12}
            studentPercent={studentsKTo12 / highVal * 100}
            slots={slotsKTo12}
            slotPercent={slotsKTo12 / highVal * 100}
            zipCode={zipCode}
            />
          </div>
        </div>
      )
      : 'No Dice!'

    return (
      <div className='main-figure'>
        <div className='main-figure-interior'>
          <div className='back-link' onClick={this._deselectZip}>
            <span>Back to All Areas</span>
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
            <hr className='section'/>
            <div className='grade-breakdown'>
              <h2 className='panel-subhead'>All Grade Levels</h2>
              <dl className='summary-stat'>
                <dt className='total-programs data-number'>5</dt>
                <dd className='data-description'>After-school programs</dd>
              </dl>
              <div className='barchart-total'>
                <BarChart
                  students={studentsTotal}
                  studentPercent={totalStudentPercent}
                  slots={slotsTotal}
                  slotPercent={totalSlotPercent}
                  zipCode={zipCode}
                />
              </div>
            </div>
          {mainFigureCharts}
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
