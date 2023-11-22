Suite (function () {

  const X = 'X'
  const Y = 'Y'

  function Logger (agent) {
    return function (message) {
      return { agent, message }
    }
  }

  let XLog = Logger (X) 
  let YLog = Logger (Y)

  return [
    XLog (1),
    YLog (2)
  ]

},

function () {

  const PURCHASE = 'purchase'
  const EXIT     = 'exit'
  const BODY     = document.body

  function Fire (element) {
    return function (type) {
      return function () {
        let event = new CustomEvent (type)
        element.dispatchEvent (event)
      }
    }
  }

  let events = []
  let trace  = ({type}) => events = [...events, type]
  
  BODY.addEventListener (PURCHASE, trace)
  BODY.addEventListener (EXIT,     trace)

  let fire     = Fire (BODY)
  let purchase = fire (PURCHASE)
  let exit     = fire (EXIT)

  purchase ()
  purchase ()
  purchase ()
  exit ()
  exit ()

  return events

},
  
function () {

  const GENDER     = 'gender'
  const AGE        = 'age'
  const FOLLOWERS  = 'followers'
  const MALE       = 'Male'
  const FEMALE     = 'Female'
  const ADULT      = 18
  const INFLUENCER = 50

  let data = [
    { gender :   MALE, age : 22, followers : 37 },
    { gender : FEMALE, age : 17, followers : 56 },
    { gender :   MALE, age : 38, followers : 44 },
    { gender : FEMALE, age : 23, followers : 72 },
    { gender :   MALE, age : 12, followers : 15 },
  ]

  let pluck      = x => y => y[x]
  let equals     = x => y => z => x(z) == y
  let greater    = x => y => z => x(z) >  y
  let not        = x => y => !x(y)

  let gender     = pluck   (GENDER)
  let age        = pluck   (AGE)
  let followers  = pluck   (FOLLOWERS)
  let man        = equals  (gender)(MALE)
  let woman      = equals  (gender)(FEMALE)
  let adult      = greater (age)(ADULT)
  let young      = not     (adult)
  let influencer = greater (followers)(INFLUENCER)

  return [
    data.filter (man),
    data.filter (woman),
    data.filter (adult),
    data.filter (young),
    data.filter (influencer)
  ]

},

function () {

  const X = 'X'
  const Y = 'Y'

  function Bus () {
    let fns = []

    function send (message) {
      fns.forEach (function (fn) {
        fn (message)
      })
    }

    function receive (fn) {
      fns = [...fns, fn]
      return function () {
        fns = fns.filter (function (gn) {
          return gn != fn 
        })
      }
    }

    return { send, receive }
  }

  let LOG = []
  function Log (agent) { 
    return function (message) {
      return LOG = [...LOG, { agent, message }]
    }
  }

  let LX = Log (X)
  let LY = Log (Y)

  let bus = Bus ()
  let RX  = bus.receive (LX)
  let RY  = bus.receive (LY)

  bus.send (1)
  RX ()
  bus.send (2)
  RY ()
  bus.send (3)

  return LOG

})
