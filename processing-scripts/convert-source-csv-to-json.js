/* Parses Houston Endowment CSV/ spreadheet data into
JavaScript-standard JSON format.

usage: node convert-source-csv-to-json.js {source CSV} {destination JSON} */

const fs = require('fs')
const process = require('process')

const [source, dest] = process.argv.slice(2, 4)
let lines = fs.readFileSync(source, 'utf-8').split('\n')
const categories = lines.shift().split(',').splice(1)

let outputdata = {}
lines.forEach((line, lineI) => {
  const columns = line.split(',')
  if (columns.length === 23) {
    const zipcode = columns.shift()
    outputdata[zipcode] = {}
    columns.forEach((column, columnI) => {
      outputdata[zipcode][categories[columnI]] = Number(column)
    })
  } else {
    console.log(`Line #${lineI} was currupted and will be skipped.`)
  }
})

console.log(outputdata)
fs.writeFile(dest, JSON.stringify(outputdata))
