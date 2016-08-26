import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {updateHovered, updateSelected} from '../actions'

const Map = React.createClass({
  propTypes: {
    mapData: React.PropTypes.object,
    hovered: React.PropTypes.string,
    selected: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },
  componentDidMount: function () {
    this.mapData = this.props.mapData
    mapboxgl.accessToken = 'pk.eyJ1IjoibmJ1bWJhcmciLCJhIjoiWG1NN1BlYyJ9.nbifRhdBcN1K-mdtwwi0eQ'
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-95.295, 29.953],
      zoom: 9,
      minZoom: 2
    })
    map.on('load', () => {
      const inactiveScale = [[0, '#c0c0c0'], [200000, '#c0c0c0']]
      const hoverScale = [[0, '#808080'], [200000, '#808080']]
      const activeScale = [[0, '#ff0000'], [200000, '#ff0000']]

      this._addData('zipCodes', inactiveScale, ['!=', 'zip_code', ''])
      this._addData('zipCodes-hover', hoverScale, ['==', 'zip_code', ''])
      this._addData('zipCodes-active', activeScale, ['==', 'zip_code', ''])
      map.on('mousemove', this._mouseMove)
      map.on('click', this._mapClick)
    })
  },

  _addData (id, scale, filter) {
    this._map.addSource(id, {
      type: 'geojson',
      data: this.props.mapData
    })

    this._map.addLayer({
      'id': id,
      'type': 'fill',
      'source': id,
      'interactive': true,
      'maxzoom': 18,
      'filter': filter,
      'paint': {
        'fill-color': {
          'property': 'cap',
          'stops': scale
        },
        'fill-opacity': 1,
        'fill-outline-color': 'white'
      }
    })
  },

  shouldComponentUpdate: function () {
    return false
  },

  _mapClick: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    if (features.length) {
      this._map.setFilter('zipCodes-active', ['==', 'zip_code', features[0].properties['zip_code']])
      this.props.dispatch(updateSelected(String(features[0].properties['zip_code'])))
    } else {
      this._map.setFilter('zipCodes-active', ['==', 'zip_code', ''])
      this.props.dispatch(updateSelected(null))
    }
  },

  _mouseMove: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    console.log(features)
    if (features.length) {
      this._map.setFilter('zipCodes-hover', ['==', 'zip_code', features[0].properties['zip_code']])
      this.props.dispatch(updateHovered(features[0].properties['zip_code']))
    } else {
      this._map.setFilter('zipCodes-hover', ['==', 'zip_code', ''])
      this.props.dispatch(updateHovered(null))
    }
  },

  render: function () {
    return <div id='map' className='map' />
  }

})

function mapStateToProps (state) {
  return {
    mapData: state.mapData,
    hovered: state.hovered,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(Map)
