import LHelper from './helper.loader.js'

const TYPE  = 'button'
const EVENT = 'click'
const PATH  = 'path'

function Init () {
  let buttons = document.querySelectorAll (TYPE)
  for (let button of buttons) {
    button.addEventListener (EVENT, async function () {
      let path = button.getAttribute (PATH)
      await LHelper.load (path)
    })
  }
}

Init ()
    