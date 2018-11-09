import axios from 'axios';
// const instance  = axios.create({

// })
export const apiGet = (url) => {
  return axios.get(url).then((response) => {
    return (response)
  })
    .catch((error) => {
      return {}
    })
}
export const apiPost = (url, data) => {
  return axios.post(url, data).then((response) => {
    return (response)
  })
    .catch((error) => {
      return error
    })
}

export const apiPut = (url, data) => {
  return axios.put(url, data).then((response) => {
    return (response)
  })
    .catch((error) => {
      return error
    })
}

export const apiPatch = (url, data) => {
  return axios.patch(url, data).then((response) => {
    return (response)
  })
    .catch((error) => {
      return error
    })
}

export const apiDelete = (url) => {
  return axios.delete(url).then((response) => {
    return (response)
  })
    .catch((error) => {
      return error
    })
}