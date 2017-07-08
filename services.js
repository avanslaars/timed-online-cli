'use strict'

const axios = require('axios')

const apiRoot = 'http://localhost:8000'

const saveCommand = (name, time) => {
  return axios.post(`${apiRoot}/command`, { name, time })
    .then(({data}) => data)
}

const loadCommand = (name) => {
  const uriName = encodeURIComponent(name)
  return axios.get(`${apiRoot}/command/${uriName}`)
    .then(({data}) => data)
}

module.exports = {
  saveCommand,
  loadCommand
}
