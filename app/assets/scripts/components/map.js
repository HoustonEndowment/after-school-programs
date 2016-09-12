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
    this.zoom = 9.5
    if (window.innerWidth < 768) {
      this.zoom = 8.75
    }
    this.mapData = this.props.mapData
    this.mapCenter = centerpoint(this.mapData).geometry.coordinates
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNjYWxhbW9nbmEiLCJhIjoiM29weEZXayJ9.0Wpp3KbmiRcR_0YCFktCow'
    const map = this._map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/ascalamogna/cisrq5dhg004p2xvrilk14hyx',
      center: this.mapCenter,
      zoom: this.zoom,
      minZoom: 2,
      scrollZoom: false
    })

    this._map.addControl(new mapboxgl.Navigation({position: 'bottom-right'}))
    this._popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    })

    map.on('load', () => {
      let inactiveScale = chroma.scale(['rgb(246, 209, 164)', 'rgb(222, 122, 0)'])
      inactiveScale = [
        [65, inactiveScale(1).hex()],
        [73.5, inactiveScale(0.75).hex()],
        [82, inactiveScale(0.5).hex()],
        [90.5, inactiveScale(0.25).hex()],
        [100, inactiveScale(0).hex()]
      ]
      let hoverScale = chroma.scale(['rgb(246, 209, 164)', 'rgb(222, 122, 0)'])
      hoverScale = [
        [65, hoverScale(1).darken(0.5).hex()],
        [73.5, hoverScale(0.75).darken(0.5).hex()],
        [82, hoverScale(0.5).darken(0.5).hex()],
        [90.5, hoverScale(0.25).darken(0.5).hex()],
        [100, hoverScale(0).darken(0.5).hex()]
      ]

      this._addData('zipCodes', inactiveScale, ['!=', 'zip_code', ''])
      this._addData('zipCodes-hover', hoverScale, ['==', 'zip_code', ''])
      this._addOutlineData('zipCodes-active', ['==', 'zip_code', ''])
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
    const selected = nextProps.selected
    if (selected) {
      this._selectFeature(selected)
    } else {
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
    })
  },

  _addOutlineData (id, filter) {
    this._map.addSource(id, {
      type: 'geojson',
      data: this.mapData
    })
    this._map.addLayer({
      'id': id,
      'type': 'line',
      'source': id,
      'filter': filter,
      'paint': {
        'line-color': 'rgb(0, 0, 0)',
        'line-width': 2
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

  _generateTooltip: function (zipProps) {
    let underserved = totalStudents(zipProps) - totalSlots(zipProps)
    underserved = (underserved < 0) ? 0 : underserved
    return (
      `<div><h2 class="zipcode-tooltip">Zipcode: <span class="data-number">${zipProps.zip_code}</span></h2></div>
        <div class="students-count">
          <span class="data-number">${underserved}</span>
          <span class="data-description">underserved students</span>
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
    const feature = this.props.mapData.features.find((feature) => {
      return feature.properties.zip_code === zipCode
    })
    this._map.flyTo({
      center: centerpoint(feature).geometry.coordinates,
      zoom: 10
    })
    this.props.dispatch(updateSelected(zipCode))
  },

  _deselectFeature: function () {
    this._map.setFilter('zipCodes-active', ['==', 'zip_code', ''])
    this._map.flyTo({
      center: this.mapCenter,
      zoom: this.zoom
    })
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
    return <div className='map-container'><div id='map' className='map' /></div>
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
