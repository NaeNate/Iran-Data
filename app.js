const fs = require("fs")
const request = require("request")
const jsDay = 86400000
const id = "6db149d34b424c659d4405257d108aeb"
const today = new Date()
const year = process.argv[2] || today.getFullYear()
const month = process.argv[3] || today.getMonth()
const day = process.argv[4] || today.getDate()
const daysAgo = process.argv[5] || 2
const currency = process.argv[6] || "CHF"

const convertDateToJSDateObject = function() {
  const JSDateObject = new Date(year, month, day)
  return JSDateObject
}

const convertJSDateObjectToJSTimestamp = function() {
  const timestampForGivenDay = convertDateToJSDateObject().getTime()
  return timestampForGivenDay
}

const findTimestampForEarliestDay = function() {
  const timestampForEarliestDay =
    convertJSDateObjectToJSTimestamp() - (daysAgo - 1) * jsDay
  return timestampForEarliestDay
}

const convertToJSDateObject = function(JSTimestamp) {
  const javascriptDateObject = new Date(JSTimestamp)
  return javascriptDateObject
}

const pullDatesFromJSDateObject = function(JSdateObj) { 
  const date =
    JSdateObj.getFullYear() + "-" + ("0" + JSdateObj.getMonth()).slice(-2) + "-" + ("0" + JSdateObj.getDate()).slice(-2)
    return date
}

const requestData = function(timeStamp) {
  var JSdateObject = convertToJSDateObject(timeStamp)
  var date = pullDatesFromJSDateObject(JSdateObject)

  const url =
    "https://openexchangerates.org/api/historical/" + date + ".json?app_id=" + id

  request({ url, json: true }, (e, response) => {
    if (e) {
      console.log("Error: " + e)
    } else {
      let yesterday = response.body.rates[currency]
      console.log(response.body.rates[currency])
      const fileString = (date + ' ' + currency + ' ' + response.body.rates[currency] + ' ' +  + '\n')
      fs.appendFile('./data.txt', fileString, (e) => {
        if (e) {
          console.log(e)
        }
      })
    }
  })
}

function monster() {
  let timeStampEarliestDay = findTimestampForEarliestDay()
  
  for (var i = 0; i < daysAgo; i++) {
    requestData(timeStampEarliestDay)
    timeStampEarliestDay = timeStampEarliestDay + jsDay
  }
}

monster()