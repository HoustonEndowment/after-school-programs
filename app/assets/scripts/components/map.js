import React from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'
import centerpoint from 'turf-center'
import chroma from 'chroma-js'
import { totalStudents, totalSlots } from '../utils'

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
      const inactiveScale = this._buildColorscale('white', 'black', 0, 100, 10)
      const hoverScale = this._buildColorscale('white', 'blue', 0, 100, 10)
      const activeScale = this._buildColorscale('white', 'red', 0, 100, 10)

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

  _buildColorscale: function (clr1, clr2, lowRange, upRange, interval) {
    const scale = chroma.scale([clr1, clr2])
    let scaleArr = []
    for (let i = lowRange; i < upRange + 1;) {
      scaleArr.push([0 + i, scale(i / upRange).hex()])
      i += interval
    }
    return scaleArr
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
      'filter': filter,
      'paint': {
        'fill-color': {
          property: 'slots_students_ratio',
          stops: scale
        },
        'fill-opacity': 1,
        'fill-outline-color': 'white'
      }
    }, 'waterway-label')
  },

  _mapClick: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    if (features.length) {
      this._selectFeature(features[0].properties['zip_code'])
    } else {
      this._deselectFeature()
    }
  },

  _generateTooltip: function (zipProps) {
    return (
      `<div class="zipcode panel-subhead"><h2>${zipProps.zip_code}</h2></div>
        <div class="students-count">
          <span class="data-number">${totalStudents(zipProps)}</span>
          <span class="data-description">eligible students</span>
        </div>
        <div class="slots-count">
          <span class="data-number">${totalSlots(zipProps)}</span>
          <span class="data-description">available program spots</span>
        </div>`
    )
  },

  _mouseMove: function (e) {
    const features = this._map.queryRenderedFeatures(e.point, { layers: ['zipCodes', 'zipCodes-hover'] })
    if (features.length) {
      this._map.getCanvas().style.cursor = 'pointer'
      this._highlightFeature(features[0].properties['zip_code'])
    } else {
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
    const feature = this.props.mapData.features.find((feature) => {
      return feature.properties.zip_code === zipCode
    })
    this._map.setFilter('zipCodes-hover', ['==', 'zip_code', zipCode])
    this._popup.setLngLat(centerpoint(feature).geometry.coordinates)
      .setHTML(this._generateTooltip(feature.properties))
      .addTo(this._map)
    this.props.dispatch(updateHovered(zipCode))
  },

  _unhighlightFeature: function () {
    this._map.setFilter('zipCodes-hover', ['==', 'zip_code', ''])
    this._popup.remove()
    this.props.dispatch(updateHovered(''))
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
