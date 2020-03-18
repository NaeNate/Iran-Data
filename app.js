const fs = require("fs")
const request = require("request")
const id = "6db149d34b424c659d4405257d108aeb"
const yr = process.argv[2]
const mm = process.argv[3]
const dd = process.argv[4]

const dataFind = () => {
  const url = "https://openexchangerates.org/api/historical/" + yr + "-" + mm + "-" + dd + ".json?app_id=" + id

  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log('Error: ' + error)
    } else {
      const date = new Date(Date.UTC(process.argv[2], process.argv[3], process.argv[4]));
      const dataDay = date.getFullYear() + '-' + ("0" + date.getMonth()).slice(-2) + '-' + ("0" + date.getDate()).slice(-2)
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
