import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import centerpoint from 'turf-center'

import Legend from './legend'

import { updateHovered, updateSelected } from '../actions'

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
      style: 'mapbox://styles/mapbox/dark-v9',
      center: centerpoint(this.mapData).geometry.coordinates,
      zoom: 9.5,
      minZoom: 2,
      scrollZoom: false
    })

    this._map.addControl(new mapboxgl.Navigation())
    this._popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

    map.on('load', () => {
      const inactiveScale = [[0, '#c0c0c0'], [200000, '#c0c0c0']]
      const hoverScale = [[0, 'rgb(151, 191, 238)'], [200000, 'rgb(151, 191, 238)']]
      const activeScale = [[0, '#ff0000'], [200000, '#ff0000']]

      this._addData('zipCodes', inactiveScale, ['!=', 'zip_code', ''])
      this._addData('zipCodes-hover', hoverScale, ['==', 'zip_code', ''])
      this._addData('zipCodes-active', activeScale, ['==', 'zip_code', ''])
      map.on('mousemove', this._mouseMove)
      map.on('click', this._mapClick)
    })
  },

  componentWillReceiveProps: function (nextProps) {
    const hovered = nextProps.hovered
    if (hovered.length) {
      this._highlightFeature(hovered)
    } else {
      this._unhighlightFeature()
    }
    if (!nextProps.selected) {
      this._deselectFeature()
    }
  },

  _addData (id, scale, filter) {
    this._map.addSource(id, {
      type: 'geojson',
      data: this.mapData
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

  _mapClick: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    if (features.length) {
      this._selectFeature(features[0].properties['zip_code'])
    } else {
      this._deselectFeature()
    }
  },

  _mouseMove: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    if (features.length) {
      this._map.getCanvas().style.cursor = 'pointer'
      this._popup.setLngLat(centerpoint(features[0]).geometry.coordinates)
        .setHTML(features[0].properties.zip_code)
        .addTo(this._map)

      this._highlightFeature(features[0].properties['zip_code'])
    } else {
      this._popup.remove()
      this._map.getCanvas().style.cursor = ''
      this._unhighlightFeature()
    }
  },

  _selectFeature: function (zipCode) {
    this._map.setFilter('zipCodes-active', ['==', 'zip_code', zipCode])
    this.props.dispatch(updateSelected(zipCode))
  },

  _deselectFeature: function () {
    this._map.setFilter('zipCodes-active', ['==', 'zip_code', ''])
    this.props.dispatch(updateSelected(''))
  },

  _highlightFeature: function (zipCode) {
    this._map.setFilter('zipCodes-hover', ['==', 'zip_code', zipCode])
    this.props.dispatch(updateHovered(zipCode))
  },

  _unhighlightFeature: function () {
    this._map.setFilter('zipCodes-hover', ['==', 'zip_code', ''])
    this.props.dispatch(updateHovered(''))
  },

  render: function () {
    <Legend />
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
