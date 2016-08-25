import React from 'react'
import chroma from 'chroma-js'

const scale = chroma.scale(['#F2F2F2', '#686868'])

export default function () {
  return (
    <div className='legend'>
      <div className='legend-title'>
        <h3>Supply and Demand Index</h3>
        <h4>This index combines xxx, xxx, xxx, xxx and xxx.</h4>
      </div>
      <div className='legend-scale'>
      <ul className='legend-labels'>
        <li><span style={{background: scale(0.2).hex()}}></span>
          <span style={{marginTop: '6px'}}>less need</span>
        </li>
        <li><span style={{background: scale(0.4).hex()}}></span></li>
        <li><span style={{background: scale(0.6).hex()}}></span></li>
        <li><span style={{background: scale(0.8).hex()}}></span></li>
        <li><span style={{background: scale(1).hex()}}></span>
          <span style={{marginTop: '6px'}}>more need</span>
        </li>
      </ul>
      </div>
    </div>
  )
}