import axios from 'axios';
import request from 'request';
const instance  = axios.create({
    fbclid: 'IwAR20adX_Fun47zax4Bc-BnIf9wAfsmiAVmcXq7a9rmi11_tIf6SGy9aD0Ec',
    format: 'json'
})

const params = {
    fbclid: 'IwAR20adX_Fun47zax4Bc-BnIf9wAfsmiAVmcXq7a9rmi11_tIf6SGy9aD0Ec',
    format: 'json'
}

const headers = {
    "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Methods" : "GET, OPTIONS",
    "Access-Control-Max-Age" : "1000",
    "Access-Control-Allow-Headers" : "X-Requested-With, Content-Type"
}

export const apiGet = (url) => {
    // axios.get(url).then( (response) => {
    //     console.log(response) 
    //   })
    //   .catch( (error) => {
    //     console.log(error) 
    //   })

    const data = new Promise((resolve, reject) => {
      request.get({
        url: url,
        // headers: headers,
      }, (error, response, body) => {
        if (response.statusCode == 200 && body && !error) {
          body = JSON.parse(body);
          return body.success == true ? resolve(body) : reject(body);
        } else {
          body = JSON.parse(body);
          return reject(body);
        }
      });
    })
    console.log(data)
}