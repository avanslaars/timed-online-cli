'use strict'

const {drop, head, tail, compose, trim, join} = require('ramda')

const getInput = (argvData) => {
  const input = drop(2, argvData)
  return [head(input), tail(input)]
}

const createArgString = compose(trim, join(' '))

const createCommandString = (command, args) => {
  const argString = createArgString(args)
  return `${command} ${argString}`
}

const getMiliTime = (sec, mili) => (sec * 1000) + mili

module.exports = {
  getInput,
  createCommandString,
  getMiliTime
}
