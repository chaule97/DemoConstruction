import axios from "axios";
// const instance  = axios.create({
import Cookies from "js-cookie";
// })
export const apiGet = url => {
  return fetch(url, {
    method: "GET",
    credentials: "include"
  })
    .then(response => {
      return response.json();
    })
    .then(res => ({ data: res }))
    .catch(error => {
      return {};
    });
};
export const apiPost = (url, data) => {
  return fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken")
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json();
    })
    .then(res => ({ data: res }))
    .catch(error => {
      return error;
    });
};

export const apiPut = (url, data) => {
  return fetch(url, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(res => ({ data: res }))
    .catch(error => {
      return error;
    });
};

export const apiPatch = (url, data) => {
  return fetch(url, {
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(res => ({ data: res }))
    .catch(error => {
      return error;
    });
};

export const apiDelete = url => {
  return fetch(url, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken")
    }
  })
    .then(response => {
      return response.json();
    })
    .then(res => ({ data: res }))
    .catch(error => {
      return error;
    });
};
