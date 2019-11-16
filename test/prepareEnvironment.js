'use strict'

const { unmountComponentAtNode } = require('react-dom')

beforeEach(() => {
  const newBody = document.createElement('body')
  document.body = newBody

  const mountPoint = document.createElement('div')
  mountPoint.id = 'mount-point'

  document.body.appendChild(mountPoint)
})

afterEach(() => {
  const appDomNode = document.getElementById('mount-point')
  unmountComponentAtNode(appDomNode)
})
