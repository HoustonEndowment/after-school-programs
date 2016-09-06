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
  const src = srcAttr[zipCode]
  feature.properties = src
  feature.properties['zipcode'] = zipCode
  feature.properties['slots_students_ratio'] = Number((src.total_slots / src.total_students * 100).toFixed(2))
  return feature
})
srcGeom.features = attrGeom
const outputdata = {zipCodeData: srcGeom}

console.log(outputdata)
fs.writeFile(destGeoJSON, JSON.stringify(outputdata))
