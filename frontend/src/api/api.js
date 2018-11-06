import axios from 'axios';
import request from 'request';
const instance  = axios.create({
   
})
export const apiGet = (url) => {
    return axios.get(url).then((response) => {
        return (response)
      })
      .catch( (error) => {
        return error
      })
}
export const apiPost = (url, data) => {
    return axios.post(url, data).then((response) => {
        return (response)
      })
      .catch( (error) => {
        return error
      })
}