const fs = require('fs')
const request = require('request')
const jsDay = 86400000
const id = "6db149d34b424c659d4405257d108aeb"
const year = process.argv[2]
const month = process.argv[3] // 01 === Feb
const day = process.argv[4]
const daysAgo = process.argv[5] || 3
const currency = process.argv[6] || "VEF"

const convertDateToJSDateObject = function () {
  const date = new Date(Date.UTC(year, month, day))
  // console.log({date})
  return date
}

const convertJSDateObjectToJSTimestamp = function () {
  const timestampForGivenDay = convertDateToJSDateObject()
.getTime()
  // console.log(timestampForGivenDay)
  return timestampForGivenDay
}

const findTimestampForEarliestDay = function () {
  const timestampForEarliestDay = convertJSDateObjectToJSTimestamp() - (daysAgo * jsDay)
  // console.log(timestampForEarliestDay)
  return timestampForEarliestDay
}

const convertToJSDateObject = function (JSTimestamp) {
  const javascriptDateObject = new Date(JSTimestamp)
  // console.log(javascriptDateObject)
  return javascriptDateObject
}

const pullDatesFromJSDateObject = function (JSdateObj) {
  const date = JSdateObj.getFullYear() + '-' + ("0" + JSdateObj.getMonth()).slice(-2) + '-' + ("0" + JSdateObj.getDate()).slice(-2)
  return date
}

const requestData = function (date) {
  // console.log(typeof date)
  const url = "https://openexchangerates.org/api/historical/" + date + ".json?app_id=" + id

  request({ url, json: true }, (e, response) => {
    if (e) {
      console.log('Error: ' + e)
    } else {
      console.log(response.body.rates.VEF)
    }
  })
}

function monster(){
for (var i = 0; i < daysAgo; i++) {

  // up to this point
  console.log(i)

}
}


monster()

// convertToJSDateObject(1575158400000)
// requestData(pullDatesFromJSDateObject(convertToJSDateObject(1574726400000)))

// convertEarliestDayTimestampToJSDateObject()
// convertDateToJSDateObject()

/*
CLI app.js 2019 03 10 5 VEF
Convert CLI data to a JSdateObj
Convrt JSdObj into JS Timestamp
subtract (daysAgo * jsDay) from JS Timestamp to get earliest JSTimestamp

Monster Function: take in javascript timestamp, turn the timestamp into a javascript date object, pull the year, month, and day from the object, request from the api, append data to text file, 

*/