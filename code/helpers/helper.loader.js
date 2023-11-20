const SCRIPT  = 'script'
const TYPE    = 'type'
const MODULE  = 'module'
const PRESETS = 'env-plus'
const SEP     = '/'

let page = document
let head = page.head

function LHelper () {

  async function load (path) {
    let response = await fetch (path) 
    let code     = await response.text ()
    let script   = page.createElement (SCRIPT)
    script.setAttribute (TYPE, MODULE)
    script.text  = code
    head.appendChild (script)
  }

  return { load }
} 

export default LHelper ()