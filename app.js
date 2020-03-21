const fs = require("fs")
const request = require("request")
const jsDay = 86400000
const id = "6db149d34b424c659d4405257d108aeb"
const today = new Date()
const year = process.argv[2]
const month = process.argv[3] // 01 === Feb
const day = process.argv[4]
const daysAgo = process.argv[5] || 3
const currency = process.argv[6] || "GBP"

console.log(today)

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
  // date is a jsTimestamp
  // need to convert to jsDateObject
  var JSdateObject = convertToJSDateObject(timeStamp)
  var date = pullDatesFromJSDateObject(JSdateObject)

  const url =
    "https://openexchangerates.org/api/historical/" + date + ".json?app_id=" + id

  request({ url, json: true }, (e, response) => {
    if (e) {
      console.log("Error: " + e)
    } else {
      console.log(response.body.rates.GBP)
      const fileString = (date + ' ' + response.body.rates.GBP + '\n')

      // fs.appendFile('./data.txt', date + ' ' + response.body.rates.GBP + '\n', (e) => {
      fs.appendFile('./data.txt', fileString, (e) => {

        if (e) {
          console.log(e)
        } else {
          console.log('Data was entered')
        }
      })





    }
  })
}

function monster() {
  let timeStampEarliestDay = findTimestampForEarliestDay()
  
  for (var i = 0; i < daysAgo; i++) {
    requestData(timeStampEarliestDay)
    // console.log(timeStampEarliestDay)
    timeStampEarliestDay = timeStampEarliestDay + jsDay
  }
}

monster()


/*
// 'a' flag stands for 'append'
const log = fs.createWriteStream('log.txt', { flags: 'a' });

// on new log entry ->
log.write('new entry\n');

// you can skip closing the stream if you want it to be opened while
// a program runs, then file handle will be closed
log.end();
*/

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
