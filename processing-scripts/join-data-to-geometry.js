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
  const totalStudents = src.students_gradeKto12 + src.students_gradeKto5 +
                        src.students_grade6to8 + src.students_grade9to12
  const totalSlots = src.slots_gradeKto12 + src.slots_gradeKto5 +
                     src.slots_grade6to8 + src.slots_grade9to12
  feature.properties = src
  feature.properties['zip_code'] = zipCode
  feature.properties['students_slots_ratio'] = Number((totalStudents / totalSlots * 100).toFixed(2))
  feature.properties['schoolage_slots_ratio'] = Number((src.schoolage_children / totalSlots * 100).toFixed(2))
  feature.properties['schoolage_students_ratio'] = Number((src.schoolage_children / totalStudents * 100).toFixed(2))
  feature.properties['slots_students_ratio'] = Number((totalSlots / totalStudents * 100).toFixed(2))
  feature.properties['slots_schoolage_ratio'] = Number((totalSlots / src.schoolage_children * 100).toFixed(2))
  feature.properties['students_schoolage_ratio'] = Number((totalStudents / src.schoolage_children * 100).toFixed(2))
  return feature
})
srcGeom.features = attrGeom
const outputdata = {zipCodeData: srcGeom}

console.log(outputdata)
fs.writeFile(destGeoJSON, JSON.stringify(outputdata))
