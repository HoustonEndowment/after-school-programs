import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import {updateHovered, updateSelected} from '../actions'

const Map = React.createClass({
  propTypes: {
    hovered: React.PropTypes.string,
    selected: React.PropTypes.string,
    dispatch: React.PropTypes.func
  },
  componentDidMount: function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmJ1bWJhcmciLCJhIjoiWG1NN1BlYyJ9.nbifRhdBcN1K-mdtwwi0eQ'
    const map = window.mapGL = this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/basic-v9',
      center: [-95.295, 29.953],
      zoom: 8,
      minZoom: 2
    })
    map.on('load', () => {
      const inactiveScale = [[0, '#c0c0c0'], [200000, '#c0c0c0']]
      const hoverScale = [[0, '#808080'], [200000, '#808080']]
      const activeScale = [[0, '#ff0000'], [200000, '#ff0000']]

      this._addData('districts', inactiveScale, ['!=', 'DISTRICT', ''])
      this._addData('districts-hover', hoverScale, ['==', 'DISTRICT', ''])
      this._addData('districts-active', activeScale, ['==', 'DISTRICT', ''])
      map.on('mousemove', this._mouseMove)
      map.on('click', this._mapClick)
    })
  },

  _addData (id, scale, filter) {
    this._map.addSource(id, {
      type: 'vector',
      url: 'mapbox://nbumbarg.9aw3gowo'
    })
    this._map.addLayer({
      'id': id,
      'type': 'fill',
      'source': id,
      'source-layer': 'SCHOOL_DISTRICT-1i1tkc',
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

    const source = this._map.querySourceFeatures('districts', {
      sourceLayer: 'SCHOOL_DISTRICT-1i1tkc'
    })
    console.log(source)

    const rendered = this._map.queryRenderedFeatures({
      layers: ['districts']
    })
    console.log(rendered)
  },

  shouldComponentUpdate: function () {
    return false
  },

  _mapClick: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['districts', 'districts-hover'] })
    if (features.length) {
      this._map.setFilter('districts-active', ['==', 'DISTRICT', features[0].properties['DISTRICT']])
      this.props.dispatch(updateSelected(String(features[0].properties['DISTRICT'])))
    } else {
      this._map.setFilter('districts-active', ['==', 'DISTRICT', ''])
      this.props.dispatch(updateSelected(null))
    }
  },

  _mouseMove: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['districts', 'districts-hover'] })
    if (features.length) {
      this._map.setFilter('districts-hover', ['==', 'DISTRICT', features[0].properties['DISTRICT']])
      this.props.dispatch(updateHovered(features[0].properties['DISTRICT']))
    } else {
      this._map.setFilter('districts-hover', ['==', 'DISTRICT', ''])
      this.props.dispatch(updateHovered(null))
    }
  },

  render: function () {
    return <div id='map' className='map' />
  }

})

function mapStateToProps (state) {
  return {
    hovered: state.hovered,
    selected: state.selected
  }
}

export default connect(mapStateToProps)(Map)
