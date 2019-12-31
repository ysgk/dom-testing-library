import {fireEvent} from '..'

const eventTypes = [
  {
    type: 'Clipboard',
    events: ['copy', 'paste'],
    elementType: 'input',
  },
  {
    type: 'Composition',
    events: ['compositionEnd', 'compositionStart', 'compositionUpdate'],
    elementType: 'input',
  },
  {
    type: 'Keyboard',
    events: ['keyDown', 'keyPress', 'keyUp'],
    elementType: 'input',
  },
  {
    type: 'Focus',
    events: ['focus', 'blur', 'focusIn', 'focusOut'],
    elementType: 'input',
  },
  {
    type: 'Input',
    events: ['change', 'input', 'invalid'],
    elementType: 'input',
  },
  {
    type: 'Form',
    events: ['submit', 'reset'],
    elementType: 'form',
  },
  {
    type: 'Mouse',
    events: [
      'click',
      'contextMenu',
      'dblClick',
      'drag',
      'dragEnd',
      'dragEnter',
      'dragExit',
      'dragLeave',
      'dragOver',
      'dragStart',
      'drop',
      'mouseDown',
      'mouseEnter',
      'mouseLeave',
      'mouseMove',
      'mouseOut',
      'mouseOver',
      'mouseUp',
    ],
    elementType: 'button',
  },
  {
    type: 'Selection',
    events: ['select'],
    elementType: 'input',
  },
  {
    type: 'Touch',
    events: ['touchCancel', 'touchEnd', 'touchMove', 'touchStart'],
    elementType: 'button',
  },
  {
    type: 'UI',
    events: ['scroll'],
    elementType: 'div',
  },
  {
    type: 'Wheel',
    events: ['wheel'],
    elementType: 'div',
  },
  {
    type: 'Media',
    events: [
      'abort',
      'canPlay',
      'canPlayThrough',
      'durationChange',
      'emptied',
      'encrypted',
      'ended',
      'error',
      'loadedData',
      'loadedMetadata',
      'loadStart',
      'pause',
      'play',
      'playing',
      'progress',
      'rateChange',
      'seeked',
      'seeking',
      'stalled',
      'suspend',
      'timeUpdate',
      'volumeChange',
      'waiting',
    ],
    elementType: 'video',
  },
  {
    type: 'Image',
    events: ['load', 'error'],
    elementType: 'img',
  },
  {
    type: 'Animation',
    events: ['animationStart', 'animationEnd', 'animationIteration'],
    elementType: 'div',
  },
  {
    type: 'Transition',
    events: ['transitionEnd'],
    elementType: 'div',
  },
  {
    type: 'Pointer',
    events: [
      'pointerOver',
      'pointerEnter',
      'pointerDown',
      'pointerMove',
      'pointerUp',
      'pointerCancel',
      'pointerOut',
      'pointerLeave',
      'gotPointerCapture',
      'lostPointerCapture',
    ],
    elementType: 'div',
  },
]

const bubblingEvents = [
  'copy',
  'cut',
  'paste',
  'compositionEnd',
  'compositionStart',
  'compositionUpdate',
  'keyDown',
  'keyPress',
  'keyUp',
  'focusIn',
  'focusOut',
  'change',
  'input',
  'submit',
  'reset',
  'click',
  'contextMenu',
  'dblClick',
  'drag',
  'dragEnd',
  'dragEnter',
  'dragExit',
  'dragLeave',
  'dragOver',
  'dragStart',
  'drop',
  'mouseDown',
  'mouseMove',
  'mouseOut',
  'mouseOver',
  'mouseUp',
  'select',
  'touchCancel',
  'touchEnd',
  'touchMove',
  'touchStart',
  'wheel',
  'animationStart',
  'animationEnd',
  'animationIteration',
  'transitionEnd',
  'pointerOver',
  'pointerDown',
  'pointerMove',
  'pointerUp',
  'pointerCancel',
  'pointerOut',
]

const nonBubblingEvents = [
  'focus',
  'blur',
  'invalid',
  'mouseEnter',
  'mouseLeave',
  'scroll',
  'abort',
  'canPlay',
  'canPlayThrough',
  'durationChange',
  'emptied',
  'encrypted',
  'ended',
  'loadedData',
  'loadedMetadata',
  'loadStart',
  'pause',
  'play',
  'playing',
  'progress',
  'rateChange',
  'seeked',
  'seeking',
  'stalled',
  'suspend',
  'timeUpdate',
  'volumeChange',
  'waiting',
  'load',
  'error',
  'pointerEnter',
  'pointerLeave',
  'gotPointerCapture',
  'lostPointerCapture',
]

