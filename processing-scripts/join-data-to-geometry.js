/* Combines Houston Foundation data output produced by the
"convert-source-csv-to-json.js" script with unnatributed GeoJSON zip code
geometry by joining on the common zip code attributes, to produce the project's
complete data source.

usage: node join-data-to-geometry.js {attribute JSON} {geometry GeoJSO} {output GeoJSON} */

const fs = require('fs')
const process = require('process')

let [srcAttr, srcGeom, destGeoJSON] = process.argv.slice(2, 5)
srcAttr = JSON.parse(fs.readFileSync(srcAttr, 'utf-8'))
srcGeom = JSON.parse(fs.readFileSync(srcGeom, 'utf-8'))

let attrGeom = srcGeom.features.map((feature) => {
  const zipCode = feature.properties.zip_code
  feature.properties = srcAttr[zipCode]
  feature.properties['zip_code'] = zipCode
  return feature
})
srcGeom.features = attrGeom

console.log(srcGeom)
fs.writeFile(destGeoJSON, JSON.stringify(srcGeom))
