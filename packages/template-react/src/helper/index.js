export function fetchBase(url, option = {}, data = {}) {
  return fetch(url, Object.assign({
    body: data ? JSON.stringify(data) : undefined,
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      csrf: 'sadfasd'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }, option))
  .then(response => {
    const type = response.headers.get('content-type')
    if (type.indexOf('application/json') > -1) {
      return response.json()
    } else {
      return response.text()
    }
  })
}

export function post(url, data = {}, option = {}) {
  return fetchBase(url, Object.assign(option, { method: 'POST' }), data)
}

export function put(url, data = {}, option = {}) {
  return fetchBase(url, Object.assign(option, { method: 'PUT' }), data)
}

export function get(url, data = {}, option = {}) {
  const query = Object.keys(data).map(key => `${key}=${data[key]}`).join('&')

  url = url.indexOf('?') > -1 ? url + query : url + '?' + query

  return fetchBase(url, Object.assign(option, { method: 'GET' }), null)
}