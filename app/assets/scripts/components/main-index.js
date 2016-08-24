import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

const SupplyDemandIndex = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },
  render: function () {
    return (
      <div id='supply-demand-index'>
        Supply and Demand Index
      </div>
    )
  }
})

function mapStateToProps (state) {
  return {

  }
}

export default connect(mapStateToProps)(SupplyDemandIndex)
