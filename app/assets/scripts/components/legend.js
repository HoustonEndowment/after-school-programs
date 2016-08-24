import React from 'react'

export default function () {
  return (
    <div className='legend'>
      <div className='legend-title'>Supply and Demand Index</div>
      <div className='legend-scale'>
      <ul className='legend-labels'>
        <li><span style={{background: '#F1EEF6'}}></span>less need</li>
        <li><span style={{background: '#BDC9E1'}}></span></li>
        <li><span style={{background: '#74A9CF'}}></span></li>
        <li><span style={{background: '#2B8CBE'}}></span></li>
        <li><span style={{background: '#045A8D'}}></span>more need</li>
      </ul>
      </div>
    </div>
  )
}