eventTypes.forEach(({type, events, elementType}) => {
  describe(`${type} Events`, () => {
    events.forEach(eventName => {
      it(`fires ${eventName}`, () => {
        const node = document.createElement(elementType)
        const spy = jest.fn()
        node.addEventListener(eventName.toLowerCase(), spy)
        fireEvent[eventName](node)
        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })
})

describe(`Bubbling Events`, () => {
  bubblingEvents.forEach(event =>
    it(`bubbles ${event}`, () => {
      const node = document.createElement('div')
      const spy = jest.fn()
      node.addEventListener(event.toLowerCase(), spy)

      const innerNode = document.createElement('div')
      node.appendChild(innerNode)

      fireEvent[event](innerNode)
      expect(spy).toHaveBeenCalledTimes(1)
    }),
  )

  nonBubblingEvents.forEach(event =>
    it(`doesn't bubble ${event}`, () => {
      const node = document.createElement('div')
      const spy = jest.fn()
      node.addEventListener(event.toLowerCase(), spy)

      const innerNode = document.createElement('div')
      node.appendChild(innerNode)

      fireEvent[event](innerNode)
      expect(spy).not.toHaveBeenCalled()
    }),
  )
})

describe(`Aliased Events`, () => {
  it(`fires doubleClick`, () => {
    const node = document.createElement('div')
    const spy = jest.fn()
    node.addEventListener('dblclick', spy)
    fireEvent.doubleClick(node)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})

it('assigns target properties', () => {
  const node = document.createElement('input')
  const spy = jest.fn()
  const value = 'a'
  node.addEventListener('change', spy)
  fireEvent.change(node, {target: {value}})
  expect(spy).toHaveBeenCalledTimes(1)
  expect(node.value).toBe(value)
})

it('assigns selection-related target properties', () => {
  const node = document.createElement('input')
  const spy = jest.fn()
  const value = 'ab'
  const selectionStart = 1
  const selectionEnd = 2
  node.addEventListener('change', spy)
  fireEvent.change(node, {target: {value, selectionStart, selectionEnd}})
  expect(node.value).toBe(value)
  expect(node.selectionStart).toBe(selectionStart)
  expect(node.selectionEnd).toBe(selectionEnd)
})

// eslint-disable-next-line
it('assigning a value to a target that cannot have a value throws an error', () => {
  const node = document.createElement('div')
  expect(() =>
    fireEvent.change(node, {target: {value: 'a'}}),
  ).toThrowErrorMatchingInlineSnapshot(
    `"The given element does not have a value setter"`,
  )
})

it('assigning the files property on an input', () => {
  const node = document.createElement('input')
  const file = new document.defaultView.File(['(⌐□_□)'], 'chucknorris.png', {
    type: 'image/png',
  })
  fireEvent.change(node, {target: {files: [file]}})
  expect(node.files).toEqual([file])
})

it('fires events on Window', () => {
  const messageSpy = jest.fn()
  window.addEventListener('message', messageSpy)
  fireEvent(window, new window.MessageEvent('message', {data: 'hello'}))
  expect(messageSpy).toHaveBeenCalledTimes(1)
  window.removeEventListener('message', messageSpy)
})

it('fires shortcut events on Window', () => {
  const clickSpy = jest.fn()
  window.addEventListener('click', clickSpy)
  fireEvent.click(window)
  expect(clickSpy).toHaveBeenCalledTimes(1)
  window.removeEventListener('click', clickSpy)
})

it('throws a useful error message when firing events on non-existent nodes', () => {
  expect(() => fireEvent(undefined, new MouseEvent('click'))).toThrow(
    'Unable to fire a "click" event - please provide a DOM element.',
  )
})

it('throws a useful error message when firing events on non-existent nodes (shortcut)', () => {
  expect(() => fireEvent.click(undefined)).toThrow(
    'Unable to fire a "click" event - please provide a DOM element.',
  )
})

it('throws a useful error message when firing non-events', () => {
  expect(() => fireEvent(document.createElement('div'), undefined)).toThrow(
    'Unable to fire an event - please provide an event object.',
  )
})

it('fires events on Document', () => {
  const keyDownSpy = jest.fn()
  document.addEventListener('keydown', keyDownSpy)
  fireEvent.keyDown(document, {key: 'Escape'})
  expect(keyDownSpy).toHaveBeenCalledTimes(1)
  document.removeEventListener('keydown', keyDownSpy)
})
