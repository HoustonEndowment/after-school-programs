'use strict'

import React from 'react'

import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import config from './config'

const logger = createLogger({
  level: 'info',
  collapsed: true,
  predicate: (getState, action) => {
    return (config.environment !== 'production')
  }
})

// Reducer
import reducer from './reducer'
const store = createStore(reducer, applyMiddleware(logger))

// Components
import Map from './components/map'
import SideBar from './components/sidebar'

const App = React.createClass({
  render: function () {
    return (
      <div className='app'>
        <Map />
        <SideBar />
      </div>
    )
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('site-canvas')
)
