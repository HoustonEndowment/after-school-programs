'use strict'

import React from 'react'
import { connect } from 'react-redux'

import { totalStudents, totalSlots } from '../utils'
import { updateSelected } from '../actions'

import LinePlot from './main-figure-line-plot'

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

    const mainFigureCharts = (zipCode !== 'NaN')
      ? (
        <div>
          <div className='grade-breakdown'>
            <h2 className='panel-subhead'>All Grade Levels</h2>
            <div className='barchart-total-horizontal'>
              <LinePlot
                students={studentsTotal}
                studentPercent={totalStudentPercent}
                slots={slotsTotal}
                slotPercent={totalSlotPercent}
                zipCode={zipCode}
                highValTotal={highValTotal}
              />
            </div>
          </div>
          <hr className='inner'/>
          <div className='grade-breakdown'>
            <h2 className='panel-subhead'>Grades K-5</h2>
            <div className='barchart-total-horizontal'>
            <LinePlot
              students={studentsKTo5}
              studentPercent={studentsKTo5 / highVal * 100}
              slots={slotsKTo5}
              slotPercent={slotsKTo5 / highVal * 100}
              zipCode={zipCode}
              highValTotal={highValTotal}
              />
            </div>
          </div>
          <hr className='inner'/>
          <div className='grade-breakdown'>
            <h2 className='panel-subhead'>Grades 6-8</h2>
            <div className='barchart-total-horizontal'>
            <LinePlot
              students={students6To8}
              studentPercent={students6To8 / highVal * 100}
              slots={slots6To8}
              slotPercent={slots6To8 / highVal * 100}
              zipCode={zipCode}
              highValTotal={highValTotal}
              />
            </div>
          </div>
          <hr className='inner'/>
          <div className='grade-breakdown'>
            <h2 className='panel-subhead'>Grades 9-12</h2>
            <div className='barchart-total-horizontal'>
            <LinePlot
              students={students9To12}
              studentPercent={students9To12 / highVal * 100}
              slots={slots9To12}
              slotPercent={slots9To12 / highVal * 100}
              zipCode={zipCode}
              highValTotal={highValTotal}
              />
            </div>
          </div>
          <hr className='inner'/>
          <div className='grade-breakdown'>
            <h2 className='panel-subhead'>Grades K-12</h2>
            <div className='barchart-total-horizontal'>
            <LinePlot
              students={studentsKTo12}
              studentPercent={studentsKTo12 / highVal * 100}
              slots={slotsKTo12}
              slotPercent={slotsKTo12 / highVal * 100}
              zipCode={zipCode}
              highValTotal={highValTotal}
              />
            </div>
          </div>
        </div>
      )
      : <p className='error-text'>There are no after school programs in {zipCode}</p>

    return (
      <div className='main-figure'>
        <div className='main-figure-interior'>
          <div className='back-link' onClick={this._deselectZip}>
            <span>Close Zipcode Details</span>
          </div>
            <h1 className='zipcode-title'>
              Supply and Demand for {zipProps.zip_code}
            </h1>
            <a className='secondary-link' href='#footer'>See below for full definitions of these terms</a>
            <section className='main-stats'>
              <dl className='dl-horizontal'>
                <dt className='fam-below-poverty data-number'>
                  {zipProps['families_below_poverty(percentage)']}%
                </dt>
                <dd className='data-description'>Families Below Poverty</dd>
              </dl>
              <dl className='dl-horizontal'>
                <dt className='total-programs data-number'>{zipProps.total_programs}</dt>
                <dd className='data-description'>Out-of-School Time Programs</dd>
              </dl>
              <hr className='inner'/>
              <dl className='dl-horizontal'>
                <dt className='med-income data-number'>{'$' + zipProps.median_income.toLocaleString()}</dt>
                <dd className='data-description'>Median Income</dd>
              </dl>
              <dl className='dl-horizontal'>
                <dt className='school-aged-children data-number'>
                  {zipProps.schoolage_children.toLocaleString()}
                </dt>
                <dd className='data-description'>Total School-Aged Children</dd>
              </dl>
              <hr className='inner'/>
              <dl className='dl-horizontal'>
                <dt className='dropout-factories data-number'>
                  {zipProps.dropout_factories}
                </dt>
                <dd className='data-description'>Dropout Factories</dd>
              </dl>
              <dl className='dl-horizontal'>
                <dt className='feeder-schools data-number'>
                  {zipProps.feeder_schools}
                </dt>
                <dd className='data-description'>Feeder Schools</dd>
              </dl>
              <hr className='inner'/>
              <dl className='dl-horizontal stat-full'>
                <dt className='total-funding data-number'>{'$' + zipProps.total_funding.toLocaleString()}</dt>
                <dd className='data-description'>total funding for programs</dd>
              </dl>
              <dl className='dl-horizontal stat-full'>
                <dt className='public-transit data-number'>{zipProps['public_transport_distance(#ofroutesavailablewithin1/2amile)']}</dt>
                <dd className='data-description'>Public transportation routes available within 0.5 mile radius </dd>
              </dl>
            </section>
          <hr className='section'/>
          <h2 className='secondary-title'>
              Gap Between Eligible Students and Available Program Slots
          </h2>
          {mainFigureCharts}
          <hr className='inner'/>
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
