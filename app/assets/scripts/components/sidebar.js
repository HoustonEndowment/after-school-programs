import React from 'react'
import { connect } from 'react-redux'

import { } from '../actions'

const Sidebar = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func
  },
  render: function () {
    return (
      <section className='sidebar'></section>
    )
  }
})

function mapStateToProps (state) {
  return {

  }
}

export default connect(mapStateToProps)(Sidebar)
