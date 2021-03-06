'use strict'

const {drop, head, tail, compose, trim, join, defaultTo} = require('ramda')

const getInput = (argvData) => {
  const input = drop(2, argvData)
  return [head(input), tail(input)]
}

const createArgString = compose(trim, join(' '), defaultTo([]))

const displayTime = (mili) => {
  const sec = Math.floor(mili / 1000)
  const remaining = (mili - sec * 1000).toPrecision(3)
  return `${sec}s ${remaining}ms`
}

const createCommandString = (command, args) => {
  const argString = createArgString(args)
  return trim(`${command} ${argString}`)
}

const getMiliTime = (sec = 0, nano = 0) => (sec * 1000) + (nano / 1000000)

module.exports = {
  getInput,
  createCommandString,
  getMiliTime,
  displayTime
}
