'use strict'

const triggerNativeEvent = (el, eventName) => {
  const events = {
    click: {
      type: 'Events',
      bubbles: true,
      cancelable: true
    },
    input: {
      type: 'Events',
      bubbles: true,
      cancelable: true
    },
    '@default': {
      type: 'HTMLEvents',
      bubbles: true,
      cancelable: false
    }
  }

  const { type, bubbles, cancelable } = events[eventName] || events['@default']
  const evt = document.createEvent(type)
  evt.initEvent(eventName, bubbles, cancelable)
  el.dispatchEvent(evt)
}

const triggerBlur = el => {
  el.focus() // blur event does nothing if the element wasn't focused first
  el.blur()
}

const createMouseEvent = (eventName, eventData) => {
  const options = Object.assign(
    {
      bubbles: true,
      cancelable: eventName !== 'mousemove',
      view: global.window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 1,
      clientY: 1,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0
    },
    eventData
  )

  return new global.window.MouseEvent(eventName, options)
}

const triggerMouseEvent = (element, eventName, eventData) => {
  const event = createMouseEvent(eventName, eventData)
  element.dispatchEvent(event)
}

const MOUSE_EVENTS = [
  'mousemove',
  'mouseover',
  'mousedown',
  'mouseup',
  'mouseleave',
  'mouseout'
]
const isMouseEvent = eventName => MOUSE_EVENTS.includes(eventName)

const createKeyboardEvent = (eventName, eventData) => {
  const options = Object.assign(
    {
      bubbles: true,
      cancelable: true,
      view: global.window,
      altKey: false,
      ctrlKey: false,
      metaKey: false,
      shiftKey: false,
      keyCode: 0,
      charCode: 0,
      which: 0
    },
    eventData
  )

  return new global.window.KeyboardEvent(eventName, options)
}

const triggerKeyboardEvent = (element, eventName, eventData) => {
  const event = createKeyboardEvent(eventName, eventData)
  element.dispatchEvent(event)
}

const KEYBOARD_EVENTS = ['keydown', 'keypress']
const isKeyboardEvent = eventName => KEYBOARD_EVENTS.includes(eventName)

module.exports = (element, eventName, eventData) => {
  if (eventName === 'blur') {
    triggerBlur(element)
  } else if (isMouseEvent(eventName)) {
    triggerMouseEvent(element, eventName, eventData)
  } else if (isKeyboardEvent(eventName)) {
    triggerKeyboardEvent(element, eventName, eventData)
  } else {
    triggerNativeEvent(element, eventName)
  }
}
