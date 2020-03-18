const fs = require("fs")
const request = require("request")
const id = "6db149d34b424c659d4405257d108aeb"

const dataFind = () => {
  const url = "https://openexchangerates.org/api/latest.json?app_id=" + id

  request({ url, json: true }, (error, response) => {
    if (error) {
      console.log('Error: ' + error)
    } else {
      console.log(response.body.rates.VEF)
      
    }
  })
}

dataFind()


// VEF Venezuelan Bolívar Fuerte