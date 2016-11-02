import React from 'react'

export default function () {
  return (
    <div className='header-container'>
      <div className='header'>
        <div className='header-copy'>
          <h1>Mapping Need for Out-of-School Time Programs in Harris County</h1>
          <p>This tool assesses the degree of need for out-of-school time programs in nine select neighborhoods across Harris County. In displaying the varying resources and socioeconomic factors across these zip codes, we hope that this map guides the Houston out-of-school time community to effectively allocate funds to support its highest-need youth.</p>
          <div className='share-container'>
          <p className='share'>Share</p>
            <div className='share-icons'>
            <a href='https://twitter.com/home?status=Mapping%20Need%20for%20Out-of-School%20Time%20Programs%20in%20Harris%20County%3A%20http%3A//houstonendowment.org' target='_blank'><span className='collecticon collecticon-twitter'></span></a>
            <a href='https://facebook.com/'><span className='collecticon collecticon-facebook'></span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
