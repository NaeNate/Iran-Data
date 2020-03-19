const fs = require('fs')
const request = require('request')
const jsDay = 86400000
const id = "6db149d34b424c659d4405257d108aeb"
const year = process.argv[2]
const month = process.argv[3]
const day = process.argv[4]
const daysAgo = process.argv[5]

const convertDateToJSDateObject = function () {
  const date = new Date(Date.UTC(year, month, day))
  console.log({date})
  return date
}

const convertJSDateObjectToJSTimestamp = function () {
  const timestampForGivenDay = convertDateToJSDateObject()
.getTime()
  console.log(timestampForGivenDay)
  return timestampForGivenDay
}

const findTimestampForEarliestDay = function () {
  const timestampForEarliestDay = convertJSDateObjectToJSTimestamp() - (daysAgo * jsDay)
  console.log(timestampForEarliestDay)
  return timestampForEarliestDay
}

const convertEarliestDayTimestampToDate = function () {
  const dateOfEarliestDay = new Date(findTimestampForEarliestDay())
  console.log(dateOfEarliestDay)
  return dateOfEarliestDay
}


for (var i = 0; i < daysAgo; i++) {
  const n = convertEarliestDayTimestampToDate();
  // we worked up to this point 
  // Stuck on loop to call each day for api
  

}

convertEarliestDayTimestampToDate()

