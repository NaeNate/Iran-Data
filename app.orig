const fs = require("fs")
const request = require("request")
const id = "6db149d34b424c659d4405257d108aeb"
const yr = process.argv[2]
const mm = process.argv[3]
const dd = process.argv[4]
const daysAgo = process.argv[5]
const unixDay = 86400

const dataFind = () => {
  const url = "https://openexchangerates.org/api/historical/" + yr + "-" + mm + "-" + dd + ".json?app_id=" + id

  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log('Error: ' + error)
    } else {
      const date = new Date(Date.UTC(yr, mm, dd));
      const dataDay = date.getFullYear() + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
      if (response.body.rates === undefined) {
        console.log('Date is in the future.')
        return
      }
      fs.appendFile('./data.txt', dataDay + ' ' + response.body.rates.VEF + '\n' , (e) => {
        if (e) {
          console.log("error")
        } else {
          console.log("data was appended?")
        }
      })
    }
  })
}

dataFind()

/*

make a function that we can pass variables to 
the function takes in 5 variables
year, month, day, days back, currencey
setup default for blank arguments
3 options:
1. give a date, days back, currnecy
2. give days back and currency,
3. default days back, currency

Hide the API key

format the text file

*/